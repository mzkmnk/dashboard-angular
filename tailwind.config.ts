import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

export default {
  content : [ './src/**/*.{html,ts}', ],
  theme   : {
    extend: {},
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

