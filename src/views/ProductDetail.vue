<template>
    <div class="product-detail bottom-padding">
        <div class="product-detailCard border-bottom">
            <ProductDetailCard
                    :productName = "product.productName"
                    :yieldNumber = "getProductConfig(product.yield1)"
                    :period = "product.period"
                    :tags="[ `${product.minAmount}元起购`, `累计购买天数${product.salesVolume}` ]"
            />
        </div>
        <div class="computed border-bottom">
            <van-cell-group>
                <van-cell class="title" title="收益测算" />
                <van-cell class="info" title="我要投资" :value="'￥' + money">
                    <van-icon slot="right-icon" name="edit" class="van-cell__right-icon"  @click="isAlertMoney = true"/>
                </van-cell>
                <van-field
                        v-show="isAlertMoney"
                        v-model="alertMoney"
                        center
                        clearable
                        label="投资金额"
                        placeholder="请输入投资金额"
                >
                    <van-button slot="button" size="small" type="primary" @click="updateMoney()">确定</van-button>
                </van-field>
                <van-cell class="info" title="预期年化收益率" :value="'￥' + earnings.toFixed(2)" />
            </van-cell-group>
        </div>
        <div class="detail border-bottom">
            <van-cell-group>
                <van-cell class="title" title="交易规则"/>
                <van-cell class="info"  title="起购金额" :value="createMoneyType(this.product.minAmount)" />
                <van-cell class="info"  title="递增金额" :value="this.product.increaseAmount ? createMoneyType(this.product.increaseAmount) : '-'"/>
                <van-cell class="info"  title="剩余金额" :value="surplus" />
            </van-cell-group>
            <div class="time-wrapper">
                <div>
                    <div class="name">募集开始</div>
                    <div class="circle">
                        <span></span>
                    </div>
                    <div class="time">{{product.collectStartDate}}</div>
                </div>
                <div>
                    <div class="name">募集结束</div>
                    <div class="circle">
                        <span></span>
                    </div>
                    <div class="time">{{product.collectEndDate}}</div>
                </div>
                <div>
                    <div class="name">起息日</div>
                    <div class="circle">
                        <span></span>
                    </div>
                    <div class="time">{{product.valueDate}}</div>
                </div>
                <div>
                    <div class="name">到期</div>
                    <div class="circle">
                        <span></span>
                    </div>
                    <div class="time">{{product.finEndDate}}</div>
                </div>
            </div>
        </div>
        <div class="step border-bottom">
            <van-cell-group>
                <van-cell class="title" title="交易步骤" />
            </van-cell-group>
            <div class="buy-step">
                 <div>
                     <div class="number">1</div>
                     <div class="arrow"></div>
                     <div class="describe">点击安全购买</div>
                 </div>
                 <div>
                    <div class="number">2</div>
                    <div class="arrow"></div>
                    <div class="describe">财税通登陆</div>
                </div>
                 <div>
                    <div class="number">3</div>
                    <div class="arrow"></div>
                    <div class="describe">直销银行登陆</div>
                </div>
                 <div>
                    <div class="number">4</div>
                    <div class="describe">直销银行购买</div>
                </div>
            </div>
        </div>
        <div class="bank border-bottom">
            <van-cell-group>
                <van-cell class="title" title="直销银行说明" />
            </van-cell-group>
            <div class="bank-wrapper">
                <div class="logo">
                    <img :src="bankInfo.bankLogoURL" alt="">
                </div>
                <div class="info">
                    <div class="bank-name">{{bankInfo.bankName}}</div>
                    <div class="describe">隶属于 {{bankInfo.parentBankName}}</div>
                </div>
            </div>
        </div>
        <div>
            <van-cell-group>
                <van-cell class="title" title="产品描述" />
            </van-cell-group>
            <div class="product-des" v-html="product.productDesc"></div>
        </div>
        <div class="declaration">
            页面展示收益率不代表收益承诺，市场有风险，投资需谨慎
        </div>
        <van-goods-action>
            <van-goods-action-mini-btn
                    :icon-class=" collectionState === getProductConfigObject().ProductConfig.userCollectionState.alreadyCollection ? 'icon-star' : 'icon-Collection1'"
                    text="收藏"
                    @click="collectionHandle"
                    />
            <van-goods-action-mini-btn icon-class="icon-share" text="分享" @click="shareHandle"/>
            <van-goods-action-big-btn text="安全购买" />
        </van-goods-action>
        <van-popup v-model="shareView" calss="share-popup"><img class="share-direction" src="../assets/img/share-direction.png" alt=""></van-popup>
    </div>
