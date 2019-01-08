import { Container } from "../Tool/entity.js";

class ProductConfig {
    /**
     * 产品类型
     * */
    productType = {
        /**
         * 货币基金
         */
        monetaryFund : new Container('0', '货币基金'),
        /**
         * 理财
         */
        financial : new Container("1", "理财产品"),
        /**
         * 纯债
         * */
        pureDebt : new Container("2","纯债")
    }
    /**
     * 排序字段
     * */
    productOrderBy = {
        /**
         * 理财期限
         * */
        timeLimit : "0",
        /**
         * 销量
         * */
        sales : new Container("3","销量"),
        /**
         * 关注量
         * */
        focusNum : new Container("4","关注量")
    }
    /**
     * 理财期限
     * */
    financialDuration = {
        /**
         * 一个月
         * */
        oneMonth : new Container("0","一个月"),
        /**
         * 一到三个月
         * */
        one2ThreeMonth : new Container("1","1-3个月"),
        /**
         * 三到六个月
         * */
        three2SixMonth : new Container("2","3-6个月"),
        /**
         * 六到十二个月
         * */
        six2TwelveMonth : new Container("3","6-12个月")
    }

    /**
     * 剩余额度
     * */
    surplus = {
        /**
         * 已售罄
         * */
        soldOut : new Container("0","已售罄"),
        /**
         *额度充足
         * */
        onSale : new Container("1","额度充足"),
        /**
         *即将售罄
         * */
        willSoldOut : new Container("2","即将售罄")
    }

    /**
     * 用户收藏产品操作类型
     * */
    productCollectionOperateType = {
        /**
         * 取消收藏
         * */
        cancleCollection : "0",
        /**
         * 添加收藏
         * */
        addCollection : "1"
    }

    /**
     * 用户收藏产品状态
     * */
    userCollectionState = {
        /**
         * 已收藏
         * */
        alreadyCollection : "Y",
        /**
         * 未收藏
         * */
        haveNotCollection : "N"
    }
    /**
     * 把financialYield的字符串转化为数字类型
     * */
    transfromFinancialYields2Number(yieldStr){
        return (Number.parseFloat(yieldStr)).toFixed(2);
    }
}
export default new ProductConfig();

