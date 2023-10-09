/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      s1: "100px",
      "s1.5": "150px",
      s2: "200px",
      "s2.5": "250px",
      s3: "300px",
      "s3.5": "350px",
      s4: "400px",
      "s4.5": "450px",
      s5: "500px",
      "s5.5": "550px",
      s6: "600px",
      "s6.5": "650px",
      s7: "700px",
      "s7.5": "750px",
      s8: "800px",
      "s8.5": "850px",
      s9: "900px",
      "s9.5": "950px",
      s10: "1000px",
      "s10.5": "1050px",
      s11: "1100px",
      "s11.5": "1150px",
      s12: "1200px",
      "s12.5": "1250px",
      s13: "1300px",
      "s13.5": "1350px",
      s14: "1400px",
      "s14.5": "1450px",
      s15: "1500px",
      "s15.5": "1550px",
      s16: "1600px"
    },
    extend:
    {
      fontFamily: {
        'googlefont':['Noto Sans','sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
        'chirp': ['TwitterChirp', 'sans-serif'],
        'twitterchirp': ['TwitterChirps', 'sans-serif'],
        'chirpextended': ['TwitterChirpExtendedHeavy', 'sans-serif'],
      },
      backgroundColor: ['dim'],  // Add other utilities like textColor, borderColor, etc. as needed
      textColor: ['dim'],
    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('dim', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dim .${e(`dim${separator}${className}`)}`
        });
      });
    },
  ],
}

