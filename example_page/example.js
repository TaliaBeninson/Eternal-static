let currentImageIndex = 0;
const images = document.querySelectorAll('#imageGallery img');
const totalImages = images.length;
const gallery = document.getElementById('imageGallery');

// Set default view to single-view (arrows) and show the first image
function initializeGallery() {
    gallery.classList.add('single-view');
    images.forEach((img, index) => {
        img.style.display = 'none';
        // Add click event listener for multi-view mode
        img.addEventListener('click', function () {
            if (gallery.classList.contains('multi-view')) {
                currentImageIndex = index;
                showSingleViewImage(index);
            }
        });
    });
    images[currentImageIndex].classList.add('active');
    images[currentImageIndex].style.display = 'block';
}

document.getElementById('arrowViewToggle').addEventListener('click', function () {
    gallery.classList.remove('multi-view');
    gallery.classList.add('single-view');
    showSingleViewImage(currentImageIndex);
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.display = 'block');
});

document.getElementById('gridViewToggle').addEventListener('click', function () {
    gallery.classList.remove('single-view');
    gallery.classList.add('multi-view');
    images.forEach(img => {
        img.classList.remove('active');
        img.style.display = 'block';
    });
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.display = 'none');
});

function nextImage() {
    images[currentImageIndex].classList.remove('active');
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    showSingleViewImage(currentImageIndex);
}

function prevImage() {
    images[currentImageIndex].classList.remove('active');
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    showSingleViewImage(currentImageIndex);
}

// Function to show an image in single-view mode
function showSingleViewImage(index) {
    images.forEach(img => {
        img.classList.remove('active');
        img.style.display = 'none';
    });
    images[index].classList.add('active');
    images[index].style.display = 'block';
    gallery.classList.remove('multi-view');
    gallery.classList.add('single-view');
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.display = 'block');
}

// Swipe Detection
let startX = 0;
let endX = 0;

gallery.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].screenX;
}, { passive: true }); // Mark the listener as passive

gallery.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true }); // Mark the listener as passive

function handleSwipe() {
    if (endX < startX - 50) { // Swipe left
        nextImage();
    } else if (endX > startX + 50) { // Swipe right
        prevImage();
    }
}

// Initialize the gallery on page load
initializeGallery();

// Event listeners for arrow buttons
document.querySelector('.left-arrow').addEventListener('click', prevImage);
document.querySelector('.right-arrow').addEventListener('click', nextImage);


let currentFamilyIndex = 0;
const familyMembers = document.querySelectorAll('.family-member');
const totalFamilyMembers = familyMembers.length;

function updateFamilyDisplay() {
    familyMembers.forEach((member, index) => {
        member.classList.remove('active');
        if (index === currentFamilyIndex) {
            member.classList.add('active');
        }
    });
}

function nextFamily() {
    currentFamilyIndex = (currentFamilyIndex + 1) % totalFamilyMembers;
    updateFamilyDisplay();
}

function prevFamily() {
    currentFamilyIndex = (currentFamilyIndex - 1 + totalFamilyMembers) % totalFamilyMembers;
    updateFamilyDisplay();
}

