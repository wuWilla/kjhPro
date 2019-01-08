<template>
    <div class="login-container">
        <div class="bg"/>
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="">
            <div class="name">
                财税通理财
            </div>
        </div>
        <div class="login-form">
            <div class="input-wrapper">
                <div class="input">
                    <input v-model="phone" type="text" placeholder="请输入手机号码">
                </div>
                <transition name="van-fade">
                    <div class="error-message" v-if="phoneErrorMessage !== ''">{{phoneErrorMessage}}</div>
                </transition>
                <div class="input">
                    <input type="text" v-model="verifyCode" placeholder="请输入验证码">
                    <div class="btn" :class="{'disable': isSending}" @click="getVerityCode">{{verifyCodeText}}</div>
                </div>
                <div class="error-message" v-if="verifyCodeErrorMessage !== ''">{{verifyCodeErrorMessage}}</div>

                <div class="register" v-if="mode == 'login'" @click="goToRegister">还没有帐号?立即注册></div>
                <div class="submit-button" @click="submit"> 立即{{ mode == 'login' ? '登录':'注册'}}</div>
            </div>
        </div>
        <div class="tips" v-if="mode == 'register'">
            温馨提示：注册即代表您已同意<span>《用户服务协议》</span>和<span>《用户隐私协议》</span>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant'
    import MemberConfig from '../../config/member.config'
    import verifyCodeMixin from '../../mixin/VerifyCode'
    import MemberService from '../../api/member.service'
    import {AjaxReturnState} from "../../config/ajax.config";

    export default {
        name: "LoginContainer",
        props: ["mode"],
        // data(){
        //     return {
        //         mode : "login"
        //     }
        // },
        mixins: [verifyCodeMixin],
        methods: {
            getVerityCode() {
                console.log('获取验证码已经点击');
                if(!this.checkPhone()){
                    return;
                }
                if(this.isSending){
                    return;
                }
                this.isSending = true;
                const bizType = this.mode == 'register' ? MemberConfig.getVerifyCodeType.Register : MemberConfig.getVerifyCodeType.Login;
                MemberService.getVerifyCode(bizType, this.phone).then((res) => {
                    if(res.data.code == AjaxReturnState.success && res.data.sendStatus == MemberConfig.verifyCodeSendStatus.success){
                        Toast("验证码发送成功，请注意查收");
                        this.countDown();
                    }else{
                        Toast(res.data.message);
                        this.isSending = false;
                    }
                }).catch(() => {
                    Toast('请求失败');
                    this.isSending = false;
                });
            },
            submit(){
                if(this.checkPhone() && this.checkVerifyCode()){
                    this.$emit("submit",{phone: this.phone, verifyCode: this.verifyCode});
                }
            },
            goToRegister(){
                const { redirect } = this.$route.query;
                const query = redirect ? { redirect } : {};
                this.$router.replace({ path: "/register", query });
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    @import "../../style/mixin";

    .login-container{
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        .bg{
            position: absolute;
            width: 750px;
            height: 750px;
            border-radius: 50%;
            background-color: $bg-color-blue;
            top: -524px;
            left: -184px;
            z-index: -1;
        }
        .logo{
            @include lr-center-transform(absolute);
            top: 50px;
            img{
                margin: 0 auto;
                display: block;
                width: 70px;
                height: 70px;
                border-radius: 100%;
                background: $bg-color-white;
            }
            .name{
                font-weight: bold;
                color: $text-color-white;
                margin-top: 10px;
                font-size: 17px;
            }
        }
        .login-form{
            /*overflow: hidden;*/
            /*position: absolute; 父盒子不能浮动，子盒子撑不起来*/
            /*top: 188px;*/
            z-index: 9999;
            margin: 188px $side-padding 15px;
            background: $bg-color-white;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
            .input-wrapper{
                width: 100%;
                padding: 24px 20px 30px;
                .input{
                    padding: 20px 0px 0px;
                    position: relative;
                    text-align: left;
                    input{
                        padding-top: 0px;
                        padding-bottom: 0px;
                        border: none;
                        height: 44px;
                        line-height: 44px;
                        /*padding: 10px 0;*/
                    }
                    .btn{
                        position: absolute;
                        right: 0;
                        bottom: 0px;
                        width: 100px;
                        height: 38px;
                        line-height: 38px;
                        font-size: 14px;
                        color: $text-color-orange;
                        text-align: center;
                        &.disable{
                            color: $text-color-gray;
                        }
                        &::before{
                            content: '';
                            display: inline-block;
                            height: 28px;
                            width: 0;
                            border: 1px solid $border-color-gray-dark;
                            @include tb-center(absolute);
                            left: 0;
                        }
                    }
                    &:after{
                        content: '';
                        display: block;
                        @include pointFiveBorder('bottom',$border-color-gray-dark)
                    }
                }
                .error-message{
                    position: absolute;
                    color: red;
                    text-align: left;
                    font-size: 12px;
                }
            }
            .register{
                font-size: 12px;
                color: $text-color-blue;
                text-align: right;
                margin-top: 5px;
            }
            .submit-button{
                background: $bg-color-blue;
                color: $text-color-white;
                margin: 40px 30px 0px;
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                font-size: 18px;
            }
        }
        .tips{
            margin: 0 $side-padding;
            font-size: 14px;
            color: $text-color-gray;
            text-align: justify;
        }
    }

</style>
