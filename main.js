// Инициализация карты Яндекс
async function initMap() {
  // Ждем загрузки компонентов API
  await ymaps3.ready

  const { YMap, YMapDefaultSchemeLayer } = ymaps3

  // Инициализируем карту
  const map = new YMap(document.getElementById("map"), {
    location: {
      // Координаты центра карты
      center: [37.588144, 55.733842],
      // Уровень масштабирования
      zoom: 10,
    },
  })

  // Добавляем слой схематической карты
  map.addChild(new YMapDefaultSchemeLayer())
}

// Вызываем функцию после загрузки DOM
document.addEventListener("DOMContentLoaded", initMap)
