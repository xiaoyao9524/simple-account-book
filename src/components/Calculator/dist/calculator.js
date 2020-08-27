"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./index.scss");
var antd_mobile_1 = require("antd-mobile");
var moment_1 = require("moment");
// 判断一个数字是否为整数
function checkNumberIsInt(num) {
    if (typeof num === 'string') {
        num = parseFloat(num);
    }
    if (isNaN(num)) {
        return false;
    }
    return ("" + num).indexOf('.') < 0;
}
var Calculator = react_1.forwardRef(function (props, ref) {
    var onConfirm = props.onConfirm, style = props.style;
    var _a = react_1.useState(moment_1["default"]()), date = _a[0], setDate = _a[1];
    var _b = react_1.useState(''), remark = _b[0], setRemark = _b[1];
    var _c = react_1.useState('0'), firstPrice = _c[0], setFirstPrice = _c[1];
    var _d = react_1.useState(''), secondPrice = _d[0], setSecondPrice = _d[1];
    var _e = react_1.useState(null), calculation = _e[0], setCalculation = _e[1];
    var _f = react_1.useState(false), datePickerVisible = _f[0], setDatePickerVisible = _f[1];
    react_1.useImperativeHandle(ref, function () { return ({
        setData: function (data, dateFormat) {
            if (dateFormat === void 0) { dateFormat = 'YYYY-MM-DD'; }
            var date = data.date, price = data.price, remark = data.remark;
            if (date !== undefined) {
                setDate((typeof date === 'string' ? moment_1["default"](date, dateFormat) : date));
            }
            if (remark !== undefined) {
                setRemark(remark);
            }
            if (price !== undefined) {
                setFirstPrice((typeof price === 'string' ? price : "" + price));
                setSecondPrice('');
                setCalculation(null);
            }
        }
    }); });
    function handlerInputNumber(num) {
        var isFirst = calculation === null;
        var isZero = num === 0;
        var price;
        if (isZero) {
            var curPrice = isFirst ? firstPrice : secondPrice;
            var floatStr = curPrice.split('.')[1];
            if (floatStr && floatStr.length >= 2) {
                return;
            }
        }
        price = (isFirst ? firstPrice : secondPrice);
        price = ((price === '') || (price === '0')) ? "" + num : price + num;
        var setPrice = isFirst ? setFirstPrice : setSecondPrice;
        setPrice(price);
    }
    function handlerInputCalculation(inpCalculation) {
        var firstPriceNumber = parseFloat(firstPrice);
        var secondPriceNumber = parseInt(secondPrice);
        var isInputSecondPrice = !isNaN(secondPriceNumber);
        // 如果输入了 secondPrice
        if (isInputSecondPrice) {
            var currentPrice = calculation === '+' ? (firstPriceNumber + secondPriceNumber) : (firstPriceNumber - secondPriceNumber);
            var priceStr = checkNumberIsInt(currentPrice) ? "" + currentPrice : currentPrice.toFixed(2);
            setFirstPrice(priceStr);
            setSecondPrice('');
        }
        setCalculation(inpCalculation);
    }
    function handlerInputPoint() {
        var isInpCalculation = calculation !== null;
        if (!isInpCalculation && firstPrice === '0') {
            setFirstPrice('.');
            return;
        }
        else if (isInpCalculation && secondPrice === '') {
            setSecondPrice('.');
            return;
        }
        var price = isInpCalculation ? secondPrice : firstPrice;
        if (checkNumberIsInt(price)) {
            price += '.';
            isInpCalculation ? setSecondPrice(price) : setFirstPrice(price);
        }
    }
    function calculationPrice() {
        var firstPriceNum = firstPrice === '.' ? 0 : parseFloat(firstPrice);
        var secondPriceNum = (secondPrice === '' || secondPrice === '.') ? 0 : parseFloat(secondPrice);
        var priceNum = 0;
        switch (calculation) {
            case null:
                priceNum = firstPriceNum;
                break;
            case '+':
                priceNum = firstPriceNum + secondPriceNum;
                break;
            case '-':
                priceNum = firstPriceNum - secondPriceNum;
                break;
        }
        var ret = checkNumberIsInt(priceNum) ? "" + priceNum : priceNum.toFixed(2);
        setFirstPrice(ret);
        setCalculation(null);
        setSecondPrice('');
        return ret;
    }
    function handlerDelete() {
        if (firstPrice !== '0' && calculation === null && !secondPrice) {
            if (firstPrice === '.') {
                setFirstPrice('0');
            }
            else {
                setFirstPrice(firstPrice.length <= 1 ? '0' : firstPrice.slice(0, firstPrice.length - 1));
            }
        }
        else if (calculation !== null && !secondPrice) {
            setCalculation(null);
        }
        else {
            setSecondPrice(secondPrice.length <= 1 ? '' : secondPrice.slice(0, secondPrice.length - 1));
        }
    }
    function handlerConfirm() {
        var price = calculationPrice();
        onConfirm && onConfirm({
            date: date,
            remark: remark,
            price: price
        });
    }
    // 判断选择的日期是否为今天
    var dateIsToday = (date === null || date === void 0 ? void 0 : date.format('YYYY/MM/DD')) === moment_1["default"]().format('YYYY/MM/DD');
    return (react_1["default"].createElement("div", { className: "calculator", style: style || void 0 },
        react_1["default"].createElement("div", { className: "remark-row clearfix" },
            react_1["default"].createElement(antd_mobile_1.List, null,
                react_1["default"].createElement(antd_mobile_1.InputItem, { clear: true, value: remark, onChange: function (val) {
                        setRemark(val);
                    }, placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8" }, "\u5907\u6CE8"),
                react_1["default"].createElement(antd_mobile_1.InputItem, { clear: true, editable: false, value: firstPrice + " " + (calculation || '') + " " + (calculation && secondPrice ? secondPrice : ''), placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8" }, "\u5F53\u524D\u4EF7\u683C"))),
        react_1["default"].createElement("div", { className: "keys-area" },
            react_1["default"].createElement("div", { className: "keys-row" },
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(7);
                    } }, "7"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(8);
                    } }, "8"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(9);
                    } }, "9"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        setDatePickerVisible(true);
                    } }, dateIsToday ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("span", { className: "icon iconfont icon-rili" }),
                    "\u00A0\u4ECA\u5929")) : date.format('YYYY/MM/DD'))),
            react_1["default"].createElement("div", { className: "keys-row" },
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(4);
                    } }, "4"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(5);
                    } }, "5"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(6);
                    } }, "6"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputCalculation('+');
                    } }, "+")),
            react_1["default"].createElement("div", { className: "keys-row" },
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(1);
                    } }, "1"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(2);
                    } }, "2"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(3);
                    } }, "3"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputCalculation('-');
                    } }, "-")),
            react_1["default"].createElement("div", { className: "keys-row" },
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputPoint();
                    } }, "."),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: function () {
                        handlerInputNumber(0);
                    } }, "0"),
                react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", onClick: handlerDelete },
                    react_1["default"].createElement("span", { className: "icon iconfont icon-delete" })),
                secondPrice === '' ?
                    (react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", type: "primary", onClick: handlerConfirm }, "\u5B8C\u6210")) : (react_1["default"].createElement(antd_mobile_1.Button, { className: "code-item", type: "primary", onClick: calculationPrice }, "=")))),
        react_1["default"].createElement(antd_mobile_1.DatePicker, { mode: "date", visible: datePickerVisible, value: date.toDate(), onOk: function (date) {
                setDate(moment_1["default"](date));
                setDatePickerVisible(false);
            }, onDismiss: function () {
                setDatePickerVisible(false);
            } })));
});
exports["default"] = Calculator;
