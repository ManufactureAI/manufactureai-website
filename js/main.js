
function isEmailValid(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(window).load(function() {

    $('#contact-form').submit(function(event) {

        var form = $(this);
        form.find('.input').parent('.input-wrap').removeClass('has-error');

        var hasError = false;
        form.find('.input').each(function() {
            if ($(this).val() == '') {
                $(this).parent('.input-wrap').addClass('has-error');
                $(this).select();
                hasError = true;
                return false;
            }

            if ($(this).hasClass('email') && !isEmailValid($(this).val())) {
                $(this).parent('.input-wrap').addClass('has-error');
                $(this).select();
                hasError = true;
                return false;
            }

        });

        var formData = {};
        formData.email = $('input.email').val();
        formData.fname = $('input.first-name').val();
        formData.lname = $('input.last-name').val();
        formData.subject = $('input.subject').val();
        formData.message = $('textarea.message').val();
        formData = $.param(formData);

        if (!hasError) {

            var $inputs = form.find("input, select, button, textarea");

            var serializedData = form.serialize();

            $inputs.prop("disabled", true);

            request = $.ajax({
                        url: "https://script.google.com/macros/s/AKfycbzqzqX9bfso0cTVqaeK1yAeoZrQdR3qOEpqLXdK3yH5ZWUAZpk/exec",
                        type: "post",
                        data: serializedData
                    });

                    request.done(function (response, textStatus, jqXHR){

                    $('.form-overlay').click();
                    $('input[type=text], textarea').val('');
                    $('#contact h2 span.lets').text('Thank');
                    $('#contact h2 span.chat').text('You!');
                    $('#contact').addClass('success');

                    $('input.email').val("");
                    $('input.first-name').val("");
                    $('input.last-name').val("");
                    $('input.subject').val("");
                    $('textarea.message').val("");

            });

            request.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });

            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });
        }

        // event.preventDefault();

        return false;
    });
});