<template>
    <div class="wrapper">
        <div class="chatarea">
            <transition-group name="message">
                <app-chat v-for="(chat,i) in chats" :key="i" :chat="chat"></app-chat>
            </transition-group>
        </div>
        <div class="div chat-form">
            <form class="form" @submit.prevent="sendMessage">
                <input type="text" 
                placeholder="enter your message" 
                class="input"
                v-model="message">
                <button class="btn">send</button>
            </form>
        </div>
       
    </div>
</template>


<script>
import Chat from './Chat.vue'
import { getUsername, getRandomPos} from '../service'
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
        sendMessage() {
            if (this.message === '') {
                this.isError = true
                return
            }
            this.socket.emit('SEND_MESSAGE', {
                username: this.username,
                message: this.message,
                style: {
                    top: getRandomPos().y ,
                    left:  getRandomPos().x
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
    background-color: #183048;
    padding: 4rem 8rem; 
    height: 90vh;
    position: relative;
}
.chat-form {
    position: absolute;
    left: 50%;
    bottom: 4rem;
    transform: translateX(-50%);
    width: 100%;

}
.form {
     display: flex;
     padding: 0 20rem;
}
.input {
    padding: 1.4rem 2rem;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    border: 1px solid white;
    width: 100%;
    color: white;
    box-shadow: 0 0.2rem 1rem rgba(0,0,0,0.03);
}
.btn {
    display: inline;
    border: none;
    border-radius: 3px;
    border: 1px solid white;
    padding: 1.4rem 6rem;
    margin-left: 1rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,0.03);
    background-color: transparent;
    color: white;
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
