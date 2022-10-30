"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var React = require("react");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var AlgoContext_1 = require("./AlgoContext");
var stackItemBuilder_1 = require("./stackItemBuilder");
var AddCircleOutlineOutlined_1 = require("@mui/icons-material/AddCircleOutlineOutlined");
var HelpOutlineOutlined_1 = require("@mui/icons-material/HelpOutlineOutlined");
var RemoveCircleOutlineOutlined_1 = require("@mui/icons-material/RemoveCircleOutlineOutlined");
var ModeStandbyOutlined_1 = require("@mui/icons-material/ModeStandbyOutlined");
var utils_1 = require("../../../data-structures/_commons/utils");
var stackShellBuilder_1 = require("./stackShellBuilder");
var anchorOrigin = {
    vertical: 'top',
    horizontal: 'center'
};
var transformOrigin = {
    vertical: 'bottom',
    horizontal: 'center'
};
var DisplayValue = function (_a) {
    var value = _a.value;
    return (React.createElement(material_1.Avatar, null, value));
};
var increaseShells = function (stack, scene) { return __awaiter(void 0, void 0, void 0, function () {
    var size, increaseSize, i, shell, shell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stack.size()];
            case 1:
                size = _a.sent();
                increaseSize = size - stack.shellsLength;
                for (i = 0; i < increaseSize; i++) {
                    shell = new stackShellBuilder_1["default"](scene, true).build();
                    stack.increaseShells(shell);
                }
                if (size === stack.shellsLength) {
                    shell = new stackShellBuilder_1["default"](scene, true).build();
                    stack.increaseShells(shell);
                }
                return [2 /*return*/];
        }
    });
}); };
var decreaseShells = function (stack, minShellSize) { return __awaiter(void 0, void 0, void 0, function () {
    var isDifferent, _a, shell, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = stack.shellsLength;
                return [4 /*yield*/, stack.size()];
            case 1:
                isDifferent = _a > (_c.sent());
                _c.label = 2;
            case 2:
                if (!(stack.shellsLength > minShellSize && isDifferent)) return [3 /*break*/, 4];
                shell = stack.decreaseShells();
                if (shell) {
                    shell.hide();
                }
                _b = stack.shellsLength;
                return [4 /*yield*/, stack.size()];
            case 3:
                isDifferent = _b > (_c.sent());
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}); };
var shift = function (inn, out, minShellSize, scene) { return __awaiter(void 0, void 0, void 0, function () {
    var isOutEmpty, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, out.isEmpty()];
            case 1:
                isOutEmpty = _a.sent();
                if (!isOutEmpty) return [3 /*break*/, 9];
                return [4 /*yield*/, inn.pop()];
            case 2:
                item = _a.sent();
                return [4 /*yield*/, decreaseShells(inn, minShellSize)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!item) return [3 /*break*/, 9];
                return [4 /*yield*/, increaseShells(out, scene)];
            case 5:
                _a.sent();
                return [4 /*yield*/, out.push(item)];
            case 6:
                _a.sent();
                return [4 /*yield*/, inn.pop()];
            case 7:
                item = _a.sent();
                return [4 /*yield*/, decreaseShells(inn, minShellSize)];
            case 8:
                _a.sent();
                return [3 /*break*/, 4];
            case 9: return [2 /*return*/];
        }
    });
}); };
var Enqueue = function () {
    var _a = AlgoContext_1.useAlgoContext(), stackIn = _a.stackIn, scene = _a.scene, animate = _a.animate, cancelAnimate = _a.cancelAnimate, actionsDisabled = _a.actionsDisabled, setActionsDisabled = _a.setActionsDisabled;
    var handleEnqueue = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stackIn) {
                        return [2 /*return*/];
                    }
                    setActionsDisabled(true);
                    value = event.currentTarget.value;
                    animate();
                    return [4 /*yield*/, increaseShells(stackIn, scene)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, doEnqueue(stackIn, value)];
                case 2:
                    _a.sent();
                    cancelAnimate();
                    setActionsDisabled(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var doEnqueue = function (stack, value) { return __awaiter(void 0, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = new stackItemBuilder_1["default"](value, scene, true).build();
                    return [4 /*yield*/, stack.push(item)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var _b = React.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handlePopoverClose = function () {
        setAnchorEl(null);
    };
    var TypeButton = function (_a) {
        var value = _a.value;
        return (React.createElement(material_1.Button, { key: value, value: value + 1, onClick: handleEnqueue }, value + 1));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(material_1.Popover, { anchorEl: anchorEl, open: open, onClose: handlePopoverClose, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin },
            React.createElement(material_1.ButtonGroup, { variant: 'outlined', disabled: actionsDisabled, size: "large" }, Array.from(Array(9).keys()).map(function (value) { return React.createElement(TypeButton, { key: value, value: value }); }))),
        React.createElement(material_1.Button, { onClick: handleClick, startIcon: React.createElement(AddCircleOutlineOutlined_1["default"], null) }, "enqueue")));
};
var Dequeue = function () {
    var _a = AlgoContext_1.useAlgoContext(), stackIn = _a.stackIn, stackOut = _a.stackOut, animate = _a.animate, cancelAnimate = _a.cancelAnimate, setActionsDisabled = _a.setActionsDisabled, scene = _a.scene, minShellSize = _a.minShellSize;
    var handleDequeue = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stackIn || !stackOut) {
                        return [2 /*return*/];
                    }
                    setActionsDisabled(true);
                    animate();
                    return [4 /*yield*/, doDequeue(stackIn, stackOut)];
                case 1:
                    _a.sent();
                    cancelAnimate();
                    setActionsDisabled(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var doDequeue = function (inn, out) { return __awaiter(void 0, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, shift(inn, out, minShellSize, scene)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, out.pop()];
                case 2:
                    item = _a.sent();
                    if (!item) return [3 /*break*/, 5];
                    item.hide();
                    return [4 /*yield*/, decreaseShells(out, minShellSize)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, utils_1.wait(0.1)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var _b = React.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var open = Boolean(anchorEl);
    var ref = React.useRef();
    var showPopover = function () {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    };
    var closePopover = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(material_1.Popover, { anchorEl: anchorEl, open: open, onClose: closePopover, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin }, "123"),
        React.createElement(material_1.Button, { onClick: handleDequeue, startIcon: React.createElement(RemoveCircleOutlineOutlined_1["default"], null) }, "dequeue")));
};
var Empty = function () {
    return (React.createElement(material_1.Button, { startIcon: React.createElement(HelpOutlineOutlined_1["default"], null) }, "empty"));
};
var Peek = function () {
    var _a = AlgoContext_1.useAlgoContext(), stackIn = _a.stackIn, stackOut = _a.stackOut, animate = _a.animate, cancelAnimate = _a.cancelAnimate, setActionsDisabled = _a.setActionsDisabled, scene = _a.scene, minShellSize = _a.minShellSize;
    var handlePeek = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stackIn || !stackOut) {
                        return [2 /*return*/];
                    }
                    setActionsDisabled(true);
                    animate();
                    return [4 /*yield*/, doPeek(stackIn, stackOut)];
                case 1:
                    _a.sent();
                    cancelAnimate();
                    setActionsDisabled(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var doPeek = function (inn, out) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, shift(inn, out, minShellSize, scene)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(material_1.Button, { onClick: handlePeek, startIcon: React.createElement(ModeStandbyOutlined_1["default"], null) }, "peek"));
};
var Actions = styles_1.styled("div")(function () { return ({
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "200px"
}); });
var Main = function () {
    var actionsDisabled = AlgoContext_1.useAlgoContext().actionsDisabled;
    return (React.createElement(Actions, null,
        React.createElement(material_1.ButtonGroup, { variant: "contained", size: "large", disabled: actionsDisabled },
            React.createElement(Enqueue, null),
            React.createElement(Dequeue, null),
            React.createElement(Peek, null),
            React.createElement(Empty, null))));
};
exports["default"] = Main;
