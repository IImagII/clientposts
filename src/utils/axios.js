import axios from 'axios'

//делаем расширение для axios
const instance = axios.create({
   // baseURL: 'http://localhost:3002/api',

   baseURL: 'server-posts-full-stack-production.up.railway.app:3002/api',
})
//делам так чтобы при каждом запросе мы отсылали токен если он у нас есть
instance.interceptors.request.use(config => {
   config.headers.Authorization = window.localStorage.getItem('token')
   return config
})

export default instance
