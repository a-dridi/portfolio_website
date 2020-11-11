(function loadJavaScriptFunctions() {

    $(".menu-icon").click(function () {
        $("nav").toggleClass("active");
    })

    //JS Native - smooth scrolling to all menu links and to top button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    var todayDate = new Date();
    document.getElementById("yearDisplay").innerHTML = todayDate.getFullYear();

    //Coding languages 
    $(document).ready(function () {
        $('[data-toggle="popover"]').popover();
    });

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    fadeInContentOnScroll();
}());

/**
 * Load Popup functionality for projects carousel
 */
(function loadProjectsImagePopup() {
    //
    /*
    $('.projects-image').click(function () {
        var imageSrc = $(this).attr('src');
        var imageAlt = $(this).attr('alt');

        $('#projects-image-popup').modal('show');
        $('#projects-image-popup-img').attr('src', imageSrc);
        $('#projects-image-popup-img').attr('alt', imageAlt);
        $('#projects-image-popup-title').html(imageAlt);
    });
    */
    var projectImagePopupOutsideBg = document.getElementById("projects-image-popup-outside-bg");
    var projectImages = document.querySelectorAll(".projects-image");
    var projectImagePopupCloseButton = document.getElementById("projects-image-popup-close");

    //Open project images
    projectImages.forEach(function (projectImage) {
        projectImage.addEventListener('click', function (event) {
            console.log(projectImage.src);
            var imagePopup = document.querySelector(".projects-image-popup");
            showImagePopup(projectImagePopupOutsideBg, imagePopup, projectImage);
        });
    });

    //Close project image through button
    projectImagePopupCloseButton.addEventListener('click', function (event) {
        var imagePopup = document.getElementById("projects-image-popup");
        hideImagePopup(projectImagePopupOutsideBg, imagePopup);
    });

    //Close project image by clicking on outside background space
    projectImagePopupOutsideBg.addEventListener('click', function () {
        var imagePopup = document.getElementById("projects-image-popup");
        hideImagePopup(projectImagePopupOutsideBg, imagePopup);
    });
}());

/**
 * Helper method for Load Popup functionality
 */
function showImagePopup(projectImagePopupOutsideBgObject, popupObject, clickedImageElement) {
    if (popupObject === undefined || popupObject === null) return;
    document.getElementById("projects-image-popup-img").src = clickedImageElement.src;
    document.getElementById("projects-image-popup-img").alt = clickedImageElement.alt;
    document.getElementById("image-popup-title-text").innerText = clickedImageElement.alt;
    popupObject.classList.add("active");
    projectImagePopupOutsideBgObject.classList.add("active");
}

function hideImagePopup(projectImagePopupOutsideBgObject, popupObject) {
    if (popupObject === undefined || popupObject === null) return;
    popupObject.classList.remove("active");
    projectImagePopupOutsideBgObject.classList.remove("active");
}

/**
 * JQuery. Display div content in fade in style when its position is reached through scrolling 
 */
function fadeInContentOnScroll() {
    $(document).ready(function () {
        $('.container').scroll(function () {
            //Check if the user scrolled to the location of the div that is hidden.
            $('.hide-div').each(function (divItem) {
                let bottomOfDivObject = $(this).offset().top + $(this).outerHeight();
                let bottomOfWindow = $(window).scrollTop() + $(window).height();

                if (bottomOfWindow > bottomOfDivObject / 1.9) {
                    $(this).animate({
                        'opacity': '1'
                    }, 600);
                }
            })
        })

    });
}