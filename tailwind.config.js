const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        spacing: {
            0: '0',
            1: '1px',
            2: '2px',
            4: '4px',
            6: '6px',
            8: '8px',
            10: '10px',
            12: '12px',
            14: '14px',
            16: '16px',
            20: '20px',
            24: '24px',
            28: '28px',
            32: '32px',
            40: '40px',
            48: '48px',
            56: '56px',
            64: '64px',
            80: '80px',
            96: '96px',
            128: '128px',
            256: '256px',
        },
        maxWidth: (theme, { breakpoints }) => ({
            DEFAULT: '840px',
            narrow: '660px',
            none: 'none',
            0: '0px',
            '1/4': '25%',
            '1/3': '33.3%',
            '1/2': '50%',
            '2/3': '66.6%',
            '3/4': '75%',
            full: '100%',
            min: 'min-content',
            max: 'max-content',
            ...breakpoints(theme('screens')),
        }),
        borderRadius: {
            0: '0px',
            2: '2px',
            4: '4px',
            8: '8px',
            16: '16px',
            full: '9999px',
        },
        fontSize: {
            10: ['10px', '14px'],
            12: ['12px', '16px'],
            14: ['14px', '18px'],
            16: ['16px', '22px'],
            18: ['18px', '24px'],
            20: ['20px', '26px'],
            22: ['22px', '28px'],
            28: ['28px', '34px'],
            34: ['34px', '42px'],
        },
        fontWeight: {
            normal: 400,
            bold: 700,
        },
        textColor: {
            white: colors.white,
            slate: colors.slate,
            primary: colors.slate['900'],
            'primary-dark': colors.slate['50'],
            secondary: colors.sky['800'],
            'secondary-dark': colors.sky['200'],
            neutral: colors.slate['500'],
            'neutral-dark': colors.slate['400'],
            warn: colors.red['600'],
        },
        backgroundColor: {
            white: colors.white,
            slate: colors.slate,
            'body-light': colors.slate['50'],
            'body-dark': colors.slate['800'],
            neutral: colors.slate['100'],
            'neutral-dark': colors.slate['600'],
            light: colors.white,
            dark: colors.slate['700'],
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '990px',
        },
    },
    plugins: [],
    darkMode: 'class',
};
