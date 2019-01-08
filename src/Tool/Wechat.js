import UrlTool from '../Tool/UrlTool'
import WechatService from '../api/wechat.service'
import {AjaxReturnState} from "../config/ajax.config";

class Wechat{
    jssdkSrc = "https://res.wx.qq.com/open/js/jweixin-1.4.0.js";
    afterWxReadySubscribe = [];
    code = '';

    constructor(){
        this.global = window;
    }

    runSubscribeAfterReady () {
        this.afterWxReadySubscribe.forEach((e, i) => {
            e();
            if (i === this.afterWxReadySubscribe.length - 1) {
                this.afterWxReadySubscribe = [];
            }
        });
    }
    wxReady () {
        this.wx = this.global.wx;
        this.runSubscribeAfterReady();
    }
    requireJssdk(){
        const head = this.global.document.querySelector("head");
        const script = this.global.document.createElement("script");
        script.src = this.jssdkSrc;
        script.text = 'text/javascript';
        script.onload = this.wxReady.bind(this);
        head.appendChild(script);
    }
    saveUserInfo(code) {
        WechatService.getWechatUserInfo(code).then(res => {
            if (res.data.code === AjaxReturnState.success) {
                window.sessionStorage.setItem("openid", res.data.openid);
                window.sessionStorage.setItem("nickname", res.data.nickname);
                window.sessionStorage.setItem("sex", res.data.sex);
                window.sessionStorage.setItem("country", res.data.country);
                window.sessionStorage.setItem("province", res.data.province);
                window.sessionStorage.setItem("city", res.data.city);
                window.sessionStorage.setItem("headimgurl", res.data.headimgurl);
                window.sessionStorage.setItem("subscribe", res.data.subscribe);
                if (res.data.subscribeTime) {
                    window.sessionStorage.setItem("subscribeTime", res.data.subscribeTime);
                }
            }
        });
    }


    async init(){
        try {
            const code = UrlTool.getUrlParamByKey("code");
            if(code){
                this.code = code;
                this.requireJssdk();
                this.saveUserInfo(code);
            }else{
                const res = await  WechatService.getAuthUrl(window.location.href);
                if (res.data.code === AjaxReturnState.success) {
                    window.location.href = res.data.bootUrl;
                }
            }
        }catch (err) {
            console.log(err);
        }
    }
}
export default new Wechat();
