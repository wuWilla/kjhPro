<template>
    <div class="table-view-wrapper">
        <div class="icon-wrapper" :style="{background: tableView.color}">
            <div :class="tableView.icon" ></div>
        </div>
        <div class="describe">{{tableView.text}}</div>
    </div>
</template>

<script>
    export default {
        name: "TableView",
        props: {
            tableView: {
                type: Object,
                required:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/font/style.css";

    .table-view-wrapper{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        >div{
            flex: 1;
            justify-content: center;
            &.icon-wrapper{
                width: 40px;
                height: 40px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                margin: 0 auto;
                font-size: 20px;
                border-radius: 100%;
                >div{
                    line-height: 40px;
                }
            }
            &.describe{
                margin-top: 10px;
                font-size: 12px;
            }
        }

    }
</style>
