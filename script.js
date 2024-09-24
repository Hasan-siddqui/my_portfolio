$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Front end developer","Web Developer","UI Developer", "Tcehnical", "Designer", "Freelancer","Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    var typed = new Typed(".typing-3", {
        strings: ["Connect with me on :)"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Front end developer","Web Developer","UI Developer", "Tcehnical", "Designer", "Freelancer","Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});




        // Disable right-click context menu
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);

        // Disable specific keyboard shortcuts
        document.onkeydown = function (e) {
            // Prevent F12, Ctrl + Shift + I, and Ctrl + U
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
                e.preventDefault();
                return false;
            }
        };

        // Block Ctrl + U
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault(); // Prevent the default action
                // alert("The 'View Source' feature is disabled on this page.");
            }
        });
        // Block Ctrl + Shift + J
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.shiftKey && e.key === "J") {
                e.preventDefault(); // Prevent the default action
                // alert("The 'View Source' feature is disabled on this page.");
            }
        });
        // Block Ctrl + Shift + c
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.shiftKey && e.key === "C") {
                e.preventDefault(); // Prevent the default action
                // alert("The 'View Source' feature is disabled on this page.");
            }
        });


        // Prevent image dragging
        document.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });

        // Preventing right-click on images specifically
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        });

        // Prevent copying text
        document.addEventListener('copy', function (e) {
            e.preventDefault();
            alert("Copying text is disabled.");
        });

        // Preventing selection of text
        document.addEventListener('selectstart', function (e) {
            e.preventDefault();
        });