// Initialize the first family member as visible
updateFamilyDisplay();

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// JavaScript to show the scroll-to-top button when scrolling down
window.onscroll = function () {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// JavaScript to scroll to the top when the button is clicked
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');
    const readMoreBtnTehilim = document.getElementById('readMoreBtnTehilim');
    const moreTehilim = document.getElementById('moreTehilim');
    const exampleNotice = document.getElementById('exampleNotice'); // Notice element
    let currentLang = 'he'; // Default to Hebrew

    // Attach language change buttons
    const hebrewBtn = document.getElementById('hebrewBtn');
    const englishBtn = document.getElementById('englishBtn');

    // Initial setup to show only the inactive language button
    if (currentLang === 'he') {
        hebrewBtn.style.display = 'none';
        englishBtn.style.display = 'inline-block';
    } else {
        hebrewBtn.style.display = 'inline-block';
        englishBtn.style.display = 'none';
    }

    // Add event listeners for language buttons
    hebrewBtn.addEventListener('click', function() {
        setLanguage('he');
    });

    englishBtn.addEventListener('click', function() {
        setLanguage('en');
    });

    // Function to update the "Read More/Read Less" button for Biography
    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener('click', function () {
            if (moreText.style.display === "none" || moreText.style.display === "") {
                moreText.style.display = "inline"; // Show the hidden content
                readMoreBtn.textContent = (currentLang === 'en') ? 'Read less' : 'קרא פחות'; // Update text based on language
            } else {
                moreText.style.display = "none"; // Hide the content
                readMoreBtn.textContent = (currentLang === 'en') ? 'Read more' : 'קרא עוד'; // Update text based on language
            }
        });
    }

    // Function to update the "Read More/Read Less" button for Tehilim
    if (readMoreBtnTehilim && moreTehilim) {
        readMoreBtnTehilim.addEventListener('click', function () {
            if (moreTehilim.style.display === "none" || moreTehilim.style.display === "") {
                moreTehilim.style.display = "block"; // Show the hidden content
                readMoreBtnTehilim.textContent = (currentLang === 'en') ? 'Read less' : 'קרא פחות'; // Update text based on language
            } else {
                moreTehilim.style.display = "none"; // Hide the content
                readMoreBtnTehilim.textContent = (currentLang === 'en') ? 'Read more' : 'קרא עוד'; // Update text based on language
            }
        });
    }

    // Function to change language
    function setLanguage(lang) {
        currentLang = lang;
    
        // Update all elements with data-en and data-he
        const translatableElements = document.querySelectorAll('[data-en][data-he]');
        translatableElements.forEach(element => {
            if (element.tagName === 'A') {
                const href = (lang === 'en') ? element.getAttribute('data-href-en') : element.getAttribute('data-href-he');
                element.setAttribute('href', href);
            }
            if (lang === 'en') {
                element.innerHTML = element.getAttribute('data-en');
            } else {
                element.innerHTML = element.getAttribute('data-he');
            }
        });
    
        // Update Biography Read More/Read Less button based on the language
        if (moreText.style.display === "none" || moreText.style.display === "") {
            readMoreBtn.innerHTML = (lang === 'en') ? 'Read more' : 'קרא עוד';
        } else {
            readMoreBtn.innerHTML = (lang === 'en') ? 'Read less' : 'קרא פחות';
        }
    
        // Update Tehilim Read More/Read Less button based on the language
        if (moreTehilim.style.display === "none" || moreTehilim.style.display === "") {
            readMoreBtnTehilim.innerHTML = (lang === 'en') ? 'Read more' : 'קרא עוד';
        } else {
            readMoreBtnTehilim.innerHTML = (lang === 'en') ? 'Read less' : 'קרא פחות';
        }

        // Update example notice based on the selected language
        exampleNotice.innerHTML = (lang === 'en') ? exampleNotice.getAttribute('data-en') : exampleNotice.getAttribute('data-he');

        // Toggle language button visibility based on the selected language
        if (lang === 'he') {
            hebrewBtn.style.display = 'none';
            englishBtn.style.display = 'inline-block';
        } else {
            hebrewBtn.style.display = 'inline-block';
            englishBtn.style.display = 'none';
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('#imageGallery img');
    const videos = document.querySelectorAll('#videoGallery video');
    
    let currentImageIndex = 0;
    let currentVideoIndex = 0;

    function showSingleViewItem(gallery, items, index, isVideo = false) {
        items.forEach(item => item.style.display = 'none');
        items[index].style.display = 'block';
    }

    // Next image
    window.nextImage = function () {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showSingleViewItem(document.getElementById('imageGallery'), images, currentImageIndex);
    };

    // Previous image
    window.prevImage = function () {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showSingleViewItem(document.getElementById('imageGallery'), images, currentImageIndex);
    };

    // Next video
    window.nextVideo = function () {
        videos[currentVideoIndex].style.display = 'none';
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        showSingleViewItem(document.getElementById('videoGallery'), videos, currentVideoIndex, true);
    };

    // Previous video
    window.prevVideo = function () {
        videos[currentVideoIndex].style.display = 'none';
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        showSingleViewItem(document.getElementById('videoGallery'), videos, currentVideoIndex, true);
    };

    // Initialize gallery
    function initializeGallery(items) {
        items.forEach(item => item.style.display = 'none');
        if (items.length > 0) {
            items[0].style.display = 'block';
        }
    }

    initializeGallery(images);
    initializeGallery(videos);
});

