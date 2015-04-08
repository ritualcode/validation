// объект email с методами 
// create (подгрузить html, создать свойства объекта(elem и др.), вызвать методы стилизации и обработчики)
// destroy (удалить элемент)
// stylize (стилизовать в соответствии с найтройками)
// markAsRequired (вставить звездочку если в настройках required.value == true)
// _validate (проверить maxlenght)
// putNewValue (сбросить сообщение об ошибке и стиль ошибки)
// onSubmit (обработчик события сабмит для формы, который вызывает validate)
var email = {
	$elem:       null,
	$message:    null,
	$icon:       null,
	$elemParent: null,
	create: function(){
		$.get("../html/email.html", function(htmlCode){
			$("form").append(htmlCode);
			email.$elem = $("#email");
			email.$message = $(".email-message");
			email.$icon = $(".email-icon")
			email.$elemParent = $(".email-group");
			email.stylize();
			email.bindListeners();
			if (
			     emailOptions.validation &&
			     emailOptions.validation.required && 
			     emailOptions.validation.required.value
			    ) {
				email.markAsRequired();
			}
		});
		
	},
	destroy: function(){
		$(".email-group").remove();
		this.$elem = null;
		this.$message = null;
		this.$icon = null;
		this.$elemParent = null;
	},
	stylize: function(){
		this.$elem.css(emailOptions.styles.input);
		this.$message.css(emailOptions.styles.message);
	},
	markAsRequired: function() {
		this.$icon.addClass("glyphicon-star").css({"color":"blue"});
	},
	_validateMaxlength: function(){
		if( this.$elem.val().length > emailOptions.validation.maxlength.value ) {
			this.$message.text(emailOptions.validation.maxlength.message);
			this.$elemParent.addClass("has-error");
			this.$icon.addClass("glyphicon-remove").css({"color":"red"});
			return false;
		} else {
			this.$elemParent.addClass("has-success");
			this.$icon.addClass("glyphicon-ok").css({"color":"green"});
			return true;

		}
	},
	_validateRequired: function(){
		if(
			emailOptions.validation &&
			emailOptions.validation.required && 
			emailOptions.validation.required.value &&
			this.$elem.val() == ""
			) {
			this.$message.text(emailOptions.validation.required.message);
			this.$elemParent.addClass("has-error");
			this.$icon.addClass("glyphicon-remove").css({"color":"red"});
			return false
		} else {
			this.$elemParent.addClass("has-success");
			this.$icon.addClass("glyphicon-ok").css({"color":"green"});
			return true;
		}
	},
	hideErrorMessages: function() {
		email.$elemParent.removeClass("has-error has-success");
		email.$icon.removeClass("glyphicon-ok glyphicon-remove");
		email.$message.empty();
		if (emailOptions.validation.required.value) {
			email.markAsRequired();
		}
	},
	bindSubmit: function() {
		$("form").on("submit", function(event){
			event.preventDefault();
			if (email.$message.text()) {
				email.$message.empty();
			}
			email._validateRequired();
			if(email._validateRequired()) {
				email._validateMaxlength();
			}
		});
	},
	bindHideErrors: function() {
		this.$elem.on(passwordOptions.hideErrorsOnEvent, this.hideErrorMessages);
	},
	bindListeners: function() {
		this.bindSubmit();
		this.bindHideErrors();
	}
}

// объект настроек e-mail с правилом валидации 
// required и maxlength и дефолтными стилем
var emailOptions = {
	validation: {
		required: {
			value: true,
			message: "E-mail is required"
		},
		maxlength: {
			value: 8,
			message: "Your e-mail is too long"
		}
	},
	styles: {
		input: {
			"background": "#F2F2F2",
			"font-weight": "bold"
		},
		message: {
			"color": "red"
		}
	},
	hideErrorsOnEvent: "keydown"
}