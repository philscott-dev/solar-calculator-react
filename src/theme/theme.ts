import { Theme } from '@emotion/react'

const theme: Theme = {
  color: {
    black: {
      700: '#000000',
    },
    gray: {
      300: '#7b8185',
      100: 'rgba(215, 220, 224, 0.6)',
    },
    white: {
      100: '#FFFFFF',
    },
    red: {
      300: '#ff0000',
    },
    blue: {
      300: '#0094FF',
      200: '#159DFF',
    },
  },
  font: {
    size: {
      h1: '48px',
      h2: '40px',
      h3: '32px',
      h4: '20px',
      h5: '16px',
      h6: '14px',
      large: '18px',
      medium: '16px',
      small: '14px',
      xsmall: '12px',
    },
  },
  breakpoint: {
    xsmall: '475px',
    small: '639px',
    medium: '992px',
    large: '1440px',
    xlarge: '1680px',
  },
  nav: {
    padding: {
      xlarge: '88px',
      large: '88px',
      medium: '48px',
      small: '24px',
      xsmall: '16px',
    },
  },
}

export default theme
