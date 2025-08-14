// Whitelist Application Questions Configuration
// This file allows you to easily add, remove, or modify questions in the whitelist form

export const whitelistQuestions = [
  {
    id: 'inGameName',
    type: 'text',
    label: 'In-Game Name',
    required: true,
    placeholder: 'Hot esmk fel game',
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_\s]+$/
    }
  },
  {
    id: 'realName',
    type: 'text',
    label: 'Real Name (Esmk f denya)',
    required: true,
    placeholder: 'Your real name (shnwa esmk f denya)',
    validation: {
      minLength: 2,
      maxLength: 100
    }
  },
  {
    id: 'age',
    type: 'number',
    label: 'Age (3omrok Fel denya)',
    required: true,
    placeholder: 'Enter your age',
    validation: {
      min: 16,
      max: 62
    }
  },
  {
    id: 'discordTag',
    type: 'text',
    label: 'Discord Tag',
    required: true,
    placeholder: 'Your Discord username',
    validation: {
    }
  },
  {
    id: 'experience',
    type: 'select',
    label: 'Roleplay Experience (L3abet 9bal si oui win l3abt ?)',
    required: true,
    options: [
      { value: 'Beginner', label: 'Beginner - Mazlt jdid' },
      { value: 'Intermediate', label: 'Intermediate - Ma3ndish barsha meli nal3b' },
      { value: 'Advanced', label: '3andi barsha meli nal3b' },
    ],
    defaultValue: 'Beginner'
  },
  {
    id: 'roleplaySample',
    type: 'textarea',
    label: 'Why you want to join carthage  RolePlay Server? ',
    required: true,
    placeholder: 'Why you want to join carthage  RolePlay Server',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
  {
    id: 'whatrp',
    type: 'textarea',
    label: 'What Is The RolePay ?? ( Fasrli fi Paragraphe Chmaneha RolePlay )',
    required: false,
    placeholder: 'Fasrli fi Paragraphe Chmaneha RolePlay',
    rows: 4,
    maxLength: 500,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'carachtertype',
    type: 'select',
    label: 'Your Character Type (Shnouwa besh tal3b ?)',
    required: true,
    options: [
      { value: 'Legal', label: 'Legal - Legal Jobs' },
      { value: 'Illegal', label: 'Illegal - Crime Jobs' },
    ],
    defaultValue: 'Legal'
  },
    {
    id: 'objective',
    type: 'textarea',
    label: 'Characters Objectives ( 5 or more )  chnouma les objectives eli t7eb touslilhom?',
    required: true,
    placeholder: 'chnouma les objectives eli t7eb touslilhom',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'coherence',
    type: 'textarea',
    label: 'What is Coherence rp (ꜰᴀꜱʀʟɪ ᴄʜᴍᴀɴᴇʜᴀ ) ᴡ ᴀ3ᴛɪɴɪ 2 ᴇxᴘ',
    required: true,
    placeholder: 'what is Coherence rp (ꜰᴀꜱʀʟɪ ᴄʜᴍᴀɴᴇʜᴀ ) ᴡ ᴀ3ᴛɪɴɪ 2 ᴇxᴘ',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'greentime',
    type: 'textarea',
    label: 'Tejem Tfasrli chm3neha greentime',
    required: true,
    placeholder: 'chma3neha greentime',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
  {
    id: 'fairrp',
    type: 'textarea',
    label: 'What is fair rp (ꜰᴀꜱʀʟɪ ᴄʜᴍᴀɴᴇʜᴀ ) ᴡ ᴀ3ᴛɪɴɪ 2 ᴇxᴘ',
    required: true,
    placeholder: 'What is fair rp',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'massrp',
    type: 'textarea',
    label: 'what is Mass RP ?? ( Atini 1 exemple au Min )',
    required: true,
    placeholder: 'what is Mass RP',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'winrp',
    type: 'textarea',
    label: 'what is win RP ?? ( Atini 1 exemple au Min )',
    required: true,
    placeholder: 'what is win RP',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
   {
    id: ' third party',
    type: 'select',
    label: 'Win fama thirdparty',
    required: true,
    options: [
      { value: '1', label: '1- Deux gangs yetfehmou 3ala business' },
      { value: '2', label: '2- Deux gangs fi poursuite  m3a el 7akem jet gang o5a dharbet el 7akem'},
      { value: '3', label: '3- Zouz gang fi west fight w el police da5el binethom'},
      { value: '0', label: '- NO ANSWER'},
    ],
    defaultValue: '0'
  },
     {
    id: 'yesno',
    type: 'select',
    label: 'Fi Gang War andou el 7a9 el 7akem yedakhel fel fight !',
    required: true,
    options: [
      { value: 'yes', label: 'EY' },
      { value: 'no', label: 'LA' },
    ],
    defaultValue: 'no'
  },
      {
    id: 'failquestion',
    type: 'textarea',
    label: 'Ki ifaili Maak chkoun w enti Mezzelet fel scéne chtaamel ??',
    required: true,
    placeholder: '...',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
  {
    id: 'si1',
    type: 'textarea',
    label: '(Ki tasm3 eli el charactère mte3ek bech tsirlo mort RP wela yeta5taf, twali ma3adech tod5el lel game wala terkch fel safe zone) shniya lfail li mawjoud ?',
    required: true,
    placeholder: 'shniya lfail li mawjoud',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'si2',
    type: 'textarea',
    label: 'shniya esm l fail kif tet9awa al character mteekk ? ',
    required: true,
    placeholder: 'shniya lfail li mawjoud',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
    {
    id: 'si3',
    type: 'textarea',
    label: 'Shniya l fails li mawjoudin  ---- Enti dakhel I sbitar 19it player Mayet loutitou Rak police haz Alik tizer yakhi jrit lel karhba mta3ek w glebt, chad jortek b karhabt I police b3atht msg I shabek f discord bech y3awnouk ma7abouch kallmet sahbk f gang bch yjib m3ah wled houmtou w yman3ek mba3ed malgit beha win bdit todkhol fyh bel karhba même pas twaja3t ba3d mchit lel gc w amelt alt F4 ',
    required: true,
    placeholder: 'Shniya l fails li mawjoudin',
    rows: 6,
    maxLength: 1000,
    validation: {
      placeholderTextCheck: true
    }
  },
  {
    id: 'si4',
    type: 'textarea',
    label: 'Chnouma l fails eli mawjoudin fel scène hedhi?  ---- Mchit lel burger enty w sahbek lebsin mask ye5i l9ito tofla te5dem fih ma7abetch tsarbikom 5aterkom met3arkin m3aha f discord, 3malt haka w sabbitha w jbedt 3leha sle7 9oltelha hez ydik ye5i ma7abetch 3ad taya7tha.. mchet kalmet sa7ebha fel discord w 9aletlo eli hiya dawa5ha chkoun fel burger ye5i joina lel game w haz karhabtou w ja fisa3 w haz 3likom sle7 fi west l burger taya7kom o rakabkom fi karhabtou w mche bech ylawa7kom w fel thniya l9a police taya7 ye5i looteh w hazlou l pistol wel ma7jouz eli fou9ou w ba3d t7arek 3la rou7ou 3malt haka ktebtlou fi /me rak failit ye5i 9alek bara reporti biya w 93ad yseb fik mba3d ma wfet l scène respawnito f sbitar, w entouma 5arjin 3rodhkom 9odem sbitar tafitouh 3aytelkom 79artouh yekhi rkeb f karhabtou w 3afaskom ye5i faditou w sakrtou game.  ',
    required: true,
    placeholder: 'Chnouma l fails eli mawjoudin fel scène hedhi?',
    rows: 6,
    maxLength: 1000,
    validation: {
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
    label: 'Nwefe9 eli 3omri fou9 16 sne w net7aml mas2ouliyet kol 8alta na3mlha',
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
