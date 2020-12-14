// слайдер Tiny

const slider = tns({
    container: '.slider__inner',
    items: 1,
    slideBy: 'page',
    controls: false
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

// переключение табов (jQuery)

(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    });
})(jQuery);

// разворот карточек (jQuery)

function toggleCard (item) {
    $(item).each(function (i) {
        $(this).on('click', function(e) {
           e.preventDefault();
           $('.catalog-item__first-view').eq(i).toggleClass('catalog-item__first-view_active');
           $('.catalog-item__second-view').eq(i).toggleClass('catalog-item__second-view_active');  
        });
    });
}

toggleCard ('.catalog-item__link');
toggleCard ('.catalog-item__back');