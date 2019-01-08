<template>
  <div class="footer-padding">
    <van-swipe :autoplay="3000" v-if="topBannerList.length !== 0">
      <van-swipe-item
              v-for="item in topBannerList"
              :key="item.productId">
        <router-link to="/">
          <img class="swipe-img" :src="item.picURL">
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <section class="product-card-wrapper">
      <ProductRecommendedCard
         labelName = "本周推荐"
         :productName = "recommendedProduct.productName"
         :bankName ="recommendedProduct.bankName"
         :yieldNumber ="getProductConfig(recommendedProduct.yield1)"
         describe="预期年化收益率"
         :tags="[`${recommendedProduct.minAmount}元起购`]"/>
    </section>
    <section class="gg" v-if="middleBannerList.length != 0">
      <router-link to="/">
        <img class="swipe-img" src="../images/bannerTop.jpg">
      </router-link>
    </section>
    <ProductList
       :list = "ProductList"
    ></ProductList>
    <Footer></Footer>
    <HelloWorld msg="Welcome to 会计会平台"/>
  </div>
</template>

<script>
 import Vue from 'vue'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import PageTitle from '../Tool/PageTitle.js'

import HomeService from '../api/home.service.js'
import HomeConfig from '../config/home.config.js'
import {AjaxReturnState} from '../config/ajax.config.js'
import ProductService from '../api/product.service.js'
import ProductConfig from '../config/product.config.js';
import ProductRecommendedCard from '../components/home/ProductRecommendedCard.vue'
import ProductList from '../components/home/ProductList.vue'
import Footer from '../components/common/Footer.vue'

import { Swipe, SwipeItem,Toast } from 'vant';
Vue.use(Swipe).use(SwipeItem);

export default {
  name: 'home',
  components: {
    HelloWorld,
    ProductRecommendedCard,
    ProductList,
    Footer
  },
  data(){
      return {
          title: '会计会首页',
          topBannerList:[],
          middleBannerList:[],
          ProductList: [],
          recommendedProduct: []
      }
  },
  methods: {
      getProductConfig(yieldStr){
          return ProductConfig.transfromFinancialYields2Number(yieldStr);
      }
  },
  async created() {
      Toast.loading({
          message: '加载中.......'
      });
      PageTitle.updatePageTitle(this.title);

      HomeService.getBanner(HomeConfig.bannerLocation.TOP,HomeConfig.pageIndex.HOME).then(res => {
          if(res.data.code === AjaxReturnState.success){
              this.topBannerList = res.data.productList;
          }
      });
      HomeService.getBanner(HomeConfig.bannerLocation.MIDDLE,HomeConfig.pageIndex.HOME).then(res => {
          if(res.data.code === AjaxReturnState.success){
              this.middleBannerList = res.data.productList;
          }
      });
      ProductService.getProductList({ productType: ProductConfig.productType.financial.value, orderBy: ProductConfig.productOrderBy.sales.value,strat: 0, limit: 10}).then( res => {
          if(res.data.code === AjaxReturnState.success){
              this.ProductList = res.data.productList;
          }
      });
      try {
          const getRecommendedProductIdRes = await HomeService.getBanner(HomeConfig.bannerLocation.RECOMMENDED,HomeConfig.pageIndex.HOME);
          if(getRecommendedProductIdRes.data.code == AjaxReturnState.success){
              const RecommendedProductId =  getRecommendedProductIdRes.data.productList[0].productId;
              const RecommendedProductRes = await ProductService.getProductDetail(RecommendedProductId);
              if( RecommendedProductRes.data.code == AjaxReturnState.success){
                  this.recommendedProduct = RecommendedProductRes.data;
              }
              Toast.clear();
          }
      }catch (error) {
          console.log(error);
          Toast.clear();
      }
  }
}
</script>
<style lang="scss" scoped>
  @import "../style/_variable";
  /*@import "../style/global";*/

  .van-swipe {
    height: 150px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .product-card-wrapper{
    padding: 0 $side-padding;
    position: relative;
    top: -20px;
  }
  .gg{
    padding: 14px $side-padding;
    border-top: 10px solid $border-color-gray;
    border-bottom: 10px solid $border-color-gray;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .footer-padding{
    padding-bottom: 50px;
  }
</style>
