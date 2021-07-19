import styled from '@emotion/styled'
import { ChangeEvent } from 'react'
import { FC } from 'react'
import PVError from './PVError'

interface PVInputProps {
  className?: string
  name: string
  label: string
  value: number
  id: string
  disabled?: boolean
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PVInput: FC<PVInputProps> = ({
  className,
  value,
  name,
  label,
  id,
  disabled = false,
  error,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        type="number"
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>
        {label} {String.fromCharCode(176)}
      </label>
      {error ? <PVError>{error}</PVError> : null}
    </div>
  )
}

export default styled(PVInput)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 24px;
  box-sizing: border-box;

  > input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    &:disabled {
      background: transparent;
    }
  }

  > label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    margin: 2px 0px;
    color: #7d8387;
  }
`
