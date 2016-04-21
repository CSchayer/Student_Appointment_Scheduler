$(document).ready(function() {

    populateCounselor();
    $("#counselor").on('change',showReasonPicker);
    $("#serviceSelector").on('change', showDatePicker);

    $("#datepicker").datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        minDate: new Date(),
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
    document.getElementById("#submit").addEventListener("click", createAppointment);
    document.getElementById("#cancel").addEventListener("click", cancelAppointmentForm);
})

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

//rebuilds the event calendar based on minicalendar input or after appointment has been made.
var buildCalender=function(day)
{

    var tempcalendar= $('#calendar').fullCalendar({

        height:700,
        minTime:"08:00:00",
        maxTime:"24:59:00",
        defaultTimedEventDuration:"00:30:00",
        allDaySlot:false,
        columnFormat:{
            agenda:'ddd\n MMM Do'
        },
        inline: true,
        weekends: false,//hides weekend parameter
        firstDay:day,
        events:populateCalendar(),

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
            $('form input').on('keypress', function(e) {
                return e.which !== 13;
            });
            $("#formDate").html("<b>Appointment Date:</b> "+ moment(calEvent.start).format('MMMM D, YYYY'));
            $("#formTime").html("<b>Appointment Time:</b> "+ moment(calEvent.start).format('h:mm A'));
            $("#formCounselor").html("<b>Counselor Requested:</b> "+$("#counselor option:selected").text());
            $("#formReason").html("<b>Reason for appointment:</b> "+$("#service option:selected").text());
            $("#dialog").dialog('open');

        },
    });
    return tempcalendar;
}

//creates an appointment object and posts the data to the appointment list, also updates the available times on the student side
function createAppointment()
{
    var formData=formParse();
    submitAppointment(formData);

    $("#dialog").dialog('close');
    $("#calendar").fullCalendar($("#datepicker").val());

}

//provides functionality to the cancel button on the form
function cancelAppointmentForm()
{
    $("#dialog").dialog('close');
}

//builds the modal that will contain the form for finalizing the appointment
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

//parses the data provided by the student.
function formParse()
{
    var form={
        "day":moment(eventObject.start).format('MM-DD-YYYY'),
        "time": moment(eventObject.start).format('h:mm A'),
        "service": $('#service option:selected').text(),
        "advisor": $("#counselor option:selected").text(),
        "student": $('#name').val(),
        "student Id": $('#title').val(),
    };
    return form;
}

//sends the appointment to the advisor side database and removes the available timeslot from the student side.
function submitAppointment(appointment)
{
    sendAdvisor(appointment);

}

//obtains the available times for the week based on the advisor chosen by the student.
 function getAvailableTimes()
{
    var tempEventArray=[];
     $.ajax({
             async: false,
             url: "/api/advisor/availabletimes/" + $('#counselor option:selected').text(),
             success: function (data) {
                 for (var i = 0; i < data[0].length; i++) {
                     for (var j = 0; j < data[0][i].available.length; j++) {
                         tempEventArray[i] = data[0][i].available;
                     }
                 }
             }
         });
         return tempEventArray;
}

//creates the eventArray that acts as the source for the fullcalendar events
function createEventArray(eventArray)
{
        //holds the event objects created in the nested loop.
        var eventSource= [];
        var i;
        //creates an event object properly formatted with start time that works with each browser
        var opening={};

        var dateArray =["2016/4/25","2016/4/26","2016/4/27","2016/4/21","2016/4/22"];
        var j = 0;

       //converts all the date and times to an appropriate date object.
        $.each(eventArray, function(key,availableTimes){
            for(i=0;i<availableTimes.length;i++) {
                var trials = new Date(dateArray[j]+" "+availableTimes[i]);
                console.log(trials);
                opening = {
                    "title": "",
                    "start":new Date(dateArray[j] + " " + availableTimes[i])

                };
                eventSource.push(opening);
            }
            j++;
        });
    console.log(dateArray);
    return eventSource;
}

//creates an array of object events from the available times form our database and acts as the event source for the fullcalendar call.
var populateCalendar = function()
{
    var eventArray=getAvailableTimes();
    var availableEvents = createEventArray(eventArray);
    return availableEvents
}

//populates the counselor selector based on the advisor list database.
function populateCounselor(){
    $.getJSON("api/advisornames",function(data){
        var counselorSelector = $('#counselor');
        $.each(data, function(key,val){
           counselorSelector.append($("<option></option>")
                                  .attr("value",val).text(val));
        })
    });
}

//makes a post request to the appointmentlist, as well as rerender the calendar events with the updated available times
function sendAdvisor(appointment)
{
    console.log(appointment);
    var posting = $.post("api/appointment/add",appointment);
      posting.done(function(){
          $('#calendar').fullCalendar('removeEvents');
          $('#calendar').fullCalendar('addEventSource', populateCalendar());
          $('#calendar').fullCalendar('rerenderEvents');
      });
}

