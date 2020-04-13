<template>
    <div class="card">
        <div class="task_title">{{task.title}}</div>
        <div class="task_desc">{{task.description}}</div>
        <div class="task_footer">
            <div class="info">
                <div class="date">{{ date }}</div>
                <div class="email">{{task.User.email}}</div>
            </div>
            <div class="crud">
                <div>
                    <a href="#" @click.prevent="updateTask(task.id, 1)"><i class="fa fa-arrow-circle-right"></i></a>
                </div>
                <div>
                    <a href="#" @click.prevent="deleteTask(task.id)"><i class="fa fa-trash"></i></a>
                </div>
                <div>
                    <a href="#" @click.prevent="updateTask(task.id, -1)"><i class="fa fa-arrow-circle-left"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: ['task', 'url', 'title_category'],
    data(){
        return {
            date: new Date(this.task.createdAt).toDateString(),
        }
    },
    methods: {
        deleteTask(id){
            let token = localStorage.getItem('token')
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.value) {
                    axios({
                        url: `${this.url}/tasks/${id}`,
                        method: 'DELETE',
                        headers: {
                            token: token
                        }
                    })
                        .then(deletedTask => {
                            // console.log('sebelum emit');
                            this.$emit('deleteTask', id)

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
                                title: 'Task Successfully Deleted'
                            })
                        })
                        .catch(err=>{
                            console.log(err.response)

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
                                icon: 'error',
                                title: 'You Have No Permit'
                            })
                        })
                }
            })
        },
        updateTask(id, direction){
            
            let oldIndex 
            let newIndex
            for (let i = 0; i < this.title_category.length; i++) {
                if (this.task.category == this.title_category[i]) {
                    oldIndex = i
                    if (i + direction >= 0 && i + direction < this.title_category.length) {
                        newIndex = i + direction
                        this.task.category = this.title_category[newIndex]
                    }
                    break
                }
            }
            // console.log('old index', oldIndex);
            // console.log('new index', newIndex);
            
            let token = localStorage.getItem('token')
            axios({
                url: `${this.url}/tasks/${id}`,
                method: 'PUT',
                headers: {
                    token: token
                },
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    category: this.task.category
                }
            })
                .then(updateTask => {
                    this.$emit('updateTask', this.task)

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
                        title: 'Task Successfully Updated'
                    })
                })
                .catch(err => {
                    // console.log('error gan');
                    console.log(err);
                    this.task.category = this.title_category[oldIndex]

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
                        icon: 'error',
                        title: 'You Have No Permit'
                    })
                })
        }
    }
}
</script>