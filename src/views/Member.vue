<template>
    <div class="member-wrapper body-bg-gray">
        <div class="member-bg"/>
        <div class="member-info-wrapper">
            <div class="info-list">
                <img :src="userInfo.avatar || defaultAvatar" alt="用户头像">
                <p v-if="userId != '' ">{{userInfo.loginId}}</p>
                <p v-else>{{userInfo.status}}</p>
            </div>
            <router-link v-if="userId === ''" to="/login">
             <div class="login-button">立即登陆</div>
            </router-link>
            <div v-else class="login-button" @click="logOut">退出登陆</div>
            <van-row type="flex">
                <van-col span="8" v-for="(item, index) in tableList" :key="index">
                    <router-link :to="item.URL">
                    <TableView  :tableView="item"/>
                    </router-link>
                </van-col>
            </van-row>
        </div>
        <div class="show-view-list">
            <van-cell-group>
                <div v-for="(item, index) in shopList" :key="index">
                    <van-cell :title="item.title" :to="item.URL" is-link />
                </div>
            </van-cell-group>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'vant'
    import Footer from '../components/common/Footer'
    import TableView from '../components/member/TableView'
    import { mapGetters } from 'vuex'
    import { Types } from '../store/mutation-types'
    import MemberService from '../api/member.service'
    import {AjaxReturnState} from "../config/ajax.config";
    import PageTitle from "../Tool/PageTitle";

    export default {
        name: "Member",
        components: {
            TableView,
            Footer
        },
        data(){
            return{
                title: '我的页面',
                tableList: [
                    {
                        URL: "/member/invest",
                        color: "linear-gradient(#FFD746, #FFA61E)",
                        icon: "icon-Investment",
                        text: "我的投资"
                    },
                    {
                        URL: "/member/wallet",
                        color: "linear-gradient(#FF7F5D, #FF4848)",
                        icon: "icon-Red-envelopes",
                        text: "我的红包"
                    },
                    {
                        URL: "/member/collection",
                        color: "linear-gradient(#00B6FF, #4093F7)",
                        icon: "icon-My-collection",
                        text: "我的收藏"
                    }
                ],
                shopList: [
                    {
                        title: "我的银行",
                        URL: "/member/bankList"
                    },
                    {
                        title: "新手指南",
                        URL: "/home"
                    },
                    {
                        title: "关于我们",
                        URL: "/home"
                    }
                ],
                defaultAvatar: require("../assets/img/member-avatar.png"),
                userInfo:{
                    avatar: '',
                    loginId: '',
                    status: '暂未登陆',
                },
            }
        },
        computed: {
            ...mapGetters({
                userId: 'getUserId',
            })
        },
        methods: {
            getUserInfoBase(userId){
                MemberService.getUserBase(userId).then((res) => {
                    if(res.data.code === AjaxReturnState.success){
                        this.userInfo.avatar = res.data.iconURI;
                        this.userInfo.loginId = res.data.loginId;
                    }
                })
            },
            checkLogin(){
                if(this.userId != ''){
                    this.getUserInfoBase(this.userId);
                }
            },
            logOut(){
                Dialog.confirm({
                    title: '标题',
                    message: "您确认要退出当前用户登陆么?"
                }).then(() => {
                    MemberService.logout().then((res) => {
                        if(res.data.code === AjaxReturnState.success){
                            Toast('退出成功');
                            this.$store.commit(Types.CLEAR_USER_ID);
                        }else {
                            Toast('退出失败');
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch(() => {
                    // on cancel
                });
            },

        },
        created(){
            PageTitle.updatePageTitle(this.title);
            this.checkLogin();
        },
    }
</script>

<style lang="scss" scoped>
    @import "../style/variable";
    @import "../style/global";

    html{
        background: $bg-color-gray;
    }
    .member-wrapper{
        width: 100%;
        height: 100vh;
        background: $bg-color-gray;
    }
    .member-bg{
        height: 94px;
        background-color: $bg-color-blue;
    }
    .member-info-wrapper{
        position: relative;
        padding: 10px;
        margin: -40px 18px 20px;
        border-radius: 4px;
        box-shadow: 2px 2px 13px 0 rgba(0,0,0,0.04);
        background-color: $bg-color-white;
        .info-list{
            overflow: hidden;
            margin-bottom: 15px;
            img{
                float: left;
                display: block;
                border-radius: 100%;
                height: 50px;
                width: 50px;
                background-size: 100%;
                background: #444;
            }
            p{
                text-indent: -12rem;
            }
        }
        .login-button{
            position: absolute;
            top: 15px;
            right: 0;
            width: 100px;
            height: 30px;
            line-height: 30px;
            background: linear-gradient(#FF4E4E, #FF4848);
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            color: $text-color-white;
            font-size: 14px;
        }
    }
    .show-view-list{
        margin: 0 18px;
    }

</style>
