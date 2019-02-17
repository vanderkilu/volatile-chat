
const key= 'vChat-username'
const storeUsername = (username) => localStorage.setItem(key, username)
const getUsername = () => localStorage.getItem(key)

const isDue = (prev, cur) => {
   const scale = 1000 * 10
   const elapse = cur - new Date(prev)
   console.log(elapse)
   return elapse >= scale
}


export {storeUsername, getUsername, isDue}

