/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light_body_bg: '#f7f8f9',
        light_surface_bg: ' #ffffff',
        light_text_primary: ' #091e42',
        light_text_secondary: ' #626f86',
        light_text_inverse: '#f1f2f4',
        light_light_special: '#ed27e0',
        light_border_color: '#f1f2f3',
        light_profile_bg: '#76abfa',

        dark_body_bg: '#292928',
        dark_surface_bg: ' #2f2b3a',
        dark_text_primary: 'white',
        dark_text_secondary: '#908d96',
        dark_text_inverse: '#303030',
        dark_light_special: '#ed27e0',
        dark_border_color: '#6fa8fd',
        dark_profile_bg: '#6fa8fd',
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],
}
