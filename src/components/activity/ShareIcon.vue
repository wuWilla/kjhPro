<template>
    <div class="share-way-wrapper" @click="toShare">
        <img :src="imgURL" :alt="imgTitle">
        <p>{{imgName}}</p>
    </div>
</template>

<script>
    export default {
        name: "ShareIcon",
        props: ["imgURL","imgTitle","imgName"],
        methods: {
            toShare() {
                this.$emit("share");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .share-way-wrapper{
        flex-grow: 1;
        text-align: center;
        img{
            display: block;
            height: 50px;
            width: 50px;
            margin: 0 auto;
        }
        p{
            margin: 6px auto;
        }
    }
</style>
