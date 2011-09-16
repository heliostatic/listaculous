function FetchChildren(list_id, el) {
	var uri = '/listchildren/' + list_id;
	$.ajax({
		type:'GET',
		url: uri,
		success: function(data, textStatus, jqXHR) {
			$(el).parent().append(data);
		}
	});
}

$(".task .checker").live("click", function() {
    var status = ($(this)[0].checked)?1:0;
    var tdata = { 'id':$(this).parent()[0].id , 'status':status }
    var el = this;
    $.ajax({
     url:'/lists/' + $(this).parent()[0].id,
     data:tdata,
     success: function() {
		$(el).parent().toggleClass('finished');	
			
         //we may want to delay actually checking the task off until we get a response from the server. Until we get here we might display some intermediary state.
     },
     type: 'PUT', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
    });
});

$(".listExpander").live('click', function(){
    var id= $(this).parent().attr('id');
    if ($(this).parent().hasClass('expanded')) {
        $(this).parent().children('ul').remove();
        $(this).parent().removeClass('expanded');
    }
    else {
      FetchChildren(id, this);
      $(this).parent().addClass('expanded');  
    }
    
});