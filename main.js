// Инициализация карты Яндекс
async function initMap() {
  await ymaps3.ready

  // Регистрируем CDN для пакета с маркером
  ymaps3.import.registerCdn(
    "https://cdn.jsdelivr.net/npm/{package}",
    "@yandex/ymaps3-default-ui-theme@latest"
  )

  // Импортируем пакет с маркером
  const pkg = await ymaps3.import("@yandex/ymaps3-default-ui-theme")
  const { YMapDefaultMarker } = pkg

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3

  // Координаты Омска
  const OMSK_LOCATION = {
    center: [73.368212, 54.988128],
    zoom: 12,
  }

  // Инициализируем карту
  const map = new YMap(document.getElementById("map"), {
    location: OMSK_LOCATION,
  })

  // Создаем модальное окно для Омска
  const modalOmsk = document.createElement("div")
  modalOmsk.innerHTML = `
    <div id="mapModalOmsk" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center">
      <div class="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold mb-4">Омск</h2>
        <div class="mb-4">
          <p class="text-gray-700">Омск — один из крупнейших городов России, расположенный на слиянии рек Иртыш и Омь.</p>
          <p class="text-gray-700 mt-2">Население: более 1.1 млн человек</p>
          <p class="text-gray-700 mt-2">Основан: в 1716 году</p>
        </div>
        <button id="closeModalOmsk" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Закрыть</button>
      </div>
    </div>
  `
  document.body.appendChild(modalOmsk)

  // Создаем модальное окно для цирка
  const modalCircus = document.createElement("div")
  modalCircus.innerHTML = `
    <div id="mapModalCircus" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center">
      <div class="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold mb-4">Омский цирк</h2>
        <div class="mb-4">
          <p class="text-gray-700">Омский государственный цирк - один из крупнейших цирков России.</p>
          <p class="text-gray-700 mt-2">Адрес: проспект Карла Маркса, 43Б</p>
          <p class="text-gray-700 mt-2">Открыт в 1973 году</p>
        </div>
        <button id="closeModalCircus" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Закрыть</button>
      </div>
    </div>
  `
  document.body.appendChild(modalCircus)

  const mapModalOmsk = document.getElementById("mapModalOmsk")
  const closeModalOmsk = document.getElementById("closeModalOmsk")
  const mapModalCircus = document.getElementById("mapModalCircus")
  const closeModalCircus = document.getElementById("closeModalCircus")

  // Функции открытия модальных окон
  const openModalOmsk = () => {
    mapModalOmsk.classList.remove("hidden")
    mapModalOmsk.classList.add("flex")
  }

  const openModalCircus = () => {
    mapModalCircus.classList.remove("hidden")
    mapModalCircus.classList.add("flex")
  }

  // Функции закрытия модальных окон
  const closeModalOmskFunc = () => {
    mapModalOmsk.classList.add("hidden")
    mapModalOmsk.classList.remove("flex")
  }

  const closeModalCircusFunc = () => {
    mapModalCircus.classList.add("hidden")
    mapModalCircus.classList.remove("flex")
  }

  // Добавляем обработчики для закрытия
  closeModalOmsk.addEventListener("click", closeModalOmskFunc)
  closeModalCircus.addEventListener("click", closeModalCircusFunc)

  // Создаем маркер для Омска
  const markerOmsk = new YMapDefaultMarker({
    coordinates: OMSK_LOCATION.center,
    title: "Омск",
    subtitle: "Город в Сибири",
    onClick: () => openModalOmsk(),
  })

  // Создаем маркер для цирка
  const markerCircus = new YMapDefaultMarker({
    coordinates: [73.388004, 54.956075],
    title: "Омский цирк",
    subtitle: "Цирк на проспекте Карла Маркса",
    onClick: () => openModalCircus(),
  })

  // Добавляем слои и маркеры
  map.addChild(new YMapDefaultSchemeLayer())
  map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }))
  map.addChild(markerOmsk)
  map.addChild(markerCircus)
}

// Вызываем функцию после загрузки DOM
document.addEventListener("DOMContentLoaded", initMap)
