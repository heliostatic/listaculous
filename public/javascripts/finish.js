$(".task").live("click", function() {
    var status = ($(this)[0].checked)?1:0;
    var tdata = { 'id':$(this)[0].id , 'status':status }
    $.ajax({
     url:'/tasks/' + $(this)[0].id,
     data:tdata,
     success: function() {
         
     },
     type: 'PUT', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
    });
});