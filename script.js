/**

 * Alexander Dev Portfolio - Основные скрипты интерфейса

 */



document.addEventListener('DOMContentLoaded', () => {



    // ==========================================

    // 1. УПРАВЛЕНИЕ ПРЕЛОАДЕРОМ (LOADER)

    // ==========================================

    setTimeout(() => {

        const loader = document.getElementById('loader');

        if (loader) {

            loader.style.opacity = '0';

            loader.style.visibility = 'hidden';

        }

        // Плавный показ основного контента сайта

        document.querySelectorAll('.main-content-loaded').forEach(el => {

            el.classList.add('visible');

        });

    }, 800);





    // ==========================================

    // 2. ДИНАМИЧЕСКИЕ СТЕКЛЯННЫЕ ЧАСЫ

    // ==========================================

    function updateClock() {

        const hoursElement = document.getElementById("hours");

        const minutesElement = document.getElementById("minutes");

        const secondsElement = document.getElementById("seconds");



        if (hoursElement && minutesElement && secondsElement) {

            const now = new Date();

            hoursElement.textContent = String(now.getHours()).padStart(2, "0");

            minutesElement.textContent = String(now.getMinutes()).padStart(2, "0");

            secondsElement.textContent = String(now.getSeconds()).padStart(2, "0");

        }

    }

    

    // Инициализация и ежесекундный запуск часов

    updateClock();

    setInterval(updateClock, 1000);





    // ==========================================

    // 3. ИНТЕРАКТИВНАЯ КАРУСЕЛЬ КАРТОЧЕК (DECK)

    // ==========================================

    const cards = document.querySelectorAll('.carousel-card');



    if (cards.length > 0) {

        cards.forEach(card => {

            card.addEventListener('click', (event) => {

                // Предотвращаем всплытие, чтобы клик по карте не закрывал её саму через обработчик документа

                event.stopPropagation(); 



                if (card.classList.contains('active')) {

                    card.classList.remove('active');

                } else {

                    // Снимаем класс active со всех карт и вешаем на выбранную

                    cards.forEach(c => c.classList.remove('active'));

                    card.classList.add('active');

                }

            });

        });



        // Клик в любом другом месте экрана возвращает активную карту обратно в веер

        document.addEventListener('click', () => {

            cards.forEach(card => card.classList.remove('active'));

        });

    }



}); 

