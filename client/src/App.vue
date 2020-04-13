<template>
    <div>
        <SigninForm
            class="sign_page"
            v-if="sign_page"
            :url="url"
            @toMain="toMain"
        ></SigninForm>
        <MainPage
            class="main_page"
            v-if="main_page"
            :url="url"
            @toSign="toSign"
        ></MainPage>
    </div>
</template>

<script>
const mainUrl = 'https://orion-kanban.herokuapp.com'
// const mainUrl = 'http://localhost:3000'
import SigninForm from './components/SigninForm'
import MainPage from './components/MainPage'

export default {
    name: 'App',
    data() {
        return {
            url: mainUrl,
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
            if (!token) {
                // console.log('ga ada token');
                this.sign_page = true
                this.main_page = false
            } else {
                // console.log('ada token');
                this.sign_page = false
                this.main_page = true
            }
        },
        toMain(){
            this.sign_page = false
            this.main_page = true
        },
        toSign(){
            this.sign_page = true
            this.main_page = false
        }
    }
}
</script>