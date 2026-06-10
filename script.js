/**
 * Alexander Dev Portfolio - Основные скрипты интерфейса
 */

// ==========================================
// 1. УПРАВЛЕНИЕ ПРЕЛОАДЕРОМ (LOADER)
// Ждём полной загрузки всех ресурсов страницы (стилей, картинок)
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Запускаем плавное исчезновение лоадера
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }
    
    // Плавный показ основного контента сайта
    document.querySelectorAll('.main-content-loaded').forEach(el => {
        el.classList.add('visible');
    });
});


document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 2. АВТОМАТИЧЕСКАЯ ПОДСВЕТКА КНОПКИ В ШАПКАХ
    // ==========================================
    const currentUrl = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".gh-nav-links .gh-nav-item");

    navLinks.forEach(link => {
        // Убираем активный класс у всех ссылок
        link.classList.remove("active"); 
        
        // Если имя файла совпадает с href (или мы на главной и href равен index.html)
        if (link.getAttribute("href") === currentUrl || (currentUrl === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        }
    });


    // ==========================================
    // 3. ДИНАМИЧЕСКИЕ СТЕКЛЯННЫЕ ЧАСЫ
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
    // 4. ИНТЕРАКТИВНАЯ КАРУСЕЛЬ КАРТОЧЕК (DECK)
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
    
// ==========================================================================
// 5. СИСТЕМА ПОДДЕРЖКИ (ВТБ / СБП)
// ==========================================================================

function openDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Ошибка: Окно #donateModal не найдено в HTML!');
    }
}

function closeDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Перехватываем клик по темной области через безопасный слушатель
window.addEventListener('click', function(event) {
    const modal = document.getElementById('donateModal');
    if (modal && event.target === modal) {
        closeDonateModal();
    }
});

function copyText(elementId, buttonElement) {
    const element = document.getElementById(elementId);
    if (!element || !buttonElement) return;

    const textToCopy = element.innerText;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = 'Готово!';
        buttonElement.style.borderColor = '#2ed573';
        buttonElement.style.color = '#2ed573';
        
        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.style.borderColor = '';
            buttonElement.style.color = '';
        }, 1500);
    }).catch(err => {
        console.error('Не удалось скопировать: ', err);
    });
}
