import { Types } from '../mutation-types'
import Keyboard from '../../Tool/Keyboard'
import AxiosConfig from '../../config/axios.config'
import StringTool from '../../Tool/StringTool'

const state = {
  /**
   * 为空代表未登陆
   * */
  userId: ""
};

const getters = {
    getUserId: (state) => state.userId
};

const actions = {

};

const mutations = {
    [Types.UPDATE_USER_ID] (state, { userId, token}){
        state.userId = userId;
        window.localStorage.setItem("UID", userId);
        window.localStorage.setItem("TOKEN", token);
        AxiosConfig.deviceId = userId;
        AxiosConfig.token = token;
        Keyboard.deviceId = userId;
    },
    [Types.CLEAR_USER_ID](state){
        state.userId = "";
        window.localStorage.removeItem("UID");
        window.localStorage.removeItem("TOKEN");
        AxiosConfig.deviceId = StringTool.randomString(16);
        AxiosConfig.token = "";
        Keyboard.deviceId = "";
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}
