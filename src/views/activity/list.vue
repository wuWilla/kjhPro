<template>
    <div class="activity-list">
        <van-list
                v-model="Activityloading"
                :finished="Activityfinished"
                finished-text="没有更多了"
                @load="onLoad"
                v-if="this.activityList.length != 0"
        >
            <div v-for="(item, index) in activityList" :key="index">
                <ActivityView :actId="item.actId"
                              :imgURL="item.pictureURL"
                              :subject="item.subject"
                              :link="linkList[index]"
                              />
            </div>
        </van-list>
        <Footer/>
    </div>
</template>

<script>
    import Footer from '../../components/common/Footer'
    import ActivityConfig from '../../config/activity.config'
    import { AjaxReturnState } from '../../config/ajax.config.js'
    import PageTitle from '../../Tool/PageTitle.js'
    import ActivityView from '../../components/activity/ActivityView'
    import ActivityService from '../../api/activity.service'

    export default {
        name: "list",
        components: {
            ActivityView,
            Footer
        },
        data(){
            return{
                title: "活动",
                Activityloading: false,
                Activityfinished: false,
                pageNum: 1,
                pageSize: 10,
                start: 0,
                activityList: [],
                linkList: ["/activity/inverst", "/activity/open","/home"]
            }
        },
        methods: {
            getactivityList(){
                const data = {
                    limit: this.pageSize,
                    start: this.start
                };
                ActivityService.getActivityList(data)
                    .then((res) => {
                      if(res.data.code === AjaxReturnState.success){
                          this.activityList = [...res.data.actList.filter(item => item.status == ActivityConfig.accountStatus.ongoing.value)];
                          if(this.activityList.length >= res.data.total){
                              this.Activityfinished = true;
                              this.Activityloading = false;
                          }else{
                              this.pageNum ++;
                              this.start = this.pageNum * this.pageSize -1;
                          }
                      }else{
                          this.activityList = [];
                          this.Activityfinished = false;
                      }
                }).catch(() => {
                     this.activityList = [];
                     this.Activityloading = false;
                });
            },
            onLoad(){
              this.getactivityList();
            },
        },
        created(){
            PageTitle.updatePageTitle(this.title);
            this.getactivityList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";
    .activity-list{
        background-color: $bg-color-gray-dark;
    }
</style>
