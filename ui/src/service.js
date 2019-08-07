
const key= 'vChat-username'
const storeUsername = (username) => localStorage.setItem(key, username)
const getUsername = () => localStorage.getItem(key)

export {storeUsername, getUsername}

