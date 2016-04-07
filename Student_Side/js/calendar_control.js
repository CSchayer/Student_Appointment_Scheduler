$(document).ready(function() {


    function showDatePicker()
    {
        if($('#counselorSelector').is(":none")) {
            $("#counselorSelector").show();
        }
    }

    $("#counselor").change(showDatePicker);

    $("#datepicker").datepicker({
        beforeShowDay: $.datepicker.noWeekends,
        onSelect: function(dateText, inst) {

            var date = $(this).datepicker('getDate');


            if ( $('#calendar').children().length == 0 ) {
               calendar = buildcalendar();
            }
            calendar.fullCalendar('changeView', 'agendaWeek');
            calendar.fullCalendar('gotoDate',date);
            }
    });

    $('#try-1').click(function(e) {
        $('#sign_up').lightbox_me({
            centered: true,
            onLoad: function() {
                $('#sign_up').find('input:first').focus()
            }
        });
        e.preventDefault();
    });

    function buildcalendar()
    {
       var tempcalendar= $('#calendar').fullCalendar({


            inline: true,
            // minTime: "07:00:00",
            //maxTime: "18:00:00",
            weekends: false,//hides weekend parameter
            //contentHeight: 'auto',
            nowIndicator: true,
            header: {
                left: 'prev',//sets buttons on top left
                center: 'title',//sets title
                right: 'next'//sets no buttons to top right
            },
        });
        return tempcalendar;
    }
})
