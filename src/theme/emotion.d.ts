import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      black: {
        700: string
      }
      gray: {
        300: string
        100: string
      }
      white: {
        100: string
      }
      red: {
        300: string
      }
      blue: {
        200: string
        300: string
      }
    }
    font: {
      size: {
        h1: string
        h2: string
        h3: string
        h4: string
        h5: string
        h6: string
        large: string
        medium: string
        small: string
        xsmall: string
      }
    }
    breakpoint: {
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
    }
    nav: {
      padding: {
        xlarge: string
        large: string
        medium: string
        small: string
        xsmall: string
      }
    }
  }
}
