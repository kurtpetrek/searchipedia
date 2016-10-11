"use strict";

String.prototype.cpl = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function preformSearch(userInput) {
  var search = userInput;
  $.getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + search + '&format=json&callback=?', function (data) {
    console.log(data);

    displayResults(data);

  });
}

function displayResults(data) {
  if(data.query.search.length == 0){
    $("#results").append("<a href='#search-field'><h2>No Entries</h2><h2>Try new search</h2></a>");
  }
  for (var x = 0; x < data.query.search.length; x++) {
    var item = ""
    var link = "https://en.wikipedia.org/wiki/" + data.query.search[x].title.replace(/\s/g, "_");
    item += "<a target='_blank' class='item' href='" + link + "'><div>";
    item += "<h2>" + data.query.search[x].title + "</h2>";
    item += "<p>" + data.query.search[x].snippet.cpl() + "...</p>";
    item += "</div></a>";
    $("#results").append(item);
  }

  $(".item").hover(function () {
    $(this).prev().css({
      'width': '80.5%',
      'padding': '7px 23px'
    });
    $(this).next().css({
      'width': '80.5%',
      'padding': '7px 23px',
      'box-shadow': '0px 0px 50px 0px rgba(0,0,0,0.75);'
    });
    $(this).css({
      'width': '82%',
      'padding': '10px 25px'
    });
  },function () {
    $(".item").css({
      'width': '80%',
      'padding': '5px 20px',
      'box-shadow': '0px 0px 32px 0px rgba(0,0,0,0.75);'
    });
  });
  
}

$("#search-field").focusin(function () {
    $("#search-field").css('width', '250px');
  $("#search-field").val('');
});

$("#search-field").focusout(function () {
  if ($('#search-field').val() == "") {
    $("#search-field").css('width', '40px');
  }
});
$("#submit-search").click(function (event) {
  event.preventDefault();
  preformSearch($('#search-field').val());
  $("#results").html("");
  $("form").css('top', '1%');
});


$(".item").hover(function () {
  $("body").css('background', 'black');
});





/* 
// Document Ready no jQuery
document.addEventListener("DOMContentLoaded", function(event) { 
  "use strict";
  
});
*/