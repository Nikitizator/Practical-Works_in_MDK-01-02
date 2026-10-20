jQuery(function($) {
	$(document).ready(function(){
        // $.srSmoothscroll();

        var scrollTop = $('.scroll-top');

        scrollTop.hide();
    
        $(window).scroll(function () {
            if ($(this).scrollTop() > 600) {
                scrollTop.fadeIn();
            } else {
                scrollTop.fadeOut();
            }
        });

        scrollTop.click(function () {
            $('body, html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('.search').on('click', function() {
            $('.searching-bar').toggleClass('active');
        });

        $(window).on('load resize', function() {
            var w = $(this).width(),
                el = $('.mobile-icon');

            (w < 1100) ? el.addClass('show') : el.removeClass('show');

            if (el.hasClass('show')) {
                el.on('click', function() {
                    $('.top-menu .menu').toggleClass('active');
                });
            }
        });

        $('#form-contact').validate({
            errorPlacement: function(error, element) {
                return true;
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            }
        });

        $('#form-contact').on('submit', function(e) {
            e.preventDefault();

            var form = $(this),
                data = $(this).serialize();

            if ($(this).valid()) {
                $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    method: 'POST',
                    data: data + '&action=ask_form',
                    dataType: 'json',
                    beforeSend: function() {
                        form.find('button[type=submit]').attr('disabled', true);
                    },
                    success: function(response) {
                        form.hide();

                        if (response.status == 'success') {
                            $('.message .success').removeClass('hidden');
                        } else {
                            $('.message .danger').removeClass('hidden');
                        }
                    },
                    complete: function() {
                        form.find('button[type=submit]').attr('disabled', false);
                    }
                });
            }
        });
    });
});