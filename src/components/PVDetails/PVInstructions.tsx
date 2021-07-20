import styled from '@emotion/styled'
import { FC } from 'react'
import { FaVectorSquare } from 'react-icons/fa'

interface PVInstructionsProps {
  className?: string
}

const PVInstructions: FC<PVInstructionsProps> = ({ className }) => {
  return (
    <header className={className}>
      <h1>Solar Calculator</h1>
      <p>To get started:</p>
      <ul>
        <li>1. Search an address.</li>
        <li>
          2. Use the [ <FaVectorSquare /> Polygon Tool ] to draw a solar
          installation area.
        </li>
        <li>3. Adjust your [Tilt] and [Orientation].</li>
        <li>
          4. Hit "Calculate Production" to see the Annual Production for your
          system
        </li>
      </ul>
    </header>
  )
}

export default styled(PVInstructions)`
  width: 100%;
  padding-right: 16px;
  > h1 {
    margin: 0;
  }
  > p {
    margin: 8px 0;
    font-weight: bold;
  }
  > ul {
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      margin-bottom: 16px;
      font-size: 14px;
    }
  }
`
