import { Container } from "../Tool/entity.js";

class ActivityConfig{
    /**
     * 活动状态
     */
    accountStatus = {
        /**
         * 新建
         */
        new: new Container("NEW", "新建"),
        /**
         * 审核通过
         */
        approved: new Container("APPROVED", "审核通过"),
        /**
         * 审核不通过
         */
        unapprove: new Container("UNAPPROVE", "审核不通过"),
        /**
         * 进行中
         */
        ongoing: new Container("ONGOING", "进行中"),
        /**
         * 已结束
         */
        end: new Container("END", "已结束")
    };
}
export default new ActivityConfig();
