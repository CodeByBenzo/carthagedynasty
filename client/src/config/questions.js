// Whitelist Application Questions Configuration
// This file allows you to easily add, remove, or modify questions in the whitelist form

export const whitelistQuestions = [
  {
    id: 'inGameName',
    type: 'text',
    label: 'In-Game Name',
    required: true,
    placeholder: 'Enter your in-game character name',
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_\s]+$/
    }
  },
  {
    id: 'realName',
    type: 'text',
    label: 'Real Name (Optional)',
    required: false,
    placeholder: 'Your real name (optional)',
    validation: {
      minLength: 2,
      maxLength: 100
    }
  },
  {
    id: 'age',
    type: 'number',
    label: 'Age',
    required: false,
    placeholder: 'Enter your age',
    validation: {
      min: 13,
      max: 100
    }
  },
  {
    id: 'discordTag',
    type: 'text',
    label: 'Discord Tag',
    required: false,
    placeholder: 'Your Discord username#0000',
    validation: {
      pattern: /^[a-zA-Z0-9_]+#\d{4}$/
    }
  },
  {
    id: 'experience',
    type: 'select',
    label: 'Roleplay Experience Level',
    required: true,
    options: [
      { value: 'Beginner', label: 'Beginner - New to roleplay' },
      { value: 'Intermediate', label: 'Intermediate - Some experience' },
      { value: 'Advanced', label: 'Advanced - Experienced roleplayer' }
    ],
    defaultValue: 'Beginner'
  },
  {
    id: 'roleplaySample',
    type: 'textarea',
    label: 'Roleplay Sample',
    required: true,
    placeholder: 'Write a short roleplay scenario (300-1000 characters)',
    rows: 6,
    maxLength: 1000,
    validation: {
      minLength: 300,
      maxLength: 1000,
      placeholderTextCheck: true
    }
  },
  {
    id: 'whyJoin',
    type: 'textarea',
    label: 'Why Should You Join?',
    required: false,
    placeholder: 'Tell us why you want to join our community (optional)',
    rows: 4,
    maxLength: 500,
    validation: {
      maxLength: 500,
      placeholderTextCheck: true
    }
  },
  {
    id: 'attachments',
    type: 'file',
    label: 'Attachments',
    required: false,
    accept: 'image/*',
    multiple: true,
    maxFiles: 3,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    placeholder: 'Upload screenshots or avatar images (optional)',
    helpText: 'Accepted formats: JPG, PNG, GIF. Max 5MB per file, up to 3 files.'
  },
  {
    id: 'agreeToRules',
    type: 'checkbox',
    label: 'I agree to follow the server rules and community guidelines',
    required: true,
    validation: {
      mustBeTrue: true
    }
  }
];

// Question types configuration
export const questionTypes = {
  text: {
    component: 'FormInput',
    props: ['type', 'placeholder', 'value', 'onChange', 'error']
  },
  textarea: {
    component: 'FormTextarea',
    props: ['placeholder', 'value', 'onChange', 'error', 'rows', 'maxLength']
  },
  select: {
    component: 'FormSelect',
    props: ['options', 'value', 'onChange', 'error', 'placeholder']
  },
  checkbox: {
    component: 'FormCheckbox',
    props: ['checked', 'onChange', 'error']
  },
  file: {
    component: 'FormFileUpload',
    props: ['accept', 'multiple', 'onChange', 'error', 'maxFiles', 'maxFileSize']
  },
  number: {
    component: 'FormInput',
    props: ['type', 'placeholder', 'value', 'onChange', 'error', 'min', 'max']
  }
};

// Validation patterns for placeholder text detection
export const placeholderPatterns = [
  'qddmdqkdkm',
  'qdqsdqsdqdq',
  'test',
  'placeholder',
  'lorem ipsum',
  'sample text',
  'example',
  'demo'
];

// Helper function to check if text contains placeholder patterns
export const isPlaceholderText = (text) => {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  
  return placeholderPatterns.some(pattern => {
    const regex = new RegExp(`(${pattern}){3,}`, 'i');
    return regex.test(lowerText);
  });
};

// Helper function to validate a question value
export const validateQuestion = (question, value) => {
  const { validation } = question;
  if (!validation) return null;

  // Required field check
  if (validation.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return `${question.label} is required`;
  }

  // String length checks
  if (typeof value === 'string' && value.trim()) {
    if (validation.minLength && value.length < validation.minLength) {
      return `${question.label} must be at least ${validation.minLength} characters`;
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      return `${question.label} must be ${validation.maxLength} characters or less`;
    }
  }

  // Number range checks
  if (question.type === 'number' && value) {
    const numValue = parseInt(value);
    if (validation.min && numValue < validation.min) {
      return `${question.label} must be at least ${validation.min}`;
    }
    if (validation.max && numValue > validation.max) {
      return `${question.label} must be ${validation.max} or less`;
    }
  }

  // Pattern validation
  if (validation.pattern && value && !validation.pattern.test(value)) {
    return `${question.label} format is invalid`;
  }

  // Placeholder text check
  if (validation.placeholderTextCheck && isPlaceholderText(value)) {
    return `Please provide a meaningful ${question.label.toLowerCase()}, not placeholder text`;
  }

  // Checkbox validation
  if (question.type === 'checkbox' && validation.mustBeTrue && !value) {
    return `You must agree to ${question.label.toLowerCase()}`;
  }

  return null;
};

// Helper function to get default values for all questions
export const getDefaultValues = () => {
  const defaults = {};
  whitelistQuestions.forEach(question => {
    if (question.defaultValue !== undefined) {
      defaults[question.id] = question.defaultValue;
    } else if (question.type === 'checkbox') {
      defaults[question.id] = false;
    } else if (question.type === 'file') {
      defaults[question.id] = [];
    } else {
      defaults[question.id] = '';
    }
  });
  return defaults;
};
