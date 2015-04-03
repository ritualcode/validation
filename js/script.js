$(function(){
	//подгружаем html файлы с помощью метода create
	email.create();
	password.create(); 
	button.create(); 

	// на событие submit для формы запускаем функции-валидаторы (см. ниже);
	$("form").on("submit", function(event){
		event.preventDefault();
		emailVal();
		passwordVal();
	});

});

// функция-валидатор e-mail
function emailVal(){
	var emailBox = $("#email");
	var emailMessage = $(".email-message");
	if( emailBox.val().length > email_options.validation.maxlength ){
			emailBox.parent().addClass(email_options.styles.error); //botstrap клас ошибки назначается родителю
			emailMessage.text(email_options.validation.message);
			return false;
	}else{
		emailBox.parent().addClass(email_options.styles.success);
		return true;
	}
}

// функция-валидатор пароля
function passwordVal(){
	var passwordBox = $("#password");
	var passwordMessage = $(".password-message");
	if( passwordBox.val().length > password_options.validation.maxlength ){
			passwordBox.parent().addClass(password_options.styles.error);
			passwordMessage.text(password_options.validation.message);
			return false
	}else{
		passwordBox.parent().addClass(password_options.styles.success);
		return true;
	}
}