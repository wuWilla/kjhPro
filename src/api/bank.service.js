import SeriveBase from './service.base'
import Axios from 'axios'

class BankService extends SeriveBase{
    /**
     * 查询直销银行信息
     * @param{String} bankId 直销银行ID
     * */
    getBankInfo(bankId){
        return Axios.get(`${this.httpRequestPathPrefix}/directbank/info`,{ params: {bankId} } );
    }
    /**
     * 检查是否登陆了直销银行
     * @param{Object} data 请求参数{
     *     queryRiskAnalysis："0" | "1",
     *     bankId: String,
     *     userId: String
     * }
     * */
    checkLoginBank(data){
        return Axios.get(`${this.httpRequestPathPrefix}/directbank/login/status`,{ params: { data } } );
    }
}
export default new BankService();
