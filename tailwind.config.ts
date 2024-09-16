import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

export default {
  content : [ './src/**/*.{html,ts}', ],
  theme   : {
    extend: {
      colors: {
        'pink-primary'     : '#de89ea',
        'pink-secondary'   : '#f3dff5',
        'green-primary'    : '#46bd83',
        'green-secondary'  : '#d5ede2',
        'blue-primary'     : '#07a0f7',
        'blue-secondary'   : '#ceecfd',
        'red-primary'      : '#f44336',
        'red-secondary'    : '#ffcdd2',
        'yellow-primary'   : '#ffeb3b',
        'yellow-secondary' : '#fff9c4',
        'purple-primary'   : '#9c27b0',
        'purple-secondary' : '#e1bee7',
        'orange-primary'   : '#ff9800',
        'orange-secondary' : '#ffe0b2',
        'teal-primary'     : '#009688',
        'teal-secondary'   : '#b2dfdb',
        'gray-primary'     : '#9e9e9e',
        'gray-secondary'   : '#e0e0e0'
      }
    },
  },
  plugins: [
    plugin(function({ addBase , theme  }) {
      addBase({
        h1 : { fontSize: theme('fontSize.4xl') },
        h2 : { fontSize: theme('fontSize.3xl') },
        h3 : { fontSize: theme('fontSize.2xl') },
        h4 : { fontSize: theme('fontSize.xl') },
      })
    })
  ],
} satisfies Config

