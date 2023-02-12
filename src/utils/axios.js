import axios from 'axios'

//делаем расширение для axios
const instance = axios.create({
   // baseURL: 'http://localhost:3002/api',

   baseURL: 'https://server-posts-full-stack-production.up.railway.app/api',
})
//делам так чтобы при каждом запросе мы отсылали токен если он у нас есть
instance.interceptors.request.use(config => {
   config.headers.Authorization = window.localStorage.getItem('token')
   return config
})

export default instance
