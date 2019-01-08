<template>
    <DetailView :imgURL="activityInfo.templateURL" :bgColor="bgColor">
        <div class="activity-content">
            <div class="activity-title">
                推荐好友开户共享红包
            </div>
            <div class="activity-prompt">
                点击下列任意方式分享红包
            </div>
            <div class="activity-share">
                <ShareIcon v-for="(way, index) in shareList"
                           :imgURL = "way.imgURL"
                           :imgTitle = "way.imgTitle"
                           :imgName = "way.imgName"
                           :key="index"
                           @share = "toShare"/>
            </div>
            <div class="line"></div>
            <div class="activity-title">活动规则</div>
            <div class="activity-guide">
                {{this.activityInfo.actSummary}}
            </div>
        </div>
        <van-popup class="share-popup" v-model="shareView"><img class="share-direction" src="../../assets/img/share-direction.png" alt=""></van-popup>
    </DetailView>
</template>

<script>
    import PageTitle from "../../Tool/PageTitle";
    import ActivityService from "../../api/activity.service"
    import DetailView from '../../components/activity/DetailView'
    import ShareIcon from '../../components/activity/ShareIcon'
    import ActivityConfig from '../../config/activity.config'
    import {AjaxReturnState} from "../../config/ajax.config";
    export default {
        name: "Inverst",
        data(){
            return {
                title: "推荐好友开户共享红包",
                actId: this.$route.query.actId,
                bgColor: "bg-color-blue",
                activityInfo: {},
                shareList: [
                    {
                        imgURL: require("../../assets/img/activity-share-weixin.png"),
                        imgTile: "微信图标",
                        imgName: "微信好友"
                    },
                    {
                        imgURL: require("../../assets/img/activity-share-moments.png"),
                        imgTile: "微信朋友圈图标",
                        imgName: "微信朋友圈"
                    }
                ],
                shareView: false,
            }
        },
        components: {
            DetailView,
            ShareIcon
        },
        methods: {
            getActInfo() {
                ActivityService.getActivityDetail(this.actId).then((res) => {
                    if(res.data.code === AjaxReturnState.success){
                        if(res.data.status === ActivityConfig.accountStatus.ongoing.value){
                            this.activityInfo = {
                                templateURL: res.data.templateURL,
                                actSummary: res.data.actSummary
                            };
                            console.log(this.activityInfo);
                        }
                    }
                }).catch((error) =>{
                    console.log(error.message);
                });
            },
            toShare(){
                this.shareView = true;
            }
        },
        created () {
            PageTitle.updatePageTitle(this.title);
            this.getActInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    @import "../../style/mixin";

    .activity-content{
        padding: 0 28px 28px;
        border-radius: 4px;
        background-color: $bg-color-white;
    }
    .activity-title{
        font-weight: bold;
        padding-top: 32px;
        padding-bottom: 13px;
    }
    .activity-prompt{
        font-size: 14px;
        color: $text-color-gray;
        margin-bottom: 30px;
    }
    .activity-share{
        display: flex;
        margin-bottom: 34px;
    }
    .line{
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed $border-color-gray-dark;
        position: relative;
        &::before,
        &::after{
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            background: linear-gradient(#3877DC, #3B7BDD);
            border-radius: 100%;
            position: absolute;

        }
        &::before{
            top: -10px;
            left: -38px;
        }
        &:after{
            top: -10px;
            right: -38px;
        }
    }
    .activity-guide{
        font-size: 14px;
        line-height: 21px;
        text-align: justify;
        color: $text-color-gray-dark;
    }
    .share-popup{
       background: transparent;
        overflow-y: hidden;
        margin-top: -30%;
       .share-direction{
           display: block;
           width: 100%;
       }
    }
</style>
