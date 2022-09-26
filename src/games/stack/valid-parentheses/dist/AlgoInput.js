"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var Box_1 = require("@mui/material/Box");
var Output_1 = require("@mui/icons-material/Output");
var FileCopyOutlined_1 = require("@mui/icons-material/FileCopyOutlined");
var Save_1 = require("@mui/icons-material/Save");
var Print_1 = require("@mui/icons-material/Print");
var Share_1 = require("@mui/icons-material/Share");
var IconButton_1 = require("@mui/material/IconButton");
var Paper_1 = require("@mui/material/Paper");
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
var KeyboardArrowDown_1 = require("@mui/icons-material/KeyboardArrowDown");
var Item = styles_1.styled(Paper_1["default"])(function (_a) {
    var theme = _a.theme;
    return (__assign(__assign({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff' }, theme.typography.body2), { padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary }));
});
var actions = [
    { icon: React.createElement(FileCopyOutlined_1["default"], null), name: 'Copy' },
    { icon: React.createElement(Save_1["default"], null), name: 'Save' },
    { icon: React.createElement(Print_1["default"], null), name: 'Print' },
    { icon: React.createElement(Share_1["default"], null), name: 'Share' },
];
function BasicSpeedDial() {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(Box_1["default"], { sx: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            top: 80,
            flexGrow: 1,
            width: "100%",
            height: 100,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center"
        } },
        React.createElement(Paper_1["default"], { component: "form", sx: {
                p: '2px 4px',
                display: 'flex',
                width: 250,
                alignItems: "center"
            } },
            React.createElement(IconButton_1["default"], { sx: { p: '10px' }, "aria-label": "menu" },
                React.createElement(KeyboardArrowDown_1["default"], null)),
            React.createElement(material_1.InputBase, { sx: { ml: 1, flex: 1 }, placeholder: "Input Parentheses", inputProps: { 'aria-label': 'search google maps' } }),
            React.createElement(material_1.Divider, { sx: { height: 28, m: 0.5 }, orientation: "vertical" }),
            React.createElement(IconButton_1["default"], { color: "primary", sx: { p: '10px' }, "aria-label": "directions" },
                React.createElement(Output_1["default"], null)))));
}
exports["default"] = BasicSpeedDial;
