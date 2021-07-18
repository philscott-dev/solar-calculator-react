import styled from '@emotion/styled'
import { ChangeEvent } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FC } from 'react'

interface PVSelectProps {
  className?: string
  name: string
  label: string
  value: number
  id: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const PVSelect: FC<PVSelectProps> = ({
  className,
  onChange,
  value,
  name,
  label,
  id,
  children,
}) => {
  return (
    <div className={className}>
      <FiChevronDown />
      <select id={id} name={name} value={value} onChange={onChange}>
        {children}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default styled(PVSelect)`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.color.gray[100]};

  > svg {
    position: absolute;
    right: 24px;
    top: 20px;
    z-index: 1;
  }

  > select {
    -webkit-appearance: none;
    flex: 1;
    padding: 0;
    margin: 0;
    border: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    background-clip: padding-box;
    background: transparent;
    box-sizing: border-box;
    z-index: 2;
    cursor: pointer;
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
