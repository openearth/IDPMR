export default function propertiesToChartData(properties) {
  const data = {
    years: [],
    areas: []
  }

  Object
  .entries(properties)
  .sort((areaA, areaB) => areaA[0].localeCompare(areaB[0]))
  .forEach(([key, value]) => {
    if (key.startsWith('mg') && value) {
      const year = key.split('mg_area')[1]
      data.years.push(year)
      data.areas.push(value)
    }
  })

  return data
}