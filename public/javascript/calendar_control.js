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
            console.log(calendar.fullCalendar('clientEvents'));
            }

    });
    document.getElementById("#submit").addEventListener("click", createAppointment);
})

var test1;
var test2;
var eventInfo;
var eventObject;
var eventJSON;
var counselorJSON=[];

var button = $('#form');
var showReasonPicker= function ()
{
    if($('#serviceSelector').css('display')=='none') {
        $('#serviceSelector').show();
    }
}
var showDatePicker= function()
{
    populateCalendar();
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
        maxTime:"24:59:00",
        allDaySlot:false,
        columnFormat:{
            agenda:'ddd\n MMM Do'
        },
        inline: true,
        weekends: false,//hides weekend parameter
        firstDay:day,
        events:[{
            title:'',
            start:new Date(),

        }],

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
function createAppointment()
{
    formParse();
    submitAppointment();
}
function formParse()
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

function submitAppointment()
{
    //Push to counselor appoints.
    //Delete from available appointments
}

 function getAvailableTimes()
{
    var eventArray=[];
    $.getJSON("/api/advisor/availabletimes/"+$('#counselor option:selected').text(),function(data){
            var i = 0;
        $.each( data, function( key, val ) {
            $.each(val, function()
            {
                console.log(val[i].available);
                eventArray.push(val[i].available);
                i++;
            });
            console.log(eventArray);
        });
    });
    return eventArray;
}

function createEventArray(eventArray)
{
        var eventSource= [];
        var i;

    $.each(eventArray,function(availableTimes){
        console.log(availableTimes);
        for(i=0;i<availableTimes.size();i++) {
            eventSource.push({
                "title": "",
                "start": availabltTimes[i]

            });
        }
    });
}

function populateCalendar()
{
    var availableTimes = getAvailableTimes();

    createEventArray(availableTimes);
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


