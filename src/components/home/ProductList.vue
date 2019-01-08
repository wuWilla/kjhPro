<template>
    <div class="product-list">
        <ul>
            <li class="title">
                理财精选
                <span class="more">
                    <router-link to="/product">
                        更多
                    </router-link>
                </span>
            </li>
            <li v-for="(item,index) in list" :key="index">
                <ProductItem
                        :yieldNumber = "getProductConfig(item.yield1)"
                        yieldDescribe="预期年化收益率"
                        :productName="item.productName"
                        :bankName="item.bankName"
                        :productTag="[ `${item.minAmount}元起购`, `${item.period}天` ]" />
            </li>
        </ul>
    </div>
</template>

<script>
    import ProductItem from '../common/ProductItem'
    import ProductConfig from '../../config/product.config'
    export default {
        name: "ProductList",
        props: ["list"],
        components: {
            ProductItem
        },
        methods:{
            getProductConfig(yieldStr){
                return ProductConfig.transfromFinancialYields2Number(yieldStr);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    @import "../../style/mixin";

    .title{
        padding: 14px 18px;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        position: relative;
        &::after{
            content: '';
            display: block;
            @include pointFiveBorder('bottom',$border-color-gray-dark)
        }
        .more{
            font-weight: normal;
            font-size: 14px;
            line-height: 14px;
            right: 18px;
            @include tb-center(absolute);
            a{
                color: $text-color-gray;
            }
            &::after{
                content: "";
                display: block;
                @include trangleHollow("right", 8px, 1.5px, $text-color-gray);
            }
        }
    }

</style>
