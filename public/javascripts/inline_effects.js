function CreateTask(ref,  name, parentlist_id, owner_id) {
	var ldata = { 'name':name, 'parentlist_id':parentlist_id, 'owner_id':owner_id, 'status':0}
  $.ajax({
   url:'/lists',
   data:{'list':ldata},
   success: function() {
		ref.removeClass('unconfirmed');	
   },
   type: 'POST', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
  });
}

$("body").live('keypress', function(e){
	if (e.keyCode == 13) {
		if ($("#newTask").length ==0) {
			$('#createPrompt').css('display', 'none');
			$('#createPrompt').after('<input type="text" id="newTask"/>');
			$("#newTask")[0].focus();			
		}
		else {
			var task_name = $('#newTask').val();
			var ref = $('<div class="unconfirmed">'+task_name+'</div>');
			$('#createPrompt').after(ref);
			CreateTask(ref, task_name, parentlist_id, owner_id); // these come from embedded ruby in show.html
			$('#newTask').remove();
			$('#createPrompt').css('display', 'block');
		}
	}
	
});
//13