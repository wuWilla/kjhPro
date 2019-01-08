import axios from "axios"
import DateTool from "../Tool/dateTool"
import StringTool from "../Tool/StringTool"
import { Dialog, Toast } from "vant";
import { Types } from "../store/mutation-types";
import store from "../store/index"

class AxiosConfig {
    deviceId = "";
    token = "";

    createRequestTime () {
        const now = new Date();
        return DateTool.transformDateTime2String(now);
    }
    createRequestSystem () {
        return "1";
    }
    cerateRequestNo () {
        return "1";
    }
    createSystemType () {
        return "H5";
    }
    createDeviceId () {
        if(this.deviceId == ""){
            this.deviceId = StringTool.randomString(16);
        }
        return this.deviceId;
    }
    addCommonDataToRequest () {
        axios.interceptors.request.use((config) => {
           const requestTime = this.createRequestTime();
           const requestSystem = this.createRequestSystem();
           const requestNo = this.cerateRequestNo();
           const deviceId = this.createDeviceId();
           const systemType = this.createSystemType();
           config.headers = {
               token: this.token
           };
           if(config.method === "get"){
               if(!config.params){
                   config.params = {};
               }
               const params = config.params;
               params.requestTime = requestTime;
               params.requestSystem = requestSystem;
               params.requestNo = requestNo;
               params.deviceId = deviceId;
               params.systemType = systemType;
           }else{
               if(!config.data){
                   config.data = {}
               }
               const data = config.data;
               data.requestTime = requestTime;
               data.requestSystem = requestSystem;
               data.requestNo = requestNo;
               data.deviceId = deviceId;
               data.systemType = systemType;
           }
            return config;

        });
    }

    handle401OfResponse (router) {
        axios.interceptors.response.use((response) => {
            return response;
        },(error) => {
            if( error.response.status === 401){
                window.localStorage.removeItem("UID");
                window.localStorage.removeItem("TOKEN");
                Toast.clear();
                Dialog.confirm({
                    title: "提示",
                    message: "您的登录状态已经过期，请问是否跳转到登录页面?"
                }).then(() => {
                    router.replace({
                        path: "/login",
                        query: {
                            redirect: window.location.pathname.replace(/\/kjh/,"") + window.location.search
                        }
                    });
                }).catch(() => {
                    store.commit(Types.CLEAR_USER_ID);
                    router.replace("/home");
                });
            }
            return Promise.reject(error);
            });
    }
}
export default new AxiosConfig();
