$.fn.placeholder = function () {
    var ele = $(this);
    var defaultText = ele.data('placeholder') || 'Input placeholder here';
    var input = '';

    ele.val(defaultText);
    ele.focus(function () {
        if (input == '') {
            ele.val('');
        }
    }).blur(function () {
        if (ele.val() == '') {
            ele.val(defaultText);
        }
    }).change(function () {
        input = ele.val();
    });
};