<template>
    <div class="register">
        <LoginContainer mode="register" @submit="register"/>
    </div>
</template>

<script>
    import PageTitle from '../Tool/PageTitle'
    import { Toast } from 'vant'
    import LoginContainer from '../components/login/LoginContainer'
    import MemberService from '../api/member.service'
    import {AjaxReturnState} from "../config/ajax.config";
    import { Types } from "../store/mutation-types";

    export default {
        name: "Register",
        data() {
            return{
                data: '注册',
                isGetting: false
            }
        },
        components:{
            LoginContainer
        },
        methods:{
            register(data){
                if(this.isGetting){
                    return;
                }
                const userData = {
                    openId: window.sessionStorage.getItem("openid"),
                    nickName: window.sessionStorage.getItem("nickname"),
                    sex: window.sessionStorage.getItem("sex"),
                    country: window.sessionStorage.getItem("country"),
                    province: window.sessionStorage.getItem("province"),
                    city: window.sessionStorage.getItem("city"),
                    headImgUrl: window.sessionStorage.getItem("headimgurl"),
                    subscribe: window.sessionStorage.getItem("subscribe")
                }
                const subscribeTime = window.sessionStorage.getItem('subscribeTime')
                if(subscribeTime){
                    userData.subscribeTime = subscribeTime;
                }
                this.isGetting = true;
                MemberService.register(data.phone, data.verifyCode,userData).then((res) => {
                        if (res.data.code == AjaxReturnState.success){
                            this.$store.commit(Types.UPDATE_USER_ID, {userId: res.data.userId, token: res.data.token});
                            const { redirect } = this.$route.query;
                            this.$router.replace(redirect || "/member");
                        }else{
                            Toast(res.data.message);
                            this.isGetting = false;
                        }
                    }
                ).catch(()=> {
                    Toast("请求错误");
                    this.isGetting = false;
                })
            }
        },
        created () {
            PageTitle.updatePageTitle(this.title);
        }
    }
</script>

<style scoped>

</style>
