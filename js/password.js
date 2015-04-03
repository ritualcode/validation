// объект password с методами создать (подгрузить html) и удалить
var password = {
	create: function(){
		$.get("../html/password.html", function(htmlCode){
			$("form").append(htmlCode);
		});
	},
	destroy: function(){
		$(".password-group").remove();
	}
}

// объект настроек e-mail с правилом валидации maxlength и стилем для валидного и невалидного значения
var password_options = {
	validation: {
		maxlength: 8,
		message: "Password is too long"
	},
	styles: {
		error: "has-error", //bootstrap style
		success: "has-success" //bootstrap style
	}
}