<template>
    <div class="board">
        <div class="board_category">
            <div class="board_title">{{ category }}</div>
            <div v-if="category == 'Backlog'" class="icon"><i class="fa fa-simplybuilt"></i></div>
            <div v-else-if="category == 'Todo'" class="icon"><i class="fa fa-stack-overflow"></i></div>
            <div v-else-if="category == 'Done'" class="icon"><i class="fa fa-check-square"></i></div>
            <div v-else-if="category == 'Completed'" class="icon"><i class="fa fa-dollar"></i></div>
        </div>
        <div class="board_content">
            <div class="def_card" v-if="filter_task.length == 0">No Data</div>
            <TaskCard 
                v-else 
                v-for="task in filter_task"
                :key="task.id"
                :task="task"
                :url="url"
                :title_category="title_category"
                @deleteTask="deleteCard"
                @updateTask="updateCard"
            ></TaskCard>
            <div class="card new_card">
                <a href="#" @click="toAddTask" v-show="add_button" class="new_task"><i class="fa fa-plus"></i> New Task</a>
                <input type="text" v-show="form_add" class="input_title" v-model="input_title" placeholder="Enter Task Title">
                <input type="text" v-show="form_add" class="input_desc" v-model="input_description" placeholder="Enter Task Description">
                <div v-show="form_add" class="button">
                    <button @click="addTask" class="submit_add">Submit</button>
                    <button @click="hideAddTask" class="cancel_add">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TaskCard from './TaskCard'

export default {
    name: "BoardCategory",
    components: {
        TaskCard
    },
    props: ['category', 'list_tasks', 'url', 'title_category'],
    data(){
        return {
            input_title: '',
            input_description: '',
            add_button: true,
            form_add: false
        }
    },
    computed: {
        filter_task(){
            let task = []
            this.list_tasks.forEach(el => {
                if (el.category == this.category) {
                    task.push(el)
                }
            });
            return task
        }
    },
    methods: {
        toAddTask(){
            this.add_button = false,
            this.form_add = true
        },
        hideAddTask(){
            this.add_button = true,
            this.form_add = false
        },
        addTask(){
            let token = localStorage.getItem('token')
            let name = localStorage.getItem('name')
            let email = localStorage.getItem('email')
            
            if (this.input_title == null ||  this.input_title == '') {
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
                icon: 'warning',
                title: 'Please Insert Your Task Title'
                })
            } else if (this.input_description == null || this.input_description == '') {
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
                icon: 'warning',
                title: 'Please Insert Your Task Description'
                })
            } else {
                axios({
                    url: `${this.url}/tasks/`,
                    method: 'POST',
                    headers: {
                        token: token
                    },
                    data: {
                        title: this.input_title, // INI DARI V MODEL
                        description: this.input_description, // INI DARI V MODEL
                        category: this.category // INI DARI PROPS
                    }
                })
                    .then(newTask => {
                        this.input_title = ''
                        this.input_description = ''
    
                        newTask.data.payload.User = {
                            name: name,
                            email: email
                        }
                        // console.log(newTask.data.payload.User);
                        this.list_tasks.push(newTask.data.payload)

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
                        icon: 'success',
                        title: 'New Task Added Successfully'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        updateCard(task){
            this.$emit('updateCard', task)
        },
        deleteCard(id){
            this.$emit('deleteCard', id)
        },
    }
}
</script>