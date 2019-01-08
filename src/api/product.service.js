import ServiceBase from "./service.base"
import Axios from 'axios'

class ProductService extends ServiceBase{
    /**
     * 获取产品列表
     * @param {Object} data 请求参数
     * {
     *    productType: enmu,
     *    bankId?: String,
     *    productName?: String,
     *    bankName?: String,
     *    orderBy?: enmu,
     *    duration?: enmu
     * }
     */
    getProductList (data) {
        return Axios.get(`${this.httpRequestPathPrefix}/product/list`, { params: data });
    }
    /**
     * 获取一个产品的详情
     * @param {String} productId 要获取的产品Id
     */
    getProductDetail (productId) {
        return Axios.get(`${this.httpRequestPathPrefix}/product/detail`, { params: { productId } });
    }
    /**
     * 收藏或取消收藏一个产品
     * @param {Object} data 请求参数 {
     *    userId: String,
     *    productId: String,
     *    ProductName: String,
     *    operateType: Enum
     * }
     */
    collectionProduct (data) {
        return Axios.post(`${this.httpRequestPathPrefix}/user/collection`, data);
    }

    /**
     * 检测用户是否收藏了某个用户
     * @param {String} userId 用户ID
     * @param {String} productId 产品ID
     */
    checkUserCollectionProduct (userId, productId) {
        return Axios.get(`${this.httpRequestPathPrefix}/user/has/collection`, { params: { userId, productId } });
    }
}
export default new ProductService();
