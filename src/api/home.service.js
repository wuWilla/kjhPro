import ServiceBase from './service.base'
import axios from 'axios'

class HomeService extends ServiceBase {
    /**
     * 获取Banner信息
     * @param {enum} location 获取banner的位置
     * @param {enum} pageIndex 获取的banner在哪个页面
     */
    getBanner (location, pageIndex){
        return axios.get(`${this.httpRequestPathPrefix}/product/display/list`, { params: { location, pageIndex } });
    }
}
export default new HomeService();
