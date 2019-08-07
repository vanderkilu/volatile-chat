<template>
    <div class="wrapper">
        <div class="chat-container">
            <div class="chat-container__body">
                <transition-group name="message">
                    <app-chat v-for="(chat,i) in chats" :key="i" :chat="chat"></app-chat>
                </transition-group>
            </div>
            <form class="chat-container__form" @submit.prevent="sendMessage">
                <input type="text" 
                placeholder="enter your message" 
                class="input"
                v-model="message">
                <button class="btn">send message</button>
            </form>
        </div>
    </div>
</template>


<script>
import Chat from './Chat.vue'
import { getUsername, isDue} from '../service'
import io from 'socket.io-client'
export default {
    data() {
        return {
            message: '',
            socket: io('http://192.168.43.156:3000'),
            chats: [],
            isError: false,
        }
    },
    beforeRouteEnter (to, from, next) {
        if(getUsername() === null ) {
           this.$router.push({name: 'home'})
        }
        next()
    },
    components: {
        appChat: Chat
    },
    methods: {
         randomPos() {
            return Math.floor(Math.random() * 50) + '%'
        },
        sendMessage() {
            if (this.message === '') {
                this.isError = true
                return
            }
            this.socket.emit('SEND_MESSAGE', {
                username: this.username,
                message: this.message,
                style: {
                    top: this.randomPos() ,
                    left:  this.randomPos()
                }
            })
            this.message = ''
        },
        lru() {
            setTimeout(()=> {
                this.chats.shift()
                this.lru()
            }, 8000)
        }
    },
    beforeMount() {
        this.username = getUsername()
        this.socket.on('SENT_MESSAGE', (message)=> {
            this.chats.push(message)
        })
        this.lru()
    },
    
}
</script>

<style scoped>
.wrapper {
    width: 95%;
    margin: 1rem auto;
}
.chat-container {
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
    background-color: #183048;
    padding: 4rem 8rem;
    height: 80vh;
    display: flex;
    flex-direction: column;
}
.chat-container__body {
    flex: 5;
    position: relative;
}
.chat-container__form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input {
    padding: 2rem;
    background-color: white;
    border: none;
    border-radius: 3px;
    flex-basis: 70%;
    box-shadow: 0 0.2rem 1rem rgba(0,0,0,0.03);
}
.btn {
    display: flex;
    width: 5rem;
    height: 5rem;
    border: none;
    border-radius: 3px;
    flex: 30%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,0.03);
    background-color: white;
    color: #183048;
    cursor: pointer;
}
.btn:focus, .btn:active {
    outline: none;
}
.input:focus {
    outline: none;
}

::-webkit-input-placeholder { 
  font-family: inherit;
  text-align: center;
  color: #9e9e9e;
}
::-moz-placeholder { 
    font-family: inherit;
    text-align: center;
    color: #9e9e9e;
}
:-ms-input-placeholder {
    font-family: inherit;
    text-align: center;
    color: #9e9e9e;
}
:-moz-placeholder { 
    font-family: inherit;
    text-align: center;
    color: #9e9e9e;
}
.message-enter-active, .message-leave-active {
    transition: all 1s;
}
.message-enter, .message-leave-to {
    opacity: 0;
    transform: translateY(4rem);
}
.message-move {
    transition: all 1s;
}
</style>
