import styled from '@emotion/styled'

export const Map = styled.div`
  height: 100%;
  width: 100vw;
  position: relative;
  .mapboxgl-ctrl-geocoder--input {
    font-family: Poppins, sans-serif;
  }
  .mapboxgl-ctrl-geocoder {
    margin-right: 10px;
    box-sizing: border-box;
  }

  .mapboxgl-ctrl-top-left {
    right: 0;
    padding-right: 20px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`
