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
            //console.log(calendar.fullCalendar('clientEvents'));
            }

    });
    document.getElementById("#submit").addEventListener("click", createAppointment);
   // document.getElementById("#cancel").addEventListener("click", cancelAppointmentForm);
})

var test1;
var test2;
var eventObject;
var eventJSON;
var button = $('#form');


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
}

function cancelAppointmentForm()
{
    $("#dialog").dialog('close');
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

function formParse()
{
    var form={
        "day":moment(eventObject.start,'MM-DD-YYYY'),
        "time": moment(eventObject.start,'h:mm A'),
        "service": $('#service option:selected').text(),
        "advisor": $("#counselor option:selected").text(),
        "student": $('#name').val(),
        "student Id": $('#title').val(),
    };
    return form;
}

function submitAppointment(appointment)
{
    sendAdvisor(appointment);

}

 function getAvailableTimes()
{
    var tempEventArray=[];
     $.ajax({
             async: false,
             url: "/api/advisor/availabletimes/" + $('#counselor option:selected').text(),
            //beforeSend:,
            //complete:,
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
        var eventSource= [];
        var i;
        var j =0;
        var opening={};
        var dateArray =["2016  4 20","2016 4 21","2016 4 22","2016 4 25","2016 4 26"];

        $.each(eventArray, function(key,availableTimes){
            for(i=0;i<availableTimes.length;i++) {
                opening = {
                    "title": "",
                    "start": new Date(dateArray[j] + " " + availableTimes[i])
                };
                eventSource.push(opening);
            }
            j++;
        });
    return eventSource;
}

//adds the
var populateCalendar = function()
{
    var eventArray=getAvailableTimes();
   var availableEvents = createEventArray(eventArray);
    return availableEvents
}

function populateCounselor(){
    $.getJSON("api/advisornames",function(data){
        test2 = $('#counselor');
        $.each(data, function(key,val){
           test2.append($("<option></option>")
                                  .attr("value",val).text(val));

        })

    });
}

function sendAdvisor(appointment)
{
 $.post("api/appointment/add",appointment);
}

