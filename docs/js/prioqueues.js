/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/algorithm-controls/engine-algorithm-controls.ts":
/*!*************************************************************!*\
  !*** ./src/algorithm-controls/engine-algorithm-controls.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineAlgorithmControl: () => (/* binding */ EngineAlgorithmControl)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");

class EngineAlgorithmControl {
    constructor(container) {
        this.algorithmControls = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("fieldset.algorithmControls", container);
    }
}


/***/ }),

/***/ "./src/algorithm-controls/prioqueue-algorithm-controls.ts":
/*!****************************************************************!*\
  !*** ./src/algorithm-controls/prioqueue-algorithm-controls.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrioQueueAlgorithmControl: () => (/* binding */ PrioQueueAlgorithmControl)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine-algorithm-controls */ "./src/algorithm-controls/engine-algorithm-controls.ts");


class PrioQueueAlgorithmControl extends _engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__.EngineAlgorithmControl {
    constructor(container, engine) {
        super(container);
        this.engine = engine;
        this.insertSelect = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("select.insertSelect", this.algorithmControls);
        this.insertField = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.insertField", this.algorithmControls);
        this.insertSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.insertSubmit", this.algorithmControls);
        this.deleteSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.deleteSubmit", this.algorithmControls);
        this.clearSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.clearSubmit", this.algorithmControls);
        this.initialize();
    }
    initialize() {
        this.insertSelect.addEventListener("change", () => {
            this.insertField.value = this.insertSelect.value;
            this.insertSelect.value = "";
        });
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addReturnSubmit)(this.insertField, "ALPHANUM+", () => this.engine.submit(this.engine.insert, this.insertField));
        this.insertSubmit.addEventListener("click", () => this.engine.submit(this.engine.insert, this.insertField));
        this.deleteSubmit.addEventListener("click", () => this.engine.submit(this.engine.deleteMin, null));
        this.clearSubmit.addEventListener("click", () => this.engine.confirmResetAll());
    }
}


/***/ }),

/***/ "./src/cookies.ts":
/*!************************!*\
  !*** ./src/cookies.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cookies: () => (/* binding */ Cookies)
/* harmony export */ });
class Cookies {
    constructor(initialCookies, debug) {
        this.$COOKIE_EXPIRE_DAYS = 30;
        this.cookies = initialCookies;
        this.debug = debug;
        this.load();
        this.addEventListeners();
        this.save();
    }
    addEventListeners() {
        this.debug.log("Adding event listeners to cookie elements", this.cookies);
        Object.values(this.cookies).map((cookieField) => {
            cookieField.addEventListener("change", () => this.save());
        });
    }
    load() {
        this.debug.log("Loading cookies", document.cookie);
        if (document.cookie === "") {
            return;
        }
        const allCookies = document.cookie.split("; ");
        allCookies.map((cookie) => {
            const splitCookie = cookie.split("=");
            if (splitCookie.length !== 2) {
                throw new Error("Invalid cookie format");
            }
            const [documentCookieName, documentCookieValue] = splitCookie;
            if (documentCookieName in this.cookies) {
                this.cookies[documentCookieName].value =
                    decodeURIComponent(documentCookieValue);
            }
        });
    }
    save() {
        let expires = "";
        if (this.$COOKIE_EXPIRE_DAYS > 0) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + this.$COOKIE_EXPIRE_DAYS);
            expires = `;expires=${expiryDate.toUTCString()}`;
        }
        Object.entries(this.cookies).map(([cookieName, cookieField]) => {
            const cookieValue = encodeURIComponent(cookieField.value);
            document.cookie = `${cookieName}=${cookieValue}${expires}`;
        });
        this.debug.log("Setting cookies", document.cookie);
    }
}


/***/ }),

/***/ "./src/debugger.ts":
/*!*************************!*\
  !*** ./src/debugger.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Debugger: () => (/* binding */ Debugger)
/* harmony export */ });
class Debugger {
    constructor() {
        const debugParam = new URL(window.location.href).searchParams.get("debug");
        this.enabled = Boolean(debugParam);
    }
    log(message, ...optionalParams) {
        if (this.enabled) {
            console.log(message, ...optionalParams);
        }
    }
    isEnabled() {
        return this.enabled;
    }
}


/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Engine: () => (/* binding */ Engine),
/* harmony export */   NBSP: () => (/* binding */ NBSP)
/* harmony export */ });
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/cookies */ "./src/cookies.ts");
/* harmony import */ var _debugger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/debugger */ "./src/debugger.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/info */ "./src/info.ts");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/objects */ "./src/objects/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/state */ "./src/state.ts");
/* harmony import */ var _algorithm_controls_engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./algorithm-controls/engine-algorithm-controls */ "./src/algorithm-controls/engine-algorithm-controls.ts");
/* harmony import */ var _general_controls_engine_general_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./general-controls/engine-general-controls */ "./src/general-controls/engine-general-controls.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const NBSP = "\u00A0";
class Engine {
    getAnimationSpeed() {
        return parseInt(this.generalControls.animationSpeedSelect.value);
    }
    getObjectSize() {
        return parseInt(this.generalControls.objectSizeSelect.value);
    }
    getNodeSpacing() {
        return this.getObjectSize();
    }
    getStrokeWidth() {
        return this.getObjectSize() / 12;
    }
    getNodeStart() {
        return [
            this.$Svg.margin + this.getObjectSize() / 2,
            this.$Svg.margin * 4,
        ];
    }
    getTreeRoot() {
        return [
            this.Svg.viewbox().width / 2,
            2 * this.$Svg.margin + this.getObjectSize() / 2,
        ];
    }
    constructor(containerSelector) {
        this.messages = {};
        this.$Svg = {
            width: 1000,
            height: 600,
            margin: 30,
            objectSize: 40,
            animationSpeed: 1000,
        };
        this.actions = [];
        this.currentAction = 0;
        this.currentStep = 0;
        this.debugger = new _debugger__WEBPACK_IMPORTED_MODULE_1__.Debugger();
        this.state = new _state__WEBPACK_IMPORTED_MODULE_5__.State();
        this.container = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.querySelector)(containerSelector);
        this.generalControls = new _general_controls_engine_general_controls__WEBPACK_IMPORTED_MODULE_7__.EngineGeneralControls(this.container, this);
        this.algorithmControls = new _algorithm_controls_engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_6__.EngineAlgorithmControl(this.container);
        this.cookies = new _cookies__WEBPACK_IMPORTED_MODULE_0__.Cookies({
            objectSize: this.generalControls.objectSizeSelect,
            animationSpeed: this.generalControls.animationSpeedSelect,
        }, this.debugger);
        const svgContainer = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.querySelector)("svg", this.container);
        this.Svg = new _objects__WEBPACK_IMPORTED_MODULE_4__.Svg(svgContainer);
        this.Svg.viewbox(0, 0, this.$Svg.width, this.$Svg.height);
        this.Svg.$engine = this;
        if (this.debugger.isEnabled()) {
            this.Svg.addClass("debug");
        }
        this.info = new _info__WEBPACK_IMPORTED_MODULE_3__.Info(this.Svg, this.$Svg.margin);
    }
    initialise() {
        this.resetAll();
        this.generalControls.setRunning(true);
    }
    resetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions = [];
            yield this.reset();
        });
    }
    confirmResetAll() {
        if (confirm("This clears the canvas and your history!")) {
            this.resetAll();
            return true;
        }
        return false;
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearCanvas();
            yield this.resetAlgorithm();
            this.resetListeners(false);
        });
    }
    resetAlgorithm() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    clearCanvas() {
        this.Svg.clear();
        const w = this.Svg.viewbox().width;
        const h = this.Svg.viewbox().height;
        if (this.debugger.isEnabled()) {
            for (let x = 1; x < w / 100; x++) {
                this.Svg.line(x * 100, 0, x * 100, h).addClass("gridline");
            }
            for (let y = 1; y < h / 100; y++) {
                this.Svg.line(0, y * 100, w, y * 100).addClass("gridline");
            }
        }
        this.info.reset();
        this.updateCSSVariables();
    }
    updateCSSVariables() {
        const relativeSize = Math.round((100 * this.getObjectSize()) / this.$Svg.objectSize);
        document.documentElement.style.setProperty("--node-font-size", `${relativeSize}%`);
    }
    drawViewbox(right, down, zoom) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Svg.viewbox(right, down, this.$Svg.width * zoom, this.$Svg.height * zoom);
        });
    }
    setIdleTitle() {
        this.info.setTitle("Select an action from the menu above");
        this.info.setBody(NBSP);
    }
    disableWhenRunning(disabled) {
        for (const elem of this.container.querySelectorAll(".disableWhenRunning")) {
            elem.disabled = disabled;
        }
    }
    resetListeners(isRunning) {
        this.generalControls.removeAllListeners();
        if (this.constructor === Engine) {
            this.disableWhenRunning(true);
            return;
        }
        this.generalControls.addRunnerListener();
        if (isRunning) {
            this.disableWhenRunning(true);
            this.info.setStatus("paused");
            return;
        }
        this.disableWhenRunning(false);
        this.setIdleTitle();
        this.info.setStatus("inactive");
        this.generalControls.addIdleListeners();
    }
    submit(method, field) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawValue = "";
            try {
                if (field instanceof HTMLInputElement) {
                    rawValue = field.value;
                    field.value = "";
                }
                const values = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.parseValues)(rawValue);
                yield this.execute(method, values);
                return true;
            }
            catch (error) {
                console.error(error);
            }
            return false;
        });
    }
    execute(method_1, args_1) {
        return __awaiter(this, arguments, void 0, function* (method, args, until = 0) {
            yield this.reset();
            this.actions.push({ method, args, stepCount: until });
            this.debugger.log(`EXEC ${until}: ${method.name} ${args.join(", ")}, ${JSON.stringify(this.actions)}`);
            try {
                yield this.runActionsLoop();
                this.actions[this.actions.length - 1].stepCount = this.currentStep;
                this.debugger.log(`DONE / ${this.currentStep}: ${JSON.stringify(this.actions)}`);
                this.resetListeners(false);
            }
            catch (reason) {
                if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isValidReason)(reason)) {
                    console.error(reason);
                    this.resetListeners(false);
                    return;
                }
                if (reason.running !== undefined) {
                    this.generalControls.setRunning(reason.running);
                }
                this.actions.pop();
                until = reason.until;
                this.debugger.log(`RERUN ${until} / ${this.currentStep}: ${JSON.stringify(this.actions)}`);
                if (until <= 0 && this.actions.length > 0) {
                    const action = this.actions.pop();
                    method = action.method;
                    args = action.args;
                    until = action.stepCount;
                }
                if (until > 0) {
                    this.execute(method, args, until);
                }
                else {
                    this.reset();
                }
            }
        });
    }
    runActionsLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let nAction = 0; nAction < this.actions.length; nAction++) {
                this.resetListeners(true);
                const action = this.actions[nAction];
                this.currentAction = nAction;
                this.currentStep = 0;
                const methodNameArr = action.method.name.match(/[A-Za-z][a-z]*/g) || [];
                const methodName = methodNameArr
                    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
                    .join(" ");
                const title = `${methodName} ${action.args.join(", ")}`;
                this.debugger.log(`CALL ${nAction}: ${title}, ${JSON.stringify(this.actions)}`);
                this.info.setTitle(title);
                yield this.pause("");
                yield action.method.apply(this, action.args);
            }
        });
    }
    pause(message, ...args) {
        const body = this.getMessage(message, ...args);
        this.debugger.log(`${this.currentStep}. Doing: ${body} (running: ${this.generalControls.isRunning()}), ${JSON.stringify(this.actions)}`);
        if (this.state.isResetting()) {
            return null;
        }
        if (body !== undefined) {
            this.info.setBody(body);
        }
        return new Promise((resolve, reject) => {
            const action = this.actions[this.currentAction];
            if (this.currentStep < action.stepCount) {
                this.generalControls.fastForward(resolve, reject);
                return;
            }
            let runnerTimer = undefined;
            this.generalControls.addAsyncListeners(resolve, reject, runnerTimer);
            if (this.generalControls.isRunning()) {
                this.info.setStatus("running");
                runnerTimer = setTimeout(() => this.generalControls.stepForward(resolve, reject), this.getAnimationSpeed() * 1.1);
            }
        });
    }
    getMessage(message, ...args) {
        if (typeof message !== "string") {
            if (args.length > 0) {
                console.error("Unknown message:", message, ...args);
            }
            return undefined;
        }
        let title = this.messages;
        const keys = message.split(".");
        if (!(keys[0] in title)) {
            return [message, ...args].join("\n");
        }
        for (const key of keys) {
            if (!(typeof title === "object" && key in title)) {
                console.error("Unknown message:", message, ...args);
                return [message, ...args].join("\n");
            }
            title = title[key];
        }
        if (typeof title === "function") {
            title = title(...args);
        }
        if (typeof title !== "string") {
            console.error("Unknown message:", message, ...args);
            return [message, ...args].join("\n");
        }
        return title;
    }
    animate(elem, animate = true) {
        if (this.state.isAnimating() && animate) {
            this.info.setStatus("running");
            this.info.setStatus("paused", this.getAnimationSpeed());
            return elem.animate(this.getAnimationSpeed(), 0, "now");
        }
        else {
            return elem;
        }
    }
}


/***/ }),

/***/ "./src/general-controls/engine-general-controls.ts":
/*!*********************************************************!*\
  !*** ./src/general-controls/engine-general-controls.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineGeneralControls: () => (/* binding */ EngineGeneralControls)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");

class EngineGeneralControls {
    constructor(container, engine) {
        this.activeListeners = new Map();
        this.idleListeners = [];
        this.asyncListeners = [];
        this.engine = engine;
        this.debugger = engine.debugger;
        this.generalControls = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("fieldset.generalControls", container);
        this.fastBackwardButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("button.fastBackward", container);
        this.stepBackwardButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("button.stepBackward", container);
        this.toggleRunnerButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("button.toggleRunner", container);
        this.stepForwardButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("button.stepForward", container);
        this.fastForwardButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("button.fastForward", container);
        this.objectSizeSelect = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("select.objectSize", container);
        this.animationSpeedSelect = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("select.animationSpeed", container);
        this.idleListeners.push({
            element: this.stepBackwardButton,
            type: "click",
            condition: () => this.engine.actions.length > 0,
            handler: () => {
                this.setRunning(false);
                const action = this.engine.actions.pop();
                this.engine.execute(action.method, action.args, action.stepCount - 1);
            },
        }, {
            element: this.fastBackwardButton,
            type: "click",
            condition: () => this.engine.actions.length > 0,
            handler: () => {
                this.engine.actions.pop();
                if (this.engine.actions.length > 0) {
                    const action = this.engine.actions.pop();
                    this.engine.execute(action.method, action.args, action.stepCount);
                }
                else {
                    this.engine.reset();
                }
            },
        }, {
            element: this.objectSizeSelect,
            type: "change",
            condition: () => true,
            handler: () => {
                if (this.engine.actions.length > 0) {
                    const action = this.engine.actions.pop();
                    this.engine.execute(action.method, action.args, action.stepCount);
                }
                else {
                    this.engine.reset();
                }
            },
        });
        this.asyncListeners.push({
            element: this.stepForwardButton,
            type: "click",
            handler: (resolve, reject) => {
                this.setRunning(false);
                this.stepForward(resolve, reject);
            },
        }, {
            element: this.fastForwardButton,
            type: "click",
            handler: (resolve, reject) => {
                this.engine.actions[this.engine.currentAction].stepCount =
                    Number.MAX_SAFE_INTEGER;
                this.fastForward(resolve, reject);
            },
        }, {
            element: this.toggleRunnerButton,
            type: "click",
            handler: (resolve, reject) => {
                this.toggleRunner();
                if (this.isRunning()) {
                    this.stepForward(resolve, reject);
                }
                else {
                    this.engine.currentStep++;
                    resolve(undefined);
                }
            },
        }, {
            element: this.stepBackwardButton,
            type: "click",
            handler: (resolve, reject) => reject({
                until: this.engine.currentStep - 1,
                running: false,
            }),
        }, {
            element: this.fastBackwardButton,
            type: "click",
            handler: (resolve, reject) => reject({ until: 0 }),
        }, {
            element: this.objectSizeSelect,
            type: "change",
            handler: (resolve, reject) => reject({ until: this.engine.currentStep }),
        });
    }
    addAsyncListeners(resolve, reject, runnerTimer) {
        this.asyncListeners.forEach((listener) => {
            this.addListener(listener.element, listener.type, () => {
                clearTimeout(runnerTimer);
                listener.handler(resolve, reject);
            });
        });
    }
    addIdleListeners() {
        this.idleListeners.forEach((listener) => {
            this.addListener(listener.element, listener.type, () => {
                this.debugger.log(listener.element, `${listener.type}: ${JSON.stringify(this.engine.actions)}`);
                listener.handler();
            });
        });
    }
    addListener(element, type, handler) {
        const listeners = this.activeListeners;
        if (!listeners.has(element)) {
            listeners.set(element, {});
        }
        const listener = listeners.get(element);
        const oldHandler = listener[type];
        if (oldHandler) {
            element.removeEventListener(type, oldHandler);
        }
        listener[type] = handler;
        element.addEventListener(type, handler);
        element.disabled = false;
    }
    removeAllListeners() {
        this.activeListeners.forEach((listener, element) => {
            element.disabled = true;
            for (const type in listener) {
                element.removeEventListener(type, listener[type]);
            }
        });
        this.activeListeners.clear();
    }
    isRunning() {
        return this.toggleRunnerButton.classList.contains("selected");
    }
    setRunning(running) {
        const classes = this.toggleRunnerButton.classList;
        if (running) {
            classes.add("selected");
        }
        else {
            classes.remove("selected");
        }
        return this;
    }
    toggleRunner() {
        return this.setRunning(!this.isRunning());
    }
    addRunnerListener() {
        this.addListener(this.toggleRunnerButton, "click", () => this.toggleRunner());
    }
    stepForward(resolve, reject) {
        this.engine.currentStep++;
        this.engine.state.setAnimating(true);
        resolve(undefined);
    }
    fastForward(resolve, reject) {
        const action = this.engine.actions[this.engine.currentAction];
        if (this.engine.currentStep >= action.stepCount) {
            action.stepCount = this.engine.currentStep;
        }
        this.engine.currentStep++;
        this.engine.state.setAnimating(false);
        if (this.debugger.isEnabled()) {
            setTimeout(resolve, 10);
        }
        else {
            resolve(undefined);
        }
    }
}


/***/ }),

/***/ "./src/heaps/BinaryHeap.ts":
/*!*********************************!*\
  !*** ./src/heaps/BinaryHeap.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryHeap: () => (/* binding */ BinaryHeap),
/* harmony export */   BinaryHeapMessages: () => (/* binding */ BinaryHeapMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _objects_binary_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/objects/binary-node */ "./src/objects/binary-node.ts");
/* harmony import */ var _objects_dsarray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/objects/dsarray */ "./src/objects/dsarray.ts");
/* harmony import */ var _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/objects/text-circle */ "./src/objects/text-circle.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const BinaryHeapMessages = {
    general: {
        empty: "Heap is empty!",
        full: "Heap is full!",
        finished: "Finished",
    },
    insert: {
        value: (value) => `Insert value: ${value}`,
        shiftUp: "Shift the value upwards",
        stopShift: (parentValue) => `The parent ${parentValue} is not larger: stop here`,
        shiftAgain: (parentValue) => `The parent ${parentValue} is larger`,
    },
    delete: {
        root: (minValue) => `Remove the root: ${minValue}`,
        minValue: (minValue) => `Remove the minimum value: ${minValue}`,
        lastHeap: "Remove the new last heap value",
        shiftDown: "Shift the value downwards",
        stopShift: (currentValue, childValue) => `The value ${currentValue} is not larger than the smallest child ${childValue}: stop here`,
        shiftAgain: (currentValue, childValue) => `The value ${currentValue} is larger than the smallest child ${childValue}`,
    },
    swap: {
        swap: (a, b) => `Swap ${a} and ${b}`,
        lastToFirst: (val) => `Swap in the last heap value to the first position: ${val}`,
    },
};
class BinaryHeap extends _engine__WEBPACK_IMPORTED_MODULE_0__.Engine {
    constructor(containerSelector) {
        super(containerSelector);
        this.messages = BinaryHeapMessages;
        this.arraySize = 28;
        this.initialValues = null;
        this.treeRoot = null;
        this.treeNodes = null;
        this.heapArray = null;
        this.heapSize = null;
    }
    initialise(initialValues = null) {
        this.initialValues = initialValues;
        super.initialise();
    }
    resetAlgorithm() {
        const _super = Object.create(null, {
            resetAlgorithm: { get: () => super.resetAlgorithm }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.resetAlgorithm.call(this);
            this.treeRoot = null;
            this.treeNodes = new Array(this.arraySize);
            const [xRoot, yRoot] = this.getTreeRoot();
            this.heapArray = this.Svg.put(new _objects_dsarray__WEBPACK_IMPORTED_MODULE_3__.DSArray(this.arraySize, this.getObjectSize(), true)).init(this.arraySize, xRoot, this.Svg.viewbox().height - yRoot);
            if (Number(this.heapArray.x()) < this.$Svg.margin) {
                this.heapArray.x(this.$Svg.margin);
            }
            this.heapSize = 0;
            yield this.state.runWhileResetting(() => __awaiter(this, void 0, void 0, function* () {
                if (this.initialValues) {
                    yield this.insert(...this.initialValues);
                }
            }));
        });
    }
    resizeTree() {
        var _a;
        const animate = !this.state.isResetting();
        (_a = this.treeRoot) === null || _a === void 0 ? void 0 : _a.resize(...this.getTreeRoot(), this.$Svg.margin, this.getNodeSpacing(), animate ? this.getAnimationSpeed() : 0);
    }
    insert(...values) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const val of values) {
                yield this.insertOne(val);
            }
        });
    }
    swap(j, k, message, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.treeNodes === null) {
                throw new Error("Tree nodes not initialised");
            }
            if (this.heapArray === null) {
                throw new Error("Heap array not initialised");
            }
            const jNode = this.treeNodes[j], kNode = this.treeNodes[k];
            const jLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__.TextCircle(jNode.getText(), this.getObjectSize(), this.getStrokeWidth())).init(jNode.cx(), jNode.cy());
            const kLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__.TextCircle(kNode.getText(), this.getObjectSize(), this.getStrokeWidth())).init(kNode.cx(), kNode.cy());
            jLabel.setCenter(kLabel.cx(), kLabel.cy(), this.getAnimationSpeed());
            kLabel.setCenter(jLabel.cx(), jLabel.cy(), this.getAnimationSpeed());
            this.heapArray.swap(j, k, true);
            yield this.pause(message, ...args);
            jNode.setText(kLabel.getText());
            kNode.setText(jLabel.getText());
            jLabel.remove();
            kLabel.remove();
        });
    }
    insertOne(value) {
        return __awaiter(this, void 0, void 0, function* () {
            value = String(value);
            if (this.heapSize === null) {
                throw new Error("Heap size not initialised");
            }
            if (this.treeNodes === null) {
                throw new Error("Tree nodes not initialised");
            }
            if (this.heapArray === null) {
                throw new Error("Heap array not initialised");
            }
            if (this.heapSize >= this.arraySize) {
                yield this.pause("general.full");
                return;
            }
            let currentIndex = this.heapSize;
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            let parentNode = this.treeNodes[parentIndex];
            const arrayLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__.TextCircle(value, this.getObjectSize(), this.getStrokeWidth())).init(...this.getNodeStart());
            let treeNode = this.Svg.put(new _objects_binary_node__WEBPACK_IMPORTED_MODULE_2__.BinaryNode(value, this.getObjectSize(), this.getStrokeWidth())).init(...this.getNodeStart());
            this.treeNodes[currentIndex] = treeNode;
            yield this.pause("insert.value", value);
            arrayLabel.setCenter(this.heapArray.getCX(currentIndex), this.heapArray.cy(), this.getAnimationSpeed());
            if (currentIndex === 0) {
                this.treeRoot = treeNode;
            }
            else {
                const direction = (currentIndex - 1) / 2 === parentIndex ? "left" : "right";
                parentNode.setChild(direction, treeNode, this.getStrokeWidth());
            }
            this.resizeTree();
            yield this.pause(undefined);
            arrayLabel.remove();
            this.heapArray.setDisabled(currentIndex, false);
            this.heapArray.setValue(currentIndex, value);
            this.heapArray.setIndexHighlight(currentIndex, true);
            this.heapSize++;
            while (currentIndex > 0) {
                treeNode.setHighlight(true);
                yield this.pause("insert.shiftUp");
                parentIndex = Math.floor((currentIndex - 1) / 2);
                parentNode = this.treeNodes[parentIndex];
                const parentValue = this.heapArray.getValue(parentIndex);
                this.heapArray.setIndexHighlight(parentIndex, true);
                const direction = (currentIndex - 1) / 2 === parentIndex ? "left" : "right";
                parentNode.setChildHighlight(direction, true);
                const cmp = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(value, parentValue);
                if (cmp >= 0) {
                    yield this.pause("insert.stopShift", parentValue);
                    this.heapArray.setIndexHighlight(currentIndex, false);
                    this.heapArray.setIndexHighlight(parentIndex, false);
                    treeNode.setHighlight(false);
                    parentNode.setChildHighlight(direction, false);
                    break;
                }
                yield this.pause("insert.shiftAgain", parentValue);
                yield this.swap(currentIndex, parentIndex, "swap.swap", value, parentValue);
                this.heapArray.setIndexHighlight(currentIndex, false);
                treeNode.setHighlight(false);
                parentNode.setChildHighlight(direction, false);
                currentIndex = parentIndex;
                treeNode = parentNode;
            }
            this.heapArray.setIndexHighlight(currentIndex, false);
            treeNode.setHighlight(false);
        });
    }
    deleteMin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.heapSize === null) {
                throw new Error("Heap size not initialised");
            }
            if (this.treeNodes === null) {
                throw new Error("Tree nodes not initialised");
            }
            if (this.heapArray === null) {
                throw new Error("Heap array not initialised");
            }
            if (this.treeRoot === null) {
                throw new Error("Tree root not initialised");
            }
            if (this.heapSize === 0) {
                yield this.pause("general.empty");
                return;
            }
            this.heapSize--;
            const minValue = this.heapArray.getValue(0);
            const arrayLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__.TextCircle(minValue, this.getObjectSize(), this.getStrokeWidth())).init(this.heapArray.getCX(0), this.heapArray.cy());
            if (this.heapSize === 0) {
                yield this.pause("delete.root", minValue);
                this.heapArray.setValue(0, "");
                arrayLabel.setCenter(...this.getNodeStart(), this.getAnimationSpeed());
                this.treeRoot.setCenter(...this.getNodeStart(), this.getAnimationSpeed());
                yield this.pause(undefined);
                arrayLabel.remove();
                this.heapArray.setDisabled(0, true);
                this.treeRoot.remove();
                this.treeRoot = null;
                return;
            }
            const treeLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_4__.TextCircle(minValue, this.getObjectSize(), this.getStrokeWidth())).init(this.treeRoot.cx(), this.treeRoot.cy());
            yield this.pause("delete.minValue", minValue);
            this.heapArray.setValue(0, "");
            this.treeRoot.setText(null);
            arrayLabel.setCenter(...this.getNodeStart(), this.getAnimationSpeed());
            treeLabel.setCenter(...this.getNodeStart(), this.getAnimationSpeed());
            const currentValue = this.heapArray.getValue(this.heapSize);
            yield this.pause(undefined);
            yield this.swap(0, this.heapSize, "swap.lastToFirst", currentValue);
            this.treeNodes[this.heapSize].remove();
            this.heapArray.setDisabled(this.heapSize, true);
            yield this.pause("delete.lastHeap");
            let currentIndex = 0;
            let currentNode = this.treeNodes[currentIndex];
            while (currentIndex < this.heapSize) {
                currentNode.setHighlight(true);
                this.heapArray.setIndexHighlight(currentIndex, true);
                let childIndex = currentIndex * 2 + 1;
                if (childIndex >= this.heapSize) {
                    yield this.pause("finished");
                    currentNode.setHighlight(false);
                    this.heapArray.setIndexHighlight(currentIndex, false);
                    break;
                }
                yield this.pause("delete.shiftDown");
                let direction = "left";
                let childValue = this.heapArray.getValue(childIndex);
                if (childIndex + 1 < this.heapSize &&
                    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(childValue, this.heapArray.getValue(childIndex + 1)) > 0) {
                    direction = "right";
                    childIndex++;
                    childValue = this.heapArray.getValue(childIndex);
                }
                const childNode = this.treeNodes[childIndex];
                this.heapArray.setIndexHighlight(childIndex, true);
                currentNode.setChildHighlight(direction, true);
                childNode.setHighlight(true);
                const cmp = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(currentValue, childValue);
                if (cmp <= 0) {
                    yield this.pause("delete.stopShift", currentValue, childValue);
                    this.heapArray.setIndexHighlight(currentIndex, false);
                    this.heapArray.setIndexHighlight(childIndex, false);
                    currentNode.setChildHighlight(direction, false);
                    childNode.setHighlight(false);
                    break;
                }
                yield this.pause("delete.shiftAgain", currentValue, childValue);
                yield this.swap(currentIndex, childIndex, "swap.swap", currentValue, childValue);
                this.heapArray.setIndexHighlight(currentIndex, false);
                this.heapArray.setIndexHighlight(childIndex, false);
                currentNode.setChildHighlight(direction, false);
                childNode.setHighlight(false);
                currentIndex = childIndex;
                currentNode = childNode;
            }
            yield this.pause(undefined);
            arrayLabel.remove();
            treeLabel.remove();
            this.resizeTree();
        });
    }
}


/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addReturnSubmit: () => (/* binding */ addReturnSubmit),
/* harmony export */   compare: () => (/* binding */ compare),
/* harmony export */   initialiseEngine: () => (/* binding */ initialiseEngine),
/* harmony export */   isValidReason: () => (/* binding */ isValidReason),
/* harmony export */   modulo: () => (/* binding */ modulo),
/* harmony export */   normalizeNumber: () => (/* binding */ normalizeNumber),
/* harmony export */   parseValues: () => (/* binding */ parseValues),
/* harmony export */   querySelector: () => (/* binding */ querySelector),
/* harmony export */   updateDefault: () => (/* binding */ updateDefault)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");

function normalizeNumber(input) {
    input = input.trim();
    return input === "" || isNaN(Number(input)) ? input : Number(input);
}
function parseValues(values) {
    if (!values) {
        return [];
    }
    if (typeof values === "string") {
        values = values.trim().split(/\s+/);
    }
    return values.map((v) => normalizeNumber(v));
}
const allowedCharactersRegex = {
    int: "0-9",
    "int+": "0-9 ",
    float: "-.0-9",
    "float+": "-.0-9 ",
    ALPHA: "A-Z",
    "ALPHA+": "A-Z ",
    alpha: "a-zA-Z",
    "alpha+": "a-zA-Z ",
    ALPHANUM: "A-Z0-9",
    "ALPHANUM+": "A-Z0-9 ",
    alphanum: "a-zA-Z0-9",
    "alphanum+": "a-zA-Z0-9 ",
};
function addReturnSubmit(field, allowed, action) {
    const allowedCharacters = allowedCharactersRegex[allowed];
    const isAllowed = new RegExp(`[^${allowedCharacters}]`, "g");
    function matchAllowedCase(s) {
        if (allowedCharacters === allowedCharacters.toUpperCase()) {
            return s.toUpperCase();
        }
        else if (allowedCharacters === allowedCharacters.toLowerCase()) {
            return s.toLowerCase();
        }
        return s;
    }
    field.oninput = (_) => {
        let pos = field.selectionStart || 0;
        let value = matchAllowedCase(field.value);
        if (isAllowed.test(value)) {
            value = value.replace(isAllowed, "");
            pos--;
        }
        field.value = value;
        field.setSelectionRange(pos, pos);
    };
    if (!action) {
        return;
    }
    field.onkeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            action();
        }
    };
}
function updateDefault(object, defaultObject, override = false) {
    for (const key in defaultObject) {
        if (!(key in object)) {
            object[key] = defaultObject[key];
        }
        else if (typeof object[key] === "object" &&
            object[key] !== null &&
            typeof defaultObject[key] === "object" &&
            defaultObject[key] !== null) {
            updateDefault(object[key], defaultObject[key], override);
        }
        else if (override) {
            object[key] = defaultObject[key];
        }
    }
    return object;
}
function modulo(n, d) {
    const rem = n % d;
    return rem < 0 ? rem + d : rem;
}
function compare(a, b) {
    if (a === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
        a = "";
    }
    if (b === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
        b = "";
    }
    if (isNaN(Number(a)) === isNaN(Number(b))) {
        if (!isNaN(Number(a))) {
            a = Number(a);
            b = Number(b);
        }
        return a === b ? 0 : a < b ? -1 : 1;
    }
    else {
        return isNaN(Number(a)) ? 1 : -1;
    }
}
function isValidReason(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "until" in obj &&
        typeof obj.until === "number" &&
        ("running" in obj ? typeof obj.running === "boolean" : true));
}
function initialiseEngine(containerID, engineSubclasses) {
    const algoSelector = querySelector(`${containerID} .algorithmSelector`);
    const searchParams = new URL(window.location.href).searchParams;
    const algo = new URL(window.location.href).searchParams.get("algorithm") || "";
    algoSelector.value = algo;
    const EngineClass = engineSubclasses[algo] || _engine__WEBPACK_IMPORTED_MODULE_0__.Engine;
    const engine = new EngineClass(containerID);
    engine.initialise();
    algoSelector.addEventListener("change", () => {
        if (algoSelector.value in engineSubclasses) {
            searchParams.set("algorithm", algoSelector.value);
        }
        else {
            searchParams.delete("algorithm");
        }
        if (engine.debugger.isEnabled()) {
            searchParams.set("debug", "true");
        }
        else {
            searchParams.delete("debug");
        }
        window.history.replaceState("", "", `${window.location.pathname}?${searchParams}`);
        window.location.reload();
    });
    if (engineSubclasses[algo]) {
        return { isBaseEngine: false, engine: engine };
    }
    else {
        return { isBaseEngine: true, engine: engine };
    }
}
function querySelector(selector, container = document.documentElement) {
    const element = container.querySelector(selector);
    if (!element) {
        throw new Error(`Could not find element with selector: "${selector}"`);
    }
    return element;
}


/***/ }),

/***/ "./src/info.ts":
/*!*********************!*\
  !*** ./src/info.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Info: () => (/* binding */ Info)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");

const statusText = {
    running: "Animating",
    paused: "Paused",
    inactive: "Idle",
};
const statusClass = {
    running: "running",
    paused: "paused",
    inactive: "",
};
class Info {
    constructor(Svg, margin) {
        this.Svg = Svg;
        const height = this.Svg.viewbox().height;
        const title = this.Svg.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP).addClass("title").x(margin).y(margin);
        const body = this.Svg.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP)
            .addClass("message")
            .x(margin)
            .y(2 * margin);
        const printer = this.Svg.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP)
            .addClass("printer")
            .x(margin)
            .cy(height - 2 * margin);
        const status = this.Svg.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP)
            .addClass("status-report")
            .x(margin)
            .cy(height - margin);
        this.title = title;
        this.body = body;
        this.printer = printer;
        this.status = status;
    }
    setTitle(text) {
        this.title.text(text || _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP);
    }
    setBody(text) {
        this.body.text(text || _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP);
    }
    setStatus(status, timeout = 10) {
        setTimeout(() => {
            this.status
                .text(statusText[status] || _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP)
                .removeClass("paused running")
                .addClass(statusClass[status]);
        }, timeout);
    }
    reset() {
        this.Svg.put(this.title.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP));
        this.Svg.put(this.body.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP));
        this.Svg.put(this.printer.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP));
        this.Svg.put(this.status.text(_engine__WEBPACK_IMPORTED_MODULE_0__.NBSP));
    }
}


/***/ }),

/***/ "./src/objects/binary-node.ts":
/*!************************************!*\
  !*** ./src/objects/binary-node.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryNode: () => (/* binding */ BinaryNode),
/* harmony export */   binaryDirs: () => (/* binding */ binaryDirs)
/* harmony export */ });
/* harmony import */ var _graph_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph-node */ "./src/objects/graph-node.ts");

const binaryDirs = ["left", "right"];
class BinaryNode extends _graph_node__WEBPACK_IMPORTED_MODULE_0__.GraphNode {
    constructor(text, size, strokeWidth) {
        super(text, size, strokeWidth);
        this.$incoming = {
            parent: null,
        };
        this.$outgoing = {
            left: null,
            right: null,
        };
        this.$edgebends = { left: 0.1, right: -0.1 };
        this.$leftWidth = 0;
        this.$rightWidth = 0;
        this.$width = 0;
        this.$nullary = {
            left: this.getNullPath("left", size, strokeWidth),
            right: this.getNullPath("right", size, strokeWidth),
        };
    }
    init(x, y) {
        this.$nullary.left.back();
        this.$nullary.right.back();
        return super.init(x, y);
    }
    getNullPath(side, objectSize, strokeWidth) {
        const s = side === "left" ? -1 : 1;
        const nX = 0.5 * objectSize;
        const nY = 0.8 * objectSize;
        const nR = 2 * strokeWidth;
        const pathString = `M 0,0 L ${s * nX},${nY} m ${nR},0 a ${nR},${nR} 0 1,0 ${-2 * nR},0 a ${nR},${nR} 0 1,0 ${2 * nR},0`;
        return this.path(pathString)
            .stroke({ width: strokeWidth })
            .addClass("nullnode");
    }
    getBend(c) {
        return this.$edgebends[c];
    }
    getParent() {
        var _a;
        return ((_a = this.$incoming.parent) === null || _a === void 0 ? void 0 : _a.getStart()) || null;
    }
    getLeft() {
        var _a;
        return ((_a = this.$outgoing.left) === null || _a === void 0 ? void 0 : _a.getEnd()) || null;
    }
    getRight() {
        var _a;
        return ((_a = this.$outgoing.right) === null || _a === void 0 ? void 0 : _a.getEnd()) || null;
    }
    getChild(c) {
        var _a;
        return ((_a = this.$outgoing[c]) === null || _a === void 0 ? void 0 : _a.getEnd()) || null;
    }
    getSibling() {
        const parent = this.getParent();
        if (!parent) {
            return null;
        }
        return this === parent.getLeft() ? parent.getRight() : parent.getLeft();
    }
    getParentEdge() {
        return this.$incoming.parent;
    }
    getLeftEdge() {
        return this.$outgoing.left;
    }
    getRightEdge() {
        return this.$outgoing.right;
    }
    getChildEdge(c) {
        return this.$outgoing[c];
    }
    isLeaf() {
        return !(this.getLeft() || this.getRight());
    }
    isLeftChild() {
        var _a;
        return this === ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.getLeft());
    }
    isRightChild() {
        var _a;
        return this === ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.getRight());
    }
    isChild(c) {
        var _a;
        return this === ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.getChild(c));
    }
    setLeft(child, strokeWidth) {
        return this.setChild("left", child, strokeWidth);
    }
    setRight(child, strokeWidth) {
        return this.setChild("right", child, strokeWidth);
    }
    setChild(c, child, strokeWidth) {
        return this.setSuccessor(c, "parent", child, strokeWidth);
    }
    setParentLeft(parent, strokeWidth) {
        return this.setParent("left", parent, strokeWidth);
    }
    setParentRight(parent, strokeWidth) {
        return this.setParent("right", parent, strokeWidth);
    }
    setParent(c, parent, strokeWidth) {
        parent.setChild(c, this, strokeWidth);
        return this;
    }
    setParentHighlight(high) {
        return this.setIncomingHighlight("parent", high);
    }
    setRightHighlight(high) {
        return this.setChildHighlight("right", high);
    }
    setLeftHighlight(high) {
        return this.setChildHighlight("left", high);
    }
    setChildHighlight(c, high) {
        return this.setOutgoingHighlight(c, high);
    }
    deepString() {
        var _a, _b;
        let s = "";
        if (this.getLeft()) {
            s += `(${(_a = this.getLeft()) === null || _a === void 0 ? void 0 : _a.deepString()}) `;
        }
        s += this.getText();
        if (this.getRight()) {
            s += ` (${(_b = this.getRight()) === null || _b === void 0 ? void 0 : _b.deepString()})`;
        }
        return s;
    }
    resize(startX, startY, svgMargin, nodeSpacing, animationDuration = 0) {
        this._resizeWidths(nodeSpacing);
        const svgWidth = this.root().viewbox().width;
        if (startX + this.$rightWidth > svgWidth - svgMargin) {
            startX = svgWidth - this.$rightWidth - svgMargin;
        }
        if (startX - this.$leftWidth < svgMargin) {
            startX = this.$leftWidth + svgMargin;
        }
        this._setNewPositions(startX, startY, nodeSpacing, animationDuration);
        return this;
    }
    _resizeWidths(nodeSpacing) {
        let width = nodeSpacing;
        const left = this.getLeft();
        if (left) {
            width += left._resizeWidths(nodeSpacing);
        }
        const right = this.getRight();
        if (right) {
            width += right._resizeWidths(nodeSpacing);
        }
        width = Math.max(this.getSize(), width);
        const leftWidth = (left === null || left === void 0 ? void 0 : left.$leftWidth) || 0;
        const rightWidth = (right === null || right === void 0 ? void 0 : right.$rightWidth) || 0;
        const mid = width - leftWidth - rightWidth;
        this.$leftWidth = mid / 2 + leftWidth;
        this.$rightWidth = mid / 2 + rightWidth;
        this.$width = width;
        return width;
    }
    _setNewPositions(x, y, nodeSpacing, animationDuration = 0) {
        this.setCenter(x, y, animationDuration);
        const ySpacing = nodeSpacing;
        const nextY = y + this.getSize() + ySpacing;
        const left = this.getLeft();
        if (left) {
            left._setNewPositions(x - this.$leftWidth + left.$leftWidth, nextY, nodeSpacing, animationDuration);
        }
        const right = this.getRight();
        if (right) {
            right._setNewPositions(x + this.$rightWidth - right.$rightWidth, nextY, nodeSpacing, animationDuration);
        }
    }
    validate() {
        var _a, _b;
        const parent = (_a = this.$incoming.parent) === null || _a === void 0 ? void 0 : _a.getStart();
        if (parent) {
            const c = this.isLeftChild() ? "left" : "right";
            if (((_b = parent.$outgoing[c]) === null || _b === void 0 ? void 0 : _b.getEnd()) !== this) {
                console.error("Parent mismatch");
            }
            let n = 0;
            for (const edge of this.getEdges()) {
                if (edge.getStart() === parent) {
                    n++;
                    if (edge.getEnd() !== this) {
                        console.error("Parent edge mismatch");
                    }
                }
            }
            if (n !== 1) {
                console.error(`Wrong n:o parent edges, ${n}`);
            }
        }
        binaryDirs.map((c) => {
            var _a, _b;
            const child = (_a = this.$outgoing[c]) === null || _a === void 0 ? void 0 : _a.getEnd();
            if (!child) {
                return;
            }
            if (((_b = child.$incoming.parent) === null || _b === void 0 ? void 0 : _b.getStart()) !== this) {
                console.error(`${c} child mismatch`);
            }
            let n = 0;
            for (const edge of this.getEdges()) {
                if (edge.getEnd() === child) {
                    n++;
                    if (edge.getStart() !== this) {
                        console.error(`${c} child edge mismatch`);
                    }
                }
            }
            if (n !== 1) {
                console.error(`Wrong n:o ${c} child edges, ${n}`);
            }
        });
    }
}


/***/ }),

/***/ "./src/objects/connection.ts":
/*!***********************************!*\
  !*** ./src/objects/connection.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Connection: () => (/* binding */ Connection)
/* harmony export */ });
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");

class Connection extends _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.Path {
    constructor(start, end) {
        super();
        this.$coords = {
            r2: 0,
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0,
        };
        this.$bend = 0;
        this.$start = start;
        this.$end = end;
        this.$coords = {
            x1: start.cx(),
            y1: start.cy(),
            x2: end.cx(),
            y2: end.cy(),
            r2: end.getSize() / 2,
        };
    }
    init(strokeWidth, bend = 0, directed = false) {
        this.stroke({ width: strokeWidth });
        this.back();
        this.setBend(bend);
        if (directed) {
            this._createArrow();
        }
        this.update(this.$coords);
        return this;
    }
    getBend() {
        return this.$bend;
    }
    setBend(bend) {
        this.$bend = bend;
        return this;
    }
    isDirected() {
        return Boolean(this.reference("marker-end"));
    }
    update(newCoords, animationDuration = 0) {
        Object.assign(this.$coords, newCoords);
        this.engine().animate(this, animationDuration > 0).plot(this._getPath());
        if (this.isDirected()) {
            this._redrawArrow(animationDuration);
        }
        return this;
    }
    _createArrow() {
        this.marker("end", 5, 4, function (add) {
            add.polygon([0, 0, 5, 2, 0, 4]).addClass("filled");
        });
    }
    _redrawArrow(animationDuration = 0) {
        const marker = this.reference("marker-end");
        const radius = this.$coords.r2;
        const stroke = this.attr("stroke-width");
        if (!marker || typeof stroke !== "number") {
            throw Error("Marker must exist and stroke must be a number");
        }
        this.engine()
            .animate(marker, animationDuration > 0)
            .attr({ refX: radius / stroke + 5 });
    }
    toString() {
        return `${this.getStart()} --> ${this.getEnd()}`;
    }
    getStart() {
        return this.$start;
    }
    getEnd() {
        return this.$end;
    }
    setStart(start, animationDuration = 0) {
        if (start === this.$start) {
            return this;
        }
        this.$start = start;
        if (start) {
            this.update({ x1: start.cx(), y1: start.cy() }, animationDuration);
        }
        return this;
    }
    setEnd(end, animationDuration = 0) {
        if (end === this.$end) {
            return this;
        }
        this.$end = end;
        if (end) {
            this.update({ x2: end.cx(), y2: end.cy() }, animationDuration);
        }
        return this;
    }
    setHighlight(high) {
        super.setHighlight(high);
        const marker = this.reference("marker-end");
        if (marker) {
            marker.setHighlight(high);
        }
        return this;
    }
    _getPath() {
        const C = this.$coords;
        const xControl = (C.x1 + C.x2) / 2 + (C.y1 - C.y2) * this.getBend();
        const yControl = (C.y1 + C.y2) / 2 + (C.x2 - C.x1) * this.getBend();
        return `M ${C.x1} ${C.y1} Q ${xControl} ${yControl} ${C.x2} ${C.y2}`;
    }
    getCoords() {
        return this.$coords;
    }
}


/***/ }),

/***/ "./src/objects/dsarray.ts":
/*!********************************!*\
  !*** ./src/objects/dsarray.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DSArray: () => (/* binding */ DSArray)
/* harmony export */ });
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");


class DSArray extends _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.G {
    constructor(size, objectSize, horizontal = true) {
        super();
        this.$backgrounds = [];
        this.$values = [];
        this.$indices = [];
        this.$horizontal = horizontal;
        this.$values = new Array(size);
        this.$rect = this.rect(objectSize * size, 3 * objectSize)
            .addClass("invisible")
            .center(0, 0);
    }
    init(size, x, y) {
        this.setSize(size);
        this.clear();
        this.center(x, y);
        return this;
    }
    getCX(i) {
        return (this.cx() +
            this.engine().getObjectSize() * (i - this.getSize() / 2 + 0.5));
    }
    getSize() {
        return this.$values.length;
    }
    setSize(size) {
        var _a, _b, _c;
        while (size < this.getSize()) {
            (_a = this.$backgrounds.pop()) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = this.$values.pop()) === null || _b === void 0 ? void 0 : _b.remove();
            (_c = this.$indices.pop()) === null || _c === void 0 ? void 0 : _c.remove();
        }
        const w0 = this.engine().getObjectSize();
        const h = this.engine().getObjectSize();
        const stroke = this.engine().getStrokeWidth();
        this.$rect.width(w0 * size);
        const cx = this.$rect.cx(), cy = this.$rect.cy();
        for (let i = 0; i < size; i++) {
            if (!this.$backgrounds[i]) {
                this.$backgrounds[i] = this.rect(w0, h)
                    .stroke({ width: stroke })
                    .addClass("background");
            }
            this.$backgrounds[i].center(cx + w0 * (i - size / 2 + 0.5), cy);
            if (!this.$values[i]) {
                this.$values[i] = this.text(_engine__WEBPACK_IMPORTED_MODULE_1__.NBSP);
            }
            this.$values[i].center(cx + w0 * (i - size / 2 + 0.5), cy);
            if (!this.$indices[i]) {
                this.$indices[i] = this.text(i.toString()).addClass("arrayindex");
            }
            this.$indices[i].center(cx + w0 * (i - size / 2 + 0.5), cy + h * 0.8);
        }
        return this;
    }
    clear() {
        for (let i = 0; i < this.getSize(); i++) {
            this.setValue(i, "");
            this.setDisabled(i, true);
        }
        return this;
    }
    getValues() {
        return this.$values.map((t) => t.text());
    }
    setValues(values) {
        if (values.length !== this.getSize()) {
            throw new Error(`Wrong number of values: ${values.length} != ${this.getSize()}`);
        }
        for (let i = 0; i < values.length; i++) {
            this.setValue(i, values[i]);
        }
        return this;
    }
    getValue(i) {
        return this.$values[i].text();
    }
    setValue(i, text) {
        if (text == null) {
            text = "";
        }
        text = `${text}`;
        if (text === "") {
            text = _engine__WEBPACK_IMPORTED_MODULE_1__.NBSP;
        }
        this.$values[i].text(text);
        return this;
    }
    swap(j, k, animate = false) {
        const jText = this.$values[j], kText = this.$values[k];
        const jX = this.getCX(j), kX = this.getCX(k);
        this.engine().animate(jText, animate).cx(kX);
        this.engine().animate(kText, animate).cx(jX);
        this.$values[k] = jText;
        this.$values[j] = kText;
        return this;
    }
    setDisabled(i, disabled) {
        const bg = this.$backgrounds[i];
        if (disabled == null) {
            bg.toggleClass("disabled");
        }
        else if (disabled) {
            bg.addClass("disabled");
        }
        else {
            bg.removeClass("disabled");
        }
        return this;
    }
    setIndexHighlight(i, high, color = "#C00") {
        if (this.$backgrounds[i]) {
            if (high) {
                this.$backgrounds[i].css("stroke", color);
            }
            else {
                this.$backgrounds[i].css("stroke", "");
            }
        }
        if (this.$values[i]) {
            if (high) {
                this.$values[i].css("fill", color);
            }
            else {
                this.$values[i].css("fill", "");
            }
        }
        for (const bg of Object.values(this.$backgrounds)) {
            if (!bg.css("stroke")) {
                bg.back();
            }
        }
        return this;
    }
    addArrow(index, arrowId = "arrow", color = "#000") {
        const arrowSize = 10;
        const arrowOffset = 10;
        const x = this.getCX(index);
        const y = this.cy() - this.engine().getObjectSize() / 2 - arrowOffset;
        const arrow = this.polyline([
            [x, y],
            [x - arrowSize, y - arrowSize],
            [x + arrowSize, y - arrowSize],
            [x, y],
        ])
            .fill("none")
            .stroke({ width: 2 })
            .id(arrowId);
        arrow.css("stroke", color);
        this.add(arrow);
    }
    removeArrow(arrowId) {
        const arrow = this.findOne(`#${arrowId}`);
        if (arrow) {
            arrow.remove();
        }
    }
    moveArrow(arrowId, indexTo) {
        const arrow = this.findOne(`#${arrowId}`);
        const x = this.getCX(indexTo);
        if (arrow) {
            this.engine().animate(arrow, true).cx(x);
        }
    }
}


/***/ }),

/***/ "./src/objects/graph-node.ts":
/*!***********************************!*\
  !*** ./src/objects/graph-node.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphNode: () => (/* binding */ GraphNode)
/* harmony export */ });
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection */ "./src/objects/connection.ts");
/* harmony import */ var _text_circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-circle */ "./src/objects/text-circle.ts");



class GraphNode extends _text_circle__WEBPACK_IMPORTED_MODULE_2__.TextCircle {
    constructor(text, size, strokeWidth) {
        super(text, size, strokeWidth);
        this.$incoming = {};
        this.$outgoing = {};
        this.$nullary = {};
        const bgSize = 3 * size;
        this.$rect = this.rect(bgSize, bgSize).addClass("invisible");
    }
    init(x, y) {
        this.$rect.center(0, 0);
        super.init(x, y);
        return this;
    }
    getBend(key) {
        return 0;
    }
    getDirected(key) {
        return true;
    }
    getIncoming(inKey) {
        return this.$incoming[inKey];
    }
    getOutgoing(outKey) {
        return this.$outgoing[outKey];
    }
    getIncomingEdges() {
        return Object.values(this.$incoming).filter((e) => e !== null);
    }
    getOutgoingEdges() {
        return Object.values(this.$outgoing).filter((e) => e !== null);
    }
    getPredecessors() {
        return Object.values(this.$incoming)
            .map((e) => e === null || e === void 0 ? void 0 : e.getStart())
            .filter((e) => e !== undefined);
    }
    getSuccessors() {
        return Object.values(this.$outgoing)
            .map((e) => e === null || e === void 0 ? void 0 : e.getEnd())
            .filter((e) => e !== undefined);
    }
    getPredecessor(inKey) {
        var _a;
        return ((_a = this.$incoming[inKey]) === null || _a === void 0 ? void 0 : _a.getStart()) || null;
    }
    getSuccessor(outKey) {
        var _a;
        return ((_a = this.$outgoing[outKey]) === null || _a === void 0 ? void 0 : _a.getEnd()) || null;
    }
    setPredecessor(inKey, outKey, predecessor, strokeWidth) {
        predecessor.setSuccessor(outKey, inKey, this, strokeWidth);
        return this;
    }
    setSuccessor(outKey, inKey, successor, strokeWidth) {
        const outEdge = this.$outgoing[outKey];
        if (outEdge) {
            const oldSuccessor = outEdge.getEnd();
            const oldIncoming = oldSuccessor.$incoming;
            for (const k in oldIncoming) {
                if (oldIncoming[k] === outEdge) {
                    delete oldIncoming[k];
                }
            }
            outEdge.remove();
        }
        if (successor) {
            const inEdge = successor.$incoming[inKey];
            if (inEdge) {
                const oldPredecessor = inEdge.getStart();
                const oldOutgoing = oldPredecessor.$outgoing;
                for (const k in oldOutgoing) {
                    if (oldOutgoing[k] === inEdge) {
                        delete oldOutgoing[k];
                    }
                }
                inEdge.remove();
            }
            const edge = this.root()
                .put(new _connection__WEBPACK_IMPORTED_MODULE_1__.Connection(this, successor))
                .init(strokeWidth, this.getBend(outKey), this.getDirected(outKey));
            this.$outgoing[outKey] = edge;
            successor.$incoming[inKey] = edge;
        }
        else {
            delete this.$outgoing[outKey];
        }
        this._updateNullary();
        return this;
    }
    _updateNullary() {
        var _a, _b;
        for (const node of (0,_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.find)("g")) {
            if (node instanceof GraphNode) {
                for (const c in node.$nullary) {
                    const show = !node.$outgoing[c];
                    if (show) {
                        (_a = node.$nullary[c]) === null || _a === void 0 ? void 0 : _a.removeClass("invisible");
                    }
                    else {
                        (_b = node.$nullary[c]) === null || _b === void 0 ? void 0 : _b.addClass("invisible");
                    }
                }
            }
        }
    }
    setIncomingHighlight(inKey, high) {
        var _a;
        this.setHighlight(high);
        (_a = this.getIncoming(inKey)) === null || _a === void 0 ? void 0 : _a.setHighlight(high);
        return this;
    }
    getHighlight() {
        return this.hasClass("highlight");
    }
    setOutgoingHighlight(outKey, high) {
        var _a;
        this.setHighlight(high);
        (_a = this.getOutgoing(outKey)) === null || _a === void 0 ? void 0 : _a.setHighlight(high);
        return this;
    }
    remove() {
        for (const outKey in this.$outgoing) {
            const outEdge = this.$outgoing[outKey];
            if (!outEdge) {
                continue;
            }
            const end = outEdge.getEnd();
            const incoming = end.$incoming;
            for (const inKey in incoming) {
                if (outEdge === incoming[inKey]) {
                    delete incoming[inKey];
                }
                outEdge.remove();
            }
        }
        for (const inKey in this.$incoming) {
            const inEdge = this.$incoming[inKey];
            if (!inEdge) {
                continue;
            }
            const start = inEdge.getStart();
            const outgoing = start.$outgoing;
            for (const outKey in outgoing) {
                if (inEdge === outgoing[outKey]) {
                    delete outgoing[outKey];
                }
                inEdge.remove();
            }
        }
        super.remove();
        this._updateNullary();
        return this;
    }
    setCenter(x, y, animationDuration = 0) {
        super.setCenter(x, y, animationDuration);
        for (const edge of this.getOutgoingEdges()) {
            edge.update({ x1: x, y1: y }, animationDuration);
        }
        for (const edge of this.getIncomingEdges()) {
            edge.update({ x2: x, y2: y }, animationDuration);
        }
        return this;
    }
    setSize(size, animationDuration = 0) {
        super.setSize(size, animationDuration);
        for (const edge of this.getIncomingEdges()) {
            edge.update({ r2: size / 2 }, animationDuration);
        }
        return this;
    }
}


/***/ }),

/***/ "./src/objects/index.ts":
/*!******************************!*\
  !*** ./src/objects/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Svg: () => (/* reexport safe */ _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.Svg)
/* harmony export */ });
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");

(0,_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.extend)(_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.Element, {
    getHighlight() {
        return this.hasClass("highlight");
    },
    setHighlight(high) {
        if (high == null) {
            this.toggleClass("highlight");
        }
        else if (high) {
            this.addClass("highlight");
        }
        else {
            this.removeClass("highlight");
        }
        return this;
    },
    getCenter() {
        return [this.cx(), this.cy()];
    },
    setCenter(x, y, animationDuration = 0) {
        return this
            .engine()
            .animate(this, animationDuration > 0)
            .center(x, y);
    },
    dMoveCenter(dx, dy, animationDuration = 0) {
        this.setCenter(this.cx() + dx, this.cy() + dy, animationDuration);
        return this;
    },
    engine() {
        return this.root().$engine;
    },
});



/***/ }),

/***/ "./src/objects/text-circle.ts":
/*!************************************!*\
  !*** ./src/objects/text-circle.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextCircle: () => (/* binding */ TextCircle)
/* harmony export */ });
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");


class TextCircle extends _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_0__.G {
    constructor(text, size, strokeWidth) {
        super();
        this.$circle = this.circle(size).stroke({ width: strokeWidth });
        this.$text = this.text(text);
    }
    init(x, y) {
        this.$circle.center(0, 0);
        this.$text.center(0, 0);
        this.center(x, y);
        return this;
    }
    getText() {
        return this.$text.text();
    }
    setText(text) {
        if (text == null) {
            text = "";
        }
        text = `${text}`;
        if (text === "") {
            text = _engine__WEBPACK_IMPORTED_MODULE_1__.NBSP;
        }
        this.$text.text(text);
        return this;
    }
    getSize() {
        const r = this.$circle.attr("r");
        if (typeof r === "number") {
            return r * 2;
        }
        if (typeof r === "string" && !isNaN(Number(r))) {
            return Number(r) * 2;
        }
        return 0;
    }
    setSize(diameter, animationDuration = 0) {
        this.engine()
            .animate(this.$circle, animationDuration > 0)
            .attr("r", String(diameter / 2));
        return this;
    }
    toString() {
        return this.getText();
    }
}


/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   State: () => (/* binding */ State)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class State {
    constructor() {
        this.resetting = false;
        this.animating = false;
    }
    isResetting() {
        return this.resetting;
    }
    setAnimating(val) {
        this.animating = val;
    }
    isAnimating() {
        return this.animating;
    }
    runWhileResetting(func) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetting = true;
            yield func();
            this.resetting = false;
        });
    }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Animator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _Queue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Queue.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js");



const Animator = {
  nextDraw: null,
  frames: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  timeouts: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  immediates: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  timer: () => _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.performance || _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.Date,
  transforms: [],

  frame(fn) {
    // Store the node
    const node = Animator.frames.push({ run: fn })

    // Request an animation frame if we don't have one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.requestAnimationFrame(Animator._draw)
    }

    // Return the node so we can remove it easily
    return node
  },

  timeout(fn, delay) {
    delay = delay || 0

    // Work out when the event should fire
    const time = Animator.timer().now() + delay

    // Add the timeout to the end of the queue
    const node = Animator.timeouts.push({ run: fn, time: time })

    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.requestAnimationFrame(Animator._draw)
    }

    return node
  },

  immediate(fn) {
    // Add the immediate fn to the end of the queue
    const node = Animator.immediates.push(fn)
    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.requestAnimationFrame(Animator._draw)
    }

    return node
  },

  cancelFrame(node) {
    node != null && Animator.frames.remove(node)
  },

  clearTimeout(node) {
    node != null && Animator.timeouts.remove(node)
  },

  cancelImmediate(node) {
    node != null && Animator.immediates.remove(node)
  },

  _draw(now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    let nextTimeout = null
    const lastTimeout = Animator.timeouts.last()
    while ((nextTimeout = Animator.timeouts.shift())) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run()
      } else {
        Animator.timeouts.push(nextTimeout)
      }

      // If we hit the last item, we should stop shifting out more items
      if (nextTimeout === lastTimeout) break
    }

    // Run all of the animation frames
    let nextFrame = null
    const lastFrame = Animator.frames.last()
    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now)
    }

    let nextImmediate = null
    while ((nextImmediate = Animator.immediates.shift())) {
      nextImmediate()
    }

    // If we have remaining timeouts or frames, draw until we don't anymore
    Animator.nextDraw =
      Animator.timeouts.first() || Animator.frames.first()
        ? _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window.requestAnimationFrame(Animator._draw)
        : null
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animator);


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Controller.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   Ease: () => (/* binding */ Ease),
/* harmony export */   PID: () => (/* binding */ PID),
/* harmony export */   Spring: () => (/* binding */ Spring),
/* harmony export */   Stepper: () => (/* binding */ Stepper),
/* harmony export */   easing: () => (/* binding */ easing)
/* harmony export */ });
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");



/***
Base Class
==========
The base stepper class that will be
***/

function makeSetterGetter(k, f) {
  return function (v) {
    if (v == null) return this[k]
    this[k] = v
    if (f) f.call(this)
    return this
  }
}

const easing = {
  '-': function (pos) {
    return pos
  },
  '<>': function (pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5
  },
  '>': function (pos) {
    return Math.sin((pos * Math.PI) / 2)
  },
  '<': function (pos) {
    return -Math.cos((pos * Math.PI) / 2) + 1
  },
  bezier: function (x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return (y1 / x1) * t
        } else if (x2 > 0) {
          return (y2 / x2) * t
        } else {
          return 0
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return ((1 - y2) / (1 - x2)) * t + (y2 - x2) / (1 - x2)
        } else if (x1 < 1) {
          return ((1 - y1) / (1 - x1)) * t + (y1 - x1) / (1 - x1)
        } else {
          return 1
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3
      }
    }
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function (steps, stepPosition = 'end') {
    // deal with "jump-" prefix
    stepPosition = stepPosition.split('-').reverse()[0]

    let jumps = steps
    if (stepPosition === 'none') {
      --jumps
    } else if (stepPosition === 'both') {
      ++jumps
    }

    // The beforeFlag is essentially useless
    return (t, beforeFlag = false) => {
      // Step is called currentStep in referenced url
      let step = Math.floor(t * steps)
      const jumping = (t * step) % 1 === 0

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step
      }

      if (beforeFlag && jumping) {
        --step
      }

      if (t >= 0 && step < 0) {
        step = 0
      }

      if (t <= 1 && step > jumps) {
        step = jumps
      }

      return step / jumps
    }
  }
}

class Stepper {
  done() {
    return false
  }
}

/***
Easing Functions
================
***/

class Ease extends Stepper {
  constructor(fn = _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_0__.timeline.ease) {
    super()
    this.ease = easing[fn] || fn
  }

  step(from, to, pos) {
    if (typeof from !== 'number') {
      return pos < 1 ? from : to
    }
    return from + (to - from) * this.ease(pos)
  }
}

/***
Controller Types
================
***/

class Controller extends Stepper {
  constructor(fn) {
    super()
    this.stepper = fn
  }

  done(c) {
    return c.done
  }

  step(current, target, dt, c) {
    return this.stepper(current, target, dt, c)
  }
}

function recalculate() {
  // Apply the default parameters
  const duration = (this._duration || 500) / 1000
  const overshoot = this._overshoot || 0

  // Calculate the PID natural response
  const eps = 1e-10
  const pi = Math.PI
  const os = Math.log(overshoot / 100 + eps)
  const zeta = -os / Math.sqrt(pi * pi + os * os)
  const wn = 3.9 / (zeta * duration)

  // Calculate the Spring values
  this.d = 2 * zeta * wn
  this.k = wn * wn
}

class Spring extends Controller {
  constructor(duration = 500, overshoot = 0) {
    super()
    this.duration(duration).overshoot(overshoot)
  }

  step(current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity
    if (dt === Infinity) return target
    if (dt === 0) return current

    if (dt > 100) dt = 16

    dt /= 1000

    // Get the previous velocity
    const velocity = c.velocity || 0

    // Apply the control to get the new position and store it
    const acceleration = -this.d * velocity - this.k * (current - target)
    const newPosition = current + velocity * dt + (acceleration * dt * dt) / 2

    // Store the velocity
    c.velocity = velocity + acceleration * dt

    // Figure out if we have converged, and if so, pass the value
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002
    return c.done ? target : newPosition
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
})

class PID extends Controller {
  constructor(p = 0.1, i = 0.01, d = 0, windup = 1000) {
    super()
    this.p(p).i(i).d(d).windup(windup)
  }

  step(current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity

    if (dt === Infinity) return target
    if (dt === 0) return current

    const p = target - current
    let i = (c.integral || 0) + p * dt
    const d = (p - (c.error || 0)) / dt
    const windup = this._windup

    // antiwindup
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup))
    }

    c.error = p
    c.integral = i

    c.done = Math.abs(p) < 0.001

    return c.done ? target : current + (this.P * p + this.I * i + this.D * d)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)(PID, {
  windup: makeSetterGetter('_windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js":
/*!******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonMorphable: () => (/* binding */ NonMorphable),
/* harmony export */   ObjectBag: () => (/* binding */ ObjectBag),
/* harmony export */   TransformBag: () => (/* binding */ TransformBag),
/* harmony export */   "default": () => (/* binding */ Morphable),
/* harmony export */   makeMorphable: () => (/* binding */ makeMorphable),
/* harmony export */   registerMorphableType: () => (/* binding */ registerMorphableType)
/* harmony export */ });
/* harmony import */ var _Controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");








const getClassForType = (value) => {
  const type = typeof value

  if (type === 'number') {
    return _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__["default"]
  } else if (type === 'string') {
    if (_types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"].isColor(value)) {
      return _types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"]
    } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter.test(value)) {
      return _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__.isPathLetter.test(value) ? _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__["default"] : _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__["default"]
    } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__.numberAndUnit.test(value)) {
      return _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__["default"]
    } else {
      return NonMorphable
    }
  } else if (morphableTypes.indexOf(value.constructor) > -1) {
    return value.constructor
  } else if (Array.isArray(value)) {
    return _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__["default"]
  } else if (type === 'object') {
    return ObjectBag
  } else {
    return NonMorphable
  }
}

class Morphable {
  constructor(stepper) {
    this._stepper = stepper || new _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Ease('-')

    this._from = null
    this._to = null
    this._type = null
    this._context = null
    this._morphObj = null
  }

  at(pos) {
    return this._morphObj.morph(
      this._from,
      this._to,
      pos,
      this._stepper,
      this._context
    )
  }

  done() {
    const complete = this._context.map(this._stepper.done).reduce(function (
      last,
      curr
    ) {
      return last && curr
    }, true)
    return complete
  }

  from(val) {
    if (val == null) {
      return this._from
    }

    this._from = this._set(val)
    return this
  }

  stepper(stepper) {
    if (stepper == null) return this._stepper
    this._stepper = stepper
    return this
  }

  to(val) {
    if (val == null) {
      return this._to
    }

    this._to = this._set(val)
    return this
  }

  type(type) {
    // getter
    if (type == null) {
      return this._type
    }

    // setter
    this._type = type
    return this
  }

  _set(value) {
    if (!this._type) {
      this.type(getClassForType(value))
    }

    let result = new this._type(value)
    if (this._type === _types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      result = this._to
        ? result[this._to[4]]()
        : this._from
          ? result[this._from[4]]()
          : result
    }

    if (this._type === ObjectBag) {
      result = this._to
        ? result.align(this._to)
        : this._from
          ? result.align(this._from)
          : result
    }

    result = result.toConsumable()

    this._morphObj = this._morphObj || new this._type()
    this._context =
      this._context ||
      Array.apply(null, Array(result.length))
        .map(Object)
        .map(function (o) {
          o.done = true
          return o
        })
    return result
  }
}

class NonMorphable {
  constructor(...args) {
    this.init(...args)
  }

  init(val) {
    val = Array.isArray(val) ? val[0] : val
    this.value = val
    return this
  }

  toArray() {
    return [this.value]
  }

  valueOf() {
    return this.value
  }
}

class TransformBag {
  constructor(...args) {
    this.init(...args)
  }

  init(obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      }
    }

    Object.assign(this, TransformBag.defaults, obj)
    return this
  }

  toArray() {
    const v = this

    return [
      v.scaleX,
      v.scaleY,
      v.shear,
      v.rotate,
      v.translateX,
      v.translateY,
      v.originX,
      v.originY
    ]
  }
}

TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
}

const sortByKey = (a, b) => {
  return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
}

class ObjectBag {
  constructor(...args) {
    this.init(...args)
  }

  align(other) {
    const values = this.values
    for (let i = 0, il = values.length; i < il; ++i) {
      // If the type is the same we only need to check if the color is in the correct format
      if (values[i + 1] === other[i + 1]) {
        if (values[i + 1] === _types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"] && other[i + 7] !== values[i + 7]) {
          const space = other[i + 7]
          const color = new _types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.values.splice(i + 3, 5))
            [space]()
            .toArray()
          this.values.splice(i + 3, 0, ...color)
        }

        i += values[i + 2] + 2
        continue
      }

      if (!other[i + 1]) {
        return this
      }

      // The types differ, so we overwrite the new type with the old one
      // And initialize it with the types default (e.g. black for color or 0 for number)
      const defaultObject = new other[i + 1]().toArray()

      // Than we fix the values array
      const toDelete = values[i + 2] + 3

      values.splice(
        i,
        toDelete,
        other[i],
        other[i + 1],
        other[i + 2],
        ...defaultObject
      )

      i += values[i + 2] + 2
    }
    return this
  }

  init(objOrArr) {
    this.values = []

    if (Array.isArray(objOrArr)) {
      this.values = objOrArr.slice()
      return
    }

    objOrArr = objOrArr || {}
    const entries = []

    for (const i in objOrArr) {
      const Type = getClassForType(objOrArr[i])
      const val = new Type(objOrArr[i]).toArray()
      entries.push([i, Type, val.length, ...val])
    }

    entries.sort(sortByKey)

    this.values = entries.reduce((last, curr) => last.concat(curr), [])
    return this
  }

  toArray() {
    return this.values
  }

  valueOf() {
    const obj = {}
    const arr = this.values

    // for (var i = 0, len = arr.length; i < len; i += 2) {
    while (arr.length) {
      const key = arr.shift()
      const Type = arr.shift()
      const num = arr.shift()
      const values = arr.splice(0, num)
      obj[key] = new Type(values) // .valueOf()
    }

    return obj
  }
}

const morphableTypes = [NonMorphable, TransformBag, ObjectBag]

function registerMorphableType(type = []) {
  morphableTypes.push(...[].concat(type))
}

function makeMorphable() {
  (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.extend)(morphableTypes, {
    to(val) {
      return new Morphable()
        .type(this.constructor)
        .from(this.toArray()) // this.valueOf())
        .to(val)
    },
    fromArray(arr) {
      this.init(arr)
      return this
    },
    toConsumable() {
      return this.toArray()
    },
    morph(from, to, pos, stepper, context) {
      const mapper = function (i, index) {
        return stepper.step(i, to[index], pos, context[index], context)
      }

      return this.fromArray(from.map(mapper))
    }
  })
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Queue.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Queue)
/* harmony export */ });
class Queue {
  constructor() {
    this._first = null
    this._last = null
  }

  // Shows us the first item in the list
  first() {
    return this._first && this._first.value
  }

  // Shows us the last item in the list
  last() {
    return this._last && this._last.value
  }

  push(value) {
    // An item stores an id and the provided value
    const item =
      typeof value.next !== 'undefined'
        ? value
        : { value: value, next: null, prev: null }

    // Deal with the queue being empty or populated
    if (this._last) {
      item.prev = this._last
      this._last.next = item
      this._last = item
    } else {
      this._last = item
      this._first = item
    }

    // Return the current item
    return item
  }

  // Removes the item that was returned from the push
  remove(item) {
    // Relink the previous item
    if (item.prev) item.prev.next = item.next
    if (item.next) item.next.prev = item.prev
    if (item === this._last) this._last = item.prev
    if (item === this._first) this._first = item.next

    // Invalidate item
    item.prev = null
    item.next = null
  }

  shift() {
    // Check if we have a value
    const remove = this._first
    if (!remove) return null

    // If we do, remove it and relink things
    this._first = remove.next
    if (this._first) this._first.prev = null
    this._last = this._first ? this._last : null
    return remove.value
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Runner.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Runner.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FakeRunner: () => (/* binding */ FakeRunner),
/* harmony export */   RunnerArray: () => (/* binding */ RunnerArray),
/* harmony export */   "default": () => (/* binding */ Runner)
/* harmony export */ });
/* harmony import */ var _Controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/gradiented.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _Morphable_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Morphable.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Timeline_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Timeline.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js");
















class Runner extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__["default"] {
  constructor(options) {
    super()

    // Store a unique id on the runner, so that we can identify it later
    this.id = Runner.id++

    // Ensure a default value
    options = options == null ? _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.timeline.duration : options

    // Ensure that we get a controller
    options = typeof options === 'function' ? new _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Controller(options) : options

    // Declare all of the variables
    this._element = null
    this._timeline = null
    this.done = false
    this._queue = []

    // Work out the stepper and the duration
    this._duration = typeof options === 'number' && options
    this._isDeclarative = options instanceof _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Controller
    this._stepper = this._isDeclarative ? options : new _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Ease()

    // We copy the current values from the timeline because they can change
    this._history = {}

    // Store the state of the runner
    this.enabled = true
    this._time = 0
    this._lastTime = 0

    // At creation, the runner is in reset state
    this._reseted = true

    // Save transforms applied to this runner
    this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    this.transformId = 1

    // Looping variables
    this._haveReversed = false
    this._reverse = false
    this._loopsDone = 0
    this._swing = false
    this._wait = 0
    this._times = 1

    this._frameId = null

    // Stores how long a runner is stored after being done
    this._persist = this._isDeclarative ? true : null
  }

  static sanitise(duration, delay, when) {
    // Initialise the default parameters
    let times = 1
    let swing = false
    let wait = 0
    duration = duration ?? _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.timeline.duration
    delay = delay ?? _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.timeline.delay
    when = when || 'last'

    // If we have an object, unpack the values
    if (typeof duration === 'object' && !(duration instanceof _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Stepper)) {
      delay = duration.delay ?? delay
      when = duration.when ?? when
      swing = duration.swing || swing
      times = duration.times ?? times
      wait = duration.wait ?? wait
      duration = duration.duration ?? _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.timeline.duration
    }

    return {
      duration: duration,
      delay: delay,
      swing: swing,
      times: times,
      wait: wait,
      when: when
    }
  }

  active(enabled) {
    if (enabled == null) return this.enabled
    this.enabled = enabled
    return this
  }

  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(transform) {
    this.transforms.lmultiplyO(transform)
    return this
  }

  after(fn) {
    return this.on('finished', fn)
  }

  animate(duration, delay, when) {
    const o = Runner.sanitise(duration, delay, when)
    const runner = new Runner(o.duration)
    if (this._timeline) runner.timeline(this._timeline)
    if (this._element) runner.element(this._element)
    return runner.loop(o).schedule(o.delay, o.when)
  }

  clearTransform() {
    this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    return this
  }

  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    if (
      !this.done ||
      !this._timeline ||
      !this._timeline._runnerIds.includes(this.id)
    ) {
      this._queue = this._queue.filter((item) => {
        return !item.isTransform
      })
    }
  }

  delay(delay) {
    return this.animate(0, delay)
  }

  duration() {
    return this._times * (this._wait + this._duration) - this._wait
  }

  during(fn) {
    return this.queue(null, fn)
  }

  ease(fn) {
    this._stepper = new _Controller_js__WEBPACK_IMPORTED_MODULE_0__.Ease(fn)
    return this
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */

  element(element) {
    if (element == null) return this._element
    this._element = element
    element._prepareRunner()
    return this
  }

  finish() {
    return this.step(Infinity)
  }

  loop(times, swing, wait) {
    // Deal with the user passing in an object
    if (typeof times === 'object') {
      swing = times.swing
      wait = times.wait
      times = times.times
    }

    // Sanitise the values and store them
    this._times = times || Infinity
    this._swing = swing || false
    this._wait = wait || 0

    // Allow true to be passed
    if (this._times === true) {
      this._times = Infinity
    }

    return this
  }

  loops(p) {
    const loopDuration = this._duration + this._wait
    if (p == null) {
      const loopsDone = Math.floor(this._time / loopDuration)
      const relativeTime = this._time - loopsDone * loopDuration
      const position = relativeTime / this._duration
      return Math.min(loopsDone + position, this._times)
    }
    const whole = Math.floor(p)
    const partial = p % 1
    const time = loopDuration * whole + this._duration * partial
    return this.time(time)
  }

  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever
    return this
  }

  position(p) {
    // Get all of the variables we need
    const x = this._time
    const d = this._duration
    const w = this._wait
    const t = this._times
    const s = this._swing
    const r = this._reverse
    let position

    if (p == null) {
      /*
      This function converts a time to a position in the range [0, 1]
      The full explanation can be found in this desmos demonstration
        https://www.desmos.com/calculator/u4fbavgche
      The logic is slightly simplified here because we can use booleans
      */

      // Figure out the value without thinking about the start or end time
      const f = function (x) {
        const swinging = s * Math.floor((x % (2 * (w + d))) / (w + d))
        const backwards = (swinging && !r) || (!swinging && r)
        const uncliped =
          (Math.pow(-1, backwards) * (x % (w + d))) / d + backwards
        const clipped = Math.max(Math.min(uncliped, 1), 0)
        return clipped
      }

      // Figure out the value by incorporating the start time
      const endTime = t * (w + d) - w
      position =
        x <= 0
          ? Math.round(f(1e-5))
          : x < endTime
            ? f(x)
            : Math.round(f(endTime - 1e-5))
      return position
    }

    // Work out the loops done and add the position to the loops done
    const loopsDone = Math.floor(this.loops())
    const swingForward = s && loopsDone % 2 === 0
    const forwards = (swingForward && !r) || (r && swingForward)
    position = loopsDone + (forwards ? p : 1 - p)
    return this.loops(position)
  }

  progress(p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration())
    }
    return this.time(p * this.duration())
  }

  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.noop,
      runner: runFn || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__.noop,
      retarget: retargetFn,
      isTransform: isTransform,
      initialised: false,
      finished: false
    })
    const timeline = this.timeline()
    timeline && this.timeline()._continue()
    return this
  }

  reset() {
    if (this._reseted) return this
    this.time(0)
    this._reseted = true
    return this
  }

  reverse(reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse
    return this
  }

  schedule(timeline, delay, when) {
    // The user doesn't need to pass a timeline if we already have one
    if (!(timeline instanceof _Timeline_js__WEBPACK_IMPORTED_MODULE_14__["default"])) {
      when = delay
      delay = timeline
      timeline = this.timeline()
    }

    // If there is no timeline, yell at the user...
    if (!timeline) {
      throw Error('Runner cannot be scheduled without timeline')
    }

    // Schedule the runner on the timeline provided
    timeline.schedule(this, delay, when)
    return this
  }

  step(dt) {
    // If we are inactive, this stepper just gets skipped
    if (!this.enabled) return this

    // Update the time and get the new position
    dt = dt == null ? 16 : dt
    this._time += dt
    const position = this.position()

    // Figure out if we need to run the stepper in this frame
    const running = this._lastPosition !== position && this._time >= 0
    this._lastPosition = position

    // Figure out if we just started
    const duration = this.duration()
    const justStarted = this._lastTime <= 0 && this._time > 0
    const justFinished = this._lastTime < duration && this._time >= duration

    this._lastTime = this._time
    if (justStarted) {
      this.fire('start', this)
    }

    // Work out if the runner is finished set the done flag here so animations
    // know, that they are running in the last step (this is good for
    // transformations which can be merged)
    const declarative = this._isDeclarative
    this.done = !declarative && !justFinished && this._time >= duration

    // Runner is running. So its not in reset state anymore
    this._reseted = false

    let converged = false
    // Call initialise and the run function
    if (running || declarative) {
      this._initialise(running)

      // clear the transforms on this runner so they dont get added again and again
      this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
      converged = this._run(declarative ? dt : position)

      this.fire('step', this)
    }
    // correct the done flag here
    // declarative animations itself know when they converged
    this.done = this.done || (converged && declarative)
    if (justFinished) {
      this.fire('finished', this)
    }
    return this
  }

  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(time) {
    if (time == null) {
      return this._time
    }
    const dt = time - this._time
    this.step(dt)
    return this
  }

  timeline(timeline) {
    // check explicitly for undefined so we can set the timeline to null
    if (typeof timeline === 'undefined') return this._timeline
    this._timeline = timeline
    return this
  }

  unschedule() {
    const timeline = this.timeline()
    timeline && timeline.unschedule(this)
    return this
  }

  // Run each initialise function in the runner if required
  _initialise(running) {
    // If we aren't running, we shouldn't initialise when not declarative
    if (!running && !this._isDeclarative) return

    // Loop through all of the initialisers
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current initialiser
      const current = this._queue[i]

      // Determine whether we need to initialise
      const needsIt = this._isDeclarative || (!current.initialised && running)
      running = !current.finished

      // Call the initialiser if we need to
      if (needsIt && running) {
        current.initialiser.call(this)
        current.initialised = true
      }
    }
  }

  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(method, morpher) {
    this._history[method] = {
      morpher: morpher,
      caller: this._queue[this._queue.length - 1]
    }

    // We have to resume the timeline in case a controller
    // is already done without being ever run
    // This can happen when e.g. this is done:
    //    anim = el.animate(new SVG.Spring)
    // and later
    //    anim.move(...)
    if (this._isDeclarative) {
      const timeline = this.timeline()
      timeline && timeline.play()
    }
  }

  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(positionOrDt) {
    // Run all of the _queue directly
    let allfinished = true
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current function to run
      const current = this._queue[i]

      // Run the function if its not finished, we keep track of the finished
      // flag for the sake of declarative _queue
      const converged = current.runner.call(this, positionOrDt)
      current.finished = current.finished || converged === true
      allfinished = allfinished && current.finished
    }

    // We report when all of the constructors are finished
    return allfinished
  }

  // do nothing and return false
  _tryRetarget(method, target, extra) {
    if (this._history[method]) {
      // if the last method wasn't even initialised, throw it away
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller)
        this._queue.splice(index, 1)
        return false
      }

      // for the case of transformations, we use the special retarget function
      // which has access to the outer scope
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget.call(this, target, extra)
        // for everything else a simple morpher change is sufficient
      } else {
        this._history[method].morpher.to(target)
      }

      this._history[method].caller.finished = false
      const timeline = this.timeline()
      timeline && timeline.play()
      return true
    }
    return false
  }
}

Runner.id = 0

class FakeRunner {
  constructor(transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](), id = -1, done = true) {
    this.transforms = transforms
    this.id = id
    this.done = done
  }

  clearTransformsFromQueue() {}
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)([Runner, FakeRunner], {
  mergeWith(runner) {
    return new FakeRunner(
      runner.transforms.lmultiply(this.transforms),
      runner.id
    )
  }
})

// FakeRunner.emptyRunner = new FakeRunner()

const lmultiply = (last, curr) => last.lmultiplyO(curr)
const getRunnerTransform = (runner) => runner.transforms

function mergeTransforms() {
  // Find the matrix to apply to the element and apply it
  const runners = this._transformationRunners.runners
  const netTransform = runners
    .map(getRunnerTransform)
    .reduce(lmultiply, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]())

  this.transform(netTransform)

  this._transformationRunners.merge()

  if (this._transformationRunners.length() === 1) {
    this._frameId = null
  }
}

class RunnerArray {
  constructor() {
    this.runners = []
    this.ids = []
  }

  add(runner) {
    if (this.runners.includes(runner)) return
    const id = runner.id + 1

    this.runners.push(runner)
    this.ids.push(id)

    return this
  }

  clearBefore(id) {
    const deleteCnt = this.ids.indexOf(id + 1) || 1
    this.ids.splice(0, deleteCnt, 0)
    this.runners
      .splice(0, deleteCnt, new FakeRunner())
      .forEach((r) => r.clearTransformsFromQueue())
    return this
  }

  edit(id, newRunner) {
    const index = this.ids.indexOf(id + 1)
    this.ids.splice(index, 1, id + 1)
    this.runners.splice(index, 1, newRunner)
    return this
  }

  getByID(id) {
    return this.runners[this.ids.indexOf(id + 1)]
  }

  length() {
    return this.ids.length
  }

  merge() {
    let lastRunner = null
    for (let i = 0; i < this.runners.length; ++i) {
      const runner = this.runners[i]

      const condition =
        lastRunner &&
        runner.done &&
        lastRunner.done &&
        // don't merge runner when persisted on timeline
        (!runner._timeline ||
          !runner._timeline._runnerIds.includes(runner.id)) &&
        (!lastRunner._timeline ||
          !lastRunner._timeline._runnerIds.includes(lastRunner.id))

      if (condition) {
        // the +1 happens in the function
        this.remove(runner.id)
        const newRunner = runner.mergeWith(lastRunner)
        this.edit(lastRunner.id, newRunner)
        lastRunner = newRunner
        --i
      } else {
        lastRunner = runner
      }
    }

    return this
  }

  remove(id) {
    const index = this.ids.indexOf(id + 1)
    this.ids.splice(index, 1)
    this.runners.splice(index, 1)
    return this
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_5__.registerMethods)({
  Element: {
    animate(duration, delay, when) {
      const o = Runner.sanitise(duration, delay, when)
      const timeline = this.timeline()
      return new Runner(o.duration)
        .loop(o)
        .element(this)
        .timeline(timeline.play())
        .schedule(o.delay, o.when)
    },

    delay(by, when) {
      return this.animate(0, by, when)
    },

    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id)
    },

    _currentTransform(current) {
      return (
        this._transformationRunners.runners
          // we need the equal sign here to make sure, that also transformations
          // on the same runner which execute before the current transformation are
          // taken into account
          .filter((runner) => runner.id <= current.id)
          .map(getRunnerTransform)
          .reduce(lmultiply, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]())
      )
    },

    _addRunner(runner) {
      this._transformationRunners.add(runner)

      // Make sure that the runner merge is executed at the very end of
      // all Animator functions. That is why we use immediate here to execute
      // the merge right after all frames are run
      _Animator_js__WEBPACK_IMPORTED_MODULE_7__["default"].cancelImmediate(this._frameId)
      this._frameId = _Animator_js__WEBPACK_IMPORTED_MODULE_7__["default"].immediate(mergeTransforms.bind(this))
    },

    _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(
          new FakeRunner(new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](this))
        )
      }
    }
  }
})

// Will output the elements from array A that are not in the array B
const difference = (a, b) => a.filter((x) => !b.includes(x))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)(Runner, {
  attr(a, v) {
    return this.styleAttr('attr', a, v)
  },

  // Add animatable styles
  css(s, v) {
    return this.styleAttr('css', s, v)
  },

  styleAttr(type, nameOrAttrs, val) {
    if (typeof nameOrAttrs === 'string') {
      return this.styleAttr(type, { [nameOrAttrs]: val })
    }

    let attrs = nameOrAttrs
    if (this._tryRetarget(type, attrs)) return this

    let morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(attrs)
    let keys = Object.keys(attrs)

    this.queue(
      function () {
        morpher = morpher.from(this.element()[type](keys))
      },
      function (pos) {
        this.element()[type](morpher.at(pos).valueOf())
        return morpher.done()
      },
      function (newToAttrs) {
        // Check if any new keys were added
        const newKeys = Object.keys(newToAttrs)
        const differences = difference(newKeys, keys)

        // If their are new keys, initialize them and add them to morpher
        if (differences.length) {
          // Get the values
          const addedFromAttrs = this.element()[type](differences)

          // Get the already initialized values
          const oldFromAttrs = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__.ObjectBag(morpher.from()).valueOf()

          // Merge old and new
          Object.assign(oldFromAttrs, addedFromAttrs)
          morpher.from(oldFromAttrs)
        }

        // Get the object from the morpher
        const oldToAttrs = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__.ObjectBag(morpher.to()).valueOf()

        // Merge in new attributes
        Object.assign(oldToAttrs, newToAttrs)

        // Change morpher target
        morpher.to(oldToAttrs)

        // Make sure that we save the work we did so we don't need it to do again
        keys = newKeys
        attrs = newToAttrs
      }
    )

    this._rememberMorpher(type, morpher)
    return this
  },

  zoom(level, point) {
    if (this._tryRetarget('zoom', level, point)) return this

    let morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](level))

    this.queue(
      function () {
        morpher = morpher.from(this.element().zoom())
      },
      function (pos) {
        this.element().zoom(morpher.at(pos), point)
        return morpher.done()
      },
      function (newLevel, newPoint) {
        point = newPoint
        morpher.to(newLevel)
      }
    )

    this._rememberMorpher('zoom', morpher)
    return this
  },

  /**
   ** absolute transformations
   **/

  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)

  transform(transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative
    if (
      this._isDeclarative &&
      !relative &&
      this._tryRetarget('transform', transforms)
    ) {
      return this
    }

    // Parse the parameters
    const isMatrix = _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"].isMatrixLike(transforms)
    affine =
      transforms.affine != null
        ? transforms.affine
        : affine != null
          ? affine
          : !isMatrix

    // Create a morpher and set its type
    const morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).type(
      affine ? _Morphable_js__WEBPACK_IMPORTED_MODULE_11__.TransformBag : _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]
    )

    let origin
    let element
    let current
    let currentAngle
    let startTransform

    function setup() {
      // make sure element and origin is defined
      element = element || this.element()
      origin = origin || (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.getOrigin)(transforms, element)

      startTransform = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](relative ? undefined : element)

      // add the runner to the element so it can merge transformations
      element._addRunner(this)

      // Deactivate all transforms that have run so far if we are absolute
      if (!relative) {
        element._clearTransformRunnersBefore(this)
      }
    }

    function run(pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform()

      const { x, y } = new _types_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"](origin).transform(
        element._currentTransform(this)
      )

      let target = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]({ ...transforms, origin: [x, y] })
      let start = this._isDeclarative && current ? current : startTransform

      if (affine) {
        target = target.decompose(x, y)
        start = start.decompose(x, y)

        // Get the current and target angle as it was set
        const rTarget = target.rotate
        const rCurrent = start.rotate

        // Figure out the shortest path to rotate directly
        const possibilities = [rTarget - 360, rTarget, rTarget + 360]
        const distances = possibilities.map((a) => Math.abs(a - rCurrent))
        const shortest = Math.min(...distances)
        const index = distances.indexOf(shortest)
        target.rotate = possibilities[index]
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0
        }
        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle
        }
      }

      morpher.from(start)
      morpher.to(target)

      const affineParameters = morpher.at(pos)
      currentAngle = affineParameters.rotate
      current = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](affineParameters)

      this.addTransform(current)
      element._addRunner(this)
      return morpher.done()
    }

    function retarget(newTransforms) {
      // only get a new origin if it changed since the last call
      if (
        (newTransforms.origin || 'center').toString() !==
        (transforms.origin || 'center').toString()
      ) {
        origin = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.getOrigin)(newTransforms, element)
      }

      // overwrite the old transformations with the new ones
      transforms = { ...newTransforms, origin }
    }

    this.queue(setup, run, retarget, true)
    this._isDeclarative && this._rememberMorpher('transform', morpher)
    return this
  },

  // Animatable x-axis
  x(x) {
    return this._queueNumber('x', x)
  },

  // Animatable y-axis
  y(y) {
    return this._queueNumber('y', y)
  },

  ax(x) {
    return this._queueNumber('ax', x)
  },

  ay(y) {
    return this._queueNumber('ay', y)
  },

  dx(x = 0) {
    return this._queueNumberDelta('x', x)
  },

  dy(y = 0) {
    return this._queueNumberDelta('y', y)
  },

  dmove(x, y) {
    return this.dx(x).dy(y)
  },

  _queueNumberDelta(method, to) {
    to = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](to)

    // Try to change the target if we have this method already registered
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    const morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(to)
    let from = null
    this.queue(
      function () {
        from = this.element()[method]()
        morpher.from(from)
        morpher.to(from + to)
      },
      function (pos) {
        this.element()[method](morpher.at(pos))
        return morpher.done()
      },
      function (newTo) {
        morpher.to(from + new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](newTo))
      }
    )

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher)
    return this
  },

  _queueObject(method, to) {
    // Try to change the target if we have this method already registered
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    const morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(to)
    this.queue(
      function () {
        morpher.from(this.element()[method]())
      },
      function (pos) {
        this.element()[method](morpher.at(pos))
        return morpher.done()
      }
    )

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher)
    return this
  },

  _queueNumber(method, value) {
    return this._queueObject(method, new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](value))
  },

  // Animatable center x-axis
  cx(x) {
    return this._queueNumber('cx', x)
  },

  // Animatable center y-axis
  cy(y) {
    return this._queueNumber('cy', y)
  },

  // Add animatable move
  move(x, y) {
    return this.x(x).y(y)
  },

  amove(x, y) {
    return this.ax(x).ay(y)
  },

  // Add animatable center
  center(x, y) {
    return this.cx(x).cy(y)
  },

  // Add animatable size
  size(width, height) {
    // animate bbox based size for all other elements
    let box

    if (!width || !height) {
      box = this._element.bbox()
    }

    if (!width) {
      width = (box.width / box.height) * height
    }

    if (!height) {
      height = (box.height / box.width) * width
    }

    return this.width(width).height(height)
  },

  // Add animatable width
  width(width) {
    return this._queueNumber('width', width)
  },

  // Add animatable height
  height(height) {
    return this._queueNumber('height', height)
  },

  // Add animatable plot
  plot(a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([a, b, c, d])
    }

    if (this._tryRetarget('plot', a)) return this

    const morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper)
      .type(this._element.MorphArray)
      .to(a)

    this.queue(
      function () {
        morpher.from(this._element.array())
      },
      function (pos) {
        this._element.plot(morpher.at(pos))
        return morpher.done()
      }
    )

    this._rememberMorpher('plot', morpher)
    return this
  },

  // Add leading method
  leading(value) {
    return this._queueNumber('leading', value)
  },

  // Add animatable viewbox
  viewbox(x, y, width, height) {
    return this._queueObject('viewbox', new _types_Box_js__WEBPACK_IMPORTED_MODULE_8__["default"](x, y, width, height))
  },

  update(o) {
    if (typeof o !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      })
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity)
    if (o.color != null) this.attr('stop-color', o.color)
    if (o.offset != null) this.attr('offset', o.offset)

    return this
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)(Runner, { rx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__.rx, ry: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__.ry, from: _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__.from, to: _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__.to })
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.register)(Runner, 'Runner')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Timeline)
/* harmony export */ });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");





const makeSchedule = function (runnerInfo) {
  const start = runnerInfo.start
  const duration = runnerInfo.runner.duration()
  const end = start + duration
  return {
    start: start,
    duration: duration,
    end: end,
    runner: runnerInfo.runner
  }
}

const defaultSource = function () {
  const w = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.window
  return (w.performance || w.Date).now()
}

class Timeline extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Construct a new timeline on the given element
  constructor(timeSource = defaultSource) {
    super()

    this._timeSource = timeSource

    // terminate resets all variables to their initial state
    this.terminate()
  }

  active() {
    return !!this._nextFrame
  }

  finish() {
    // Go to end and pause
    this.time(this.getEndTimeOfTimeline() + 1)
    return this.pause()
  }

  // Calculates the end of the timeline
  getEndTime() {
    const lastRunnerInfo = this.getLastRunnerInfo()
    const lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0
    const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time
    return lastStartTime + lastDuration
  }

  getEndTimeOfTimeline() {
    const endTimes = this._runners.map((i) => i.start + i.runner.duration())
    return Math.max(0, ...endTimes)
  }

  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId)
  }

  getRunnerInfoById(id) {
    return this._runners[this._runnerIds.indexOf(id)] || null
  }

  pause() {
    this._paused = true
    return this._continue()
  }

  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever
    return this
  }

  play() {
    // Now make sure we are not paused and continue the animation
    this._paused = false
    return this.updateTime()._continue()
  }

  reverse(yes) {
    const currentSpeed = this.speed()
    if (yes == null) return this.speed(-currentSpeed)

    const positive = Math.abs(currentSpeed)
    return this.speed(yes ? -positive : positive)
  }

  // schedules a runner on the timeline
  schedule(runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule)
    }

    // The start time for the next animation can either be given explicitly,
    // derived from the current timeline time or it can be relative to the
    // last start time to chain animations directly

    let absoluteStartTime = 0
    const endTime = this.getEndTime()
    delay = delay || 0

    // Work out when to start the animation
    if (when == null || when === 'last' || when === 'after') {
      // Take the last time and increment
      absoluteStartTime = endTime
    } else if (when === 'absolute' || when === 'start') {
      absoluteStartTime = delay
      delay = 0
    } else if (when === 'now') {
      absoluteStartTime = this._time
    } else if (when === 'relative') {
      const runnerInfo = this.getRunnerInfoById(runner.id)
      if (runnerInfo) {
        absoluteStartTime = runnerInfo.start + delay
        delay = 0
      }
    } else if (when === 'with-last') {
      const lastRunnerInfo = this.getLastRunnerInfo()
      const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time
      absoluteStartTime = lastStartTime
    } else {
      throw new Error('Invalid value for the "when" parameter')
    }

    // Manage runner
    runner.unschedule()
    runner.timeline(this)

    const persist = runner.persist()
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    }

    this._lastRunnerId = runner.id

    this._runners.push(runnerInfo)
    this._runners.sort((a, b) => a.start - b.start)
    this._runnerIds = this._runners.map((info) => info.runner.id)

    this.updateTime()._continue()
    return this
  }

  seek(dt) {
    return this.time(this._time + dt)
  }

  source(fn) {
    if (fn == null) return this._timeSource
    this._timeSource = fn
    return this
  }

  speed(speed) {
    if (speed == null) return this._speed
    this._speed = speed
    return this
  }

  stop() {
    // Go to start and pause
    this.time(0)
    return this.pause()
  }

  time(time) {
    if (time == null) return this._time
    this._time = time
    return this._continue(true)
  }

  // Remove the runner from this timeline
  unschedule(runner) {
    const index = this._runnerIds.indexOf(runner.id)
    if (index < 0) return this

    this._runners.splice(index, 1)
    this._runnerIds.splice(index, 1)

    runner.timeline(null)
    return this
  }

  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource()
    }
    return this
  }

  // Checks if we are running and continues the animation
  _continue(immediateStep = false) {
    _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"].cancelFrame(this._nextFrame)
    this._nextFrame = null

    if (immediateStep) return this._stepImmediate()
    if (this._paused) return this

    this._nextFrame = _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"].frame(this._step)
    return this
  }

  _stepFn(immediateStep = false) {
    // Get the time delta from the last time and update the time
    const time = this._timeSource()
    let dtSource = time - this._lastSourceTime

    if (immediateStep) dtSource = 0

    const dtTime = this._speed * dtSource + (this._time - this._lastStepTime)
    this._lastSourceTime = time

    // Only update the time if we use the timeSource.
    // Otherwise use the current time
    if (!immediateStep) {
      // Update the time
      this._time += dtTime
      this._time = this._time < 0 ? 0 : this._time
    }
    this._lastStepTime = this._time
    this.fire('time', this._time)

    // This is for the case that the timeline was seeked so that the time
    // is now before the startTime of the runner. That is why we need to set
    // the runner to position 0

    // FIXME:
    // However, resetting in insertion order leads to bugs. Considering the case,
    // where 2 runners change the same attribute but in different times,
    // resetting both of them will lead to the case where the later defined
    // runner always wins the reset even if the other runner started earlier
    // and therefore should win the attribute battle
    // this can be solved by resetting them backwards
    for (let k = this._runners.length; k--; ) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[k]
      const runner = runnerInfo.runner

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start

      // Dont run runner if not started yet
      // and try to reset it
      if (dtToStart <= 0) {
        runner.reset()
      }
    }

    // Run all of the runners directly
    let runnersLeft = false
    for (let i = 0, len = this._runners.length; i < len; i++) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[i]
      const runner = runnerInfo.runner
      let dt = dtTime

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start

      // Dont run runner if not started yet
      if (dtToStart <= 0) {
        runnersLeft = true
        continue
      } else if (dtToStart < dt) {
        // Adjust dt to make sure that animation is on point
        dt = dtToStart
      }

      if (!runner.active()) continue

      // If this runner is still going, signal that we need another animation
      // frame, otherwise, remove the completed runner
      const finished = runner.step(dt).done
      if (!finished) {
        runnersLeft = true
        // continue
      } else if (runnerInfo.persist !== true) {
        // runner is finished. And runner might get removed
        const endTime = runner.duration() - runner.time() + this._time

        if (endTime + runnerInfo.persist < this._time) {
          // Delete runner and correct index
          runner.unschedule()
          --i
          --len
        }
      }
    }

    // Basically: we continue when there are runners right from us in time
    // when -->, and when runners are left from us when <--
    if (
      (runnersLeft && !(this._speed < 0 && this._time === 0)) ||
      (this._runnerIds.length && this._speed < 0 && this._time > 0)
    ) {
      this._continue()
    } else {
      this.pause()
      this.fire('finished')
    }

    return this
  }

  terminate() {
    // cleanup memory

    // Store the timing variables
    this._startTime = 0
    this._speed = 1.0

    // Determines how long a runner is hold in memory. Can be a dt or true/false
    this._persist = 0

    // Keep track of the running animations and their starting parameters
    this._nextFrame = null
    this._paused = true
    this._runners = []
    this._runnerIds = []
    this._lastRunnerId = -1
    this._time = 0
    this._lastSourceTime = 0
    this._lastStepTime = 0

    // Make sure that step is always called in class context
    this._step = this._stepFn.bind(this, false)
    this._stepImmediate = this._stepFn.bind(this, true)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Element: {
    timeline: function (timeline) {
      if (timeline == null) {
        this._timeline = this._timeline || new Timeline()
        return this._timeline
      } else {
        this._timeline = timeline
        return this
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/A.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/A.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ A)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_containerGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/containerGeometry.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js");






class A extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('a', node), attrs)
  }

  // Link target attribute
  target(target) {
    return this.attr('target', target)
  }

  // Link url
  to(url) {
    return this.attr('href', url, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.xlink)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(A, _modules_core_containerGeometry_js__WEBPACK_IMPORTED_MODULE_4__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a hyperlink element
    link: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (url) {
      return this.put(new A()).to(url)
    })
  },
  Element: {
    unlink() {
      const link = this.linker()

      if (!link) return this

      const parent = link.parent()

      if (!parent) {
        return this.remove()
      }

      const index = parent.index(link)
      parent.add(this, index)

      link.remove()
      return this
    },
    linkTo(url) {
      // reuse old link if possible
      let link = this.linker()

      if (!link) {
        link = new A()
        this.wrap(link)
      }

      if (typeof url === 'function') {
        url.call(link, link)
      } else {
        link.to(url)
      }

      return this
    },
    linker() {
      const link = this.parent()
      if (link && link.node.nodeName.toLowerCase() === 'a') {
        return link
      }

      return null
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(A, 'A')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Circle.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Circle.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Circle)
/* harmony export */ });
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");






class Circle extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.nodeOrNew)('circle', node), attrs)
  }

  radius(r) {
    return this.attr('r', r)
  }

  // Radius x value
  rx(rx) {
    return this.attr('r', rx)
  }

  // Alias radius x value
  ry(ry) {
    return this.rx(ry)
  }

  size(size) {
    return this.radius(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](size).divide(2))
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.extend)(Circle, { x: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.x, y: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.y, cx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.cx, cy: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.cy, width: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.width, height: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__.height })

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)({
  Container: {
    // Create circle element
    circle: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.wrapWithAttrCheck)(function (size = 0) {
      return this.put(new Circle()).size(size).move(0, 0)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.register)(Circle, 'Circle')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClipPath)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");





class ClipPath extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('clipPath', node), attrs)
  }

  // Unclip all clipped elements and remove itself
  remove() {
    // unclip all targets
    this.targets().forEach(function (el) {
      el.unclip()
    })

    // remove clipPath from parent
    return super.remove()
  }

  targets() {
    return (0,_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__["default"])('svg [clip-path*=' + this.id() + ']')
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create clipping element
    clip: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function () {
      return this.defs().put(new ClipPath())
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference('clip-path')
    },

    clipWith(element) {
      // use given clip or create a new one
      const clipper =
        element instanceof ClipPath
          ? element
          : this.parent().clip().add(element)

      // apply mask
      return this.attr('clip-path', 'url(#' + clipper.id() + ')')
    },

    // Unclip element
    unclip() {
      return this.attr('clip-path', null)
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(ClipPath, 'ClipPath')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Container.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");



class Container extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  flatten() {
    this.each(function () {
      if (this instanceof Container) {
        return this.flatten().ungroup()
      }
    })

    return this
  }

  ungroup(parent = this.parent(), index = parent.index(this)) {
    // when parent != this, we want append all elements to the end
    index = index === -1 ? parent.children().length : index

    this.each(function (i, children) {
      // reverse each
      return children[children.length - i - 1].toParent(parent, index)
    })

    return this.remove()
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Container, 'Container')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Defs.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Defs)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");



class Defs extends _Container_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('defs', node), attrs)
  }

  flatten() {
    return this
  }

  ungroup() {
    return this
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Defs, 'Defs')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Dom.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dom)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modules/core/attr.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js");









class Dom extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor(node, attrs) {
    super()
    this.node = node
    this.type = node.nodeName

    if (attrs && node !== attrs) {
      this.attr(attrs)
    }
  }

  // Add given element at a position
  add(element, i) {
    element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)

    // If non-root svg nodes are added we have to remove their namespaces
    if (
      element.removeNamespace &&
      this.node instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.window.SVGElement
    ) {
      element.removeNamespace()
    }

    if (i == null) {
      this.node.appendChild(element.node)
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i])
    }

    return this
  }

  // Add element to given container and return self
  addTo(parent, i) {
    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(parent).put(this, i)
  }

  // Returns all child elements
  children() {
    return new _types_List_js__WEBPACK_IMPORTED_MODULE_6__["default"](
      (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.map)(this.node.children, function (node) {
        return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(node)
      })
    )
  }

  // Remove all elements in this container
  clear() {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild)
    }

    return this
  }

  // Clone element
  clone(deep = true, assignNewIds = true) {
    // write dom data to the dom so the clone can pickup the data
    this.writeDataToDom()

    // clone element
    let nodeClone = this.node.cloneNode(deep)
    if (assignNewIds) {
      // assign new id
      nodeClone = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.assignNewId)(nodeClone)
    }
    return new this.constructor(nodeClone)
  }

  // Iterates over all children and invokes a given block
  each(block, deep) {
    const children = this.children()
    let i, il

    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [i, children])

      if (deep) {
        children[i].each(block, deep)
      }
    }

    return this
  }

  element(nodeName, attrs) {
    return this.put(new Dom((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.create)(nodeName), attrs))
  }

  // Get first child
  first() {
    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(this.node.firstChild)
  }

  // Get a element at the given index
  get(i) {
    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(this.node.childNodes[i])
  }

  getEventHolder() {
    return this.node
  }

  getEventTarget() {
    return this.node
  }

  // Checks if the given element is a child
  has(element) {
    return this.index(element) >= 0
  }

  html(htmlOrFn, outerHTML) {
    return this.xml(htmlOrFn, outerHTML, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_4__.html)
  }

  // Get / set id
  id(id) {
    // generate new id if no id set
    if (typeof id === 'undefined' && !this.node.id) {
      this.node.id = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.eid)(this.type)
    }

    // don't set directly with this.node.id to make `null` work correctly
    return this.attr('id', id)
  }

  // Gets index of given element
  index(element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node)
  }

  // Get the last child
  last() {
    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(this.node.lastChild)
  }

  // matches the element vs a css selector
  matches(selector) {
    const el = this.node
    const matcher =
      el.matches ||
      el.matchesSelector ||
      el.msMatchesSelector ||
      el.mozMatchesSelector ||
      el.webkitMatchesSelector ||
      el.oMatchesSelector ||
      null
    return matcher && matcher.call(el, selector)
  }

  // Returns the parent element instance
  parent(type) {
    let parent = this

    // check for parent
    if (!parent.node.parentNode) return null

    // get parent element
    parent = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(parent.node.parentNode)

    if (!type) return parent

    // loop through ancestors if type is given
    do {
      if (
        typeof type === 'string' ? parent.matches(type) : parent instanceof type
      )
        return parent
    } while ((parent = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(parent.node.parentNode)))

    return parent
  }

  // Basically does the same as `add()` but returns the added element instead
  put(element, i) {
    element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)
    this.add(element, i)
    return element
  }

  // Add element to given container and return container
  putIn(parent, i) {
    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(parent).add(this, i)
  }

  // Remove element
  remove() {
    if (this.parent()) {
      this.parent().removeElement(this)
    }

    return this
  }

  // Remove a given child
  removeElement(element) {
    this.node.removeChild(element.node)

    return this
  }

  // Replace this with element
  replace(element) {
    element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)

    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(element.node, this.node)
    }

    return element
  }

  round(precision = 2, map = null) {
    const factor = 10 ** precision
    const attrs = this.attr(map)

    for (const i in attrs) {
      if (typeof attrs[i] === 'number') {
        attrs[i] = Math.round(attrs[i] * factor) / factor
      }
    }

    this.attr(attrs)
    return this
  }

  // Import / Export raw svg
  svg(svgOrFn, outerSVG) {
    return this.xml(svgOrFn, outerSVG, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_4__.svg)
  }

  // Return id on string conversion
  toString() {
    return this.id()
  }

  words(text) {
    // This is faster than removing all children and adding a new one
    this.node.textContent = text
    return this
  }

  wrap(node) {
    const parent = this.parent()

    if (!parent) {
      return this.addTo(node)
    }

    const position = parent.index(this)
    return parent.put(node, position).put(this)
  }

  // write svgjs data to the dom
  writeDataToDom() {
    // dump variables recursively
    this.each(function () {
      this.writeDataToDom()
    })

    return this
  }

  // Import / Export raw svg
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML
      outerXML = xmlOrFn
      xmlOrFn = null
    }

    // act as getter if no svg string is given
    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      // The default for exports is, that the outerNode is included
      outerXML = outerXML == null ? true : outerXML

      // write svgjs data to the dom
      this.writeDataToDom()
      let current = this

      // An export modifier was passed
      if (xmlOrFn != null) {
        current = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(current.node.cloneNode(true))

        // If the user wants outerHTML we need to process this node, too
        if (outerXML) {
          const result = xmlOrFn(current)
          current = result || current

          // The user does not want this node? Well, then he gets nothing
          if (result === false) return ''
        }

        // Deep loop through all children and apply modifier
        current.each(function () {
          const result = xmlOrFn(this)
          const _this = result || this

          // If modifier returns false, discard node
          if (result === false) {
            this.remove()

            // If modifier returns new node, use it
          } else if (result && this !== _this) {
            this.replace(_this)
          }
        }, true)
      }

      // Return outer or inner content
      return outerXML ? current.node.outerHTML : current.node.innerHTML
    }

    // Act as setter if we got a string

    // The default for import is, that the current node is not replaced
    outerXML = outerXML == null ? false : outerXML

    // Create temporary holder
    const well = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.create)('wrapper', ns)
    const fragment = _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.document.createDocumentFragment()

    // Dump raw svg
    well.innerHTML = xmlOrFn

    // Transplant nodes into the fragment
    for (let len = well.children.length; len--; ) {
      fragment.appendChild(well.firstElementChild)
    }

    const parent = this.parent()

    // Add the whole fragment at once
    return outerXML ? this.replace(fragment) && parent : this.add(fragment)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Dom, { attr: _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_7__["default"], find: _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__.find, findOne: _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__.findOne })
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Dom, 'Dom')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Element.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Element)
/* harmony export */ });
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _Dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Dom.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");











class Element extends _Dom_js__WEBPACK_IMPORTED_MODULE_7__["default"] {
  constructor(node, attrs) {
    super(node, attrs)

    // initialize data object
    this.dom = {}

    // create circular reference
    this.node.instance = this

    if (node.hasAttribute('data-svgjs') || node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      this.setData(
        JSON.parse(node.getAttribute('data-svgjs')) ??
          JSON.parse(node.getAttribute('svgjs:data')) ??
          {}
      )
    }
  }

  // Move element by its center
  center(x, y) {
    return this.cx(x).cy(y)
  }

  // Move by center over x-axis
  cx(x) {
    return x == null
      ? this.x() + this.width() / 2
      : this.x(x - this.width() / 2)
  }

  // Move by center over y-axis
  cy(y) {
    return y == null
      ? this.y() + this.height() / 2
      : this.y(y - this.height() / 2)
  }

  // Get defs
  defs() {
    const root = this.root()
    return root && root.defs()
  }

  // Relative move over x and y axes
  dmove(x, y) {
    return this.dx(x).dy(y)
  }

  // Relative move over x axis
  dx(x = 0) {
    return this.x(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](x).plus(this.x()))
  }

  // Relative move over y axis
  dy(y = 0) {
    return this.y(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](y).plus(this.y()))
  }

  getEventHolder() {
    return this
  }

  // Set height of element
  height(height) {
    return this.attr('height', height)
  }

  // Move element to given x and y values
  move(x, y) {
    return this.x(x).y(y)
  }

  // return array of all ancestors of given type up to the root svg
  parents(until = this.root()) {
    const isSelector = typeof until === 'string'
    if (!isSelector) {
      until = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.makeInstance)(until)
    }
    const parents = new _types_List_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    let parent = this

    while (
      (parent = parent.parent()) &&
      parent.node !== _utils_window_js__WEBPACK_IMPORTED_MODULE_3__.globals.document &&
      parent.nodeName !== '#document-fragment'
    ) {
      parents.push(parent)

      if (!isSelector && parent.node === until.node) {
        break
      }
      if (isSelector && parent.matches(until)) {
        break
      }
      if (parent.node === this.root().node) {
        // We worked our way to the root and didn't match `until`
        return null
      }
    }

    return parents
  }

  // Get referenced element form attribute value
  reference(attr) {
    attr = this.attr(attr)
    if (!attr) return null

    const m = (attr + '').match(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_6__.reference)
    return m ? (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.makeInstance)(m[1]) : null
  }

  // Get parent document
  root() {
    const p = this.parent((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.getClass)(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.root))
    return p && p.root()
  }

  // set given data to the elements data property
  setData(o) {
    this.dom = o
    return this
  }

  // Set element size to given width and height
  size(width, height) {
    const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_5__.proportionalSize)(this, width, height)

    return this.width(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](p.width)).height(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](p.height))
  }

  // Set width of element
  width(width) {
    return this.attr('width', width)
  }

  // write svgjs data to the dom
  writeDataToDom() {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_5__.writeDataToDom)(this, this.dom)
    return super.writeDataToDom()
  }

  // Move over x-axis
  x(x) {
    return this.attr('x', x)
  }

  // Move over y-axis
  y(y) {
    return this.attr('y', y)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.extend)(Element, {
  bbox: _types_Box_js__WEBPACK_IMPORTED_MODULE_0__.bbox,
  rbox: _types_Box_js__WEBPACK_IMPORTED_MODULE_0__.rbox,
  inside: _types_Box_js__WEBPACK_IMPORTED_MODULE_0__.inside,
  point: _types_Point_js__WEBPACK_IMPORTED_MODULE_4__.point,
  ctm: _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__.ctm,
  screenCTM: _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__.screenCTM
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.register)(Element, 'Element')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ellipse)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");







class Ellipse extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('ellipse', node), attrs)
  }

  size(width, height) {
    const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.proportionalSize)(this, width, height)

    return this.rx(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](p.width).divide(2)).ry(
      new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](p.height).divide(2)
    )
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Ellipse, _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_5__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)('Container', {
  // Create an ellipse
  ellipse: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (width = 0, height = width) {
    return this.put(new Ellipse()).size(width, height).move(0, 0)
  })
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Ellipse, 'Ellipse')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ForeignObject)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");




class ForeignObject extends _Element_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('foreignObject', node), attrs)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    foreignObject: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (width, height) {
      return this.put(new ForeignObject()).size(width, height)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(ForeignObject, 'ForeignObject')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Fragment.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Fragment.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dom.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");




class Fragment extends _Dom_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(node = _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document.createDocumentFragment()) {
    super(node)
  }

  // Import / Export raw xml
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML
      outerXML = xmlOrFn
      xmlOrFn = null
    }

    // because this is a fragment we have to put all elements into a wrapper first
    // before we can get the innerXML from it
    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      const wrapper = new _Dom_js__WEBPACK_IMPORTED_MODULE_0__["default"]((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.create)('wrapper', ns))
      wrapper.add(this.node.cloneNode(true))

      return wrapper.xml(false, ns)
    }

    // Act as setter if we got a string
    return super.xml(xmlOrFn, false, ns)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.register)(Fragment, 'Fragment')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fragment);


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/G.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/G.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ G)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_containerGeometry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/containerGeometry.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js");





class G extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('g', node), attrs)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(G, _modules_core_containerGeometry_js__WEBPACK_IMPORTED_MODULE_3__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a group element
    group: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function () {
      return this.put(new G())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(G, 'G')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gradient)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony import */ var _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/gradiented.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js");







class Gradient extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(type, attrs) {
    super(
      (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)(type + 'Gradient', typeof type === 'string' ? null : type),
      attrs
    )
  }

  // custom attr to handle transform
  attr(a, b, c) {
    if (a === 'transform') a = 'gradientTransform'
    return super.attr(a, b, c)
  }

  bbox() {
    return new _types_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
  }

  targets() {
    return (0,_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__["default"])('svg [fill*=' + this.id() + ']')
  }

  // Alias string conversion to fill
  toString() {
    return this.url()
  }

  // Update gradient
  update(block) {
    // remove all stops
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Return the fill id
  url() {
    return 'url(#' + this.id() + ')'
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Gradient, _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_5__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create gradient element in defs
    gradient(...args) {
      return this.defs().gradient(...args)
    }
  },
  // define gradient
  Defs: {
    gradient: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (type, block) {
      return this.put(new Gradient(type)).update(block)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Gradient, 'Gradient')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Image.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Image.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/attr.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pattern.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");










class Image extends _Shape_js__WEBPACK_IMPORTED_MODULE_7__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.nodeOrNew)('image', node), attrs)
  }

  // (re)load image
  load(url, callback) {
    if (!url) return this

    const img = new _utils_window_js__WEBPACK_IMPORTED_MODULE_8__.globals.window.Image()

    ;(0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__.on)(
      img,
      'load',
      function (e) {
        const p = this.parent(_Pattern_js__WEBPACK_IMPORTED_MODULE_6__["default"])

        // ensure image size
        if (this.width() === 0 && this.height() === 0) {
          this.size(img.width, img.height)
        }

        if (p instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
          // ensure pattern size if not set
          if (p.width() === 0 && p.height() === 0) {
            p.size(this.width(), this.height())
          }
        }

        if (typeof callback === 'function') {
          callback.call(this, e)
        }
      },
      this
    )

    ;(0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__.on)(img, 'load error', function () {
      // dont forget to unbind memory leaking events
      ;(0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__.off)(img)
    })

    return this.attr('href', (img.src = url), _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_5__.xlink)
  }
}

(0,_modules_core_attr_js__WEBPACK_IMPORTED_MODULE_3__.registerAttrHook)(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isImage.test(val)) {
      val = _this.root().defs().image(val)
    }
  }

  if (val instanceof Image) {
    val = _this
      .root()
      .defs()
      .pattern(0, 0, (pattern) => {
        pattern.add(val)
      })
  }

  return val
})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_4__.registerMethods)({
  Container: {
    // create image element, load image and set its size
    image: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.wrapWithAttrCheck)(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.register)(Image, 'Image')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Line.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Line.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");







class Line extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('line', node), attrs)
  }

  // Get array
  array() {
    return new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]([
      [this.attr('x1'), this.attr('y1')],
      [this.attr('x2'), this.attr('y2')]
    ])
  }

  // Move by left top corner
  move(x, y) {
    return this.attr(this.array().move(x, y).toLine())
  }

  // Overwrite native plot() method
  plot(x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array()
    } else if (typeof y1 !== 'undefined') {
      x1 = { x1, y1, x2, y2 }
    } else {
      x1 = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](x1).toLine()
    }

    return this.attr(x1)
  }

  // Set element size to given width and height
  size(width, height) {
    const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.proportionalSize)(this, width, height)
    return this.attr(this.array().size(p.width, p.height).toLine())
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Line, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_5__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)({
  Container: {
    // Create a line element
    line: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (...args) {
      // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
      return Line.prototype.plot.apply(
        this.put(new Line()),
        args[0] != null ? args : [0, 0, 0, 0]
      )
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Line, 'Line')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Marker.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Marker.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Marker)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");




class Marker extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('marker', node), attrs)
  }

  // Set height of element
  height(height) {
    return this.attr('markerHeight', height)
  }

  orient(orient) {
    return this.attr('orient', orient)
  }

  // Set marker refX and refY
  ref(x, y) {
    return this.attr('refX', x).attr('refY', y)
  }

  // Return the fill id
  toString() {
    return 'url(#' + this.id() + ')'
  }

  // Update marker
  update(block) {
    // remove all content
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Set width of element
  width(width) {
    return this.attr('markerWidth', width)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    marker(...args) {
      // Create marker element in defs
      return this.defs().marker(...args)
    }
  },
  Defs: {
    // Create marker
    marker: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker())
        .size(width, height)
        .ref(width / 2, height / 2)
        .viewbox(0, 0, width, height)
        .attr('orient', 'auto')
        .update(block)
    })
  },
  marker: {
    // Create and attach markers
    marker(marker, width, height, block) {
      let attr = ['marker']

      // Build attribute name
      if (marker !== 'all') attr.push(marker)
      attr = attr.join('-')

      // Set marker attribute
      marker =
        arguments[1] instanceof Marker
          ? arguments[1]
          : this.defs().marker(width, height, block)

      return this.attr(attr, marker)
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Marker, 'Marker')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Mask.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Mask.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mask)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");





class Mask extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('mask', node), attrs)
  }

  // Unmask all masked elements and remove itself
  remove() {
    // unmask all targets
    this.targets().forEach(function (el) {
      el.unmask()
    })

    // remove mask from parent
    return super.remove()
  }

  targets() {
    return (0,_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__["default"])('svg [mask*=' + this.id() + ']')
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    mask: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function () {
      return this.defs().put(new Mask())
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference('mask')
    },

    maskWith(element) {
      // use given mask or create a new one
      const masker =
        element instanceof Mask ? element : this.parent().mask().add(element)

      // apply mask
      return this.attr('mask', 'url(#' + masker.id() + ')')
    },

    // Unmask element
    unmask() {
      return this.attr('mask', null)
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Mask, 'Mask')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Path.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Path)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");






class Path extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('path', node), attrs)
  }

  // Get array
  array() {
    return this._array || (this._array = new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.attr('d')))
  }

  // Clear array cache
  clear() {
    delete this._array
    return this
  }

  // Set height of element
  height(height) {
    return height == null
      ? this.bbox().height
      : this.size(this.bbox().width, height)
  }

  // Move by left top corner
  move(x, y) {
    return this.attr('d', this.array().move(x, y))
  }

  // Plot new path
  plot(d) {
    return d == null
      ? this.array()
      : this.clear().attr(
          'd',
          typeof d === 'string' ? d : (this._array = new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](d))
        )
  }

  // Set element size to given width and height
  size(width, height) {
    const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.proportionalSize)(this, width, height)
    return this.attr('d', this.array().size(p.width, p.height))
  }

  // Set width of element
  width(width) {
    return width == null
      ? this.bbox().width
      : this.size(width, this.bbox().height)
  }

  // Move by left top corner over x-axis
  x(x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
  }

  // Move by left top corner over y-axis
  y(y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
  }
}

// Define morphable array
Path.prototype.MorphArray = _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]

// Add parent method
;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)({
  Container: {
    // Create a wrapped path element
    path: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Path, 'Path')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pattern)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");






class Pattern extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('pattern', node), attrs)
  }

  // custom attr to handle transform
  attr(a, b, c) {
    if (a === 'transform') a = 'patternTransform'
    return super.attr(a, b, c)
  }

  bbox() {
    return new _types_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
  }

  targets() {
    return (0,_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__["default"])('svg [fill*=' + this.id() + ']')
  }

  // Alias string conversion to fill
  toString() {
    return this.url()
  }

  // Update pattern by rebuilding
  update(block) {
    // remove content
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Return the fill id
  url() {
    return 'url(#' + this.id() + ')'
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create pattern element in defs
    pattern(...args) {
      return this.defs().pattern(...args)
    }
  },
  Defs: {
    pattern: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      })
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Pattern, 'Pattern')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");
/* harmony import */ var _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/poly.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js");







class Polygon extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('polygon', node), attrs)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a wrapped polygon element
    polygon: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Polygon, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__)
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Polygon, _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__)
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Polygon, 'Polygon')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polyline)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");
/* harmony import */ var _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/poly.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js");







class Polyline extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('polyline', node), attrs)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a wrapped polygon element
    polyline: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Polyline, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__)
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Polyline, _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__)
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Polyline, 'Polyline')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Rect.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Rect.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");





class Rect extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('rect', node), attrs)
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Rect, { rx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__.rx, ry: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__.ry })

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a rect element
    rect: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (width, height) {
      return this.put(new Rect()).size(width, height)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Rect, 'Rect')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Shape.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");



class Shape extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Shape, 'Shape')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Stop.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Stop.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stop)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");





class Stop extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('stop', node), attrs)
  }

  // add color stops
  update(o) {
    if (typeof o === 'number' || o instanceof _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      }
    }

    // set attributes
    if (o.opacity != null) this.attr('stop-opacity', o.opacity)
    if (o.color != null) this.attr('stop-color', o.color)
    if (o.offset != null) this.attr('offset', new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](o.offset))

    return this
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_3__.registerMethods)({
  Gradient: {
    // Add a color stop
    stop: function (offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity)
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Stop, 'Stop')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Style.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Style.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");





function cssRule(selector, rule) {
  if (!selector) return ''
  if (!rule) return selector

  let ret = selector + '{'

  for (const i in rule) {
    ret += (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__.unCamelCase)(i) + ':' + rule[i] + ';'
  }

  ret += '}'

  return ret
}

class Style extends _Element_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('style', node), attrs)
  }

  addText(w = '') {
    this.node.textContent += w
    return this
  }

  font(name, src, params = {}) {
    return this.rule('@font-face', {
      fontFamily: name,
      src: src,
      ...params
    })
  }

  rule(selector, obj) {
    return this.addText(cssRule(selector, obj))
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)('Dom', {
  style(selector, obj) {
    return this.put(new Style()).rule(selector, obj)
  },
  fontface(name, src, params) {
    return this.put(new Style()).font(name, src, params)
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Style, 'Style')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Svg.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Svg.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Svg)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _Defs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Defs.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");







class Svg extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('svg', node), attrs)
    this.namespace()
  }

  // Creates and returns defs element
  defs() {
    if (!this.isRoot()) return this.root().defs()

    return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(this.node.querySelector('defs')) || this.put(new _Defs_js__WEBPACK_IMPORTED_MODULE_4__["default"]())
  }

  isRoot() {
    return (
      !this.node.parentNode ||
      (!(this.node.parentNode instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_5__.globals.window.SVGElement) &&
        this.node.parentNode.nodeName !== '#document-fragment')
    )
  }

  // Add namespaces
  namespace() {
    if (!this.isRoot()) return this.root().namespace()
    return this.attr({ xmlns: _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.svg, version: '1.1' }).attr(
      'xmlns:xlink',
      _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.xlink,
      _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.xmlns
    )
  }

  removeNamespace() {
    return this.attr({ xmlns: null, version: null })
      .attr('xmlns:xlink', null, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.xmlns)
      .attr('xmlns:svgjs', null, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.xmlns)
  }

  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    if (this.isRoot()) return this
    return super.root()
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)({
  Container: {
    // Create nested svg document
    nested: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function () {
      return this.put(new Svg())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Svg, 'Svg', true)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Symbol)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");




class Symbol extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('symbol', node), attrs)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    symbol: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function () {
      return this.put(new Symbol())
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Symbol, 'Symbol')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Text.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/textable.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");








class Text extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('text', node), attrs)

    this.dom.leading = this.dom.leading ?? new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](1.3) // store leading value for rebuilding
    this._rebuild = true // enable automatic updating of dy values
    this._build = false // disable build mode for adding multiple lines
  }

  // Set / get leading
  leading(value) {
    // act as getter
    if (value == null) {
      return this.dom.leading
    }

    // act as setter
    this.dom.leading = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](value)

    return this.rebuild()
  }

  // Rebuild appearance type
  rebuild(rebuild) {
    // store new rebuild flag if given
    if (typeof rebuild === 'boolean') {
      this._rebuild = rebuild
    }

    // define position of all lines
    if (this._rebuild) {
      const self = this
      let blankLineOffset = 0
      const leading = this.dom.leading

      this.each(function (i) {
        if ((0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_6__.isDescriptive)(this.node)) return

        const fontSize = _utils_window_js__WEBPACK_IMPORTED_MODULE_4__.globals.window
          .getComputedStyle(this.node)
          .getPropertyValue('font-size')

        const dy = leading * new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](fontSize)

        if (this.dom.newLined) {
          this.attr('x', self.attr('x'))

          if (this.text() === '\n') {
            blankLineOffset += dy
          } else {
            this.attr('dy', i ? dy + blankLineOffset : 0)
            blankLineOffset = 0
          }
        }
      })

      this.fire('rebuild')
    }

    return this
  }

  // overwrite method from parent to set data properly
  setData(o) {
    this.dom = o
    this.dom.leading = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](o.leading || 1.3)
    return this
  }

  writeDataToDom() {
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_6__.writeDataToDom)(this, this.dom, { leading: 1.3 })
    return this
  }

  // Set the text content
  text(text) {
    // act as getter
    if (text === undefined) {
      const children = this.node.childNodes
      let firstLine = 0
      text = ''

      for (let i = 0, len = children.length; i < len; ++i) {
        // skip textPaths - they are no lines
        if (children[i].nodeName === 'textPath' || (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_6__.isDescriptive)(children[i])) {
          if (i === 0) firstLine = i + 1
          continue
        }

        // add newline if its not the first child and newLined is set to true
        if (
          i !== firstLine &&
          children[i].nodeType !== 3 &&
          (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(children[i]).dom.newLined === true
        ) {
          text += '\n'
        }

        // add content of this node
        text += children[i].textContent
      }

      return text
    }

    // remove existing content
    this.clear().build(true)

    if (typeof text === 'function') {
      // call block
      text.call(this, this)
    } else {
      // store text and make sure text is not blank
      text = (text + '').split('\n')

      // build new lines
      for (let j = 0, jl = text.length; j < jl; j++) {
        this.newLine(text[j])
      }
    }

    // disable build mode and rebuild lines
    return this.build(false).rebuild()
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Text, _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create text element
    text: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (text = '') {
      return this.put(new Text()).text(text)
    }),

    // Create plain text element
    plain: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (text = '') {
      return this.put(new Text()).plain(text)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Text, 'Text')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextPath)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Path.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");








class TextPath extends _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('textPath', node), attrs)
  }

  // return the array of the path track element
  array() {
    const track = this.track()

    return track ? track.array() : null
  }

  // Plot path if any
  plot(d) {
    const track = this.track()
    let pathArray = null

    if (track) {
      pathArray = track.plot(d)
    }

    return d == null ? pathArray : this
  }

  // Get the path element
  track() {
    return this.reference('href')
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    textPath: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
        text = this.text(text)
      }

      return text.path(path)
    })
  },
  Text: {
    // Create path for text to run on
    path: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (track, importNodes = true) {
      const textPath = new TextPath()

      // if track is a path, reuse it
      if (!(track instanceof _Path_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
        // create path element
        track = this.defs().path(track)
      }

      // link textPath to path and add content
      textPath.attr('href', '#' + track, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.xlink)

      // Transplant all nodes from text to textPath
      let node
      if (importNodes) {
        while ((node = this.node.firstChild)) {
          textPath.node.appendChild(node)
        }
      }

      // add textPath element as child node and return textPath
      return this.put(textPath)
    }),

    // Get the textPath children
    textPath() {
      return this.findOne('textPath')
    }
  },
  Path: {
    // creates a textPath from this path
    text: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
        text = new _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"]().addTo(this.parent()).text(text)
      }

      // Create textPath from text and path and return
      return text.path(this)
    }),

    targets() {
      return (0,_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_6__["default"])('svg textPath').filter((node) => {
        return (node.attr('href') || '').includes(this.id())
      })

      // Does not work in IE11. Use when IE support is dropped
      // return baseFind('svg textPath[*|href*=' + this.id() + ']')
    }
  }
})

TextPath.prototype.MorphArray = _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__["default"]
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(TextPath, 'TextPath')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tspan)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/textable.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js");








class Tspan extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('tspan', node), attrs)
    this._build = false // disable build mode for adding multiple lines
  }

  // Shortcut dx
  dx(dx) {
    return this.attr('dx', dx)
  }

  // Shortcut dy
  dy(dy) {
    return this.attr('dy', dy)
  }

  // Create new line
  newLine() {
    // mark new line
    this.dom.newLined = true

    // fetch parent
    const text = this.parent()

    // early return in case we are not in a text element
    if (!(text instanceof _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
      return this
    }

    const i = text.index(this)

    const fontSize = _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.window
      .getComputedStyle(this.node)
      .getPropertyValue('font-size')
    const dy = text.dom.leading * new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](fontSize)

    // apply new position
    return this.dy(i ? dy : 0).attr('x', text.x())
  }

  // Set text content
  text(text) {
    if (text == null)
      return this.node.textContent + (this.dom.newLined ? '\n' : '')

    if (typeof text === 'function') {
      this.clear().build(true)
      text.call(this, this)
      this.build(false)
    } else {
      this.plain(text)
    }

    return this
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Tspan, _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_6__)

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)({
  Tspan: {
    tspan: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (text = '') {
      const tspan = new Tspan()

      // clear if build mode is disabled
      if (!this._build) {
        this.clear()
      }

      // add new tspan
      return this.put(tspan).text(text)
    })
  },
  Text: {
    newLine: function (text = '') {
      return this.tspan(text).newLine()
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Tspan, 'Tspan')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Use.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Use.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Use)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");





class Use extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(node, attrs = node) {
    super((0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.nodeOrNew)('use', node), attrs)
  }

  // Use element as a reference
  use(element, file) {
    // Set lined element
    return this.attr('href', (file || '') + '#' + element, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.xlink)
  }
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)({
  Container: {
    // Create a use element
    use: (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.wrapWithAttrCheck)(function (element, file) {
      return this.put(new Use()).use(element, file)
    })
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.register)(Use, 'Use')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/main.js":
/*!***************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/main.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* reexport safe */ _elements_A_js__WEBPACK_IMPORTED_MODULE_57__["default"]),
/* harmony export */   Animator: () => (/* reexport safe */ _animation_Animator_js__WEBPACK_IMPORTED_MODULE_49__["default"]),
/* harmony export */   Array: () => (/* reexport safe */ _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   Box: () => (/* reexport safe */ _types_Box_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Circle: () => (/* reexport safe */ _elements_Circle_js__WEBPACK_IMPORTED_MODULE_53__["default"]),
/* harmony export */   ClipPath: () => (/* reexport safe */ _elements_ClipPath_js__WEBPACK_IMPORTED_MODULE_54__["default"]),
/* harmony export */   Color: () => (/* reexport safe */ _types_Color_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   Container: () => (/* reexport safe */ _elements_Container_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   Controller: () => (/* reexport safe */ _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__.Controller),
/* harmony export */   Defs: () => (/* reexport safe */ _elements_Defs_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   Dom: () => (/* reexport safe */ _elements_Dom_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   Ease: () => (/* reexport safe */ _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__.Ease),
/* harmony export */   Element: () => (/* reexport safe */ _elements_Element_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   Ellipse: () => (/* reexport safe */ _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   EventTarget: () => (/* reexport safe */ _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   ForeignObject: () => (/* reexport safe */ _elements_ForeignObject_js__WEBPACK_IMPORTED_MODULE_55__["default"]),
/* harmony export */   Fragment: () => (/* reexport safe */ _elements_Fragment_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   G: () => (/* reexport safe */ _elements_G_js__WEBPACK_IMPORTED_MODULE_56__["default"]),
/* harmony export */   Gradient: () => (/* reexport safe */ _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   Image: () => (/* reexport safe */ _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   Line: () => (/* reexport safe */ _elements_Line_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   List: () => (/* reexport safe */ _types_List_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   Marker: () => (/* reexport safe */ _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   Mask: () => (/* reexport safe */ _elements_Mask_js__WEBPACK_IMPORTED_MODULE_58__["default"]),
/* harmony export */   Matrix: () => (/* reexport safe */ _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   Morphable: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   NonMorphable: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.NonMorphable),
/* harmony export */   Number: () => (/* reexport safe */ _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   ObjectBag: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.ObjectBag),
/* harmony export */   PID: () => (/* reexport safe */ _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__.PID),
/* harmony export */   Path: () => (/* reexport safe */ _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   PathArray: () => (/* reexport safe */ _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   Pattern: () => (/* reexport safe */ _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   Point: () => (/* reexport safe */ _types_Point_js__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   PointArray: () => (/* reexport safe */ _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   Polygon: () => (/* reexport safe */ _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   Polyline: () => (/* reexport safe */ _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   Queue: () => (/* reexport safe */ _animation_Queue_js__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   Rect: () => (/* reexport safe */ _elements_Rect_js__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   Runner: () => (/* reexport safe */ _animation_Runner_js__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   SVG: () => (/* binding */ SVG),
/* harmony export */   Shape: () => (/* reexport safe */ _elements_Shape_js__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   Spring: () => (/* reexport safe */ _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__.Spring),
/* harmony export */   Stop: () => (/* reexport safe */ _elements_Stop_js__WEBPACK_IMPORTED_MODULE_59__["default"]),
/* harmony export */   Style: () => (/* reexport safe */ _elements_Style_js__WEBPACK_IMPORTED_MODULE_60__["default"]),
/* harmony export */   Svg: () => (/* reexport safe */ _elements_Svg_js__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   Symbol: () => (/* reexport safe */ _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   Text: () => (/* reexport safe */ _elements_Text_js__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   TextPath: () => (/* reexport safe */ _elements_TextPath_js__WEBPACK_IMPORTED_MODULE_61__["default"]),
/* harmony export */   Timeline: () => (/* reexport safe */ _animation_Timeline_js__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   TransformBag: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.TransformBag),
/* harmony export */   Tspan: () => (/* reexport safe */ _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_40__["default"]),
/* harmony export */   Use: () => (/* reexport safe */ _elements_Use_js__WEBPACK_IMPORTED_MODULE_62__["default"]),
/* harmony export */   adopt: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.adopt),
/* harmony export */   assignNewId: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.assignNewId),
/* harmony export */   clearEvents: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.clearEvents),
/* harmony export */   create: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.create),
/* harmony export */   defaults: () => (/* reexport module object */ _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_41__),
/* harmony export */   dispatch: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.dispatch),
/* harmony export */   easing: () => (/* reexport safe */ _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__.easing),
/* harmony export */   eid: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.eid),
/* harmony export */   extend: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend),
/* harmony export */   find: () => (/* reexport safe */ _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_46__["default"]),
/* harmony export */   getClass: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.getClass),
/* harmony export */   getEventTarget: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.getEventTarget),
/* harmony export */   getEvents: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.getEvents),
/* harmony export */   getWindow: () => (/* reexport safe */ _utils_window_js__WEBPACK_IMPORTED_MODULE_48__.getWindow),
/* harmony export */   makeInstance: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.makeInstance),
/* harmony export */   makeMorphable: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.makeMorphable),
/* harmony export */   mockAdopt: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.mockAdopt),
/* harmony export */   namespaces: () => (/* reexport module object */ _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_43__),
/* harmony export */   nodeOrNew: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.nodeOrNew),
/* harmony export */   off: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.off),
/* harmony export */   on: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.on),
/* harmony export */   parser: () => (/* reexport safe */ _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_45__["default"]),
/* harmony export */   regex: () => (/* reexport module object */ _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_44__),
/* harmony export */   register: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.register),
/* harmony export */   registerMorphableType: () => (/* reexport safe */ _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.registerMorphableType),
/* harmony export */   registerWindow: () => (/* reexport safe */ _utils_window_js__WEBPACK_IMPORTED_MODULE_48__.registerWindow),
/* harmony export */   restoreWindow: () => (/* reexport safe */ _utils_window_js__WEBPACK_IMPORTED_MODULE_48__.restoreWindow),
/* harmony export */   root: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.root),
/* harmony export */   saveWindow: () => (/* reexport safe */ _utils_window_js__WEBPACK_IMPORTED_MODULE_48__.saveWindow),
/* harmony export */   utils: () => (/* reexport module object */ _utils_utils_js__WEBPACK_IMPORTED_MODULE_42__),
/* harmony export */   windowEvents: () => (/* reexport safe */ _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__.windowEvents),
/* harmony export */   withWindow: () => (/* reexport safe */ _utils_window_js__WEBPACK_IMPORTED_MODULE_48__.withWindow),
/* harmony export */   wrapWithAttrCheck: () => (/* reexport safe */ _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.wrapWithAttrCheck)
/* harmony export */ });
/* harmony import */ var _modules_optional_arrange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/optional/arrange.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js");
/* harmony import */ var _modules_optional_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/optional/class.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js");
/* harmony import */ var _modules_optional_css_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/optional/css.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js");
/* harmony import */ var _modules_optional_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/optional/data.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js");
/* harmony import */ var _modules_optional_memory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/optional/memory.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js");
/* harmony import */ var _modules_optional_sugar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/optional/sugar.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js");
/* harmony import */ var _modules_optional_transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/optional/transform.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _elements_Container_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./elements/Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _elements_Defs_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./elements/Defs.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js");
/* harmony import */ var _elements_Dom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./elements/Dom.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./elements/Ellipse.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _elements_Fragment_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./elements/Fragment.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Fragment.js");
/* harmony import */ var _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./elements/Gradient.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js");
/* harmony import */ var _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./elements/Image.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Image.js");
/* harmony import */ var _elements_Line_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./elements/Line.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Line.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./elements/Marker.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Marker.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./animation/Morphable.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js");
/* harmony import */ var _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./elements/Path.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./elements/Pattern.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./elements/Polygon.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js");
/* harmony import */ var _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./elements/Polyline.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js");
/* harmony import */ var _elements_Rect_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./elements/Rect.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Rect.js");
/* harmony import */ var _animation_Runner_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./animation/Runner.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Runner.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _elements_Shape_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./elements/Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _elements_Svg_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./elements/Svg.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Svg.js");
/* harmony import */ var _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./elements/Symbol.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js");
/* harmony import */ var _elements_Text_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./elements/Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./elements/Tspan.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js");
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _animation_Animator_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./animation/Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony import */ var _animation_Controller_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./animation/Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony import */ var _animation_Queue_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./animation/Queue.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js");
/* harmony import */ var _animation_Timeline_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./animation/Timeline.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js");
/* harmony import */ var _elements_Circle_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./elements/Circle.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Circle.js");
/* harmony import */ var _elements_ClipPath_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./elements/ClipPath.js */ "./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js");
/* harmony import */ var _elements_ForeignObject_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./elements/ForeignObject.js */ "./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js");
/* harmony import */ var _elements_G_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./elements/G.js */ "./node_modules/@svgdotjs/svg.js/src/elements/G.js");
/* harmony import */ var _elements_A_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./elements/A.js */ "./node_modules/@svgdotjs/svg.js/src/elements/A.js");
/* harmony import */ var _elements_Mask_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./elements/Mask.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Mask.js");
/* harmony import */ var _elements_Stop_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./elements/Stop.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Stop.js");
/* harmony import */ var _elements_Style_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./elements/Style.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Style.js");
/* harmony import */ var _elements_TextPath_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./elements/TextPath.js */ "./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js");
/* harmony import */ var _elements_Use_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./elements/Use.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Use.js");
/* Optional Modules */


















































const SVG = _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.makeInstance






/* Animation Modules */






/* Types */











/* Elements */































;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)([_elements_Svg_js__WEBPACK_IMPORTED_MODULE_37__["default"], _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_38__["default"], _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__["default"], _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__["default"], _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__["default"]], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('viewbox'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)([_elements_Line_js__WEBPACK_IMPORTED_MODULE_20__["default"], _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_31__["default"], _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_30__["default"], _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"]], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('marker'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Text_js__WEBPACK_IMPORTED_MODULE_39__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Text'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Path'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Defs_js__WEBPACK_IMPORTED_MODULE_12__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Defs'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)([_elements_Text_js__WEBPACK_IMPORTED_MODULE_39__["default"], _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_40__["default"]], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Tspan'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)([_elements_Rect_js__WEBPACK_IMPORTED_MODULE_32__["default"], _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_15__["default"], _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__["default"], _animation_Runner_js__WEBPACK_IMPORTED_MODULE_33__["default"]], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('radius'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_types_EventTarget_js__WEBPACK_IMPORTED_MODULE_16__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('EventTarget'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Dom_js__WEBPACK_IMPORTED_MODULE_13__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Dom'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Element_js__WEBPACK_IMPORTED_MODULE_14__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Element'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Shape_js__WEBPACK_IMPORTED_MODULE_36__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Shape'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)([_elements_Container_js__WEBPACK_IMPORTED_MODULE_11__["default"], _elements_Fragment_js__WEBPACK_IMPORTED_MODULE_17__["default"]], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Container'))
;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Gradient'))

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__.extend)(_animation_Runner_js__WEBPACK_IMPORTED_MODULE_33__["default"], (0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodsFor)('Runner'))

_types_List_js__WEBPACK_IMPORTED_MODULE_21__["default"].extend((0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__.getMethodNames)())

;(0,_animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.registerMorphableType)([
  _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_35__["default"],
  _types_Color_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  _types_Box_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_34__["default"],
  _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__["default"],
  _types_Point_js__WEBPACK_IMPORTED_MODULE_29__["default"]
])

;(0,_animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__.makeMorphable)()


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ attr),
/* harmony export */   registerAttrHook: () => (/* binding */ registerAttrHook)
/* harmony export */ });
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");






const colorAttributes = new Set([
  'fill',
  'stroke',
  'color',
  'bgcolor',
  'stop-color',
  'flood-color',
  'lighting-color'
])

const hooks = []
function registerAttrHook(fn) {
  hooks.push(fn)
}

// Set svg element attribute
function attr(attr, val, ns) {
  // act as full getter
  if (attr == null) {
    // get an object of attributes
    attr = {}
    val = this.node.attributes

    for (const node of val) {
      attr[node.nodeName] = _regex_js__WEBPACK_IMPORTED_MODULE_1__.isNumber.test(node.nodeValue)
        ? parseFloat(node.nodeValue)
        : node.nodeValue
    }

    return attr
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce((last, curr) => {
      last[curr] = this.attr(curr)
      return last
    }, {})
  } else if (typeof attr === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) this.attr(val, attr[val])
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr)
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr)
    return val == null
      ? _defaults_js__WEBPACK_IMPORTED_MODULE_0__.attrs[attr]
      : _regex_js__WEBPACK_IMPORTED_MODULE_1__.isNumber.test(val)
        ? parseFloat(val)
        : val
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce((_val, hook) => {
      return hook(attr, _val, this)
    }, val)

    // ensure correct numeric values (also accepts NaN and Infinity)
    if (typeof val === 'number') {
      val = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"](val)
    } else if (colorAttributes.has(attr) && _types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"].isColor(val)) {
      // ensure full hex color
      val = new _types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"](val)
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](val)
    }

    // if the passed attribute is leading...
    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val)
      }
    } else {
      // set given attribute on node
      typeof ns === 'string'
        ? this.node.setAttributeNS(ns, attr, val.toString())
        : this.node.setAttribute(attr, val.toString())
    }

    // rebuild if required
    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild()
    }
  }

  return this
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cx: () => (/* binding */ cx),
/* harmony export */   cy: () => (/* binding */ cy),
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   rx: () => (/* binding */ rx),
/* harmony export */   ry: () => (/* binding */ ry),
/* harmony export */   width: () => (/* binding */ width),
/* harmony export */   x: () => (/* binding */ x),
/* harmony export */   y: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");


// Radius x value
function rx(rx) {
  return this.attr('rx', rx)
}

// Radius y value
function ry(ry) {
  return this.attr('ry', ry)
}

// Move over x-axis
function x(x) {
  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx())
}

// Move over y-axis
function y(y) {
  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry())
}

// Move by center over x-axis
function cx(x) {
  return this.attr('cx', x)
}

// Move by center over y-axis
function cy(y) {
  return this.attr('cy', y)
}

// Set width of element
function width(width) {
  return width == null ? this.rx() * 2 : this.rx(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](width).divide(2))
}

// Set height of element
function height(height) {
  return height == null
    ? this.ry() * 2
    : this.ry(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](height).divide(2))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/containerGeometry.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dmove: () => (/* binding */ dmove),
/* harmony export */   dx: () => (/* binding */ dx),
/* harmony export */   dy: () => (/* binding */ dy),
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   move: () => (/* binding */ move),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   width: () => (/* binding */ width),
/* harmony export */   x: () => (/* binding */ x),
/* harmony export */   y: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");






function dmove(dx, dy) {
  this.children().forEach((child) => {
    let bbox

    // We have to wrap this for elements that dont have a bbox
    // e.g. title and other descriptive elements
    try {
      // Get the childs bbox
      // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1905039
      // Because bbox for nested svgs returns the contents bbox in the coordinate space of the svg itself (weird!), we cant use bbox for svgs
      // Therefore we have to use getBoundingClientRect. But THAT is broken (as explained in the bug).
      // Funnily enough the broken behavior would work for us but that breaks it in chrome
      // So we have to replicate the broken behavior of FF by just reading the attributes of the svg itself
      bbox =
        child.node instanceof (0,_utils_window_js__WEBPACK_IMPORTED_MODULE_4__.getWindow)().SVGSVGElement
          ? new _types_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"](child.attr(['x', 'y', 'width', 'height']))
          : child.bbox()
    } catch (e) {
      return
    }

    // Get childs matrix
    const m = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"](child)
    // Translate childs matrix by amount and
    // transform it back into parents space
    const matrix = m.translate(dx, dy).transform(m.inverse())
    // Calculate new x and y from old box
    const p = new _types_Point_js__WEBPACK_IMPORTED_MODULE_1__["default"](bbox.x, bbox.y).transform(matrix)
    // Move element
    child.move(p.x, p.y)
  })

  return this
}

function dx(dx) {
  return this.dmove(dx, 0)
}

function dy(dy) {
  return this.dmove(0, dy)
}

function height(height, box = this.bbox()) {
  if (height == null) return box.height
  return this.size(box.width, height, box)
}

function move(x = 0, y = 0, box = this.bbox()) {
  const dx = x - box.x
  const dy = y - box.y

  return this.dmove(dx, dy)
}

function size(width, height, box = this.bbox()) {
  const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.proportionalSize)(this, width, height, box)
  const scaleX = p.width / box.width
  const scaleY = p.height / box.height

  this.children().forEach((child) => {
    const o = new _types_Point_js__WEBPACK_IMPORTED_MODULE_1__["default"](box).transform(new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"](child).inverse())
    child.scale(scaleX, scaleY, o.x, o.y)
  })

  return this
}

function width(width, box = this.bbox()) {
  if (width == null) return box.width
  return this.size(width, box.height, box)
}

function x(x, box = this.bbox()) {
  if (x == null) return box.x
  return this.move(x, box.y, box)
}

function y(y, box = this.bbox()) {
  if (y == null) return box.y
  return this.move(box.x, y, box)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attrs: () => (/* binding */ attrs),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   timeline: () => (/* binding */ timeline)
/* harmony export */ });
function noop() {}

// Default animation values
const timeline = {
  duration: 400,
  ease: '>',
  delay: 0
}

// Default attribute values
const attrs = {
  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,

  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,

  // size
  width: 0,
  height: 0,

  // radius
  r: 0,
  rx: 0,
  ry: 0,

  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',

  // text
  'text-anchor': 'start'
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/event.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearEvents: () => (/* binding */ clearEvents),
/* harmony export */   dispatch: () => (/* binding */ dispatch),
/* harmony export */   getEventTarget: () => (/* binding */ getEventTarget),
/* harmony export */   getEvents: () => (/* binding */ getEvents),
/* harmony export */   off: () => (/* binding */ off),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   windowEvents: () => (/* binding */ windowEvents)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");




let listenerId = 0
const windowEvents = {}

function getEvents(instance) {
  let n = instance.getEventHolder()

  // We dont want to save events in global space
  if (n === _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.window) n = windowEvents
  if (!n.events) n.events = {}
  return n.events
}

function getEventTarget(instance) {
  return instance.getEventTarget()
}

function clearEvents(instance) {
  let n = instance.getEventHolder()
  if (n === _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.window) n = windowEvents
  if (n.events) n.events = {}
}

// Add event binder in the SVG namespace
function on(node, events, listener, binding, options) {
  const l = listener.bind(binding || node)
  const instance = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.makeInstance)(node)
  const bag = getEvents(instance)
  const n = getEventTarget(instance)

  // events can be an array of events or a string of events
  events = Array.isArray(events) ? events : events.split(_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter)

  // add id to listener
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId
  }

  events.forEach(function (event) {
    const ev = event.split('.')[0]
    const ns = event.split('.')[1] || '*'

    // ensure valid object
    bag[ev] = bag[ev] || {}
    bag[ev][ns] = bag[ev][ns] || {}

    // reference listener
    bag[ev][ns][listener._svgjsListenerId] = l

    // add listener
    n.addEventListener(ev, l, options || false)
  })
}

// Add event unbinder in the SVG namespace
function off(node, events, listener, options) {
  const instance = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.makeInstance)(node)
  const bag = getEvents(instance)
  const n = getEventTarget(instance)

  // listener can be a function or a number
  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId
    if (!listener) return
  }

  // events can be an array of events or a string or undefined
  events = Array.isArray(events) ? events : (events || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter)

  events.forEach(function (event) {
    const ev = event && event.split('.')[0]
    const ns = event && event.split('.')[1]
    let namespace, l

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(
          ev,
          bag[ev][ns || '*'][listener],
          options || false
        )

        delete bag[ev][ns || '*'][listener]
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join('.'), l)
        }

        delete bag[ev][ns]
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join('.'))
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join('.'))
        }

        delete bag[ev]
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event)
      }

      clearEvents(instance)
    }
  })
}

function dispatch(node, event, data, options) {
  const n = getEventTarget(node)

  // Dispatch event
  if (event instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.window.Event) {
    n.dispatchEvent(event)
  } else {
    event = new _utils_window_js__WEBPACK_IMPORTED_MODULE_2__.globals.window.CustomEvent(event, {
      detail: data,
      cancelable: true,
      ...options
    })
    n.dispatchEvent(event)
  }
  return event
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   from: () => (/* binding */ from),
/* harmony export */   to: () => (/* binding */ to)
/* harmony export */ });
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");


function from(x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ fx: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), fy: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
    : this.attr({ x1: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), y1: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
}

function to(x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ cx: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), cy: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
    : this.attr({ x2: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), y2: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   html: () => (/* binding */ html),
/* harmony export */   svg: () => (/* binding */ svg),
/* harmony export */   xlink: () => (/* binding */ xlink),
/* harmony export */   xmlns: () => (/* binding */ xmlns)
/* harmony export */ });
// Default namespaces
const svg = 'http://www.w3.org/2000/svg'
const html = 'http://www.w3.org/1999/xhtml'
const xmlns = 'http://www.w3.org/2000/xmlns/'
const xlink = 'http://www.w3.org/1999/xlink'


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js":
/*!******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parser)
/* harmony export */ });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");



function parser() {
  // Reuse cached element if possible
  if (!parser.nodes) {
    const svg = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.makeInstance)().size(2, 0)
    svg.node.style.cssText = [
      'opacity: 0',
      'position: absolute',
      'left: -100%',
      'top: -100%',
      'overflow: hidden'
    ].join(';')

    svg.attr('focusable', 'false')
    svg.attr('aria-hidden', 'true')

    const path = svg.path().node

    parser.nodes = { svg, path }
  }

  if (!parser.nodes.svg.node.parentNode) {
    const b = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.document.body || _utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.document.documentElement
    parser.nodes.svg.addTo(b)
  }

  return parser.nodes
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MorphArray: () => (/* binding */ MorphArray),
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   width: () => (/* binding */ width),
/* harmony export */   x: () => (/* binding */ x),
/* harmony export */   y: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");


const MorphArray = _types_PointArray_js__WEBPACK_IMPORTED_MODULE_0__["default"]

// Move by left top corner over x-axis
function x(x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y)
}

// Move by left top corner over y-axis
function y(y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y)
}

// Set width of element
function width(width) {
  const b = this.bbox()
  return width == null ? b.width : this.size(width, b.height)
}

// Set height of element
function height(height) {
  const b = this.bbox()
  return height == null ? b.height : this.size(b.width, height)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   move: () => (/* binding */ move),
/* harmony export */   plot: () => (/* binding */ plot),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");



// Get array
function array() {
  return this._array || (this._array = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.attr('points')))
}

// Clear array cache
function clear() {
  delete this._array
  return this
}

// Move by left top corner
function move(x, y) {
  return this.attr('points', this.array().move(x, y))
}

// Plot new path
function plot(p) {
  return p == null
    ? this.array()
    : this.clear().attr(
        'points',
        typeof p === 'string' ? p : (this._array = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__["default"](p))
      )
}

// Set element size to given width and height
function size(width, height) {
  const p = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.proportionalSize)(this, width, height)
  return this.attr('points', this.array().size(p.width, p.height))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delimiter: () => (/* binding */ delimiter),
/* harmony export */   hex: () => (/* binding */ hex),
/* harmony export */   isBlank: () => (/* binding */ isBlank),
/* harmony export */   isHex: () => (/* binding */ isHex),
/* harmony export */   isImage: () => (/* binding */ isImage),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isPathLetter: () => (/* binding */ isPathLetter),
/* harmony export */   isRgb: () => (/* binding */ isRgb),
/* harmony export */   numberAndUnit: () => (/* binding */ numberAndUnit),
/* harmony export */   reference: () => (/* binding */ reference),
/* harmony export */   rgb: () => (/* binding */ rgb),
/* harmony export */   transforms: () => (/* binding */ transforms),
/* harmony export */   whitespace: () => (/* binding */ whitespace)
/* harmony export */ });
// Parse unit value
const numberAndUnit =
  /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

// Parse hex value
const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

// Parse rgb value
const rgb = /rgb\((\d+),(\d+),(\d+)\)/

// Parse reference id
const reference = /(#[a-z_][a-z0-9\-_]*)/i

// splits a transformation chain
const transforms = /\)\s*,?\s*/

// Whitespace
const whitespace = /\s/g

// Test hex value
const isHex = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i

// Test rgb value
const isRgb = /^rgb\(/

// Test for blank string
const isBlank = /^(\s+)?$/

// Test for numeric string
const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

// Test for image url
const isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

// split at whitespace and comma
const delimiter = /[\s,]+/

// Test for path letter
const isPathLetter = /[MLHVCSQTAZ]/i


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ baseFind),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findOne: () => (/* binding */ findOne)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");





function baseFind(query, parent) {
  return new _types_List_js__WEBPACK_IMPORTED_MODULE_3__["default"](
    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__.map)((parent || _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document).querySelectorAll(query), function (node) {
      return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(node)
    })
  )
}

// Scoped find method
function find(query) {
  return baseFind(query, this.node)
}

function findOne(query) {
  return (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.adopt)(this.node.querySelector(query))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   amove: () => (/* binding */ amove),
/* harmony export */   ax: () => (/* binding */ ax),
/* harmony export */   ay: () => (/* binding */ ay),
/* harmony export */   build: () => (/* binding */ build),
/* harmony export */   center: () => (/* binding */ center),
/* harmony export */   cx: () => (/* binding */ cx),
/* harmony export */   cy: () => (/* binding */ cy),
/* harmony export */   length: () => (/* binding */ length),
/* harmony export */   move: () => (/* binding */ move),
/* harmony export */   plain: () => (/* binding */ plain),
/* harmony export */   x: () => (/* binding */ x),
/* harmony export */   y: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");


// Create plain text node
function plain(text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear()
  }

  // create text node
  this.node.appendChild(_utils_window_js__WEBPACK_IMPORTED_MODULE_0__.globals.document.createTextNode(text))

  return this
}

// Get length of text element
function length() {
  return this.node.getComputedTextLength()
}

// Move over x-axis
// Text is moved by its bounding box
// text-anchor does NOT matter
function x(x, box = this.bbox()) {
  if (x == null) {
    return box.x
  }

  return this.attr('x', this.attr('x') + x - box.x)
}

// Move over y-axis
function y(y, box = this.bbox()) {
  if (y == null) {
    return box.y
  }

  return this.attr('y', this.attr('y') + y - box.y)
}

function move(x, y, box = this.bbox()) {
  return this.x(x, box).y(y, box)
}

// Move center over x-axis
function cx(x, box = this.bbox()) {
  if (x == null) {
    return box.cx
  }

  return this.attr('x', this.attr('x') + x - box.cx)
}

// Move center over y-axis
function cy(y, box = this.bbox()) {
  if (y == null) {
    return box.cy
  }

  return this.attr('y', this.attr('y') + y - box.cy)
}

function center(x, y, box = this.bbox()) {
  return this.cx(x, box).cy(y, box)
}

function ax(x) {
  return this.attr('x', x)
}

function ay(y) {
  return this.attr('y', y)
}

function amove(x, y) {
  return this.ax(x).ay(y)
}

// Enable / disable build mode
function build(build) {
  this._build = !!build
  return this
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   after: () => (/* binding */ after),
/* harmony export */   back: () => (/* binding */ back),
/* harmony export */   backward: () => (/* binding */ backward),
/* harmony export */   before: () => (/* binding */ before),
/* harmony export */   forward: () => (/* binding */ forward),
/* harmony export */   front: () => (/* binding */ front),
/* harmony export */   insertAfter: () => (/* binding */ insertAfter),
/* harmony export */   insertBefore: () => (/* binding */ insertBefore),
/* harmony export */   next: () => (/* binding */ next),
/* harmony export */   position: () => (/* binding */ position),
/* harmony export */   prev: () => (/* binding */ prev),
/* harmony export */   siblings: () => (/* binding */ siblings)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");



// Get all siblings, including myself
function siblings() {
  return this.parent().children()
}

// Get the current position siblings
function position() {
  return this.parent().index(this)
}

// Get the next element (will return null if there is none)
function next() {
  return this.siblings()[this.position() + 1]
}

// Get the next element (will return null if there is none)
function prev() {
  return this.siblings()[this.position() - 1]
}

// Send given element one step forward
function forward() {
  const i = this.position()
  const p = this.parent()

  // move node one step forward
  p.add(this.remove(), i + 1)

  return this
}

// Send given element one step backward
function backward() {
  const i = this.position()
  const p = this.parent()

  p.add(this.remove(), i ? i - 1 : 0)

  return this
}

// Send given element all the way to the front
function front() {
  const p = this.parent()

  // Move node forward
  p.add(this.remove())

  return this
}

// Send given element all the way to the back
function back() {
  const p = this.parent()

  // Move node back
  p.add(this.remove(), 0)

  return this
}

// Inserts a given element before the targeted element
function before(element) {
  element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)
  element.remove()

  const i = this.position()

  this.parent().add(element, i)

  return this
}

// Inserts a given element after the targeted element
function after(element) {
  element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)
  element.remove()

  const i = this.position()

  this.parent().add(element, i + 1)

  return this
}

function insertBefore(element) {
  element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)
  element.before(this)
  return this
}

function insertAfter(element) {
  element = (0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.makeInstance)(element)
  element.after(this)
  return this
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)('Dom', {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   classes: () => (/* binding */ classes),
/* harmony export */   hasClass: () => (/* binding */ hasClass),
/* harmony export */   removeClass: () => (/* binding */ removeClass),
/* harmony export */   toggleClass: () => (/* binding */ toggleClass)
/* harmony export */ });
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");



// Return array of classes on the node
function classes() {
  const attr = this.attr('class')
  return attr == null ? [] : attr.trim().split(_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter)
}

// Return true if class exists on the node, false otherwise
function hasClass(name) {
  return this.classes().indexOf(name) !== -1
}

// Add class to the node
function addClass(name) {
  if (!this.hasClass(name)) {
    const array = this.classes()
    array.push(name)
    this.attr('class', array.join(' '))
  }

  return this
}

// Remove class from the node
function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr(
      'class',
      this.classes()
        .filter(function (c) {
          return c !== name
        })
        .join(' ')
    )
  }

  return this
}

// Toggle the presence of a class on the node
function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)('Dom', {
  classes,
  hasClass,
  addClass,
  removeClass,
  toggleClass
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   show: () => (/* binding */ show),
/* harmony export */   visible: () => (/* binding */ visible)
/* harmony export */ });
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");



// Dynamic style generator
function css(style, val) {
  const ret = {}
  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText
      .split(/\s*;\s*/)
      .filter(function (el) {
        return !!el.length
      })
      .forEach(function (el) {
        const t = el.split(/\s*:\s*/)
        ret[t[0]] = t[1]
      })
    return ret
  }

  if (arguments.length < 2) {
    // get style properties as array
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = name
        ret[name] = this.node.style.getPropertyValue(cased)
      }
      return ret
    }

    // get style for property
    if (typeof style === 'string') {
      return this.node.style.getPropertyValue(style)
    }

    // set styles in object
    if (typeof style === 'object') {
      for (const name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style.setProperty(
          name,
          style[name] == null || _core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isBlank.test(style[name]) ? '' : style[name]
        )
      }
    }
  }

  // set style for property
  if (arguments.length === 2) {
    this.node.style.setProperty(
      style,
      val == null || _core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isBlank.test(val) ? '' : val
    )
  }

  return this
}

// Show element
function show() {
  return this.css('display', '')
}

// Hide element
function hide() {
  return this.css('display', 'none')
}

// Is element visible?
function visible() {
  return this.css('display') !== 'none'
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__.registerMethods)('Dom', {
  css,
  show,
  hide,
  visible
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   data: () => (/* binding */ data)
/* harmony export */ });
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");



// Store data values on svg nodes
function data(a, v, r) {
  if (a == null) {
    // get an object of attributes
    return this.data(
      (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.map)(
        (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.filter)(
          this.node.attributes,
          (el) => el.nodeName.indexOf('data-') === 0
        ),
        (el) => el.nodeName.slice(5)
      )
    )
  } else if (a instanceof Array) {
    const data = {}
    for (const key of a) {
      data[key] = this.data(key)
    }
    return data
  } else if (typeof a === 'object') {
    for (v in a) {
      this.data(v, a[v])
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a))
    } catch (e) {
      return this.attr('data-' + a)
    }
  } else {
    this.attr(
      'data-' + a,
      v === null
        ? null
        : r === true || typeof v === 'string' || typeof v === 'number'
          ? v
          : JSON.stringify(v)
    )
  }

  return this
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)('Dom', { data })


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forget: () => (/* binding */ forget),
/* harmony export */   memory: () => (/* binding */ memory),
/* harmony export */   remember: () => (/* binding */ remember)
/* harmony export */ });
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");


// Remember arbitrary data
function remember(k, v) {
  // remember every item in an object individually
  if (typeof arguments[0] === 'object') {
    for (const key in k) {
      this.remember(key, k[key])
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k]
  } else {
    // store memory
    this.memory()[k] = v
  }

  return this
}

// Erase a given memory
function forget() {
  if (arguments.length === 0) {
    this._memory = {}
  } else {
    for (let i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]]
    }
  }
  return this
}

// This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object
function memory() {
  return (this._memory = this._memory || {})
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)('Dom', { remember, forget, memory })


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");







// Define list of available attributes for stroke and fill
const sugar = {
  stroke: [
    'color',
    'width',
    'opacity',
    'linecap',
    'linejoin',
    'miterlimit',
    'dasharray',
    'dashoffset'
  ],
  fill: ['color', 'opacity', 'rule'],
  prefix: function (t, a) {
    return a === 'color' ? t : t + '-' + a
  }
}

// Add sugar for fill and stroke
;['fill', 'stroke'].forEach(function (m) {
  const extension = {}
  let i

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m)
    }
    if (
      typeof o === 'string' ||
      o instanceof _types_Color_js__WEBPACK_IMPORTED_MODULE_1__["default"] ||
      _types_Color_js__WEBPACK_IMPORTED_MODULE_1__["default"].isRgb(o) ||
      o instanceof _elements_Element_js__WEBPACK_IMPORTED_MODULE_2__["default"]
    ) {
      this.attr(m, o)
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])
        }
      }
    }

    return this
  }

  ;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)(['Element', 'Runner'], extension)
})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)(['Element', 'Runner'], {
  // Let the user set the matrix directly
  matrix: function (mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](this)
    }

    // Act as a setter, the user can pass a matrix or a set of numbers
    return this.attr('transform', new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](mat, b, c, d, e, f))
  },

  // Map rotation to transform
  rotate: function (angle, cx, cy) {
    return this.transform({ rotate: angle, ox: cx, oy: cy }, true)
  },

  // Map skew to transform
  skew: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ skew: x, ox: y, oy: cx }, true)
      : this.transform({ skew: [x, y], ox: cx, oy: cy }, true)
  },

  shear: function (lam, cx, cy) {
    return this.transform({ shear: lam, ox: cx, oy: cy }, true)
  },

  // Map scale to transform
  scale: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ scale: x, ox: y, oy: cx }, true)
      : this.transform({ scale: [x, y], ox: cx, oy: cy }, true)
  },

  // Map translate to transform
  translate: function (x, y) {
    return this.transform({ translate: [x, y] }, true)
  },

  // Map relative translations to transform
  relative: function (x, y) {
    return this.transform({ relative: [x, y] }, true)
  },

  // Map flip to transform
  flip: function (direction = 'both', origin = 'center') {
    if ('xybothtrue'.indexOf(direction) === -1) {
      origin = direction
      direction = 'both'
    }

    return this.transform({ flip: direction, origin: origin }, true)
  },

  // Opacity
  opacity: function (value) {
    return this.attr('opacity', value)
  }
})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)('radius', {
  // Add x and y radius
  radius: function (x, y = x) {
    const type = (this._element || this).type
    return type === 'radialGradient'
      ? this.attr('r', new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_5__["default"](x))
      : this.rx(x).ry(y)
  }
})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)('Path', {
  // Get path length
  length: function () {
    return this.node.getTotalLength()
  },
  // Get point at length
  pointAt: function (length) {
    return new _types_Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.node.getPointAtLength(length))
  }
})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)(['Element', 'Runner'], {
  // Set font
  font: function (a, v) {
    if (typeof a === 'object') {
      for (v in a) this.font(v, a[v])
      return this
    }

    return a === 'leading'
      ? this.leading(v)
      : a === 'anchor'
        ? this.attr('text-anchor', v)
        : a === 'size' ||
            a === 'family' ||
            a === 'weight' ||
            a === 'stretch' ||
            a === 'variant' ||
            a === 'style'
          ? this.attr('font-' + a, v)
          : this.attr(a, v)
  }
})

// Add events to elements
const methods = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchmove',
  'touchleave',
  'touchend',
  'touchcancel',
  'contextmenu',
  'wheel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel'
].reduce(function (last, event) {
  // add event to Element
  const fn = function (f) {
    if (f === null) {
      this.off(event)
    } else {
      this.on(event, f)
    }
    return this
  }

  last[event] = fn
  return last
}, {})

;(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__.registerMethods)('Element', methods)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   matrixify: () => (/* binding */ matrixify),
/* harmony export */   toParent: () => (/* binding */ toParent),
/* harmony export */   toRoot: () => (/* binding */ toRoot),
/* harmony export */   transform: () => (/* binding */ transform),
/* harmony export */   untransform: () => (/* binding */ untransform)
/* harmony export */ });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");





// Reset all transformations
function untransform() {
  return this.attr('transform', null)
}

// merge the whole transformation chain into one matrix and returns it
function matrixify() {
  const matrix = (this.attr('transform') || '')
    // split transformations
    .split(_core_regex_js__WEBPACK_IMPORTED_MODULE_1__.transforms)
    .slice(0, -1)
    .map(function (str) {
      // generate key => value pairs
      const kv = str.trim().split('(')
      return [
        kv[0],
        kv[1].split(_core_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).map(function (str) {
          return parseFloat(str)
        })
      ]
    })
    .reverse()
    // merge every transformation into one matrix
    .reduce(function (matrix, transform) {
      if (transform[0] === 'matrix') {
        return matrix.lmultiply(_types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromArray(transform[1]))
      }
      return matrix[transform[0]].apply(matrix, transform[1])
    }, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"]())

  return matrix
}

// add an element to another parent without changing the visual representation on the screen
function toParent(parent, i) {
  if (this === parent) return this

  if ((0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDescriptive)(this.node)) return this.addTo(parent, i)

  const ctm = this.screenCTM()
  const pCtm = parent.screenCTM().inverse()

  this.addTo(parent, i).untransform().transform(pCtm.multiply(ctm))

  return this
}

// same as above with parent equals root-svg
function toRoot(i) {
  return this.toParent(this.root(), i)
}

// Add transformations
function transform(o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    const decomposed = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](this).decompose()
    return o == null ? decomposed : decomposed[o]
  }

  if (!_types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"].isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = { ...o, origin: (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOrigin)(o, this) }
  }

  // The user can pass a boolean, an Element or an Matrix or nothing
  const cleanRelative = relative === true ? this : relative || false
  const result = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](cleanRelative).transform(o)
  return this.attr('transform', result)
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__.registerMethods)('Element', {
  untransform,
  matrixify,
  toParent,
  toRoot,
  transform
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Base.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Base.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Base)
/* harmony export */ });
class Base {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Box.js":
/*!********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Box.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bbox: () => (/* binding */ bbox),
/* harmony export */   "default": () => (/* binding */ Box),
/* harmony export */   domContains: () => (/* binding */ domContains),
/* harmony export */   inside: () => (/* binding */ inside),
/* harmony export */   isNulledBox: () => (/* binding */ isNulledBox),
/* harmony export */   rbox: () => (/* binding */ rbox)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");








function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y
}

function domContains(node) {
  return (
    node === _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document ||
    (
      _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document.documentElement.contains ||
      function (node) {
        // This is IE - it does not support contains() for top-level SVGs
        while (node.parentNode) {
          node = node.parentNode
        }
        return node === _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document
      }
    ).call(_utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.document.documentElement, node)
  )
}

class Box {
  constructor(...args) {
    this.init(...args)
  }

  addOffset() {
    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
    this.x += _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.window.pageXOffset
    this.y += _utils_window_js__WEBPACK_IMPORTED_MODULE_1__.globals.window.pageYOffset
    return new Box(this)
  }

  init(source) {
    const base = [0, 0, 0, 0]
    source =
      typeof source === 'string'
        ? source.split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter).map(parseFloat)
        : Array.isArray(source)
          ? source
          : typeof source === 'object'
            ? [
                source.left != null ? source.left : source.x,
                source.top != null ? source.top : source.y,
                source.width,
                source.height
              ]
            : arguments.length === 4
              ? [].slice.call(arguments)
              : base

    this.x = source[0] || 0
    this.y = source[1] || 0
    this.width = this.w = source[2] || 0
    this.height = this.h = source[3] || 0

    // Add more bounding box properties
    this.x2 = this.x + this.w
    this.y2 = this.y + this.h
    this.cx = this.x + this.w / 2
    this.cy = this.y + this.h / 2

    return this
  }

  isNulled() {
    return isNulledBox(this)
  }

  // Merge rect box with another, return a new instance
  merge(box) {
    const x = Math.min(this.x, box.x)
    const y = Math.min(this.y, box.y)
    const width = Math.max(this.x + this.width, box.x + box.width) - x
    const height = Math.max(this.y + this.height, box.y + box.height) - y

    return new Box(x, y, width, height)
  }

  toArray() {
    return [this.x, this.y, this.width, this.height]
  }

  toString() {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
  }

  transform(m) {
    if (!(m instanceof _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"])) {
      m = new _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](m)
    }

    let xMin = Infinity
    let xMax = -Infinity
    let yMin = Infinity
    let yMax = -Infinity

    const pts = [
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x2, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x, this.y2),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x2, this.y2)
    ]

    pts.forEach(function (p) {
      p = p.transform(m)
      xMin = Math.min(xMin, p.x)
      xMax = Math.max(xMax, p.x)
      yMin = Math.min(yMin, p.y)
      yMax = Math.max(yMax, p.y)
    })

    return new Box(xMin, yMin, xMax - xMin, yMax - yMin)
  }
}

function getBox(el, getBBoxFn, retry) {
  let box

  try {
    // Try to get the box with the provided function
    box = getBBoxFn(el.node)

    // If the box is worthless and not even in the dom, retry
    // by throwing an error here...
    if (isNulledBox(box) && !domContains(el.node)) {
      throw new Error('Element not in the dom')
    }
  } catch (e) {
    // ... and calling the retry handler here
    box = retry(el)
  }

  return box
}

function bbox() {
  // Function to get bbox is getBBox()
  const getBBox = (node) => node.getBBox()

  // Take all measures so that a stupid browser renders the element
  // so we can get the bbox from it when we try again
  const retry = (el) => {
    try {
      const clone = el.clone().addTo((0,_modules_core_parser_js__WEBPACK_IMPORTED_MODULE_6__["default"])().svg).show()
      const box = clone.node.getBBox()
      clone.remove()
      return box
    } catch (e) {
      // We give up...
      throw new Error(
        `Getting bbox of element "${
          el.node.nodeName
        }" is not possible: ${e.toString()}`
      )
    }
  }

  const box = getBox(this, getBBox, retry)
  const bbox = new Box(box)

  return bbox
}

function rbox(el) {
  const getRBox = (node) => node.getBoundingClientRect()
  const retry = (el) => {
    // There is no point in trying tricks here because if we insert the element into the dom ourselves
    // it obviously will be at the wrong position
    throw new Error(
      `Getting rbox of element "${el.node.nodeName}" is not possible`
    )
  }

  const box = getBox(this, getRBox, retry)
  const rbox = new Box(box)

  // If an element was passed, we want the bbox in the coordinate system of that element
  if (el) {
    return rbox.transform(el.screenCTM().inverseO())
  }

  // Else we want it in absolute screen coordinates
  // Therefore we need to add the scrollOffset
  return rbox.addOffset()
}

// Checks whether the given point is inside the bounding box
function inside(x, y) {
  const box = this.bbox()

  return (
    x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height
  )
}

(0,_utils_methods_js__WEBPACK_IMPORTED_MODULE_3__.registerMethods)({
  viewbox: {
    viewbox(x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox'))

      // act as setter
      return this.attr('viewBox', new Box(x, y, width, height))
    },

    zoom(level, point) {
      // Its best to rely on the attributes here and here is why:
      // clientXYZ: Doesn't work on non-root svgs because they dont have a CSSBox (silly!)
      // getBoundingClientRect: Doesn't work because Chrome just ignores width and height of nested svgs completely
      //                        that means, their clientRect is always as big as the content.
      //                        Furthermore this size is incorrect if the element is further transformed by its parents
      // computedStyle: Only returns meaningful values if css was used with px. We dont go this route here!
      // getBBox: returns the bounding box of its content - that doesn't help!
      let { width, height } = this.attr(['width', 'height'])

      // Width and height is a string when a number with a unit is present which we can't use
      // So we try clientXYZ
      if (
        (!width && !height) ||
        typeof width === 'string' ||
        typeof height === 'string'
      ) {
        width = this.node.clientWidth
        height = this.node.clientHeight
      }

      // Giving up...
      if (!width || !height) {
        throw new Error(
          'Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element'
        )
      }

      const v = this.viewbox()

      const zoomX = width / v.width
      const zoomY = height / v.height
      const zoom = Math.min(zoomX, zoomY)

      if (level == null) {
        return zoom
      }

      let zoomAmount = zoom / level

      // Set the zoomAmount to the highest value which is safe to process and recover from
      // The * 100 is a bit of wiggle room for the matrix transformation
      if (zoomAmount === Infinity) zoomAmount = Number.MAX_SAFE_INTEGER / 100

      point =
        point || new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](width / 2 / zoomX + v.x, height / 2 / zoomY + v.y)

      const box = new Box(v).transform(
        new _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"]({ scale: zoomAmount, origin: point })
      )

      return this.viewbox(box)
    }
  }
})

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.register)(Box, 'Box')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Color.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Color.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Color)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");


function sixDigitHex(hex) {
  return hex.length === 4
    ? [
        '#',
        hex.substring(1, 2),
        hex.substring(1, 2),
        hex.substring(2, 3),
        hex.substring(2, 3),
        hex.substring(3, 4),
        hex.substring(3, 4)
      ].join('')
    : hex
}

function componentHex(component) {
  const integer = Math.round(component)
  const bounded = Math.max(0, Math.min(255, integer))
  const hex = bounded.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function is(object, space) {
  for (let i = space.length; i--; ) {
    if (object[space[i]] == null) {
      return false
    }
  }
  return true
}

function getParameters(a, b) {
  const params = is(a, 'rgb')
    ? { _a: a.r, _b: a.g, _c: a.b, _d: 0, space: 'rgb' }
    : is(a, 'xyz')
      ? { _a: a.x, _b: a.y, _c: a.z, _d: 0, space: 'xyz' }
      : is(a, 'hsl')
        ? { _a: a.h, _b: a.s, _c: a.l, _d: 0, space: 'hsl' }
        : is(a, 'lab')
          ? { _a: a.l, _b: a.a, _c: a.b, _d: 0, space: 'lab' }
          : is(a, 'lch')
            ? { _a: a.l, _b: a.c, _c: a.h, _d: 0, space: 'lch' }
            : is(a, 'cmyk')
              ? { _a: a.c, _b: a.m, _c: a.y, _d: a.k, space: 'cmyk' }
              : { _a: 0, _b: 0, _c: 0, space: 'rgb' }

  params.space = b || params.space
  return params
}

function cieSpace(space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true
  } else {
    return false
  }
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

class Color {
  constructor(...inputs) {
    this.init(...inputs)
  }

  // Test if given value is a color
  static isColor(color) {
    return (
      color && (color instanceof Color || this.isRgb(color) || this.test(color))
    )
  }

  // Test if given value is an rgb object
  static isRgb(color) {
    return (
      color &&
      typeof color.r === 'number' &&
      typeof color.g === 'number' &&
      typeof color.b === 'number'
    )
  }

  /*
  Generating random colors
  */
  static random(mode = 'vibrant', t) {
    // Get the math modules
    const { random, round, sin, PI: pi } = Math

    // Run the correct generator
    if (mode === 'vibrant') {
      const l = (81 - 57) * random() + 57
      const c = (83 - 45) * random() + 45
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color
    } else if (mode === 'sine') {
      t = t == null ? random() : t
      const r = round(80 * sin((2 * pi * t) / 0.5 + 0.01) + 150)
      const g = round(50 * sin((2 * pi * t) / 0.5 + 4.6) + 200)
      const b = round(100 * sin((2 * pi * t) / 0.5 + 2.3) + 150)
      const color = new Color(r, g, b)
      return color
    } else if (mode === 'pastel') {
      const l = (94 - 86) * random() + 86
      const c = (26 - 9) * random() + 9
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color
    } else if (mode === 'dark') {
      const l = 10 + 10 * random()
      const c = (125 - 75) * random() + 86
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color
    } else if (mode === 'rgb') {
      const r = 255 * random()
      const g = 255 * random()
      const b = 255 * random()
      const color = new Color(r, g, b)
      return color
    } else if (mode === 'lab') {
      const l = 100 * random()
      const a = 256 * random() - 128
      const b = 256 * random() - 128
      const color = new Color(l, a, b, 'lab')
      return color
    } else if (mode === 'grey') {
      const grey = 255 * random()
      const color = new Color(grey, grey, grey)
      return color
    } else {
      throw new Error('Unsupported random color mode')
    }
  }

  // Test if given value is a color string
  static test(color) {
    return typeof color === 'string' && (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isHex.test(color) || _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isRgb.test(color))
  }

  cmyk() {
    // Get the rgb values for the current color
    const { _a, _b, _c } = this.rgb()
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255)

    // Get the cmyk values in an unbounded format
    const k = Math.min(1 - r, 1 - g, 1 - b)

    if (k === 1) {
      // Catch the black case
      return new Color(0, 0, 0, 1, 'cmyk')
    }

    const c = (1 - r - k) / (1 - k)
    const m = (1 - g - k) / (1 - k)
    const y = (1 - b - k) / (1 - k)

    // Construct the new color
    const color = new Color(c, m, y, k, 'cmyk')
    return color
  }

  hsl() {
    // Get the rgb values
    const { _a, _b, _c } = this.rgb()
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255)

    // Find the maximum and minimum values to get the lightness
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2

    // If the r, g, v values are identical then we are grey
    const isGrey = max === min

    // Calculate the hue and saturation
    const delta = max - min
    const s = isGrey
      ? 0
      : l > 0.5
        ? delta / (2 - max - min)
        : delta / (max + min)
    const h = isGrey
      ? 0
      : max === r
        ? ((g - b) / delta + (g < b ? 6 : 0)) / 6
        : max === g
          ? ((b - r) / delta + 2) / 6
          : max === b
            ? ((r - g) / delta + 4) / 6
            : 0

    // Construct and return the new color
    const color = new Color(360 * h, 100 * s, 100 * l, 'hsl')
    return color
  }

  init(a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
    // This catches the case when a falsy value is passed like ''
    a = !a ? 0 : a

    // Reset all values in case the init function is rerun with new color space
    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]]
      }
    }

    if (typeof a === 'number') {
      // Allow for the case that we don't need d...
      space = typeof d === 'string' ? d : space
      d = typeof d === 'string' ? 0 : d

      // Assign the values straight to the color
      Object.assign(this, { _a: a, _b: b, _c: c, _d: d, space })
      // If the user gave us an array, make the color from it
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb'
      Object.assign(this, { _a: a[0], _b: a[1], _c: a[2], _d: a[3] || 0 })
    } else if (a instanceof Object) {
      // Set the object up and assign its values directly
      const values = getParameters(a, b)
      Object.assign(this, values)
    } else if (typeof a === 'string') {
      if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isRgb.test(a)) {
        const noWhitespace = a.replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.whitespace, '')
        const [_a, _b, _c] = _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.rgb
          .exec(noWhitespace)
          .slice(1, 4)
          .map((v) => parseInt(v))
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' })
      } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isHex.test(a)) {
        const hexParse = (v) => parseInt(v, 16)
        const [, _a, _b, _c] = _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.hex.exec(sixDigitHex(a)).map(hexParse)
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' })
      } else throw Error("Unsupported string format, can't construct Color")
    }

    // Now add the components as a convenience
    const { _a, _b, _c, _d } = this
    const components =
      this.space === 'rgb'
        ? { r: _a, g: _b, b: _c }
        : this.space === 'xyz'
          ? { x: _a, y: _b, z: _c }
          : this.space === 'hsl'
            ? { h: _a, s: _b, l: _c }
            : this.space === 'lab'
              ? { l: _a, a: _b, b: _c }
              : this.space === 'lch'
                ? { l: _a, c: _b, h: _c }
                : this.space === 'cmyk'
                  ? { c: _a, m: _b, y: _c, k: _d }
                  : {}
    Object.assign(this, components)
  }

  lab() {
    // Get the xyz color
    const { x, y, z } = this.xyz()

    // Get the lab components
    const l = 116 * y - 16
    const a = 500 * (x - y)
    const b = 200 * (y - z)

    // Construct and return a new color
    const color = new Color(l, a, b, 'lab')
    return color
  }

  lch() {
    // Get the lab color directly
    const { l, a, b } = this.lab()

    // Get the chromaticity and the hue using polar coordinates
    const c = Math.sqrt(a ** 2 + b ** 2)
    let h = (180 * Math.atan2(b, a)) / Math.PI
    if (h < 0) {
      h *= -1
      h = 360 - h
    }

    // Make a new color and return it
    const color = new Color(l, c, h, 'lch')
    return color
  }
  /*
  Conversion Methods
  */

  rgb() {
    if (this.space === 'rgb') {
      return this
    } else if (cieSpace(this.space)) {
      // Convert to the xyz color space
      let { x, y, z } = this
      if (this.space === 'lab' || this.space === 'lch') {
        // Get the values in the lab space
        let { l, a, b } = this
        if (this.space === 'lch') {
          const { c, h } = this
          const dToR = Math.PI / 180
          a = c * Math.cos(dToR * h)
          b = c * Math.sin(dToR * h)
        }

        // Undo the nonlinear function
        const yL = (l + 16) / 116
        const xL = a / 500 + yL
        const zL = yL - b / 200

        // Get the xyz values
        const ct = 16 / 116
        const mx = 0.008856
        const nm = 7.787
        x = 0.95047 * (xL ** 3 > mx ? xL ** 3 : (xL - ct) / nm)
        y = 1.0 * (yL ** 3 > mx ? yL ** 3 : (yL - ct) / nm)
        z = 1.08883 * (zL ** 3 > mx ? zL ** 3 : (zL - ct) / nm)
      }

      // Convert xyz to unbounded rgb values
      const rU = x * 3.2406 + y * -1.5372 + z * -0.4986
      const gU = x * -0.9689 + y * 1.8758 + z * 0.0415
      const bU = x * 0.0557 + y * -0.204 + z * 1.057

      // Convert the values to true rgb values
      const pow = Math.pow
      const bd = 0.0031308
      const r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU
      const g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU
      const b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU

      // Make and return the color
      const color = new Color(255 * r, 255 * g, 255 * b)
      return color
    } else if (this.space === 'hsl') {
      // https://bgrins.github.io/TinyColor/docs/tinycolor.html
      // Get the current hsl values
      let { h, s, l } = this
      h /= 360
      s /= 100
      l /= 100

      // If we are grey, then just make the color directly
      if (s === 0) {
        l *= 255
        const color = new Color(l, l, l)
        return color
      }

      // TODO I have no idea what this does :D If you figure it out, tell me!
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      // Get the rgb values
      const r = 255 * hueToRgb(p, q, h + 1 / 3)
      const g = 255 * hueToRgb(p, q, h)
      const b = 255 * hueToRgb(p, q, h - 1 / 3)

      // Make a new color
      const color = new Color(r, g, b)
      return color
    } else if (this.space === 'cmyk') {
      // https://gist.github.com/felipesabino/5066336
      // Get the normalised cmyk values
      const { c, m, y, k } = this

      // Get the rgb values
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k))
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k))
      const b = 255 * (1 - Math.min(1, y * (1 - k) + k))

      // Form the color and return it
      const color = new Color(r, g, b)
      return color
    } else {
      return this
    }
  }

  toArray() {
    const { _a, _b, _c, _d, space } = this
    return [_a, _b, _c, _d, space]
  }

  toHex() {
    const [r, g, b] = this._clamped().map(componentHex)
    return `#${r}${g}${b}`
  }

  toRgb() {
    const [rV, gV, bV] = this._clamped()
    const string = `rgb(${rV},${gV},${bV})`
    return string
  }

  toString() {
    return this.toHex()
  }

  xyz() {
    // Normalise the red, green and blue values
    const { _a: r255, _b: g255, _c: b255 } = this.rgb()
    const [r, g, b] = [r255, g255, b255].map((v) => v / 255)

    // Convert to the lab rgb space
    const rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    const gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    const bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    // Convert to the xyz color space without bounding the values
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.0
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883

    // Get the proper xyz values by applying the bounding
    const x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116
    const y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116
    const z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116

    // Make and return the color
    const color = new Color(x, y, z, 'xyz')
    return color
  }

  /*
  Input and Output methods
  */

  _clamped() {
    const { _a, _b, _c } = this.rgb()
    const { max, min, round } = Math
    const format = (v) => max(0, min(round(v), 255))
    return [_a, _b, _c].map(format)
  }

  /*
  Constructing colors
  */
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventTarget)
/* harmony export */ });
/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base.js */ "./node_modules/@svgdotjs/svg.js/src/types/Base.js");




class EventTarget extends _Base_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  addEventListener() {}

  dispatch(event, data, options) {
    return (0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__.dispatch)(this, event, data, options)
  }

  dispatchEvent(event) {
    const bag = this.getEventHolder().events
    if (!bag) return true

    const events = bag[event.type]

    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event)
      }
    }

    return !event.defaultPrevented
  }

  // Fire given event
  fire(event, data, options) {
    this.dispatch(event, data, options)
    return this
  }

  getEventHolder() {
    return this
  }

  getEventTarget() {
    return this
  }

  // Unbind event from listener
  off(event, listener, options) {
    (0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__.off)(this, event, listener, options)
    return this
  }

  // Bind given event to listener
  on(event, listener, binding, options) {
    (0,_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__.on)(this, event, listener, binding, options)
    return this
  }

  removeEventListener() {}
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__.register)(EventTarget, 'EventTarget')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/List.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/List.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");

// import { subClassArray } from './ArrayPolyfill.js'

class List extends Array {
  constructor(arr = [], ...args) {
    super(arr, ...args)
    if (typeof arr === 'number') return this
    this.length = 0
    this.push(...arr)
  }
}

/* = subClassArray('List', Array, function (arr = []) {
  // This catches the case, that native map tries to create an array with new Array(1)
  if (typeof arr === 'number') return this
  this.length = 0
  this.push(...arr)
}) */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)([List], {
  each(fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === 'function') {
      return this.map((el, i, arr) => {
        return fnOrMethodName.call(el, el, i, arr)
      })
    } else {
      return this.map((el) => {
        return el[fnOrMethodName](...args)
      })
    }
  },

  toArray() {
    return Array.prototype.concat.apply([], this)
  }
})

const reserved = ['toArray', 'constructor', 'each']

List.extend = function (methods) {
  methods = methods.reduce((obj, name) => {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj

    // Don't add private methods
    if (name[0] === '_') return obj

    // Allow access to original Array methods through a prefix
    if (name in Array.prototype) {
      obj['$' + name] = Array.prototype[name]
    }

    // Relay every call to each()
    obj[name] = function (...attrs) {
      return this.each(name, ...attrs)
    }
    return obj
  }, {})

  ;(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__.extend)([List], methods)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Matrix.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ctm: () => (/* binding */ ctm),
/* harmony export */   "default": () => (/* binding */ Matrix),
/* harmony export */   screenCTM: () => (/* binding */ screenCTM)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");






function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6)
}

class Matrix {
  constructor(...args) {
    this.init(...args)
  }

  static formatTransforms(o) {
    // Get all of the parameters required to form the matrix
    const flipBoth = o.flip === 'both' || o.flip === true
    const flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1
    const flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1
    const skewX =
      o.skew && o.skew.length
        ? o.skew[0]
        : isFinite(o.skew)
          ? o.skew
          : isFinite(o.skewX)
            ? o.skewX
            : 0
    const skewY =
      o.skew && o.skew.length
        ? o.skew[1]
        : isFinite(o.skew)
          ? o.skew
          : isFinite(o.skewY)
            ? o.skewY
            : 0
    const scaleX =
      o.scale && o.scale.length
        ? o.scale[0] * flipX
        : isFinite(o.scale)
          ? o.scale * flipX
          : isFinite(o.scaleX)
            ? o.scaleX * flipX
            : flipX
    const scaleY =
      o.scale && o.scale.length
        ? o.scale[1] * flipY
        : isFinite(o.scale)
          ? o.scale * flipY
          : isFinite(o.scaleY)
            ? o.scaleY * flipY
            : flipY
    const shear = o.shear || 0
    const theta = o.rotate || o.theta || 0
    const origin = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      o.origin || o.around || o.ox || o.originX,
      o.oy || o.originY
    )
    const ox = origin.x
    const oy = origin.y
    // We need Point to be invalid if nothing was passed because we cannot default to 0 here. That is why NaN
    const position = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      o.position || o.px || o.positionX || NaN,
      o.py || o.positionY || NaN
    )
    const px = position.x
    const py = position.y
    const translate = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      o.translate || o.tx || o.translateX,
      o.ty || o.translateY
    )
    const tx = translate.x
    const ty = translate.y
    const relative = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      o.relative || o.rx || o.relativeX,
      o.ry || o.relativeY
    )
    const rx = relative.x
    const ry = relative.y

    // Populate all of the values
    return {
      scaleX,
      scaleY,
      skewX,
      skewY,
      shear,
      theta,
      rx,
      ry,
      tx,
      ty,
      ox,
      oy,
      px,
      py
    }
  }

  static fromArray(a) {
    return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
  }

  static isMatrixLike(o) {
    return (
      o.a != null ||
      o.b != null ||
      o.c != null ||
      o.d != null ||
      o.e != null ||
      o.f != null
    )
  }

  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(l, r, o) {
    // Work out the product directly
    const a = l.a * r.a + l.c * r.b
    const b = l.b * r.a + l.d * r.b
    const c = l.a * r.c + l.c * r.d
    const d = l.b * r.c + l.d * r.d
    const e = l.e + l.a * r.e + l.c * r.f
    const f = l.f + l.b * r.e + l.d * r.f

    // make sure to use local variables because l/r and o could be the same
    o.a = a
    o.b = b
    o.c = c
    o.d = d
    o.e = e
    o.f = f

    return o
  }

  around(cx, cy, matrix) {
    return this.clone().aroundO(cx, cy, matrix)
  }

  // Transform around a center point
  aroundO(cx, cy, matrix) {
    const dx = cx || 0
    const dy = cy || 0
    return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy)
  }

  // Clones this matrix
  clone() {
    return new Matrix(this)
  }

  // Decomposes this matrix into its affine parameters
  decompose(cx = 0, cy = 0) {
    // Get the parameters from the matrix
    const a = this.a
    const b = this.b
    const c = this.c
    const d = this.d
    const e = this.e
    const f = this.f

    // Figure out if the winding direction is clockwise or counterclockwise
    const determinant = a * d - b * c
    const ccw = determinant > 0 ? 1 : -1

    // Since we only shear in x, we can use the x basis to get the x scale
    // and the rotation of the resulting matrix
    const sx = ccw * Math.sqrt(a * a + b * b)
    const thetaRad = Math.atan2(ccw * b, ccw * a)
    const theta = (180 / Math.PI) * thetaRad
    const ct = Math.cos(thetaRad)
    const st = Math.sin(thetaRad)

    // We can then solve the y basis vector simultaneously to get the other
    // two affine parameters directly from these parameters
    const lam = (a * c + b * d) / determinant
    const sy = (c * sx) / (lam * a - b) || (d * sx) / (lam * b + a)

    // Use the translations
    const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy)
    const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy)

    // Construct the decomposition and return it
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx,
      originY: cy,

      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  // Check if two matrices are equal
  equals(other) {
    if (other === this) return true
    const comp = new Matrix(other)
    return (
      closeEnough(this.a, comp.a) &&
      closeEnough(this.b, comp.b) &&
      closeEnough(this.c, comp.c) &&
      closeEnough(this.d, comp.d) &&
      closeEnough(this.e, comp.e) &&
      closeEnough(this.f, comp.f)
    )
  }

  // Flip matrix on x or y, at a given offset
  flip(axis, around) {
    return this.clone().flipO(axis, around)
  }

  flipO(axis, around) {
    return axis === 'x'
      ? this.scaleO(-1, 1, around, 0)
      : axis === 'y'
        ? this.scaleO(1, -1, 0, around)
        : this.scaleO(-1, -1, axis, around || axis) // Define an x, y flip point
  }

  // Initialize
  init(source) {
    const base = Matrix.fromArray([1, 0, 0, 1, 0, 0])

    // ensure source as object
    source =
      source instanceof _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__["default"]
        ? source.matrixify()
        : typeof source === 'string'
          ? Matrix.fromArray(source.split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter).map(parseFloat))
          : Array.isArray(source)
            ? Matrix.fromArray(source)
            : typeof source === 'object' && Matrix.isMatrixLike(source)
              ? source
              : typeof source === 'object'
                ? new Matrix().transform(source)
                : arguments.length === 6
                  ? Matrix.fromArray([].slice.call(arguments))
                  : base

    // Merge the source matrix with the base matrix
    this.a = source.a != null ? source.a : base.a
    this.b = source.b != null ? source.b : base.b
    this.c = source.c != null ? source.c : base.c
    this.d = source.d != null ? source.d : base.d
    this.e = source.e != null ? source.e : base.e
    this.f = source.f != null ? source.f : base.f

    return this
  }

  inverse() {
    return this.clone().inverseO()
  }

  // Inverses matrix
  inverseO() {
    // Get the current parameters out of the matrix
    const a = this.a
    const b = this.b
    const c = this.c
    const d = this.d
    const e = this.e
    const f = this.f

    // Invert the 2x2 matrix in the top left
    const det = a * d - b * c
    if (!det) throw new Error('Cannot invert ' + this)

    // Calculate the top 2x2 matrix
    const na = d / det
    const nb = -b / det
    const nc = -c / det
    const nd = a / det

    // Apply the inverted matrix to the top right
    const ne = -(na * e + nc * f)
    const nf = -(nb * e + nd * f)

    // Construct the inverted matrix
    this.a = na
    this.b = nb
    this.c = nc
    this.d = nd
    this.e = ne
    this.f = nf

    return this
  }

  lmultiply(matrix) {
    return this.clone().lmultiplyO(matrix)
  }

  lmultiplyO(matrix) {
    const r = this
    const l = matrix instanceof Matrix ? matrix : new Matrix(matrix)

    return Matrix.matrixMultiply(l, r, this)
  }

  // Left multiplies by the given matrix
  multiply(matrix) {
    return this.clone().multiplyO(matrix)
  }

  multiplyO(matrix) {
    // Get the matrices
    const l = this
    const r = matrix instanceof Matrix ? matrix : new Matrix(matrix)

    return Matrix.matrixMultiply(l, r, this)
  }

  // Rotate matrix
  rotate(r, cx, cy) {
    return this.clone().rotateO(r, cx, cy)
  }

  rotateO(r, cx = 0, cy = 0) {
    // Convert degrees to radians
    r = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.radians)(r)

    const cos = Math.cos(r)
    const sin = Math.sin(r)

    const { a, b, c, d, e, f } = this

    this.a = a * cos - b * sin
    this.b = b * cos + a * sin
    this.c = c * cos - d * sin
    this.d = d * cos + c * sin
    this.e = e * cos - f * sin + cy * sin - cx * cos + cx
    this.f = f * cos + e * sin - cx * sin - cy * cos + cy

    return this
  }

  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments)
  }

  scaleO(x, y = x, cx = 0, cy = 0) {
    // Support uniform scaling
    if (arguments.length === 3) {
      cy = cx
      cx = y
      y = x
    }

    const { a, b, c, d, e, f } = this

    this.a = a * x
    this.b = b * y
    this.c = c * x
    this.d = d * y
    this.e = e * x - cx * x + cx
    this.f = f * y - cy * y + cy

    return this
  }

  // Shear matrix
  shear(a, cx, cy) {
    return this.clone().shearO(a, cx, cy)
  }

  // eslint-disable-next-line no-unused-vars
  shearO(lx, cx = 0, cy = 0) {
    const { a, b, c, d, e, f } = this

    this.a = a + b * lx
    this.c = c + d * lx
    this.e = e + f * lx - cy * lx

    return this
  }

  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments)
  }

  skewO(x, y = x, cx = 0, cy = 0) {
    // support uniformal skew
    if (arguments.length === 3) {
      cy = cx
      cx = y
      y = x
    }

    // Convert degrees to radians
    x = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.radians)(x)
    y = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.radians)(y)

    const lx = Math.tan(x)
    const ly = Math.tan(y)

    const { a, b, c, d, e, f } = this

    this.a = a + b * lx
    this.b = b + a * ly
    this.c = c + d * lx
    this.d = d + c * ly
    this.e = e + f * lx - cy * lx
    this.f = f + e * ly - cx * ly

    return this
  }

  // SkewX
  skewX(x, cx, cy) {
    return this.skew(x, 0, cx, cy)
  }

  // SkewY
  skewY(y, cx, cy) {
    return this.skew(0, y, cx, cy)
  }

  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f]
  }

  // Convert matrix to string
  toString() {
    return (
      'matrix(' +
      this.a +
      ',' +
      this.b +
      ',' +
      this.c +
      ',' +
      this.d +
      ',' +
      this.e +
      ',' +
      this.f +
      ')'
    )
  }

  // Transform a matrix into another matrix by manipulating the space
  transform(o) {
    // Check if o is a matrix and then left multiply it directly
    if (Matrix.isMatrixLike(o)) {
      const matrix = new Matrix(o)
      return matrix.multiplyO(this)
    }

    // Get the proposed transformations and the current transformations
    const t = Matrix.formatTransforms(o)
    const current = this
    const { x: ox, y: oy } = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](t.ox, t.oy).transform(current)

    // Construct the resulting matrix
    const transformer = new Matrix()
      .translateO(t.rx, t.ry)
      .lmultiplyO(current)
      .translateO(-ox, -oy)
      .scaleO(t.scaleX, t.scaleY)
      .skewO(t.skewX, t.skewY)
      .shearO(t.shear)
      .rotateO(t.theta)
      .translateO(ox, oy)

    // If we want the origin at a particular place, we force it there
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](ox, oy).transform(transformer)
      // TODO: Replace t.px with isFinite(t.px)
      // Doesn't work because t.px is also 0 if it wasn't passed
      const dx = isFinite(t.px) ? t.px - origin.x : 0
      const dy = isFinite(t.py) ? t.py - origin.y : 0
      transformer.translateO(dx, dy)
    }

    // Translate now after positioning
    transformer.translateO(t.tx, t.ty)
    return transformer
  }

  // Translate matrix
  translate(x, y) {
    return this.clone().translateO(x, y)
  }

  translateO(x, y) {
    this.e += x || 0
    this.f += y || 0
    return this
  }

  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }
}

function ctm() {
  return new Matrix(this.node.getCTM())
}

function screenCTM() {
  try {
    /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
       This is needed because FF does not return the transformation matrix
       for the inner coordinate system when getScreenCTM() is called on nested svgs.
       However all other Browsers do that */
    if (typeof this.isRoot === 'function' && !this.isRoot()) {
      const rect = this.rect(1, 1)
      const m = rect.node.getScreenCTM()
      rect.remove()
      return new Matrix(m)
    }
    return new Matrix(this.node.getScreenCTM())
  } catch (e) {
    console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    )
    return new Matrix()
  }
}

(0,_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__.register)(Matrix, 'Matrix')


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/PathArray.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PathArray)
/* harmony export */ });
/* harmony import */ var _SVGArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");
/* harmony import */ var _Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _utils_pathParser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/pathParser.js */ "./node_modules/@svgdotjs/svg.js/src/utils/pathParser.js");





function arrayToString(a) {
  let s = ''
  for (let i = 0, il = a.length; i < il; i++) {
    s += a[i][0]

    if (a[i][1] != null) {
      s += a[i][1]

      if (a[i][2] != null) {
        s += ' '
        s += a[i][2]

        if (a[i][3] != null) {
          s += ' '
          s += a[i][3]
          s += ' '
          s += a[i][4]

          if (a[i][5] != null) {
            s += ' '
            s += a[i][5]
            s += ' '
            s += a[i][6]

            if (a[i][7] != null) {
              s += ' '
              s += a[i][7]
            }
          }
        }
      }
    }
  }

  return s + ' '
}

class PathArray extends _SVGArray_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  // Get bounding box of path
  bbox() {
    (0,_modules_core_parser_js__WEBPACK_IMPORTED_MODULE_1__["default"])().path.setAttribute('d', this.toString())
    return new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"](_modules_core_parser_js__WEBPACK_IMPORTED_MODULE_1__["default"].nodes.path.getBBox())
  }

  // Move path string
  move(x, y) {
    // get bounding box of current situation
    const box = this.bbox()

    // get relative offset
    x -= box.x
    y -= box.y

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (let l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0]

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x
          this[i][2] += y
        } else if (l === 'H') {
          this[i][1] += x
        } else if (l === 'V') {
          this[i][1] += y
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x
          this[i][2] += y
          this[i][3] += x
          this[i][4] += y

          if (l === 'C') {
            this[i][5] += x
            this[i][6] += y
          }
        } else if (l === 'A') {
          this[i][6] += x
          this[i][7] += y
        }
      }
    }

    return this
  }

  // Absolutize and parse path to array
  parse(d = 'M0 0') {
    if (Array.isArray(d)) {
      d = Array.prototype.concat.apply([], d).toString()
    }

    return (0,_utils_pathParser_js__WEBPACK_IMPORTED_MODULE_3__.pathParser)(d)
  }

  // Resize path string
  size(width, height) {
    // get bounding box of current situation
    const box = this.bbox()
    let i, l

    // If the box width or height is 0 then we ignore
    // transformations on the respective axis
    box.width = box.width === 0 ? 1 : box.width
    box.height = box.height === 0 ? 1 : box.height

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0]

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y
      } else if (l === 'H') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
      } else if (l === 'V') {
        this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y
        this[i][3] = ((this[i][3] - box.x) * width) / box.width + box.x
        this[i][4] = ((this[i][4] - box.y) * height) / box.height + box.y

        if (l === 'C') {
          this[i][5] = ((this[i][5] - box.x) * width) / box.width + box.x
          this[i][6] = ((this[i][6] - box.y) * height) / box.height + box.y
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = (this[i][1] * width) / box.width
        this[i][2] = (this[i][2] * height) / box.height

        // move position values
        this[i][6] = ((this[i][6] - box.x) * width) / box.width + box.x
        this[i][7] = ((this[i][7] - box.y) * height) / box.height + box.y
      }
    }

    return this
  }

  // Convert array to string
  toString() {
    return arrayToString(this)
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Point.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Point.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Point),
/* harmony export */   point: () => (/* binding */ point)
/* harmony export */ });
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");


class Point {
  // Initialize
  constructor(...args) {
    this.init(...args)
  }

  // Clone point
  clone() {
    return new Point(this)
  }

  init(x, y) {
    const base = { x: 0, y: 0 }

    // ensure source as object
    const source = Array.isArray(x)
      ? { x: x[0], y: x[1] }
      : typeof x === 'object'
        ? { x: x.x, y: x.y }
        : { x: x, y: y }

    // merge source
    this.x = source.x == null ? base.x : source.x
    this.y = source.y == null ? base.y : source.y

    return this
  }

  toArray() {
    return [this.x, this.y]
  }

  transform(m) {
    return this.clone().transformO(m)
  }

  // Transform point with matrix
  transformO(m) {
    if (!_Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMatrixLike(m)) {
      m = new _Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"](m)
    }

    const { x, y } = this

    // Perform the matrix multiplication
    this.x = m.a * x + m.c * y + m.e
    this.y = m.b * x + m.d * y + m.f

    return this
  }
}

function point(x, y) {
  return new Point(x, y).transformO(this.screenCTM().inverseO())
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/PointArray.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointArray)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _SVGArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");





class PointArray extends _SVGArray_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  // Get bounding box of points
  bbox() {
    let maxX = -Infinity
    let maxY = -Infinity
    let minX = Infinity
    let minY = Infinity
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX)
      maxY = Math.max(el[1], maxY)
      minX = Math.min(el[0], minX)
      minY = Math.min(el[1], minY)
    })
    return new _Box_js__WEBPACK_IMPORTED_MODULE_2__["default"](minX, minY, maxX - minX, maxY - minY)
  }

  // Move point string
  move(x, y) {
    const box = this.bbox()

    // get relative offset
    x -= box.x
    y -= box.y

    // move every point
    if (!isNaN(x) && !isNaN(y)) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x, this[i][1] + y]
      }
    }

    return this
  }

  // Parse point string and flat array
  parse(array = [0, 0]) {
    const points = []

    // if it is an array, we flatten it and therefore clone it to 1 depths
    if (array instanceof Array) {
      array = Array.prototype.concat.apply([], array)
    } else {
      // Else, it is considered as a string
      // parse points
      array = array.trim().split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter).map(parseFloat)
    }

    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
    if (array.length % 2 !== 0) array.pop()

    // wrap points in two-tuples
    for (let i = 0, len = array.length; i < len; i = i + 2) {
      points.push([array[i], array[i + 1]])
    }

    return points
  }

  // Resize poly string
  size(width, height) {
    let i
    const box = this.bbox()

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width)
        this[i][0] = ((this[i][0] - box.x) * width) / box.width + box.x
      if (box.height)
        this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y
    }

    return this
  }

  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    }
  }

  // Convert array to string
  toString() {
    const array = []
    // convert to a poly point string
    for (let i = 0, il = this.length; i < il; i++) {
      array.push(this[i].join(','))
    }

    return array.join(' ')
  }

  transform(m) {
    return this.clone().transformO(m)
  }

  // transform points with matrix (similar to Point.transform)
  transformO(m) {
    if (!_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"].isMatrixLike(m)) {
      m = new _Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](m)
    }

    for (let i = this.length; i--; ) {
      // Perform the matrix multiplication
      const [x, y] = this[i]
      this[i][0] = m.a * x + m.c * y + m.e
      this[i][1] = m.b * x + m.d * y + m.f
    }

    return this
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SVGArray)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");


class SVGArray extends Array {
  constructor(...args) {
    super(...args)
    this.init(...args)
  }

  clone() {
    return new this.constructor(this)
  }

  init(arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this
    this.length = 0
    this.push(...this.parse(arr))
    return this
  }

  // Parse whitespace separated string
  parse(array = []) {
    // If already is an array, no need to parse it
    if (array instanceof Array) return array

    return array.trim().split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter).map(parseFloat)
  }

  toArray() {
    return Array.prototype.concat.apply([], this)
  }

  toSet() {
    return new Set(this)
  }

  toString() {
    return this.join(' ')
  }

  // Flattens the array if needed
  valueOf() {
    const ret = []
    ret.push(...this)
    return ret
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SVGNumber)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");


// Module for unit conversions
class SVGNumber {
  // Initialize
  constructor(...args) {
    this.init(...args)
  }

  convert(unit) {
    return new SVGNumber(this.value, unit)
  }

  // Divide number
  divide(number) {
    number = new SVGNumber(number)
    return new SVGNumber(this / number, this.unit || number.unit)
  }

  init(value, unit) {
    unit = Array.isArray(value) ? value[1] : unit
    value = Array.isArray(value) ? value[0] : value

    // initialize defaults
    this.value = 0
    this.unit = unit || ''

    // parse value
    if (typeof value === 'number') {
      // ensure a valid numeric value
      this.value = isNaN(value)
        ? 0
        : !isFinite(value)
          ? value < 0
            ? -3.4e38
            : +3.4e38
          : value
    } else if (typeof value === 'string') {
      unit = value.match(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.numberAndUnit)

      if (unit) {
        // make value numeric
        this.value = parseFloat(unit[1])

        // normalize
        if (unit[5] === '%') {
          this.value /= 100
        } else if (unit[5] === 's') {
          this.value *= 1000
        }

        // store unit
        this.unit = unit[5]
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf()
        this.unit = value.unit
      }
    }

    return this
  }

  // Subtract number
  minus(number) {
    number = new SVGNumber(number)
    return new SVGNumber(this - number, this.unit || number.unit)
  }

  // Add number
  plus(number) {
    number = new SVGNumber(number)
    return new SVGNumber(this + number, this.unit || number.unit)
  }

  // Multiply number
  times(number) {
    number = new SVGNumber(number)
    return new SVGNumber(this * number, this.unit || number.unit)
  }

  toArray() {
    return [this.value, this.unit]
  }

  toJSON() {
    return this.toString()
  }

  toString() {
    return (
      (this.unit === '%'
        ? ~~(this.value * 1e8) / 1e6
        : this.unit === 's'
          ? this.value / 1e3
          : this.value) + this.unit
    )
  }

  valueOf() {
    return this.value
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/adopter.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adopt: () => (/* binding */ adopt),
/* harmony export */   assignNewId: () => (/* binding */ assignNewId),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   eid: () => (/* binding */ eid),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   getClass: () => (/* binding */ getClass),
/* harmony export */   makeInstance: () => (/* binding */ makeInstance),
/* harmony export */   mockAdopt: () => (/* binding */ mockAdopt),
/* harmony export */   nodeOrNew: () => (/* binding */ nodeOrNew),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   root: () => (/* binding */ root),
/* harmony export */   wrapWithAttrCheck: () => (/* binding */ wrapWithAttrCheck)
/* harmony export */ });
/* harmony import */ var _methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _types_Base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Base.js */ "./node_modules/@svgdotjs/svg.js/src/types/Base.js");






const elements = {}
const root = '___SYMBOL___ROOT___'

// Method for element creation
function create(name, ns = _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.svg) {
  // create element
  return _utils_window_js__WEBPACK_IMPORTED_MODULE_3__.globals.document.createElementNS(ns, name)
}

function makeInstance(element, isHTML = false) {
  if (element instanceof _types_Base_js__WEBPACK_IMPORTED_MODULE_4__["default"]) return element

  if (typeof element === 'object') {
    return adopter(element)
  }

  if (element == null) {
    return new elements[root]()
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(_utils_window_js__WEBPACK_IMPORTED_MODULE_3__.globals.document.querySelector(element))
  }

  // Make sure, that HTML elements are created with the correct namespace
  const wrapper = isHTML ? _utils_window_js__WEBPACK_IMPORTED_MODULE_3__.globals.document.createElement('div') : create('svg')
  wrapper.innerHTML = element

  // We can use firstChild here because we know,
  // that the first char is < and thus an element
  element = adopter(wrapper.firstChild)

  // make sure, that element doesn't have its wrapper attached
  wrapper.removeChild(wrapper.firstChild)
  return element
}

function nodeOrNew(name, node) {
  return node &&
    (node instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_3__.globals.window.Node ||
      (node.ownerDocument &&
        node instanceof node.ownerDocument.defaultView.Node))
    ? node
    : create(name)
}

// Adopt existing svg elements
function adopt(node) {
  // check for presence of node
  if (!node) return null

  // make sure a node isn't already adopted
  if (node.instance instanceof _types_Base_js__WEBPACK_IMPORTED_MODULE_4__["default"]) return node.instance

  if (node.nodeName === '#document-fragment') {
    return new elements.Fragment(node)
  }

  // initialize variables
  let className = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.capitalize)(node.nodeName || 'Dom')

  // Make sure that gradients are adopted correctly
  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient'

    // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom'
  }

  return new elements[className](node)
}

let adopter = adopt

function mockAdopt(mock = adopt) {
  adopter = mock
}

function register(element, name = element.name, asRoot = false) {
  elements[name] = element
  if (asRoot) elements[root] = element

  ;(0,_methods_js__WEBPACK_IMPORTED_MODULE_0__.addMethodNames)(Object.getOwnPropertyNames(element.prototype))

  return element
}

function getClass(name) {
  return elements[name]
}

// Element id sequence
let did = 1000

// Get next named element id
function eid(name) {
  return 'Svgjs' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.capitalize)(name) + did++
}

// Deep new id assignment
function assignNewId(node) {
  // do the same for SVG child nodes as well
  for (let i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i])
  }

  if (node.id) {
    node.id = eid(node.nodeName)
    return node
  }

  return node
}

// Method for extending objects
function extend(modules, methods) {
  let key, i

  modules = Array.isArray(modules) ? modules : [modules]

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      modules[i].prototype[key] = methods[key]
    }
  }
}

function wrapWithAttrCheck(fn) {
  return function (...args) {
    const o = args[args.length - 1]

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o)
    } else {
      return fn.apply(this, args)
    }
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/methods.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMethodNames: () => (/* binding */ addMethodNames),
/* harmony export */   getMethodNames: () => (/* binding */ getMethodNames),
/* harmony export */   getMethodsFor: () => (/* binding */ getMethodsFor),
/* harmony export */   registerMethods: () => (/* binding */ registerMethods)
/* harmony export */ });
const methods = {}
const names = []

function registerMethods(name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m)
    }
    return
  }

  if (typeof name === 'object') {
    for (const _name in name) {
      registerMethods(_name, name[_name])
    }
    return
  }

  addMethodNames(Object.getOwnPropertyNames(m))
  methods[name] = Object.assign(methods[name] || {}, m)
}

function getMethodsFor(name) {
  return methods[name] || {}
}

function getMethodNames() {
  return [...new Set(names)]
}

function addMethodNames(_names) {
  names.push(..._names)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/pathParser.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/pathParser.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pathParser: () => (/* binding */ pathParser)
/* harmony export */ });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");



const segmentParameters = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
}

const pathHandlers = {
  M: function (c, p, p0) {
    p.x = p0.x = c[0]
    p.y = p0.y = c[1]

    return ['M', p.x, p.y]
  },
  L: function (c, p) {
    p.x = c[0]
    p.y = c[1]
    return ['L', c[0], c[1]]
  },
  H: function (c, p) {
    p.x = c[0]
    return ['H', c[0]]
  },
  V: function (c, p) {
    p.y = c[0]
    return ['V', c[0]]
  },
  C: function (c, p) {
    p.x = c[4]
    p.y = c[5]
    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]]
  },
  S: function (c, p) {
    p.x = c[2]
    p.y = c[3]
    return ['S', c[0], c[1], c[2], c[3]]
  },
  Q: function (c, p) {
    p.x = c[2]
    p.y = c[3]
    return ['Q', c[0], c[1], c[2], c[3]]
  },
  T: function (c, p) {
    p.x = c[0]
    p.y = c[1]
    return ['T', c[0], c[1]]
  },
  Z: function (c, p, p0) {
    p.x = p0.x
    p.y = p0.y
    return ['Z']
  },
  A: function (c, p) {
    p.x = c[5]
    p.y = c[6]
    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]]
  }
}

const mlhvqtcsaz = 'mlhvqtcsaz'.split('')

for (let i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = (function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x
      else if (i === 'V') c[0] = c[0] + p.y
      else if (i === 'A') {
        c[5] = c[5] + p.x
        c[6] = c[6] + p.y
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x)
        }
      }

      return pathHandlers[i](c, p, p0)
    }
  })(mlhvqtcsaz[i].toUpperCase())
}

function makeAbsolut(parser) {
  const command = parser.segment[0]
  return pathHandlers[command](parser.segment.slice(1), parser.p, parser.p0)
}

function segmentComplete(parser) {
  return (
    parser.segment.length &&
    parser.segment.length - 1 ===
      segmentParameters[parser.segment[0].toUpperCase()]
  )
}

function startNewSegment(parser, token) {
  parser.inNumber && finalizeNumber(parser, false)
  const pathLetter = _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isPathLetter.test(token)

  if (pathLetter) {
    parser.segment = [token]
  } else {
    const lastCommand = parser.lastCommand
    const small = lastCommand.toLowerCase()
    const isSmall = lastCommand === small
    parser.segment = [small === 'm' ? (isSmall ? 'l' : 'L') : lastCommand]
  }

  parser.inSegment = true
  parser.lastCommand = parser.segment[0]

  return pathLetter
}

function finalizeNumber(parser, inNumber) {
  if (!parser.inNumber) throw new Error('Parser Error')
  parser.number && parser.segment.push(parseFloat(parser.number))
  parser.inNumber = inNumber
  parser.number = ''
  parser.pointSeen = false
  parser.hasExponent = false

  if (segmentComplete(parser)) {
    finalizeSegment(parser)
  }
}

function finalizeSegment(parser) {
  parser.inSegment = false
  if (parser.absolute) {
    parser.segment = makeAbsolut(parser)
  }
  parser.segments.push(parser.segment)
}

function isArcFlag(parser) {
  if (!parser.segment.length) return false
  const isArc = parser.segment[0].toUpperCase() === 'A'
  const length = parser.segment.length

  return isArc && (length === 4 || length === 5)
}

function isExponential(parser) {
  return parser.lastToken.toUpperCase() === 'E'
}

const pathDelimiters = new Set([' ', ',', '\t', '\n', '\r', '\f'])
function pathParser(d, toAbsolute = true) {
  let index = 0
  let token = ''
  const parser = {
    segment: [],
    inNumber: false,
    number: '',
    lastToken: '',
    inSegment: false,
    segments: [],
    pointSeen: false,
    hasExponent: false,
    absolute: toAbsolute,
    p0: new _types_Point_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
    p: new _types_Point_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
  }

  while (((parser.lastToken = token), (token = d.charAt(index++)))) {
    if (!parser.inSegment) {
      if (startNewSegment(parser, token)) {
        continue
      }
    }

    if (token === '.') {
      if (parser.pointSeen || parser.hasExponent) {
        finalizeNumber(parser, false)
        --index
        continue
      }
      parser.inNumber = true
      parser.pointSeen = true
      parser.number += token
      continue
    }

    if (!isNaN(parseInt(token))) {
      if (parser.number === '0' || isArcFlag(parser)) {
        parser.inNumber = true
        parser.number = token
        finalizeNumber(parser, true)
        continue
      }

      parser.inNumber = true
      parser.number += token
      continue
    }

    if (pathDelimiters.has(token)) {
      if (parser.inNumber) {
        finalizeNumber(parser, false)
      }
      continue
    }

    if (token === '-' || token === '+') {
      if (parser.inNumber && !isExponential(parser)) {
        finalizeNumber(parser, false)
        --index
        continue
      }
      parser.number += token
      parser.inNumber = true
      continue
    }

    if (token.toUpperCase() === 'E') {
      parser.number += token
      parser.hasExponent = true
      continue
    }

    if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__.isPathLetter.test(token)) {
      if (parser.inNumber) {
        finalizeNumber(parser, false)
      } else if (!segmentComplete(parser)) {
        throw new Error('parser Error')
      } else {
        finalizeSegment(parser)
      }
      --index
    }
  }

  if (parser.inNumber) {
    finalizeNumber(parser, false)
  }

  if (parser.inSegment && segmentComplete(parser)) {
    finalizeSegment(parser)
  }

  return parser.segments
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   getOrigin: () => (/* binding */ getOrigin),
/* harmony export */   isDescriptive: () => (/* binding */ isDescriptive),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   proportionalSize: () => (/* binding */ proportionalSize),
/* harmony export */   radians: () => (/* binding */ radians),
/* harmony export */   unCamelCase: () => (/* binding */ unCamelCase),
/* harmony export */   writeDataToDom: () => (/* binding */ writeDataToDom)
/* harmony export */ });
// Map function
function map(array, block) {
  let i
  const il = array.length
  const result = []

  for (i = 0; i < il; i++) {
    result.push(block(array[i]))
  }

  return result
}

// Filter function
function filter(array, block) {
  let i
  const il = array.length
  const result = []

  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i])
    }
  }

  return result
}

// Degrees to radians
function radians(d) {
  return ((d % 360) * Math.PI) / 180
}

// Radians to degrees
function degrees(r) {
  return ((r * 180) / Math.PI) % 360
}

// Convert camel cased string to dash separated
function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase()
  })
}

// Capitalize first letter of a string
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Calculate proportional width and height values when necessary
function proportionalSize(element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox()

    if (width == null) {
      width = (box.width / box.height) * height
    } else if (height == null) {
      height = (box.height / box.width) * width
    }
  }

  return {
    width: width,
    height: height
  }
}

/**
 * This function adds support for string origins.
 * It searches for an origin in o.origin o.ox and o.originX.
 * This way, origin: {x: 'center', y: 50} can be passed as well as ox: 'center', oy: 50
 **/
function getOrigin(o, element) {
  const origin = o.origin
  // First check if origin is in ox or originX
  let ox = o.ox != null ? o.ox : o.originX != null ? o.originX : 'center'
  let oy = o.oy != null ? o.oy : o.originY != null ? o.originY : 'center'

  // Then check if origin was used and overwrite in that case
  if (origin != null) {
    ;[ox, oy] = Array.isArray(origin)
      ? origin
      : typeof origin === 'object'
        ? [origin.x, origin.y]
        : [origin, origin]
  }

  // Make sure to only call bbox when actually needed
  const condX = typeof ox === 'string'
  const condY = typeof oy === 'string'
  if (condX || condY) {
    const { height, width, x, y } = element.bbox()

    // And only overwrite if string was passed for this specific axis
    if (condX) {
      ox = ox.includes('left')
        ? x
        : ox.includes('right')
          ? x + width
          : x + width / 2
    }

    if (condY) {
      oy = oy.includes('top')
        ? y
        : oy.includes('bottom')
          ? y + height
          : y + height / 2
    }
  }

  // Return the origin as it is if it wasn't a string
  return [ox, oy]
}

const descriptiveElements = new Set(['desc', 'metadata', 'title'])
const isDescriptive = (element) =>
  descriptiveElements.has(element.nodeName)

const writeDataToDom = (element, data, defaults = {}) => {
  const cloned = { ...data }

  for (const key in cloned) {
    if (cloned[key].valueOf() === defaults[key]) {
      delete cloned[key]
    }
  }

  if (Object.keys(cloned).length) {
    element.node.setAttribute('data-svgjs', JSON.stringify(cloned)) // see #428
  } else {
    element.node.removeAttribute('data-svgjs')
    element.node.removeAttribute('svgjs:data')
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/window.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/window.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   globals: () => (/* binding */ globals),
/* harmony export */   registerWindow: () => (/* binding */ registerWindow),
/* harmony export */   restoreWindow: () => (/* binding */ restoreWindow),
/* harmony export */   saveWindow: () => (/* binding */ saveWindow),
/* harmony export */   withWindow: () => (/* binding */ withWindow)
/* harmony export */ });
const globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
}

function registerWindow(win = null, doc = null) {
  globals.window = win
  globals.document = doc
}

const save = {}

function saveWindow() {
  save.window = globals.window
  save.document = globals.document
}

function restoreWindow() {
  globals.window = save.window
  globals.document = save.document
}

function withWindow(win, fn) {
  saveWindow()
  registerWindow(win, win.document)
  fn(win, win.document)
  restoreWindow()
}

function getWindow() {
  return globals.window
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/prioqueues.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heaps_BinaryHeap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/heaps/BinaryHeap */ "./src/heaps/BinaryHeap.ts");
/* harmony import */ var _algorithm_controls_prioqueue_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./algorithm-controls/prioqueue-algorithm-controls */ "./src/algorithm-controls/prioqueue-algorithm-controls.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");



const PRIOQUEUE_CLASSES = {
    BinaryHeap: _heaps_BinaryHeap__WEBPACK_IMPORTED_MODULE_0__.BinaryHeap,
};
const { engine, isBaseEngine } = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.initialiseEngine)("#prioqueuesContainer", PRIOQUEUE_CLASSES);
if (!isBaseEngine) {
    engine.algorithmControls = new _algorithm_controls_prioqueue_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__.PrioQueueAlgorithmControl(engine.container, engine);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcHJpb3F1ZXVlcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFFbkMsTUFBTSxzQkFBc0I7SUFHL0IsWUFBWSxTQUFzQjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsdURBQWEsQ0FDbEMsNEJBQTRCLEVBQzVCLFNBQVMsQ0FDWixDQUFDO0lBQ04sQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1gwRDtBQUVVO0FBRTlELE1BQU0seUJBQTBCLFNBQVEsOEVBQXNCO0lBT2pFLFlBQVksU0FBc0IsRUFBRSxNQUFpQjtRQUNqRCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLFlBQVksR0FBRyx1REFBYSxDQUM3QixxQkFBcUIsRUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyx1REFBYSxDQUM1QixtQkFBbUIsRUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyx1REFBYSxDQUM3QixvQkFBb0IsRUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyx1REFBYSxDQUM3QixvQkFBb0IsRUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyx1REFBYSxDQUM1QixtQkFBbUIsRUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUN6QixDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILHlEQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDM0QsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzNELENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQ2xELENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FDaEMsQ0FBQztJQUNOLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDeERNLE1BQU0sT0FBTztJQUtoQixZQUFZLGNBQTRCLEVBQUUsS0FBZTtRQUpqRCx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFLN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDViwyQ0FBMkMsRUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FDZixDQUFDO1FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDNUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN6QixPQUFPO1FBQ1gsQ0FBQztRQUVELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN0QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxNQUFNLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDOUQsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLO29CQUNsQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDOUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEUsT0FBTyxHQUFHLFlBQVksVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDckQsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDM0QsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxVQUFVLElBQUksV0FBVyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDbEVNLE1BQU0sUUFBUTtJQUdqQjtRQUVJLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDN0QsT0FBTyxDQUNWLENBQUM7UUFHRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsR0FBRyxDQUFDLE9BQWlCLEVBQUUsR0FBRyxjQUF5QjtRQUUvQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJtQztBQUNFO0FBQ2dDO0FBQ3hDO0FBQ0U7QUFDQTtBQUN3RDtBQUNMO0FBMkI1RSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFFdEIsTUFBTSxNQUFNO0lBd0JmLGlCQUFpQjtRQUNiLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztTQUN2QixDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUM7U0FDbEQsQ0FBQztJQUNOLENBQUM7SUFLRCxZQUFZLGlCQUF5QjtRQXJEckMsYUFBUSxHQUFtQixFQUFFLENBQUM7UUFFOUIsU0FBSSxHQUFHO1lBQ0gsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDO1FBS0YsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQXVDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLCtDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkseUNBQUssRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxTQUFTLEdBQUcsdURBQWEsQ0FBYyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSw0RkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlHQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNkNBQU8sQ0FDdEI7WUFDSSxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0I7WUFDakQsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CO1NBQzVELEVBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLHVEQUFhLENBQzlCLEtBQUssRUFDTCxJQUFJLENBQUMsU0FBUyxDQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHlDQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHVDQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxRQUFROztZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVELGVBQWU7UUFDWCxJQUFJLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQyxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUssS0FBSzs7WUFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFSyxjQUFjOztRQUVwQixDQUFDO0tBQUE7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUMzQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDdEQsQ0FBQztRQUNGLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDdEMsa0JBQWtCLEVBQ2xCLEdBQUcsWUFBWSxHQUFHLENBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUssV0FBVyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsSUFBWTs7WUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQ1osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FDMUIsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFXRCxrQkFBa0IsQ0FBQyxRQUFpQjtRQUNoQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBRWhELHFCQUFxQixDQUFDLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQVNELGNBQWMsQ0FBQyxTQUFrQjtRQUU3QixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBRTlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLE9BQU87UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQWFLLE1BQU0sQ0FDUixNQUFzQixFQUN0QixLQUE4Qjs7WUFFOUIsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQztnQkFDRCxJQUFJLEtBQUssWUFBWSxnQkFBZ0IsRUFBRSxDQUFDO29CQUVwQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcscURBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBZUssT0FBTzs2REFDVCxNQUFnQixFQUNoQixJQUEwQixFQUMxQixLQUFLLEdBQUcsQ0FBQztZQUVULE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDYixRQUFRLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FDL0QsSUFBSSxDQUFDLE9BQU8sQ0FDZixFQUFFLENBQ04sQ0FBQztZQUVGLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2IsVUFBVSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQ2hFLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQUMsT0FBTyxNQUFNLEVBQUUsQ0FBQztnQkFFZCxJQUFJLENBQUMsdURBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUV6QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixPQUFPO2dCQUNYLENBQUM7Z0JBR0QsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNiLFNBQVMsS0FBSyxNQUFNLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FDbkQsSUFBSSxDQUFDLE9BQU8sQ0FDZixFQUFFLENBQ04sQ0FBQztnQkFHRixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFHLENBQUM7b0JBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBa0IsQ0FBQztvQkFDbkMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUE0QixDQUFDO29CQUMzQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsQ0FBQztnQkFHRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7cUJBQU0sQ0FBQztvQkFDSixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBUUssY0FBYzs7WUFFaEIsS0FBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7Z0JBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFJckIsTUFBTSxhQUFhLEdBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0RCxNQUFNLFVBQVUsR0FBRyxhQUFhO3FCQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sS0FBSyxHQUFHLEdBQUcsVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNiLFFBQVEsT0FBTyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUMvRCxDQUFDO2dCQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBR3JCLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsS0FBSyxDQUNELE9BQTJCLEVBQzNCLEdBQUcsSUFBZTtRQUVsQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNiLEdBQ0ksSUFBSSxDQUFDLFdBQ1QsWUFBWSxJQUFJLGNBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUM5RSxJQUFJLENBQUMsT0FBTyxDQUNmLEVBQUUsQ0FDTixDQUFDO1FBR0YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBR2hELElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEQsT0FBTztZQUNYLENBQUM7WUFHRCxJQUFJLFdBQVcsR0FBK0IsU0FBUyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQ2xDLE9BQU8sRUFDUCxNQUFNLEVBQ04sV0FBVyxDQUNkLENBQUM7WUFHRixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9CLFdBQVcsR0FBRyxVQUFVLENBQ3BCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDdkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxDQUNqQyxDQUFDO1lBQ04sQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVUsQ0FDTixPQUEyQixFQUMzQixHQUFHLElBQWU7UUFFbEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFHRCxJQUFJLEtBQUssR0FBMkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFHRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBYSxFQUFFLE9BQU8sR0FBRyxJQUFJO1FBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUN4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzdkeUM7QUE2Qm5DLE1BQU0scUJBQXFCO0lBaUI5QixZQUFZLFNBQXNCLEVBQUUsTUFBYztRQUpsRCxvQkFBZSxHQUFzQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9DLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWhDLElBQUksQ0FBQyxlQUFlLEdBQUcsdURBQWEsQ0FDaEMsMEJBQTBCLEVBQzFCLFNBQVMsQ0FDWixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHVEQUFhLENBQ25DLHFCQUFxQixFQUNyQixTQUFTLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyx1REFBYSxDQUNuQyxxQkFBcUIsRUFDckIsU0FBUyxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsdURBQWEsQ0FDbkMscUJBQXFCLEVBQ3JCLFNBQVMsQ0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHVEQUFhLENBQ2xDLG9CQUFvQixFQUNwQixTQUFTLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyx1REFBYSxDQUNsQyxvQkFBb0IsRUFDcEIsU0FBUyxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsdURBQWEsQ0FDakMsbUJBQW1CLEVBQ25CLFNBQVMsQ0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLHVEQUFhLENBQ3JDLHVCQUF1QixFQUN2QixTQUFTLENBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQjtZQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQ2hDLElBQUksRUFBRSxPQUFPO1lBQ2IsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFHLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNmLE1BQU0sQ0FBQyxNQUFNLEVBQ2IsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FDdkIsQ0FBQztZQUNOLENBQUM7U0FDSixFQUNEO1lBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDaEMsSUFBSSxFQUFFLE9BQU87WUFDYixTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRyxDQUFDO29CQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDZixNQUFNLENBQUMsTUFBTSxFQUNiLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FDbkIsQ0FBQztnQkFDTixDQUFDO3FCQUFNLENBQUM7b0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztZQUNMLENBQUM7U0FDSixFQUNEO1lBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDOUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtZQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUcsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2YsTUFBTSxDQUFDLE1BQU0sRUFDYixNQUFNLENBQUMsSUFBSSxFQUNYLE1BQU0sQ0FBQyxTQUFTLENBQ25CLENBQUM7Z0JBQ04sQ0FBQztxQkFBTSxDQUFDO29CQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDO1NBQ0osQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3BCO1lBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDL0IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLENBQUM7U0FDSixFQUNEO1lBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDL0IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUztvQkFDcEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN0QyxDQUFDO1NBQ0osRUFDRDtZQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQ2hDLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQztTQUNKLEVBQ0Q7WUFDSSxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtZQUNoQyxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUN6QixNQUFNLENBQUM7Z0JBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUM7U0FDVCxFQUNEO1lBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDaEMsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDckQsRUFDRDtZQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQzlCLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQ3pCLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pELENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxpQkFBaUIsQ0FDYixPQUFnQixFQUNoQixNQUFjLEVBQ2QsV0FBdUM7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ25ELFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2IsUUFBUSxDQUFDLE9BQU8sRUFDaEIsR0FBRyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUM3RCxDQUFDO2dCQUNGLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVcsQ0FDUCxPQUF3QixFQUN4QixJQUFrQixFQUNsQixPQUFtQjtRQUVuQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUM7UUFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLEtBQUssTUFBTSxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FDdkIsSUFBSSxFQUNKLFFBQVEsQ0FBQyxJQUFvQixDQUFFLENBQ2xDLENBQUM7WUFDTixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDbEQsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FDdEIsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBZ0IsRUFBRSxNQUFjO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQWdCLEVBQUUsTUFBYztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO1lBQzVCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUIsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclNpRDtBQUNkO0FBQzBCO0FBQ2xCO0FBQ087QUFHNUMsTUFBTSxrQkFBa0IsR0FBRztJQUM5QixPQUFPLEVBQUU7UUFDTCxLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxVQUFVO0tBQ3ZCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osS0FBSyxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsS0FBSyxFQUFFO1FBQ2xELE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsU0FBUyxFQUFFLENBQUMsV0FBbUIsRUFBRSxFQUFFLENBQy9CLGNBQWMsV0FBVywyQkFBMkI7UUFDeEQsVUFBVSxFQUFFLENBQUMsV0FBbUIsRUFBRSxFQUFFLENBQ2hDLGNBQWMsV0FBVyxZQUFZO0tBQzVDO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLENBQUMsUUFBZ0IsRUFBRSxFQUFFLENBQUMsb0JBQW9CLFFBQVEsRUFBRTtRQUMxRCxRQUFRLEVBQUUsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyw2QkFBNkIsUUFBUSxFQUFFO1FBQ3ZFLFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsU0FBUyxFQUFFLDJCQUEyQjtRQUN0QyxTQUFTLEVBQUUsQ0FBQyxZQUFvQixFQUFFLFVBQWtCLEVBQUUsRUFBRSxDQUNwRCxhQUFhLFlBQVksMENBQTBDLFVBQVUsYUFBYTtRQUM5RixVQUFVLEVBQUUsQ0FBQyxZQUFvQixFQUFFLFVBQWtCLEVBQUUsRUFBRSxDQUNyRCxhQUFhLFlBQVksc0NBQXNDLFVBQVUsRUFBRTtLQUNsRjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwRCxXQUFXLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUN6QixzREFBc0QsR0FBRyxFQUFFO0tBQ2xFO0NBQzhCLENBQUM7QUFFN0IsTUFBTSxVQUFXLFNBQVEsMkNBQU07SUFTbEMsWUFBWSxpQkFBeUI7UUFDakMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFUN0IsYUFBUSxHQUFtQixrQkFBa0IsQ0FBQztRQUM5QyxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQXlCLElBQUksQ0FBQztRQUMzQyxhQUFRLEdBQXNCLElBQUksQ0FBQztRQUNuQyxjQUFTLEdBQTZCLElBQUksQ0FBQztRQUMzQyxjQUFTLEdBQW1CLElBQUksQ0FBQztRQUNqQyxhQUFRLEdBQWtCLElBQUksQ0FBQztJQUkvQixDQUFDO0lBRUQsVUFBVSxDQUFDLGdCQUFzQyxJQUFJO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUssY0FBYzs7Ozs7WUFDaEIsTUFBTSxPQUFNLGNBQWMsV0FBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3pCLElBQUkscURBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FDMUQsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFTLEVBQUU7Z0JBQzFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVELFVBQVU7O1FBQ04sTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLFVBQUksQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FDakIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLEVBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFSyxNQUFNLENBQUMsR0FBRyxNQUEyQjs7WUFDdkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFlLEVBQUUsR0FBRyxJQUFtQjs7WUFDcEUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDdkIsSUFBSSw0REFBVSxDQUNWLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLEVBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FDeEIsQ0FDSixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3ZCLElBQUksNERBQVUsQ0FDVixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3hCLENBQ0osQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxLQUFzQjs7WUFDbEMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU87WUFDWCxDQUFDO1lBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQzNCLElBQUksNERBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUNyRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUN2QixJQUFJLDREQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FDckUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN4QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXhDLFVBQVUsQ0FBQyxTQUFTLENBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDM0IsQ0FBQztZQUNGLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUM3QixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osTUFBTSxTQUFTLEdBQ1gsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzlELFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNwRSxDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU1QixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEIsT0FBTyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxTQUFTLEdBQ1gsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzlELFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sR0FBRyxHQUFHLGlEQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDWCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckQsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDL0MsTUFBTTtnQkFDVixDQUFDO2dCQUNELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsV0FBVyxFQUNYLEtBQUssRUFDTCxXQUFXLENBQ2QsQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0MsWUFBWSxHQUFHLFdBQVcsQ0FBQztnQkFDM0IsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUMxQixDQUFDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEMsT0FBTztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQzNCLElBQUksNERBQVUsQ0FDVixRQUFRLEVBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3hCLENBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQixVQUFVLENBQUMsU0FBUyxDQUNoQixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQzNCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQ25CLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDM0IsQ0FBQztnQkFDRixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsT0FBTztZQUNYLENBQUM7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDMUIsSUFBSSw0REFBVSxDQUNWLFFBQVEsRUFDUixJQUFJLENBQUMsYUFBYSxFQUFFLEVBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FDeEIsQ0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUN2RSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDdEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVwQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLFVBQVUsR0FBRyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5QixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdCLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxNQUFNO2dCQUNWLENBQUM7Z0JBRUQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3JDLElBQUksU0FBUyxHQUFjLE1BQU0sQ0FBQztnQkFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JELElBQ0ksVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUTtvQkFDOUIsaURBQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNsRSxDQUFDO29CQUNDLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ3BCLFVBQVUsRUFBRSxDQUFDO29CQUNiLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFN0IsTUFBTSxHQUFHLEdBQUcsaURBQU8sQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNYLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUIsTUFBTTtnQkFDVixDQUFDO2dCQUVELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FDWCxZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osVUFBVSxDQUNiLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxXQUFXLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixZQUFZLEdBQUcsVUFBVSxDQUFDO2dCQUMxQixXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzVCLENBQUM7WUFFRCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztLQUFBO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xWdUQ7QUFHakQsU0FBUyxlQUFlLENBQUMsS0FBYTtJQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLE9BQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFFTSxTQUFTLFdBQVcsQ0FDdkIsTUFBNEM7SUFFNUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUM3QixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBZ0JELE1BQU0sc0JBQXNCLEdBQUc7SUFDM0IsR0FBRyxFQUFFLEtBQUs7SUFDVixNQUFNLEVBQUUsTUFBTTtJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsTUFBTTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFdBQVcsRUFBRSxZQUFZO0NBQ3lCLENBQUM7QUFJaEQsU0FBUyxlQUFlLENBQzNCLEtBQXVCLEVBQ3ZCLE9BQTBCLEVBQzFCLE1BQW1CO0lBRW5CLE1BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxpQkFBaUIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRzdELFNBQVMsZ0JBQWdCLENBQUMsQ0FBUztRQUMvQixJQUFJLGlCQUFpQixLQUFLLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7WUFDeEQsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsQ0FBQzthQUFNLElBQUksaUJBQWlCLEtBQUssaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUMvRCxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBSUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsR0FBRyxFQUFFLENBQUM7UUFDVixDQUFDO1FBQ0QsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFHRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDVixPQUFPO0lBQ1gsQ0FBQztJQUNELEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN4QixJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxDQUFDO1FBQ2IsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUFJTSxTQUFTLGFBQWEsQ0FDekIsTUFBc0IsRUFDdEIsYUFBNkIsRUFDN0IsV0FBb0IsS0FBSztJQUV6QixLQUFLLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQzthQUFNLElBQ0gsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtZQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtZQUNwQixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO1lBQ3RDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQzdCLENBQUM7WUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxDQUFDO2FBQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVNLFNBQVMsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDbkMsQ0FBQztBQUVNLFNBQVMsT0FBTyxDQUFDLENBQWtCLEVBQUUsQ0FBa0I7SUFHMUQsSUFBSSxDQUFDLEtBQUsseUNBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFDRCxJQUFJLENBQUMsS0FBSyx5Q0FBSSxFQUFFLENBQUM7UUFDYixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXhDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVwQixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztTQUFNLENBQUM7UUFHSixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0FBQ0wsQ0FBQztBQUVNLFNBQVMsYUFBYSxDQUFDLEdBQVk7SUFDdEMsT0FBTyxDQUNILE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsR0FBRyxLQUFLLElBQUk7UUFDWixPQUFPLElBQUksR0FBRztRQUNkLE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxRQUFRO1FBRTdCLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQy9ELENBQUM7QUFDTixDQUFDO0FBT00sU0FBUyxnQkFBZ0IsQ0FDNUIsV0FBbUIsRUFDbkIsZ0JBQTZDO0lBRTdDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FDOUIsR0FBRyxXQUFXLHFCQUFxQixDQUN0QyxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFFaEUsTUFBTSxJQUFJLEdBQ04sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0RSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUUxQixNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQ0FBTSxDQUFDO0lBQ3JELE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVwQixZQUFZLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN6QyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQzthQUFNLENBQUM7WUFDSixZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUM5QixZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQU0sQ0FBQztZQUNKLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUN2QixFQUFFLEVBQ0YsRUFBRSxFQUNGLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFLENBQ2hELENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFXLEVBQUUsQ0FBQztJQUN4RCxDQUFDO1NBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFnQixFQUFFLENBQUM7SUFDNUQsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLGFBQWEsQ0FDekIsUUFBZ0IsRUFDaEIsWUFBeUIsUUFBUSxDQUFDLGVBQWU7SUFFakQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBSSxRQUFRLENBQUMsQ0FBQztJQUVyRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNU4rQjtBQUloQyxNQUFNLFVBQVUsR0FBRztJQUNmLE9BQU8sRUFBRSxXQUFXO0lBQ3BCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVEsRUFBRSxNQUFNO0NBQzJCLENBQUM7QUFFaEQsTUFBTSxXQUFXLEdBQUc7SUFDaEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLEVBQUU7Q0FDK0IsQ0FBQztBQUV6QyxNQUFNLElBQUk7SUFPYixZQUFZLEdBQWUsRUFBRSxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlDQUFJLENBQUM7YUFDM0IsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDO2FBQ1QsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5Q0FBSSxDQUFDO2FBQzlCLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUNULEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlDQUFJLENBQUM7YUFDN0IsUUFBUSxDQUFDLGVBQWUsQ0FBQzthQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDO2FBQ1QsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLHlDQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLHlDQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWtCLEVBQUUsT0FBTyxHQUFHLEVBQUU7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNO2lCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUkseUNBQUksQ0FBQztpQkFDaEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO2lCQUM3QixRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFd0M7QUFFbEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFVLENBQUM7QUFJOUMsTUFBTSxVQUFXLFNBQVEsa0RBQVM7SUFjckMsWUFBWSxJQUFZLEVBQUUsSUFBWSxFQUFFLFdBQW1CO1FBQ3ZELEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBZG5DLGNBQVMsR0FBOEM7WUFDbkQsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDO1FBQ0YsY0FBUyxHQUErQztZQUNwRCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUVGLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBS2YsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO1lBQ2pELEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVcsQ0FDUCxJQUFlLEVBQ2YsVUFBa0IsRUFDbEIsV0FBbUI7UUFFbkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDNUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUUzQixNQUFNLFVBQVUsR0FBRyxXQUNmLENBQUMsR0FBRyxFQUNSLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUMxQixDQUFDLENBQUMsR0FBRyxFQUNULFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN2QixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDOUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFNBQVM7O1FBQ0wsT0FBTyxXQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sMENBQUUsUUFBUSxFQUFFLEtBQUksSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRCxPQUFPOztRQUNILE9BQU8sV0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sRUFBRSxLQUFJLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRUQsUUFBUTs7UUFDSixPQUFPLFdBQUksQ0FBQyxTQUFTLENBQUMsS0FBSywwQ0FBRSxNQUFNLEVBQUUsS0FBSSxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFZOztRQUNqQixPQUFPLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sRUFBRSxLQUFJLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDVixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsT0FBTyxJQUFJLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1RSxDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsWUFBWSxDQUFDLENBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxXQUFXOztRQUNQLE9BQU8sSUFBSSxNQUFLLFVBQUksQ0FBQyxTQUFTLEVBQUUsMENBQUUsT0FBTyxFQUFFLEVBQUM7SUFDaEQsQ0FBQztJQUVELFlBQVk7O1FBQ1IsT0FBTyxJQUFJLE1BQUssVUFBSSxDQUFDLFNBQVMsRUFBRSwwQ0FBRSxRQUFRLEVBQUUsRUFBQztJQUNqRCxDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVk7O1FBQ2hCLE9BQU8sSUFBSSxNQUFLLFVBQUksQ0FBQyxTQUFTLEVBQUUsMENBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2xELENBQUM7SUFFRCxPQUFPLENBQUMsS0FBVyxFQUFFLFdBQW1CO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxRQUFRLENBQUMsS0FBVyxFQUFFLFdBQW1CO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBWSxFQUFFLEtBQWtCLEVBQUUsV0FBbUI7UUFDMUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxhQUFhLENBQUMsTUFBa0IsRUFBRSxXQUFtQjtRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWtCLEVBQUUsV0FBbUI7UUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFZLEVBQUUsTUFBa0IsRUFBRSxXQUFtQjtRQUMzRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQW9CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBb0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFvQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGlCQUFpQixDQUFDLENBQVksRUFBRSxJQUFvQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFVBQVU7O1FBQ04sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUNqQixDQUFDLElBQUksSUFBSSxVQUFJLENBQUMsT0FBTyxFQUFFLDBDQUFFLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDOUMsQ0FBQztRQUNELENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLElBQUksS0FBSyxVQUFJLENBQUMsUUFBUSxFQUFFLDBDQUFFLFVBQVUsRUFBRSxHQUFHLENBQUM7UUFDL0MsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FDRixNQUFjLEVBQ2QsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLG9CQUE0QixDQUFDO1FBRTdCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUNuRCxNQUFNLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3JELENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELGFBQWEsQ0FBQyxXQUFtQjtRQUM3QixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLEtBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLEtBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLE1BQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLEtBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0JBQWdCLENBQ1osQ0FBUyxFQUNULENBQVMsRUFDVCxXQUFtQixFQUNuQixvQkFBNEIsQ0FBQztRQUU3QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDN0IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQ2pCLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQ3JDLEtBQUssRUFDTCxXQUFXLEVBQ1gsaUJBQWlCLENBQ3BCLENBQUM7UUFDTixDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQ3hDLEtBQUssRUFDTCxXQUFXLEVBQ1gsaUJBQWlCLENBQ3BCLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUdELFFBQVE7O1FBQ0osTUFBTSxNQUFNLEdBQUcsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLDBDQUFFLFFBQVEsRUFBRSxDQUFDO1FBQ2pELElBQUksTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2hELElBQUksYUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsMENBQUUsTUFBTSxFQUFFLE1BQUssSUFBSSxFQUFFLENBQUM7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRVYsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxFQUFFLENBQUM7b0JBQzdCLENBQUMsRUFBRSxDQUFDO29CQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDTCxDQUFDO1FBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNqQixNQUFNLEtBQUssR0FBRyxVQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxNQUFNLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1QsT0FBTztZQUNYLENBQUM7WUFDRCxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSwwQ0FBRSxRQUFRLEVBQUUsTUFBSyxJQUFJLEVBQUUsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRVYsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQzFCLENBQUMsRUFBRSxDQUFDO29CQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUM5QyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDOVJ3RDtBQWFsRCxNQUFNLFVBQXlELFNBQVEsa0RBQUk7SUFZOUUsWUFBWSxLQUFRLEVBQUUsR0FBTTtRQUN4QixLQUFLLEVBQUUsQ0FBQztRQVpaLFlBQU8sR0FBMEI7WUFDN0IsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztTQUNSLENBQUM7UUFHRixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBSWQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ2QsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDZCxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUNaLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQ1osRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUNBLFdBQW1CLEVBQ25CLE9BQWUsQ0FBQyxFQUNoQixXQUFvQixLQUFLO1FBRXpCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksUUFBUSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUNGLFNBQXlDLEVBQ3pDLG9CQUE0QixDQUFDO1FBRTdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRyxDQUFDLENBQVUsQ0FBQyxJQUFJLENBQzdELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxHQUFHO1lBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVksQ0FBQyxvQkFBNEIsQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFTLFlBQVksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxNQUFNLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ1IsT0FBTyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7YUFDdEMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFRLEVBQUUsb0JBQTRCLENBQUM7UUFDNUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBTSxFQUFFLG9CQUE0QixDQUFDO1FBQ3hDLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQW9CO1FBQzdCLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBVSxZQUFZLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BFLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxJQUFJLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6RSxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekpnRDtBQUNqQjtBQUd6QixNQUFNLE9BQVEsU0FBUSwrQ0FBQztJQU8xQixZQUFZLElBQVksRUFBRSxVQUFrQixFQUFFLGFBQXNCLElBQUk7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFMWixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFJbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2FBQ3BELFFBQVEsQ0FBQyxXQUFXLENBQUM7YUFDckIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVksRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUztRQUNYLE9BQU8sQ0FDSCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQ2pFLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZOztRQUNoQixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUMzQixVQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxNQUFNLEVBQUUsQ0FBQztZQUNsQyxVQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxNQUFNLEVBQUUsQ0FBQztZQUM3QixVQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxNQUFNLEVBQUUsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQ3RCLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDbEMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUN6QixRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMseUNBQUksQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FDL0MsWUFBWSxDQUNmLENBQUM7WUFDTixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ25CLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFDOUIsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQ2YsQ0FBQztRQUNOLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSztRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXFCO1FBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxNQUFNLElBQUksS0FBSyxDQUNYLDJCQUEyQixNQUFNLENBQUMsTUFBTSxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNsRSxDQUFDO1FBQ04sQ0FBQztRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsUUFBUSxDQUFDLENBQVMsRUFBRSxJQUFZO1FBQzVCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNkLElBQUksR0FBRyx5Q0FBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsVUFBbUIsS0FBSztRQUMvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNwQixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUyxFQUFFLFFBQXdCO1FBQzNDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO2FBQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNsQixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7YUFBTSxDQUFDO1lBQ0osRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLENBQVMsRUFBRSxJQUFhLEVBQUUsUUFBZ0IsTUFBTTtRQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbEIsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUVELEtBQUssTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNwQixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYSxFQUFFLFVBQWtCLE9BQU8sRUFBRSxRQUFnQixNQUFNO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUM7UUFFdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM5QixDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDVCxDQUFDO2FBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNaLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFlO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBb0IsQ0FBQztRQUM3RCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQWUsRUFBRSxPQUFlO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBb0IsQ0FBQztRQUM3RCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeE1tRDtBQUNWO0FBQ0M7QUFFcEMsTUFBTSxTQUFVLFNBQVEsb0RBQVU7SUFNckMsWUFBWSxJQUFZLEVBQUUsSUFBWSxFQUFFLFdBQW1CO1FBQ3ZELEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTm5DLGNBQVMsR0FBNEMsRUFBRSxDQUFDO1FBQ3hELGNBQVMsR0FBNEMsRUFBRSxDQUFDO1FBQ3hELGFBQVEsR0FBZ0MsRUFBRSxDQUFDO1FBTXZDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFZO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQy9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDL0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsTUFBTSxFQUFFLENBQUM7YUFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFhOztRQUN4QixPQUFPLFdBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDBDQUFFLFFBQVEsRUFBRSxLQUFJLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWM7O1FBQ3ZCLE9BQU8sV0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMENBQUUsTUFBTSxFQUFFLEtBQUksSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFFRCxjQUFjLENBQ1YsS0FBYSxFQUNiLE1BQWMsRUFDZCxXQUFpQixFQUNqQixXQUFtQjtRQUVuQixXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLENBQ1IsTUFBYyxFQUNkLEtBQWEsRUFDYixTQUFzQixFQUN0QixXQUFtQjtRQUVuQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUMxQixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUUsQ0FBQztvQkFDN0IsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztnQkFDN0MsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFLENBQUM7d0JBQzVCLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNuQixHQUFHLENBQUMsSUFBSSxtREFBVSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDcEMsSUFBSSxDQUNELFdBQVcsRUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUMzQixDQUFDO1lBRU4sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDOUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEMsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsY0FBYzs7UUFDVixLQUFLLE1BQU0sSUFBSSxJQUFJLHNEQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQUksWUFBWSxTQUFTLEVBQUUsQ0FBQztnQkFDNUIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVCLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxVQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9DLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixVQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVDLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQWEsRUFBRSxJQUFvQjs7UUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixVQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQywwQ0FBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELG9CQUFvQixDQUFDLE1BQWMsRUFBRSxJQUFvQjs7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixVQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELE1BQU07UUFDRixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDWCxTQUFTO1lBQ2IsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQy9CLEtBQUssTUFBTSxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzNCLElBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUM5QixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDVixTQUFTO1lBQ2IsQ0FBQztZQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ2pDLEtBQUssTUFBTSxNQUFNLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzVCLElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUM5QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLG9CQUE0QixDQUFDO1FBQ3pELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVksRUFBRSxvQkFBNEIsQ0FBQztRQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTXVEO0FBc0J4RCx3REFBTSxDQUFDLHFEQUFPLEVBQUU7SUFDWixZQUFZO1FBQ1IsT0FBUSxJQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQW9CO1FBQzdCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2QsSUFBZ0IsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsQ0FBQzthQUFNLElBQUksSUFBSSxFQUFFLENBQUM7WUFDYixJQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxDQUFDO2FBQU0sQ0FBQztZQUNILElBQWdCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxPQUFPLElBQWUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsU0FBUztRQUNMLE9BQU8sQ0FBRSxJQUFnQixDQUFDLEVBQUUsRUFBRSxFQUFHLElBQWdCLENBQUMsRUFBRSxFQUFFLENBR3JELENBQUM7SUFDTixDQUFDO0lBQ0QsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsb0JBQTRCLENBQUM7UUFDekQsT0FBUSxJQUFnQjthQUNuQixNQUFNLEVBQUU7YUFDUixPQUFPLENBQUMsSUFBZSxFQUFFLGlCQUFpQixHQUFHLENBQUMsQ0FBQzthQUMvQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxXQUFXLENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxvQkFBNEIsQ0FBQztRQUM1RCxJQUFnQixDQUFDLFNBQVMsQ0FDdEIsSUFBZ0IsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQzFCLElBQWdCLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUMzQixpQkFBaUIsQ0FDcEIsQ0FBQztRQUNGLE9BQU8sSUFBZSxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBUSxJQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RvQztBQUNuQjtBQUV6QixNQUFNLFVBQVcsU0FBUSwrQ0FBQztJQUk3QixZQUFZLElBQVksRUFBRSxJQUFZLEVBQUUsV0FBbUI7UUFDdkQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQW1CO1FBQ3ZCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNkLElBQUksR0FBRyx5Q0FBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTztRQUNILE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsT0FBTyxDQUFDLFFBQWdCLEVBQUUsb0JBQTRCLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixHQUFHLENBQUMsQ0FBQzthQUM1QyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RNLE1BQU0sS0FBSztJQUlkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFZO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFSyxpQkFBaUIsQ0FBQyxJQUFnQzs7WUFDcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7S0FBQTtDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMkM7QUFDZDs7QUFFOUI7QUFDQTtBQUNBLGNBQWMsaURBQUs7QUFDbkIsZ0JBQWdCLGlEQUFLO0FBQ3JCLGtCQUFrQixpREFBSztBQUN2QixlQUFlLHFEQUFPLHVCQUF1QixxREFBTztBQUNwRDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7O0FBRWpEO0FBQ0E7QUFDQSwwQkFBMEIscURBQU87QUFDakM7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLHFCQUFxQjs7QUFFL0Q7QUFDQTtBQUNBLDBCQUEwQixxREFBTztBQUNqQzs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxREFBTztBQUNqQzs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHFEQUFPO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckcrQjtBQUNWOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLG1CQUFtQiwrREFBUTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseURBQU07QUFDTjtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlEQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0T3FDO0FBS0w7QUFDVztBQUNQO0FBQ1E7QUFDRjtBQUNFOztBQUU3QztBQUNBOztBQUVBO0FBQ0EsV0FBVywyREFBUztBQUNwQixJQUFJO0FBQ0osUUFBUSx1REFBSztBQUNiLGFBQWEsdURBQUs7QUFDbEIsTUFBTSxTQUFTLDZEQUFTO0FBQ3hCLGFBQWEsZ0VBQVksZUFBZSwyREFBUyxHQUFHLDBEQUFRO0FBQzVELE1BQU0sU0FBUyxpRUFBYTtBQUM1QixhQUFhLDJEQUFTO0FBQ3RCLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLFdBQVcsMERBQVE7QUFDbkIsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0EsbUNBQW1DLGdEQUFJOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHVEQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0EsOEJBQThCLHVEQUFLO0FBQ25DO0FBQ0EsNEJBQTRCLHVEQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1AsRUFBRSx5REFBTTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDL1VlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEMkQ7QUFDTDtBQUNFO0FBQ1g7QUFDZTtBQUNQO0FBQ0Y7QUFDZjtBQUNIO0FBQ2dCO0FBQ1Y7QUFDNEI7QUFDOUI7QUFDUTtBQUNUOztBQUVyQixxQkFBcUIsNkRBQVc7QUFDL0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLCtEQUFROztBQUV4QztBQUNBLGtEQUFrRCxzREFBVTs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLHNEQUFVO0FBQ3ZELHdEQUF3RCxnREFBSTs7QUFFNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLHlEQUFNO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUFRO0FBQ25DLHFCQUFxQiwrREFBUTtBQUM3Qjs7QUFFQTtBQUNBLDhEQUE4RCxtREFBTztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLCtEQUFRO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIseURBQU07QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixnREFBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDJEQUFJO0FBQ2pDLHVCQUF1QiwyREFBSTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixxREFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksb0RBQVE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQixvREFBUTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNERBQU87QUFDL0I7QUFDQTtBQUNBLDBDQUEwQyw2REFBUztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHdEQUFPOztBQUVmO0FBQ0E7O0FBRUEsWUFBWSxtQkFBbUI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksbUJBQW1COztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxtQkFBbUI7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx3REFBTztBQUNmLFFBQVEsd0RBQU87O0FBRWY7QUFDQTs7QUFFQSxZQUFZLG1CQUFtQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWUsTUFBTSxpREFBSzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixpREFBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLHNDQUFzQyxtQkFBbUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkRBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5aEI0QjtBQUNVO0FBQ3BCO0FBQ3lCOztBQUVuRDtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLHdCQUF3QixvREFBUTtBQUMvQztBQUNBO0FBQ0EsSUFBSSxtRUFBTTtBQUNWLGVBQWUsK0NBQUcsQ0FBQywrREFBTTtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGdFQUFVO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsUUFBUTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JKZ0M7O0FBRWpCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxZQUFZO0FBQ1osWUFBWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLGtEQUFNO0FBQ2YsY0FBYyxrREFBTTtBQUNwQjs7QUFFQSxZQUFZLE9BQU87O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERvRDtBQUNoQjtBQUNWO0FBQ007O0FBRWpCLHlCQUF5QixvREFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWUsK0NBQUc7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsaUNBQWlDLDZEQUFTO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLGtEQUFNO0FBQ2YsY0FBYyxrREFBTTtBQUNwQjs7QUFFQSw4QkFBOEIsS0FBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hIb0Q7O0FBRXJDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qiw2REFBUztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlDd0Q7O0FBRXhEO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHlCQUF5QixpRUFBYTs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RzZDO0FBQ047QUFDWTtBQUNQO0FBQ1Q7O0FBRW5DO0FBQ087O0FBRVA7QUFDTywyQkFBMkIsNERBQUc7QUFDckM7QUFDQSxTQUFTLHFEQUFPO0FBQ2hCOztBQUVPO0FBQ1AseUJBQXlCLHNEQUFJOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHFEQUFPO0FBQzFCOztBQUVBO0FBQ0EsMkJBQTJCLHFEQUFPO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EscUJBQXFCLHFEQUFPO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0Isc0RBQUk7O0FBRW5DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixxREFBVTs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBLEVBQUUsNERBQWM7O0FBRWhCO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDTztBQUNQLG1CQUFtQixxREFBVTtBQUM3Qjs7QUFFQTtBQUNPO0FBQ1A7QUFDQSx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDTztBQUNQOztBQUVBOztBQUVBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDtBQUNuRDs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ3VEO0FBQ2xCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixnRUFBWTs7QUFFakM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1REFBSztBQUNqQixXQUFXLHVEQUFLO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelBBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9CQUFvQjtBQUMxQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQOztBQUVPLG9EQUFvRDtBQUMzRCxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7OztVQy9CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNMZ0Q7QUFDOEM7QUFDaEM7QUFPOUQsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixVQUFVLEVBQUUseURBQVU7Q0FDcUIsQ0FBQztBQUVoRCxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLDBEQUFnQixDQUM3QyxzQkFBc0IsRUFDdEIsaUJBQWlCLENBQ3BCLENBQUM7QUFFRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksdUdBQXlCLENBQ3BELE1BQU0sQ0FBQyxTQUFTLEVBQ2hCLE1BQU0sQ0FDVCxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RzdmlzLy4vc3JjL2FsZ29yaXRobS1jb250cm9scy9lbmdpbmUtYWxnb3JpdGhtLWNvbnRyb2xzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2FsZ29yaXRobS1jb250cm9scy9wcmlvcXVldWUtYWxnb3JpdGhtLWNvbnRyb2xzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2Nvb2tpZXMudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvZGVidWdnZXIudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2dlbmVyYWwtY29udHJvbHMvZW5naW5lLWdlbmVyYWwtY29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvaGVhcHMvQmluYXJ5SGVhcC50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9oZWxwZXJzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2luZm8udHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvb2JqZWN0cy9iaW5hcnktbm9kZS50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9vYmplY3RzL2Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvb2JqZWN0cy9kc2FycmF5LnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL29iamVjdHMvZ3JhcGgtbm9kZS50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9vYmplY3RzL2luZGV4LnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL29iamVjdHMvdGV4dC1jaXJjbGUudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL0FuaW1hdG9yLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9Db250cm9sbGVyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9Nb3JwaGFibGUuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL1F1ZXVlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9SdW5uZXIuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL1RpbWVsaW5lLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0EuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvQ2lyY2xlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0NsaXBQYXRoLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9EZWZzLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0RvbS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9FbGVtZW50LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0VsbGlwc2UuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRm9yZWlnbk9iamVjdC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9GcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9HLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0dyYWRpZW50LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0ltYWdlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0xpbmUuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvTWFya2VyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL01hc2suanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvUGF0aC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9QYXR0ZXJuLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvUG9seWxpbmUuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvUmVjdC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TaGFwZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TdG9wLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1N0eWxlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1N2Zy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvVGV4dC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9UZXh0UGF0aC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Uc3Bhbi5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Vc2UuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvYXR0ci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvY29udGFpbmVyR2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9ldmVudC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvZ3JhZGllbnRlZC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcGFyc2VyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9wb2ludGVkLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9wb2x5LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9yZWdleC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL3RleHRhYmxlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvYXJyYW5nZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL2NsYXNzLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvY3NzLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvZGF0YS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL21lbW9yeS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL3N1Z2FyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvdHJhbnNmb3JtLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvQm94LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0NvbG9yLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvTWF0cml4LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1BhdGhBcnJheS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9Qb2ludC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9Qb2ludEFycmF5LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1NWR0FycmF5LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1NWR051bWJlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy91dGlscy9hZG9wdGVyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3V0aWxzL21ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdXRpbHMvcGF0aFBhcnNlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy91dGlscy93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHN2aXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RzdmlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHN2aXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9wcmlvcXVldWVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5cbmV4cG9ydCBjbGFzcyBFbmdpbmVBbGdvcml0aG1Db250cm9sIHtcbiAgICBhbGdvcml0aG1Db250cm9sczogSFRNTEZpZWxkU2V0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hbGdvcml0aG1Db250cm9scyA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEZpZWxkU2V0RWxlbWVudD4oXG4gICAgICAgICAgICBcImZpZWxkc2V0LmFsZ29yaXRobUNvbnRyb2xzXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBhZGRSZXR1cm5TdWJtaXQsIHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBQcmlvcXVldWUgfSBmcm9tIFwifi9wcmlvcXVldWVzXCI7XG5pbXBvcnQgeyBFbmdpbmVBbGdvcml0aG1Db250cm9sIH0gZnJvbSBcIi4vZW5naW5lLWFsZ29yaXRobS1jb250cm9sc1wiO1xuXG5leHBvcnQgY2xhc3MgUHJpb1F1ZXVlQWxnb3JpdGhtQ29udHJvbCBleHRlbmRzIEVuZ2luZUFsZ29yaXRobUNvbnRyb2wge1xuICAgIGluc2VydFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgaW5zZXJ0RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaW5zZXJ0U3VibWl0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGRlbGV0ZVN1Ym1pdDogSFRNTElucHV0RWxlbWVudDtcbiAgICBjbGVhclN1Ym1pdDogSFRNTElucHV0RWxlbWVudDtcbiAgICBlbmdpbmU6IFByaW9xdWV1ZTtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBlbmdpbmU6IFByaW9xdWV1ZSkge1xuICAgICAgICBzdXBlcihjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuZW5naW5lID0gZW5naW5lO1xuXG4gICAgICAgIHRoaXMuaW5zZXJ0U2VsZWN0ID0gcXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXG4gICAgICAgICAgICBcInNlbGVjdC5pbnNlcnRTZWxlY3RcIixcbiAgICAgICAgICAgIHRoaXMuYWxnb3JpdGhtQ29udHJvbHNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnNlcnRGaWVsZCA9IHF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICBcImlucHV0Lmluc2VydEZpZWxkXCIsXG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobUNvbnRyb2xzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW5zZXJ0U3VibWl0ID0gcXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIFwiaW5wdXQuaW5zZXJ0U3VibWl0XCIsXG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobUNvbnRyb2xzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZGVsZXRlU3VibWl0ID0gcXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIFwiaW5wdXQuZGVsZXRlU3VibWl0XCIsXG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobUNvbnRyb2xzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2xlYXJTdWJtaXQgPSBxdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJpbnB1dC5jbGVhclN1Ym1pdFwiLFxuICAgICAgICAgICAgdGhpcy5hbGdvcml0aG1Db250cm9sc1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRGaWVsZC52YWx1ZSA9IHRoaXMuaW5zZXJ0U2VsZWN0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRTZWxlY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRSZXR1cm5TdWJtaXQodGhpcy5pbnNlcnRGaWVsZCwgXCJBTFBIQU5VTStcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnN1Ym1pdCh0aGlzLmVuZ2luZS5pbnNlcnQsIHRoaXMuaW5zZXJ0RmllbGQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5pbnNlcnRTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdWJtaXQodGhpcy5lbmdpbmUuaW5zZXJ0LCB0aGlzLmluc2VydEZpZWxkKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZGVsZXRlU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc3VibWl0KHRoaXMuZW5naW5lLmRlbGV0ZU1pbiwgbnVsbClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNsZWFyU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY29uZmlybVJlc2V0QWxsKClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gXCIuL2RlYnVnZ2VyXCI7XG5cbmludGVyZmFjZSBDb29raWVPYmplY3Qge1xuICAgIFtrZXk6IHN0cmluZ106IEhUTUxTZWxlY3RFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgQ29va2llcyB7XG4gICAgcHJpdmF0ZSAkQ09PS0lFX0VYUElSRV9EQVlTID0gMzA7XG4gICAgcHJpdmF0ZSBjb29raWVzOiBDb29raWVPYmplY3Q7XG4gICAgcHJpdmF0ZSBkZWJ1ZzogRGVidWdnZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsQ29va2llczogQ29va2llT2JqZWN0LCBkZWJ1ZzogRGVidWdnZXIpIHtcbiAgICAgICAgdGhpcy5jb29raWVzID0gaW5pdGlhbENvb2tpZXM7XG4gICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgICAgICAgdGhpcy5sb2FkKCk7IC8vIFNldCBlbGVtZW50IHZhbHVlcyB0byBzYXZlZCB2YWx1ZXNcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnNhdmUoKTsgLy8gU2F2ZSBvbiBpbml0aWFsaXphdGlvbiB0byBhZGQgbW9yZSBkYXlzIGJlZm9yZSBleHBpcmF0aW9uXG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVidWcubG9nKFxuICAgICAgICAgICAgXCJBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIGNvb2tpZSBlbGVtZW50c1wiLFxuICAgICAgICAgICAgdGhpcy5jb29raWVzXG4gICAgICAgICk7XG5cbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvb2tpZXMpLm1hcCgoY29va2llRmllbGQpID0+IHtcbiAgICAgICAgICAgIGNvb2tpZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4gdGhpcy5zYXZlKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlYnVnLmxvZyhcIkxvYWRpbmcgY29va2llc1wiLCBkb2N1bWVudC5jb29raWUpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jb29raWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFsbENvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcbiAgICAgICAgYWxsQ29va2llcy5tYXAoKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3BsaXRDb29raWUgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgaWYgKHNwbGl0Q29va2llLmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY29va2llIGZvcm1hdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFtkb2N1bWVudENvb2tpZU5hbWUsIGRvY3VtZW50Q29va2llVmFsdWVdID0gc3BsaXRDb29raWU7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRDb29raWVOYW1lIGluIHRoaXMuY29va2llcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29va2llc1tkb2N1bWVudENvb2tpZU5hbWVdLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50Q29va2llVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCk6IHZvaWQge1xuICAgICAgICBsZXQgZXhwaXJlcyA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLiRDT09LSUVfRVhQSVJFX0RBWVMgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBleHBpcnlEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGV4cGlyeURhdGUuc2V0RGF0ZShleHBpcnlEYXRlLmdldERhdGUoKSArIHRoaXMuJENPT0tJRV9FWFBJUkVfREFZUyk7XG4gICAgICAgICAgICBleHBpcmVzID0gYDtleHBpcmVzPSR7ZXhwaXJ5RGF0ZS50b1VUQ1N0cmluZygpfWA7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLmNvb2tpZXMpLm1hcCgoW2Nvb2tpZU5hbWUsIGNvb2tpZUZpZWxkXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29va2llVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoY29va2llRmllbGQudmFsdWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7Y29va2llTmFtZX09JHtjb29raWVWYWx1ZX0ke2V4cGlyZXN9YDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWJ1Zy5sb2coXCJTZXR0aW5nIGNvb2tpZXNcIiwgZG9jdW1lbnQuY29va2llKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRGVidWdnZXIge1xuICAgIHByaXZhdGUgZW5hYmxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBHZXQgZGVidWcgcGFyYW1ldGVyIGZyb20gdGhlIFVSTCBxdWVyeVxuICAgICAgICBjb25zdCBkZWJ1Z1BhcmFtID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuc2VhcmNoUGFyYW1zLmdldChcbiAgICAgICAgICAgIFwiZGVidWdcIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEJvb2xlYW4gY29udmVyc2lvbiBub3QgcHJlZmVjdCBiZWNhdXNlIG9ubHkgbnVsbCBvciBcIlwiIHdpbGwgcmV0dXJuIGZhbHNlIGFrYSBhbnkgbm9uIGVtcHR5IHN0cmluZyByZXR1cm5zIHRydWVcbiAgICAgICAgdGhpcy5lbmFibGVkID0gQm9vbGVhbihkZWJ1Z1BhcmFtKTtcbiAgICB9XG5cbiAgICBsb2cobWVzc2FnZT86IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICAgICAgLy8gTG9nIG91dCBvbmx5IGlmIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgQ29va2llcyB9IGZyb20gXCJ+L2Nvb2tpZXNcIjtcbmltcG9ydCB7IERlYnVnZ2VyIH0gZnJvbSBcIn4vZGVidWdnZXJcIjtcbmltcG9ydCB7IGlzVmFsaWRSZWFzb24sIHBhcnNlVmFsdWVzLCBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIn4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSW5mbyB9IGZyb20gXCJ+L2luZm9cIjtcbmltcG9ydCB7IFN2ZyB9IGZyb20gXCJ+L29iamVjdHNcIjsgLy8gTk9UIFRIRSBTQU1FIFN2ZyBhcyBpbiBAc3ZnZG90anMvc3ZnLmpzISEhXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCJ+L3N0YXRlXCI7XG5pbXBvcnQgeyBFbmdpbmVBbGdvcml0aG1Db250cm9sIH0gZnJvbSBcIi4vYWxnb3JpdGhtLWNvbnRyb2xzL2VuZ2luZS1hbGdvcml0aG0tY29udHJvbHNcIjtcbmltcG9ydCB7IEVuZ2luZUdlbmVyYWxDb250cm9scyB9IGZyb20gXCIuL2dlbmVyYWwtY29udHJvbHMvZW5naW5lLWdlbmVyYWwtY29udHJvbHNcIjtcblxuZXhwb3J0IHR5cGUgU3VibWl0RnVuY3Rpb24gPSAoLi4uYXJnczogKHN0cmluZyB8IG51bWJlcilbXSkgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlc09iamVjdCB7XG4gICAgW2tleTogc3RyaW5nXTpcbiAgICAgICAgfCBzdHJpbmcgLy8gaGFuZGxlZCBsaWtlICgpID0+IHN0cmluZ1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB8ICgoLi4uYXJnczogYW55W10pID0+IHN0cmluZylcbiAgICAgICAgfCBNZXNzYWdlc09iamVjdDtcbn1cblxudHlwZSBBY3Rpb24gPSB7XG4gICAgbWV0aG9kOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgIGFyZ3M6IHVua25vd25bXTtcbiAgICBzdGVwQ291bnQ6IG51bWJlcjtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnN0YW50cyBhbmQgZ2xvYmFsIHZhcmlhYmxlc1xuXG4vKipcbiAqIEEgbm9uLWJyZWFraW5nIHNwYWNlIGNoYXJhY3RlciAoYFxcdTAwQTBgKSB1c2VkIGFzIGEgcGxhY2Vob2xkZXIgZm9yIGFuIGVtcHR5IHN0cmluZy5cbiAqXG4gKiBUaGlzIHdvcmthcm91bmQgcHJldmVudHMgU1ZHIHRleHQgZWxlbWVudHMgZnJvbSB0aGUgYEBzdmdkb3Rqcy9zdmcuanNgIGxpYnJhcnlcbiAqIGZyb20gcmVzZXR0aW5nIHRoZWlyIGNvb3JkaW5hdGVzIHRvICgwLCAwKSB3aGVuIGFzc2lnbmVkIGFuIGVtcHR5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IE5CU1AgPSBcIlxcdTAwQTBcIjtcblxuZXhwb3J0IGNsYXNzIEVuZ2luZSB7XG4gICAgLy8gRGVmYXVsdCB2YXJpYWJsZSBuYW1lcyBzdGFydCB3aXRoICRcblxuICAgIFN2ZzogU3ZnO1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlc09iamVjdCA9IHt9O1xuXG4gICAgJFN2ZyA9IHtcbiAgICAgICAgd2lkdGg6IDEwMDAsXG4gICAgICAgIGhlaWdodDogNjAwLFxuICAgICAgICBtYXJnaW46IDMwLFxuICAgICAgICBvYmplY3RTaXplOiA0MCxcbiAgICAgICAgYW5pbWF0aW9uU3BlZWQ6IDEwMDAsIC8vIG1pbGxpc2Vjb25kcyBwZXIgc3RlcFxuICAgIH07XG4gICAgY29va2llczogQ29va2llcztcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIGdlbmVyYWxDb250cm9sczogRW5naW5lR2VuZXJhbENvbnRyb2xzO1xuICAgIGFsZ29yaXRobUNvbnRyb2xzOiBFbmdpbmVBbGdvcml0aG1Db250cm9sO1xuICAgIGFjdGlvbnM6IEFjdGlvbltdID0gW107XG4gICAgY3VycmVudEFjdGlvbjogbnVtYmVyID0gMDtcbiAgICBjdXJyZW50U3RlcDogbnVtYmVyID0gMDtcbiAgICBkZWJ1Z2dlcjogRGVidWdnZXI7XG4gICAgc3RhdGU6IFN0YXRlO1xuICAgIGluZm86IEluZm87XG5cbiAgICBnZXRBbmltYXRpb25TcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZW5lcmFsQ29udHJvbHMuYW5pbWF0aW9uU3BlZWRTZWxlY3QudmFsdWUpO1xuICAgIH1cblxuICAgIGdldE9iamVjdFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2VuZXJhbENvbnRyb2xzLm9iamVjdFNpemVTZWxlY3QudmFsdWUpO1xuICAgIH1cblxuICAgIGdldE5vZGVTcGFjaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9iamVjdFNpemUoKTtcbiAgICB9XG5cbiAgICBnZXRTdHJva2VXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RTaXplKCkgLyAxMjtcbiAgICB9XG5cbiAgICBnZXROb2RlU3RhcnQoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLiRTdmcubWFyZ2luICsgdGhpcy5nZXRPYmplY3RTaXplKCkgLyAyLFxuICAgICAgICAgICAgdGhpcy4kU3ZnLm1hcmdpbiAqIDQsXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0VHJlZVJvb3QoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLlN2Zy52aWV3Ym94KCkud2lkdGggLyAyLFxuICAgICAgICAgICAgMiAqIHRoaXMuJFN2Zy5tYXJnaW4gKyB0aGlzLmdldE9iamVjdFNpemUoKSAvIDIsXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEluaXRpdGFsaXNhdGlvblxuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRlYnVnZ2VyID0gbmV3IERlYnVnZ2VyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICB0aGlzLmdlbmVyYWxDb250cm9scyA9IG5ldyBFbmdpbmVHZW5lcmFsQ29udHJvbHModGhpcy5jb250YWluZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFsZ29yaXRobUNvbnRyb2xzID0gbmV3IEVuZ2luZUFsZ29yaXRobUNvbnRyb2wodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuY29va2llcyA9IG5ldyBDb29raWVzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9iamVjdFNpemU6IHRoaXMuZ2VuZXJhbENvbnRyb2xzLm9iamVjdFNpemVTZWxlY3QsXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3BlZWQ6IHRoaXMuZ2VuZXJhbENvbnRyb2xzLmFuaW1hdGlvblNwZWVkU2VsZWN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuZGVidWdnZXJcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBzdmdDb250YWluZXIgPSBxdWVyeVNlbGVjdG9yPFNWR1NWR0VsZW1lbnQ+KFxuICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5TdmcgPSBuZXcgU3ZnKHN2Z0NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuU3ZnLnZpZXdib3goMCwgMCwgdGhpcy4kU3ZnLndpZHRoLCB0aGlzLiRTdmcuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5TdmcuJGVuZ2luZSA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnZ2VyLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLlN2Zy5hZGRDbGFzcyhcImRlYnVnXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmZvID0gbmV3IEluZm8odGhpcy5TdmcsIHRoaXMuJFN2Zy5tYXJnaW4pO1xuICAgIH1cblxuICAgIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzZXRBbGwoKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuc2V0UnVubmluZyh0cnVlKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldEFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XG4gICAgICAgIGF3YWl0IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtUmVzZXRBbGwoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChjb25maXJtKFwiVGhpcyBjbGVhcnMgdGhlIGNhbnZhcyBhbmQgeW91ciBoaXN0b3J5IVwiKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFzeW5jIHJlc2V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGF3YWl0IHRoaXMucmVzZXRBbGdvcml0aG0oKTtcbiAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyhmYWxzZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8qIEFsbG93IHN1YmNsYXNzZXMgdG8gdXNlIHRoaXMgZnVuY3Rpb24gKi9cbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TdmcuY2xlYXIoKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5Tdmcudmlld2JveCgpLndpZHRoO1xuICAgICAgICBjb25zdCBoID0gdGhpcy5Tdmcudmlld2JveCgpLmhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMuZGVidWdnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgdyAvIDEwMDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TdmcubGluZSh4ICogMTAwLCAwLCB4ICogMTAwLCBoKS5hZGRDbGFzcyhcImdyaWRsaW5lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDE7IHkgPCBoIC8gMTAwOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN2Zy5saW5lKDAsIHkgKiAxMDAsIHcsIHkgKiAxMDApLmFkZENsYXNzKFwiZ3JpZGxpbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZm8ucmVzZXQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDU1NWYXJpYWJsZXMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDU1NWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlU2l6ZSA9IE1hdGgucm91bmQoXG4gICAgICAgICAgICAoMTAwICogdGhpcy5nZXRPYmplY3RTaXplKCkpIC8gdGhpcy4kU3ZnLm9iamVjdFNpemVcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLW5vZGUtZm9udC1zaXplXCIsXG4gICAgICAgICAgICBgJHtyZWxhdGl2ZVNpemV9JWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBkcmF3Vmlld2JveChyaWdodDogbnVtYmVyLCBkb3duOiBudW1iZXIsIHpvb206IG51bWJlcikge1xuICAgICAgICB0aGlzLlN2Zy52aWV3Ym94KFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgICBkb3duLFxuICAgICAgICAgICAgdGhpcy4kU3ZnLndpZHRoICogem9vbSxcbiAgICAgICAgICAgIHRoaXMuJFN2Zy5oZWlnaHQgKiB6b29tXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2V0SWRsZVRpdGxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluZm8uc2V0VGl0bGUoXCJTZWxlY3QgYW4gYWN0aW9uIGZyb20gdGhlIG1lbnUgYWJvdmVcIik7XG4gICAgICAgIHRoaXMuaW5mby5zZXRCb2R5KE5CU1ApO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBVcGRhdGluZyBsaXN0ZW5lcnNcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgYWxsIGVsZW1lbnRzIHdpdGggdGhlIGAuZGlzYWJsZVdoZW5SdW5uaW5nYCBjbGFzc1xuICAgICAqIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkaXNhYmxlZCAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGVsZW1lbnRzIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBkaXNhYmxlV2hlblJ1bm5pbmcoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtIG9mIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8XG4gICAgICAgICAgICBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICAgICAgPihcIi5kaXNhYmxlV2hlblJ1bm5pbmdcIikpIHtcbiAgICAgICAgICAgIGVsZW0uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBldmVudCBsaXN0ZW5lcnMgYmFzZWQgb24gdGhlIHJ1bm5pbmcgc3RhdGUgb2YgdGhlIGVuZ2luZS5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgbGlzdGVuZXJzIGFyZSBhY3RpdmVcbiAgICAgKiB3aGlsZSBwcmV2ZW50aW5nIG5ldyBpbnB1dHMgd2hlbiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNSdW5uaW5nIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZW5naW5lIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqL1xuICAgIHJlc2V0TGlzdGVuZXJzKGlzUnVubmluZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBSZW1vdmUgYWxsIGN1cnJlbnRseSBhY3RpdmUgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZ2VuZXJhbENvbnRyb2xzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAvLyBJZiB0aGUgaW5zdGFuY2UgaXMgYW4gYEVuZ2luZWAsIGl0IGRpc2FibGUgVUkgY29udHJvbHMgYW5kIGV4aXRcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IEVuZ2luZSkge1xuICAgICAgICAgICAgLy8gTm90aGluZyBjYW4gYmUgcnVubmluZyBzbyBkaXNhYmxlIGJ1dHRvbnNcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVdoZW5SdW5uaW5nKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuYWRkUnVubmVyTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gSWYgcnVubmluZywgaXQgZGlzYWJsZXMgbmV3IGlucHV0cyBhbmQgc2V0cyB0aGUgc3RhdHVzIHRvIGBcInBhdXNlZFwiXG4gICAgICAgIGlmIChpc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIC8vIElzIHJ1bm5pbmcgc28gZGlzYWJsZSBidXR0b25zIHRvIHByZXZlbnQgbmV3IGlucHV0c1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlV2hlblJ1bm5pbmcodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicGF1c2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGlkbGUsIGVuYWJsZSBpbnB1dHMsIHVwZGF0ZSB0aGUgc3RhdHVzIHRvIGBcImluYWN0aXZlXCJgLCBhbmQgcmUtYWRkIGlkbGUgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5kaXNhYmxlV2hlblJ1bm5pbmcoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldElkbGVUaXRsZSgpO1xuICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwiaW5hY3RpdmVcIik7XG4gICAgICAgIHRoaXMuZ2VuZXJhbENvbnRyb2xzLmFkZElkbGVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRXhlY3V0aW5nIHRoZSBhY3Rpb25zXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBleGVjdXRpb24gb2YgdGhlIHByb3ZpZGVkIG1ldGhvZCB3aXRoIHBhcnNlZCB2YWx1ZXMgZnJvbSBhbiBpbnB1dCBmaWVsZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBUaGUgc3VibWlzc2lvbiBmdW5jdGlvbiB0byBleGVjdXRlIHdpdGggcGFyc2VkIGlucHV0IHZhbHVlcy5cbiAgICAgKiBAcGFyYW0gZmllbGQgLSBUaGUgaW5wdXQgZmllbGQgY29udGFpbmluZyB0aGUgdXNlci1wcm92aWRlZCBkYXRhLiBDYW4gYmUgYG51bGxgLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYHRydWVgIGlmIHN1Ym1pc3Npb24gc3VjY2VlZHMsIG9yIGBmYWxzZWAgaWYgYW4gZXJyb3Igb2NjdXJzLlxuICAgICAqIEB0aHJvd3MgTG9ncyBhbnkgZXJyb3JzIGVuY291bnRlcmVkIGR1cmluZyBleGVjdXRpb24uXG4gICAgICovXG4gICAgYXN5bmMgc3VibWl0KFxuICAgICAgICBtZXRob2Q6IFN1Ym1pdEZ1bmN0aW9uLFxuICAgICAgICBmaWVsZDogSFRNTElucHV0RWxlbWVudCB8IG51bGxcbiAgICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IHJhd1ZhbHVlOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZpZWxkIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFJlYWQgdmFsdWUgZnJvbSBpbnB1dCBhbmQgcmVzZXQgdG8gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBwYXJzZVZhbHVlcyhyYXdWYWx1ZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGUobWV0aG9kLCB2YWx1ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgYW4gYXN5bmNocm9ub3VzIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMsIG1hbmFnaW5nIGFjdGlvbiBleGVjdXRpb25cbiAgICAgKiBhbmQgaGFuZGxpbmcgZXJyb3JzIG9yIGludGVycnVwdGlvbnMuIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyBhY3Rpb25zIGFyZSBsb2dnZWQsXG4gICAgICogcmV0cmllZCBpZiBuZWNlc3NhcnksIGFuZCBwcm9wZXJseSBjbGVhbmVkIHVwIGFmdGVyIGV4ZWN1dGlvbi5cbiAgICAgKlxuICAgICAqIEB0ZW1wbGF0ZSBGdW5jdGlvbiAtIEEgZnVuY3Rpb24gdHlwZSB0aGF0IHJldHVybnMgYSBgUHJvbWlzZTx2b2lkPmAuXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIFRoZSBhc3luY2hyb25vdXMgbWV0aG9kIHRvIGV4ZWN1dGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0gdW50aWwgLSAoT3B0aW9uYWwpIFRoZSBzdGVwIGNvdW50IHRvIGV4ZWN1dGUgdW50aWwuIERlZmF1bHRzIHRvIGAwYC5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGV4ZWN1dGlvbiBpcyBjb21wbGV0ZVxuICAgICAqIEB0aHJvd3MgSWYgYW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnMsIGl0IGxvZ3MgdGhlIGVycm9yIGFuZCByZXNldHMgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgYXN5bmMgZXhlY3V0ZTxGdW5jdGlvbiBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTx2b2lkPj4oXG4gICAgICAgIG1ldGhvZDogRnVuY3Rpb24sXG4gICAgICAgIGFyZ3M6IFBhcmFtZXRlcnM8RnVuY3Rpb24+LFxuICAgICAgICB1bnRpbCA9IDBcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmFjdGlvbnMucHVzaCh7IG1ldGhvZCwgYXJncywgc3RlcENvdW50OiB1bnRpbCB9KTtcbiAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICBgRVhFQyAke3VudGlsfTogJHttZXRob2QubmFtZX0gJHthcmdzLmpvaW4oXCIsIFwiKX0sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zXG4gICAgICAgICAgICApfWBcbiAgICAgICAgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5ydW5BY3Rpb25zTG9vcCgpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9ucy5sZW5ndGggLSAxXS5zdGVwQ291bnQgPSB0aGlzLmN1cnJlbnRTdGVwO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICAgICAgYERPTkUgLyAke3RoaXMuY3VycmVudFN0ZXB9OiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYWN0aW9ucyl9YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyhmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgcmVhc29uIGlzIHRocm93biBmcm9tIGFzeW5jIGxpc3RlbmVyXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRSZWFzb24ocmVhc29uKSkge1xuICAgICAgICAgICAgICAgIC8vIEVycm9yIG5vdCB0aHJvd24gYnkgYXN5bmMgaGFuZGxlcnMuIExvZyBpdCBhbmQgZXhpdFxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TGlzdGVuZXJzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIHJ1bm5pbmcgYXJndW1lbnQgaXMgcHJvdmlkZWQgc2V0IHJ1bm5pbmcgc3RhdGVcbiAgICAgICAgICAgIGlmIChyZWFzb24ucnVubmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuc2V0UnVubmluZyhyZWFzb24ucnVubmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMucG9wKCk7XG4gICAgICAgICAgICB1bnRpbCA9IHJlYXNvbi51bnRpbDtcbiAgICAgICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgICAgIGBSRVJVTiAke3VudGlsfSAvICR7dGhpcy5jdXJyZW50U3RlcH06ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1xuICAgICAgICAgICAgICAgICl9YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gdW50aWwgaXMgc21hbGxlciBvciBlcXVhbCB0byAwIG1lYW5pbmcgdGhlIHByZXZpb3VzIGFjdGlvbiBzaG91bGQgYmUgcnVuIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHVudGlsIDw9IDAgJiYgdGhpcy5hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmFjdGlvbnMucG9wKCkhOyAvLyAhIGJlY2F1c2Ugd2Uga25vdyB0aGF0IGFycmF5IGlzIG5vbi1lbXB0eSAoYWN0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IGFjdGlvbi5tZXRob2QgYXMgRnVuY3Rpb247XG4gICAgICAgICAgICAgICAgYXJncyA9IGFjdGlvbi5hcmdzIGFzIFBhcmFtZXRlcnM8RnVuY3Rpb24+O1xuICAgICAgICAgICAgICAgIHVudGlsID0gYWN0aW9uLnN0ZXBDb3VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmUgZXhlY3V0ZSBpZiB0aGVyZSBpcyBzb21ldGhpbmcgdG8gcnVuIHVudGlsLCBvdGhlcndpc2UgcmVzZXRcbiAgICAgICAgICAgIGlmICh1bnRpbCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGUobWV0aG9kLCBhcmdzLCB1bnRpbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIGEgc2VxdWVuY2Ugb2YgYWN0aW9ucyBzdG9yZWQgaW4gYHRoaXMuYWN0aW9uc2AuXG4gICAgICogRWFjaCBhY3Rpb24gaXMgcHJvY2Vzc2VkIGluIG9yZGVyLCB1cGRhdGluZyB0aGUgY3VycmVudCBhY3Rpb24gYW5kIHN0ZXAgY291bnRlcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGFsbCBhY3Rpb25zIGhhdmUgYmVlbiBleGVjdXRlZCBzZXF1ZW50aWFsbHkuXG4gICAgICovXG4gICAgYXN5bmMgcnVuQWN0aW9uc0xvb3AoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBvdXIgYWN0aW9uc1xuICAgICAgICBmb3IgKGxldCBuQWN0aW9uID0gMDsgbkFjdGlvbiA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IG5BY3Rpb24rKykge1xuICAgICAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYWN0aW9uc1tuQWN0aW9uXTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG5BY3Rpb247XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcblxuICAgICAgICAgICAgLy8gR2V0IGFuZCBzZXQgdGl0bGUgZm9yIHRoaXMgYWN0aW9uXG4gICAgICAgICAgICAvLyBNYWtlIGNhbWVsQ2FzZSBzZXBhcmF0ZSB3b3JkczogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTQ4NjMwXG4gICAgICAgICAgICBjb25zdCBtZXRob2ROYW1lQXJyID1cbiAgICAgICAgICAgICAgICBhY3Rpb24ubWV0aG9kLm5hbWUubWF0Y2goL1tBLVphLXpdW2Etel0qL2cpIHx8IFtdO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IG1ldGhvZE5hbWVBcnJcbiAgICAgICAgICAgICAgICAubWFwKChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBgJHttZXRob2ROYW1lfSAke2FjdGlvbi5hcmdzLmpvaW4oXCIsIFwiKX1gO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICAgICAgYENBTEwgJHtuQWN0aW9ufTogJHt0aXRsZX0sICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hY3Rpb25zKX1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0VGl0bGUodGl0bGUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcIlwiKTtcblxuICAgICAgICAgICAgLy8gQmluZCB0aGlzIHRvIG1ldGhvZCBhbmQgY2FsbCBpdFxuICAgICAgICAgICAgYXdhaXQgYWN0aW9uLm1ldGhvZC5hcHBseSh0aGlzLCBhY3Rpb24uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZShcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAuLi5hcmdzOiB1bmtub3duW11cbiAgICApOiBQcm9taXNlPHVua25vd24+IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmdldE1lc3NhZ2UobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RlcFxuICAgICAgICAgICAgfS4gRG9pbmc6ICR7Ym9keX0gKHJ1bm5pbmc6ICR7dGhpcy5nZW5lcmFsQ29udHJvbHMuaXNSdW5uaW5nKCl9KSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNcbiAgICAgICAgICAgICl9YFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIHJlc2V0dGluZyBubyBwYXVzZSBzaG91bGQgYmUgcnVuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzUmVzZXR0aW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLnNldEJvZHkoYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25zW3RoaXMuY3VycmVudEFjdGlvbl07XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHN0ZXAgaGFzIGJlZW4gZXhlY3V0ZWQgcHJldmlvdXNseSAoYWN0aW9uLnN0ZXBDb3VudCA9IDAgaWYgZmlyc3QgdGltZSBhbmQgaGFzIGEgdmFsdWUgb3RoZXJ3aXNlKVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0ZXAgPCBhY3Rpb24uc3RlcENvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuZmFzdEZvcndhcmQocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBhc3luYyBsaXN0ZW5lcnMgdGhhdCBoYW5kbGUgYnV0dG9uIHByZXNzZXMgd2hpbGUgcGF1c2VkXG4gICAgICAgICAgICBsZXQgcnVubmVyVGltZXI6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuYWRkQXN5bmNMaXN0ZW5lcnMoXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3QsXG4gICAgICAgICAgICAgICAgcnVubmVyVGltZXJcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIElmIHJ1bm5pbmcsIGF1dG9tYXRpY2FsbHkgc3RlcCBmb3J3YXJkIGFmdGVyIHdhaXRpbmcgYW5pbWF0aW9uIHNwZWVkXG4gICAgICAgICAgICBpZiAodGhpcy5nZW5lcmFsQ29udHJvbHMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicnVubmluZ1wiKTtcbiAgICAgICAgICAgICAgICBydW5uZXJUaW1lciA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMuZ2VuZXJhbENvbnRyb2xzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSAqIDEuMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2UoXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgLi4uYXJnczogdW5rbm93bltdXG4gICAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXNzdW1lIHRoYXQgbWVzc2FnZSBpcyBhIGtleSB0byBhY2Nlc3MgdGhpcy5tZXNzYWdlc1xuICAgICAgICBsZXQgdGl0bGU6IE1lc3NhZ2VzT2JqZWN0W3N0cmluZ10gPSB0aGlzLm1lc3NhZ2VzO1xuICAgICAgICBjb25zdCBrZXlzID0gbWVzc2FnZS5zcGxpdChcIi5cIik7XG4gICAgICAgIGlmICghKGtleXNbMF0gaW4gdGl0bGUpKSB7XG4gICAgICAgICAgICAvLyBBc3N1bXB0aW9uIHdhcyB3cm9uZyByZXR1cm5pbmcgdGhlIG9yaWdpbmFsIG1lc3NhZ2UgYW5kIHRoZSBleHRyYSBhcmd1bWVudHNcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAoISh0eXBlb2YgdGl0bGUgPT09IFwib2JqZWN0XCIgJiYga2V5IGluIHRpdGxlKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGVba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRpdGxlIGlzIG5vdyBob3BlZnVsbHkgYSBzdHJpbmcgb3IgZnVuY3Rpb24gZnJvbSB0aGlzLm1lc3NhZ2VzXG4gICAgICAgIGlmICh0eXBlb2YgdGl0bGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRpdGxlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aXRsZTtcbiAgICB9XG5cbiAgICBhbmltYXRlKGVsZW06IEVsZW1lbnQsIGFuaW1hdGUgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQW5pbWF0aW5nKCkgJiYgYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLnNldFN0YXR1cyhcInJ1bm5pbmdcIik7XG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicGF1c2VkXCIsIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5hbmltYXRlKHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSwgMCwgXCJub3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gXCJ+L2RlYnVnZ2VyXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5cbmV4cG9ydCB0eXBlIFJlc29sdmUgPSAodmFsdWU6IHVua25vd24pID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBSZWplY3QgPSAocHJvcHM6IFJlamVjdFJlYXNvbikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIFJlamVjdFJlYXNvbiA9IHsgdW50aWw6IG51bWJlcjsgcnVubmluZz86IGJvb2xlYW4gfTtcblxudHlwZSBMaXN0ZW5lclR5cGUgPSBcImNsaWNrXCIgfCBcImNoYW5nZVwiO1xudHlwZSBBbGxvd2VkRWxlbWVudHMgPVxuICAgIHwgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICB8IEhUTUxCdXR0b25FbGVtZW50XG4gICAgfCBIVE1MRmllbGRTZXRFbGVtZW50O1xudHlwZSBJZGxlTGlzdGVuZXIgPSB7XG4gICAgZWxlbWVudDogQWxsb3dlZEVsZW1lbnRzO1xuICAgIHR5cGU6IExpc3RlbmVyVHlwZTtcbiAgICBjb25kaXRpb246ICgpID0+IGJvb2xlYW47XG4gICAgaGFuZGxlcjogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgQXN5bmNMaXN0ZW5lciA9IHtcbiAgICBlbGVtZW50OiBBbGxvd2VkRWxlbWVudHM7XG4gICAgdHlwZTogTGlzdGVuZXJUeXBlO1xuICAgIGhhbmRsZXI6IChyZXNvbHZlOiBSZXNvbHZlLCByZWplY3Q6IFJlamVjdCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgRXZlbnRMaXN0ZW5lcnNNYXAgPSBNYXA8XG4gICAgQWxsb3dlZEVsZW1lbnRzLFxuICAgIFBhcnRpYWw8UmVjb3JkPExpc3RlbmVyVHlwZSwgKCkgPT4gdm9pZD4+XG4+O1xuXG5leHBvcnQgY2xhc3MgRW5naW5lR2VuZXJhbENvbnRyb2xzIHtcbiAgICBnZW5lcmFsQ29udHJvbHM6IEhUTUxGaWVsZFNldEVsZW1lbnQ7XG4gICAgZmFzdEJhY2t3YXJkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBzdGVwQmFja3dhcmRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRvZ2dsZVJ1bm5lckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgc3RlcEZvcndhcmRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGZhc3RGb3J3YXJkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBhbmltYXRpb25TcGVlZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgb2JqZWN0U2l6ZVNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgICBlbmdpbmU6IEVuZ2luZTtcbiAgICBkZWJ1Z2dlcjogRGVidWdnZXI7XG5cbiAgICBhY3RpdmVMaXN0ZW5lcnM6IEV2ZW50TGlzdGVuZXJzTWFwID0gbmV3IE1hcCgpO1xuICAgIGlkbGVMaXN0ZW5lcnM6IElkbGVMaXN0ZW5lcltdID0gW107XG4gICAgYXN5bmNMaXN0ZW5lcnM6IEFzeW5jTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgZW5naW5lOiBFbmdpbmUpIHtcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XG4gICAgICAgIHRoaXMuZGVidWdnZXIgPSBlbmdpbmUuZGVidWdnZXI7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMgPSBxdWVyeVNlbGVjdG9yPEhUTUxGaWVsZFNldEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJmaWVsZHNldC5nZW5lcmFsQ29udHJvbHNcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZmFzdEJhY2t3YXJkQnV0dG9uID0gcXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICAgICAgICBcImJ1dHRvbi5mYXN0QmFja3dhcmRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0ZXBCYWNrd2FyZEJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJidXR0b24uc3RlcEJhY2t3YXJkXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50b2dnbGVSdW5uZXJCdXR0b24gPSBxdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIFwiYnV0dG9uLnRvZ2dsZVJ1bm5lclwiLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RlcEZvcndhcmRCdXR0b24gPSBxdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIFwiYnV0dG9uLnN0ZXBGb3J3YXJkXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mYXN0Rm9yd2FyZEJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJidXR0b24uZmFzdEZvcndhcmRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9iamVjdFNpemVTZWxlY3QgPSBxdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcbiAgICAgICAgICAgIFwic2VsZWN0Lm9iamVjdFNpemVcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFuaW1hdGlvblNwZWVkU2VsZWN0ID0gcXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXG4gICAgICAgICAgICBcInNlbGVjdC5hbmltYXRpb25TcGVlZFwiLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5pZGxlTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwQmFja3dhcmRCdXR0b24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogKCkgPT4gdGhpcy5lbmdpbmUuYWN0aW9ucy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSdW5uaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5lbmdpbmUuYWN0aW9ucy5wb3AoKSE7IC8vICEgYmVjYXVzZSB3ZSBrbm93IHRoYXQgYXJyYXkgaXMgbm9uLWVtcHR5IChhY3Rpb25zLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5leGVjdXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hcmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnN0ZXBDb3VudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLmZhc3RCYWNrd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiAoKSA9PiB0aGlzLmVuZ2luZS5hY3Rpb25zLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5hY3Rpb25zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmVuZ2luZS5hY3Rpb25zLnBvcCgpITtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmV4ZWN1dGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYXJncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc3RlcENvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMub2JqZWN0U2l6ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZS5hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZW5naW5lLmFjdGlvbnMucG9wKCkhOyAvLyAhIGJlY2F1c2Ugd2Uga25vdyB0aGF0IGFycmF5IGlzIG5vbi1lbXB0eSAoYWN0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZXhlY3V0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hcmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zdGVwQ291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFzeW5jTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwRm9yd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJ1bm5pbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5mYXN0Rm9yd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5hY3Rpb25zW3RoaXMuZW5naW5lLmN1cnJlbnRBY3Rpb25dLnN0ZXBDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXN0Rm9yd2FyZChyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMudG9nZ2xlUnVubmVyQnV0dG9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlUnVubmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwQmFja3dhcmRCdXR0b24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnRpbDogdGhpcy5lbmdpbmUuY3VycmVudFN0ZXAgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLmZhc3RCYWNrd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KHsgdW50aWw6IDAgfSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMub2JqZWN0U2l6ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7IHVudGlsOiB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCB9KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhZGRBc3luY0xpc3RlbmVycyhcbiAgICAgICAgcmVzb2x2ZTogUmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0OiBSZWplY3QsXG4gICAgICAgIHJ1bm5lclRpbWVyOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLmFzeW5jTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKGxpc3RlbmVyLmVsZW1lbnQsIGxpc3RlbmVyLnR5cGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocnVubmVyVGltZXIpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXIocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRJZGxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlkbGVMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIobGlzdGVuZXIuZWxlbWVudCwgbGlzdGVuZXIudHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBgJHtsaXN0ZW5lci50eXBlfTogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmVuZ2luZS5hY3Rpb25zKX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXIoXG4gICAgICAgIGVsZW1lbnQ6IEFsbG93ZWRFbGVtZW50cyxcbiAgICAgICAgdHlwZTogTGlzdGVuZXJUeXBlLFxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB2b2lkXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuYWN0aXZlTGlzdGVuZXJzO1xuICAgICAgICBpZiAoIWxpc3RlbmVycy5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZWxlbWVudCwge30pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzLmdldChlbGVtZW50KSE7XG4gICAgICAgIGNvbnN0IG9sZEhhbmRsZXIgPSBsaXN0ZW5lclt0eXBlXTtcbiAgICAgICAgaWYgKG9sZEhhbmRsZXIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBvbGRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lclt0eXBlXSA9IGhhbmRsZXI7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgICAgZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0eXBlIGluIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lclt0eXBlIGFzIExpc3RlbmVyVHlwZV0hIC8vICEgYmVjYXVzZSB3ZSBrbm93IHRoYXQgdGhlIHR5cGUgZXhpc3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWN0aXZlTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaXNSdW5uaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVSdW5uZXJCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgc2V0UnVubmluZyhydW5uaW5nOiBib29sZWFuKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLnRvZ2dsZVJ1bm5lckJ1dHRvbi5jbGFzc0xpc3Q7XG4gICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xhc3Nlcy5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b2dnbGVSdW5uZXIoKTogdGhpcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFJ1bm5pbmcoIXRoaXMuaXNSdW5uaW5nKCkpO1xuICAgIH1cblxuICAgIGFkZFJ1bm5lckxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMudG9nZ2xlUnVubmVyQnV0dG9uLCBcImNsaWNrXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVJ1bm5lcigpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RlcEZvcndhcmQocmVzb2x2ZTogUmVzb2x2ZSwgcmVqZWN0OiBSZWplY3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmdpbmUuY3VycmVudFN0ZXArKztcbiAgICAgICAgdGhpcy5lbmdpbmUuc3RhdGUuc2V0QW5pbWF0aW5nKHRydWUpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgZmFzdEZvcndhcmQocmVzb2x2ZTogUmVzb2x2ZSwgcmVqZWN0OiBSZWplY3QpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5lbmdpbmUuYWN0aW9uc1t0aGlzLmVuZ2luZS5jdXJyZW50QWN0aW9uXTtcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lLmN1cnJlbnRTdGVwID49IGFjdGlvbi5zdGVwQ291bnQpIHtcbiAgICAgICAgICAgIGFjdGlvbi5zdGVwQ291bnQgPSB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCsrO1xuICAgICAgICB0aGlzLmVuZ2luZS5zdGF0ZS5zZXRBbmltYXRpbmcoZmFsc2UpO1xuICAgICAgICAvLyBJZiBkZWJ1Z2dpbmcgaXMgZW5hYmxlZCB0aGVuIGFkZCBhIHNtYWxsIGRlbGF5XG4gICAgICAgIGlmICh0aGlzLmRlYnVnZ2VyLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZ2luZSwgTWVzc2FnZXNPYmplY3QgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBCaW5hcnlEaXIsIEJpbmFyeU5vZGUgfSBmcm9tIFwifi9vYmplY3RzL2JpbmFyeS1ub2RlXCI7XG5pbXBvcnQgeyBEU0FycmF5IH0gZnJvbSBcIn4vb2JqZWN0cy9kc2FycmF5XCI7XG5pbXBvcnQgeyBUZXh0Q2lyY2xlIH0gZnJvbSBcIn4vb2JqZWN0cy90ZXh0LWNpcmNsZVwiO1xuaW1wb3J0IHsgUHJpb3F1ZXVlIH0gZnJvbSBcIn4vcHJpb3F1ZXVlc1wiO1xuXG5leHBvcnQgY29uc3QgQmluYXJ5SGVhcE1lc3NhZ2VzID0ge1xuICAgIGdlbmVyYWw6IHtcbiAgICAgICAgZW1wdHk6IFwiSGVhcCBpcyBlbXB0eSFcIixcbiAgICAgICAgZnVsbDogXCJIZWFwIGlzIGZ1bGwhXCIsXG4gICAgICAgIGZpbmlzaGVkOiBcIkZpbmlzaGVkXCIsXG4gICAgfSxcbiAgICBpbnNlcnQ6IHtcbiAgICAgICAgdmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiBgSW5zZXJ0IHZhbHVlOiAke3ZhbHVlfWAsXG4gICAgICAgIHNoaWZ0VXA6IFwiU2hpZnQgdGhlIHZhbHVlIHVwd2FyZHNcIixcbiAgICAgICAgc3RvcFNoaWZ0OiAocGFyZW50VmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIGBUaGUgcGFyZW50ICR7cGFyZW50VmFsdWV9IGlzIG5vdCBsYXJnZXI6IHN0b3AgaGVyZWAsXG4gICAgICAgIHNoaWZ0QWdhaW46IChwYXJlbnRWYWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgYFRoZSBwYXJlbnQgJHtwYXJlbnRWYWx1ZX0gaXMgbGFyZ2VyYCxcbiAgICB9LFxuICAgIGRlbGV0ZToge1xuICAgICAgICByb290OiAobWluVmFsdWU6IHN0cmluZykgPT4gYFJlbW92ZSB0aGUgcm9vdDogJHttaW5WYWx1ZX1gLFxuICAgICAgICBtaW5WYWx1ZTogKG1pblZhbHVlOiBzdHJpbmcpID0+IGBSZW1vdmUgdGhlIG1pbmltdW0gdmFsdWU6ICR7bWluVmFsdWV9YCxcbiAgICAgICAgbGFzdEhlYXA6IFwiUmVtb3ZlIHRoZSBuZXcgbGFzdCBoZWFwIHZhbHVlXCIsXG4gICAgICAgIHNoaWZ0RG93bjogXCJTaGlmdCB0aGUgdmFsdWUgZG93bndhcmRzXCIsXG4gICAgICAgIHN0b3BTaGlmdDogKGN1cnJlbnRWYWx1ZTogc3RyaW5nLCBjaGlsZFZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgVGhlIHZhbHVlICR7Y3VycmVudFZhbHVlfSBpcyBub3QgbGFyZ2VyIHRoYW4gdGhlIHNtYWxsZXN0IGNoaWxkICR7Y2hpbGRWYWx1ZX06IHN0b3AgaGVyZWAsXG4gICAgICAgIHNoaWZ0QWdhaW46IChjdXJyZW50VmFsdWU6IHN0cmluZywgY2hpbGRWYWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgYFRoZSB2YWx1ZSAke2N1cnJlbnRWYWx1ZX0gaXMgbGFyZ2VyIHRoYW4gdGhlIHNtYWxsZXN0IGNoaWxkICR7Y2hpbGRWYWx1ZX1gLFxuICAgIH0sXG4gICAgc3dhcDoge1xuICAgICAgICBzd2FwOiAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGBTd2FwICR7YX0gYW5kICR7Yn1gLFxuICAgICAgICBsYXN0VG9GaXJzdDogKHZhbDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgYFN3YXAgaW4gdGhlIGxhc3QgaGVhcCB2YWx1ZSB0byB0aGUgZmlyc3QgcG9zaXRpb246ICR7dmFsfWAsXG4gICAgfSxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIE1lc3NhZ2VzT2JqZWN0O1xuXG5leHBvcnQgY2xhc3MgQmluYXJ5SGVhcCBleHRlbmRzIEVuZ2luZSBpbXBsZW1lbnRzIFByaW9xdWV1ZSB7XG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VzT2JqZWN0ID0gQmluYXJ5SGVhcE1lc3NhZ2VzO1xuICAgIGFycmF5U2l6ZTogbnVtYmVyID0gMjg7XG4gICAgaW5pdGlhbFZhbHVlczogQXJyYXk8c3RyaW5nPiB8IG51bGwgPSBudWxsO1xuICAgIHRyZWVSb290OiBCaW5hcnlOb2RlIHwgbnVsbCA9IG51bGw7XG4gICAgdHJlZU5vZGVzOiBBcnJheTxCaW5hcnlOb2RlPiB8IG51bGwgPSBudWxsO1xuICAgIGhlYXBBcnJheTogRFNBcnJheSB8IG51bGwgPSBudWxsO1xuICAgIGhlYXBTaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGluaXRpYWxpc2UoaW5pdGlhbFZhbHVlczogQXJyYXk8c3RyaW5nPiB8IG51bGwgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFZhbHVlcyA9IGluaXRpYWxWYWx1ZXM7XG4gICAgICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldEFsZ29yaXRobSgpIHtcbiAgICAgICAgYXdhaXQgc3VwZXIucmVzZXRBbGdvcml0aG0oKTtcbiAgICAgICAgdGhpcy50cmVlUm9vdCA9IG51bGw7XG4gICAgICAgIHRoaXMudHJlZU5vZGVzID0gbmV3IEFycmF5KHRoaXMuYXJyYXlTaXplKTtcbiAgICAgICAgY29uc3QgW3hSb290LCB5Um9vdF0gPSB0aGlzLmdldFRyZWVSb290KCk7XG4gICAgICAgIHRoaXMuaGVhcEFycmF5ID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgbmV3IERTQXJyYXkodGhpcy5hcnJheVNpemUsIHRoaXMuZ2V0T2JqZWN0U2l6ZSgpLCB0cnVlKVxuICAgICAgICApLmluaXQodGhpcy5hcnJheVNpemUsIHhSb290LCB0aGlzLlN2Zy52aWV3Ym94KCkuaGVpZ2h0IC0geVJvb3QpO1xuICAgICAgICBpZiAoTnVtYmVyKHRoaXMuaGVhcEFycmF5LngoKSkgPCB0aGlzLiRTdmcubWFyZ2luKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXBBcnJheS54KHRoaXMuJFN2Zy5tYXJnaW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhcFNpemUgPSAwO1xuICAgICAgICBhd2FpdCB0aGlzLnN0YXRlLnJ1bldoaWxlUmVzZXR0aW5nKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluc2VydCguLi50aGlzLmluaXRpYWxWYWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNpemVUcmVlKCkge1xuICAgICAgICBjb25zdCBhbmltYXRlID0gIXRoaXMuc3RhdGUuaXNSZXNldHRpbmcoKTtcbiAgICAgICAgdGhpcy50cmVlUm9vdD8ucmVzaXplKFxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlUm9vdCgpLFxuICAgICAgICAgICAgdGhpcy4kU3ZnLm1hcmdpbixcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9kZVNwYWNpbmcoKSxcbiAgICAgICAgICAgIGFuaW1hdGUgPyB0aGlzLmdldEFuaW1hdGlvblNwZWVkKCkgOiAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5zZXJ0KC4uLnZhbHVlczogKHN0cmluZyB8IG51bWJlcilbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5zZXJ0T25lKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzd2FwKGo6IG51bWJlciwgazogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZU5vZGVzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmVlIG5vZGVzIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFwQXJyYXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYXAgYXJyYXkgbm90IGluaXRpYWxpc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpOb2RlID0gdGhpcy50cmVlTm9kZXNbal0sXG4gICAgICAgICAgICBrTm9kZSA9IHRoaXMudHJlZU5vZGVzW2tdO1xuXG4gICAgICAgIGNvbnN0IGpMYWJlbCA9IHRoaXMuU3ZnLnB1dChcbiAgICAgICAgICAgIG5ldyBUZXh0Q2lyY2xlKFxuICAgICAgICAgICAgICAgIGpOb2RlLmdldFRleHQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE9iamVjdFNpemUoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0cm9rZVdpZHRoKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKS5pbml0KGpOb2RlLmN4KCksIGpOb2RlLmN5KCkpO1xuICAgICAgICBjb25zdCBrTGFiZWwgPSB0aGlzLlN2Zy5wdXQoXG4gICAgICAgICAgICBuZXcgVGV4dENpcmNsZShcbiAgICAgICAgICAgICAgICBrTm9kZS5nZXRUZXh0KCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPYmplY3RTaXplKCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdHJva2VXaWR0aCgpXG4gICAgICAgICAgICApXG4gICAgICAgICkuaW5pdChrTm9kZS5jeCgpLCBrTm9kZS5jeSgpKTtcbiAgICAgICAgakxhYmVsLnNldENlbnRlcihrTGFiZWwuY3goKSwga0xhYmVsLmN5KCksIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSk7XG4gICAgICAgIGtMYWJlbC5zZXRDZW50ZXIoakxhYmVsLmN4KCksIGpMYWJlbC5jeSgpLCB0aGlzLmdldEFuaW1hdGlvblNwZWVkKCkpO1xuICAgICAgICB0aGlzLmhlYXBBcnJheS5zd2FwKGosIGssIHRydWUpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICBqTm9kZS5zZXRUZXh0KGtMYWJlbC5nZXRUZXh0KCkpO1xuICAgICAgICBrTm9kZS5zZXRUZXh0KGpMYWJlbC5nZXRUZXh0KCkpO1xuICAgICAgICBqTGFiZWwucmVtb3ZlKCk7XG4gICAgICAgIGtMYWJlbC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBhc3luYyBpbnNlcnRPbmUodmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7IC8vVE9ETzogQ2hlY2sgaWYgdGhpcyBjYW4gYmUgaGFuZGxlZCBiZXR0ZXJcbiAgICAgICAgaWYgKHRoaXMuaGVhcFNpemUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYXAgc2l6ZSBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJlZU5vZGVzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmVlIG5vZGVzIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFwQXJyYXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYXAgYXJyYXkgbm90IGluaXRpYWxpc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlYXBTaXplID49IHRoaXMuYXJyYXlTaXplKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiZ2VuZXJhbC5mdWxsXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuaGVhcFNpemU7XG4gICAgICAgIGxldCBwYXJlbnRJbmRleCA9IE1hdGguZmxvb3IoKGN1cnJlbnRJbmRleCAtIDEpIC8gMik7XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy50cmVlTm9kZXNbcGFyZW50SW5kZXhdO1xuICAgICAgICBjb25zdCBhcnJheUxhYmVsID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgbmV3IFRleHRDaXJjbGUodmFsdWUsIHRoaXMuZ2V0T2JqZWN0U2l6ZSgpLCB0aGlzLmdldFN0cm9rZVdpZHRoKCkpXG4gICAgICAgICkuaW5pdCguLi50aGlzLmdldE5vZGVTdGFydCgpKTtcbiAgICAgICAgbGV0IHRyZWVOb2RlID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgbmV3IEJpbmFyeU5vZGUodmFsdWUsIHRoaXMuZ2V0T2JqZWN0U2l6ZSgpLCB0aGlzLmdldFN0cm9rZVdpZHRoKCkpXG4gICAgICAgICkuaW5pdCguLi50aGlzLmdldE5vZGVTdGFydCgpKTtcblxuICAgICAgICB0aGlzLnRyZWVOb2Rlc1tjdXJyZW50SW5kZXhdID0gdHJlZU5vZGU7XG4gICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJpbnNlcnQudmFsdWVcIiwgdmFsdWUpO1xuXG4gICAgICAgIGFycmF5TGFiZWwuc2V0Q2VudGVyKFxuICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuZ2V0Q1goY3VycmVudEluZGV4KSxcbiAgICAgICAgICAgIHRoaXMuaGVhcEFycmF5LmN5KCksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblNwZWVkKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmVlUm9vdCA9IHRyZWVOb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgICAoY3VycmVudEluZGV4IC0gMSkgLyAyID09PSBwYXJlbnRJbmRleCA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5zZXRDaGlsZChkaXJlY3Rpb24sIHRyZWVOb2RlLCB0aGlzLmdldFN0cm9rZVdpZHRoKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzaXplVHJlZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKHVuZGVmaW5lZCk7XG5cbiAgICAgICAgYXJyYXlMYWJlbC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0RGlzYWJsZWQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaGVhcEFycmF5LnNldFZhbHVlKGN1cnJlbnRJbmRleCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRJbmRleEhpZ2hsaWdodChjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICB0aGlzLmhlYXBTaXplKys7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRyZWVOb2RlLnNldEhpZ2hsaWdodCh0cnVlKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJpbnNlcnQuc2hpZnRVcFwiKTtcbiAgICAgICAgICAgIHBhcmVudEluZGV4ID0gTWF0aC5mbG9vcigoY3VycmVudEluZGV4IC0gMSkgLyAyKTtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSB0aGlzLnRyZWVOb2Rlc1twYXJlbnRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRWYWx1ZSA9IHRoaXMuaGVhcEFycmF5LmdldFZhbHVlKHBhcmVudEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuaGVhcEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KHBhcmVudEluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9XG4gICAgICAgICAgICAgICAgKGN1cnJlbnRJbmRleCAtIDEpIC8gMiA9PT0gcGFyZW50SW5kZXggPyBcImxlZnRcIiA6IFwicmlnaHRcIjtcbiAgICAgICAgICAgIHBhcmVudE5vZGUuc2V0Q2hpbGRIaWdobGlnaHQoZGlyZWN0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGNtcCA9IGNvbXBhcmUodmFsdWUsIHBhcmVudFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjbXAgPj0gMCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJpbnNlcnQuc3RvcFNoaWZ0XCIsIHBhcmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRJbmRleEhpZ2hsaWdodChjdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRJbmRleEhpZ2hsaWdodChwYXJlbnRJbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLnNldEhpZ2hsaWdodChmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZXRDaGlsZEhpZ2hsaWdodChkaXJlY3Rpb24sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJpbnNlcnQuc2hpZnRBZ2FpblwiLCBwYXJlbnRWYWx1ZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnN3YXAoXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4LFxuICAgICAgICAgICAgICAgIHBhcmVudEluZGV4LFxuICAgICAgICAgICAgICAgIFwic3dhcC5zd2FwXCIsXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgcGFyZW50VmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRJbmRleEhpZ2hsaWdodChjdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgIHRyZWVOb2RlLnNldEhpZ2hsaWdodChmYWxzZSk7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnNldENoaWxkSGlnaGxpZ2h0KGRpcmVjdGlvbiwgZmFsc2UpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gcGFyZW50SW5kZXg7XG4gICAgICAgICAgICB0cmVlTm9kZSA9IHBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgIHRyZWVOb2RlLnNldEhpZ2hsaWdodChmYWxzZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlTWluKCkge1xuICAgICAgICBpZiAodGhpcy5oZWFwU2l6ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhcCBzaXplIG5vdCBpbml0aWFsaXNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmVlTm9kZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyZWUgbm9kZXMgbm90IGluaXRpYWxpc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlYXBBcnJheSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhcCBhcnJheSBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJlZVJvb3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyZWUgcm9vdCBub3QgaW5pdGlhbGlzZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVhcFNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJnZW5lcmFsLmVtcHR5XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhcFNpemUtLTtcbiAgICAgICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmhlYXBBcnJheS5nZXRWYWx1ZSgwKTtcblxuICAgICAgICBjb25zdCBhcnJheUxhYmVsID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgbmV3IFRleHRDaXJjbGUoXG4gICAgICAgICAgICAgICAgbWluVmFsdWUsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPYmplY3RTaXplKCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdHJva2VXaWR0aCgpXG4gICAgICAgICAgICApXG4gICAgICAgICkuaW5pdCh0aGlzLmhlYXBBcnJheS5nZXRDWCgwKSwgdGhpcy5oZWFwQXJyYXkuY3koKSk7XG4gICAgICAgIGlmICh0aGlzLmhlYXBTaXplID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiZGVsZXRlLnJvb3RcIiwgbWluVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0VmFsdWUoMCwgXCJcIik7XG4gICAgICAgICAgICBhcnJheUxhYmVsLnNldENlbnRlcihcbiAgICAgICAgICAgICAgICAuLi50aGlzLmdldE5vZGVTdGFydCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMudHJlZVJvb3Quc2V0Q2VudGVyKFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0Tm9kZVN0YXJ0KCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TcGVlZCgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgYXJyYXlMYWJlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuaGVhcEFycmF5LnNldERpc2FibGVkKDAsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy50cmVlUm9vdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMudHJlZVJvb3QgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJlZUxhYmVsID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgbmV3IFRleHRDaXJjbGUoXG4gICAgICAgICAgICAgICAgbWluVmFsdWUsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPYmplY3RTaXplKCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdHJva2VXaWR0aCgpXG4gICAgICAgICAgICApXG4gICAgICAgICkuaW5pdCh0aGlzLnRyZWVSb290LmN4KCksIHRoaXMudHJlZVJvb3QuY3koKSk7XG4gICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJkZWxldGUubWluVmFsdWVcIiwgbWluVmFsdWUpO1xuICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRWYWx1ZSgwLCBcIlwiKTtcbiAgICAgICAgdGhpcy50cmVlUm9vdC5zZXRUZXh0KG51bGwpO1xuICAgICAgICBhcnJheUxhYmVsLnNldENlbnRlciguLi50aGlzLmdldE5vZGVTdGFydCgpLCB0aGlzLmdldEFuaW1hdGlvblNwZWVkKCkpO1xuICAgICAgICB0cmVlTGFiZWwuc2V0Q2VudGVyKC4uLnRoaXMuZ2V0Tm9kZVN0YXJ0KCksIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuaGVhcEFycmF5LmdldFZhbHVlKHRoaXMuaGVhcFNpemUpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKHVuZGVmaW5lZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc3dhcCgwLCB0aGlzLmhlYXBTaXplLCBcInN3YXAubGFzdFRvRmlyc3RcIiwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgdGhpcy50cmVlTm9kZXNbdGhpcy5oZWFwU2l6ZV0ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuaGVhcEFycmF5LnNldERpc2FibGVkKHRoaXMuaGVhcFNpemUsIHRydWUpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiZGVsZXRlLmxhc3RIZWFwXCIpO1xuXG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwO1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLnRyZWVOb2Rlc1tjdXJyZW50SW5kZXhdO1xuICAgICAgICB3aGlsZSAoY3VycmVudEluZGV4IDwgdGhpcy5oZWFwU2l6ZSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0SGlnaGxpZ2h0KHRydWUpO1xuICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY3VycmVudEluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIGxldCBjaGlsZEluZGV4ID0gY3VycmVudEluZGV4ICogMiArIDE7XG4gICAgICAgICAgICBpZiAoY2hpbGRJbmRleCA+PSB0aGlzLmhlYXBTaXplKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcImZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEhpZ2hsaWdodChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJkZWxldGUuc2hpZnREb3duXCIpO1xuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbjogQmluYXJ5RGlyID0gXCJsZWZ0XCI7XG4gICAgICAgICAgICBsZXQgY2hpbGRWYWx1ZSA9IHRoaXMuaGVhcEFycmF5LmdldFZhbHVlKGNoaWxkSW5kZXgpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNoaWxkSW5kZXggKyAxIDwgdGhpcy5oZWFwU2l6ZSAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmUoY2hpbGRWYWx1ZSwgdGhpcy5oZWFwQXJyYXkuZ2V0VmFsdWUoY2hpbGRJbmRleCArIDEpKSA+IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwicmlnaHRcIjtcbiAgICAgICAgICAgICAgICBjaGlsZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgY2hpbGRWYWx1ZSA9IHRoaXMuaGVhcEFycmF5LmdldFZhbHVlKGNoaWxkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gdGhpcy50cmVlTm9kZXNbY2hpbGRJbmRleF07XG5cbiAgICAgICAgICAgIHRoaXMuaGVhcEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGNoaWxkSW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0Q2hpbGRIaWdobGlnaHQoZGlyZWN0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5zZXRIaWdobGlnaHQodHJ1ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNtcCA9IGNvbXBhcmUoY3VycmVudFZhbHVlLCBjaGlsZFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjbXAgPD0gMCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJkZWxldGUuc3RvcFNoaWZ0XCIsIGN1cnJlbnRWYWx1ZSwgY2hpbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY2hpbGRJbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldENoaWxkSGlnaGxpZ2h0KGRpcmVjdGlvbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5zZXRIaWdobGlnaHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiZGVsZXRlLnNoaWZ0QWdhaW5cIiwgY3VycmVudFZhbHVlLCBjaGlsZFZhbHVlKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3dhcChcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXgsXG4gICAgICAgICAgICAgICAgY2hpbGRJbmRleCxcbiAgICAgICAgICAgICAgICBcInN3YXAuc3dhcFwiLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZFZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5oZWFwQXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmhlYXBBcnJheS5zZXRJbmRleEhpZ2hsaWdodChjaGlsZEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRDaGlsZEhpZ2hsaWdodChkaXJlY3Rpb24sIGZhbHNlKTtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5zZXRIaWdobGlnaHQoZmFsc2UpO1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gY2hpbGRJbmRleDtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY2hpbGROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYXVzZSh1bmRlZmluZWQpO1xuICAgICAgICBhcnJheUxhYmVsLnJlbW92ZSgpO1xuICAgICAgICB0cmVlTGFiZWwucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVzaXplVHJlZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZ2luZSwgTWVzc2FnZXNPYmplY3QsIE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IFJlamVjdFJlYXNvbiB9IGZyb20gXCIuL2dlbmVyYWwtY29udHJvbHMvZW5naW5lLWdlbmVyYWwtY29udHJvbHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU51bWJlcihpbnB1dDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICBpbnB1dCA9IGlucHV0LnRyaW0oKTtcbiAgICByZXR1cm4gaW5wdXQgPT09IFwiXCIgfHwgaXNOYU4oTnVtYmVyKGlucHV0KSkgPyBpbnB1dCA6IE51bWJlcihpbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZhbHVlcyhcbiAgICB2YWx1ZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogKHN0cmluZyB8IG51bWJlcilbXSB7XG4gICAgaWYgKCF2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXMubWFwKCh2KSA9PiBub3JtYWxpemVOdW1iZXIodikpO1xufVxuXG50eXBlIEFsbG93ZWRDaGFyYWN0ZXJzID1cbiAgICB8IFwiaW50XCJcbiAgICB8IFwiaW50K1wiXG4gICAgfCBcImZsb2F0XCJcbiAgICB8IFwiZmxvYXQrXCJcbiAgICB8IFwiQUxQSEFcIlxuICAgIHwgXCJBTFBIQStcIlxuICAgIHwgXCJhbHBoYVwiXG4gICAgfCBcImFscGhhK1wiXG4gICAgfCBcIkFMUEhBTlVNXCJcbiAgICB8IFwiQUxQSEFOVU0rXCJcbiAgICB8IFwiYWxwaGFudW1cIlxuICAgIHwgXCJhbHBoYW51bStcIjtcblxuY29uc3QgYWxsb3dlZENoYXJhY3RlcnNSZWdleCA9IHtcbiAgICBpbnQ6IFwiMC05XCIsXG4gICAgXCJpbnQrXCI6IFwiMC05IFwiLFxuICAgIGZsb2F0OiBcIi0uMC05XCIsXG4gICAgXCJmbG9hdCtcIjogXCItLjAtOSBcIixcbiAgICBBTFBIQTogXCJBLVpcIixcbiAgICBcIkFMUEhBK1wiOiBcIkEtWiBcIixcbiAgICBhbHBoYTogXCJhLXpBLVpcIixcbiAgICBcImFscGhhK1wiOiBcImEtekEtWiBcIixcbiAgICBBTFBIQU5VTTogXCJBLVowLTlcIixcbiAgICBcIkFMUEhBTlVNK1wiOiBcIkEtWjAtOSBcIixcbiAgICBhbHBoYW51bTogXCJhLXpBLVowLTlcIixcbiAgICBcImFscGhhbnVtK1wiOiBcImEtekEtWjAtOSBcIixcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxBbGxvd2VkQ2hhcmFjdGVycywgc3RyaW5nPjtcblxuLy8gQWRkcyBcInJldHVybi10by1zdWJtaXRcIiBmdW5jdGlvbmFsaXR5IHRvIGEgdGV4dCBpbnB1dCBmaWVsZCAtIHBlcmZvcm1zIGFjdGlvbiB3aGVuIHRoZSB1c2VyIHByZXNzZXMgRW50ZXJcbi8vIEFkZGl0aW9uYWxseSByZXN0cmljdHMgaW5wdXQgdG8gdGhlIGRlZmluZWQgYWxsb3dlZCBjaGFyYWN0ZXJzICh3aXRoICsgbWVhbmluZyBzcGFjZXMgYXJlIGFsbG93ZWQpXG5leHBvcnQgZnVuY3Rpb24gYWRkUmV0dXJuU3VibWl0KFxuICAgIGZpZWxkOiBIVE1MSW5wdXRFbGVtZW50LFxuICAgIGFsbG93ZWQ6IEFsbG93ZWRDaGFyYWN0ZXJzLFxuICAgIGFjdGlvbj86ICgpID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGNvbnN0IGFsbG93ZWRDaGFyYWN0ZXJzID0gYWxsb3dlZENoYXJhY3RlcnNSZWdleFthbGxvd2VkXTtcblxuICAgIGNvbnN0IGlzQWxsb3dlZCA9IG5ldyBSZWdFeHAoYFteJHthbGxvd2VkQ2hhcmFjdGVyc31dYCwgXCJnXCIpO1xuXG4gICAgLy8gVHJhbnNmb3JtIGNhc2Ugb2YgdGV4dCBpbnB1dCB0byBtYXRjaCBhbGxvd2VkXG4gICAgZnVuY3Rpb24gbWF0Y2hBbGxvd2VkQ2FzZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoYWxsb3dlZENoYXJhY3RlcnMgPT09IGFsbG93ZWRDaGFyYWN0ZXJzLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dlZENoYXJhY3RlcnMgPT09IGFsbG93ZWRDaGFyYWN0ZXJzLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLy8gSWRlYSB0YWtlbiBmcm9tIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNDcxOTgxOFxuICAgIC8vIEJsb2NrIHVud2FudGVkIGNoYXJhY3RlcnMgZnJvbSBiZWluZyB0eXBlZFxuICAgIGZpZWxkLm9uaW5wdXQgPSAoXykgPT4ge1xuICAgICAgICBsZXQgcG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnQgfHwgMDtcbiAgICAgICAgbGV0IHZhbHVlID0gbWF0Y2hBbGxvd2VkQ2FzZShmaWVsZC52YWx1ZSk7XG4gICAgICAgIGlmIChpc0FsbG93ZWQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShpc0FsbG93ZWQsIFwiXCIpO1xuICAgICAgICAgICAgcG9zLS07XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZmllbGQuc2V0U2VsZWN0aW9uUmFuZ2UocG9zLCBwb3MpO1xuICAgIH07XG5cbiAgICAvLyBQZXJmb3JtIGFjdGlvbiB3aGVuIEVudGVyIGlzIHByZXNzZWRcbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZpZWxkLm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIE1lcmdlcyBhbGwga2V5cyBmcm9tIGRlZmF1bHRPYmplY3QgaW50byBvYmplY3Rcbi8vIFNldCBvdmVycmlkZSB0byB0cnVlIHRvIG92ZXJ3cml0ZSBleGlzdGluZyBrZXlzXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGVmYXVsdChcbiAgICBvYmplY3Q6IE1lc3NhZ2VzT2JqZWN0LFxuICAgIGRlZmF1bHRPYmplY3Q6IE1lc3NhZ2VzT2JqZWN0LFxuICAgIG92ZXJyaWRlOiBib29sZWFuID0gZmFsc2Vcbik6IE1lc3NhZ2VzT2JqZWN0IHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0T2JqZWN0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IGRlZmF1bHRPYmplY3Rba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgb2JqZWN0W2tleV0gIT09IG51bGwgJiZcbiAgICAgICAgICAgIHR5cGVvZiBkZWZhdWx0T2JqZWN0W2tleV0gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGRlZmF1bHRPYmplY3Rba2V5XSAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHVwZGF0ZURlZmF1bHQob2JqZWN0W2tleV0sIGRlZmF1bHRPYmplY3Rba2V5XSwgb3ZlcnJpZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IGRlZmF1bHRPYmplY3Rba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxvKG46IG51bWJlciwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCByZW0gPSBuICUgZDtcbiAgICByZXR1cm4gcmVtIDwgMCA/IHJlbSArIGQgOiByZW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGE6IHN0cmluZyB8IG51bWJlciwgYjogc3RyaW5nIHwgbnVtYmVyKTogLTEgfCAwIHwgMSB7XG4gICAgLy8gV2UgdXNlIG5vbi1icmVha2luZyBzcGFjZSBhcyBhIHByb3h5IGZvciB0aGUgZW1wdHkgc3RyaW5nLFxuICAgIC8vIGJlY2F1c2UgU1ZHIHRleHQgb2JqZWN0cyByZXNldCBjb29yZGluYXRlcyB0byAoMCwgMCkgZm9yIHRoZSBlbXB0eSBzdHJpbmcuXG4gICAgaWYgKGEgPT09IE5CU1ApIHtcbiAgICAgICAgYSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChiID09PSBOQlNQKSB7XG4gICAgICAgIGIgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoaXNOYU4oTnVtYmVyKGEpKSA9PT0gaXNOYU4oTnVtYmVyKGIpKSkge1xuICAgICAgICAvLyBhIGFuZCBiIGFyZSAoMSkgYm90aCBudW1iZXJzIG9yICgyKSBib3RoIG5vbi1udW1iZXJzXG4gICAgICAgIGlmICghaXNOYU4oTnVtYmVyKGEpKSkge1xuICAgICAgICAgICAgLy8gYSBhbmQgYiBhcmUgYm90aCBudW1iZXJzXG4gICAgICAgICAgICBhID0gTnVtYmVyKGEpO1xuICAgICAgICAgICAgYiA9IE51bWJlcihiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhIDwgYiA/IC0xIDogMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhIGFuZCBiIGFyZSBvZiBkaWZmZXJlbnQgdHlwZXNcbiAgICAgICAgLy8gbGV0J3Mgc2F5IHRoYXQgbnVtYmVycyBhcmUgc21hbGxlciB0aGFuIG5vbi1udW1iZXJzXG4gICAgICAgIHJldHVybiBpc05hTihOdW1iZXIoYSkpID8gMSA6IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRSZWFzb24ob2JqOiB1bmtub3duKTogb2JqIGlzIFJlamVjdFJlYXNvbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICBvYmogIT09IG51bGwgJiZcbiAgICAgICAgXCJ1bnRpbFwiIGluIG9iaiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnVudGlsID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIC8vIGlmIHJ1bm5pbmcgaXMgaW4gb2JqZWN0IGl0IHNob3VsZCBiZSBhIGJvb2xlYW5cbiAgICAgICAgKFwicnVubmluZ1wiIGluIG9iaiA/IHR5cGVvZiBvYmoucnVubmluZyA9PT0gXCJib29sZWFuXCIgOiB0cnVlKVxuICAgICk7XG59XG5cbmV4cG9ydCB0eXBlIFJlY29yZE9mRW5naW5lczxUIGV4dGVuZHMgRW5naW5lID0gRW5naW5lPiA9IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgbmV3IChjb250YWluZXJTZWxlY3Rvcjogc3RyaW5nKSA9PiBUXG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGlzZUVuZ2luZTxUIGV4dGVuZHMgRW5naW5lID0gRW5naW5lPihcbiAgICBjb250YWluZXJJRDogc3RyaW5nLFxuICAgIGVuZ2luZVN1YmNsYXNzZXM6IFJlY29yZE9mRW5naW5lczxOb0luZmVyPFQ+PlxuKTogeyBpc0Jhc2VFbmdpbmU6IGZhbHNlOyBlbmdpbmU6IFQgfSB8IHsgaXNCYXNlRW5naW5lOiB0cnVlOyBlbmdpbmU6IEVuZ2luZSB9IHtcbiAgICBjb25zdCBhbGdvU2VsZWN0b3IgPSBxdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcbiAgICAgICAgYCR7Y29udGFpbmVySUR9IC5hbGdvcml0aG1TZWxlY3RvcmBcbiAgICApO1xuXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuc2VhcmNoUGFyYW1zO1xuXG4gICAgY29uc3QgYWxnbyA9XG4gICAgICAgIG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLnNlYXJjaFBhcmFtcy5nZXQoXCJhbGdvcml0aG1cIikgfHwgXCJcIjtcbiAgICBhbGdvU2VsZWN0b3IudmFsdWUgPSBhbGdvO1xuXG4gICAgY29uc3QgRW5naW5lQ2xhc3MgPSBlbmdpbmVTdWJjbGFzc2VzW2FsZ29dIHx8IEVuZ2luZTtcbiAgICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lQ2xhc3MoY29udGFpbmVySUQpO1xuICAgIGVuZ2luZS5pbml0aWFsaXNlKCk7XG5cbiAgICBhbGdvU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIGlmIChhbGdvU2VsZWN0b3IudmFsdWUgaW4gZW5naW5lU3ViY2xhc3Nlcykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChcImFsZ29yaXRobVwiLCBhbGdvU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmRlbGV0ZShcImFsZ29yaXRobVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmdpbmUuZGVidWdnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQoXCJkZWJ1Z1wiLCBcInRydWVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuZGVsZXRlKFwiZGVidWdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXG4gICAgICAgICAgICBcIlwiLFxuICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgIGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0/JHtzZWFyY2hQYXJhbXN9YFxuICAgICAgICApO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoZW5naW5lU3ViY2xhc3Nlc1thbGdvXSkge1xuICAgICAgICByZXR1cm4geyBpc0Jhc2VFbmdpbmU6IGZhbHNlLCBlbmdpbmU6IGVuZ2luZSBhcyBUIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgaXNCYXNlRW5naW5lOiB0cnVlLCBlbmdpbmU6IGVuZ2luZSBhcyBFbmdpbmUgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yPFQgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8VD4oc2VsZWN0b3IpO1xuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiR7c2VsZWN0b3J9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbiIsImltcG9ydCB7IFN2ZyBhcyBTdmdFbGVtZW50LCBUZXh0IH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcbmltcG9ydCB7IE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcblxudHlwZSBJbmZvU3RhdHVzID0gXCJydW5uaW5nXCIgfCBcInBhdXNlZFwiIHwgXCJpbmFjdGl2ZVwiO1xuXG5jb25zdCBzdGF0dXNUZXh0ID0ge1xuICAgIHJ1bm5pbmc6IFwiQW5pbWF0aW5nXCIsXG4gICAgcGF1c2VkOiBcIlBhdXNlZFwiLFxuICAgIGluYWN0aXZlOiBcIklkbGVcIixcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxJbmZvU3RhdHVzLCBzdHJpbmc+O1xuXG5jb25zdCBzdGF0dXNDbGFzcyA9IHtcbiAgICBydW5uaW5nOiBcInJ1bm5pbmdcIixcbiAgICBwYXVzZWQ6IFwicGF1c2VkXCIsXG4gICAgaW5hY3RpdmU6IFwiXCIsXG59IGFzIGNvbnN0IHNhdGlzZmllcyBSZWNvcmQ8SW5mb1N0YXR1cywgc3RyaW5nPjtcblxuZXhwb3J0IGNsYXNzIEluZm8ge1xuICAgIHByaXZhdGUgU3ZnOiBTdmdFbGVtZW50O1xuICAgIHRpdGxlOiBUZXh0O1xuICAgIGJvZHk6IFRleHQ7XG4gICAgcHJpbnRlcjogVGV4dDtcbiAgICBzdGF0dXM6IFRleHQ7XG5cbiAgICBjb25zdHJ1Y3RvcihTdmc6IFN2Z0VsZW1lbnQsIG1hcmdpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuU3ZnID0gU3ZnO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLlN2Zy52aWV3Ym94KCkuaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5TdmcudGV4dChOQlNQKS5hZGRDbGFzcyhcInRpdGxlXCIpLngobWFyZ2luKS55KG1hcmdpbik7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLlN2Zy50ZXh0KE5CU1ApXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJtZXNzYWdlXCIpXG4gICAgICAgICAgICAueChtYXJnaW4pXG4gICAgICAgICAgICAueSgyICogbWFyZ2luKTtcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IHRoaXMuU3ZnLnRleHQoTkJTUClcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcInByaW50ZXJcIilcbiAgICAgICAgICAgIC54KG1hcmdpbilcbiAgICAgICAgICAgIC5jeShoZWlnaHQgLSAyICogbWFyZ2luKTtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5TdmcudGV4dChOQlNQKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwic3RhdHVzLXJlcG9ydFwiKVxuICAgICAgICAgICAgLngobWFyZ2luKVxuICAgICAgICAgICAgLmN5KGhlaWdodCAtIG1hcmdpbik7XG5cbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICB0aGlzLnByaW50ZXIgPSBwcmludGVyO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG5cbiAgICBzZXRUaXRsZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0KHRleHQgfHwgTkJTUCk7XG4gICAgfVxuXG4gICAgc2V0Qm9keSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5ib2R5LnRleHQodGV4dCB8fCBOQlNQKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0dXMoc3RhdHVzOiBJbmZvU3RhdHVzLCB0aW1lb3V0ID0gMTApOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c1xuICAgICAgICAgICAgICAgIC50ZXh0KHN0YXR1c1RleHRbc3RhdHVzXSB8fCBOQlNQKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcInBhdXNlZCBydW5uaW5nXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHN0YXR1c0NsYXNzW3N0YXR1c10pO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5TdmcucHV0KHRoaXMudGl0bGUudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLmJvZHkudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLnByaW50ZXIudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLnN0YXR1cy50ZXh0KE5CU1ApKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQYXRoIH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwiLi9jb25uZWN0aW9uXCI7XG5pbXBvcnQgeyBHcmFwaE5vZGUgfSBmcm9tIFwiLi9ncmFwaC1ub2RlXCI7XG5cbmV4cG9ydCBjb25zdCBiaW5hcnlEaXJzID0gW1wibGVmdFwiLCBcInJpZ2h0XCJdIGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBCaW5hcnlEaXIgPSAodHlwZW9mIGJpbmFyeURpcnMpW251bWJlcl07XG5cbmV4cG9ydCBjbGFzcyBCaW5hcnlOb2RlIGV4dGVuZHMgR3JhcGhOb2RlIHtcbiAgICAkaW5jb21pbmc6IFJlY29yZDxcInBhcmVudFwiLCBDb25uZWN0aW9uPHRoaXM+IHwgbnVsbD4gPSB7XG4gICAgICAgIHBhcmVudDogbnVsbCxcbiAgICB9O1xuICAgICRvdXRnb2luZzogUmVjb3JkPEJpbmFyeURpciwgQ29ubmVjdGlvbjx0aGlzPiB8IG51bGw+ID0ge1xuICAgICAgICBsZWZ0OiBudWxsLFxuICAgICAgICByaWdodDogbnVsbCxcbiAgICB9O1xuICAgICRudWxsYXJ5OiB7IGxlZnQ6IFBhdGg7IHJpZ2h0OiBQYXRoIH07XG4gICAgJGVkZ2ViZW5kcyA9IHsgbGVmdDogMC4xLCByaWdodDogLTAuMSB9O1xuICAgICRsZWZ0V2lkdGg6IG51bWJlciA9IDA7XG4gICAgJHJpZ2h0V2lkdGg6IG51bWJlciA9IDA7XG4gICAgJHdpZHRoOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBzaXplOiBudW1iZXIsIHN0cm9rZVdpZHRoOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIodGV4dCwgc2l6ZSwgc3Ryb2tlV2lkdGgpO1xuXG4gICAgICAgIHRoaXMuJG51bGxhcnkgPSB7XG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmdldE51bGxQYXRoKFwibGVmdFwiLCBzaXplLCBzdHJva2VXaWR0aCksXG4gICAgICAgICAgICByaWdodDogdGhpcy5nZXROdWxsUGF0aChcInJpZ2h0XCIsIHNpemUsIHN0cm9rZVdpZHRoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbml0KHg6IG51bWJlciwgeTogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgIHRoaXMuJG51bGxhcnkubGVmdC5iYWNrKCk7XG4gICAgICAgIHRoaXMuJG51bGxhcnkucmlnaHQuYmFjaygpO1xuICAgICAgICByZXR1cm4gc3VwZXIuaW5pdCh4LCB5KTtcbiAgICB9XG5cbiAgICBnZXROdWxsUGF0aChcbiAgICAgICAgc2lkZTogQmluYXJ5RGlyLFxuICAgICAgICBvYmplY3RTaXplOiBudW1iZXIsXG4gICAgICAgIHN0cm9rZVdpZHRoOiBudW1iZXJcbiAgICApOiBQYXRoIHtcbiAgICAgICAgY29uc3QgcyA9IHNpZGUgPT09IFwibGVmdFwiID8gLTEgOiAxO1xuXG4gICAgICAgIGNvbnN0IG5YID0gMC41ICogb2JqZWN0U2l6ZTtcbiAgICAgICAgY29uc3QgblkgPSAwLjggKiBvYmplY3RTaXplO1xuICAgICAgICBjb25zdCBuUiA9IDIgKiBzdHJva2VXaWR0aDtcblxuICAgICAgICBjb25zdCBwYXRoU3RyaW5nID0gYE0gMCwwIEwgJHtcbiAgICAgICAgICAgIHMgKiBuWFxuICAgICAgICB9LCR7bll9IG0gJHtuUn0sMCBhICR7blJ9LCR7blJ9IDAgMSwwICR7XG4gICAgICAgICAgICAtMiAqIG5SXG4gICAgICAgIH0sMCBhICR7blJ9LCR7blJ9IDAgMSwwICR7MiAqIG5SfSwwYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoKHBhdGhTdHJpbmcpXG4gICAgICAgICAgICAuc3Ryb2tlKHsgd2lkdGg6IHN0cm9rZVdpZHRoIH0pXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJudWxsbm9kZVwiKTtcbiAgICB9XG5cbiAgICBnZXRCZW5kKGM6IEJpbmFyeURpcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlZGdlYmVuZHNbY107XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50KCk6IHRoaXMgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluY29taW5nLnBhcmVudD8uZ2V0U3RhcnQoKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldExlZnQoKTogdGhpcyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0Z29pbmcubGVmdD8uZ2V0RW5kKCkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXRSaWdodCgpOiB0aGlzIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRnb2luZy5yaWdodD8uZ2V0RW5kKCkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDaGlsZChjOiBCaW5hcnlEaXIpOiB0aGlzIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRnb2luZ1tjXT8uZ2V0RW5kKCkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXRTaWJsaW5nKCk6IHRoaXMgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzID09PSBwYXJlbnQuZ2V0TGVmdCgpID8gcGFyZW50LmdldFJpZ2h0KCkgOiBwYXJlbnQuZ2V0TGVmdCgpO1xuICAgIH1cblxuICAgIGdldFBhcmVudEVkZ2UoKTogQ29ubmVjdGlvbjx0aGlzPiB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5jb21pbmcucGFyZW50O1xuICAgIH1cblxuICAgIGdldExlZnRFZGdlKCk6IENvbm5lY3Rpb248dGhpcz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGdvaW5nLmxlZnQ7XG4gICAgfVxuXG4gICAgZ2V0UmlnaHRFZGdlKCk6IENvbm5lY3Rpb248dGhpcz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGdvaW5nLnJpZ2h0O1xuICAgIH1cblxuICAgIGdldENoaWxkRWRnZShjOiBCaW5hcnlEaXIpOiBDb25uZWN0aW9uPHRoaXM+IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRnb2luZ1tjXTtcbiAgICB9XG5cbiAgICBpc0xlYWYoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZ2V0TGVmdCgpIHx8IHRoaXMuZ2V0UmlnaHQoKSk7XG4gICAgfVxuXG4gICAgaXNMZWZ0Q2hpbGQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzID09PSB0aGlzLmdldFBhcmVudCgpPy5nZXRMZWZ0KCk7XG4gICAgfVxuXG4gICAgaXNSaWdodENoaWxkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5nZXRQYXJlbnQoKT8uZ2V0UmlnaHQoKTtcbiAgICB9XG5cbiAgICBpc0NoaWxkKGM6IEJpbmFyeURpcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5nZXRQYXJlbnQoKT8uZ2V0Q2hpbGQoYyk7XG4gICAgfVxuXG4gICAgc2V0TGVmdChjaGlsZDogdGhpcywgc3Ryb2tlV2lkdGg6IG51bWJlcik6IHRoaXMge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDaGlsZChcImxlZnRcIiwgY2hpbGQsIHN0cm9rZVdpZHRoKTtcbiAgICB9XG5cbiAgICBzZXRSaWdodChjaGlsZDogdGhpcywgc3Ryb2tlV2lkdGg6IG51bWJlcik6IHRoaXMge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDaGlsZChcInJpZ2h0XCIsIGNoaWxkLCBzdHJva2VXaWR0aCk7XG4gICAgfVxuXG4gICAgc2V0Q2hpbGQoYzogQmluYXJ5RGlyLCBjaGlsZDogdGhpcyB8IG51bGwsIHN0cm9rZVdpZHRoOiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3VjY2Vzc29yKGMsIFwicGFyZW50XCIsIGNoaWxkLCBzdHJva2VXaWR0aCk7XG4gICAgfVxuXG4gICAgc2V0UGFyZW50TGVmdChwYXJlbnQ6IEJpbmFyeU5vZGUsIHN0cm9rZVdpZHRoOiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0UGFyZW50KFwibGVmdFwiLCBwYXJlbnQsIHN0cm9rZVdpZHRoKTtcbiAgICB9XG5cbiAgICBzZXRQYXJlbnRSaWdodChwYXJlbnQ6IEJpbmFyeU5vZGUsIHN0cm9rZVdpZHRoOiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0UGFyZW50KFwicmlnaHRcIiwgcGFyZW50LCBzdHJva2VXaWR0aCk7XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KGM6IEJpbmFyeURpciwgcGFyZW50OiBCaW5hcnlOb2RlLCBzdHJva2VXaWR0aDogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgIHBhcmVudC5zZXRDaGlsZChjLCB0aGlzLCBzdHJva2VXaWR0aCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhcmVudEhpZ2hsaWdodChoaWdoOiBib29sZWFuIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRJbmNvbWluZ0hpZ2hsaWdodChcInBhcmVudFwiLCBoaWdoKTtcbiAgICB9XG5cbiAgICBzZXRSaWdodEhpZ2hsaWdodChoaWdoOiBib29sZWFuIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDaGlsZEhpZ2hsaWdodChcInJpZ2h0XCIsIGhpZ2gpO1xuICAgIH1cblxuICAgIHNldExlZnRIaWdobGlnaHQoaGlnaDogYm9vbGVhbiB8IG51bGwpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q2hpbGRIaWdobGlnaHQoXCJsZWZ0XCIsIGhpZ2gpO1xuICAgIH1cblxuICAgIHNldENoaWxkSGlnaGxpZ2h0KGM6IEJpbmFyeURpciwgaGlnaDogYm9vbGVhbiB8IG51bGwpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0T3V0Z29pbmdIaWdobGlnaHQoYywgaGlnaCk7XG4gICAgfVxuXG4gICAgZGVlcFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcyA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmdldExlZnQoKSkge1xuICAgICAgICAgICAgcyArPSBgKCR7dGhpcy5nZXRMZWZ0KCk/LmRlZXBTdHJpbmcoKX0pIGA7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSB0aGlzLmdldFRleHQoKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UmlnaHQoKSkge1xuICAgICAgICAgICAgcyArPSBgICgke3RoaXMuZ2V0UmlnaHQoKT8uZGVlcFN0cmluZygpfSlgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHJlc2l6ZShcbiAgICAgICAgc3RhcnRYOiBudW1iZXIsXG4gICAgICAgIHN0YXJ0WTogbnVtYmVyLFxuICAgICAgICBzdmdNYXJnaW46IG51bWJlcixcbiAgICAgICAgbm9kZVNwYWNpbmc6IG51bWJlcixcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlciA9IDBcbiAgICApOiB0aGlzIHtcbiAgICAgICAgdGhpcy5fcmVzaXplV2lkdGhzKG5vZGVTcGFjaW5nKTtcbiAgICAgICAgY29uc3Qgc3ZnV2lkdGggPSB0aGlzLnJvb3QoKS52aWV3Ym94KCkud2lkdGg7XG4gICAgICAgIGlmIChzdGFydFggKyB0aGlzLiRyaWdodFdpZHRoID4gc3ZnV2lkdGggLSBzdmdNYXJnaW4pIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IHN2Z1dpZHRoIC0gdGhpcy4kcmlnaHRXaWR0aCAtIHN2Z01hcmdpbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRYIC0gdGhpcy4kbGVmdFdpZHRoIDwgc3ZnTWFyZ2luKSB7XG4gICAgICAgICAgICBzdGFydFggPSB0aGlzLiRsZWZ0V2lkdGggKyBzdmdNYXJnaW47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0TmV3UG9zaXRpb25zKHN0YXJ0WCwgc3RhcnRZLCBub2RlU3BhY2luZywgYW5pbWF0aW9uRHVyYXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBOYW1pbmcgc2hvdWxkIHJlZmxlY3QgdGhhdCBudW1iZXIgaXMgcmV0dXJuZWRcbiAgICBfcmVzaXplV2lkdGhzKG5vZGVTcGFjaW5nOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgd2lkdGggPSBub2RlU3BhY2luZztcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuZ2V0TGVmdCgpO1xuICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgd2lkdGggKz0gbGVmdC5fcmVzaXplV2lkdGhzKG5vZGVTcGFjaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuZ2V0UmlnaHQoKTtcbiAgICAgICAgaWYgKHJpZ2h0KSB7XG4gICAgICAgICAgICB3aWR0aCArPSByaWdodC5fcmVzaXplV2lkdGhzKG5vZGVTcGFjaW5nKTtcbiAgICAgICAgfVxuICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHRoaXMuZ2V0U2l6ZSgpLCB3aWR0aCk7XG4gICAgICAgIGNvbnN0IGxlZnRXaWR0aCA9IGxlZnQ/LiRsZWZ0V2lkdGggfHwgMDtcbiAgICAgICAgY29uc3QgcmlnaHRXaWR0aCA9IHJpZ2h0Py4kcmlnaHRXaWR0aCB8fCAwO1xuICAgICAgICBjb25zdCBtaWQgPSB3aWR0aCAtIGxlZnRXaWR0aCAtIHJpZ2h0V2lkdGg7XG4gICAgICAgIHRoaXMuJGxlZnRXaWR0aCA9IG1pZCAvIDIgKyBsZWZ0V2lkdGg7XG4gICAgICAgIHRoaXMuJHJpZ2h0V2lkdGggPSBtaWQgLyAyICsgcmlnaHRXaWR0aDtcbiAgICAgICAgdGhpcy4kd2lkdGggPSB3aWR0aDtcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cblxuICAgIF9zZXROZXdQb3NpdGlvbnMoXG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICBub2RlU3BhY2luZzogbnVtYmVyLFxuICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldENlbnRlcih4LCB5LCBhbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgIGNvbnN0IHlTcGFjaW5nID0gbm9kZVNwYWNpbmc7XG4gICAgICAgIGNvbnN0IG5leHRZID0geSArIHRoaXMuZ2V0U2l6ZSgpICsgeVNwYWNpbmc7XG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLmdldExlZnQoKTtcbiAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgIGxlZnQuX3NldE5ld1Bvc2l0aW9ucyhcbiAgICAgICAgICAgICAgICB4IC0gdGhpcy4kbGVmdFdpZHRoICsgbGVmdC4kbGVmdFdpZHRoLFxuICAgICAgICAgICAgICAgIG5leHRZLFxuICAgICAgICAgICAgICAgIG5vZGVTcGFjaW5nLFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5nZXRSaWdodCgpO1xuICAgICAgICBpZiAocmlnaHQpIHtcbiAgICAgICAgICAgIHJpZ2h0Ll9zZXROZXdQb3NpdGlvbnMoXG4gICAgICAgICAgICAgICAgeCArIHRoaXMuJHJpZ2h0V2lkdGggLSByaWdodC4kcmlnaHRXaWR0aCxcbiAgICAgICAgICAgICAgICBuZXh0WSxcbiAgICAgICAgICAgICAgICBub2RlU3BhY2luZyxcbiAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IE5ldmVyIHVzZWQ/IHRoaXMuZ2V0RWRnZXMgZG9lcyBub3QgZXhpc3QuXG4gICAgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuJGluY29taW5nLnBhcmVudD8uZ2V0U3RhcnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuaXNMZWZ0Q2hpbGQoKSA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuICAgICAgICAgICAgaWYgKHBhcmVudC4kb3V0Z29pbmdbY10/LmdldEVuZCgpICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBhcmVudCBtaXNtYXRjaFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuID0gMDtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVW5rbm93biBpZiBpdCBoYXMgZXZlciB3b3JrZWRcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWRnZSBvZiB0aGlzLmdldEVkZ2VzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRnZS5nZXRTdGFydCgpID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZS5nZXRFbmQoKSAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBhcmVudCBlZGdlIG1pc21hdGNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG4gIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBXcm9uZyBuOm8gcGFyZW50IGVkZ2VzLCAke259YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYmluYXJ5RGlycy5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy4kb3V0Z29pbmdbY10/LmdldEVuZCgpO1xuICAgICAgICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGlsZC4kaW5jb21pbmcucGFyZW50Py5nZXRTdGFydCgpICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtjfSBjaGlsZCBtaXNtYXRjaGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG4gPSAwO1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBVbmtub3duIGlmIGl0IGhhcyBldmVyIHdvcmtlZFxuICAgICAgICAgICAgZm9yIChjb25zdCBlZGdlIG9mIHRoaXMuZ2V0RWRnZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChlZGdlLmdldEVuZCgpID09PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlZGdlLmdldFN0YXJ0KCkgIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y30gY2hpbGQgZWRnZSBtaXNtYXRjaGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG4gIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBXcm9uZyBuOm8gJHtjfSBjaGlsZCBlZGdlcywgJHtufWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtZW50LCBNYXJrZXIsIFBhdGggfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgQlRyZWVOb2RlIH0gZnJvbSBcIi4vYnRyZWUtbm9kZVwiO1xuaW1wb3J0IHsgR3JhcGhOb2RlIH0gZnJvbSBcIi4vZ3JhcGgtbm9kZVwiO1xuaW1wb3J0IHsgTGlua2VkTm9kZSB9IGZyb20gXCIuLi9vYmplY3RzL2Jhc2ljLXN0cnVjdHVyZS1vYmplY3RzL2xpbmtlZC1ub2RlXCI7XG5cbnR5cGUgQ29ubmVjdGlvbkNvb3JkaW5hdGVzID0ge1xuICAgIHgxOiBudW1iZXI7XG4gICAgeTE6IG51bWJlcjtcbiAgICB4MjogbnVtYmVyO1xuICAgIHkyOiBudW1iZXI7XG4gICAgcjI6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uPFQgZXh0ZW5kcyBHcmFwaE5vZGUgfCBCVHJlZU5vZGUgfCBMaW5rZWROb2RlPiBleHRlbmRzIFBhdGgge1xuICAgICRjb29yZHM6IENvbm5lY3Rpb25Db29yZGluYXRlcyA9IHtcbiAgICAgICAgcjI6IDAsXG4gICAgICAgIHgxOiAwLFxuICAgICAgICB4MjogMCxcbiAgICAgICAgeTE6IDAsXG4gICAgICAgIHkyOiAwLFxuICAgIH07XG4gICAgJHN0YXJ0OiBUO1xuICAgICRlbmQ6IFQ7XG4gICAgJGJlbmQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGFydDogVCwgZW5kOiBUKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuJHN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuJGVuZCA9IGVuZDtcbiAgICAgICAgdGhpcy4kY29vcmRzID0ge1xuICAgICAgICAgICAgeDE6IHN0YXJ0LmN4KCksXG4gICAgICAgICAgICB5MTogc3RhcnQuY3koKSxcbiAgICAgICAgICAgIHgyOiBlbmQuY3goKSxcbiAgICAgICAgICAgIHkyOiBlbmQuY3koKSxcbiAgICAgICAgICAgIHIyOiBlbmQuZ2V0U2l6ZSgpIC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbml0KFxuICAgICAgICBzdHJva2VXaWR0aDogbnVtYmVyLFxuICAgICAgICBiZW5kOiBudW1iZXIgPSAwLFxuICAgICAgICBkaXJlY3RlZDogYm9vbGVhbiA9IGZhbHNlXG4gICAgKTogdGhpcyB7XG4gICAgICAgIHRoaXMuc3Ryb2tlKHsgd2lkdGg6IHN0cm9rZVdpZHRoIH0pO1xuICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgdGhpcy5zZXRCZW5kKGJlbmQpO1xuICAgICAgICBpZiAoZGlyZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUFycm93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy4kY29vcmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0QmVuZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kYmVuZDtcbiAgICB9XG5cbiAgICBzZXRCZW5kKGJlbmQ6IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLiRiZW5kID0gYmVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaXNEaXJlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5yZWZlcmVuY2UoXCJtYXJrZXItZW5kXCIpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoXG4gICAgICAgIG5ld0Nvb3JkczogUGFydGlhbDxDb25uZWN0aW9uQ29vcmRpbmF0ZXM+LFxuICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMFxuICAgICk6IHRoaXMge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuJGNvb3JkcywgbmV3Q29vcmRzKTtcbiAgICAgICAgKHRoaXMuZW5naW5lKCkuYW5pbWF0ZSh0aGlzLCBhbmltYXRpb25EdXJhdGlvbiA+IDApIGFzIHRoaXMpLnBsb3QoXG4gICAgICAgICAgICB0aGlzLl9nZXRQYXRoKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXJlY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWRyYXdBcnJvdyhhbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUFycm93KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmtlcihcImVuZFwiLCA1LCA0LCBmdW5jdGlvbiAoYWRkKSB7XG4gICAgICAgICAgICBhZGQucG9seWdvbihbMCwgMCwgNSwgMiwgMCwgNF0pLmFkZENsYXNzKFwiZmlsbGVkXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfcmVkcmF3QXJyb3coYW5pbWF0aW9uRHVyYXRpb246IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWFya2VyID0gdGhpcy5yZWZlcmVuY2U8TWFya2VyPihcIm1hcmtlci1lbmRcIik7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuJGNvb3Jkcy5yMjtcbiAgICAgICAgY29uc3Qgc3Ryb2tlID0gdGhpcy5hdHRyKFwic3Ryb2tlLXdpZHRoXCIpO1xuXG4gICAgICAgIGlmICghbWFya2VyIHx8IHR5cGVvZiBzdHJva2UgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTWFya2VyIG11c3QgZXhpc3QgYW5kIHN0cm9rZSBtdXN0IGJlIGEgbnVtYmVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbmdpbmUoKVxuICAgICAgICAgICAgLmFuaW1hdGUobWFya2VyLCBhbmltYXRpb25EdXJhdGlvbiA+IDApXG4gICAgICAgICAgICAuYXR0cih7IHJlZlg6IHJhZGl1cyAvIHN0cm9rZSArIDUgfSk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0U3RhcnQoKX0gLS0+ICR7dGhpcy5nZXRFbmQoKX1gO1xuICAgIH1cblxuICAgIGdldFN0YXJ0KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RhcnQ7XG4gICAgfVxuXG4gICAgZ2V0RW5kKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy4kZW5kO1xuICAgIH1cblxuICAgIHNldFN0YXJ0KHN0YXJ0OiBULCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAoc3RhcnQgPT09IHRoaXMuJHN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRzdGFydCA9IHN0YXJ0O1xuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHsgeDE6IHN0YXJ0LmN4KCksIHkxOiBzdGFydC5jeSgpIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRFbmQoZW5kOiBULCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAoZW5kID09PSB0aGlzLiRlbmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGVuZCA9IGVuZDtcbiAgICAgICAgaWYgKGVuZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoeyB4MjogZW5kLmN4KCksIHkyOiBlbmQuY3koKSB9LCBhbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0SGlnaGxpZ2h0KGhpZ2g6IGJvb2xlYW4gfCBudWxsKTogdGhpcyB7XG4gICAgICAgIHN1cGVyLnNldEhpZ2hsaWdodChoaWdoKTtcbiAgICAgICAgY29uc3QgbWFya2VyID0gdGhpcy5yZWZlcmVuY2U8RWxlbWVudD4oXCJtYXJrZXItZW5kXCIpO1xuICAgICAgICBpZiAobWFya2VyKSB7XG4gICAgICAgICAgICBtYXJrZXIuc2V0SGlnaGxpZ2h0KGhpZ2gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIF9nZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IEMgPSB0aGlzLiRjb29yZHM7XG4gICAgICAgIGNvbnN0IHhDb250cm9sID0gKEMueDEgKyBDLngyKSAvIDIgKyAoQy55MSAtIEMueTIpICogdGhpcy5nZXRCZW5kKCk7XG4gICAgICAgIGNvbnN0IHlDb250cm9sID0gKEMueTEgKyBDLnkyKSAvIDIgKyAoQy54MiAtIEMueDEpICogdGhpcy5nZXRCZW5kKCk7XG4gICAgICAgIHJldHVybiBgTSAke0MueDF9ICR7Qy55MX0gUSAke3hDb250cm9sfSAke3lDb250cm9sfSAke0MueDJ9ICR7Qy55Mn1gO1xuICAgIH1cblxuICAgIGdldENvb3JkcygpOiBDb25uZWN0aW9uQ29vcmRpbmF0ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29vcmRzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEcsIFJlY3QsIFRleHQgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgTkJTUCB9IGZyb20gXCJ+L2VuZ2luZVwiO1xuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuXG5leHBvcnQgY2xhc3MgRFNBcnJheSBleHRlbmRzIEcge1xuICAgICRob3Jpem9udGFsOiBib29sZWFuO1xuICAgICRyZWN0OiBSZWN0O1xuICAgICRiYWNrZ3JvdW5kczogUmVjdFtdID0gW107XG4gICAgJHZhbHVlczogVGV4dFtdID0gW107XG4gICAgJGluZGljZXM6IFRleHRbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCBvYmplY3RTaXplOiBudW1iZXIsIGhvcml6b250YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuJGhvcml6b250YWwgPSBob3Jpem9udGFsO1xuICAgICAgICB0aGlzLiR2YWx1ZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgICAgIHRoaXMuJHJlY3QgPSB0aGlzLnJlY3Qob2JqZWN0U2l6ZSAqIHNpemUsIDMgKiBvYmplY3RTaXplKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwiaW52aXNpYmxlXCIpXG4gICAgICAgICAgICAuY2VudGVyKDAsIDApO1xuICAgIH1cblxuICAgIGluaXQoc2l6ZTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFNpemUoc2l6ZSk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jZW50ZXIoeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENYKGk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmN4KCkgK1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUoKS5nZXRPYmplY3RTaXplKCkgKiAoaSAtIHRoaXMuZ2V0U2l6ZSgpIC8gMiArIDAuNSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiR2YWx1ZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHNldFNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHdoaWxlIChzaXplIDwgdGhpcy5nZXRTaXplKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRzLnBvcCgpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlcy5wb3AoKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLiRpbmRpY2VzLnBvcCgpPy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3MCA9IHRoaXMuZW5naW5lKCkuZ2V0T2JqZWN0U2l6ZSgpO1xuICAgICAgICBjb25zdCBoID0gdGhpcy5lbmdpbmUoKS5nZXRPYmplY3RTaXplKCk7XG4gICAgICAgIGNvbnN0IHN0cm9rZSA9IHRoaXMuZW5naW5lKCkuZ2V0U3Ryb2tlV2lkdGgoKTtcbiAgICAgICAgdGhpcy4kcmVjdC53aWR0aCh3MCAqIHNpemUpO1xuICAgICAgICBjb25zdCBjeCA9IHRoaXMuJHJlY3QuY3goKSxcbiAgICAgICAgICAgIGN5ID0gdGhpcy4kcmVjdC5jeSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLiRiYWNrZ3JvdW5kc1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRzW2ldID0gdGhpcy5yZWN0KHcwLCBoKVxuICAgICAgICAgICAgICAgICAgICAuc3Ryb2tlKHsgd2lkdGg6IHN0cm9rZSB9KVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZHNbaV0uY2VudGVyKGN4ICsgdzAgKiAoaSAtIHNpemUgLyAyICsgMC41KSwgY3kpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLiR2YWx1ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR2YWx1ZXNbaV0gPSB0aGlzLnRleHQoTkJTUCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiR2YWx1ZXNbaV0uY2VudGVyKGN4ICsgdzAgKiAoaSAtIHNpemUgLyAyICsgMC41KSwgY3kpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLiRpbmRpY2VzW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5kaWNlc1tpXSA9IHRoaXMudGV4dChpLnRvU3RyaW5nKCkpLmFkZENsYXNzKFxuICAgICAgICAgICAgICAgICAgICBcImFycmF5aW5kZXhcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRpbmRpY2VzW2ldLmNlbnRlcihcbiAgICAgICAgICAgICAgICBjeCArIHcwICogKGkgLSBzaXplIC8gMiArIDAuNSksXG4gICAgICAgICAgICAgICAgY3kgKyBoICogMC44XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoaSwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLnNldERpc2FibGVkKGksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFZhbHVlcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHZhbHVlcy5tYXAoKHQpID0+IHQudGV4dCgpKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZXModmFsdWVzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoICE9PSB0aGlzLmdldFNpemUoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBXcm9uZyBudW1iZXIgb2YgdmFsdWVzOiAke3ZhbHVlcy5sZW5ndGh9ICE9ICR7dGhpcy5nZXRTaXplKCl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShpLCB2YWx1ZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFZhbHVlKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiR2YWx1ZXNbaV0udGV4dCgpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKGk6IG51bWJlciwgdGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRleHQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRleHQgPSBgJHt0ZXh0fWA7XG4gICAgICAgIC8vIE5vbi1icmVha2luZyBzcGFjZTogV2UgbmVlZCB0byBoYXZlIHNvbWUgdGV4dCwgb3RoZXJ3aXNlIHRoZSBjb29yZGluYXRlcyBhcmUgcmVzZXQgdG8gKDAsIDApXG4gICAgICAgIGlmICh0ZXh0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICB0ZXh0ID0gTkJTUDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiR2YWx1ZXNbaV0udGV4dCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3dhcChqOiBudW1iZXIsIGs6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGpUZXh0ID0gdGhpcy4kdmFsdWVzW2pdLFxuICAgICAgICAgICAga1RleHQgPSB0aGlzLiR2YWx1ZXNba107XG4gICAgICAgIGNvbnN0IGpYID0gdGhpcy5nZXRDWChqKSxcbiAgICAgICAgICAgIGtYID0gdGhpcy5nZXRDWChrKTtcbiAgICAgICAgdGhpcy5lbmdpbmUoKS5hbmltYXRlKGpUZXh0LCBhbmltYXRlKS5jeChrWCk7XG4gICAgICAgIHRoaXMuZW5naW5lKCkuYW5pbWF0ZShrVGV4dCwgYW5pbWF0ZSkuY3goalgpO1xuICAgICAgICB0aGlzLiR2YWx1ZXNba10gPSBqVGV4dDtcbiAgICAgICAgdGhpcy4kdmFsdWVzW2pdID0ga1RleHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkKGk6IG51bWJlciwgZGlzYWJsZWQ6IGJvb2xlYW4gfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IGJnID0gdGhpcy4kYmFja2dyb3VuZHNbaV07XG4gICAgICAgIGlmIChkaXNhYmxlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBiZy50b2dnbGVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBiZy5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmcucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRJbmRleEhpZ2hsaWdodChpOiBudW1iZXIsIGhpZ2g6IGJvb2xlYW4sIGNvbG9yOiBzdHJpbmcgPSBcIiNDMDBcIikge1xuICAgICAgICBpZiAodGhpcy4kYmFja2dyb3VuZHNbaV0pIHtcbiAgICAgICAgICAgIGlmIChoaWdoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZHNbaV0uY3NzKFwic3Ryb2tlXCIsIGNvbG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZHNbaV0uY3NzKFwic3Ryb2tlXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJHZhbHVlc1tpXSkge1xuICAgICAgICAgICAgaWYgKGhpZ2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR2YWx1ZXNbaV0uY3NzKFwiZmlsbFwiLCBjb2xvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHZhbHVlc1tpXS5jc3MoXCJmaWxsXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBiZyBvZiBPYmplY3QudmFsdWVzKHRoaXMuJGJhY2tncm91bmRzKSkge1xuICAgICAgICAgICAgaWYgKCFiZy5jc3MoXCJzdHJva2VcIikpIHtcbiAgICAgICAgICAgICAgICBiZy5iYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWRkQXJyb3coaW5kZXg6IG51bWJlciwgYXJyb3dJZDogc3RyaW5nID0gXCJhcnJvd1wiLCBjb2xvcjogc3RyaW5nID0gXCIjMDAwXCIpIHtcbiAgICAgICAgY29uc3QgYXJyb3dTaXplID0gMTA7XG4gICAgICAgIGNvbnN0IGFycm93T2Zmc2V0ID0gMTA7XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMuZ2V0Q1goaW5kZXgpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5jeSgpIC0gdGhpcy5lbmdpbmUoKS5nZXRPYmplY3RTaXplKCkgLyAyIC0gYXJyb3dPZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgYXJyb3cgPSB0aGlzLnBvbHlsaW5lKFtcbiAgICAgICAgICAgIFt4LCB5XSxcbiAgICAgICAgICAgIFt4IC0gYXJyb3dTaXplLCB5IC0gYXJyb3dTaXplXSxcbiAgICAgICAgICAgIFt4ICsgYXJyb3dTaXplLCB5IC0gYXJyb3dTaXplXSxcbiAgICAgICAgICAgIFt4LCB5XSxcbiAgICAgICAgXSlcbiAgICAgICAgICAgIC5maWxsKFwibm9uZVwiKVxuICAgICAgICAgICAgLnN0cm9rZSh7IHdpZHRoOiAyIH0pXG4gICAgICAgICAgICAuaWQoYXJyb3dJZCk7XG5cbiAgICAgICAgYXJyb3cuY3NzKFwic3Ryb2tlXCIsIGNvbG9yKVxuICAgICAgICB0aGlzLmFkZChhcnJvdyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXJyb3coYXJyb3dJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5maW5kT25lKGAjJHthcnJvd0lkfWApIGFzIFBvbHlsaW5lIHwgbnVsbDtcbiAgICAgICAgaWYgKGFycm93KSB7XG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBcnJvdyhhcnJvd0lkOiBzdHJpbmcsIGluZGV4VG86IG51bWJlcikge1xuICAgICAgICBjb25zdCBhcnJvdyA9IHRoaXMuZmluZE9uZShgIyR7YXJyb3dJZH1gKSBhcyBQb2x5bGluZSB8IG51bGw7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldENYKGluZGV4VG8pO1xuXG4gICAgICAgIGlmIChhcnJvdykge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUoKS5hbmltYXRlKGFycm93LCB0cnVlKS5jeCh4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGZpbmQsIFBhdGgsIFJlY3QgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIjtcbmltcG9ydCB7IFRleHRDaXJjbGUgfSBmcm9tIFwiLi90ZXh0LWNpcmNsZVwiO1xuXG5leHBvcnQgY2xhc3MgR3JhcGhOb2RlIGV4dGVuZHMgVGV4dENpcmNsZSB7XG4gICAgJGluY29taW5nOiBSZWNvcmQ8c3RyaW5nLCBDb25uZWN0aW9uPHRoaXM+IHwgbnVsbD4gPSB7fTtcbiAgICAkb3V0Z29pbmc6IFJlY29yZDxzdHJpbmcsIENvbm5lY3Rpb248dGhpcz4gfCBudWxsPiA9IHt9O1xuICAgICRudWxsYXJ5OiBSZWNvcmQ8c3RyaW5nLCBQYXRoIHwgbnVsbD4gPSB7fTtcbiAgICAkcmVjdDogUmVjdDtcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBzdHJva2VXaWR0aDogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKHRleHQsIHNpemUsIHN0cm9rZVdpZHRoKTtcblxuICAgICAgICBjb25zdCBiZ1NpemUgPSAzICogc2l6ZTtcbiAgICAgICAgdGhpcy4kcmVjdCA9IHRoaXMucmVjdChiZ1NpemUsIGJnU2l6ZSkuYWRkQ2xhc3MoXCJpbnZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaW5pdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLiRyZWN0LmNlbnRlcigwLCAwKTtcbiAgICAgICAgc3VwZXIuaW5pdCh4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0QmVuZChrZXk6IHVua25vd24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBnZXREaXJlY3RlZChrZXk6IHVua25vd24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0SW5jb21pbmcoaW5LZXk6IHN0cmluZyk6IENvbm5lY3Rpb248dGhpcz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluY29taW5nW2luS2V5XTtcbiAgICB9XG5cbiAgICBnZXRPdXRnb2luZyhvdXRLZXk6IHN0cmluZyk6IENvbm5lY3Rpb248dGhpcz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGdvaW5nW291dEtleV07XG4gICAgfVxuXG4gICAgZ2V0SW5jb21pbmdFZGdlcygpOiBDb25uZWN0aW9uPHRoaXM+W10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLiRpbmNvbWluZykuZmlsdGVyKChlKSA9PiBlICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBnZXRPdXRnb2luZ0VkZ2VzKCk6IENvbm5lY3Rpb248dGhpcz5bXSB7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuJG91dGdvaW5nKS5maWx0ZXIoKGUpID0+IGUgIT09IG51bGwpO1xuICAgIH1cblxuICAgIGdldFByZWRlY2Vzc29ycygpOiB0aGlzW10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLiRpbmNvbWluZylcbiAgICAgICAgICAgIC5tYXAoKGUpID0+IGU/LmdldFN0YXJ0KCkpXG4gICAgICAgICAgICAuZmlsdGVyKChlKSA9PiBlICE9PSB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NvcnMoKTogdGhpc1tdIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy4kb3V0Z29pbmcpXG4gICAgICAgICAgICAubWFwKChlKSA9PiBlPy5nZXRFbmQoKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgZ2V0UHJlZGVjZXNzb3IoaW5LZXk6IHN0cmluZyk6IHRoaXMgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluY29taW5nW2luS2V5XT8uZ2V0U3RhcnQoKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NvcihvdXRLZXk6IHN0cmluZyk6IHRoaXMgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGdvaW5nW291dEtleV0/LmdldEVuZCgpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgc2V0UHJlZGVjZXNzb3IoXG4gICAgICAgIGluS2V5OiBzdHJpbmcsXG4gICAgICAgIG91dEtleTogc3RyaW5nLFxuICAgICAgICBwcmVkZWNlc3NvcjogdGhpcyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IG51bWJlclxuICAgICk6IHRoaXMge1xuICAgICAgICBwcmVkZWNlc3Nvci5zZXRTdWNjZXNzb3Iob3V0S2V5LCBpbktleSwgdGhpcywgc3Ryb2tlV2lkdGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTdWNjZXNzb3IoXG4gICAgICAgIG91dEtleTogc3RyaW5nLFxuICAgICAgICBpbktleTogc3RyaW5nLFxuICAgICAgICBzdWNjZXNzb3I6IHRoaXMgfCBudWxsLFxuICAgICAgICBzdHJva2VXaWR0aDogbnVtYmVyXG4gICAgKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IG91dEVkZ2UgPSB0aGlzLiRvdXRnb2luZ1tvdXRLZXldO1xuICAgICAgICBpZiAob3V0RWRnZSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkU3VjY2Vzc29yID0gb3V0RWRnZS5nZXRFbmQoKTtcbiAgICAgICAgICAgIGNvbnN0IG9sZEluY29taW5nID0gb2xkU3VjY2Vzc29yLiRpbmNvbWluZztcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBvbGRJbmNvbWluZykge1xuICAgICAgICAgICAgICAgIGlmIChvbGRJbmNvbWluZ1trXSA9PT0gb3V0RWRnZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2xkSW5jb21pbmdba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0RWRnZS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VjY2Vzc29yKSB7XG4gICAgICAgICAgICBjb25zdCBpbkVkZ2UgPSBzdWNjZXNzb3IuJGluY29taW5nW2luS2V5XTtcbiAgICAgICAgICAgIGlmIChpbkVkZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRQcmVkZWNlc3NvciA9IGluRWRnZS5nZXRTdGFydCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZE91dGdvaW5nID0gb2xkUHJlZGVjZXNzb3IuJG91dGdvaW5nO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBvbGRPdXRnb2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkT3V0Z29pbmdba10gPT09IGluRWRnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9sZE91dGdvaW5nW2tdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluRWRnZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZWRnZSA9IHRoaXMucm9vdCgpXG4gICAgICAgICAgICAgICAgLnB1dChuZXcgQ29ubmVjdGlvbih0aGlzLCBzdWNjZXNzb3IpKVxuICAgICAgICAgICAgICAgIC5pbml0KFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRCZW5kKG91dEtleSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlyZWN0ZWQob3V0S2V5KVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuJG91dGdvaW5nW291dEtleV0gPSBlZGdlO1xuICAgICAgICAgICAgc3VjY2Vzc29yLiRpbmNvbWluZ1tpbktleV0gPSBlZGdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJG91dGdvaW5nW291dEtleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlTnVsbGFyeSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBfdXBkYXRlTnVsbGFyeSgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIGZpbmQoXCJnXCIpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyYXBoTm9kZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYyBpbiBub2RlLiRudWxsYXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3cgPSAhbm9kZS4kb3V0Z29pbmdbY107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLiRudWxsYXJ5W2NdPy5yZW1vdmVDbGFzcyhcImludmlzaWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuJG51bGxhcnlbY10/LmFkZENsYXNzKFwiaW52aXNpYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW5jb21pbmdIaWdobGlnaHQoaW5LZXk6IHN0cmluZywgaGlnaDogYm9vbGVhbiB8IG51bGwpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5zZXRIaWdobGlnaHQoaGlnaCk7XG4gICAgICAgIHRoaXMuZ2V0SW5jb21pbmcoaW5LZXkpPy5zZXRIaWdobGlnaHQoaGlnaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldEhpZ2hsaWdodCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3MoXCJoaWdobGlnaHRcIik7XG4gICAgfVxuICAgIHNldE91dGdvaW5nSGlnaGxpZ2h0KG91dEtleTogc3RyaW5nLCBoaWdoOiBib29sZWFuIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICB0aGlzLnNldEhpZ2hsaWdodChoaWdoKTtcbiAgICAgICAgdGhpcy5nZXRPdXRnb2luZyhvdXRLZXkpPy5zZXRIaWdobGlnaHQoaGlnaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIHVzZSBmb3JlYWNoIGxvb3A/XG4gICAgcmVtb3ZlKCk6IHRoaXMge1xuICAgICAgICBmb3IgKGNvbnN0IG91dEtleSBpbiB0aGlzLiRvdXRnb2luZykge1xuICAgICAgICAgICAgY29uc3Qgb3V0RWRnZSA9IHRoaXMuJG91dGdvaW5nW291dEtleV07XG4gICAgICAgICAgICBpZiAoIW91dEVkZ2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IG91dEVkZ2UuZ2V0RW5kKCk7XG4gICAgICAgICAgICBjb25zdCBpbmNvbWluZyA9IGVuZC4kaW5jb21pbmc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluS2V5IGluIGluY29taW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG91dEVkZ2UgPT09IGluY29taW5nW2luS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW5jb21pbmdbaW5LZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRFZGdlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaW5LZXkgaW4gdGhpcy4kaW5jb21pbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGluRWRnZSA9IHRoaXMuJGluY29taW5nW2luS2V5XTtcbiAgICAgICAgICAgIGlmICghaW5FZGdlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGluRWRnZS5nZXRTdGFydCgpO1xuICAgICAgICAgICAgY29uc3Qgb3V0Z29pbmcgPSBzdGFydC4kb3V0Z29pbmc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG91dEtleSBpbiBvdXRnb2luZykge1xuICAgICAgICAgICAgICAgIGlmIChpbkVkZ2UgPT09IG91dGdvaW5nW291dEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG91dGdvaW5nW291dEtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluRWRnZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTnVsbGFyeSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRDZW50ZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXIgPSAwKTogdGhpcyB7XG4gICAgICAgIHN1cGVyLnNldENlbnRlcih4LCB5LCBhbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgIGZvciAoY29uc3QgZWRnZSBvZiB0aGlzLmdldE91dGdvaW5nRWRnZXMoKSkge1xuICAgICAgICAgICAgZWRnZS51cGRhdGUoeyB4MTogeCwgeTE6IHkgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZWRnZSBvZiB0aGlzLmdldEluY29taW5nRWRnZXMoKSkge1xuICAgICAgICAgICAgZWRnZS51cGRhdGUoeyB4MjogeCwgeTI6IHkgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFNpemUoc2l6ZTogbnVtYmVyLCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMCk6IHRoaXMge1xuICAgICAgICBzdXBlci5zZXRTaXplKHNpemUsIGFuaW1hdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgZm9yIChjb25zdCBlZGdlIG9mIHRoaXMuZ2V0SW5jb21pbmdFZGdlcygpKSB7XG4gICAgICAgICAgICBlZGdlLnVwZGF0ZSh7IHIyOiBzaXplIC8gMiB9LCBhbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbWVudCwgZXh0ZW5kLCBTdmcgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIn4vZW5naW5lXCI7XG5cbmRlY2xhcmUgbW9kdWxlIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiIHtcbiAgICBpbnRlcmZhY2UgU3ZnIHtcbiAgICAgICAgJGVuZ2luZTogRW5naW5lO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBFbGVtZW50IHtcbiAgICAgICAgZ2V0SGlnaGxpZ2h0KCk6IGJvb2xlYW47XG4gICAgICAgIHNldEhpZ2hsaWdodChoaWdoOiBib29sZWFuIHwgbnVsbCk6IHRoaXM7XG4gICAgICAgIGdldENlbnRlcigpOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgICAgICBzZXRDZW50ZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIGFuaW1hdGlvbkR1cmF0aW9uPzogbnVtYmVyKTogdGhpcztcbiAgICAgICAgZE1vdmVDZW50ZXIoZHg6IG51bWJlciwgZHk6IG51bWJlciwgYW5pbWF0aW9uRHVyYXRpb24/OiBudW1iZXIpOiB0aGlzO1xuICAgICAgICBlbmdpbmUoKTogRW5naW5lO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBDb250YWluZXIge1xuICAgICAgICBwdXQ8VCBleHRlbmRzIEVsZW1lbnQ+KGVsZW1lbnQ6IFQsIGk/OiBudW1iZXIpOiBUO1xuICAgIH1cbn1cblxuZXh0ZW5kKEVsZW1lbnQsIHtcbiAgICBnZXRIaWdobGlnaHQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcyBhcyBFbGVtZW50KS5oYXNDbGFzcyhcImhpZ2hsaWdodFwiKTtcbiAgICB9LFxuICAgIHNldEhpZ2hsaWdodChoaWdoOiBib29sZWFuIHwgbnVsbCkge1xuICAgICAgICBpZiAoaGlnaCA9PSBudWxsKSB7XG4gICAgICAgICAgICAodGhpcyBhcyBFbGVtZW50KS50b2dnbGVDbGFzcyhcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChoaWdoKSB7XG4gICAgICAgICAgICAodGhpcyBhcyBFbGVtZW50KS5hZGRDbGFzcyhcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLnJlbW92ZUNsYXNzKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzIGFzIEVsZW1lbnQ7XG4gICAgfSxcbiAgICBnZXRDZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBbKHRoaXMgYXMgRWxlbWVudCkuY3goKSwgKHRoaXMgYXMgRWxlbWVudCkuY3koKV0gYXMgW1xuICAgICAgICAgICAgbnVtYmVyLFxuICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBzZXRDZW50ZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHJldHVybiAodGhpcyBhcyBFbGVtZW50KVxuICAgICAgICAgICAgLmVuZ2luZSgpXG4gICAgICAgICAgICAuYW5pbWF0ZSh0aGlzIGFzIEVsZW1lbnQsIGFuaW1hdGlvbkR1cmF0aW9uID4gMClcbiAgICAgICAgICAgIC5jZW50ZXIoeCwgeSk7XG4gICAgfSxcbiAgICBkTW92ZUNlbnRlcihkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICAodGhpcyBhcyBFbGVtZW50KS5zZXRDZW50ZXIoXG4gICAgICAgICAgICAodGhpcyBhcyBFbGVtZW50KS5jeCgpICsgZHgsXG4gICAgICAgICAgICAodGhpcyBhcyBFbGVtZW50KS5jeSgpICsgZHksXG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvblxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGhpcyBhcyBFbGVtZW50O1xuICAgIH0sXG4gICAgZW5naW5lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMgYXMgRWxlbWVudCkucm9vdCgpLiRlbmdpbmU7XG4gICAgfSxcbn0pO1xuXG5leHBvcnQgeyBTdmcgfTtcbiIsImltcG9ydCB7IENpcmNsZSwgRywgVGV4dCB9IGZyb20gXCJAc3ZnZG90anMvc3ZnLmpzXCI7XG5pbXBvcnQgeyBOQlNQIH0gZnJvbSBcIn4vZW5naW5lXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Q2lyY2xlIGV4dGVuZHMgRyB7XG4gICAgJGNpcmNsZTogQ2lyY2xlO1xuICAgICR0ZXh0OiBUZXh0O1xuXG4gICAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBzaXplOiBudW1iZXIsIHN0cm9rZVdpZHRoOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy4kY2lyY2xlID0gdGhpcy5jaXJjbGUoc2l6ZSkuc3Ryb2tlKHsgd2lkdGg6IHN0cm9rZVdpZHRoIH0pO1xuICAgICAgICB0aGlzLiR0ZXh0ID0gdGhpcy50ZXh0KHRleHQpO1xuICAgIH1cblxuICAgIGluaXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgdGhpcy4kY2lyY2xlLmNlbnRlcigwLCAwKTtcbiAgICAgICAgdGhpcy4kdGV4dC5jZW50ZXIoMCwgMCk7XG4gICAgICAgIHRoaXMuY2VudGVyKHgsIHkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRleHQudGV4dCgpO1xuICAgIH1cblxuICAgIHNldFRleHQodGV4dDogc3RyaW5nIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICBpZiAodGV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0ID0gYCR7dGV4dH1gO1xuICAgICAgICAvLyBOb24tYnJlYWtpbmcgc3BhY2U6IFdlIG5lZWQgdG8gaGF2ZSBzb21lIHRleHQsIG90aGVyd2lzZSB0aGUgY29vcmRpbmF0ZXMgYXJlIHJlc2V0IHRvICgwLCAwKVxuICAgICAgICBpZiAodGV4dCA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGV4dCA9IE5CU1A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kdGV4dC50ZXh0KHRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLiRjaXJjbGUuYXR0cihcInJcIik7XG4gICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHIgKiAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiAhaXNOYU4oTnVtYmVyKHIpKSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihyKSAqIDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc2V0U2l6ZShkaWFtZXRlcjogbnVtYmVyLCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmVuZ2luZSgpXG4gICAgICAgICAgICAuYW5pbWF0ZSh0aGlzLiRjaXJjbGUsIGFuaW1hdGlvbkR1cmF0aW9uID4gMClcbiAgICAgICAgICAgIC5hdHRyKFwiclwiLCBTdHJpbmcoZGlhbWV0ZXIgLyAyKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3RhdGUge1xuICAgIHByaXZhdGUgcmVzZXR0aW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgYW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzZXR0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNSZXNldHRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc2V0dGluZztcbiAgICB9XG5cbiAgICBzZXRBbmltYXRpbmcodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdmFsO1xuICAgIH1cblxuICAgIGlzQW5pbWF0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRpbmc7XG4gICAgfVxuXG4gICAgYXN5bmMgcnVuV2hpbGVSZXNldHRpbmcoZnVuYzogKCkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5yZXNldHRpbmcgPSB0cnVlO1xuICAgICAgICBhd2FpdCBmdW5jKCk7XG4gICAgICAgIHRoaXMucmVzZXR0aW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCBRdWV1ZSBmcm9tICcuL1F1ZXVlLmpzJ1xuXG5jb25zdCBBbmltYXRvciA9IHtcbiAgbmV4dERyYXc6IG51bGwsXG4gIGZyYW1lczogbmV3IFF1ZXVlKCksXG4gIHRpbWVvdXRzOiBuZXcgUXVldWUoKSxcbiAgaW1tZWRpYXRlczogbmV3IFF1ZXVlKCksXG4gIHRpbWVyOiAoKSA9PiBnbG9iYWxzLndpbmRvdy5wZXJmb3JtYW5jZSB8fCBnbG9iYWxzLndpbmRvdy5EYXRlLFxuICB0cmFuc2Zvcm1zOiBbXSxcblxuICBmcmFtZShmbikge1xuICAgIC8vIFN0b3JlIHRoZSBub2RlXG4gICAgY29uc3Qgbm9kZSA9IEFuaW1hdG9yLmZyYW1lcy5wdXNoKHsgcnVuOiBmbiB9KVxuXG4gICAgLy8gUmVxdWVzdCBhbiBhbmltYXRpb24gZnJhbWUgaWYgd2UgZG9uJ3QgaGF2ZSBvbmVcbiAgICBpZiAoQW5pbWF0b3IubmV4dERyYXcgPT09IG51bGwpIHtcbiAgICAgIEFuaW1hdG9yLm5leHREcmF3ID0gZ2xvYmFscy53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW1hdG9yLl9kcmF3KVxuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgbm9kZSBzbyB3ZSBjYW4gcmVtb3ZlIGl0IGVhc2lseVxuICAgIHJldHVybiBub2RlXG4gIH0sXG5cbiAgdGltZW91dChmbiwgZGVsYXkpIHtcbiAgICBkZWxheSA9IGRlbGF5IHx8IDBcblxuICAgIC8vIFdvcmsgb3V0IHdoZW4gdGhlIGV2ZW50IHNob3VsZCBmaXJlXG4gICAgY29uc3QgdGltZSA9IEFuaW1hdG9yLnRpbWVyKCkubm93KCkgKyBkZWxheVxuXG4gICAgLy8gQWRkIHRoZSB0aW1lb3V0IHRvIHRoZSBlbmQgb2YgdGhlIHF1ZXVlXG4gICAgY29uc3Qgbm9kZSA9IEFuaW1hdG9yLnRpbWVvdXRzLnB1c2goeyBydW46IGZuLCB0aW1lOiB0aW1lIH0pXG5cbiAgICAvLyBSZXF1ZXN0IGFub3RoZXIgYW5pbWF0aW9uIGZyYW1lIGlmIHdlIG5lZWQgb25lXG4gICAgaWYgKEFuaW1hdG9yLm5leHREcmF3ID09PSBudWxsKSB7XG4gICAgICBBbmltYXRvci5uZXh0RHJhdyA9IGdsb2JhbHMud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShBbmltYXRvci5fZHJhdylcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxuICB9LFxuXG4gIGltbWVkaWF0ZShmbikge1xuICAgIC8vIEFkZCB0aGUgaW1tZWRpYXRlIGZuIHRvIHRoZSBlbmQgb2YgdGhlIHF1ZXVlXG4gICAgY29uc3Qgbm9kZSA9IEFuaW1hdG9yLmltbWVkaWF0ZXMucHVzaChmbilcbiAgICAvLyBSZXF1ZXN0IGFub3RoZXIgYW5pbWF0aW9uIGZyYW1lIGlmIHdlIG5lZWQgb25lXG4gICAgaWYgKEFuaW1hdG9yLm5leHREcmF3ID09PSBudWxsKSB7XG4gICAgICBBbmltYXRvci5uZXh0RHJhdyA9IGdsb2JhbHMud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShBbmltYXRvci5fZHJhdylcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxuICB9LFxuXG4gIGNhbmNlbEZyYW1lKG5vZGUpIHtcbiAgICBub2RlICE9IG51bGwgJiYgQW5pbWF0b3IuZnJhbWVzLnJlbW92ZShub2RlKVxuICB9LFxuXG4gIGNsZWFyVGltZW91dChub2RlKSB7XG4gICAgbm9kZSAhPSBudWxsICYmIEFuaW1hdG9yLnRpbWVvdXRzLnJlbW92ZShub2RlKVxuICB9LFxuXG4gIGNhbmNlbEltbWVkaWF0ZShub2RlKSB7XG4gICAgbm9kZSAhPSBudWxsICYmIEFuaW1hdG9yLmltbWVkaWF0ZXMucmVtb3ZlKG5vZGUpXG4gIH0sXG5cbiAgX2RyYXcobm93KSB7XG4gICAgLy8gUnVuIGFsbCB0aGUgdGltZW91dHMgd2UgY2FuIHJ1biwgaWYgdGhleSBhcmUgbm90IHJlYWR5IHlldCwgYWRkIHRoZW1cbiAgICAvLyB0byB0aGUgZW5kIG9mIHRoZSBxdWV1ZSBpbW1lZGlhdGVseSEgKGJhZCB0aW1lb3V0cyEhISBbc2FyY2FzbV0pXG4gICAgbGV0IG5leHRUaW1lb3V0ID0gbnVsbFxuICAgIGNvbnN0IGxhc3RUaW1lb3V0ID0gQW5pbWF0b3IudGltZW91dHMubGFzdCgpXG4gICAgd2hpbGUgKChuZXh0VGltZW91dCA9IEFuaW1hdG9yLnRpbWVvdXRzLnNoaWZ0KCkpKSB7XG4gICAgICAvLyBSdW4gdGhlIHRpbWVvdXQgaWYgaXRzIHRpbWUsIG9yIHB1c2ggaXQgdG8gdGhlIGVuZFxuICAgICAgaWYgKG5vdyA+PSBuZXh0VGltZW91dC50aW1lKSB7XG4gICAgICAgIG5leHRUaW1lb3V0LnJ1bigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBBbmltYXRvci50aW1lb3V0cy5wdXNoKG5leHRUaW1lb3V0KVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoaXQgdGhlIGxhc3QgaXRlbSwgd2Ugc2hvdWxkIHN0b3Agc2hpZnRpbmcgb3V0IG1vcmUgaXRlbXNcbiAgICAgIGlmIChuZXh0VGltZW91dCA9PT0gbGFzdFRpbWVvdXQpIGJyZWFrXG4gICAgfVxuXG4gICAgLy8gUnVuIGFsbCBvZiB0aGUgYW5pbWF0aW9uIGZyYW1lc1xuICAgIGxldCBuZXh0RnJhbWUgPSBudWxsXG4gICAgY29uc3QgbGFzdEZyYW1lID0gQW5pbWF0b3IuZnJhbWVzLmxhc3QoKVxuICAgIHdoaWxlIChuZXh0RnJhbWUgIT09IGxhc3RGcmFtZSAmJiAobmV4dEZyYW1lID0gQW5pbWF0b3IuZnJhbWVzLnNoaWZ0KCkpKSB7XG4gICAgICBuZXh0RnJhbWUucnVuKG5vdylcbiAgICB9XG5cbiAgICBsZXQgbmV4dEltbWVkaWF0ZSA9IG51bGxcbiAgICB3aGlsZSAoKG5leHRJbW1lZGlhdGUgPSBBbmltYXRvci5pbW1lZGlhdGVzLnNoaWZ0KCkpKSB7XG4gICAgICBuZXh0SW1tZWRpYXRlKClcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBoYXZlIHJlbWFpbmluZyB0aW1lb3V0cyBvciBmcmFtZXMsIGRyYXcgdW50aWwgd2UgZG9uJ3QgYW55bW9yZVxuICAgIEFuaW1hdG9yLm5leHREcmF3ID1cbiAgICAgIEFuaW1hdG9yLnRpbWVvdXRzLmZpcnN0KCkgfHwgQW5pbWF0b3IuZnJhbWVzLmZpcnN0KClcbiAgICAgICAgPyBnbG9iYWxzLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQW5pbWF0b3IuX2RyYXcpXG4gICAgICAgIDogbnVsbFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdG9yXG4iLCJpbXBvcnQgeyB0aW1lbGluZSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9kZWZhdWx0cy5qcydcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5cbi8qKipcbkJhc2UgQ2xhc3Ncbj09PT09PT09PT1cblRoZSBiYXNlIHN0ZXBwZXIgY2xhc3MgdGhhdCB3aWxsIGJlXG4qKiovXG5cbmZ1bmN0aW9uIG1ha2VTZXR0ZXJHZXR0ZXIoaywgZikge1xuICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpc1trXVxuICAgIHRoaXNba10gPSB2XG4gICAgaWYgKGYpIGYuY2FsbCh0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGVhc2luZyA9IHtcbiAgJy0nOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgcmV0dXJuIHBvc1xuICB9LFxuICAnPD4nOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgcmV0dXJuIC1NYXRoLmNvcyhwb3MgKiBNYXRoLlBJKSAvIDIgKyAwLjVcbiAgfSxcbiAgJz4nOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKChwb3MgKiBNYXRoLlBJKSAvIDIpXG4gIH0sXG4gICc8JzogZnVuY3Rpb24gKHBvcykge1xuICAgIHJldHVybiAtTWF0aC5jb3MoKHBvcyAqIE1hdGguUEkpIC8gMikgKyAxXG4gIH0sXG4gIGJlemllcjogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgLy8gc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3MtZWFzaW5nLTEvI2N1YmljLWJlemllci1hbGdvXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICBpZiAodCA8IDApIHtcbiAgICAgICAgaWYgKHgxID4gMCkge1xuICAgICAgICAgIHJldHVybiAoeTEgLyB4MSkgKiB0XG4gICAgICAgIH0gZWxzZSBpZiAoeDIgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuICh5MiAvIHgyKSAqIHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHQgPiAxKSB7XG4gICAgICAgIGlmICh4MiA8IDEpIHtcbiAgICAgICAgICByZXR1cm4gKCgxIC0geTIpIC8gKDEgLSB4MikpICogdCArICh5MiAtIHgyKSAvICgxIC0geDIpXG4gICAgICAgIH0gZWxzZSBpZiAoeDEgPCAxKSB7XG4gICAgICAgICAgcmV0dXJuICgoMSAtIHkxKSAvICgxIC0geDEpKSAqIHQgKyAoeTEgLSB4MSkgLyAoMSAtIHgxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAzICogdCAqICgxIC0gdCkgKiogMiAqIHkxICsgMyAqIHQgKiogMiAqICgxIC0gdCkgKiB5MiArIHQgKiogM1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3MtZWFzaW5nLTEvI3N0ZXAtdGltaW5nLWZ1bmN0aW9uLWFsZ29cbiAgc3RlcHM6IGZ1bmN0aW9uIChzdGVwcywgc3RlcFBvc2l0aW9uID0gJ2VuZCcpIHtcbiAgICAvLyBkZWFsIHdpdGggXCJqdW1wLVwiIHByZWZpeFxuICAgIHN0ZXBQb3NpdGlvbiA9IHN0ZXBQb3NpdGlvbi5zcGxpdCgnLScpLnJldmVyc2UoKVswXVxuXG4gICAgbGV0IGp1bXBzID0gc3RlcHNcbiAgICBpZiAoc3RlcFBvc2l0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIC0tanVtcHNcbiAgICB9IGVsc2UgaWYgKHN0ZXBQb3NpdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICArK2p1bXBzXG4gICAgfVxuXG4gICAgLy8gVGhlIGJlZm9yZUZsYWcgaXMgZXNzZW50aWFsbHkgdXNlbGVzc1xuICAgIHJldHVybiAodCwgYmVmb3JlRmxhZyA9IGZhbHNlKSA9PiB7XG4gICAgICAvLyBTdGVwIGlzIGNhbGxlZCBjdXJyZW50U3RlcCBpbiByZWZlcmVuY2VkIHVybFxuICAgICAgbGV0IHN0ZXAgPSBNYXRoLmZsb29yKHQgKiBzdGVwcylcbiAgICAgIGNvbnN0IGp1bXBpbmcgPSAodCAqIHN0ZXApICUgMSA9PT0gMFxuXG4gICAgICBpZiAoc3RlcFBvc2l0aW9uID09PSAnc3RhcnQnIHx8IHN0ZXBQb3NpdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICsrc3RlcFxuICAgICAgfVxuXG4gICAgICBpZiAoYmVmb3JlRmxhZyAmJiBqdW1waW5nKSB7XG4gICAgICAgIC0tc3RlcFxuICAgICAgfVxuXG4gICAgICBpZiAodCA+PSAwICYmIHN0ZXAgPCAwKSB7XG4gICAgICAgIHN0ZXAgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmICh0IDw9IDEgJiYgc3RlcCA+IGp1bXBzKSB7XG4gICAgICAgIHN0ZXAgPSBqdW1wc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcCAvIGp1bXBzXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGVwcGVyIHtcbiAgZG9uZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKioqXG5FYXNpbmcgRnVuY3Rpb25zXG49PT09PT09PT09PT09PT09XG4qKiovXG5cbmV4cG9ydCBjbGFzcyBFYXNlIGV4dGVuZHMgU3RlcHBlciB7XG4gIGNvbnN0cnVjdG9yKGZuID0gdGltZWxpbmUuZWFzZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVhc2UgPSBlYXNpbmdbZm5dIHx8IGZuXG4gIH1cblxuICBzdGVwKGZyb20sIHRvLCBwb3MpIHtcbiAgICBpZiAodHlwZW9mIGZyb20gIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gcG9zIDwgMSA/IGZyb20gOiB0b1xuICAgIH1cbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogdGhpcy5lYXNlKHBvcylcbiAgfVxufVxuXG4vKioqXG5Db250cm9sbGVyIFR5cGVzXG49PT09PT09PT09PT09PT09XG4qKiovXG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgU3RlcHBlciB7XG4gIGNvbnN0cnVjdG9yKGZuKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RlcHBlciA9IGZuXG4gIH1cblxuICBkb25lKGMpIHtcbiAgICByZXR1cm4gYy5kb25lXG4gIH1cblxuICBzdGVwKGN1cnJlbnQsIHRhcmdldCwgZHQsIGMpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwcGVyKGN1cnJlbnQsIHRhcmdldCwgZHQsIGMpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjdWxhdGUoKSB7XG4gIC8vIEFwcGx5IHRoZSBkZWZhdWx0IHBhcmFtZXRlcnNcbiAgY29uc3QgZHVyYXRpb24gPSAodGhpcy5fZHVyYXRpb24gfHwgNTAwKSAvIDEwMDBcbiAgY29uc3Qgb3ZlcnNob290ID0gdGhpcy5fb3ZlcnNob290IHx8IDBcblxuICAvLyBDYWxjdWxhdGUgdGhlIFBJRCBuYXR1cmFsIHJlc3BvbnNlXG4gIGNvbnN0IGVwcyA9IDFlLTEwXG4gIGNvbnN0IHBpID0gTWF0aC5QSVxuICBjb25zdCBvcyA9IE1hdGgubG9nKG92ZXJzaG9vdCAvIDEwMCArIGVwcylcbiAgY29uc3QgemV0YSA9IC1vcyAvIE1hdGguc3FydChwaSAqIHBpICsgb3MgKiBvcylcbiAgY29uc3Qgd24gPSAzLjkgLyAoemV0YSAqIGR1cmF0aW9uKVxuXG4gIC8vIENhbGN1bGF0ZSB0aGUgU3ByaW5nIHZhbHVlc1xuICB0aGlzLmQgPSAyICogemV0YSAqIHduXG4gIHRoaXMuayA9IHduICogd25cbn1cblxuZXhwb3J0IGNsYXNzIFNwcmluZyBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihkdXJhdGlvbiA9IDUwMCwgb3ZlcnNob290ID0gMCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmR1cmF0aW9uKGR1cmF0aW9uKS5vdmVyc2hvb3Qob3ZlcnNob290KVxuICB9XG5cbiAgc3RlcChjdXJyZW50LCB0YXJnZXQsIGR0LCBjKSB7XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnc3RyaW5nJykgcmV0dXJuIGN1cnJlbnRcbiAgICBjLmRvbmUgPSBkdCA9PT0gSW5maW5pdHlcbiAgICBpZiAoZHQgPT09IEluZmluaXR5KSByZXR1cm4gdGFyZ2V0XG4gICAgaWYgKGR0ID09PSAwKSByZXR1cm4gY3VycmVudFxuXG4gICAgaWYgKGR0ID4gMTAwKSBkdCA9IDE2XG5cbiAgICBkdCAvPSAxMDAwXG5cbiAgICAvLyBHZXQgdGhlIHByZXZpb3VzIHZlbG9jaXR5XG4gICAgY29uc3QgdmVsb2NpdHkgPSBjLnZlbG9jaXR5IHx8IDBcblxuICAgIC8vIEFwcGx5IHRoZSBjb250cm9sIHRvIGdldCB0aGUgbmV3IHBvc2l0aW9uIGFuZCBzdG9yZSBpdFxuICAgIGNvbnN0IGFjY2VsZXJhdGlvbiA9IC10aGlzLmQgKiB2ZWxvY2l0eSAtIHRoaXMuayAqIChjdXJyZW50IC0gdGFyZ2V0KVxuICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gY3VycmVudCArIHZlbG9jaXR5ICogZHQgKyAoYWNjZWxlcmF0aW9uICogZHQgKiBkdCkgLyAyXG5cbiAgICAvLyBTdG9yZSB0aGUgdmVsb2NpdHlcbiAgICBjLnZlbG9jaXR5ID0gdmVsb2NpdHkgKyBhY2NlbGVyYXRpb24gKiBkdFxuXG4gICAgLy8gRmlndXJlIG91dCBpZiB3ZSBoYXZlIGNvbnZlcmdlZCwgYW5kIGlmIHNvLCBwYXNzIHRoZSB2YWx1ZVxuICAgIGMuZG9uZSA9IE1hdGguYWJzKHRhcmdldCAtIG5ld1Bvc2l0aW9uKSArIE1hdGguYWJzKHZlbG9jaXR5KSA8IDAuMDAyXG4gICAgcmV0dXJuIGMuZG9uZSA/IHRhcmdldCA6IG5ld1Bvc2l0aW9uXG4gIH1cbn1cblxuZXh0ZW5kKFNwcmluZywge1xuICBkdXJhdGlvbjogbWFrZVNldHRlckdldHRlcignX2R1cmF0aW9uJywgcmVjYWxjdWxhdGUpLFxuICBvdmVyc2hvb3Q6IG1ha2VTZXR0ZXJHZXR0ZXIoJ19vdmVyc2hvb3QnLCByZWNhbGN1bGF0ZSlcbn0pXG5cbmV4cG9ydCBjbGFzcyBQSUQgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocCA9IDAuMSwgaSA9IDAuMDEsIGQgPSAwLCB3aW5kdXAgPSAxMDAwKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMucChwKS5pKGkpLmQoZCkud2luZHVwKHdpbmR1cClcbiAgfVxuXG4gIHN0ZXAoY3VycmVudCwgdGFyZ2V0LCBkdCwgYykge1xuICAgIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ3N0cmluZycpIHJldHVybiBjdXJyZW50XG4gICAgYy5kb25lID0gZHQgPT09IEluZmluaXR5XG5cbiAgICBpZiAoZHQgPT09IEluZmluaXR5KSByZXR1cm4gdGFyZ2V0XG4gICAgaWYgKGR0ID09PSAwKSByZXR1cm4gY3VycmVudFxuXG4gICAgY29uc3QgcCA9IHRhcmdldCAtIGN1cnJlbnRcbiAgICBsZXQgaSA9IChjLmludGVncmFsIHx8IDApICsgcCAqIGR0XG4gICAgY29uc3QgZCA9IChwIC0gKGMuZXJyb3IgfHwgMCkpIC8gZHRcbiAgICBjb25zdCB3aW5kdXAgPSB0aGlzLl93aW5kdXBcblxuICAgIC8vIGFudGl3aW5kdXBcbiAgICBpZiAod2luZHVwICE9PSBmYWxzZSkge1xuICAgICAgaSA9IE1hdGgubWF4KC13aW5kdXAsIE1hdGgubWluKGksIHdpbmR1cCkpXG4gICAgfVxuXG4gICAgYy5lcnJvciA9IHBcbiAgICBjLmludGVncmFsID0gaVxuXG4gICAgYy5kb25lID0gTWF0aC5hYnMocCkgPCAwLjAwMVxuXG4gICAgcmV0dXJuIGMuZG9uZSA/IHRhcmdldCA6IGN1cnJlbnQgKyAodGhpcy5QICogcCArIHRoaXMuSSAqIGkgKyB0aGlzLkQgKiBkKVxuICB9XG59XG5cbmV4dGVuZChQSUQsIHtcbiAgd2luZHVwOiBtYWtlU2V0dGVyR2V0dGVyKCdfd2luZHVwJyksXG4gIHA6IG1ha2VTZXR0ZXJHZXR0ZXIoJ1AnKSxcbiAgaTogbWFrZVNldHRlckdldHRlcignSScpLFxuICBkOiBtYWtlU2V0dGVyR2V0dGVyKCdEJylcbn0pXG4iLCJpbXBvcnQgeyBFYXNlIH0gZnJvbSAnLi9Db250cm9sbGVyLmpzJ1xuaW1wb3J0IHtcbiAgZGVsaW1pdGVyLFxuICBudW1iZXJBbmRVbml0LFxuICBpc1BhdGhMZXR0ZXJcbn0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCBDb2xvciBmcm9tICcuLi90eXBlcy9Db2xvci5qcydcbmltcG9ydCBQYXRoQXJyYXkgZnJvbSAnLi4vdHlwZXMvUGF0aEFycmF5LmpzJ1xuaW1wb3J0IFNWR0FycmF5IGZyb20gJy4uL3R5cGVzL1NWR0FycmF5LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5cbmNvbnN0IGdldENsYXNzRm9yVHlwZSA9ICh2YWx1ZSkgPT4ge1xuICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIFNWR051bWJlclxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKENvbG9yLmlzQ29sb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gQ29sb3JcbiAgICB9IGVsc2UgaWYgKGRlbGltaXRlci50ZXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGlzUGF0aExldHRlci50ZXN0KHZhbHVlKSA/IFBhdGhBcnJheSA6IFNWR0FycmF5XG4gICAgfSBlbHNlIGlmIChudW1iZXJBbmRVbml0LnRlc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gU1ZHTnVtYmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOb25Nb3JwaGFibGVcbiAgICB9XG4gIH0gZWxzZSBpZiAobW9ycGhhYmxlVHlwZXMuaW5kZXhPZih2YWx1ZS5jb25zdHJ1Y3RvcikgPiAtMSkge1xuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvclxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIFNWR0FycmF5XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0QmFnXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE5vbk1vcnBoYWJsZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vcnBoYWJsZSB7XG4gIGNvbnN0cnVjdG9yKHN0ZXBwZXIpIHtcbiAgICB0aGlzLl9zdGVwcGVyID0gc3RlcHBlciB8fCBuZXcgRWFzZSgnLScpXG5cbiAgICB0aGlzLl9mcm9tID0gbnVsbFxuICAgIHRoaXMuX3RvID0gbnVsbFxuICAgIHRoaXMuX3R5cGUgPSBudWxsXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGxcbiAgICB0aGlzLl9tb3JwaE9iaiA9IG51bGxcbiAgfVxuXG4gIGF0KHBvcykge1xuICAgIHJldHVybiB0aGlzLl9tb3JwaE9iai5tb3JwaChcbiAgICAgIHRoaXMuX2Zyb20sXG4gICAgICB0aGlzLl90byxcbiAgICAgIHBvcyxcbiAgICAgIHRoaXMuX3N0ZXBwZXIsXG4gICAgICB0aGlzLl9jb250ZXh0XG4gICAgKVxuICB9XG5cbiAgZG9uZSgpIHtcbiAgICBjb25zdCBjb21wbGV0ZSA9IHRoaXMuX2NvbnRleHQubWFwKHRoaXMuX3N0ZXBwZXIuZG9uZSkucmVkdWNlKGZ1bmN0aW9uIChcbiAgICAgIGxhc3QsXG4gICAgICBjdXJyXG4gICAgKSB7XG4gICAgICByZXR1cm4gbGFzdCAmJiBjdXJyXG4gICAgfSwgdHJ1ZSlcbiAgICByZXR1cm4gY29tcGxldGVcbiAgfVxuXG4gIGZyb20odmFsKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZnJvbVxuICAgIH1cblxuICAgIHRoaXMuX2Zyb20gPSB0aGlzLl9zZXQodmFsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGVwcGVyKHN0ZXBwZXIpIHtcbiAgICBpZiAoc3RlcHBlciA9PSBudWxsKSByZXR1cm4gdGhpcy5fc3RlcHBlclxuICAgIHRoaXMuX3N0ZXBwZXIgPSBzdGVwcGVyXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvKHZhbCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RvXG4gICAgfVxuXG4gICAgdGhpcy5fdG8gPSB0aGlzLl9zZXQodmFsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0eXBlKHR5cGUpIHtcbiAgICAvLyBnZXR0ZXJcbiAgICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdHlwZVxuICAgIH1cblxuICAgIC8vIHNldHRlclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9zZXQodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX3R5cGUpIHtcbiAgICAgIHRoaXMudHlwZShnZXRDbGFzc0ZvclR5cGUodmFsdWUpKVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSBuZXcgdGhpcy5fdHlwZSh2YWx1ZSlcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gQ29sb3IpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3RvXG4gICAgICAgID8gcmVzdWx0W3RoaXMuX3RvWzRdXSgpXG4gICAgICAgIDogdGhpcy5fZnJvbVxuICAgICAgICAgID8gcmVzdWx0W3RoaXMuX2Zyb21bNF1dKClcbiAgICAgICAgICA6IHJlc3VsdFxuICAgIH1cblxuICAgIGlmICh0aGlzLl90eXBlID09PSBPYmplY3RCYWcpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3RvXG4gICAgICAgID8gcmVzdWx0LmFsaWduKHRoaXMuX3RvKVxuICAgICAgICA6IHRoaXMuX2Zyb21cbiAgICAgICAgICA/IHJlc3VsdC5hbGlnbih0aGlzLl9mcm9tKVxuICAgICAgICAgIDogcmVzdWx0XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gcmVzdWx0LnRvQ29uc3VtYWJsZSgpXG5cbiAgICB0aGlzLl9tb3JwaE9iaiA9IHRoaXMuX21vcnBoT2JqIHx8IG5ldyB0aGlzLl90eXBlKClcbiAgICB0aGlzLl9jb250ZXh0ID1cbiAgICAgIHRoaXMuX2NvbnRleHQgfHxcbiAgICAgIEFycmF5LmFwcGx5KG51bGwsIEFycmF5KHJlc3VsdC5sZW5ndGgpKVxuICAgICAgICAubWFwKE9iamVjdClcbiAgICAgICAgLm1hcChmdW5jdGlvbiAobykge1xuICAgICAgICAgIG8uZG9uZSA9IHRydWVcbiAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9uTW9ycGhhYmxlIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxuICB9XG5cbiAgaW5pdCh2YWwpIHtcbiAgICB2YWwgPSBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWxbMF0gOiB2YWxcbiAgICB0aGlzLnZhbHVlID0gdmFsXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLnZhbHVlXVxuICB9XG5cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm1CYWcge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgdGhpcy5pbml0KC4uLmFyZ3MpXG4gIH1cblxuICBpbml0KG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIG9iaiA9IHtcbiAgICAgICAgc2NhbGVYOiBvYmpbMF0sXG4gICAgICAgIHNjYWxlWTogb2JqWzFdLFxuICAgICAgICBzaGVhcjogb2JqWzJdLFxuICAgICAgICByb3RhdGU6IG9ialszXSxcbiAgICAgICAgdHJhbnNsYXRlWDogb2JqWzRdLFxuICAgICAgICB0cmFuc2xhdGVZOiBvYmpbNV0sXG4gICAgICAgIG9yaWdpblg6IG9ials2XSxcbiAgICAgICAgb3JpZ2luWTogb2JqWzddXG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBUcmFuc2Zvcm1CYWcuZGVmYXVsdHMsIG9iailcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9BcnJheSgpIHtcbiAgICBjb25zdCB2ID0gdGhpc1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHYuc2NhbGVYLFxuICAgICAgdi5zY2FsZVksXG4gICAgICB2LnNoZWFyLFxuICAgICAgdi5yb3RhdGUsXG4gICAgICB2LnRyYW5zbGF0ZVgsXG4gICAgICB2LnRyYW5zbGF0ZVksXG4gICAgICB2Lm9yaWdpblgsXG4gICAgICB2Lm9yaWdpbllcbiAgICBdXG4gIH1cbn1cblxuVHJhbnNmb3JtQmFnLmRlZmF1bHRzID0ge1xuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMSxcbiAgc2hlYXI6IDAsXG4gIHJvdGF0ZTogMCxcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgb3JpZ2luWDogMCxcbiAgb3JpZ2luWTogMFxufVxuXG5jb25zdCBzb3J0QnlLZXkgPSAoYSwgYikgPT4ge1xuICByZXR1cm4gYVswXSA8IGJbMF0gPyAtMSA6IGFbMF0gPiBiWzBdID8gMSA6IDBcbn1cblxuZXhwb3J0IGNsYXNzIE9iamVjdEJhZyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIGFsaWduKG90aGVyKSB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXNcbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSB2YWx1ZXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgLy8gSWYgdGhlIHR5cGUgaXMgdGhlIHNhbWUgd2Ugb25seSBuZWVkIHRvIGNoZWNrIGlmIHRoZSBjb2xvciBpcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcbiAgICAgIGlmICh2YWx1ZXNbaSArIDFdID09PSBvdGhlcltpICsgMV0pIHtcbiAgICAgICAgaWYgKHZhbHVlc1tpICsgMV0gPT09IENvbG9yICYmIG90aGVyW2kgKyA3XSAhPT0gdmFsdWVzW2kgKyA3XSkge1xuICAgICAgICAgIGNvbnN0IHNwYWNlID0gb3RoZXJbaSArIDddXG4gICAgICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IodGhpcy52YWx1ZXMuc3BsaWNlKGkgKyAzLCA1KSlcbiAgICAgICAgICAgIFtzcGFjZV0oKVxuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShpICsgMywgMCwgLi4uY29sb3IpXG4gICAgICAgIH1cblxuICAgICAgICBpICs9IHZhbHVlc1tpICsgMl0gKyAyXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmICghb3RoZXJbaSArIDFdKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSB0eXBlcyBkaWZmZXIsIHNvIHdlIG92ZXJ3cml0ZSB0aGUgbmV3IHR5cGUgd2l0aCB0aGUgb2xkIG9uZVxuICAgICAgLy8gQW5kIGluaXRpYWxpemUgaXQgd2l0aCB0aGUgdHlwZXMgZGVmYXVsdCAoZS5nLiBibGFjayBmb3IgY29sb3Igb3IgMCBmb3IgbnVtYmVyKVxuICAgICAgY29uc3QgZGVmYXVsdE9iamVjdCA9IG5ldyBvdGhlcltpICsgMV0oKS50b0FycmF5KClcblxuICAgICAgLy8gVGhhbiB3ZSBmaXggdGhlIHZhbHVlcyBhcnJheVxuICAgICAgY29uc3QgdG9EZWxldGUgPSB2YWx1ZXNbaSArIDJdICsgM1xuXG4gICAgICB2YWx1ZXMuc3BsaWNlKFxuICAgICAgICBpLFxuICAgICAgICB0b0RlbGV0ZSxcbiAgICAgICAgb3RoZXJbaV0sXG4gICAgICAgIG90aGVyW2kgKyAxXSxcbiAgICAgICAgb3RoZXJbaSArIDJdLFxuICAgICAgICAuLi5kZWZhdWx0T2JqZWN0XG4gICAgICApXG5cbiAgICAgIGkgKz0gdmFsdWVzW2kgKyAyXSArIDJcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGluaXQob2JqT3JBcnIpIHtcbiAgICB0aGlzLnZhbHVlcyA9IFtdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpPckFycikpIHtcbiAgICAgIHRoaXMudmFsdWVzID0gb2JqT3JBcnIuc2xpY2UoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgb2JqT3JBcnIgPSBvYmpPckFyciB8fCB7fVxuICAgIGNvbnN0IGVudHJpZXMgPSBbXVxuXG4gICAgZm9yIChjb25zdCBpIGluIG9iak9yQXJyKSB7XG4gICAgICBjb25zdCBUeXBlID0gZ2V0Q2xhc3NGb3JUeXBlKG9iak9yQXJyW2ldKVxuICAgICAgY29uc3QgdmFsID0gbmV3IFR5cGUob2JqT3JBcnJbaV0pLnRvQXJyYXkoKVxuICAgICAgZW50cmllcy5wdXNoKFtpLCBUeXBlLCB2YWwubGVuZ3RoLCAuLi52YWxdKVxuICAgIH1cblxuICAgIGVudHJpZXMuc29ydChzb3J0QnlLZXkpXG5cbiAgICB0aGlzLnZhbHVlcyA9IGVudHJpZXMucmVkdWNlKChsYXN0LCBjdXJyKSA9PiBsYXN0LmNvbmNhdChjdXJyKSwgW10pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzXG4gIH1cblxuICB2YWx1ZU9mKCkge1xuICAgIGNvbnN0IG9iaiA9IHt9XG4gICAgY29uc3QgYXJyID0gdGhpcy52YWx1ZXNcblxuICAgIC8vIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCkge1xuICAgICAgY29uc3Qga2V5ID0gYXJyLnNoaWZ0KClcbiAgICAgIGNvbnN0IFR5cGUgPSBhcnIuc2hpZnQoKVxuICAgICAgY29uc3QgbnVtID0gYXJyLnNoaWZ0KClcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGFyci5zcGxpY2UoMCwgbnVtKVxuICAgICAgb2JqW2tleV0gPSBuZXcgVHlwZSh2YWx1ZXMpIC8vIC52YWx1ZU9mKClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqXG4gIH1cbn1cblxuY29uc3QgbW9ycGhhYmxlVHlwZXMgPSBbTm9uTW9ycGhhYmxlLCBUcmFuc2Zvcm1CYWcsIE9iamVjdEJhZ11cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9ycGhhYmxlVHlwZSh0eXBlID0gW10pIHtcbiAgbW9ycGhhYmxlVHlwZXMucHVzaCguLi5bXS5jb25jYXQodHlwZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTW9ycGhhYmxlKCkge1xuICBleHRlbmQobW9ycGhhYmxlVHlwZXMsIHtcbiAgICB0byh2YWwpIHtcbiAgICAgIHJldHVybiBuZXcgTW9ycGhhYmxlKClcbiAgICAgICAgLnR5cGUodGhpcy5jb25zdHJ1Y3RvcilcbiAgICAgICAgLmZyb20odGhpcy50b0FycmF5KCkpIC8vIHRoaXMudmFsdWVPZigpKVxuICAgICAgICAudG8odmFsKVxuICAgIH0sXG4gICAgZnJvbUFycmF5KGFycikge1xuICAgICAgdGhpcy5pbml0KGFycilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB0b0NvbnN1bWFibGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy50b0FycmF5KClcbiAgICB9LFxuICAgIG1vcnBoKGZyb20sIHRvLCBwb3MsIHN0ZXBwZXIsIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IG1hcHBlciA9IGZ1bmN0aW9uIChpLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gc3RlcHBlci5zdGVwKGksIHRvW2luZGV4XSwgcG9zLCBjb250ZXh0W2luZGV4XSwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZnJvbUFycmF5KGZyb20ubWFwKG1hcHBlcikpXG4gICAgfVxuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVldWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9maXJzdCA9IG51bGxcbiAgICB0aGlzLl9sYXN0ID0gbnVsbFxuICB9XG5cbiAgLy8gU2hvd3MgdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3RcbiAgZmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0ICYmIHRoaXMuX2ZpcnN0LnZhbHVlXG4gIH1cblxuICAvLyBTaG93cyB1cyB0aGUgbGFzdCBpdGVtIGluIHRoZSBsaXN0XG4gIGxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3QgJiYgdGhpcy5fbGFzdC52YWx1ZVxuICB9XG5cbiAgcHVzaCh2YWx1ZSkge1xuICAgIC8vIEFuIGl0ZW0gc3RvcmVzIGFuIGlkIGFuZCB0aGUgcHJvdmlkZWQgdmFsdWVcbiAgICBjb25zdCBpdGVtID1cbiAgICAgIHR5cGVvZiB2YWx1ZS5uZXh0ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogeyB2YWx1ZTogdmFsdWUsIG5leHQ6IG51bGwsIHByZXY6IG51bGwgfVxuXG4gICAgLy8gRGVhbCB3aXRoIHRoZSBxdWV1ZSBiZWluZyBlbXB0eSBvciBwb3B1bGF0ZWRcbiAgICBpZiAodGhpcy5fbGFzdCkge1xuICAgICAgaXRlbS5wcmV2ID0gdGhpcy5fbGFzdFxuICAgICAgdGhpcy5fbGFzdC5uZXh0ID0gaXRlbVxuICAgICAgdGhpcy5fbGFzdCA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFzdCA9IGl0ZW1cbiAgICAgIHRoaXMuX2ZpcnN0ID0gaXRlbVxuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpdGVtXG4gICAgcmV0dXJuIGl0ZW1cbiAgfVxuXG4gIC8vIFJlbW92ZXMgdGhlIGl0ZW0gdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB0aGUgcHVzaFxuICByZW1vdmUoaXRlbSkge1xuICAgIC8vIFJlbGluayB0aGUgcHJldmlvdXMgaXRlbVxuICAgIGlmIChpdGVtLnByZXYpIGl0ZW0ucHJldi5uZXh0ID0gaXRlbS5uZXh0XG4gICAgaWYgKGl0ZW0ubmV4dCkgaXRlbS5uZXh0LnByZXYgPSBpdGVtLnByZXZcbiAgICBpZiAoaXRlbSA9PT0gdGhpcy5fbGFzdCkgdGhpcy5fbGFzdCA9IGl0ZW0ucHJldlxuICAgIGlmIChpdGVtID09PSB0aGlzLl9maXJzdCkgdGhpcy5fZmlyc3QgPSBpdGVtLm5leHRcblxuICAgIC8vIEludmFsaWRhdGUgaXRlbVxuICAgIGl0ZW0ucHJldiA9IG51bGxcbiAgICBpdGVtLm5leHQgPSBudWxsXG4gIH1cblxuICBzaGlmdCgpIHtcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgdmFsdWVcbiAgICBjb25zdCByZW1vdmUgPSB0aGlzLl9maXJzdFxuICAgIGlmICghcmVtb3ZlKSByZXR1cm4gbnVsbFxuXG4gICAgLy8gSWYgd2UgZG8sIHJlbW92ZSBpdCBhbmQgcmVsaW5rIHRoaW5nc1xuICAgIHRoaXMuX2ZpcnN0ID0gcmVtb3ZlLm5leHRcbiAgICBpZiAodGhpcy5fZmlyc3QpIHRoaXMuX2ZpcnN0LnByZXYgPSBudWxsXG4gICAgdGhpcy5fbGFzdCA9IHRoaXMuX2ZpcnN0ID8gdGhpcy5fbGFzdCA6IG51bGxcbiAgICByZXR1cm4gcmVtb3ZlLnZhbHVlXG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEVhc2UsIFN0ZXBwZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIuanMnXG5pbXBvcnQgeyBleHRlbmQsIHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGZyb20sIHRvIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2dyYWRpZW50ZWQuanMnXG5pbXBvcnQgeyBnZXRPcmlnaW4gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IG5vb3AsIHRpbWVsaW5lIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2RlZmF1bHRzLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHJ4LCByeSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9jaXJjbGVkLmpzJ1xuaW1wb3J0IEFuaW1hdG9yIGZyb20gJy4vQW5pbWF0b3IuanMnXG5pbXBvcnQgQm94IGZyb20gJy4uL3R5cGVzL0JveC5qcydcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuLi90eXBlcy9FdmVudFRhcmdldC5qcydcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vdHlwZXMvTWF0cml4LmpzJ1xuaW1wb3J0IE1vcnBoYWJsZSwgeyBUcmFuc2Zvcm1CYWcsIE9iamVjdEJhZyB9IGZyb20gJy4vTW9ycGhhYmxlLmpzJ1xuaW1wb3J0IFBvaW50IGZyb20gJy4uL3R5cGVzL1BvaW50LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi9UaW1lbGluZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVubmVyIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgLy8gU3RvcmUgYSB1bmlxdWUgaWQgb24gdGhlIHJ1bm5lciwgc28gdGhhdCB3ZSBjYW4gaWRlbnRpZnkgaXQgbGF0ZXJcbiAgICB0aGlzLmlkID0gUnVubmVyLmlkKytcblxuICAgIC8vIEVuc3VyZSBhIGRlZmF1bHQgdmFsdWVcbiAgICBvcHRpb25zID0gb3B0aW9ucyA9PSBudWxsID8gdGltZWxpbmUuZHVyYXRpb24gOiBvcHRpb25zXG5cbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBnZXQgYSBjb250cm9sbGVyXG4gICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nID8gbmV3IENvbnRyb2xsZXIob3B0aW9ucykgOiBvcHRpb25zXG5cbiAgICAvLyBEZWNsYXJlIGFsbCBvZiB0aGUgdmFyaWFibGVzXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB0aGlzLl90aW1lbGluZSA9IG51bGxcbiAgICB0aGlzLmRvbmUgPSBmYWxzZVxuICAgIHRoaXMuX3F1ZXVlID0gW11cblxuICAgIC8vIFdvcmsgb3V0IHRoZSBzdGVwcGVyIGFuZCB0aGUgZHVyYXRpb25cbiAgICB0aGlzLl9kdXJhdGlvbiA9IHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJyAmJiBvcHRpb25zXG4gICAgdGhpcy5faXNEZWNsYXJhdGl2ZSA9IG9wdGlvbnMgaW5zdGFuY2VvZiBDb250cm9sbGVyXG4gICAgdGhpcy5fc3RlcHBlciA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgPyBvcHRpb25zIDogbmV3IEVhc2UoKVxuXG4gICAgLy8gV2UgY29weSB0aGUgY3VycmVudCB2YWx1ZXMgZnJvbSB0aGUgdGltZWxpbmUgYmVjYXVzZSB0aGV5IGNhbiBjaGFuZ2VcbiAgICB0aGlzLl9oaXN0b3J5ID0ge31cblxuICAgIC8vIFN0b3JlIHRoZSBzdGF0ZSBvZiB0aGUgcnVubmVyXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuX3RpbWUgPSAwXG4gICAgdGhpcy5fbGFzdFRpbWUgPSAwXG5cbiAgICAvLyBBdCBjcmVhdGlvbiwgdGhlIHJ1bm5lciBpcyBpbiByZXNldCBzdGF0ZVxuICAgIHRoaXMuX3Jlc2V0ZWQgPSB0cnVlXG5cbiAgICAvLyBTYXZlIHRyYW5zZm9ybXMgYXBwbGllZCB0byB0aGlzIHJ1bm5lclxuICAgIHRoaXMudHJhbnNmb3JtcyA9IG5ldyBNYXRyaXgoKVxuICAgIHRoaXMudHJhbnNmb3JtSWQgPSAxXG5cbiAgICAvLyBMb29waW5nIHZhcmlhYmxlc1xuICAgIHRoaXMuX2hhdmVSZXZlcnNlZCA9IGZhbHNlXG4gICAgdGhpcy5fcmV2ZXJzZSA9IGZhbHNlXG4gICAgdGhpcy5fbG9vcHNEb25lID0gMFxuICAgIHRoaXMuX3N3aW5nID0gZmFsc2VcbiAgICB0aGlzLl93YWl0ID0gMFxuICAgIHRoaXMuX3RpbWVzID0gMVxuXG4gICAgdGhpcy5fZnJhbWVJZCA9IG51bGxcblxuICAgIC8vIFN0b3JlcyBob3cgbG9uZyBhIHJ1bm5lciBpcyBzdG9yZWQgYWZ0ZXIgYmVpbmcgZG9uZVxuICAgIHRoaXMuX3BlcnNpc3QgPSB0aGlzLl9pc0RlY2xhcmF0aXZlID8gdHJ1ZSA6IG51bGxcbiAgfVxuXG4gIHN0YXRpYyBzYW5pdGlzZShkdXJhdGlvbiwgZGVsYXksIHdoZW4pIHtcbiAgICAvLyBJbml0aWFsaXNlIHRoZSBkZWZhdWx0IHBhcmFtZXRlcnNcbiAgICBsZXQgdGltZXMgPSAxXG4gICAgbGV0IHN3aW5nID0gZmFsc2VcbiAgICBsZXQgd2FpdCA9IDBcbiAgICBkdXJhdGlvbiA9IGR1cmF0aW9uID8/IHRpbWVsaW5lLmR1cmF0aW9uXG4gICAgZGVsYXkgPSBkZWxheSA/PyB0aW1lbGluZS5kZWxheVxuICAgIHdoZW4gPSB3aGVuIHx8ICdsYXN0J1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhbiBvYmplY3QsIHVucGFjayB0aGUgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgIShkdXJhdGlvbiBpbnN0YW5jZW9mIFN0ZXBwZXIpKSB7XG4gICAgICBkZWxheSA9IGR1cmF0aW9uLmRlbGF5ID8/IGRlbGF5XG4gICAgICB3aGVuID0gZHVyYXRpb24ud2hlbiA/PyB3aGVuXG4gICAgICBzd2luZyA9IGR1cmF0aW9uLnN3aW5nIHx8IHN3aW5nXG4gICAgICB0aW1lcyA9IGR1cmF0aW9uLnRpbWVzID8/IHRpbWVzXG4gICAgICB3YWl0ID0gZHVyYXRpb24ud2FpdCA/PyB3YWl0XG4gICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uLmR1cmF0aW9uID8/IHRpbWVsaW5lLmR1cmF0aW9uXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgIGRlbGF5OiBkZWxheSxcbiAgICAgIHN3aW5nOiBzd2luZyxcbiAgICAgIHRpbWVzOiB0aW1lcyxcbiAgICAgIHdhaXQ6IHdhaXQsXG4gICAgICB3aGVuOiB3aGVuXG4gICAgfVxuICB9XG5cbiAgYWN0aXZlKGVuYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCA9PSBudWxsKSByZXR1cm4gdGhpcy5lbmFibGVkXG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKlxuICBQcml2YXRlIE1ldGhvZHNcbiAgPT09PT09PT09PT09PT09XG4gIE1ldGhvZHMgdGhhdCBzaG91bGRuJ3QgYmUgdXNlZCBleHRlcm5hbGx5XG4gICovXG4gIGFkZFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICB0aGlzLnRyYW5zZm9ybXMubG11bHRpcGx5Tyh0cmFuc2Zvcm0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFmdGVyKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMub24oJ2ZpbmlzaGVkJywgZm4pXG4gIH1cblxuICBhbmltYXRlKGR1cmF0aW9uLCBkZWxheSwgd2hlbikge1xuICAgIGNvbnN0IG8gPSBSdW5uZXIuc2FuaXRpc2UoZHVyYXRpb24sIGRlbGF5LCB3aGVuKVxuICAgIGNvbnN0IHJ1bm5lciA9IG5ldyBSdW5uZXIoby5kdXJhdGlvbilcbiAgICBpZiAodGhpcy5fdGltZWxpbmUpIHJ1bm5lci50aW1lbGluZSh0aGlzLl90aW1lbGluZSlcbiAgICBpZiAodGhpcy5fZWxlbWVudCkgcnVubmVyLmVsZW1lbnQodGhpcy5fZWxlbWVudClcbiAgICByZXR1cm4gcnVubmVyLmxvb3Aobykuc2NoZWR1bGUoby5kZWxheSwgby53aGVuKVxuICB9XG5cbiAgY2xlYXJUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0gbmV3IE1hdHJpeCgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFRPRE86IEtlZXAgdHJhY2sgb2YgYWxsIHRyYW5zZm9ybWF0aW9ucyBzbyB0aGF0IGRlbGV0aW9uIGlzIGZhc3RlclxuICBjbGVhclRyYW5zZm9ybXNGcm9tUXVldWUoKSB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuZG9uZSB8fFxuICAgICAgIXRoaXMuX3RpbWVsaW5lIHx8XG4gICAgICAhdGhpcy5fdGltZWxpbmUuX3J1bm5lcklkcy5pbmNsdWRlcyh0aGlzLmlkKVxuICAgICkge1xuICAgICAgdGhpcy5fcXVldWUgPSB0aGlzLl9xdWV1ZS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuICFpdGVtLmlzVHJhbnNmb3JtXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRlbGF5KGRlbGF5KSB7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgwLCBkZWxheSlcbiAgfVxuXG4gIGR1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90aW1lcyAqICh0aGlzLl93YWl0ICsgdGhpcy5fZHVyYXRpb24pIC0gdGhpcy5fd2FpdFxuICB9XG5cbiAgZHVyaW5nKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUobnVsbCwgZm4pXG4gIH1cblxuICBlYXNlKGZuKSB7XG4gICAgdGhpcy5fc3RlcHBlciA9IG5ldyBFYXNlKGZuKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgLypcbiAgUnVubmVyIERlZmluaXRpb25zXG4gID09PT09PT09PT09PT09PT09PVxuICBUaGVzZSBtZXRob2RzIGhlbHAgdXMgZGVmaW5lIHRoZSBydW50aW1lIGJlaGF2aW91ciBvZiB0aGUgUnVubmVyIG9yIHRoZXlcbiAgaGVscCB1cyBtYWtlIG5ldyBydW5uZXJzIGZyb20gdGhlIGN1cnJlbnQgcnVubmVyXG4gICovXG5cbiAgZWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX2VsZW1lbnRcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICAgIGVsZW1lbnQuX3ByZXBhcmVSdW5uZXIoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmaW5pc2goKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcChJbmZpbml0eSlcbiAgfVxuXG4gIGxvb3AodGltZXMsIHN3aW5nLCB3YWl0KSB7XG4gICAgLy8gRGVhbCB3aXRoIHRoZSB1c2VyIHBhc3NpbmcgaW4gYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiB0aW1lcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHN3aW5nID0gdGltZXMuc3dpbmdcbiAgICAgIHdhaXQgPSB0aW1lcy53YWl0XG4gICAgICB0aW1lcyA9IHRpbWVzLnRpbWVzXG4gICAgfVxuXG4gICAgLy8gU2FuaXRpc2UgdGhlIHZhbHVlcyBhbmQgc3RvcmUgdGhlbVxuICAgIHRoaXMuX3RpbWVzID0gdGltZXMgfHwgSW5maW5pdHlcbiAgICB0aGlzLl9zd2luZyA9IHN3aW5nIHx8IGZhbHNlXG4gICAgdGhpcy5fd2FpdCA9IHdhaXQgfHwgMFxuXG4gICAgLy8gQWxsb3cgdHJ1ZSB0byBiZSBwYXNzZWRcbiAgICBpZiAodGhpcy5fdGltZXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX3RpbWVzID0gSW5maW5pdHlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbG9vcHMocCkge1xuICAgIGNvbnN0IGxvb3BEdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fd2FpdFxuICAgIGlmIChwID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGxvb3BzRG9uZSA9IE1hdGguZmxvb3IodGhpcy5fdGltZSAvIGxvb3BEdXJhdGlvbilcbiAgICAgIGNvbnN0IHJlbGF0aXZlVGltZSA9IHRoaXMuX3RpbWUgLSBsb29wc0RvbmUgKiBsb29wRHVyYXRpb25cbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gcmVsYXRpdmVUaW1lIC8gdGhpcy5fZHVyYXRpb25cbiAgICAgIHJldHVybiBNYXRoLm1pbihsb29wc0RvbmUgKyBwb3NpdGlvbiwgdGhpcy5fdGltZXMpXG4gICAgfVxuICAgIGNvbnN0IHdob2xlID0gTWF0aC5mbG9vcihwKVxuICAgIGNvbnN0IHBhcnRpYWwgPSBwICUgMVxuICAgIGNvbnN0IHRpbWUgPSBsb29wRHVyYXRpb24gKiB3aG9sZSArIHRoaXMuX2R1cmF0aW9uICogcGFydGlhbFxuICAgIHJldHVybiB0aGlzLnRpbWUodGltZSlcbiAgfVxuXG4gIHBlcnNpc3QoZHRPckZvcmV2ZXIpIHtcbiAgICBpZiAoZHRPckZvcmV2ZXIgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3BlcnNpc3RcbiAgICB0aGlzLl9wZXJzaXN0ID0gZHRPckZvcmV2ZXJcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcG9zaXRpb24ocCkge1xuICAgIC8vIEdldCBhbGwgb2YgdGhlIHZhcmlhYmxlcyB3ZSBuZWVkXG4gICAgY29uc3QgeCA9IHRoaXMuX3RpbWVcbiAgICBjb25zdCBkID0gdGhpcy5fZHVyYXRpb25cbiAgICBjb25zdCB3ID0gdGhpcy5fd2FpdFxuICAgIGNvbnN0IHQgPSB0aGlzLl90aW1lc1xuICAgIGNvbnN0IHMgPSB0aGlzLl9zd2luZ1xuICAgIGNvbnN0IHIgPSB0aGlzLl9yZXZlcnNlXG4gICAgbGV0IHBvc2l0aW9uXG5cbiAgICBpZiAocCA9PSBudWxsKSB7XG4gICAgICAvKlxuICAgICAgVGhpcyBmdW5jdGlvbiBjb252ZXJ0cyBhIHRpbWUgdG8gYSBwb3NpdGlvbiBpbiB0aGUgcmFuZ2UgWzAsIDFdXG4gICAgICBUaGUgZnVsbCBleHBsYW5hdGlvbiBjYW4gYmUgZm91bmQgaW4gdGhpcyBkZXNtb3MgZGVtb25zdHJhdGlvblxuICAgICAgICBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvdTRmYmF2Z2NoZVxuICAgICAgVGhlIGxvZ2ljIGlzIHNsaWdodGx5IHNpbXBsaWZpZWQgaGVyZSBiZWNhdXNlIHdlIGNhbiB1c2UgYm9vbGVhbnNcbiAgICAgICovXG5cbiAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIHZhbHVlIHdpdGhvdXQgdGhpbmtpbmcgYWJvdXQgdGhlIHN0YXJ0IG9yIGVuZCB0aW1lXG4gICAgICBjb25zdCBmID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgY29uc3Qgc3dpbmdpbmcgPSBzICogTWF0aC5mbG9vcigoeCAlICgyICogKHcgKyBkKSkpIC8gKHcgKyBkKSlcbiAgICAgICAgY29uc3QgYmFja3dhcmRzID0gKHN3aW5naW5nICYmICFyKSB8fCAoIXN3aW5naW5nICYmIHIpXG4gICAgICAgIGNvbnN0IHVuY2xpcGVkID1cbiAgICAgICAgICAoTWF0aC5wb3coLTEsIGJhY2t3YXJkcykgKiAoeCAlICh3ICsgZCkpKSAvIGQgKyBiYWNrd2FyZHNcbiAgICAgICAgY29uc3QgY2xpcHBlZCA9IE1hdGgubWF4KE1hdGgubWluKHVuY2xpcGVkLCAxKSwgMClcbiAgICAgICAgcmV0dXJuIGNsaXBwZWRcbiAgICAgIH1cblxuICAgICAgLy8gRmlndXJlIG91dCB0aGUgdmFsdWUgYnkgaW5jb3Jwb3JhdGluZyB0aGUgc3RhcnQgdGltZVxuICAgICAgY29uc3QgZW5kVGltZSA9IHQgKiAodyArIGQpIC0gd1xuICAgICAgcG9zaXRpb24gPVxuICAgICAgICB4IDw9IDBcbiAgICAgICAgICA/IE1hdGgucm91bmQoZigxZS01KSlcbiAgICAgICAgICA6IHggPCBlbmRUaW1lXG4gICAgICAgICAgICA/IGYoeClcbiAgICAgICAgICAgIDogTWF0aC5yb3VuZChmKGVuZFRpbWUgLSAxZS01KSlcbiAgICAgIHJldHVybiBwb3NpdGlvblxuICAgIH1cblxuICAgIC8vIFdvcmsgb3V0IHRoZSBsb29wcyBkb25lIGFuZCBhZGQgdGhlIHBvc2l0aW9uIHRvIHRoZSBsb29wcyBkb25lXG4gICAgY29uc3QgbG9vcHNEb25lID0gTWF0aC5mbG9vcih0aGlzLmxvb3BzKCkpXG4gICAgY29uc3Qgc3dpbmdGb3J3YXJkID0gcyAmJiBsb29wc0RvbmUgJSAyID09PSAwXG4gICAgY29uc3QgZm9yd2FyZHMgPSAoc3dpbmdGb3J3YXJkICYmICFyKSB8fCAociAmJiBzd2luZ0ZvcndhcmQpXG4gICAgcG9zaXRpb24gPSBsb29wc0RvbmUgKyAoZm9yd2FyZHMgPyBwIDogMSAtIHApXG4gICAgcmV0dXJuIHRoaXMubG9vcHMocG9zaXRpb24pXG4gIH1cblxuICBwcm9ncmVzcyhwKSB7XG4gICAgaWYgKHAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE1hdGgubWluKDEsIHRoaXMuX3RpbWUgLyB0aGlzLmR1cmF0aW9uKCkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRpbWUocCAqIHRoaXMuZHVyYXRpb24oKSlcbiAgfVxuXG4gIC8qXG4gIEJhc2ljIEZ1bmN0aW9uYWxpdHlcbiAgPT09PT09PT09PT09PT09PT09PVxuICBUaGVzZSBtZXRob2RzIGFsbG93IHVzIHRvIGF0dGFjaCBiYXNpYyBmdW5jdGlvbnMgdG8gdGhlIHJ1bm5lciBkaXJlY3RseVxuICAqL1xuICBxdWV1ZShpbml0Rm4sIHJ1bkZuLCByZXRhcmdldEZuLCBpc1RyYW5zZm9ybSkge1xuICAgIHRoaXMuX3F1ZXVlLnB1c2goe1xuICAgICAgaW5pdGlhbGlzZXI6IGluaXRGbiB8fCBub29wLFxuICAgICAgcnVubmVyOiBydW5GbiB8fCBub29wLFxuICAgICAgcmV0YXJnZXQ6IHJldGFyZ2V0Rm4sXG4gICAgICBpc1RyYW5zZm9ybTogaXNUcmFuc2Zvcm0sXG4gICAgICBpbml0aWFsaXNlZDogZmFsc2UsXG4gICAgICBmaW5pc2hlZDogZmFsc2VcbiAgICB9KVxuICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy50aW1lbGluZSgpXG4gICAgdGltZWxpbmUgJiYgdGhpcy50aW1lbGluZSgpLl9jb250aW51ZSgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLl9yZXNldGVkKSByZXR1cm4gdGhpc1xuICAgIHRoaXMudGltZSgwKVxuICAgIHRoaXMuX3Jlc2V0ZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJldmVyc2UocmV2ZXJzZSkge1xuICAgIHRoaXMuX3JldmVyc2UgPSByZXZlcnNlID09IG51bGwgPyAhdGhpcy5fcmV2ZXJzZSA6IHJldmVyc2VcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2NoZWR1bGUodGltZWxpbmUsIGRlbGF5LCB3aGVuKSB7XG4gICAgLy8gVGhlIHVzZXIgZG9lc24ndCBuZWVkIHRvIHBhc3MgYSB0aW1lbGluZSBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gICAgaWYgKCEodGltZWxpbmUgaW5zdGFuY2VvZiBUaW1lbGluZSkpIHtcbiAgICAgIHdoZW4gPSBkZWxheVxuICAgICAgZGVsYXkgPSB0aW1lbGluZVxuICAgICAgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyB0aW1lbGluZSwgeWVsbCBhdCB0aGUgdXNlci4uLlxuICAgIGlmICghdGltZWxpbmUpIHtcbiAgICAgIHRocm93IEVycm9yKCdSdW5uZXIgY2Fubm90IGJlIHNjaGVkdWxlZCB3aXRob3V0IHRpbWVsaW5lJylcbiAgICB9XG5cbiAgICAvLyBTY2hlZHVsZSB0aGUgcnVubmVyIG9uIHRoZSB0aW1lbGluZSBwcm92aWRlZFxuICAgIHRpbWVsaW5lLnNjaGVkdWxlKHRoaXMsIGRlbGF5LCB3aGVuKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGVwKGR0KSB7XG4gICAgLy8gSWYgd2UgYXJlIGluYWN0aXZlLCB0aGlzIHN0ZXBwZXIganVzdCBnZXRzIHNraXBwZWRcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuIHRoaXNcblxuICAgIC8vIFVwZGF0ZSB0aGUgdGltZSBhbmQgZ2V0IHRoZSBuZXcgcG9zaXRpb25cbiAgICBkdCA9IGR0ID09IG51bGwgPyAxNiA6IGR0XG4gICAgdGhpcy5fdGltZSArPSBkdFxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbigpXG5cbiAgICAvLyBGaWd1cmUgb3V0IGlmIHdlIG5lZWQgdG8gcnVuIHRoZSBzdGVwcGVyIGluIHRoaXMgZnJhbWVcbiAgICBjb25zdCBydW5uaW5nID0gdGhpcy5fbGFzdFBvc2l0aW9uICE9PSBwb3NpdGlvbiAmJiB0aGlzLl90aW1lID49IDBcbiAgICB0aGlzLl9sYXN0UG9zaXRpb24gPSBwb3NpdGlvblxuXG4gICAgLy8gRmlndXJlIG91dCBpZiB3ZSBqdXN0IHN0YXJ0ZWRcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb24oKVxuICAgIGNvbnN0IGp1c3RTdGFydGVkID0gdGhpcy5fbGFzdFRpbWUgPD0gMCAmJiB0aGlzLl90aW1lID4gMFxuICAgIGNvbnN0IGp1c3RGaW5pc2hlZCA9IHRoaXMuX2xhc3RUaW1lIDwgZHVyYXRpb24gJiYgdGhpcy5fdGltZSA+PSBkdXJhdGlvblxuXG4gICAgdGhpcy5fbGFzdFRpbWUgPSB0aGlzLl90aW1lXG4gICAgaWYgKGp1c3RTdGFydGVkKSB7XG4gICAgICB0aGlzLmZpcmUoJ3N0YXJ0JywgdGhpcylcbiAgICB9XG5cbiAgICAvLyBXb3JrIG91dCBpZiB0aGUgcnVubmVyIGlzIGZpbmlzaGVkIHNldCB0aGUgZG9uZSBmbGFnIGhlcmUgc28gYW5pbWF0aW9uc1xuICAgIC8vIGtub3csIHRoYXQgdGhleSBhcmUgcnVubmluZyBpbiB0aGUgbGFzdCBzdGVwICh0aGlzIGlzIGdvb2QgZm9yXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zIHdoaWNoIGNhbiBiZSBtZXJnZWQpXG4gICAgY29uc3QgZGVjbGFyYXRpdmUgPSB0aGlzLl9pc0RlY2xhcmF0aXZlXG4gICAgdGhpcy5kb25lID0gIWRlY2xhcmF0aXZlICYmICFqdXN0RmluaXNoZWQgJiYgdGhpcy5fdGltZSA+PSBkdXJhdGlvblxuXG4gICAgLy8gUnVubmVyIGlzIHJ1bm5pbmcuIFNvIGl0cyBub3QgaW4gcmVzZXQgc3RhdGUgYW55bW9yZVxuICAgIHRoaXMuX3Jlc2V0ZWQgPSBmYWxzZVxuXG4gICAgbGV0IGNvbnZlcmdlZCA9IGZhbHNlXG4gICAgLy8gQ2FsbCBpbml0aWFsaXNlIGFuZCB0aGUgcnVuIGZ1bmN0aW9uXG4gICAgaWYgKHJ1bm5pbmcgfHwgZGVjbGFyYXRpdmUpIHtcbiAgICAgIHRoaXMuX2luaXRpYWxpc2UocnVubmluZylcblxuICAgICAgLy8gY2xlYXIgdGhlIHRyYW5zZm9ybXMgb24gdGhpcyBydW5uZXIgc28gdGhleSBkb250IGdldCBhZGRlZCBhZ2FpbiBhbmQgYWdhaW5cbiAgICAgIHRoaXMudHJhbnNmb3JtcyA9IG5ldyBNYXRyaXgoKVxuICAgICAgY29udmVyZ2VkID0gdGhpcy5fcnVuKGRlY2xhcmF0aXZlID8gZHQgOiBwb3NpdGlvbilcblxuICAgICAgdGhpcy5maXJlKCdzdGVwJywgdGhpcylcbiAgICB9XG4gICAgLy8gY29ycmVjdCB0aGUgZG9uZSBmbGFnIGhlcmVcbiAgICAvLyBkZWNsYXJhdGl2ZSBhbmltYXRpb25zIGl0c2VsZiBrbm93IHdoZW4gdGhleSBjb252ZXJnZWRcbiAgICB0aGlzLmRvbmUgPSB0aGlzLmRvbmUgfHwgKGNvbnZlcmdlZCAmJiBkZWNsYXJhdGl2ZSlcbiAgICBpZiAoanVzdEZpbmlzaGVkKSB7XG4gICAgICB0aGlzLmZpcmUoJ2ZpbmlzaGVkJywgdGhpcylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qXG4gIFJ1bm5lciBhbmltYXRpb24gbWV0aG9kc1xuICA9PT09PT09PT09PT09PT09PT09PT09PT1cbiAgQ29udHJvbCBob3cgdGhlIGFuaW1hdGlvbiBwbGF5c1xuICAqL1xuICB0aW1lKHRpbWUpIHtcbiAgICBpZiAodGltZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGltZVxuICAgIH1cbiAgICBjb25zdCBkdCA9IHRpbWUgLSB0aGlzLl90aW1lXG4gICAgdGhpcy5zdGVwKGR0KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0aW1lbGluZSh0aW1lbGluZSkge1xuICAgIC8vIGNoZWNrIGV4cGxpY2l0bHkgZm9yIHVuZGVmaW5lZCBzbyB3ZSBjYW4gc2V0IHRoZSB0aW1lbGluZSB0byBudWxsXG4gICAgaWYgKHR5cGVvZiB0aW1lbGluZSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiB0aGlzLl90aW1lbGluZVxuICAgIHRoaXMuX3RpbWVsaW5lID0gdGltZWxpbmVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5zY2hlZHVsZSgpIHtcbiAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxuICAgIHRpbWVsaW5lICYmIHRpbWVsaW5lLnVuc2NoZWR1bGUodGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gUnVuIGVhY2ggaW5pdGlhbGlzZSBmdW5jdGlvbiBpbiB0aGUgcnVubmVyIGlmIHJlcXVpcmVkXG4gIF9pbml0aWFsaXNlKHJ1bm5pbmcpIHtcbiAgICAvLyBJZiB3ZSBhcmVuJ3QgcnVubmluZywgd2Ugc2hvdWxkbid0IGluaXRpYWxpc2Ugd2hlbiBub3QgZGVjbGFyYXRpdmVcbiAgICBpZiAoIXJ1bm5pbmcgJiYgIXRoaXMuX2lzRGVjbGFyYXRpdmUpIHJldHVyblxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBvZiB0aGUgaW5pdGlhbGlzZXJzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgaW5pdGlhbGlzZXJcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9xdWV1ZVtpXVxuXG4gICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciB3ZSBuZWVkIHRvIGluaXRpYWxpc2VcbiAgICAgIGNvbnN0IG5lZWRzSXQgPSB0aGlzLl9pc0RlY2xhcmF0aXZlIHx8ICghY3VycmVudC5pbml0aWFsaXNlZCAmJiBydW5uaW5nKVxuICAgICAgcnVubmluZyA9ICFjdXJyZW50LmZpbmlzaGVkXG5cbiAgICAgIC8vIENhbGwgdGhlIGluaXRpYWxpc2VyIGlmIHdlIG5lZWQgdG9cbiAgICAgIGlmIChuZWVkc0l0ICYmIHJ1bm5pbmcpIHtcbiAgICAgICAgY3VycmVudC5pbml0aWFsaXNlci5jYWxsKHRoaXMpXG4gICAgICAgIGN1cnJlbnQuaW5pdGlhbGlzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2F2ZSBhIG1vcnBoZXIgdG8gdGhlIG1vcnBoZXIgbGlzdCBzbyB0aGF0IHdlIGNhbiByZXRhcmdldCBpdCBsYXRlclxuICBfcmVtZW1iZXJNb3JwaGVyKG1ldGhvZCwgbW9ycGhlcikge1xuICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXSA9IHtcbiAgICAgIG1vcnBoZXI6IG1vcnBoZXIsXG4gICAgICBjYWxsZXI6IHRoaXMuX3F1ZXVlW3RoaXMuX3F1ZXVlLmxlbmd0aCAtIDFdXG4gICAgfVxuXG4gICAgLy8gV2UgaGF2ZSB0byByZXN1bWUgdGhlIHRpbWVsaW5lIGluIGNhc2UgYSBjb250cm9sbGVyXG4gICAgLy8gaXMgYWxyZWFkeSBkb25lIHdpdGhvdXQgYmVpbmcgZXZlciBydW5cbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gd2hlbiBlLmcuIHRoaXMgaXMgZG9uZTpcbiAgICAvLyAgICBhbmltID0gZWwuYW5pbWF0ZShuZXcgU1ZHLlNwcmluZylcbiAgICAvLyBhbmQgbGF0ZXJcbiAgICAvLyAgICBhbmltLm1vdmUoLi4uKVxuICAgIGlmICh0aGlzLl9pc0RlY2xhcmF0aXZlKSB7XG4gICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxuICAgICAgdGltZWxpbmUgJiYgdGltZWxpbmUucGxheSgpXG4gICAgfVxuICB9XG5cbiAgLy8gVHJ5IHRvIHNldCB0aGUgdGFyZ2V0IGZvciBhIG1vcnBoZXIgaWYgdGhlIG1vcnBoZXIgZXhpc3RzLCBvdGhlcndpc2VcbiAgLy8gUnVuIGVhY2ggcnVuIGZ1bmN0aW9uIGZvciB0aGUgcG9zaXRpb24gb3IgZHQgZ2l2ZW5cbiAgX3J1bihwb3NpdGlvbk9yRHQpIHtcbiAgICAvLyBSdW4gYWxsIG9mIHRoZSBfcXVldWUgZGlyZWN0bHlcbiAgICBsZXQgYWxsZmluaXNoZWQgPSB0cnVlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZnVuY3Rpb24gdG8gcnVuXG4gICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fcXVldWVbaV1cblxuICAgICAgLy8gUnVuIHRoZSBmdW5jdGlvbiBpZiBpdHMgbm90IGZpbmlzaGVkLCB3ZSBrZWVwIHRyYWNrIG9mIHRoZSBmaW5pc2hlZFxuICAgICAgLy8gZmxhZyBmb3IgdGhlIHNha2Ugb2YgZGVjbGFyYXRpdmUgX3F1ZXVlXG4gICAgICBjb25zdCBjb252ZXJnZWQgPSBjdXJyZW50LnJ1bm5lci5jYWxsKHRoaXMsIHBvc2l0aW9uT3JEdClcbiAgICAgIGN1cnJlbnQuZmluaXNoZWQgPSBjdXJyZW50LmZpbmlzaGVkIHx8IGNvbnZlcmdlZCA9PT0gdHJ1ZVxuICAgICAgYWxsZmluaXNoZWQgPSBhbGxmaW5pc2hlZCAmJiBjdXJyZW50LmZpbmlzaGVkXG4gICAgfVxuXG4gICAgLy8gV2UgcmVwb3J0IHdoZW4gYWxsIG9mIHRoZSBjb25zdHJ1Y3RvcnMgYXJlIGZpbmlzaGVkXG4gICAgcmV0dXJuIGFsbGZpbmlzaGVkXG4gIH1cblxuICAvLyBkbyBub3RoaW5nIGFuZCByZXR1cm4gZmFsc2VcbiAgX3RyeVJldGFyZ2V0KG1ldGhvZCwgdGFyZ2V0LCBleHRyYSkge1xuICAgIGlmICh0aGlzLl9oaXN0b3J5W21ldGhvZF0pIHtcbiAgICAgIC8vIGlmIHRoZSBsYXN0IG1ldGhvZCB3YXNuJ3QgZXZlbiBpbml0aWFsaXNlZCwgdGhyb3cgaXQgYXdheVxuICAgICAgaWYgKCF0aGlzLl9oaXN0b3J5W21ldGhvZF0uY2FsbGVyLmluaXRpYWxpc2VkKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fcXVldWUuaW5kZXhPZih0aGlzLl9oaXN0b3J5W21ldGhvZF0uY2FsbGVyKVxuICAgICAgICB0aGlzLl9xdWV1ZS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBmb3IgdGhlIGNhc2Ugb2YgdHJhbnNmb3JtYXRpb25zLCB3ZSB1c2UgdGhlIHNwZWNpYWwgcmV0YXJnZXQgZnVuY3Rpb25cbiAgICAgIC8vIHdoaWNoIGhhcyBhY2Nlc3MgdG8gdGhlIG91dGVyIHNjb3BlXG4gICAgICBpZiAodGhpcy5faGlzdG9yeVttZXRob2RdLmNhbGxlci5yZXRhcmdldCkge1xuICAgICAgICB0aGlzLl9oaXN0b3J5W21ldGhvZF0uY2FsbGVyLnJldGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBleHRyYSlcbiAgICAgICAgLy8gZm9yIGV2ZXJ5dGhpbmcgZWxzZSBhIHNpbXBsZSBtb3JwaGVyIGNoYW5nZSBpcyBzdWZmaWNpZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oaXN0b3J5W21ldGhvZF0ubW9ycGhlci50byh0YXJnZXQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIuZmluaXNoZWQgPSBmYWxzZVxuICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcbiAgICAgIHRpbWVsaW5lICYmIHRpbWVsaW5lLnBsYXkoKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuUnVubmVyLmlkID0gMFxuXG5leHBvcnQgY2xhc3MgRmFrZVJ1bm5lciB7XG4gIGNvbnN0cnVjdG9yKHRyYW5zZm9ybXMgPSBuZXcgTWF0cml4KCksIGlkID0gLTEsIGRvbmUgPSB0cnVlKSB7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0gdHJhbnNmb3Jtc1xuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMuZG9uZSA9IGRvbmVcbiAgfVxuXG4gIGNsZWFyVHJhbnNmb3Jtc0Zyb21RdWV1ZSgpIHt9XG59XG5cbmV4dGVuZChbUnVubmVyLCBGYWtlUnVubmVyXSwge1xuICBtZXJnZVdpdGgocnVubmVyKSB7XG4gICAgcmV0dXJuIG5ldyBGYWtlUnVubmVyKFxuICAgICAgcnVubmVyLnRyYW5zZm9ybXMubG11bHRpcGx5KHRoaXMudHJhbnNmb3JtcyksXG4gICAgICBydW5uZXIuaWRcbiAgICApXG4gIH1cbn0pXG5cbi8vIEZha2VSdW5uZXIuZW1wdHlSdW5uZXIgPSBuZXcgRmFrZVJ1bm5lcigpXG5cbmNvbnN0IGxtdWx0aXBseSA9IChsYXN0LCBjdXJyKSA9PiBsYXN0LmxtdWx0aXBseU8oY3VycilcbmNvbnN0IGdldFJ1bm5lclRyYW5zZm9ybSA9IChydW5uZXIpID0+IHJ1bm5lci50cmFuc2Zvcm1zXG5cbmZ1bmN0aW9uIG1lcmdlVHJhbnNmb3JtcygpIHtcbiAgLy8gRmluZCB0aGUgbWF0cml4IHRvIGFwcGx5IHRvIHRoZSBlbGVtZW50IGFuZCBhcHBseSBpdFxuICBjb25zdCBydW5uZXJzID0gdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLnJ1bm5lcnNcbiAgY29uc3QgbmV0VHJhbnNmb3JtID0gcnVubmVyc1xuICAgIC5tYXAoZ2V0UnVubmVyVHJhbnNmb3JtKVxuICAgIC5yZWR1Y2UobG11bHRpcGx5LCBuZXcgTWF0cml4KCkpXG5cbiAgdGhpcy50cmFuc2Zvcm0obmV0VHJhbnNmb3JtKVxuXG4gIHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycy5tZXJnZSgpXG5cbiAgaWYgKHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycy5sZW5ndGgoKSA9PT0gMSkge1xuICAgIHRoaXMuX2ZyYW1lSWQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJ1bm5lckFycmF5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ydW5uZXJzID0gW11cbiAgICB0aGlzLmlkcyA9IFtdXG4gIH1cblxuICBhZGQocnVubmVyKSB7XG4gICAgaWYgKHRoaXMucnVubmVycy5pbmNsdWRlcyhydW5uZXIpKSByZXR1cm5cbiAgICBjb25zdCBpZCA9IHJ1bm5lci5pZCArIDFcblxuICAgIHRoaXMucnVubmVycy5wdXNoKHJ1bm5lcilcbiAgICB0aGlzLmlkcy5wdXNoKGlkKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNsZWFyQmVmb3JlKGlkKSB7XG4gICAgY29uc3QgZGVsZXRlQ250ID0gdGhpcy5pZHMuaW5kZXhPZihpZCArIDEpIHx8IDFcbiAgICB0aGlzLmlkcy5zcGxpY2UoMCwgZGVsZXRlQ250LCAwKVxuICAgIHRoaXMucnVubmVyc1xuICAgICAgLnNwbGljZSgwLCBkZWxldGVDbnQsIG5ldyBGYWtlUnVubmVyKCkpXG4gICAgICAuZm9yRWFjaCgocikgPT4gci5jbGVhclRyYW5zZm9ybXNGcm9tUXVldWUoKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZWRpdChpZCwgbmV3UnVubmVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmlkcy5pbmRleE9mKGlkICsgMSlcbiAgICB0aGlzLmlkcy5zcGxpY2UoaW5kZXgsIDEsIGlkICsgMSlcbiAgICB0aGlzLnJ1bm5lcnMuc3BsaWNlKGluZGV4LCAxLCBuZXdSdW5uZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGdldEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uZXJzW3RoaXMuaWRzLmluZGV4T2YoaWQgKyAxKV1cbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZHMubGVuZ3RoXG4gIH1cblxuICBtZXJnZSgpIHtcbiAgICBsZXQgbGFzdFJ1bm5lciA9IG51bGxcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVubmVycy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgcnVubmVyID0gdGhpcy5ydW5uZXJzW2ldXG5cbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9XG4gICAgICAgIGxhc3RSdW5uZXIgJiZcbiAgICAgICAgcnVubmVyLmRvbmUgJiZcbiAgICAgICAgbGFzdFJ1bm5lci5kb25lICYmXG4gICAgICAgIC8vIGRvbid0IG1lcmdlIHJ1bm5lciB3aGVuIHBlcnNpc3RlZCBvbiB0aW1lbGluZVxuICAgICAgICAoIXJ1bm5lci5fdGltZWxpbmUgfHxcbiAgICAgICAgICAhcnVubmVyLl90aW1lbGluZS5fcnVubmVySWRzLmluY2x1ZGVzKHJ1bm5lci5pZCkpICYmXG4gICAgICAgICghbGFzdFJ1bm5lci5fdGltZWxpbmUgfHxcbiAgICAgICAgICAhbGFzdFJ1bm5lci5fdGltZWxpbmUuX3J1bm5lcklkcy5pbmNsdWRlcyhsYXN0UnVubmVyLmlkKSlcblxuICAgICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICAvLyB0aGUgKzEgaGFwcGVucyBpbiB0aGUgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5yZW1vdmUocnVubmVyLmlkKVxuICAgICAgICBjb25zdCBuZXdSdW5uZXIgPSBydW5uZXIubWVyZ2VXaXRoKGxhc3RSdW5uZXIpXG4gICAgICAgIHRoaXMuZWRpdChsYXN0UnVubmVyLmlkLCBuZXdSdW5uZXIpXG4gICAgICAgIGxhc3RSdW5uZXIgPSBuZXdSdW5uZXJcbiAgICAgICAgLS1pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0UnVubmVyID0gcnVubmVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZShpZCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pZHMuaW5kZXhPZihpZCArIDEpXG4gICAgdGhpcy5pZHMuc3BsaWNlKGluZGV4LCAxKVxuICAgIHRoaXMucnVubmVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBFbGVtZW50OiB7XG4gICAgYW5pbWF0ZShkdXJhdGlvbiwgZGVsYXksIHdoZW4pIHtcbiAgICAgIGNvbnN0IG8gPSBSdW5uZXIuc2FuaXRpc2UoZHVyYXRpb24sIGRlbGF5LCB3aGVuKVxuICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcbiAgICAgIHJldHVybiBuZXcgUnVubmVyKG8uZHVyYXRpb24pXG4gICAgICAgIC5sb29wKG8pXG4gICAgICAgIC5lbGVtZW50KHRoaXMpXG4gICAgICAgIC50aW1lbGluZSh0aW1lbGluZS5wbGF5KCkpXG4gICAgICAgIC5zY2hlZHVsZShvLmRlbGF5LCBvLndoZW4pXG4gICAgfSxcblxuICAgIGRlbGF5KGJ5LCB3aGVuKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbmltYXRlKDAsIGJ5LCB3aGVuKVxuICAgIH0sXG5cbiAgICAvLyB0aGlzIGZ1bmN0aW9uIHNlYXJjaGVzIGZvciBhbGwgcnVubmVycyBvbiB0aGUgZWxlbWVudCBhbmQgZGVsZXRlcyB0aGUgb25lc1xuICAgIC8vIHdoaWNoIHJ1biBiZWZvcmUgdGhlIGN1cnJlbnQgb25lLiBUaGlzIGlzIGJlY2F1c2UgYWJzb2x1dGUgdHJhbnNmb3JtYXRpb25zXG4gICAgLy8gb3ZlcndyaXRlIGFueXRoaW5nIGFueXdheSBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIHdhc3RlIHRpbWUgY29tcHV0aW5nXG4gICAgLy8gb3RoZXIgcnVubmVyc1xuICAgIF9jbGVhclRyYW5zZm9ybVJ1bm5lcnNCZWZvcmUoY3VycmVudFJ1bm5lcikge1xuICAgICAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLmNsZWFyQmVmb3JlKGN1cnJlbnRSdW5uZXIuaWQpXG4gICAgfSxcblxuICAgIF9jdXJyZW50VHJhbnNmb3JtKGN1cnJlbnQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycy5ydW5uZXJzXG4gICAgICAgICAgLy8gd2UgbmVlZCB0aGUgZXF1YWwgc2lnbiBoZXJlIHRvIG1ha2Ugc3VyZSwgdGhhdCBhbHNvIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICAgIC8vIG9uIHRoZSBzYW1lIHJ1bm5lciB3aGljaCBleGVjdXRlIGJlZm9yZSB0aGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbiBhcmVcbiAgICAgICAgICAvLyB0YWtlbiBpbnRvIGFjY291bnRcbiAgICAgICAgICAuZmlsdGVyKChydW5uZXIpID0+IHJ1bm5lci5pZCA8PSBjdXJyZW50LmlkKVxuICAgICAgICAgIC5tYXAoZ2V0UnVubmVyVHJhbnNmb3JtKVxuICAgICAgICAgIC5yZWR1Y2UobG11bHRpcGx5LCBuZXcgTWF0cml4KCkpXG4gICAgICApXG4gICAgfSxcblxuICAgIF9hZGRSdW5uZXIocnVubmVyKSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMuYWRkKHJ1bm5lcilcblxuICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHJ1bm5lciBtZXJnZSBpcyBleGVjdXRlZCBhdCB0aGUgdmVyeSBlbmQgb2ZcbiAgICAgIC8vIGFsbCBBbmltYXRvciBmdW5jdGlvbnMuIFRoYXQgaXMgd2h5IHdlIHVzZSBpbW1lZGlhdGUgaGVyZSB0byBleGVjdXRlXG4gICAgICAvLyB0aGUgbWVyZ2UgcmlnaHQgYWZ0ZXIgYWxsIGZyYW1lcyBhcmUgcnVuXG4gICAgICBBbmltYXRvci5jYW5jZWxJbW1lZGlhdGUodGhpcy5fZnJhbWVJZClcbiAgICAgIHRoaXMuX2ZyYW1lSWQgPSBBbmltYXRvci5pbW1lZGlhdGUobWVyZ2VUcmFuc2Zvcm1zLmJpbmQodGhpcykpXG4gICAgfSxcblxuICAgIF9wcmVwYXJlUnVubmVyKCkge1xuICAgICAgaWYgKHRoaXMuX2ZyYW1lSWQgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMgPSBuZXcgUnVubmVyQXJyYXkoKS5hZGQoXG4gICAgICAgICAgbmV3IEZha2VSdW5uZXIobmV3IE1hdHJpeCh0aGlzKSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuLy8gV2lsbCBvdXRwdXQgdGhlIGVsZW1lbnRzIGZyb20gYXJyYXkgQSB0aGF0IGFyZSBub3QgaW4gdGhlIGFycmF5IEJcbmNvbnN0IGRpZmZlcmVuY2UgPSAoYSwgYikgPT4gYS5maWx0ZXIoKHgpID0+ICFiLmluY2x1ZGVzKHgpKVxuXG5leHRlbmQoUnVubmVyLCB7XG4gIGF0dHIoYSwgdikge1xuICAgIHJldHVybiB0aGlzLnN0eWxlQXR0cignYXR0cicsIGEsIHYpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgc3R5bGVzXG4gIGNzcyhzLCB2KSB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVBdHRyKCdjc3MnLCBzLCB2KVxuICB9LFxuXG4gIHN0eWxlQXR0cih0eXBlLCBuYW1lT3JBdHRycywgdmFsKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lT3JBdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlQXR0cih0eXBlLCB7IFtuYW1lT3JBdHRyc106IHZhbCB9KVxuICAgIH1cblxuICAgIGxldCBhdHRycyA9IG5hbWVPckF0dHJzXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KHR5cGUsIGF0dHJzKSkgcmV0dXJuIHRoaXNcblxuICAgIGxldCBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKS50byhhdHRycylcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGF0dHJzKVxuXG4gICAgdGhpcy5xdWV1ZShcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ycGhlciA9IG1vcnBoZXIuZnJvbSh0aGlzLmVsZW1lbnQoKVt0eXBlXShrZXlzKSlcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCgpW3R5cGVdKG1vcnBoZXIuYXQocG9zKS52YWx1ZU9mKCkpXG4gICAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChuZXdUb0F0dHJzKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBuZXcga2V5cyB3ZXJlIGFkZGVkXG4gICAgICAgIGNvbnN0IG5ld0tleXMgPSBPYmplY3Qua2V5cyhuZXdUb0F0dHJzKVxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlcyA9IGRpZmZlcmVuY2UobmV3S2V5cywga2V5cylcblxuICAgICAgICAvLyBJZiB0aGVpciBhcmUgbmV3IGtleXMsIGluaXRpYWxpemUgdGhlbSBhbmQgYWRkIHRoZW0gdG8gbW9ycGhlclxuICAgICAgICBpZiAoZGlmZmVyZW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSB2YWx1ZXNcbiAgICAgICAgICBjb25zdCBhZGRlZEZyb21BdHRycyA9IHRoaXMuZWxlbWVudCgpW3R5cGVdKGRpZmZlcmVuY2VzKVxuXG4gICAgICAgICAgLy8gR2V0IHRoZSBhbHJlYWR5IGluaXRpYWxpemVkIHZhbHVlc1xuICAgICAgICAgIGNvbnN0IG9sZEZyb21BdHRycyA9IG5ldyBPYmplY3RCYWcobW9ycGhlci5mcm9tKCkpLnZhbHVlT2YoKVxuXG4gICAgICAgICAgLy8gTWVyZ2Ugb2xkIGFuZCBuZXdcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG9sZEZyb21BdHRycywgYWRkZWRGcm9tQXR0cnMpXG4gICAgICAgICAgbW9ycGhlci5mcm9tKG9sZEZyb21BdHRycylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgb2JqZWN0IGZyb20gdGhlIG1vcnBoZXJcbiAgICAgICAgY29uc3Qgb2xkVG9BdHRycyA9IG5ldyBPYmplY3RCYWcobW9ycGhlci50bygpKS52YWx1ZU9mKClcblxuICAgICAgICAvLyBNZXJnZSBpbiBuZXcgYXR0cmlidXRlc1xuICAgICAgICBPYmplY3QuYXNzaWduKG9sZFRvQXR0cnMsIG5ld1RvQXR0cnMpXG5cbiAgICAgICAgLy8gQ2hhbmdlIG1vcnBoZXIgdGFyZ2V0XG4gICAgICAgIG1vcnBoZXIudG8ob2xkVG9BdHRycylcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSBzYXZlIHRoZSB3b3JrIHdlIGRpZCBzbyB3ZSBkb24ndCBuZWVkIGl0IHRvIGRvIGFnYWluXG4gICAgICAgIGtleXMgPSBuZXdLZXlzXG4gICAgICAgIGF0dHJzID0gbmV3VG9BdHRyc1xuICAgICAgfVxuICAgIClcblxuICAgIHRoaXMuX3JlbWVtYmVyTW9ycGhlcih0eXBlLCBtb3JwaGVyKVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgem9vbShsZXZlbCwgcG9pbnQpIHtcbiAgICBpZiAodGhpcy5fdHJ5UmV0YXJnZXQoJ3pvb20nLCBsZXZlbCwgcG9pbnQpKSByZXR1cm4gdGhpc1xuXG4gICAgbGV0IG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpLnRvKG5ldyBTVkdOdW1iZXIobGV2ZWwpKVxuXG4gICAgdGhpcy5xdWV1ZShcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ycGhlciA9IG1vcnBoZXIuZnJvbSh0aGlzLmVsZW1lbnQoKS56b29tKCkpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLmVsZW1lbnQoKS56b29tKG1vcnBoZXIuYXQocG9zKSwgcG9pbnQpXG4gICAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChuZXdMZXZlbCwgbmV3UG9pbnQpIHtcbiAgICAgICAgcG9pbnQgPSBuZXdQb2ludFxuICAgICAgICBtb3JwaGVyLnRvKG5ld0xldmVsKVxuICAgICAgfVxuICAgIClcblxuICAgIHRoaXMuX3JlbWVtYmVyTW9ycGhlcignem9vbScsIG1vcnBoZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICAvKipcbiAgICoqIGFic29sdXRlIHRyYW5zZm9ybWF0aW9uc1xuICAgKiovXG5cbiAgLy9cbiAgLy8gTSB2IC0tLS0tfC0tLS0tKEQgTSB2ID0gRiB2KS0tLS0tLXwtLS0tLT4gIFQgdlxuICAvL1xuICAvLyAxLiBkZWZpbmUgdGhlIGZpbmFsIHN0YXRlIChUKSBhbmQgZGVjb21wb3NlIGl0IChvbmNlKVxuICAvLyAgICB0ID0gW3R4LCB0eSwgdGhlLCBsYW0sIHN5LCBzeF1cbiAgLy8gMi4gb24gZXZlcnkgZnJhbWU6IHB1bGwgdGhlIGN1cnJlbnQgc3RhdGUgb2YgYWxsIHByZXZpb3VzIHRyYW5zZm9ybXNcbiAgLy8gICAgKE0gLSBtIGNhbiBjaGFuZ2UpXG4gIC8vICAgYW5kIHRoZW4gd3JpdGUgdGhpcyBhcyBtID0gW3R4MCwgdHkwLCB0aGUwLCBsYW0wLCBzeTAsIHN4MF1cbiAgLy8gMy4gRmluZCB0aGUgaW50ZXJwb2xhdGVkIG1hdHJpeCBGKHBvcykgPSBtICsgcG9zICogKHQgLSBtKVxuICAvLyAgIC0gTm90ZSBGKDApID0gTVxuICAvLyAgIC0gTm90ZSBGKDEpID0gVFxuICAvLyA0LiBOb3cgeW91IGdldCB0aGUgZGVsdGEgbWF0cml4IGFzIGEgcmVzdWx0OiBEID0gRiAqIGludihNKVxuXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1zLCByZWxhdGl2ZSwgYWZmaW5lKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBhIGRlY2xhcmF0aXZlIGZ1bmN0aW9uLCB3ZSBzaG91bGQgcmV0YXJnZXQgaXQgaWYgcG9zc2libGVcbiAgICByZWxhdGl2ZSA9IHRyYW5zZm9ybXMucmVsYXRpdmUgfHwgcmVsYXRpdmVcbiAgICBpZiAoXG4gICAgICB0aGlzLl9pc0RlY2xhcmF0aXZlICYmXG4gICAgICAhcmVsYXRpdmUgJiZcbiAgICAgIHRoaXMuX3RyeVJldGFyZ2V0KCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1zKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBQYXJzZSB0aGUgcGFyYW1ldGVyc1xuICAgIGNvbnN0IGlzTWF0cml4ID0gTWF0cml4LmlzTWF0cml4TGlrZSh0cmFuc2Zvcm1zKVxuICAgIGFmZmluZSA9XG4gICAgICB0cmFuc2Zvcm1zLmFmZmluZSAhPSBudWxsXG4gICAgICAgID8gdHJhbnNmb3Jtcy5hZmZpbmVcbiAgICAgICAgOiBhZmZpbmUgIT0gbnVsbFxuICAgICAgICAgID8gYWZmaW5lXG4gICAgICAgICAgOiAhaXNNYXRyaXhcblxuICAgIC8vIENyZWF0ZSBhIG1vcnBoZXIgYW5kIHNldCBpdHMgdHlwZVxuICAgIGNvbnN0IG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpLnR5cGUoXG4gICAgICBhZmZpbmUgPyBUcmFuc2Zvcm1CYWcgOiBNYXRyaXhcbiAgICApXG5cbiAgICBsZXQgb3JpZ2luXG4gICAgbGV0IGVsZW1lbnRcbiAgICBsZXQgY3VycmVudFxuICAgIGxldCBjdXJyZW50QW5nbGVcbiAgICBsZXQgc3RhcnRUcmFuc2Zvcm1cblxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgICAgLy8gbWFrZSBzdXJlIGVsZW1lbnQgYW5kIG9yaWdpbiBpcyBkZWZpbmVkXG4gICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLmVsZW1lbnQoKVxuICAgICAgb3JpZ2luID0gb3JpZ2luIHx8IGdldE9yaWdpbih0cmFuc2Zvcm1zLCBlbGVtZW50KVxuXG4gICAgICBzdGFydFRyYW5zZm9ybSA9IG5ldyBNYXRyaXgocmVsYXRpdmUgPyB1bmRlZmluZWQgOiBlbGVtZW50KVxuXG4gICAgICAvLyBhZGQgdGhlIHJ1bm5lciB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gbWVyZ2UgdHJhbnNmb3JtYXRpb25zXG4gICAgICBlbGVtZW50Ll9hZGRSdW5uZXIodGhpcylcblxuICAgICAgLy8gRGVhY3RpdmF0ZSBhbGwgdHJhbnNmb3JtcyB0aGF0IGhhdmUgcnVuIHNvIGZhciBpZiB3ZSBhcmUgYWJzb2x1dGVcbiAgICAgIGlmICghcmVsYXRpdmUpIHtcbiAgICAgICAgZWxlbWVudC5fY2xlYXJUcmFuc2Zvcm1SdW5uZXJzQmVmb3JlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHBvcykge1xuICAgICAgLy8gY2xlYXIgYWxsIG90aGVyIHRyYW5zZm9ybXMgYmVmb3JlIHRoaXMgaW4gY2FzZSBzb21ldGhpbmcgaXMgc2F2ZWRcbiAgICAgIC8vIG9uIHRoaXMgcnVubmVyLiBXZSBhcmUgYWJzb2x1dGUuIFdlIGRvbnQgbmVlZCB0aGVzZSFcbiAgICAgIGlmICghcmVsYXRpdmUpIHRoaXMuY2xlYXJUcmFuc2Zvcm0oKVxuXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IG5ldyBQb2ludChvcmlnaW4pLnRyYW5zZm9ybShcbiAgICAgICAgZWxlbWVudC5fY3VycmVudFRyYW5zZm9ybSh0aGlzKVxuICAgICAgKVxuXG4gICAgICBsZXQgdGFyZ2V0ID0gbmV3IE1hdHJpeCh7IC4uLnRyYW5zZm9ybXMsIG9yaWdpbjogW3gsIHldIH0pXG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLl9pc0RlY2xhcmF0aXZlICYmIGN1cnJlbnQgPyBjdXJyZW50IDogc3RhcnRUcmFuc2Zvcm1cblxuICAgICAgaWYgKGFmZmluZSkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuZGVjb21wb3NlKHgsIHkpXG4gICAgICAgIHN0YXJ0ID0gc3RhcnQuZGVjb21wb3NlKHgsIHkpXG5cbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGFuZCB0YXJnZXQgYW5nbGUgYXMgaXQgd2FzIHNldFxuICAgICAgICBjb25zdCByVGFyZ2V0ID0gdGFyZ2V0LnJvdGF0ZVxuICAgICAgICBjb25zdCByQ3VycmVudCA9IHN0YXJ0LnJvdGF0ZVxuXG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIHNob3J0ZXN0IHBhdGggdG8gcm90YXRlIGRpcmVjdGx5XG4gICAgICAgIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBbclRhcmdldCAtIDM2MCwgclRhcmdldCwgclRhcmdldCArIDM2MF1cbiAgICAgICAgY29uc3QgZGlzdGFuY2VzID0gcG9zc2liaWxpdGllcy5tYXAoKGEpID0+IE1hdGguYWJzKGEgLSByQ3VycmVudCkpXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gTWF0aC5taW4oLi4uZGlzdGFuY2VzKVxuICAgICAgICBjb25zdCBpbmRleCA9IGRpc3RhbmNlcy5pbmRleE9mKHNob3J0ZXN0KVxuICAgICAgICB0YXJnZXQucm90YXRlID0gcG9zc2liaWxpdGllc1tpbmRleF1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgdG8gYmUgY2FyZWZ1bCBoZXJlIG5vdCB0byBvdmVyd3JpdGUgdGhlIHJvdGF0aW9uXG4gICAgICAgIC8vIHdpdGggdGhlIHJvdGF0ZSBtZXRob2Qgb2YgTWF0cml4XG4gICAgICAgIGlmICghaXNNYXRyaXgpIHtcbiAgICAgICAgICB0YXJnZXQucm90YXRlID0gdHJhbnNmb3Jtcy5yb3RhdGUgfHwgMFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc0RlY2xhcmF0aXZlICYmIGN1cnJlbnRBbmdsZSkge1xuICAgICAgICAgIHN0YXJ0LnJvdGF0ZSA9IGN1cnJlbnRBbmdsZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1vcnBoZXIuZnJvbShzdGFydClcbiAgICAgIG1vcnBoZXIudG8odGFyZ2V0KVxuXG4gICAgICBjb25zdCBhZmZpbmVQYXJhbWV0ZXJzID0gbW9ycGhlci5hdChwb3MpXG4gICAgICBjdXJyZW50QW5nbGUgPSBhZmZpbmVQYXJhbWV0ZXJzLnJvdGF0ZVxuICAgICAgY3VycmVudCA9IG5ldyBNYXRyaXgoYWZmaW5lUGFyYW1ldGVycylcblxuICAgICAgdGhpcy5hZGRUcmFuc2Zvcm0oY3VycmVudClcbiAgICAgIGVsZW1lbnQuX2FkZFJ1bm5lcih0aGlzKVxuICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV0YXJnZXQobmV3VHJhbnNmb3Jtcykge1xuICAgICAgLy8gb25seSBnZXQgYSBuZXcgb3JpZ2luIGlmIGl0IGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgY2FsbFxuICAgICAgaWYgKFxuICAgICAgICAobmV3VHJhbnNmb3Jtcy5vcmlnaW4gfHwgJ2NlbnRlcicpLnRvU3RyaW5nKCkgIT09XG4gICAgICAgICh0cmFuc2Zvcm1zLm9yaWdpbiB8fCAnY2VudGVyJykudG9TdHJpbmcoKVxuICAgICAgKSB7XG4gICAgICAgIG9yaWdpbiA9IGdldE9yaWdpbihuZXdUcmFuc2Zvcm1zLCBlbGVtZW50KVxuICAgICAgfVxuXG4gICAgICAvLyBvdmVyd3JpdGUgdGhlIG9sZCB0cmFuc2Zvcm1hdGlvbnMgd2l0aCB0aGUgbmV3IG9uZXNcbiAgICAgIHRyYW5zZm9ybXMgPSB7IC4uLm5ld1RyYW5zZm9ybXMsIG9yaWdpbiB9XG4gICAgfVxuXG4gICAgdGhpcy5xdWV1ZShzZXR1cCwgcnVuLCByZXRhcmdldCwgdHJ1ZSlcbiAgICB0aGlzLl9pc0RlY2xhcmF0aXZlICYmIHRoaXMuX3JlbWVtYmVyTW9ycGhlcigndHJhbnNmb3JtJywgbW9ycGhlcilcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIC8vIEFuaW1hdGFibGUgeC1heGlzXG4gIHgoeCkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcigneCcsIHgpXG4gIH0sXG5cbiAgLy8gQW5pbWF0YWJsZSB5LWF4aXNcbiAgeSh5KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCd5JywgeSlcbiAgfSxcblxuICBheCh4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdheCcsIHgpXG4gIH0sXG5cbiAgYXkoeSkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignYXknLCB5KVxuICB9LFxuXG4gIGR4KHggPSAwKSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyRGVsdGEoJ3gnLCB4KVxuICB9LFxuXG4gIGR5KHkgPSAwKSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyRGVsdGEoJ3knLCB5KVxuICB9LFxuXG4gIGRtb3ZlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5keCh4KS5keSh5KVxuICB9LFxuXG4gIF9xdWV1ZU51bWJlckRlbHRhKG1ldGhvZCwgdG8pIHtcbiAgICB0byA9IG5ldyBTVkdOdW1iZXIodG8pXG5cbiAgICAvLyBUcnkgdG8gY2hhbmdlIHRoZSB0YXJnZXQgaWYgd2UgaGF2ZSB0aGlzIG1ldGhvZCBhbHJlYWR5IHJlZ2lzdGVyZWRcbiAgICBpZiAodGhpcy5fdHJ5UmV0YXJnZXQobWV0aG9kLCB0bykpIHJldHVybiB0aGlzXG5cbiAgICAvLyBNYWtlIGEgbW9ycGhlciBhbmQgcXVldWUgdGhlIGFuaW1hdGlvblxuICAgIGNvbnN0IG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpLnRvKHRvKVxuICAgIGxldCBmcm9tID0gbnVsbFxuICAgIHRoaXMucXVldWUoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZyb20gPSB0aGlzLmVsZW1lbnQoKVttZXRob2RdKClcbiAgICAgICAgbW9ycGhlci5mcm9tKGZyb20pXG4gICAgICAgIG1vcnBoZXIudG8oZnJvbSArIHRvKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50KClbbWV0aG9kXShtb3JwaGVyLmF0KHBvcykpXG4gICAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChuZXdUbykge1xuICAgICAgICBtb3JwaGVyLnRvKGZyb20gKyBuZXcgU1ZHTnVtYmVyKG5ld1RvKSlcbiAgICAgIH1cbiAgICApXG5cbiAgICAvLyBSZWdpc3RlciB0aGUgbW9ycGhlciBzbyB0aGF0IGlmIGl0IGlzIGNoYW5nZWQgYWdhaW4sIHdlIGNhbiByZXRhcmdldCBpdFxuICAgIHRoaXMuX3JlbWVtYmVyTW9ycGhlcihtZXRob2QsIG1vcnBoZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICBfcXVldWVPYmplY3QobWV0aG9kLCB0bykge1xuICAgIC8vIFRyeSB0byBjaGFuZ2UgdGhlIHRhcmdldCBpZiB3ZSBoYXZlIHRoaXMgbWV0aG9kIGFscmVhZHkgcmVnaXN0ZXJlZFxuICAgIGlmICh0aGlzLl90cnlSZXRhcmdldChtZXRob2QsIHRvKSkgcmV0dXJuIHRoaXNcblxuICAgIC8vIE1ha2UgYSBtb3JwaGVyIGFuZCBxdWV1ZSB0aGUgYW5pbWF0aW9uXG4gICAgY29uc3QgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudG8odG8pXG4gICAgdGhpcy5xdWV1ZShcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ycGhlci5mcm9tKHRoaXMuZWxlbWVudCgpW21ldGhvZF0oKSlcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCgpW21ldGhvZF0obW9ycGhlci5hdChwb3MpKVxuICAgICAgICByZXR1cm4gbW9ycGhlci5kb25lKClcbiAgICAgIH1cbiAgICApXG5cbiAgICAvLyBSZWdpc3RlciB0aGUgbW9ycGhlciBzbyB0aGF0IGlmIGl0IGlzIGNoYW5nZWQgYWdhaW4sIHdlIGNhbiByZXRhcmdldCBpdFxuICAgIHRoaXMuX3JlbWVtYmVyTW9ycGhlcihtZXRob2QsIG1vcnBoZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICBfcXVldWVOdW1iZXIobWV0aG9kLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU9iamVjdChtZXRob2QsIG5ldyBTVkdOdW1iZXIodmFsdWUpKVxuICB9LFxuXG4gIC8vIEFuaW1hdGFibGUgY2VudGVyIHgtYXhpc1xuICBjeCh4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdjeCcsIHgpXG4gIH0sXG5cbiAgLy8gQW5pbWF0YWJsZSBjZW50ZXIgeS1heGlzXG4gIGN5KHkpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2N5JywgeSlcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSBtb3ZlXG4gIG1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLngoeCkueSh5KVxuICB9LFxuXG4gIGFtb3ZlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5heCh4KS5heSh5KVxuICB9LFxuXG4gIC8vIEFkZCBhbmltYXRhYmxlIGNlbnRlclxuICBjZW50ZXIoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmN4KHgpLmN5KHkpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgc2l6ZVxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBhbmltYXRlIGJib3ggYmFzZWQgc2l6ZSBmb3IgYWxsIG90aGVyIGVsZW1lbnRzXG4gICAgbGV0IGJveFxuXG4gICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICBib3ggPSB0aGlzLl9lbGVtZW50LmJib3goKVxuICAgIH1cblxuICAgIGlmICghd2lkdGgpIHtcbiAgICAgIHdpZHRoID0gKGJveC53aWR0aCAvIGJveC5oZWlnaHQpICogaGVpZ2h0XG4gICAgfVxuXG4gICAgaWYgKCFoZWlnaHQpIHtcbiAgICAgIGhlaWdodCA9IChib3guaGVpZ2h0IC8gYm94LndpZHRoKSAqIHdpZHRoXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2lkdGgod2lkdGgpLmhlaWdodChoZWlnaHQpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgd2lkdGhcbiAgd2lkdGgod2lkdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ3dpZHRoJywgd2lkdGgpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgaGVpZ2h0XG4gIGhlaWdodChoZWlnaHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2hlaWdodCcsIGhlaWdodClcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSBwbG90XG4gIHBsb3QoYSwgYiwgYywgZCkge1xuICAgIC8vIExpbmVzIGNhbiBiZSBwbG90dGVkIHdpdGggNCBhcmd1bWVudHNcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgcmV0dXJuIHRoaXMucGxvdChbYSwgYiwgYywgZF0pXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KCdwbG90JywgYSkpIHJldHVybiB0aGlzXG5cbiAgICBjb25zdCBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKVxuICAgICAgLnR5cGUodGhpcy5fZWxlbWVudC5Nb3JwaEFycmF5KVxuICAgICAgLnRvKGEpXG5cbiAgICB0aGlzLnF1ZXVlKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb3JwaGVyLmZyb20odGhpcy5fZWxlbWVudC5hcnJheSgpKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5wbG90KG1vcnBoZXIuYXQocG9zKSlcbiAgICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXG4gICAgICB9XG4gICAgKVxuXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKCdwbG90JywgbW9ycGhlcilcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIC8vIEFkZCBsZWFkaW5nIG1ldGhvZFxuICBsZWFkaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdsZWFkaW5nJywgdmFsdWUpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgdmlld2JveFxuICB2aWV3Ym94KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVPYmplY3QoJ3ZpZXdib3gnLCBuZXcgQm94KHgsIHksIHdpZHRoLCBoZWlnaHQpKVxuICB9LFxuXG4gIHVwZGF0ZShvKSB7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKHtcbiAgICAgICAgb2Zmc2V0OiBhcmd1bWVudHNbMF0sXG4gICAgICAgIGNvbG9yOiBhcmd1bWVudHNbMV0sXG4gICAgICAgIG9wYWNpdHk6IGFyZ3VtZW50c1syXVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoby5vcGFjaXR5ICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1vcGFjaXR5Jywgby5vcGFjaXR5KVxuICAgIGlmIChvLmNvbG9yICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1jb2xvcicsIG8uY29sb3IpXG4gICAgaWYgKG8ub2Zmc2V0ICE9IG51bGwpIHRoaXMuYXR0cignb2Zmc2V0Jywgby5vZmZzZXQpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59KVxuXG5leHRlbmQoUnVubmVyLCB7IHJ4LCByeSwgZnJvbSwgdG8gfSlcbnJlZ2lzdGVyKFJ1bm5lciwgJ1J1bm5lcicpXG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBBbmltYXRvciBmcm9tICcuL0FuaW1hdG9yLmpzJ1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4uL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xuXG5jb25zdCBtYWtlU2NoZWR1bGUgPSBmdW5jdGlvbiAocnVubmVySW5mbykge1xuICBjb25zdCBzdGFydCA9IHJ1bm5lckluZm8uc3RhcnRcbiAgY29uc3QgZHVyYXRpb24gPSBydW5uZXJJbmZvLnJ1bm5lci5kdXJhdGlvbigpXG4gIGNvbnN0IGVuZCA9IHN0YXJ0ICsgZHVyYXRpb25cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgIGVuZDogZW5kLFxuICAgIHJ1bm5lcjogcnVubmVySW5mby5ydW5uZXJcbiAgfVxufVxuXG5jb25zdCBkZWZhdWx0U291cmNlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB3ID0gZ2xvYmFscy53aW5kb3dcbiAgcmV0dXJuICh3LnBlcmZvcm1hbmNlIHx8IHcuRGF0ZSkubm93KClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZWxpbmUgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIC8vIENvbnN0cnVjdCBhIG5ldyB0aW1lbGluZSBvbiB0aGUgZ2l2ZW4gZWxlbWVudFxuICBjb25zdHJ1Y3Rvcih0aW1lU291cmNlID0gZGVmYXVsdFNvdXJjZSkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuX3RpbWVTb3VyY2UgPSB0aW1lU291cmNlXG5cbiAgICAvLyB0ZXJtaW5hdGUgcmVzZXRzIGFsbCB2YXJpYWJsZXMgdG8gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICAgIHRoaXMudGVybWluYXRlKClcbiAgfVxuXG4gIGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9uZXh0RnJhbWVcbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICAvLyBHbyB0byBlbmQgYW5kIHBhdXNlXG4gICAgdGhpcy50aW1lKHRoaXMuZ2V0RW5kVGltZU9mVGltZWxpbmUoKSArIDEpXG4gICAgcmV0dXJuIHRoaXMucGF1c2UoKVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgZW5kIG9mIHRoZSB0aW1lbGluZVxuICBnZXRFbmRUaW1lKCkge1xuICAgIGNvbnN0IGxhc3RSdW5uZXJJbmZvID0gdGhpcy5nZXRMYXN0UnVubmVySW5mbygpXG4gICAgY29uc3QgbGFzdER1cmF0aW9uID0gbGFzdFJ1bm5lckluZm8gPyBsYXN0UnVubmVySW5mby5ydW5uZXIuZHVyYXRpb24oKSA6IDBcbiAgICBjb25zdCBsYXN0U3RhcnRUaW1lID0gbGFzdFJ1bm5lckluZm8gPyBsYXN0UnVubmVySW5mby5zdGFydCA6IHRoaXMuX3RpbWVcbiAgICByZXR1cm4gbGFzdFN0YXJ0VGltZSArIGxhc3REdXJhdGlvblxuICB9XG5cbiAgZ2V0RW5kVGltZU9mVGltZWxpbmUoKSB7XG4gICAgY29uc3QgZW5kVGltZXMgPSB0aGlzLl9ydW5uZXJzLm1hcCgoaSkgPT4gaS5zdGFydCArIGkucnVubmVyLmR1cmF0aW9uKCkpXG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIC4uLmVuZFRpbWVzKVxuICB9XG5cbiAgZ2V0TGFzdFJ1bm5lckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UnVubmVySW5mb0J5SWQodGhpcy5fbGFzdFJ1bm5lcklkKVxuICB9XG5cbiAgZ2V0UnVubmVySW5mb0J5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcnVubmVyc1t0aGlzLl9ydW5uZXJJZHMuaW5kZXhPZihpZCldIHx8IG51bGxcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuX3BhdXNlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpcy5fY29udGludWUoKVxuICB9XG5cbiAgcGVyc2lzdChkdE9yRm9yZXZlcikge1xuICAgIGlmIChkdE9yRm9yZXZlciA9PSBudWxsKSByZXR1cm4gdGhpcy5fcGVyc2lzdFxuICAgIHRoaXMuX3BlcnNpc3QgPSBkdE9yRm9yZXZlclxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwbGF5KCkge1xuICAgIC8vIE5vdyBtYWtlIHN1cmUgd2UgYXJlIG5vdCBwYXVzZWQgYW5kIGNvbnRpbnVlIHRoZSBhbmltYXRpb25cbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZVxuICAgIHJldHVybiB0aGlzLnVwZGF0ZVRpbWUoKS5fY29udGludWUoKVxuICB9XG5cbiAgcmV2ZXJzZSh5ZXMpIHtcbiAgICBjb25zdCBjdXJyZW50U3BlZWQgPSB0aGlzLnNwZWVkKClcbiAgICBpZiAoeWVzID09IG51bGwpIHJldHVybiB0aGlzLnNwZWVkKC1jdXJyZW50U3BlZWQpXG5cbiAgICBjb25zdCBwb3NpdGl2ZSA9IE1hdGguYWJzKGN1cnJlbnRTcGVlZClcbiAgICByZXR1cm4gdGhpcy5zcGVlZCh5ZXMgPyAtcG9zaXRpdmUgOiBwb3NpdGl2ZSlcbiAgfVxuXG4gIC8vIHNjaGVkdWxlcyBhIHJ1bm5lciBvbiB0aGUgdGltZWxpbmVcbiAgc2NoZWR1bGUocnVubmVyLCBkZWxheSwgd2hlbikge1xuICAgIGlmIChydW5uZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1bm5lcnMubWFwKG1ha2VTY2hlZHVsZSlcbiAgICB9XG5cbiAgICAvLyBUaGUgc3RhcnQgdGltZSBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGNhbiBlaXRoZXIgYmUgZ2l2ZW4gZXhwbGljaXRseSxcbiAgICAvLyBkZXJpdmVkIGZyb20gdGhlIGN1cnJlbnQgdGltZWxpbmUgdGltZSBvciBpdCBjYW4gYmUgcmVsYXRpdmUgdG8gdGhlXG4gICAgLy8gbGFzdCBzdGFydCB0aW1lIHRvIGNoYWluIGFuaW1hdGlvbnMgZGlyZWN0bHlcblxuICAgIGxldCBhYnNvbHV0ZVN0YXJ0VGltZSA9IDBcbiAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5nZXRFbmRUaW1lKClcbiAgICBkZWxheSA9IGRlbGF5IHx8IDBcblxuICAgIC8vIFdvcmsgb3V0IHdoZW4gdG8gc3RhcnQgdGhlIGFuaW1hdGlvblxuICAgIGlmICh3aGVuID09IG51bGwgfHwgd2hlbiA9PT0gJ2xhc3QnIHx8IHdoZW4gPT09ICdhZnRlcicpIHtcbiAgICAgIC8vIFRha2UgdGhlIGxhc3QgdGltZSBhbmQgaW5jcmVtZW50XG4gICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IGVuZFRpbWVcbiAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICdhYnNvbHV0ZScgfHwgd2hlbiA9PT0gJ3N0YXJ0Jykge1xuICAgICAgYWJzb2x1dGVTdGFydFRpbWUgPSBkZWxheVxuICAgICAgZGVsYXkgPSAwXG4gICAgfSBlbHNlIGlmICh3aGVuID09PSAnbm93Jykge1xuICAgICAgYWJzb2x1dGVTdGFydFRpbWUgPSB0aGlzLl90aW1lXG4gICAgfSBlbHNlIGlmICh3aGVuID09PSAncmVsYXRpdmUnKSB7XG4gICAgICBjb25zdCBydW5uZXJJbmZvID0gdGhpcy5nZXRSdW5uZXJJbmZvQnlJZChydW5uZXIuaWQpXG4gICAgICBpZiAocnVubmVySW5mbykge1xuICAgICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IHJ1bm5lckluZm8uc3RhcnQgKyBkZWxheVxuICAgICAgICBkZWxheSA9IDBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICd3aXRoLWxhc3QnKSB7XG4gICAgICBjb25zdCBsYXN0UnVubmVySW5mbyA9IHRoaXMuZ2V0TGFzdFJ1bm5lckluZm8oKVxuICAgICAgY29uc3QgbGFzdFN0YXJ0VGltZSA9IGxhc3RSdW5uZXJJbmZvID8gbGFzdFJ1bm5lckluZm8uc3RhcnQgOiB0aGlzLl90aW1lXG4gICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IGxhc3RTdGFydFRpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciB0aGUgXCJ3aGVuXCIgcGFyYW1ldGVyJylcbiAgICB9XG5cbiAgICAvLyBNYW5hZ2UgcnVubmVyXG4gICAgcnVubmVyLnVuc2NoZWR1bGUoKVxuICAgIHJ1bm5lci50aW1lbGluZSh0aGlzKVxuXG4gICAgY29uc3QgcGVyc2lzdCA9IHJ1bm5lci5wZXJzaXN0KClcbiAgICBjb25zdCBydW5uZXJJbmZvID0ge1xuICAgICAgcGVyc2lzdDogcGVyc2lzdCA9PT0gbnVsbCA/IHRoaXMuX3BlcnNpc3QgOiBwZXJzaXN0LFxuICAgICAgc3RhcnQ6IGFic29sdXRlU3RhcnRUaW1lICsgZGVsYXksXG4gICAgICBydW5uZXJcbiAgICB9XG5cbiAgICB0aGlzLl9sYXN0UnVubmVySWQgPSBydW5uZXIuaWRcblxuICAgIHRoaXMuX3J1bm5lcnMucHVzaChydW5uZXJJbmZvKVxuICAgIHRoaXMuX3J1bm5lcnMuc29ydCgoYSwgYikgPT4gYS5zdGFydCAtIGIuc3RhcnQpXG4gICAgdGhpcy5fcnVubmVySWRzID0gdGhpcy5fcnVubmVycy5tYXAoKGluZm8pID0+IGluZm8ucnVubmVyLmlkKVxuXG4gICAgdGhpcy51cGRhdGVUaW1lKCkuX2NvbnRpbnVlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2VlayhkdCkge1xuICAgIHJldHVybiB0aGlzLnRpbWUodGhpcy5fdGltZSArIGR0KVxuICB9XG5cbiAgc291cmNlKGZuKSB7XG4gICAgaWYgKGZuID09IG51bGwpIHJldHVybiB0aGlzLl90aW1lU291cmNlXG4gICAgdGhpcy5fdGltZVNvdXJjZSA9IGZuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNwZWVkKHNwZWVkKSB7XG4gICAgaWYgKHNwZWVkID09IG51bGwpIHJldHVybiB0aGlzLl9zcGVlZFxuICAgIHRoaXMuX3NwZWVkID0gc3BlZWRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICAvLyBHbyB0byBzdGFydCBhbmQgcGF1c2VcbiAgICB0aGlzLnRpbWUoMClcbiAgICByZXR1cm4gdGhpcy5wYXVzZSgpXG4gIH1cblxuICB0aW1lKHRpbWUpIHtcbiAgICBpZiAodGltZSA9PSBudWxsKSByZXR1cm4gdGhpcy5fdGltZVxuICAgIHRoaXMuX3RpbWUgPSB0aW1lXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRpbnVlKHRydWUpXG4gIH1cblxuICAvLyBSZW1vdmUgdGhlIHJ1bm5lciBmcm9tIHRoaXMgdGltZWxpbmVcbiAgdW5zY2hlZHVsZShydW5uZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX3J1bm5lcklkcy5pbmRleE9mKHJ1bm5lci5pZClcbiAgICBpZiAoaW5kZXggPCAwKSByZXR1cm4gdGhpc1xuXG4gICAgdGhpcy5fcnVubmVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgdGhpcy5fcnVubmVySWRzLnNwbGljZShpbmRleCwgMSlcblxuICAgIHJ1bm5lci50aW1lbGluZShudWxsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBNYWtlcyBzdXJlLCB0aGF0IGFmdGVyIHBhdXNpbmcgdGhlIHRpbWUgZG9lc24ndCBqdW1wXG4gIHVwZGF0ZVRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSgpKSB7XG4gICAgICB0aGlzLl9sYXN0U291cmNlVGltZSA9IHRoaXMuX3RpbWVTb3VyY2UoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHdlIGFyZSBydW5uaW5nIGFuZCBjb250aW51ZXMgdGhlIGFuaW1hdGlvblxuICBfY29udGludWUoaW1tZWRpYXRlU3RlcCA9IGZhbHNlKSB7XG4gICAgQW5pbWF0b3IuY2FuY2VsRnJhbWUodGhpcy5fbmV4dEZyYW1lKVxuICAgIHRoaXMuX25leHRGcmFtZSA9IG51bGxcblxuICAgIGlmIChpbW1lZGlhdGVTdGVwKSByZXR1cm4gdGhpcy5fc3RlcEltbWVkaWF0ZSgpXG4gICAgaWYgKHRoaXMuX3BhdXNlZCkgcmV0dXJuIHRoaXNcblxuICAgIHRoaXMuX25leHRGcmFtZSA9IEFuaW1hdG9yLmZyYW1lKHRoaXMuX3N0ZXApXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9zdGVwRm4oaW1tZWRpYXRlU3RlcCA9IGZhbHNlKSB7XG4gICAgLy8gR2V0IHRoZSB0aW1lIGRlbHRhIGZyb20gdGhlIGxhc3QgdGltZSBhbmQgdXBkYXRlIHRoZSB0aW1lXG4gICAgY29uc3QgdGltZSA9IHRoaXMuX3RpbWVTb3VyY2UoKVxuICAgIGxldCBkdFNvdXJjZSA9IHRpbWUgLSB0aGlzLl9sYXN0U291cmNlVGltZVxuXG4gICAgaWYgKGltbWVkaWF0ZVN0ZXApIGR0U291cmNlID0gMFxuXG4gICAgY29uc3QgZHRUaW1lID0gdGhpcy5fc3BlZWQgKiBkdFNvdXJjZSArICh0aGlzLl90aW1lIC0gdGhpcy5fbGFzdFN0ZXBUaW1lKVxuICAgIHRoaXMuX2xhc3RTb3VyY2VUaW1lID0gdGltZVxuXG4gICAgLy8gT25seSB1cGRhdGUgdGhlIHRpbWUgaWYgd2UgdXNlIHRoZSB0aW1lU291cmNlLlxuICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGN1cnJlbnQgdGltZVxuICAgIGlmICghaW1tZWRpYXRlU3RlcCkge1xuICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lXG4gICAgICB0aGlzLl90aW1lICs9IGR0VGltZVxuICAgICAgdGhpcy5fdGltZSA9IHRoaXMuX3RpbWUgPCAwID8gMCA6IHRoaXMuX3RpbWVcbiAgICB9XG4gICAgdGhpcy5fbGFzdFN0ZXBUaW1lID0gdGhpcy5fdGltZVxuICAgIHRoaXMuZmlyZSgndGltZScsIHRoaXMuX3RpbWUpXG5cbiAgICAvLyBUaGlzIGlzIGZvciB0aGUgY2FzZSB0aGF0IHRoZSB0aW1lbGluZSB3YXMgc2Vla2VkIHNvIHRoYXQgdGhlIHRpbWVcbiAgICAvLyBpcyBub3cgYmVmb3JlIHRoZSBzdGFydFRpbWUgb2YgdGhlIHJ1bm5lci4gVGhhdCBpcyB3aHkgd2UgbmVlZCB0byBzZXRcbiAgICAvLyB0aGUgcnVubmVyIHRvIHBvc2l0aW9uIDBcblxuICAgIC8vIEZJWE1FOlxuICAgIC8vIEhvd2V2ZXIsIHJlc2V0dGluZyBpbiBpbnNlcnRpb24gb3JkZXIgbGVhZHMgdG8gYnVncy4gQ29uc2lkZXJpbmcgdGhlIGNhc2UsXG4gICAgLy8gd2hlcmUgMiBydW5uZXJzIGNoYW5nZSB0aGUgc2FtZSBhdHRyaWJ1dGUgYnV0IGluIGRpZmZlcmVudCB0aW1lcyxcbiAgICAvLyByZXNldHRpbmcgYm90aCBvZiB0aGVtIHdpbGwgbGVhZCB0byB0aGUgY2FzZSB3aGVyZSB0aGUgbGF0ZXIgZGVmaW5lZFxuICAgIC8vIHJ1bm5lciBhbHdheXMgd2lucyB0aGUgcmVzZXQgZXZlbiBpZiB0aGUgb3RoZXIgcnVubmVyIHN0YXJ0ZWQgZWFybGllclxuICAgIC8vIGFuZCB0aGVyZWZvcmUgc2hvdWxkIHdpbiB0aGUgYXR0cmlidXRlIGJhdHRsZVxuICAgIC8vIHRoaXMgY2FuIGJlIHNvbHZlZCBieSByZXNldHRpbmcgdGhlbSBiYWNrd2FyZHNcbiAgICBmb3IgKGxldCBrID0gdGhpcy5fcnVubmVycy5sZW5ndGg7IGstLTsgKSB7XG4gICAgICAvLyBHZXQgYW5kIHJ1biB0aGUgY3VycmVudCBydW5uZXIgYW5kIGlnbm9yZSBpdCBpZiBpdHMgaW5hY3RpdmVcbiAgICAgIGNvbnN0IHJ1bm5lckluZm8gPSB0aGlzLl9ydW5uZXJzW2tdXG4gICAgICBjb25zdCBydW5uZXIgPSBydW5uZXJJbmZvLnJ1bm5lclxuXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSBnaXZlIHRoZSBhY3R1YWwgZGlmZmVyZW5jZVxuICAgICAgLy8gYmV0d2VlbiBydW5uZXIgc3RhcnQgdGltZSBhbmQgbm93XG4gICAgICBjb25zdCBkdFRvU3RhcnQgPSB0aGlzLl90aW1lIC0gcnVubmVySW5mby5zdGFydFxuXG4gICAgICAvLyBEb250IHJ1biBydW5uZXIgaWYgbm90IHN0YXJ0ZWQgeWV0XG4gICAgICAvLyBhbmQgdHJ5IHRvIHJlc2V0IGl0XG4gICAgICBpZiAoZHRUb1N0YXJ0IDw9IDApIHtcbiAgICAgICAgcnVubmVyLnJlc2V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSdW4gYWxsIG9mIHRoZSBydW5uZXJzIGRpcmVjdGx5XG4gICAgbGV0IHJ1bm5lcnNMZWZ0ID0gZmFsc2VcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fcnVubmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgLy8gR2V0IGFuZCBydW4gdGhlIGN1cnJlbnQgcnVubmVyIGFuZCBpZ25vcmUgaXQgaWYgaXRzIGluYWN0aXZlXG4gICAgICBjb25zdCBydW5uZXJJbmZvID0gdGhpcy5fcnVubmVyc1tpXVxuICAgICAgY29uc3QgcnVubmVyID0gcnVubmVySW5mby5ydW5uZXJcbiAgICAgIGxldCBkdCA9IGR0VGltZVxuXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSBnaXZlIHRoZSBhY3R1YWwgZGlmZmVyZW5jZVxuICAgICAgLy8gYmV0d2VlbiBydW5uZXIgc3RhcnQgdGltZSBhbmQgbm93XG4gICAgICBjb25zdCBkdFRvU3RhcnQgPSB0aGlzLl90aW1lIC0gcnVubmVySW5mby5zdGFydFxuXG4gICAgICAvLyBEb250IHJ1biBydW5uZXIgaWYgbm90IHN0YXJ0ZWQgeWV0XG4gICAgICBpZiAoZHRUb1N0YXJ0IDw9IDApIHtcbiAgICAgICAgcnVubmVyc0xlZnQgPSB0cnVlXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYgKGR0VG9TdGFydCA8IGR0KSB7XG4gICAgICAgIC8vIEFkanVzdCBkdCB0byBtYWtlIHN1cmUgdGhhdCBhbmltYXRpb24gaXMgb24gcG9pbnRcbiAgICAgICAgZHQgPSBkdFRvU3RhcnRcbiAgICAgIH1cblxuICAgICAgaWYgKCFydW5uZXIuYWN0aXZlKCkpIGNvbnRpbnVlXG5cbiAgICAgIC8vIElmIHRoaXMgcnVubmVyIGlzIHN0aWxsIGdvaW5nLCBzaWduYWwgdGhhdCB3ZSBuZWVkIGFub3RoZXIgYW5pbWF0aW9uXG4gICAgICAvLyBmcmFtZSwgb3RoZXJ3aXNlLCByZW1vdmUgdGhlIGNvbXBsZXRlZCBydW5uZXJcbiAgICAgIGNvbnN0IGZpbmlzaGVkID0gcnVubmVyLnN0ZXAoZHQpLmRvbmVcbiAgICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgICAgcnVubmVyc0xlZnQgPSB0cnVlXG4gICAgICAgIC8vIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYgKHJ1bm5lckluZm8ucGVyc2lzdCAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBydW5uZXIgaXMgZmluaXNoZWQuIEFuZCBydW5uZXIgbWlnaHQgZ2V0IHJlbW92ZWRcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IHJ1bm5lci5kdXJhdGlvbigpIC0gcnVubmVyLnRpbWUoKSArIHRoaXMuX3RpbWVcblxuICAgICAgICBpZiAoZW5kVGltZSArIHJ1bm5lckluZm8ucGVyc2lzdCA8IHRoaXMuX3RpbWUpIHtcbiAgICAgICAgICAvLyBEZWxldGUgcnVubmVyIGFuZCBjb3JyZWN0IGluZGV4XG4gICAgICAgICAgcnVubmVyLnVuc2NoZWR1bGUoKVxuICAgICAgICAgIC0taVxuICAgICAgICAgIC0tbGVuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCYXNpY2FsbHk6IHdlIGNvbnRpbnVlIHdoZW4gdGhlcmUgYXJlIHJ1bm5lcnMgcmlnaHQgZnJvbSB1cyBpbiB0aW1lXG4gICAgLy8gd2hlbiAtLT4sIGFuZCB3aGVuIHJ1bm5lcnMgYXJlIGxlZnQgZnJvbSB1cyB3aGVuIDwtLVxuICAgIGlmIChcbiAgICAgIChydW5uZXJzTGVmdCAmJiAhKHRoaXMuX3NwZWVkIDwgMCAmJiB0aGlzLl90aW1lID09PSAwKSkgfHxcbiAgICAgICh0aGlzLl9ydW5uZXJJZHMubGVuZ3RoICYmIHRoaXMuX3NwZWVkIDwgMCAmJiB0aGlzLl90aW1lID4gMClcbiAgICApIHtcbiAgICAgIHRoaXMuX2NvbnRpbnVlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLmZpcmUoJ2ZpbmlzaGVkJylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdGVybWluYXRlKCkge1xuICAgIC8vIGNsZWFudXAgbWVtb3J5XG5cbiAgICAvLyBTdG9yZSB0aGUgdGltaW5nIHZhcmlhYmxlc1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDBcbiAgICB0aGlzLl9zcGVlZCA9IDEuMFxuXG4gICAgLy8gRGV0ZXJtaW5lcyBob3cgbG9uZyBhIHJ1bm5lciBpcyBob2xkIGluIG1lbW9yeS4gQ2FuIGJlIGEgZHQgb3IgdHJ1ZS9mYWxzZVxuICAgIHRoaXMuX3BlcnNpc3QgPSAwXG5cbiAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBydW5uaW5nIGFuaW1hdGlvbnMgYW5kIHRoZWlyIHN0YXJ0aW5nIHBhcmFtZXRlcnNcbiAgICB0aGlzLl9uZXh0RnJhbWUgPSBudWxsXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZVxuICAgIHRoaXMuX3J1bm5lcnMgPSBbXVxuICAgIHRoaXMuX3J1bm5lcklkcyA9IFtdXG4gICAgdGhpcy5fbGFzdFJ1bm5lcklkID0gLTFcbiAgICB0aGlzLl90aW1lID0gMFxuICAgIHRoaXMuX2xhc3RTb3VyY2VUaW1lID0gMFxuICAgIHRoaXMuX2xhc3RTdGVwVGltZSA9IDBcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHN0ZXAgaXMgYWx3YXlzIGNhbGxlZCBpbiBjbGFzcyBjb250ZXh0XG4gICAgdGhpcy5fc3RlcCA9IHRoaXMuX3N0ZXBGbi5iaW5kKHRoaXMsIGZhbHNlKVxuICAgIHRoaXMuX3N0ZXBJbW1lZGlhdGUgPSB0aGlzLl9zdGVwRm4uYmluZCh0aGlzLCB0cnVlKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIEVsZW1lbnQ6IHtcbiAgICB0aW1lbGluZTogZnVuY3Rpb24gKHRpbWVsaW5lKSB7XG4gICAgICBpZiAodGltZWxpbmUgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl90aW1lbGluZSA9IHRoaXMuX3RpbWVsaW5lIHx8IG5ldyBUaW1lbGluZSgpXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lbGluZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdGltZWxpbmUgPSB0aW1lbGluZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7XG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrLFxuICBleHRlbmRcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyB4bGluayB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcbmltcG9ydCAqIGFzIGNvbnRhaW5lckdlb21ldHJ5IGZyb20gJy4uL21vZHVsZXMvY29yZS9jb250YWluZXJHZW9tZXRyeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQSBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnYScsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIExpbmsgdGFyZ2V0IGF0dHJpYnV0ZVxuICB0YXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cigndGFyZ2V0JywgdGFyZ2V0KVxuICB9XG5cbiAgLy8gTGluayB1cmxcbiAgdG8odXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignaHJlZicsIHVybCwgeGxpbmspXG4gIH1cbn1cblxuZXh0ZW5kKEEsIGNvbnRhaW5lckdlb21ldHJ5KVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgYSBoeXBlcmxpbmsgZWxlbWVudFxuICAgIGxpbms6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgQSgpKS50byh1cmwpXG4gICAgfSlcbiAgfSxcbiAgRWxlbWVudDoge1xuICAgIHVubGluaygpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLmxpbmtlcigpXG5cbiAgICAgIGlmICghbGluaykgcmV0dXJuIHRoaXNcblxuICAgICAgY29uc3QgcGFyZW50ID0gbGluay5wYXJlbnQoKVxuXG4gICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmUoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudC5pbmRleChsaW5rKVxuICAgICAgcGFyZW50LmFkZCh0aGlzLCBpbmRleClcblxuICAgICAgbGluay5yZW1vdmUoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGxpbmtUbyh1cmwpIHtcbiAgICAgIC8vIHJldXNlIG9sZCBsaW5rIGlmIHBvc3NpYmxlXG4gICAgICBsZXQgbGluayA9IHRoaXMubGlua2VyKClcblxuICAgICAgaWYgKCFsaW5rKSB7XG4gICAgICAgIGxpbmsgPSBuZXcgQSgpXG4gICAgICAgIHRoaXMud3JhcChsaW5rKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHVybCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB1cmwuY2FsbChsaW5rLCBsaW5rKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluay50byh1cmwpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBsaW5rZXIoKSB7XG4gICAgICBjb25zdCBsaW5rID0gdGhpcy5wYXJlbnQoKVxuICAgICAgaWYgKGxpbmsgJiYgbGluay5ub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICByZXR1cm4gbGlua1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufSlcblxucmVnaXN0ZXIoQSwgJ0EnKVxuIiwiaW1wb3J0IHsgY3gsIGN5LCBoZWlnaHQsIHdpZHRoLCB4LCB5IH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2NpcmNsZWQuanMnXG5pbXBvcnQge1xuICBleHRlbmQsXG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgU2hhcGUge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2NpcmNsZScsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIHJhZGl1cyhyKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cigncicsIHIpXG4gIH1cblxuICAvLyBSYWRpdXMgeCB2YWx1ZVxuICByeChyeCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ3InLCByeClcbiAgfVxuXG4gIC8vIEFsaWFzIHJhZGl1cyB4IHZhbHVlXG4gIHJ5KHJ5KSB7XG4gICAgcmV0dXJuIHRoaXMucngocnkpXG4gIH1cblxuICBzaXplKHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5yYWRpdXMobmV3IFNWR051bWJlcihzaXplKS5kaXZpZGUoMikpXG4gIH1cbn1cblxuZXh0ZW5kKENpcmNsZSwgeyB4LCB5LCBjeCwgY3ksIHdpZHRoLCBoZWlnaHQgfSlcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGNpcmNsZSBlbGVtZW50XG4gICAgY2lyY2xlOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoc2l6ZSA9IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgQ2lyY2xlKCkpLnNpemUoc2l6ZSkubW92ZSgwLCAwKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKENpcmNsZSwgJ0NpcmNsZScpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcbmltcG9ydCBiYXNlRmluZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaXBQYXRoIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdjbGlwUGF0aCcsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIFVuY2xpcCBhbGwgY2xpcHBlZCBlbGVtZW50cyBhbmQgcmVtb3ZlIGl0c2VsZlxuICByZW1vdmUoKSB7XG4gICAgLy8gdW5jbGlwIGFsbCB0YXJnZXRzXG4gICAgdGhpcy50YXJnZXRzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLnVuY2xpcCgpXG4gICAgfSlcblxuICAgIC8vIHJlbW92ZSBjbGlwUGF0aCBmcm9tIHBhcmVudFxuICAgIHJldHVybiBzdXBlci5yZW1vdmUoKVxuICB9XG5cbiAgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gYmFzZUZpbmQoJ3N2ZyBbY2xpcC1wYXRoKj0nICsgdGhpcy5pZCgpICsgJ10nKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBjbGlwcGluZyBlbGVtZW50XG4gICAgY2xpcDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgQ2xpcFBhdGgoKSlcbiAgICB9KVxuICB9LFxuICBFbGVtZW50OiB7XG4gICAgLy8gRGlzdHJpYnV0ZSBjbGlwUGF0aCB0byBzdmcgZWxlbWVudFxuICAgIGNsaXBwZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZlcmVuY2UoJ2NsaXAtcGF0aCcpXG4gICAgfSxcblxuICAgIGNsaXBXaXRoKGVsZW1lbnQpIHtcbiAgICAgIC8vIHVzZSBnaXZlbiBjbGlwIG9yIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgIGNvbnN0IGNsaXBwZXIgPVxuICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgQ2xpcFBhdGhcbiAgICAgICAgICA/IGVsZW1lbnRcbiAgICAgICAgICA6IHRoaXMucGFyZW50KCkuY2xpcCgpLmFkZChlbGVtZW50KVxuXG4gICAgICAvLyBhcHBseSBtYXNrXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgY2xpcHBlci5pZCgpICsgJyknKVxuICAgIH0sXG5cbiAgICAvLyBVbmNsaXAgZWxlbWVudFxuICAgIHVuY2xpcCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2NsaXAtcGF0aCcsIG51bGwpXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihDbGlwUGF0aCwgJ0NsaXBQYXRoJylcbiIsImltcG9ydCB7IHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgRWxlbWVudCB7XG4gIGZsYXR0ZW4oKSB7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZsYXR0ZW4oKS51bmdyb3VwKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVuZ3JvdXAocGFyZW50ID0gdGhpcy5wYXJlbnQoKSwgaW5kZXggPSBwYXJlbnQuaW5kZXgodGhpcykpIHtcbiAgICAvLyB3aGVuIHBhcmVudCAhPSB0aGlzLCB3ZSB3YW50IGFwcGVuZCBhbGwgZWxlbWVudHMgdG8gdGhlIGVuZFxuICAgIGluZGV4ID0gaW5kZXggPT09IC0xID8gcGFyZW50LmNoaWxkcmVuKCkubGVuZ3RoIDogaW5kZXhcblxuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgY2hpbGRyZW4pIHtcbiAgICAgIC8vIHJldmVyc2UgZWFjaFxuICAgICAgcmV0dXJuIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIGkgLSAxXS50b1BhcmVudChwYXJlbnQsIGluZGV4KVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5yZW1vdmUoKVxuICB9XG59XG5cbnJlZ2lzdGVyKENvbnRhaW5lciwgJ0NvbnRhaW5lcicpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZnMgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2RlZnMnLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICBmbGF0dGVuKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmdyb3VwKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxucmVnaXN0ZXIoRGVmcywgJ0RlZnMnKVxuIiwiaW1wb3J0IHtcbiAgYWRvcHQsXG4gIGFzc2lnbk5ld0lkLFxuICBlaWQsXG4gIGV4dGVuZCxcbiAgbWFrZUluc3RhbmNlLFxuICBjcmVhdGUsXG4gIHJlZ2lzdGVyXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBmaW5kLCBmaW5kT25lIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgc3ZnLCBodG1sIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi4vdHlwZXMvRXZlbnRUYXJnZXQuanMnXG5pbXBvcnQgTGlzdCBmcm9tICcuLi90eXBlcy9MaXN0LmpzJ1xuaW1wb3J0IGF0dHIgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2F0dHIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5ub2RlID0gbm9kZVxuICAgIHRoaXMudHlwZSA9IG5vZGUubm9kZU5hbWVcblxuICAgIGlmIChhdHRycyAmJiBub2RlICE9PSBhdHRycykge1xuICAgICAgdGhpcy5hdHRyKGF0dHJzKVxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBnaXZlbiBlbGVtZW50IGF0IGEgcG9zaXRpb25cbiAgYWRkKGVsZW1lbnQsIGkpIHtcbiAgICBlbGVtZW50ID0gbWFrZUluc3RhbmNlKGVsZW1lbnQpXG5cbiAgICAvLyBJZiBub24tcm9vdCBzdmcgbm9kZXMgYXJlIGFkZGVkIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZWlyIG5hbWVzcGFjZXNcbiAgICBpZiAoXG4gICAgICBlbGVtZW50LnJlbW92ZU5hbWVzcGFjZSAmJlxuICAgICAgdGhpcy5ub2RlIGluc3RhbmNlb2YgZ2xvYmFscy53aW5kb3cuU1ZHRWxlbWVudFxuICAgICkge1xuICAgICAgZWxlbWVudC5yZW1vdmVOYW1lc3BhY2UoKVxuICAgIH1cblxuICAgIGlmIChpID09IG51bGwpIHtcbiAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChlbGVtZW50Lm5vZGUpXG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm5vZGUgIT09IHRoaXMubm9kZS5jaGlsZE5vZGVzW2ldKSB7XG4gICAgICB0aGlzLm5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQubm9kZSwgdGhpcy5ub2RlLmNoaWxkTm9kZXNbaV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEFkZCBlbGVtZW50IHRvIGdpdmVuIGNvbnRhaW5lciBhbmQgcmV0dXJuIHNlbGZcbiAgYWRkVG8ocGFyZW50LCBpKSB7XG4gICAgcmV0dXJuIG1ha2VJbnN0YW5jZShwYXJlbnQpLnB1dCh0aGlzLCBpKVxuICB9XG5cbiAgLy8gUmV0dXJucyBhbGwgY2hpbGQgZWxlbWVudHNcbiAgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIG5ldyBMaXN0KFxuICAgICAgbWFwKHRoaXMubm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGFkb3B0KG5vZGUpXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8vIFJlbW92ZSBhbGwgZWxlbWVudHMgaW4gdGhpcyBjb250YWluZXJcbiAgY2xlYXIoKSB7XG4gICAgLy8gcmVtb3ZlIGNoaWxkcmVuXG4gICAgd2hpbGUgKHRoaXMubm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUubGFzdENoaWxkKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDbG9uZSBlbGVtZW50XG4gIGNsb25lKGRlZXAgPSB0cnVlLCBhc3NpZ25OZXdJZHMgPSB0cnVlKSB7XG4gICAgLy8gd3JpdGUgZG9tIGRhdGEgdG8gdGhlIGRvbSBzbyB0aGUgY2xvbmUgY2FuIHBpY2t1cCB0aGUgZGF0YVxuICAgIHRoaXMud3JpdGVEYXRhVG9Eb20oKVxuXG4gICAgLy8gY2xvbmUgZWxlbWVudFxuICAgIGxldCBub2RlQ2xvbmUgPSB0aGlzLm5vZGUuY2xvbmVOb2RlKGRlZXApXG4gICAgaWYgKGFzc2lnbk5ld0lkcykge1xuICAgICAgLy8gYXNzaWduIG5ldyBpZFxuICAgICAgbm9kZUNsb25lID0gYXNzaWduTmV3SWQobm9kZUNsb25lKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9kZUNsb25lKVxuICB9XG5cbiAgLy8gSXRlcmF0ZXMgb3ZlciBhbGwgY2hpbGRyZW4gYW5kIGludm9rZXMgYSBnaXZlbiBibG9ja1xuICBlYWNoKGJsb2NrLCBkZWVwKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuKClcbiAgICBsZXQgaSwgaWxcblxuICAgIGZvciAoaSA9IDAsIGlsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgYmxvY2suYXBwbHkoY2hpbGRyZW5baV0sIFtpLCBjaGlsZHJlbl0pXG5cbiAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgIGNoaWxkcmVuW2ldLmVhY2goYmxvY2ssIGRlZXApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGVsZW1lbnQobm9kZU5hbWUsIGF0dHJzKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBEb20oY3JlYXRlKG5vZGVOYW1lKSwgYXR0cnMpKVxuICB9XG5cbiAgLy8gR2V0IGZpcnN0IGNoaWxkXG4gIGZpcnN0KCkge1xuICAgIHJldHVybiBhZG9wdCh0aGlzLm5vZGUuZmlyc3RDaGlsZClcbiAgfVxuXG4gIC8vIEdldCBhIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4XG4gIGdldChpKSB7XG4gICAgcmV0dXJuIGFkb3B0KHRoaXMubm9kZS5jaGlsZE5vZGVzW2ldKVxuICB9XG5cbiAgZ2V0RXZlbnRIb2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZVxuICB9XG5cbiAgZ2V0RXZlbnRUYXJnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZVxuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGEgY2hpbGRcbiAgaGFzKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleChlbGVtZW50KSA+PSAwXG4gIH1cblxuICBodG1sKGh0bWxPckZuLCBvdXRlckhUTUwpIHtcbiAgICByZXR1cm4gdGhpcy54bWwoaHRtbE9yRm4sIG91dGVySFRNTCwgaHRtbClcbiAgfVxuXG4gIC8vIEdldCAvIHNldCBpZFxuICBpZChpZCkge1xuICAgIC8vIGdlbmVyYXRlIG5ldyBpZCBpZiBubyBpZCBzZXRcbiAgICBpZiAodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5ub2RlLmlkKSB7XG4gICAgICB0aGlzLm5vZGUuaWQgPSBlaWQodGhpcy50eXBlKVxuICAgIH1cblxuICAgIC8vIGRvbid0IHNldCBkaXJlY3RseSB3aXRoIHRoaXMubm9kZS5pZCB0byBtYWtlIGBudWxsYCB3b3JrIGNvcnJlY3RseVxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2lkJywgaWQpXG4gIH1cblxuICAvLyBHZXRzIGluZGV4IG9mIGdpdmVuIGVsZW1lbnRcbiAgaW5kZXgoZWxlbWVudCkge1xuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5jaGlsZE5vZGVzKS5pbmRleE9mKGVsZW1lbnQubm9kZSlcbiAgfVxuXG4gIC8vIEdldCB0aGUgbGFzdCBjaGlsZFxuICBsYXN0KCkge1xuICAgIHJldHVybiBhZG9wdCh0aGlzLm5vZGUubGFzdENoaWxkKVxuICB9XG5cbiAgLy8gbWF0Y2hlcyB0aGUgZWxlbWVudCB2cyBhIGNzcyBzZWxlY3RvclxuICBtYXRjaGVzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLm5vZGVcbiAgICBjb25zdCBtYXRjaGVyID1cbiAgICAgIGVsLm1hdGNoZXMgfHxcbiAgICAgIGVsLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgZWwubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgIGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICBlbC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICBudWxsXG4gICAgcmV0dXJuIG1hdGNoZXIgJiYgbWF0Y2hlci5jYWxsKGVsLCBzZWxlY3RvcilcbiAgfVxuXG4gIC8vIFJldHVybnMgdGhlIHBhcmVudCBlbGVtZW50IGluc3RhbmNlXG4gIHBhcmVudCh0eXBlKSB7XG4gICAgbGV0IHBhcmVudCA9IHRoaXNcblxuICAgIC8vIGNoZWNrIGZvciBwYXJlbnRcbiAgICBpZiAoIXBhcmVudC5ub2RlLnBhcmVudE5vZGUpIHJldHVybiBudWxsXG5cbiAgICAvLyBnZXQgcGFyZW50IGVsZW1lbnRcbiAgICBwYXJlbnQgPSBhZG9wdChwYXJlbnQubm9kZS5wYXJlbnROb2RlKVxuXG4gICAgaWYgKCF0eXBlKSByZXR1cm4gcGFyZW50XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYW5jZXN0b3JzIGlmIHR5cGUgaXMgZ2l2ZW5cbiAgICBkbyB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHBhcmVudC5tYXRjaGVzKHR5cGUpIDogcGFyZW50IGluc3RhbmNlb2YgdHlwZVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgfSB3aGlsZSAoKHBhcmVudCA9IGFkb3B0KHBhcmVudC5ub2RlLnBhcmVudE5vZGUpKSlcblxuICAgIHJldHVybiBwYXJlbnRcbiAgfVxuXG4gIC8vIEJhc2ljYWxseSBkb2VzIHRoZSBzYW1lIGFzIGBhZGQoKWAgYnV0IHJldHVybnMgdGhlIGFkZGVkIGVsZW1lbnQgaW5zdGVhZFxuICBwdXQoZWxlbWVudCwgaSkge1xuICAgIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcbiAgICB0aGlzLmFkZChlbGVtZW50LCBpKVxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICAvLyBBZGQgZWxlbWVudCB0byBnaXZlbiBjb250YWluZXIgYW5kIHJldHVybiBjb250YWluZXJcbiAgcHV0SW4ocGFyZW50LCBpKSB7XG4gICAgcmV0dXJuIG1ha2VJbnN0YW5jZShwYXJlbnQpLmFkZCh0aGlzLCBpKVxuICB9XG5cbiAgLy8gUmVtb3ZlIGVsZW1lbnRcbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnBhcmVudCgpKSB7XG4gICAgICB0aGlzLnBhcmVudCgpLnJlbW92ZUVsZW1lbnQodGhpcylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gUmVtb3ZlIGEgZ2l2ZW4gY2hpbGRcbiAgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQubm9kZSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBSZXBsYWNlIHRoaXMgd2l0aCBlbGVtZW50XG4gIHJlcGxhY2UoZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcblxuICAgIGlmICh0aGlzLm5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGVsZW1lbnQubm9kZSwgdGhpcy5ub2RlKVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICByb3VuZChwcmVjaXNpb24gPSAyLCBtYXAgPSBudWxsKSB7XG4gICAgY29uc3QgZmFjdG9yID0gMTAgKiogcHJlY2lzaW9uXG4gICAgY29uc3QgYXR0cnMgPSB0aGlzLmF0dHIobWFwKVxuXG4gICAgZm9yIChjb25zdCBpIGluIGF0dHJzKSB7XG4gICAgICBpZiAodHlwZW9mIGF0dHJzW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyc1tpXSA9IE1hdGgucm91bmQoYXR0cnNbaV0gKiBmYWN0b3IpIC8gZmFjdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hdHRyKGF0dHJzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBJbXBvcnQgLyBFeHBvcnQgcmF3IHN2Z1xuICBzdmcoc3ZnT3JGbiwgb3V0ZXJTVkcpIHtcbiAgICByZXR1cm4gdGhpcy54bWwoc3ZnT3JGbiwgb3V0ZXJTVkcsIHN2ZylcbiAgfVxuXG4gIC8vIFJldHVybiBpZCBvbiBzdHJpbmcgY29udmVyc2lvblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5pZCgpXG4gIH1cblxuICB3b3Jkcyh0ZXh0KSB7XG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIgdGhhbiByZW1vdmluZyBhbGwgY2hpbGRyZW4gYW5kIGFkZGluZyBhIG5ldyBvbmVcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB0ZXh0XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHdyYXAobm9kZSkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50KClcblxuICAgIGlmICghcGFyZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRUbyhub2RlKVxuICAgIH1cblxuICAgIGNvbnN0IHBvc2l0aW9uID0gcGFyZW50LmluZGV4KHRoaXMpXG4gICAgcmV0dXJuIHBhcmVudC5wdXQobm9kZSwgcG9zaXRpb24pLnB1dCh0aGlzKVxuICB9XG5cbiAgLy8gd3JpdGUgc3ZnanMgZGF0YSB0byB0aGUgZG9tXG4gIHdyaXRlRGF0YVRvRG9tKCkge1xuICAgIC8vIGR1bXAgdmFyaWFibGVzIHJlY3Vyc2l2ZWx5XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMud3JpdGVEYXRhVG9Eb20oKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSW1wb3J0IC8gRXhwb3J0IHJhdyBzdmdcbiAgeG1sKHhtbE9yRm4sIG91dGVyWE1MLCBucykge1xuICAgIGlmICh0eXBlb2YgeG1sT3JGbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBucyA9IG91dGVyWE1MXG4gICAgICBvdXRlclhNTCA9IHhtbE9yRm5cbiAgICAgIHhtbE9yRm4gPSBudWxsXG4gICAgfVxuXG4gICAgLy8gYWN0IGFzIGdldHRlciBpZiBubyBzdmcgc3RyaW5nIGlzIGdpdmVuXG4gICAgaWYgKHhtbE9yRm4gPT0gbnVsbCB8fCB0eXBlb2YgeG1sT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gVGhlIGRlZmF1bHQgZm9yIGV4cG9ydHMgaXMsIHRoYXQgdGhlIG91dGVyTm9kZSBpcyBpbmNsdWRlZFxuICAgICAgb3V0ZXJYTUwgPSBvdXRlclhNTCA9PSBudWxsID8gdHJ1ZSA6IG91dGVyWE1MXG5cbiAgICAgIC8vIHdyaXRlIHN2Z2pzIGRhdGEgdG8gdGhlIGRvbVxuICAgICAgdGhpcy53cml0ZURhdGFUb0RvbSgpXG4gICAgICBsZXQgY3VycmVudCA9IHRoaXNcblxuICAgICAgLy8gQW4gZXhwb3J0IG1vZGlmaWVyIHdhcyBwYXNzZWRcbiAgICAgIGlmICh4bWxPckZuICE9IG51bGwpIHtcbiAgICAgICAgY3VycmVudCA9IGFkb3B0KGN1cnJlbnQubm9kZS5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgb3V0ZXJIVE1MIHdlIG5lZWQgdG8gcHJvY2VzcyB0aGlzIG5vZGUsIHRvb1xuICAgICAgICBpZiAob3V0ZXJYTUwpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB4bWxPckZuKGN1cnJlbnQpXG4gICAgICAgICAgY3VycmVudCA9IHJlc3VsdCB8fCBjdXJyZW50XG5cbiAgICAgICAgICAvLyBUaGUgdXNlciBkb2VzIG5vdCB3YW50IHRoaXMgbm9kZT8gV2VsbCwgdGhlbiBoZSBnZXRzIG5vdGhpbmdcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgcmV0dXJuICcnXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWVwIGxvb3AgdGhyb3VnaCBhbGwgY2hpbGRyZW4gYW5kIGFwcGx5IG1vZGlmaWVyXG4gICAgICAgIGN1cnJlbnQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0geG1sT3JGbih0aGlzKVxuICAgICAgICAgIGNvbnN0IF90aGlzID0gcmVzdWx0IHx8IHRoaXNcblxuICAgICAgICAgIC8vIElmIG1vZGlmaWVyIHJldHVybnMgZmFsc2UsIGRpc2NhcmQgbm9kZVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXG5cbiAgICAgICAgICAgIC8vIElmIG1vZGlmaWVyIHJldHVybnMgbmV3IG5vZGUsIHVzZSBpdFxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICYmIHRoaXMgIT09IF90aGlzKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2UoX3RoaXMpXG4gICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKVxuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gb3V0ZXIgb3IgaW5uZXIgY29udGVudFxuICAgICAgcmV0dXJuIG91dGVyWE1MID8gY3VycmVudC5ub2RlLm91dGVySFRNTCA6IGN1cnJlbnQubm9kZS5pbm5lckhUTUxcbiAgICB9XG5cbiAgICAvLyBBY3QgYXMgc2V0dGVyIGlmIHdlIGdvdCBhIHN0cmluZ1xuXG4gICAgLy8gVGhlIGRlZmF1bHQgZm9yIGltcG9ydCBpcywgdGhhdCB0aGUgY3VycmVudCBub2RlIGlzIG5vdCByZXBsYWNlZFxuICAgIG91dGVyWE1MID0gb3V0ZXJYTUwgPT0gbnVsbCA/IGZhbHNlIDogb3V0ZXJYTUxcblxuICAgIC8vIENyZWF0ZSB0ZW1wb3JhcnkgaG9sZGVyXG4gICAgY29uc3Qgd2VsbCA9IGNyZWF0ZSgnd3JhcHBlcicsIG5zKVxuICAgIGNvbnN0IGZyYWdtZW50ID0gZ2xvYmFscy5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblxuICAgIC8vIER1bXAgcmF3IHN2Z1xuICAgIHdlbGwuaW5uZXJIVE1MID0geG1sT3JGblxuXG4gICAgLy8gVHJhbnNwbGFudCBub2RlcyBpbnRvIHRoZSBmcmFnbWVudFxuICAgIGZvciAobGV0IGxlbiA9IHdlbGwuY2hpbGRyZW4ubGVuZ3RoOyBsZW4tLTsgKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3ZWxsLmZpcnN0RWxlbWVudENoaWxkKVxuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50KClcblxuICAgIC8vIEFkZCB0aGUgd2hvbGUgZnJhZ21lbnQgYXQgb25jZVxuICAgIHJldHVybiBvdXRlclhNTCA/IHRoaXMucmVwbGFjZShmcmFnbWVudCkgJiYgcGFyZW50IDogdGhpcy5hZGQoZnJhZ21lbnQpXG4gIH1cbn1cblxuZXh0ZW5kKERvbSwgeyBhdHRyLCBmaW5kLCBmaW5kT25lIH0pXG5yZWdpc3RlcihEb20sICdEb20nKVxuIiwiaW1wb3J0IHsgYmJveCwgcmJveCwgaW5zaWRlIH0gZnJvbSAnLi4vdHlwZXMvQm94LmpzJ1xuaW1wb3J0IHsgY3RtLCBzY3JlZW5DVE0gfSBmcm9tICcuLi90eXBlcy9NYXRyaXguanMnXG5pbXBvcnQge1xuICBleHRlbmQsXG4gIGdldENsYXNzLFxuICBtYWtlSW5zdGFuY2UsXG4gIHJlZ2lzdGVyLFxuICByb290XG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgcG9pbnQgfSBmcm9tICcuLi90eXBlcy9Qb2ludC5qcydcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUsIHdyaXRlRGF0YVRvRG9tIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyByZWZlcmVuY2UgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgRG9tIGZyb20gJy4vRG9tLmpzJ1xuaW1wb3J0IExpc3QgZnJvbSAnLi4vdHlwZXMvTGlzdC5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgRG9tIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMpIHtcbiAgICBzdXBlcihub2RlLCBhdHRycylcblxuICAgIC8vIGluaXRpYWxpemUgZGF0YSBvYmplY3RcbiAgICB0aGlzLmRvbSA9IHt9XG5cbiAgICAvLyBjcmVhdGUgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgdGhpcy5ub2RlLmluc3RhbmNlID0gdGhpc1xuXG4gICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXN2Z2pzJykgfHwgbm9kZS5oYXNBdHRyaWJ1dGUoJ3N2Z2pzOmRhdGEnKSkge1xuICAgICAgLy8gcHVsbCBzdmdqcyBkYXRhIGZyb20gdGhlIGRvbSAoZ2V0QXR0cmlidXRlTlMgZG9lc24ndCB3b3JrIGluIGh0bWw1KVxuICAgICAgdGhpcy5zZXREYXRhKFxuICAgICAgICBKU09OLnBhcnNlKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN2Z2pzJykpID8/XG4gICAgICAgICAgSlNPTi5wYXJzZShub2RlLmdldEF0dHJpYnV0ZSgnc3ZnanM6ZGF0YScpKSA/P1xuICAgICAgICAgIHt9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8gTW92ZSBlbGVtZW50IGJ5IGl0cyBjZW50ZXJcbiAgY2VudGVyKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5jeCh4KS5jeSh5KVxuICB9XG5cbiAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB4LWF4aXNcbiAgY3goeCkge1xuICAgIHJldHVybiB4ID09IG51bGxcbiAgICAgID8gdGhpcy54KCkgKyB0aGlzLndpZHRoKCkgLyAyXG4gICAgICA6IHRoaXMueCh4IC0gdGhpcy53aWR0aCgpIC8gMilcbiAgfVxuXG4gIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXG4gIGN5KHkpIHtcbiAgICByZXR1cm4geSA9PSBudWxsXG4gICAgICA/IHRoaXMueSgpICsgdGhpcy5oZWlnaHQoKSAvIDJcbiAgICAgIDogdGhpcy55KHkgLSB0aGlzLmhlaWdodCgpIC8gMilcbiAgfVxuXG4gIC8vIEdldCBkZWZzXG4gIGRlZnMoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXMucm9vdCgpXG4gICAgcmV0dXJuIHJvb3QgJiYgcm9vdC5kZWZzKClcbiAgfVxuXG4gIC8vIFJlbGF0aXZlIG1vdmUgb3ZlciB4IGFuZCB5IGF4ZXNcbiAgZG1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmR4KHgpLmR5KHkpXG4gIH1cblxuICAvLyBSZWxhdGl2ZSBtb3ZlIG92ZXIgeCBheGlzXG4gIGR4KHggPSAwKSB7XG4gICAgcmV0dXJuIHRoaXMueChuZXcgU1ZHTnVtYmVyKHgpLnBsdXModGhpcy54KCkpKVxuICB9XG5cbiAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHkgYXhpc1xuICBkeSh5ID0gMCkge1xuICAgIHJldHVybiB0aGlzLnkobmV3IFNWR051bWJlcih5KS5wbHVzKHRoaXMueSgpKSlcbiAgfVxuXG4gIGdldEV2ZW50SG9sZGVyKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcbiAgaGVpZ2h0KGhlaWdodCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuXG4gIC8vIE1vdmUgZWxlbWVudCB0byBnaXZlbiB4IGFuZCB5IHZhbHVlc1xuICBtb3ZlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy54KHgpLnkoeSlcbiAgfVxuXG4gIC8vIHJldHVybiBhcnJheSBvZiBhbGwgYW5jZXN0b3JzIG9mIGdpdmVuIHR5cGUgdXAgdG8gdGhlIHJvb3Qgc3ZnXG4gIHBhcmVudHModW50aWwgPSB0aGlzLnJvb3QoKSkge1xuICAgIGNvbnN0IGlzU2VsZWN0b3IgPSB0eXBlb2YgdW50aWwgPT09ICdzdHJpbmcnXG4gICAgaWYgKCFpc1NlbGVjdG9yKSB7XG4gICAgICB1bnRpbCA9IG1ha2VJbnN0YW5jZSh1bnRpbClcbiAgICB9XG4gICAgY29uc3QgcGFyZW50cyA9IG5ldyBMaXN0KClcbiAgICBsZXQgcGFyZW50ID0gdGhpc1xuXG4gICAgd2hpbGUgKFxuICAgICAgKHBhcmVudCA9IHBhcmVudC5wYXJlbnQoKSkgJiZcbiAgICAgIHBhcmVudC5ub2RlICE9PSBnbG9iYWxzLmRvY3VtZW50ICYmXG4gICAgICBwYXJlbnQubm9kZU5hbWUgIT09ICcjZG9jdW1lbnQtZnJhZ21lbnQnXG4gICAgKSB7XG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KVxuXG4gICAgICBpZiAoIWlzU2VsZWN0b3IgJiYgcGFyZW50Lm5vZGUgPT09IHVudGlsLm5vZGUpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGlmIChpc1NlbGVjdG9yICYmIHBhcmVudC5tYXRjaGVzKHVudGlsKSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudC5ub2RlID09PSB0aGlzLnJvb3QoKS5ub2RlKSB7XG4gICAgICAgIC8vIFdlIHdvcmtlZCBvdXIgd2F5IHRvIHRoZSByb290IGFuZCBkaWRuJ3QgbWF0Y2ggYHVudGlsYFxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRzXG4gIH1cblxuICAvLyBHZXQgcmVmZXJlbmNlZCBlbGVtZW50IGZvcm0gYXR0cmlidXRlIHZhbHVlXG4gIHJlZmVyZW5jZShhdHRyKSB7XG4gICAgYXR0ciA9IHRoaXMuYXR0cihhdHRyKVxuICAgIGlmICghYXR0cikgcmV0dXJuIG51bGxcblxuICAgIGNvbnN0IG0gPSAoYXR0ciArICcnKS5tYXRjaChyZWZlcmVuY2UpXG4gICAgcmV0dXJuIG0gPyBtYWtlSW5zdGFuY2UobVsxXSkgOiBudWxsXG4gIH1cblxuICAvLyBHZXQgcGFyZW50IGRvY3VtZW50XG4gIHJvb3QoKSB7XG4gICAgY29uc3QgcCA9IHRoaXMucGFyZW50KGdldENsYXNzKHJvb3QpKVxuICAgIHJldHVybiBwICYmIHAucm9vdCgpXG4gIH1cblxuICAvLyBzZXQgZ2l2ZW4gZGF0YSB0byB0aGUgZWxlbWVudHMgZGF0YSBwcm9wZXJ0eVxuICBzZXREYXRhKG8pIHtcbiAgICB0aGlzLmRvbSA9IG9cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICByZXR1cm4gdGhpcy53aWR0aChuZXcgU1ZHTnVtYmVyKHAud2lkdGgpKS5oZWlnaHQobmV3IFNWR051bWJlcihwLmhlaWdodCkpXG4gIH1cblxuICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxuICB3aWR0aCh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gIH1cblxuICAvLyB3cml0ZSBzdmdqcyBkYXRhIHRvIHRoZSBkb21cbiAgd3JpdGVEYXRhVG9Eb20oKSB7XG4gICAgd3JpdGVEYXRhVG9Eb20odGhpcywgdGhpcy5kb20pXG4gICAgcmV0dXJuIHN1cGVyLndyaXRlRGF0YVRvRG9tKClcbiAgfVxuXG4gIC8vIE1vdmUgb3ZlciB4LWF4aXNcbiAgeCh4KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cigneCcsIHgpXG4gIH1cblxuICAvLyBNb3ZlIG92ZXIgeS1heGlzXG4gIHkoeSkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ3knLCB5KVxuICB9XG59XG5cbmV4dGVuZChFbGVtZW50LCB7XG4gIGJib3gsXG4gIHJib3gsXG4gIGluc2lkZSxcbiAgcG9pbnQsXG4gIGN0bSxcbiAgc2NyZWVuQ1RNXG59KVxuXG5yZWdpc3RlcihFbGVtZW50LCAnRWxlbWVudCcpXG4iLCJpbXBvcnQge1xuICBleHRlbmQsXG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcbmltcG9ydCAqIGFzIGNpcmNsZWQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2NpcmNsZWQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBTaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnZWxsaXBzZScsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICByZXR1cm4gdGhpcy5yeChuZXcgU1ZHTnVtYmVyKHAud2lkdGgpLmRpdmlkZSgyKSkucnkoXG4gICAgICBuZXcgU1ZHTnVtYmVyKHAuaGVpZ2h0KS5kaXZpZGUoMilcbiAgICApXG4gIH1cbn1cblxuZXh0ZW5kKEVsbGlwc2UsIGNpcmNsZWQpXG5cbnJlZ2lzdGVyTWV0aG9kcygnQ29udGFpbmVyJywge1xuICAvLyBDcmVhdGUgYW4gZWxsaXBzZVxuICBlbGxpcHNlOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAod2lkdGggPSAwLCBoZWlnaHQgPSB3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLnB1dChuZXcgRWxsaXBzZSgpKS5zaXplKHdpZHRoLCBoZWlnaHQpLm1vdmUoMCwgMClcbiAgfSlcbn0pXG5cbnJlZ2lzdGVyKEVsbGlwc2UsICdFbGxpcHNlJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVpZ25PYmplY3QgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdmb3JlaWduT2JqZWN0Jywgbm9kZSksIGF0dHJzKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIGZvcmVpZ25PYmplY3Q6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IEZvcmVpZ25PYmplY3QoKSkuc2l6ZSh3aWR0aCwgaGVpZ2h0KVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKEZvcmVpZ25PYmplY3QsICdGb3JlaWduT2JqZWN0JylcbiIsImltcG9ydCBEb20gZnJvbSAnLi9Eb20uanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXIsIGNyZWF0ZSB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5cbmNsYXNzIEZyYWdtZW50IGV4dGVuZHMgRG9tIHtcbiAgY29uc3RydWN0b3Iobm9kZSA9IGdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKSB7XG4gICAgc3VwZXIobm9kZSlcbiAgfVxuXG4gIC8vIEltcG9ydCAvIEV4cG9ydCByYXcgeG1sXG4gIHhtbCh4bWxPckZuLCBvdXRlclhNTCwgbnMpIHtcbiAgICBpZiAodHlwZW9mIHhtbE9yRm4gPT09ICdib29sZWFuJykge1xuICAgICAgbnMgPSBvdXRlclhNTFxuICAgICAgb3V0ZXJYTUwgPSB4bWxPckZuXG4gICAgICB4bWxPckZuID0gbnVsbFxuICAgIH1cblxuICAgIC8vIGJlY2F1c2UgdGhpcyBpcyBhIGZyYWdtZW50IHdlIGhhdmUgdG8gcHV0IGFsbCBlbGVtZW50cyBpbnRvIGEgd3JhcHBlciBmaXJzdFxuICAgIC8vIGJlZm9yZSB3ZSBjYW4gZ2V0IHRoZSBpbm5lclhNTCBmcm9tIGl0XG4gICAgaWYgKHhtbE9yRm4gPT0gbnVsbCB8fCB0eXBlb2YgeG1sT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IG5ldyBEb20oY3JlYXRlKCd3cmFwcGVyJywgbnMpKVxuICAgICAgd3JhcHBlci5hZGQodGhpcy5ub2RlLmNsb25lTm9kZSh0cnVlKSlcblxuICAgICAgcmV0dXJuIHdyYXBwZXIueG1sKGZhbHNlLCBucylcbiAgICB9XG5cbiAgICAvLyBBY3QgYXMgc2V0dGVyIGlmIHdlIGdvdCBhIHN0cmluZ1xuICAgIHJldHVybiBzdXBlci54bWwoeG1sT3JGbiwgZmFsc2UsIG5zKVxuICB9XG59XG5cbnJlZ2lzdGVyKEZyYWdtZW50LCAnRnJhZ21lbnQnKVxuXG5leHBvcnQgZGVmYXVsdCBGcmFnbWVudFxuIiwiaW1wb3J0IHtcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2ssXG4gIGV4dGVuZFxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5pbXBvcnQgKiBhcyBjb250YWluZXJHZW9tZXRyeSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY29udGFpbmVyR2VvbWV0cnkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEcgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2cnLCBub2RlKSwgYXR0cnMpXG4gIH1cbn1cblxuZXh0ZW5kKEcsIGNvbnRhaW5lckdlb21ldHJ5KVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgYSBncm91cCBlbGVtZW50XG4gICAgZ3JvdXA6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgRygpKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKEcsICdHJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQm94IGZyb20gJy4uL3R5cGVzL0JveC5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuaW1wb3J0ICogYXMgZ3JhZGllbnRlZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZ3JhZGllbnRlZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhZGllbnQgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBhdHRycykge1xuICAgIHN1cGVyKFxuICAgICAgbm9kZU9yTmV3KHR5cGUgKyAnR3JhZGllbnQnLCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyBudWxsIDogdHlwZSksXG4gICAgICBhdHRyc1xuICAgIClcbiAgfVxuXG4gIC8vIGN1c3RvbSBhdHRyIHRvIGhhbmRsZSB0cmFuc2Zvcm1cbiAgYXR0cihhLCBiLCBjKSB7XG4gICAgaWYgKGEgPT09ICd0cmFuc2Zvcm0nKSBhID0gJ2dyYWRpZW50VHJhbnNmb3JtJ1xuICAgIHJldHVybiBzdXBlci5hdHRyKGEsIGIsIGMpXG4gIH1cblxuICBiYm94KCkge1xuICAgIHJldHVybiBuZXcgQm94KClcbiAgfVxuXG4gIHRhcmdldHMoKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgW2ZpbGwqPScgKyB0aGlzLmlkKCkgKyAnXScpXG4gIH1cblxuICAvLyBBbGlhcyBzdHJpbmcgY29udmVyc2lvbiB0byBmaWxsXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnVybCgpXG4gIH1cblxuICAvLyBVcGRhdGUgZ3JhZGllbnRcbiAgdXBkYXRlKGJsb2NrKSB7XG4gICAgLy8gcmVtb3ZlIGFsbCBzdG9wc1xuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgLy8gaW52b2tlIHBhc3NlZCBibG9ja1xuICAgIGlmICh0eXBlb2YgYmxvY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJsb2NrLmNhbGwodGhpcywgdGhpcylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBmaWxsIGlkXG4gIHVybCgpIHtcbiAgICByZXR1cm4gJ3VybCgjJyArIHRoaXMuaWQoKSArICcpJ1xuICB9XG59XG5cbmV4dGVuZChHcmFkaWVudCwgZ3JhZGllbnRlZClcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGdyYWRpZW50IGVsZW1lbnQgaW4gZGVmc1xuICAgIGdyYWRpZW50KC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5ncmFkaWVudCguLi5hcmdzKVxuICAgIH1cbiAgfSxcbiAgLy8gZGVmaW5lIGdyYWRpZW50XG4gIERlZnM6IHtcbiAgICBncmFkaWVudDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHR5cGUsIGJsb2NrKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IEdyYWRpZW50KHR5cGUpKS51cGRhdGUoYmxvY2spXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoR3JhZGllbnQsICdHcmFkaWVudCcpXG4iLCJpbXBvcnQgeyBpc0ltYWdlIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgb2ZmLCBvbiB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9ldmVudC5qcydcbmltcG9ydCB7IHJlZ2lzdGVyQXR0ckhvb2sgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvYXR0ci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyB4bGluayB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IFBhdHRlcm4gZnJvbSAnLi9QYXR0ZXJuLmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZSBleHRlbmRzIFNoYXBlIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdpbWFnZScsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIChyZSlsb2FkIGltYWdlXG4gIGxvYWQodXJsLCBjYWxsYmFjaykge1xuICAgIGlmICghdXJsKSByZXR1cm4gdGhpc1xuXG4gICAgY29uc3QgaW1nID0gbmV3IGdsb2JhbHMud2luZG93LkltYWdlKClcblxuICAgIG9uKFxuICAgICAgaW1nLFxuICAgICAgJ2xvYWQnLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgcCA9IHRoaXMucGFyZW50KFBhdHRlcm4pXG5cbiAgICAgICAgLy8gZW5zdXJlIGltYWdlIHNpemVcbiAgICAgICAgaWYgKHRoaXMud2lkdGgoKSA9PT0gMCAmJiB0aGlzLmhlaWdodCgpID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zaXplKGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwIGluc3RhbmNlb2YgUGF0dGVybikge1xuICAgICAgICAgIC8vIGVuc3VyZSBwYXR0ZXJuIHNpemUgaWYgbm90IHNldFxuICAgICAgICAgIGlmIChwLndpZHRoKCkgPT09IDAgJiYgcC5oZWlnaHQoKSA9PT0gMCkge1xuICAgICAgICAgICAgcC5zaXplKHRoaXMud2lkdGgoKSwgdGhpcy5oZWlnaHQoKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdGhpc1xuICAgIClcblxuICAgIG9uKGltZywgJ2xvYWQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBkb250IGZvcmdldCB0byB1bmJpbmQgbWVtb3J5IGxlYWtpbmcgZXZlbnRzXG4gICAgICBvZmYoaW1nKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgKGltZy5zcmMgPSB1cmwpLCB4bGluaylcbiAgfVxufVxuXG5yZWdpc3RlckF0dHJIb29rKGZ1bmN0aW9uIChhdHRyLCB2YWwsIF90aGlzKSB7XG4gIC8vIGNvbnZlcnQgaW1hZ2UgZmlsbCBhbmQgc3Ryb2tlIHRvIHBhdHRlcm5zXG4gIGlmIChhdHRyID09PSAnZmlsbCcgfHwgYXR0ciA9PT0gJ3N0cm9rZScpIHtcbiAgICBpZiAoaXNJbWFnZS50ZXN0KHZhbCkpIHtcbiAgICAgIHZhbCA9IF90aGlzLnJvb3QoKS5kZWZzKCkuaW1hZ2UodmFsKVxuICAgIH1cbiAgfVxuXG4gIGlmICh2YWwgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgIHZhbCA9IF90aGlzXG4gICAgICAucm9vdCgpXG4gICAgICAuZGVmcygpXG4gICAgICAucGF0dGVybigwLCAwLCAocGF0dGVybikgPT4ge1xuICAgICAgICBwYXR0ZXJuLmFkZCh2YWwpXG4gICAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHZhbFxufSlcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gY3JlYXRlIGltYWdlIGVsZW1lbnQsIGxvYWQgaW1hZ2UgYW5kIHNldCBpdHMgc2l6ZVxuICAgIGltYWdlOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoc291cmNlLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBJbWFnZSgpKS5zaXplKDAsIDApLmxvYWQoc291cmNlLCBjYWxsYmFjaylcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihJbWFnZSwgJ0ltYWdlJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgKiBhcyBwb2ludGVkIGZyb20gJy4uL21vZHVsZXMvY29yZS9wb2ludGVkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lIGV4dGVuZHMgU2hhcGUge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdsaW5lJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gR2V0IGFycmF5XG4gIGFycmF5KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnRBcnJheShbXG4gICAgICBbdGhpcy5hdHRyKCd4MScpLCB0aGlzLmF0dHIoJ3kxJyldLFxuICAgICAgW3RoaXMuYXR0cigneDInKSwgdGhpcy5hdHRyKCd5MicpXVxuICAgIF0pXG4gIH1cblxuICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxuICBtb3ZlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKHRoaXMuYXJyYXkoKS5tb3ZlKHgsIHkpLnRvTGluZSgpKVxuICB9XG5cbiAgLy8gT3ZlcndyaXRlIG5hdGl2ZSBwbG90KCkgbWV0aG9kXG4gIHBsb3QoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBpZiAoeDEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXJyYXkoKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHkxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgeDEgPSB7IHgxLCB5MSwgeDIsIHkyIH1cbiAgICB9IGVsc2Uge1xuICAgICAgeDEgPSBuZXcgUG9pbnRBcnJheSh4MSkudG9MaW5lKClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hdHRyKHgxKVxuICB9XG5cbiAgLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXG4gICAgcmV0dXJuIHRoaXMuYXR0cih0aGlzLmFycmF5KCkuc2l6ZShwLndpZHRoLCBwLmhlaWdodCkudG9MaW5lKCkpXG4gIH1cbn1cblxuZXh0ZW5kKExpbmUsIHBvaW50ZWQpXG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBhIGxpbmUgZWxlbWVudFxuICAgIGxpbmU6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcbiAgICAgIC8vIHgxIGlzIG5vdCBuZWNlc3NhcmlseSBhIG51bWJlciwgaXQgY2FuIGFsc28gYmUgYW4gYXJyYXksIGEgc3RyaW5nIGFuZCBhIFBvaW50QXJyYXlcbiAgICAgIHJldHVybiBMaW5lLnByb3RvdHlwZS5wbG90LmFwcGx5KFxuICAgICAgICB0aGlzLnB1dChuZXcgTGluZSgpKSxcbiAgICAgICAgYXJnc1swXSAhPSBudWxsID8gYXJncyA6IFswLCAwLCAwLCAwXVxuICAgICAgKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKExpbmUsICdMaW5lJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJrZXIgZXh0ZW5kcyBDb250YWluZXIge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdtYXJrZXInLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcbiAgaGVpZ2h0KGhlaWdodCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ21hcmtlckhlaWdodCcsIGhlaWdodClcbiAgfVxuXG4gIG9yaWVudChvcmllbnQpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdvcmllbnQnLCBvcmllbnQpXG4gIH1cblxuICAvLyBTZXQgbWFya2VyIHJlZlggYW5kIHJlZllcbiAgcmVmKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdyZWZYJywgeCkuYXR0cigncmVmWScsIHkpXG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcbiAgfVxuXG4gIC8vIFVwZGF0ZSBtYXJrZXJcbiAgdXBkYXRlKGJsb2NrKSB7XG4gICAgLy8gcmVtb3ZlIGFsbCBjb250ZW50XG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICAvLyBpbnZva2UgcGFzc2VkIGJsb2NrXG4gICAgaWYgKHR5cGVvZiBibG9jayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYmxvY2suY2FsbCh0aGlzLCB0aGlzKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxuICB3aWR0aCh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ21hcmtlcldpZHRoJywgd2lkdGgpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgbWFya2VyKC4uLmFyZ3MpIHtcbiAgICAgIC8vIENyZWF0ZSBtYXJrZXIgZWxlbWVudCBpbiBkZWZzXG4gICAgICByZXR1cm4gdGhpcy5kZWZzKCkubWFya2VyKC4uLmFyZ3MpXG4gICAgfVxuICB9LFxuICBEZWZzOiB7XG4gICAgLy8gQ3JlYXRlIG1hcmtlclxuICAgIG1hcmtlcjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XG4gICAgICAvLyBTZXQgZGVmYXVsdCB2aWV3Ym94IHRvIG1hdGNoIHRoZSB3aWR0aCBhbmQgaGVpZ2h0LCBzZXQgcmVmIHRvIGN4IGFuZCBjeSBhbmQgc2V0IG9yaWVudCB0byBhdXRvXG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IE1hcmtlcigpKVxuICAgICAgICAuc2l6ZSh3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAucmVmKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMilcbiAgICAgICAgLnZpZXdib3goMCwgMCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcbiAgICAgICAgLnVwZGF0ZShibG9jaylcbiAgICB9KVxuICB9LFxuICBtYXJrZXI6IHtcbiAgICAvLyBDcmVhdGUgYW5kIGF0dGFjaCBtYXJrZXJzXG4gICAgbWFya2VyKG1hcmtlciwgd2lkdGgsIGhlaWdodCwgYmxvY2spIHtcbiAgICAgIGxldCBhdHRyID0gWydtYXJrZXInXVxuXG4gICAgICAvLyBCdWlsZCBhdHRyaWJ1dGUgbmFtZVxuICAgICAgaWYgKG1hcmtlciAhPT0gJ2FsbCcpIGF0dHIucHVzaChtYXJrZXIpXG4gICAgICBhdHRyID0gYXR0ci5qb2luKCctJylcblxuICAgICAgLy8gU2V0IG1hcmtlciBhdHRyaWJ1dGVcbiAgICAgIG1hcmtlciA9XG4gICAgICAgIGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIE1hcmtlclxuICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgOiB0aGlzLmRlZnMoKS5tYXJrZXIod2lkdGgsIGhlaWdodCwgYmxvY2spXG5cbiAgICAgIHJldHVybiB0aGlzLmF0dHIoYXR0ciwgbWFya2VyKVxuICAgIH1cbiAgfVxufSlcblxucmVnaXN0ZXIoTWFya2VyLCAnTWFya2VyJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzayBleHRlbmRzIENvbnRhaW5lciB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ21hc2snLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBVbm1hc2sgYWxsIG1hc2tlZCBlbGVtZW50cyBhbmQgcmVtb3ZlIGl0c2VsZlxuICByZW1vdmUoKSB7XG4gICAgLy8gdW5tYXNrIGFsbCB0YXJnZXRzXG4gICAgdGhpcy50YXJnZXRzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLnVubWFzaygpXG4gICAgfSlcblxuICAgIC8vIHJlbW92ZSBtYXNrIGZyb20gcGFyZW50XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZSgpXG4gIH1cblxuICB0YXJnZXRzKCkge1xuICAgIHJldHVybiBiYXNlRmluZCgnc3ZnIFttYXNrKj0nICsgdGhpcy5pZCgpICsgJ10nKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIG1hc2s6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5wdXQobmV3IE1hc2soKSlcbiAgICB9KVxuICB9LFxuICBFbGVtZW50OiB7XG4gICAgLy8gRGlzdHJpYnV0ZSBtYXNrIHRvIHN2ZyBlbGVtZW50XG4gICAgbWFza2VyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlKCdtYXNrJylcbiAgICB9LFxuXG4gICAgbWFza1dpdGgoZWxlbWVudCkge1xuICAgICAgLy8gdXNlIGdpdmVuIG1hc2sgb3IgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgY29uc3QgbWFza2VyID1cbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIE1hc2sgPyBlbGVtZW50IDogdGhpcy5wYXJlbnQoKS5tYXNrKCkuYWRkKGVsZW1lbnQpXG5cbiAgICAgIC8vIGFwcGx5IG1hc2tcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hc2snLCAndXJsKCMnICsgbWFza2VyLmlkKCkgKyAnKScpXG4gICAgfSxcblxuICAgIC8vIFVubWFzayBlbGVtZW50XG4gICAgdW5tYXNrKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cignbWFzaycsIG51bGwpXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihNYXNrLCAnTWFzaycpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuLi90eXBlcy9QYXRoQXJyYXkuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCBleHRlbmRzIFNoYXBlIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygncGF0aCcsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIEdldCBhcnJheVxuICBhcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkgfHwgKHRoaXMuX2FycmF5ID0gbmV3IFBhdGhBcnJheSh0aGlzLmF0dHIoJ2QnKSkpXG4gIH1cblxuICAvLyBDbGVhciBhcnJheSBjYWNoZVxuICBjbGVhcigpIHtcbiAgICBkZWxldGUgdGhpcy5fYXJyYXlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XG4gIGhlaWdodChoZWlnaHQpIHtcbiAgICByZXR1cm4gaGVpZ2h0ID09IG51bGxcbiAgICAgID8gdGhpcy5iYm94KCkuaGVpZ2h0XG4gICAgICA6IHRoaXMuc2l6ZSh0aGlzLmJib3goKS53aWR0aCwgaGVpZ2h0KVxuICB9XG5cbiAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXJcbiAgbW92ZSh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignZCcsIHRoaXMuYXJyYXkoKS5tb3ZlKHgsIHkpKVxuICB9XG5cbiAgLy8gUGxvdCBuZXcgcGF0aFxuICBwbG90KGQpIHtcbiAgICByZXR1cm4gZCA9PSBudWxsXG4gICAgICA/IHRoaXMuYXJyYXkoKVxuICAgICAgOiB0aGlzLmNsZWFyKCkuYXR0cihcbiAgICAgICAgICAnZCcsXG4gICAgICAgICAgdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gZCA6ICh0aGlzLl9hcnJheSA9IG5ldyBQYXRoQXJyYXkoZCkpXG4gICAgICAgIClcbiAgfVxuXG4gIC8vIFNldCBlbGVtZW50IHNpemUgdG8gZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0KVxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2QnLCB0aGlzLmFycmF5KCkuc2l6ZShwLndpZHRoLCBwLmhlaWdodCkpXG4gIH1cblxuICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxuICB3aWR0aCh3aWR0aCkge1xuICAgIHJldHVybiB3aWR0aCA9PSBudWxsXG4gICAgICA/IHRoaXMuYmJveCgpLndpZHRoXG4gICAgICA6IHRoaXMuc2l6ZSh3aWR0aCwgdGhpcy5iYm94KCkuaGVpZ2h0KVxuICB9XG5cbiAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXIgb3ZlciB4LWF4aXNcbiAgeCh4KSB7XG4gICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLnggOiB0aGlzLm1vdmUoeCwgdGhpcy5iYm94KCkueSlcbiAgfVxuXG4gIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXG4gIHkoeSkge1xuICAgIHJldHVybiB5ID09IG51bGwgPyB0aGlzLmJib3goKS55IDogdGhpcy5tb3ZlKHRoaXMuYmJveCgpLngsIHkpXG4gIH1cbn1cblxuLy8gRGVmaW5lIG1vcnBoYWJsZSBhcnJheVxuUGF0aC5wcm90b3R5cGUuTW9ycGhBcnJheSA9IFBhdGhBcnJheVxuXG4vLyBBZGQgcGFyZW50IG1ldGhvZFxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwYXRoIGVsZW1lbnRcbiAgICBwYXRoOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoZCkge1xuICAgICAgLy8gbWFrZSBzdXJlIHBsb3QgaXMgY2FsbGVkIGFzIGEgc2V0dGVyXG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFBhdGgoKSkucGxvdChkIHx8IG5ldyBQYXRoQXJyYXkoKSlcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihQYXRoLCAnUGF0aCcpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IEJveCBmcm9tICcuLi90eXBlcy9Cb3guanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0dGVybiBleHRlbmRzIENvbnRhaW5lciB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3BhdHRlcm4nLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBjdXN0b20gYXR0ciB0byBoYW5kbGUgdHJhbnNmb3JtXG4gIGF0dHIoYSwgYiwgYykge1xuICAgIGlmIChhID09PSAndHJhbnNmb3JtJykgYSA9ICdwYXR0ZXJuVHJhbnNmb3JtJ1xuICAgIHJldHVybiBzdXBlci5hdHRyKGEsIGIsIGMpXG4gIH1cblxuICBiYm94KCkge1xuICAgIHJldHVybiBuZXcgQm94KClcbiAgfVxuXG4gIHRhcmdldHMoKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgW2ZpbGwqPScgKyB0aGlzLmlkKCkgKyAnXScpXG4gIH1cblxuICAvLyBBbGlhcyBzdHJpbmcgY29udmVyc2lvbiB0byBmaWxsXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnVybCgpXG4gIH1cblxuICAvLyBVcGRhdGUgcGF0dGVybiBieSByZWJ1aWxkaW5nXG4gIHVwZGF0ZShibG9jaykge1xuICAgIC8vIHJlbW92ZSBjb250ZW50XG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICAvLyBpbnZva2UgcGFzc2VkIGJsb2NrXG4gICAgaWYgKHR5cGVvZiBibG9jayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYmxvY2suY2FsbCh0aGlzLCB0aGlzKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcbiAgdXJsKCkge1xuICAgIHJldHVybiAndXJsKCMnICsgdGhpcy5pZCgpICsgJyknXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIHBhdHRlcm4gZWxlbWVudCBpbiBkZWZzXG4gICAgcGF0dGVybiguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZzKCkucGF0dGVybiguLi5hcmdzKVxuICAgIH1cbiAgfSxcbiAgRGVmczoge1xuICAgIHBhdHRlcm46IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBQYXR0ZXJuKCkpLnVwZGF0ZShibG9jaykuYXR0cih7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHBhdHRlcm5Vbml0czogJ3VzZXJTcGFjZU9uVXNlJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihQYXR0ZXJuLCAnUGF0dGVybicpXG4iLCJpbXBvcnQge1xuICBleHRlbmQsXG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IFBvaW50QXJyYXkgZnJvbSAnLi4vdHlwZXMvUG9pbnRBcnJheS5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuaW1wb3J0ICogYXMgcG9pbnRlZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcG9pbnRlZC5qcydcbmltcG9ydCAqIGFzIHBvbHkgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvbHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBTaGFwZSB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3BvbHlnb24nLCBub2RlKSwgYXR0cnMpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwb2x5Z29uIGVsZW1lbnRcbiAgICBwb2x5Z29uOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAocCkge1xuICAgICAgLy8gbWFrZSBzdXJlIHBsb3QgaXMgY2FsbGVkIGFzIGEgc2V0dGVyXG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFBvbHlnb24oKSkucGxvdChwIHx8IG5ldyBQb2ludEFycmF5KCkpXG4gICAgfSlcbiAgfVxufSlcblxuZXh0ZW5kKFBvbHlnb24sIHBvaW50ZWQpXG5leHRlbmQoUG9seWdvbiwgcG9seSlcbnJlZ2lzdGVyKFBvbHlnb24sICdQb2x5Z29uJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgKiBhcyBwb2ludGVkIGZyb20gJy4uL21vZHVsZXMvY29yZS9wb2ludGVkLmpzJ1xuaW1wb3J0ICogYXMgcG9seSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcG9seS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWxpbmUgZXh0ZW5kcyBTaGFwZSB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3BvbHlsaW5lJywgbm9kZSksIGF0dHJzKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBhIHdyYXBwZWQgcG9seWdvbiBlbGVtZW50XG4gICAgcG9seWxpbmU6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChwKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgUG9seWxpbmUoKSkucGxvdChwIHx8IG5ldyBQb2ludEFycmF5KCkpXG4gICAgfSlcbiAgfVxufSlcblxuZXh0ZW5kKFBvbHlsaW5lLCBwb2ludGVkKVxuZXh0ZW5kKFBvbHlsaW5lLCBwb2x5KVxucmVnaXN0ZXIoUG9seWxpbmUsICdQb2x5bGluZScpXG4iLCJpbXBvcnQge1xuICBleHRlbmQsXG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IHsgcngsIHJ5IH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2NpcmNsZWQuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdCBleHRlbmRzIFNoYXBlIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygncmVjdCcsIG5vZGUpLCBhdHRycylcbiAgfVxufVxuXG5leHRlbmQoUmVjdCwgeyByeCwgcnkgfSlcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgcmVjdCBlbGVtZW50XG4gICAgcmVjdDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgUmVjdCgpKS5zaXplKHdpZHRoLCBoZWlnaHQpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoUmVjdCwgJ1JlY3QnKVxuIiwiaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIEVsZW1lbnQge31cblxucmVnaXN0ZXIoU2hhcGUsICdTaGFwZScpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3N0b3AnLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBhZGQgY29sb3Igc3RvcHNcbiAgdXBkYXRlKG8pIHtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdudW1iZXInIHx8IG8gaW5zdGFuY2VvZiBTVkdOdW1iZXIpIHtcbiAgICAgIG8gPSB7XG4gICAgICAgIG9mZnNldDogYXJndW1lbnRzWzBdLFxuICAgICAgICBjb2xvcjogYXJndW1lbnRzWzFdLFxuICAgICAgICBvcGFjaXR5OiBhcmd1bWVudHNbMl1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgYXR0cmlidXRlc1xuICAgIGlmIChvLm9wYWNpdHkgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLW9wYWNpdHknLCBvLm9wYWNpdHkpXG4gICAgaWYgKG8uY29sb3IgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLWNvbG9yJywgby5jb2xvcilcbiAgICBpZiAoby5vZmZzZXQgIT0gbnVsbCkgdGhpcy5hdHRyKCdvZmZzZXQnLCBuZXcgU1ZHTnVtYmVyKG8ub2Zmc2V0KSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgR3JhZGllbnQ6IHtcbiAgICAvLyBBZGQgYSBjb2xvciBzdG9wXG4gICAgc3RvcDogZnVuY3Rpb24gKG9mZnNldCwgY29sb3IsIG9wYWNpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU3RvcCgpKS51cGRhdGUob2Zmc2V0LCBjb2xvciwgb3BhY2l0eSlcbiAgICB9XG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFN0b3AsICdTdG9wJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHVuQ2FtZWxDYXNlIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXG5cbmZ1bmN0aW9uIGNzc1J1bGUoc2VsZWN0b3IsIHJ1bGUpIHtcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuICcnXG4gIGlmICghcnVsZSkgcmV0dXJuIHNlbGVjdG9yXG5cbiAgbGV0IHJldCA9IHNlbGVjdG9yICsgJ3snXG5cbiAgZm9yIChjb25zdCBpIGluIHJ1bGUpIHtcbiAgICByZXQgKz0gdW5DYW1lbENhc2UoaSkgKyAnOicgKyBydWxlW2ldICsgJzsnXG4gIH1cblxuICByZXQgKz0gJ30nXG5cbiAgcmV0dXJuIHJldFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3N0eWxlJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgYWRkVGV4dCh3ID0gJycpIHtcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgKz0gd1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmb250KG5hbWUsIHNyYywgcGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlKCdAZm9udC1mYWNlJywge1xuICAgICAgZm9udEZhbWlseTogbmFtZSxcbiAgICAgIHNyYzogc3JjLFxuICAgICAgLi4ucGFyYW1zXG4gICAgfSlcbiAgfVxuXG4gIHJ1bGUoc2VsZWN0b3IsIG9iaikge1xuICAgIHJldHVybiB0aGlzLmFkZFRleHQoY3NzUnVsZShzZWxlY3Rvciwgb2JqKSlcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoJ0RvbScsIHtcbiAgc3R5bGUoc2VsZWN0b3IsIG9iaikge1xuICAgIHJldHVybiB0aGlzLnB1dChuZXcgU3R5bGUoKSkucnVsZShzZWxlY3Rvciwgb2JqKVxuICB9LFxuICBmb250ZmFjZShuYW1lLCBzcmMsIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLnB1dChuZXcgU3R5bGUoKSkuZm9udChuYW1lLCBzcmMsIHBhcmFtcylcbiAgfVxufSlcblxucmVnaXN0ZXIoU3R5bGUsICdTdHlsZScpXG4iLCJpbXBvcnQge1xuICBhZG9wdCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHN2ZywgeGxpbmssIHhtbG5zIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcbmltcG9ydCBEZWZzIGZyb20gJy4vRGVmcy5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnc3ZnJywgbm9kZSksIGF0dHJzKVxuICAgIHRoaXMubmFtZXNwYWNlKClcbiAgfVxuXG4gIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgZGVmcyBlbGVtZW50XG4gIGRlZnMoKSB7XG4gICAgaWYgKCF0aGlzLmlzUm9vdCgpKSByZXR1cm4gdGhpcy5yb290KCkuZGVmcygpXG5cbiAgICByZXR1cm4gYWRvcHQodGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ2RlZnMnKSkgfHwgdGhpcy5wdXQobmV3IERlZnMoKSlcbiAgfVxuXG4gIGlzUm9vdCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMubm9kZS5wYXJlbnROb2RlIHx8XG4gICAgICAoISh0aGlzLm5vZGUucGFyZW50Tm9kZSBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93LlNWR0VsZW1lbnQpICYmXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lICE9PSAnI2RvY3VtZW50LWZyYWdtZW50JylcbiAgICApXG4gIH1cblxuICAvLyBBZGQgbmFtZXNwYWNlc1xuICBuYW1lc3BhY2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzUm9vdCgpKSByZXR1cm4gdGhpcy5yb290KCkubmFtZXNwYWNlKClcbiAgICByZXR1cm4gdGhpcy5hdHRyKHsgeG1sbnM6IHN2ZywgdmVyc2lvbjogJzEuMScgfSkuYXR0cihcbiAgICAgICd4bWxuczp4bGluaycsXG4gICAgICB4bGluayxcbiAgICAgIHhtbG5zXG4gICAgKVxuICB9XG5cbiAgcmVtb3ZlTmFtZXNwYWNlKCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoeyB4bWxuczogbnVsbCwgdmVyc2lvbjogbnVsbCB9KVxuICAgICAgLmF0dHIoJ3htbG5zOnhsaW5rJywgbnVsbCwgeG1sbnMpXG4gICAgICAuYXR0cigneG1sbnM6c3ZnanMnLCBudWxsLCB4bWxucylcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgaXMgYSByb290IHN2Z1xuICAvLyBJZiBub3QsIGNhbGwgcm9vdCgpIGZyb20gdGhpcyBlbGVtZW50XG4gIHJvb3QoKSB7XG4gICAgaWYgKHRoaXMuaXNSb290KCkpIHJldHVybiB0aGlzXG4gICAgcmV0dXJuIHN1cGVyLnJvb3QoKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBuZXN0ZWQgc3ZnIGRvY3VtZW50XG4gICAgbmVzdGVkOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFN2ZygpKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFN2ZywgJ1N2ZycsIHRydWUpXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ltYm9sIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnc3ltYm9sJywgbm9kZSksIGF0dHJzKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIHN5bWJvbDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTeW1ib2woKSlcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihTeW1ib2wsICdTeW1ib2wnKVxuIiwiaW1wb3J0IHtcbiAgYWRvcHQsXG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCAqIGFzIHRleHRhYmxlIGZyb20gJy4uL21vZHVsZXMvY29yZS90ZXh0YWJsZS5qcydcbmltcG9ydCB7IGlzRGVzY3JpcHRpdmUsIHdyaXRlRGF0YVRvRG9tIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBTaGFwZSB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3RleHQnLCBub2RlKSwgYXR0cnMpXG5cbiAgICB0aGlzLmRvbS5sZWFkaW5nID0gdGhpcy5kb20ubGVhZGluZyA/PyBuZXcgU1ZHTnVtYmVyKDEuMykgLy8gc3RvcmUgbGVhZGluZyB2YWx1ZSBmb3IgcmVidWlsZGluZ1xuICAgIHRoaXMuX3JlYnVpbGQgPSB0cnVlIC8vIGVuYWJsZSBhdXRvbWF0aWMgdXBkYXRpbmcgb2YgZHkgdmFsdWVzXG4gICAgdGhpcy5fYnVpbGQgPSBmYWxzZSAvLyBkaXNhYmxlIGJ1aWxkIG1vZGUgZm9yIGFkZGluZyBtdWx0aXBsZSBsaW5lc1xuICB9XG5cbiAgLy8gU2V0IC8gZ2V0IGxlYWRpbmdcbiAgbGVhZGluZyh2YWx1ZSkge1xuICAgIC8vIGFjdCBhcyBnZXR0ZXJcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG9tLmxlYWRpbmdcbiAgICB9XG5cbiAgICAvLyBhY3QgYXMgc2V0dGVyXG4gICAgdGhpcy5kb20ubGVhZGluZyA9IG5ldyBTVkdOdW1iZXIodmFsdWUpXG5cbiAgICByZXR1cm4gdGhpcy5yZWJ1aWxkKClcbiAgfVxuXG4gIC8vIFJlYnVpbGQgYXBwZWFyYW5jZSB0eXBlXG4gIHJlYnVpbGQocmVidWlsZCkge1xuICAgIC8vIHN0b3JlIG5ldyByZWJ1aWxkIGZsYWcgaWYgZ2l2ZW5cbiAgICBpZiAodHlwZW9mIHJlYnVpbGQgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5fcmVidWlsZCA9IHJlYnVpbGRcbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgcG9zaXRpb24gb2YgYWxsIGxpbmVzXG4gICAgaWYgKHRoaXMuX3JlYnVpbGQpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBsZXQgYmxhbmtMaW5lT2Zmc2V0ID0gMFxuICAgICAgY29uc3QgbGVhZGluZyA9IHRoaXMuZG9tLmxlYWRpbmdcblxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmIChpc0Rlc2NyaXB0aXZlKHRoaXMubm9kZSkpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gZ2xvYmFscy53aW5kb3dcbiAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5vZGUpXG4gICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpXG5cbiAgICAgICAgY29uc3QgZHkgPSBsZWFkaW5nICogbmV3IFNWR051bWJlcihmb250U2l6ZSlcblxuICAgICAgICBpZiAodGhpcy5kb20ubmV3TGluZWQpIHtcbiAgICAgICAgICB0aGlzLmF0dHIoJ3gnLCBzZWxmLmF0dHIoJ3gnKSlcblxuICAgICAgICAgIGlmICh0aGlzLnRleHQoKSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgIGJsYW5rTGluZU9mZnNldCArPSBkeVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHIoJ2R5JywgaSA/IGR5ICsgYmxhbmtMaW5lT2Zmc2V0IDogMClcbiAgICAgICAgICAgIGJsYW5rTGluZU9mZnNldCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuZmlyZSgncmVidWlsZCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIG92ZXJ3cml0ZSBtZXRob2QgZnJvbSBwYXJlbnQgdG8gc2V0IGRhdGEgcHJvcGVybHlcbiAgc2V0RGF0YShvKSB7XG4gICAgdGhpcy5kb20gPSBvXG4gICAgdGhpcy5kb20ubGVhZGluZyA9IG5ldyBTVkdOdW1iZXIoby5sZWFkaW5nIHx8IDEuMylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgd3JpdGVEYXRhVG9Eb20oKSB7XG4gICAgd3JpdGVEYXRhVG9Eb20odGhpcywgdGhpcy5kb20sIHsgbGVhZGluZzogMS4zIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNldCB0aGUgdGV4dCBjb250ZW50XG4gIHRleHQodGV4dCkge1xuICAgIC8vIGFjdCBhcyBnZXR0ZXJcbiAgICBpZiAodGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZE5vZGVzXG4gICAgICBsZXQgZmlyc3RMaW5lID0gMFxuICAgICAgdGV4dCA9ICcnXG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAvLyBza2lwIHRleHRQYXRocyAtIHRoZXkgYXJlIG5vIGxpbmVzXG4gICAgICAgIGlmIChjaGlsZHJlbltpXS5ub2RlTmFtZSA9PT0gJ3RleHRQYXRoJyB8fCBpc0Rlc2NyaXB0aXZlKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgIGlmIChpID09PSAwKSBmaXJzdExpbmUgPSBpICsgMVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgbmV3bGluZSBpZiBpdHMgbm90IHRoZSBmaXJzdCBjaGlsZCBhbmQgbmV3TGluZWQgaXMgc2V0IHRvIHRydWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGkgIT09IGZpcnN0TGluZSAmJlxuICAgICAgICAgIGNoaWxkcmVuW2ldLm5vZGVUeXBlICE9PSAzICYmXG4gICAgICAgICAgYWRvcHQoY2hpbGRyZW5baV0pLmRvbS5uZXdMaW5lZCA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICB0ZXh0ICs9ICdcXG4nXG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgY29udGVudCBvZiB0aGlzIG5vZGVcbiAgICAgICAgdGV4dCArPSBjaGlsZHJlbltpXS50ZXh0Q29udGVudFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGV4dFxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBjb250ZW50XG4gICAgdGhpcy5jbGVhcigpLmJ1aWxkKHRydWUpXG5cbiAgICBpZiAodHlwZW9mIHRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNhbGwgYmxvY2tcbiAgICAgIHRleHQuY2FsbCh0aGlzLCB0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdG9yZSB0ZXh0IGFuZCBtYWtlIHN1cmUgdGV4dCBpcyBub3QgYmxhbmtcbiAgICAgIHRleHQgPSAodGV4dCArICcnKS5zcGxpdCgnXFxuJylcblxuICAgICAgLy8gYnVpbGQgbmV3IGxpbmVzXG4gICAgICBmb3IgKGxldCBqID0gMCwgamwgPSB0ZXh0Lmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgdGhpcy5uZXdMaW5lKHRleHRbal0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZSBidWlsZCBtb2RlIGFuZCByZWJ1aWxkIGxpbmVzXG4gICAgcmV0dXJuIHRoaXMuYnVpbGQoZmFsc2UpLnJlYnVpbGQoKVxuICB9XG59XG5cbmV4dGVuZChUZXh0LCB0ZXh0YWJsZSlcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIHRleHQgZWxlbWVudFxuICAgIHRleHQ6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0ID0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgVGV4dCgpKS50ZXh0KHRleHQpXG4gICAgfSksXG5cbiAgICAvLyBDcmVhdGUgcGxhaW4gdGV4dCBlbGVtZW50XG4gICAgcGxhaW46IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0ID0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgVGV4dCgpKS5wbGFpbih0ZXh0KVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFRleHQsICdUZXh0JylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyB4bGluayB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJ1xuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuLi90eXBlcy9QYXRoQXJyYXkuanMnXG5pbXBvcnQgVGV4dCBmcm9tICcuL1RleHQuanMnXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0UGF0aCBleHRlbmRzIFRleHQge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCd0ZXh0UGF0aCcsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIHJldHVybiB0aGUgYXJyYXkgb2YgdGhlIHBhdGggdHJhY2sgZWxlbWVudFxuICBhcnJheSgpIHtcbiAgICBjb25zdCB0cmFjayA9IHRoaXMudHJhY2soKVxuXG4gICAgcmV0dXJuIHRyYWNrID8gdHJhY2suYXJyYXkoKSA6IG51bGxcbiAgfVxuXG4gIC8vIFBsb3QgcGF0aCBpZiBhbnlcbiAgcGxvdChkKSB7XG4gICAgY29uc3QgdHJhY2sgPSB0aGlzLnRyYWNrKClcbiAgICBsZXQgcGF0aEFycmF5ID0gbnVsbFxuXG4gICAgaWYgKHRyYWNrKSB7XG4gICAgICBwYXRoQXJyYXkgPSB0cmFjay5wbG90KGQpXG4gICAgfVxuXG4gICAgcmV0dXJuIGQgPT0gbnVsbCA/IHBhdGhBcnJheSA6IHRoaXNcbiAgfVxuXG4gIC8vIEdldCB0aGUgcGF0aCBlbGVtZW50XG4gIHRyYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZSgnaHJlZicpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgdGV4dFBhdGg6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0LCBwYXRoKSB7XG4gICAgICAvLyBDb252ZXJ0IHRleHQgdG8gaW5zdGFuY2UgaWYgbmVlZGVkXG4gICAgICBpZiAoISh0ZXh0IGluc3RhbmNlb2YgVGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRoaXMudGV4dCh0ZXh0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGV4dC5wYXRoKHBhdGgpXG4gICAgfSlcbiAgfSxcbiAgVGV4dDoge1xuICAgIC8vIENyZWF0ZSBwYXRoIGZvciB0ZXh0IHRvIHJ1biBvblxuICAgIHBhdGg6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0cmFjaywgaW1wb3J0Tm9kZXMgPSB0cnVlKSB7XG4gICAgICBjb25zdCB0ZXh0UGF0aCA9IG5ldyBUZXh0UGF0aCgpXG5cbiAgICAgIC8vIGlmIHRyYWNrIGlzIGEgcGF0aCwgcmV1c2UgaXRcbiAgICAgIGlmICghKHRyYWNrIGluc3RhbmNlb2YgUGF0aCkpIHtcbiAgICAgICAgLy8gY3JlYXRlIHBhdGggZWxlbWVudFxuICAgICAgICB0cmFjayA9IHRoaXMuZGVmcygpLnBhdGgodHJhY2spXG4gICAgICB9XG5cbiAgICAgIC8vIGxpbmsgdGV4dFBhdGggdG8gcGF0aCBhbmQgYWRkIGNvbnRlbnRcbiAgICAgIHRleHRQYXRoLmF0dHIoJ2hyZWYnLCAnIycgKyB0cmFjaywgeGxpbmspXG5cbiAgICAgIC8vIFRyYW5zcGxhbnQgYWxsIG5vZGVzIGZyb20gdGV4dCB0byB0ZXh0UGF0aFxuICAgICAgbGV0IG5vZGVcbiAgICAgIGlmIChpbXBvcnROb2Rlcykge1xuICAgICAgICB3aGlsZSAoKG5vZGUgPSB0aGlzLm5vZGUuZmlyc3RDaGlsZCkpIHtcbiAgICAgICAgICB0ZXh0UGF0aC5ub2RlLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRleHRQYXRoIGVsZW1lbnQgYXMgY2hpbGQgbm9kZSBhbmQgcmV0dXJuIHRleHRQYXRoXG4gICAgICByZXR1cm4gdGhpcy5wdXQodGV4dFBhdGgpXG4gICAgfSksXG5cbiAgICAvLyBHZXQgdGhlIHRleHRQYXRoIGNoaWxkcmVuXG4gICAgdGV4dFBhdGgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kT25lKCd0ZXh0UGF0aCcpXG4gICAgfVxuICB9LFxuICBQYXRoOiB7XG4gICAgLy8gY3JlYXRlcyBhIHRleHRQYXRoIGZyb20gdGhpcyBwYXRoXG4gICAgdGV4dDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIC8vIENvbnZlcnQgdGV4dCB0byBpbnN0YW5jZSBpZiBuZWVkZWRcbiAgICAgIGlmICghKHRleHQgaW5zdGFuY2VvZiBUZXh0KSkge1xuICAgICAgICB0ZXh0ID0gbmV3IFRleHQoKS5hZGRUbyh0aGlzLnBhcmVudCgpKS50ZXh0KHRleHQpXG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0ZXh0UGF0aCBmcm9tIHRleHQgYW5kIHBhdGggYW5kIHJldHVyblxuICAgICAgcmV0dXJuIHRleHQucGF0aCh0aGlzKVxuICAgIH0pLFxuXG4gICAgdGFyZ2V0cygpIHtcbiAgICAgIHJldHVybiBiYXNlRmluZCgnc3ZnIHRleHRQYXRoJykuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgIHJldHVybiAobm9kZS5hdHRyKCdocmVmJykgfHwgJycpLmluY2x1ZGVzKHRoaXMuaWQoKSlcbiAgICAgIH0pXG5cbiAgICAgIC8vIERvZXMgbm90IHdvcmsgaW4gSUUxMS4gVXNlIHdoZW4gSUUgc3VwcG9ydCBpcyBkcm9wcGVkXG4gICAgICAvLyByZXR1cm4gYmFzZUZpbmQoJ3N2ZyB0ZXh0UGF0aFsqfGhyZWYqPScgKyB0aGlzLmlkKCkgKyAnXScpXG4gICAgfVxuICB9XG59KVxuXG5UZXh0UGF0aC5wcm90b3R5cGUuTW9ycGhBcnJheSA9IFBhdGhBcnJheVxucmVnaXN0ZXIoVGV4dFBhdGgsICdUZXh0UGF0aCcpXG4iLCJpbXBvcnQge1xuICBleHRlbmQsXG4gIG5vZGVPck5ldyxcbiAgcmVnaXN0ZXIsXG4gIHdyYXBXaXRoQXR0ckNoZWNrXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgVGV4dCBmcm9tICcuL1RleHQuanMnXG5pbXBvcnQgKiBhcyB0ZXh0YWJsZSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvdGV4dGFibGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRzcGFuIGV4dGVuZHMgU2hhcGUge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCd0c3BhbicsIG5vZGUpLCBhdHRycylcbiAgICB0aGlzLl9idWlsZCA9IGZhbHNlIC8vIGRpc2FibGUgYnVpbGQgbW9kZSBmb3IgYWRkaW5nIG11bHRpcGxlIGxpbmVzXG4gIH1cblxuICAvLyBTaG9ydGN1dCBkeFxuICBkeChkeCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ2R4JywgZHgpXG4gIH1cblxuICAvLyBTaG9ydGN1dCBkeVxuICBkeShkeSkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ2R5JywgZHkpXG4gIH1cblxuICAvLyBDcmVhdGUgbmV3IGxpbmVcbiAgbmV3TGluZSgpIHtcbiAgICAvLyBtYXJrIG5ldyBsaW5lXG4gICAgdGhpcy5kb20ubmV3TGluZWQgPSB0cnVlXG5cbiAgICAvLyBmZXRjaCBwYXJlbnRcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5wYXJlbnQoKVxuXG4gICAgLy8gZWFybHkgcmV0dXJuIGluIGNhc2Ugd2UgYXJlIG5vdCBpbiBhIHRleHQgZWxlbWVudFxuICAgIGlmICghKHRleHQgaW5zdGFuY2VvZiBUZXh0KSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBjb25zdCBpID0gdGV4dC5pbmRleCh0aGlzKVxuXG4gICAgY29uc3QgZm9udFNpemUgPSBnbG9iYWxzLndpbmRvd1xuICAgICAgLmdldENvbXB1dGVkU3R5bGUodGhpcy5ub2RlKVxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpXG4gICAgY29uc3QgZHkgPSB0ZXh0LmRvbS5sZWFkaW5nICogbmV3IFNWR051bWJlcihmb250U2l6ZSlcblxuICAgIC8vIGFwcGx5IG5ldyBwb3NpdGlvblxuICAgIHJldHVybiB0aGlzLmR5KGkgPyBkeSA6IDApLmF0dHIoJ3gnLCB0ZXh0LngoKSlcbiAgfVxuXG4gIC8vIFNldCB0ZXh0IGNvbnRlbnRcbiAgdGV4dCh0ZXh0KSB7XG4gICAgaWYgKHRleHQgPT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLm5vZGUudGV4dENvbnRlbnQgKyAodGhpcy5kb20ubmV3TGluZWQgPyAnXFxuJyA6ICcnKVxuXG4gICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmNsZWFyKCkuYnVpbGQodHJ1ZSlcbiAgICAgIHRleHQuY2FsbCh0aGlzLCB0aGlzKVxuICAgICAgdGhpcy5idWlsZChmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGFpbih0ZXh0KVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXh0ZW5kKFRzcGFuLCB0ZXh0YWJsZSlcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgVHNwYW46IHtcbiAgICB0c3Bhbjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQgPSAnJykge1xuICAgICAgY29uc3QgdHNwYW4gPSBuZXcgVHNwYW4oKVxuXG4gICAgICAvLyBjbGVhciBpZiBidWlsZCBtb2RlIGlzIGRpc2FibGVkXG4gICAgICBpZiAoIXRoaXMuX2J1aWxkKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgfVxuXG4gICAgICAvLyBhZGQgbmV3IHRzcGFuXG4gICAgICByZXR1cm4gdGhpcy5wdXQodHNwYW4pLnRleHQodGV4dClcbiAgICB9KVxuICB9LFxuICBUZXh0OiB7XG4gICAgbmV3TGluZTogZnVuY3Rpb24gKHRleHQgPSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMudHNwYW4odGV4dCkubmV3TGluZSgpXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihUc3BhbiwgJ1RzcGFuJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyB4bGluayB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZSBleHRlbmRzIFNoYXBlIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCd1c2UnLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBVc2UgZWxlbWVudCBhcyBhIHJlZmVyZW5jZVxuICB1c2UoZWxlbWVudCwgZmlsZSkge1xuICAgIC8vIFNldCBsaW5lZCBlbGVtZW50XG4gICAgcmV0dXJuIHRoaXMuYXR0cignaHJlZicsIChmaWxlIHx8ICcnKSArICcjJyArIGVsZW1lbnQsIHhsaW5rKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBhIHVzZSBlbGVtZW50XG4gICAgdXNlOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoZWxlbWVudCwgZmlsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBVc2UoKSkudXNlKGVsZW1lbnQsIGZpbGUpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoVXNlLCAnVXNlJylcbiIsIi8qIE9wdGlvbmFsIE1vZHVsZXMgKi9cbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2FycmFuZ2UuanMnXG5pbXBvcnQgJy4vbW9kdWxlcy9vcHRpb25hbC9jbGFzcy5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2Nzcy5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2RhdGEuanMnXG5pbXBvcnQgJy4vbW9kdWxlcy9vcHRpb25hbC9tZW1vcnkuanMnXG5pbXBvcnQgJy4vbW9kdWxlcy9vcHRpb25hbC9zdWdhci5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL3RyYW5zZm9ybS5qcydcblxuaW1wb3J0IHsgZXh0ZW5kLCBtYWtlSW5zdGFuY2UgfSBmcm9tICcuL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBnZXRNZXRob2ROYW1lcywgZ2V0TWV0aG9kc0ZvciB9IGZyb20gJy4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi90eXBlcy9Cb3guanMnXG5pbXBvcnQgQ29sb3IgZnJvbSAnLi90eXBlcy9Db2xvci5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9lbGVtZW50cy9Db250YWluZXIuanMnXG5pbXBvcnQgRGVmcyBmcm9tICcuL2VsZW1lbnRzL0RlZnMuanMnXG5pbXBvcnQgRG9tIGZyb20gJy4vZWxlbWVudHMvRG9tLmpzJ1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50cy9FbGVtZW50LmpzJ1xuaW1wb3J0IEVsbGlwc2UgZnJvbSAnLi9lbGVtZW50cy9FbGxpcHNlLmpzJ1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4vdHlwZXMvRXZlbnRUYXJnZXQuanMnXG5pbXBvcnQgRnJhZ21lbnQgZnJvbSAnLi9lbGVtZW50cy9GcmFnbWVudC5qcydcbmltcG9ydCBHcmFkaWVudCBmcm9tICcuL2VsZW1lbnRzL0dyYWRpZW50LmpzJ1xuaW1wb3J0IEltYWdlIGZyb20gJy4vZWxlbWVudHMvSW1hZ2UuanMnXG5pbXBvcnQgTGluZSBmcm9tICcuL2VsZW1lbnRzL0xpbmUuanMnXG5pbXBvcnQgTGlzdCBmcm9tICcuL3R5cGVzL0xpc3QuanMnXG5pbXBvcnQgTWFya2VyIGZyb20gJy4vZWxlbWVudHMvTWFya2VyLmpzJ1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL3R5cGVzL01hdHJpeC5qcydcbmltcG9ydCBNb3JwaGFibGUsIHtcbiAgTm9uTW9ycGhhYmxlLFxuICBPYmplY3RCYWcsXG4gIFRyYW5zZm9ybUJhZyxcbiAgbWFrZU1vcnBoYWJsZSxcbiAgcmVnaXN0ZXJNb3JwaGFibGVUeXBlXG59IGZyb20gJy4vYW5pbWF0aW9uL01vcnBoYWJsZS5qcydcbmltcG9ydCBQYXRoIGZyb20gJy4vZWxlbWVudHMvUGF0aC5qcydcbmltcG9ydCBQYXRoQXJyYXkgZnJvbSAnLi90eXBlcy9QYXRoQXJyYXkuanMnXG5pbXBvcnQgUGF0dGVybiBmcm9tICcuL2VsZW1lbnRzL1BhdHRlcm4uanMnXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuL3R5cGVzL1BvaW50QXJyYXkuanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi90eXBlcy9Qb2ludC5qcydcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vZWxlbWVudHMvUG9seWdvbi5qcydcbmltcG9ydCBQb2x5bGluZSBmcm9tICcuL2VsZW1lbnRzL1BvbHlsaW5lLmpzJ1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9lbGVtZW50cy9SZWN0LmpzJ1xuaW1wb3J0IFJ1bm5lciBmcm9tICcuL2FuaW1hdGlvbi9SdW5uZXIuanMnXG5pbXBvcnQgU1ZHQXJyYXkgZnJvbSAnLi90eXBlcy9TVkdBcnJheS5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9lbGVtZW50cy9TaGFwZS5qcydcbmltcG9ydCBTdmcgZnJvbSAnLi9lbGVtZW50cy9TdmcuanMnXG5pbXBvcnQgU3ltYm9sIGZyb20gJy4vZWxlbWVudHMvU3ltYm9sLmpzJ1xuaW1wb3J0IFRleHQgZnJvbSAnLi9lbGVtZW50cy9UZXh0LmpzJ1xuaW1wb3J0IFRzcGFuIGZyb20gJy4vZWxlbWVudHMvVHNwYW4uanMnXG5pbXBvcnQgKiBhcyBkZWZhdWx0cyBmcm9tICcuL21vZHVsZXMvY29yZS9kZWZhdWx0cy5qcydcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBuYW1lc3BhY2VzIGZyb20gJy4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL21vZHVsZXMvY29yZS9yZWdleC5qcydcblxuZXhwb3J0IHtcbiAgTW9ycGhhYmxlLFxuICByZWdpc3Rlck1vcnBoYWJsZVR5cGUsXG4gIG1ha2VNb3JwaGFibGUsXG4gIFRyYW5zZm9ybUJhZyxcbiAgT2JqZWN0QmFnLFxuICBOb25Nb3JwaGFibGVcbn1cblxuZXhwb3J0IHsgZGVmYXVsdHMsIHV0aWxzLCBuYW1lc3BhY2VzLCByZWdleCB9XG5leHBvcnQgY29uc3QgU1ZHID0gbWFrZUluc3RhbmNlXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlciB9IGZyb20gJy4vbW9kdWxlcy9jb3JlL3BhcnNlci5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmluZCB9IGZyb20gJy4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2NvcmUvZXZlbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2Fkb3B0ZXIuanMnXG5leHBvcnQge1xuICBnZXRXaW5kb3csXG4gIHJlZ2lzdGVyV2luZG93LFxuICByZXN0b3JlV2luZG93LFxuICBzYXZlV2luZG93LFxuICB3aXRoV2luZG93XG59IGZyb20gJy4vdXRpbHMvd2luZG93LmpzJ1xuXG4vKiBBbmltYXRpb24gTW9kdWxlcyAqL1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBbmltYXRvciB9IGZyb20gJy4vYW5pbWF0aW9uL0FuaW1hdG9yLmpzJ1xuZXhwb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgRWFzZSxcbiAgUElELFxuICBTcHJpbmcsXG4gIGVhc2luZ1xufSBmcm9tICcuL2FuaW1hdGlvbi9Db250cm9sbGVyLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBRdWV1ZSB9IGZyb20gJy4vYW5pbWF0aW9uL1F1ZXVlLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSdW5uZXIgfSBmcm9tICcuL2FuaW1hdGlvbi9SdW5uZXIuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpbWVsaW5lIH0gZnJvbSAnLi9hbmltYXRpb24vVGltZWxpbmUuanMnXG5cbi8qIFR5cGVzICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFycmF5IH0gZnJvbSAnLi90eXBlcy9TVkdBcnJheS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQm94IH0gZnJvbSAnLi90eXBlcy9Cb3guanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbG9yIH0gZnJvbSAnLi90eXBlcy9Db2xvci5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRUYXJnZXQgfSBmcm9tICcuL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXRyaXggfSBmcm9tICcuL3R5cGVzL01hdHJpeC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTnVtYmVyIH0gZnJvbSAnLi90eXBlcy9TVkdOdW1iZXIuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdGhBcnJheSB9IGZyb20gJy4vdHlwZXMvUGF0aEFycmF5LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb2ludCB9IGZyb20gJy4vdHlwZXMvUG9pbnQuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvaW50QXJyYXkgfSBmcm9tICcuL3R5cGVzL1BvaW50QXJyYXkuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3QgfSBmcm9tICcuL3R5cGVzL0xpc3QuanMnXG5cbi8qIEVsZW1lbnRzICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIENpcmNsZSB9IGZyb20gJy4vZWxlbWVudHMvQ2lyY2xlLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDbGlwUGF0aCB9IGZyb20gJy4vZWxlbWVudHMvQ2xpcFBhdGguanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbnRhaW5lciB9IGZyb20gJy4vZWxlbWVudHMvQ29udGFpbmVyLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEZWZzIH0gZnJvbSAnLi9lbGVtZW50cy9EZWZzLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEb20gfSBmcm9tICcuL2VsZW1lbnRzL0RvbS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRWxlbWVudCB9IGZyb20gJy4vZWxlbWVudHMvRWxlbWVudC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRWxsaXBzZSB9IGZyb20gJy4vZWxlbWVudHMvRWxsaXBzZS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRm9yZWlnbk9iamVjdCB9IGZyb20gJy4vZWxlbWVudHMvRm9yZWlnbk9iamVjdC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRnJhZ21lbnQgfSBmcm9tICcuL2VsZW1lbnRzL0ZyYWdtZW50LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHcmFkaWVudCB9IGZyb20gJy4vZWxlbWVudHMvR3JhZGllbnQuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIEcgfSBmcm9tICcuL2VsZW1lbnRzL0cuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIEEgfSBmcm9tICcuL2VsZW1lbnRzL0EuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIEltYWdlIH0gZnJvbSAnLi9lbGVtZW50cy9JbWFnZS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGluZSB9IGZyb20gJy4vZWxlbWVudHMvTGluZS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFya2VyIH0gZnJvbSAnLi9lbGVtZW50cy9NYXJrZXIuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2sgfSBmcm9tICcuL2VsZW1lbnRzL01hc2suanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdGggfSBmcm9tICcuL2VsZW1lbnRzL1BhdGguanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdHRlcm4gfSBmcm9tICcuL2VsZW1lbnRzL1BhdHRlcm4uanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvbHlnb24gfSBmcm9tICcuL2VsZW1lbnRzL1BvbHlnb24uanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvbHlsaW5lIH0gZnJvbSAnLi9lbGVtZW50cy9Qb2x5bGluZS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVjdCB9IGZyb20gJy4vZWxlbWVudHMvUmVjdC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2hhcGUgfSBmcm9tICcuL2VsZW1lbnRzL1NoYXBlLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdG9wIH0gZnJvbSAnLi9lbGVtZW50cy9TdG9wLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdHlsZSB9IGZyb20gJy4vZWxlbWVudHMvU3R5bGUuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN2ZyB9IGZyb20gJy4vZWxlbWVudHMvU3ZnLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTeW1ib2wgfSBmcm9tICcuL2VsZW1lbnRzL1N5bWJvbC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vZWxlbWVudHMvVGV4dC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dFBhdGggfSBmcm9tICcuL2VsZW1lbnRzL1RleHRQYXRoLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUc3BhbiB9IGZyb20gJy4vZWxlbWVudHMvVHNwYW4uanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFVzZSB9IGZyb20gJy4vZWxlbWVudHMvVXNlLmpzJ1xuXG5leHRlbmQoW1N2ZywgU3ltYm9sLCBJbWFnZSwgUGF0dGVybiwgTWFya2VyXSwgZ2V0TWV0aG9kc0Zvcigndmlld2JveCcpKVxuXG5leHRlbmQoW0xpbmUsIFBvbHlsaW5lLCBQb2x5Z29uLCBQYXRoXSwgZ2V0TWV0aG9kc0ZvcignbWFya2VyJykpXG5cbmV4dGVuZChUZXh0LCBnZXRNZXRob2RzRm9yKCdUZXh0JykpXG5leHRlbmQoUGF0aCwgZ2V0TWV0aG9kc0ZvcignUGF0aCcpKVxuXG5leHRlbmQoRGVmcywgZ2V0TWV0aG9kc0ZvcignRGVmcycpKVxuXG5leHRlbmQoW1RleHQsIFRzcGFuXSwgZ2V0TWV0aG9kc0ZvcignVHNwYW4nKSlcblxuZXh0ZW5kKFtSZWN0LCBFbGxpcHNlLCBHcmFkaWVudCwgUnVubmVyXSwgZ2V0TWV0aG9kc0ZvcigncmFkaXVzJykpXG5cbmV4dGVuZChFdmVudFRhcmdldCwgZ2V0TWV0aG9kc0ZvcignRXZlbnRUYXJnZXQnKSlcbmV4dGVuZChEb20sIGdldE1ldGhvZHNGb3IoJ0RvbScpKVxuZXh0ZW5kKEVsZW1lbnQsIGdldE1ldGhvZHNGb3IoJ0VsZW1lbnQnKSlcbmV4dGVuZChTaGFwZSwgZ2V0TWV0aG9kc0ZvcignU2hhcGUnKSlcbmV4dGVuZChbQ29udGFpbmVyLCBGcmFnbWVudF0sIGdldE1ldGhvZHNGb3IoJ0NvbnRhaW5lcicpKVxuZXh0ZW5kKEdyYWRpZW50LCBnZXRNZXRob2RzRm9yKCdHcmFkaWVudCcpKVxuXG5leHRlbmQoUnVubmVyLCBnZXRNZXRob2RzRm9yKCdSdW5uZXInKSlcblxuTGlzdC5leHRlbmQoZ2V0TWV0aG9kTmFtZXMoKSlcblxucmVnaXN0ZXJNb3JwaGFibGVUeXBlKFtcbiAgU1ZHTnVtYmVyLFxuICBDb2xvcixcbiAgQm94LFxuICBNYXRyaXgsXG4gIFNWR0FycmF5LFxuICBQb2ludEFycmF5LFxuICBQYXRoQXJyYXksXG4gIFBvaW50XG5dKVxuXG5tYWtlTW9ycGhhYmxlKClcbiIsImltcG9ydCB7IGF0dHJzIGFzIGRlZmF1bHRzIH0gZnJvbSAnLi9kZWZhdWx0cy5qcydcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9yZWdleC5qcydcbmltcG9ydCBDb2xvciBmcm9tICcuLi8uLi90eXBlcy9Db2xvci5qcydcbmltcG9ydCBTVkdBcnJheSBmcm9tICcuLi8uLi90eXBlcy9TVkdBcnJheS5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuXG5jb25zdCBjb2xvckF0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgJ2ZpbGwnLFxuICAnc3Ryb2tlJyxcbiAgJ2NvbG9yJyxcbiAgJ2JnY29sb3InLFxuICAnc3RvcC1jb2xvcicsXG4gICdmbG9vZC1jb2xvcicsXG4gICdsaWdodGluZy1jb2xvcidcbl0pXG5cbmNvbnN0IGhvb2tzID0gW11cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckF0dHJIb29rKGZuKSB7XG4gIGhvb2tzLnB1c2goZm4pXG59XG5cbi8vIFNldCBzdmcgZWxlbWVudCBhdHRyaWJ1dGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dHIoYXR0ciwgdmFsLCBucykge1xuICAvLyBhY3QgYXMgZnVsbCBnZXR0ZXJcbiAgaWYgKGF0dHIgPT0gbnVsbCkge1xuICAgIC8vIGdldCBhbiBvYmplY3Qgb2YgYXR0cmlidXRlc1xuICAgIGF0dHIgPSB7fVxuICAgIHZhbCA9IHRoaXMubm9kZS5hdHRyaWJ1dGVzXG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdmFsKSB7XG4gICAgICBhdHRyW25vZGUubm9kZU5hbWVdID0gaXNOdW1iZXIudGVzdChub2RlLm5vZGVWYWx1ZSlcbiAgICAgICAgPyBwYXJzZUZsb2F0KG5vZGUubm9kZVZhbHVlKVxuICAgICAgICA6IG5vZGUubm9kZVZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJcbiAgfSBlbHNlIGlmIChhdHRyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAvLyBsb29wIHRocm91Z2ggYXJyYXkgYW5kIGdldCBhbGwgdmFsdWVzXG4gICAgcmV0dXJuIGF0dHIucmVkdWNlKChsYXN0LCBjdXJyKSA9PiB7XG4gICAgICBsYXN0W2N1cnJdID0gdGhpcy5hdHRyKGN1cnIpXG4gICAgICByZXR1cm4gbGFzdFxuICAgIH0sIHt9KVxuICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyID09PSAnb2JqZWN0JyAmJiBhdHRyLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAvLyBhcHBseSBldmVyeSBhdHRyaWJ1dGUgaW5kaXZpZHVhbGx5IGlmIGFuIG9iamVjdCBpcyBwYXNzZWRcbiAgICBmb3IgKHZhbCBpbiBhdHRyKSB0aGlzLmF0dHIodmFsLCBhdHRyW3ZhbF0pXG4gIH0gZWxzZSBpZiAodmFsID09PSBudWxsKSB7XG4gICAgLy8gcmVtb3ZlIHZhbHVlXG4gICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyKVxuICB9IGVsc2UgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgLy8gYWN0IGFzIGEgZ2V0dGVyIGlmIHRoZSBmaXJzdCBhbmQgb25seSBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0XG4gICAgdmFsID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZShhdHRyKVxuICAgIHJldHVybiB2YWwgPT0gbnVsbFxuICAgICAgPyBkZWZhdWx0c1thdHRyXVxuICAgICAgOiBpc051bWJlci50ZXN0KHZhbClcbiAgICAgICAgPyBwYXJzZUZsb2F0KHZhbClcbiAgICAgICAgOiB2YWxcbiAgfSBlbHNlIHtcbiAgICAvLyBMb29wIHRocm91Z2ggaG9va3MgYW5kIGV4ZWN1dGUgdGhlbSB0byBjb252ZXJ0IHZhbHVlXG4gICAgdmFsID0gaG9va3MucmVkdWNlKChfdmFsLCBob29rKSA9PiB7XG4gICAgICByZXR1cm4gaG9vayhhdHRyLCBfdmFsLCB0aGlzKVxuICAgIH0sIHZhbClcblxuICAgIC8vIGVuc3VyZSBjb3JyZWN0IG51bWVyaWMgdmFsdWVzIChhbHNvIGFjY2VwdHMgTmFOIGFuZCBJbmZpbml0eSlcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhbCA9IG5ldyBTVkdOdW1iZXIodmFsKVxuICAgIH0gZWxzZSBpZiAoY29sb3JBdHRyaWJ1dGVzLmhhcyhhdHRyKSAmJiBDb2xvci5pc0NvbG9yKHZhbCkpIHtcbiAgICAgIC8vIGVuc3VyZSBmdWxsIGhleCBjb2xvclxuICAgICAgdmFsID0gbmV3IENvbG9yKHZhbClcbiAgICB9IGVsc2UgaWYgKHZhbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgIC8vIENoZWNrIGZvciBwbGFpbiBhcnJheXMgYW5kIHBhcnNlIGFycmF5IHZhbHVlc1xuICAgICAgdmFsID0gbmV3IFNWR0FycmF5KHZhbClcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgcGFzc2VkIGF0dHJpYnV0ZSBpcyBsZWFkaW5nLi4uXG4gICAgaWYgKGF0dHIgPT09ICdsZWFkaW5nJykge1xuICAgICAgLy8gLi4uIGNhbGwgdGhlIGxlYWRpbmcgbWV0aG9kIGluc3RlYWRcbiAgICAgIGlmICh0aGlzLmxlYWRpbmcpIHtcbiAgICAgICAgdGhpcy5sZWFkaW5nKHZhbClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0IGdpdmVuIGF0dHJpYnV0ZSBvbiBub2RlXG4gICAgICB0eXBlb2YgbnMgPT09ICdzdHJpbmcnXG4gICAgICAgID8gdGhpcy5ub2RlLnNldEF0dHJpYnV0ZU5TKG5zLCBhdHRyLCB2YWwudG9TdHJpbmcoKSlcbiAgICAgICAgOiB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbC50b1N0cmluZygpKVxuICAgIH1cblxuICAgIC8vIHJlYnVpbGQgaWYgcmVxdWlyZWRcbiAgICBpZiAodGhpcy5yZWJ1aWxkICYmIChhdHRyID09PSAnZm9udC1zaXplJyB8fCBhdHRyID09PSAneCcpKSB7XG4gICAgICB0aGlzLnJlYnVpbGQoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG4iLCJpbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uLy4uL3R5cGVzL1NWR051bWJlci5qcydcblxuLy8gUmFkaXVzIHggdmFsdWVcbmV4cG9ydCBmdW5jdGlvbiByeChyeCkge1xuICByZXR1cm4gdGhpcy5hdHRyKCdyeCcsIHJ4KVxufVxuXG4vLyBSYWRpdXMgeSB2YWx1ZVxuZXhwb3J0IGZ1bmN0aW9uIHJ5KHJ5KSB7XG4gIHJldHVybiB0aGlzLmF0dHIoJ3J5JywgcnkpXG59XG5cbi8vIE1vdmUgb3ZlciB4LWF4aXNcbmV4cG9ydCBmdW5jdGlvbiB4KHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuY3goKSAtIHRoaXMucngoKSA6IHRoaXMuY3goeCArIHRoaXMucngoKSlcbn1cblxuLy8gTW92ZSBvdmVyIHktYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIHkoeSkge1xuICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5jeSgpIC0gdGhpcy5yeSgpIDogdGhpcy5jeSh5ICsgdGhpcy5yeSgpKVxufVxuXG4vLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHgtYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIGN4KHgpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cignY3gnLCB4KVxufVxuXG4vLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHktYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIGN5KHkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cignY3knLCB5KVxufVxuXG4vLyBTZXQgd2lkdGggb2YgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKHdpZHRoKSB7XG4gIHJldHVybiB3aWR0aCA9PSBudWxsID8gdGhpcy5yeCgpICogMiA6IHRoaXMucngobmV3IFNWR051bWJlcih3aWR0aCkuZGl2aWRlKDIpKVxufVxuXG4vLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoaGVpZ2h0KSB7XG4gIHJldHVybiBoZWlnaHQgPT0gbnVsbFxuICAgID8gdGhpcy5yeSgpICogMlxuICAgIDogdGhpcy5yeShuZXcgU1ZHTnVtYmVyKGhlaWdodCkuZGl2aWRlKDIpKVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuLi8uLi90eXBlcy9NYXRyaXguanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vdHlwZXMvUG9pbnQuanMnXG5pbXBvcnQgQm94IGZyb20gJy4uLy4uL3R5cGVzL0JveC5qcydcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi8uLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IGdldFdpbmRvdyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGRtb3ZlKGR4LCBkeSkge1xuICB0aGlzLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICBsZXQgYmJveFxuXG4gICAgLy8gV2UgaGF2ZSB0byB3cmFwIHRoaXMgZm9yIGVsZW1lbnRzIHRoYXQgZG9udCBoYXZlIGEgYmJveFxuICAgIC8vIGUuZy4gdGl0bGUgYW5kIG90aGVyIGRlc2NyaXB0aXZlIGVsZW1lbnRzXG4gICAgdHJ5IHtcbiAgICAgIC8vIEdldCB0aGUgY2hpbGRzIGJib3hcbiAgICAgIC8vIEJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTkwNTAzOVxuICAgICAgLy8gQmVjYXVzZSBiYm94IGZvciBuZXN0ZWQgc3ZncyByZXR1cm5zIHRoZSBjb250ZW50cyBiYm94IGluIHRoZSBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBzdmcgaXRzZWxmICh3ZWlyZCEpLCB3ZSBjYW50IHVzZSBiYm94IGZvciBzdmdzXG4gICAgICAvLyBUaGVyZWZvcmUgd2UgaGF2ZSB0byB1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0LiBCdXQgVEhBVCBpcyBicm9rZW4gKGFzIGV4cGxhaW5lZCBpbiB0aGUgYnVnKS5cbiAgICAgIC8vIEZ1bm5pbHkgZW5vdWdoIHRoZSBicm9rZW4gYmVoYXZpb3Igd291bGQgd29yayBmb3IgdXMgYnV0IHRoYXQgYnJlYWtzIGl0IGluIGNocm9tZVxuICAgICAgLy8gU28gd2UgaGF2ZSB0byByZXBsaWNhdGUgdGhlIGJyb2tlbiBiZWhhdmlvciBvZiBGRiBieSBqdXN0IHJlYWRpbmcgdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIHN2ZyBpdHNlbGZcbiAgICAgIGJib3ggPVxuICAgICAgICBjaGlsZC5ub2RlIGluc3RhbmNlb2YgZ2V0V2luZG93KCkuU1ZHU1ZHRWxlbWVudFxuICAgICAgICAgID8gbmV3IEJveChjaGlsZC5hdHRyKFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCddKSlcbiAgICAgICAgICA6IGNoaWxkLmJib3goKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEdldCBjaGlsZHMgbWF0cml4XG4gICAgY29uc3QgbSA9IG5ldyBNYXRyaXgoY2hpbGQpXG4gICAgLy8gVHJhbnNsYXRlIGNoaWxkcyBtYXRyaXggYnkgYW1vdW50IGFuZFxuICAgIC8vIHRyYW5zZm9ybSBpdCBiYWNrIGludG8gcGFyZW50cyBzcGFjZVxuICAgIGNvbnN0IG1hdHJpeCA9IG0udHJhbnNsYXRlKGR4LCBkeSkudHJhbnNmb3JtKG0uaW52ZXJzZSgpKVxuICAgIC8vIENhbGN1bGF0ZSBuZXcgeCBhbmQgeSBmcm9tIG9sZCBib3hcbiAgICBjb25zdCBwID0gbmV3IFBvaW50KGJib3gueCwgYmJveC55KS50cmFuc2Zvcm0obWF0cml4KVxuICAgIC8vIE1vdmUgZWxlbWVudFxuICAgIGNoaWxkLm1vdmUocC54LCBwLnkpXG4gIH0pXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGR4KGR4KSB7XG4gIHJldHVybiB0aGlzLmRtb3ZlKGR4LCAwKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHkoZHkpIHtcbiAgcmV0dXJuIHRoaXMuZG1vdmUoMCwgZHkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoaGVpZ2h0LCBib3ggPSB0aGlzLmJib3goKSkge1xuICBpZiAoaGVpZ2h0ID09IG51bGwpIHJldHVybiBib3guaGVpZ2h0XG4gIHJldHVybiB0aGlzLnNpemUoYm94LndpZHRoLCBoZWlnaHQsIGJveClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoeCA9IDAsIHkgPSAwLCBib3ggPSB0aGlzLmJib3goKSkge1xuICBjb25zdCBkeCA9IHggLSBib3gueFxuICBjb25zdCBkeSA9IHkgLSBib3gueVxuXG4gIHJldHVybiB0aGlzLmRtb3ZlKGR4LCBkeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpemUod2lkdGgsIGhlaWdodCwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgY29uc3QgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodCwgYm94KVxuICBjb25zdCBzY2FsZVggPSBwLndpZHRoIC8gYm94LndpZHRoXG4gIGNvbnN0IHNjYWxlWSA9IHAuaGVpZ2h0IC8gYm94LmhlaWdodFxuXG4gIHRoaXMuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGNvbnN0IG8gPSBuZXcgUG9pbnQoYm94KS50cmFuc2Zvcm0obmV3IE1hdHJpeChjaGlsZCkuaW52ZXJzZSgpKVxuICAgIGNoaWxkLnNjYWxlKHNjYWxlWCwgc2NhbGVZLCBvLngsIG8ueSlcbiAgfSlcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgod2lkdGgsIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmICh3aWR0aCA9PSBudWxsKSByZXR1cm4gYm94LndpZHRoXG4gIHJldHVybiB0aGlzLnNpemUod2lkdGgsIGJveC5oZWlnaHQsIGJveClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHgoeCwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHggPT0gbnVsbCkgcmV0dXJuIGJveC54XG4gIHJldHVybiB0aGlzLm1vdmUoeCwgYm94LnksIGJveClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHkoeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHkgPT0gbnVsbCkgcmV0dXJuIGJveC55XG4gIHJldHVybiB0aGlzLm1vdmUoYm94LngsIHksIGJveClcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBub29wKCkge31cblxuLy8gRGVmYXVsdCBhbmltYXRpb24gdmFsdWVzXG5leHBvcnQgY29uc3QgdGltZWxpbmUgPSB7XG4gIGR1cmF0aW9uOiA0MDAsXG4gIGVhc2U6ICc+JyxcbiAgZGVsYXk6IDBcbn1cblxuLy8gRGVmYXVsdCBhdHRyaWJ1dGUgdmFsdWVzXG5leHBvcnQgY29uc3QgYXR0cnMgPSB7XG4gIC8vIGZpbGwgYW5kIHN0cm9rZVxuICAnZmlsbC1vcGFjaXR5JzogMSxcbiAgJ3N0cm9rZS1vcGFjaXR5JzogMSxcbiAgJ3N0cm9rZS13aWR0aCc6IDAsXG4gICdzdHJva2UtbGluZWpvaW4nOiAnbWl0ZXInLFxuICAnc3Ryb2tlLWxpbmVjYXAnOiAnYnV0dCcsXG4gIGZpbGw6ICcjMDAwMDAwJyxcbiAgc3Ryb2tlOiAnIzAwMDAwMCcsXG4gIG9wYWNpdHk6IDEsXG5cbiAgLy8gcG9zaXRpb25cbiAgeDogMCxcbiAgeTogMCxcbiAgY3g6IDAsXG4gIGN5OiAwLFxuXG4gIC8vIHNpemVcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMCxcblxuICAvLyByYWRpdXNcbiAgcjogMCxcbiAgcng6IDAsXG4gIHJ5OiAwLFxuXG4gIC8vIGdyYWRpZW50XG4gIG9mZnNldDogMCxcbiAgJ3N0b3Atb3BhY2l0eSc6IDEsXG4gICdzdG9wLWNvbG9yJzogJyMwMDAwMDAnLFxuXG4gIC8vIHRleHRcbiAgJ3RleHQtYW5jaG9yJzogJ3N0YXJ0J1xufVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi9yZWdleC5qcydcbmltcG9ydCB7IG1ha2VJbnN0YW5jZSB9IGZyb20gJy4uLy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvd2luZG93LmpzJ1xuXG5sZXQgbGlzdGVuZXJJZCA9IDBcbmV4cG9ydCBjb25zdCB3aW5kb3dFdmVudHMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRzKGluc3RhbmNlKSB7XG4gIGxldCBuID0gaW5zdGFuY2UuZ2V0RXZlbnRIb2xkZXIoKVxuXG4gIC8vIFdlIGRvbnQgd2FudCB0byBzYXZlIGV2ZW50cyBpbiBnbG9iYWwgc3BhY2VcbiAgaWYgKG4gPT09IGdsb2JhbHMud2luZG93KSBuID0gd2luZG93RXZlbnRzXG4gIGlmICghbi5ldmVudHMpIG4uZXZlbnRzID0ge31cbiAgcmV0dXJuIG4uZXZlbnRzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudFRhcmdldChpbnN0YW5jZSkge1xuICByZXR1cm4gaW5zdGFuY2UuZ2V0RXZlbnRUYXJnZXQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJFdmVudHMoaW5zdGFuY2UpIHtcbiAgbGV0IG4gPSBpbnN0YW5jZS5nZXRFdmVudEhvbGRlcigpXG4gIGlmIChuID09PSBnbG9iYWxzLndpbmRvdykgbiA9IHdpbmRvd0V2ZW50c1xuICBpZiAobi5ldmVudHMpIG4uZXZlbnRzID0ge31cbn1cblxuLy8gQWRkIGV2ZW50IGJpbmRlciBpbiB0aGUgU1ZHIG5hbWVzcGFjZVxuZXhwb3J0IGZ1bmN0aW9uIG9uKG5vZGUsIGV2ZW50cywgbGlzdGVuZXIsIGJpbmRpbmcsIG9wdGlvbnMpIHtcbiAgY29uc3QgbCA9IGxpc3RlbmVyLmJpbmQoYmluZGluZyB8fCBub2RlKVxuICBjb25zdCBpbnN0YW5jZSA9IG1ha2VJbnN0YW5jZShub2RlKVxuICBjb25zdCBiYWcgPSBnZXRFdmVudHMoaW5zdGFuY2UpXG4gIGNvbnN0IG4gPSBnZXRFdmVudFRhcmdldChpbnN0YW5jZSlcblxuICAvLyBldmVudHMgY2FuIGJlIGFuIGFycmF5IG9mIGV2ZW50cyBvciBhIHN0cmluZyBvZiBldmVudHNcbiAgZXZlbnRzID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogZXZlbnRzLnNwbGl0KGRlbGltaXRlcilcblxuICAvLyBhZGQgaWQgdG8gbGlzdGVuZXJcbiAgaWYgKCFsaXN0ZW5lci5fc3ZnanNMaXN0ZW5lcklkKSB7XG4gICAgbGlzdGVuZXIuX3N2Z2pzTGlzdGVuZXJJZCA9ICsrbGlzdGVuZXJJZFxuICB9XG5cbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgZXYgPSBldmVudC5zcGxpdCgnLicpWzBdXG4gICAgY29uc3QgbnMgPSBldmVudC5zcGxpdCgnLicpWzFdIHx8ICcqJ1xuXG4gICAgLy8gZW5zdXJlIHZhbGlkIG9iamVjdFxuICAgIGJhZ1tldl0gPSBiYWdbZXZdIHx8IHt9XG4gICAgYmFnW2V2XVtuc10gPSBiYWdbZXZdW25zXSB8fCB7fVxuXG4gICAgLy8gcmVmZXJlbmNlIGxpc3RlbmVyXG4gICAgYmFnW2V2XVtuc11bbGlzdGVuZXIuX3N2Z2pzTGlzdGVuZXJJZF0gPSBsXG5cbiAgICAvLyBhZGQgbGlzdGVuZXJcbiAgICBuLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGwsIG9wdGlvbnMgfHwgZmFsc2UpXG4gIH0pXG59XG5cbi8vIEFkZCBldmVudCB1bmJpbmRlciBpbiB0aGUgU1ZHIG5hbWVzcGFjZVxuZXhwb3J0IGZ1bmN0aW9uIG9mZihub2RlLCBldmVudHMsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gbWFrZUluc3RhbmNlKG5vZGUpXG4gIGNvbnN0IGJhZyA9IGdldEV2ZW50cyhpbnN0YW5jZSlcbiAgY29uc3QgbiA9IGdldEV2ZW50VGFyZ2V0KGluc3RhbmNlKVxuXG4gIC8vIGxpc3RlbmVyIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGEgbnVtYmVyXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyLl9zdmdqc0xpc3RlbmVySWRcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm5cbiAgfVxuXG4gIC8vIGV2ZW50cyBjYW4gYmUgYW4gYXJyYXkgb2YgZXZlbnRzIG9yIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFxuICBldmVudHMgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiAoZXZlbnRzIHx8ICcnKS5zcGxpdChkZWxpbWl0ZXIpXG5cbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgZXYgPSBldmVudCAmJiBldmVudC5zcGxpdCgnLicpWzBdXG4gICAgY29uc3QgbnMgPSBldmVudCAmJiBldmVudC5zcGxpdCgnLicpWzFdXG4gICAgbGV0IG5hbWVzcGFjZSwgbFxuXG4gICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXIgcmVmZXJlbmNlXG4gICAgICBpZiAoYmFnW2V2XSAmJiBiYWdbZXZdW25zIHx8ICcqJ10pIHtcbiAgICAgICAgLy8gcmVtb3ZlTGlzdGVuZXJcbiAgICAgICAgbi5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGV2LFxuICAgICAgICAgIGJhZ1tldl1bbnMgfHwgJyonXVtsaXN0ZW5lcl0sXG4gICAgICAgICAgb3B0aW9ucyB8fCBmYWxzZVxuICAgICAgICApXG5cbiAgICAgICAgZGVsZXRlIGJhZ1tldl1bbnMgfHwgJyonXVtsaXN0ZW5lcl1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2ICYmIG5zKSB7XG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSBuYW1lc3BhY2VkIGV2ZW50XG4gICAgICBpZiAoYmFnW2V2XSAmJiBiYWdbZXZdW25zXSkge1xuICAgICAgICBmb3IgKGwgaW4gYmFnW2V2XVtuc10pIHtcbiAgICAgICAgICBvZmYobiwgW2V2LCBuc10uam9pbignLicpLCBsKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGJhZ1tldl1bbnNdXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChucykge1xuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIGEgc3BlY2lmaWMgbmFtZXNwYWNlXG4gICAgICBmb3IgKGV2ZW50IGluIGJhZykge1xuICAgICAgICBmb3IgKG5hbWVzcGFjZSBpbiBiYWdbZXZlbnRdKSB7XG4gICAgICAgICAgaWYgKG5zID09PSBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgIG9mZihuLCBbZXZlbnQsIG5zXS5qb2luKCcuJykpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChldikge1xuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudFxuICAgICAgaWYgKGJhZ1tldl0pIHtcbiAgICAgICAgZm9yIChuYW1lc3BhY2UgaW4gYmFnW2V2XSkge1xuICAgICAgICAgIG9mZihuLCBbZXYsIG5hbWVzcGFjZV0uam9pbignLicpKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGJhZ1tldl1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gYSBnaXZlbiBub2RlXG4gICAgICBmb3IgKGV2ZW50IGluIGJhZykge1xuICAgICAgICBvZmYobiwgZXZlbnQpXG4gICAgICB9XG5cbiAgICAgIGNsZWFyRXZlbnRzKGluc3RhbmNlKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGV2ZW50LCBkYXRhLCBvcHRpb25zKSB7XG4gIGNvbnN0IG4gPSBnZXRFdmVudFRhcmdldChub2RlKVxuXG4gIC8vIERpc3BhdGNoIGV2ZW50XG4gIGlmIChldmVudCBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93LkV2ZW50KSB7XG4gICAgbi5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gbmV3IGdsb2JhbHMud2luZG93LkN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgICBkZXRhaWw6IGRhdGEsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pXG4gICAgbi5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9XG4gIHJldHVybiBldmVudFxufVxuIiwiaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi8uLi90eXBlcy9TVkdOdW1iZXIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tKHgsIHkpIHtcbiAgcmV0dXJuICh0aGlzLl9lbGVtZW50IHx8IHRoaXMpLnR5cGUgPT09ICdyYWRpYWxHcmFkaWVudCdcbiAgICA/IHRoaXMuYXR0cih7IGZ4OiBuZXcgU1ZHTnVtYmVyKHgpLCBmeTogbmV3IFNWR051bWJlcih5KSB9KVxuICAgIDogdGhpcy5hdHRyKHsgeDE6IG5ldyBTVkdOdW1iZXIoeCksIHkxOiBuZXcgU1ZHTnVtYmVyKHkpIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0byh4LCB5KSB7XG4gIHJldHVybiAodGhpcy5fZWxlbWVudCB8fCB0aGlzKS50eXBlID09PSAncmFkaWFsR3JhZGllbnQnXG4gICAgPyB0aGlzLmF0dHIoeyBjeDogbmV3IFNWR051bWJlcih4KSwgY3k6IG5ldyBTVkdOdW1iZXIoeSkgfSlcbiAgICA6IHRoaXMuYXR0cih7IHgyOiBuZXcgU1ZHTnVtYmVyKHgpLCB5MjogbmV3IFNWR051bWJlcih5KSB9KVxufVxuIiwiLy8gRGVmYXVsdCBuYW1lc3BhY2VzXG5leHBvcnQgY29uc3Qgc3ZnID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuZXhwb3J0IGNvbnN0IGh0bWwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbmV4cG9ydCBjb25zdCB4bWxucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLydcbmV4cG9ydCBjb25zdCB4bGluayA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xuIiwiaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCB7IG1ha2VJbnN0YW5jZSB9IGZyb20gJy4uLy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlcigpIHtcbiAgLy8gUmV1c2UgY2FjaGVkIGVsZW1lbnQgaWYgcG9zc2libGVcbiAgaWYgKCFwYXJzZXIubm9kZXMpIHtcbiAgICBjb25zdCBzdmcgPSBtYWtlSW5zdGFuY2UoKS5zaXplKDIsIDApXG4gICAgc3ZnLm5vZGUuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICdvcGFjaXR5OiAwJyxcbiAgICAgICdwb3NpdGlvbjogYWJzb2x1dGUnLFxuICAgICAgJ2xlZnQ6IC0xMDAlJyxcbiAgICAgICd0b3A6IC0xMDAlJyxcbiAgICAgICdvdmVyZmxvdzogaGlkZGVuJ1xuICAgIF0uam9pbignOycpXG5cbiAgICBzdmcuYXR0cignZm9jdXNhYmxlJywgJ2ZhbHNlJylcbiAgICBzdmcuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG5cbiAgICBjb25zdCBwYXRoID0gc3ZnLnBhdGgoKS5ub2RlXG5cbiAgICBwYXJzZXIubm9kZXMgPSB7IHN2ZywgcGF0aCB9XG4gIH1cblxuICBpZiAoIXBhcnNlci5ub2Rlcy5zdmcubm9kZS5wYXJlbnROb2RlKSB7XG4gICAgY29uc3QgYiA9IGdsb2JhbHMuZG9jdW1lbnQuYm9keSB8fCBnbG9iYWxzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIHBhcnNlci5ub2Rlcy5zdmcuYWRkVG8oYilcbiAgfVxuXG4gIHJldHVybiBwYXJzZXIubm9kZXNcbn1cbiIsImltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uLy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXG5cbmV4cG9ydCBjb25zdCBNb3JwaEFycmF5ID0gUG9pbnRBcnJheVxuXG4vLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHgtYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIHgoeCkge1xuICByZXR1cm4geCA9PSBudWxsID8gdGhpcy5iYm94KCkueCA6IHRoaXMubW92ZSh4LCB0aGlzLmJib3goKS55KVxufVxuXG4vLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHktYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIHkoeSkge1xuICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5iYm94KCkueSA6IHRoaXMubW92ZSh0aGlzLmJib3goKS54LCB5KVxufVxuXG4vLyBTZXQgd2lkdGggb2YgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKHdpZHRoKSB7XG4gIGNvbnN0IGIgPSB0aGlzLmJib3goKVxuICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IGIud2lkdGggOiB0aGlzLnNpemUod2lkdGgsIGIuaGVpZ2h0KVxufVxuXG4vLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoaGVpZ2h0KSB7XG4gIGNvbnN0IGIgPSB0aGlzLmJib3goKVxuICByZXR1cm4gaGVpZ2h0ID09IG51bGwgPyBiLmhlaWdodCA6IHRoaXMuc2l6ZShiLndpZHRoLCBoZWlnaHQpXG59XG4iLCJpbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuLi8uLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xuXG4vLyBHZXQgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBhcnJheSgpIHtcbiAgcmV0dXJuIHRoaXMuX2FycmF5IHx8ICh0aGlzLl9hcnJheSA9IG5ldyBQb2ludEFycmF5KHRoaXMuYXR0cigncG9pbnRzJykpKVxufVxuXG4vLyBDbGVhciBhcnJheSBjYWNoZVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xuICBkZWxldGUgdGhpcy5fYXJyYXlcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlKHgsIHkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgdGhpcy5hcnJheSgpLm1vdmUoeCwgeSkpXG59XG5cbi8vIFBsb3QgbmV3IHBhdGhcbmV4cG9ydCBmdW5jdGlvbiBwbG90KHApIHtcbiAgcmV0dXJuIHAgPT0gbnVsbFxuICAgID8gdGhpcy5hcnJheSgpXG4gICAgOiB0aGlzLmNsZWFyKCkuYXR0cihcbiAgICAgICAgJ3BvaW50cycsXG4gICAgICAgIHR5cGVvZiBwID09PSAnc3RyaW5nJyA/IHAgOiAodGhpcy5fYXJyYXkgPSBuZXcgUG9pbnRBcnJheShwKSlcbiAgICAgIClcbn1cblxuLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XG5leHBvcnQgZnVuY3Rpb24gc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXG4gIHJldHVybiB0aGlzLmF0dHIoJ3BvaW50cycsIHRoaXMuYXJyYXkoKS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcbn1cbiIsIi8vIFBhcnNlIHVuaXQgdmFsdWVcbmV4cG9ydCBjb25zdCBudW1iZXJBbmRVbml0ID1cbiAgL14oWystXT8oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/KShbYS16JV0qKSQvaVxuXG4vLyBQYXJzZSBoZXggdmFsdWVcbmV4cG9ydCBjb25zdCBoZXggPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pXG5cbi8vIFBhcnNlIHJnYiB2YWx1ZVxuZXhwb3J0IGNvbnN0IHJnYiA9IC9yZ2JcXCgoXFxkKyksKFxcZCspLChcXGQrKVxcKS9cblxuLy8gUGFyc2UgcmVmZXJlbmNlIGlkXG5leHBvcnQgY29uc3QgcmVmZXJlbmNlID0gLygjW2Etel9dW2EtejAtOVxcLV9dKikvaVxuXG4vLyBzcGxpdHMgYSB0cmFuc2Zvcm1hdGlvbiBjaGFpblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybXMgPSAvXFwpXFxzKiw/XFxzKi9cblxuLy8gV2hpdGVzcGFjZVxuZXhwb3J0IGNvbnN0IHdoaXRlc3BhY2UgPSAvXFxzL2dcblxuLy8gVGVzdCBoZXggdmFsdWVcbmV4cG9ydCBjb25zdCBpc0hleCA9IC9eI1thLWYwLTldezN9JHxeI1thLWYwLTldezZ9JC9pXG5cbi8vIFRlc3QgcmdiIHZhbHVlXG5leHBvcnQgY29uc3QgaXNSZ2IgPSAvXnJnYlxcKC9cblxuLy8gVGVzdCBmb3IgYmxhbmsgc3RyaW5nXG5leHBvcnQgY29uc3QgaXNCbGFuayA9IC9eKFxccyspPyQvXG5cbi8vIFRlc3QgZm9yIG51bWVyaWMgc3RyaW5nXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSAvXlsrLV0/KFxcZCsoXFwuXFxkKik/fFxcLlxcZCspKGVbKy1dP1xcZCspPyQvaVxuXG4vLyBUZXN0IGZvciBpbWFnZSB1cmxcbmV4cG9ydCBjb25zdCBpc0ltYWdlID0gL1xcLihqcGd8anBlZ3xwbmd8Z2lmfHN2ZykoXFw/W149XSsuKik/L2lcblxuLy8gc3BsaXQgYXQgd2hpdGVzcGFjZSBhbmQgY29tbWFcbmV4cG9ydCBjb25zdCBkZWxpbWl0ZXIgPSAvW1xccyxdKy9cblxuLy8gVGVzdCBmb3IgcGF0aCBsZXR0ZXJcbmV4cG9ydCBjb25zdCBpc1BhdGhMZXR0ZXIgPSAvW01MSFZDU1FUQVpdL2lcbiIsImltcG9ydCB7IGFkb3B0IH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi8uLi91dGlscy93aW5kb3cuanMnXG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi8uLi91dGlscy91dGlscy5qcydcbmltcG9ydCBMaXN0IGZyb20gJy4uLy4uL3R5cGVzL0xpc3QuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJhc2VGaW5kKHF1ZXJ5LCBwYXJlbnQpIHtcbiAgcmV0dXJuIG5ldyBMaXN0KFxuICAgIG1hcCgocGFyZW50IHx8IGdsb2JhbHMuZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIGFkb3B0KG5vZGUpXG4gICAgfSlcbiAgKVxufVxuXG4vLyBTY29wZWQgZmluZCBtZXRob2RcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHF1ZXJ5KSB7XG4gIHJldHVybiBiYXNlRmluZChxdWVyeSwgdGhpcy5ub2RlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZE9uZShxdWVyeSkge1xuICByZXR1cm4gYWRvcHQodGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IocXVlcnkpKVxufVxuIiwiaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcblxuLy8gQ3JlYXRlIHBsYWluIHRleHQgbm9kZVxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluKHRleHQpIHtcbiAgLy8gY2xlYXIgaWYgYnVpbGQgbW9kZSBpcyBkaXNhYmxlZFxuICBpZiAodGhpcy5fYnVpbGQgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5jbGVhcigpXG4gIH1cblxuICAvLyBjcmVhdGUgdGV4dCBub2RlXG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChnbG9iYWxzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEdldCBsZW5ndGggb2YgdGV4dCBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKCkge1xuICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXB1dGVkVGV4dExlbmd0aCgpXG59XG5cbi8vIE1vdmUgb3ZlciB4LWF4aXNcbi8vIFRleHQgaXMgbW92ZWQgYnkgaXRzIGJvdW5kaW5nIGJveFxuLy8gdGV4dC1hbmNob3IgZG9lcyBOT1QgbWF0dGVyXG5leHBvcnQgZnVuY3Rpb24geCh4LCBib3ggPSB0aGlzLmJib3goKSkge1xuICBpZiAoeCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGJveC54XG4gIH1cblxuICByZXR1cm4gdGhpcy5hdHRyKCd4JywgdGhpcy5hdHRyKCd4JykgKyB4IC0gYm94LngpXG59XG5cbi8vIE1vdmUgb3ZlciB5LWF4aXNcbmV4cG9ydCBmdW5jdGlvbiB5KHksIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmICh5ID09IG51bGwpIHtcbiAgICByZXR1cm4gYm94LnlcbiAgfVxuXG4gIHJldHVybiB0aGlzLmF0dHIoJ3knLCB0aGlzLmF0dHIoJ3knKSArIHkgLSBib3gueSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoeCwgeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgcmV0dXJuIHRoaXMueCh4LCBib3gpLnkoeSwgYm94KVxufVxuXG4vLyBNb3ZlIGNlbnRlciBvdmVyIHgtYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIGN4KHgsIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmICh4ID09IG51bGwpIHtcbiAgICByZXR1cm4gYm94LmN4XG4gIH1cblxuICByZXR1cm4gdGhpcy5hdHRyKCd4JywgdGhpcy5hdHRyKCd4JykgKyB4IC0gYm94LmN4KVxufVxuXG4vLyBNb3ZlIGNlbnRlciBvdmVyIHktYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIGN5KHksIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmICh5ID09IG51bGwpIHtcbiAgICByZXR1cm4gYm94LmN5XG4gIH1cblxuICByZXR1cm4gdGhpcy5hdHRyKCd5JywgdGhpcy5hdHRyKCd5JykgKyB5IC0gYm94LmN5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyKHgsIHksIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIHJldHVybiB0aGlzLmN4KHgsIGJveCkuY3koeSwgYm94KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXgoeCkge1xuICByZXR1cm4gdGhpcy5hdHRyKCd4JywgeClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF5KHkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cigneScsIHkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbW92ZSh4LCB5KSB7XG4gIHJldHVybiB0aGlzLmF4KHgpLmF5KHkpXG59XG5cbi8vIEVuYWJsZSAvIGRpc2FibGUgYnVpbGQgbW9kZVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkKGJ1aWxkKSB7XG4gIHRoaXMuX2J1aWxkID0gISFidWlsZFxuICByZXR1cm4gdGhpc1xufVxuIiwiaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXG5cbi8vIEdldCBhbGwgc2libGluZ3MsIGluY2x1ZGluZyBteXNlbGZcbmV4cG9ydCBmdW5jdGlvbiBzaWJsaW5ncygpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKVxufVxuXG4vLyBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gc2libGluZ3NcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50KCkuaW5kZXgodGhpcylcbn1cblxuLy8gR2V0IHRoZSBuZXh0IGVsZW1lbnQgKHdpbGwgcmV0dXJuIG51bGwgaWYgdGhlcmUgaXMgbm9uZSlcbmV4cG9ydCBmdW5jdGlvbiBuZXh0KCkge1xuICByZXR1cm4gdGhpcy5zaWJsaW5ncygpW3RoaXMucG9zaXRpb24oKSArIDFdXG59XG5cbi8vIEdldCB0aGUgbmV4dCBlbGVtZW50ICh3aWxsIHJldHVybiBudWxsIGlmIHRoZXJlIGlzIG5vbmUpXG5leHBvcnQgZnVuY3Rpb24gcHJldigpIHtcbiAgcmV0dXJuIHRoaXMuc2libGluZ3MoKVt0aGlzLnBvc2l0aW9uKCkgLSAxXVxufVxuXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgb25lIHN0ZXAgZm9yd2FyZFxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKSB7XG4gIGNvbnN0IGkgPSB0aGlzLnBvc2l0aW9uKClcbiAgY29uc3QgcCA9IHRoaXMucGFyZW50KClcblxuICAvLyBtb3ZlIG5vZGUgb25lIHN0ZXAgZm9yd2FyZFxuICBwLmFkZCh0aGlzLnJlbW92ZSgpLCBpICsgMSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgb25lIHN0ZXAgYmFja3dhcmRcbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZCgpIHtcbiAgY29uc3QgaSA9IHRoaXMucG9zaXRpb24oKVxuICBjb25zdCBwID0gdGhpcy5wYXJlbnQoKVxuXG4gIHAuYWRkKHRoaXMucmVtb3ZlKCksIGkgPyBpIC0gMSA6IDApXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2VuZCBnaXZlbiBlbGVtZW50IGFsbCB0aGUgd2F5IHRvIHRoZSBmcm9udFxuZXhwb3J0IGZ1bmN0aW9uIGZyb250KCkge1xuICBjb25zdCBwID0gdGhpcy5wYXJlbnQoKVxuXG4gIC8vIE1vdmUgbm9kZSBmb3J3YXJkXG4gIHAuYWRkKHRoaXMucmVtb3ZlKCkpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2VuZCBnaXZlbiBlbGVtZW50IGFsbCB0aGUgd2F5IHRvIHRoZSBiYWNrXG5leHBvcnQgZnVuY3Rpb24gYmFjaygpIHtcbiAgY29uc3QgcCA9IHRoaXMucGFyZW50KClcblxuICAvLyBNb3ZlIG5vZGUgYmFja1xuICBwLmFkZCh0aGlzLnJlbW92ZSgpLCAwKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEluc2VydHMgYSBnaXZlbiBlbGVtZW50IGJlZm9yZSB0aGUgdGFyZ2V0ZWQgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZShlbGVtZW50KSB7XG4gIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcbiAgZWxlbWVudC5yZW1vdmUoKVxuXG4gIGNvbnN0IGkgPSB0aGlzLnBvc2l0aW9uKClcblxuICB0aGlzLnBhcmVudCgpLmFkZChlbGVtZW50LCBpKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEluc2VydHMgYSBnaXZlbiBlbGVtZW50IGFmdGVyIHRoZSB0YXJnZXRlZCBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXIoZWxlbWVudCkge1xuICBlbGVtZW50ID0gbWFrZUluc3RhbmNlKGVsZW1lbnQpXG4gIGVsZW1lbnQucmVtb3ZlKClcblxuICBjb25zdCBpID0gdGhpcy5wb3NpdGlvbigpXG5cbiAgdGhpcy5wYXJlbnQoKS5hZGQoZWxlbWVudCwgaSArIDEpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShlbGVtZW50KSB7XG4gIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcbiAgZWxlbWVudC5iZWZvcmUodGhpcylcbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKGVsZW1lbnQpIHtcbiAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxuICBlbGVtZW50LmFmdGVyKHRoaXMpXG4gIHJldHVybiB0aGlzXG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywge1xuICBzaWJsaW5ncyxcbiAgcG9zaXRpb24sXG4gIG5leHQsXG4gIHByZXYsXG4gIGZvcndhcmQsXG4gIGJhY2t3YXJkLFxuICBmcm9udCxcbiAgYmFjayxcbiAgYmVmb3JlLFxuICBhZnRlcixcbiAgaW5zZXJ0QmVmb3JlLFxuICBpbnNlcnRBZnRlclxufSlcbiIsImltcG9ydCB7IGRlbGltaXRlciB9IGZyb20gJy4uL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xuXG4vLyBSZXR1cm4gYXJyYXkgb2YgY2xhc3NlcyBvbiB0aGUgbm9kZVxuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzZXMoKSB7XG4gIGNvbnN0IGF0dHIgPSB0aGlzLmF0dHIoJ2NsYXNzJylcbiAgcmV0dXJuIGF0dHIgPT0gbnVsbCA/IFtdIDogYXR0ci50cmltKCkuc3BsaXQoZGVsaW1pdGVyKVxufVxuXG4vLyBSZXR1cm4gdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gdGhlIG5vZGUsIGZhbHNlIG90aGVyd2lzZVxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuY2xhc3NlcygpLmluZGV4T2YobmFtZSkgIT09IC0xXG59XG5cbi8vIEFkZCBjbGFzcyB0byB0aGUgbm9kZVxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5hbWUpIHtcbiAgaWYgKCF0aGlzLmhhc0NsYXNzKG5hbWUpKSB7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLmNsYXNzZXMoKVxuICAgIGFycmF5LnB1c2gobmFtZSlcbiAgICB0aGlzLmF0dHIoJ2NsYXNzJywgYXJyYXkuam9pbignICcpKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gUmVtb3ZlIGNsYXNzIGZyb20gdGhlIG5vZGVcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzcyhuYW1lKSB7XG4gIGlmICh0aGlzLmhhc0NsYXNzKG5hbWUpKSB7XG4gICAgdGhpcy5hdHRyKFxuICAgICAgJ2NsYXNzJyxcbiAgICAgIHRoaXMuY2xhc3NlcygpXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyAhPT0gbmFtZVxuICAgICAgICB9KVxuICAgICAgICAuam9pbignICcpXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gVG9nZ2xlIHRoZSBwcmVzZW5jZSBvZiBhIGNsYXNzIG9uIHRoZSBub2RlXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3MobmFtZSkge1xuICByZXR1cm4gdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMucmVtb3ZlQ2xhc3MobmFtZSkgOiB0aGlzLmFkZENsYXNzKG5hbWUpXG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywge1xuICBjbGFzc2VzLFxuICBoYXNDbGFzcyxcbiAgYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzLFxuICB0b2dnbGVDbGFzc1xufSlcbiIsImltcG9ydCB7IGlzQmxhbmsgfSBmcm9tICcuLi9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcblxuLy8gRHluYW1pYyBzdHlsZSBnZW5lcmF0b3JcbmV4cG9ydCBmdW5jdGlvbiBjc3Moc3R5bGUsIHZhbCkge1xuICBjb25zdCByZXQgPSB7fVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIGdldCBmdWxsIHN0eWxlIGFzIG9iamVjdFxuICAgIHRoaXMubm9kZS5zdHlsZS5jc3NUZXh0XG4gICAgICAuc3BsaXQoL1xccyo7XFxzKi8pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gISFlbC5sZW5ndGhcbiAgICAgIH0pXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgY29uc3QgdCA9IGVsLnNwbGl0KC9cXHMqOlxccyovKVxuICAgICAgICByZXRbdFswXV0gPSB0WzFdXG4gICAgICB9KVxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIC8vIGdldCBzdHlsZSBwcm9wZXJ0aWVzIGFzIGFycmF5XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygc3R5bGUpIHtcbiAgICAgICAgY29uc3QgY2FzZWQgPSBuYW1lXG4gICAgICAgIHJldFtuYW1lXSA9IHRoaXMubm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGNhc2VkKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIC8vIGdldCBzdHlsZSBmb3IgcHJvcGVydHlcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlKVxuICAgIH1cblxuICAgIC8vIHNldCBzdHlsZXMgaW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZSkge1xuICAgICAgICAvLyBzZXQgZW1wdHkgc3RyaW5nIGlmIG51bGwvdW5kZWZpbmVkLycnIHdhcyBnaXZlblxuICAgICAgICB0aGlzLm5vZGUuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzdHlsZVtuYW1lXSA9PSBudWxsIHx8IGlzQmxhbmsudGVzdChzdHlsZVtuYW1lXSkgPyAnJyA6IHN0eWxlW25hbWVdXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBzZXQgc3R5bGUgZm9yIHByb3BlcnR5XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdGhpcy5ub2RlLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgc3R5bGUsXG4gICAgICB2YWwgPT0gbnVsbCB8fCBpc0JsYW5rLnRlc3QodmFsKSA/ICcnIDogdmFsXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2hvdyBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gc2hvdygpIHtcbiAgcmV0dXJuIHRoaXMuY3NzKCdkaXNwbGF5JywgJycpXG59XG5cbi8vIEhpZGUgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUoKSB7XG4gIHJldHVybiB0aGlzLmNzcygnZGlzcGxheScsICdub25lJylcbn1cblxuLy8gSXMgZWxlbWVudCB2aXNpYmxlP1xuZXhwb3J0IGZ1bmN0aW9uIHZpc2libGUoKSB7XG4gIHJldHVybiB0aGlzLmNzcygnZGlzcGxheScpICE9PSAnbm9uZSdcbn1cblxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7XG4gIGNzcyxcbiAgc2hvdyxcbiAgaGlkZSxcbiAgdmlzaWJsZVxufSlcbiIsImltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJ1xuXG4vLyBTdG9yZSBkYXRhIHZhbHVlcyBvbiBzdmcgbm9kZXNcbmV4cG9ydCBmdW5jdGlvbiBkYXRhKGEsIHYsIHIpIHtcbiAgaWYgKGEgPT0gbnVsbCkge1xuICAgIC8vIGdldCBhbiBvYmplY3Qgb2YgYXR0cmlidXRlc1xuICAgIHJldHVybiB0aGlzLmRhdGEoXG4gICAgICBtYXAoXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICB0aGlzLm5vZGUuYXR0cmlidXRlcyxcbiAgICAgICAgICAoZWwpID0+IGVsLm5vZGVOYW1lLmluZGV4T2YoJ2RhdGEtJykgPT09IDBcbiAgICAgICAgKSxcbiAgICAgICAgKGVsKSA9PiBlbC5ub2RlTmFtZS5zbGljZSg1KVxuICAgICAgKVxuICAgIClcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBjb25zdCBkYXRhID0ge31cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBhKSB7XG4gICAgICBkYXRhW2tleV0gPSB0aGlzLmRhdGEoa2V5KVxuICAgIH1cbiAgICByZXR1cm4gZGF0YVxuICB9IGVsc2UgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodiBpbiBhKSB7XG4gICAgICB0aGlzLmRhdGEodiwgYVt2XSlcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5hdHRyKCdkYXRhLScgKyBhKSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdkYXRhLScgKyBhKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLmF0dHIoXG4gICAgICAnZGF0YS0nICsgYSxcbiAgICAgIHYgPT09IG51bGxcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogciA9PT0gdHJ1ZSB8fCB0eXBlb2YgdiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgICAgICAgPyB2XG4gICAgICAgICAgOiBKU09OLnN0cmluZ2lmeSh2KVxuICAgIClcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywgeyBkYXRhIH0pXG4iLCJpbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xuXG4vLyBSZW1lbWJlciBhcmJpdHJhcnkgZGF0YVxuZXhwb3J0IGZ1bmN0aW9uIHJlbWVtYmVyKGssIHYpIHtcbiAgLy8gcmVtZW1iZXIgZXZlcnkgaXRlbSBpbiBhbiBvYmplY3QgaW5kaXZpZHVhbGx5XG4gIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGspIHtcbiAgICAgIHRoaXMucmVtZW1iZXIoa2V5LCBrW2tleV0pXG4gICAgfVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyByZXRyaWV2ZSBtZW1vcnlcbiAgICByZXR1cm4gdGhpcy5tZW1vcnkoKVtrXVxuICB9IGVsc2Uge1xuICAgIC8vIHN0b3JlIG1lbW9yeVxuICAgIHRoaXMubWVtb3J5KClba10gPSB2XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBFcmFzZSBhIGdpdmVuIG1lbW9yeVxuZXhwb3J0IGZ1bmN0aW9uIGZvcmdldCgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9tZW1vcnkgPSB7fVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm1lbW9yeSgpW2FyZ3VtZW50c1tpXV1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gVGhpcyB0cmlnZ2VycyBjcmVhdGlvbiBvZiBhIG5ldyBoaWRkZW4gY2xhc3Mgd2hpY2ggaXMgbm90IHBlcmZvcm1hbnRcbi8vIEhvd2V2ZXIsIHRoaXMgZnVuY3Rpb24gaXMgbm90IHJhcmVseSB1c2VkIHNvIGl0IHdpbGwgbm90IGhhcHBlbiBmcmVxdWVudGx5XG4vLyBSZXR1cm4gbG9jYWwgbWVtb3J5IG9iamVjdFxuZXhwb3J0IGZ1bmN0aW9uIG1lbW9yeSgpIHtcbiAgcmV0dXJuICh0aGlzLl9tZW1vcnkgPSB0aGlzLl9tZW1vcnkgfHwge30pXG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywgeyByZW1lbWJlciwgZm9yZ2V0LCBtZW1vcnkgfSlcbiIsImltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29sb3IgZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3IuanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuLi8uLi9lbGVtZW50cy9FbGVtZW50LmpzJ1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuLi8uLi90eXBlcy9NYXRyaXguanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vdHlwZXMvUG9pbnQuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uLy4uL3R5cGVzL1NWR051bWJlci5qcydcblxuLy8gRGVmaW5lIGxpc3Qgb2YgYXZhaWxhYmxlIGF0dHJpYnV0ZXMgZm9yIHN0cm9rZSBhbmQgZmlsbFxuY29uc3Qgc3VnYXIgPSB7XG4gIHN0cm9rZTogW1xuICAgICdjb2xvcicsXG4gICAgJ3dpZHRoJyxcbiAgICAnb3BhY2l0eScsXG4gICAgJ2xpbmVjYXAnLFxuICAgICdsaW5lam9pbicsXG4gICAgJ21pdGVybGltaXQnLFxuICAgICdkYXNoYXJyYXknLFxuICAgICdkYXNob2Zmc2V0J1xuICBdLFxuICBmaWxsOiBbJ2NvbG9yJywgJ29wYWNpdHknLCAncnVsZSddLFxuICBwcmVmaXg6IGZ1bmN0aW9uICh0LCBhKSB7XG4gICAgcmV0dXJuIGEgPT09ICdjb2xvcicgPyB0IDogdCArICctJyArIGFcbiAgfVxufVxuXG4vLyBBZGQgc3VnYXIgZm9yIGZpbGwgYW5kIHN0cm9rZVxuO1snZmlsbCcsICdzdHJva2UnXS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gIGNvbnN0IGV4dGVuc2lvbiA9IHt9XG4gIGxldCBpXG5cbiAgZXh0ZW5zaW9uW21dID0gZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAodHlwZW9mIG8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyKG0pXG4gICAgfVxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvID09PSAnc3RyaW5nJyB8fFxuICAgICAgbyBpbnN0YW5jZW9mIENvbG9yIHx8XG4gICAgICBDb2xvci5pc1JnYihvKSB8fFxuICAgICAgbyBpbnN0YW5jZW9mIEVsZW1lbnRcbiAgICApIHtcbiAgICAgIHRoaXMuYXR0cihtLCBvKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQgYWxsIGF0dHJpYnV0ZXMgZnJvbSBzdWdhci5maWxsIGFuZCBzdWdhci5zdHJva2UgbGlzdFxuICAgICAgZm9yIChpID0gc3VnYXJbbV0ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKG9bc3VnYXJbbV1baV1dICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmF0dHIoc3VnYXIucHJlZml4KG0sIHN1Z2FyW21dW2ldKSwgb1tzdWdhclttXVtpXV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVnaXN0ZXJNZXRob2RzKFsnRWxlbWVudCcsICdSdW5uZXInXSwgZXh0ZW5zaW9uKVxufSlcblxucmVnaXN0ZXJNZXRob2RzKFsnRWxlbWVudCcsICdSdW5uZXInXSwge1xuICAvLyBMZXQgdGhlIHVzZXIgc2V0IHRoZSBtYXRyaXggZGlyZWN0bHlcbiAgbWF0cml4OiBmdW5jdGlvbiAobWF0LCBiLCBjLCBkLCBlLCBmKSB7XG4gICAgLy8gQWN0IGFzIGEgZ2V0dGVyXG4gICAgaWYgKG1hdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzKVxuICAgIH1cblxuICAgIC8vIEFjdCBhcyBhIHNldHRlciwgdGhlIHVzZXIgY2FuIHBhc3MgYSBtYXRyaXggb3IgYSBzZXQgb2YgbnVtYmVyc1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ3RyYW5zZm9ybScsIG5ldyBNYXRyaXgobWF0LCBiLCBjLCBkLCBlLCBmKSlcbiAgfSxcblxuICAvLyBNYXAgcm90YXRpb24gdG8gdHJhbnNmb3JtXG4gIHJvdGF0ZTogZnVuY3Rpb24gKGFuZ2xlLCBjeCwgY3kpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyByb3RhdGU6IGFuZ2xlLCBveDogY3gsIG95OiBjeSB9LCB0cnVlKVxuICB9LFxuXG4gIC8vIE1hcCBza2V3IHRvIHRyYW5zZm9ybVxuICBza2V3OiBmdW5jdGlvbiAoeCwgeSwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gM1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybSh7IHNrZXc6IHgsIG94OiB5LCBveTogY3ggfSwgdHJ1ZSlcbiAgICAgIDogdGhpcy50cmFuc2Zvcm0oeyBza2V3OiBbeCwgeV0sIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXG4gIH0sXG5cbiAgc2hlYXI6IGZ1bmN0aW9uIChsYW0sIGN4LCBjeSkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHNoZWFyOiBsYW0sIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gTWFwIHNjYWxlIHRvIHRyYW5zZm9ybVxuICBzY2FsZTogZnVuY3Rpb24gKHgsIHksIGN4LCBjeSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDNcbiAgICAgID8gdGhpcy50cmFuc2Zvcm0oeyBzY2FsZTogeCwgb3g6IHksIG95OiBjeCB9LCB0cnVlKVxuICAgICAgOiB0aGlzLnRyYW5zZm9ybSh7IHNjYWxlOiBbeCwgeV0sIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gTWFwIHRyYW5zbGF0ZSB0byB0cmFuc2Zvcm1cbiAgdHJhbnNsYXRlOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHRyYW5zbGF0ZTogW3gsIHldIH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gTWFwIHJlbGF0aXZlIHRyYW5zbGF0aW9ucyB0byB0cmFuc2Zvcm1cbiAgcmVsYXRpdmU6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgcmVsYXRpdmU6IFt4LCB5XSB9LCB0cnVlKVxuICB9LFxuXG4gIC8vIE1hcCBmbGlwIHRvIHRyYW5zZm9ybVxuICBmbGlwOiBmdW5jdGlvbiAoZGlyZWN0aW9uID0gJ2JvdGgnLCBvcmlnaW4gPSAnY2VudGVyJykge1xuICAgIGlmICgneHlib3RodHJ1ZScuaW5kZXhPZihkaXJlY3Rpb24pID09PSAtMSkge1xuICAgICAgb3JpZ2luID0gZGlyZWN0aW9uXG4gICAgICBkaXJlY3Rpb24gPSAnYm90aCdcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBmbGlwOiBkaXJlY3Rpb24sIG9yaWdpbjogb3JpZ2luIH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gT3BhY2l0eVxuICBvcGFjaXR5OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdvcGFjaXR5JywgdmFsdWUpXG4gIH1cbn0pXG5cbnJlZ2lzdGVyTWV0aG9kcygncmFkaXVzJywge1xuICAvLyBBZGQgeCBhbmQgeSByYWRpdXNcbiAgcmFkaXVzOiBmdW5jdGlvbiAoeCwgeSA9IHgpIHtcbiAgICBjb25zdCB0eXBlID0gKHRoaXMuX2VsZW1lbnQgfHwgdGhpcykudHlwZVxuICAgIHJldHVybiB0eXBlID09PSAncmFkaWFsR3JhZGllbnQnXG4gICAgICA/IHRoaXMuYXR0cigncicsIG5ldyBTVkdOdW1iZXIoeCkpXG4gICAgICA6IHRoaXMucngoeCkucnkoeSlcbiAgfVxufSlcblxucmVnaXN0ZXJNZXRob2RzKCdQYXRoJywge1xuICAvLyBHZXQgcGF0aCBsZW5ndGhcbiAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5nZXRUb3RhbExlbmd0aCgpXG4gIH0sXG4gIC8vIEdldCBwb2ludCBhdCBsZW5ndGhcbiAgcG9pbnRBdDogZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5ub2RlLmdldFBvaW50QXRMZW5ndGgobGVuZ3RoKSlcbiAgfVxufSlcblxucmVnaXN0ZXJNZXRob2RzKFsnRWxlbWVudCcsICdSdW5uZXInXSwge1xuICAvLyBTZXQgZm9udFxuICBmb250OiBmdW5jdGlvbiAoYSwgdikge1xuICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodiBpbiBhKSB0aGlzLmZvbnQodiwgYVt2XSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgcmV0dXJuIGEgPT09ICdsZWFkaW5nJ1xuICAgICAgPyB0aGlzLmxlYWRpbmcodilcbiAgICAgIDogYSA9PT0gJ2FuY2hvcidcbiAgICAgICAgPyB0aGlzLmF0dHIoJ3RleHQtYW5jaG9yJywgdilcbiAgICAgICAgOiBhID09PSAnc2l6ZScgfHxcbiAgICAgICAgICAgIGEgPT09ICdmYW1pbHknIHx8XG4gICAgICAgICAgICBhID09PSAnd2VpZ2h0JyB8fFxuICAgICAgICAgICAgYSA9PT0gJ3N0cmV0Y2gnIHx8XG4gICAgICAgICAgICBhID09PSAndmFyaWFudCcgfHxcbiAgICAgICAgICAgIGEgPT09ICdzdHlsZSdcbiAgICAgICAgICA/IHRoaXMuYXR0cignZm9udC0nICsgYSwgdilcbiAgICAgICAgICA6IHRoaXMuYXR0cihhLCB2KVxuICB9XG59KVxuXG4vLyBBZGQgZXZlbnRzIHRvIGVsZW1lbnRzXG5jb25zdCBtZXRob2RzID0gW1xuICAnY2xpY2snLFxuICAnZGJsY2xpY2snLFxuICAnbW91c2Vkb3duJyxcbiAgJ21vdXNldXAnLFxuICAnbW91c2VvdmVyJyxcbiAgJ21vdXNlb3V0JyxcbiAgJ21vdXNlbW92ZScsXG4gICdtb3VzZWVudGVyJyxcbiAgJ21vdXNlbGVhdmUnLFxuICAndG91Y2hzdGFydCcsXG4gICd0b3VjaG1vdmUnLFxuICAndG91Y2hsZWF2ZScsXG4gICd0b3VjaGVuZCcsXG4gICd0b3VjaGNhbmNlbCcsXG4gICdjb250ZXh0bWVudScsXG4gICd3aGVlbCcsXG4gICdwb2ludGVyZG93bicsXG4gICdwb2ludGVybW92ZScsXG4gICdwb2ludGVydXAnLFxuICAncG9pbnRlcmxlYXZlJyxcbiAgJ3BvaW50ZXJjYW5jZWwnXG5dLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgZXZlbnQpIHtcbiAgLy8gYWRkIGV2ZW50IHRvIEVsZW1lbnRcbiAgY29uc3QgZm4gPSBmdW5jdGlvbiAoZikge1xuICAgIGlmIChmID09PSBudWxsKSB7XG4gICAgICB0aGlzLm9mZihldmVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbihldmVudCwgZilcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGxhc3RbZXZlbnRdID0gZm5cbiAgcmV0dXJuIGxhc3Rcbn0sIHt9KVxuXG5yZWdpc3Rlck1ldGhvZHMoJ0VsZW1lbnQnLCBtZXRob2RzKVxuIiwiaW1wb3J0IHsgZ2V0T3JpZ2luLCBpc0Rlc2NyaXB0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBkZWxpbWl0ZXIsIHRyYW5zZm9ybXMgfSBmcm9tICcuLi9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vLi4vdHlwZXMvTWF0cml4LmpzJ1xuXG4vLyBSZXNldCBhbGwgdHJhbnNmb3JtYXRpb25zXG5leHBvcnQgZnVuY3Rpb24gdW50cmFuc2Zvcm0oKSB7XG4gIHJldHVybiB0aGlzLmF0dHIoJ3RyYW5zZm9ybScsIG51bGwpXG59XG5cbi8vIG1lcmdlIHRoZSB3aG9sZSB0cmFuc2Zvcm1hdGlvbiBjaGFpbiBpbnRvIG9uZSBtYXRyaXggYW5kIHJldHVybnMgaXRcbmV4cG9ydCBmdW5jdGlvbiBtYXRyaXhpZnkoKSB7XG4gIGNvbnN0IG1hdHJpeCA9ICh0aGlzLmF0dHIoJ3RyYW5zZm9ybScpIHx8ICcnKVxuICAgIC8vIHNwbGl0IHRyYW5zZm9ybWF0aW9uc1xuICAgIC5zcGxpdCh0cmFuc2Zvcm1zKVxuICAgIC5zbGljZSgwLCAtMSlcbiAgICAubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIC8vIGdlbmVyYXRlIGtleSA9PiB2YWx1ZSBwYWlyc1xuICAgICAgY29uc3Qga3YgPSBzdHIudHJpbSgpLnNwbGl0KCcoJylcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGt2WzBdLFxuICAgICAgICBrdlsxXS5zcGxpdChkZWxpbWl0ZXIpLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pXG4gICAgLnJldmVyc2UoKVxuICAgIC8vIG1lcmdlIGV2ZXJ5IHRyYW5zZm9ybWF0aW9uIGludG8gb25lIG1hdHJpeFxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKG1hdHJpeCwgdHJhbnNmb3JtKSB7XG4gICAgICBpZiAodHJhbnNmb3JtWzBdID09PSAnbWF0cml4Jykge1xuICAgICAgICByZXR1cm4gbWF0cml4LmxtdWx0aXBseShNYXRyaXguZnJvbUFycmF5KHRyYW5zZm9ybVsxXSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0cml4W3RyYW5zZm9ybVswXV0uYXBwbHkobWF0cml4LCB0cmFuc2Zvcm1bMV0pXG4gICAgfSwgbmV3IE1hdHJpeCgpKVxuXG4gIHJldHVybiBtYXRyaXhcbn1cblxuLy8gYWRkIGFuIGVsZW1lbnQgdG8gYW5vdGhlciBwYXJlbnQgd2l0aG91dCBjaGFuZ2luZyB0aGUgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9uIHRoZSBzY3JlZW5cbmV4cG9ydCBmdW5jdGlvbiB0b1BhcmVudChwYXJlbnQsIGkpIHtcbiAgaWYgKHRoaXMgPT09IHBhcmVudCkgcmV0dXJuIHRoaXNcblxuICBpZiAoaXNEZXNjcmlwdGl2ZSh0aGlzLm5vZGUpKSByZXR1cm4gdGhpcy5hZGRUbyhwYXJlbnQsIGkpXG5cbiAgY29uc3QgY3RtID0gdGhpcy5zY3JlZW5DVE0oKVxuICBjb25zdCBwQ3RtID0gcGFyZW50LnNjcmVlbkNUTSgpLmludmVyc2UoKVxuXG4gIHRoaXMuYWRkVG8ocGFyZW50LCBpKS51bnRyYW5zZm9ybSgpLnRyYW5zZm9ybShwQ3RtLm11bHRpcGx5KGN0bSkpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gc2FtZSBhcyBhYm92ZSB3aXRoIHBhcmVudCBlcXVhbHMgcm9vdC1zdmdcbmV4cG9ydCBmdW5jdGlvbiB0b1Jvb3QoaSkge1xuICByZXR1cm4gdGhpcy50b1BhcmVudCh0aGlzLnJvb3QoKSwgaSlcbn1cblxuLy8gQWRkIHRyYW5zZm9ybWF0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShvLCByZWxhdGl2ZSkge1xuICAvLyBBY3QgYXMgYSBnZXR0ZXIgaWYgbm8gb2JqZWN0IHdhcyBwYXNzZWRcbiAgaWYgKG8gPT0gbnVsbCB8fCB0eXBlb2YgbyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBkZWNvbXBvc2VkID0gbmV3IE1hdHJpeCh0aGlzKS5kZWNvbXBvc2UoKVxuICAgIHJldHVybiBvID09IG51bGwgPyBkZWNvbXBvc2VkIDogZGVjb21wb3NlZFtvXVxuICB9XG5cbiAgaWYgKCFNYXRyaXguaXNNYXRyaXhMaWtlKG8pKSB7XG4gICAgLy8gU2V0IHRoZSBvcmlnaW4gYWNjb3JkaW5nIHRvIHRoZSBkZWZpbmVkIHRyYW5zZm9ybVxuICAgIG8gPSB7IC4uLm8sIG9yaWdpbjogZ2V0T3JpZ2luKG8sIHRoaXMpIH1cbiAgfVxuXG4gIC8vIFRoZSB1c2VyIGNhbiBwYXNzIGEgYm9vbGVhbiwgYW4gRWxlbWVudCBvciBhbiBNYXRyaXggb3Igbm90aGluZ1xuICBjb25zdCBjbGVhblJlbGF0aXZlID0gcmVsYXRpdmUgPT09IHRydWUgPyB0aGlzIDogcmVsYXRpdmUgfHwgZmFsc2VcbiAgY29uc3QgcmVzdWx0ID0gbmV3IE1hdHJpeChjbGVhblJlbGF0aXZlKS50cmFuc2Zvcm0obylcbiAgcmV0dXJuIHRoaXMuYXR0cigndHJhbnNmb3JtJywgcmVzdWx0KVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoJ0VsZW1lbnQnLCB7XG4gIHVudHJhbnNmb3JtLFxuICBtYXRyaXhpZnksXG4gIHRvUGFyZW50LFxuICB0b1Jvb3QsXG4gIHRyYW5zZm9ybVxufSlcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xuICAvLyBjb25zdHJ1Y3RvciAobm9kZS8qLCB7ZXh0ZW5zaW9ucyA9IFtdfSAqLykge1xuICAvLyAgIC8vIHRoaXMudGFncyA9IFtdXG4gIC8vICAgLy9cbiAgLy8gICAvLyBmb3IgKGxldCBleHRlbnNpb24gb2YgZXh0ZW5zaW9ucykge1xuICAvLyAgIC8vICAgZXh0ZW5zaW9uLnNldHVwLmNhbGwodGhpcywgbm9kZSlcbiAgLy8gICAvLyAgIHRoaXMudGFncy5wdXNoKGV4dGVuc2lvbi5uYW1lKVxuICAvLyAgIC8vIH1cbiAgLy8gfVxufVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vTWF0cml4LmpzJ1xuaW1wb3J0IFBvaW50IGZyb20gJy4vUG9pbnQuanMnXG5pbXBvcnQgcGFyc2VyIGZyb20gJy4uL21vZHVsZXMvY29yZS9wYXJzZXIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxlZEJveChib3gpIHtcbiAgcmV0dXJuICFib3gud2lkdGggJiYgIWJveC5oZWlnaHQgJiYgIWJveC54ICYmICFib3gueVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9tQ29udGFpbnMobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUgPT09IGdsb2JhbHMuZG9jdW1lbnQgfHxcbiAgICAoXG4gICAgICBnbG9iYWxzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyB8fFxuICAgICAgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBJRSAtIGl0IGRvZXMgbm90IHN1cHBvcnQgY29udGFpbnMoKSBmb3IgdG9wLWxldmVsIFNWR3NcbiAgICAgICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZSA9PT0gZ2xvYmFscy5kb2N1bWVudFxuICAgICAgfVxuICAgICkuY2FsbChnbG9iYWxzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgbm9kZSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgdGhpcy5pbml0KC4uLmFyZ3MpXG4gIH1cblxuICBhZGRPZmZzZXQoKSB7XG4gICAgLy8gb2Zmc2V0IGJ5IHdpbmRvdyBzY3JvbGwgcG9zaXRpb24sIGJlY2F1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGNoYW5nZXMgd2hlbiB3aW5kb3cgaXMgc2Nyb2xsZWRcbiAgICB0aGlzLnggKz0gZ2xvYmFscy53aW5kb3cucGFnZVhPZmZzZXRcbiAgICB0aGlzLnkgKz0gZ2xvYmFscy53aW5kb3cucGFnZVlPZmZzZXRcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzKVxuICB9XG5cbiAgaW5pdChzb3VyY2UpIHtcbiAgICBjb25zdCBiYXNlID0gWzAsIDAsIDAsIDBdXG4gICAgc291cmNlID1cbiAgICAgIHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnXG4gICAgICAgID8gc291cmNlLnNwbGl0KGRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpXG4gICAgICAgIDogQXJyYXkuaXNBcnJheShzb3VyY2UpXG4gICAgICAgICAgPyBzb3VyY2VcbiAgICAgICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBzb3VyY2UubGVmdCAhPSBudWxsID8gc291cmNlLmxlZnQgOiBzb3VyY2UueCxcbiAgICAgICAgICAgICAgICBzb3VyY2UudG9wICE9IG51bGwgPyBzb3VyY2UudG9wIDogc291cmNlLnksXG4gICAgICAgICAgICAgICAgc291cmNlLndpZHRoLFxuICAgICAgICAgICAgICAgIHNvdXJjZS5oZWlnaHRcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBhcmd1bWVudHMubGVuZ3RoID09PSA0XG4gICAgICAgICAgICAgID8gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICAgICAgICAgIDogYmFzZVxuXG4gICAgdGhpcy54ID0gc291cmNlWzBdIHx8IDBcbiAgICB0aGlzLnkgPSBzb3VyY2VbMV0gfHwgMFxuICAgIHRoaXMud2lkdGggPSB0aGlzLncgPSBzb3VyY2VbMl0gfHwgMFxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oID0gc291cmNlWzNdIHx8IDBcblxuICAgIC8vIEFkZCBtb3JlIGJvdW5kaW5nIGJveCBwcm9wZXJ0aWVzXG4gICAgdGhpcy54MiA9IHRoaXMueCArIHRoaXMud1xuICAgIHRoaXMueTIgPSB0aGlzLnkgKyB0aGlzLmhcbiAgICB0aGlzLmN4ID0gdGhpcy54ICsgdGhpcy53IC8gMlxuICAgIHRoaXMuY3kgPSB0aGlzLnkgKyB0aGlzLmggLyAyXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaXNOdWxsZWQoKSB7XG4gICAgcmV0dXJuIGlzTnVsbGVkQm94KHRoaXMpXG4gIH1cblxuICAvLyBNZXJnZSByZWN0IGJveCB3aXRoIGFub3RoZXIsIHJldHVybiBhIG5ldyBpbnN0YW5jZVxuICBtZXJnZShib3gpIHtcbiAgICBjb25zdCB4ID0gTWF0aC5taW4odGhpcy54LCBib3gueClcbiAgICBjb25zdCB5ID0gTWF0aC5taW4odGhpcy55LCBib3gueSlcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KHRoaXMueCArIHRoaXMud2lkdGgsIGJveC54ICsgYm94LndpZHRoKSAtIHhcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCh0aGlzLnkgKyB0aGlzLmhlaWdodCwgYm94LnkgKyBib3guaGVpZ2h0KSAtIHlcblxuICAgIHJldHVybiBuZXcgQm94KHgsIHksIHdpZHRoLCBoZWlnaHQpXG4gIH1cblxuICB0b0FycmF5KCkge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMueCArICcgJyArIHRoaXMueSArICcgJyArIHRoaXMud2lkdGggKyAnICcgKyB0aGlzLmhlaWdodFxuICB9XG5cbiAgdHJhbnNmb3JtKG0pIHtcbiAgICBpZiAoIShtIGluc3RhbmNlb2YgTWF0cml4KSkge1xuICAgICAgbSA9IG5ldyBNYXRyaXgobSlcbiAgICB9XG5cbiAgICBsZXQgeE1pbiA9IEluZmluaXR5XG4gICAgbGV0IHhNYXggPSAtSW5maW5pdHlcbiAgICBsZXQgeU1pbiA9IEluZmluaXR5XG4gICAgbGV0IHlNYXggPSAtSW5maW5pdHlcblxuICAgIGNvbnN0IHB0cyA9IFtcbiAgICAgIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSksXG4gICAgICBuZXcgUG9pbnQodGhpcy54MiwgdGhpcy55KSxcbiAgICAgIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueTIpLFxuICAgICAgbmV3IFBvaW50KHRoaXMueDIsIHRoaXMueTIpXG4gICAgXVxuXG4gICAgcHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHAgPSBwLnRyYW5zZm9ybShtKVxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcbiAgICAgIHhNYXggPSBNYXRoLm1heCh4TWF4LCBwLngpXG4gICAgICB5TWluID0gTWF0aC5taW4oeU1pbiwgcC55KVxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIG5ldyBCb3goeE1pbiwgeU1pbiwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEJveChlbCwgZ2V0QkJveEZuLCByZXRyeSkge1xuICBsZXQgYm94XG5cbiAgdHJ5IHtcbiAgICAvLyBUcnkgdG8gZ2V0IHRoZSBib3ggd2l0aCB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICBib3ggPSBnZXRCQm94Rm4oZWwubm9kZSlcblxuICAgIC8vIElmIHRoZSBib3ggaXMgd29ydGhsZXNzIGFuZCBub3QgZXZlbiBpbiB0aGUgZG9tLCByZXRyeVxuICAgIC8vIGJ5IHRocm93aW5nIGFuIGVycm9yIGhlcmUuLi5cbiAgICBpZiAoaXNOdWxsZWRCb3goYm94KSAmJiAhZG9tQ29udGFpbnMoZWwubm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBub3QgaW4gdGhlIGRvbScpXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gLi4uIGFuZCBjYWxsaW5nIHRoZSByZXRyeSBoYW5kbGVyIGhlcmVcbiAgICBib3ggPSByZXRyeShlbClcbiAgfVxuXG4gIHJldHVybiBib3hcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJib3goKSB7XG4gIC8vIEZ1bmN0aW9uIHRvIGdldCBiYm94IGlzIGdldEJCb3goKVxuICBjb25zdCBnZXRCQm94ID0gKG5vZGUpID0+IG5vZGUuZ2V0QkJveCgpXG5cbiAgLy8gVGFrZSBhbGwgbWVhc3VyZXMgc28gdGhhdCBhIHN0dXBpZCBicm93c2VyIHJlbmRlcnMgdGhlIGVsZW1lbnRcbiAgLy8gc28gd2UgY2FuIGdldCB0aGUgYmJveCBmcm9tIGl0IHdoZW4gd2UgdHJ5IGFnYWluXG4gIGNvbnN0IHJldHJ5ID0gKGVsKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNsb25lID0gZWwuY2xvbmUoKS5hZGRUbyhwYXJzZXIoKS5zdmcpLnNob3coKVxuICAgICAgY29uc3QgYm94ID0gY2xvbmUubm9kZS5nZXRCQm94KClcbiAgICAgIGNsb25lLnJlbW92ZSgpXG4gICAgICByZXR1cm4gYm94XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gV2UgZ2l2ZSB1cC4uLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgR2V0dGluZyBiYm94IG9mIGVsZW1lbnQgXCIke1xuICAgICAgICAgIGVsLm5vZGUubm9kZU5hbWVcbiAgICAgICAgfVwiIGlzIG5vdCBwb3NzaWJsZTogJHtlLnRvU3RyaW5nKCl9YFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJveCA9IGdldEJveCh0aGlzLCBnZXRCQm94LCByZXRyeSlcbiAgY29uc3QgYmJveCA9IG5ldyBCb3goYm94KVxuXG4gIHJldHVybiBiYm94XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYm94KGVsKSB7XG4gIGNvbnN0IGdldFJCb3ggPSAobm9kZSkgPT4gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCByZXRyeSA9IChlbCkgPT4ge1xuICAgIC8vIFRoZXJlIGlzIG5vIHBvaW50IGluIHRyeWluZyB0cmlja3MgaGVyZSBiZWNhdXNlIGlmIHdlIGluc2VydCB0aGUgZWxlbWVudCBpbnRvIHRoZSBkb20gb3Vyc2VsdmVzXG4gICAgLy8gaXQgb2J2aW91c2x5IHdpbGwgYmUgYXQgdGhlIHdyb25nIHBvc2l0aW9uXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEdldHRpbmcgcmJveCBvZiBlbGVtZW50IFwiJHtlbC5ub2RlLm5vZGVOYW1lfVwiIGlzIG5vdCBwb3NzaWJsZWBcbiAgICApXG4gIH1cblxuICBjb25zdCBib3ggPSBnZXRCb3godGhpcywgZ2V0UkJveCwgcmV0cnkpXG4gIGNvbnN0IHJib3ggPSBuZXcgQm94KGJveClcblxuICAvLyBJZiBhbiBlbGVtZW50IHdhcyBwYXNzZWQsIHdlIHdhbnQgdGhlIGJib3ggaW4gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoYXQgZWxlbWVudFxuICBpZiAoZWwpIHtcbiAgICByZXR1cm4gcmJveC50cmFuc2Zvcm0oZWwuc2NyZWVuQ1RNKCkuaW52ZXJzZU8oKSlcbiAgfVxuXG4gIC8vIEVsc2Ugd2Ugd2FudCBpdCBpbiBhYnNvbHV0ZSBzY3JlZW4gY29vcmRpbmF0ZXNcbiAgLy8gVGhlcmVmb3JlIHdlIG5lZWQgdG8gYWRkIHRoZSBzY3JvbGxPZmZzZXRcbiAgcmV0dXJuIHJib3guYWRkT2Zmc2V0KClcbn1cblxuLy8gQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIHBvaW50IGlzIGluc2lkZSB0aGUgYm91bmRpbmcgYm94XG5leHBvcnQgZnVuY3Rpb24gaW5zaWRlKHgsIHkpIHtcbiAgY29uc3QgYm94ID0gdGhpcy5iYm94KClcblxuICByZXR1cm4gKFxuICAgIHggPiBib3gueCAmJiB5ID4gYm94LnkgJiYgeCA8IGJveC54ICsgYm94LndpZHRoICYmIHkgPCBib3gueSArIGJveC5oZWlnaHRcbiAgKVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICB2aWV3Ym94OiB7XG4gICAgdmlld2JveCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAvLyBhY3QgYXMgZ2V0dGVyXG4gICAgICBpZiAoeCA9PSBudWxsKSByZXR1cm4gbmV3IEJveCh0aGlzLmF0dHIoJ3ZpZXdCb3gnKSlcblxuICAgICAgLy8gYWN0IGFzIHNldHRlclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cigndmlld0JveCcsIG5ldyBCb3goeCwgeSwgd2lkdGgsIGhlaWdodCkpXG4gICAgfSxcblxuICAgIHpvb20obGV2ZWwsIHBvaW50KSB7XG4gICAgICAvLyBJdHMgYmVzdCB0byByZWx5IG9uIHRoZSBhdHRyaWJ1dGVzIGhlcmUgYW5kIGhlcmUgaXMgd2h5OlxuICAgICAgLy8gY2xpZW50WFlaOiBEb2Vzbid0IHdvcmsgb24gbm9uLXJvb3Qgc3ZncyBiZWNhdXNlIHRoZXkgZG9udCBoYXZlIGEgQ1NTQm94IChzaWxseSEpXG4gICAgICAvLyBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6IERvZXNuJ3Qgd29yayBiZWNhdXNlIENocm9tZSBqdXN0IGlnbm9yZXMgd2lkdGggYW5kIGhlaWdodCBvZiBuZXN0ZWQgc3ZncyBjb21wbGV0ZWx5XG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgbWVhbnMsIHRoZWlyIGNsaWVudFJlY3QgaXMgYWx3YXlzIGFzIGJpZyBhcyB0aGUgY29udGVudC5cbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgRnVydGhlcm1vcmUgdGhpcyBzaXplIGlzIGluY29ycmVjdCBpZiB0aGUgZWxlbWVudCBpcyBmdXJ0aGVyIHRyYW5zZm9ybWVkIGJ5IGl0cyBwYXJlbnRzXG4gICAgICAvLyBjb21wdXRlZFN0eWxlOiBPbmx5IHJldHVybnMgbWVhbmluZ2Z1bCB2YWx1ZXMgaWYgY3NzIHdhcyB1c2VkIHdpdGggcHguIFdlIGRvbnQgZ28gdGhpcyByb3V0ZSBoZXJlIVxuICAgICAgLy8gZ2V0QkJveDogcmV0dXJucyB0aGUgYm91bmRpbmcgYm94IG9mIGl0cyBjb250ZW50IC0gdGhhdCBkb2Vzbid0IGhlbHAhXG4gICAgICBsZXQgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmF0dHIoWyd3aWR0aCcsICdoZWlnaHQnXSlcblxuICAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBpcyBhIHN0cmluZyB3aGVuIGEgbnVtYmVyIHdpdGggYSB1bml0IGlzIHByZXNlbnQgd2hpY2ggd2UgY2FuJ3QgdXNlXG4gICAgICAvLyBTbyB3ZSB0cnkgY2xpZW50WFlaXG4gICAgICBpZiAoXG4gICAgICAgICghd2lkdGggJiYgIWhlaWdodCkgfHxcbiAgICAgICAgdHlwZW9mIHdpZHRoID09PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2YgaGVpZ2h0ID09PSAnc3RyaW5nJ1xuICAgICAgKSB7XG4gICAgICAgIHdpZHRoID0gdGhpcy5ub2RlLmNsaWVudFdpZHRoXG4gICAgICAgIGhlaWdodCA9IHRoaXMubm9kZS5jbGllbnRIZWlnaHRcbiAgICAgIH1cblxuICAgICAgLy8gR2l2aW5nIHVwLi4uXG4gICAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdJbXBvc3NpYmxlIHRvIGdldCBhYnNvbHV0ZSB3aWR0aCBhbmQgaGVpZ2h0LiBQbGVhc2UgcHJvdmlkZSBhbiBhYnNvbHV0ZSB3aWR0aCBhbmQgaGVpZ2h0IGF0dHJpYnV0ZSBvbiB0aGUgem9vbWluZyBlbGVtZW50J1xuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHYgPSB0aGlzLnZpZXdib3goKVxuXG4gICAgICBjb25zdCB6b29tWCA9IHdpZHRoIC8gdi53aWR0aFxuICAgICAgY29uc3Qgem9vbVkgPSBoZWlnaHQgLyB2LmhlaWdodFxuICAgICAgY29uc3Qgem9vbSA9IE1hdGgubWluKHpvb21YLCB6b29tWSlcblxuICAgICAgaWYgKGxldmVsID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHpvb21cbiAgICAgIH1cblxuICAgICAgbGV0IHpvb21BbW91bnQgPSB6b29tIC8gbGV2ZWxcblxuICAgICAgLy8gU2V0IHRoZSB6b29tQW1vdW50IHRvIHRoZSBoaWdoZXN0IHZhbHVlIHdoaWNoIGlzIHNhZmUgdG8gcHJvY2VzcyBhbmQgcmVjb3ZlciBmcm9tXG4gICAgICAvLyBUaGUgKiAxMDAgaXMgYSBiaXQgb2Ygd2lnZ2xlIHJvb20gZm9yIHRoZSBtYXRyaXggdHJhbnNmb3JtYXRpb25cbiAgICAgIGlmICh6b29tQW1vdW50ID09PSBJbmZpbml0eSkgem9vbUFtb3VudCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIC8gMTAwXG5cbiAgICAgIHBvaW50ID1cbiAgICAgICAgcG9pbnQgfHwgbmV3IFBvaW50KHdpZHRoIC8gMiAvIHpvb21YICsgdi54LCBoZWlnaHQgLyAyIC8gem9vbVkgKyB2LnkpXG5cbiAgICAgIGNvbnN0IGJveCA9IG5ldyBCb3godikudHJhbnNmb3JtKFxuICAgICAgICBuZXcgTWF0cml4KHsgc2NhbGU6IHpvb21BbW91bnQsIG9yaWdpbjogcG9pbnQgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIHRoaXMudmlld2JveChib3gpXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihCb3gsICdCb3gnKVxuIiwiaW1wb3J0IHsgaGV4LCBpc0hleCwgaXNSZ2IsIHJnYiwgd2hpdGVzcGFjZSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcblxuZnVuY3Rpb24gc2l4RGlnaXRIZXgoaGV4KSB7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSA0XG4gICAgPyBbXG4gICAgICAgICcjJyxcbiAgICAgICAgaGV4LnN1YnN0cmluZygxLCAyKSxcbiAgICAgICAgaGV4LnN1YnN0cmluZygxLCAyKSxcbiAgICAgICAgaGV4LnN1YnN0cmluZygyLCAzKSxcbiAgICAgICAgaGV4LnN1YnN0cmluZygyLCAzKSxcbiAgICAgICAgaGV4LnN1YnN0cmluZygzLCA0KSxcbiAgICAgICAgaGV4LnN1YnN0cmluZygzLCA0KVxuICAgICAgXS5qb2luKCcnKVxuICAgIDogaGV4XG59XG5cbmZ1bmN0aW9uIGNvbXBvbmVudEhleChjb21wb25lbnQpIHtcbiAgY29uc3QgaW50ZWdlciA9IE1hdGgucm91bmQoY29tcG9uZW50KVxuICBjb25zdCBib3VuZGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBpbnRlZ2VyKSlcbiAgY29uc3QgaGV4ID0gYm91bmRlZC50b1N0cmluZygxNilcbiAgcmV0dXJuIGhleC5sZW5ndGggPT09IDEgPyAnMCcgKyBoZXggOiBoZXhcbn1cblxuZnVuY3Rpb24gaXMob2JqZWN0LCBzcGFjZSkge1xuICBmb3IgKGxldCBpID0gc3BhY2UubGVuZ3RoOyBpLS07ICkge1xuICAgIGlmIChvYmplY3Rbc3BhY2VbaV1dID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKGEsIGIpIHtcbiAgY29uc3QgcGFyYW1zID0gaXMoYSwgJ3JnYicpXG4gICAgPyB7IF9hOiBhLnIsIF9iOiBhLmcsIF9jOiBhLmIsIF9kOiAwLCBzcGFjZTogJ3JnYicgfVxuICAgIDogaXMoYSwgJ3h5eicpXG4gICAgICA/IHsgX2E6IGEueCwgX2I6IGEueSwgX2M6IGEueiwgX2Q6IDAsIHNwYWNlOiAneHl6JyB9XG4gICAgICA6IGlzKGEsICdoc2wnKVxuICAgICAgICA/IHsgX2E6IGEuaCwgX2I6IGEucywgX2M6IGEubCwgX2Q6IDAsIHNwYWNlOiAnaHNsJyB9XG4gICAgICAgIDogaXMoYSwgJ2xhYicpXG4gICAgICAgICAgPyB7IF9hOiBhLmwsIF9iOiBhLmEsIF9jOiBhLmIsIF9kOiAwLCBzcGFjZTogJ2xhYicgfVxuICAgICAgICAgIDogaXMoYSwgJ2xjaCcpXG4gICAgICAgICAgICA/IHsgX2E6IGEubCwgX2I6IGEuYywgX2M6IGEuaCwgX2Q6IDAsIHNwYWNlOiAnbGNoJyB9XG4gICAgICAgICAgICA6IGlzKGEsICdjbXlrJylcbiAgICAgICAgICAgICAgPyB7IF9hOiBhLmMsIF9iOiBhLm0sIF9jOiBhLnksIF9kOiBhLmssIHNwYWNlOiAnY215aycgfVxuICAgICAgICAgICAgICA6IHsgX2E6IDAsIF9iOiAwLCBfYzogMCwgc3BhY2U6ICdyZ2InIH1cblxuICBwYXJhbXMuc3BhY2UgPSBiIHx8IHBhcmFtcy5zcGFjZVxuICByZXR1cm4gcGFyYW1zXG59XG5cbmZ1bmN0aW9uIGNpZVNwYWNlKHNwYWNlKSB7XG4gIGlmIChzcGFjZSA9PT0gJ2xhYicgfHwgc3BhY2UgPT09ICd4eXonIHx8IHNwYWNlID09PSAnbGNoJykge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gaHVlVG9SZ2IocCwgcSwgdCkge1xuICBpZiAodCA8IDApIHQgKz0gMVxuICBpZiAodCA+IDEpIHQgLT0gMVxuICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdFxuICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcVxuICBpZiAodCA8IDIgLyAzKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDZcbiAgcmV0dXJuIHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3Ige1xuICBjb25zdHJ1Y3RvciguLi5pbnB1dHMpIHtcbiAgICB0aGlzLmluaXQoLi4uaW5wdXRzKVxuICB9XG5cbiAgLy8gVGVzdCBpZiBnaXZlbiB2YWx1ZSBpcyBhIGNvbG9yXG4gIHN0YXRpYyBpc0NvbG9yKGNvbG9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbG9yICYmIChjb2xvciBpbnN0YW5jZW9mIENvbG9yIHx8IHRoaXMuaXNSZ2IoY29sb3IpIHx8IHRoaXMudGVzdChjb2xvcikpXG4gICAgKVxuICB9XG5cbiAgLy8gVGVzdCBpZiBnaXZlbiB2YWx1ZSBpcyBhbiByZ2Igb2JqZWN0XG4gIHN0YXRpYyBpc1JnYihjb2xvcikge1xuICAgIHJldHVybiAoXG4gICAgICBjb2xvciAmJlxuICAgICAgdHlwZW9mIGNvbG9yLnIgPT09ICdudW1iZXInICYmXG4gICAgICB0eXBlb2YgY29sb3IuZyA9PT0gJ251bWJlcicgJiZcbiAgICAgIHR5cGVvZiBjb2xvci5iID09PSAnbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIC8qXG4gIEdlbmVyYXRpbmcgcmFuZG9tIGNvbG9yc1xuICAqL1xuICBzdGF0aWMgcmFuZG9tKG1vZGUgPSAndmlicmFudCcsIHQpIHtcbiAgICAvLyBHZXQgdGhlIG1hdGggbW9kdWxlc1xuICAgIGNvbnN0IHsgcmFuZG9tLCByb3VuZCwgc2luLCBQSTogcGkgfSA9IE1hdGhcblxuICAgIC8vIFJ1biB0aGUgY29ycmVjdCBnZW5lcmF0b3JcbiAgICBpZiAobW9kZSA9PT0gJ3ZpYnJhbnQnKSB7XG4gICAgICBjb25zdCBsID0gKDgxIC0gNTcpICogcmFuZG9tKCkgKyA1N1xuICAgICAgY29uc3QgYyA9ICg4MyAtIDQ1KSAqIHJhbmRvbSgpICsgNDVcbiAgICAgIGNvbnN0IGggPSAzNjAgKiByYW5kb20oKVxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IobCwgYywgaCwgJ2xjaCcpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdzaW5lJykge1xuICAgICAgdCA9IHQgPT0gbnVsbCA/IHJhbmRvbSgpIDogdFxuICAgICAgY29uc3QgciA9IHJvdW5kKDgwICogc2luKCgyICogcGkgKiB0KSAvIDAuNSArIDAuMDEpICsgMTUwKVxuICAgICAgY29uc3QgZyA9IHJvdW5kKDUwICogc2luKCgyICogcGkgKiB0KSAvIDAuNSArIDQuNikgKyAyMDApXG4gICAgICBjb25zdCBiID0gcm91bmQoMTAwICogc2luKCgyICogcGkgKiB0KSAvIDAuNSArIDIuMykgKyAxNTApXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAncGFzdGVsJykge1xuICAgICAgY29uc3QgbCA9ICg5NCAtIDg2KSAqIHJhbmRvbSgpICsgODZcbiAgICAgIGNvbnN0IGMgPSAoMjYgLSA5KSAqIHJhbmRvbSgpICsgOVxuICAgICAgY29uc3QgaCA9IDM2MCAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBjLCBoLCAnbGNoJylcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2RhcmsnKSB7XG4gICAgICBjb25zdCBsID0gMTAgKyAxMCAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjID0gKDEyNSAtIDc1KSAqIHJhbmRvbSgpICsgODZcbiAgICAgIGNvbnN0IGggPSAzNjAgKiByYW5kb20oKVxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IobCwgYywgaCwgJ2xjaCcpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdyZ2InKSB7XG4gICAgICBjb25zdCByID0gMjU1ICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGcgPSAyNTUgKiByYW5kb20oKVxuICAgICAgY29uc3QgYiA9IDI1NSAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnbGFiJykge1xuICAgICAgY29uc3QgbCA9IDEwMCAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBhID0gMjU2ICogcmFuZG9tKCkgLSAxMjhcbiAgICAgIGNvbnN0IGIgPSAyNTYgKiByYW5kb20oKSAtIDEyOFxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IobCwgYSwgYiwgJ2xhYicpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdncmV5Jykge1xuICAgICAgY29uc3QgZ3JleSA9IDI1NSAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihncmV5LCBncmV5LCBncmV5KVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcmFuZG9tIGNvbG9yIG1vZGUnKVxuICAgIH1cbiAgfVxuXG4gIC8vIFRlc3QgaWYgZ2l2ZW4gdmFsdWUgaXMgYSBjb2xvciBzdHJpbmdcbiAgc3RhdGljIHRlc3QoY29sb3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJyAmJiAoaXNIZXgudGVzdChjb2xvcikgfHwgaXNSZ2IudGVzdChjb2xvcikpXG4gIH1cblxuICBjbXlrKCkge1xuICAgIC8vIEdldCB0aGUgcmdiIHZhbHVlcyBmb3IgdGhlIGN1cnJlbnQgY29sb3JcbiAgICBjb25zdCB7IF9hLCBfYiwgX2MgfSA9IHRoaXMucmdiKClcbiAgICBjb25zdCBbciwgZywgYl0gPSBbX2EsIF9iLCBfY10ubWFwKCh2KSA9PiB2IC8gMjU1KVxuXG4gICAgLy8gR2V0IHRoZSBjbXlrIHZhbHVlcyBpbiBhbiB1bmJvdW5kZWQgZm9ybWF0XG4gICAgY29uc3QgayA9IE1hdGgubWluKDEgLSByLCAxIC0gZywgMSAtIGIpXG5cbiAgICBpZiAoayA9PT0gMSkge1xuICAgICAgLy8gQ2F0Y2ggdGhlIGJsYWNrIGNhc2VcbiAgICAgIHJldHVybiBuZXcgQ29sb3IoMCwgMCwgMCwgMSwgJ2NteWsnKVxuICAgIH1cblxuICAgIGNvbnN0IGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaylcbiAgICBjb25zdCBtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspXG4gICAgY29uc3QgeSA9ICgxIC0gYiAtIGspIC8gKDEgLSBrKVxuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBuZXcgY29sb3JcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihjLCBtLCB5LCBrLCAnY215aycpXG4gICAgcmV0dXJuIGNvbG9yXG4gIH1cblxuICBoc2woKSB7XG4gICAgLy8gR2V0IHRoZSByZ2IgdmFsdWVzXG4gICAgY29uc3QgeyBfYSwgX2IsIF9jIH0gPSB0aGlzLnJnYigpXG4gICAgY29uc3QgW3IsIGcsIGJdID0gW19hLCBfYiwgX2NdLm1hcCgodikgPT4gdiAvIDI1NSlcblxuICAgIC8vIEZpbmQgdGhlIG1heGltdW0gYW5kIG1pbmltdW0gdmFsdWVzIHRvIGdldCB0aGUgbGlnaHRuZXNzXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxuICAgIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDJcblxuICAgIC8vIElmIHRoZSByLCBnLCB2IHZhbHVlcyBhcmUgaWRlbnRpY2FsIHRoZW4gd2UgYXJlIGdyZXlcbiAgICBjb25zdCBpc0dyZXkgPSBtYXggPT09IG1pblxuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBodWUgYW5kIHNhdHVyYXRpb25cbiAgICBjb25zdCBkZWx0YSA9IG1heCAtIG1pblxuICAgIGNvbnN0IHMgPSBpc0dyZXlcbiAgICAgID8gMFxuICAgICAgOiBsID4gMC41XG4gICAgICAgID8gZGVsdGEgLyAoMiAtIG1heCAtIG1pbilcbiAgICAgICAgOiBkZWx0YSAvIChtYXggKyBtaW4pXG4gICAgY29uc3QgaCA9IGlzR3JleVxuICAgICAgPyAwXG4gICAgICA6IG1heCA9PT0gclxuICAgICAgICA/ICgoZyAtIGIpIC8gZGVsdGEgKyAoZyA8IGIgPyA2IDogMCkpIC8gNlxuICAgICAgICA6IG1heCA9PT0gZ1xuICAgICAgICAgID8gKChiIC0gcikgLyBkZWx0YSArIDIpIC8gNlxuICAgICAgICAgIDogbWF4ID09PSBiXG4gICAgICAgICAgICA/ICgociAtIGcpIC8gZGVsdGEgKyA0KSAvIDZcbiAgICAgICAgICAgIDogMFxuXG4gICAgLy8gQ29uc3RydWN0IGFuZCByZXR1cm4gdGhlIG5ldyBjb2xvclxuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKDM2MCAqIGgsIDEwMCAqIHMsIDEwMCAqIGwsICdoc2wnKVxuICAgIHJldHVybiBjb2xvclxuICB9XG5cbiAgaW5pdChhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgc3BhY2UgPSAncmdiJykge1xuICAgIC8vIFRoaXMgY2F0Y2hlcyB0aGUgY2FzZSB3aGVuIGEgZmFsc3kgdmFsdWUgaXMgcGFzc2VkIGxpa2UgJydcbiAgICBhID0gIWEgPyAwIDogYVxuXG4gICAgLy8gUmVzZXQgYWxsIHZhbHVlcyBpbiBjYXNlIHRoZSBpbml0IGZ1bmN0aW9uIGlzIHJlcnVuIHdpdGggbmV3IGNvbG9yIHNwYWNlXG4gICAgaWYgKHRoaXMuc3BhY2UpIHtcbiAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IGluIHRoaXMuc3BhY2UpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNbdGhpcy5zcGFjZVtjb21wb25lbnRdXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ251bWJlcicpIHtcbiAgICAgIC8vIEFsbG93IGZvciB0aGUgY2FzZSB0aGF0IHdlIGRvbid0IG5lZWQgZC4uLlxuICAgICAgc3BhY2UgPSB0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyBkIDogc3BhY2VcbiAgICAgIGQgPSB0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyAwIDogZFxuXG4gICAgICAvLyBBc3NpZ24gdGhlIHZhbHVlcyBzdHJhaWdodCB0byB0aGUgY29sb3JcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBfYTogYSwgX2I6IGIsIF9jOiBjLCBfZDogZCwgc3BhY2UgfSlcbiAgICAgIC8vIElmIHRoZSB1c2VyIGdhdmUgdXMgYW4gYXJyYXksIG1ha2UgdGhlIGNvbG9yIGZyb20gaXRcbiAgICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5zcGFjZSA9IGIgfHwgKHR5cGVvZiBhWzNdID09PSAnc3RyaW5nJyA/IGFbM10gOiBhWzRdKSB8fCAncmdiJ1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IF9hOiBhWzBdLCBfYjogYVsxXSwgX2M6IGFbMl0sIF9kOiBhWzNdIHx8IDAgfSlcbiAgICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIC8vIFNldCB0aGUgb2JqZWN0IHVwIGFuZCBhc3NpZ24gaXRzIHZhbHVlcyBkaXJlY3RseVxuICAgICAgY29uc3QgdmFsdWVzID0gZ2V0UGFyYW1ldGVycyhhLCBiKVxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB2YWx1ZXMpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc1JnYi50ZXN0KGEpKSB7XG4gICAgICAgIGNvbnN0IG5vV2hpdGVzcGFjZSA9IGEucmVwbGFjZSh3aGl0ZXNwYWNlLCAnJylcbiAgICAgICAgY29uc3QgW19hLCBfYiwgX2NdID0gcmdiXG4gICAgICAgICAgLmV4ZWMobm9XaGl0ZXNwYWNlKVxuICAgICAgICAgIC5zbGljZSgxLCA0KVxuICAgICAgICAgIC5tYXAoKHYpID0+IHBhcnNlSW50KHYpKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgX2EsIF9iLCBfYywgX2Q6IDAsIHNwYWNlOiAncmdiJyB9KVxuICAgICAgfSBlbHNlIGlmIChpc0hleC50ZXN0KGEpKSB7XG4gICAgICAgIGNvbnN0IGhleFBhcnNlID0gKHYpID0+IHBhcnNlSW50KHYsIDE2KVxuICAgICAgICBjb25zdCBbLCBfYSwgX2IsIF9jXSA9IGhleC5leGVjKHNpeERpZ2l0SGV4KGEpKS5tYXAoaGV4UGFyc2UpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBfYSwgX2IsIF9jLCBfZDogMCwgc3BhY2U6ICdyZ2InIH0pXG4gICAgICB9IGVsc2UgdGhyb3cgRXJyb3IoXCJVbnN1cHBvcnRlZCBzdHJpbmcgZm9ybWF0LCBjYW4ndCBjb25zdHJ1Y3QgQ29sb3JcIilcbiAgICB9XG5cbiAgICAvLyBOb3cgYWRkIHRoZSBjb21wb25lbnRzIGFzIGEgY29udmVuaWVuY2VcbiAgICBjb25zdCB7IF9hLCBfYiwgX2MsIF9kIH0gPSB0aGlzXG4gICAgY29uc3QgY29tcG9uZW50cyA9XG4gICAgICB0aGlzLnNwYWNlID09PSAncmdiJ1xuICAgICAgICA/IHsgcjogX2EsIGc6IF9iLCBiOiBfYyB9XG4gICAgICAgIDogdGhpcy5zcGFjZSA9PT0gJ3h5eidcbiAgICAgICAgICA/IHsgeDogX2EsIHk6IF9iLCB6OiBfYyB9XG4gICAgICAgICAgOiB0aGlzLnNwYWNlID09PSAnaHNsJ1xuICAgICAgICAgICAgPyB7IGg6IF9hLCBzOiBfYiwgbDogX2MgfVxuICAgICAgICAgICAgOiB0aGlzLnNwYWNlID09PSAnbGFiJ1xuICAgICAgICAgICAgICA/IHsgbDogX2EsIGE6IF9iLCBiOiBfYyB9XG4gICAgICAgICAgICAgIDogdGhpcy5zcGFjZSA9PT0gJ2xjaCdcbiAgICAgICAgICAgICAgICA/IHsgbDogX2EsIGM6IF9iLCBoOiBfYyB9XG4gICAgICAgICAgICAgICAgOiB0aGlzLnNwYWNlID09PSAnY215aydcbiAgICAgICAgICAgICAgICAgID8geyBjOiBfYSwgbTogX2IsIHk6IF9jLCBrOiBfZCB9XG4gICAgICAgICAgICAgICAgICA6IHt9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb21wb25lbnRzKVxuICB9XG5cbiAgbGFiKCkge1xuICAgIC8vIEdldCB0aGUgeHl6IGNvbG9yXG4gICAgY29uc3QgeyB4LCB5LCB6IH0gPSB0aGlzLnh5eigpXG5cbiAgICAvLyBHZXQgdGhlIGxhYiBjb21wb25lbnRzXG4gICAgY29uc3QgbCA9IDExNiAqIHkgLSAxNlxuICAgIGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpXG4gICAgY29uc3QgYiA9IDIwMCAqICh5IC0geilcblxuICAgIC8vIENvbnN0cnVjdCBhbmQgcmV0dXJuIGEgbmV3IGNvbG9yXG4gICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IobCwgYSwgYiwgJ2xhYicpXG4gICAgcmV0dXJuIGNvbG9yXG4gIH1cblxuICBsY2goKSB7XG4gICAgLy8gR2V0IHRoZSBsYWIgY29sb3IgZGlyZWN0bHlcbiAgICBjb25zdCB7IGwsIGEsIGIgfSA9IHRoaXMubGFiKClcblxuICAgIC8vIEdldCB0aGUgY2hyb21hdGljaXR5IGFuZCB0aGUgaHVlIHVzaW5nIHBvbGFyIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgYyA9IE1hdGguc3FydChhICoqIDIgKyBiICoqIDIpXG4gICAgbGV0IGggPSAoMTgwICogTWF0aC5hdGFuMihiLCBhKSkgLyBNYXRoLlBJXG4gICAgaWYgKGggPCAwKSB7XG4gICAgICBoICo9IC0xXG4gICAgICBoID0gMzYwIC0gaFxuICAgIH1cblxuICAgIC8vIE1ha2UgYSBuZXcgY29sb3IgYW5kIHJldHVybiBpdFxuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGMsIGgsICdsY2gnKVxuICAgIHJldHVybiBjb2xvclxuICB9XG4gIC8qXG4gIENvbnZlcnNpb24gTWV0aG9kc1xuICAqL1xuXG4gIHJnYigpIHtcbiAgICBpZiAodGhpcy5zcGFjZSA9PT0gJ3JnYicpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIGlmIChjaWVTcGFjZSh0aGlzLnNwYWNlKSkge1xuICAgICAgLy8gQ29udmVydCB0byB0aGUgeHl6IGNvbG9yIHNwYWNlXG4gICAgICBsZXQgeyB4LCB5LCB6IH0gPSB0aGlzXG4gICAgICBpZiAodGhpcy5zcGFjZSA9PT0gJ2xhYicgfHwgdGhpcy5zcGFjZSA9PT0gJ2xjaCcpIHtcbiAgICAgICAgLy8gR2V0IHRoZSB2YWx1ZXMgaW4gdGhlIGxhYiBzcGFjZVxuICAgICAgICBsZXQgeyBsLCBhLCBiIH0gPSB0aGlzXG4gICAgICAgIGlmICh0aGlzLnNwYWNlID09PSAnbGNoJykge1xuICAgICAgICAgIGNvbnN0IHsgYywgaCB9ID0gdGhpc1xuICAgICAgICAgIGNvbnN0IGRUb1IgPSBNYXRoLlBJIC8gMTgwXG4gICAgICAgICAgYSA9IGMgKiBNYXRoLmNvcyhkVG9SICogaClcbiAgICAgICAgICBiID0gYyAqIE1hdGguc2luKGRUb1IgKiBoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVW5kbyB0aGUgbm9ubGluZWFyIGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IHlMID0gKGwgKyAxNikgLyAxMTZcbiAgICAgICAgY29uc3QgeEwgPSBhIC8gNTAwICsgeUxcbiAgICAgICAgY29uc3QgekwgPSB5TCAtIGIgLyAyMDBcblxuICAgICAgICAvLyBHZXQgdGhlIHh5eiB2YWx1ZXNcbiAgICAgICAgY29uc3QgY3QgPSAxNiAvIDExNlxuICAgICAgICBjb25zdCBteCA9IDAuMDA4ODU2XG4gICAgICAgIGNvbnN0IG5tID0gNy43ODdcbiAgICAgICAgeCA9IDAuOTUwNDcgKiAoeEwgKiogMyA+IG14ID8geEwgKiogMyA6ICh4TCAtIGN0KSAvIG5tKVxuICAgICAgICB5ID0gMS4wICogKHlMICoqIDMgPiBteCA/IHlMICoqIDMgOiAoeUwgLSBjdCkgLyBubSlcbiAgICAgICAgeiA9IDEuMDg4ODMgKiAoekwgKiogMyA+IG14ID8gekwgKiogMyA6ICh6TCAtIGN0KSAvIG5tKVxuICAgICAgfVxuXG4gICAgICAvLyBDb252ZXJ0IHh5eiB0byB1bmJvdW5kZWQgcmdiIHZhbHVlc1xuICAgICAgY29uc3QgclUgPSB4ICogMy4yNDA2ICsgeSAqIC0xLjUzNzIgKyB6ICogLTAuNDk4NlxuICAgICAgY29uc3QgZ1UgPSB4ICogLTAuOTY4OSArIHkgKiAxLjg3NTggKyB6ICogMC4wNDE1XG4gICAgICBjb25zdCBiVSA9IHggKiAwLjA1NTcgKyB5ICogLTAuMjA0ICsgeiAqIDEuMDU3XG5cbiAgICAgIC8vIENvbnZlcnQgdGhlIHZhbHVlcyB0byB0cnVlIHJnYiB2YWx1ZXNcbiAgICAgIGNvbnN0IHBvdyA9IE1hdGgucG93XG4gICAgICBjb25zdCBiZCA9IDAuMDAzMTMwOFxuICAgICAgY29uc3QgciA9IHJVID4gYmQgPyAxLjA1NSAqIHBvdyhyVSwgMSAvIDIuNCkgLSAwLjA1NSA6IDEyLjkyICogclVcbiAgICAgIGNvbnN0IGcgPSBnVSA+IGJkID8gMS4wNTUgKiBwb3coZ1UsIDEgLyAyLjQpIC0gMC4wNTUgOiAxMi45MiAqIGdVXG4gICAgICBjb25zdCBiID0gYlUgPiBiZCA/IDEuMDU1ICogcG93KGJVLCAxIC8gMi40KSAtIDAuMDU1IDogMTIuOTIgKiBiVVxuXG4gICAgICAvLyBNYWtlIGFuZCByZXR1cm4gdGhlIGNvbG9yXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcigyNTUgKiByLCAyNTUgKiBnLCAyNTUgKiBiKVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIGlmICh0aGlzLnNwYWNlID09PSAnaHNsJykge1xuICAgICAgLy8gaHR0cHM6Ly9iZ3JpbnMuZ2l0aHViLmlvL1RpbnlDb2xvci9kb2NzL3Rpbnljb2xvci5odG1sXG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgaHNsIHZhbHVlc1xuICAgICAgbGV0IHsgaCwgcywgbCB9ID0gdGhpc1xuICAgICAgaCAvPSAzNjBcbiAgICAgIHMgLz0gMTAwXG4gICAgICBsIC89IDEwMFxuXG4gICAgICAvLyBJZiB3ZSBhcmUgZ3JleSwgdGhlbiBqdXN0IG1ha2UgdGhlIGNvbG9yIGRpcmVjdGx5XG4gICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICBsICo9IDI1NVxuICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBsLCBsKVxuICAgICAgICByZXR1cm4gY29sb3JcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETyBJIGhhdmUgbm8gaWRlYSB3aGF0IHRoaXMgZG9lcyA6RCBJZiB5b3UgZmlndXJlIGl0IG91dCwgdGVsbCBtZSFcbiAgICAgIGNvbnN0IHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzXG4gICAgICBjb25zdCBwID0gMiAqIGwgLSBxXG5cbiAgICAgIC8vIEdldCB0aGUgcmdiIHZhbHVlc1xuICAgICAgY29uc3QgciA9IDI1NSAqIGh1ZVRvUmdiKHAsIHEsIGggKyAxIC8gMylcbiAgICAgIGNvbnN0IGcgPSAyNTUgKiBodWVUb1JnYihwLCBxLCBoKVxuICAgICAgY29uc3QgYiA9IDI1NSAqIGh1ZVRvUmdiKHAsIHEsIGggLSAxIC8gMylcblxuICAgICAgLy8gTWFrZSBhIG5ldyBjb2xvclxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IociwgZywgYilcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSBpZiAodGhpcy5zcGFjZSA9PT0gJ2NteWsnKSB7XG4gICAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9mZWxpcGVzYWJpbm8vNTA2NjMzNlxuICAgICAgLy8gR2V0IHRoZSBub3JtYWxpc2VkIGNteWsgdmFsdWVzXG4gICAgICBjb25zdCB7IGMsIG0sIHksIGsgfSA9IHRoaXNcblxuICAgICAgLy8gR2V0IHRoZSByZ2IgdmFsdWVzXG4gICAgICBjb25zdCByID0gMjU1ICogKDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspKVxuICAgICAgY29uc3QgZyA9IDI1NSAqICgxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKSlcbiAgICAgIGNvbnN0IGIgPSAyNTUgKiAoMSAtIE1hdGgubWluKDEsIHkgKiAoMSAtIGspICsgaykpXG5cbiAgICAgIC8vIEZvcm0gdGhlIGNvbG9yIGFuZCByZXR1cm4gaXRcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKHIsIGcsIGIpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICB0b0FycmF5KCkge1xuICAgIGNvbnN0IHsgX2EsIF9iLCBfYywgX2QsIHNwYWNlIH0gPSB0aGlzXG4gICAgcmV0dXJuIFtfYSwgX2IsIF9jLCBfZCwgc3BhY2VdXG4gIH1cblxuICB0b0hleCgpIHtcbiAgICBjb25zdCBbciwgZywgYl0gPSB0aGlzLl9jbGFtcGVkKCkubWFwKGNvbXBvbmVudEhleClcbiAgICByZXR1cm4gYCMke3J9JHtnfSR7Yn1gXG4gIH1cblxuICB0b1JnYigpIHtcbiAgICBjb25zdCBbclYsIGdWLCBiVl0gPSB0aGlzLl9jbGFtcGVkKClcbiAgICBjb25zdCBzdHJpbmcgPSBgcmdiKCR7clZ9LCR7Z1Z9LCR7YlZ9KWBcbiAgICByZXR1cm4gc3RyaW5nXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b0hleCgpXG4gIH1cblxuICB4eXooKSB7XG4gICAgLy8gTm9ybWFsaXNlIHRoZSByZWQsIGdyZWVuIGFuZCBibHVlIHZhbHVlc1xuICAgIGNvbnN0IHsgX2E6IHIyNTUsIF9iOiBnMjU1LCBfYzogYjI1NSB9ID0gdGhpcy5yZ2IoKVxuICAgIGNvbnN0IFtyLCBnLCBiXSA9IFtyMjU1LCBnMjU1LCBiMjU1XS5tYXAoKHYpID0+IHYgLyAyNTUpXG5cbiAgICAvLyBDb252ZXJ0IHRvIHRoZSBsYWIgcmdiIHNwYWNlXG4gICAgY29uc3QgckwgPSByID4gMC4wNDA0NSA/IE1hdGgucG93KChyICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiByIC8gMTIuOTJcbiAgICBjb25zdCBnTCA9IGcgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKGcgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IGcgLyAxMi45MlxuICAgIGNvbnN0IGJMID0gYiA+IDAuMDQwNDUgPyBNYXRoLnBvdygoYiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpIDogYiAvIDEyLjkyXG5cbiAgICAvLyBDb252ZXJ0IHRvIHRoZSB4eXogY29sb3Igc3BhY2Ugd2l0aG91dCBib3VuZGluZyB0aGUgdmFsdWVzXG4gICAgY29uc3QgeFUgPSAockwgKiAwLjQxMjQgKyBnTCAqIDAuMzU3NiArIGJMICogMC4xODA1KSAvIDAuOTUwNDdcbiAgICBjb25zdCB5VSA9IChyTCAqIDAuMjEyNiArIGdMICogMC43MTUyICsgYkwgKiAwLjA3MjIpIC8gMS4wXG4gICAgY29uc3QgelUgPSAockwgKiAwLjAxOTMgKyBnTCAqIDAuMTE5MiArIGJMICogMC45NTA1KSAvIDEuMDg4ODNcblxuICAgIC8vIEdldCB0aGUgcHJvcGVyIHh5eiB2YWx1ZXMgYnkgYXBwbHlpbmcgdGhlIGJvdW5kaW5nXG4gICAgY29uc3QgeCA9IHhVID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4VSwgMSAvIDMpIDogNy43ODcgKiB4VSArIDE2IC8gMTE2XG4gICAgY29uc3QgeSA9IHlVID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5VSwgMSAvIDMpIDogNy43ODcgKiB5VSArIDE2IC8gMTE2XG4gICAgY29uc3QgeiA9IHpVID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6VSwgMSAvIDMpIDogNy43ODcgKiB6VSArIDE2IC8gMTE2XG5cbiAgICAvLyBNYWtlIGFuZCByZXR1cm4gdGhlIGNvbG9yXG4gICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoeCwgeSwgeiwgJ3h5eicpXG4gICAgcmV0dXJuIGNvbG9yXG4gIH1cblxuICAvKlxuICBJbnB1dCBhbmQgT3V0cHV0IG1ldGhvZHNcbiAgKi9cblxuICBfY2xhbXBlZCgpIHtcbiAgICBjb25zdCB7IF9hLCBfYiwgX2MgfSA9IHRoaXMucmdiKClcbiAgICBjb25zdCB7IG1heCwgbWluLCByb3VuZCB9ID0gTWF0aFxuICAgIGNvbnN0IGZvcm1hdCA9ICh2KSA9PiBtYXgoMCwgbWluKHJvdW5kKHYpLCAyNTUpKVxuICAgIHJldHVybiBbX2EsIF9iLCBfY10ubWFwKGZvcm1hdClcbiAgfVxuXG4gIC8qXG4gIENvbnN0cnVjdGluZyBjb2xvcnNcbiAgKi9cbn1cbiIsImltcG9ydCB7IGRpc3BhdGNoLCBvZmYsIG9uIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFRhcmdldCBleHRlbmRzIEJhc2Uge1xuICBhZGRFdmVudExpc3RlbmVyKCkge31cblxuICBkaXNwYXRjaChldmVudCwgZGF0YSwgb3B0aW9ucykge1xuICAgIHJldHVybiBkaXNwYXRjaCh0aGlzLCBldmVudCwgZGF0YSwgb3B0aW9ucylcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCBiYWcgPSB0aGlzLmdldEV2ZW50SG9sZGVyKCkuZXZlbnRzXG4gICAgaWYgKCFiYWcpIHJldHVybiB0cnVlXG5cbiAgICBjb25zdCBldmVudHMgPSBiYWdbZXZlbnQudHlwZV1cblxuICAgIGZvciAoY29uc3QgaSBpbiBldmVudHMpIHtcbiAgICAgIGZvciAoY29uc3QgaiBpbiBldmVudHNbaV0pIHtcbiAgICAgICAgZXZlbnRzW2ldW2pdKGV2ZW50KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxuICB9XG5cbiAgLy8gRmlyZSBnaXZlbiBldmVudFxuICBmaXJlKGV2ZW50LCBkYXRhLCBvcHRpb25zKSB7XG4gICAgdGhpcy5kaXNwYXRjaChldmVudCwgZGF0YSwgb3B0aW9ucylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0RXZlbnRIb2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGdldEV2ZW50VGFyZ2V0KCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBVbmJpbmQgZXZlbnQgZnJvbSBsaXN0ZW5lclxuICBvZmYoZXZlbnQsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgb2ZmKHRoaXMsIGV2ZW50LCBsaXN0ZW5lciwgb3B0aW9ucylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQmluZCBnaXZlbiBldmVudCB0byBsaXN0ZW5lclxuICBvbihldmVudCwgbGlzdGVuZXIsIGJpbmRpbmcsIG9wdGlvbnMpIHtcbiAgICBvbih0aGlzLCBldmVudCwgbGlzdGVuZXIsIGJpbmRpbmcsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fVxufVxuXG5yZWdpc3RlcihFdmVudFRhcmdldCwgJ0V2ZW50VGFyZ2V0JylcbiIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG4vLyBpbXBvcnQgeyBzdWJDbGFzc0FycmF5IH0gZnJvbSAnLi9BcnJheVBvbHlmaWxsLmpzJ1xuXG5jbGFzcyBMaXN0IGV4dGVuZHMgQXJyYXkge1xuICBjb25zdHJ1Y3RvcihhcnIgPSBbXSwgLi4uYXJncykge1xuICAgIHN1cGVyKGFyciwgLi4uYXJncylcbiAgICBpZiAodHlwZW9mIGFyciA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5wdXNoKC4uLmFycilcbiAgfVxufVxuXG4vKiA9IHN1YkNsYXNzQXJyYXkoJ0xpc3QnLCBBcnJheSwgZnVuY3Rpb24gKGFyciA9IFtdKSB7XG4gIC8vIFRoaXMgY2F0Y2hlcyB0aGUgY2FzZSwgdGhhdCBuYXRpdmUgbWFwIHRyaWVzIHRvIGNyZWF0ZSBhbiBhcnJheSB3aXRoIG5ldyBBcnJheSgxKVxuICBpZiAodHlwZW9mIGFyciA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzXG4gIHRoaXMubGVuZ3RoID0gMFxuICB0aGlzLnB1c2goLi4uYXJyKVxufSkgKi9cblxuZXhwb3J0IGRlZmF1bHQgTGlzdFxuXG5leHRlbmQoW0xpc3RdLCB7XG4gIGVhY2goZm5Pck1ldGhvZE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGZuT3JNZXRob2ROYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoKGVsLCBpLCBhcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGZuT3JNZXRob2ROYW1lLmNhbGwoZWwsIGVsLCBpLCBhcnIpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoKGVsKSA9PiB7XG4gICAgICAgIHJldHVybiBlbFtmbk9yTWV0aG9kTmFtZV0oLi4uYXJncylcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMpXG4gIH1cbn0pXG5cbmNvbnN0IHJlc2VydmVkID0gWyd0b0FycmF5JywgJ2NvbnN0cnVjdG9yJywgJ2VhY2gnXVxuXG5MaXN0LmV4dGVuZCA9IGZ1bmN0aW9uIChtZXRob2RzKSB7XG4gIG1ldGhvZHMgPSBtZXRob2RzLnJlZHVjZSgob2JqLCBuYW1lKSA9PiB7XG4gICAgLy8gRG9uJ3Qgb3ZlcndyaXRlIG93biBtZXRob2RzXG4gICAgaWYgKHJlc2VydmVkLmluY2x1ZGVzKG5hbWUpKSByZXR1cm4gb2JqXG5cbiAgICAvLyBEb24ndCBhZGQgcHJpdmF0ZSBtZXRob2RzXG4gICAgaWYgKG5hbWVbMF0gPT09ICdfJykgcmV0dXJuIG9ialxuXG4gICAgLy8gQWxsb3cgYWNjZXNzIHRvIG9yaWdpbmFsIEFycmF5IG1ldGhvZHMgdGhyb3VnaCBhIHByZWZpeFxuICAgIGlmIChuYW1lIGluIEFycmF5LnByb3RvdHlwZSkge1xuICAgICAgb2JqWyckJyArIG5hbWVdID0gQXJyYXkucHJvdG90eXBlW25hbWVdXG4gICAgfVxuXG4gICAgLy8gUmVsYXkgZXZlcnkgY2FsbCB0byBlYWNoKClcbiAgICBvYmpbbmFtZV0gPSBmdW5jdGlvbiAoLi4uYXR0cnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2gobmFtZSwgLi4uYXR0cnMpXG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfSwge30pXG5cbiAgZXh0ZW5kKFtMaXN0XSwgbWV0aG9kcylcbn1cbiIsImltcG9ydCB7IGRlbGltaXRlciB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcbmltcG9ydCB7IHJhZGlhbnMgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4uL2VsZW1lbnRzL0VsZW1lbnQuanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9Qb2ludC5qcydcblxuZnVuY3Rpb24gY2xvc2VFbm91Z2goYSwgYiwgdGhyZXNob2xkKSB7XG4gIHJldHVybiBNYXRoLmFicyhiIC0gYSkgPCAodGhyZXNob2xkIHx8IDFlLTYpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIHN0YXRpYyBmb3JtYXRUcmFuc2Zvcm1zKG8pIHtcbiAgICAvLyBHZXQgYWxsIG9mIHRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIHRvIGZvcm0gdGhlIG1hdHJpeFxuICAgIGNvbnN0IGZsaXBCb3RoID0gby5mbGlwID09PSAnYm90aCcgfHwgby5mbGlwID09PSB0cnVlXG4gICAgY29uc3QgZmxpcFggPSBvLmZsaXAgJiYgKGZsaXBCb3RoIHx8IG8uZmxpcCA9PT0gJ3gnKSA/IC0xIDogMVxuICAgIGNvbnN0IGZsaXBZID0gby5mbGlwICYmIChmbGlwQm90aCB8fCBvLmZsaXAgPT09ICd5JykgPyAtMSA6IDFcbiAgICBjb25zdCBza2V3WCA9XG4gICAgICBvLnNrZXcgJiYgby5za2V3Lmxlbmd0aFxuICAgICAgICA/IG8uc2tld1swXVxuICAgICAgICA6IGlzRmluaXRlKG8uc2tldylcbiAgICAgICAgICA/IG8uc2tld1xuICAgICAgICAgIDogaXNGaW5pdGUoby5za2V3WClcbiAgICAgICAgICAgID8gby5za2V3WFxuICAgICAgICAgICAgOiAwXG4gICAgY29uc3Qgc2tld1kgPVxuICAgICAgby5za2V3ICYmIG8uc2tldy5sZW5ndGhcbiAgICAgICAgPyBvLnNrZXdbMV1cbiAgICAgICAgOiBpc0Zpbml0ZShvLnNrZXcpXG4gICAgICAgICAgPyBvLnNrZXdcbiAgICAgICAgICA6IGlzRmluaXRlKG8uc2tld1kpXG4gICAgICAgICAgICA/IG8uc2tld1lcbiAgICAgICAgICAgIDogMFxuICAgIGNvbnN0IHNjYWxlWCA9XG4gICAgICBvLnNjYWxlICYmIG8uc2NhbGUubGVuZ3RoXG4gICAgICAgID8gby5zY2FsZVswXSAqIGZsaXBYXG4gICAgICAgIDogaXNGaW5pdGUoby5zY2FsZSlcbiAgICAgICAgICA/IG8uc2NhbGUgKiBmbGlwWFxuICAgICAgICAgIDogaXNGaW5pdGUoby5zY2FsZVgpXG4gICAgICAgICAgICA/IG8uc2NhbGVYICogZmxpcFhcbiAgICAgICAgICAgIDogZmxpcFhcbiAgICBjb25zdCBzY2FsZVkgPVxuICAgICAgby5zY2FsZSAmJiBvLnNjYWxlLmxlbmd0aFxuICAgICAgICA/IG8uc2NhbGVbMV0gKiBmbGlwWVxuICAgICAgICA6IGlzRmluaXRlKG8uc2NhbGUpXG4gICAgICAgICAgPyBvLnNjYWxlICogZmxpcFlcbiAgICAgICAgICA6IGlzRmluaXRlKG8uc2NhbGVZKVxuICAgICAgICAgICAgPyBvLnNjYWxlWSAqIGZsaXBZXG4gICAgICAgICAgICA6IGZsaXBZXG4gICAgY29uc3Qgc2hlYXIgPSBvLnNoZWFyIHx8IDBcbiAgICBjb25zdCB0aGV0YSA9IG8ucm90YXRlIHx8IG8udGhldGEgfHwgMFxuICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBQb2ludChcbiAgICAgIG8ub3JpZ2luIHx8IG8uYXJvdW5kIHx8IG8ub3ggfHwgby5vcmlnaW5YLFxuICAgICAgby5veSB8fCBvLm9yaWdpbllcbiAgICApXG4gICAgY29uc3Qgb3ggPSBvcmlnaW4ueFxuICAgIGNvbnN0IG95ID0gb3JpZ2luLnlcbiAgICAvLyBXZSBuZWVkIFBvaW50IHRvIGJlIGludmFsaWQgaWYgbm90aGluZyB3YXMgcGFzc2VkIGJlY2F1c2Ugd2UgY2Fubm90IGRlZmF1bHQgdG8gMCBoZXJlLiBUaGF0IGlzIHdoeSBOYU5cbiAgICBjb25zdCBwb3NpdGlvbiA9IG5ldyBQb2ludChcbiAgICAgIG8ucG9zaXRpb24gfHwgby5weCB8fCBvLnBvc2l0aW9uWCB8fCBOYU4sXG4gICAgICBvLnB5IHx8IG8ucG9zaXRpb25ZIHx8IE5hTlxuICAgIClcbiAgICBjb25zdCBweCA9IHBvc2l0aW9uLnhcbiAgICBjb25zdCBweSA9IHBvc2l0aW9uLnlcbiAgICBjb25zdCB0cmFuc2xhdGUgPSBuZXcgUG9pbnQoXG4gICAgICBvLnRyYW5zbGF0ZSB8fCBvLnR4IHx8IG8udHJhbnNsYXRlWCxcbiAgICAgIG8udHkgfHwgby50cmFuc2xhdGVZXG4gICAgKVxuICAgIGNvbnN0IHR4ID0gdHJhbnNsYXRlLnhcbiAgICBjb25zdCB0eSA9IHRyYW5zbGF0ZS55XG4gICAgY29uc3QgcmVsYXRpdmUgPSBuZXcgUG9pbnQoXG4gICAgICBvLnJlbGF0aXZlIHx8IG8ucnggfHwgby5yZWxhdGl2ZVgsXG4gICAgICBvLnJ5IHx8IG8ucmVsYXRpdmVZXG4gICAgKVxuICAgIGNvbnN0IHJ4ID0gcmVsYXRpdmUueFxuICAgIGNvbnN0IHJ5ID0gcmVsYXRpdmUueVxuXG4gICAgLy8gUG9wdWxhdGUgYWxsIG9mIHRoZSB2YWx1ZXNcbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGVYLFxuICAgICAgc2NhbGVZLFxuICAgICAgc2tld1gsXG4gICAgICBza2V3WSxcbiAgICAgIHNoZWFyLFxuICAgICAgdGhldGEsXG4gICAgICByeCxcbiAgICAgIHJ5LFxuICAgICAgdHgsXG4gICAgICB0eSxcbiAgICAgIG94LFxuICAgICAgb3ksXG4gICAgICBweCxcbiAgICAgIHB5XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21BcnJheShhKSB7XG4gICAgcmV0dXJuIHsgYTogYVswXSwgYjogYVsxXSwgYzogYVsyXSwgZDogYVszXSwgZTogYVs0XSwgZjogYVs1XSB9XG4gIH1cblxuICBzdGF0aWMgaXNNYXRyaXhMaWtlKG8pIHtcbiAgICByZXR1cm4gKFxuICAgICAgby5hICE9IG51bGwgfHxcbiAgICAgIG8uYiAhPSBudWxsIHx8XG4gICAgICBvLmMgIT0gbnVsbCB8fFxuICAgICAgby5kICE9IG51bGwgfHxcbiAgICAgIG8uZSAhPSBudWxsIHx8XG4gICAgICBvLmYgIT0gbnVsbFxuICAgIClcbiAgfVxuXG4gIC8vIGxlZnQgbWF0cml4LCByaWdodCBtYXRyaXgsIHRhcmdldCBtYXRyaXggd2hpY2ggaXMgb3ZlcndyaXR0ZW5cbiAgc3RhdGljIG1hdHJpeE11bHRpcGx5KGwsIHIsIG8pIHtcbiAgICAvLyBXb3JrIG91dCB0aGUgcHJvZHVjdCBkaXJlY3RseVxuICAgIGNvbnN0IGEgPSBsLmEgKiByLmEgKyBsLmMgKiByLmJcbiAgICBjb25zdCBiID0gbC5iICogci5hICsgbC5kICogci5iXG4gICAgY29uc3QgYyA9IGwuYSAqIHIuYyArIGwuYyAqIHIuZFxuICAgIGNvbnN0IGQgPSBsLmIgKiByLmMgKyBsLmQgKiByLmRcbiAgICBjb25zdCBlID0gbC5lICsgbC5hICogci5lICsgbC5jICogci5mXG4gICAgY29uc3QgZiA9IGwuZiArIGwuYiAqIHIuZSArIGwuZCAqIHIuZlxuXG4gICAgLy8gbWFrZSBzdXJlIHRvIHVzZSBsb2NhbCB2YXJpYWJsZXMgYmVjYXVzZSBsL3IgYW5kIG8gY291bGQgYmUgdGhlIHNhbWVcbiAgICBvLmEgPSBhXG4gICAgby5iID0gYlxuICAgIG8uYyA9IGNcbiAgICBvLmQgPSBkXG4gICAgby5lID0gZVxuICAgIG8uZiA9IGZcblxuICAgIHJldHVybiBvXG4gIH1cblxuICBhcm91bmQoY3gsIGN5LCBtYXRyaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmFyb3VuZE8oY3gsIGN5LCBtYXRyaXgpXG4gIH1cblxuICAvLyBUcmFuc2Zvcm0gYXJvdW5kIGEgY2VudGVyIHBvaW50XG4gIGFyb3VuZE8oY3gsIGN5LCBtYXRyaXgpIHtcbiAgICBjb25zdCBkeCA9IGN4IHx8IDBcbiAgICBjb25zdCBkeSA9IGN5IHx8IDBcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVPKC1keCwgLWR5KS5sbXVsdGlwbHlPKG1hdHJpeCkudHJhbnNsYXRlTyhkeCwgZHkpXG4gIH1cblxuICAvLyBDbG9uZXMgdGhpcyBtYXRyaXhcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcylcbiAgfVxuXG4gIC8vIERlY29tcG9zZXMgdGhpcyBtYXRyaXggaW50byBpdHMgYWZmaW5lIHBhcmFtZXRlcnNcbiAgZGVjb21wb3NlKGN4ID0gMCwgY3kgPSAwKSB7XG4gICAgLy8gR2V0IHRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIG1hdHJpeFxuICAgIGNvbnN0IGEgPSB0aGlzLmFcbiAgICBjb25zdCBiID0gdGhpcy5iXG4gICAgY29uc3QgYyA9IHRoaXMuY1xuICAgIGNvbnN0IGQgPSB0aGlzLmRcbiAgICBjb25zdCBlID0gdGhpcy5lXG4gICAgY29uc3QgZiA9IHRoaXMuZlxuXG4gICAgLy8gRmlndXJlIG91dCBpZiB0aGUgd2luZGluZyBkaXJlY3Rpb24gaXMgY2xvY2t3aXNlIG9yIGNvdW50ZXJjbG9ja3dpc2VcbiAgICBjb25zdCBkZXRlcm1pbmFudCA9IGEgKiBkIC0gYiAqIGNcbiAgICBjb25zdCBjY3cgPSBkZXRlcm1pbmFudCA+IDAgPyAxIDogLTFcblxuICAgIC8vIFNpbmNlIHdlIG9ubHkgc2hlYXIgaW4geCwgd2UgY2FuIHVzZSB0aGUgeCBiYXNpcyB0byBnZXQgdGhlIHggc2NhbGVcbiAgICAvLyBhbmQgdGhlIHJvdGF0aW9uIG9mIHRoZSByZXN1bHRpbmcgbWF0cml4XG4gICAgY29uc3Qgc3ggPSBjY3cgKiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYilcbiAgICBjb25zdCB0aGV0YVJhZCA9IE1hdGguYXRhbjIoY2N3ICogYiwgY2N3ICogYSlcbiAgICBjb25zdCB0aGV0YSA9ICgxODAgLyBNYXRoLlBJKSAqIHRoZXRhUmFkXG4gICAgY29uc3QgY3QgPSBNYXRoLmNvcyh0aGV0YVJhZClcbiAgICBjb25zdCBzdCA9IE1hdGguc2luKHRoZXRhUmFkKVxuXG4gICAgLy8gV2UgY2FuIHRoZW4gc29sdmUgdGhlIHkgYmFzaXMgdmVjdG9yIHNpbXVsdGFuZW91c2x5IHRvIGdldCB0aGUgb3RoZXJcbiAgICAvLyB0d28gYWZmaW5lIHBhcmFtZXRlcnMgZGlyZWN0bHkgZnJvbSB0aGVzZSBwYXJhbWV0ZXJzXG4gICAgY29uc3QgbGFtID0gKGEgKiBjICsgYiAqIGQpIC8gZGV0ZXJtaW5hbnRcbiAgICBjb25zdCBzeSA9IChjICogc3gpIC8gKGxhbSAqIGEgLSBiKSB8fCAoZCAqIHN4KSAvIChsYW0gKiBiICsgYSlcblxuICAgIC8vIFVzZSB0aGUgdHJhbnNsYXRpb25zXG4gICAgY29uc3QgdHggPSBlIC0gY3ggKyBjeCAqIGN0ICogc3ggKyBjeSAqIChsYW0gKiBjdCAqIHN4IC0gc3QgKiBzeSlcbiAgICBjb25zdCB0eSA9IGYgLSBjeSArIGN4ICogc3QgKiBzeCArIGN5ICogKGxhbSAqIHN0ICogc3ggKyBjdCAqIHN5KVxuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBkZWNvbXBvc2l0aW9uIGFuZCByZXR1cm4gaXRcbiAgICByZXR1cm4ge1xuICAgICAgLy8gUmV0dXJuIHRoZSBhZmZpbmUgcGFyYW1ldGVyc1xuICAgICAgc2NhbGVYOiBzeCxcbiAgICAgIHNjYWxlWTogc3ksXG4gICAgICBzaGVhcjogbGFtLFxuICAgICAgcm90YXRlOiB0aGV0YSxcbiAgICAgIHRyYW5zbGF0ZVg6IHR4LFxuICAgICAgdHJhbnNsYXRlWTogdHksXG4gICAgICBvcmlnaW5YOiBjeCxcbiAgICAgIG9yaWdpblk6IGN5LFxuXG4gICAgICAvLyBSZXR1cm4gdGhlIG1hdHJpeCBwYXJhbWV0ZXJzXG4gICAgICBhOiB0aGlzLmEsXG4gICAgICBiOiB0aGlzLmIsXG4gICAgICBjOiB0aGlzLmMsXG4gICAgICBkOiB0aGlzLmQsXG4gICAgICBlOiB0aGlzLmUsXG4gICAgICBmOiB0aGlzLmZcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiB0d28gbWF0cmljZXMgYXJlIGVxdWFsXG4gIGVxdWFscyhvdGhlcikge1xuICAgIGlmIChvdGhlciA9PT0gdGhpcykgcmV0dXJuIHRydWVcbiAgICBjb25zdCBjb21wID0gbmV3IE1hdHJpeChvdGhlcilcbiAgICByZXR1cm4gKFxuICAgICAgY2xvc2VFbm91Z2godGhpcy5hLCBjb21wLmEpICYmXG4gICAgICBjbG9zZUVub3VnaCh0aGlzLmIsIGNvbXAuYikgJiZcbiAgICAgIGNsb3NlRW5vdWdoKHRoaXMuYywgY29tcC5jKSAmJlxuICAgICAgY2xvc2VFbm91Z2godGhpcy5kLCBjb21wLmQpICYmXG4gICAgICBjbG9zZUVub3VnaCh0aGlzLmUsIGNvbXAuZSkgJiZcbiAgICAgIGNsb3NlRW5vdWdoKHRoaXMuZiwgY29tcC5mKVxuICAgIClcbiAgfVxuXG4gIC8vIEZsaXAgbWF0cml4IG9uIHggb3IgeSwgYXQgYSBnaXZlbiBvZmZzZXRcbiAgZmxpcChheGlzLCBhcm91bmQpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmZsaXBPKGF4aXMsIGFyb3VuZClcbiAgfVxuXG4gIGZsaXBPKGF4aXMsIGFyb3VuZCkge1xuICAgIHJldHVybiBheGlzID09PSAneCdcbiAgICAgID8gdGhpcy5zY2FsZU8oLTEsIDEsIGFyb3VuZCwgMClcbiAgICAgIDogYXhpcyA9PT0gJ3knXG4gICAgICAgID8gdGhpcy5zY2FsZU8oMSwgLTEsIDAsIGFyb3VuZClcbiAgICAgICAgOiB0aGlzLnNjYWxlTygtMSwgLTEsIGF4aXMsIGFyb3VuZCB8fCBheGlzKSAvLyBEZWZpbmUgYW4geCwgeSBmbGlwIHBvaW50XG4gIH1cblxuICAvLyBJbml0aWFsaXplXG4gIGluaXQoc291cmNlKSB7XG4gICAgY29uc3QgYmFzZSA9IE1hdHJpeC5mcm9tQXJyYXkoWzEsIDAsIDAsIDEsIDAsIDBdKVxuXG4gICAgLy8gZW5zdXJlIHNvdXJjZSBhcyBvYmplY3RcbiAgICBzb3VyY2UgPVxuICAgICAgc291cmNlIGluc3RhbmNlb2YgRWxlbWVudFxuICAgICAgICA/IHNvdXJjZS5tYXRyaXhpZnkoKVxuICAgICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBNYXRyaXguZnJvbUFycmF5KHNvdXJjZS5zcGxpdChkZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KSlcbiAgICAgICAgICA6IEFycmF5LmlzQXJyYXkoc291cmNlKVxuICAgICAgICAgICAgPyBNYXRyaXguZnJvbUFycmF5KHNvdXJjZSlcbiAgICAgICAgICAgIDogdHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcgJiYgTWF0cml4LmlzTWF0cml4TGlrZShzb3VyY2UpXG4gICAgICAgICAgICAgID8gc291cmNlXG4gICAgICAgICAgICAgIDogdHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICA/IG5ldyBNYXRyaXgoKS50cmFuc2Zvcm0oc291cmNlKVxuICAgICAgICAgICAgICAgIDogYXJndW1lbnRzLmxlbmd0aCA9PT0gNlxuICAgICAgICAgICAgICAgICAgPyBNYXRyaXguZnJvbUFycmF5KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgICAgIDogYmFzZVxuXG4gICAgLy8gTWVyZ2UgdGhlIHNvdXJjZSBtYXRyaXggd2l0aCB0aGUgYmFzZSBtYXRyaXhcbiAgICB0aGlzLmEgPSBzb3VyY2UuYSAhPSBudWxsID8gc291cmNlLmEgOiBiYXNlLmFcbiAgICB0aGlzLmIgPSBzb3VyY2UuYiAhPSBudWxsID8gc291cmNlLmIgOiBiYXNlLmJcbiAgICB0aGlzLmMgPSBzb3VyY2UuYyAhPSBudWxsID8gc291cmNlLmMgOiBiYXNlLmNcbiAgICB0aGlzLmQgPSBzb3VyY2UuZCAhPSBudWxsID8gc291cmNlLmQgOiBiYXNlLmRcbiAgICB0aGlzLmUgPSBzb3VyY2UuZSAhPSBudWxsID8gc291cmNlLmUgOiBiYXNlLmVcbiAgICB0aGlzLmYgPSBzb3VyY2UuZiAhPSBudWxsID8gc291cmNlLmYgOiBiYXNlLmZcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbnZlcnNlKCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW52ZXJzZU8oKVxuICB9XG5cbiAgLy8gSW52ZXJzZXMgbWF0cml4XG4gIGludmVyc2VPKCkge1xuICAgIC8vIEdldCB0aGUgY3VycmVudCBwYXJhbWV0ZXJzIG91dCBvZiB0aGUgbWF0cml4XG4gICAgY29uc3QgYSA9IHRoaXMuYVxuICAgIGNvbnN0IGIgPSB0aGlzLmJcbiAgICBjb25zdCBjID0gdGhpcy5jXG4gICAgY29uc3QgZCA9IHRoaXMuZFxuICAgIGNvbnN0IGUgPSB0aGlzLmVcbiAgICBjb25zdCBmID0gdGhpcy5mXG5cbiAgICAvLyBJbnZlcnQgdGhlIDJ4MiBtYXRyaXggaW4gdGhlIHRvcCBsZWZ0XG4gICAgY29uc3QgZGV0ID0gYSAqIGQgLSBiICogY1xuICAgIGlmICghZGV0KSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZlcnQgJyArIHRoaXMpXG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIHRvcCAyeDIgbWF0cml4XG4gICAgY29uc3QgbmEgPSBkIC8gZGV0XG4gICAgY29uc3QgbmIgPSAtYiAvIGRldFxuICAgIGNvbnN0IG5jID0gLWMgLyBkZXRcbiAgICBjb25zdCBuZCA9IGEgLyBkZXRcblxuICAgIC8vIEFwcGx5IHRoZSBpbnZlcnRlZCBtYXRyaXggdG8gdGhlIHRvcCByaWdodFxuICAgIGNvbnN0IG5lID0gLShuYSAqIGUgKyBuYyAqIGYpXG4gICAgY29uc3QgbmYgPSAtKG5iICogZSArIG5kICogZilcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW52ZXJ0ZWQgbWF0cml4XG4gICAgdGhpcy5hID0gbmFcbiAgICB0aGlzLmIgPSBuYlxuICAgIHRoaXMuYyA9IG5jXG4gICAgdGhpcy5kID0gbmRcbiAgICB0aGlzLmUgPSBuZVxuICAgIHRoaXMuZiA9IG5mXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbG11bHRpcGx5KG1hdHJpeCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkubG11bHRpcGx5TyhtYXRyaXgpXG4gIH1cblxuICBsbXVsdGlwbHlPKG1hdHJpeCkge1xuICAgIGNvbnN0IHIgPSB0aGlzXG4gICAgY29uc3QgbCA9IG1hdHJpeCBpbnN0YW5jZW9mIE1hdHJpeCA/IG1hdHJpeCA6IG5ldyBNYXRyaXgobWF0cml4KVxuXG4gICAgcmV0dXJuIE1hdHJpeC5tYXRyaXhNdWx0aXBseShsLCByLCB0aGlzKVxuICB9XG5cbiAgLy8gTGVmdCBtdWx0aXBsaWVzIGJ5IHRoZSBnaXZlbiBtYXRyaXhcbiAgbXVsdGlwbHkobWF0cml4KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5tdWx0aXBseU8obWF0cml4KVxuICB9XG5cbiAgbXVsdGlwbHlPKG1hdHJpeCkge1xuICAgIC8vIEdldCB0aGUgbWF0cmljZXNcbiAgICBjb25zdCBsID0gdGhpc1xuICAgIGNvbnN0IHIgPSBtYXRyaXggaW5zdGFuY2VvZiBNYXRyaXggPyBtYXRyaXggOiBuZXcgTWF0cml4KG1hdHJpeClcblxuICAgIHJldHVybiBNYXRyaXgubWF0cml4TXVsdGlwbHkobCwgciwgdGhpcylcbiAgfVxuXG4gIC8vIFJvdGF0ZSBtYXRyaXhcbiAgcm90YXRlKHIsIGN4LCBjeSkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkucm90YXRlTyhyLCBjeCwgY3kpXG4gIH1cblxuICByb3RhdGVPKHIsIGN4ID0gMCwgY3kgPSAwKSB7XG4gICAgLy8gQ29udmVydCBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICByID0gcmFkaWFucyhyKVxuXG4gICAgY29uc3QgY29zID0gTWF0aC5jb3MocilcbiAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihyKVxuXG4gICAgY29uc3QgeyBhLCBiLCBjLCBkLCBlLCBmIH0gPSB0aGlzXG5cbiAgICB0aGlzLmEgPSBhICogY29zIC0gYiAqIHNpblxuICAgIHRoaXMuYiA9IGIgKiBjb3MgKyBhICogc2luXG4gICAgdGhpcy5jID0gYyAqIGNvcyAtIGQgKiBzaW5cbiAgICB0aGlzLmQgPSBkICogY29zICsgYyAqIHNpblxuICAgIHRoaXMuZSA9IGUgKiBjb3MgLSBmICogc2luICsgY3kgKiBzaW4gLSBjeCAqIGNvcyArIGN4XG4gICAgdGhpcy5mID0gZiAqIGNvcyArIGUgKiBzaW4gLSBjeCAqIHNpbiAtIGN5ICogY29zICsgY3lcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTY2FsZSBtYXRyaXhcbiAgc2NhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zY2FsZU8oLi4uYXJndW1lbnRzKVxuICB9XG5cbiAgc2NhbGVPKHgsIHkgPSB4LCBjeCA9IDAsIGN5ID0gMCkge1xuICAgIC8vIFN1cHBvcnQgdW5pZm9ybSBzY2FsaW5nXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGN5ID0gY3hcbiAgICAgIGN4ID0geVxuICAgICAgeSA9IHhcbiAgICB9XG5cbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcblxuICAgIHRoaXMuYSA9IGEgKiB4XG4gICAgdGhpcy5iID0gYiAqIHlcbiAgICB0aGlzLmMgPSBjICogeFxuICAgIHRoaXMuZCA9IGQgKiB5XG4gICAgdGhpcy5lID0gZSAqIHggLSBjeCAqIHggKyBjeFxuICAgIHRoaXMuZiA9IGYgKiB5IC0gY3kgKiB5ICsgY3lcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTaGVhciBtYXRyaXhcbiAgc2hlYXIoYSwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zaGVhck8oYSwgY3gsIGN5KVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIHNoZWFyTyhseCwgY3ggPSAwLCBjeSA9IDApIHtcbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcblxuICAgIHRoaXMuYSA9IGEgKyBiICogbHhcbiAgICB0aGlzLmMgPSBjICsgZCAqIGx4XG4gICAgdGhpcy5lID0gZSArIGYgKiBseCAtIGN5ICogbHhcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTa2V3IE1hdHJpeFxuICBza2V3KCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuc2tld08oLi4uYXJndW1lbnRzKVxuICB9XG5cbiAgc2tld08oeCwgeSA9IHgsIGN4ID0gMCwgY3kgPSAwKSB7XG4gICAgLy8gc3VwcG9ydCB1bmlmb3JtYWwgc2tld1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBjeSA9IGN4XG4gICAgICBjeCA9IHlcbiAgICAgIHkgPSB4XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICB4ID0gcmFkaWFucyh4KVxuICAgIHkgPSByYWRpYW5zKHkpXG5cbiAgICBjb25zdCBseCA9IE1hdGgudGFuKHgpXG4gICAgY29uc3QgbHkgPSBNYXRoLnRhbih5KVxuXG4gICAgY29uc3QgeyBhLCBiLCBjLCBkLCBlLCBmIH0gPSB0aGlzXG5cbiAgICB0aGlzLmEgPSBhICsgYiAqIGx4XG4gICAgdGhpcy5iID0gYiArIGEgKiBseVxuICAgIHRoaXMuYyA9IGMgKyBkICogbHhcbiAgICB0aGlzLmQgPSBkICsgYyAqIGx5XG4gICAgdGhpcy5lID0gZSArIGYgKiBseCAtIGN5ICogbHhcbiAgICB0aGlzLmYgPSBmICsgZSAqIGx5IC0gY3ggKiBseVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNrZXdYXG4gIHNrZXdYKHgsIGN4LCBjeSkge1xuICAgIHJldHVybiB0aGlzLnNrZXcoeCwgMCwgY3gsIGN5KVxuICB9XG5cbiAgLy8gU2tld1lcbiAgc2tld1koeSwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2tldygwLCB5LCBjeCwgY3kpXG4gIH1cblxuICB0b0FycmF5KCkge1xuICAgIHJldHVybiBbdGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLmUsIHRoaXMuZl1cbiAgfVxuXG4gIC8vIENvbnZlcnQgbWF0cml4IHRvIHN0cmluZ1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ21hdHJpeCgnICtcbiAgICAgIHRoaXMuYSArXG4gICAgICAnLCcgK1xuICAgICAgdGhpcy5iICtcbiAgICAgICcsJyArXG4gICAgICB0aGlzLmMgK1xuICAgICAgJywnICtcbiAgICAgIHRoaXMuZCArXG4gICAgICAnLCcgK1xuICAgICAgdGhpcy5lICtcbiAgICAgICcsJyArXG4gICAgICB0aGlzLmYgK1xuICAgICAgJyknXG4gICAgKVxuICB9XG5cbiAgLy8gVHJhbnNmb3JtIGEgbWF0cml4IGludG8gYW5vdGhlciBtYXRyaXggYnkgbWFuaXB1bGF0aW5nIHRoZSBzcGFjZVxuICB0cmFuc2Zvcm0obykge1xuICAgIC8vIENoZWNrIGlmIG8gaXMgYSBtYXRyaXggYW5kIHRoZW4gbGVmdCBtdWx0aXBseSBpdCBkaXJlY3RseVxuICAgIGlmIChNYXRyaXguaXNNYXRyaXhMaWtlKG8pKSB7XG4gICAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4KG8pXG4gICAgICByZXR1cm4gbWF0cml4Lm11bHRpcGx5Tyh0aGlzKVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgcHJvcG9zZWQgdHJhbnNmb3JtYXRpb25zIGFuZCB0aGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbnNcbiAgICBjb25zdCB0ID0gTWF0cml4LmZvcm1hdFRyYW5zZm9ybXMobylcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpc1xuICAgIGNvbnN0IHsgeDogb3gsIHk6IG95IH0gPSBuZXcgUG9pbnQodC5veCwgdC5veSkudHJhbnNmb3JtKGN1cnJlbnQpXG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIHJlc3VsdGluZyBtYXRyaXhcbiAgICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBNYXRyaXgoKVxuICAgICAgLnRyYW5zbGF0ZU8odC5yeCwgdC5yeSlcbiAgICAgIC5sbXVsdGlwbHlPKGN1cnJlbnQpXG4gICAgICAudHJhbnNsYXRlTygtb3gsIC1veSlcbiAgICAgIC5zY2FsZU8odC5zY2FsZVgsIHQuc2NhbGVZKVxuICAgICAgLnNrZXdPKHQuc2tld1gsIHQuc2tld1kpXG4gICAgICAuc2hlYXJPKHQuc2hlYXIpXG4gICAgICAucm90YXRlTyh0LnRoZXRhKVxuICAgICAgLnRyYW5zbGF0ZU8ob3gsIG95KVxuXG4gICAgLy8gSWYgd2Ugd2FudCB0aGUgb3JpZ2luIGF0IGEgcGFydGljdWxhciBwbGFjZSwgd2UgZm9yY2UgaXQgdGhlcmVcbiAgICBpZiAoaXNGaW5pdGUodC5weCkgfHwgaXNGaW5pdGUodC5weSkpIHtcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBQb2ludChveCwgb3kpLnRyYW5zZm9ybSh0cmFuc2Zvcm1lcilcbiAgICAgIC8vIFRPRE86IFJlcGxhY2UgdC5weCB3aXRoIGlzRmluaXRlKHQucHgpXG4gICAgICAvLyBEb2Vzbid0IHdvcmsgYmVjYXVzZSB0LnB4IGlzIGFsc28gMCBpZiBpdCB3YXNuJ3QgcGFzc2VkXG4gICAgICBjb25zdCBkeCA9IGlzRmluaXRlKHQucHgpID8gdC5weCAtIG9yaWdpbi54IDogMFxuICAgICAgY29uc3QgZHkgPSBpc0Zpbml0ZSh0LnB5KSA/IHQucHkgLSBvcmlnaW4ueSA6IDBcbiAgICAgIHRyYW5zZm9ybWVyLnRyYW5zbGF0ZU8oZHgsIGR5KVxuICAgIH1cblxuICAgIC8vIFRyYW5zbGF0ZSBub3cgYWZ0ZXIgcG9zaXRpb25pbmdcbiAgICB0cmFuc2Zvcm1lci50cmFuc2xhdGVPKHQudHgsIHQudHkpXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyXG4gIH1cblxuICAvLyBUcmFuc2xhdGUgbWF0cml4XG4gIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS50cmFuc2xhdGVPKHgsIHkpXG4gIH1cblxuICB0cmFuc2xhdGVPKHgsIHkpIHtcbiAgICB0aGlzLmUgKz0geCB8fCAwXG4gICAgdGhpcy5mICs9IHkgfHwgMFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhOiB0aGlzLmEsXG4gICAgICBiOiB0aGlzLmIsXG4gICAgICBjOiB0aGlzLmMsXG4gICAgICBkOiB0aGlzLmQsXG4gICAgICBlOiB0aGlzLmUsXG4gICAgICBmOiB0aGlzLmZcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN0bSgpIHtcbiAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcy5ub2RlLmdldENUTSgpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuQ1RNKCkge1xuICB0cnkge1xuICAgIC8qIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDQ1MzdcbiAgICAgICBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIEZGIGRvZXMgbm90IHJldHVybiB0aGUgdHJhbnNmb3JtYXRpb24gbWF0cml4XG4gICAgICAgZm9yIHRoZSBpbm5lciBjb29yZGluYXRlIHN5c3RlbSB3aGVuIGdldFNjcmVlbkNUTSgpIGlzIGNhbGxlZCBvbiBuZXN0ZWQgc3Zncy5cbiAgICAgICBIb3dldmVyIGFsbCBvdGhlciBCcm93c2VycyBkbyB0aGF0ICovXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlzUm9vdCA9PT0gJ2Z1bmN0aW9uJyAmJiAhdGhpcy5pc1Jvb3QoKSkge1xuICAgICAgY29uc3QgcmVjdCA9IHRoaXMucmVjdCgxLCAxKVxuICAgICAgY29uc3QgbSA9IHJlY3Qubm9kZS5nZXRTY3JlZW5DVE0oKVxuICAgICAgcmVjdC5yZW1vdmUoKVxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXgobSlcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcy5ub2RlLmdldFNjcmVlbkNUTSgpKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYENhbm5vdCBnZXQgQ1RNIGZyb20gU1ZHIG5vZGUgJHt0aGlzLm5vZGUubm9kZU5hbWV9LiBJcyB0aGUgZWxlbWVudCByZW5kZXJlZD9gXG4gICAgKVxuICAgIHJldHVybiBuZXcgTWF0cml4KClcbiAgfVxufVxuXG5yZWdpc3RlcihNYXRyaXgsICdNYXRyaXgnKVxuIiwiaW1wb3J0IFNWR0FycmF5IGZyb20gJy4vU1ZHQXJyYXkuanMnXG5pbXBvcnQgcGFyc2VyIGZyb20gJy4uL21vZHVsZXMvY29yZS9wYXJzZXIuanMnXG5pbXBvcnQgQm94IGZyb20gJy4vQm94LmpzJ1xuaW1wb3J0IHsgcGF0aFBhcnNlciB9IGZyb20gJy4uL3V0aWxzL3BhdGhQYXJzZXIuanMnXG5cbmZ1bmN0aW9uIGFycmF5VG9TdHJpbmcoYSkge1xuICBsZXQgcyA9ICcnXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IGEubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgIHMgKz0gYVtpXVswXVxuXG4gICAgaWYgKGFbaV1bMV0gIT0gbnVsbCkge1xuICAgICAgcyArPSBhW2ldWzFdXG5cbiAgICAgIGlmIChhW2ldWzJdICE9IG51bGwpIHtcbiAgICAgICAgcyArPSAnICdcbiAgICAgICAgcyArPSBhW2ldWzJdXG5cbiAgICAgICAgaWYgKGFbaV1bM10gIT0gbnVsbCkge1xuICAgICAgICAgIHMgKz0gJyAnXG4gICAgICAgICAgcyArPSBhW2ldWzNdXG4gICAgICAgICAgcyArPSAnICdcbiAgICAgICAgICBzICs9IGFbaV1bNF1cblxuICAgICAgICAgIGlmIChhW2ldWzVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHMgKz0gJyAnXG4gICAgICAgICAgICBzICs9IGFbaV1bNV1cbiAgICAgICAgICAgIHMgKz0gJyAnXG4gICAgICAgICAgICBzICs9IGFbaV1bNl1cblxuICAgICAgICAgICAgaWYgKGFbaV1bN10gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBzICs9ICcgJ1xuICAgICAgICAgICAgICBzICs9IGFbaV1bN11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcyArICcgJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoQXJyYXkgZXh0ZW5kcyBTVkdBcnJheSB7XG4gIC8vIEdldCBib3VuZGluZyBib3ggb2YgcGF0aFxuICBiYm94KCkge1xuICAgIHBhcnNlcigpLnBhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpcy50b1N0cmluZygpKVxuICAgIHJldHVybiBuZXcgQm94KHBhcnNlci5ub2Rlcy5wYXRoLmdldEJCb3goKSlcbiAgfVxuXG4gIC8vIE1vdmUgcGF0aCBzdHJpbmdcbiAgbW92ZSh4LCB5KSB7XG4gICAgLy8gZ2V0IGJvdW5kaW5nIGJveCBvZiBjdXJyZW50IHNpdHVhdGlvblxuICAgIGNvbnN0IGJveCA9IHRoaXMuYmJveCgpXG5cbiAgICAvLyBnZXQgcmVsYXRpdmUgb2Zmc2V0XG4gICAgeCAtPSBib3gueFxuICAgIHkgLT0gYm94LnlcblxuICAgIGlmICghaXNOYU4oeCkgJiYgIWlzTmFOKHkpKSB7XG4gICAgICAvLyBtb3ZlIGV2ZXJ5IHBvaW50XG4gICAgICBmb3IgKGxldCBsLCBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBsID0gdGhpc1tpXVswXVxuXG4gICAgICAgIGlmIChsID09PSAnTScgfHwgbCA9PT0gJ0wnIHx8IGwgPT09ICdUJykge1xuICAgICAgICAgIHRoaXNbaV1bMV0gKz0geFxuICAgICAgICAgIHRoaXNbaV1bMl0gKz0geVxuICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdIJykge1xuICAgICAgICAgIHRoaXNbaV1bMV0gKz0geFxuICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdWJykge1xuICAgICAgICAgIHRoaXNbaV1bMV0gKz0geVxuICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdDJyB8fCBsID09PSAnUycgfHwgbCA9PT0gJ1EnKSB7XG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB4XG4gICAgICAgICAgdGhpc1tpXVsyXSArPSB5XG4gICAgICAgICAgdGhpc1tpXVszXSArPSB4XG4gICAgICAgICAgdGhpc1tpXVs0XSArPSB5XG5cbiAgICAgICAgICBpZiAobCA9PT0gJ0MnKSB7XG4gICAgICAgICAgICB0aGlzW2ldWzVdICs9IHhcbiAgICAgICAgICAgIHRoaXNbaV1bNl0gKz0geVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsID09PSAnQScpIHtcbiAgICAgICAgICB0aGlzW2ldWzZdICs9IHhcbiAgICAgICAgICB0aGlzW2ldWzddICs9IHlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBBYnNvbHV0aXplIGFuZCBwYXJzZSBwYXRoIHRvIGFycmF5XG4gIHBhcnNlKGQgPSAnTTAgMCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkKSkge1xuICAgICAgZCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGQpLnRvU3RyaW5nKClcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFBhcnNlcihkKVxuICB9XG5cbiAgLy8gUmVzaXplIHBhdGggc3RyaW5nXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIC8vIGdldCBib3VuZGluZyBib3ggb2YgY3VycmVudCBzaXR1YXRpb25cbiAgICBjb25zdCBib3ggPSB0aGlzLmJib3goKVxuICAgIGxldCBpLCBsXG5cbiAgICAvLyBJZiB0aGUgYm94IHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZW4gd2UgaWdub3JlXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zIG9uIHRoZSByZXNwZWN0aXZlIGF4aXNcbiAgICBib3gud2lkdGggPSBib3gud2lkdGggPT09IDAgPyAxIDogYm94LndpZHRoXG4gICAgYm94LmhlaWdodCA9IGJveC5oZWlnaHQgPT09IDAgPyAxIDogYm94LmhlaWdodFxuXG4gICAgLy8gcmVjYWxjdWxhdGUgcG9zaXRpb24gb2YgYWxsIHBvaW50cyBhY2NvcmRpbmcgdG8gbmV3IHNpemVcbiAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsID0gdGhpc1tpXVswXVxuXG4gICAgICBpZiAobCA9PT0gJ00nIHx8IGwgPT09ICdMJyB8fCBsID09PSAnVCcpIHtcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XG4gICAgICAgIHRoaXNbaV1bMl0gPSAoKHRoaXNbaV1bMl0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XG4gICAgICB9IGVsc2UgaWYgKGwgPT09ICdIJykge1xuICAgICAgICB0aGlzW2ldWzFdID0gKCh0aGlzW2ldWzFdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcbiAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ1YnKSB7XG4gICAgICAgIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XG4gICAgICB9IGVsc2UgaWYgKGwgPT09ICdDJyB8fCBsID09PSAnUycgfHwgbCA9PT0gJ1EnKSB7XG4gICAgICAgIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxuICAgICAgICB0aGlzW2ldWzJdID0gKCh0aGlzW2ldWzJdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxuICAgICAgICB0aGlzW2ldWzNdID0gKCh0aGlzW2ldWzNdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcbiAgICAgICAgdGhpc1tpXVs0XSA9ICgodGhpc1tpXVs0XSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcblxuICAgICAgICBpZiAobCA9PT0gJ0MnKSB7XG4gICAgICAgICAgdGhpc1tpXVs1XSA9ICgodGhpc1tpXVs1XSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XG4gICAgICAgICAgdGhpc1tpXVs2XSA9ICgodGhpc1tpXVs2XSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsID09PSAnQScpIHtcbiAgICAgICAgLy8gcmVzaXplIHJhZGlpXG4gICAgICAgIHRoaXNbaV1bMV0gPSAodGhpc1tpXVsxXSAqIHdpZHRoKSAvIGJveC53aWR0aFxuICAgICAgICB0aGlzW2ldWzJdID0gKHRoaXNbaV1bMl0gKiBoZWlnaHQpIC8gYm94LmhlaWdodFxuXG4gICAgICAgIC8vIG1vdmUgcG9zaXRpb24gdmFsdWVzXG4gICAgICAgIHRoaXNbaV1bNl0gPSAoKHRoaXNbaV1bNl0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxuICAgICAgICB0aGlzW2ldWzddID0gKCh0aGlzW2ldWzddIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYXJyYXlUb1N0cmluZyh0aGlzKVxuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4vTWF0cml4LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XG4gIC8vIEluaXRpYWxpemVcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxuICB9XG5cbiAgLy8gQ2xvbmUgcG9pbnRcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzKVxuICB9XG5cbiAgaW5pdCh4LCB5KSB7XG4gICAgY29uc3QgYmFzZSA9IHsgeDogMCwgeTogMCB9XG5cbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkoeClcbiAgICAgID8geyB4OiB4WzBdLCB5OiB4WzFdIH1cbiAgICAgIDogdHlwZW9mIHggPT09ICdvYmplY3QnXG4gICAgICAgID8geyB4OiB4LngsIHk6IHgueSB9XG4gICAgICAgIDogeyB4OiB4LCB5OiB5IH1cblxuICAgIC8vIG1lcmdlIHNvdXJjZVxuICAgIHRoaXMueCA9IHNvdXJjZS54ID09IG51bGwgPyBiYXNlLnggOiBzb3VyY2UueFxuICAgIHRoaXMueSA9IHNvdXJjZS55ID09IG51bGwgPyBiYXNlLnkgOiBzb3VyY2UueVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV1cbiAgfVxuXG4gIHRyYW5zZm9ybShtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS50cmFuc2Zvcm1PKG0pXG4gIH1cblxuICAvLyBUcmFuc2Zvcm0gcG9pbnQgd2l0aCBtYXRyaXhcbiAgdHJhbnNmb3JtTyhtKSB7XG4gICAgaWYgKCFNYXRyaXguaXNNYXRyaXhMaWtlKG0pKSB7XG4gICAgICBtID0gbmV3IE1hdHJpeChtKVxuICAgIH1cblxuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpc1xuXG4gICAgLy8gUGVyZm9ybSB0aGUgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgdGhpcy54ID0gbS5hICogeCArIG0uYyAqIHkgKyBtLmVcbiAgICB0aGlzLnkgPSBtLmIgKiB4ICsgbS5kICogeSArIG0uZlxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnQoeCwgeSkge1xuICByZXR1cm4gbmV3IFBvaW50KHgsIHkpLnRyYW5zZm9ybU8odGhpcy5zY3JlZW5DVE0oKS5pbnZlcnNlTygpKVxufVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IFNWR0FycmF5IGZyb20gJy4vU1ZHQXJyYXkuanMnXG5pbXBvcnQgQm94IGZyb20gJy4vQm94LmpzJ1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL01hdHJpeC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRBcnJheSBleHRlbmRzIFNWR0FycmF5IHtcbiAgLy8gR2V0IGJvdW5kaW5nIGJveCBvZiBwb2ludHNcbiAgYmJveCgpIHtcbiAgICBsZXQgbWF4WCA9IC1JbmZpbml0eVxuICAgIGxldCBtYXhZID0gLUluZmluaXR5XG4gICAgbGV0IG1pblggPSBJbmZpbml0eVxuICAgIGxldCBtaW5ZID0gSW5maW5pdHlcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBtYXhYID0gTWF0aC5tYXgoZWxbMF0sIG1heFgpXG4gICAgICBtYXhZID0gTWF0aC5tYXgoZWxbMV0sIG1heFkpXG4gICAgICBtaW5YID0gTWF0aC5taW4oZWxbMF0sIG1pblgpXG4gICAgICBtaW5ZID0gTWF0aC5taW4oZWxbMV0sIG1pblkpXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IEJveChtaW5YLCBtaW5ZLCBtYXhYIC0gbWluWCwgbWF4WSAtIG1pblkpXG4gIH1cblxuICAvLyBNb3ZlIHBvaW50IHN0cmluZ1xuICBtb3ZlKHgsIHkpIHtcbiAgICBjb25zdCBib3ggPSB0aGlzLmJib3goKVxuXG4gICAgLy8gZ2V0IHJlbGF0aXZlIG9mZnNldFxuICAgIHggLT0gYm94LnhcbiAgICB5IC09IGJveC55XG5cbiAgICAvLyBtb3ZlIGV2ZXJ5IHBvaW50XG4gICAgaWYgKCFpc05hTih4KSAmJiAhaXNOYU4oeSkpIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXNbaV0gPSBbdGhpc1tpXVswXSArIHgsIHRoaXNbaV1bMV0gKyB5XVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBQYXJzZSBwb2ludCBzdHJpbmcgYW5kIGZsYXQgYXJyYXlcbiAgcGFyc2UoYXJyYXkgPSBbMCwgMF0pIHtcbiAgICBjb25zdCBwb2ludHMgPSBbXVxuXG4gICAgLy8gaWYgaXQgaXMgYW4gYXJyYXksIHdlIGZsYXR0ZW4gaXQgYW5kIHRoZXJlZm9yZSBjbG9uZSBpdCB0byAxIGRlcHRoc1xuICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBhcnJheSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFycmF5KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFbHNlLCBpdCBpcyBjb25zaWRlcmVkIGFzIGEgc3RyaW5nXG4gICAgICAvLyBwYXJzZSBwb2ludHNcbiAgICAgIGFycmF5ID0gYXJyYXkudHJpbSgpLnNwbGl0KGRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpXG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgcG9pbnRzIC0gaHR0cHM6Ly9zdmd3Zy5vcmcvc3ZnMi1kcmFmdC9zaGFwZXMuaHRtbCNEYXRhVHlwZVBvaW50c1xuICAgIC8vIE9kZCBudW1iZXIgb2YgY29vcmRpbmF0ZXMgaXMgYW4gZXJyb3IuIEluIHN1Y2ggY2FzZXMsIGRyb3AgdGhlIGxhc3Qgb2RkIGNvb3JkaW5hdGUuXG4gICAgaWYgKGFycmF5Lmxlbmd0aCAlIDIgIT09IDApIGFycmF5LnBvcCgpXG5cbiAgICAvLyB3cmFwIHBvaW50cyBpbiB0d28tdHVwbGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSA9IGkgKyAyKSB7XG4gICAgICBwb2ludHMucHVzaChbYXJyYXlbaV0sIGFycmF5W2kgKyAxXV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50c1xuICB9XG5cbiAgLy8gUmVzaXplIHBvbHkgc3RyaW5nXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGxldCBpXG4gICAgY29uc3QgYm94ID0gdGhpcy5iYm94KClcblxuICAgIC8vIHJlY2FsY3VsYXRlIHBvc2l0aW9uIG9mIGFsbCBwb2ludHMgYWNjb3JkaW5nIHRvIG5ldyBzaXplXG4gICAgZm9yIChpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKGJveC53aWR0aClcbiAgICAgICAgdGhpc1tpXVswXSA9ICgodGhpc1tpXVswXSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XG4gICAgICBpZiAoYm94LmhlaWdodClcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQ29udmVydCBhcnJheSB0byBsaW5lIG9iamVjdFxuICB0b0xpbmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHgxOiB0aGlzWzBdWzBdLFxuICAgICAgeTE6IHRoaXNbMF1bMV0sXG4gICAgICB4MjogdGhpc1sxXVswXSxcbiAgICAgIHkyOiB0aGlzWzFdWzFdXG4gICAgfVxuICB9XG5cbiAgLy8gQ29udmVydCBhcnJheSB0byBzdHJpbmdcbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXVxuICAgIC8vIGNvbnZlcnQgdG8gYSBwb2x5IHBvaW50IHN0cmluZ1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IHRoaXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgYXJyYXkucHVzaCh0aGlzW2ldLmpvaW4oJywnKSlcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXkuam9pbignICcpXG4gIH1cblxuICB0cmFuc2Zvcm0obSkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkudHJhbnNmb3JtTyhtKVxuICB9XG5cbiAgLy8gdHJhbnNmb3JtIHBvaW50cyB3aXRoIG1hdHJpeCAoc2ltaWxhciB0byBQb2ludC50cmFuc2Zvcm0pXG4gIHRyYW5zZm9ybU8obSkge1xuICAgIGlmICghTWF0cml4LmlzTWF0cml4TGlrZShtKSkge1xuICAgICAgbSA9IG5ldyBNYXRyaXgobSlcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gdGhpcy5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAvLyBQZXJmb3JtIHRoZSBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXNbaV1cbiAgICAgIHRoaXNbaV1bMF0gPSBtLmEgKiB4ICsgbS5jICogeSArIG0uZVxuICAgICAgdGhpc1tpXVsxXSA9IG0uYiAqIHggKyBtLmQgKiB5ICsgbS5mXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdBcnJheSBleHRlbmRzIEFycmF5IHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgdGhpcy5pbml0KC4uLmFyZ3MpXG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcylcbiAgfVxuXG4gIGluaXQoYXJyKSB7XG4gICAgLy8gVGhpcyBjYXRjaGVzIHRoZSBjYXNlLCB0aGF0IG5hdGl2ZSBtYXAgdHJpZXMgdG8gY3JlYXRlIGFuIGFycmF5IHdpdGggbmV3IEFycmF5KDEpXG4gICAgaWYgKHR5cGVvZiBhcnIgPT09ICdudW1iZXInKSByZXR1cm4gdGhpc1xuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMucHVzaCguLi50aGlzLnBhcnNlKGFycikpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFBhcnNlIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIHN0cmluZ1xuICBwYXJzZShhcnJheSA9IFtdKSB7XG4gICAgLy8gSWYgYWxyZWFkeSBpcyBhbiBhcnJheSwgbm8gbmVlZCB0byBwYXJzZSBpdFxuICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gYXJyYXlcblxuICAgIHJldHVybiBhcnJheS50cmltKCkuc3BsaXQoZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdClcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMpXG4gIH1cblxuICB0b1NldCgpIHtcbiAgICByZXR1cm4gbmV3IFNldCh0aGlzKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuam9pbignICcpXG4gIH1cblxuICAvLyBGbGF0dGVucyB0aGUgYXJyYXkgaWYgbmVlZGVkXG4gIHZhbHVlT2YoKSB7XG4gICAgY29uc3QgcmV0ID0gW11cbiAgICByZXQucHVzaCguLi50aGlzKVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuIiwiaW1wb3J0IHsgbnVtYmVyQW5kVW5pdCB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcblxuLy8gTW9kdWxlIGZvciB1bml0IGNvbnZlcnNpb25zXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdOdW1iZXIge1xuICAvLyBJbml0aWFsaXplXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIGNvbnZlcnQodW5pdCkge1xuICAgIHJldHVybiBuZXcgU1ZHTnVtYmVyKHRoaXMudmFsdWUsIHVuaXQpXG4gIH1cblxuICAvLyBEaXZpZGUgbnVtYmVyXG4gIGRpdmlkZShudW1iZXIpIHtcbiAgICBudW1iZXIgPSBuZXcgU1ZHTnVtYmVyKG51bWJlcilcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzIC8gbnVtYmVyLCB0aGlzLnVuaXQgfHwgbnVtYmVyLnVuaXQpXG4gIH1cblxuICBpbml0KHZhbHVlLCB1bml0KSB7XG4gICAgdW5pdCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMV0gOiB1bml0XG4gICAgdmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlWzBdIDogdmFsdWVcblxuICAgIC8vIGluaXRpYWxpemUgZGVmYXVsdHNcbiAgICB0aGlzLnZhbHVlID0gMFxuICAgIHRoaXMudW5pdCA9IHVuaXQgfHwgJydcblxuICAgIC8vIHBhcnNlIHZhbHVlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIC8vIGVuc3VyZSBhIHZhbGlkIG51bWVyaWMgdmFsdWVcbiAgICAgIHRoaXMudmFsdWUgPSBpc05hTih2YWx1ZSlcbiAgICAgICAgPyAwXG4gICAgICAgIDogIWlzRmluaXRlKHZhbHVlKVxuICAgICAgICAgID8gdmFsdWUgPCAwXG4gICAgICAgICAgICA/IC0zLjRlMzhcbiAgICAgICAgICAgIDogKzMuNGUzOFxuICAgICAgICAgIDogdmFsdWVcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuaXQgPSB2YWx1ZS5tYXRjaChudW1iZXJBbmRVbml0KVxuXG4gICAgICBpZiAodW5pdCkge1xuICAgICAgICAvLyBtYWtlIHZhbHVlIG51bWVyaWNcbiAgICAgICAgdGhpcy52YWx1ZSA9IHBhcnNlRmxvYXQodW5pdFsxXSlcblxuICAgICAgICAvLyBub3JtYWxpemVcbiAgICAgICAgaWYgKHVuaXRbNV0gPT09ICclJykge1xuICAgICAgICAgIHRoaXMudmFsdWUgLz0gMTAwXG4gICAgICAgIH0gZWxzZSBpZiAodW5pdFs1XSA9PT0gJ3MnKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSAqPSAxMDAwXG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9yZSB1bml0XG4gICAgICAgIHRoaXMudW5pdCA9IHVuaXRbNV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU1ZHTnVtYmVyKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZU9mKClcbiAgICAgICAgdGhpcy51bml0ID0gdmFsdWUudW5pdFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTdWJ0cmFjdCBudW1iZXJcbiAgbWludXMobnVtYmVyKSB7XG4gICAgbnVtYmVyID0gbmV3IFNWR051bWJlcihudW1iZXIpXG4gICAgcmV0dXJuIG5ldyBTVkdOdW1iZXIodGhpcyAtIG51bWJlciwgdGhpcy51bml0IHx8IG51bWJlci51bml0KVxuICB9XG5cbiAgLy8gQWRkIG51bWJlclxuICBwbHVzKG51bWJlcikge1xuICAgIG51bWJlciA9IG5ldyBTVkdOdW1iZXIobnVtYmVyKVxuICAgIHJldHVybiBuZXcgU1ZHTnVtYmVyKHRoaXMgKyBudW1iZXIsIHRoaXMudW5pdCB8fCBudW1iZXIudW5pdClcbiAgfVxuXG4gIC8vIE11bHRpcGx5IG51bWJlclxuICB0aW1lcyhudW1iZXIpIHtcbiAgICBudW1iZXIgPSBuZXcgU1ZHTnVtYmVyKG51bWJlcilcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzICogbnVtYmVyLCB0aGlzLnVuaXQgfHwgbnVtYmVyLnVuaXQpXG4gIH1cblxuICB0b0FycmF5KCkge1xuICAgIHJldHVybiBbdGhpcy52YWx1ZSwgdGhpcy51bml0XVxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy51bml0ID09PSAnJSdcbiAgICAgICAgPyB+fih0aGlzLnZhbHVlICogMWU4KSAvIDFlNlxuICAgICAgICA6IHRoaXMudW5pdCA9PT0gJ3MnXG4gICAgICAgICAgPyB0aGlzLnZhbHVlIC8gMWUzXG4gICAgICAgICAgOiB0aGlzLnZhbHVlKSArIHRoaXMudW5pdFxuICAgIClcbiAgfVxuXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxufVxuIiwiaW1wb3J0IHsgYWRkTWV0aG9kTmFtZXMgfSBmcm9tICcuL21ldGhvZHMuanMnXG5pbXBvcnQgeyBjYXBpdGFsaXplIH0gZnJvbSAnLi91dGlscy5qcydcbmltcG9ydCB7IHN2ZyB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCBCYXNlIGZyb20gJy4uL3R5cGVzL0Jhc2UuanMnXG5cbmNvbnN0IGVsZW1lbnRzID0ge31cbmV4cG9ydCBjb25zdCByb290ID0gJ19fX1NZTUJPTF9fX1JPT1RfX18nXG5cbi8vIE1ldGhvZCBmb3IgZWxlbWVudCBjcmVhdGlvblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShuYW1lLCBucyA9IHN2Zykge1xuICAvLyBjcmVhdGUgZWxlbWVudFxuICByZXR1cm4gZ2xvYmFscy5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsIG5hbWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW5zdGFuY2UoZWxlbWVudCwgaXNIVE1MID0gZmFsc2UpIHtcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gZWxlbWVudFxuXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYWRvcHRlcihlbGVtZW50KVxuICB9XG5cbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiBuZXcgZWxlbWVudHNbcm9vdF0oKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyAmJiBlbGVtZW50LmNoYXJBdCgwKSAhPT0gJzwnKSB7XG4gICAgcmV0dXJuIGFkb3B0ZXIoZ2xvYmFscy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpKVxuICB9XG5cbiAgLy8gTWFrZSBzdXJlLCB0aGF0IEhUTUwgZWxlbWVudHMgYXJlIGNyZWF0ZWQgd2l0aCB0aGUgY29ycmVjdCBuYW1lc3BhY2VcbiAgY29uc3Qgd3JhcHBlciA9IGlzSFRNTCA/IGdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOiBjcmVhdGUoJ3N2ZycpXG4gIHdyYXBwZXIuaW5uZXJIVE1MID0gZWxlbWVudFxuXG4gIC8vIFdlIGNhbiB1c2UgZmlyc3RDaGlsZCBoZXJlIGJlY2F1c2Ugd2Uga25vdyxcbiAgLy8gdGhhdCB0aGUgZmlyc3QgY2hhciBpcyA8IGFuZCB0aHVzIGFuIGVsZW1lbnRcbiAgZWxlbWVudCA9IGFkb3B0ZXIod3JhcHBlci5maXJzdENoaWxkKVxuXG4gIC8vIG1ha2Ugc3VyZSwgdGhhdCBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBpdHMgd3JhcHBlciBhdHRhY2hlZFxuICB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuZmlyc3RDaGlsZClcbiAgcmV0dXJuIGVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVPck5ldyhuYW1lLCBub2RlKSB7XG4gIHJldHVybiBub2RlICYmXG4gICAgKG5vZGUgaW5zdGFuY2VvZiBnbG9iYWxzLndpbmRvdy5Ob2RlIHx8XG4gICAgICAobm9kZS5vd25lckRvY3VtZW50ICYmXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuTm9kZSkpXG4gICAgPyBub2RlXG4gICAgOiBjcmVhdGUobmFtZSlcbn1cblxuLy8gQWRvcHQgZXhpc3Rpbmcgc3ZnIGVsZW1lbnRzXG5leHBvcnQgZnVuY3Rpb24gYWRvcHQobm9kZSkge1xuICAvLyBjaGVjayBmb3IgcHJlc2VuY2Ugb2Ygbm9kZVxuICBpZiAoIW5vZGUpIHJldHVybiBudWxsXG5cbiAgLy8gbWFrZSBzdXJlIGEgbm9kZSBpc24ndCBhbHJlYWR5IGFkb3B0ZWRcbiAgaWYgKG5vZGUuaW5zdGFuY2UgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gbm9kZS5pbnN0YW5jZVxuXG4gIGlmIChub2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50LWZyYWdtZW50Jykge1xuICAgIHJldHVybiBuZXcgZWxlbWVudHMuRnJhZ21lbnQobm9kZSlcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgdmFyaWFibGVzXG4gIGxldCBjbGFzc05hbWUgPSBjYXBpdGFsaXplKG5vZGUubm9kZU5hbWUgfHwgJ0RvbScpXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgZ3JhZGllbnRzIGFyZSBhZG9wdGVkIGNvcnJlY3RseVxuICBpZiAoY2xhc3NOYW1lID09PSAnTGluZWFyR3JhZGllbnQnIHx8IGNsYXNzTmFtZSA9PT0gJ1JhZGlhbEdyYWRpZW50Jykge1xuICAgIGNsYXNzTmFtZSA9ICdHcmFkaWVudCdcblxuICAgIC8vIEZhbGxiYWNrIHRvIERvbSBpZiBlbGVtZW50IGlzIG5vdCBrbm93blxuICB9IGVsc2UgaWYgKCFlbGVtZW50c1tjbGFzc05hbWVdKSB7XG4gICAgY2xhc3NOYW1lID0gJ0RvbSdcbiAgfVxuXG4gIHJldHVybiBuZXcgZWxlbWVudHNbY2xhc3NOYW1lXShub2RlKVxufVxuXG5sZXQgYWRvcHRlciA9IGFkb3B0XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2NrQWRvcHQobW9jayA9IGFkb3B0KSB7XG4gIGFkb3B0ZXIgPSBtb2NrXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcihlbGVtZW50LCBuYW1lID0gZWxlbWVudC5uYW1lLCBhc1Jvb3QgPSBmYWxzZSkge1xuICBlbGVtZW50c1tuYW1lXSA9IGVsZW1lbnRcbiAgaWYgKGFzUm9vdCkgZWxlbWVudHNbcm9vdF0gPSBlbGVtZW50XG5cbiAgYWRkTWV0aG9kTmFtZXMoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZWxlbWVudC5wcm90b3R5cGUpKVxuXG4gIHJldHVybiBlbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzcyhuYW1lKSB7XG4gIHJldHVybiBlbGVtZW50c1tuYW1lXVxufVxuXG4vLyBFbGVtZW50IGlkIHNlcXVlbmNlXG5sZXQgZGlkID0gMTAwMFxuXG4vLyBHZXQgbmV4dCBuYW1lZCBlbGVtZW50IGlkXG5leHBvcnQgZnVuY3Rpb24gZWlkKG5hbWUpIHtcbiAgcmV0dXJuICdTdmdqcycgKyBjYXBpdGFsaXplKG5hbWUpICsgZGlkKytcbn1cblxuLy8gRGVlcCBuZXcgaWQgYXNzaWdubWVudFxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk5ld0lkKG5vZGUpIHtcbiAgLy8gZG8gdGhlIHNhbWUgZm9yIFNWRyBjaGlsZCBub2RlcyBhcyB3ZWxsXG4gIGZvciAobGV0IGkgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgYXNzaWduTmV3SWQobm9kZS5jaGlsZHJlbltpXSlcbiAgfVxuXG4gIGlmIChub2RlLmlkKSB7XG4gICAgbm9kZS5pZCA9IGVpZChub2RlLm5vZGVOYW1lKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vLyBNZXRob2QgZm9yIGV4dGVuZGluZyBvYmplY3RzXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG1vZHVsZXMsIG1ldGhvZHMpIHtcbiAgbGV0IGtleSwgaVxuXG4gIG1vZHVsZXMgPSBBcnJheS5pc0FycmF5KG1vZHVsZXMpID8gbW9kdWxlcyA6IFttb2R1bGVzXVxuXG4gIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBtb2R1bGVzW2ldLnByb3RvdHlwZVtrZXldID0gbWV0aG9kc1trZXldXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwV2l0aEF0dHJDaGVjayhmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBvID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG5cbiAgICBpZiAobyAmJiBvLmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiYgIShvIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncy5zbGljZSgwLCAtMSkpLmF0dHIobylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBtZXRob2RzID0ge31cbmNvbnN0IG5hbWVzID0gW11cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhuYW1lLCBtKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgZm9yIChjb25zdCBfbmFtZSBvZiBuYW1lKSB7XG4gICAgICByZWdpc3Rlck1ldGhvZHMoX25hbWUsIG0pXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3QgX25hbWUgaW4gbmFtZSkge1xuICAgICAgcmVnaXN0ZXJNZXRob2RzKF9uYW1lLCBuYW1lW19uYW1lXSlcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBhZGRNZXRob2ROYW1lcyhPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtKSlcbiAgbWV0aG9kc1tuYW1lXSA9IE9iamVjdC5hc3NpZ24obWV0aG9kc1tuYW1lXSB8fCB7fSwgbSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1ldGhvZHNGb3IobmFtZSkge1xuICByZXR1cm4gbWV0aG9kc1tuYW1lXSB8fCB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0aG9kTmFtZXMoKSB7XG4gIHJldHVybiBbLi4ubmV3IFNldChuYW1lcyldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRNZXRob2ROYW1lcyhfbmFtZXMpIHtcbiAgbmFtZXMucHVzaCguLi5fbmFtZXMpXG59XG4iLCJpbXBvcnQgeyBpc1BhdGhMZXR0ZXIgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vdHlwZXMvUG9pbnQuanMnXG5cbmNvbnN0IHNlZ21lbnRQYXJhbWV0ZXJzID0ge1xuICBNOiAyLFxuICBMOiAyLFxuICBIOiAxLFxuICBWOiAxLFxuICBDOiA2LFxuICBTOiA0LFxuICBROiA0LFxuICBUOiAyLFxuICBBOiA3LFxuICBaOiAwXG59XG5cbmNvbnN0IHBhdGhIYW5kbGVycyA9IHtcbiAgTTogZnVuY3Rpb24gKGMsIHAsIHAwKSB7XG4gICAgcC54ID0gcDAueCA9IGNbMF1cbiAgICBwLnkgPSBwMC55ID0gY1sxXVxuXG4gICAgcmV0dXJuIFsnTScsIHAueCwgcC55XVxuICB9LFxuICBMOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueCA9IGNbMF1cbiAgICBwLnkgPSBjWzFdXG4gICAgcmV0dXJuIFsnTCcsIGNbMF0sIGNbMV1dXG4gIH0sXG4gIEg6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC54ID0gY1swXVxuICAgIHJldHVybiBbJ0gnLCBjWzBdXVxuICB9LFxuICBWOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueSA9IGNbMF1cbiAgICByZXR1cm4gWydWJywgY1swXV1cbiAgfSxcbiAgQzogZnVuY3Rpb24gKGMsIHApIHtcbiAgICBwLnggPSBjWzRdXG4gICAgcC55ID0gY1s1XVxuICAgIHJldHVybiBbJ0MnLCBjWzBdLCBjWzFdLCBjWzJdLCBjWzNdLCBjWzRdLCBjWzVdXVxuICB9LFxuICBTOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueCA9IGNbMl1cbiAgICBwLnkgPSBjWzNdXG4gICAgcmV0dXJuIFsnUycsIGNbMF0sIGNbMV0sIGNbMl0sIGNbM11dXG4gIH0sXG4gIFE6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC54ID0gY1syXVxuICAgIHAueSA9IGNbM11cbiAgICByZXR1cm4gWydRJywgY1swXSwgY1sxXSwgY1syXSwgY1szXV1cbiAgfSxcbiAgVDogZnVuY3Rpb24gKGMsIHApIHtcbiAgICBwLnggPSBjWzBdXG4gICAgcC55ID0gY1sxXVxuICAgIHJldHVybiBbJ1QnLCBjWzBdLCBjWzFdXVxuICB9LFxuICBaOiBmdW5jdGlvbiAoYywgcCwgcDApIHtcbiAgICBwLnggPSBwMC54XG4gICAgcC55ID0gcDAueVxuICAgIHJldHVybiBbJ1onXVxuICB9LFxuICBBOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueCA9IGNbNV1cbiAgICBwLnkgPSBjWzZdXG4gICAgcmV0dXJuIFsnQScsIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sIGNbNF0sIGNbNV0sIGNbNl1dXG4gIH1cbn1cblxuY29uc3QgbWxodnF0Y3NheiA9ICdtbGh2cXRjc2F6Jy5zcGxpdCgnJylcblxuZm9yIChsZXQgaSA9IDAsIGlsID0gbWxodnF0Y3Nhei5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gIHBhdGhIYW5kbGVyc1ttbGh2cXRjc2F6W2ldXSA9IChmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYywgcCwgcDApIHtcbiAgICAgIGlmIChpID09PSAnSCcpIGNbMF0gPSBjWzBdICsgcC54XG4gICAgICBlbHNlIGlmIChpID09PSAnVicpIGNbMF0gPSBjWzBdICsgcC55XG4gICAgICBlbHNlIGlmIChpID09PSAnQScpIHtcbiAgICAgICAgY1s1XSA9IGNbNV0gKyBwLnhcbiAgICAgICAgY1s2XSA9IGNbNl0gKyBwLnlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IGMubGVuZ3RoOyBqIDwgamw7ICsraikge1xuICAgICAgICAgIGNbal0gPSBjW2pdICsgKGogJSAyID8gcC55IDogcC54KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXRoSGFuZGxlcnNbaV0oYywgcCwgcDApXG4gICAgfVxuICB9KShtbGh2cXRjc2F6W2ldLnRvVXBwZXJDYXNlKCkpXG59XG5cbmZ1bmN0aW9uIG1ha2VBYnNvbHV0KHBhcnNlcikge1xuICBjb25zdCBjb21tYW5kID0gcGFyc2VyLnNlZ21lbnRbMF1cbiAgcmV0dXJuIHBhdGhIYW5kbGVyc1tjb21tYW5kXShwYXJzZXIuc2VnbWVudC5zbGljZSgxKSwgcGFyc2VyLnAsIHBhcnNlci5wMClcbn1cblxuZnVuY3Rpb24gc2VnbWVudENvbXBsZXRlKHBhcnNlcikge1xuICByZXR1cm4gKFxuICAgIHBhcnNlci5zZWdtZW50Lmxlbmd0aCAmJlxuICAgIHBhcnNlci5zZWdtZW50Lmxlbmd0aCAtIDEgPT09XG4gICAgICBzZWdtZW50UGFyYW1ldGVyc1twYXJzZXIuc2VnbWVudFswXS50b1VwcGVyQ2FzZSgpXVxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXJ0TmV3U2VnbWVudChwYXJzZXIsIHRva2VuKSB7XG4gIHBhcnNlci5pbk51bWJlciAmJiBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIGZhbHNlKVxuICBjb25zdCBwYXRoTGV0dGVyID0gaXNQYXRoTGV0dGVyLnRlc3QodG9rZW4pXG5cbiAgaWYgKHBhdGhMZXR0ZXIpIHtcbiAgICBwYXJzZXIuc2VnbWVudCA9IFt0b2tlbl1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsYXN0Q29tbWFuZCA9IHBhcnNlci5sYXN0Q29tbWFuZFxuICAgIGNvbnN0IHNtYWxsID0gbGFzdENvbW1hbmQudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGlzU21hbGwgPSBsYXN0Q29tbWFuZCA9PT0gc21hbGxcbiAgICBwYXJzZXIuc2VnbWVudCA9IFtzbWFsbCA9PT0gJ20nID8gKGlzU21hbGwgPyAnbCcgOiAnTCcpIDogbGFzdENvbW1hbmRdXG4gIH1cblxuICBwYXJzZXIuaW5TZWdtZW50ID0gdHJ1ZVxuICBwYXJzZXIubGFzdENvbW1hbmQgPSBwYXJzZXIuc2VnbWVudFswXVxuXG4gIHJldHVybiBwYXRoTGV0dGVyXG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgaW5OdW1iZXIpIHtcbiAgaWYgKCFwYXJzZXIuaW5OdW1iZXIpIHRocm93IG5ldyBFcnJvcignUGFyc2VyIEVycm9yJylcbiAgcGFyc2VyLm51bWJlciAmJiBwYXJzZXIuc2VnbWVudC5wdXNoKHBhcnNlRmxvYXQocGFyc2VyLm51bWJlcikpXG4gIHBhcnNlci5pbk51bWJlciA9IGluTnVtYmVyXG4gIHBhcnNlci5udW1iZXIgPSAnJ1xuICBwYXJzZXIucG9pbnRTZWVuID0gZmFsc2VcbiAgcGFyc2VyLmhhc0V4cG9uZW50ID0gZmFsc2VcblxuICBpZiAoc2VnbWVudENvbXBsZXRlKHBhcnNlcikpIHtcbiAgICBmaW5hbGl6ZVNlZ21lbnQocGFyc2VyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplU2VnbWVudChwYXJzZXIpIHtcbiAgcGFyc2VyLmluU2VnbWVudCA9IGZhbHNlXG4gIGlmIChwYXJzZXIuYWJzb2x1dGUpIHtcbiAgICBwYXJzZXIuc2VnbWVudCA9IG1ha2VBYnNvbHV0KHBhcnNlcilcbiAgfVxuICBwYXJzZXIuc2VnbWVudHMucHVzaChwYXJzZXIuc2VnbWVudClcbn1cblxuZnVuY3Rpb24gaXNBcmNGbGFnKHBhcnNlcikge1xuICBpZiAoIXBhcnNlci5zZWdtZW50Lmxlbmd0aCkgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IGlzQXJjID0gcGFyc2VyLnNlZ21lbnRbMF0udG9VcHBlckNhc2UoKSA9PT0gJ0EnXG4gIGNvbnN0IGxlbmd0aCA9IHBhcnNlci5zZWdtZW50Lmxlbmd0aFxuXG4gIHJldHVybiBpc0FyYyAmJiAobGVuZ3RoID09PSA0IHx8IGxlbmd0aCA9PT0gNSlcbn1cblxuZnVuY3Rpb24gaXNFeHBvbmVudGlhbChwYXJzZXIpIHtcbiAgcmV0dXJuIHBhcnNlci5sYXN0VG9rZW4udG9VcHBlckNhc2UoKSA9PT0gJ0UnXG59XG5cbmNvbnN0IHBhdGhEZWxpbWl0ZXJzID0gbmV3IFNldChbJyAnLCAnLCcsICdcXHQnLCAnXFxuJywgJ1xccicsICdcXGYnXSlcbmV4cG9ydCBmdW5jdGlvbiBwYXRoUGFyc2VyKGQsIHRvQWJzb2x1dGUgPSB0cnVlKSB7XG4gIGxldCBpbmRleCA9IDBcbiAgbGV0IHRva2VuID0gJydcbiAgY29uc3QgcGFyc2VyID0ge1xuICAgIHNlZ21lbnQ6IFtdLFxuICAgIGluTnVtYmVyOiBmYWxzZSxcbiAgICBudW1iZXI6ICcnLFxuICAgIGxhc3RUb2tlbjogJycsXG4gICAgaW5TZWdtZW50OiBmYWxzZSxcbiAgICBzZWdtZW50czogW10sXG4gICAgcG9pbnRTZWVuOiBmYWxzZSxcbiAgICBoYXNFeHBvbmVudDogZmFsc2UsXG4gICAgYWJzb2x1dGU6IHRvQWJzb2x1dGUsXG4gICAgcDA6IG5ldyBQb2ludCgpLFxuICAgIHA6IG5ldyBQb2ludCgpXG4gIH1cblxuICB3aGlsZSAoKChwYXJzZXIubGFzdFRva2VuID0gdG9rZW4pLCAodG9rZW4gPSBkLmNoYXJBdChpbmRleCsrKSkpKSB7XG4gICAgaWYgKCFwYXJzZXIuaW5TZWdtZW50KSB7XG4gICAgICBpZiAoc3RhcnROZXdTZWdtZW50KHBhcnNlciwgdG9rZW4pKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRva2VuID09PSAnLicpIHtcbiAgICAgIGlmIChwYXJzZXIucG9pbnRTZWVuIHx8IHBhcnNlci5oYXNFeHBvbmVudCkge1xuICAgICAgICBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIGZhbHNlKVxuICAgICAgICAtLWluZGV4XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBwYXJzZXIuaW5OdW1iZXIgPSB0cnVlXG4gICAgICBwYXJzZXIucG9pbnRTZWVuID0gdHJ1ZVxuICAgICAgcGFyc2VyLm51bWJlciArPSB0b2tlblxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHRva2VuKSkpIHtcbiAgICAgIGlmIChwYXJzZXIubnVtYmVyID09PSAnMCcgfHwgaXNBcmNGbGFnKHBhcnNlcikpIHtcbiAgICAgICAgcGFyc2VyLmluTnVtYmVyID0gdHJ1ZVxuICAgICAgICBwYXJzZXIubnVtYmVyID0gdG9rZW5cbiAgICAgICAgZmluYWxpemVOdW1iZXIocGFyc2VyLCB0cnVlKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwYXJzZXIuaW5OdW1iZXIgPSB0cnVlXG4gICAgICBwYXJzZXIubnVtYmVyICs9IHRva2VuXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChwYXRoRGVsaW1pdGVycy5oYXModG9rZW4pKSB7XG4gICAgICBpZiAocGFyc2VyLmluTnVtYmVyKSB7XG4gICAgICAgIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgZmFsc2UpXG4gICAgICB9XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmICh0b2tlbiA9PT0gJy0nIHx8IHRva2VuID09PSAnKycpIHtcbiAgICAgIGlmIChwYXJzZXIuaW5OdW1iZXIgJiYgIWlzRXhwb25lbnRpYWwocGFyc2VyKSkge1xuICAgICAgICBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIGZhbHNlKVxuICAgICAgICAtLWluZGV4XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBwYXJzZXIubnVtYmVyICs9IHRva2VuXG4gICAgICBwYXJzZXIuaW5OdW1iZXIgPSB0cnVlXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmICh0b2tlbi50b1VwcGVyQ2FzZSgpID09PSAnRScpIHtcbiAgICAgIHBhcnNlci5udW1iZXIgKz0gdG9rZW5cbiAgICAgIHBhcnNlci5oYXNFeHBvbmVudCA9IHRydWVcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGlzUGF0aExldHRlci50ZXN0KHRva2VuKSkge1xuICAgICAgaWYgKHBhcnNlci5pbk51bWJlcikge1xuICAgICAgICBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIGZhbHNlKVxuICAgICAgfSBlbHNlIGlmICghc2VnbWVudENvbXBsZXRlKHBhcnNlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXJzZXIgRXJyb3InKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWxpemVTZWdtZW50KHBhcnNlcilcbiAgICAgIH1cbiAgICAgIC0taW5kZXhcbiAgICB9XG4gIH1cblxuICBpZiAocGFyc2VyLmluTnVtYmVyKSB7XG4gICAgZmluYWxpemVOdW1iZXIocGFyc2VyLCBmYWxzZSlcbiAgfVxuXG4gIGlmIChwYXJzZXIuaW5TZWdtZW50ICYmIHNlZ21lbnRDb21wbGV0ZShwYXJzZXIpKSB7XG4gICAgZmluYWxpemVTZWdtZW50KHBhcnNlcilcbiAgfVxuXG4gIHJldHVybiBwYXJzZXIuc2VnbWVudHNcbn1cbiIsIi8vIE1hcCBmdW5jdGlvblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChhcnJheSwgYmxvY2spIHtcbiAgbGV0IGlcbiAgY29uc3QgaWwgPSBhcnJheS5sZW5ndGhcbiAgY29uc3QgcmVzdWx0ID0gW11cblxuICBmb3IgKGkgPSAwOyBpIDwgaWw7IGkrKykge1xuICAgIHJlc3VsdC5wdXNoKGJsb2NrKGFycmF5W2ldKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gRmlsdGVyIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKGFycmF5LCBibG9jaykge1xuICBsZXQgaVxuICBjb25zdCBpbCA9IGFycmF5Lmxlbmd0aFxuICBjb25zdCByZXN1bHQgPSBbXVxuXG4gIGZvciAoaSA9IDA7IGkgPCBpbDsgaSsrKSB7XG4gICAgaWYgKGJsb2NrKGFycmF5W2ldKSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaV0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBEZWdyZWVzIHRvIHJhZGlhbnNcbmV4cG9ydCBmdW5jdGlvbiByYWRpYW5zKGQpIHtcbiAgcmV0dXJuICgoZCAlIDM2MCkgKiBNYXRoLlBJKSAvIDE4MFxufVxuXG4vLyBSYWRpYW5zIHRvIGRlZ3JlZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWdyZWVzKHIpIHtcbiAgcmV0dXJuICgociAqIDE4MCkgLyBNYXRoLlBJKSAlIDM2MFxufVxuXG4vLyBDb252ZXJ0IGNhbWVsIGNhc2VkIHN0cmluZyB0byBkYXNoIHNlcGFyYXRlZFxuZXhwb3J0IGZ1bmN0aW9uIHVuQ2FtZWxDYXNlKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbiAobSwgZykge1xuICAgIHJldHVybiAnLScgKyBnLnRvTG93ZXJDYXNlKClcbiAgfSlcbn1cblxuLy8gQ2FwaXRhbGl6ZSBmaXJzdCBsZXR0ZXIgb2YgYSBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHMpIHtcbiAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpXG59XG5cbi8vIENhbGN1bGF0ZSBwcm9wb3J0aW9uYWwgd2lkdGggYW5kIGhlaWdodCB2YWx1ZXMgd2hlbiBuZWNlc3NhcnlcbmV4cG9ydCBmdW5jdGlvbiBwcm9wb3J0aW9uYWxTaXplKGVsZW1lbnQsIHdpZHRoLCBoZWlnaHQsIGJveCkge1xuICBpZiAod2lkdGggPT0gbnVsbCB8fCBoZWlnaHQgPT0gbnVsbCkge1xuICAgIGJveCA9IGJveCB8fCBlbGVtZW50LmJib3goKVxuXG4gICAgaWYgKHdpZHRoID09IG51bGwpIHtcbiAgICAgIHdpZHRoID0gKGJveC53aWR0aCAvIGJveC5oZWlnaHQpICogaGVpZ2h0XG4gICAgfSBlbHNlIGlmIChoZWlnaHQgPT0gbnVsbCkge1xuICAgICAgaGVpZ2h0ID0gKGJveC5oZWlnaHQgLyBib3gud2lkdGgpICogd2lkdGhcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhZGRzIHN1cHBvcnQgZm9yIHN0cmluZyBvcmlnaW5zLlxuICogSXQgc2VhcmNoZXMgZm9yIGFuIG9yaWdpbiBpbiBvLm9yaWdpbiBvLm94IGFuZCBvLm9yaWdpblguXG4gKiBUaGlzIHdheSwgb3JpZ2luOiB7eDogJ2NlbnRlcicsIHk6IDUwfSBjYW4gYmUgcGFzc2VkIGFzIHdlbGwgYXMgb3g6ICdjZW50ZXInLCBveTogNTBcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcmlnaW4obywgZWxlbWVudCkge1xuICBjb25zdCBvcmlnaW4gPSBvLm9yaWdpblxuICAvLyBGaXJzdCBjaGVjayBpZiBvcmlnaW4gaXMgaW4gb3ggb3Igb3JpZ2luWFxuICBsZXQgb3ggPSBvLm94ICE9IG51bGwgPyBvLm94IDogby5vcmlnaW5YICE9IG51bGwgPyBvLm9yaWdpblggOiAnY2VudGVyJ1xuICBsZXQgb3kgPSBvLm95ICE9IG51bGwgPyBvLm95IDogby5vcmlnaW5ZICE9IG51bGwgPyBvLm9yaWdpblkgOiAnY2VudGVyJ1xuXG4gIC8vIFRoZW4gY2hlY2sgaWYgb3JpZ2luIHdhcyB1c2VkIGFuZCBvdmVyd3JpdGUgaW4gdGhhdCBjYXNlXG4gIGlmIChvcmlnaW4gIT0gbnVsbCkge1xuICAgIDtbb3gsIG95XSA9IEFycmF5LmlzQXJyYXkob3JpZ2luKVxuICAgICAgPyBvcmlnaW5cbiAgICAgIDogdHlwZW9mIG9yaWdpbiA9PT0gJ29iamVjdCdcbiAgICAgICAgPyBbb3JpZ2luLngsIG9yaWdpbi55XVxuICAgICAgICA6IFtvcmlnaW4sIG9yaWdpbl1cbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB0byBvbmx5IGNhbGwgYmJveCB3aGVuIGFjdHVhbGx5IG5lZWRlZFxuICBjb25zdCBjb25kWCA9IHR5cGVvZiBveCA9PT0gJ3N0cmluZydcbiAgY29uc3QgY29uZFkgPSB0eXBlb2Ygb3kgPT09ICdzdHJpbmcnXG4gIGlmIChjb25kWCB8fCBjb25kWSkge1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCwgeCwgeSB9ID0gZWxlbWVudC5iYm94KClcblxuICAgIC8vIEFuZCBvbmx5IG92ZXJ3cml0ZSBpZiBzdHJpbmcgd2FzIHBhc3NlZCBmb3IgdGhpcyBzcGVjaWZpYyBheGlzXG4gICAgaWYgKGNvbmRYKSB7XG4gICAgICBveCA9IG94LmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgICAgPyB4XG4gICAgICAgIDogb3guaW5jbHVkZXMoJ3JpZ2h0JylcbiAgICAgICAgICA/IHggKyB3aWR0aFxuICAgICAgICAgIDogeCArIHdpZHRoIC8gMlxuICAgIH1cblxuICAgIGlmIChjb25kWSkge1xuICAgICAgb3kgPSBveS5pbmNsdWRlcygndG9wJylcbiAgICAgICAgPyB5XG4gICAgICAgIDogb3kuaW5jbHVkZXMoJ2JvdHRvbScpXG4gICAgICAgICAgPyB5ICsgaGVpZ2h0XG4gICAgICAgICAgOiB5ICsgaGVpZ2h0IC8gMlxuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgb3JpZ2luIGFzIGl0IGlzIGlmIGl0IHdhc24ndCBhIHN0cmluZ1xuICByZXR1cm4gW294LCBveV1cbn1cblxuY29uc3QgZGVzY3JpcHRpdmVFbGVtZW50cyA9IG5ldyBTZXQoWydkZXNjJywgJ21ldGFkYXRhJywgJ3RpdGxlJ10pXG5leHBvcnQgY29uc3QgaXNEZXNjcmlwdGl2ZSA9IChlbGVtZW50KSA9PlxuICBkZXNjcmlwdGl2ZUVsZW1lbnRzLmhhcyhlbGVtZW50Lm5vZGVOYW1lKVxuXG5leHBvcnQgY29uc3Qgd3JpdGVEYXRhVG9Eb20gPSAoZWxlbWVudCwgZGF0YSwgZGVmYXVsdHMgPSB7fSkgPT4ge1xuICBjb25zdCBjbG9uZWQgPSB7IC4uLmRhdGEgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGNsb25lZCkge1xuICAgIGlmIChjbG9uZWRba2V5XS52YWx1ZU9mKCkgPT09IGRlZmF1bHRzW2tleV0pIHtcbiAgICAgIGRlbGV0ZSBjbG9uZWRba2V5XVxuICAgIH1cbiAgfVxuXG4gIGlmIChPYmplY3Qua2V5cyhjbG9uZWQpLmxlbmd0aCkge1xuICAgIGVsZW1lbnQubm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ZnanMnLCBKU09OLnN0cmluZ2lmeShjbG9uZWQpKSAvLyBzZWUgIzQyOFxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQubm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3ZnanMnKVxuICAgIGVsZW1lbnQubm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3N2Z2pzOmRhdGEnKVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgZ2xvYmFscyA9IHtcbiAgd2luZG93OiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3csXG4gIGRvY3VtZW50OiB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRvY3VtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcldpbmRvdyh3aW4gPSBudWxsLCBkb2MgPSBudWxsKSB7XG4gIGdsb2JhbHMud2luZG93ID0gd2luXG4gIGdsb2JhbHMuZG9jdW1lbnQgPSBkb2Ncbn1cblxuY29uc3Qgc2F2ZSA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlV2luZG93KCkge1xuICBzYXZlLndpbmRvdyA9IGdsb2JhbHMud2luZG93XG4gIHNhdmUuZG9jdW1lbnQgPSBnbG9iYWxzLmRvY3VtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlV2luZG93KCkge1xuICBnbG9iYWxzLndpbmRvdyA9IHNhdmUud2luZG93XG4gIGdsb2JhbHMuZG9jdW1lbnQgPSBzYXZlLmRvY3VtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoV2luZG93KHdpbiwgZm4pIHtcbiAgc2F2ZVdpbmRvdygpXG4gIHJlZ2lzdGVyV2luZG93KHdpbiwgd2luLmRvY3VtZW50KVxuICBmbih3aW4sIHdpbi5kb2N1bWVudClcbiAgcmVzdG9yZVdpbmRvdygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIHJldHVybiBnbG9iYWxzLndpbmRvd1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBFbmdpbmUsIFN1Ym1pdEZ1bmN0aW9uIH0gZnJvbSBcIn4vZW5naW5lXCI7XG5pbXBvcnQgeyBCaW5hcnlIZWFwIH0gZnJvbSBcIn4vaGVhcHMvQmluYXJ5SGVhcFwiO1xuaW1wb3J0IHsgUHJpb1F1ZXVlQWxnb3JpdGhtQ29udHJvbCB9IGZyb20gXCIuL2FsZ29yaXRobS1jb250cm9scy9wcmlvcXVldWUtYWxnb3JpdGhtLWNvbnRyb2xzXCI7XG5pbXBvcnQgeyBpbml0aWFsaXNlRW5naW5lLCBSZWNvcmRPZkVuZ2luZXMgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJpb3F1ZXVlIGV4dGVuZHMgRW5naW5lIHtcbiAgICBpbnNlcnQ6IFN1Ym1pdEZ1bmN0aW9uO1xuICAgIGRlbGV0ZU1pbjogU3VibWl0RnVuY3Rpb247XG59XG5cbmNvbnN0IFBSSU9RVUVVRV9DTEFTU0VTID0ge1xuICAgIEJpbmFyeUhlYXA6IEJpbmFyeUhlYXAsXG59IGFzIGNvbnN0IHNhdGlzZmllcyBSZWNvcmRPZkVuZ2luZXM8UHJpb3F1ZXVlPjtcblxuY29uc3QgeyBlbmdpbmUsIGlzQmFzZUVuZ2luZSB9ID0gaW5pdGlhbGlzZUVuZ2luZTxQcmlvcXVldWU+KFxuICAgIFwiI3ByaW9xdWV1ZXNDb250YWluZXJcIixcbiAgICBQUklPUVVFVUVfQ0xBU1NFU1xuKTtcblxuaWYgKCFpc0Jhc2VFbmdpbmUpIHtcbiAgICBlbmdpbmUuYWxnb3JpdGhtQ29udHJvbHMgPSBuZXcgUHJpb1F1ZXVlQWxnb3JpdGhtQ29udHJvbChcbiAgICAgICAgZW5naW5lLmNvbnRhaW5lcixcbiAgICAgICAgZW5naW5lXG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==