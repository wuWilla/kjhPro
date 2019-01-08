import BaseService from './service.base'
import Axios from 'axios'

class MemberService extends BaseService{
    /**
     * 请求用户的基本信息
     * params{String} userId
     * */
    getUserBase(userId){
        return Axios.get(`${this.httpRequestPathPrefix}/user/info`,{ params: { userId }});
    }
    /**
     * 获取用户的详细信息
     * params{String} userId
     * */
    getUserDetail(userId){
        return Axios.get(`${this.httpRequestPathPrefix}/user/info/detail`,{params: { userId }});
    }
    /**
     * 获取用户验证码
     * */
    getVerifyCode(bizType, phone){
        return Axios.post(`${this.httpRequestPathPrefix}/verifyCode/send/kjh`,{bizType, phone});
    }
    /**
     * 用户登陆
     * */
    login(phone, verifyCode){
        return Axios.post(`${this.httpRequestPathPrefix}/user/login`, {phone,verifyCode});
    }
    /**
     * 用户退出
     * */
    logout(){
        return Axios.post(`${this.httpRequestPathPrefix}/user/logout`)
    }
    /**
    * 用户注册
    */
    register(phone, verifyCode, data={}){
        return Axios.post(`${this.httpRequestPathPrefix}/user/register`, {phone,verifyCode, ...data});
    }
}
export default new MemberService();
