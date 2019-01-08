import BaseService from './service.base'
import axios from 'axios'

class ActivityService extends BaseService{
    /**
     * 查询活动列表(分页)
     * @param {Object} data? {
     *  status?: String,
     *  startDate?: String,
     *  endDate?: String
     * }
     */
    getActivityList(data){
        return axios.get(`${this.httpRequestPathPrefix}/activity/list`,{params: data});
    }
    /**
     * 查询活动详情
     * @param {String} actId 活动的Id
     */
    getActivityDetail (actId) {
        return axios.get(`${this.httpRequestPathPrefix}/activity/detail`, { params: { actId } });
    }
}
export default new ActivityService();

