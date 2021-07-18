import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { useFormik } from 'formik'
import { FiX, FiZap } from 'react-icons/fi'
import PVSelect from './PVSelect'
import PVInput from './PVInput'
import PVRow from './PVRow'
import { ArrayType } from 'enums/ArrayType'
import { InstallType } from 'enums/InstallType'
import { ModuleType } from 'enums/ModuleType'

interface PVDetailsProps {
  className?: string
  area: number
}

export const PVDetails: FC<PVDetailsProps> = ({ className, area }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleVisibilty = () => {
    setIsVisible(!isVisible)
  }
  const formik = useFormik({
    initialValues: {
      tilt: 0,
      orientation: 0,
      arrayType: ArrayType.FixedOpenRack,
      installType: InstallType.Residential,
      moduleType: ModuleType.Standard,
    },
    validate: (values) => {
      console.log(values)
      let errors = {}
      if (values.tilt < 0) {
        errors = { ...errors, tilt: 'Must be 0 or more' }
      } else if (values.tilt > 90) {
        errors = { ...errors, tilt: 'Must be 90 or less' }
      }

      if (values.orientation < 0) {
        errors = {
          ...errors,
          orientation: 'Must be 0 or more',
        }
      } else if (values.orientation >= 360) {
        errors = { ...errors, orientation: 'Must be less than 360' }
      }
      console.log(errors)
      return errors
    },
    onSubmit: (e) => {
      console.log(e)
    },
  })

  console.log(formik.errors)

  return (
    <Container className={className} isVisible={isVisible}>
      <button onMouseDown={handleToggleVisibilty}>
        <FiZap />
      </button>
      <div>
        <header>
          <span>
            <FiZap />
            <h3>PV Details</h3>
            <button onMouseDown={handleToggleVisibilty}>
              <FiX />
            </button>
          </span>
          <div>
            <h2>6000</h2>
            <label>Annual Production</label>
          </div>
        </header>
        <section>
          <form onSubmit={formik.handleSubmit}>
            <PVRow>
              <PVInput
                name="tilt"
                id="tilt-input"
                label="Tilt"
                value={formik.values.tilt}
                onChange={formik.handleChange}
              />

              <PVInput
                name="orientation"
                id="orientation-input"
                label="Orientation"
                value={formik.values.orientation}
                onChange={formik.handleChange}
              />
            </PVRow>
            <PVSelect
              name="arrayType"
              id="arrayType"
              label="Array Type"
              value={formik.values.arrayType}
              onChange={formik.handleChange}
            >
              <option value={ArrayType.FixedOpenRack}>Fixed - Open Rack</option>
              <option value={ArrayType.FixedRoofMouned}>
                Fixed - Roof Mounted
              </option>
              <option value={ArrayType.OneAxis}>1-Axis</option>
              <option value={ArrayType.OneAxisBacktracking}>
                1-Axis Backtracking
              </option>
              <option value={ArrayType.TwoAxis}>2-Axis</option>
            </PVSelect>
            <PVSelect
              name="installType"
              id="installType"
              label="Install Type"
              value={formik.values.installType}
              onChange={formik.handleChange}
            >
              <option value={InstallType.Residential}>Residential</option>
              <option value={InstallType.Commercial}>Commercial</option>
            </PVSelect>
            <PVSelect
              name="moduleType"
              id="moduleType"
              label="Module Type"
              value={formik.values.moduleType}
              onChange={formik.handleChange}
            >
              <option value={ModuleType.Standard}>Standard</option>
              <option value={ModuleType.Premium}>Premium</option>
              <option value={ModuleType.ThinFilm}>Thin Film</option>
            </PVSelect>
          </form>
        </section>
      </div>
    </Container>
  )
}

const Container = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 100%;
  max-width: 375px;
  min-height: 100px;
  margin-right: 10px;

  /** Button */
  > button {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 29px;
    height: 29px;
    border-radius: 4px;
    font-size: 17px;
    border: 1px solid ${({ theme }) => theme.color.gray[100]};
    background: ${({ theme }) => theme.color.white[100]};
    cursor: pointer;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
    &:hover {
      background: #efefef;
    }
  }

  /** Card */
  > div {
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    background: white;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
    border-radius: 5px;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
      top: unset;
      bottom: 10px;
      right: 0;
      width: unset;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
      margin-top: 68px;
      bottom: 10px;
      right: 0;
      width: unset;
    }

    /** Upper */
    > header {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 4px;
      padding-bottom: 32px;
    }

    /* Collapsable bar */
    > header span {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
    }

    /** PV Details text */
    > header span h3 {
      font-weight: bold;
      font-size: 16px;
      margin: 0;
      margin-left: 8px;
    }
    /** PV Details text */
    > header span button {
      margin-left: auto;
      display: flex;
      border: 0;
      background: transparent;
      > svg {
        font-size: 16px;
        cursor: pointer;
      }
      &:hover {
        > svg {
          color: ${({ theme }) => theme.color.gray[300]};
        }
      }
    }

    > header div h2 {
      font-weight: 600;
      font-size: 48px;
      line-height: 72px;
      text-align: center;
      margin: 0px 0px;
      > sup {
        font-size: 14px;
      }
    }

    > header div label {
      display: flex;
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      justify-content: center;
      margin: 0px 0px;
      color: ${({ theme }) => theme.color.gray[300]};
    }
  }
`
