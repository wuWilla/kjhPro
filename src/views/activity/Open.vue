<template>
    <div class="activity-open">
        <DetailView :imgURL="this.activityInfo.templateURL" :bgColor="bgColor">
            <div class="activity-content">
                <div class="title">参与流程</div>
                <div class="activity-process">
                    <div v-for="(step, index) in stepList" :key="index">
                        <ProcessView :index="index+1" :stepContent="step"/>
                    </div>
                </div>
                <div class="button-wrapper">
                    <button @click="goProduct">开始理财</button>
                </div>
                <div class="line"></div>
                <div class="activity-title">{{activityInfo.actName}}</div>
                <div class="activity-guide">{{activityInfo.actSummary}}</div>
            </div>
        </DetailView>
    </div>
</template>

<script>
    import PageTitle from '../../Tool/PageTitle'
    import ActivityService from '../../api/activity.service';
    import ActivityConfig from '../../config/activity.config';
    import ProcessView from '../../components/activity/ProcessView'
    import DetailView from '../../components/activity/DetailView'
    import {AjaxReturnState} from "../../config/ajax.config";

    export default {
        name: "Open",
        components: {
            DetailView,
            ProcessView,
        },
        data() {
            return{
                title: "分享获得红包页面",
                activityInfo: {},
                actId: this.$route.query.actId,
                bgColor: "bg-color-red",
                stepList: ["选择直销银行开户","选择产品购买","红包发放到帐"],
            }
        },
        methods: {
            getActivityInfo(){
                ActivityService.getActivityDetail(this.actId).then((res) => {
                    if(res.data.code === AjaxReturnState.success){
                        if(res.data.status === ActivityConfig.accountStatus.ongoing.value){
                            this.activityInfo = res.data;
                        }
                    }
                })
            },
            goProduct(){
                this.$router.push('/product');
            },
        },
        created(){
            PageTitle.updatePageTitle(this.title);
            this.getActivityInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    @import "../../style/mixin";
    $color-red: #EC3C32;
    .activity-content{
        padding: 20px 28px 28px;
        border-radius: 4px;
        background-color: $bg-color-white;
        .title{
            color: $text-color-gray-dark;
            position: relative;
            &::before,
            &::after{
                content: '';
                display: inline-block;
                width: 20px;
                height: 6px;
                background: url("../../assets/img/activity-title-decoration.png");
                -webkit-background-size: 100%;
                background-size: 100%;
                vertical-align: middle;
            }
            &::before{
                margin-right: 12px;
                transform: rotate(180deg);
            }
            &::after{
                margin-left: 12px;
            }
        }
        .activity-process{
            position: relative;
            &::before{
                content: "";
                display: block;
                height: 135px;
                width: 0;
                border: 0.5px dashed $color-red;
                position: absolute;
                left: 29px;
                top: 21px;
            }
        }
        .button-wrapper{
            margin: 30px auto;
            button{
                padding: 10px 88px;
                font-size: 16px;
                border: none;
                background: $color-red;
                color: $text-color-white;
                border-radius: 30px;
            }
        }
        .line{
            padding: 0 20px;
            margin-bottom: 30px;
            &::after{
                content: '';
                display: block;
                width: 100%;
                height: 0px;
                border: 0.5px dashed $border-color-gray-darker;
            }
        }
        .activity-title{
            font-size: 16px;
            color: $text-color-gray-dark;
            margin: 0 auto 10px;
        }
        .activity-guide{
            text-align: justify;
            font-size: 14px;
            color: $text-color-gray-dark;
        }
    }
</style>
