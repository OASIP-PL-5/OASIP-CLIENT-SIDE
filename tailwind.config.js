module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          body:['Sarabun']
      }
    },
    variants:{
      extend:{
        display: ['group-hover'],
      }
    }
  },
  plugins: [],
}
