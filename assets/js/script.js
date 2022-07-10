var eventsArray = [];

//Sets the date in the heading
$('#currentDay').text(moment().format('dddd, MMMM Do'));

//This is just the funciton to save the tasks. 
function saveTasks() {
    localStorage.setItem("events", JSON.stringify(eventsArray));
}

//This creates the layout of the screen when the application is started
//Later on, I will include the ability to load saved events
function createDay() {
    var container = $('.container');
    var time = moment().hours(8).format('hA');

    for(var i = 0; i < 10; i++) {
        var row = $("<div>").addClass("row");
        var timeCol = $("<div>").addClass("col-1 hour").text(moment().hours(8).add(i, 'hours').format('hA'));
        var descriptionCol = $("<div>").addClass("description col-10 past");
        var saveCol = $("<div>").addClass("saveBtn col-1").append("<span class='oi oi-file'></span>");

        row.append(timeCol, descriptionCol, saveCol);
        container.append(row);
    }
}

//Replaces the actual description area with a text area field to add/update an event
$("div.description").on("click", function(event) {
    console.log(event);
    var text = $(this).text().trim();
    var textInput = $("<textarea>").val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

createDay();