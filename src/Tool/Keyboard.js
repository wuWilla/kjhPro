import Timelock from './Timelock'

class Keyboard{
    typeStatic = {
        onInput: "2",
        twoInput: "1"
    };
    functionType = {
      /**
       * type 为1时
       * */
      resetLoginPassword: "1",
      resetTradingPassword: "2",
      inputLoginPasswordAndTradingPassword: "3",
      /**
       * type为2时
       * */
      loginPassword: "1",
      tradingPassword: "2"
    };
    orgId = "70";
    deviceId = "";
    modulusHex = "9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b";
    passwordWidgetHTMLId = "_PassWordWidget";
    passwordWidgetShadowHTMLId = "_PassWordShadow";
    jquery = null;
    checkPasswordHasRegisteredLock = null;

    constructor(){
        this.jquery = window.$;
        this.checkPasswordHasRegisteredLock = Timelock.addLock(this.checkPasswordHasRegistered.bind(this),500);
    }
    setPasswordWidgetParam (element) {
        this.jquery = window.$;
        if (!this.jquery) {
            setTimeout(this.setPasswordWidgetParam.bind(this, element), 500);
            return;
        }
        this.checkPasswordHasRegisteredLock();
        this.jquery(element).empty();
        const paramUrl = `http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw?orgId=${this.orgId}&isPasswd=true&deviceId=${this.deviceId}&width=`;
        this.jquery(element).attr("modulus-hex", this.modulusHex);
        this.jquery(element).attr("v-password-widget", paramUrl);
        this.jquery(element).PasswordWidget();
    }
    getCiphertext (element) {
        return this.jquery(element).$getCiphertext();
    }

    getPasswordLength (element) {
        return this.jquery(element).$getPasswordLength();
    }
    /**
     * 检测一个密码框的密码长度是否为无效值
     * @param {HTMLElement} element 密码框DOM元素
     * @return {Boolean} 为true时当前密码框为无效值
     */
    checkPasswordLengthEmpty (element) {
        return this.getPasswordLength(element) === undefined || this.getPasswordLength(element) === "0";
    }
    checkPasswordHasRegistered () {
        const passwordWidget = this.jquery(`#${this.passwordWidgetHTMLId}`);
        const passwordWidgetShadow = this.jquery(`#${this.passwordWidgetShadowHTMLId}`);
        if (passwordWidget) {
            passwordWidget.remove();
        }
        if (passwordWidgetShadow) {
            passwordWidgetShadow.remove();
        }
    }
    resetPasswordWidget (element) {
        return this.jquery(element).PasswordWidget();
    }
}
export default new Keyboard();
