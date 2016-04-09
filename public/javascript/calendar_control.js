$(document).ready(function() {

    $("#counselor").on('change',showReasonPicker);
    $("#serviceSelector").on('change', showDatePicker);

    $("#datepicker").datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        onSelect: function(dateText, inst) {

            var d = $(this).datepicker('getDate');
            var dayOfWeek = d.getUTCDay();

            if ( $('#calendar').children().length == 0 ) {
               calendar = buildCalender(dayOfWeek);
            }

            else {
                $("#calendar").fullCalendar('destroy');
                calendar = buildCalender(dayOfWeek);
            }

            calendar.fullCalendar('changeView', 'agendaWeek');
            calendar.fullCalendar('gotoDate',d);
            }
    });
    document.getElementById("#submit").addEventListener("click", formSubmit);
})

var test1;
var eventObject;

var showReasonPicker= function ()
{
    if($('#serviceSelector').css('display')=='none') {
        $('#serviceSelector').show();
    }
}
var showDatePicker= function()
{
    if($('#datepicker').css('display')=='none') {
        $('#datepicker').show();
    }

}

var buildModal = function()
{
    var dialog;
    dialog = $("#dialog").dialog({
        autoOpen: false,
        width:"50%",
        resize:"auto",
        modal:true,
    });
    return dialog;
}

var buildCalender=function(day)
{
    var tempcalendar= $('#calendar').fullCalendar({
        height:700,
        minTime:"08:00:00",
        maxTime:"23:00:00",
        allDaySlot:false,
        columnFormat:{
            agenda:'ddd\n MMM Do'
        },
        inline: true,
        weekends: false,//hides weekend parameter
        firstDay:day,
        events:[{
            title: '',
            start: new Date(),
        },],

        eventColor:'#FDD023',
        header: {
            left: 'prev',//sets buttons on top left
            center: 'title',//sets title
            right: 'next'//sets no buttons to top right
        },
        eventClick: function(calEvent,jsEvent,view){
            buildModal();
            eventObject = calEvent;
            $('#form').css({
                'width':'100%',
                'height':'100%',})
            $("#formDate").html("<b>Appointment Date:</b> "+ moment(calEvent.start).format('MMMM Do YYYY'));
            $("#formTime").html("<b>Appointment Time:</b> "+ moment(calEvent.start).format('h:mm A'));
            $("#formCounselor").html("<b>Counselor Requested:</b> "+$("#counselor option:selected").text());
            $("#formReason").html("<b>Reason for appointment:</b> "+$("#service option:selected").text());
            $("#dialog").dialog('open');

        },
    });
    return tempcalendar;
}

function formSubmit()
{
    test1={
        "day":moment(eventObject.start).format('MMMM Do YYYY'),
        "time": moment(eventObject.start).format('h:mm A'),
        "service": $('#service option:selected').text(),
        "advisor": $("#counselor option:selected").text(),
        "student": $('#name').val(),
        "student Id": $('#title').val(),
    };
}