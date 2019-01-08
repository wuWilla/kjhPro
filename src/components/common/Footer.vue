<template>
    <div class="footer">
        <van-tabbar v-model="active">
            <van-tabbar-item to="/home">
                <span>首页</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? require('../../assets/img/home-active.svg') : require('../../assets/img/home.svg')"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/product">
                <span>理财</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? require('../../assets/img/product-active.svg') : require('../../assets/img/product.svg')"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/activity">
                <span>活动</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? require('../../assets/img/activity-active.svg') : require('../../assets/img/activity.svg')"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/member">
                <span>我的</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? require('../../assets/img/user-active.svg') : require('../../assets/img/user.svg')"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Tabbar, TabbarItem } from 'vant';
    Vue.use(Tabbar).use(TabbarItem);

    export default {
        name: "Footer",
        data() {
            return {
                activePathMappings: {
                    home: 0,
                    product: 1,
                    activity: 2,
                    member: 3
                },
                active: -1,
            }
        },
        created(){
            const mappingKeys = Object.keys(this.activePathMappings);
            for(let i = 0; i < mappingKeys.length; i++){
                const element = mappingKeys[i];
                if(this.$route.path.includes(element)){
                    this.active = this.activePathMappings[element];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../style/_variable";
    @import "../../style/global";

</style>
