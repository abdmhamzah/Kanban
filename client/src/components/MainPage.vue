<template>
    <div class="main_page" v-show="main_page">
            <header>
                <nav class="nav_content">
                    <div>
                        <a href="#" class="app_name">Orion Kanban</a>
                        <a href="#" class="addTask_button">New Task</a>
                    </div>
                    <div class="button">
                        <a href="#" @click.prevent="toSignout" class="signout_button">Sign Out</a>
                    </div>
                </nav>
            </header>
        
            <main>
                <div>
                    
                </div>
                <div class="container_main">
                    <div class="board">
                        <div class="board_category">
                            <div class="board_title">Backlog</div>
                            <div class="icon"><i class="fa fa-simplybuilt"></i></div>
                        </div>
                        <div class="board_content">
                            <div class="def_card" v-if="cards_backlog.length == 0">No Data</div>
                            <div class="card" v-else v-for="(task, index) in cards_backlog" :key="index">
                                <div class="task_title">{{task.title}}</div>
                                <div class="task_desc">{{task.description}}</div>
                                <div class="task_footer">
                                    <div class="info">
                                        <div class="date">{{task.createdAt}}</div>
                                        <div class="email">{{task.email}}</div>
                                    </div>
                                    <div class="crud">
                                        <div><a href="#"><i class="fa fa-trash"></i></a></div>
                                        <div><a href="#"><i class="fa fa-pencil"></i></a></div>
                                        <div><a href="#"><i class="fa fa-refresh"></i></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="board">
                        <div class="board_category">
                            <div class="board_title">Todo</div>
                            <div class="icon"><i class="fa fa-stack-overflow"></i></div>
                        </div>
                        <div class="board_content">
                            <div class="def_card" v-if="cards_todo.length == 0">No Data</div>
                            <div class="card" v-else v-for="(task, index) in cards_todo" :key="index">
                                <div class="task_title">{{task.title}}</div>
                                <div class="task_desc">{{task.description}}</div>
                                <div class="task_footer">
                                    <div class="info">
                                        <div class="date">{{task.createdAt}}</div>
                                        <div class="email">{{task.email}}</div>
                                    </div>
                                    <div class="crud">
                                        <div><a href="#"><i class="fa fa-trash"></i></a></div>
                                        <div><a href="#"><i class="fa fa-pencil"></i></a></div>
                                        <div><a href="#"><i class="fa fa-refresh"></i></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="board">
                        <div class="board_category">
                            <div class="board_title">Done</div>
                            <div class="icon"><i class="fa fa-check-square"></i></div>
                        </div>
                        <div class="board_content">
                            <div class="def_card" v-if="cards_done.length == 0">No Data</div>
                            <div class="card" v-else v-for="(task, index) in cards_done" :key="index">
                                <div class="task_title">{{task.title}}</div>
                                <div class="task_desc">{{task.description}}</div>
                                <div class="task_footer">
                                    <div class="info">
                                        <div class="date">{{task.createdAt}}</div>
                                        <div class="email">{{task.email}}</div>
                                    </div>
                                    <div class="crud">
                                        <div><a href="#"><i class="fa fa-trash"></i></a></div>
                                        <div><a href="#"><i class="fa fa-pencil"></i></a></div>
                                        <div><a href="#"><i class="fa fa-refresh"></i></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="board">
                        <div class="board_category">
                            <div class="board_title">Completed</div>
                            <div class="icon"><i class="fa fa-dollar"></i></div>
                        </div>
                        <div class="board_content">
                            <div class="def_card" v-if="cards_completed.length == 0">No Data</div>
                            <div class="card" v-else v-for="(task, index) in cards_completed" :key="index">
                                <div class="task_title">{{task.title}}</div>
                                <div class="task_desc">{{task.description}}</div>
                                <div class="task_footer">
                                    <div class="info">
                                        <div class="date">{{task.createdAt}}</div>
                                        <div class="email">{{task.email}}</div>
                                    </div>
                                    <div class="crud">
                                        <div><a href="#"><i class="fa fa-trash"></i></a></div>
                                        <div><a href="#"><i class="fa fa-pencil"></i></a></div>
                                        <div><a href="#"><i class="fa fa-refresh"></i></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

</template>


<script>
export default {
    data(){
        return {
            cards_backlog: [], cards_todo: [], cards_done: [], cards_completed: [],
            main_page: true,
        }
    },
    methods: {
        getData(){

        },
        toSignout: function(){
            localStorage.removeItem('token')
            this.main_page = false

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
    },
    created(){
        
    }
}
</script>