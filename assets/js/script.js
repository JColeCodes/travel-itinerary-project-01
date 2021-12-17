function pageInit()
{
    console.log("running pageInit");
}


function pageReady()
{
    console.log("running pageReady");

    var button = document.getElementById("go_to_my_itinerary");
    if (button != null){
        button.addEventListener("click", function(){
            window.location = "itinerary.html";
        });
    }

    /*button = document.getElementById("explore");  
    if (button != null){
        button.addEventListener("click", function(){
            window.location = "results.html";
        });
    }*/

    button = document.getElementById("go_to_search");  
    if (button != null){
        button.addEventListener("click", function(){
            window.location = "index.html";
        });
    }
}
window.onload = pageInit;
jQuery(document).ready(pageReady);

// calendar 
$(".list-group").on("click", "span", function() {
 
    var date = $(this).text().trim();
  
    var dateInput = $("<input>").attr("type", "text").addClass("form-control").val(date);
  
    $(this).replaceWith(dateInput);

    $("#modalDueDate").datepicker({
    minDate: 1
});
// additional Jquery code
$( ".selector" ).datepicker({
    changeMonth: true
  });

dateInput.trigger("focus");
});

// Local Storage
var savedPlaces = [];
if ("saved-places" in localStorage) {
  savedPlaces = JSON.parse(localStorage.getItem("saved-places"));
}

//var dummydata = [{place:"place name"},{place:"place name 2"},{place:"place name 3"}];
for (var i = 0; i < savedPlaces.length; i++) {
  var dataName = savedPlaces[i].place;
  var fullSortable = $("<div>")
    .addClass("grid-x");
  var timeDiv = $("<div>")
    .addClass("time cell small-2 hidden");
  var costDiv = $("<div>")
    .addClass("cost cell small-2 hidden");
  var sortdiv = $("<div>").text(dataName).addClass("saved-place cell auto");

  var editButton = $("<span>").addClass("edit-place").html("<i class=\"fas fa-pencil-alt\"></i>");

  sortdiv.append(editButton);
  fullSortable
    .append(timeDiv)
    .append(sortdiv)
    .append(costDiv);
  $(".initial").append(fullSortable);
}

// sortable 
$(".sortable").sortable({
    // enable dragging across lists
    connectWith: $(".sortable"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function() {
      $(this).addClass("dropover");
    },
    deactivate: function() {
      $(this).removeClass("dropover");
    },
    over: function(event, ui) {
      $(event.target).addClass("dropover-active");
      //ui.children(".time").removeClass("hidden");
      //ui.children(".cost").removeClass("hidden");
    },
    out: function(event, ui) {
      $(event.target).removeClass("dropover-active");
    }/*,
    
    update:function() {
      var tempArr = [];

      $(this)
        .children()
        .each(function() {
          tempArr.push({
            text: $(this)
              .find("p")
              .text()
              .trim(),
            date: $(this)
              .find("span")
              .text()
              .trim()
          });
        });
  
      var arrName = $(this)
        .attr("id")
        .replace("list-", "");
  
      tasks[arrName] = tempArr;
      saveTasks();
    },
    stop: function(event) {
      $(this).removeClass("dropover");
    }*/
  });


var destinationText = "";

var currentSearch = {};
if ("saved-location" in localStorage) {
  currentSearch = JSON.parse(localStorage.getItem("saved-location"));

  destinationText = currentSearch.city;
  if (currentSearch.state) {
    destinationText += ", " + currentSearch.state;
  }
  if (currentSearch.country) {
    destinationText += ", " + currentSearch.country;
  }
}
var destinationName = $("#destination-name").text(destinationText);

if (!currentSearch.budget) {
  var inputBudget = $("<input>")
    .attr("type", "number")
    .attr("min", 1)
    .attr("name", "budget");
  $("#current-budget").find("p").replaceWith(inputBudget);
} else {
  $("#current-budget").find("p").text("$" + currentSearch.budget);
}

$("#current-budget").on("click", "p", function() {
    var getNum = $("#current-budget").find("p").text().trim();

    console.log(getNum);

    var currentBudgetNum = getNum.replace("$", "");

    console.log(currentBudgetNum);

    var inputBudget = $("<input>")
      .attr("type", "number")
      .attr("name", "budget")
      .attr("min", 1)
      .val(currentBudgetNum);

    $("#current-budget").find("p").replaceWith(inputBudget);
});

$("#current-budget").on("blur", "input", function() {
  var textBudgetNum = $("#current-budget").find("input").val().trim();

  var displayBudget = $("<p>")
    .text("$" + textBudgetNum);
  
  $("#current-budget").find("input").replaceWith(displayBudget);

  currentSearch.budget = textBudgetNum;
  localStorage.setItem("saved-location", JSON.stringify(currentSearch));
});