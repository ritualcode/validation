// объект email с методами 
// create (подгрузить html и вызвать методы stylize и required: см.ниже)
// destroy (удалить элемент)
// stylize (стилизовать в соответствии с найтройками)
// required (вставить звездочку если в настройках required.value == true)
// _validate (проверить maxlenght)
// submit (обработчик события сабмит для формы, который вызывает validate)
var email = {
	create: function(){
		$.get("../html/email.html", function(htmlCode){
			$("form").append(htmlCode);
			email.required();
			email.stylize();
		});
	},
	destroy: function(){
		$(".email-group").remove();
	},
	stylize: function(){
		$("#email").css(emailOptions.styles.input);
		$(".email-message").css(emailOptions.styles.message);
		$(".glyphicon-star").css(emailOptions.styles.star)
	},
	required: function() {
		$("#email").ready(function(){
			var reqIcon = $("<span class='glyphicon glyphicon-star form-control-feedback'></span>");
			if (emailOptions.validation.required.value) {
				$("#email").after(reqIcon);
			}
		});	
	},
	_validate: function(){
		var emailBox = $("#email");
		var emailMessage = $(".email-message");
		if( emailBox.val().length > emailOptions.validation.maxlength.value ){
			emailMessage.text(emailOptions.validation.maxlength.message);
			return false;
		}else{
			return true;
		}
	},
	submit: function(){
		$("form").on("submit", function(event){
		event.preventDefault();
		email._validate();
		});
	}
}

// объект настроек e-mail с правилом валидации 
// required и maxlength и дефолтными стилем
var emailOptions = {
	validation: {
		required: {
			value: true
		},
		maxlength: {
			value: 8,
			message: "Your e-mail is too long"
		}
	},
	styles: {
		input: {
			"background": "#ccc",
			"font-weight": "bold"
		},
		message: {
			"color": "red"
		},
		star: {
			"color": "blue"
		}
	}
}