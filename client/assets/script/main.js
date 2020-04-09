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

const url = 'http://localhost:3000'

new Vue ({
    el: '#app',
    data: {
        card_backlog: data,
        card_todo: [],
        card_done: [],
        card_completed: [],
        sign_page: true,
        main_page: false,
        signin_field: true,
        signup_field: false,
        signin_email: '',
        signin_password: '',
        signup_name: '',
        signup_email: '',
        signup_password: '',

    },

    created(){
    },
    
    mounted(){
        this.checkSession()

    },

    methods: {
        checkSession: function(){
            const token = localStorage.getItem('token')
            console.log(token);
            
            if (token) {
                this.sign_page = false
                this.main_page = true
            } else {
                this.sign_page = true
                this.main_page = false
            }
        },

        toSignup: function(){
            this.signin_field = false
            this.signup_field = true
        },

        toSignin: function(){
            this.signin_field = true
            this.signup_field = false
        },

        signup: function(){
            // console.log(this.signup_name, this.signup_email, this.signup_password);
            axios({
                url: `${url}/user/signup`,
                method: 'POST',
                data: {
                    email: this.signup_name,
                    email: this.signup_email,
                    password: this.signup_password
                }
            })
                .then(() => {
                    this.signup_name = ''
                    this.signup_email = ''
                    this.signup_password = ''
                    this.signup_field = false
                    this.signin_field = true
                })
                .catch(err => {
                    console.log(err);
                })
        },
        
        signin: function(){
            // console.log(this.signin_email, this.signin_password);
            axios({
                url: `${url}/user/signin`,
                method: 'POST',
                data: {
                    email: this.signin_email,
                    password: this.signin_password
                }
            })
                .then(userLogin => {
                    this.signin_email = ''
                    this.signin_password = ''
    
                    localStorage.setItem('token', userLogin.data.payload.token)
                    this.checkSession()
                })
                .catch(err => {
                    console.log(err);
                })
            
        },

        toSignout: function(){
            localStorage.removeItem('token')
            this.main_page = false
            this.sign_page = true
        }
    }
})