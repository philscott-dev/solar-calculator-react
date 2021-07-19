# solar-calculator-react
A calculator for displaying nominal power of a given space

<br />

## Instructions

Create a `.env.local` file and add your API keys
```
// .env.local

NEXT_PUBLIC_MAPBOX_API_KEY=<YOUR_KEY>
NEXT_PUBLIC_NREL_API_KEY=<YOUR_KEY>
```
**Start The App**
```
npm run dev

or

npm run build
npm start
```

**Run Tests**
```
npm run test
```

<br />

## Assumptions
```
/**
 * Average Residential Panels
 *
 * Dimensions: 65 x 39 inches
 * Area: 62.4078 meters squared
 * Watts: 300w
 */
 ```

 <br />

## Notes

**Avg solar panel size**

https://news.energysage.com/average-solar-panel-size-weight/
```
- Residential - 65 x 39 inches (62.4078 area - meters squared)
  - 1651mm x 990.6mm
- Commerical - 78 x 39 inches (77.2668 area - meters squared)
  - 1981.2mm x 990.6mm
```

**Watts per panel**

https://us.sunpower.com/how-many-solar-panels-do-you-need-panel-size-and-output-factors

```
"Conventional solar panels usually produce about 250-300 watts per panel"
```
**Average usage** 

https://www.solarreviews.com/blog/10kw-solar-systems-are-becoming-very-popular-here-is-why
https://www.eia.gov/tools/faqs/faq.php?id=97&t=3
```
"In 2019, the average annual electricity consumption for a U.S. residential utility customer was 10,649 kilowatthours (kWh), an average of about 877 kWh per month."
```

**Losses (percent)**

https://palmetto.com/learning-center/blog/solar-inverter-guide-types-benefits-cost-how-solar-inverters-work
```
"Conversion efficiency varies by brand, but most quality inverters are around 97% to 99% efficient"
- defaulting to 2%
```