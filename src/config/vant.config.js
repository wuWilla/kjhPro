import Vue from "vue";

import { Button, Swipe, SwipeItem, Tabbar, TabbarItem, Icon, Tab, Tabs, List, Row, Col, Cell, CellGroup,
    GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Field, Checkbox, Popup, CheckboxGroup, Picker } from "vant";

Vue.use(Swipe).use(SwipeItem);
Vue.use(Button);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Icon);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(List);
Vue.use(Field);
Vue.use(Tab).use(Tabs);
Vue.use(Row).use(Col);
Vue.use(Cell).use(CellGroup);
Vue.use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn);
Vue.use(Picker);
