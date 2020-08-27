"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_mobile_1 = require("antd-mobile");
var NavBar_1 = require("../../components/NavBar");
var react_redux_1 = require("react-redux");
var system_1 = require("../../store/reducers/modules/system");
var calculator_1 = require("../../components/Calculator/calculator");
var tabList = ['收入', '支出'];
// 收入icons
var incomeIcons = [
    { title: '餐饮', icon: 'canyin' },
    { title: '超市', icon: 'chaoshi' },
    { title: '水果', icon: 'shuiguo' },
    { title: '日用品', icon: 'riyongpin' },
    { title: '游戏', icon: 'game' },
    { title: '淘宝', icon: 'taobao' },
    { title: '京东', icon: 'jingdong' },
    { title: '数码手机', icon: 'shumashouji' },
    { title: '住房', icon: 'zhufang' },
    { title: '缴费', icon: 'weibiaoti--' },
    { title: '数码', icon: 'shuma' },
    { title: '医疗', icon: 'yiliao' },
    { title: '其它', icon: 'qita' }
];
// 支出icons
var expenditureIcons = [
    { title: '工资', icon: 'gongzi' },
    { title: '兼职', icon: 'jianzhi' },
    { title: '理财', icon: 'licai' },
    { title: '礼金', icon: 'lijin' },
    { title: '其它', icon: 'qita' }
];
var Bookkeeping = function () {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(system_1.actionCreators.setTabbarShowAction(false));
        return function () {
            dispatch(system_1.actionCreators.setTabbarShowAction(true));
        };
    });
    var _a = react_1.useState('收入'), tab = _a[0], setTab = _a[1];
    var _b = react_1.useState(null), category = _b[0], setCategory = _b[1];
    var currentIcons = tab === '收入' ? incomeIcons : expenditureIcons;
    return (react_1["default"].createElement("div", { className: "bookkeeping " + (category === null ? '' : 'calculation-show') },
        react_1["default"].createElement(NavBar_1["default"], { style: { position: 'fixed', top: 0, width: '100%' } }, "\u8BB0\u8D26"),
        react_1["default"].createElement("div", { className: "tabs" },
            react_1["default"].createElement(antd_mobile_1.SegmentedControl, { style: { marginTop: 10 }, values: tabList, selectedIndex: tabList.indexOf(tab), onChange: function (e) {
                    var tab = e.nativeEvent.value;
                    setCategory(null);
                    setTab(tab);
                } })),
        react_1["default"].createElement("div", { className: "icon-box" },
            react_1["default"].createElement("ul", { className: "icon-list" }, currentIcons.map(function (i) { return (react_1["default"].createElement("li", { className: "icon-item " + (i.title === category ? 'active' : ''), key: i.title, onClick: function () {
                    setCategory(i.title);
                } },
                react_1["default"].createElement("div", { className: "icon-container" },
                    react_1["default"].createElement("span", { className: "icon iconfont icon-" + i.icon })),
                react_1["default"].createElement("p", { className: "title" }, i.title))); }))),
        category === null ?
            null :
            react_1["default"].createElement(calculator_1["default"], { onConfirm: function (data) {
                    console.log('data1: ', data);
                    console.log('tab: ', tab);
                    console.log('category: ', category);
                }, style: { position: 'fixed', bottom: 0, zIndex: 1 } })));
};
exports["default"] = Bookkeeping;
