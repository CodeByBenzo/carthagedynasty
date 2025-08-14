const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const http = require('http');
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'gtarp-whitelist-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Data directory setup
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const appsFile = path.join(dataDir, 'apps.json');

// Ensure data directory exists
fs.ensureDirSync(dataDir);

// Initialize JSON files if they don't exist
if (!fs.existsSync(usersFile)) {
  fs.writeJsonSync(usersFile, []);
}
if (!fs.existsSync(appsFile)) {
  fs.writeJsonSync(appsFile, []);
}

// File locking for concurrent writes
const fileLocks = new Map();

async function withFileLock(filename, operation) {
  if (fileLocks.has(filename)) {
    await fileLocks.get(filename);
  }
  
  const lock = new Promise(async (resolve) => {
    try {
      const result = await operation();
      resolve(result);
    } catch (error) {
      resolve({ error: error.message });
    }
  });
  
  fileLocks.set(filename, lock);
  const result = await lock;
  fileLocks.delete(filename);
  return result;
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, roleRequest } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      
      // Check if user already exists
      if (users.find(u => u.username === username || u.email === email)) {
        return { error: 'Username or email already exists' };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role: 'user',
        roleRequest: roleRequest || 'user',
        createdAt: new Date().toISOString(),
        isBanned: false
      };

      users.push(newUser);
      await fs.writeJson(usersFile, users, { spaces: 2 });
      
      // Create token
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return { user: { ...newUser, password: undefined }, token };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      const user = users.find(u => u.username === username);
      
      if (!user || user.isBanned) {
        return { error: 'Invalid credentials or account banned' };
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return { error: 'Invalid credentials' };
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return { user: { ...user, password: undefined }, token };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      const user = users.find(u => u.id === req.user.id);
      
      if (!user) {
        return { error: 'User not found' };
      }

      return { user: { ...user, password: undefined } };
    });

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit whitelist application
app.post('/api/applications', authenticateToken, async (req, res) => {
  try {
    const {
      inGameName,
      realName,
      age,
      discordTag,
      experience,
      roleplaySample,
      whyJoin,
      attachments,
      agreeToRules
    } = req.body;

    if (!inGameName || !roleplaySample || !agreeToRules) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const sample = roleplaySample.toLowerCase();
    const repeatedPatterns = [
      'qddmdqkdkm',
      'qdqsdqsdqdq',
      'test',
      'placeholder',
      'lorem ipsum'
    ];
    
    const hasRepeatedPattern = repeatedPatterns.some(pattern => {
      const regex = new RegExp(`(${pattern}){3,}`, 'i');
      return regex.test(sample);
    });
    
    if (hasRepeatedPattern) {
      return res.status(400).json({ error: 'Please provide a meaningful roleplay sample, not placeholder text' });
    }

    // Check whyJoin for placeholder text if provided
    if (whyJoin && whyJoin.trim()) {
      const whyJoinText = whyJoin.toLowerCase();
      const hasRepeatedPattern = repeatedPatterns.some(pattern => {
        const regex = new RegExp(`(${pattern}){3,}`, 'i');
        return regex.test(whyJoinText);
      });
      
      if (hasRepeatedPattern) {
        return res.status(400).json({ error: 'Please provide a meaningful reason, not placeholder text' });
      }
    }

    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      
      // Check if user already has an application
      const existingApp = applications.find(app => app.userId === req.user.id);
      if (existingApp) {
        return { error: 'You already have an application submitted' };
      }

      const newApplication = {
        ...req.body,
        id: uuidv4(),
        userId: req.user.id,
        username: req.user.username,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        reviewedAt: null,
        reviewedBy: null,
        adminNotes: ''
      };

      applications.push(newApplication);
      await fs.writeJson(appsFile, applications, { spaces: 2 });
      
      return { application: newApplication };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's application
app.get('/api/applications/my', authenticateToken, async (req, res) => {
  try {
    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      const userApp = applications.find(app => app.userId === req.user.id);
      return { application: userApp || null };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user's application (draft)
app.put('/api/applications/my', authenticateToken, async (req, res) => {
  try {
    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      const appIndex = applications.findIndex(app => app.userId === req.user.id);
      
      if (appIndex === -1) {
        return { error: 'Application not found' };
      }

      if (applications[appIndex].status !== 'pending') {
        return { error: 'Cannot edit submitted application' };
      }

      applications[appIndex] = { ...applications[appIndex], ...req.body };
      await fs.writeJson(appsFile, applications, { spaces: 2 });
      
      return { application: applications[appIndex] };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all applications
app.get('/api/admin/applications', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      return { applications };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Review application
app.put('/api/admin/applications/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      const appIndex = applications.findIndex(app => app.id === id);
      
      if (appIndex === -1) {
        return { error: 'Application not found' };
      }

      applications[appIndex] = {
        ...applications[appIndex],
        status,
        adminNotes: adminNotes || '',
        reviewedAt: new Date().toISOString(),
        reviewedBy: req.user.username
      };

      await fs.writeJson(appsFile, applications, { spaces: 2 });
      return { application: applications[appIndex] };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all users
app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      return { users: users.map(u => ({ ...u, password: undefined })) };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Promote user to admin
app.put('/api/admin/users/:id/promote', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return { error: 'User not found' };
      }

      users[userIndex].role = 'admin';
      await fs.writeJson(usersFile, users, { spaces: 2 });
      
      return { user: { ...users[userIndex], password: undefined } };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Ban/Unban user
app.put('/api/admin/users/:id/ban', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;

    const result = await withFileLock(usersFile, async () => {
      const users = await fs.readJson(usersFile);
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return { error: 'User not found' };
      }

      users[userIndex].isBanned = isBanned;
      await fs.writeJson(usersFile, users, { spaces: 2 });
      
      return { user: { ...users[userIndex], password: undefined } };
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Export applications as JSON
app.get('/api/admin/export', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await withFileLock(appsFile, async () => {
      const applications = await fs.readJson(appsFile);
      return { applications };
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.json');
    res.json(result.applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


// --- Socket.IO Chat Integration ---
const server = http.createServer(app);
const setupChat = require('./chat');
setupChat(server); // Attach Socket.IO to HTTP server

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Data directory: ${dataDir}`);
});
