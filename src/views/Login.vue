<template>
    <div class="login">
        <LoginContainer mode="login" @submit="login"/>
    </div>
</template>

<script>
    import { Toast } from 'vant'
    import MemberService from '../api/member.service'
    import LoginContainer from '../components/login/LoginContainer'
    import {AjaxReturnState} from "../config/ajax.config";
    import { Types } from "../store/mutation-types";
    import PageTitle from "../Tool/PageTitle";

    export default {
        name: "Login",
        data(){
            return{
                title: '登陆',
                isGetting: false
            }
        },
        components: {
            LoginContainer
        },
        methods:{
            login(data){
                if(this.isGetting){
                    return;
                }
                Toast.loading();
                this.isGetting = true;
                MemberService.login(data.phone,data.verifyCode).then((res) => {
                    if(res.data.code === AjaxReturnState.success){
                        this.$store.commit(Types.UPDATE_USER_ID,{userId: res.data.userId, token: res.data.token});
                        const { redirect } = this.$route.query;
                        this.$router.replace(redirect || '/home');
                    }else{
                        Toast.clear();
                        Toast(res.data.message);
                        this.isGetting = false;
                    }
                }).catch(() => {
                    Toast.clear();
                    Toast("请求错误");
                    this.isGetting = false;
                })
            },
        },
        created () {
            PageTitle.updatePageTitle(this.title);
        }
    }
</script>

<style scoped>

</style>
