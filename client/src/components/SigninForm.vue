<template>
    <div class="sign_page" v-show="sign_page">
        <div v-show="signin_field">
            <div class="container_sign">
                <div class="signin">
                    <h4>Sign in Orion Kanban</h4>
                    <form @submit.prevent="signin">
                        <input v-model="signin_email" class="signin_username" type="email" placeholder="Enter email" required>
                        <input v-model="signin_password" class="signin_password" type="password" placeholder="Enter password" required>
                        <button type="submit" class="signin_button">Sign In</button>
                    </form>
                    <p>OR</p>
                    <button class="signin_google_button" @click.prevent="signinGoogle"><i class="fa fa-google"></i>Sign in with Google</button>
                    <a @click.prevent="toSignup" href="#" class="signin_register">Sign Up for an account</a>
                </div>
            </div>
        </div>

        <div v-show="signup_field">
            <div class="container_sign">
                <div class="signup">
                    <h4>Sign up for your account</h4>
                    <form @submit.prevent="signup">
                        <input v-model="signup_name" class="signup_name" type="text" placeholder="Enter your name" required>
                        <input v-model="signup_email" class="signup_email" type="email" placeholder="Enter your email" required>
                        <input v-model="signup_password" class="signup_password" type="password" placeholder="Enter your password" required>
                        <button class="signup_button">Sign Up</button>
                    </form>
                    <a href="#" class="cancel_signup_button" @click.prevent="toSignin">Cancel</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const url = 'https://orion-kanban.herokuapp.com'

export default {
    name: 'SigninForm',
    data(){
        return {
            sign_page: true,
            signin_field: true,
            signup_field: false,
            signin_email: null, signin_password: null,
            signup_name: null, signup_email: null, signup_password: null,
        }
    },
    methods: {
        toSignup(){
            this.signin_field = false
            this.signup_field = true
        },

        toSignin(){
            this.signin_field = true
            this.signup_field = false
        },

        signup(){           
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
                    this.signup_field = false
                    this.signin_field = true
                    this.resetForm()

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
                })
        },
        
        signin(){
            axios({
                url: `${url}/user/signin`,
                method: 'POST',
                data: {
                    email: this.signin_email,
                    password: this.signin_password
                }
            })
                .then(userLogin => {
                    localStorage.setItem('token', userLogin.data.payload.token)
                    localStorage.setItem('name', userLogin.data.payload.user.name)
                    localStorage.setItem('email', userLogin.data.payload.user.email)
                    this.resetFormO()
                    this.$emit('refreshSession')

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
                })
            
        },

        signinGoogle(){
            
            // this.$gAuth.signIn()
            //     .then(GoogleUser => {
            //         let id_token = GoogleUser.getAuthResponse().id_token
            //         console.log('masuk');
                    
            //         axios({
            //             url: `${url}/user/signin-google`,
            //             method: 'POST',
            //             headers: {
            //                 token: id_token
            //             }
            //         })
            //             .then(token => {
            //                 localStorage.setItem('token', token.data)
            //             })
            //             .catch(err => {
            //                 console.log(err);
                            
            //             })
            //     })
            //     .catch(err => {
            //         console.log(err);
                    
                // })
        },

        resetForm: function(){
            signin_email = null
            signin_password = null
            signup_name = null
            signup_email = null
            signup_password = null
        }
    },
    created(){

    }
}
</script>