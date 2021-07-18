# solar-calculator-react
A calculator for displaying nominal power of a given space



## Notes

Avg solar panel size

https://news.energysage.com/average-solar-panel-size-weight/

- Residential - 65 x 39 inches (62.4078 area - meters squared)
- Commerical - 78 x 39 inches (77.2668 area - meters squared)

Average usage 

https://www.solarreviews.com/blog/10kw-solar-systems-are-becoming-very-popular-here-is-why
https://www.eia.gov/tools/faqs/faq.php?id=97&t=3

"In 2019, the average annual electricity consumption for a U.S. residential utility customer was 10,649 kilowatthours (kWh), an average of about 877 kWh per month."
<br />
<br />

## API 

system_capacity (kW)
- 5
- 7.5
- 10

module_type
- 0	Standard
- 1	Premium
- 2	Thin film

losses (percent)

https://palmetto.com/learning-center/blog/solar-inverter-guide-types-benefits-cost-how-solar-inverters-work

"Conversion efficiency varies by brand, but most quality inverters are around 97% to 99% efficient"
- defaulting to 2%

array_type
- 0	Fixed - Open Rack
- 1	Fixed - Roof Mounted
- 2	1-Axis
- 3	1-Axis Backtracking
- 4	2-Axis

tilt (degrees 0 - 90)
- user input

azimuth (orientation - min: 0; max: < 360) 
- user input
  
address
- user input

gcr
- (number_of_pv_modules x area_of_each_module) / total_area_of_array

 
