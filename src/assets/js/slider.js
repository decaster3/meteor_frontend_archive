export function pizza_fade_slider_init() {
  $('.pizza-fade-slider').find('.pizza-slider-item').hide();
  $('.pizza-fade-slider').find('.pizza-slider-item:first-child').show();
  $('.pizza-fade-slider').data('slide-number', 0);
  $('.pizza-fade-slider').data('slide-count', $('.pizza-fade-slider .pizza-slider-item').length);

  setInterval(pizza_fade_slider_callback, 10000);
}

function pizza_fade_slider_callback() {
  let slide_number = parseInt($('.pizza-fade-slider').data('slide-number'));
  let slide_count = parseInt($('.pizza-fade-slider').data('slide-count'));
  let new_slide_number = (slide_number < slide_count - 1) ? slide_number + 1 : 0;

  $('.pizza-fade-slider .pizza-slider-item').eq(slide_number).css('opacity', 0);
  setTimeout(function() {
    $('.pizza-fade-slider .pizza-slider-item').eq(slide_number).hide();
    $('.pizza-fade-slider .pizza-slider-item').eq(new_slide_number).show();
    $('.pizza-fade-slider .pizza-slider-item').eq(new_slide_number).css('opacity', 1);
  }, 750)

  $('.pizza-fade-slider').data('slide-number', new_slide_number);
}

function menu_slider_init(params) {
  let slider = params.slider;
  let wrapper = slider.find('.menu-slider-wrapper');
  let slideCount = wrapper.find('.menu-slider-item').length

  wrapper.css('width', slideCount * 100 + '%');
  $('.menu-slider .menu-slider-wrapper .menu-slider-item').css('width', (100 / slideCount) + '%');
}
