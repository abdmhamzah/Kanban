const dataTest = [
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
        card_backlog: dataTest, card_todo: [], card_done: [], card_completed: [],
        sign_page: true,
        main_page: false,
        signin_field: false,
        signup_field: true,
        signin_email: null, signin_password: null,
        signup_name: null, signup_email: null, signup_password: null,

    },

    created(){
        this.checkSession()
    },
    
    mounted(){
    },

    methods: {
        checkSession: function(){
            const token = localStorage.getItem('token')
            // console.log(token);
            
            if (token) {
                this.sign_page = false
                this.main_page = true
                this.getTasks()
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
            console.log('Nama user baru', this.signup_name);
            console.log('email user baru', this.signup_email);
            console.log('password user baru', this.signup_password);
            
            axios({
                url: `${url}/user/signup`,
                method: 'POST',
                data: {
                    name: this.signup_name,
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

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                        })
                        Toast.fire({
                        icon: 'success',
                        title: 'Signed Up Successfully'
                        })
                })
                .catch(err => {
                    console.log(err);

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                        })
                        Toast.fire({
                        icon: 'error',
                        title: 'Failed to Sign Up'
                        })
                })
        },
        
        signin: function(){
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

                    const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    })
                    Toast.fire({
                    icon: 'success',
                    title: 'Signed In Successfully'
                    })
                })
                .catch(err => {
                    console.log(err);

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                        })
                        Toast.fire({
                        icon: 'error',
                        title: 'Failed to Sign In'
                        })
                })
            
        },

        toSignout: function(){
            localStorage.removeItem('token')
            this.main_page = false
            this.sign_page = true

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
                Toast.fire({
                icon: 'info',
                title: 'Signed Out'
                })
        },

        getTasks: function(){
            const token = localStorage.getItem('token')
            // console.log(token);
            
            axios({
                url: `${url}/tasks/`,
                method: 'GET',
                headers: {
                    token: token
                }
            })
                .then(tasks => {
                    console.log(tasks.data.payload)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
})