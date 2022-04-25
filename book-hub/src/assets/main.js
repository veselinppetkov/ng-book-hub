jQuery(document).ready(function ($) {
  "use strict";

  $(".demo-filter a").on("click", function (e) {
    e.preventDefault();
    var filter = $(this).attr("href").replace("#", "");
    $(".demos").isotope({ filter: "." + filter });
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".molla-lz").lazyload({
    effect: "fadeIn",
    effect_speed: 400,
    appearEffect: "",
    appear: function (elements_left, settings) {},
    load: function (elements_left, settings) {
      $(this).removeClass("molla-lz").css("padding-top", "");
    },
  });

  // Mobile Menu Toggle - Show & Hide
  $(".mobile-menu-toggler").on("click", function (e) {
    $("body").toggleClass("mmenu-active");
    $(this).toggleClass("active");
    e.preventDefault();
  });

  $(".mobile-menu-overlay, .mobile-menu-close").on("click", function (e) {
    $("body").removeClass("mmenu-active");
    $(".menu-toggler").removeClass("active");
    e.preventDefault();
  });

  $(".goto-demos").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: $(".row.demos").offset().top }, 600);
  });

  $(".goto-features").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $(".section-features").offset().top },
      800
    );
  });

  $(".goto-elements").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $(".section-elements").offset().top },
      1000
    );
  });

  $(".goto-support").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $(".section-support").offset().top },
      1200
    );
  });
});

jQuery(window).on("load", function () {
  jQuery(".demos")
    .isotope({
      filter: ".homepages",
      initLayout: true,
      itemSelector: ".iso-item",
      layoutMode: "masonry",
    })
    .on("layoutComplete", function (e) {
      jQuery(window).trigger("scroll");
    });
});

setTimeout(function () {
  $(".blog-slides").owlCarousel({
    loop: true,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 30,
    navText: [
      "<i class='bx bx-chevron-left'></i>",
      "<i class='bx bx-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
}, 2000);
