import styled from '@emotion/styled'
import { FC } from 'react'

interface PVOutputProps {
  className?: string
  value: number
  label: string
  units: string
}

const PVOutput: FC<PVOutputProps> = ({ className, value, label, units }) => {
  return (
    <div className={className}>
      <div>
        <h2>
          {value.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </h2>
        <p>{units}</p>
      </div>
      <label>{label}</label>
    </div>
  )
}

export default styled(PVOutput)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  > div {
    display: flex;
    justify-content: center;
  }
  > div h2 {
    font-size: 32px;
    font-weight: 600;
    line-height: 32px;
    margin: 0px 0px;
  }

  > div p {
    font-size: 12px;
    margin-left: 2px;
  }

  > label {
    display: flex;
    font-weight: normal;
    font-size: 12px;
    line-height: 21px;
    text-align: center;
    justify-content: center;
    margin: 0px 0px;
    color: ${({ theme }) => theme.color.gray[300]};
  }
`