</template>

<script>
    import { Toast } from "vant";
    import ObjectTool from "../Tool/objectTool"
    import PageTitle from '../Tool/PageTitle'
    import ProductDetailCard from '../components/productDetail/ProductDetailCard'
    import ProductConfig from '../config/product.config'
    import ProductService from '../api/product.service'
    import BankService from '../api/bank.service'
    import {AjaxReturnState} from "../config/ajax.config";
    import {mapGetters} from "vuex";

    export default {
        name: "ProductDetail",
        data(){
            return {
                title:'产品详情页',
                product:{},
                money:'1000.00',
                isAlertMoney: false,
                alertMoney:"",
                shareView: false,
                bankInfo:'',
                collectionState: 'N',
                //不能理解collectionIsGetter是做什么用的？
                collectionIsGetter: false,
            }
        },
        computed:{
            ...mapGetters({
                userId: "getUserId"
            }),
            earnings(){
                if(this.product.productType === ProductConfig.productType.financial.value){
                    return this.money * Number.parseFloat(this.product.yield1) * Number.parseInt(this.product.period) / 365;
                }else{
                    return 0;
                }
            },
            surplus(){
                return ObjectTool.findChieseByValueInContainer(ProductConfig.surplus,this.product.surplus);
            }
        },
        components:{
            ProductDetailCard
        },
        methods: {
            createMoneyType(value){
                return Number.parseFloat(value).toFixed(2) + "元";
            },
            getProductConfig(yieldStr){
                return ProductConfig.transfromFinancialYields2Number(yieldStr);
            },
            getProductConfigObject(){
                return {ProductConfig};
            },
            async getProduct(productId){
                try {
                    const res = await ProductService.getProductDetail(productId);
                    if(res.data.code == AjaxReturnState.success){
                        this.product = {...res.data};
                    }else{
                        Toast({
                            message: 'res.data.message'
                        });
                    }
                }catch (error) {
                    Toast("获取产品详情失败...");
                }
            },
            async getBankInfo(bankId){
              try {
                  const res = await BankService.getBankInfo(bankId);
                  if(res.data.code == AjaxReturnState.success){
                      this.bankInfo = {...res.data};
                  }else{
                      Toast('res.data.message');
                  }
              }catch (error) {
                  Toast("直销银行信息获取失败");
              }
            },
            updateMoney(){
                this.isAlertMoney = false;
                var tempNum = this.alertMoney ? Number.parseFloat(this.alertMoney) : this.product.minAmount;
                this.money = tempNum > Number.parseFloat(this.product.maxAmount) ? Number.parseFloat(this.product.maxAmount) : tempNum < Number.parseFloat(this.product.minAmount) ? Number.parseFloat(this.product.minAmount) : tempNum;
            },
            collectionHandle(){
                if(!this.collectionIsGetter){
                    this.collectionIsGetter = true;
                    const isAlreadyCollection = this.collectionState === ProductConfig.userCollectionState.alreadyCollection;
                    const data = {
                        userId: this.userId,
                        productId: this.product.productId,
                        productName: this.product.productName,
                        operteType: isAlreadyCollection ? ProductConfig.userCollectionState.haveNotCollection : ProductConfig.userCollectionState.alreadyCollection
                    };
                    ProductService.collectionProduct(data).then(res => {
                        if( res.data.code === AjaxReturnState.success){
                            Toast(`${isAlreadyCollection ? "取消" : ""}收藏成功`);
                            this.collectionState = isAlreadyCollection ? ProductConfig.userCollectionState.haveNotCollection : ProductConfig.userCollectionState.alreadyCollection;
                        }else{
                            Toast(res.data.message);
                        }
                        this.collectionIsGetter = false;
                    }).catch(() => {
                        this.collectionIsGetter = false;
                    });
                }
            },
            // collectionHandle(){
            //         const isAlreadyCollection = this.collectionState === ProductConfig.userCollectionState.alreadyCollection;
            //         if(isAlreadyCollection){
            //             this.collectionState = ProductConfig.userCollectionState.haveNotCollection;
            //         }else{
            //             this.collectionState = ProductConfig.userCollectionState.alreadyCollection;
            //         }
            //  },
            shareHandle(){
                this.shareView = true;
            },
            // checkLogin (){
            //     if(this.userId == ""){
            //         Dialog.confirm({
            //             title: "提示",
            //             message: "您还没有登录，是否跳转到登录页面?"
            //         }).then(() => {
            //             console.log("$router" + this.$router +">>>>>>>>" + "$route" + this.$route);
            //             this.$router.replace({ path: "/login", query: { redirect: this.$route.path}});
            //         }).catch(() => {});
            //         return false
            //     }else{
            //         return true;
            //     }
            // },
        },
        async created(){
            PageTitle.updatePageTitle(this.title);
            await this.getProduct(this.$route.params.productID);
            this.getBankInfo(this.product.bankId);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/_variable.scss";
    @import "../style/_mixin.scss";
    @import "../style/global.scss";

    .product-detailCard{
        padding: 14px $side-padding;
    }
    .border-bottom{
        border-bottom: 10px solid $border-color-gray;
    }
    .title{
        font-weight: bold;
        &::before{
            left: 0;
        }
    }
    .time-wrapper{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 16px $side-padding;
        text-align: center;
        position: relative;
        >div{
            &:first-child{
                text-align: left;
                .circle{
                    span{
                        left: 15px;
                    }
                }
            }
            &:last-child{
                text-align: right;
                .circle{
                    span{
                        margin-left: auto;
                        right: 15px;
                    }
                }
            }
            .circle{
                height: 32px;
                width: 100%;
                position: relative;
                text-align: center;
                span{
                    @include circle(6px,#fff);
                    border: 1px solid $border-color-blue;
                    @include tb-center(absolute);
                }
            }
        }
        &::after{
            content: '';
            display: block;
            height: 2px;
            width: 90%;
            background-color: $bg-color-blue;
            @include all-center(absolute);
            z-index: -1;
        }
    }
    .buy-step{
        padding: 16px $side-padding;
        display: flex;
        justify-content: center;
        >div{
            flex: 1;
            position: relative;
            .number{
                margin: 0 auto 16px;
                color: $text-color-white;
                @include circle(20px,$text-color-orange);
                font-size: 14px;
                line-height: 20px;
            }
            .arrow{
                position: absolute;
                width: 48px;
                height: 0;
                top: 10px;
                left: 60px;
                border-top: 1px dashed $text-color-orange;
                &::after{
                    content: '';
                    display: block;
                    width: 7px;
                    height: 6px;
                    background: url("../assets/img/arrow.png") center center no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                    position: absolute;
                    top: -3.5px;
                    right: -6px;
                }
            }
            .describe{
                font-size: 12px;
                text-align: center;
            }
        }
    }
    .bank-wrapper{
        display: flex;
        padding: 10px $side-padding ;
        justify-content: center;
        >div{
            &:first-child{
                flex: 0 0 20%;
                img{
                    width: 100%;
                    height: 100%;
                    background-size: 100% 100%;
                }
            }
            &:last-child{
                flex: 0 0 80%;
                text-align: left;
                align-self: center;
                .bank-name{
                    font-size: 16px;
                }
                .describe{
                    font-size: 12px;
                    color: $text-color-gray;
                }
            }
        }
    }
    .product-des{
        padding: 14px;
        font-size: 14px;
        text-align: left;
        text-indent: 2em;
    }
    .declaration{
        font-size: 12px;
        color: $text-color-gray-light;
        padding: 19px $side-padding;
    }
    .bottom-padding{
        padding-bottom: 35px;
    }
    .van-button--warning{
        background: $text-color-blue;
        border: 1px solid $text-color-blue;
    }

    .van-popup{
        background: transparent;
        overflow-y: visible;
        .share-direction{
            display: block;
            height: 300px;
            margin-top: -100%;
        }
    }

</style>
