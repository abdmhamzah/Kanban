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
    methods: {
        deleteTask(id){
            let token = localStorage.getItem('token')
            // KONFIRMASI SEBELUM DELETE DI SINI

            axios({
                url: `${this.url}/tasks/${id}`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            })
                .then(deletedTask => {
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

                    console.log('sebelum emit');
                    this.$emit('deleteTask', id)
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
        },
        updateTask(id, direction){
            
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
                    
                    for (let i = 0; i < this.title_category.length; i++) {
                        if (this.task.category == this.title_category[i]) {
                            if (i + direction >= 0 && i + direction < this.title_category.length) {
                                this.task.category = this.title_category[i + direction]
                                break
                            }
                            else {
                                break
                            }
                        }
                    }

                    console.log('Eh dia pindah kan');   
                    this.$emit('updateTask', this.task)
                })
                .catch(err => {
                    console.log('error gan');
                    console.log(err);

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