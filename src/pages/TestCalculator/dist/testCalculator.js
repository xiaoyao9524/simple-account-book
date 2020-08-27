"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_mobile_1 = require("antd-mobile");
var calculator_1 = require("../../components/Calculator/calculator");
var TestCalculator = function () {
    var _a = react_1.useState(false), calculatorShow = _a[0], setCalculatorShow = _a[1];
    var _b = react_1.useState('0'), price = _b[0], setPrice = _b[1];
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_mobile_1.Button, { onClick: function () {
                setCalculatorShow(true);
            } }, "\u6253\u5F00\u7A97\u53E3"),
        react_1["default"].createElement("p", null,
            "\u5F53\u524D\u4EF7\u683C\uFF1A",
            price),
        react_1["default"].createElement(antd_mobile_1.Modal, { popup: true, transparent: true, visible: calculatorShow, animationType: "slide-up" },
            react_1["default"].createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                react_1["default"].createElement(calculator_1["default"], { onConfirm: function (res) {
                        console.log(res);
                        var date = res.date, remark = res.remark, price = res.price;
                        console.log(date, remark, price);
                        setCalculatorShow(false);
                        setPrice(price);
                    }, style: { maxWidth: 400 } })))));
};
exports["default"] = TestCalculator;
