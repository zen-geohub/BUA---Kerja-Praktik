export const basemapButton = $('#basemapButton')
export const basemapSidebar = $('#basemapSidebar')
export const layerButton = $('#layerButton')
export const layerControl = $('#layerControl')
export const homeButton = $('#homeButton')
export const infobar = $('#infobar')

export function resetClass(button, sidebar) {
  button.removeClass('w-full');
  button.addClass('hover:bg-gray-400 rounded-md')
  sidebar.hasClass('translate-x-[-200px]') ? undefined : sidebar.addClass('translate-x-[-200px]').removeClass('left-[62px]')
}

export function toggleClass(button, sidebar) {
  button.toggleClass('w-full')
  button.hasClass('hover:bg-gray-400 rounded-md') ? button.removeClass('hover:bg-gray-400 rounded-md') : button.addClass('hover:bg-gray-400 rounded-md')
  sidebar.hasClass('translate-x-[-200px]') ? sidebar.removeClass('translate-x-[-200px]').addClass('left-[62px]') : sidebar.removeClass('left-[62px]').addClass('translate-x-[-200px]')
}

export function toggleInfobar(legend, sidebar) {
  legend.hasClass('translate-x-[400px]') && legend.removeClass('translate-x-[400px]')
  sidebar.hasClass('translate-x-[300px]') && sidebar.removeClass('translate-x-[300px]')
}