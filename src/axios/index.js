
import axios from "axios";
import qs  from 'qs';
import { Spin,Modal } from 'antd';



  const ajax = (options)=>{
    let loading;
    if (options.data && options.data.isShowLoading !==false){
        loading = document.getElementById('loadingbox');
        loading.style.display = 'block'
    }
    if(options.method == 'POST'){
        options.data = qs.stringify(options.data)
    }
    let baseApi ='https://easy-mock.com/mock/5d08a8c2e143b931f98e254d/echarts';
    return new Promise((resolve, reject)=>{ 
    axios({
        url: options.url, // 定义请求地址
        method: options.method, // 定义请求方式
        baseURL: baseApi ,  //定义baseUrl
        timeout: 5000 ,//超时报错
        params: (options.data && options.data.params ||'')//传进来的参数
    }).then((response)=>{
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('loadingbox');
            loading.style.display = 'none'
        }
            if( response.status == '200'){ // 请求成功200
                let res = response.data;
                if(res.code == '0'){ 
                resolve(res); //请求成功抛出数据
            }else{
                Modal.info({ // 使用moda弹窗提示
                    title:'提示' ,
                    content: res.msg
                })
            }}else{
                reject(response.data) // 报错的时候返回的数据
            }
    })
    })
  }

    

  export default ajax;