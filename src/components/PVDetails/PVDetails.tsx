import styled from '@emotion/styled'
import { FC, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { FiX, FiZap } from 'react-icons/fi'
import PVInput from './PVInput'
import PVRow from './PVRow'
import PVOutput from './PVOutput'
import { ArrayType } from 'enums/ArrayType'
import { ModuleType } from 'enums/ModuleType'
import { Button, IconButton } from 'components'
import { getPVWatts } from 'services'
import { PVArea } from './PVArea'
import { calculateNominalPower } from 'helpers/power'
import { validateArea, validateOrientation, validateTilt } from 'validators'
import { ApiStatus } from 'enums/ApiStatus'
import { useEffect } from 'react'

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
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.Default)

  // memoize calculation of nominal power
  const nominalPower = useMemo(() => calculateNominalPower(area) || 0, [area])

  // handle polygon tool area changes
  useEffect(() => {
    if (area > 0) {
      // Revalidate on area update
      formik.validateForm()
    } else {
      // Reset annual poduction
      setAnnualProduction(0)
    }
  }, [area]) //eslint-disable-line

  // useFormik hook for form validation
  const formik = useFormik({
    initialValues: {
      tilt: 0,
      orientation: 0,
      area,
    },
    // validate the form fields
    validate: (values) => {
      let errors = {}
      errors = validateTilt({ value: values.tilt, errors })
      errors = validateOrientation({ value: values.orientation, errors })
      errors = validateArea({ value: area, errors })
      return errors
    },
    validateOnBlur: true,
    validateOnMount: false,
    validateOnChange: true,
    // handle form submit
    onSubmit: async (values) => {
      try {
        // set loadin and error bools
        setApiStatus(ApiStatus.Loading)
        // execute the query to NERL
        const { data } = await getPVWatts({
          tilt: values.tilt,
          azimuth: values.orientation,
          lat: latitude,
          lon: longitude,
          array_type: ArrayType.FixedOpenRack,
          module_type: ModuleType.Premium,
          system_capacity: nominalPower,
        })
        // reset loading state
        setApiStatus(ApiStatus.Default)
        // set display for annual production
        setAnnualProduction(data.outputs.ac_annual)
      } catch (err) {
        // handle errors
        console.log(err)
        setApiStatus(ApiStatus.Error)
      }
    },
  })

  // handle show/hide for PV Detail Card
  const handleToggleVisibilty = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Container className={className} isVisible={isVisible}>
      <IconButton onMouseDown={handleToggleVisibilty}>
        <FiZap />
      </IconButton>
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
              apiStatus={apiStatus}
            />
          </div>
          <PVArea area={area} kW={nominalPower} error={formik.errors.area} />
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
  /** Outter Container */
  position: absolute;
  pointer-events: none;
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

  /** Card */
  > div {
    pointer-events: all;
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
      margin-right: 20px;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
      margin-top: 68px;
      bottom: -5px;
      right: 0;
      width: unset;
    }

    /** Upper Header */
    > header {
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 24px;
    }

    /* title bar*/
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
    /** X Button */
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

  /** IconButton */
  > button {
    pointer-events: all;
    position: absolute;
    right: 0;
    top: 0;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
      top: unset;
      bottom: 0px;
      left: 0;
    }
  }
`
