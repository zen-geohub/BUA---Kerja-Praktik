import { map,  } from "./map.js";
import {  userBua } from "./chart.js";
import { myChart, myChart1, cityLabel } from "./chart.js";

export let inputStart;
export let inputEnd;
export let userCity;
let boundariesName

// const userOption = async () => {
//   return new Promise((resolve) => {
//     const userChoice = $('#userCity');

//     userChoice.on('input', (e) => {
//       const userCity = e.target.value;
//       resolve(userCity);
//     });
//   });
// }

$('#userCity').on('change', (e) => {
  userCity = e.target.value
  return userCity
})

export async function getCity() {
  // userCity = await userOption()
  const getBoundariesName = async () => {
    const response = await fetch(`http://localhost:3010/api/KP/getBoundariesName/${userCity}`, {
      method: 'GET',
    })
    const data = await response.json()
    return data
  }
  boundariesName = await getBoundariesName()
  const { geometry, properties } = boundariesName[0].cityoutline

  map.fitBounds([geometry.coordinates[0][0], geometry.coordinates[0][2]], {padding: 50})

  const cityFilter = ['==', ['get', 'nama_kabko'], `${userCity}`];
  map.setFilter(
    `${userBua}`,
    cityFilter
  )
  map.setFilter(
    `${userBua}Data`,
    cityFilter
  )

  myChart.config.data.datasets[0].data = [
    properties.bua_2018,
    properties.bua_2019,
    properties.bua_2020,
    properties.bua_2021,
    properties.bua_2022,
  ]
  myChart.config.data.datasets[0].label = `${userCity} BUA Index (%)`
  myChart.update()

  const getCount = async () => {
    const response = await fetch(`http://localhost:3010/api/KP/getCount${userBua}/${userCity}`, {
      method: 'GET',
    })
    const data = await response.json()
    return data
  }
  const count = await getCount()

  const countLabel = []
  const countValue = []
  count.forEach(item => {
    const {countbua, buainterval} = item
    countLabel.push(buainterval.substring(2))
    countValue.push(countbua)
  })
  myChart1.config.data.datasets[0].data = countValue
  myChart1.config.data.labels = countLabel
  myChart1.config.data.datasets[0].label = `${userCity} Index Count`
  myChart1.update()

  // console.log(cityLabel.find(item => {
  //   return item.toLowerCase() === userCity.toLowerCase()
  // }));
}

export function filter() {
  inputStart = parseFloat($('#inputStart').val());
  inputEnd = parseFloat($('#inputEnd').val());

  const commonFilter = [
    ['>=', ['get', `${userBua}`], inputStart],
    ['<=', ['get', `${userBua}`], inputEnd],
  ];
  const cityFilter = ['==', ['get', 'nama_kabko'], `${userCity}`];

  if (!isNaN(inputStart) && !isNaN(inputEnd)) {
    if (inputStart <= inputEnd) {
      const applyFilters = (layerName) => {
        map.setFilter(
          layerName,
          ['all', ...commonFilter, ...(userCity !== undefined ? [cityFilter] : [])]
        );
        map.setFilter(
          `${layerName}Data`,
          ['all', ...commonFilter, ...(userCity !== undefined ? [cityFilter] : [])]
        );
      };
      applyFilters(`${userBua}`)
    } else {
      alert(`${inputEnd} is not less than equal to ${inputStart}, please input the valid interval!`);
    }
  } else {
    alert('Please enter valid numeric values for the interval.');
  }
}