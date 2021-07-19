import styled from '@emotion/styled'

export const IconButton = styled.button`
  margin: 0;
  width: 29px;
  height: 29px;
  min-width: 29px;
  min-height: 29px;
  border-radius: 4px;
  font-size: 17px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  background: ${({ theme }) => theme.color.white[100]};
  cursor: pointer;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #efefef;
  }

  > svg {
    min-height: 16px;
    min-width: 16px;
    font-size: 16px;
  }
`
