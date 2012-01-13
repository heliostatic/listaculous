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