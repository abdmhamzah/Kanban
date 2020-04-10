<template>
    <div class="container_main">
        <div class="board">
            <div class="board_category">
                <div class="board_title">Backlog</div>
                <div class="icon"><i class="fa fa-simplybuilt"></i></div>
            </div>
            <div class="board_content">
                <div class="def_card" v-if="cards_backlog.length == 0">No Data</div>
                <TaskCard
                    v-else 
                    v-for="task in cards_backlog" 
                    :key="task.id" 
                    :task="task"
                ></TaskCard>
            </div>
        </div>
        <div class="board">
            <div class="board_category">
                <div class="board_title">Todo</div>
                <div class="icon"><i class="fa fa-stack-overflow"></i></div>
            </div>
            <div class="board_content">
                <div class="def_card" v-if="cards_todo.length == 0">No Data</div>
                <TaskCard
                    v-else 
                    v-for="task in cards_todo" 
                    :key="task.id" 
                    :task="task"
                ></TaskCard>
            </div>
        </div>
        <div class="board">
            <div class="board_category">
                <div class="board_title">Done</div>
                <div class="icon"><i class="fa fa-check-square"></i></div>
            </div>
            <div class="board_content">
                <div class="def_card" v-if="cards_done.length == 0">No Data</div>
                <TaskCard
                    v-else 
                    v-for="task in cards_done" 
                    :key="task.id" 
                    :task="task"
                ></TaskCard>
            </div>
        </div>
        <div class="board">
            <div class="board_category">
                <div class="board_title">Completed</div>
                <div class="icon"><i class="fa fa-dollar"></i></div>
            </div>
            <div class="board_content">
                <div class="def_card" v-if="cards_completed.length == 0">No Data</div>
                <TaskCard
                    v-else 
                    v-for="task in cards_completed" 
                    :key="task.id" 
                    :task="task"
                ></TaskCard>
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
    data(){
        return {
            cards_backlog: [], 
            cards_todo: [], 
            cards_done: [], 
            cards_completed: [],
        }
    }
}
</script>