function showTranslateButtons() {
    const buttons = document.querySelectorAll('.translate-btn');
    buttons.forEach(button => {
        button.style.display = 'inline-block'; // Show each translate button
    });
}

function hideTranslateButtons() {
    const buttons = document.querySelectorAll('.translate-btn');
    buttons.forEach(button => {
        button.style.display = 'none'; // Hide each translate button
    });
}

// Function to initialize buttons to their respective language on page load
function initializeLanguageButtons() {
    // Initialize "Translate" buttons in memory entries
    document.querySelectorAll(".memory-text").forEach((textElement) => {
        const originalText = textElement.getAttribute("data-original");
        textElement.innerHTML = originalText; // Set initial text to original Hebrew
    });

    document.querySelectorAll(".translate-btn").forEach((button) => {
        button.innerText = "Translate"; // Set initial button text to "Translate"
    });

}

// Toggle translation for memory entries
function translateText(button) {
    const textElement = button.previousElementSibling;
    const originalText = textElement.getAttribute("data-original");
    const translationText = textElement.getAttribute("data-translation");

    if (textElement.innerHTML === originalText) {
        textElement.innerHTML = translationText;
        button.innerText = "החזר לתרגום";
    } else {
        textElement.innerHTML = originalText;
        button.innerText = "Translate";
    }
}

// Toggle language for "Share a Memory" button
function toggleLanguageForShareButton() {
    const hebrewText = shareButton.getAttribute("data-he");
    const englishText = shareButton.getAttribute("data-en");

    if (shareButton.innerHTML === hebrewText) {
        shareButton.innerHTML = englishText;
    } else {
        shareButton.innerHTML = hebrewText;
    }
}

// Initialize language buttons on page load
window.addEventListener("DOMContentLoaded", initializeLanguageButtons);
// Initialize page load with Hebrew content
window.addEventListener("DOMContentLoaded", function() {
    // Set all elements to Hebrew on load
    document.querySelectorAll(".text-section").forEach(element => {
        element.innerHTML = element.getAttribute("data-original");
    });
    document.getElementById("readMoreBtn").innerText = document.getElementById("readMoreBtn").getAttribute("data-he");
});

// Toggle the "Read More" functionality
function toggleReadMore() {
    const moreText = document.getElementById("moreText");
    const readMoreBtn = document.getElementById("readMoreBtn");
    
    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        readMoreBtn.innerText = readMoreBtn.getAttribute("data-he") === "קרא עוד" ? "קרא פחות" : "Read less";
    } else {
        moreText.style.display = "none";
        readMoreBtn.innerText = readMoreBtn.getAttribute("data-he") === "קרא עוד" ? "קרא עוד" : "Read more";
    }
}

// Toggle translation for biography text
function translateBiography() {
    document.querySelectorAll(".text-section").forEach(element => {
        const originalText = element.getAttribute("data-original");
        const translationText = element.getAttribute("data-translation");

        // Toggle between original and translation
        element.innerHTML = (element.innerHTML === originalText) ? translationText : originalText;
    });

    
    // Update translation button text
    const translateButton = document.querySelector(".translate-btn");
    translateButton.innerText = translateButton.innerText === "Translate" ? "החזר לתרגום" : "Translate";
}
