// объект e-mail с методами создать (подгрузить html) и удалить
var email = {
	create: function(){
		$.get("../html/email.html", function(htmlCode){
			$("form").append(htmlCode);
		});
	},
	destroy: function(){
		$(".email-group").remove();
	}
}

// объект настроек e-mail с правилом валидации maxlength и стилем для валидного и невалидного значения
var email_options = {
	validation: {
		maxlength: 8,
		message: "Email is too long"
	},
	styles: {
		error: "has-error", //bootstrap style
		success: "has-success" //bootstrap style
	}
}