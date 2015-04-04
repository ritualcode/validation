// объект password с методами 
// create (подгрузить html и вызвать методы stylize и required: см.ниже)
// destroy (удалить элемент)
// stylize (стилизовать в соответствии с найтройками)
// required (вставить звездочку если в настройках required.value == true)
// _validate (проверить maxlenght)
// submit (обработчик события сабмит для формы, который вызывает validate)
var password = {
	create: function(){
		$.get("../html/password.html", function(htmlCode){
			$("form").append(htmlCode);
			password.required();
			password.stylize();
		});
	},
	destroy: function(){
		$(".password-group").remove();
	},
	stylize: function(){
		$("#password").css(passwordOptions.styles.input);
		$(".password-message").css(emailOptions.styles.message);
		$(".glyphicon-star").css(emailOptions.styles.star)
	},
	required: function() {
		var reqIcon = $("<span class='glyphicon glyphicon-star form-control-feedback'></span>");
		if (passwordOptions.validation.required.value) {
			$("#password").after(reqIcon);
		}
	},
	_validate: function() {
		var passwordBox = $("#password");
		var passwordMessage = $(".password-message");
		if( passwordBox.val().length > passwordOptions.validation.maxlength.value ){
				passwordMessage.text(passwordOptions.validation.maxlength.message);
				return false
		}else{
			return true;
		}
	},
	submit: function() {
		$("form").on("submit", function(event){
			event.preventDefault();
			password._validate();
		});
	}
}

// объект настроек password с правилом валидации 
// required и maxlength и дефолтными стилем
var passwordOptions = {
	validation: {
		required: {
			value: true
		},
		maxlength: {
			value: 8,
			message: "Password is too long"
		}
	},
	styles: {
		input: {
			"background": "#ccc",
		},
		message: {
			"color": "red"
		},
		star: {
			"color": "blue"
		}
	}
}