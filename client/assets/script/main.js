const data = [
    {
        title: 'Bikin Bakso',
        description: 'Coba buatkan bakso ala mie ayam yamin, hayolo',
        date: new Date(),
        email: 'hamzah@mail.com'
    },
    {
        title: 'Makan Bakso',
        description: 'Balik mau nugas malah melipir',
        date: new Date(),
        email: 'hamzah@mail.com'
    },
    {
        title: 'Cari Es Campur',
        description: 'Abis makan mala haus',
        date: new Date(),
        email: 'hamzah@mail.com'
    }
]


new Vue ({
    el: '#app',
    data: {
        card_backlog: data,
        card_todo: data,
        card_done: data,
        card_completed: data
    }
})