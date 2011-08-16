function CreateTask(ref,  name, parentlist_id, owner_id) {
	var ldata = { 'name':name, 'parentlist_id':parentlist_id, 'owner_id':owner_id, 'status':0}
  $.ajax({
   url:'/lists',
   data:{'list':ldata},
   beforeSend: function(req) {
           req.setRequestHeader("Accept", "text/xml");
   },
   success: function(data, status, responseObject) {
		ref.removeClass('unconfirmed');
		var newid = $(data).find('id').text();
		ref.wrapInner(function() {
		  return '<a href="' + responseObject.getResponseHeader('Location') + '" / >';
		});	
		ref.prepend('<input class="checker" id="checkbox_'+newid+'" type="checkbox">');
		ref.attr('id', newid)
   },
   type: 'POST', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
  });
}

function MakeOrSubmitTaskForm() {
    if ($("#newTask").length ==0) {
		$('#createPrompt').css('display', 'none');
		$('#createPrompt').after('<li id="newTask"><input type="text" id="taskName"/></li>');
		$("#taskName")[0].focus();			
	}
	else  {
	    if ($('#taskName').val().length) {
			var task_name = $('#taskName').val();
			var ref = $('<li class="task unconfirmed">'+task_name+'</li>');
			$('#createPrompt').after(ref);
			CreateTask(ref, task_name, parentlist_id, owner_id); // these come from embedded ruby in show.html
	        var curx = ref.offset().left;
			var cury = ref.offset().top;
			var newx=$('#tasklist li:last').offset().left;
            var newy=$('#tasklist li:last').offset().top;
            if($('#tasklist li.task').length ==1) {
                newy = newy + ref.height();
            }
            ref.css({"position": "absolute","left":curx+"px", "top":cury+"px"})
            .animate({"top":newy+"px","left":newx+"px"}, 500, function() { 
                ref.remove();
                $("#tasklist").append(ref);
                ref.removeAttr('style');
            });
					MakeSortable();
	    }
		$('#newTask').remove();
		$('#createPrompt').css('display', 'block');
	}
}


$("body").live('keypress', function(e){
	if (e.keyCode == 13) {
	    e.preventDefault(); //prevents sending the carriage return to the text field.
        MakeOrSubmitTaskForm();
	}
	
});
$("#createPrompt").live('click', function(){
        MakeOrSubmitTaskForm();
});

$(document).ready(function(){
	MakeSortable();
})

function MakeSortable(){
	$('#tasklist').sortable({
		axis: 'y',
		dropOnEmpty: false,
		cursor: 'crosshair',
		items: 'li',
		opacity: 0.4,
		scroll: true,
		start: function(e, ui){
			var pos = ui.item.index();
			ui.item.attr('oldposition', pos);
		},
		update: function(e, ui){
			var oldposition = ui.item.attr('oldposition');
			ui.item.removeAttr('oldposition');
			var poschange = ui.item.index()-oldposition;
			var thedata = 'id=' + ui.item.attr('id') + '&poschange=' + poschange;
			$.ajax({
				type: 'post',
				data: thedata,
				dataType: 'script',
				complete: function(request){
					
				$(ui.item).effect('highlight');
			},
			url: '/lists/sort'})
		}
	});
}
//13