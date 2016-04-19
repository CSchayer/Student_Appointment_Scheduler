// Javascript for the advisor sign in page

$("#loginForm").submit(function( event ) {
    event.preventDefault();

    var username = $("#username").val();
    var password = $("#pwd").val();
    var advisor;

    $.getJSON("/api/advisor/login/" + username, function(data) {
        advisor = data;
    }).done(function() {
        if (password === advisor.password) {
            localStorage.setItem("name", JSON.stringify(advisor.name));

            window.location = "/advisor";
        }
        else {
            shakeForm();
        }
    }).fail(function() {
        shakeForm();
    });
});

function shakeForm() {
    var l = 10;
    for( var i = 0; i < 10; i++ )
        $( "form" ).animate( {
            'margin-left': "+=" + ( l = -l ) + 'px',
            'margin-right': "-=" + l + 'px'
        }, 50);
}
