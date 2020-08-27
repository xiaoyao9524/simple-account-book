"use strict";
exports.__esModule = true;
var react_1 = require("react");
var calculator_1 = require("../../components/Calculator/calculator");
var MyFCComponent_1 = require("../../components/MyFCComponent");
var MyClassComponent_1 = require("../../components/MyClassComponent");
var antd_mobile_1 = require("antd-mobile");
var moment_1 = require("moment");
var TestPage1 = function () {
    var fcRef = react_1.useRef(null);
    var classRef = react_1.useRef(null);
    var ref1 = react_1.useRef(null);
    return (react_1["default"].createElement("div", { className: "test-page1" },
        react_1["default"].createElement(calculator_1["default"], { ref: ref1 }),
        react_1["default"].createElement(antd_mobile_1.Button, { onClick: function () {
                if (ref1.current) {
                    ref1.current.setData({
                        date: moment_1["default"]('2020-08-22'),
                        price: 68,
                        remark: '测试设置数据'
                    });
                }
            } }, "\u6D4B\u8BD5ref"),
        react_1["default"].createElement("h3", null, "\u6D4B\u8BD5\u9875\u97621"),
        react_1["default"].createElement(MyFCComponent_1["default"], { ref: fcRef, firstName: "\u5F20", lastName: "\u4E09" }),
        react_1["default"].createElement(antd_mobile_1.Button, { onClick: function () {
                if (fcRef.current) {
                    fcRef.current.showName();
                }
            } }, "\u663E\u793A\u59D3\u540D"),
        react_1["default"].createElement(MyClassComponent_1["default"], { ref: classRef, age: 23, sex: "\u7537" }),
        react_1["default"].createElement(antd_mobile_1.Button, { onClick: function () {
                if (classRef.current) {
                    classRef.current.showAge();
                }
            } }, "\u663E\u793AAge")));
};
exports["default"] = TestPage1;
