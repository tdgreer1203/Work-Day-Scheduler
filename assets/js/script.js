var eventsArray = [];

//Sets the date in the heading
$('#currentDay').text(moment().format('dddd, MMMM Do'));

//This is just the funciton to save the tasks. 
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArray));
}

//This creates the layout of the screen when the application is started
//Later on, I will include the ability to load saved events
function createDay() {
    var container = $('.container');
    var time = moment().hours(8).format('hA');
    eventsArray = JSON.parse(localStorage.getItem("events"));

    for(var i = 0; i < 10; i++) {
        var rowTime = moment().hours(8).add(i, 'hours').format('hA');
        var row = $("<div>").addClass("row");
        var timeCol = $("<div>").addClass("col-12 col-md-1 hour").text(rowTime);
        var descriptionCol = $("<div>").addClass("description col-12 col-md-10");

        if(!eventsArray) {
            eventsArray = [];
        } else {
            for(var x = 0; x < eventsArray.length; x++) {
                if(eventsArray[x].time == rowTime) {
                    descriptionCol.text(eventsArray[x].text);
                }
            }
        }

        var saveCol = $("<div>").addClass("saveBtn col-12 col-md-1").append("<span class='oi oi-file'></span>");
        row.append(timeCol, descriptionCol, saveCol);
        container.append(row);
    }
};

//Replaces the actual description area with a text area field to add/update an event
$(".container").on("click", "div.description", function(event) {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass('col-12 col-md-10').val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

//Updates both UI and eventsArray when user is done editing event.
$(".container").on("blur", "textarea", function(event) {
    var text = $(this).val().trim();
    var eventTime = $(this).parent().find("div.hour").text();
    var descriptionArea = $("<div>").addClass("description col-12 col-md-10").text(text);
    var position = eventsArray.findIndex(object => {
        return object.time == eventTime;
    });

    if(!text) {
        eventsArray.splice(position, 1);
    } else {
        var event = {
            time: eventTime,
            text: text
        }
        eventsArray.splice(position, 1, event);
    }

    saveEvents();

    $(this).replaceWith(descriptionArea);
});

//Call saveEvents function when save button is pressed
//Super simple function, because most of the logic is handled during an event edit.
$(".container").on("click", "div.saveBtn", function() {
    saveEvents();
});

//Created function for updating page formatting. 
function updateTaskStatus() {
    $("div.description").each(function() {
        var currentTime = moment().hour();
        var eventTime = moment($(this).parent().find("div.hour").text(), ['hA']).format("H");

        if(eventTime < currentTime) {
            $(this).addClass('past');
        } else if (eventTime == currentTime) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });
}

setInterval(function() {
    updateTaskStatus();
}, (1000 * 60) * 5);

createDay();
updateTaskStatus();