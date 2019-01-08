<template>
    <div class="process-wrapper">
        <div class="process-view">
            <div class="decoration left top"></div>
            <div class="decoration right top"></div>
            <div class="decoration left bottom"></div>
            <div class="decoration right bottom"></div>
            <div class="process-step">{{index}}</div>
            <div class="process-content">{{stepContent}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProcessView",
        props:{
            index:{
                required: true
            },
            stepContent:{
                required: true
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../style/variable';
    @import "../../style/mixin";
    $color-red: #EC3C32;

    .process-wrapper{
        margin: 25px 10px 0;
        overflow: hidden;
        .process-view{
            padding: 10px;
            border: 1px solid $color-red;
            position: relative;

            .process-step{
                height: 18px;
                width: 18px;
                font-size: 16px;
                border-radius: 50%;
                color: $text-color-white;
                background-color: $color-red;
                float: left;
            }
            .process-content{
                text-align: center;
            }
            .decoration{
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background-color: $bg-color-white;
                border: 1px solid $color-red;
                &.top{
                    top: -10px;
                }
                &.left{
                    left: -10px;
                }
                &.right{
                    right: -10px;
                }
                &.bottom{
                    bottom: -10px;
                }
            }
        }
    }
</style>
