$(document).ready(function() {


    $("#parameterSelectMenu").selectmenu({

    });

    $('#calendar').fullCalendar({

        dayClick: function(date, jsEvent, view, resourceObj) {//swaps view from month to week when clicking on a day
            if(view.name != 'month')
                return;

            $('#calendar').fullCalendar('changeView', 'agendaWeek');
            $('#calendar').fullCalendar('gotoDate', date);
            $("#calendar").fullCalendar('rerenderEvents');
            /*Potentially put appointment data algorithm in here */
        },
        inline: true,
       // minTime: "07:00:00",
        //maxTime: "18:00:00",
        weekends: false,//hides weekend parameter
        //contentHeight: 'auto',
        nowIndicator:true,
        header: {
            left: 'prev,next',//sets buttons on top left
            center: 'title',//sets title
            right: ''//sets no buttons to top right
        },


    });

    $("#datepicker").datepicker({
        onSelect: function(dateText, inst) {

            //var d = new Date(dateText); // This line only worked for chrome ???
            var d = $(this).datepicker('getDate');

            //Fullcalendar
            $('#calendar').empty(); //clear the initial view
            calendar = $('#calendar').fullCalendar({



            });

            /*-------------------- Set the selected date ---------------------*/
            calendar.fullCalendar('gotoDate', d.getFullYear(), d.getMonth(), d.getDate());
            }
            /*onSelect: function(date) {
                $('#calendar').fullCalendar('changeView', 'agendaWeek');
                $('#calendar').fullCalendar('gotoDate', date);
            }*/
    });
})