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

// переключение табов в каталоге

(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    });
})(jQuery);

// разворот карточек товаров

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

// modal 

$('[data-modal=consultation').on('click', function () {
    $('.overlay, #consultation').fadeIn();
});
$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanx').fadeOut('slow');
});

$('.button_buy').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
});

//  validate 

function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true,
                minlength: 7
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
              },
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
              },
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
            }
        }
    });
}
validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

// маска ввода номера телефона в контактных формах

$("input[name=phone").mask("+7 (999) 999-9999");

// отправка форм на почту

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

// появление и скрытие элемента (стрелки) для перемотки

$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

// плавная перемотка страницы вверх

$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});