import Axios from 'axios'

class WechatService{
    generateNo = 'gh_11b795aaca0b'
    scope = "snsapi_userinfo";

    getWechatUserInfo (code) {
        const data = {
            code,
            generateNo: this.generateNo
        };
        return Axios.post(`${this.httpRequestPathPrefix}/wechat/userinfo/bycode`, data);
    }
    getAuthUrl(redirect){
        const data = {
            generateNo: this.generateNo,
            redirectUri: redirect,
            scope: this.scope
        }
        return Axios.post(`${this.httpRequestPathPrefix}/wechat/oauth/url`, data);
    }
}
export default new WechatService();
