import styled from '@emotion/styled'
import { useMemo } from 'react'
import { FC } from 'react'
import { FaVectorSquare } from 'react-icons/fa'

interface PVAreaProps {
  className?: string
  area: number
  kW: number
  error?: string
}

export const PVArea: FC<PVAreaProps> = ({ className, area, kW, error }) => {
  const segments = useMemo(() => (error ? error.split('[') : null), [error])
  return (
    <Container className={className} isError={error?.length > 0}>
      {error ? (
        <small>
          {segments[0]} [ <FaVectorSquare /> {segments[1]}
        </small>
      ) : null}
      <div>
        <label>Nominal Power:</label>
        <div>
          <p>
            {kW.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            kW
          </p>
        </div>
      </div>
      <div>
        <label>Installation Area:</label>
        <div>
          <p>
            {area} m<sup>2</sup>
          </p>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  background: #f2f2f2;
  border: 1px solid
    ${({ isError, theme }) => (isError ? theme.color.red[300] : '#dbdbdb')};
  border-radius: 4px;
  margin-bottom: 16px;

  > div {
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
  }

  > div label {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    margin: 0;
    padding: 0;
  }
  > div div p,
  div div p sup {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    margin: 0;
    padding: 0;
  }

  /** Error Text */
  > small {
    color: ${({ theme }) => theme.color.red[300]};
    font-size: 13px;
    margin-bottom: 8px;
    font-weight: 400;
  }

  > small svg {
    height: 12px;
    width: 12px;
    margin-bottom: -1.5px;
  }
`
