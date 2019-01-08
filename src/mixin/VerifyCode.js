import Vue from 'vue'
import Verification from '../Tool/Verification'

const verifyCodeMixin = Vue.mixin({
    data(){
        return{
            phone: '',
            verifyCode: '',
            verifyCodeText: '获取验证码',
            phoneErrorMessage: "",
            verifyCodeErrorMessage: "",
            disableBtnTime: 10,
            isSending: false,
            timer: null
        };
    },
    watch: {
        phone () {
            this.checkPhone();
        },
        verifyCode () {
            this.checkVerifyCode();
        },
    },
    methods: {
        checkPhone(){
            if(this.phone === ''){
                this.phoneErrorMessage = '请先输入手机号码';
                return false;
            }else if(!Verification.checkPhoneNumber(this.phone)){
                this.phoneErrorMessage = '请输入正确的手机号码';
                return false;
            } else {
                this.phoneErrorMessage = '';
                return true;
            }
            // if(this.phone == ''){
            //     this.phoneErrorMessage = '请先输入手机号码';
            //     return false;
            // }else if(!Verification.checkPhoneNumber(this.phone)){
            //     this.phoneErrorMessage = '请输入正确的手机号码';
            //     return false;
            // }else{
            //     console.log('号码合法');
            //     this.phoneErrorMessage = '';
            //     return true;
            // }
        },
        checkVerifyCode(){
            if(this.verifyCode == ''){
                this.verifyCodeErrorMessage = '请输入验证码';
                return false;
            }
            this.verifyCodeErrorMessage = '';
            return true;
        },
        countDown() {
            this.timer = setInterval(() => {
                this.verifyCodeText = `${this.disableBtnTime}s后再试`;
                this.isSending = true;
                this.disableBtnTime --;
                if(this.disableBtnTime < 0){
                    this.verifyCodeText = "重新发送";
                    this.disableBtnTime = 10;
                    this.isSending = false;
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },1000)
        },
    },
    beforeDestroy(){
        if(this.timer !== null){
            clearInterval(this.timer);
        }
    }
});

export default verifyCodeMixin;
