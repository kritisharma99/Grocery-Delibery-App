export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          gilroy: ['"Gilroy"', 'sans-serif'],
        },
        colors: {
          primary: {
            DEFAULT: '#53b175',
            hover:   '#49a06a',
          },
          surface:  '#f5f5f5',
          'text-base': '#181725',
        },
        borderRadius: {
          pill: '18px',
          'card': '12px',
        },
        height: {
          btn: '67px',
        },
        boxShadow: {
          sheet: '0 -4px 24px rgba(0,0,0,0.12)',
          card:  '0 2px 12px rgba(0,0,0,0.06)',
        },
      },
    },
  }