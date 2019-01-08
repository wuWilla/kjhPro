<template>
    <div :class="['activity-wrapper', `${ bgColor }`]">
        <img :src="imgURL" alt="">
        <div class="activity-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailView",
        props: ["imgURL", "bgColor"],
    }
</script>

<style lang="scss" scoped>

    .activity-wrapper{
        position: relative;
        img[src=""],src:not[src]{
            opacity: 0;
        }
        img{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            display: block;
            width: 100%;
            min-height: 100vh;
            z-index: -1;
        }
        .activity-container{
            padding-top: 180px;
            padding-bottom: 30px;
            margin: 0 18px;
            z-index: 9;
            color: #000000;
        }
    }
</style>
