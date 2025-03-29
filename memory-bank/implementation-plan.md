Подробный план создания лендинга
Этот раздел представляет собой детализированный план создания лендинга с указанными компонентами, используя HTML, Tailwind CSS и Vanilla JS. Он охватывает все аспекты реализации, включая интеграцию Яндекс Карты, генерацию QR-кодов и адаптивный дизайн.

Введение
Лендинг включает шапку, блок с Яндекс Картой (20 точек с модальным окном), QR-коды для каждой точки, секцию с медиа (изображения и видео), а также футер. План разработан с учетом простоты реализации и адаптивности, используя указанные технологии.

Подготовка: Настройка базовой структуры
Создайте HTML-файл с базовой структурой:
Включите теги <html>, <head> и <body>.
Добавьте метатеги для кодировки (<meta charset="UTF-8">) и вьюпорта (<meta name="viewport" content="width=device-width, initial-scale=1.0">).
Подключите Tailwind CSS через CDN: <link href="https://cdn.tailwindcss.com" rel="stylesheet">.
Включите скрипты для Яндекс Карты и QRCode.js в секции <head>:
Яндекс Карты: <script src="https://api-maps.yandex.ru/2.1/?apikey=your_api_key&lang=ru_RU" type="text/javascript"></script> (замените your_api_key на полученный ключ).
QRCode.js: <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>.
В секции <body> создайте контейнер для контента, например, <div class="container mx-auto">.
Шаг 1: Реализация шапки (Header)
Определите содержимое шапки: логотип (например, изображение через <img> с классами Tailwind, такими как h-8) и меню навигации (список <ul> с ссылками, стилизованный через flex space-x-4).
Используйте Tailwind CSS для адаптивного дизайна, например, bg-gray-800 text-white py-4 px-6 flex justify-between items-center.
Пример структуры:
<header> с логотипом и <nav> внутри.
Шаг 2: Реализация блока с картой
Создайте div для карты: <div id="map" class="h-96 w-full"></div>.
Получите API-ключ для Яндекс Карты (Яндекс Карты API). Это необходимо для доступа к API.
Определите массив точек (20 элементов) с данными:
Пример: var points = [{ id: 1, coords: [55.76, 37.64], info: "Информация о точке 1" }, ...];.
Каждый объект должен содержать ID, координаты и информацию для отображения.
Инициализируйте карту через JavaScript после загрузки API:
Используйте ymaps.ready(function() { ... }) для асинхронной загрузки.
Создайте экземпляр карты: var myMap = new ymaps.Map("map", { center: [55.76, 37.64], zoom: 10 });.
Для каждой точки создайте маркер: var marker = new ymaps.Placemark(point.coords, { hintContent: point.info }, { data: { pointData: point } });.
Добавьте маркеры на карту: myMap.geoObjects.add(marker);.
Привяжите событие клика к маркеру: marker.events.add("click", function(e) { ... });.
Шаг 3: Реализация модального окна
Создайте HTML для модального окна, скрытого по умолчанию:
<div id="modal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center hidden">.
Внутри модального окна добавьте контейнер: <div class="bg-white p-6 rounded shadow-md"> с заголовком, контентом (<p id="modal-content"></p>) и местом для QR-кода (<div id="qr-code" class="mt-4"></div>).
Добавьте кнопку закрытия: <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="closeModal()">Закрыть</button>.
Напишите JavaScript для управления модальным окном:
Функция openModal(pointData): Установите содержимое (document.getElementById("modal-content").innerHTML = pointData.info;), сгенерируйте QR-код и покажите модальное окно (document.getElementById("modal").style.display = "flex";).
Функция closeModal(): Скрыть модальное окно (document.getElementById("modal").style.display = "none";).
В обработчике клика по маркеру вызовите openModal(e.get("target").properties.get("data").pointData);.
Шаг 4: Добавление QR-кода
Используйте QRCode.js для генерации QR-кодов. Подключите библиотеку, как указано выше.
Создайте функцию generateQRCode(pointId):
Очистите предыдущий QR-код: var qrDiv = document.getElementById("qr-code"); qrDiv.innerHTML = "";.
Сгенерируйте новый QR-код: new QRCode(qrDiv, { text: "https://example.com/?point=" + pointId, width: 128, height: 128 });.
При открытии модального окна вызовите generateQRCode(pointData.id).
Шаг 5: Обработка параметров запроса
Напишите функцию для получения параметра из URL: function getQueryParameter(name) { var urlParams = new URLSearchParams(window.location.search); return urlParams.get(name); }.
При загрузке страницы проверьте параметр "point": var pointIdFromQuery = getQueryParameter("point");.
Если параметр существует, найдите соответствующую точку: var pointToOpen = points.find(function(point) { return point.id == pointIdFromQuery; });.
Если точка найдена, откройте модальное окно: if (pointToOpen) openModal(pointToOpen);.
Шаг 6: Реализация блока с медиа
Создайте секцию: <section id="media" class="py-12"> с заголовком (<h2 class="text-3xl font-semibold mb-6 text-center">Медиа</h2>).
Используйте сетку для отображения: <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">.
Добавьте изображения: <img src="image1.jpg" alt="Изображение 1" class="w-full h-auto rounded shadow-md">.
Для видео используйте iframe, например, для YouTube: <iframe width="560" height="315" src="https://www.youtube.com/embed/video_id" allowfullscreen></iframe>, обернув в <div class="aspect-w-16 aspect-h-9"> для сохранения пропорций.
Убедитесь, что компоновка адаптивна благодаря классам Tailwind CSS.
Шаг 7: Реализация футера
Создайте футер: <footer class="bg-gray-800 text-white py-6 px-6 text-center">.
Добавьте содержимое, например, копирайт: <p>&copy; 2023 Моя компания</p> и ссылки на социальные сети: <a href="#" class="text-white hover:text-gray-300 mx-2">Facebook</a>.
Стилизуйте с помощью Tailwind CSS для единообразия.