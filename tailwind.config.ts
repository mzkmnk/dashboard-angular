import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

export default {
  content : [ './src/**/*.{html,ts}', ],
  theme   : {
    extend: {
      colors: {
        'pink-primary'    : '#de89ea',
        'pink-secondary'  : '#f3dff5',
        'green-primary'   : '#46bd83',
        'green-secondary' : '#d5ede2',
        'blue-primary'    : '#07a0f7',
        'blue-secondary'  : '#ceecfd',
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

