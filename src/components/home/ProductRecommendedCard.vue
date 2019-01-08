<template>
    <div class="wrapper">
        <span class="label">
            {{labelName}}
        </span>
        <div class="product-name">
            {{productName}} - {{bankName}}
        </div>
        <div class="yield">
            <div class="number">
                {{yieldNumber}}
                    <span class="small">%</span>
            </div>
        </div>
        <div class="describe">
            {{describe}}
        </div>
        <div class="bottom-wrapper">
             <div class="tag">
                 {{computeTag}}
             </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductRecommendedCard",
        props:["labelName", "productName", "bankName", "yieldNumber", "describe", "tags"],
        computed: {
            computeTag() {
                let str = "";
                this.tags.forEach((e,i) => {
                    if(i === (this.tags.length-1)){
                        str += e;
                    }else{
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
    .wrapper{
        background: #ffffff;
        padding: 23px 0px 11px;
        border-radius: 10px;
        position: relative;
        box-shadow: 0 0 15px rgba($color: #333, $alpha: 0.5);
        div{
            text-align: center;
            margin-bottom: 12px;
        }
        .product-name{
            font-weight: bold;
        }
        .number{
            font-size: 28px;
            color: $text-color-orange;
            .small{
                font-size: 18px;
            }
        }
        .describe{
            font-size: 12px;
            color: $text-color-gray;
        }
        .bottom-wrapper {
            font-weight: bold;
            font-size: 13px;
        }
        .label{
            display: inline-block;
            font-size: 14px;
            border-bottom-right-radius: 13px;
            border-top-right-radius: 13px;
            background-image: linear-gradient(to right, #ff783a , #f63d48);
            padding: 5px 10px;
            color: $text-color-white;
            position: absolute;
            left: 0;
            top: 20px;
        }
    }
</style>
