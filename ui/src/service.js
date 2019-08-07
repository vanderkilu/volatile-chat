
const key= 'vChat-username'
const storeUsername = (username) => localStorage.setItem(key, username)
const getUsername = () => localStorage.getItem(key)

const getRandomPos = () => {
   const size = ((Math.random()*100) + 50).toFixed();
   const x = (Math.random() * (document.body.clientWidth - size)).toFixed();
   const y = (Math.random() * (document.body.clientHeight - size)).toFixed();

   return {
      x,y
   }
}

export {storeUsername, getUsername, getRandomPos}

