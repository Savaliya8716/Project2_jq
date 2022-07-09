$(".owl-carousel").on("initialized.owl.carousel", () => {
    setTimeout(() => {
        $(".owl-item.active .owl-slide-animated").addClass("is-transitioned");
        $("section").show();
    }, 200);
});

const $owlCarousel = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    navText: [
        '<svg width="50" height="50" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
        '<svg width="50" height="50" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>' /* icons from https://iconmonstr.com */
    ]
});

$owlCarousel.on("changed.owl.carousel", e => {
    $(".owl-slide-animated").removeClass("is-transitioned");

    const $currentOwlItem = $(".owl-item").eq(e.item.index);
    $currentOwlItem.find(".owl-slide-animated").addClass("is-transitioned");

    const $target = $currentOwlItem.find(".owl-slide-text");
    doDotsCalculations($target);
});

$owlCarousel.on("resize.owl.carousel", () => {
    setTimeout(() => {
        setOwlDotsPosition();
    }, 50);
});

/*if there isn't content underneath the carousel*/
//$owlCarousel.trigger("refresh.owl.carousel");

setOwlDotsPosition();

function setOwlDotsPosition() {
    const $target = $(".owl-item.active .owl-slide-text");
    doDotsCalculations($target);
}

function doDotsCalculations(el) {
    const height = el.height();
    const { top, left } = el.position();
    const res = height + top + 20;

    $(".owl-carousel .owl-dots").css({
        top: `${res}px`,
        left: `${left}px`
    });
}
// ----------------------------------------------------------
let span = document.getElementsByTagName('span');
let product = document.getElementsByClassName('product')
let product_page = Math.ceil(product.length / 4);
let l = 0;
let movePer = 25.34;
let maxMove = 203;
// mobile_view	
let mob_view = window.matchMedia("(max-width: 768px)");
if (mob_view.matches) {
    movePer = 50.36;
    maxMove = 504;
}

let right_mover = () => {
    l = l + movePer;
    if (product == 1) { l = 0; }
    for (const i of product) {
        if (l > maxMove) { l = l - movePer; }
        i.style.left = '-' + l + '%';
    }

}
let left_mover = () => {
    l = l - movePer;
    if (l <= 0) { l = 0; }
    for (const i of product) {
        if (product_page > 1) {
            i.style.left = '-' + l + '%';
        }
    }
}
span[1].onclick = () => { right_mover(); }
span[0].onclick = () => { left_mover(); }