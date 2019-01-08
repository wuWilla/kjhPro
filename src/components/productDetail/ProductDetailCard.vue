<template>
    <div class="wrapper">
        <div class="productName">
            {{productName}}
        </div>
        <div class="content">
            <div class="left">
                <div class="title">理财收益</div>
                <div class="yield">{{yieldNumber}} <span>%</span></div>
            </div>
            <div>
                <div class="title">理财期限</div>
                <div class="day">{{period}} <span>天</span></div>
            </div>
        </div>
        <div class="tag">{{computedTags}}</div>
    </div>
</template>

<script>
    export default {
        name: "ProductDetailCard",
        props: ["productName","yieldNumber","period","tags"],
        computed:{
            computedTags(){
                let str ='';
                // this.tags.forEach((e,i) => {
                //     if(i === this.tags.length-1){
                //         str += e;
                //     }else{
                //         str += `${e} |`
                //     }
                // });
                for(var i=0; i< this.tags.length; i++){
                    if(i === this.tags.length -1){
                        str += this.tags[i];
                    }else{
                        str += `${this.tags[i]} |`
                    }
                }
                return str;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    @import "../../style/mixin";

    .wrapper{
        padding-top: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 13px 0 rgba(0,0,0,0.10);
        .productName{
            font-size: 20px;
            font-weight: bold;
        }
        .content{
            display: flex;
            padding: 20px 0;
            position: relative;
            &::after{
                content: '';
                display: block;
                @include pointFiveBorder('bottom',$border-color-gray-dark)
            }
            >div{
                flex: 1;
                &.left{
                    position: relative;
                    &::after{
                        @include specialBorder();
                    }
                }
                .title{
                    font-size: 16px;
                    color: $text-color-gray;
                    padding-bottom: 20px;
                }
                .yield{
                    color: $text-color-orange;
                    font-size: 35px;
                    font-weight: bold;
                    span{
                        font-size: 20px;
                        font-weight: normal;
                    }
                }
                .day{
                    color: $text-color-blue;
                    font-size: 35px;
                    font-weight: bold;
                    span{
                        font-size: 20px;
                        font-weight: normal;
                    }
                }
            };
        }
        .tag{
            padding: 16px 0 16px 36px;
            color: $text-color-gray;
            text-align: left;
            font-size: 14px;
        }
    }
</style>
