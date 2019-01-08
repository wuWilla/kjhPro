<template>
    <div class="activity-view">
        <router-link :to="{path: `${link}`,query: {actId: `${actId}`}}">
            <div class="activity-banner">
                <img :src="imgURL" alt="活动图">
            </div>
            <div class="activity-name">{{subject}}</div>
            <div class="activity-footer">
                <van-cell title="查看活动详情" is-link />
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ActivityView",
        // props:["actId","imgURL","subject","link"],
        props: {
            actId: {
                type: String,
                required: true
            },
            imgURL: {
                type: String,
                required: true
            },
            subject: {
                type: String,
                required: true
            },
            link: {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/_variable.scss";
    @import "../../style/_mixin.scss";
    @import "../../style/global";

    .activity-view{
        margin: 0 18px 20px;
        padding: 15px 15px 0;
        background-color: $bg-color-white;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        box-shadow: 2px 2px 13px 0 rgba(0,0,0,0.04);
    }
    .activity-view{
        .activity-banner{
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 8px;
            background: red;
            &::after{
                content: '';
                display: block;
                padding-top: 44.67%;
            }
            img{
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .activity-name{
            position: relative;
            font-size: 12px;
            color: $text-color-gray;
            padding: 10px;
            text-align: left;
            &::after{
                content: '';
                display: block;
                @include pointFiveBorder('bottom',$border-color-gray-dark);
            }
        }
    }
</style>
