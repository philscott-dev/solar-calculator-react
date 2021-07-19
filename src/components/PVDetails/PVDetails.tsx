import styled from '@emotion/styled'
import { FC, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { FiX, FiZap } from 'react-icons/fi'
import PVSelect from './PVSelect'
import PVInput from './PVInput'
import PVRow from './PVRow'
import PVOutput from './PVOutput'
import { ArrayType } from 'enums/ArrayType'
import { InstallType } from 'enums/InstallType'
import { ModuleType } from 'enums/ModuleType'
import { useEffect } from 'react'
import { Button } from 'components/Button'
import { getPVWatts } from 'services'
import PVArea from './PVArea'
import { calculateNominalPower } from 'helpers/power'

interface PVDetailsProps {
  className?: string
  area: number
  latitude: number
  longitude: number
}

export const PVDetails: FC<PVDetailsProps> = ({
  className,
  area,
  longitude,
  latitude,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [annualProduction, setAnnualProduction] = useState(0)
  const nominalPower = useMemo(() => calculateNominalPower(area) || 0, [area])

  const formik = useFormik({
    initialValues: {
      tilt: 0,
      orientation: 0,
      area,
      arrayType: ArrayType.FixedOpenRack,
      installType: InstallType.Residential,
      moduleType: ModuleType.Standard,
    },
    validate: (values) => {
      let errors = {}
      /**
       * Tilt Validators
       */
      if (values.tilt < 0) {
        errors = { ...errors, tilt: 'Must be 0 or more' }
      } else if (values.tilt > 90) {
        errors = { ...errors, tilt: 'Must be 90 or less' }
      }

      /**
       * Orientation Validators
       */
      if (values.orientation < 0) {
        errors = {
          ...errors,
          orientation: 'Must be 0 or more',
        }
      } else if (values.orientation >= 360) {
        errors = { ...errors, orientation: 'Must be less than 360' }
      }

      /**
       * Area Validators
       */

      if (values.area <= 0) {
        errors = {
          ...errors,
          area: 'Please use the polygon tool to create an installation.',
        }
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const res = await getPVWatts({
          tilt: values.tilt,
          azimuth: values.orientation,
          array_type: values.arrayType,
          module_type: values.moduleType,
          lat: latitude,
          lon: longitude,
          system_capacity: nominalPower,
        })
        setAnnualProduction(res.data.outputs.ac_annual)
      } catch (err) {
        console.log(err)
      }
    },
  })

  useEffect(() => {
    formik.setFieldValue('area', area, true)
  }, [area]) // eslint-disable-line

  const handleToggleVisibilty = () => {
    setIsVisible(!isVisible)
  }

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
            <PVOutput
              label={'Annual Production'}
              value={annualProduction}
              units={'kWac'}
            />
          </div>
          <PVArea area={area} kW={nominalPower} />
        </header>

        <section>
          <form onSubmit={formik.handleSubmit}>
            <PVRow>
              <PVInput
                name="tilt"
                id="tilt-input"
                label="Tilt"
                error={formik.errors.tilt}
                value={formik.values.tilt}
                onChange={formik.handleChange}
              />

              <PVInput
                name="orientation"
                id="orientation-input"
                label="Orientation"
                error={formik.errors.orientation}
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
            <PVRow>
              <Button type="submit">Calculate Production</Button>
            </PVRow>
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
  bottom: 10px;
  width: 100%;
  max-width: 375px;
  min-height: 100px;
  margin-right: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    right: unset;
    left: 10px;
  }

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

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
      top: unset;
      bottom: 0px;
      left: 0;
    }
  }

  /** Card */
  > div {
    position: absolute;
    right: 0;
    top: 0;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    background: white;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
    border-radius: 5px;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
      top: unset;
      bottom: 0;
      left: 0;
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
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 24px;
    }

    /* Collapsable bar */
    > header span {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
    }

    /** PVOutput container */
    > header div {
      display: flex;
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
  }
`
