// JavaScript Document SEARCH DOCUMENT


// FIlter anything
$(document).ready(function(){
  $("#anythingSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myDIV div").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});