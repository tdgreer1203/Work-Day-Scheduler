var eventsArray = [];

$('#currentDay').text(moment().format('dddd, MMMM Do'));

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



createDay();