import { toggleInfobar } from "./page.js";
import { myChart, myChart1, builtUpValues, buaData, userBua,  cityLabel} from "./chart.js";

export const map = new maplibregl.Map({
  style: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`,
  center: [106.82332586843613, -6.201378567088408],
  zoom: 8.45,
  container: `map`
})

// map.showTileBoundaries = true
// map.showLayers2DWireframe = true;


// export let buaData = []
let layerOrder = []
let layerOutlineOrder = []


// const getOutline = async () => {
//   const response = await fetch('http://localhost:3010/api/KP/getBoundaries', {
//     method: 'GET',
//   })
//   const data = await response.json()
//   return data
// }
// const boundaries = await getOutline()
// boundaries.forEach(feature => {
//   const { geometry, properties } = feature.buaoutline
//   buaData.push({ geometry, properties })
// })

export function getBua() {
  if (!map.getSource('buaGrid') && !map.getSource('buaData')) {
    map.addSource('buaGrid', {
      type: 'vector',
      scheme: 'tms',
      tiles: [`http://localhost:8080/geoserver/gwc/service/tms/1.0.0/BVT:buaGrid@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]
    })
    map.addSource('buaData', {
      type: 'vector',
      scheme: 'tms',
      tiles: [`http://localhost:8080/geoserver/gwc/service/tms/1.0.0/BVT:buaData@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]
    })
  }
  if (!map.getSource('boundaries')) {
    map.addSource('boundaries', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: buaData
      }
    })
  }

  map.getLayer(layerOrder[0]) && map.removeLayer(layerOrder[0]) && layerOrder.pop()
  map.getLayer(layerOutlineOrder[0]) && map.removeLayer(layerOutlineOrder[0]) && layerOutlineOrder.pop()
  addBua()
  layerOrder.push(`${userBua}`)
  layerOutlineOrder.push(`${userBua}Data`)

  map.on('click', `${userBua}`, (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties[`${userBua}`];

    new maplibregl.Popup()
      .setLngLat([coordinates[0][0][0] + 0.0025, coordinates[0][0][1] - 0.0025])
      .setHTML(
        `<p style="text-align: center"><strong>Built-Up Index</strong><br>${description}%</p>`
      )
      .addTo(map);
  });
}

function addBua() {
  if (!map.getLayer(`${userBua}`)) {
    map.addLayer({
      'id': `${userBua}`,
      'type': 'fill',
      'source': 'buaGrid',
      'source-layer': `buaGrid`,
      'minzoom': 8.5,
      'paint': {
        'fill-color': {
          'property': `${userBua}`,
          'type': 'interval',
          'stops': [
            [0, '#F2FFFF'],
            [5, '#C6E3EC'],
            [33, '#9CC8DC'],
            [50, '#76ACCE'],
            [67, '#5590C0'],
            [83, '#3A73B0'],
            [100, '#2A569E']
          ]
        },
        'fill-opacity': 0.8,
        'fill-outline-color': 'white'
      },
    })
  }
  if (!map.getLayer(`${userBua}Data`)) {
    map.addLayer({
      'id': `${userBua}Data`,
      'type': 'fill',
      'source': 'buaData',
      'source-layer': `buaData`,
      'maxzoom': 8.5,
      'paint': {
        'fill-color': {
          'property': `${userBua}`,
          'type': 'interval',
          'stops': [
            [0, '#F2FFFF'],
            [5, '#C6E3EC'],
            [33, '#9CC8DC'],
            [50, '#76ACCE'],
            [67, '#5590C0'],
            [83, '#3A73B0'],
            [100, '#2A569E']
          ]
        },
        'fill-opacity': 0.8,
        'fill-outline-color': 'white'
      },
    })
  }
  if (!map.getLayer('boundaries')) {
    map.addLayer({
      id: 'boundaries',
      type: 'line',
      source: 'boundaries',
      // minzoom: 10.5,
      // layout: {
      //   'line-join': 'round',
      //   'line-cap': 'round'
      // },
      paint: {
        'line-color': 'white',
        'line-width': 1.5
        // "fill-color": 'red'
      }
    })
  }

}

export function resetBua() {
  if (map.getLayer(`${userBua}`) && map.getLayer(`${userBua}Data`) && map.getLayer('boundaries')) {
    map.removeLayer(`${userBua}`)
    map.removeLayer(`${userBua}Data`)
    map.removeLayer('boundaries')
  }
  myChart.config.data.datasets[0].data = builtUpValues
  myChart.config.data.datasets[0].label = `BUA Index (%)`
  myChart.update()

  const yearBua = userBua.substring(4)
  myChart1.config.data.labels = cityLabel
  myChart1.config.data.datasets[0].data = []
  myChart1.config.data.datasets[0].label = `BUA Index/City (${yearBua})`
  myChart1.update()
  
  $('#mapLegend').addClass('translate-x-[400px]')
  $('#mapInformation').addClass('translate-x-[300px]')

  $('#inputStart').val('')
  $('#inputEnd').val('')
}

export const basemapList = $('#basemapList').find('input');
// console.log($('.default'));
export function basemapSwitch() {
  for (const input of basemapList) {
    input.onclick = (layer) => {
      const layerId = layer.target.id;
      map.setStyle(`https://basemaps.cartocdn.com/gl/${layerId}/style.json`);
    };
  }
}

const size = 200

export const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // get rendering context for the map canvas when layer is added to the map
  onAdd() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },

  // called once before every frame where the icon will be used
  render() {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      outerRadius,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.data = context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;

    // continuously repaint the map, resulting in the smooth animation of the dot
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  }
};