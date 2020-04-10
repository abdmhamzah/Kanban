<template>
    <div>
        <div class="sign_page" v-show="sign_page">
            <SigninForm></SigninForm>
        </div>
        <div class="main_page" v-show="main_page">
            <MainPage></MainPage>
        </div>
    </div>
</template>

<script>
import SigninForm from './components/SigninForm'
import MainPage from './components/MainPage'

export default {
    name: 'App',
    data() {
        return {
            sign_page: true,
            main_page: false,
        }
    },
    created(){
        this.checkSession()
    },
    components: {
        SigninForm,
        MainPage
    },
    methods: {
        checkSession: function(){
            const token = localStorage.getItem('token')
            if (token) {
                this.sign_page = false
                this.main_page = true
            } else {
                this.sign_page = true
                this.main_page = false
            }
        },
    }
}
</script>