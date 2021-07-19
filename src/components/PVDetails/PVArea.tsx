import styled from '@emotion/styled'
import { FC } from 'react'

interface PVAreaProps {
  className?: string
  area: number
  kW: number
}

const PVArea: FC<PVAreaProps> = ({ className, area, kW }) => {
  return (
    <div className={className}>
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
    </div>
  )
}

export default styled(PVArea)`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  background: #f2f2f2;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin-bottom: 16px;

  > div {
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
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
`
