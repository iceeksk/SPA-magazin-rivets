(function loaded() {
    myScrollCategory = new IScroll('#wrapperCategory', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true
    });

    myScrollHome = new IScroll('#wrapperHome', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true
    });

    myScrollCart = new IScroll('#wrapperCart', {
        scrollX: false,
        scrollY: true,
        mouseWheel: true
    });

})();
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);