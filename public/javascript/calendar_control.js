$(document).ready(function() {

    function showDatePicker()
    {
        if($('#datepicker').css('display')=='none') {
            $('#datepicker').show();
        }

    }

    function showReasonPicker()
    {
        if($('#serviceSelector').css('display')=='none') {
            $('#serviceSelector').show();
        }
    }
    $("#counselor").on('change',showReasonPicker);
    $("#serviceSelector").on('change', showDatePicker);

    var calendar;
    $(calendar).on()
    $("#datepicker").datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        onSelect: function(dateText, inst) {

            var d = $(this).datepicker('getDate');
            var dayOfWeek = d.getUTCDay();

            if ( $('#calendar').children().length == 0 ) {
               calendar = buildcalendar(dayOfWeek);
            }

            else{
            $("#calendar").fullCalendar('destroy');
            $("#calendar").fullCalendar(
                $.extend( {
                    inline: true,
                    // minTime: "07:00:00",
                    //maxTime: "18:00:00",
                    weekends: false,//hides weekend parameter
                    columnFormat:{
                        agenda:'ddd\n MMM/D'
                    },
                    //contentHeight: 'auto',
                   events:[{
                       title: 'Appointment',
                       start: new Date(),
                   },],
                    firstDay:dayOfWeek,
                    nowIndicator: true,
                    allDaySlot:false,
                    header: {
                        left: 'prev',//sets buttons on top left
                        center: 'title',//sets title
                        right: 'next'//sets no buttons to top right
                    },
                    eventClick: function(calEvent,jsEvent,view){

                    }
                })
            );}
            calendar.fullCalendar('changeView', 'agendaWeek');
            calendar.fullCalendar('gotoDate',d);
            }
    });

    function buildcalendar(day)
    {
       var tempcalendar= $('#calendar').fullCalendar({

            allDaySlot:false,
           columnFormat:{
               agenda:'ddd\n MMM D'
           },
            inline: true,
            // minTime: "07:00:00",
            //maxTime: "18:00:00",
            weekends: false,//hides weekend parameter
            //contentHeight: 'auto',
            firstDay:day,
            nowIndicator: true,
            header: {
                left: 'prev',//sets buttons on top left
                center: 'title',//sets title
                right: 'next'//sets no buttons to top right
            },
        });
        return tempcalendar;
    }
    function buildModal()
    {
        var dialog;
        dialog = $("#dialog").dialog({
            modal: true,
            resizable: false,

            buttons: {
                "Confirm": function() {
                    $(this).dialog("close");
                },
                "Exit": function() {
                    $(this).dialog("close");
                }
            }
        });
        return dialog;
    }
})
