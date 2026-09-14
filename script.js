document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const searchIcon = document.querySelector('.search-icon');
    
    // Toggle mobile menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger icon between bars and xmark
            const icon = hamburger.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Search functionality placeholder
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-input-wrapper input');
            if (searchInput) {
                searchInput.focus();
                // Scroll to top if not already there
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Main search button placeholder
    const searchBtn = document.querySelector('.search-box .btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input-wrapper input');
            if (searchInput && searchInput.value.trim() !== '') {
                alert(`هذه ميزة تجريبية. سيتم البحث عن: ${searchInput.value} في النسخة القادمة.`);
            } else {
                alert('الرجاء إدخال اسم التحليل للبحث عنه.');
            }
        });
    }

    // Remove placeholder "Know more" buttons code since it's dynamic now

    // Dynamic rendering of cards if containers exist
    const diabetesContainer = document.getElementById('diabetes-cards-container');
    if (diabetesContainer && typeof analysesData !== 'undefined') {
        const diabetesTests = analysesData.filter(item => item.category === 'diabetes');
        diabetesContainer.innerHTML = diabetesTests.map(generateCardHTML).join('');
    }

    const allAnalysesContainer = document.getElementById('all-analyses-container');
    if (allAnalysesContainer && typeof analysesData !== 'undefined') {
        allAnalysesContainer.innerHTML = analysesData.map(generateCardHTML).join('');
    }
});
