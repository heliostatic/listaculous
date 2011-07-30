$(".task").live("click", function() {
    var data = [$(this)[0].checked, $(this)[0].id]; // the value of input that need to send to server
    $.ajax({
     url:'/tasks/' + $(this)[0].id,
     success: function() {
         alert('success!')
     },
     type: 'PUT', //This won't work in IE6. Sorry IE6, this is the right REST verb.   
    });
});