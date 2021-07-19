import styled from '@emotion/styled'

export const IconButton = styled.button`
  display: flex;
  flex-grow: 0;
  align-items: center;
  margin: 0;
  min-width: 29px;
  min-height: 29px;
  max-width: 122px;
  box-sizing: content-box;
  border-radius: 4px;
  font-size: 17px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  background: ${({ theme }) => theme.color.white[100]};
  cursor: pointer;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
  font-weight: bold;
  font-size: 16px;

  padding-right: 10px;
  &:hover {
    background: #efefef;
  }

  > svg {
    min-height: 16px;
    min-width: 16px;
    font-size: 16px;
    margin-right: 6px;
  }
`
