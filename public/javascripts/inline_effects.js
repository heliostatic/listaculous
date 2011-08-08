function CreateTask(ref,  name, parentlist_id, owner_id) {
	var ldata = { 'name':name, 'parentlist_id':parentlist_id, 'owner_id':owner_id, 'status':0}
  $.ajax({
   url:'/lists',
   data:{'list':ldata},
   beforeSend: function(req) {
           req.setRequestHeader("Accept", "text/xml");
   },
   success: function(data) {
		ref.removeClass('unconfirmed');
		var newid = $(data).find('id').text();	
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
		else  {
		    if ($('#newTask').val().length > 1) {
    			var task_name = $('#newTask').val();
    			var ref = $('<li class="task unconfirmed">'+task_name+'</li>');
    			$('#createPrompt').after(ref);
    			CreateTask(ref, task_name, parentlist_id, owner_id); // these come from embedded ruby in show.html
		    }
			$('#newTask').remove();
			$('#createPrompt').css('display', 'block');
		}
	}
	
});
//13