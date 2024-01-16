import {
  toggleClass, resetClass,
  basemapButton, basemapSidebar, layerButton, layerControl, homeButton, infobar, toggleInfobar
} from "../components/page.js";
import { filter, getCity } from "../components/filter.js";
import { map, getBua, resetBua, pulsingDot, basemapList, basemapSwitch } from "../components/map.js";
import { myChart1, cityData, initializeChart, userBua } from "../components/chart.js";
map.on('load', () => {
  $('#applyButton').click(() => {
    if ($('#userBua').val() !== "" || undefined) {
      getBua()

      const yearBua = userBua.substring(4)
      myChart1.config.data.datasets[0].data = cityData
      myChart1.config.data.datasets[0].label = `BUA Index/City (${yearBua})`
      myChart1.update()

      toggleInfobar($('#mapLegend'), $('#mapInformation'))
    } else {
      console.log('heheh');
    }
  })
  $('#resetButton').click(resetBua)

  $('#userCity').on('change', () => {
    if (map.getLayer(`${userBua}`)) {
      getCity()
    } else {
      // $('#userCity').val() = "HEHE"
      console.log('heheh');
      alert('Please choose BUA layer first!')
    }
  })

  $('#applyFilter').click(filter)

  basemapList.on('input', basemapSwitch())
})


basemapButton.click(() => {
  resetClass(layerButton, layerControl);
  toggleClass(basemapButton, basemapSidebar);
});

layerButton.click(() => {
  resetClass(basemapButton, basemapSidebar);
  toggleClass(layerButton, layerControl);
});

function toggleOption(button, option) {
  option.toggleClass('translate-y-[50px] opacity-100')
}