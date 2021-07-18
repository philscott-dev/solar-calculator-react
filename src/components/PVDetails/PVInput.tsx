import styled from '@emotion/styled'
import { ChangeEvent } from 'react'
import { FC } from 'react'

interface PVInputProps {
  className?: string
  name: string
  label: string
  value: number
  id: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PVInput: FC<PVInputProps> = ({
  className,
  onChange,
  value,
  name,
  label,
  id,
}) => {
  return (
    <div className={className}>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        min="0"
        max="90"
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default styled(PVInput)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 24px;

  > input {
    flex: 1;
    display: block;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
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
