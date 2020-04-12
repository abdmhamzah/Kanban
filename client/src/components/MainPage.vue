<template>
    <div class="main_page">
            <header>
                <nav class="nav_content">
                    <div>
                        <a href="#" class="app_name">Orion Kanban</a>
                    </div>
                    <div class="button">
                        <a href="#" @click.prevent="toSignout" class="signout_button">Sign Out</a>
                    </div>
                </nav>
            </header>
        
            <main>
                <div class="container_main">
                    <BoardCategory 
                        v-for="(category, i) in title_category" 
                        :key="i" 
                        :category="category"
                        :list_tasks="list_tasks"
                        :url="url"
                        :title_category="title_category"
                        @deleteCard="deleteCard"
                        @updateCard="updateCard"
                    ></BoardCategory>
                </div>
            </main>
        </div>

</template>


<script>
import BoardCategory from './BoardCategory'


export default {
    name: 'MainPage',
    data(){
        return {
            list_tasks: [],
            title_category: ['Backlog', 'Todo', 'Done', 'Completed']
        }
    },
    created(){
        console.log('masuksini');
        
        this.getData()
    },
    props: ['url'],
    components: {
        BoardCategory
    },
    methods: {
        getData(){
            let token = localStorage.getItem('token')
            axios({
                url: `${this.url}/tasks/`,
                method: 'GET',
                headers: {
                    token: token
                }
            })
                .then(tasks => {
                    this.list_tasks = tasks.data.payload
                })
                .catch(err => {
                    console.log(err);
                })

        },
        updateCard(task){
            this.list_tasks.forEach(el => {
                if (task.id == el.id) {
                    el = task
                }
            });
        },
        deleteCard(id){
            let notDeleted = []
            this.list_tasks.forEach(el => {
                if (el.id != id) {
                    notDeleted.push(el)
                }
            });
            this.list_tasks = notDeleted
        },
        toSignout: function(){
            localStorage.clear()
            this.$emit('toSign')

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
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
    },
}
</script>