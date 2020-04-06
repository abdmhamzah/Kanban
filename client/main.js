const url = 'http://localhost:3000'

$(document).ready(function(){
    test()
})

function test(){
    $.get(`${url}/`)
        .done(test => {
            console.log(test.messege);
            $('#test').append(`<p> ${test.messege} </p>`)
        })
}