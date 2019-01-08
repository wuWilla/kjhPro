import { Types } from "../mutation-types";

const state = {
    firstJump : true
};

const getters = {
    getFirstJump: (state) => state.firstJump
};

const actions = {

};

const mutations = {
    [Types.CLOSE_STATE](state){
        state.firstJump = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
