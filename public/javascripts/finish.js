$(".task").live("click", function() {
    var data = [$(this)[0].checked, $(this)[0].id]; // the value of input that need to send to server
    alert(data);
    $.get(url, data, // make ajax request
     function(html) { // function to handle the response
      $("#worked").html("html"); // change the inner html of update div
     });
});