import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Button = styled.button`
  display: flex;
  flex: 1;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  border-radius: 8px;
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  min-height: 56px;
  text-align: center;
  border-radius: 4px;
  margin: 10px;
  font-family: Poppins;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  ${({ theme }) => css`
    color: ${theme.color.white[100]};
    background: ${theme.color.blue[300]};
    border-color: ${theme.color.blue[300]};
  `}
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: block;
    width: 100%;
  }
`
