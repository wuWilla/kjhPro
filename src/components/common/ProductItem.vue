<template>
   <div class="wrapper">
       <div class="left">
           <div class="number">
               {{yieldNumber}} <span class="small">%</span>
           </div>
           <div class="describe">{{ yieldDescribe }}</div>
       </div>
       <div class="right">
           <div class="name">{{productName}}</div>
           <div class="info">{{bankName}}</div>
           <div class="info"> {{computeProductTag}} </div>
       </div>
   </div>
</template>

<script>
    export default {
        name: "ProductItem",
        props: ["yieldNumber","yieldDescribe","productName","bankName","productTag"],
        computed: {
            computeProductTag () {
                let str = "";
                this.productTag.forEach((e, i) => {
                    if (i == (this.productTag.length - 1)) {
                        str += e;
                    } else {
                        str += `${e} | `;
                    }
                });
                return str;
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/_variable.scss";
  @import "../../style/_mixin.scss";
  @import "../../style/global.scss";

   .wrapper{
       position: relative;
       margin: 0 18px;
       padding: 20px 0;
       >div{
           float: left;
           position: relative;
           &.left{
               width: 32%;
               color: $text-color-orange;
               .number{
                   font-size: 28px;
                   .small{
                       font-size: 18px;
                   }
               }
               .describe{
                   font-size: 12px;
               }
               &::after{
                   @include specialBorder();
               }
           }
           &.right{
               width: 68%;
               text-align: left;
               /*padding-left 对于百分比的布局，一定要box-sizing:border-box*/
               padding-left: 33px;
               /*text-indent: 33px;*/
               .name{
                   font-weight: bold;
                   color: black;
               }
               .info{
                   font-size: 12px;
                   line-height: 12px;
                   color: $text-color-gray-light;
               }
               >div{
                   margin-bottom: 6px;
                   &:last-child{
                       margin-bottom: 0px;
                   }
               }
           }
       }
       &::before{
           content: '';
           display: block;
           @include pointFiveBorder("bottom", $border-color-gray-dark);
       }
       &::after{
           content: '';
           display: block;
           clear: both;
       }
   }

</style>
