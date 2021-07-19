import styled from '@emotion/styled'
import { ApiStatus } from 'enums/ApiStatus'
import { FC } from 'react'

interface PVOutputProps {
  className?: string
  value: number
  label: string
  units: string
  apiStatus: ApiStatus
}

const PVOutput: FC<PVOutputProps> = ({
  className,
  value,
  label,
  units,
  apiStatus,
}) => {
  function renderOutput() {
    switch (apiStatus) {
      case ApiStatus.Loading:
        return (
          <div>
            <h2>Calculating</h2>
          </div>
        )
      case ApiStatus.Error:
        return (
          <div>
            <h2>Error</h2>
          </div>
        )
      default:
        return (
          <div>
            <h2>
              {value.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h2>
            <p>{units}</p>
          </div>
        )
    }
  }
  return (
    <div className={className}>
      {renderOutput()}
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
    min-height: 42px;
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
