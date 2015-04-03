// объект button с методами создать (подгрузить html) и удалить
var button = {
	create: function(){
		$.get("../html/button.html", function(htmlCode){
			$("form").append(htmlCode);
		});
	},
	destroy: function(){
		$("button").remove();
	}
}