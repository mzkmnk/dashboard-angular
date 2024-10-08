import eslint from '@eslint/js';
import ngrx from '@ngrx/eslint-plugin/v9/index.js';
import stylistic from '@stylistic/eslint-plugin';
import angular from 'angular-eslint';
import gitignore from 'eslint-config-flat-gitignore';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  gitignore(),
  // eslint typescript-eslint recommended config
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.strict,
      ...tsEslint.configs.stylistic,
    ]
  },

  // tailwind config
  {
    files: ['**/*.component.html'],
    plugins: {
      'tailwindcss': tailwind
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/no-contradicting-classname": "error"
    }
  },

  // eslint stylistic
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/quote-props': [
        'error',
        'consistent-as-needed',
        { keywords: true }
      ],
      '@stylistic/array-bracket-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/array-bracket-newline': [
        'error',
        { multiline: true, minItems: 2 }
      ],
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true
        }
      ],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/key-spacing': [
        'error',
        {
          multiLine: {
            beforeColon: false,
            afterColon: true
          },
          align: {
            beforeColon: true,
            afterColon: true,
            on: 'colon'
          }
        }
      ],
      '@stylistic/max-len': ['error', { code: 150, ignoreComments: true }],
      '@stylistic/multiline-ternary': ['error', 'always']
    }
  },

  // eslint config
  {
    files: ['**/*.ts'],
    rules: {
      'object-shorthand': ['error', 'always', { avoidQuotes: true }]
    }
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // eslint-plugin-simple-import-sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // eslint-plugin-unused-imports
      'unused-imports/no-unused-imports': 'error',
    }
  },

  // typescript-eslint config
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['parameter'],
          format: ['camelCase'],
          "leadingUnderscore": "allow"
        },
        {
          selector: ['interface'],
          format: ['PascalCase'],
          prefix: ['I']
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
          prefix:['T']
        },
        {
          selector: ['class'],
          format: ['PascalCase']
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
    }
  },

  // api file config
  {
    files: ['**/*.api.ts '],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['class'],
          format: ['PascalCase'],
          suffix: ['API']
        },
        {
          selector: ['classMethod'],
          format: ['camelCase']
        }
      ]
    }
  },

  // service file config
  {
    files: ['**/*.service.ts '],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['class'],
          format: ['PascalCase'],
          suffix: ['SERVICE']
        },
        {
          selector: 'classMethod',
          format: ['camelCase']
        }
      ]
    }
  },

  // angular ts config
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/no-input-rename': 'off'
    }
  },

  // angular html config
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended
    ],
    rules: {
      '@angular-eslint/template/no-negated-async': 'off',
      '@angular-eslint/template/attributes-order':'error',
    }
  },

  // ngrx config
  {
    files: ['**/*.ts'],
    extends: [...ngrx.configs.all]
  }
);
