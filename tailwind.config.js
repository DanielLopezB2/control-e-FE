/** @type {import('tailwindcss').Config} */

import animations from '@midudev/tailwind-animations'

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms'),
    animations
  ],
}

