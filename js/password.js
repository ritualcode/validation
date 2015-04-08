// объект password с методами 
// create (подгрузить html, создать свойства объекта(elem и др.), вызвать методы стилизации и обработчики)
// destroy (удалить элемент)
// stylize (стилизовать в соответствии с найтройками)
// markAsRequired (вставить звездочку если в настройках required.value == true)
// _validate (проверить maxlenght)
// putNewValue (сбросить сообщение об ошибке и стиль ошибки)
// onSubmit (обработчик события сабмит для формы, который вызывает validate)
var password = {
	$elem:       null,
	$message:    null,
	$icon:       null,
	$elemParent: null,
	create: function(){
		$.get("../html/password.html", function(htmlCode){
			$("form").append(htmlCode);
			password.$elem = $("#password");
			password.$message = $(".password-message");
			password.$icon = $(".password-icon");
			password.$elemParent = $(".password-group");
			password.stylize();
			password.bindListeners();
			if 	(
			     passwordOptions.validation &&
			     passwordOptions.validation.required && 
			     passwordOptions.validation.required.value
			    ) {
				password.markAsRequired();
			}

		});
	},
	destroy: function() {
		$(".password-group").remove();
		this.$elem       = null;
		this.$message    = null;
		this.$icon    	 = null;
		this.$elemParent = null;
	},
	stylize: function() {
		this.$elem.css(passwordOptions.styles.input);
		this.$message.css(passwordOptions.styles.message);
	},
	markAsRequired: function() {
		this.$icon.addClass("glyphicon-star").css({"color":"blue"});
	},
	_validateMaxlength: function() {
		if( this.$elem.val().length > passwordOptions.validation.maxlength.value ){
			this.$message.text(passwordOptions.validation.maxlength.message);
			this.$elemParent.addClass("has-error");
			this.$icon.addClass("glyphicon-remove").css({"color":"red"});
			return false
		} else {
			this.$elemParent.addClass("has-success");
			this.$icon.addClass("glyphicon-ok").css({"color":"green"});
			return true;

		}
	},
	_validateRequired: function(){
		if(
			passwordOptions.validation &&
			passwordOptions.validation.required && 
			passwordOptions.validation.required.value &&
			this.$elem.val() == ""
			) {
			this.$message.text(passwordOptions.validation.required.message);
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
		password.$elemParent.removeClass("has-error has-success");
		password.$icon.removeClass("glyphicon-ok glyphicon-remove");
		password.$message.empty(); 
		if (passwordOptions.validation.required.value) {
			password.markAsRequired();
		}
	},
	bindSubmit: function() {
		$("form").on("submit", function(event){
			event.preventDefault();
			if (password.$message.text()) {
				password.$message.empty();
			}
			password._validateRequired();
			if(password._validateRequired()) {
				password._validateMaxlength();
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

// объект настроек password с правилом валидации 
// required и maxlength и дефолтными стилем
var passwordOptions = {
	validation: {
		required: {
			value:   true,
			message: "Password is required"
		},
		maxlength: {
			value:   8,
			message: "Your password is too long"
		}
	},
	styles: {
		input: {
			"background":  "#F2F2F2",
			"font-weight": "bold"
		},
		message: {
			"color": "red"
		}
	},
	hideErrorsOnEvent: "keydown"
}