<template>
    <div class="container">
        <div class="wrapper">
            <h3 class="text-bold"> Welcome to <span class="diff">vChat</span> group chat room </h3>
            <p class="text"> Join the chatroom by entering a username of choice  
                <span class="emoji">👊</span> 
            </p>
            <form class="user-form" @submit.prevent="setUsername">
                <input type="text" placeholder="enter username" 
                class="input" 
                v-model="username"
                :class="{error: isError}"
                @focus="isError = false"
                >
                <button class="btn">enter</button>
            </form>
        </div>
    </div>
</template>


<script>
import { storeUsername } from '../service'
export default {
    data() {
        return {
            username: '',
            isError: false
        }
    },
    methods: {
        setUsername() {
            if (this.username === '') {
                this.isError = true
                return 
            }
            storeUsername(this.username)
            this.$router.push({name: 'chatList'})
        }
    }
}
</script>

<style scoped>
    .container {
        padding: 6rem 12rem;
        background-color: #183048;
        height: 85vh;
        background-position: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .text {
        font-size: 1.7rem;
        color: #eeeeee;
        margin: 5rem 0;
    }
    .input{
        padding: 2rem 6rem;
        border: none;
        background-color: white;
        border-radius: 0 1rem 2rem rgba(0,0,0,0.03);
        border-bottom-color: #f3e5f5;
        transition: all 0.5s;
    }
    .btn {
        padding: 2rem 4rem;
        border: none;
        background-color: white;
        color: #ce93d8;
        margin-left: 2rem;
        cursor: pointer;
    }
    .input:focus, .btn:focus {
        outline: none;
    }
    .text-bold {
        font-size: 3rem;
        color: white;
    }
    .diff {
        color: #ce93d8;
    }
    .emoji {
        font-size: 1.7rem;
        color: #ce93d8;
    }
    .error {
        border: 1px solid red;
    }
</style>