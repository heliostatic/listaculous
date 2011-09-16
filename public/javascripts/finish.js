function FetchChildren(list_id) {
	var uri = '/listchildren/' + list_id;
	$.ajax({
		type:'GET',
		url: uri,
		success: function(data, textStatus, jqXHR) {
			alert(data)
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