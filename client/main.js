const url = 'https://orion-kanban.herokuapp.com'

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