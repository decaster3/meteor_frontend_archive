export default function pizza_options_init() {
  $(document).on('click', '.option-item', function() {
    let option_item = $(this);
    let option = $(this).closest('.option');
    // let option_index = option.data('index') || 0;
    // option.data('index', option_index);
    option.find('.option-item').removeClass('active');
    option_item.addClass('active');
  })
}
