<template>
    <div class="chat" :style="chat.style">
        <span class="chat__initial">{{chat.username.charAt(0)}}</span>
        <p class="chat__user">{{chat.username}}</p>
        <p class="chat__message">{{chat.message}}</p>
    </div>
</template>


<script>
export default {
    props: ['chat'],
}
</script>

<style scoped>
    .chat{
        display: grid;
        grid-template-columns: 1fr 3fr;
        background-color: white;
        width: 20%;
        margin: 1rem auto;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        border-radius: 3px;
        padding: 1rem 2rem;
        font-size: 1rem;
        color: #9e9e9e;
        position: absolute;
    }
    .chat__initial {
        grid-row: 1 / span 2;
        display: flex;
        width: 3rem;
        height: 3rem;
        justify-content: center;
        align-items: center;
        background-color: #f3e5f5;
        color: #4a148c;
        border-radius: 50%;
    }
    .chat__user {
        color: #4a148c
    }
    .chat__user {
        margin: 0;
    }
    .chat__message {
        font-size: 1.2rem;
        margin: 0;
    }
</style>