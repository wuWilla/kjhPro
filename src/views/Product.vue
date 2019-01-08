<template>
  <div class="product">
      <div class="product-wrapper">
           <div class="input-wrapper">
               <input v-model="searchText" type="text" placeholder="搜索商品/银行直销">
           </div>
           <div class="icon-wrapper">
               <div @click="searchProduct">
                   <van-icon name="search" />
               </div>
           </div>
       </div>
      <div class="side-padding">
          <div class="left">
              <div class="title">直销银行理财</div>
              <div class="describe">纳入一行两会管制</div>
          </div>
          <div class="icon">
              <i class="icon-Transformation"></i>
          </div>
          <div class="right">
              <div class="title gray">银行存款</div>
              <div class="describe">央行管制，存取便捷</div>
          </div>
      </div>
      <div class="tab-option">
          <van-tabs v-model="tabActive" :line-width="70" color="#024884">
              <van-tab v-for="(item,index) in tabOptions" :title="item.chinese" :key="index"/>
          </van-tabs>
      </div>
      <div class="product-list">
          <van-list
                  :offset="100"
                  class="list"
                  v-model="loading"
                  :finished="productFinished"
                  finished-text="没有更多了"
                  @load="onLoad"
                  v-if="productList.length != 0"
          >
              <div v-for="( item, index ) in productList" :key="index">
                  <router-link :key="index" :to="`/productDetail/${item.productId}`">
                  <ProductItem
                          :yieldNumber = "getProductConfig(item.yield1)"
                          yieldDescribe="预期年化收益率"
                          :productName="item.productName"
                          :bankName="item.bankName"
                          :productTag="[ `${item.minAmount}元起购`, `${item.period}天` ]" />
                  </router-link>
              </div>
          </van-list>
      </div>
      <Footer/>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { Icon, Tab, Tabs, Toast, List } from 'vant';
    Vue.use(Icon).use(Tab).use(Tabs).use(Toast).use(List);
    import Footer from '../components/common/Footer'
    import PageTitle from "../Tool/PageTitle";
    import ProductConfig from '../config/product.config'
    import ProductItem from '../components/common/ProductItem.vue'
    import ProductService from '../api/product.service'
    import {AjaxReturnState} from "../config/ajax.config";

    export default {
        name: "Product",
        components: {
            Footer,
            ProductItem
        },
        data(){
            return{
                title: "理财页面",
                searchText:'',
                determineSearchText: "",
                tabActive: 0,
                tabOptions: [],
                loading: true,
                productFinished: false,
                productList: [],
                pageNum: 0,
                start: 0,
                pageSize: 10
            };
        },
        watch:{
            tabActive(){
                this.productList = [];
                this.pageNum = 0;
                this.start = 0;
                this.productFinished = false;
                Toast.loading({
                    message: "加载中..."
                });
                this.getProductList();
            }
        },
        computed: {

        },
        methods: {
            getProductConfig(yieldStr){
                return ProductConfig.transfromFinancialYields2Number(yieldStr);
            },
            getProductList(){
                const data = {
                    productType: ProductConfig.productType.financial.value,
                    orderBy: ProductConfig.productOrderBy.timeLimit,
                    duration: this.tabOptions[this.tabActive].value,
                    productName: this.determineSearchText,
                    bankName: this.determineSearchText,
                    start: this.start,
                    limit: this.pageSize
                };
                ProductService.getProductList(data).then(res => {
                   if(res.data.code == AjaxReturnState.success){
                       this.productList = [...this.productList,...res.data.productList];
                       if(this.productList.length < res.data.length){
                          this.loading = false;
                          this.pageNum ++;
                          this.start = this.pageNum * this.pageSize;
                       }else{
                           this.productFinished = true;
                           this.loading = false;
                       }
                   }else{
                       this.start = 0;
                       this.pageNum = 1;
                       this.productList = [];
                       this.loading = false;
                   }
                    Toast.clear();
                }).catch(() => {
                    this.productList = [];
                    this.loading = false;
                    Toast.clear();
                });
            },
            onLoad(){
                this.getProductList();
            },
            searchProduct(){
                Toast.loading({
                    message: "加载中...."
                });
                this.productList = [];
                this.determineSearchText = this.searchText;
                this.start = 0;
                this.pageNum = 0;
                this.getProductList();
            }
        },
        created() {
            Toast.loading({
                message: '加载中......'
            });
            PageTitle.updatePageTitle(this.title);
            const financialDurationKeys = Object.keys(ProductConfig.financialDuration);
            // for(var i = 0; i < financialDurationKeys.length; i++){
            //     const financialDurationvalue = financialDurationKeys[i];
            //    console.log( ProductConfig.financialDuration[financialDurationvalue]);
            // }
            this.tabOptions = financialDurationKeys.map(e => (ProductConfig.financialDuration[e]));
            this.getProductList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/_variable.scss";
    @import "../style/_mixin.scss";
    @import "../style/global";

    .product-wrapper{
        background: $bg-color-blue;
        display: flex;
        padding: 20px 15px;
        >div{
            font-size: 14px;
            color: $text-color-white;
            &.input-wrapper{
                flex: 0 0 89%;
                input{
                    height: 100%;
                    width: 100%;
                    padding: 8px;
                    border: none;
                    background-color: $bg-color-blue-dark;
                    font-size: 14px;
                    padding: 10px;
                    &::-webkit-input-placeholder {
                        color: $text-color-white;
                    }
                }
            }
            &.icon-wrapper{
                flex:0 0 11%;
                position: relative;
                div{
                    right: 0;
                    font-size: 24px;
                    @include tb-center(absolute);
                }
            }
        }
    }
    .side-padding{
        display: flex;
        padding: 20px 10px;
        position: relative;
        .title{
            font-weight: 700;
            font-size: 20px;
            &.gray{
                color: $text-color-gray-light;
            }
        }
        .describe{
            color: $text-color-gray-light;
            font-size: 12px;
        }
        .left{
            flex: 0 0 45%;
        }
        .icon{
            flex: 0 0 10%;
            font-size: 25px;
            align-self: center;
        }
        .right{
            flex: 0 0 45%;
        }
        &::after{
            content: "";
            display: block;
            @include pointFiveBorder("bottom", $border-color-gray-dark);
        }
    }
    .van-tabs-style{
        .van-tabs__wrap{
            .van-tabs__nav{
                .van-tab{
                    font-size: 25px;
                }
            }
        }
    }
</style>
