
!(function($) {
  "use strict";

  // Barra progrsiva About Us
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  //  carousel About US (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Orden categories
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
     //My carrousel
     $(document).ready(function(){
        var current = 0;
        var imagenes = new Array();
          var numImages = 9;
          if (numImages <= 3) {
              $('.right-arrow').css('display', 'none');
              $('.a-arrow').css('display', 'none');
          }
       
          // $('.left-arrow').on('click',function() {
          //     if (current > 0) {
          //       console.log(current);
          //         current = current - 1;
          //     } else {
          //         current = numImages - 3;
          //     }
       
          //     $(".carrusel").animate({"left": -($('#product_'+current).position().left)}, 600);
       
          //     return false;
          // });
       
          $('.left-arrow').on('hover', function() {
              $(this).css('opacity','0.5');
          }, function() {
              $(this).css('opacity','1');
          });
       
          $('.right-arrow').on('hover', function() {
              $(this).css('opacity','0.5');
          }, function() {
              $(this).css('opacity','1');
          });
       
          $('.right-arrow').on('click', function() {
              if (numImages > current + 2) {
                  current = current+1;
              } else {
                  current = 0;
              }
       
              $(".carrusel").animate({"left": -($('#product_'+current).position().left)}, 950);
       
              return false;
          }); 
      
      
          
      })
});