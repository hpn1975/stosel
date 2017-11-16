    $(document).on('ready', function () {
        // initialization of carousel
        $.HSCore.components.HSCarousel.init('.js-carousel');

    // initialization of tabs
    $.HSCore.components.HSTabs.init('[role="tablist"]');

      // initialization of popups
      $.HSCore.components.HSPopup.init('.js-fancybox');

      // initialization of go to
      $.HSCore.components.HSGoTo.init('.js-go-to');

      // initialization of text animation (typing)
      $(".u-text-animation.u-text-animation--typing").typed({
        strings: [
          "an awesome template",
          "perfect template",
          "just like a boss"
        ],
        typeSpeed: 60,
        loop: true,
        backDelay: 1500
      });
    });

    $(window).on('load', function () {
        // initialization of header
        $.HSCore.components.HSHeader.init($('#js-header'));
    $.HSCore.helpers.HSHamburgers.init('.hamburger');

      // initialization of HSMegaMenu component
      $('.js-mega-menu').HSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 991
      });
    });

    $(window).on('resize', function () {
        setTimeout(function () {
            $.HSCore.components.HSTabs.init('[role="tablist"]');
        }, 200);
    });
  