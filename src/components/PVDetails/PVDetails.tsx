import styled from '@emotion/styled'
import { FC } from 'react'
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
  const formik = useFormik({
    initialValues: {
      tilt: 0,
      orientation: 0,
      arrayType: ArrayType.FixedOpenRack,
      installType: InstallType.Residential,
      moduleType: ModuleType.Standard,
    },
    onSubmit: (e) => {
      console.log(e)
    },
  })

  return (
    <Container className={className}>
      <header>
        <span>
          <FiZap />
          <h3>PV Details</h3>
          <FiX />
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
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  margin-right: 10px;
  width: 100%;
  max-width: 375px;
  min-height: 100px;
  background: white;
  z-index: 10000000000; /** always on top */
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
  border-radius: 5px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    margin-top: 68px;
    bottom: 10px;
    right: 0;
    width: unset;
    position: fixed;
  }

  /** Upper */
  > header {
    padding: 32px;
    padding-top: 24px;
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
  > header span svg:nth-last-of-type(1) {
    margin-left: auto;
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
    color: #7b8185;
  }
`
