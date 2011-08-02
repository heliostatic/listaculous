$("body").live('keypress', function(e){
	if (e.keyCode == 13) {
		if ($("#newTask").length ==0) {
			$('#createPrompt').css('display', 'none');
			$('#createPrompt').after('<input type="text" id="newTask"/>');
			$("#newTask")[0].focus();			
		}
		else {
			var task_name = $('#newTask').val();
			$('#createPrompt').after('<div class="unconfirmed">'+task_name+'</div>');
			$('#newTask').remove();
			$('#createPrompt').css('display', 'block');
		}
	}
	
});
//13