import axios from 'axios';
import { message} from 'antd';

// 创建axios实例
const request = axios.create({
    baseURL:'/',
    timeout:5000
})

// response 拦截器
request.interceptors.response.use(
    response => {
        const code = response.status
        
        if (code < 200 || code > 300) {
          message.error(response.message);
          return Promise.reject('error')
        } else {
            const res = response.data
            const code = res.code
            if(code === 200){
                return res.data
            }else{
                message.error(res.msg);
            }
          
        }
      },error => {
        return Promise.reject(error)
      }
)

export default request