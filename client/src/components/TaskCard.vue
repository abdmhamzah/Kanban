<template>
    <div class="card">
        <div class="task_title">{{task.title}}</div>
        <div class="task_desc">{{task.description}}</div>
        <div class="task_footer">
            <div class="info">
                <div class="date">{{task.createdAt }}</div>
                <div class="email">{{task.User.email}}</div>
            </div>
            <div class="crud">
                <div>
                    <a href="#" @click.prevent="deleteTask(task.id)"><i class="fa fa-trash"></i></a>
                </div>
                <div>
                    <a href="#" @click.prevent="updateTask(task.id, task.title, task.description)"><i class="fa fa-pencil"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        task: Object
    },
    methods: {
        deleteTask(id){
            axios({
                url: `https://orion-kanban.herokuapp.com/tasks/${id}`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            })
                .then()
                .catch(err=>{
                    console.log(err.response)
                })
        },
        updateTask(id, title, desc){

        }
    }
}
</script>