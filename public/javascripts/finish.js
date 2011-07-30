$(".task").live("click", function() {
    var status = ($(this)[0].checked)?1:0;
    var tdata = { 'id':$(this)[0].id , 'status':status }
    $.ajax({
     url:'/tasks/' + $(this)[0].id,
     data:tdata,
     success: function() {
         //we may want to delay actually checking the task off until we get a response from the server. Until we get here we might display some intermediary state.
     },
     type: 'PUT', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
    });
});