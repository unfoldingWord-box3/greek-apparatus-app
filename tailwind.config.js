module.exports = {
  purge: ['./pages/**/*.js', './src/components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      menlo: ['Menlo', 'Monaco', 'Lucida Console', 'Courier New', 'monospace'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
