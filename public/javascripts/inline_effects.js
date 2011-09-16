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

function MakeOrSubmitTaskForm(parentlist_id) {
    if ($("#newTask").length ==0) {
		$('#createPrompt').css('display', 'none');
		$('#createPrompt').after('<div id="newTask"><input type="text" id="taskName"/></div>');
		$("#taskName")[0].focus();			
	}
	else  {
	    var parentlist = '#list_' + parentlist_id;
	    if ($('#taskName').val().length) {
			var task_name = $('#taskName').val();
			var ref = $('<li class="task unconfirmed">'+task_name+'</li>');
			$(parentlist).append(ref);
			CreateTask(ref, task_name, parentlist_id, owner_id); // these come from embedded ruby in show.html
			
	        var curx = $('#newTask').offset().left;
			var cury = $('#newTask').offset().top;
			try {
				var newx=$(parentlist + ' li:last').offset().left;
	            var newy=$(parentlist + ' li:last').offset().top;
			}
			catch (err) {
				if(err.name == 'TypeError'){
				    var newx=$(parentlist).offset().left;
		            var newy=$(parentlist).offset().top;
			    }
				else throw(err);
			}
      ref.css({"position": "absolute","left":curx+"px", "top":cury+"px"})
      .animate({"top":newy+"px","left":newx+"px"}, 500, function() { 
          ref.remove();
          $(parentlist).append(ref);
          ref.removeAttr('style');
      });
      MakeSortable(); //may not be necessary
	    }
		$('#newTask').remove();
		$('#createPrompt').css('display', 'block');
	}
}


$("body").live('keypress', function(e){
	if (e.keyCode == 13) {
  	var parentid = $("#createPrompt").parent().attr('id');
    MakeOrSubmitTaskForm(parentid);
    e.preventDefault(); //prevents sending the carriage return to the text field.

	}
	
});

$('.task').live({mouseenter: function(e)
    {
        var addel = '<span id="adder">+</span>';
        if( $(this).children('#createPrompt').length == 0 && $(this).parent().children('#createPrompt').length == 0 ) {
            $(this).append(addel);
        }
        
        e.stopPropagation();
    },
    mouseleave: function(e)
    {
        $('#adder').remove();
        e.stopPropagation();
    }
});

$('#adder').live('click', function(e){
    var parent = $(e.target).parent();
    var prompt = $('#createPrompt').detach();
    var targ = parent.children('a');
    if( targ.length == 0 ) {
      targ = $('h1');
    }
    targ.after(prompt);
    prompt.children('input').focus();
    $('#adder').remove();
});

$("#createPrompt").live('focus', function(){
        MakeOrSubmitTaskForm();
});

$(document).ready(function(){
	MakeSortable($('.tasklist')[0]);
})

function MakeSortable(list){
	$(list).sortable({
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
			var parentlist_id = $(list).attr('data-listid');
			var thedata = 'id=' + ui.item.attr('id') + '&poschange=' + poschange + '&parent_id='+parentlist_id;//parentlist_id automagic from show.html
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