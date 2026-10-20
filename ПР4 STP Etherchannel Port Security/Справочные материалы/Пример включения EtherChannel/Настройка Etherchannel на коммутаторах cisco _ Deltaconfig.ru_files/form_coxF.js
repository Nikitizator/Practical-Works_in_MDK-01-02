jQuery(function($) {
	var askQuestion = {
		options: {
			button: null,
			form: null
		},

		init: function() {
			askQuestion.options.button = $('.btn-ask-question');
			askQuestion.options.form = $('.form-ask-question');

			$('#ask-question').validate({
				errorPlacement: function(error, element) {
		         	return true;
		        },
		        rules: {
		          	email: {
		            	required: true,
		          	},
		          	message: {
		          		required: true
		          	}
		        }
			});

			$('#ask-question').on('submit', function(e) {
				e.preventDefault();

				askQuestion.sendForm($(this));
			});

			askQuestion.eventHandle();
		},

		showButton: function(button) {
			button.fadeIn().removeClass('rotateOutDownRight').addClass('rotateInUpRight');

			setTimeout(function() {
				button.removeClass('rotateInUpRight').addClass('pulses');
			}, 1000);
		},

		hideButton: function(button) {
			button.fadeOut().removeClass('rotateInUpRight pulses').addClass('rotateOutDownRight')
		},

		showForm: function(form) {
			var elForm = form.find('#ask-question');

			elForm.parent().find('.message').hide().empty();

			elForm.find('input[name=email]').val('');
			elForm.find('textarea[name=message]').val('')
			elForm.show();

			form.addClass('show');
		},

		hideForm: function(form) {
			form.removeClass('show');
		},

		sendForm: function(form) {
			if ((form).valid()) {
				var data = {
					action: 'ask_form',
					email: form.find('input[name=email]').val(),
					message: form.find('textarea[name=message]').val()
				};

				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					method: 'post',
					data: data,
					dataType: 'json',
					beforeSend: function() {
						form.find('button[type=submit]').attr('disabled', true);
					},
					success: function(responce) {
						console.log(responce, form.parent().find('.message'));

						form.hide();
						form.parent().find('.message').append(responce.message).show();
					},
					complete: function() {
						form.find('button[type=submit]').attr('disabled', false);
					}
				});
			}
		},

		eventHandle: function() {
			var button = askQuestion.options.button,
				form = askQuestion.options.form;

			setTimeout(function() {
				askQuestion.showButton(button);

				button.on('click', function() {
					askQuestion.hideButton(button);

					setTimeout(function() {
						askQuestion.showForm(form);
					}, 300);
				});

				$(document).mouseup(function(e) {
					if ($(e.target).closest(' .form-ask-question').length === 0 && $(e.target).closest('.btn-ask-question').length === 0) {
						askQuestion.hideForm(form);

						setTimeout(function() {
							askQuestion.showButton(button);
						}, 300);
					}
				});

				form.on('click', '.close', function() {
					askQuestion.hideForm(form);

					setTimeout(function() {
						askQuestion.showButton(button);
					}, 300);
				});
			}, 30000); // Delay for show button
		}
	}

	askQuestion.init();

});