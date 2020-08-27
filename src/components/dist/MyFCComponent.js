"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MyFCComponent = react_1.forwardRef(function (props, ref) {
    var firstName = props.firstName, lastName = props.lastName;
    react_1.useImperativeHandle(ref, function () { return ({
        showName: showName
    }); });
    function showName() {
        console.log('姓名为：', "" + firstName + lastName);
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h4", null, "\u51FD\u6570\u7EC4\u4EF6"),
        react_1["default"].createElement("p", null,
            "Hello ",
            firstName,
            "-",
            lastName)));
});
exports["default"] = MyFCComponent;
