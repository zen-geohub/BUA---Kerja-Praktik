// import { buaData } from "./map.js"
import { userCity } from "./filter.js"

// import { userBua } from "./map.js"
export let buaData = []
export let cityLabel = ['Bekasi', 'Bogor', 'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara', 'Kep. Seribu', 'Kota Bekasi', 'Kota Bogor', 'Kota Depok', 'Kota Tangerang', 'Kota Tangerang Selatan', 'Tangerang']
// export let cityLabel = ['B', 'B', 'J', 'J', 'J', 'J', 'J', 'K', 'K', 'K', 'K', 'K','K', 'T']
export let cityData = []

export let userBua
$('#userBua').on('input', (e) => {
  userBua = e.target.value
  return userBua
})

const getOutline = async () => {
  const response = await fetch('http://localhost:3010/api/KP/getBoundaries', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}
const boundaries = await getOutline()
boundaries.forEach(feature => {
  const { geometry, properties } = feature.buaoutline
  buaData.push({ geometry, properties })
})

$('#userBua').on('change', (e) => {
  cityData = []
  buaData.forEach(feature => {
    cityData.push(feature.properties[userBua])
  })
})

const getChartData = async () => {
  const response = await fetch('http://localhost:3010/api/KP/getChartData', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}
const chartData = await getChartData()


const builtUpLabel = ["2018", "2019", "2020", "2021", "2022"]
export const builtUpValues = [
  chartData[0].totalbua_2018,
  chartData[0].totalbua_2019,
  chartData[0].totalbua_2020,
  chartData[0].totalbua_2021,
  chartData[0].totalbua_2022
];
const populationValues = [
  // chartData[0].totalpopulation_2018, 
  // chartData[0].totalpopulation_2019,
  // chartData[0].totalpopulation_2020,
  // chartData[0].totalpopulation_2021,
  // chartData[0].totalpopulation_2022
];

export const initializeChart = ({ chartType, chartCanvas, chartLabel, chartData }) => {
  const chartConfig = {
    type: chartType,
    data: {
      labels: chartLabel,
      datasets:
        chartType === 'line'
          ? [{
            label: `Built-Up Index (%) `,
            data: chartData,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgb(42,86,158)",
            lineTension: 0.4,
            // yAxisID: 'y'
          }]
          : [{
            label: 'Built-Up Index (%)',
            data: chartData,
            backgroundColor: "rgb(42,86,158)",
            // borderColor: "#ff6361",
          }]
      //   // {
      //   //   label: 'Population Value',
      //   //   data: populationValues,
      //   //   backgroundColor: "rgba(0,0,0,0)",
      //   //   borderColor: "#2A569E",
      //   //   lineTension: 0.1,
      //   //   yAxisID: 'y1'
      //   // },
      // ]
    },
    // plugins: [ChartDataLabels],
    options: {
      // indexAxis: chartType === 'line' ? 'y' : 'y',
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 12
            }
          }
        },
        title: {
          display: false,
          text: `Korelasi HEHEHE`
        },

      },
      scales: {
        y: {
          type: 'linear',
          // mirror: true,
          display: true,
          position: 'left',
          // beginAtZero: true,
        },
        x: {
          // display: chartType === 'line' ? true : false,
          
          ticks: {
            font: chartType === 'line' ? null : {
              size: 12
            }
          }
        },
        // animation: chartType === 'line' ? undefined : {
        //   onComplete: function () {
        //     var ctx = this.chart.ctx;
        //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        //     ctx.textAlign = 'left';
        //     ctx.textBaseline = 'bottom';
  
        //     this.data.datasets.forEach(function (dataset) {
        //       for (var i = 0; i < dataset.data.length; i++) {
        //         var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
        //             left = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.left;
        //         ctx.fillStyle = '#444'; // label color
        //         var label = model.label;
        //         ctx.fillText(label, left + 15, model.y + 8);
        //       }
        //     });               
        //   }
        // }
        // y1: {
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        //   grid: {
        //     drawOnChartArea: false,
        //   },
        // }
      }
    },
  };
  const canvas = chartCanvas;
  const myChart = new Chart(canvas, chartConfig);

  return myChart;
}
// export const myChart = initializeChart($('#buaStatistic'), builtUpLabel, builtUpValues)
// export const myChart1 = initializeChart($('#buaChart'), builtUpValues)

export const myChart = initializeChart({
  chartType: 'line',
  chartCanvas: $('#buaStatistic'),
  chartLabel: builtUpLabel,
  chartData: builtUpValues
})

export const myChart1 = initializeChart({
  chartType: 'bar',
  chartCanvas: $('#buaChart'),
  chartLabel: cityLabel,
  chartData: cityData
})