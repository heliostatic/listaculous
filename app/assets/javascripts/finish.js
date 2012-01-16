function ExpandList(list_id, el, recurse) {
    FetchChildren(list_id, el, recurse);
    $(el).parent().addClass('expanded');
}

function FetchChildren(list_id, el, recurse) {
	var uri = '/listchildren/' + list_id;
	$.ajax({
		type:'GET',
		url: uri,
		success: function(data, textStatus, jqXHR) {
		    $(el).parent().append(data);
		    if(recurse) {
			    var expanders = $(el).siblings('ul').children('li').children('.listExpander');
			    for (var i=0; i<expanders.length; i++) {
			        var childel = $(expanders[i]);
    			    var list_id = childel.parent().attr('id');
    			    ExpandList(list_id, childel, true);  
			    }
			}
			
		}
	});
}

//When enter is pressed, we should either focus to the input box, submit the input box, or blur if the input box is focused and empty.
function focusOrSubmit() {
    var input = $("#list_name");
    if ( $("#list_name:focus").length ) {
        if (input.val().length == 0){
            input.blur();
        }
        else {
            input.parent().submit();
            parid = $('#list_parentlist_id').val();
            //find or create the UL to hold the sublist.
            var reful = $('#list_'+parid)[0] ? $('#list_'+parid) : $('#'+parid).append('<ul id="list_'+parid+'"></ul>');
            var tlist = $('<li class="temporary">'+input.val()+'</li>')
            reful.append(tlist);
            var curx = $('#list_name').offset().left;
            var cury = $('#list_name').offset().top;
            var newx = $(reful).offset().left;
            var newy = $(reful).offset().top + $(reful).outerHeight() -tlist.outerHeight();
            tlist.css({
                "position": "absolute",
                "left": curx + "px",
                "top": cury + "px"
            }).animate({
                "top": newy + "px",
                "left": newx + "px"
            }, 500, function () {
                tlist.removeAttr('style');
            });
            input.val('');
        }
    }
    else {
        input.focus();
    }
    
}

$("body").live('keypress', function (e) {
    if (e.keyCode == 13) {
        focusOrSubmit();
        e.preventDefault(); //prevents sending the carriage return to the text field.
    }
});

$('#expandAll').live('click',function(){
  CollapseAll();
    var expanders = $('.listExpander');
	for (var i=0; i<expanders.length; i++) {
	        var childel = $(expanders[i]);
		    var list_id = childel.parent().attr('id');
		    ExpandList(list_id, childel, true);  
	}
});

$('#collapseAll').live('click',function(){
  CollapseAll();
});

function CollapseAll(){
    var expanders = $('.listExpander');
	for (var i=0; i<expanders.length; i++) {
	      var childel = $(expanders[i]);
	      if(childel.parent().attr('class','expanded')) {
  		    childel.click();
		    }
	}
}

$(".task .checker").live("click", function() {
    $(this).closest('form').submit();
});

$(".listExpander").live('click', function(){
    var id= $(this).parent().attr('id');
    if ($(this).parent().hasClass('expanded')) {
        $(this).parent().children('ul').remove();
        $(this).parent().removeClass('expanded');
    }
    else {
      ExpandList(id, this);
      $(this).parent().addClass('expanded');  
    }
    
});