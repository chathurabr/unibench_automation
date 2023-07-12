module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // General rules
      'no-console': 'warn', // Avoid using console.log statements
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-undef': 'error', // Disallow using undeclared variables
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Avoid using enums, use union types instead',
        },
      ],
  
      // TypeScript-specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow omitting return type inference for exported functions
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about using explicit "any" type
      '@typescript-eslint/no-empty-function': 'warn', // Warn about empty function declarations
      '@typescript-eslint/no-unused-vars': 'warn', // Warn about unused variables
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow using non-null assertion operator "!"
      '@typescript-eslint/no-inferrable-types': 'off', // Allow specifying type annotations when they can be inferred
      '@typescript-eslint/ban-ts-comment': 'off', // Allow using TypeScript-specific comments like @ts-ignore
    },

  plugins: [
    'prettier',
  ],
};
