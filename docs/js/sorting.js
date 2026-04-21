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

/***/ "./src/algorithm-controls/sorting-algorithm-controls.ts":
/*!**************************************************************!*\
  !*** ./src/algorithm-controls/sorting-algorithm-controls.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortingAlgorithmControls: () => (/* binding */ SortingAlgorithmControls)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine-algorithm-controls */ "./src/algorithm-controls/engine-algorithm-controls.ts");


class SortingAlgorithmControls extends _engine_algorithm_controls__WEBPACK_IMPORTED_MODULE_1__.EngineAlgorithmControl {
    constructor(container, engine) {
        super(container);
        this.engine = engine;
        this.insertSelect = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("select.insertSelect", container);
        this.insertField = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.insertField", container);
        this.insertSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.insertSubmit", container);
        this.clearSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.clearSubmit", container);
        this.pseudoCode = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("div.pseudoCode", container);
        this.sortSubmit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.querySelector)("input.sortSubmit", container);
        this.initialize();
    }
    initialize() {
        this.insertSelect.addEventListener("change", () => {
            this.insertField.value = this.insertSelect.value;
            this.insertSelect.value = "";
        });
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addReturnSubmit)(this.insertField, "ALPHANUM+", () => this.engine.submit(this.engine.insert, this.insertField));
        this.insertSubmit.addEventListener("click", () => this.engine.submit(this.engine.insert, this.insertField));
        this.sortSubmit.addEventListener("click", () => this.engine.submit(this.engine.sort, null));
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

/***/ "./src/sorting/InsertionSort.ts":
/*!**************************************!*\
  !*** ./src/sorting/InsertionSort.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InsertionSort: () => (/* binding */ InsertionSort),
/* harmony export */   InsertionSortMessages: () => (/* binding */ InsertionSortMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _sorting_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/sorting/sort */ "./src/sorting/sort.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const InsertionSortMessages = {
    sort: {
        swap: (a, b) => `Swap ${a} and ${b} since ${a} is smaller`,
        smallerLeft: (a, b) => `${a} is smaller than ${b} no swap`,
        record: (a) => `The record is set to ${a}`,
    },
};
class InsertionSort extends _sorting_sort__WEBPACK_IMPORTED_MODULE_2__.Sort {
    constructor() {
        super(...arguments);
        this.messages = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.updateDefault)(InsertionSortMessages, _sorting_sort__WEBPACK_IMPORTED_MODULE_2__.SortMessages);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let sortSize = this.sortArray.getSize();
            if (sortSize <= 1) {
                yield this.pause("general.empty");
                return;
            }
            if (this.sortArray.getValue(this.sortArray.getSize() - 1) === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
                this.sortArray.setSize(this.sortArray.getSize() - 1);
                sortSize--;
            }
            this.sortArray.center(this.getTreeRoot()[0] + this.compensate, this.getTreeRoot()[1] + this.$Svg.margin * 4);
            for (let i = 1; i < sortSize; i++) {
                let j = i;
                while (j > 0) {
                    this.sortArray.setIndexHighlight(j, true);
                    this.sortArray.setIndexHighlight(j - 1, true);
                    yield this.pause("sort.compare", this.sortArray.getValue(j), this.sortArray.getValue(j - 1));
                    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(this.sortArray.getValue(j), this.sortArray.getValue(j - 1)) >= 0) {
                        yield this.pause("sort.smallerLeft", this.sortArray.getValue(j - 1), this.sortArray.getValue(j));
                        this.sortArray.setIndexHighlight(j, false);
                        this.sortArray.setIndexHighlight(j - 1, false);
                        break;
                    }
                    yield this.swap(this.sortArray, j, j - 1);
                    this.sortArray.setIndexHighlight(j, false);
                    this.sortArray.setIndexHighlight(j - 1, false);
                    j -= 1;
                }
            }
        });
    }
}


/***/ }),

/***/ "./src/sorting/MergeSort.ts":
/*!**********************************!*\
  !*** ./src/sorting/MergeSort.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MergeSort: () => (/* binding */ MergeSort),
/* harmony export */   MergeSortMessages: () => (/* binding */ MergeSortMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _objects_dsarray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/objects/dsarray */ "./src/objects/dsarray.ts");
/* harmony import */ var _objects_text_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/objects/text-circle */ "./src/objects/text-circle.ts");
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sort */ "./src/sorting/sort.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const MergeSortMessages = {
    sort: {
        split: (a, b) => `Split ${a} from ${b}`,
        move: (a) => `Move ${a} to upper array`,
        foundNewMin: (a) => `Found a smaller value ${a}`,
    },
};
class MergeSort extends _sort__WEBPACK_IMPORTED_MODULE_4__.Sort {
    constructor() {
        super(...arguments);
        this.mergeArrayList = [];
        this.messages = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.updateDefault)(MergeSortMessages, _sort__WEBPACK_IMPORTED_MODULE_4__.SortMessages);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            const sortSize = this.sortArray.getSize();
            if (sortSize <= 1) {
                yield this.pause("general.empty");
                return;
            }
            for (let i = 0; i < this.mergeArrayList.length; i++) {
                this.mergeArrayList[i].remove();
            }
            this.compensate = 0;
            this.mergeArrayList = [];
            this.sortArray.getValues();
            if (this.sortArray.getValue(this.sortArray.getSize() - 1) === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
                this.sortArray.setSize(this.sortArray.getSize() - 1);
            }
            for (let i = 0; i < this.sortArray.getSize(); i++) {
                this.sortArray.setDisabled(i, true);
            }
            this.sortArray.center(this.getTreeRoot()[0], this.getTreeRoot()[1] + this.$Svg.margin * 4);
            yield this.mergeSort(this.sortArray, 0, this.sortArray.getSize(), 1);
            yield this.pause("general.finished");
        });
    }
    mergeSort(arr, left, right, iteration) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                if (left >= right) {
                    return;
                }
                const mid = Math.ceil(left + (right - left) / 2);
                const yCenter = this.getTreeRoot()[1];
                const baseY = this.$Svg.margin * 4;
                const CX = arr.getCX(0);
                if (arr.getSize() > 2) {
                    const mergeArray1 = this.Svg.put(new _objects_dsarray__WEBPACK_IMPORTED_MODULE_2__.DSArray(mid - left, this.getObjectSize())).init(mid - left, CX, arr.cy());
                    for (let k = 0; k < mid; k++) {
                        mergeArray1.setValue(k, arr.getValue(k));
                    }
                    this.animate(mergeArray1)
                        .cx(CX - (arr.engine().getObjectSize() * 2) / iteration)
                        .cy(yCenter +
                        (baseY * iteration * this.getObjectSize()) / this.baseSize +
                        baseY);
                    yield this.pause("sort.split", mergeArray1.getValues(), arr.getValues());
                    const mergeArray2 = this.Svg.put(new _objects_dsarray__WEBPACK_IMPORTED_MODULE_2__.DSArray(right - mid, this.getObjectSize())).init(right - mid, arr.getCX(mid), arr.cy());
                    for (let k = 0; k + mid < right; k++) {
                        mergeArray2.setValue(k, arr.getValue(k + mid));
                    }
                    this.animate(mergeArray2)
                        .cx(arr.getCX(arr.getSize() - 1) +
                        (arr.engine().getObjectSize() * 2) / iteration)
                        .cy(yCenter +
                        (baseY * iteration * this.getObjectSize()) / this.baseSize +
                        baseY);
                    yield this.pause("sort.split", mergeArray2.getValues(), arr.getValues());
                    this.mergeArrayList.push(mergeArray1);
                    this.mergeArrayList.push(mergeArray2);
                    if (mergeArray1.getCX(0) < this.$Svg.margin) {
                        this.compensate =
                            mergeArray1.getCX(0) * -1 + this.$Svg.margin;
                        const sortArrayCenter = this.sortArray.getCX(this.sortArray.getSize() / 2);
                        this.sortArray.center(sortArrayCenter + this.compensate, this.sortArray.cy());
                        for (let j = 0; j < this.mergeArrayList.length; j++) {
                            const midPoint = this.mergeArrayList[j].getSize() / 2;
                            const centerCords = this.mergeArrayList[j].getCX(midPoint);
                            this.mergeArrayList[j].center(centerCords + this.compensate, this.mergeArrayList[j].cy());
                        }
                    }
                    yield this.mergeSort(mergeArray1, left, mid, iteration + 1);
                    yield this.mergeSort(mergeArray2, 0, right - mid, iteration + 1);
                    yield this.merge(arr, mergeArray1, mergeArray2);
                }
                else if (arr.getSize() === 2) {
                    yield this.pause("sort.compare", arr.getValue(0), arr.getValue(1));
                    if (arr.getValue(0) > arr.getValue(1)) {
                        yield this.swap(arr, 0, 1);
                        arr.setIndexHighlight(0, false);
                        arr.setIndexHighlight(1, false);
                    }
                    arr.setDisabled(0, false);
                    arr.setDisabled(1, false);
                }
                else {
                    arr.setDisabled(0, false);
                }
            }
        });
    }
    merge(array, subarray1, subarray2) {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            let a1i = 0;
            let a2i = 0;
            for (i = 0; i < array.getSize(); i++) {
                array.setValue(i, _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP);
            }
            for (i = 0; i < array.getSize(); i++) {
                yield this.pause("sort.compare", a1i < subarray1.getSize()
                    ? subarray1.getValue(a1i)
                    : "empty array", a2i < subarray2.getSize()
                    ? subarray2.getValue(a2i)
                    : "empty array");
                if (a2i >= subarray2.getSize() ||
                    (a1i < subarray1.getSize() &&
                        (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(subarray1.getValue(a1i), subarray2.getValue(a2i)) <
                            0)) {
                    yield this.pause("sort.move", subarray1.getValue(a1i));
                    const svgValue = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_3__.TextCircle(subarray1.getValue(a1i), this.getObjectSize(), this.getStrokeWidth())).init(subarray1.getCX(a1i), subarray1.cy());
                    this.animate(svgValue).center(array.getCX(i), array.cy());
                    yield this.pause(undefined);
                    svgValue.remove();
                    subarray1.setDisabled(a1i, true);
                    array.setDisabled(i, false);
                    array.setValue(i, subarray1.getValue(a1i));
                    a1i++;
                }
                else {
                    yield this.pause("sort.move", subarray2.getValue(a2i));
                    const svgValue = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_3__.TextCircle(subarray2.getValue(a2i), this.getObjectSize(), this.getStrokeWidth())).init(subarray2.getCX(a2i), subarray2.cy());
                    this.animate(svgValue).center(array.getCX(i), array.cy());
                    yield this.pause(undefined);
                    svgValue.remove();
                    subarray2.setDisabled(a2i, true);
                    array.setDisabled(i, false);
                    array.setValue(i, subarray2.getValue(a2i));
                    a2i++;
                }
            }
            return array;
        });
    }
}


/***/ }),

/***/ "./src/sorting/QuickSort.ts":
/*!**********************************!*\
  !*** ./src/sorting/QuickSort.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickSort: () => (/* binding */ QuickSort),
/* harmony export */   QuickSortMessages: () => (/* binding */ QuickSortMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _sorting_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/sorting/sort */ "./src/sorting/sort.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const QuickSortMessages = {
    sort: {
        findPivot: "Pivot is selected",
        lowBig: "Element bigger than pivot",
        highSmall: "Element smaller than pivot",
        pivotSwap: "Swap pivot into correct place",
        sorting: (low, high) => `Sorting array from index ${low} to index ${high}`,
        singleElement: "Single element arrays are automatically sorted",
    },
};
class QuickSort extends _sorting_sort__WEBPACK_IMPORTED_MODULE_2__.Sort {
    constructor() {
        super(...arguments);
        this.messages = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.updateDefault)(QuickSortMessages, _sorting_sort__WEBPACK_IMPORTED_MODULE_2__.SortMessages);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sortArray.getSize() <= 1) {
                yield this.pause("general.empty");
                return;
            }
            if (this.sortArray.getValue(this.sortArray.getSize() - 1) === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
                this.sortArray.setSize(this.sortArray.getSize() - 1);
            }
            this.sortArray.center(this.getTreeRoot()[0] + this.compensate, this.getTreeRoot()[1] + this.$Svg.margin * 4);
            for (let i = 0; i < this.sortArray.getSize(); i++) {
                this.sortArray.setIndexHighlight(i, false);
            }
            yield this.quickSort(this.sortArray, 0, this.sortArray.getSize() - 1);
            for (let i = 0; i < this.sortArray.getSize(); i++) {
                this.sortArray.setDisabled(i, false);
            }
            yield this.pause("general.finished");
        });
    }
    quickSort(array, low, high) {
        return __awaiter(this, void 0, void 0, function* () {
            if (low >= high || low < 0) {
                yield this.pause(`sort.singleElement`);
                this.sortArray.setIndexHighlight(low, true, "Green");
                return;
            }
            const p = yield this.partition(low, high);
            yield this.pause(`sort.sorting`, low, p - 1);
            yield this.quickSort(array, low, p - 1);
            yield this.pause(`sort.sorting`, p + 1, high);
            yield this.quickSort(array, p + 1, high);
        });
    }
    partition(left, right) {
        return __awaiter(this, void 0, void 0, function* () {
            const leftArrowId = "ArrowLow";
            const rightArrowId = "ArrowHigh";
            const blue = "#00C";
            const green = "green";
            const red = "#C00";
            let low = left;
            let high = right;
            for (let i = 0; i < this.sortArray.getSize(); i++) {
                if (i < low || i > high) {
                    this.sortArray.setDisabled(i, true);
                }
                else {
                    this.sortArray.setDisabled(i, false);
                }
            }
            let pivot = Math.floor((low + high) / 2);
            const pivotValue = this.sortArray.getValue(pivot);
            yield this.pause(`sort.findPivot`);
            this.sortArray.setIndexHighlight(pivot, true);
            yield this.swap(this.sortArray, low, pivot);
            this.sortArray.setIndexHighlight(pivot, false);
            pivot = low;
            this.sortArray.setIndexHighlight(low, false);
            this.sortArray.setDisabled(pivot, true);
            low += 1;
            this.sortArray.addArrow(low, leftArrowId, red);
            this.sortArray.addArrow(high, rightArrowId, blue);
            while (true) {
                this.sortArray.setIndexHighlight(low, true, red);
                this.sortArray.setIndexHighlight(high, true, blue);
                while (low <= high &&
                    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(this.sortArray.getValue(low), pivotValue) < 0) {
                    this.sortArray.setIndexHighlight(low, true);
                    yield this.pause("sort.compare", this.sortArray.getValue(low), pivotValue);
                    this.sortArray.setIndexHighlight(low, false);
                    low += 1;
                    this.sortArray.moveArrow(leftArrowId, low);
                }
                if (low < right) {
                    this.sortArray.setIndexHighlight(low, true);
                }
                yield this.pause("sort.lowBig");
                while (low <= high &&
                    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(this.sortArray.getValue(high), pivotValue) > 0) {
                    this.sortArray.setIndexHighlight(high, true, blue);
                    yield this.pause("sort.compare", this.sortArray.getValue(high), pivotValue);
                    this.sortArray.setIndexHighlight(high, false, blue);
                    high -= 1;
                    this.sortArray.moveArrow(rightArrowId, high);
                }
                yield this.pause("sort.highSmall");
                this.sortArray.setIndexHighlight(high, true, blue);
                if (low > high) {
                    break;
                }
                yield this.swap(this.sortArray, low, high);
                this.sortArray.setIndexHighlight(low, false);
                this.sortArray.setIndexHighlight(high, false);
                low += 1;
                high -= 1;
                if (low < right && high > left) {
                    this.sortArray.setIndexHighlight(low, true);
                    this.sortArray.setIndexHighlight(high, true, blue);
                }
                this.sortArray.moveArrow(leftArrowId, low);
                this.sortArray.moveArrow(rightArrowId, high);
            }
            if (low < right) {
                this.sortArray.setIndexHighlight(low, false);
            }
            yield this.pause("sort.pivotSwap");
            yield this.swap(this.sortArray, pivot, high);
            this.sortArray.setIndexHighlight(high, true, green);
            this.sortArray.removeArrow(leftArrowId);
            this.sortArray.removeArrow(rightArrowId);
            return high;
        });
    }
}


/***/ }),

/***/ "./src/sorting/SelectionSort.ts":
/*!**************************************!*\
  !*** ./src/sorting/SelectionSort.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectionSort: () => (/* binding */ SelectionSort),
/* harmony export */   SelectionSortMessages: () => (/* binding */ SelectionSortMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/helpers */ "./src/helpers.ts");
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sort */ "./src/sorting/sort.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const SelectionSortMessages = {
    sort: {
        foundNewMin: (a) => `Found a smaller value ${a}`,
    },
};
class SelectionSort extends _sort__WEBPACK_IMPORTED_MODULE_2__.Sort {
    constructor() {
        super(...arguments);
        this.messages = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.updateDefault)(SelectionSortMessages, _sort__WEBPACK_IMPORTED_MODULE_2__.SortMessages);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let sortSize = this.sortArray.getSize();
            if (sortSize <= 1) {
                yield this.pause("general.empty");
                return;
            }
            if (this.sortArray.getValue(this.sortArray.getSize() - 1) === _engine__WEBPACK_IMPORTED_MODULE_0__.NBSP) {
                this.sortArray.setSize(this.sortArray.getSize() - 1);
                sortSize--;
            }
            this.sortArray.center(this.getTreeRoot()[0] + this.compensate, this.getTreeRoot()[1] + this.$Svg.margin * 4);
            for (let i = 0; i < sortSize - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < sortSize; j++) {
                    this.sortArray.setIndexHighlight(j, true);
                    this.sortArray.setIndexHighlight(minIndex, true, "Blue");
                    yield this.pause("sort.compare", this.sortArray.getValue(j), this.sortArray.getValue(minIndex));
                    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.compare)(this.sortArray.getValue(j), this.sortArray.getValue(minIndex)) < 0) {
                        this.sortArray.setIndexHighlight(minIndex, false);
                        this.sortArray.setIndexHighlight(j, true, "Blue");
                        minIndex = j;
                        yield this.pause("sort.foundNewMin", this.sortArray.getValue(minIndex));
                    }
                    else {
                        this.sortArray.setIndexHighlight(j, false);
                    }
                    this.sortArray.setIndexHighlight(j, false);
                    this.sortArray.setIndexHighlight(minIndex, false);
                }
                if (minIndex !== i) {
                    yield this.swap(this.sortArray, i, minIndex);
                }
                this.sortArray.setIndexHighlight(i, true, "Green");
            }
            this.sortArray.setIndexHighlight(sortSize - 1, true, "Green");
            yield this.pause("general.finished");
            for (let i = 0; i < sortSize; i++) {
                this.sortArray.setIndexHighlight(i, false);
            }
        });
    }
}


/***/ }),

/***/ "./src/sorting/sort.ts":
/*!*****************************!*\
  !*** ./src/sorting/sort.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sort: () => (/* binding */ Sort),
/* harmony export */   SortMessages: () => (/* binding */ SortMessages)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/engine */ "./src/engine.ts");
/* harmony import */ var _objects_dsarray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/objects/dsarray */ "./src/objects/dsarray.ts");
/* harmony import */ var _objects_text_circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/objects/text-circle */ "./src/objects/text-circle.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const SortMessages = {
    general: {
        empty: "Array is empty!",
        full: "Array is full!",
        finished: "Finished",
    },
    insert: {
        value: (value) => `Insert value: ${value}`,
    },
    sort: {
        compare: (a, b) => `Compare ${a} and ${b}`,
        swap: (a, b) => `Swap ${a} and ${b}`,
    },
};
class Sort extends _engine__WEBPACK_IMPORTED_MODULE_0__.Engine {
    constructor(containerSelector) {
        super(containerSelector);
        this.initialValues = [];
        this.compensate = 0;
        this.indexLength = 0;
        this.baseSize = 28;
        this.messages = SortMessages;
        this.sortArray = new _objects_dsarray__WEBPACK_IMPORTED_MODULE_1__.DSArray(0, this.getObjectSize());
    }
    initialise(initialValues = []) {
        this.initialValues = initialValues;
        super.initialise();
    }
    resetAlgorithm() {
        const _super = Object.create(null, {
            resetAlgorithm: { get: () => super.resetAlgorithm }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.resetAlgorithm.call(this);
            this.indexLength = 0;
            const [xRoot, yRoot] = this.getTreeRoot();
            this.sortArray = this.Svg.put(new _objects_dsarray__WEBPACK_IMPORTED_MODULE_1__.DSArray(1, this.getObjectSize())).init(1, xRoot, yRoot + this.$Svg.margin * 4);
            this.Svg.put(this.sortArray);
            this.sortArray.setDisabled(0, false);
            if (this.initialValues) {
                this.state.runWhileResetting(() => __awaiter(this, void 0, void 0, function* () { return yield this.insert(...this.initialValues); }));
            }
        });
    }
    insert(...values) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sortArray.setSize(this.sortArray.getSize() + values.length);
            this.sortArray.center(this.getTreeRoot()[0], this.getTreeRoot()[1] + this.$Svg.margin * 4);
            for (const val of values) {
                yield this.insertOne(val);
            }
        });
    }
    swap(arr, j, k) {
        return __awaiter(this, void 0, void 0, function* () {
            arr.swap(j, k, true);
            arr.setIndexHighlight(j, true);
            yield this.pause("sort.swap", this.sortArray.getValue(j), this.sortArray.getValue(k));
        });
    }
    insertOne(value) {
        return __awaiter(this, void 0, void 0, function* () {
            value = String(value);
            const arrayLabel = this.Svg.put(new _objects_text_circle__WEBPACK_IMPORTED_MODULE_2__.TextCircle(value, this.getObjectSize(), this.getStrokeWidth())).init(...this.getNodeStart());
            yield this.pause("insert.value", value);
            const currentIndex = this.indexLength;
            arrayLabel.setCenter(this.sortArray.getCX(currentIndex), this.sortArray.cy(), this.getAnimationSpeed());
            yield this.pause(undefined);
            arrayLabel.remove();
            this.sortArray.setDisabled(currentIndex, false);
            this.sortArray.setValue(currentIndex, value);
            this.sortArray.setIndexHighlight(currentIndex, true);
            this.indexLength++;
            this.sortArray.setIndexHighlight(currentIndex, false);
        });
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Sort not implemented");
        });
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
/*!************************!*\
  !*** ./src/sorting.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _algorithm_controls_sorting_algorithm_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algorithm-controls/sorting-algorithm-controls */ "./src/algorithm-controls/sorting-algorithm-controls.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
/* harmony import */ var _sorting_InsertionSort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sorting/InsertionSort */ "./src/sorting/InsertionSort.ts");
/* harmony import */ var _sorting_MergeSort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sorting/MergeSort */ "./src/sorting/MergeSort.ts");
/* harmony import */ var _sorting_QuickSort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sorting/QuickSort */ "./src/sorting/QuickSort.ts");
/* harmony import */ var _sorting_SelectionSort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sorting/SelectionSort */ "./src/sorting/SelectionSort.ts");






let right = 0;
let down = 0;
let zoom = 1;
let scrollSpeed = 1;
const SORTING_CLASSES = {
    SelectionSort: _sorting_SelectionSort__WEBPACK_IMPORTED_MODULE_5__.SelectionSort,
    InsertionSort: _sorting_InsertionSort__WEBPACK_IMPORTED_MODULE_2__.InsertionSort,
    MergeSort: _sorting_MergeSort__WEBPACK_IMPORTED_MODULE_3__.MergeSort,
    QuickSort: _sorting_QuickSort__WEBPACK_IMPORTED_MODULE_4__.QuickSort,
};
const { engine: SortEngine, isBaseEngine } = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.initialiseEngine)("#sortingContainer", SORTING_CLASSES);
if (!isBaseEngine) {
    SortEngine.algorithmControls = new _algorithm_controls_sorting_algorithm_controls__WEBPACK_IMPORTED_MODULE_0__.SortingAlgorithmControls(SortEngine.container, SortEngine);
}
const zoomInButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".zoomIn");
zoomInButton.addEventListener("click", () => zoomIn(true, SortEngine));
const zoomOutButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".zoomOut");
zoomOutButton.addEventListener("click", () => zoomIn(false, SortEngine));
const scrollSpeedElement = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".scrollSpeed");
scrollSpeedElement.addEventListener("change", (event) => {
    scrollSpeed = Number(event.target.value);
    event.target.blur();
});
const moveLeftButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".moveLeft");
moveLeftButton.addEventListener("click", () => goRight(false, SortEngine));
const moveRightButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".moveRight");
moveRightButton.addEventListener("click", () => goRight(true, SortEngine));
const moveUpButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".moveUp");
moveUpButton.addEventListener("click", () => goDown(false, SortEngine));
const moveDownButton = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.querySelector)(".moveDown");
moveDownButton.addEventListener("click", () => goDown(true, SortEngine));
addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        goDown(true, SortEngine);
    }
    else if (event.key === "ArrowUp") {
        goDown(false, SortEngine);
    }
    else if (event.key === "ArrowRight") {
        goRight(true, SortEngine);
    }
    else if (event.key === "ArrowLeft") {
        goRight(false, SortEngine);
    }
});
function goRight(goingRight, engine) {
    if (goingRight) {
        right += scrollSpeed;
    }
    else if (right > 0) {
        right -= scrollSpeed;
    }
    engine.drawViewbox(right, down, zoom);
}
function goDown(goingDown, engine) {
    if (goingDown) {
        down += scrollSpeed;
    }
    else if (down > 0) {
        down -= scrollSpeed;
    }
    engine.drawViewbox(right, down, zoom);
}
function zoomIn(zoomingIn, engine) {
    if (zoomingIn && zoom > 0.2) {
        zoom -= 0.1;
    }
    else if (zoom < 3) {
        zoom += 0.1;
    }
    engine.drawViewbox(right, down, zoom);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHVEQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0EsOEJBQThCLHVEQUFLO0FBQ25DO0FBQ0EsNEJBQTRCLHVEQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDJEQUFJO0FBQ2pDLHVCQUF1QiwyREFBSTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixxREFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qix5REFBTTtBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksb0RBQVE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQixvREFBUTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7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OUI7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpREFBSztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQUs7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpREFBSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUM7QUFDRCxTQUFTLE1BQU0sQ0FBQyxTQUFrQixFQUFFLE1BQWM7SUFDOUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxXQUFXLENBQUM7SUFDeEIsQ0FBQztTQUFNLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxXQUFXLENBQUM7SUFDeEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsU0FBa0IsRUFBRSxNQUFjO0lBQzlDLElBQUksU0FBUyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxDQUFDO0lBQ2hCLENBQUM7U0FBTSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLElBQUksR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RzdmlzLy4vc3JjL2FsZ29yaXRobS1jb250cm9scy9lbmdpbmUtYWxnb3JpdGhtLWNvbnRyb2xzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2FsZ29yaXRobS1jb250cm9scy9zb3J0aW5nLWFsZ29yaXRobS1jb250cm9scy50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9jb29raWVzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2RlYnVnZ2VyLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2VuZ2luZS50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9nZW5lcmFsLWNvbnRyb2xzL2VuZ2luZS1nZW5lcmFsLWNvbnRyb2xzLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvaW5mby50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9vYmplY3RzL2RzYXJyYXkudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvb2JqZWN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9vYmplY3RzL3RleHQtY2lyY2xlLnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL3NvcnRpbmcvSW5zZXJ0aW9uU29ydC50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9zb3J0aW5nL01lcmdlU29ydC50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9zb3J0aW5nL1F1aWNrU29ydC50cyIsIndlYnBhY2s6Ly9kc3Zpcy8uL3NyYy9zb3J0aW5nL1NlbGVjdGlvblNvcnQudHMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvc29ydGluZy9zb3J0LnRzIiwid2VicGFjazovL2RzdmlzLy4vc3JjL3N0YXRlLnRzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9BbmltYXRvci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9hbmltYXRpb24vQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9hbmltYXRpb24vTW9ycGhhYmxlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9RdWV1ZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9hbmltYXRpb24vUnVubmVyLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9UaW1lbGluZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9BLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0NpcmNsZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9DbGlwUGF0aC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRGVmcy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Eb20uanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9FbGxpcHNlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0ZvcmVpZ25PYmplY3QuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9HcmFkaWVudC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9JbWFnZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9MaW5lLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL01hcmtlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9NYXNrLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BhdGguanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvUGF0dGVybi5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Qb2x5Z29uLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BvbHlsaW5lLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1JlY3QuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU2hhcGUuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU3RvcC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TdHlsZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TdmcuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU3ltYm9sLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1RleHQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvVGV4dFBhdGguanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvVHNwYW4uanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvVXNlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2F0dHIuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2NpcmNsZWQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2NvbnRhaW5lckdlb21ldHJ5LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2dyYWRpZW50ZWQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL3BhcnNlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcG9pbnRlZC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcG9seS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcmVnZXguanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS90ZXh0YWJsZS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL2FycmFuZ2UuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9jbGFzcy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL2Nzcy5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL2RhdGEuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9tZW1vcnkuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9zdWdhci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL29wdGlvbmFsL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9CYXNlLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0JveC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9Db2xvci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9FdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9MaXN0LmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL01hdHJpeC5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9QYXRoQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvUG9pbnRBcnJheS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9TVkdBcnJheS5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9TVkdOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdXRpbHMvYWRvcHRlci5qcyIsIndlYnBhY2s6Ly9kc3Zpcy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy91dGlscy9tZXRob2RzLmpzIiwid2VicGFjazovL2RzdmlzLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3V0aWxzL3BhdGhQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdXRpbHMvd2luZG93LmpzIiwid2VicGFjazovL2RzdmlzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RzdmlzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kc3Zpcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RzdmlzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHN2aXMvLi9zcmMvc29ydGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIn4vaGVscGVyc1wiO1xuXG5leHBvcnQgY2xhc3MgRW5naW5lQWxnb3JpdGhtQ29udHJvbCB7XG4gICAgYWxnb3JpdGhtQ29udHJvbHM6IEhUTUxGaWVsZFNldEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYWxnb3JpdGhtQ29udHJvbHMgPSBxdWVyeVNlbGVjdG9yPEhUTUxGaWVsZFNldEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJmaWVsZHNldC5hbGdvcml0aG1Db250cm9sc1wiLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYWRkUmV0dXJuU3VibWl0LCBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIn4vaGVscGVyc1wiO1xuaW1wb3J0IHsgU29ydGVyIH0gZnJvbSBcIn4vc29ydGluZ1wiO1xuaW1wb3J0IHsgRW5naW5lQWxnb3JpdGhtQ29udHJvbCB9IGZyb20gXCIuL2VuZ2luZS1hbGdvcml0aG0tY29udHJvbHNcIjtcblxuZXhwb3J0IGNsYXNzIFNvcnRpbmdBbGdvcml0aG1Db250cm9scyBleHRlbmRzIEVuZ2luZUFsZ29yaXRobUNvbnRyb2wge1xuICAgIGluc2VydFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgaW5zZXJ0RmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaW5zZXJ0U3VibWl0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNvcnRTdWJtaXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHNldWRvQ29kZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgY2xlYXJTdWJtaXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgZW5naW5lOiBTb3J0ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBlbmdpbmU6IFNvcnRlcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIpO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcblxuICAgICAgICB0aGlzLmluc2VydFNlbGVjdCA9IHF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJzZWxlY3QuaW5zZXJ0U2VsZWN0XCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnNlcnRGaWVsZCA9IHF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICBcImlucHV0Lmluc2VydEZpZWxkXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnNlcnRTdWJtaXQgPSBxdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJpbnB1dC5pbnNlcnRTdWJtaXRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNsZWFyU3VibWl0ID0gcXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIFwiaW5wdXQuY2xlYXJTdWJtaXRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBzZXVkb0NvZGUgPSBxdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIFwiZGl2LnBzZXVkb0NvZGVcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNvcnRTdWJtaXQgPSBxdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJpbnB1dC5zb3J0U3VibWl0XCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmluc2VydFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RmllbGQudmFsdWUgPSB0aGlzLmluc2VydFNlbGVjdC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0U2VsZWN0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkUmV0dXJuU3VibWl0KHRoaXMuaW5zZXJ0RmllbGQsIFwiQUxQSEFOVU0rXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdWJtaXQodGhpcy5lbmdpbmUuaW5zZXJ0LCB0aGlzLmluc2VydEZpZWxkKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaW5zZXJ0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc3VibWl0KHRoaXMuZW5naW5lLmluc2VydCwgdGhpcy5pbnNlcnRGaWVsZClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNvcnRTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdWJtaXQodGhpcy5lbmdpbmUuc29ydCwgbnVsbClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNsZWFyU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY29uZmlybVJlc2V0QWxsKClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gXCIuL2RlYnVnZ2VyXCI7XG5cbmludGVyZmFjZSBDb29raWVPYmplY3Qge1xuICAgIFtrZXk6IHN0cmluZ106IEhUTUxTZWxlY3RFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgQ29va2llcyB7XG4gICAgcHJpdmF0ZSAkQ09PS0lFX0VYUElSRV9EQVlTID0gMzA7XG4gICAgcHJpdmF0ZSBjb29raWVzOiBDb29raWVPYmplY3Q7XG4gICAgcHJpdmF0ZSBkZWJ1ZzogRGVidWdnZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsQ29va2llczogQ29va2llT2JqZWN0LCBkZWJ1ZzogRGVidWdnZXIpIHtcbiAgICAgICAgdGhpcy5jb29raWVzID0gaW5pdGlhbENvb2tpZXM7XG4gICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgICAgICAgdGhpcy5sb2FkKCk7IC8vIFNldCBlbGVtZW50IHZhbHVlcyB0byBzYXZlZCB2YWx1ZXNcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnNhdmUoKTsgLy8gU2F2ZSBvbiBpbml0aWFsaXphdGlvbiB0byBhZGQgbW9yZSBkYXlzIGJlZm9yZSBleHBpcmF0aW9uXG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVidWcubG9nKFxuICAgICAgICAgICAgXCJBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIGNvb2tpZSBlbGVtZW50c1wiLFxuICAgICAgICAgICAgdGhpcy5jb29raWVzXG4gICAgICAgICk7XG5cbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvb2tpZXMpLm1hcCgoY29va2llRmllbGQpID0+IHtcbiAgICAgICAgICAgIGNvb2tpZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4gdGhpcy5zYXZlKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlYnVnLmxvZyhcIkxvYWRpbmcgY29va2llc1wiLCBkb2N1bWVudC5jb29raWUpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jb29raWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFsbENvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcbiAgICAgICAgYWxsQ29va2llcy5tYXAoKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3BsaXRDb29raWUgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgaWYgKHNwbGl0Q29va2llLmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY29va2llIGZvcm1hdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFtkb2N1bWVudENvb2tpZU5hbWUsIGRvY3VtZW50Q29va2llVmFsdWVdID0gc3BsaXRDb29raWU7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRDb29raWVOYW1lIGluIHRoaXMuY29va2llcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29va2llc1tkb2N1bWVudENvb2tpZU5hbWVdLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50Q29va2llVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCk6IHZvaWQge1xuICAgICAgICBsZXQgZXhwaXJlcyA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLiRDT09LSUVfRVhQSVJFX0RBWVMgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBleHBpcnlEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGV4cGlyeURhdGUuc2V0RGF0ZShleHBpcnlEYXRlLmdldERhdGUoKSArIHRoaXMuJENPT0tJRV9FWFBJUkVfREFZUyk7XG4gICAgICAgICAgICBleHBpcmVzID0gYDtleHBpcmVzPSR7ZXhwaXJ5RGF0ZS50b1VUQ1N0cmluZygpfWA7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLmNvb2tpZXMpLm1hcCgoW2Nvb2tpZU5hbWUsIGNvb2tpZUZpZWxkXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29va2llVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoY29va2llRmllbGQudmFsdWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7Y29va2llTmFtZX09JHtjb29raWVWYWx1ZX0ke2V4cGlyZXN9YDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWJ1Zy5sb2coXCJTZXR0aW5nIGNvb2tpZXNcIiwgZG9jdW1lbnQuY29va2llKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRGVidWdnZXIge1xuICAgIHByaXZhdGUgZW5hYmxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBHZXQgZGVidWcgcGFyYW1ldGVyIGZyb20gdGhlIFVSTCBxdWVyeVxuICAgICAgICBjb25zdCBkZWJ1Z1BhcmFtID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuc2VhcmNoUGFyYW1zLmdldChcbiAgICAgICAgICAgIFwiZGVidWdcIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEJvb2xlYW4gY29udmVyc2lvbiBub3QgcHJlZmVjdCBiZWNhdXNlIG9ubHkgbnVsbCBvciBcIlwiIHdpbGwgcmV0dXJuIGZhbHNlIGFrYSBhbnkgbm9uIGVtcHR5IHN0cmluZyByZXR1cm5zIHRydWVcbiAgICAgICAgdGhpcy5lbmFibGVkID0gQm9vbGVhbihkZWJ1Z1BhcmFtKTtcbiAgICB9XG5cbiAgICBsb2cobWVzc2FnZT86IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkIHtcbiAgICAgICAgLy8gTG9nIG91dCBvbmx5IGlmIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiQHN2Z2RvdGpzL3N2Zy5qc1wiO1xuaW1wb3J0IHsgQ29va2llcyB9IGZyb20gXCJ+L2Nvb2tpZXNcIjtcbmltcG9ydCB7IERlYnVnZ2VyIH0gZnJvbSBcIn4vZGVidWdnZXJcIjtcbmltcG9ydCB7IGlzVmFsaWRSZWFzb24sIHBhcnNlVmFsdWVzLCBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIn4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSW5mbyB9IGZyb20gXCJ+L2luZm9cIjtcbmltcG9ydCB7IFN2ZyB9IGZyb20gXCJ+L29iamVjdHNcIjsgLy8gTk9UIFRIRSBTQU1FIFN2ZyBhcyBpbiBAc3ZnZG90anMvc3ZnLmpzISEhXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCJ+L3N0YXRlXCI7XG5pbXBvcnQgeyBFbmdpbmVBbGdvcml0aG1Db250cm9sIH0gZnJvbSBcIi4vYWxnb3JpdGhtLWNvbnRyb2xzL2VuZ2luZS1hbGdvcml0aG0tY29udHJvbHNcIjtcbmltcG9ydCB7IEVuZ2luZUdlbmVyYWxDb250cm9scyB9IGZyb20gXCIuL2dlbmVyYWwtY29udHJvbHMvZW5naW5lLWdlbmVyYWwtY29udHJvbHNcIjtcblxuZXhwb3J0IHR5cGUgU3VibWl0RnVuY3Rpb24gPSAoLi4uYXJnczogKHN0cmluZyB8IG51bWJlcilbXSkgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlc09iamVjdCB7XG4gICAgW2tleTogc3RyaW5nXTpcbiAgICAgICAgfCBzdHJpbmcgLy8gaGFuZGxlZCBsaWtlICgpID0+IHN0cmluZ1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB8ICgoLi4uYXJnczogYW55W10pID0+IHN0cmluZylcbiAgICAgICAgfCBNZXNzYWdlc09iamVjdDtcbn1cblxudHlwZSBBY3Rpb24gPSB7XG4gICAgbWV0aG9kOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgIGFyZ3M6IHVua25vd25bXTtcbiAgICBzdGVwQ291bnQ6IG51bWJlcjtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnN0YW50cyBhbmQgZ2xvYmFsIHZhcmlhYmxlc1xuXG4vKipcbiAqIEEgbm9uLWJyZWFraW5nIHNwYWNlIGNoYXJhY3RlciAoYFxcdTAwQTBgKSB1c2VkIGFzIGEgcGxhY2Vob2xkZXIgZm9yIGFuIGVtcHR5IHN0cmluZy5cbiAqXG4gKiBUaGlzIHdvcmthcm91bmQgcHJldmVudHMgU1ZHIHRleHQgZWxlbWVudHMgZnJvbSB0aGUgYEBzdmdkb3Rqcy9zdmcuanNgIGxpYnJhcnlcbiAqIGZyb20gcmVzZXR0aW5nIHRoZWlyIGNvb3JkaW5hdGVzIHRvICgwLCAwKSB3aGVuIGFzc2lnbmVkIGFuIGVtcHR5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IE5CU1AgPSBcIlxcdTAwQTBcIjtcblxuZXhwb3J0IGNsYXNzIEVuZ2luZSB7XG4gICAgLy8gRGVmYXVsdCB2YXJpYWJsZSBuYW1lcyBzdGFydCB3aXRoICRcblxuICAgIFN2ZzogU3ZnO1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlc09iamVjdCA9IHt9O1xuXG4gICAgJFN2ZyA9IHtcbiAgICAgICAgd2lkdGg6IDEwMDAsXG4gICAgICAgIGhlaWdodDogNjAwLFxuICAgICAgICBtYXJnaW46IDMwLFxuICAgICAgICBvYmplY3RTaXplOiA0MCxcbiAgICAgICAgYW5pbWF0aW9uU3BlZWQ6IDEwMDAsIC8vIG1pbGxpc2Vjb25kcyBwZXIgc3RlcFxuICAgIH07XG4gICAgY29va2llczogQ29va2llcztcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIGdlbmVyYWxDb250cm9sczogRW5naW5lR2VuZXJhbENvbnRyb2xzO1xuICAgIGFsZ29yaXRobUNvbnRyb2xzOiBFbmdpbmVBbGdvcml0aG1Db250cm9sO1xuICAgIGFjdGlvbnM6IEFjdGlvbltdID0gW107XG4gICAgY3VycmVudEFjdGlvbjogbnVtYmVyID0gMDtcbiAgICBjdXJyZW50U3RlcDogbnVtYmVyID0gMDtcbiAgICBkZWJ1Z2dlcjogRGVidWdnZXI7XG4gICAgc3RhdGU6IFN0YXRlO1xuICAgIGluZm86IEluZm87XG5cbiAgICBnZXRBbmltYXRpb25TcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZW5lcmFsQ29udHJvbHMuYW5pbWF0aW9uU3BlZWRTZWxlY3QudmFsdWUpO1xuICAgIH1cblxuICAgIGdldE9iamVjdFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2VuZXJhbENvbnRyb2xzLm9iamVjdFNpemVTZWxlY3QudmFsdWUpO1xuICAgIH1cblxuICAgIGdldE5vZGVTcGFjaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9iamVjdFNpemUoKTtcbiAgICB9XG5cbiAgICBnZXRTdHJva2VXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RTaXplKCkgLyAxMjtcbiAgICB9XG5cbiAgICBnZXROb2RlU3RhcnQoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLiRTdmcubWFyZ2luICsgdGhpcy5nZXRPYmplY3RTaXplKCkgLyAyLFxuICAgICAgICAgICAgdGhpcy4kU3ZnLm1hcmdpbiAqIDQsXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0VHJlZVJvb3QoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLlN2Zy52aWV3Ym94KCkud2lkdGggLyAyLFxuICAgICAgICAgICAgMiAqIHRoaXMuJFN2Zy5tYXJnaW4gKyB0aGlzLmdldE9iamVjdFNpemUoKSAvIDIsXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEluaXRpdGFsaXNhdGlvblxuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRlYnVnZ2VyID0gbmV3IERlYnVnZ2VyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICB0aGlzLmdlbmVyYWxDb250cm9scyA9IG5ldyBFbmdpbmVHZW5lcmFsQ29udHJvbHModGhpcy5jb250YWluZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFsZ29yaXRobUNvbnRyb2xzID0gbmV3IEVuZ2luZUFsZ29yaXRobUNvbnRyb2wodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuY29va2llcyA9IG5ldyBDb29raWVzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9iamVjdFNpemU6IHRoaXMuZ2VuZXJhbENvbnRyb2xzLm9iamVjdFNpemVTZWxlY3QsXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3BlZWQ6IHRoaXMuZ2VuZXJhbENvbnRyb2xzLmFuaW1hdGlvblNwZWVkU2VsZWN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuZGVidWdnZXJcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBzdmdDb250YWluZXIgPSBxdWVyeVNlbGVjdG9yPFNWR1NWR0VsZW1lbnQ+KFxuICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5TdmcgPSBuZXcgU3ZnKHN2Z0NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuU3ZnLnZpZXdib3goMCwgMCwgdGhpcy4kU3ZnLndpZHRoLCB0aGlzLiRTdmcuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5TdmcuJGVuZ2luZSA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnZ2VyLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLlN2Zy5hZGRDbGFzcyhcImRlYnVnXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmZvID0gbmV3IEluZm8odGhpcy5TdmcsIHRoaXMuJFN2Zy5tYXJnaW4pO1xuICAgIH1cblxuICAgIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzZXRBbGwoKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuc2V0UnVubmluZyh0cnVlKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldEFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XG4gICAgICAgIGF3YWl0IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtUmVzZXRBbGwoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChjb25maXJtKFwiVGhpcyBjbGVhcnMgdGhlIGNhbnZhcyBhbmQgeW91ciBoaXN0b3J5IVwiKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFzeW5jIHJlc2V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGF3YWl0IHRoaXMucmVzZXRBbGdvcml0aG0oKTtcbiAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyhmYWxzZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRBbGdvcml0aG0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8qIEFsbG93IHN1YmNsYXNzZXMgdG8gdXNlIHRoaXMgZnVuY3Rpb24gKi9cbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TdmcuY2xlYXIoKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5Tdmcudmlld2JveCgpLndpZHRoO1xuICAgICAgICBjb25zdCBoID0gdGhpcy5Tdmcudmlld2JveCgpLmhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMuZGVidWdnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgdyAvIDEwMDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TdmcubGluZSh4ICogMTAwLCAwLCB4ICogMTAwLCBoKS5hZGRDbGFzcyhcImdyaWRsaW5lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDE7IHkgPCBoIC8gMTAwOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN2Zy5saW5lKDAsIHkgKiAxMDAsIHcsIHkgKiAxMDApLmFkZENsYXNzKFwiZ3JpZGxpbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZm8ucmVzZXQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDU1NWYXJpYWJsZXMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDU1NWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlU2l6ZSA9IE1hdGgucm91bmQoXG4gICAgICAgICAgICAoMTAwICogdGhpcy5nZXRPYmplY3RTaXplKCkpIC8gdGhpcy4kU3ZnLm9iamVjdFNpemVcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLW5vZGUtZm9udC1zaXplXCIsXG4gICAgICAgICAgICBgJHtyZWxhdGl2ZVNpemV9JWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBkcmF3Vmlld2JveChyaWdodDogbnVtYmVyLCBkb3duOiBudW1iZXIsIHpvb206IG51bWJlcikge1xuICAgICAgICB0aGlzLlN2Zy52aWV3Ym94KFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgICBkb3duLFxuICAgICAgICAgICAgdGhpcy4kU3ZnLndpZHRoICogem9vbSxcbiAgICAgICAgICAgIHRoaXMuJFN2Zy5oZWlnaHQgKiB6b29tXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2V0SWRsZVRpdGxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluZm8uc2V0VGl0bGUoXCJTZWxlY3QgYW4gYWN0aW9uIGZyb20gdGhlIG1lbnUgYWJvdmVcIik7XG4gICAgICAgIHRoaXMuaW5mby5zZXRCb2R5KE5CU1ApO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBVcGRhdGluZyBsaXN0ZW5lcnNcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgYWxsIGVsZW1lbnRzIHdpdGggdGhlIGAuZGlzYWJsZVdoZW5SdW5uaW5nYCBjbGFzc1xuICAgICAqIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkaXNhYmxlZCAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGVsZW1lbnRzIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBkaXNhYmxlV2hlblJ1bm5pbmcoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtIG9mIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8XG4gICAgICAgICAgICBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICAgICAgPihcIi5kaXNhYmxlV2hlblJ1bm5pbmdcIikpIHtcbiAgICAgICAgICAgIGVsZW0uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBldmVudCBsaXN0ZW5lcnMgYmFzZWQgb24gdGhlIHJ1bm5pbmcgc3RhdGUgb2YgdGhlIGVuZ2luZS5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgbGlzdGVuZXJzIGFyZSBhY3RpdmVcbiAgICAgKiB3aGlsZSBwcmV2ZW50aW5nIG5ldyBpbnB1dHMgd2hlbiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNSdW5uaW5nIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZW5naW5lIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqL1xuICAgIHJlc2V0TGlzdGVuZXJzKGlzUnVubmluZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBSZW1vdmUgYWxsIGN1cnJlbnRseSBhY3RpdmUgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZ2VuZXJhbENvbnRyb2xzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAvLyBJZiB0aGUgaW5zdGFuY2UgaXMgYW4gYEVuZ2luZWAsIGl0IGRpc2FibGUgVUkgY29udHJvbHMgYW5kIGV4aXRcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IEVuZ2luZSkge1xuICAgICAgICAgICAgLy8gTm90aGluZyBjYW4gYmUgcnVubmluZyBzbyBkaXNhYmxlIGJ1dHRvbnNcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVdoZW5SdW5uaW5nKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuYWRkUnVubmVyTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gSWYgcnVubmluZywgaXQgZGlzYWJsZXMgbmV3IGlucHV0cyBhbmQgc2V0cyB0aGUgc3RhdHVzIHRvIGBcInBhdXNlZFwiXG4gICAgICAgIGlmIChpc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIC8vIElzIHJ1bm5pbmcgc28gZGlzYWJsZSBidXR0b25zIHRvIHByZXZlbnQgbmV3IGlucHV0c1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlV2hlblJ1bm5pbmcodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicGF1c2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGlkbGUsIGVuYWJsZSBpbnB1dHMsIHVwZGF0ZSB0aGUgc3RhdHVzIHRvIGBcImluYWN0aXZlXCJgLCBhbmQgcmUtYWRkIGlkbGUgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5kaXNhYmxlV2hlblJ1bm5pbmcoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldElkbGVUaXRsZSgpO1xuICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwiaW5hY3RpdmVcIik7XG4gICAgICAgIHRoaXMuZ2VuZXJhbENvbnRyb2xzLmFkZElkbGVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRXhlY3V0aW5nIHRoZSBhY3Rpb25zXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBleGVjdXRpb24gb2YgdGhlIHByb3ZpZGVkIG1ldGhvZCB3aXRoIHBhcnNlZCB2YWx1ZXMgZnJvbSBhbiBpbnB1dCBmaWVsZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBUaGUgc3VibWlzc2lvbiBmdW5jdGlvbiB0byBleGVjdXRlIHdpdGggcGFyc2VkIGlucHV0IHZhbHVlcy5cbiAgICAgKiBAcGFyYW0gZmllbGQgLSBUaGUgaW5wdXQgZmllbGQgY29udGFpbmluZyB0aGUgdXNlci1wcm92aWRlZCBkYXRhLiBDYW4gYmUgYG51bGxgLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYHRydWVgIGlmIHN1Ym1pc3Npb24gc3VjY2VlZHMsIG9yIGBmYWxzZWAgaWYgYW4gZXJyb3Igb2NjdXJzLlxuICAgICAqIEB0aHJvd3MgTG9ncyBhbnkgZXJyb3JzIGVuY291bnRlcmVkIGR1cmluZyBleGVjdXRpb24uXG4gICAgICovXG4gICAgYXN5bmMgc3VibWl0KFxuICAgICAgICBtZXRob2Q6IFN1Ym1pdEZ1bmN0aW9uLFxuICAgICAgICBmaWVsZDogSFRNTElucHV0RWxlbWVudCB8IG51bGxcbiAgICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IHJhd1ZhbHVlOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZpZWxkIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFJlYWQgdmFsdWUgZnJvbSBpbnB1dCBhbmQgcmVzZXQgdG8gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBwYXJzZVZhbHVlcyhyYXdWYWx1ZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGUobWV0aG9kLCB2YWx1ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgYW4gYXN5bmNocm9ub3VzIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMsIG1hbmFnaW5nIGFjdGlvbiBleGVjdXRpb25cbiAgICAgKiBhbmQgaGFuZGxpbmcgZXJyb3JzIG9yIGludGVycnVwdGlvbnMuIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyBhY3Rpb25zIGFyZSBsb2dnZWQsXG4gICAgICogcmV0cmllZCBpZiBuZWNlc3NhcnksIGFuZCBwcm9wZXJseSBjbGVhbmVkIHVwIGFmdGVyIGV4ZWN1dGlvbi5cbiAgICAgKlxuICAgICAqIEB0ZW1wbGF0ZSBGdW5jdGlvbiAtIEEgZnVuY3Rpb24gdHlwZSB0aGF0IHJldHVybnMgYSBgUHJvbWlzZTx2b2lkPmAuXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIFRoZSBhc3luY2hyb25vdXMgbWV0aG9kIHRvIGV4ZWN1dGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0gdW50aWwgLSAoT3B0aW9uYWwpIFRoZSBzdGVwIGNvdW50IHRvIGV4ZWN1dGUgdW50aWwuIERlZmF1bHRzIHRvIGAwYC5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGV4ZWN1dGlvbiBpcyBjb21wbGV0ZVxuICAgICAqIEB0aHJvd3MgSWYgYW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnMsIGl0IGxvZ3MgdGhlIGVycm9yIGFuZCByZXNldHMgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgYXN5bmMgZXhlY3V0ZTxGdW5jdGlvbiBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTx2b2lkPj4oXG4gICAgICAgIG1ldGhvZDogRnVuY3Rpb24sXG4gICAgICAgIGFyZ3M6IFBhcmFtZXRlcnM8RnVuY3Rpb24+LFxuICAgICAgICB1bnRpbCA9IDBcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmFjdGlvbnMucHVzaCh7IG1ldGhvZCwgYXJncywgc3RlcENvdW50OiB1bnRpbCB9KTtcbiAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICBgRVhFQyAke3VudGlsfTogJHttZXRob2QubmFtZX0gJHthcmdzLmpvaW4oXCIsIFwiKX0sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zXG4gICAgICAgICAgICApfWBcbiAgICAgICAgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5ydW5BY3Rpb25zTG9vcCgpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9ucy5sZW5ndGggLSAxXS5zdGVwQ291bnQgPSB0aGlzLmN1cnJlbnRTdGVwO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICAgICAgYERPTkUgLyAke3RoaXMuY3VycmVudFN0ZXB9OiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYWN0aW9ucyl9YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyhmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgcmVhc29uIGlzIHRocm93biBmcm9tIGFzeW5jIGxpc3RlbmVyXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRSZWFzb24ocmVhc29uKSkge1xuICAgICAgICAgICAgICAgIC8vIEVycm9yIG5vdCB0aHJvd24gYnkgYXN5bmMgaGFuZGxlcnMuIExvZyBpdCBhbmQgZXhpdFxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TGlzdGVuZXJzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIHJ1bm5pbmcgYXJndW1lbnQgaXMgcHJvdmlkZWQgc2V0IHJ1bm5pbmcgc3RhdGVcbiAgICAgICAgICAgIGlmIChyZWFzb24ucnVubmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuc2V0UnVubmluZyhyZWFzb24ucnVubmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMucG9wKCk7XG4gICAgICAgICAgICB1bnRpbCA9IHJlYXNvbi51bnRpbDtcbiAgICAgICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgICAgIGBSRVJVTiAke3VudGlsfSAvICR7dGhpcy5jdXJyZW50U3RlcH06ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1xuICAgICAgICAgICAgICAgICl9YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gdW50aWwgaXMgc21hbGxlciBvciBlcXVhbCB0byAwIG1lYW5pbmcgdGhlIHByZXZpb3VzIGFjdGlvbiBzaG91bGQgYmUgcnVuIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHVudGlsIDw9IDAgJiYgdGhpcy5hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmFjdGlvbnMucG9wKCkhOyAvLyAhIGJlY2F1c2Ugd2Uga25vdyB0aGF0IGFycmF5IGlzIG5vbi1lbXB0eSAoYWN0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IGFjdGlvbi5tZXRob2QgYXMgRnVuY3Rpb247XG4gICAgICAgICAgICAgICAgYXJncyA9IGFjdGlvbi5hcmdzIGFzIFBhcmFtZXRlcnM8RnVuY3Rpb24+O1xuICAgICAgICAgICAgICAgIHVudGlsID0gYWN0aW9uLnN0ZXBDb3VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmUgZXhlY3V0ZSBpZiB0aGVyZSBpcyBzb21ldGhpbmcgdG8gcnVuIHVudGlsLCBvdGhlcndpc2UgcmVzZXRcbiAgICAgICAgICAgIGlmICh1bnRpbCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGUobWV0aG9kLCBhcmdzLCB1bnRpbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIGEgc2VxdWVuY2Ugb2YgYWN0aW9ucyBzdG9yZWQgaW4gYHRoaXMuYWN0aW9uc2AuXG4gICAgICogRWFjaCBhY3Rpb24gaXMgcHJvY2Vzc2VkIGluIG9yZGVyLCB1cGRhdGluZyB0aGUgY3VycmVudCBhY3Rpb24gYW5kIHN0ZXAgY291bnRlcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGFsbCBhY3Rpb25zIGhhdmUgYmVlbiBleGVjdXRlZCBzZXF1ZW50aWFsbHkuXG4gICAgICovXG4gICAgYXN5bmMgcnVuQWN0aW9uc0xvb3AoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBvdXIgYWN0aW9uc1xuICAgICAgICBmb3IgKGxldCBuQWN0aW9uID0gMDsgbkFjdGlvbiA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IG5BY3Rpb24rKykge1xuICAgICAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYWN0aW9uc1tuQWN0aW9uXTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG5BY3Rpb247XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcblxuICAgICAgICAgICAgLy8gR2V0IGFuZCBzZXQgdGl0bGUgZm9yIHRoaXMgYWN0aW9uXG4gICAgICAgICAgICAvLyBNYWtlIGNhbWVsQ2FzZSBzZXBhcmF0ZSB3b3JkczogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTQ4NjMwXG4gICAgICAgICAgICBjb25zdCBtZXRob2ROYW1lQXJyID1cbiAgICAgICAgICAgICAgICBhY3Rpb24ubWV0aG9kLm5hbWUubWF0Y2goL1tBLVphLXpdW2Etel0qL2cpIHx8IFtdO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IG1ldGhvZE5hbWVBcnJcbiAgICAgICAgICAgICAgICAubWFwKChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBgJHttZXRob2ROYW1lfSAke2FjdGlvbi5hcmdzLmpvaW4oXCIsIFwiKX1gO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dlci5sb2coXG4gICAgICAgICAgICAgICAgYENBTEwgJHtuQWN0aW9ufTogJHt0aXRsZX0sICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hY3Rpb25zKX1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0VGl0bGUodGl0bGUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcIlwiKTtcblxuICAgICAgICAgICAgLy8gQmluZCB0aGlzIHRvIG1ldGhvZCBhbmQgY2FsbCBpdFxuICAgICAgICAgICAgYXdhaXQgYWN0aW9uLm1ldGhvZC5hcHBseSh0aGlzLCBhY3Rpb24uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZShcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAuLi5hcmdzOiB1bmtub3duW11cbiAgICApOiBQcm9taXNlPHVua25vd24+IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmdldE1lc3NhZ2UobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RlcFxuICAgICAgICAgICAgfS4gRG9pbmc6ICR7Ym9keX0gKHJ1bm5pbmc6ICR7dGhpcy5nZW5lcmFsQ29udHJvbHMuaXNSdW5uaW5nKCl9KSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNcbiAgICAgICAgICAgICl9YFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIHJlc2V0dGluZyBubyBwYXVzZSBzaG91bGQgYmUgcnVuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzUmVzZXR0aW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLnNldEJvZHkoYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25zW3RoaXMuY3VycmVudEFjdGlvbl07XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHN0ZXAgaGFzIGJlZW4gZXhlY3V0ZWQgcHJldmlvdXNseSAoYWN0aW9uLnN0ZXBDb3VudCA9IDAgaWYgZmlyc3QgdGltZSBhbmQgaGFzIGEgdmFsdWUgb3RoZXJ3aXNlKVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0ZXAgPCBhY3Rpb24uc3RlcENvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuZmFzdEZvcndhcmQocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBhc3luYyBsaXN0ZW5lcnMgdGhhdCBoYW5kbGUgYnV0dG9uIHByZXNzZXMgd2hpbGUgcGF1c2VkXG4gICAgICAgICAgICBsZXQgcnVubmVyVGltZXI6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMuYWRkQXN5bmNMaXN0ZW5lcnMoXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3QsXG4gICAgICAgICAgICAgICAgcnVubmVyVGltZXJcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIElmIHJ1bm5pbmcsIGF1dG9tYXRpY2FsbHkgc3RlcCBmb3J3YXJkIGFmdGVyIHdhaXRpbmcgYW5pbWF0aW9uIHNwZWVkXG4gICAgICAgICAgICBpZiAodGhpcy5nZW5lcmFsQ29udHJvbHMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicnVubmluZ1wiKTtcbiAgICAgICAgICAgICAgICBydW5uZXJUaW1lciA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMuZ2VuZXJhbENvbnRyb2xzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSAqIDEuMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2UoXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgLi4uYXJnczogdW5rbm93bltdXG4gICAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXNzdW1lIHRoYXQgbWVzc2FnZSBpcyBhIGtleSB0byBhY2Nlc3MgdGhpcy5tZXNzYWdlc1xuICAgICAgICBsZXQgdGl0bGU6IE1lc3NhZ2VzT2JqZWN0W3N0cmluZ10gPSB0aGlzLm1lc3NhZ2VzO1xuICAgICAgICBjb25zdCBrZXlzID0gbWVzc2FnZS5zcGxpdChcIi5cIik7XG4gICAgICAgIGlmICghKGtleXNbMF0gaW4gdGl0bGUpKSB7XG4gICAgICAgICAgICAvLyBBc3N1bXB0aW9uIHdhcyB3cm9uZyByZXR1cm5pbmcgdGhlIG9yaWdpbmFsIG1lc3NhZ2UgYW5kIHRoZSBleHRyYSBhcmd1bWVudHNcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAoISh0eXBlb2YgdGl0bGUgPT09IFwib2JqZWN0XCIgJiYga2V5IGluIHRpdGxlKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGVba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRpdGxlIGlzIG5vdyBob3BlZnVsbHkgYSBzdHJpbmcgb3IgZnVuY3Rpb24gZnJvbSB0aGlzLm1lc3NhZ2VzXG4gICAgICAgIGlmICh0eXBlb2YgdGl0bGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRpdGxlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgLi4uYXJnc10uam9pbihcIlxcblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aXRsZTtcbiAgICB9XG5cbiAgICBhbmltYXRlKGVsZW06IEVsZW1lbnQsIGFuaW1hdGUgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQW5pbWF0aW5nKCkgJiYgYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLnNldFN0YXR1cyhcInJ1bm5pbmdcIik7XG4gICAgICAgICAgICB0aGlzLmluZm8uc2V0U3RhdHVzKFwicGF1c2VkXCIsIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5hbmltYXRlKHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKSwgMCwgXCJub3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gXCJ+L2RlYnVnZ2VyXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5cbmV4cG9ydCB0eXBlIFJlc29sdmUgPSAodmFsdWU6IHVua25vd24pID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBSZWplY3QgPSAocHJvcHM6IFJlamVjdFJlYXNvbikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIFJlamVjdFJlYXNvbiA9IHsgdW50aWw6IG51bWJlcjsgcnVubmluZz86IGJvb2xlYW4gfTtcblxudHlwZSBMaXN0ZW5lclR5cGUgPSBcImNsaWNrXCIgfCBcImNoYW5nZVwiO1xudHlwZSBBbGxvd2VkRWxlbWVudHMgPVxuICAgIHwgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICB8IEhUTUxCdXR0b25FbGVtZW50XG4gICAgfCBIVE1MRmllbGRTZXRFbGVtZW50O1xudHlwZSBJZGxlTGlzdGVuZXIgPSB7XG4gICAgZWxlbWVudDogQWxsb3dlZEVsZW1lbnRzO1xuICAgIHR5cGU6IExpc3RlbmVyVHlwZTtcbiAgICBjb25kaXRpb246ICgpID0+IGJvb2xlYW47XG4gICAgaGFuZGxlcjogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgQXN5bmNMaXN0ZW5lciA9IHtcbiAgICBlbGVtZW50OiBBbGxvd2VkRWxlbWVudHM7XG4gICAgdHlwZTogTGlzdGVuZXJUeXBlO1xuICAgIGhhbmRsZXI6IChyZXNvbHZlOiBSZXNvbHZlLCByZWplY3Q6IFJlamVjdCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgRXZlbnRMaXN0ZW5lcnNNYXAgPSBNYXA8XG4gICAgQWxsb3dlZEVsZW1lbnRzLFxuICAgIFBhcnRpYWw8UmVjb3JkPExpc3RlbmVyVHlwZSwgKCkgPT4gdm9pZD4+XG4+O1xuXG5leHBvcnQgY2xhc3MgRW5naW5lR2VuZXJhbENvbnRyb2xzIHtcbiAgICBnZW5lcmFsQ29udHJvbHM6IEhUTUxGaWVsZFNldEVsZW1lbnQ7XG4gICAgZmFzdEJhY2t3YXJkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBzdGVwQmFja3dhcmRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRvZ2dsZVJ1bm5lckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgc3RlcEZvcndhcmRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGZhc3RGb3J3YXJkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBhbmltYXRpb25TcGVlZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgb2JqZWN0U2l6ZVNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgICBlbmdpbmU6IEVuZ2luZTtcbiAgICBkZWJ1Z2dlcjogRGVidWdnZXI7XG5cbiAgICBhY3RpdmVMaXN0ZW5lcnM6IEV2ZW50TGlzdGVuZXJzTWFwID0gbmV3IE1hcCgpO1xuICAgIGlkbGVMaXN0ZW5lcnM6IElkbGVMaXN0ZW5lcltdID0gW107XG4gICAgYXN5bmNMaXN0ZW5lcnM6IEFzeW5jTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgZW5naW5lOiBFbmdpbmUpIHtcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XG4gICAgICAgIHRoaXMuZGVidWdnZXIgPSBlbmdpbmUuZGVidWdnZXI7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsQ29udHJvbHMgPSBxdWVyeVNlbGVjdG9yPEhUTUxGaWVsZFNldEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJmaWVsZHNldC5nZW5lcmFsQ29udHJvbHNcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZmFzdEJhY2t3YXJkQnV0dG9uID0gcXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICAgICAgICBcImJ1dHRvbi5mYXN0QmFja3dhcmRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0ZXBCYWNrd2FyZEJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJidXR0b24uc3RlcEJhY2t3YXJkXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50b2dnbGVSdW5uZXJCdXR0b24gPSBxdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIFwiYnV0dG9uLnRvZ2dsZVJ1bm5lclwiLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RlcEZvcndhcmRCdXR0b24gPSBxdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIFwiYnV0dG9uLnN0ZXBGb3J3YXJkXCIsXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mYXN0Rm9yd2FyZEJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJidXR0b24uZmFzdEZvcndhcmRcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9iamVjdFNpemVTZWxlY3QgPSBxdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcbiAgICAgICAgICAgIFwic2VsZWN0Lm9iamVjdFNpemVcIixcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFuaW1hdGlvblNwZWVkU2VsZWN0ID0gcXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXG4gICAgICAgICAgICBcInNlbGVjdC5hbmltYXRpb25TcGVlZFwiLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5pZGxlTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwQmFja3dhcmRCdXR0b24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogKCkgPT4gdGhpcy5lbmdpbmUuYWN0aW9ucy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSdW5uaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5lbmdpbmUuYWN0aW9ucy5wb3AoKSE7IC8vICEgYmVjYXVzZSB3ZSBrbm93IHRoYXQgYXJyYXkgaXMgbm9uLWVtcHR5IChhY3Rpb25zLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5leGVjdXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hcmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnN0ZXBDb3VudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLmZhc3RCYWNrd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiAoKSA9PiB0aGlzLmVuZ2luZS5hY3Rpb25zLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5hY3Rpb25zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmVuZ2luZS5hY3Rpb25zLnBvcCgpITtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmV4ZWN1dGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYXJncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc3RlcENvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMub2JqZWN0U2l6ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZS5hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZW5naW5lLmFjdGlvbnMucG9wKCkhOyAvLyAhIGJlY2F1c2Ugd2Uga25vdyB0aGF0IGFycmF5IGlzIG5vbi1lbXB0eSAoYWN0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZXhlY3V0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hcmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zdGVwQ291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFzeW5jTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwRm9yd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJ1bm5pbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5mYXN0Rm9yd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5hY3Rpb25zW3RoaXMuZW5naW5lLmN1cnJlbnRBY3Rpb25dLnN0ZXBDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXN0Rm9yd2FyZChyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMudG9nZ2xlUnVubmVyQnV0dG9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlUnVubmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBGb3J3YXJkKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5zdGVwQmFja3dhcmRCdXR0b24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnRpbDogdGhpcy5lbmdpbmUuY3VycmVudFN0ZXAgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLmZhc3RCYWNrd2FyZEJ1dHRvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KHsgdW50aWw6IDAgfSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMub2JqZWN0U2l6ZVNlbGVjdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7IHVudGlsOiB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCB9KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhZGRBc3luY0xpc3RlbmVycyhcbiAgICAgICAgcmVzb2x2ZTogUmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0OiBSZWplY3QsXG4gICAgICAgIHJ1bm5lclRpbWVyOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLmFzeW5jTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKGxpc3RlbmVyLmVsZW1lbnQsIGxpc3RlbmVyLnR5cGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocnVubmVyVGltZXIpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXIocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRJZGxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlkbGVMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIobGlzdGVuZXIuZWxlbWVudCwgbGlzdGVuZXIudHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnZXIubG9nKFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBgJHtsaXN0ZW5lci50eXBlfTogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmVuZ2luZS5hY3Rpb25zKX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXIoXG4gICAgICAgIGVsZW1lbnQ6IEFsbG93ZWRFbGVtZW50cyxcbiAgICAgICAgdHlwZTogTGlzdGVuZXJUeXBlLFxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB2b2lkXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuYWN0aXZlTGlzdGVuZXJzO1xuICAgICAgICBpZiAoIWxpc3RlbmVycy5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZWxlbWVudCwge30pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzLmdldChlbGVtZW50KSE7XG4gICAgICAgIGNvbnN0IG9sZEhhbmRsZXIgPSBsaXN0ZW5lclt0eXBlXTtcbiAgICAgICAgaWYgKG9sZEhhbmRsZXIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBvbGRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lclt0eXBlXSA9IGhhbmRsZXI7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgICAgZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0eXBlIGluIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lclt0eXBlIGFzIExpc3RlbmVyVHlwZV0hIC8vICEgYmVjYXVzZSB3ZSBrbm93IHRoYXQgdGhlIHR5cGUgZXhpc3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWN0aXZlTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaXNSdW5uaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVSdW5uZXJCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgc2V0UnVubmluZyhydW5uaW5nOiBib29sZWFuKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLnRvZ2dsZVJ1bm5lckJ1dHRvbi5jbGFzc0xpc3Q7XG4gICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xhc3Nlcy5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b2dnbGVSdW5uZXIoKTogdGhpcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFJ1bm5pbmcoIXRoaXMuaXNSdW5uaW5nKCkpO1xuICAgIH1cblxuICAgIGFkZFJ1bm5lckxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMudG9nZ2xlUnVubmVyQnV0dG9uLCBcImNsaWNrXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVJ1bm5lcigpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RlcEZvcndhcmQocmVzb2x2ZTogUmVzb2x2ZSwgcmVqZWN0OiBSZWplY3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmdpbmUuY3VycmVudFN0ZXArKztcbiAgICAgICAgdGhpcy5lbmdpbmUuc3RhdGUuc2V0QW5pbWF0aW5nKHRydWUpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgZmFzdEZvcndhcmQocmVzb2x2ZTogUmVzb2x2ZSwgcmVqZWN0OiBSZWplY3QpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5lbmdpbmUuYWN0aW9uc1t0aGlzLmVuZ2luZS5jdXJyZW50QWN0aW9uXTtcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lLmN1cnJlbnRTdGVwID49IGFjdGlvbi5zdGVwQ291bnQpIHtcbiAgICAgICAgICAgIGFjdGlvbi5zdGVwQ291bnQgPSB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZ2luZS5jdXJyZW50U3RlcCsrO1xuICAgICAgICB0aGlzLmVuZ2luZS5zdGF0ZS5zZXRBbmltYXRpbmcoZmFsc2UpO1xuICAgICAgICAvLyBJZiBkZWJ1Z2dpbmcgaXMgZW5hYmxlZCB0aGVuIGFkZCBhIHNtYWxsIGRlbGF5XG4gICAgICAgIGlmICh0aGlzLmRlYnVnZ2VyLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEVuZ2luZSwgTWVzc2FnZXNPYmplY3QsIE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IFJlamVjdFJlYXNvbiB9IGZyb20gXCIuL2dlbmVyYWwtY29udHJvbHMvZW5naW5lLWdlbmVyYWwtY29udHJvbHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU51bWJlcihpbnB1dDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICBpbnB1dCA9IGlucHV0LnRyaW0oKTtcbiAgICByZXR1cm4gaW5wdXQgPT09IFwiXCIgfHwgaXNOYU4oTnVtYmVyKGlucHV0KSkgPyBpbnB1dCA6IE51bWJlcihpbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZhbHVlcyhcbiAgICB2YWx1ZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogKHN0cmluZyB8IG51bWJlcilbXSB7XG4gICAgaWYgKCF2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXMubWFwKCh2KSA9PiBub3JtYWxpemVOdW1iZXIodikpO1xufVxuXG50eXBlIEFsbG93ZWRDaGFyYWN0ZXJzID1cbiAgICB8IFwiaW50XCJcbiAgICB8IFwiaW50K1wiXG4gICAgfCBcImZsb2F0XCJcbiAgICB8IFwiZmxvYXQrXCJcbiAgICB8IFwiQUxQSEFcIlxuICAgIHwgXCJBTFBIQStcIlxuICAgIHwgXCJhbHBoYVwiXG4gICAgfCBcImFscGhhK1wiXG4gICAgfCBcIkFMUEhBTlVNXCJcbiAgICB8IFwiQUxQSEFOVU0rXCJcbiAgICB8IFwiYWxwaGFudW1cIlxuICAgIHwgXCJhbHBoYW51bStcIjtcblxuY29uc3QgYWxsb3dlZENoYXJhY3RlcnNSZWdleCA9IHtcbiAgICBpbnQ6IFwiMC05XCIsXG4gICAgXCJpbnQrXCI6IFwiMC05IFwiLFxuICAgIGZsb2F0OiBcIi0uMC05XCIsXG4gICAgXCJmbG9hdCtcIjogXCItLjAtOSBcIixcbiAgICBBTFBIQTogXCJBLVpcIixcbiAgICBcIkFMUEhBK1wiOiBcIkEtWiBcIixcbiAgICBhbHBoYTogXCJhLXpBLVpcIixcbiAgICBcImFscGhhK1wiOiBcImEtekEtWiBcIixcbiAgICBBTFBIQU5VTTogXCJBLVowLTlcIixcbiAgICBcIkFMUEhBTlVNK1wiOiBcIkEtWjAtOSBcIixcbiAgICBhbHBoYW51bTogXCJhLXpBLVowLTlcIixcbiAgICBcImFscGhhbnVtK1wiOiBcImEtekEtWjAtOSBcIixcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxBbGxvd2VkQ2hhcmFjdGVycywgc3RyaW5nPjtcblxuLy8gQWRkcyBcInJldHVybi10by1zdWJtaXRcIiBmdW5jdGlvbmFsaXR5IHRvIGEgdGV4dCBpbnB1dCBmaWVsZCAtIHBlcmZvcm1zIGFjdGlvbiB3aGVuIHRoZSB1c2VyIHByZXNzZXMgRW50ZXJcbi8vIEFkZGl0aW9uYWxseSByZXN0cmljdHMgaW5wdXQgdG8gdGhlIGRlZmluZWQgYWxsb3dlZCBjaGFyYWN0ZXJzICh3aXRoICsgbWVhbmluZyBzcGFjZXMgYXJlIGFsbG93ZWQpXG5leHBvcnQgZnVuY3Rpb24gYWRkUmV0dXJuU3VibWl0KFxuICAgIGZpZWxkOiBIVE1MSW5wdXRFbGVtZW50LFxuICAgIGFsbG93ZWQ6IEFsbG93ZWRDaGFyYWN0ZXJzLFxuICAgIGFjdGlvbj86ICgpID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGNvbnN0IGFsbG93ZWRDaGFyYWN0ZXJzID0gYWxsb3dlZENoYXJhY3RlcnNSZWdleFthbGxvd2VkXTtcblxuICAgIGNvbnN0IGlzQWxsb3dlZCA9IG5ldyBSZWdFeHAoYFteJHthbGxvd2VkQ2hhcmFjdGVyc31dYCwgXCJnXCIpO1xuXG4gICAgLy8gVHJhbnNmb3JtIGNhc2Ugb2YgdGV4dCBpbnB1dCB0byBtYXRjaCBhbGxvd2VkXG4gICAgZnVuY3Rpb24gbWF0Y2hBbGxvd2VkQ2FzZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoYWxsb3dlZENoYXJhY3RlcnMgPT09IGFsbG93ZWRDaGFyYWN0ZXJzLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dlZENoYXJhY3RlcnMgPT09IGFsbG93ZWRDaGFyYWN0ZXJzLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLy8gSWRlYSB0YWtlbiBmcm9tIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNDcxOTgxOFxuICAgIC8vIEJsb2NrIHVud2FudGVkIGNoYXJhY3RlcnMgZnJvbSBiZWluZyB0eXBlZFxuICAgIGZpZWxkLm9uaW5wdXQgPSAoXykgPT4ge1xuICAgICAgICBsZXQgcG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnQgfHwgMDtcbiAgICAgICAgbGV0IHZhbHVlID0gbWF0Y2hBbGxvd2VkQ2FzZShmaWVsZC52YWx1ZSk7XG4gICAgICAgIGlmIChpc0FsbG93ZWQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShpc0FsbG93ZWQsIFwiXCIpO1xuICAgICAgICAgICAgcG9zLS07XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZmllbGQuc2V0U2VsZWN0aW9uUmFuZ2UocG9zLCBwb3MpO1xuICAgIH07XG5cbiAgICAvLyBQZXJmb3JtIGFjdGlvbiB3aGVuIEVudGVyIGlzIHByZXNzZWRcbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZpZWxkLm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIE1lcmdlcyBhbGwga2V5cyBmcm9tIGRlZmF1bHRPYmplY3QgaW50byBvYmplY3Rcbi8vIFNldCBvdmVycmlkZSB0byB0cnVlIHRvIG92ZXJ3cml0ZSBleGlzdGluZyBrZXlzXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGVmYXVsdChcbiAgICBvYmplY3Q6IE1lc3NhZ2VzT2JqZWN0LFxuICAgIGRlZmF1bHRPYmplY3Q6IE1lc3NhZ2VzT2JqZWN0LFxuICAgIG92ZXJyaWRlOiBib29sZWFuID0gZmFsc2Vcbik6IE1lc3NhZ2VzT2JqZWN0IHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0T2JqZWN0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IGRlZmF1bHRPYmplY3Rba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgb2JqZWN0W2tleV0gIT09IG51bGwgJiZcbiAgICAgICAgICAgIHR5cGVvZiBkZWZhdWx0T2JqZWN0W2tleV0gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGRlZmF1bHRPYmplY3Rba2V5XSAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHVwZGF0ZURlZmF1bHQob2JqZWN0W2tleV0sIGRlZmF1bHRPYmplY3Rba2V5XSwgb3ZlcnJpZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IGRlZmF1bHRPYmplY3Rba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxvKG46IG51bWJlciwgZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCByZW0gPSBuICUgZDtcbiAgICByZXR1cm4gcmVtIDwgMCA/IHJlbSArIGQgOiByZW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGE6IHN0cmluZyB8IG51bWJlciwgYjogc3RyaW5nIHwgbnVtYmVyKTogLTEgfCAwIHwgMSB7XG4gICAgLy8gV2UgdXNlIG5vbi1icmVha2luZyBzcGFjZSBhcyBhIHByb3h5IGZvciB0aGUgZW1wdHkgc3RyaW5nLFxuICAgIC8vIGJlY2F1c2UgU1ZHIHRleHQgb2JqZWN0cyByZXNldCBjb29yZGluYXRlcyB0byAoMCwgMCkgZm9yIHRoZSBlbXB0eSBzdHJpbmcuXG4gICAgaWYgKGEgPT09IE5CU1ApIHtcbiAgICAgICAgYSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChiID09PSBOQlNQKSB7XG4gICAgICAgIGIgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoaXNOYU4oTnVtYmVyKGEpKSA9PT0gaXNOYU4oTnVtYmVyKGIpKSkge1xuICAgICAgICAvLyBhIGFuZCBiIGFyZSAoMSkgYm90aCBudW1iZXJzIG9yICgyKSBib3RoIG5vbi1udW1iZXJzXG4gICAgICAgIGlmICghaXNOYU4oTnVtYmVyKGEpKSkge1xuICAgICAgICAgICAgLy8gYSBhbmQgYiBhcmUgYm90aCBudW1iZXJzXG4gICAgICAgICAgICBhID0gTnVtYmVyKGEpO1xuICAgICAgICAgICAgYiA9IE51bWJlcihiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhIDwgYiA/IC0xIDogMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhIGFuZCBiIGFyZSBvZiBkaWZmZXJlbnQgdHlwZXNcbiAgICAgICAgLy8gbGV0J3Mgc2F5IHRoYXQgbnVtYmVycyBhcmUgc21hbGxlciB0aGFuIG5vbi1udW1iZXJzXG4gICAgICAgIHJldHVybiBpc05hTihOdW1iZXIoYSkpID8gMSA6IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRSZWFzb24ob2JqOiB1bmtub3duKTogb2JqIGlzIFJlamVjdFJlYXNvbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICBvYmogIT09IG51bGwgJiZcbiAgICAgICAgXCJ1bnRpbFwiIGluIG9iaiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnVudGlsID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIC8vIGlmIHJ1bm5pbmcgaXMgaW4gb2JqZWN0IGl0IHNob3VsZCBiZSBhIGJvb2xlYW5cbiAgICAgICAgKFwicnVubmluZ1wiIGluIG9iaiA/IHR5cGVvZiBvYmoucnVubmluZyA9PT0gXCJib29sZWFuXCIgOiB0cnVlKVxuICAgICk7XG59XG5cbmV4cG9ydCB0eXBlIFJlY29yZE9mRW5naW5lczxUIGV4dGVuZHMgRW5naW5lID0gRW5naW5lPiA9IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgbmV3IChjb250YWluZXJTZWxlY3Rvcjogc3RyaW5nKSA9PiBUXG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGlzZUVuZ2luZTxUIGV4dGVuZHMgRW5naW5lID0gRW5naW5lPihcbiAgICBjb250YWluZXJJRDogc3RyaW5nLFxuICAgIGVuZ2luZVN1YmNsYXNzZXM6IFJlY29yZE9mRW5naW5lczxOb0luZmVyPFQ+PlxuKTogeyBpc0Jhc2VFbmdpbmU6IGZhbHNlOyBlbmdpbmU6IFQgfSB8IHsgaXNCYXNlRW5naW5lOiB0cnVlOyBlbmdpbmU6IEVuZ2luZSB9IHtcbiAgICBjb25zdCBhbGdvU2VsZWN0b3IgPSBxdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcbiAgICAgICAgYCR7Y29udGFpbmVySUR9IC5hbGdvcml0aG1TZWxlY3RvcmBcbiAgICApO1xuXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuc2VhcmNoUGFyYW1zO1xuXG4gICAgY29uc3QgYWxnbyA9XG4gICAgICAgIG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLnNlYXJjaFBhcmFtcy5nZXQoXCJhbGdvcml0aG1cIikgfHwgXCJcIjtcbiAgICBhbGdvU2VsZWN0b3IudmFsdWUgPSBhbGdvO1xuXG4gICAgY29uc3QgRW5naW5lQ2xhc3MgPSBlbmdpbmVTdWJjbGFzc2VzW2FsZ29dIHx8IEVuZ2luZTtcbiAgICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lQ2xhc3MoY29udGFpbmVySUQpO1xuICAgIGVuZ2luZS5pbml0aWFsaXNlKCk7XG5cbiAgICBhbGdvU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIGlmIChhbGdvU2VsZWN0b3IudmFsdWUgaW4gZW5naW5lU3ViY2xhc3Nlcykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChcImFsZ29yaXRobVwiLCBhbGdvU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmRlbGV0ZShcImFsZ29yaXRobVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmdpbmUuZGVidWdnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQoXCJkZWJ1Z1wiLCBcInRydWVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuZGVsZXRlKFwiZGVidWdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXG4gICAgICAgICAgICBcIlwiLFxuICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgIGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0/JHtzZWFyY2hQYXJhbXN9YFxuICAgICAgICApO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoZW5naW5lU3ViY2xhc3Nlc1thbGdvXSkge1xuICAgICAgICByZXR1cm4geyBpc0Jhc2VFbmdpbmU6IGZhbHNlLCBlbmdpbmU6IGVuZ2luZSBhcyBUIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgaXNCYXNlRW5naW5lOiB0cnVlLCBlbmdpbmU6IGVuZ2luZSBhcyBFbmdpbmUgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yPFQgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8VD4oc2VsZWN0b3IpO1xuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiBcIiR7c2VsZWN0b3J9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbiIsImltcG9ydCB7IFN2ZyBhcyBTdmdFbGVtZW50LCBUZXh0IH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcbmltcG9ydCB7IE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcblxudHlwZSBJbmZvU3RhdHVzID0gXCJydW5uaW5nXCIgfCBcInBhdXNlZFwiIHwgXCJpbmFjdGl2ZVwiO1xuXG5jb25zdCBzdGF0dXNUZXh0ID0ge1xuICAgIHJ1bm5pbmc6IFwiQW5pbWF0aW5nXCIsXG4gICAgcGF1c2VkOiBcIlBhdXNlZFwiLFxuICAgIGluYWN0aXZlOiBcIklkbGVcIixcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxJbmZvU3RhdHVzLCBzdHJpbmc+O1xuXG5jb25zdCBzdGF0dXNDbGFzcyA9IHtcbiAgICBydW5uaW5nOiBcInJ1bm5pbmdcIixcbiAgICBwYXVzZWQ6IFwicGF1c2VkXCIsXG4gICAgaW5hY3RpdmU6IFwiXCIsXG59IGFzIGNvbnN0IHNhdGlzZmllcyBSZWNvcmQ8SW5mb1N0YXR1cywgc3RyaW5nPjtcblxuZXhwb3J0IGNsYXNzIEluZm8ge1xuICAgIHByaXZhdGUgU3ZnOiBTdmdFbGVtZW50O1xuICAgIHRpdGxlOiBUZXh0O1xuICAgIGJvZHk6IFRleHQ7XG4gICAgcHJpbnRlcjogVGV4dDtcbiAgICBzdGF0dXM6IFRleHQ7XG5cbiAgICBjb25zdHJ1Y3RvcihTdmc6IFN2Z0VsZW1lbnQsIG1hcmdpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuU3ZnID0gU3ZnO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLlN2Zy52aWV3Ym94KCkuaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5TdmcudGV4dChOQlNQKS5hZGRDbGFzcyhcInRpdGxlXCIpLngobWFyZ2luKS55KG1hcmdpbik7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLlN2Zy50ZXh0KE5CU1ApXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJtZXNzYWdlXCIpXG4gICAgICAgICAgICAueChtYXJnaW4pXG4gICAgICAgICAgICAueSgyICogbWFyZ2luKTtcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IHRoaXMuU3ZnLnRleHQoTkJTUClcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcInByaW50ZXJcIilcbiAgICAgICAgICAgIC54KG1hcmdpbilcbiAgICAgICAgICAgIC5jeShoZWlnaHQgLSAyICogbWFyZ2luKTtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5TdmcudGV4dChOQlNQKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwic3RhdHVzLXJlcG9ydFwiKVxuICAgICAgICAgICAgLngobWFyZ2luKVxuICAgICAgICAgICAgLmN5KGhlaWdodCAtIG1hcmdpbik7XG5cbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICB0aGlzLnByaW50ZXIgPSBwcmludGVyO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG5cbiAgICBzZXRUaXRsZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0KHRleHQgfHwgTkJTUCk7XG4gICAgfVxuXG4gICAgc2V0Qm9keSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5ib2R5LnRleHQodGV4dCB8fCBOQlNQKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0dXMoc3RhdHVzOiBJbmZvU3RhdHVzLCB0aW1lb3V0ID0gMTApOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c1xuICAgICAgICAgICAgICAgIC50ZXh0KHN0YXR1c1RleHRbc3RhdHVzXSB8fCBOQlNQKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcInBhdXNlZCBydW5uaW5nXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHN0YXR1c0NsYXNzW3N0YXR1c10pO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5TdmcucHV0KHRoaXMudGl0bGUudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLmJvZHkudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLnByaW50ZXIudGV4dChOQlNQKSk7XG4gICAgICAgIHRoaXMuU3ZnLnB1dCh0aGlzLnN0YXR1cy50ZXh0KE5CU1ApKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBHLCBSZWN0LCBUZXh0IH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcbmltcG9ydCB7IE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcblxuZXhwb3J0IGNsYXNzIERTQXJyYXkgZXh0ZW5kcyBHIHtcbiAgICAkaG9yaXpvbnRhbDogYm9vbGVhbjtcbiAgICAkcmVjdDogUmVjdDtcbiAgICAkYmFja2dyb3VuZHM6IFJlY3RbXSA9IFtdO1xuICAgICR2YWx1ZXM6IFRleHRbXSA9IFtdO1xuICAgICRpbmRpY2VzOiBUZXh0W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlciwgb2JqZWN0U2l6ZTogbnVtYmVyLCBob3Jpem9udGFsOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLiRob3Jpem9udGFsID0gaG9yaXpvbnRhbDtcbiAgICAgICAgdGhpcy4kdmFsdWVzID0gbmV3IEFycmF5KHNpemUpO1xuICAgICAgICB0aGlzLiRyZWN0ID0gdGhpcy5yZWN0KG9iamVjdFNpemUgKiBzaXplLCAzICogb2JqZWN0U2l6ZSlcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImludmlzaWJsZVwiKVxuICAgICAgICAgICAgLmNlbnRlcigwLCAwKTtcbiAgICB9XG5cbiAgICBpbml0KHNpemU6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRTaXplKHNpemUpO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuY2VudGVyKHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRDWChpOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5jeCgpICtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lKCkuZ2V0T2JqZWN0U2l6ZSgpICogKGkgLSB0aGlzLmdldFNpemUoKSAvIDIgKyAwLjUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kdmFsdWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBzZXRTaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB3aGlsZSAoc2l6ZSA8IHRoaXMuZ2V0U2l6ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZ3JvdW5kcy5wb3AoKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLiR2YWx1ZXMucG9wKCk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy4kaW5kaWNlcy5wb3AoKT8ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdzAgPSB0aGlzLmVuZ2luZSgpLmdldE9iamVjdFNpemUoKTtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuZW5naW5lKCkuZ2V0T2JqZWN0U2l6ZSgpO1xuICAgICAgICBjb25zdCBzdHJva2UgPSB0aGlzLmVuZ2luZSgpLmdldFN0cm9rZVdpZHRoKCk7XG4gICAgICAgIHRoaXMuJHJlY3Qud2lkdGgodzAgKiBzaXplKTtcbiAgICAgICAgY29uc3QgY3ggPSB0aGlzLiRyZWN0LmN4KCksXG4gICAgICAgICAgICBjeSA9IHRoaXMuJHJlY3QuY3koKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy4kYmFja2dyb3VuZHNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZ3JvdW5kc1tpXSA9IHRoaXMucmVjdCh3MCwgaClcbiAgICAgICAgICAgICAgICAgICAgLnN0cm9rZSh7IHdpZHRoOiBzdHJva2UgfSlcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRzW2ldLmNlbnRlcihjeCArIHcwICogKGkgLSBzaXplIC8gMiArIDAuNSksIGN5KTtcbiAgICAgICAgICAgIGlmICghdGhpcy4kdmFsdWVzW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdmFsdWVzW2ldID0gdGhpcy50ZXh0KE5CU1ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kdmFsdWVzW2ldLmNlbnRlcihjeCArIHcwICogKGkgLSBzaXplIC8gMiArIDAuNSksIGN5KTtcbiAgICAgICAgICAgIGlmICghdGhpcy4kaW5kaWNlc1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGluZGljZXNbaV0gPSB0aGlzLnRleHQoaS50b1N0cmluZygpKS5hZGRDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJhcnJheWluZGV4XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kaW5kaWNlc1tpXS5jZW50ZXIoXG4gICAgICAgICAgICAgICAgY3ggKyB3MCAqIChpIC0gc2l6ZSAvIDIgKyAwLjUpLFxuICAgICAgICAgICAgICAgIGN5ICsgaCAqIDAuOFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGksIFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXREaXNhYmxlZChpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRWYWx1ZXMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiR2YWx1ZXMubWFwKCh0KSA9PiB0LnRleHQoKSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVzKHZhbHVlczogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCAhPT0gdGhpcy5nZXRTaXplKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgV3JvbmcgbnVtYmVyIG9mIHZhbHVlczogJHt2YWx1ZXMubGVuZ3RofSAhPSAke3RoaXMuZ2V0U2l6ZSgpfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoaSwgdmFsdWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRWYWx1ZShpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kdmFsdWVzW2ldLnRleHQoKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShpOiBudW1iZXIsIHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0ID0gYCR7dGV4dH1gO1xuICAgICAgICAvLyBOb24tYnJlYWtpbmcgc3BhY2U6IFdlIG5lZWQgdG8gaGF2ZSBzb21lIHRleHQsIG90aGVyd2lzZSB0aGUgY29vcmRpbmF0ZXMgYXJlIHJlc2V0IHRvICgwLCAwKVxuICAgICAgICBpZiAodGV4dCA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGV4dCA9IE5CU1A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kdmFsdWVzW2ldLnRleHQodGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN3YXAoajogbnVtYmVyLCBrOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBqVGV4dCA9IHRoaXMuJHZhbHVlc1tqXSxcbiAgICAgICAgICAgIGtUZXh0ID0gdGhpcy4kdmFsdWVzW2tdO1xuICAgICAgICBjb25zdCBqWCA9IHRoaXMuZ2V0Q1goaiksXG4gICAgICAgICAgICBrWCA9IHRoaXMuZ2V0Q1goayk7XG4gICAgICAgIHRoaXMuZW5naW5lKCkuYW5pbWF0ZShqVGV4dCwgYW5pbWF0ZSkuY3goa1gpO1xuICAgICAgICB0aGlzLmVuZ2luZSgpLmFuaW1hdGUoa1RleHQsIGFuaW1hdGUpLmN4KGpYKTtcbiAgICAgICAgdGhpcy4kdmFsdWVzW2tdID0galRleHQ7XG4gICAgICAgIHRoaXMuJHZhbHVlc1tqXSA9IGtUZXh0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZChpOiBudW1iZXIsIGRpc2FibGVkOiBib29sZWFuIHwgbnVsbCkge1xuICAgICAgICBjb25zdCBiZyA9IHRoaXMuJGJhY2tncm91bmRzW2ldO1xuICAgICAgICBpZiAoZGlzYWJsZWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgYmcudG9nZ2xlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgYmcuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJnLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0SW5kZXhIaWdobGlnaHQoaTogbnVtYmVyLCBoaWdoOiBib29sZWFuLCBjb2xvcjogc3RyaW5nID0gXCIjQzAwXCIpIHtcbiAgICAgICAgaWYgKHRoaXMuJGJhY2tncm91bmRzW2ldKSB7XG4gICAgICAgICAgICBpZiAoaGlnaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRzW2ldLmNzcyhcInN0cm9rZVwiLCBjb2xvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRzW2ldLmNzcyhcInN0cm9rZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiR2YWx1ZXNbaV0pIHtcbiAgICAgICAgICAgIGlmIChoaWdoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdmFsdWVzW2ldLmNzcyhcImZpbGxcIiwgY29sb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR2YWx1ZXNbaV0uY3NzKFwiZmlsbFwiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYmcgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLiRiYWNrZ3JvdW5kcykpIHtcbiAgICAgICAgICAgIGlmICghYmcuY3NzKFwic3Ryb2tlXCIpKSB7XG4gICAgICAgICAgICAgICAgYmcuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZEFycm93KGluZGV4OiBudW1iZXIsIGFycm93SWQ6IHN0cmluZyA9IFwiYXJyb3dcIiwgY29sb3I6IHN0cmluZyA9IFwiIzAwMFwiKSB7XG4gICAgICAgIGNvbnN0IGFycm93U2l6ZSA9IDEwO1xuICAgICAgICBjb25zdCBhcnJvd09mZnNldCA9IDEwO1xuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdldENYKGluZGV4KTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuY3koKSAtIHRoaXMuZW5naW5lKCkuZ2V0T2JqZWN0U2l6ZSgpIC8gMiAtIGFycm93T2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5wb2x5bGluZShbXG4gICAgICAgICAgICBbeCwgeV0sXG4gICAgICAgICAgICBbeCAtIGFycm93U2l6ZSwgeSAtIGFycm93U2l6ZV0sXG4gICAgICAgICAgICBbeCArIGFycm93U2l6ZSwgeSAtIGFycm93U2l6ZV0sXG4gICAgICAgICAgICBbeCwgeV0sXG4gICAgICAgIF0pXG4gICAgICAgICAgICAuZmlsbChcIm5vbmVcIilcbiAgICAgICAgICAgIC5zdHJva2UoeyB3aWR0aDogMiB9KVxuICAgICAgICAgICAgLmlkKGFycm93SWQpO1xuXG4gICAgICAgIGFycm93LmNzcyhcInN0cm9rZVwiLCBjb2xvcilcbiAgICAgICAgdGhpcy5hZGQoYXJyb3cpO1xuICAgIH1cblxuICAgIHJlbW92ZUFycm93KGFycm93SWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJvdyA9IHRoaXMuZmluZE9uZShgIyR7YXJyb3dJZH1gKSBhcyBQb2x5bGluZSB8IG51bGw7XG4gICAgICAgIGlmIChhcnJvdykge1xuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQXJyb3coYXJyb3dJZDogc3RyaW5nLCBpbmRleFRvOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYXJyb3cgPSB0aGlzLmZpbmRPbmUoYCMke2Fycm93SWR9YCkgYXMgUG9seWxpbmUgfCBudWxsO1xuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZXRDWChpbmRleFRvKTtcblxuICAgICAgICBpZiAoYXJyb3cpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lKCkuYW5pbWF0ZShhcnJvdywgdHJ1ZSkuY3goeCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtZW50LCBleHRlbmQsIFN2ZyB9IGZyb20gXCJAc3ZnZG90anMvc3ZnLmpzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwifi9lbmdpbmVcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJAc3ZnZG90anMvc3ZnLmpzXCIge1xuICAgIGludGVyZmFjZSBTdmcge1xuICAgICAgICAkZW5naW5lOiBFbmdpbmU7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEVsZW1lbnQge1xuICAgICAgICBnZXRIaWdobGlnaHQoKTogYm9vbGVhbjtcbiAgICAgICAgc2V0SGlnaGxpZ2h0KGhpZ2g6IGJvb2xlYW4gfCBudWxsKTogdGhpcztcbiAgICAgICAgZ2V0Q2VudGVyKCk6IFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgIHNldENlbnRlcih4OiBudW1iZXIsIHk6IG51bWJlciwgYW5pbWF0aW9uRHVyYXRpb24/OiBudW1iZXIpOiB0aGlzO1xuICAgICAgICBkTW92ZUNlbnRlcihkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBhbmltYXRpb25EdXJhdGlvbj86IG51bWJlcik6IHRoaXM7XG4gICAgICAgIGVuZ2luZSgpOiBFbmdpbmU7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIENvbnRhaW5lciB7XG4gICAgICAgIHB1dDxUIGV4dGVuZHMgRWxlbWVudD4oZWxlbWVudDogVCwgaT86IG51bWJlcik6IFQ7XG4gICAgfVxufVxuXG5leHRlbmQoRWxlbWVudCwge1xuICAgIGdldEhpZ2hsaWdodCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzIGFzIEVsZW1lbnQpLmhhc0NsYXNzKFwiaGlnaGxpZ2h0XCIpO1xuICAgIH0sXG4gICAgc2V0SGlnaGxpZ2h0KGhpZ2g6IGJvb2xlYW4gfCBudWxsKSB7XG4gICAgICAgIGlmIChoaWdoID09IG51bGwpIHtcbiAgICAgICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLnRvZ2dsZUNsYXNzKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGhpZ2gpIHtcbiAgICAgICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLmFkZENsYXNzKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKHRoaXMgYXMgRWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJoaWdobGlnaHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMgYXMgRWxlbWVudDtcbiAgICB9LFxuICAgIGdldENlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIFsodGhpcyBhcyBFbGVtZW50KS5jeCgpLCAodGhpcyBhcyBFbGVtZW50KS5jeSgpXSBhcyBbXG4gICAgICAgICAgICBudW1iZXIsXG4gICAgICAgICAgICBudW1iZXJcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIHNldENlbnRlcih4OiBudW1iZXIsIHk6IG51bWJlciwgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgcmV0dXJuICh0aGlzIGFzIEVsZW1lbnQpXG4gICAgICAgICAgICAuZW5naW5lKClcbiAgICAgICAgICAgIC5hbmltYXRlKHRoaXMgYXMgRWxlbWVudCwgYW5pbWF0aW9uRHVyYXRpb24gPiAwKVxuICAgICAgICAgICAgLmNlbnRlcih4LCB5KTtcbiAgICB9LFxuICAgIGRNb3ZlQ2VudGVyKGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLnNldENlbnRlcihcbiAgICAgICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLmN4KCkgKyBkeCxcbiAgICAgICAgICAgICh0aGlzIGFzIEVsZW1lbnQpLmN5KCkgKyBkeSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzIGFzIEVsZW1lbnQ7XG4gICAgfSxcbiAgICBlbmdpbmUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcyBhcyBFbGVtZW50KS5yb290KCkuJGVuZ2luZTtcbiAgICB9LFxufSk7XG5cbmV4cG9ydCB7IFN2ZyB9O1xuIiwiaW1wb3J0IHsgQ2lyY2xlLCBHLCBUZXh0IH0gZnJvbSBcIkBzdmdkb3Rqcy9zdmcuanNcIjtcbmltcG9ydCB7IE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcblxuZXhwb3J0IGNsYXNzIFRleHRDaXJjbGUgZXh0ZW5kcyBHIHtcbiAgICAkY2lyY2xlOiBDaXJjbGU7XG4gICAgJHRleHQ6IFRleHQ7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIHNpemU6IG51bWJlciwgc3Ryb2tlV2lkdGg6IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLiRjaXJjbGUgPSB0aGlzLmNpcmNsZShzaXplKS5zdHJva2UoeyB3aWR0aDogc3Ryb2tlV2lkdGggfSk7XG4gICAgICAgIHRoaXMuJHRleHQgPSB0aGlzLnRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgaW5pdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLiRjaXJjbGUuY2VudGVyKDAsIDApO1xuICAgICAgICB0aGlzLiR0ZXh0LmNlbnRlcigwLCAwKTtcbiAgICAgICAgdGhpcy5jZW50ZXIoeCwgeSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0VGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kdGV4dC50ZXh0KCk7XG4gICAgfVxuXG4gICAgc2V0VGV4dCh0ZXh0OiBzdHJpbmcgfCBudWxsKTogdGhpcyB7XG4gICAgICAgIGlmICh0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRleHQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRleHQgPSBgJHt0ZXh0fWA7XG4gICAgICAgIC8vIE5vbi1icmVha2luZyBzcGFjZTogV2UgbmVlZCB0byBoYXZlIHNvbWUgdGV4dCwgb3RoZXJ3aXNlIHRoZSBjb29yZGluYXRlcyBhcmUgcmVzZXQgdG8gKDAsIDApXG4gICAgICAgIGlmICh0ZXh0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICB0ZXh0ID0gTkJTUDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiR0ZXh0LnRleHQodGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuJGNpcmNsZS5hdHRyKFwiclwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiByID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gciAqIDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmICFpc05hTihOdW1iZXIocikpKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHIpICogMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBzZXRTaXplKGRpYW1ldGVyOiBudW1iZXIsIGFuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuZW5naW5lKClcbiAgICAgICAgICAgIC5hbmltYXRlKHRoaXMuJGNpcmNsZSwgYW5pbWF0aW9uRHVyYXRpb24gPiAwKVxuICAgICAgICAgICAgLmF0dHIoXCJyXCIsIFN0cmluZyhkaWFtZXRlciAvIDIpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1lc3NhZ2VzT2JqZWN0LCBOQlNQIH0gZnJvbSBcIn4vZW5naW5lXCI7XG5pbXBvcnQgeyBjb21wYXJlLCB1cGRhdGVEZWZhdWx0IH0gZnJvbSBcIn4vaGVscGVyc1wiO1xuaW1wb3J0IHsgU29ydGVyIH0gZnJvbSBcIn4vc29ydGluZ1wiO1xuaW1wb3J0IHsgU29ydCwgU29ydE1lc3NhZ2VzIH0gZnJvbSBcIn4vc29ydGluZy9zb3J0XCI7XG5cbmV4cG9ydCBjb25zdCBJbnNlcnRpb25Tb3J0TWVzc2FnZXMgPSB7XG4gICAgc29ydDoge1xuICAgICAgICBzd2FwOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgU3dhcCAke2F9IGFuZCAke2J9IHNpbmNlICR7YX0gaXMgc21hbGxlcmAsXG4gICAgICAgIHNtYWxsZXJMZWZ0OiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgJHthfSBpcyBzbWFsbGVyIHRoYW4gJHtifSBubyBzd2FwYCxcbiAgICAgICAgcmVjb3JkOiAoYTogc3RyaW5nKSA9PiBgVGhlIHJlY29yZCBpcyBzZXQgdG8gJHthfWAsXG4gICAgfSxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIE1lc3NhZ2VzT2JqZWN0O1xuXG5leHBvcnQgY2xhc3MgSW5zZXJ0aW9uU29ydCBleHRlbmRzIFNvcnQgaW1wbGVtZW50cyBTb3J0ZXIge1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlc09iamVjdCA9IHVwZGF0ZURlZmF1bHQoXG4gICAgICAgIEluc2VydGlvblNvcnRNZXNzYWdlcyxcbiAgICAgICAgU29ydE1lc3NhZ2VzXG4gICAgKTtcblxuICAgIGFzeW5jIHNvcnQoKSB7XG4gICAgICAgIGxldCBzb3J0U2l6ZSA9IHRoaXMuc29ydEFycmF5LmdldFNpemUoKTtcblxuICAgICAgICBpZiAoc29ydFNpemUgPD0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcImdlbmVyYWwuZW1wdHlcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUodGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpIC0gMSkgPT09IE5CU1ApIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldFNpemUodGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpIC0gMSk7XG4gICAgICAgICAgICBzb3J0U2l6ZS0tO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DZW50ZXIgdGhlIGFycmF5IGRlcGVuZGluZyBvbiBpdHMgc2l6ZVxuICAgICAgICB0aGlzLnNvcnRBcnJheS5jZW50ZXIoXG4gICAgICAgICAgICB0aGlzLmdldFRyZWVSb290KClbMF0gKyB0aGlzLmNvbXBlbnNhdGUsXG4gICAgICAgICAgICB0aGlzLmdldFRyZWVSb290KClbMV0gKyB0aGlzLiRTdmcubWFyZ2luICogNFxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRTaXplOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBqID0gaTtcblxuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiAtIDEsIHRydWUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgIFwic29ydC5jb21wYXJlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKGopLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5nZXRWYWx1ZShqIC0gMSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgY3VycmVudCBlbGVtZW50IGlzIGxhcmdlciB0aGFuIHRoZSBlbGVtZW50IHRvIGl0cyBsZWZ0XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUoaiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5nZXRWYWx1ZShqIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgKSA+PSAwXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVGhlbiBtZXNzYWdlIHRoaXMsIGRpc2FibGUgdGhlIGhpZ2hsaWdodHMgYW5kIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNvcnQuc21hbGxlckxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKGogLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKGopXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGosIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiAtIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgY3VycmVudCBlbGVtZW50IGlzIHNtYWxsZXIgdGhlbiBzd2FwIGl0IHdpdGggdGhlIGxlZnQgbmVpZ2hib3VyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zd2FwKHRoaXMuc29ydEFycmF5LCBqLCBqIC0gMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChqLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiAtIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBqIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNZXNzYWdlc09iamVjdCwgTkJTUCB9IGZyb20gXCJ+L2VuZ2luZVwiO1xuaW1wb3J0IHsgY29tcGFyZSwgdXBkYXRlRGVmYXVsdCB9IGZyb20gXCJ+L2hlbHBlcnNcIjtcbmltcG9ydCB7IERTQXJyYXkgfSBmcm9tIFwifi9vYmplY3RzL2RzYXJyYXlcIjtcbmltcG9ydCB7IFRleHRDaXJjbGUgfSBmcm9tIFwifi9vYmplY3RzL3RleHQtY2lyY2xlXCI7XG5pbXBvcnQgeyBTb3J0ZXIgfSBmcm9tIFwifi9zb3J0aW5nXCI7XG5pbXBvcnQgeyBTb3J0LCBTb3J0TWVzc2FnZXMgfSBmcm9tIFwiLi9zb3J0XCI7XG5cbmV4cG9ydCBjb25zdCBNZXJnZVNvcnRNZXNzYWdlcyA9IHtcbiAgICBzb3J0OiB7XG4gICAgICAgIHNwbGl0OiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IGBTcGxpdCAke2F9IGZyb20gJHtifWAsXG4gICAgICAgIG1vdmU6IChhOiBzdHJpbmcpID0+IGBNb3ZlICR7YX0gdG8gdXBwZXIgYXJyYXlgLFxuICAgICAgICBmb3VuZE5ld01pbjogKGE6IHN0cmluZykgPT4gYEZvdW5kIGEgc21hbGxlciB2YWx1ZSAke2F9YCxcbiAgICB9LFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgTWVzc2FnZXNPYmplY3Q7XG5cbmV4cG9ydCBjbGFzcyBNZXJnZVNvcnQgZXh0ZW5kcyBTb3J0IGltcGxlbWVudHMgU29ydGVyIHtcbiAgICBtZXJnZUFycmF5TGlzdDogRFNBcnJheVtdID0gW107XG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VzT2JqZWN0ID0gdXBkYXRlRGVmYXVsdChNZXJnZVNvcnRNZXNzYWdlcywgU29ydE1lc3NhZ2VzKTtcbiAgICBhc3luYyBzb3J0KCkge1xuICAgICAgICAvL0NoZWNrIGlmIGFycmF5IGlzIGVtcHR5XG4gICAgICAgIGNvbnN0IHNvcnRTaXplID0gdGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpO1xuICAgICAgICBpZiAoc29ydFNpemUgPD0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcImdlbmVyYWwuZW1wdHlcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9EZWxldGUgb2xkIG1lcmdlIGFycmF5c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVyZ2VBcnJheUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubWVyZ2VBcnJheUxpc3RbaV0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZXNcbiAgICAgICAgdGhpcy5jb21wZW5zYXRlID0gMDtcbiAgICAgICAgdGhpcy5tZXJnZUFycmF5TGlzdCA9IFtdO1xuXG4gICAgICAgIC8vUmVtb3ZlIGVtcHR5IHNwYWNlIGZyb20gdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWVzKCk7XG4gICAgICAgIGlmICh0aGlzLnNvcnRBcnJheS5nZXRWYWx1ZSh0aGlzLnNvcnRBcnJheS5nZXRTaXplKCkgLSAxKSA9PT0gTkJTUCkge1xuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0U2l6ZSh0aGlzLnNvcnRBcnJheS5nZXRTaXplKCkgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICAvL1NldCBhbGwgZWxlbWVudHMgdG8gZGlzYWJsZWQgdG8gZ3JleSB0aGVtIG91dFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydEFycmF5LmdldFNpemUoKTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXREaXNhYmxlZChpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvL0NlbnRlcnMgdGhlIGFycmF5XG4gICAgICAgIHRoaXMuc29ydEFycmF5LmNlbnRlcihcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVswXSxcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVsxXSArIHRoaXMuJFN2Zy5tYXJnaW4gKiA0XG4gICAgICAgICk7XG4gICAgICAgIC8vU3RhcnQgcmVjdXJzaXZlIGNhbGxzIHRvIG1lcmdlU29ydFxuICAgICAgICBhd2FpdCB0aGlzLm1lcmdlU29ydCh0aGlzLnNvcnRBcnJheSwgMCwgdGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpLCAxKTtcbiAgICAgICAgLy9GaW5pc2ggdGhlIGFsZ29yaXRobVxuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiZ2VuZXJhbC5maW5pc2hlZFwiKTtcbiAgICB9XG4gICAgYXN5bmMgbWVyZ2VTb3J0KFxuICAgICAgICBhcnI6IERTQXJyYXksXG4gICAgICAgIGxlZnQ6IG51bWJlcixcbiAgICAgICAgcmlnaHQ6IG51bWJlcixcbiAgICAgICAgaXRlcmF0aW9uOiBudW1iZXJcbiAgICApIHtcbiAgICAgICAge1xuICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgYXJyYXkgaXMgZW1wdHlcbiAgICAgICAgICAgIGlmIChsZWZ0ID49IHJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgYXJyYXkgaW4gaGFsZlxuICAgICAgICAgICAgY29uc3QgbWlkID0gTWF0aC5jZWlsKGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIpO1xuICAgICAgICAgICAgY29uc3QgeUNlbnRlciA9IHRoaXMuZ2V0VHJlZVJvb3QoKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VZID0gdGhpcy4kU3ZnLm1hcmdpbiAqIDQ7XG4gICAgICAgICAgICBjb25zdCBDWCA9IGFyci5nZXRDWCgwKTtcblxuICAgICAgICAgICAgLy9XaGVuIHRoZSBhcnJheSBpcyBsYXJnZXIgdGhhbiAyIGVsZW1lbnRzIHNwbGl0IGludG8gdHdvIGFycmF5c1xuICAgICAgICAgICAgaWYgKGFyci5nZXRTaXplKCkgPiAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VBcnJheTEgPSB0aGlzLlN2Zy5wdXQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBEU0FycmF5KG1pZCAtIGxlZnQsIHRoaXMuZ2V0T2JqZWN0U2l6ZSgpKVxuICAgICAgICAgICAgICAgICkuaW5pdChtaWQgLSBsZWZ0LCBDWCwgYXJyLmN5KCkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWlkOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VBcnJheTEuc2V0VmFsdWUoaywgYXJyLmdldFZhbHVlKGspKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKG1lcmdlQXJyYXkxKVxuICAgICAgICAgICAgICAgICAgICAuY3goQ1ggLSAoYXJyLmVuZ2luZSgpLmdldE9iamVjdFNpemUoKSAqIDIpIC8gaXRlcmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAuY3koXG4gICAgICAgICAgICAgICAgICAgICAgICB5Q2VudGVyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmFzZVkgKiBpdGVyYXRpb24gKiB0aGlzLmdldE9iamVjdFNpemUoKSkgLyB0aGlzLmJhc2VTaXplICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlWVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgIFwic29ydC5zcGxpdFwiLFxuICAgICAgICAgICAgICAgICAgICBtZXJnZUFycmF5MS5nZXRWYWx1ZXMoKSxcbiAgICAgICAgICAgICAgICAgICAgYXJyLmdldFZhbHVlcygpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlQXJyYXkyID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgRFNBcnJheShyaWdodCAtIG1pZCwgdGhpcy5nZXRPYmplY3RTaXplKCkpXG4gICAgICAgICAgICAgICAgKS5pbml0KHJpZ2h0IC0gbWlkLCBhcnIuZ2V0Q1gobWlkKSwgYXJyLmN5KCkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrICsgbWlkIDwgcmlnaHQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZUFycmF5Mi5zZXRWYWx1ZShrLCBhcnIuZ2V0VmFsdWUoayArIG1pZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUobWVyZ2VBcnJheTIpXG4gICAgICAgICAgICAgICAgICAgIC5jeChcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5nZXRDWChhcnIuZ2V0U2l6ZSgpIC0gMSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcnIuZW5naW5lKCkuZ2V0T2JqZWN0U2l6ZSgpICogMikgLyBpdGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuY3koXG4gICAgICAgICAgICAgICAgICAgICAgICB5Q2VudGVyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmFzZVkgKiBpdGVyYXRpb24gKiB0aGlzLmdldE9iamVjdFNpemUoKSkgLyB0aGlzLmJhc2VTaXplICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlWVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgIFwic29ydC5zcGxpdFwiLFxuICAgICAgICAgICAgICAgICAgICBtZXJnZUFycmF5Mi5nZXRWYWx1ZXMoKSxcbiAgICAgICAgICAgICAgICAgICAgYXJyLmdldFZhbHVlcygpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgbmV3IGFycmF5cyB0byB0aGUgbWVyZ2VBcnJheUxpc3RcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlQXJyYXlMaXN0LnB1c2gobWVyZ2VBcnJheTEpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VBcnJheUxpc3QucHVzaChtZXJnZUFycmF5Mik7XG5cbiAgICAgICAgICAgICAgICAvL0NvbXBlbnNhdGlvbiB0byBrZWVwIHRoZSBhcnJheSB3aXRoaW4gdGhlIHZpZXdib3hcbiAgICAgICAgICAgICAgICBpZiAobWVyZ2VBcnJheTEuZ2V0Q1goMCkgPCB0aGlzLiRTdmcubWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGVuc2F0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUFycmF5MS5nZXRDWCgwKSAqIC0xICsgdGhpcy4kU3ZnLm1hcmdpbjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzb3J0QXJyYXlDZW50ZXIgPSB0aGlzLnNvcnRBcnJheS5nZXRDWChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFNpemUoKSAvIDJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuY2VudGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydEFycmF5Q2VudGVyICsgdGhpcy5jb21wZW5zYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuY3koKVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5tZXJnZUFycmF5TGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlkUG9pbnQgPSB0aGlzLm1lcmdlQXJyYXlMaXN0W2pdLmdldFNpemUoKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJDb3JkcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZUFycmF5TGlzdFtqXS5nZXRDWChtaWRQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlQXJyYXlMaXN0W2pdLmNlbnRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJDb3JkcyArIHRoaXMuY29tcGVuc2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlQXJyYXlMaXN0W2pdLmN5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1JlY3Vyc2l2ZWx5IGNhbGwgbWVyZ2VTb3J0IG9uIHRoZSBuZXcgYXJyYXlzXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5tZXJnZVNvcnQobWVyZ2VBcnJheTEsIGxlZnQsIG1pZCwgaXRlcmF0aW9uICsgMSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1lcmdlU29ydChcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VBcnJheTIsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0IC0gbWlkLFxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRpb24gKyAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvL01lcmdlIHRoZSByZXR1cm4gb2YgdGhlIHR3byBtZXJnZVNvcnQgY2FsbHNcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1lcmdlKGFyciwgbWVyZ2VBcnJheTEsIG1lcmdlQXJyYXkyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJyLmdldFNpemUoKSA9PT0gMikge1xuICAgICAgICAgICAgICAgIC8vSWYgdGhlIGFycmF5IGlzIDIgZWxlbWVudHMsIGNvbXBhcmUgYW5kIHN3YXAgdGhlbVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgIFwic29ydC5jb21wYXJlXCIsXG4gICAgICAgICAgICAgICAgICAgIGFyci5nZXRWYWx1ZSgwKSxcbiAgICAgICAgICAgICAgICAgICAgYXJyLmdldFZhbHVlKDEpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmdldFZhbHVlKDApID4gYXJyLmdldFZhbHVlKDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3dhcChhcnIsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhcnIuc2V0SW5kZXhIaWdobGlnaHQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhcnIuc2V0SW5kZXhIaWdobGlnaHQoMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnIuc2V0RGlzYWJsZWQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFyci5zZXREaXNhYmxlZCgxLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vSWYgdGhlIGFycmF5IGlzIDEgZWxlbWVudCwgc2V0IGl0IHRvIGVuYWJsZWRcbiAgICAgICAgICAgICAgICBhcnIuc2V0RGlzYWJsZWQoMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbWVyZ2UoYXJyYXk6IERTQXJyYXksIHN1YmFycmF5MTogRFNBcnJheSwgc3ViYXJyYXkyOiBEU0FycmF5KSB7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBsZXQgYTFpID0gMDtcbiAgICAgICAgbGV0IGEyaSA9IDA7XG4gICAgICAgIC8vRW1wdHkgdGhlIHBhcmVudCBhcnJheVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXkuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5LnNldFZhbHVlKGksIE5CU1ApO1xuICAgICAgICB9XG4gICAgICAgIC8vTWVyZ2UgdGhlIHR3byBzdWJhcnJheXMgaW50byB0aGUgcGFyZW50IGFycmF5XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheS5nZXRTaXplKCk7IGkrKykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcbiAgICAgICAgICAgICAgICBcInNvcnQuY29tcGFyZVwiLFxuICAgICAgICAgICAgICAgIGExaSA8IHN1YmFycmF5MS5nZXRTaXplKClcbiAgICAgICAgICAgICAgICAgICAgPyBzdWJhcnJheTEuZ2V0VmFsdWUoYTFpKVxuICAgICAgICAgICAgICAgICAgICA6IFwiZW1wdHkgYXJyYXlcIixcbiAgICAgICAgICAgICAgICBhMmkgPCBzdWJhcnJheTIuZ2V0U2l6ZSgpXG4gICAgICAgICAgICAgICAgICAgID8gc3ViYXJyYXkyLmdldFZhbHVlKGEyaSlcbiAgICAgICAgICAgICAgICAgICAgOiBcImVtcHR5IGFycmF5XCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgYTJpID49IHN1YmFycmF5Mi5nZXRTaXplKCkgfHxcbiAgICAgICAgICAgICAgICAoYTFpIDwgc3ViYXJyYXkxLmdldFNpemUoKSAmJlxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlKHN1YmFycmF5MS5nZXRWYWx1ZShhMWkpLCBzdWJhcnJheTIuZ2V0VmFsdWUoYTJpKSkgPFxuICAgICAgICAgICAgICAgICAgICAgICAgMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJzb3J0Lm1vdmVcIiwgc3ViYXJyYXkxLmdldFZhbHVlKGExaSkpO1xuICAgICAgICAgICAgICAgIC8vTW92ZSB0aGUgdmFsdWUgZnJvbSB0aGUgZmlyc3Qgc3ViYXJyYXkgdG8gdGhlIHBhcmVudCBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHN2Z1ZhbHVlID0gdGhpcy5TdmcucHV0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgVGV4dENpcmNsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmFycmF5MS5nZXRWYWx1ZShhMWkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPYmplY3RTaXplKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFN0cm9rZVdpZHRoKClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkuaW5pdChzdWJhcnJheTEuZ2V0Q1goYTFpKSwgc3ViYXJyYXkxLmN5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShzdmdWYWx1ZSkuY2VudGVyKGFycmF5LmdldENYKGkpLCBhcnJheS5jeSgpKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhlIHRleHQgY2lyY2xlXG4gICAgICAgICAgICAgICAgc3ZnVmFsdWUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIHZhbHVlIHRvIGRpc2FibGVkIGFuZCBzZXQgdGhlIHZhbHVlIGluIHRoZSBwYXJlbnQgYXJyYXlcbiAgICAgICAgICAgICAgICBzdWJhcnJheTEuc2V0RGlzYWJsZWQoYTFpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBhcnJheS5zZXREaXNhYmxlZChpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYXJyYXkuc2V0VmFsdWUoaSwgc3ViYXJyYXkxLmdldFZhbHVlKGExaSkpO1xuICAgICAgICAgICAgICAgIGExaSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwic29ydC5tb3ZlXCIsIHN1YmFycmF5Mi5nZXRWYWx1ZShhMmkpKTtcbiAgICAgICAgICAgICAgICAvL01vdmUgdGhlIHZhbHVlIGZyb20gdGhlIHNlY29uZCBzdWJhcnJheSB0byB0aGUgcGFyZW50IGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ZnVmFsdWUgPSB0aGlzLlN2Zy5wdXQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUZXh0Q2lyY2xlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYXJyYXkyLmdldFZhbHVlKGEyaSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9iamVjdFNpemUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3Ryb2tlV2lkdGgoKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5pbml0KHN1YmFycmF5Mi5nZXRDWChhMmkpLCBzdWJhcnJheTIuY3koKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHN2Z1ZhbHVlKS5jZW50ZXIoYXJyYXkuZ2V0Q1goaSksIGFycmF5LmN5KCkpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGUgdGV4dCBjaXJjbGVcbiAgICAgICAgICAgICAgICBzdmdWYWx1ZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgdmFsdWUgdG8gZGlzYWJsZWQgYW5kIHNldCB0aGUgdmFsdWUgaW4gdGhlIHBhcmVudCBhcnJheVxuICAgICAgICAgICAgICAgIHN1YmFycmF5Mi5zZXREaXNhYmxlZChhMmksIHRydWUpO1xuICAgICAgICAgICAgICAgIGFycmF5LnNldERpc2FibGVkKGksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBhcnJheS5zZXRWYWx1ZShpLCBzdWJhcnJheTIuZ2V0VmFsdWUoYTJpKSk7XG4gICAgICAgICAgICAgICAgYTJpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERTQXJyYXkgfSBmcm9tIFwic3JjL29iamVjdHMvZHNhcnJheVwiO1xuaW1wb3J0IHsgTWVzc2FnZXNPYmplY3QsIE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IGNvbXBhcmUsIHVwZGF0ZURlZmF1bHQgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBTb3J0ZXIgfSBmcm9tIFwifi9zb3J0aW5nXCI7XG5pbXBvcnQgeyBTb3J0LCBTb3J0TWVzc2FnZXMgfSBmcm9tIFwifi9zb3J0aW5nL3NvcnRcIjtcblxuZXhwb3J0IGNvbnN0IFF1aWNrU29ydE1lc3NhZ2VzID0ge1xuICAgIHNvcnQ6IHtcbiAgICAgICAgZmluZFBpdm90OiBcIlBpdm90IGlzIHNlbGVjdGVkXCIsXG4gICAgICAgIGxvd0JpZzogXCJFbGVtZW50IGJpZ2dlciB0aGFuIHBpdm90XCIsXG4gICAgICAgIGhpZ2hTbWFsbDogXCJFbGVtZW50IHNtYWxsZXIgdGhhbiBwaXZvdFwiLFxuICAgICAgICBwaXZvdFN3YXA6IFwiU3dhcCBwaXZvdCBpbnRvIGNvcnJlY3QgcGxhY2VcIixcbiAgICAgICAgc29ydGluZzogKGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpID0+XG4gICAgICAgICAgICBgU29ydGluZyBhcnJheSBmcm9tIGluZGV4ICR7bG93fSB0byBpbmRleCAke2hpZ2h9YCxcbiAgICAgICAgc2luZ2xlRWxlbWVudDogXCJTaW5nbGUgZWxlbWVudCBhcnJheXMgYXJlIGF1dG9tYXRpY2FsbHkgc29ydGVkXCIsXG4gICAgfSxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIE1lc3NhZ2VzT2JqZWN0O1xuXG5leHBvcnQgY2xhc3MgUXVpY2tTb3J0IGV4dGVuZHMgU29ydCBpbXBsZW1lbnRzIFNvcnRlciB7XG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VzT2JqZWN0ID0gdXBkYXRlRGVmYXVsdChRdWlja1NvcnRNZXNzYWdlcywgU29ydE1lc3NhZ2VzKTtcblxuICAgIGFzeW5jIHNvcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvcnRBcnJheS5nZXRTaXplKCkgPD0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcImdlbmVyYWwuZW1wdHlcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUodGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpIC0gMSkgPT09IE5CU1ApIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldFNpemUodGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NlbnRlciB0aGUgYXJyYXkgZGVwZW5kaW5nIG9uIGl0cyBzaXplXG4gICAgICAgIHRoaXMuc29ydEFycmF5LmNlbnRlcihcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVswXSArIHRoaXMuY29tcGVuc2F0ZSxcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVsxXSArIHRoaXMuJFN2Zy5tYXJnaW4gKiA0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy9FbnN1cmVzIHRoZXJlIGFyZSBubyBoaWdobGlnaHRzIHdoZW4gc3RhcnRpbmcgdGhlIGFsZ29yaXRobVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydEFycmF5LmdldFNpemUoKTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChpLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1N0YXJ0IHJlY3Vyc2l2ZSBjYWxscyB0byBxdWlja3NvcnRcbiAgICAgICAgYXdhaXQgdGhpcy5xdWlja1NvcnQodGhpcy5zb3J0QXJyYXksIDAsIHRoaXMuc29ydEFycmF5LmdldFNpemUoKSAtIDEpO1xuXG4gICAgICAgIC8vRW5hYmxlIGFycmF5IGFnYWluIGFmdGVyIGNvbXBsZXRpb25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvcnRBcnJheS5nZXRTaXplKCk7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0RGlzYWJsZWQoaSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9NZXNzYWdlIGRvbmVcbiAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcImdlbmVyYWwuZmluaXNoZWRcIik7XG4gICAgfVxuXG4gICAgYXN5bmMgcXVpY2tTb3J0KGFycmF5OiBEU0FycmF5LCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyKSB7XG4gICAgICAgIC8vQ29sb3JzIHNpbmdsZSBlbGVtZW50IGFycmF5cyBncmVlbiBhbmQgcmV0dXJuIHNpbmNlIHRoZXkgYXJlIHNvcnRlZFxuICAgICAgICBpZiAobG93ID49IGhpZ2ggfHwgbG93IDwgMCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShgc29ydC5zaW5nbGVFbGVtZW50YCk7XG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChsb3csIHRydWUsIFwiR3JlZW5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL1BhcnRpdGlvblxuICAgICAgICBjb25zdCBwID0gYXdhaXQgdGhpcy5wYXJ0aXRpb24obG93LCBoaWdoKTtcblxuICAgICAgICAvL1JlY3Vyc2l2ZWx5IGNhbGwgcXVpY2tzb3J0IG9uIHRoZSBzdWJhcnJheXMgY3JlYXRlZCBieSBwYXJ0aXRpb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShgc29ydC5zb3J0aW5nYCwgbG93LCBwIC0gMSk7XG4gICAgICAgIGF3YWl0IHRoaXMucXVpY2tTb3J0KGFycmF5LCBsb3csIHAgLSAxKTtcblxuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKGBzb3J0LnNvcnRpbmdgLCBwICsgMSwgaGlnaCk7XG4gICAgICAgIGF3YWl0IHRoaXMucXVpY2tTb3J0KGFycmF5LCBwICsgMSwgaGlnaCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcGFydGl0aW9uKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBsZWZ0QXJyb3dJZDogc3RyaW5nID0gXCJBcnJvd0xvd1wiO1xuICAgICAgICBjb25zdCByaWdodEFycm93SWQ6IHN0cmluZyA9IFwiQXJyb3dIaWdoXCI7XG4gICAgICAgIGNvbnN0IGJsdWUgPSBcIiMwMENcIjtcbiAgICAgICAgY29uc3QgZ3JlZW4gPSBcImdyZWVuXCI7XG4gICAgICAgIGNvbnN0IHJlZCA9IFwiI0MwMFwiO1xuICAgICAgICBsZXQgbG93ID0gbGVmdDtcbiAgICAgICAgbGV0IGhpZ2ggPSByaWdodDtcblxuICAgICAgICAvL01ha2VzIG9ubHkgdGhlIGN1cnJlbnQgc2VjdGlvbiBiZWluZyBwYXJ0aXRpb25lZCBlbmFibGVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIDwgbG93IHx8IGkgPiBoaWdoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0RGlzYWJsZWQoaSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldERpc2FibGVkKGksIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vTWFrZXMgcGl2b3QgdGhlIG1pZGRsZSBlbGVtZW50IGluIHRoZSBsaXN0XG4gICAgICAgIGxldCBwaXZvdCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgICAgIGNvbnN0IHBpdm90VmFsdWUgPSB0aGlzLnNvcnRBcnJheS5nZXRWYWx1ZShwaXZvdCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShgc29ydC5maW5kUGl2b3RgKTtcblxuICAgICAgICAvL01hcmtzIHBpdm90IGFuZCBzd2FwcyBwaXZvdCB3aXRoIHRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQocGl2b3QsIHRydWUpO1xuICAgICAgICBhd2FpdCB0aGlzLnN3YXAodGhpcy5zb3J0QXJyYXksIGxvdywgcGl2b3QpO1xuICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChwaXZvdCwgZmFsc2UpO1xuXG4gICAgICAgIC8vU2V0IHBpdm90cyBuZXcgaW5kZXgsIGRpc2FibGUgcGl2b3QgYW5kIGluY3JlbWVudCBsb3dcbiAgICAgICAgcGl2b3QgPSBsb3c7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGxvdywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXREaXNhYmxlZChwaXZvdCwgdHJ1ZSk7XG4gICAgICAgIGxvdyArPSAxO1xuXG4gICAgICAgIC8vQWRkcyBhcnJvd3MgdG8gaW5kaWNhdGUgbG93IGFuZCBoaWdoXG4gICAgICAgIHRoaXMuc29ydEFycmF5LmFkZEFycm93KGxvdywgbGVmdEFycm93SWQsIHJlZCk7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LmFkZEFycm93KGhpZ2gsIHJpZ2h0QXJyb3dJZCwgYmx1ZSk7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGxvdywgdHJ1ZSwgcmVkKTtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGhpZ2gsIHRydWUsIGJsdWUpO1xuXG4gICAgICAgICAgICAvL01vdmVzIGxvdyBhcyBmYXIgcmlnaHQgaW4gdGhlIGFycmF5IGFzIHBvc3NpYmxlXG4gICAgICAgICAgICAvL1N0b3BzIG1vdmluZyBpZiBlcXVhbCB0byBwaXZvdCBvciBpZiBpdCBnZXRzIGZhcnRoZXIgcmlnaHQgdGhlbiBoaWdoXG4gICAgICAgICAgICAvL0Fsc28gbW92ZXMgdGhlIGhpZ2hsaWdodHMgYW5kIGFycm93IGFsb25nIHdpdGggaXRcbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBsb3cgPD0gaGlnaCAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmUodGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUobG93KSwgcGl2b3RWYWx1ZSkgPCAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChsb3csIHRydWUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgIFwic29ydC5jb21wYXJlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKGxvdyksXG4gICAgICAgICAgICAgICAgICAgIHBpdm90VmFsdWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGxvdywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxvdyArPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5Lm1vdmVBcnJvdyhsZWZ0QXJyb3dJZCwgbG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DaGVja3Mgc28gbG93IGlzbid0IG91dCBvZiB0aGUgc29ydGluZyByYW5nZSBiZWZvcmUgaGlnaGxpZ2h0aW5nIGl0XG4gICAgICAgICAgICBpZiAobG93IDwgcmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChsb3csIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwic29ydC5sb3dCaWdcIik7XG5cbiAgICAgICAgICAgIC8vTW92ZXMgaGlnaCBhcyBmYXIgbGVmdCBpbiB0aGUgYXJyYXkgYXMgcG9zc2libGVcbiAgICAgICAgICAgIC8vU3RvcHMgbW92aW5nIGlmIGVxdWFsIHRvIHBpdm90IG9yIGlmIGl0IGdldHMgZmFydGhlciBsZWZ0IHRoZW4gbG93XG4gICAgICAgICAgICAvL0Fsc28gbW92ZXMgdGhlIGhpZ2hsaWdodHMgYW5kIGFycm93IGFsb25nIHdpdGggaXRcbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBsb3cgPD0gaGlnaCAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmUodGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUoaGlnaCksIHBpdm90VmFsdWUpID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaGlnaCwgdHJ1ZSwgYmx1ZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcbiAgICAgICAgICAgICAgICAgICAgXCJzb3J0LmNvbXBhcmVcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUoaGlnaCksXG4gICAgICAgICAgICAgICAgICAgIHBpdm90VmFsdWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGhpZ2gsIGZhbHNlLCBibHVlKTtcbiAgICAgICAgICAgICAgICBoaWdoIC09IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkubW92ZUFycm93KHJpZ2h0QXJyb3dJZCwgaGlnaCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJzb3J0LmhpZ2hTbWFsbFwiKTtcblxuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaGlnaCwgdHJ1ZSwgYmx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChsb3cgPiBoaWdoKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vU3dhcCBsb3cgYW5kIGhpZ2ggc2luY2UgbG93IGlzIG5vdyBoaWdoZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3RcbiAgICAgICAgICAgIC8vQW5kIGhpZ2hlciBpcyBsb3dlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwaXZvdFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zd2FwKHRoaXMuc29ydEFycmF5LCBsb3csIGhpZ2gpO1xuXG4gICAgICAgICAgICAvL1JlbW92ZSBoaWdobGlnaHRzXG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChsb3csIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGhpZ2gsIGZhbHNlKTtcblxuICAgICAgICAgICAgbG93ICs9IDE7XG4gICAgICAgICAgICBoaWdoIC09IDE7XG5cbiAgICAgICAgICAgIC8vT25seSBwdXQgdGhlbSBiYWNrIGlmIGxvdyBhbmQgaGlnaCBhcmUgbm90IG91dCBvZiBib3VuZHNcbiAgICAgICAgICAgIGlmIChsb3cgPCByaWdodCAmJiBoaWdoID4gbGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGxvdywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaGlnaCwgdHJ1ZSwgYmx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5Lm1vdmVBcnJvdyhsZWZ0QXJyb3dJZCwgbG93KTtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5Lm1vdmVBcnJvdyhyaWdodEFycm93SWQsIGhpZ2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Pbmx5IHJlbW92ZSBsb3dzIGhpZ2hsaWdodCBpZiBpdHMgbm90IG91dCBvZiBib3VuZHMgc28gd2UgZG9uJ3QgcmVtb3ZlIGdyZWVuIGhpZ2hsaWdodFxuICAgICAgICAvL2luZGljYXRpbmcgdGhlIGNvcnJlY3QgcG9zaXRpb24gaGFzIGJlZW4gcmVhY2hlZFxuICAgICAgICBpZiAobG93IDwgcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGxvdywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Td2FwIHRoZSBwaXZvdCBiYWNrIGludG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uIGFuZCBub3cgY29ycmVjdCBzb3J0ZWQgcG9zaXRpb24gaW4gdGhlIGFycmF5XG4gICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJzb3J0LnBpdm90U3dhcFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zd2FwKHRoaXMuc29ydEFycmF5LCBwaXZvdCwgaGlnaCk7XG4gICAgICAgIC8vQ29sb3IgcGl2b3QgZ3JlZW4gc2luY2UgaXQgaXMgc29ydGVkIGludG8gaXRzIHJpZ2h0IHBsYWNlXG4gICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGhpZ2gsIHRydWUsIGdyZWVuKTtcblxuICAgICAgICB0aGlzLnNvcnRBcnJheS5yZW1vdmVBcnJvdyhsZWZ0QXJyb3dJZCk7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LnJlbW92ZUFycm93KHJpZ2h0QXJyb3dJZCk7XG5cbiAgICAgICAgcmV0dXJuIGhpZ2g7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTWVzc2FnZXNPYmplY3QsIE5CU1AgfSBmcm9tIFwifi9lbmdpbmVcIjtcbmltcG9ydCB7IGNvbXBhcmUsIHVwZGF0ZURlZmF1bHQgfSBmcm9tIFwifi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBTb3J0ZXIgfSBmcm9tIFwifi9zb3J0aW5nXCI7XG5pbXBvcnQgeyBTb3J0LCBTb3J0TWVzc2FnZXMgfSBmcm9tIFwiLi9zb3J0XCI7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25Tb3J0TWVzc2FnZXMgPSB7XG4gICAgc29ydDoge1xuICAgICAgICBmb3VuZE5ld01pbjogKGE6IHN0cmluZykgPT4gYEZvdW5kIGEgc21hbGxlciB2YWx1ZSAke2F9YCxcbiAgICB9LFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgTWVzc2FnZXNPYmplY3Q7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25Tb3J0IGV4dGVuZHMgU29ydCBpbXBsZW1lbnRzIFNvcnRlciB7XG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VzT2JqZWN0ID0gdXBkYXRlRGVmYXVsdChcbiAgICAgICAgU2VsZWN0aW9uU29ydE1lc3NhZ2VzLFxuICAgICAgICBTb3J0TWVzc2FnZXNcbiAgICApO1xuICAgIGFzeW5jIHNvcnQoKSB7XG4gICAgICAgIGxldCBzb3J0U2l6ZSA9IHRoaXMuc29ydEFycmF5LmdldFNpemUoKTtcbiAgICAgICAgaWYgKHNvcnRTaXplIDw9IDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJnZW5lcmFsLmVtcHR5XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc29ydEFycmF5LmdldFZhbHVlKHRoaXMuc29ydEFycmF5LmdldFNpemUoKSAtIDEpID09PSBOQlNQKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRTaXplKHRoaXMuc29ydEFycmF5LmdldFNpemUoKSAtIDEpO1xuICAgICAgICAgICAgc29ydFNpemUtLTtcbiAgICAgICAgfVxuICAgICAgICAvL0NlbnRlciB0aGUgYXJyYXkgZGVwZW5kaW5nIG9uIGl0cyBzaXplXG4gICAgICAgIHRoaXMuc29ydEFycmF5LmNlbnRlcihcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVswXSArIHRoaXMuY29tcGVuc2F0ZSxcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVsxXSArIHRoaXMuJFN2Zy5tYXJnaW4gKiA0XG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0U2l6ZSAtIDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1pbkluZGV4ID0gaTtcblxuICAgICAgICAgICAgLy8gRmluZCB0aGUgaW5kZXggb2YgdGhlIG1pbmltdW0gZWxlbWVudCBpbiB0aGUgdW5zb3J0ZWQgcGFydCBvZiB0aGUgYXJyYXlcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHNvcnRTaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBIaWdobGlnaHQgdGhlIGN1cnJlbnQgZWxlbWVudCBhbmQgdGhlIG1pbmltdW0gZWxlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGosIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KG1pbkluZGV4LCB0cnVlLCBcIkJsdWVcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBNZXNzYWdlOiBDb21wYXJlIHRoZSBjdXJyZW50IGVsZW1lbnQgd2l0aCB0aGUgbWluaW11bSBlbGVtZW50XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXVzZShcbiAgICAgICAgICAgICAgICAgICAgXCJzb3J0LmNvbXBhcmVcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUoaiksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKG1pbkluZGV4KVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5nZXRWYWx1ZShqKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKG1pbkluZGV4KVxuICAgICAgICAgICAgICAgICAgICApIDwgMFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmhpZ2hsaWdodCB0aGUgcHJldmlvdXMgbWluaW11bSBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KG1pbkluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGosIHRydWUsIFwiQmx1ZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICBtaW5JbmRleCA9IGo7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTWVzc2FnZTogRm91bmQgYSBuZXcgbWluaW11bSBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNvcnQuZm91bmROZXdNaW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKG1pbkluZGV4KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVuaGlnaGxpZ2h0IHRoZSBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVbmhpZ2hsaWdodCB0aGUgbWluaW11bSBlbGVtZW50IGFuZCB0aGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KG1pbkluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBmb3VuZCBhIG5ldyBtaW5pbXVtLCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgICAgICAgICAgaWYgKG1pbkluZGV4ICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zd2FwKHRoaXMuc29ydEFycmF5LCBpLCBtaW5JbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNvcnRlZCBwYXJ0IG9mIHRoZSBhcnJheVxuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaSwgdHJ1ZSwgXCJHcmVlblwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChzb3J0U2l6ZSAtIDEsIHRydWUsIFwiR3JlZW5cIik7XG4gICAgICAgIGF3YWl0IHRoaXMucGF1c2UoXCJnZW5lcmFsLmZpbmlzaGVkXCIpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRoZSBoaWdobGlnaHRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydFNpemU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0SW5kZXhIaWdobGlnaHQoaSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRW5naW5lLCBNZXNzYWdlc09iamVjdCB9IGZyb20gXCJ+L2VuZ2luZVwiO1xuaW1wb3J0IHsgRFNBcnJheSB9IGZyb20gXCJ+L29iamVjdHMvZHNhcnJheVwiO1xuaW1wb3J0IHsgVGV4dENpcmNsZSB9IGZyb20gXCJ+L29iamVjdHMvdGV4dC1jaXJjbGVcIjtcbmltcG9ydCB7IFNvcnRlciB9IGZyb20gXCJ+L3NvcnRpbmdcIjtcblxuZXhwb3J0IGNvbnN0IFNvcnRNZXNzYWdlcyA9IHtcbiAgICBnZW5lcmFsOiB7XG4gICAgICAgIGVtcHR5OiBcIkFycmF5IGlzIGVtcHR5IVwiLFxuICAgICAgICBmdWxsOiBcIkFycmF5IGlzIGZ1bGwhXCIsXG4gICAgICAgIGZpbmlzaGVkOiBcIkZpbmlzaGVkXCIsXG4gICAgfSxcbiAgICBpbnNlcnQ6IHtcbiAgICAgICAgdmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiBgSW5zZXJ0IHZhbHVlOiAke3ZhbHVlfWAsXG4gICAgfSxcbiAgICBzb3J0OiB7XG4gICAgICAgIGNvbXBhcmU6IChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4gYENvbXBhcmUgJHthfSBhbmQgJHtifWAsXG4gICAgICAgIHN3YXA6IChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4gYFN3YXAgJHthfSBhbmQgJHtifWAsXG4gICAgfSxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIE1lc3NhZ2VzT2JqZWN0O1xuXG5leHBvcnQgY2xhc3MgU29ydCBleHRlbmRzIEVuZ2luZSBpbXBsZW1lbnRzIFNvcnRlciB7XG4gICAgaW5pdGlhbFZhbHVlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvbXBlbnNhdGU6IG51bWJlciA9IDA7XG4gICAgc29ydEFycmF5OiBEU0FycmF5O1xuICAgIGluZGV4TGVuZ3RoOiBudW1iZXIgPSAwO1xuICAgIGJhc2VTaXplOiBudW1iZXIgPSAyODtcbiAgICBtZXNzYWdlczogTWVzc2FnZXNPYmplY3QgPSBTb3J0TWVzc2FnZXM7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkgPSBuZXcgRFNBcnJheSgwLCB0aGlzLmdldE9iamVjdFNpemUoKSk7IC8vIE9ubHkgYWRkZWQgdG8gbWFrZSBzdXJlIHRoYXQgc29ydEFycmF5IG5ldmVyIGlzIG51bGxcbiAgICB9XG5cbiAgICBpbml0aWFsaXNlKGluaXRpYWxWYWx1ZXMgPSBbXSkge1xuICAgICAgICB0aGlzLmluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzO1xuICAgICAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRBbGdvcml0aG0oKSB7XG4gICAgICAgIGF3YWl0IHN1cGVyLnJlc2V0QWxnb3JpdGhtKCk7XG4gICAgICAgIHRoaXMuaW5kZXhMZW5ndGggPSAwO1xuICAgICAgICBjb25zdCBbeFJvb3QsIHlSb290XSA9IHRoaXMuZ2V0VHJlZVJvb3QoKTtcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkgPSB0aGlzLlN2Zy5wdXQoXG4gICAgICAgICAgICBuZXcgRFNBcnJheSgxLCB0aGlzLmdldE9iamVjdFNpemUoKSlcbiAgICAgICAgKS5pbml0KDEsIHhSb290LCB5Um9vdCArIHRoaXMuJFN2Zy5tYXJnaW4gKiA0KTtcbiAgICAgICAgdGhpcy5TdmcucHV0KHRoaXMuc29ydEFycmF5KTtcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0RGlzYWJsZWQoMCwgZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnJ1bldoaWxlUmVzZXR0aW5nKFxuICAgICAgICAgICAgICAgIGFzeW5jICgpID0+IGF3YWl0IHRoaXMuaW5zZXJ0KC4uLnRoaXMuaW5pdGlhbFZhbHVlcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpbnNlcnQoLi4udmFsdWVzOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+KSB7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LnNldFNpemUodGhpcy5zb3J0QXJyYXkuZ2V0U2l6ZSgpICsgdmFsdWVzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LmNlbnRlcihcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVswXSxcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZVJvb3QoKVsxXSArIHRoaXMuJFN2Zy5tYXJnaW4gKiA0XG4gICAgICAgICk7XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbnNlcnRPbmUodmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN3YXAoYXJyOiBEU0FycmF5LCBqOiBudW1iZXIsIGs6IG51bWJlcikge1xuICAgICAgICBhcnIuc3dhcChqLCBrLCB0cnVlKTtcbiAgICAgICAgYXJyLnNldEluZGV4SGlnaGxpZ2h0KGosIHRydWUpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFxuICAgICAgICAgICAgXCJzb3J0LnN3YXBcIixcbiAgICAgICAgICAgIHRoaXMuc29ydEFycmF5LmdldFZhbHVlKGopLFxuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuZ2V0VmFsdWUoaylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBpbnNlcnRPbmUodmFsdWU6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGFycmF5TGFiZWwgPSB0aGlzLlN2Zy5wdXQoXG4gICAgICAgICAgICBuZXcgVGV4dENpcmNsZSh2YWx1ZSwgdGhpcy5nZXRPYmplY3RTaXplKCksIHRoaXMuZ2V0U3Ryb2tlV2lkdGgoKSlcbiAgICAgICAgKS5pbml0KC4uLnRoaXMuZ2V0Tm9kZVN0YXJ0KCkpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKFwiaW5zZXJ0LnZhbHVlXCIsIHZhbHVlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5pbmRleExlbmd0aDtcbiAgICAgICAgYXJyYXlMYWJlbC5zZXRDZW50ZXIoXG4gICAgICAgICAgICB0aGlzLnNvcnRBcnJheS5nZXRDWChjdXJyZW50SW5kZXgpLFxuICAgICAgICAgICAgdGhpcy5zb3J0QXJyYXkuY3koKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3BlZWQoKVxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLnBhdXNlKHVuZGVmaW5lZCk7XG5cbiAgICAgICAgYXJyYXlMYWJlbC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zb3J0QXJyYXkuc2V0RGlzYWJsZWQoY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LnNldFZhbHVlKGN1cnJlbnRJbmRleCwgdmFsdWUpO1xuICAgICAgICB0aGlzLnNvcnRBcnJheS5zZXRJbmRleEhpZ2hsaWdodChjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICB0aGlzLmluZGV4TGVuZ3RoKys7XG4gICAgICAgIHRoaXMuc29ydEFycmF5LnNldEluZGV4SGlnaGxpZ2h0KGN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIHNvcnQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNvcnQgbm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gICAgcHJpdmF0ZSByZXNldHRpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBhbmltYXRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNldHRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1Jlc2V0dGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzZXR0aW5nO1xuICAgIH1cblxuICAgIHNldEFuaW1hdGluZyh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB2YWw7XG4gICAgfVxuXG4gICAgaXNBbmltYXRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGluZztcbiAgICB9XG5cbiAgICBhc3luYyBydW5XaGlsZVJlc2V0dGluZyhmdW5jOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlc2V0dGluZyA9IHRydWU7XG4gICAgICAgIGF3YWl0IGZ1bmMoKTtcbiAgICAgICAgdGhpcy5yZXNldHRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IFF1ZXVlIGZyb20gJy4vUXVldWUuanMnXG5cbmNvbnN0IEFuaW1hdG9yID0ge1xuICBuZXh0RHJhdzogbnVsbCxcbiAgZnJhbWVzOiBuZXcgUXVldWUoKSxcbiAgdGltZW91dHM6IG5ldyBRdWV1ZSgpLFxuICBpbW1lZGlhdGVzOiBuZXcgUXVldWUoKSxcbiAgdGltZXI6ICgpID0+IGdsb2JhbHMud2luZG93LnBlcmZvcm1hbmNlIHx8IGdsb2JhbHMud2luZG93LkRhdGUsXG4gIHRyYW5zZm9ybXM6IFtdLFxuXG4gIGZyYW1lKGZuKSB7XG4gICAgLy8gU3RvcmUgdGhlIG5vZGVcbiAgICBjb25zdCBub2RlID0gQW5pbWF0b3IuZnJhbWVzLnB1c2goeyBydW46IGZuIH0pXG5cbiAgICAvLyBSZXF1ZXN0IGFuIGFuaW1hdGlvbiBmcmFtZSBpZiB3ZSBkb24ndCBoYXZlIG9uZVxuICAgIGlmIChBbmltYXRvci5uZXh0RHJhdyA9PT0gbnVsbCkge1xuICAgICAgQW5pbWF0b3IubmV4dERyYXcgPSBnbG9iYWxzLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQW5pbWF0b3IuX2RyYXcpXG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSBub2RlIHNvIHdlIGNhbiByZW1vdmUgaXQgZWFzaWx5XG4gICAgcmV0dXJuIG5vZGVcbiAgfSxcblxuICB0aW1lb3V0KGZuLCBkZWxheSkge1xuICAgIGRlbGF5ID0gZGVsYXkgfHwgMFxuXG4gICAgLy8gV29yayBvdXQgd2hlbiB0aGUgZXZlbnQgc2hvdWxkIGZpcmVcbiAgICBjb25zdCB0aW1lID0gQW5pbWF0b3IudGltZXIoKS5ub3coKSArIGRlbGF5XG5cbiAgICAvLyBBZGQgdGhlIHRpbWVvdXQgdG8gdGhlIGVuZCBvZiB0aGUgcXVldWVcbiAgICBjb25zdCBub2RlID0gQW5pbWF0b3IudGltZW91dHMucHVzaCh7IHJ1bjogZm4sIHRpbWU6IHRpbWUgfSlcblxuICAgIC8vIFJlcXVlc3QgYW5vdGhlciBhbmltYXRpb24gZnJhbWUgaWYgd2UgbmVlZCBvbmVcbiAgICBpZiAoQW5pbWF0b3IubmV4dERyYXcgPT09IG51bGwpIHtcbiAgICAgIEFuaW1hdG9yLm5leHREcmF3ID0gZ2xvYmFscy53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW1hdG9yLl9kcmF3KVxuICAgIH1cblxuICAgIHJldHVybiBub2RlXG4gIH0sXG5cbiAgaW1tZWRpYXRlKGZuKSB7XG4gICAgLy8gQWRkIHRoZSBpbW1lZGlhdGUgZm4gdG8gdGhlIGVuZCBvZiB0aGUgcXVldWVcbiAgICBjb25zdCBub2RlID0gQW5pbWF0b3IuaW1tZWRpYXRlcy5wdXNoKGZuKVxuICAgIC8vIFJlcXVlc3QgYW5vdGhlciBhbmltYXRpb24gZnJhbWUgaWYgd2UgbmVlZCBvbmVcbiAgICBpZiAoQW5pbWF0b3IubmV4dERyYXcgPT09IG51bGwpIHtcbiAgICAgIEFuaW1hdG9yLm5leHREcmF3ID0gZ2xvYmFscy53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW1hdG9yLl9kcmF3KVxuICAgIH1cblxuICAgIHJldHVybiBub2RlXG4gIH0sXG5cbiAgY2FuY2VsRnJhbWUobm9kZSkge1xuICAgIG5vZGUgIT0gbnVsbCAmJiBBbmltYXRvci5mcmFtZXMucmVtb3ZlKG5vZGUpXG4gIH0sXG5cbiAgY2xlYXJUaW1lb3V0KG5vZGUpIHtcbiAgICBub2RlICE9IG51bGwgJiYgQW5pbWF0b3IudGltZW91dHMucmVtb3ZlKG5vZGUpXG4gIH0sXG5cbiAgY2FuY2VsSW1tZWRpYXRlKG5vZGUpIHtcbiAgICBub2RlICE9IG51bGwgJiYgQW5pbWF0b3IuaW1tZWRpYXRlcy5yZW1vdmUobm9kZSlcbiAgfSxcblxuICBfZHJhdyhub3cpIHtcbiAgICAvLyBSdW4gYWxsIHRoZSB0aW1lb3V0cyB3ZSBjYW4gcnVuLCBpZiB0aGV5IGFyZSBub3QgcmVhZHkgeWV0LCBhZGQgdGhlbVxuICAgIC8vIHRvIHRoZSBlbmQgb2YgdGhlIHF1ZXVlIGltbWVkaWF0ZWx5ISAoYmFkIHRpbWVvdXRzISEhIFtzYXJjYXNtXSlcbiAgICBsZXQgbmV4dFRpbWVvdXQgPSBudWxsXG4gICAgY29uc3QgbGFzdFRpbWVvdXQgPSBBbmltYXRvci50aW1lb3V0cy5sYXN0KClcbiAgICB3aGlsZSAoKG5leHRUaW1lb3V0ID0gQW5pbWF0b3IudGltZW91dHMuc2hpZnQoKSkpIHtcbiAgICAgIC8vIFJ1biB0aGUgdGltZW91dCBpZiBpdHMgdGltZSwgb3IgcHVzaCBpdCB0byB0aGUgZW5kXG4gICAgICBpZiAobm93ID49IG5leHRUaW1lb3V0LnRpbWUpIHtcbiAgICAgICAgbmV4dFRpbWVvdXQucnVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEFuaW1hdG9yLnRpbWVvdXRzLnB1c2gobmV4dFRpbWVvdXQpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGhpdCB0aGUgbGFzdCBpdGVtLCB3ZSBzaG91bGQgc3RvcCBzaGlmdGluZyBvdXQgbW9yZSBpdGVtc1xuICAgICAgaWYgKG5leHRUaW1lb3V0ID09PSBsYXN0VGltZW91dCkgYnJlYWtcbiAgICB9XG5cbiAgICAvLyBSdW4gYWxsIG9mIHRoZSBhbmltYXRpb24gZnJhbWVzXG4gICAgbGV0IG5leHRGcmFtZSA9IG51bGxcbiAgICBjb25zdCBsYXN0RnJhbWUgPSBBbmltYXRvci5mcmFtZXMubGFzdCgpXG4gICAgd2hpbGUgKG5leHRGcmFtZSAhPT0gbGFzdEZyYW1lICYmIChuZXh0RnJhbWUgPSBBbmltYXRvci5mcmFtZXMuc2hpZnQoKSkpIHtcbiAgICAgIG5leHRGcmFtZS5ydW4obm93KVxuICAgIH1cblxuICAgIGxldCBuZXh0SW1tZWRpYXRlID0gbnVsbFxuICAgIHdoaWxlICgobmV4dEltbWVkaWF0ZSA9IEFuaW1hdG9yLmltbWVkaWF0ZXMuc2hpZnQoKSkpIHtcbiAgICAgIG5leHRJbW1lZGlhdGUoKVxuICAgIH1cblxuICAgIC8vIElmIHdlIGhhdmUgcmVtYWluaW5nIHRpbWVvdXRzIG9yIGZyYW1lcywgZHJhdyB1bnRpbCB3ZSBkb24ndCBhbnltb3JlXG4gICAgQW5pbWF0b3IubmV4dERyYXcgPVxuICAgICAgQW5pbWF0b3IudGltZW91dHMuZmlyc3QoKSB8fCBBbmltYXRvci5mcmFtZXMuZmlyc3QoKVxuICAgICAgICA/IGdsb2JhbHMud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShBbmltYXRvci5fZHJhdylcbiAgICAgICAgOiBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0b3JcbiIsImltcG9ydCB7IHRpbWVsaW5lIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2RlZmF1bHRzLmpzJ1xuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcblxuLyoqKlxuQmFzZSBDbGFzc1xuPT09PT09PT09PVxuVGhlIGJhc2Ugc3RlcHBlciBjbGFzcyB0aGF0IHdpbGwgYmVcbioqKi9cblxuZnVuY3Rpb24gbWFrZVNldHRlckdldHRlcihrLCBmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodikge1xuICAgIGlmICh2ID09IG51bGwpIHJldHVybiB0aGlzW2tdXG4gICAgdGhpc1trXSA9IHZcbiAgICBpZiAoZikgZi5jYWxsKHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZWFzaW5nID0ge1xuICAnLSc6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gcG9zXG4gIH0sXG4gICc8Pic6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHBvcyAqIE1hdGguUEkpIC8gMiArIDAuNVxuICB9LFxuICAnPic6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4oKHBvcyAqIE1hdGguUEkpIC8gMilcbiAgfSxcbiAgJzwnOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgcmV0dXJuIC1NYXRoLmNvcygocG9zICogTWF0aC5QSSkgLyAyKSArIDFcbiAgfSxcbiAgYmV6aWVyOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAvLyBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1lYXNpbmctMS8jY3ViaWMtYmV6aWVyLWFsZ29cbiAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgIGlmICh0IDwgMCkge1xuICAgICAgICBpZiAoeDEgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuICh5MSAvIHgxKSAqIHRcbiAgICAgICAgfSBlbHNlIGlmICh4MiA+IDApIHtcbiAgICAgICAgICByZXR1cm4gKHkyIC8geDIpICogdFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodCA+IDEpIHtcbiAgICAgICAgaWYgKHgyIDwgMSkge1xuICAgICAgICAgIHJldHVybiAoKDEgLSB5MikgLyAoMSAtIHgyKSkgKiB0ICsgKHkyIC0geDIpIC8gKDEgLSB4MilcbiAgICAgICAgfSBlbHNlIGlmICh4MSA8IDEpIHtcbiAgICAgICAgICByZXR1cm4gKCgxIC0geTEpIC8gKDEgLSB4MSkpICogdCArICh5MSAtIHgxKSAvICgxIC0geDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDMgKiB0ICogKDEgLSB0KSAqKiAyICogeTEgKyAzICogdCAqKiAyICogKDEgLSB0KSAqIHkyICsgdCAqKiAzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1lYXNpbmctMS8jc3RlcC10aW1pbmctZnVuY3Rpb24tYWxnb1xuICBzdGVwczogZnVuY3Rpb24gKHN0ZXBzLCBzdGVwUG9zaXRpb24gPSAnZW5kJykge1xuICAgIC8vIGRlYWwgd2l0aCBcImp1bXAtXCIgcHJlZml4XG4gICAgc3RlcFBvc2l0aW9uID0gc3RlcFBvc2l0aW9uLnNwbGl0KCctJykucmV2ZXJzZSgpWzBdXG5cbiAgICBsZXQganVtcHMgPSBzdGVwc1xuICAgIGlmIChzdGVwUG9zaXRpb24gPT09ICdub25lJykge1xuICAgICAgLS1qdW1wc1xuICAgIH0gZWxzZSBpZiAoc3RlcFBvc2l0aW9uID09PSAnYm90aCcpIHtcbiAgICAgICsranVtcHNcbiAgICB9XG5cbiAgICAvLyBUaGUgYmVmb3JlRmxhZyBpcyBlc3NlbnRpYWxseSB1c2VsZXNzXG4gICAgcmV0dXJuICh0LCBiZWZvcmVGbGFnID0gZmFsc2UpID0+IHtcbiAgICAgIC8vIFN0ZXAgaXMgY2FsbGVkIGN1cnJlbnRTdGVwIGluIHJlZmVyZW5jZWQgdXJsXG4gICAgICBsZXQgc3RlcCA9IE1hdGguZmxvb3IodCAqIHN0ZXBzKVxuICAgICAgY29uc3QganVtcGluZyA9ICh0ICogc3RlcCkgJSAxID09PSAwXG5cbiAgICAgIGlmIChzdGVwUG9zaXRpb24gPT09ICdzdGFydCcgfHwgc3RlcFBvc2l0aW9uID09PSAnYm90aCcpIHtcbiAgICAgICAgKytzdGVwXG4gICAgICB9XG5cbiAgICAgIGlmIChiZWZvcmVGbGFnICYmIGp1bXBpbmcpIHtcbiAgICAgICAgLS1zdGVwXG4gICAgICB9XG5cbiAgICAgIGlmICh0ID49IDAgJiYgc3RlcCA8IDApIHtcbiAgICAgICAgc3RlcCA9IDBcbiAgICAgIH1cblxuICAgICAgaWYgKHQgPD0gMSAmJiBzdGVwID4ganVtcHMpIHtcbiAgICAgICAgc3RlcCA9IGp1bXBzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGVwIC8ganVtcHNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0ZXBwZXIge1xuICBkb25lKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKipcbkVhc2luZyBGdW5jdGlvbnNcbj09PT09PT09PT09PT09PT1cbioqKi9cblxuZXhwb3J0IGNsYXNzIEVhc2UgZXh0ZW5kcyBTdGVwcGVyIHtcbiAgY29uc3RydWN0b3IoZm4gPSB0aW1lbGluZS5lYXNlKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWFzZSA9IGVhc2luZ1tmbl0gfHwgZm5cbiAgfVxuXG4gIHN0ZXAoZnJvbSwgdG8sIHBvcykge1xuICAgIGlmICh0eXBlb2YgZnJvbSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBwb3MgPCAxID8gZnJvbSA6IHRvXG4gICAgfVxuICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiB0aGlzLmVhc2UocG9zKVxuICB9XG59XG5cbi8qKipcbkNvbnRyb2xsZXIgVHlwZXNcbj09PT09PT09PT09PT09PT1cbioqKi9cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBTdGVwcGVyIHtcbiAgY29uc3RydWN0b3IoZm4pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGVwcGVyID0gZm5cbiAgfVxuXG4gIGRvbmUoYykge1xuICAgIHJldHVybiBjLmRvbmVcbiAgfVxuXG4gIHN0ZXAoY3VycmVudCwgdGFyZ2V0LCBkdCwgYykge1xuICAgIHJldHVybiB0aGlzLnN0ZXBwZXIoY3VycmVudCwgdGFyZ2V0LCBkdCwgYylcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZSgpIHtcbiAgLy8gQXBwbHkgdGhlIGRlZmF1bHQgcGFyYW1ldGVyc1xuICBjb25zdCBkdXJhdGlvbiA9ICh0aGlzLl9kdXJhdGlvbiB8fCA1MDApIC8gMTAwMFxuICBjb25zdCBvdmVyc2hvb3QgPSB0aGlzLl9vdmVyc2hvb3QgfHwgMFxuXG4gIC8vIENhbGN1bGF0ZSB0aGUgUElEIG5hdHVyYWwgcmVzcG9uc2VcbiAgY29uc3QgZXBzID0gMWUtMTBcbiAgY29uc3QgcGkgPSBNYXRoLlBJXG4gIGNvbnN0IG9zID0gTWF0aC5sb2cob3ZlcnNob290IC8gMTAwICsgZXBzKVxuICBjb25zdCB6ZXRhID0gLW9zIC8gTWF0aC5zcXJ0KHBpICogcGkgKyBvcyAqIG9zKVxuICBjb25zdCB3biA9IDMuOSAvICh6ZXRhICogZHVyYXRpb24pXG5cbiAgLy8gQ2FsY3VsYXRlIHRoZSBTcHJpbmcgdmFsdWVzXG4gIHRoaXMuZCA9IDIgKiB6ZXRhICogd25cbiAgdGhpcy5rID0gd24gKiB3blxufVxuXG5leHBvcnQgY2xhc3MgU3ByaW5nIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGR1cmF0aW9uID0gNTAwLCBvdmVyc2hvb3QgPSAwKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZHVyYXRpb24oZHVyYXRpb24pLm92ZXJzaG9vdChvdmVyc2hvb3QpXG4gIH1cblxuICBzdGVwKGN1cnJlbnQsIHRhcmdldCwgZHQsIGMpIHtcbiAgICBpZiAodHlwZW9mIGN1cnJlbnQgPT09ICdzdHJpbmcnKSByZXR1cm4gY3VycmVudFxuICAgIGMuZG9uZSA9IGR0ID09PSBJbmZpbml0eVxuICAgIGlmIChkdCA9PT0gSW5maW5pdHkpIHJldHVybiB0YXJnZXRcbiAgICBpZiAoZHQgPT09IDApIHJldHVybiBjdXJyZW50XG5cbiAgICBpZiAoZHQgPiAxMDApIGR0ID0gMTZcblxuICAgIGR0IC89IDEwMDBcblxuICAgIC8vIEdldCB0aGUgcHJldmlvdXMgdmVsb2NpdHlcbiAgICBjb25zdCB2ZWxvY2l0eSA9IGMudmVsb2NpdHkgfHwgMFxuXG4gICAgLy8gQXBwbHkgdGhlIGNvbnRyb2wgdG8gZ2V0IHRoZSBuZXcgcG9zaXRpb24gYW5kIHN0b3JlIGl0XG4gICAgY29uc3QgYWNjZWxlcmF0aW9uID0gLXRoaXMuZCAqIHZlbG9jaXR5IC0gdGhpcy5rICogKGN1cnJlbnQgLSB0YXJnZXQpXG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSBjdXJyZW50ICsgdmVsb2NpdHkgKiBkdCArIChhY2NlbGVyYXRpb24gKiBkdCAqIGR0KSAvIDJcblxuICAgIC8vIFN0b3JlIHRoZSB2ZWxvY2l0eVxuICAgIGMudmVsb2NpdHkgPSB2ZWxvY2l0eSArIGFjY2VsZXJhdGlvbiAqIGR0XG5cbiAgICAvLyBGaWd1cmUgb3V0IGlmIHdlIGhhdmUgY29udmVyZ2VkLCBhbmQgaWYgc28sIHBhc3MgdGhlIHZhbHVlXG4gICAgYy5kb25lID0gTWF0aC5hYnModGFyZ2V0IC0gbmV3UG9zaXRpb24pICsgTWF0aC5hYnModmVsb2NpdHkpIDwgMC4wMDJcbiAgICByZXR1cm4gYy5kb25lID8gdGFyZ2V0IDogbmV3UG9zaXRpb25cbiAgfVxufVxuXG5leHRlbmQoU3ByaW5nLCB7XG4gIGR1cmF0aW9uOiBtYWtlU2V0dGVyR2V0dGVyKCdfZHVyYXRpb24nLCByZWNhbGN1bGF0ZSksXG4gIG92ZXJzaG9vdDogbWFrZVNldHRlckdldHRlcignX292ZXJzaG9vdCcsIHJlY2FsY3VsYXRlKVxufSlcblxuZXhwb3J0IGNsYXNzIFBJRCBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihwID0gMC4xLCBpID0gMC4wMSwgZCA9IDAsIHdpbmR1cCA9IDEwMDApIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wKHApLmkoaSkuZChkKS53aW5kdXAod2luZHVwKVxuICB9XG5cbiAgc3RlcChjdXJyZW50LCB0YXJnZXQsIGR0LCBjKSB7XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnc3RyaW5nJykgcmV0dXJuIGN1cnJlbnRcbiAgICBjLmRvbmUgPSBkdCA9PT0gSW5maW5pdHlcblxuICAgIGlmIChkdCA9PT0gSW5maW5pdHkpIHJldHVybiB0YXJnZXRcbiAgICBpZiAoZHQgPT09IDApIHJldHVybiBjdXJyZW50XG5cbiAgICBjb25zdCBwID0gdGFyZ2V0IC0gY3VycmVudFxuICAgIGxldCBpID0gKGMuaW50ZWdyYWwgfHwgMCkgKyBwICogZHRcbiAgICBjb25zdCBkID0gKHAgLSAoYy5lcnJvciB8fCAwKSkgLyBkdFxuICAgIGNvbnN0IHdpbmR1cCA9IHRoaXMuX3dpbmR1cFxuXG4gICAgLy8gYW50aXdpbmR1cFxuICAgIGlmICh3aW5kdXAgIT09IGZhbHNlKSB7XG4gICAgICBpID0gTWF0aC5tYXgoLXdpbmR1cCwgTWF0aC5taW4oaSwgd2luZHVwKSlcbiAgICB9XG5cbiAgICBjLmVycm9yID0gcFxuICAgIGMuaW50ZWdyYWwgPSBpXG5cbiAgICBjLmRvbmUgPSBNYXRoLmFicyhwKSA8IDAuMDAxXG5cbiAgICByZXR1cm4gYy5kb25lID8gdGFyZ2V0IDogY3VycmVudCArICh0aGlzLlAgKiBwICsgdGhpcy5JICogaSArIHRoaXMuRCAqIGQpXG4gIH1cbn1cblxuZXh0ZW5kKFBJRCwge1xuICB3aW5kdXA6IG1ha2VTZXR0ZXJHZXR0ZXIoJ193aW5kdXAnKSxcbiAgcDogbWFrZVNldHRlckdldHRlcignUCcpLFxuICBpOiBtYWtlU2V0dGVyR2V0dGVyKCdJJyksXG4gIGQ6IG1ha2VTZXR0ZXJHZXR0ZXIoJ0QnKVxufSlcbiIsImltcG9ydCB7IEVhc2UgfSBmcm9tICcuL0NvbnRyb2xsZXIuanMnXG5pbXBvcnQge1xuICBkZWxpbWl0ZXIsXG4gIG51bWJlckFuZFVuaXQsXG4gIGlzUGF0aExldHRlclxufSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IENvbG9yIGZyb20gJy4uL3R5cGVzL0NvbG9yLmpzJ1xuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuLi90eXBlcy9QYXRoQXJyYXkuanMnXG5pbXBvcnQgU1ZHQXJyYXkgZnJvbSAnLi4vdHlwZXMvU1ZHQXJyYXkuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcblxuY29uc3QgZ2V0Q2xhc3NGb3JUeXBlID0gKHZhbHVlKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWVcblxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gU1ZHTnVtYmVyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoQ29sb3IuaXNDb2xvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBDb2xvclxuICAgIH0gZWxzZSBpZiAoZGVsaW1pdGVyLnRlc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gaXNQYXRoTGV0dGVyLnRlc3QodmFsdWUpID8gUGF0aEFycmF5IDogU1ZHQXJyYXlcbiAgICB9IGVsc2UgaWYgKG51bWJlckFuZFVuaXQudGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBTVkdOdW1iZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5vbk1vcnBoYWJsZVxuICAgIH1cbiAgfSBlbHNlIGlmIChtb3JwaGFibGVUeXBlcy5pbmRleE9mKHZhbHVlLmNvbnN0cnVjdG9yKSA+IC0xKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gU1ZHQXJyYXlcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3RCYWdcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gTm9uTW9ycGhhYmxlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ycGhhYmxlIHtcbiAgY29uc3RydWN0b3Ioc3RlcHBlcikge1xuICAgIHRoaXMuX3N0ZXBwZXIgPSBzdGVwcGVyIHx8IG5ldyBFYXNlKCctJylcblxuICAgIHRoaXMuX2Zyb20gPSBudWxsXG4gICAgdGhpcy5fdG8gPSBudWxsXG4gICAgdGhpcy5fdHlwZSA9IG51bGxcbiAgICB0aGlzLl9jb250ZXh0ID0gbnVsbFxuICAgIHRoaXMuX21vcnBoT2JqID0gbnVsbFxuICB9XG5cbiAgYXQocG9zKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vcnBoT2JqLm1vcnBoKFxuICAgICAgdGhpcy5fZnJvbSxcbiAgICAgIHRoaXMuX3RvLFxuICAgICAgcG9zLFxuICAgICAgdGhpcy5fc3RlcHBlcixcbiAgICAgIHRoaXMuX2NvbnRleHRcbiAgICApXG4gIH1cblxuICBkb25lKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlID0gdGhpcy5fY29udGV4dC5tYXAodGhpcy5fc3RlcHBlci5kb25lKS5yZWR1Y2UoZnVuY3Rpb24gKFxuICAgICAgbGFzdCxcbiAgICAgIGN1cnJcbiAgICApIHtcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnJcbiAgICB9LCB0cnVlKVxuICAgIHJldHVybiBjb21wbGV0ZVxuICB9XG5cbiAgZnJvbSh2YWwpIHtcbiAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mcm9tXG4gICAgfVxuXG4gICAgdGhpcy5fZnJvbSA9IHRoaXMuX3NldCh2YWwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0ZXBwZXIoc3RlcHBlcikge1xuICAgIGlmIChzdGVwcGVyID09IG51bGwpIHJldHVybiB0aGlzLl9zdGVwcGVyXG4gICAgdGhpcy5fc3RlcHBlciA9IHN0ZXBwZXJcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG8odmFsKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdG9cbiAgICB9XG5cbiAgICB0aGlzLl90byA9IHRoaXMuX3NldCh2YWwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHR5cGUodHlwZSkge1xuICAgIC8vIGdldHRlclxuICAgIGlmICh0eXBlID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl90eXBlXG4gICAgfVxuXG4gICAgLy8gc2V0dGVyXG4gICAgdGhpcy5fdHlwZSA9IHR5cGVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX3NldCh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5fdHlwZSkge1xuICAgICAgdGhpcy50eXBlKGdldENsYXNzRm9yVHlwZSh2YWx1ZSkpXG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IG5ldyB0aGlzLl90eXBlKHZhbHVlKVxuICAgIGlmICh0aGlzLl90eXBlID09PSBDb2xvcikge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fdG9cbiAgICAgICAgPyByZXN1bHRbdGhpcy5fdG9bNF1dKClcbiAgICAgICAgOiB0aGlzLl9mcm9tXG4gICAgICAgICAgPyByZXN1bHRbdGhpcy5fZnJvbVs0XV0oKVxuICAgICAgICAgIDogcmVzdWx0XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IE9iamVjdEJhZykge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fdG9cbiAgICAgICAgPyByZXN1bHQuYWxpZ24odGhpcy5fdG8pXG4gICAgICAgIDogdGhpcy5fZnJvbVxuICAgICAgICAgID8gcmVzdWx0LmFsaWduKHRoaXMuX2Zyb20pXG4gICAgICAgICAgOiByZXN1bHRcbiAgICB9XG5cbiAgICByZXN1bHQgPSByZXN1bHQudG9Db25zdW1hYmxlKClcblxuICAgIHRoaXMuX21vcnBoT2JqID0gdGhpcy5fbW9ycGhPYmogfHwgbmV3IHRoaXMuX3R5cGUoKVxuICAgIHRoaXMuX2NvbnRleHQgPVxuICAgICAgdGhpcy5fY29udGV4dCB8fFxuICAgICAgQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkocmVzdWx0Lmxlbmd0aCkpXG4gICAgICAgIC5tYXAoT2JqZWN0KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgby5kb25lID0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBvXG4gICAgICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOb25Nb3JwaGFibGUge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgdGhpcy5pbml0KC4uLmFyZ3MpXG4gIH1cblxuICBpbml0KHZhbCkge1xuICAgIHZhbCA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbFswXSA6IHZhbFxuICAgIHRoaXMudmFsdWUgPSB2YWxcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9BcnJheSgpIHtcbiAgICByZXR1cm4gW3RoaXMudmFsdWVdXG4gIH1cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybUJhZyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIGluaXQob2JqKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgb2JqID0ge1xuICAgICAgICBzY2FsZVg6IG9ialswXSxcbiAgICAgICAgc2NhbGVZOiBvYmpbMV0sXG4gICAgICAgIHNoZWFyOiBvYmpbMl0sXG4gICAgICAgIHJvdGF0ZTogb2JqWzNdLFxuICAgICAgICB0cmFuc2xhdGVYOiBvYmpbNF0sXG4gICAgICAgIHRyYW5zbGF0ZVk6IG9ials1XSxcbiAgICAgICAgb3JpZ2luWDogb2JqWzZdLFxuICAgICAgICBvcmlnaW5ZOiBvYmpbN11cbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIFRyYW5zZm9ybUJhZy5kZWZhdWx0cywgb2JqKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0b0FycmF5KCkge1xuICAgIGNvbnN0IHYgPSB0aGlzXG5cbiAgICByZXR1cm4gW1xuICAgICAgdi5zY2FsZVgsXG4gICAgICB2LnNjYWxlWSxcbiAgICAgIHYuc2hlYXIsXG4gICAgICB2LnJvdGF0ZSxcbiAgICAgIHYudHJhbnNsYXRlWCxcbiAgICAgIHYudHJhbnNsYXRlWSxcbiAgICAgIHYub3JpZ2luWCxcbiAgICAgIHYub3JpZ2luWVxuICAgIF1cbiAgfVxufVxuXG5UcmFuc2Zvcm1CYWcuZGVmYXVsdHMgPSB7XG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxLFxuICBzaGVhcjogMCxcbiAgcm90YXRlOiAwLFxuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICBvcmlnaW5YOiAwLFxuICBvcmlnaW5ZOiAwXG59XG5cbmNvbnN0IHNvcnRCeUtleSA9IChhLCBiKSA9PiB7XG4gIHJldHVybiBhWzBdIDwgYlswXSA/IC0xIDogYVswXSA+IGJbMF0gPyAxIDogMFxufVxuXG5leHBvcnQgY2xhc3MgT2JqZWN0QmFnIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxuICB9XG5cbiAgYWxpZ24ob3RoZXIpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZhbHVlc1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAvLyBJZiB0aGUgdHlwZSBpcyB0aGUgc2FtZSB3ZSBvbmx5IG5lZWQgdG8gY2hlY2sgaWYgdGhlIGNvbG9yIGlzIGluIHRoZSBjb3JyZWN0IGZvcm1hdFxuICAgICAgaWYgKHZhbHVlc1tpICsgMV0gPT09IG90aGVyW2kgKyAxXSkge1xuICAgICAgICBpZiAodmFsdWVzW2kgKyAxXSA9PT0gQ29sb3IgJiYgb3RoZXJbaSArIDddICE9PSB2YWx1ZXNbaSArIDddKSB7XG4gICAgICAgICAgY29uc3Qgc3BhY2UgPSBvdGhlcltpICsgN11cbiAgICAgICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcih0aGlzLnZhbHVlcy5zcGxpY2UoaSArIDMsIDUpKVxuICAgICAgICAgICAgW3NwYWNlXSgpXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGkgKyAzLCAwLCAuLi5jb2xvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gdmFsdWVzW2kgKyAyXSArIDJcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKCFvdGhlcltpICsgMV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHR5cGVzIGRpZmZlciwgc28gd2Ugb3ZlcndyaXRlIHRoZSBuZXcgdHlwZSB3aXRoIHRoZSBvbGQgb25lXG4gICAgICAvLyBBbmQgaW5pdGlhbGl6ZSBpdCB3aXRoIHRoZSB0eXBlcyBkZWZhdWx0IChlLmcuIGJsYWNrIGZvciBjb2xvciBvciAwIGZvciBudW1iZXIpXG4gICAgICBjb25zdCBkZWZhdWx0T2JqZWN0ID0gbmV3IG90aGVyW2kgKyAxXSgpLnRvQXJyYXkoKVxuXG4gICAgICAvLyBUaGFuIHdlIGZpeCB0aGUgdmFsdWVzIGFycmF5XG4gICAgICBjb25zdCB0b0RlbGV0ZSA9IHZhbHVlc1tpICsgMl0gKyAzXG5cbiAgICAgIHZhbHVlcy5zcGxpY2UoXG4gICAgICAgIGksXG4gICAgICAgIHRvRGVsZXRlLFxuICAgICAgICBvdGhlcltpXSxcbiAgICAgICAgb3RoZXJbaSArIDFdLFxuICAgICAgICBvdGhlcltpICsgMl0sXG4gICAgICAgIC4uLmRlZmF1bHRPYmplY3RcbiAgICAgIClcblxuICAgICAgaSArPSB2YWx1ZXNbaSArIDJdICsgMlxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaW5pdChvYmpPckFycikge1xuICAgIHRoaXMudmFsdWVzID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iak9yQXJyKSkge1xuICAgICAgdGhpcy52YWx1ZXMgPSBvYmpPckFyci5zbGljZSgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBvYmpPckFyciA9IG9iak9yQXJyIHx8IHt9XG4gICAgY29uc3QgZW50cmllcyA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IGkgaW4gb2JqT3JBcnIpIHtcbiAgICAgIGNvbnN0IFR5cGUgPSBnZXRDbGFzc0ZvclR5cGUob2JqT3JBcnJbaV0pXG4gICAgICBjb25zdCB2YWwgPSBuZXcgVHlwZShvYmpPckFycltpXSkudG9BcnJheSgpXG4gICAgICBlbnRyaWVzLnB1c2goW2ksIFR5cGUsIHZhbC5sZW5ndGgsIC4uLnZhbF0pXG4gICAgfVxuXG4gICAgZW50cmllcy5zb3J0KHNvcnRCeUtleSlcblxuICAgIHRoaXMudmFsdWVzID0gZW50cmllcy5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QuY29uY2F0KGN1cnIpLCBbXSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9BcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNcbiAgfVxuXG4gIHZhbHVlT2YoKSB7XG4gICAgY29uc3Qgb2JqID0ge31cbiAgICBjb25zdCBhcnIgPSB0aGlzLnZhbHVlc1xuXG4gICAgLy8gZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHdoaWxlIChhcnIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBrZXkgPSBhcnIuc2hpZnQoKVxuICAgICAgY29uc3QgVHlwZSA9IGFyci5zaGlmdCgpXG4gICAgICBjb25zdCBudW0gPSBhcnIuc2hpZnQoKVxuICAgICAgY29uc3QgdmFsdWVzID0gYXJyLnNwbGljZSgwLCBudW0pXG4gICAgICBvYmpba2V5XSA9IG5ldyBUeXBlKHZhbHVlcykgLy8gLnZhbHVlT2YoKVxuICAgIH1cblxuICAgIHJldHVybiBvYmpcbiAgfVxufVxuXG5jb25zdCBtb3JwaGFibGVUeXBlcyA9IFtOb25Nb3JwaGFibGUsIFRyYW5zZm9ybUJhZywgT2JqZWN0QmFnXVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNb3JwaGFibGVUeXBlKHR5cGUgPSBbXSkge1xuICBtb3JwaGFibGVUeXBlcy5wdXNoKC4uLltdLmNvbmNhdCh0eXBlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VNb3JwaGFibGUoKSB7XG4gIGV4dGVuZChtb3JwaGFibGVUeXBlcywge1xuICAgIHRvKHZhbCkge1xuICAgICAgcmV0dXJuIG5ldyBNb3JwaGFibGUoKVxuICAgICAgICAudHlwZSh0aGlzLmNvbnN0cnVjdG9yKVxuICAgICAgICAuZnJvbSh0aGlzLnRvQXJyYXkoKSkgLy8gdGhpcy52YWx1ZU9mKCkpXG4gICAgICAgIC50byh2YWwpXG4gICAgfSxcbiAgICBmcm9tQXJyYXkoYXJyKSB7XG4gICAgICB0aGlzLmluaXQoYXJyKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHRvQ29uc3VtYWJsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvQXJyYXkoKVxuICAgIH0sXG4gICAgbW9ycGgoZnJvbSwgdG8sIHBvcywgc3RlcHBlciwgY29udGV4dCkge1xuICAgICAgY29uc3QgbWFwcGVyID0gZnVuY3Rpb24gKGksIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBzdGVwcGVyLnN0ZXAoaSwgdG9baW5kZXhdLCBwb3MsIGNvbnRleHRbaW5kZXhdLCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5mcm9tQXJyYXkoZnJvbS5tYXAobWFwcGVyKSlcbiAgICB9XG4gIH0pXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZpcnN0ID0gbnVsbFxuICAgIHRoaXMuX2xhc3QgPSBudWxsXG4gIH1cblxuICAvLyBTaG93cyB1cyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdFxuICBmaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3QgJiYgdGhpcy5fZmlyc3QudmFsdWVcbiAgfVxuXG4gIC8vIFNob3dzIHVzIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGxpc3RcbiAgbGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdCAmJiB0aGlzLl9sYXN0LnZhbHVlXG4gIH1cblxuICBwdXNoKHZhbHVlKSB7XG4gICAgLy8gQW4gaXRlbSBzdG9yZXMgYW4gaWQgYW5kIHRoZSBwcm92aWRlZCB2YWx1ZVxuICAgIGNvbnN0IGl0ZW0gPVxuICAgICAgdHlwZW9mIHZhbHVlLm5leHQgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB7IHZhbHVlOiB2YWx1ZSwgbmV4dDogbnVsbCwgcHJldjogbnVsbCB9XG5cbiAgICAvLyBEZWFsIHdpdGggdGhlIHF1ZXVlIGJlaW5nIGVtcHR5IG9yIHBvcHVsYXRlZFxuICAgIGlmICh0aGlzLl9sYXN0KSB7XG4gICAgICBpdGVtLnByZXYgPSB0aGlzLl9sYXN0XG4gICAgICB0aGlzLl9sYXN0Lm5leHQgPSBpdGVtXG4gICAgICB0aGlzLl9sYXN0ID0gaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXN0ID0gaXRlbVxuICAgICAgdGhpcy5fZmlyc3QgPSBpdGVtXG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSBjdXJyZW50IGl0ZW1cbiAgICByZXR1cm4gaXRlbVxuICB9XG5cbiAgLy8gUmVtb3ZlcyB0aGUgaXRlbSB0aGF0IHdhcyByZXR1cm5lZCBmcm9tIHRoZSBwdXNoXG4gIHJlbW92ZShpdGVtKSB7XG4gICAgLy8gUmVsaW5rIHRoZSBwcmV2aW91cyBpdGVtXG4gICAgaWYgKGl0ZW0ucHJldikgaXRlbS5wcmV2Lm5leHQgPSBpdGVtLm5leHRcbiAgICBpZiAoaXRlbS5uZXh0KSBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldlxuICAgIGlmIChpdGVtID09PSB0aGlzLl9sYXN0KSB0aGlzLl9sYXN0ID0gaXRlbS5wcmV2XG4gICAgaWYgKGl0ZW0gPT09IHRoaXMuX2ZpcnN0KSB0aGlzLl9maXJzdCA9IGl0ZW0ubmV4dFxuXG4gICAgLy8gSW52YWxpZGF0ZSBpdGVtXG4gICAgaXRlbS5wcmV2ID0gbnVsbFxuICAgIGl0ZW0ubmV4dCA9IG51bGxcbiAgfVxuXG4gIHNoaWZ0KCkge1xuICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSB2YWx1ZVxuICAgIGNvbnN0IHJlbW92ZSA9IHRoaXMuX2ZpcnN0XG4gICAgaWYgKCFyZW1vdmUpIHJldHVybiBudWxsXG5cbiAgICAvLyBJZiB3ZSBkbywgcmVtb3ZlIGl0IGFuZCByZWxpbmsgdGhpbmdzXG4gICAgdGhpcy5fZmlyc3QgPSByZW1vdmUubmV4dFxuICAgIGlmICh0aGlzLl9maXJzdCkgdGhpcy5fZmlyc3QucHJldiA9IG51bGxcbiAgICB0aGlzLl9sYXN0ID0gdGhpcy5fZmlyc3QgPyB0aGlzLl9sYXN0IDogbnVsbFxuICAgIHJldHVybiByZW1vdmUudmFsdWVcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciwgRWFzZSwgU3RlcHBlciB9IGZyb20gJy4vQ29udHJvbGxlci5qcydcbmltcG9ydCB7IGV4dGVuZCwgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgZnJvbSwgdG8gfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZ3JhZGllbnRlZC5qcydcbmltcG9ydCB7IGdldE9yaWdpbiB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgbm9vcCwgdGltZWxpbmUgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZGVmYXVsdHMuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IHsgcngsIHJ5IH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2NpcmNsZWQuanMnXG5pbXBvcnQgQW5pbWF0b3IgZnJvbSAnLi9BbmltYXRvci5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi4vdHlwZXMvQm94LmpzJ1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4uL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuLi90eXBlcy9NYXRyaXguanMnXG5pbXBvcnQgTW9ycGhhYmxlLCB7IFRyYW5zZm9ybUJhZywgT2JqZWN0QmFnIH0gZnJvbSAnLi9Nb3JwaGFibGUuanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vdHlwZXMvUG9pbnQuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL1RpbWVsaW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5uZXIgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcigpXG5cbiAgICAvLyBTdG9yZSBhIHVuaXF1ZSBpZCBvbiB0aGUgcnVubmVyLCBzbyB0aGF0IHdlIGNhbiBpZGVudGlmeSBpdCBsYXRlclxuICAgIHRoaXMuaWQgPSBSdW5uZXIuaWQrK1xuXG4gICAgLy8gRW5zdXJlIGEgZGVmYXVsdCB2YWx1ZVxuICAgIG9wdGlvbnMgPSBvcHRpb25zID09IG51bGwgPyB0aW1lbGluZS5kdXJhdGlvbiA6IG9wdGlvbnNcblxuICAgIC8vIEVuc3VyZSB0aGF0IHdlIGdldCBhIGNvbnRyb2xsZXJcbiAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBuZXcgQ29udHJvbGxlcihvcHRpb25zKSA6IG9wdGlvbnNcblxuICAgIC8vIERlY2xhcmUgYWxsIG9mIHRoZSB2YXJpYWJsZXNcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuX3RpbWVsaW5lID0gbnVsbFxuICAgIHRoaXMuZG9uZSA9IGZhbHNlXG4gICAgdGhpcy5fcXVldWUgPSBbXVxuXG4gICAgLy8gV29yayBvdXQgdGhlIHN0ZXBwZXIgYW5kIHRoZSBkdXJhdGlvblxuICAgIHRoaXMuX2R1cmF0aW9uID0gdHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInICYmIG9wdGlvbnNcbiAgICB0aGlzLl9pc0RlY2xhcmF0aXZlID0gb3B0aW9ucyBpbnN0YW5jZW9mIENvbnRyb2xsZXJcbiAgICB0aGlzLl9zdGVwcGVyID0gdGhpcy5faXNEZWNsYXJhdGl2ZSA/IG9wdGlvbnMgOiBuZXcgRWFzZSgpXG5cbiAgICAvLyBXZSBjb3B5IHRoZSBjdXJyZW50IHZhbHVlcyBmcm9tIHRoZSB0aW1lbGluZSBiZWNhdXNlIHRoZXkgY2FuIGNoYW5nZVxuICAgIHRoaXMuX2hpc3RvcnkgPSB7fVxuXG4gICAgLy8gU3RvcmUgdGhlIHN0YXRlIG9mIHRoZSBydW5uZXJcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5fdGltZSA9IDBcbiAgICB0aGlzLl9sYXN0VGltZSA9IDBcblxuICAgIC8vIEF0IGNyZWF0aW9uLCB0aGUgcnVubmVyIGlzIGluIHJlc2V0IHN0YXRlXG4gICAgdGhpcy5fcmVzZXRlZCA9IHRydWVcblxuICAgIC8vIFNhdmUgdHJhbnNmb3JtcyBhcHBsaWVkIHRvIHRoaXMgcnVubmVyXG4gICAgdGhpcy50cmFuc2Zvcm1zID0gbmV3IE1hdHJpeCgpXG4gICAgdGhpcy50cmFuc2Zvcm1JZCA9IDFcblxuICAgIC8vIExvb3BpbmcgdmFyaWFibGVzXG4gICAgdGhpcy5faGF2ZVJldmVyc2VkID0gZmFsc2VcbiAgICB0aGlzLl9yZXZlcnNlID0gZmFsc2VcbiAgICB0aGlzLl9sb29wc0RvbmUgPSAwXG4gICAgdGhpcy5fc3dpbmcgPSBmYWxzZVxuICAgIHRoaXMuX3dhaXQgPSAwXG4gICAgdGhpcy5fdGltZXMgPSAxXG5cbiAgICB0aGlzLl9mcmFtZUlkID0gbnVsbFxuXG4gICAgLy8gU3RvcmVzIGhvdyBsb25nIGEgcnVubmVyIGlzIHN0b3JlZCBhZnRlciBiZWluZyBkb25lXG4gICAgdGhpcy5fcGVyc2lzdCA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgPyB0cnVlIDogbnVsbFxuICB9XG5cbiAgc3RhdGljIHNhbml0aXNlKGR1cmF0aW9uLCBkZWxheSwgd2hlbikge1xuICAgIC8vIEluaXRpYWxpc2UgdGhlIGRlZmF1bHQgcGFyYW1ldGVyc1xuICAgIGxldCB0aW1lcyA9IDFcbiAgICBsZXQgc3dpbmcgPSBmYWxzZVxuICAgIGxldCB3YWl0ID0gMFxuICAgIGR1cmF0aW9uID0gZHVyYXRpb24gPz8gdGltZWxpbmUuZHVyYXRpb25cbiAgICBkZWxheSA9IGRlbGF5ID8/IHRpbWVsaW5lLmRlbGF5XG4gICAgd2hlbiA9IHdoZW4gfHwgJ2xhc3QnXG5cbiAgICAvLyBJZiB3ZSBoYXZlIGFuIG9iamVjdCwgdW5wYWNrIHRoZSB2YWx1ZXNcbiAgICBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnb2JqZWN0JyAmJiAhKGR1cmF0aW9uIGluc3RhbmNlb2YgU3RlcHBlcikpIHtcbiAgICAgIGRlbGF5ID0gZHVyYXRpb24uZGVsYXkgPz8gZGVsYXlcbiAgICAgIHdoZW4gPSBkdXJhdGlvbi53aGVuID8/IHdoZW5cbiAgICAgIHN3aW5nID0gZHVyYXRpb24uc3dpbmcgfHwgc3dpbmdcbiAgICAgIHRpbWVzID0gZHVyYXRpb24udGltZXMgPz8gdGltZXNcbiAgICAgIHdhaXQgPSBkdXJhdGlvbi53YWl0ID8/IHdhaXRcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24uZHVyYXRpb24gPz8gdGltZWxpbmUuZHVyYXRpb25cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgc3dpbmc6IHN3aW5nLFxuICAgICAgdGltZXM6IHRpbWVzLFxuICAgICAgd2FpdDogd2FpdCxcbiAgICAgIHdoZW46IHdoZW5cbiAgICB9XG4gIH1cblxuICBhY3RpdmUoZW5hYmxlZCkge1xuICAgIGlmIChlbmFibGVkID09IG51bGwpIHJldHVybiB0aGlzLmVuYWJsZWRcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qXG4gIFByaXZhdGUgTWV0aG9kc1xuICA9PT09PT09PT09PT09PT1cbiAgTWV0aG9kcyB0aGF0IHNob3VsZG4ndCBiZSB1c2VkIGV4dGVybmFsbHlcbiAgKi9cbiAgYWRkVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgIHRoaXMudHJhbnNmb3Jtcy5sbXVsdGlwbHlPKHRyYW5zZm9ybSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWZ0ZXIoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5vbignZmluaXNoZWQnLCBmbilcbiAgfVxuXG4gIGFuaW1hdGUoZHVyYXRpb24sIGRlbGF5LCB3aGVuKSB7XG4gICAgY29uc3QgbyA9IFJ1bm5lci5zYW5pdGlzZShkdXJhdGlvbiwgZGVsYXksIHdoZW4pXG4gICAgY29uc3QgcnVubmVyID0gbmV3IFJ1bm5lcihvLmR1cmF0aW9uKVxuICAgIGlmICh0aGlzLl90aW1lbGluZSkgcnVubmVyLnRpbWVsaW5lKHRoaXMuX3RpbWVsaW5lKVxuICAgIGlmICh0aGlzLl9lbGVtZW50KSBydW5uZXIuZWxlbWVudCh0aGlzLl9lbGVtZW50KVxuICAgIHJldHVybiBydW5uZXIubG9vcChvKS5zY2hlZHVsZShvLmRlbGF5LCBvLndoZW4pXG4gIH1cblxuICBjbGVhclRyYW5zZm9ybSgpIHtcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSBuZXcgTWF0cml4KClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gVE9ETzogS2VlcCB0cmFjayBvZiBhbGwgdHJhbnNmb3JtYXRpb25zIHNvIHRoYXQgZGVsZXRpb24gaXMgZmFzdGVyXG4gIGNsZWFyVHJhbnNmb3Jtc0Zyb21RdWV1ZSgpIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5kb25lIHx8XG4gICAgICAhdGhpcy5fdGltZWxpbmUgfHxcbiAgICAgICF0aGlzLl90aW1lbGluZS5fcnVubmVySWRzLmluY2x1ZGVzKHRoaXMuaWQpXG4gICAgKSB7XG4gICAgICB0aGlzLl9xdWV1ZSA9IHRoaXMuX3F1ZXVlLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gIWl0ZW0uaXNUcmFuc2Zvcm1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZGVsYXkoZGVsYXkpIHtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRlKDAsIGRlbGF5KVxuICB9XG5cbiAgZHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpbWVzICogKHRoaXMuX3dhaXQgKyB0aGlzLl9kdXJhdGlvbikgLSB0aGlzLl93YWl0XG4gIH1cblxuICBkdXJpbmcoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZShudWxsLCBmbilcbiAgfVxuXG4gIGVhc2UoZm4pIHtcbiAgICB0aGlzLl9zdGVwcGVyID0gbmV3IEVhc2UoZm4pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAvKlxuICBSdW5uZXIgRGVmaW5pdGlvbnNcbiAgPT09PT09PT09PT09PT09PT09XG4gIFRoZXNlIG1ldGhvZHMgaGVscCB1cyBkZWZpbmUgdGhlIHJ1bnRpbWUgYmVoYXZpb3VyIG9mIHRoZSBSdW5uZXIgb3IgdGhleVxuICBoZWxwIHVzIG1ha2UgbmV3IHJ1bm5lcnMgZnJvbSB0aGUgY3VycmVudCBydW5uZXJcbiAgKi9cblxuICBlbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSByZXR1cm4gdGhpcy5fZWxlbWVudFxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgZWxlbWVudC5fcHJlcGFyZVJ1bm5lcigpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwKEluZmluaXR5KVxuICB9XG5cbiAgbG9vcCh0aW1lcywgc3dpbmcsIHdhaXQpIHtcbiAgICAvLyBEZWFsIHdpdGggdGhlIHVzZXIgcGFzc2luZyBpbiBhbiBvYmplY3RcbiAgICBpZiAodHlwZW9mIHRpbWVzID09PSAnb2JqZWN0Jykge1xuICAgICAgc3dpbmcgPSB0aW1lcy5zd2luZ1xuICAgICAgd2FpdCA9IHRpbWVzLndhaXRcbiAgICAgIHRpbWVzID0gdGltZXMudGltZXNcbiAgICB9XG5cbiAgICAvLyBTYW5pdGlzZSB0aGUgdmFsdWVzIGFuZCBzdG9yZSB0aGVtXG4gICAgdGhpcy5fdGltZXMgPSB0aW1lcyB8fCBJbmZpbml0eVxuICAgIHRoaXMuX3N3aW5nID0gc3dpbmcgfHwgZmFsc2VcbiAgICB0aGlzLl93YWl0ID0gd2FpdCB8fCAwXG5cbiAgICAvLyBBbGxvdyB0cnVlIHRvIGJlIHBhc3NlZFxuICAgIGlmICh0aGlzLl90aW1lcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fdGltZXMgPSBJbmZpbml0eVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBsb29wcyhwKSB7XG4gICAgY29uc3QgbG9vcER1cmF0aW9uID0gdGhpcy5fZHVyYXRpb24gKyB0aGlzLl93YWl0XG4gICAgaWYgKHAgPT0gbnVsbCkge1xuICAgICAgY29uc3QgbG9vcHNEb25lID0gTWF0aC5mbG9vcih0aGlzLl90aW1lIC8gbG9vcER1cmF0aW9uKVxuICAgICAgY29uc3QgcmVsYXRpdmVUaW1lID0gdGhpcy5fdGltZSAtIGxvb3BzRG9uZSAqIGxvb3BEdXJhdGlvblxuICAgICAgY29uc3QgcG9zaXRpb24gPSByZWxhdGl2ZVRpbWUgLyB0aGlzLl9kdXJhdGlvblxuICAgICAgcmV0dXJuIE1hdGgubWluKGxvb3BzRG9uZSArIHBvc2l0aW9uLCB0aGlzLl90aW1lcylcbiAgICB9XG4gICAgY29uc3Qgd2hvbGUgPSBNYXRoLmZsb29yKHApXG4gICAgY29uc3QgcGFydGlhbCA9IHAgJSAxXG4gICAgY29uc3QgdGltZSA9IGxvb3BEdXJhdGlvbiAqIHdob2xlICsgdGhpcy5fZHVyYXRpb24gKiBwYXJ0aWFsXG4gICAgcmV0dXJuIHRoaXMudGltZSh0aW1lKVxuICB9XG5cbiAgcGVyc2lzdChkdE9yRm9yZXZlcikge1xuICAgIGlmIChkdE9yRm9yZXZlciA9PSBudWxsKSByZXR1cm4gdGhpcy5fcGVyc2lzdFxuICAgIHRoaXMuX3BlcnNpc3QgPSBkdE9yRm9yZXZlclxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwb3NpdGlvbihwKSB7XG4gICAgLy8gR2V0IGFsbCBvZiB0aGUgdmFyaWFibGVzIHdlIG5lZWRcbiAgICBjb25zdCB4ID0gdGhpcy5fdGltZVxuICAgIGNvbnN0IGQgPSB0aGlzLl9kdXJhdGlvblxuICAgIGNvbnN0IHcgPSB0aGlzLl93YWl0XG4gICAgY29uc3QgdCA9IHRoaXMuX3RpbWVzXG4gICAgY29uc3QgcyA9IHRoaXMuX3N3aW5nXG4gICAgY29uc3QgciA9IHRoaXMuX3JldmVyc2VcbiAgICBsZXQgcG9zaXRpb25cblxuICAgIGlmIChwID09IG51bGwpIHtcbiAgICAgIC8qXG4gICAgICBUaGlzIGZ1bmN0aW9uIGNvbnZlcnRzIGEgdGltZSB0byBhIHBvc2l0aW9uIGluIHRoZSByYW5nZSBbMCwgMV1cbiAgICAgIFRoZSBmdWxsIGV4cGxhbmF0aW9uIGNhbiBiZSBmb3VuZCBpbiB0aGlzIGRlc21vcyBkZW1vbnN0cmF0aW9uXG4gICAgICAgIGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci91NGZiYXZnY2hlXG4gICAgICBUaGUgbG9naWMgaXMgc2xpZ2h0bHkgc2ltcGxpZmllZCBoZXJlIGJlY2F1c2Ugd2UgY2FuIHVzZSBib29sZWFuc1xuICAgICAgKi9cblxuICAgICAgLy8gRmlndXJlIG91dCB0aGUgdmFsdWUgd2l0aG91dCB0aGlua2luZyBhYm91dCB0aGUgc3RhcnQgb3IgZW5kIHRpbWVcbiAgICAgIGNvbnN0IGYgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBjb25zdCBzd2luZ2luZyA9IHMgKiBNYXRoLmZsb29yKCh4ICUgKDIgKiAodyArIGQpKSkgLyAodyArIGQpKVxuICAgICAgICBjb25zdCBiYWNrd2FyZHMgPSAoc3dpbmdpbmcgJiYgIXIpIHx8ICghc3dpbmdpbmcgJiYgcilcbiAgICAgICAgY29uc3QgdW5jbGlwZWQgPVxuICAgICAgICAgIChNYXRoLnBvdygtMSwgYmFja3dhcmRzKSAqICh4ICUgKHcgKyBkKSkpIC8gZCArIGJhY2t3YXJkc1xuICAgICAgICBjb25zdCBjbGlwcGVkID0gTWF0aC5tYXgoTWF0aC5taW4odW5jbGlwZWQsIDEpLCAwKVxuICAgICAgICByZXR1cm4gY2xpcHBlZFxuICAgICAgfVxuXG4gICAgICAvLyBGaWd1cmUgb3V0IHRoZSB2YWx1ZSBieSBpbmNvcnBvcmF0aW5nIHRoZSBzdGFydCB0aW1lXG4gICAgICBjb25zdCBlbmRUaW1lID0gdCAqICh3ICsgZCkgLSB3XG4gICAgICBwb3NpdGlvbiA9XG4gICAgICAgIHggPD0gMFxuICAgICAgICAgID8gTWF0aC5yb3VuZChmKDFlLTUpKVxuICAgICAgICAgIDogeCA8IGVuZFRpbWVcbiAgICAgICAgICAgID8gZih4KVxuICAgICAgICAgICAgOiBNYXRoLnJvdW5kKGYoZW5kVGltZSAtIDFlLTUpKVxuICAgICAgcmV0dXJuIHBvc2l0aW9uXG4gICAgfVxuXG4gICAgLy8gV29yayBvdXQgdGhlIGxvb3BzIGRvbmUgYW5kIGFkZCB0aGUgcG9zaXRpb24gdG8gdGhlIGxvb3BzIGRvbmVcbiAgICBjb25zdCBsb29wc0RvbmUgPSBNYXRoLmZsb29yKHRoaXMubG9vcHMoKSlcbiAgICBjb25zdCBzd2luZ0ZvcndhcmQgPSBzICYmIGxvb3BzRG9uZSAlIDIgPT09IDBcbiAgICBjb25zdCBmb3J3YXJkcyA9IChzd2luZ0ZvcndhcmQgJiYgIXIpIHx8IChyICYmIHN3aW5nRm9yd2FyZClcbiAgICBwb3NpdGlvbiA9IGxvb3BzRG9uZSArIChmb3J3YXJkcyA/IHAgOiAxIC0gcClcbiAgICByZXR1cm4gdGhpcy5sb29wcyhwb3NpdGlvbilcbiAgfVxuXG4gIHByb2dyZXNzKHApIHtcbiAgICBpZiAocCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gTWF0aC5taW4oMSwgdGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24oKSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGltZShwICogdGhpcy5kdXJhdGlvbigpKVxuICB9XG5cbiAgLypcbiAgQmFzaWMgRnVuY3Rpb25hbGl0eVxuICA9PT09PT09PT09PT09PT09PT09XG4gIFRoZXNlIG1ldGhvZHMgYWxsb3cgdXMgdG8gYXR0YWNoIGJhc2ljIGZ1bmN0aW9ucyB0byB0aGUgcnVubmVyIGRpcmVjdGx5XG4gICovXG4gIHF1ZXVlKGluaXRGbiwgcnVuRm4sIHJldGFyZ2V0Rm4sIGlzVHJhbnNmb3JtKSB7XG4gICAgdGhpcy5fcXVldWUucHVzaCh7XG4gICAgICBpbml0aWFsaXNlcjogaW5pdEZuIHx8IG5vb3AsXG4gICAgICBydW5uZXI6IHJ1bkZuIHx8IG5vb3AsXG4gICAgICByZXRhcmdldDogcmV0YXJnZXRGbixcbiAgICAgIGlzVHJhbnNmb3JtOiBpc1RyYW5zZm9ybSxcbiAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcbiAgICAgIGZpbmlzaGVkOiBmYWxzZVxuICAgIH0pXG4gICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcbiAgICB0aW1lbGluZSAmJiB0aGlzLnRpbWVsaW5lKCkuX2NvbnRpbnVlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuX3Jlc2V0ZWQpIHJldHVybiB0aGlzXG4gICAgdGhpcy50aW1lKDApXG4gICAgdGhpcy5fcmVzZXRlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmV2ZXJzZShyZXZlcnNlKSB7XG4gICAgdGhpcy5fcmV2ZXJzZSA9IHJldmVyc2UgPT0gbnVsbCA/ICF0aGlzLl9yZXZlcnNlIDogcmV2ZXJzZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzY2hlZHVsZSh0aW1lbGluZSwgZGVsYXksIHdoZW4pIHtcbiAgICAvLyBUaGUgdXNlciBkb2Vzbid0IG5lZWQgdG8gcGFzcyBhIHRpbWVsaW5lIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICBpZiAoISh0aW1lbGluZSBpbnN0YW5jZW9mIFRpbWVsaW5lKSkge1xuICAgICAgd2hlbiA9IGRlbGF5XG4gICAgICBkZWxheSA9IHRpbWVsaW5lXG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHRpbWVsaW5lLCB5ZWxsIGF0IHRoZSB1c2VyLi4uXG4gICAgaWYgKCF0aW1lbGluZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1J1bm5lciBjYW5ub3QgYmUgc2NoZWR1bGVkIHdpdGhvdXQgdGltZWxpbmUnKVxuICAgIH1cblxuICAgIC8vIFNjaGVkdWxlIHRoZSBydW5uZXIgb24gdGhlIHRpbWVsaW5lIHByb3ZpZGVkXG4gICAgdGltZWxpbmUuc2NoZWR1bGUodGhpcywgZGVsYXksIHdoZW4pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0ZXAoZHQpIHtcbiAgICAvLyBJZiB3ZSBhcmUgaW5hY3RpdmUsIHRoaXMgc3RlcHBlciBqdXN0IGdldHMgc2tpcHBlZFxuICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm4gdGhpc1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0aW1lIGFuZCBnZXQgdGhlIG5ldyBwb3NpdGlvblxuICAgIGR0ID0gZHQgPT0gbnVsbCA/IDE2IDogZHRcbiAgICB0aGlzLl90aW1lICs9IGR0XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKClcblxuICAgIC8vIEZpZ3VyZSBvdXQgaWYgd2UgbmVlZCB0byBydW4gdGhlIHN0ZXBwZXIgaW4gdGhpcyBmcmFtZVxuICAgIGNvbnN0IHJ1bm5pbmcgPSB0aGlzLl9sYXN0UG9zaXRpb24gIT09IHBvc2l0aW9uICYmIHRoaXMuX3RpbWUgPj0gMFxuICAgIHRoaXMuX2xhc3RQb3NpdGlvbiA9IHBvc2l0aW9uXG5cbiAgICAvLyBGaWd1cmUgb3V0IGlmIHdlIGp1c3Qgc3RhcnRlZFxuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbigpXG4gICAgY29uc3QganVzdFN0YXJ0ZWQgPSB0aGlzLl9sYXN0VGltZSA8PSAwICYmIHRoaXMuX3RpbWUgPiAwXG4gICAgY29uc3QganVzdEZpbmlzaGVkID0gdGhpcy5fbGFzdFRpbWUgPCBkdXJhdGlvbiAmJiB0aGlzLl90aW1lID49IGR1cmF0aW9uXG5cbiAgICB0aGlzLl9sYXN0VGltZSA9IHRoaXMuX3RpbWVcbiAgICBpZiAoanVzdFN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuZmlyZSgnc3RhcnQnLCB0aGlzKVxuICAgIH1cblxuICAgIC8vIFdvcmsgb3V0IGlmIHRoZSBydW5uZXIgaXMgZmluaXNoZWQgc2V0IHRoZSBkb25lIGZsYWcgaGVyZSBzbyBhbmltYXRpb25zXG4gICAgLy8ga25vdywgdGhhdCB0aGV5IGFyZSBydW5uaW5nIGluIHRoZSBsYXN0IHN0ZXAgKHRoaXMgaXMgZ29vZCBmb3JcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbnMgd2hpY2ggY2FuIGJlIG1lcmdlZClcbiAgICBjb25zdCBkZWNsYXJhdGl2ZSA9IHRoaXMuX2lzRGVjbGFyYXRpdmVcbiAgICB0aGlzLmRvbmUgPSAhZGVjbGFyYXRpdmUgJiYgIWp1c3RGaW5pc2hlZCAmJiB0aGlzLl90aW1lID49IGR1cmF0aW9uXG5cbiAgICAvLyBSdW5uZXIgaXMgcnVubmluZy4gU28gaXRzIG5vdCBpbiByZXNldCBzdGF0ZSBhbnltb3JlXG4gICAgdGhpcy5fcmVzZXRlZCA9IGZhbHNlXG5cbiAgICBsZXQgY29udmVyZ2VkID0gZmFsc2VcbiAgICAvLyBDYWxsIGluaXRpYWxpc2UgYW5kIHRoZSBydW4gZnVuY3Rpb25cbiAgICBpZiAocnVubmluZyB8fCBkZWNsYXJhdGl2ZSkge1xuICAgICAgdGhpcy5faW5pdGlhbGlzZShydW5uaW5nKVxuXG4gICAgICAvLyBjbGVhciB0aGUgdHJhbnNmb3JtcyBvbiB0aGlzIHJ1bm5lciBzbyB0aGV5IGRvbnQgZ2V0IGFkZGVkIGFnYWluIGFuZCBhZ2FpblxuICAgICAgdGhpcy50cmFuc2Zvcm1zID0gbmV3IE1hdHJpeCgpXG4gICAgICBjb252ZXJnZWQgPSB0aGlzLl9ydW4oZGVjbGFyYXRpdmUgPyBkdCA6IHBvc2l0aW9uKVxuXG4gICAgICB0aGlzLmZpcmUoJ3N0ZXAnLCB0aGlzKVxuICAgIH1cbiAgICAvLyBjb3JyZWN0IHRoZSBkb25lIGZsYWcgaGVyZVxuICAgIC8vIGRlY2xhcmF0aXZlIGFuaW1hdGlvbnMgaXRzZWxmIGtub3cgd2hlbiB0aGV5IGNvbnZlcmdlZFxuICAgIHRoaXMuZG9uZSA9IHRoaXMuZG9uZSB8fCAoY29udmVyZ2VkICYmIGRlY2xhcmF0aXZlKVxuICAgIGlmIChqdXN0RmluaXNoZWQpIHtcbiAgICAgIHRoaXMuZmlyZSgnZmluaXNoZWQnLCB0aGlzKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLypcbiAgUnVubmVyIGFuaW1hdGlvbiBtZXRob2RzXG4gID09PT09PT09PT09PT09PT09PT09PT09PVxuICBDb250cm9sIGhvdyB0aGUgYW5pbWF0aW9uIHBsYXlzXG4gICovXG4gIHRpbWUodGltZSkge1xuICAgIGlmICh0aW1lID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl90aW1lXG4gICAgfVxuICAgIGNvbnN0IGR0ID0gdGltZSAtIHRoaXMuX3RpbWVcbiAgICB0aGlzLnN0ZXAoZHQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRpbWVsaW5lKHRpbWVsaW5lKSB7XG4gICAgLy8gY2hlY2sgZXhwbGljaXRseSBmb3IgdW5kZWZpbmVkIHNvIHdlIGNhbiBzZXQgdGhlIHRpbWVsaW5lIHRvIG51bGxcbiAgICBpZiAodHlwZW9mIHRpbWVsaW5lID09PSAndW5kZWZpbmVkJykgcmV0dXJuIHRoaXMuX3RpbWVsaW5lXG4gICAgdGhpcy5fdGltZWxpbmUgPSB0aW1lbGluZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bnNjaGVkdWxlKCkge1xuICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy50aW1lbGluZSgpXG4gICAgdGltZWxpbmUgJiYgdGltZWxpbmUudW5zY2hlZHVsZSh0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBSdW4gZWFjaCBpbml0aWFsaXNlIGZ1bmN0aW9uIGluIHRoZSBydW5uZXIgaWYgcmVxdWlyZWRcbiAgX2luaXRpYWxpc2UocnVubmluZykge1xuICAgIC8vIElmIHdlIGFyZW4ndCBydW5uaW5nLCB3ZSBzaG91bGRuJ3QgaW5pdGlhbGlzZSB3aGVuIG5vdCBkZWNsYXJhdGl2ZVxuICAgIGlmICghcnVubmluZyAmJiAhdGhpcy5faXNEZWNsYXJhdGl2ZSkgcmV0dXJuXG5cbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIG9mIHRoZSBpbml0aWFsaXNlcnNcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fcXVldWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBpbml0aWFsaXNlclxuICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX3F1ZXVlW2ldXG5cbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHdlIG5lZWQgdG8gaW5pdGlhbGlzZVxuICAgICAgY29uc3QgbmVlZHNJdCA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgfHwgKCFjdXJyZW50LmluaXRpYWxpc2VkICYmIHJ1bm5pbmcpXG4gICAgICBydW5uaW5nID0gIWN1cnJlbnQuZmluaXNoZWRcblxuICAgICAgLy8gQ2FsbCB0aGUgaW5pdGlhbGlzZXIgaWYgd2UgbmVlZCB0b1xuICAgICAgaWYgKG5lZWRzSXQgJiYgcnVubmluZykge1xuICAgICAgICBjdXJyZW50LmluaXRpYWxpc2VyLmNhbGwodGhpcylcbiAgICAgICAgY3VycmVudC5pbml0aWFsaXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTYXZlIGEgbW9ycGhlciB0byB0aGUgbW9ycGhlciBsaXN0IHNvIHRoYXQgd2UgY2FuIHJldGFyZ2V0IGl0IGxhdGVyXG4gIF9yZW1lbWJlck1vcnBoZXIobWV0aG9kLCBtb3JwaGVyKSB7XG4gICAgdGhpcy5faGlzdG9yeVttZXRob2RdID0ge1xuICAgICAgbW9ycGhlcjogbW9ycGhlcixcbiAgICAgIGNhbGxlcjogdGhpcy5fcXVldWVbdGhpcy5fcXVldWUubGVuZ3RoIC0gMV1cbiAgICB9XG5cbiAgICAvLyBXZSBoYXZlIHRvIHJlc3VtZSB0aGUgdGltZWxpbmUgaW4gY2FzZSBhIGNvbnRyb2xsZXJcbiAgICAvLyBpcyBhbHJlYWR5IGRvbmUgd2l0aG91dCBiZWluZyBldmVyIHJ1blxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiB3aGVuIGUuZy4gdGhpcyBpcyBkb25lOlxuICAgIC8vICAgIGFuaW0gPSBlbC5hbmltYXRlKG5ldyBTVkcuU3ByaW5nKVxuICAgIC8vIGFuZCBsYXRlclxuICAgIC8vICAgIGFuaW0ubW92ZSguLi4pXG4gICAgaWYgKHRoaXMuX2lzRGVjbGFyYXRpdmUpIHtcbiAgICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy50aW1lbGluZSgpXG4gICAgICB0aW1lbGluZSAmJiB0aW1lbGluZS5wbGF5KClcbiAgICB9XG4gIH1cblxuICAvLyBUcnkgdG8gc2V0IHRoZSB0YXJnZXQgZm9yIGEgbW9ycGhlciBpZiB0aGUgbW9ycGhlciBleGlzdHMsIG90aGVyd2lzZVxuICAvLyBSdW4gZWFjaCBydW4gZnVuY3Rpb24gZm9yIHRoZSBwb3NpdGlvbiBvciBkdCBnaXZlblxuICBfcnVuKHBvc2l0aW9uT3JEdCkge1xuICAgIC8vIFJ1biBhbGwgb2YgdGhlIF9xdWV1ZSBkaXJlY3RseVxuICAgIGxldCBhbGxmaW5pc2hlZCA9IHRydWVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fcXVldWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBmdW5jdGlvbiB0byBydW5cbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9xdWV1ZVtpXVxuXG4gICAgICAvLyBSdW4gdGhlIGZ1bmN0aW9uIGlmIGl0cyBub3QgZmluaXNoZWQsIHdlIGtlZXAgdHJhY2sgb2YgdGhlIGZpbmlzaGVkXG4gICAgICAvLyBmbGFnIGZvciB0aGUgc2FrZSBvZiBkZWNsYXJhdGl2ZSBfcXVldWVcbiAgICAgIGNvbnN0IGNvbnZlcmdlZCA9IGN1cnJlbnQucnVubmVyLmNhbGwodGhpcywgcG9zaXRpb25PckR0KVxuICAgICAgY3VycmVudC5maW5pc2hlZCA9IGN1cnJlbnQuZmluaXNoZWQgfHwgY29udmVyZ2VkID09PSB0cnVlXG4gICAgICBhbGxmaW5pc2hlZCA9IGFsbGZpbmlzaGVkICYmIGN1cnJlbnQuZmluaXNoZWRcbiAgICB9XG5cbiAgICAvLyBXZSByZXBvcnQgd2hlbiBhbGwgb2YgdGhlIGNvbnN0cnVjdG9ycyBhcmUgZmluaXNoZWRcbiAgICByZXR1cm4gYWxsZmluaXNoZWRcbiAgfVxuXG4gIC8vIGRvIG5vdGhpbmcgYW5kIHJldHVybiBmYWxzZVxuICBfdHJ5UmV0YXJnZXQobWV0aG9kLCB0YXJnZXQsIGV4dHJhKSB7XG4gICAgaWYgKHRoaXMuX2hpc3RvcnlbbWV0aG9kXSkge1xuICAgICAgLy8gaWYgdGhlIGxhc3QgbWV0aG9kIHdhc24ndCBldmVuIGluaXRpYWxpc2VkLCB0aHJvdyBpdCBhd2F5XG4gICAgICBpZiAoIXRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIuaW5pdGlhbGlzZWQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9xdWV1ZS5pbmRleE9mKHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIpXG4gICAgICAgIHRoaXMuX3F1ZXVlLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIC8vIGZvciB0aGUgY2FzZSBvZiB0cmFuc2Zvcm1hdGlvbnMsIHdlIHVzZSB0aGUgc3BlY2lhbCByZXRhcmdldCBmdW5jdGlvblxuICAgICAgLy8gd2hpY2ggaGFzIGFjY2VzcyB0byB0aGUgb3V0ZXIgc2NvcGVcbiAgICAgIGlmICh0aGlzLl9oaXN0b3J5W21ldGhvZF0uY2FsbGVyLnJldGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIucmV0YXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIGV4dHJhKVxuICAgICAgICAvLyBmb3IgZXZlcnl0aGluZyBlbHNlIGEgc2ltcGxlIG1vcnBoZXIgY2hhbmdlIGlzIHN1ZmZpY2llbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5tb3JwaGVyLnRvKHRhcmdldClcbiAgICAgIH1cblxuICAgICAgdGhpcy5faGlzdG9yeVttZXRob2RdLmNhbGxlci5maW5pc2hlZCA9IGZhbHNlXG4gICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxuICAgICAgdGltZWxpbmUgJiYgdGltZWxpbmUucGxheSgpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5SdW5uZXIuaWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBGYWtlUnVubmVyIHtcbiAgY29uc3RydWN0b3IodHJhbnNmb3JtcyA9IG5ldyBNYXRyaXgoKSwgaWQgPSAtMSwgZG9uZSA9IHRydWUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSB0cmFuc2Zvcm1zXG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5kb25lID0gZG9uZVxuICB9XG5cbiAgY2xlYXJUcmFuc2Zvcm1zRnJvbVF1ZXVlKCkge31cbn1cblxuZXh0ZW5kKFtSdW5uZXIsIEZha2VSdW5uZXJdLCB7XG4gIG1lcmdlV2l0aChydW5uZXIpIHtcbiAgICByZXR1cm4gbmV3IEZha2VSdW5uZXIoXG4gICAgICBydW5uZXIudHJhbnNmb3Jtcy5sbXVsdGlwbHkodGhpcy50cmFuc2Zvcm1zKSxcbiAgICAgIHJ1bm5lci5pZFxuICAgIClcbiAgfVxufSlcblxuLy8gRmFrZVJ1bm5lci5lbXB0eVJ1bm5lciA9IG5ldyBGYWtlUnVubmVyKClcblxuY29uc3QgbG11bHRpcGx5ID0gKGxhc3QsIGN1cnIpID0+IGxhc3QubG11bHRpcGx5TyhjdXJyKVxuY29uc3QgZ2V0UnVubmVyVHJhbnNmb3JtID0gKHJ1bm5lcikgPT4gcnVubmVyLnRyYW5zZm9ybXNcblxuZnVuY3Rpb24gbWVyZ2VUcmFuc2Zvcm1zKCkge1xuICAvLyBGaW5kIHRoZSBtYXRyaXggdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQgYW5kIGFwcGx5IGl0XG4gIGNvbnN0IHJ1bm5lcnMgPSB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMucnVubmVyc1xuICBjb25zdCBuZXRUcmFuc2Zvcm0gPSBydW5uZXJzXG4gICAgLm1hcChnZXRSdW5uZXJUcmFuc2Zvcm0pXG4gICAgLnJlZHVjZShsbXVsdGlwbHksIG5ldyBNYXRyaXgoKSlcblxuICB0aGlzLnRyYW5zZm9ybShuZXRUcmFuc2Zvcm0pXG5cbiAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLm1lcmdlKClcblxuICBpZiAodGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLmxlbmd0aCgpID09PSAxKSB7XG4gICAgdGhpcy5fZnJhbWVJZCA9IG51bGxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUnVubmVyQXJyYXkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJ1bm5lcnMgPSBbXVxuICAgIHRoaXMuaWRzID0gW11cbiAgfVxuXG4gIGFkZChydW5uZXIpIHtcbiAgICBpZiAodGhpcy5ydW5uZXJzLmluY2x1ZGVzKHJ1bm5lcikpIHJldHVyblxuICAgIGNvbnN0IGlkID0gcnVubmVyLmlkICsgMVxuXG4gICAgdGhpcy5ydW5uZXJzLnB1c2gocnVubmVyKVxuICAgIHRoaXMuaWRzLnB1c2goaWQpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2xlYXJCZWZvcmUoaWQpIHtcbiAgICBjb25zdCBkZWxldGVDbnQgPSB0aGlzLmlkcy5pbmRleE9mKGlkICsgMSkgfHwgMVxuICAgIHRoaXMuaWRzLnNwbGljZSgwLCBkZWxldGVDbnQsIDApXG4gICAgdGhpcy5ydW5uZXJzXG4gICAgICAuc3BsaWNlKDAsIGRlbGV0ZUNudCwgbmV3IEZha2VSdW5uZXIoKSlcbiAgICAgIC5mb3JFYWNoKChyKSA9PiByLmNsZWFyVHJhbnNmb3Jtc0Zyb21RdWV1ZSgpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBlZGl0KGlkLCBuZXdSdW5uZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaWRzLmluZGV4T2YoaWQgKyAxKVxuICAgIHRoaXMuaWRzLnNwbGljZShpbmRleCwgMSwgaWQgKyAxKVxuICAgIHRoaXMucnVubmVycy5zcGxpY2UoaW5kZXgsIDEsIG5ld1J1bm5lcilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0QnlJRChpZCkge1xuICAgIHJldHVybiB0aGlzLnJ1bm5lcnNbdGhpcy5pZHMuaW5kZXhPZihpZCArIDEpXVxuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmlkcy5sZW5ndGhcbiAgfVxuXG4gIG1lcmdlKCkge1xuICAgIGxldCBsYXN0UnVubmVyID0gbnVsbFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ydW5uZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBydW5uZXIgPSB0aGlzLnJ1bm5lcnNbaV1cblxuICAgICAgY29uc3QgY29uZGl0aW9uID1cbiAgICAgICAgbGFzdFJ1bm5lciAmJlxuICAgICAgICBydW5uZXIuZG9uZSAmJlxuICAgICAgICBsYXN0UnVubmVyLmRvbmUgJiZcbiAgICAgICAgLy8gZG9uJ3QgbWVyZ2UgcnVubmVyIHdoZW4gcGVyc2lzdGVkIG9uIHRpbWVsaW5lXG4gICAgICAgICghcnVubmVyLl90aW1lbGluZSB8fFxuICAgICAgICAgICFydW5uZXIuX3RpbWVsaW5lLl9ydW5uZXJJZHMuaW5jbHVkZXMocnVubmVyLmlkKSkgJiZcbiAgICAgICAgKCFsYXN0UnVubmVyLl90aW1lbGluZSB8fFxuICAgICAgICAgICFsYXN0UnVubmVyLl90aW1lbGluZS5fcnVubmVySWRzLmluY2x1ZGVzKGxhc3RSdW5uZXIuaWQpKVxuXG4gICAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgIC8vIHRoZSArMSBoYXBwZW5zIGluIHRoZSBmdW5jdGlvblxuICAgICAgICB0aGlzLnJlbW92ZShydW5uZXIuaWQpXG4gICAgICAgIGNvbnN0IG5ld1J1bm5lciA9IHJ1bm5lci5tZXJnZVdpdGgobGFzdFJ1bm5lcilcbiAgICAgICAgdGhpcy5lZGl0KGxhc3RSdW5uZXIuaWQsIG5ld1J1bm5lcilcbiAgICAgICAgbGFzdFJ1bm5lciA9IG5ld1J1bm5lclxuICAgICAgICAtLWlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RSdW5uZXIgPSBydW5uZXJcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlKGlkKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmlkcy5pbmRleE9mKGlkICsgMSlcbiAgICB0aGlzLmlkcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgdGhpcy5ydW5uZXJzLnNwbGljZShpbmRleCwgMSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIEVsZW1lbnQ6IHtcbiAgICBhbmltYXRlKGR1cmF0aW9uLCBkZWxheSwgd2hlbikge1xuICAgICAgY29uc3QgbyA9IFJ1bm5lci5zYW5pdGlzZShkdXJhdGlvbiwgZGVsYXksIHdoZW4pXG4gICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxuICAgICAgcmV0dXJuIG5ldyBSdW5uZXIoby5kdXJhdGlvbilcbiAgICAgICAgLmxvb3AobylcbiAgICAgICAgLmVsZW1lbnQodGhpcylcbiAgICAgICAgLnRpbWVsaW5lKHRpbWVsaW5lLnBsYXkoKSlcbiAgICAgICAgLnNjaGVkdWxlKG8uZGVsYXksIG8ud2hlbilcbiAgICB9LFxuXG4gICAgZGVsYXkoYnksIHdoZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoMCwgYnksIHdoZW4pXG4gICAgfSxcblxuICAgIC8vIHRoaXMgZnVuY3Rpb24gc2VhcmNoZXMgZm9yIGFsbCBydW5uZXJzIG9uIHRoZSBlbGVtZW50IGFuZCBkZWxldGVzIHRoZSBvbmVzXG4gICAgLy8gd2hpY2ggcnVuIGJlZm9yZSB0aGUgY3VycmVudCBvbmUuIFRoaXMgaXMgYmVjYXVzZSBhYnNvbHV0ZSB0cmFuc2Zvcm1hdGlvbnNcbiAgICAvLyBvdmVyd3JpdGUgYW55dGhpbmcgYW55d2F5IHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gd2FzdGUgdGltZSBjb21wdXRpbmdcbiAgICAvLyBvdGhlciBydW5uZXJzXG4gICAgX2NsZWFyVHJhbnNmb3JtUnVubmVyc0JlZm9yZShjdXJyZW50UnVubmVyKSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMuY2xlYXJCZWZvcmUoY3VycmVudFJ1bm5lci5pZClcbiAgICB9LFxuXG4gICAgX2N1cnJlbnRUcmFuc2Zvcm0oY3VycmVudCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLnJ1bm5lcnNcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRoZSBlcXVhbCBzaWduIGhlcmUgdG8gbWFrZSBzdXJlLCB0aGF0IGFsc28gdHJhbnNmb3JtYXRpb25zXG4gICAgICAgICAgLy8gb24gdGhlIHNhbWUgcnVubmVyIHdoaWNoIGV4ZWN1dGUgYmVmb3JlIHRoZSBjdXJyZW50IHRyYW5zZm9ybWF0aW9uIGFyZVxuICAgICAgICAgIC8vIHRha2VuIGludG8gYWNjb3VudFxuICAgICAgICAgIC5maWx0ZXIoKHJ1bm5lcikgPT4gcnVubmVyLmlkIDw9IGN1cnJlbnQuaWQpXG4gICAgICAgICAgLm1hcChnZXRSdW5uZXJUcmFuc2Zvcm0pXG4gICAgICAgICAgLnJlZHVjZShsbXVsdGlwbHksIG5ldyBNYXRyaXgoKSlcbiAgICAgIClcbiAgICB9LFxuXG4gICAgX2FkZFJ1bm5lcihydW5uZXIpIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycy5hZGQocnVubmVyKVxuXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgcnVubmVyIG1lcmdlIGlzIGV4ZWN1dGVkIGF0IHRoZSB2ZXJ5IGVuZCBvZlxuICAgICAgLy8gYWxsIEFuaW1hdG9yIGZ1bmN0aW9ucy4gVGhhdCBpcyB3aHkgd2UgdXNlIGltbWVkaWF0ZSBoZXJlIHRvIGV4ZWN1dGVcbiAgICAgIC8vIHRoZSBtZXJnZSByaWdodCBhZnRlciBhbGwgZnJhbWVzIGFyZSBydW5cbiAgICAgIEFuaW1hdG9yLmNhbmNlbEltbWVkaWF0ZSh0aGlzLl9mcmFtZUlkKVxuICAgICAgdGhpcy5fZnJhbWVJZCA9IEFuaW1hdG9yLmltbWVkaWF0ZShtZXJnZVRyYW5zZm9ybXMuYmluZCh0aGlzKSlcbiAgICB9LFxuXG4gICAgX3ByZXBhcmVSdW5uZXIoKSB7XG4gICAgICBpZiAodGhpcy5fZnJhbWVJZCA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycyA9IG5ldyBSdW5uZXJBcnJheSgpLmFkZChcbiAgICAgICAgICBuZXcgRmFrZVJ1bm5lcihuZXcgTWF0cml4KHRoaXMpKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG4vLyBXaWxsIG91dHB1dCB0aGUgZWxlbWVudHMgZnJvbSBhcnJheSBBIHRoYXQgYXJlIG5vdCBpbiB0aGUgYXJyYXkgQlxuY29uc3QgZGlmZmVyZW5jZSA9IChhLCBiKSA9PiBhLmZpbHRlcigoeCkgPT4gIWIuaW5jbHVkZXMoeCkpXG5cbmV4dGVuZChSdW5uZXIsIHtcbiAgYXR0cihhLCB2KSB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVBdHRyKCdhdHRyJywgYSwgdilcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSBzdHlsZXNcbiAgY3NzKHMsIHYpIHtcbiAgICByZXR1cm4gdGhpcy5zdHlsZUF0dHIoJ2NzcycsIHMsIHYpXG4gIH0sXG5cbiAgc3R5bGVBdHRyKHR5cGUsIG5hbWVPckF0dHJzLCB2YWwpIHtcbiAgICBpZiAodHlwZW9mIG5hbWVPckF0dHJzID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuc3R5bGVBdHRyKHR5cGUsIHsgW25hbWVPckF0dHJzXTogdmFsIH0pXG4gICAgfVxuXG4gICAgbGV0IGF0dHJzID0gbmFtZU9yQXR0cnNcbiAgICBpZiAodGhpcy5fdHJ5UmV0YXJnZXQodHlwZSwgYXR0cnMpKSByZXR1cm4gdGhpc1xuXG4gICAgbGV0IG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpLnRvKGF0dHJzKVxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoYXR0cnMpXG5cbiAgICB0aGlzLnF1ZXVlKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb3JwaGVyID0gbW9ycGhlci5mcm9tKHRoaXMuZWxlbWVudCgpW3R5cGVdKGtleXMpKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50KClbdHlwZV0obW9ycGhlci5hdChwb3MpLnZhbHVlT2YoKSlcbiAgICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKG5ld1RvQXR0cnMpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IG5ldyBrZXlzIHdlcmUgYWRkZWRcbiAgICAgICAgY29uc3QgbmV3S2V5cyA9IE9iamVjdC5rZXlzKG5ld1RvQXR0cnMpXG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VzID0gZGlmZmVyZW5jZShuZXdLZXlzLCBrZXlzKVxuXG4gICAgICAgIC8vIElmIHRoZWlyIGFyZSBuZXcga2V5cywgaW5pdGlhbGl6ZSB0aGVtIGFuZCBhZGQgdGhlbSB0byBtb3JwaGVyXG4gICAgICAgIGlmIChkaWZmZXJlbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBHZXQgdGhlIHZhbHVlc1xuICAgICAgICAgIGNvbnN0IGFkZGVkRnJvbUF0dHJzID0gdGhpcy5lbGVtZW50KClbdHlwZV0oZGlmZmVyZW5jZXMpXG5cbiAgICAgICAgICAvLyBHZXQgdGhlIGFscmVhZHkgaW5pdGlhbGl6ZWQgdmFsdWVzXG4gICAgICAgICAgY29uc3Qgb2xkRnJvbUF0dHJzID0gbmV3IE9iamVjdEJhZyhtb3JwaGVyLmZyb20oKSkudmFsdWVPZigpXG5cbiAgICAgICAgICAvLyBNZXJnZSBvbGQgYW5kIG5ld1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2xkRnJvbUF0dHJzLCBhZGRlZEZyb21BdHRycylcbiAgICAgICAgICBtb3JwaGVyLmZyb20ob2xkRnJvbUF0dHJzKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSBvYmplY3QgZnJvbSB0aGUgbW9ycGhlclxuICAgICAgICBjb25zdCBvbGRUb0F0dHJzID0gbmV3IE9iamVjdEJhZyhtb3JwaGVyLnRvKCkpLnZhbHVlT2YoKVxuXG4gICAgICAgIC8vIE1lcmdlIGluIG5ldyBhdHRyaWJ1dGVzXG4gICAgICAgIE9iamVjdC5hc3NpZ24ob2xkVG9BdHRycywgbmV3VG9BdHRycylcblxuICAgICAgICAvLyBDaGFuZ2UgbW9ycGhlciB0YXJnZXRcbiAgICAgICAgbW9ycGhlci50byhvbGRUb0F0dHJzKVxuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIHNhdmUgdGhlIHdvcmsgd2UgZGlkIHNvIHdlIGRvbid0IG5lZWQgaXQgdG8gZG8gYWdhaW5cbiAgICAgICAga2V5cyA9IG5ld0tleXNcbiAgICAgICAgYXR0cnMgPSBuZXdUb0F0dHJzXG4gICAgICB9XG4gICAgKVxuXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKHR5cGUsIG1vcnBoZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICB6b29tKGxldmVsLCBwb2ludCkge1xuICAgIGlmICh0aGlzLl90cnlSZXRhcmdldCgnem9vbScsIGxldmVsLCBwb2ludCkpIHJldHVybiB0aGlzXG5cbiAgICBsZXQgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudG8obmV3IFNWR051bWJlcihsZXZlbCkpXG5cbiAgICB0aGlzLnF1ZXVlKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb3JwaGVyID0gbW9ycGhlci5mcm9tKHRoaXMuZWxlbWVudCgpLnpvb20oKSlcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCgpLnpvb20obW9ycGhlci5hdChwb3MpLCBwb2ludClcbiAgICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKG5ld0xldmVsLCBuZXdQb2ludCkge1xuICAgICAgICBwb2ludCA9IG5ld1BvaW50XG4gICAgICAgIG1vcnBoZXIudG8obmV3TGV2ZWwpXG4gICAgICB9XG4gICAgKVxuXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKCd6b29tJywgbW9ycGhlcilcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIC8qKlxuICAgKiogYWJzb2x1dGUgdHJhbnNmb3JtYXRpb25zXG4gICAqKi9cblxuICAvL1xuICAvLyBNIHYgLS0tLS18LS0tLS0oRCBNIHYgPSBGIHYpLS0tLS0tfC0tLS0tPiAgVCB2XG4gIC8vXG4gIC8vIDEuIGRlZmluZSB0aGUgZmluYWwgc3RhdGUgKFQpIGFuZCBkZWNvbXBvc2UgaXQgKG9uY2UpXG4gIC8vICAgIHQgPSBbdHgsIHR5LCB0aGUsIGxhbSwgc3ksIHN4XVxuICAvLyAyLiBvbiBldmVyeSBmcmFtZTogcHVsbCB0aGUgY3VycmVudCBzdGF0ZSBvZiBhbGwgcHJldmlvdXMgdHJhbnNmb3Jtc1xuICAvLyAgICAoTSAtIG0gY2FuIGNoYW5nZSlcbiAgLy8gICBhbmQgdGhlbiB3cml0ZSB0aGlzIGFzIG0gPSBbdHgwLCB0eTAsIHRoZTAsIGxhbTAsIHN5MCwgc3gwXVxuICAvLyAzLiBGaW5kIHRoZSBpbnRlcnBvbGF0ZWQgbWF0cml4IEYocG9zKSA9IG0gKyBwb3MgKiAodCAtIG0pXG4gIC8vICAgLSBOb3RlIEYoMCkgPSBNXG4gIC8vICAgLSBOb3RlIEYoMSkgPSBUXG4gIC8vIDQuIE5vdyB5b3UgZ2V0IHRoZSBkZWx0YSBtYXRyaXggYXMgYSByZXN1bHQ6IEQgPSBGICogaW52KE0pXG5cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybXMsIHJlbGF0aXZlLCBhZmZpbmUpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGEgZGVjbGFyYXRpdmUgZnVuY3Rpb24sIHdlIHNob3VsZCByZXRhcmdldCBpdCBpZiBwb3NzaWJsZVxuICAgIHJlbGF0aXZlID0gdHJhbnNmb3Jtcy5yZWxhdGl2ZSB8fCByZWxhdGl2ZVxuICAgIGlmIChcbiAgICAgIHRoaXMuX2lzRGVjbGFyYXRpdmUgJiZcbiAgICAgICFyZWxhdGl2ZSAmJlxuICAgICAgdGhpcy5fdHJ5UmV0YXJnZXQoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybXMpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8vIFBhcnNlIHRoZSBwYXJhbWV0ZXJzXG4gICAgY29uc3QgaXNNYXRyaXggPSBNYXRyaXguaXNNYXRyaXhMaWtlKHRyYW5zZm9ybXMpXG4gICAgYWZmaW5lID1cbiAgICAgIHRyYW5zZm9ybXMuYWZmaW5lICE9IG51bGxcbiAgICAgICAgPyB0cmFuc2Zvcm1zLmFmZmluZVxuICAgICAgICA6IGFmZmluZSAhPSBudWxsXG4gICAgICAgICAgPyBhZmZpbmVcbiAgICAgICAgICA6ICFpc01hdHJpeFxuXG4gICAgLy8gQ3JlYXRlIGEgbW9ycGhlciBhbmQgc2V0IGl0cyB0eXBlXG4gICAgY29uc3QgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudHlwZShcbiAgICAgIGFmZmluZSA/IFRyYW5zZm9ybUJhZyA6IE1hdHJpeFxuICAgIClcblxuICAgIGxldCBvcmlnaW5cbiAgICBsZXQgZWxlbWVudFxuICAgIGxldCBjdXJyZW50XG4gICAgbGV0IGN1cnJlbnRBbmdsZVxuICAgIGxldCBzdGFydFRyYW5zZm9ybVxuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgZWxlbWVudCBhbmQgb3JpZ2luIGlzIGRlZmluZWRcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMuZWxlbWVudCgpXG4gICAgICBvcmlnaW4gPSBvcmlnaW4gfHwgZ2V0T3JpZ2luKHRyYW5zZm9ybXMsIGVsZW1lbnQpXG5cbiAgICAgIHN0YXJ0VHJhbnNmb3JtID0gbmV3IE1hdHJpeChyZWxhdGl2ZSA/IHVuZGVmaW5lZCA6IGVsZW1lbnQpXG5cbiAgICAgIC8vIGFkZCB0aGUgcnVubmVyIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBtZXJnZSB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgIGVsZW1lbnQuX2FkZFJ1bm5lcih0aGlzKVxuXG4gICAgICAvLyBEZWFjdGl2YXRlIGFsbCB0cmFuc2Zvcm1zIHRoYXQgaGF2ZSBydW4gc28gZmFyIGlmIHdlIGFyZSBhYnNvbHV0ZVxuICAgICAgaWYgKCFyZWxhdGl2ZSkge1xuICAgICAgICBlbGVtZW50Ll9jbGVhclRyYW5zZm9ybVJ1bm5lcnNCZWZvcmUodGhpcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4ocG9zKSB7XG4gICAgICAvLyBjbGVhciBhbGwgb3RoZXIgdHJhbnNmb3JtcyBiZWZvcmUgdGhpcyBpbiBjYXNlIHNvbWV0aGluZyBpcyBzYXZlZFxuICAgICAgLy8gb24gdGhpcyBydW5uZXIuIFdlIGFyZSBhYnNvbHV0ZS4gV2UgZG9udCBuZWVkIHRoZXNlIVxuICAgICAgaWYgKCFyZWxhdGl2ZSkgdGhpcy5jbGVhclRyYW5zZm9ybSgpXG5cbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gbmV3IFBvaW50KG9yaWdpbikudHJhbnNmb3JtKFxuICAgICAgICBlbGVtZW50Ll9jdXJyZW50VHJhbnNmb3JtKHRoaXMpXG4gICAgICApXG5cbiAgICAgIGxldCB0YXJnZXQgPSBuZXcgTWF0cml4KHsgLi4udHJhbnNmb3Jtcywgb3JpZ2luOiBbeCwgeV0gfSlcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgJiYgY3VycmVudCA/IGN1cnJlbnQgOiBzdGFydFRyYW5zZm9ybVxuXG4gICAgICBpZiAoYWZmaW5lKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5kZWNvbXBvc2UoeCwgeSlcbiAgICAgICAgc3RhcnQgPSBzdGFydC5kZWNvbXBvc2UoeCwgeSlcblxuICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgYW5kIHRhcmdldCBhbmdsZSBhcyBpdCB3YXMgc2V0XG4gICAgICAgIGNvbnN0IHJUYXJnZXQgPSB0YXJnZXQucm90YXRlXG4gICAgICAgIGNvbnN0IHJDdXJyZW50ID0gc3RhcnQucm90YXRlXG5cbiAgICAgICAgLy8gRmlndXJlIG91dCB0aGUgc2hvcnRlc3QgcGF0aCB0byByb3RhdGUgZGlyZWN0bHlcbiAgICAgICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtyVGFyZ2V0IC0gMzYwLCByVGFyZ2V0LCByVGFyZ2V0ICsgMzYwXVxuICAgICAgICBjb25zdCBkaXN0YW5jZXMgPSBwb3NzaWJpbGl0aWVzLm1hcCgoYSkgPT4gTWF0aC5hYnMoYSAtIHJDdXJyZW50KSlcbiAgICAgICAgY29uc3Qgc2hvcnRlc3QgPSBNYXRoLm1pbiguLi5kaXN0YW5jZXMpXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZGlzdGFuY2VzLmluZGV4T2Yoc2hvcnRlc3QpXG4gICAgICAgIHRhcmdldC5yb3RhdGUgPSBwb3NzaWJpbGl0aWVzW2luZGV4XVxuICAgICAgfVxuXG4gICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgLy8gd2UgaGF2ZSB0byBiZSBjYXJlZnVsIGhlcmUgbm90IHRvIG92ZXJ3cml0ZSB0aGUgcm90YXRpb25cbiAgICAgICAgLy8gd2l0aCB0aGUgcm90YXRlIG1ldGhvZCBvZiBNYXRyaXhcbiAgICAgICAgaWYgKCFpc01hdHJpeCkge1xuICAgICAgICAgIHRhcmdldC5yb3RhdGUgPSB0cmFuc2Zvcm1zLnJvdGF0ZSB8fCAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzRGVjbGFyYXRpdmUgJiYgY3VycmVudEFuZ2xlKSB7XG4gICAgICAgICAgc3RhcnQucm90YXRlID0gY3VycmVudEFuZ2xlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbW9ycGhlci5mcm9tKHN0YXJ0KVxuICAgICAgbW9ycGhlci50byh0YXJnZXQpXG5cbiAgICAgIGNvbnN0IGFmZmluZVBhcmFtZXRlcnMgPSBtb3JwaGVyLmF0KHBvcylcbiAgICAgIGN1cnJlbnRBbmdsZSA9IGFmZmluZVBhcmFtZXRlcnMucm90YXRlXG4gICAgICBjdXJyZW50ID0gbmV3IE1hdHJpeChhZmZpbmVQYXJhbWV0ZXJzKVxuXG4gICAgICB0aGlzLmFkZFRyYW5zZm9ybShjdXJyZW50KVxuICAgICAgZWxlbWVudC5fYWRkUnVubmVyKHRoaXMpXG4gICAgICByZXR1cm4gbW9ycGhlci5kb25lKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXRhcmdldChuZXdUcmFuc2Zvcm1zKSB7XG4gICAgICAvLyBvbmx5IGdldCBhIG5ldyBvcmlnaW4gaWYgaXQgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjYWxsXG4gICAgICBpZiAoXG4gICAgICAgIChuZXdUcmFuc2Zvcm1zLm9yaWdpbiB8fCAnY2VudGVyJykudG9TdHJpbmcoKSAhPT1cbiAgICAgICAgKHRyYW5zZm9ybXMub3JpZ2luIHx8ICdjZW50ZXInKS50b1N0cmluZygpXG4gICAgICApIHtcbiAgICAgICAgb3JpZ2luID0gZ2V0T3JpZ2luKG5ld1RyYW5zZm9ybXMsIGVsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIC8vIG92ZXJ3cml0ZSB0aGUgb2xkIHRyYW5zZm9ybWF0aW9ucyB3aXRoIHRoZSBuZXcgb25lc1xuICAgICAgdHJhbnNmb3JtcyA9IHsgLi4ubmV3VHJhbnNmb3Jtcywgb3JpZ2luIH1cbiAgICB9XG5cbiAgICB0aGlzLnF1ZXVlKHNldHVwLCBydW4sIHJldGFyZ2V0LCB0cnVlKVxuICAgIHRoaXMuX2lzRGVjbGFyYXRpdmUgJiYgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKCd0cmFuc2Zvcm0nLCBtb3JwaGVyKVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgLy8gQW5pbWF0YWJsZSB4LWF4aXNcbiAgeCh4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCd4JywgeClcbiAgfSxcblxuICAvLyBBbmltYXRhYmxlIHktYXhpc1xuICB5KHkpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ3knLCB5KVxuICB9LFxuXG4gIGF4KHgpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2F4JywgeClcbiAgfSxcblxuICBheSh5KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdheScsIHkpXG4gIH0sXG5cbiAgZHgoeCA9IDApIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXJEZWx0YSgneCcsIHgpXG4gIH0sXG5cbiAgZHkoeSA9IDApIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXJEZWx0YSgneScsIHkpXG4gIH0sXG5cbiAgZG1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmR4KHgpLmR5KHkpXG4gIH0sXG5cbiAgX3F1ZXVlTnVtYmVyRGVsdGEobWV0aG9kLCB0bykge1xuICAgIHRvID0gbmV3IFNWR051bWJlcih0bylcblxuICAgIC8vIFRyeSB0byBjaGFuZ2UgdGhlIHRhcmdldCBpZiB3ZSBoYXZlIHRoaXMgbWV0aG9kIGFscmVhZHkgcmVnaXN0ZXJlZFxuICAgIGlmICh0aGlzLl90cnlSZXRhcmdldChtZXRob2QsIHRvKSkgcmV0dXJuIHRoaXNcblxuICAgIC8vIE1ha2UgYSBtb3JwaGVyIGFuZCBxdWV1ZSB0aGUgYW5pbWF0aW9uXG4gICAgY29uc3QgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudG8odG8pXG4gICAgbGV0IGZyb20gPSBudWxsXG4gICAgdGhpcy5xdWV1ZShcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnJvbSA9IHRoaXMuZWxlbWVudCgpW21ldGhvZF0oKVxuICAgICAgICBtb3JwaGVyLmZyb20oZnJvbSlcbiAgICAgICAgbW9ycGhlci50byhmcm9tICsgdG8pXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLmVsZW1lbnQoKVttZXRob2RdKG1vcnBoZXIuYXQocG9zKSlcbiAgICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKG5ld1RvKSB7XG4gICAgICAgIG1vcnBoZXIudG8oZnJvbSArIG5ldyBTVkdOdW1iZXIobmV3VG8pKVxuICAgICAgfVxuICAgIClcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBtb3JwaGVyIHNvIHRoYXQgaWYgaXQgaXMgY2hhbmdlZCBhZ2Fpbiwgd2UgY2FuIHJldGFyZ2V0IGl0XG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKG1ldGhvZCwgbW9ycGhlcilcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIF9xdWV1ZU9iamVjdChtZXRob2QsIHRvKSB7XG4gICAgLy8gVHJ5IHRvIGNoYW5nZSB0aGUgdGFyZ2V0IGlmIHdlIGhhdmUgdGhpcyBtZXRob2QgYWxyZWFkeSByZWdpc3RlcmVkXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KG1ldGhvZCwgdG8pKSByZXR1cm4gdGhpc1xuXG4gICAgLy8gTWFrZSBhIG1vcnBoZXIgYW5kIHF1ZXVlIHRoZSBhbmltYXRpb25cbiAgICBjb25zdCBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKS50byh0bylcbiAgICB0aGlzLnF1ZXVlKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb3JwaGVyLmZyb20odGhpcy5lbGVtZW50KClbbWV0aG9kXSgpKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50KClbbWV0aG9kXShtb3JwaGVyLmF0KHBvcykpXG4gICAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxuICAgICAgfVxuICAgIClcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBtb3JwaGVyIHNvIHRoYXQgaWYgaXQgaXMgY2hhbmdlZCBhZ2Fpbiwgd2UgY2FuIHJldGFyZ2V0IGl0XG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKG1ldGhvZCwgbW9ycGhlcilcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIF9xdWV1ZU51bWJlcihtZXRob2QsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlT2JqZWN0KG1ldGhvZCwgbmV3IFNWR051bWJlcih2YWx1ZSkpXG4gIH0sXG5cbiAgLy8gQW5pbWF0YWJsZSBjZW50ZXIgeC1heGlzXG4gIGN4KHgpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2N4JywgeClcbiAgfSxcblxuICAvLyBBbmltYXRhYmxlIGNlbnRlciB5LWF4aXNcbiAgY3koeSkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignY3knLCB5KVxuICB9LFxuXG4gIC8vIEFkZCBhbmltYXRhYmxlIG1vdmVcbiAgbW92ZSh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMueCh4KS55KHkpXG4gIH0sXG5cbiAgYW1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmF4KHgpLmF5KHkpXG4gIH0sXG5cbiAgLy8gQWRkIGFuaW1hdGFibGUgY2VudGVyXG4gIGNlbnRlcih4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuY3goeCkuY3koeSlcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSBzaXplXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIC8vIGFuaW1hdGUgYmJveCBiYXNlZCBzaXplIGZvciBhbGwgb3RoZXIgZWxlbWVudHNcbiAgICBsZXQgYm94XG5cbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICAgIGJveCA9IHRoaXMuX2VsZW1lbnQuYmJveCgpXG4gICAgfVxuXG4gICAgaWYgKCF3aWR0aCkge1xuICAgICAgd2lkdGggPSAoYm94LndpZHRoIC8gYm94LmhlaWdodCkgKiBoZWlnaHRcbiAgICB9XG5cbiAgICBpZiAoIWhlaWdodCkge1xuICAgICAgaGVpZ2h0ID0gKGJveC5oZWlnaHQgLyBib3gud2lkdGgpICogd2lkdGhcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53aWR0aCh3aWR0aCkuaGVpZ2h0KGhlaWdodClcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSB3aWR0aFxuICB3aWR0aCh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignd2lkdGgnLCB3aWR0aClcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSBoZWlnaHRcbiAgaGVpZ2h0KGhlaWdodCkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignaGVpZ2h0JywgaGVpZ2h0KVxuICB9LFxuXG4gIC8vIEFkZCBhbmltYXRhYmxlIHBsb3RcbiAgcGxvdChhLCBiLCBjLCBkKSB7XG4gICAgLy8gTGluZXMgY2FuIGJlIHBsb3R0ZWQgd2l0aCA0IGFyZ3VtZW50c1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICByZXR1cm4gdGhpcy5wbG90KFthLCBiLCBjLCBkXSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdHJ5UmV0YXJnZXQoJ3Bsb3QnLCBhKSkgcmV0dXJuIHRoaXNcblxuICAgIGNvbnN0IG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpXG4gICAgICAudHlwZSh0aGlzLl9lbGVtZW50Lk1vcnBoQXJyYXkpXG4gICAgICAudG8oYSlcblxuICAgIHRoaXMucXVldWUoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vcnBoZXIuZnJvbSh0aGlzLl9lbGVtZW50LmFycmF5KCkpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnBsb3QobW9ycGhlci5hdChwb3MpKVxuICAgICAgICByZXR1cm4gbW9ycGhlci5kb25lKClcbiAgICAgIH1cbiAgICApXG5cbiAgICB0aGlzLl9yZW1lbWJlck1vcnBoZXIoJ3Bsb3QnLCBtb3JwaGVyKVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgLy8gQWRkIGxlYWRpbmcgbWV0aG9kXG4gIGxlYWRpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2xlYWRpbmcnLCB2YWx1ZSlcbiAgfSxcblxuICAvLyBBZGQgYW5pbWF0YWJsZSB2aWV3Ym94XG4gIHZpZXdib3goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiB0aGlzLl9xdWV1ZU9iamVjdCgndmlld2JveCcsIG5ldyBCb3goeCwgeSwgd2lkdGgsIGhlaWdodCkpXG4gIH0sXG5cbiAgdXBkYXRlKG8pIHtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUoe1xuICAgICAgICBvZmZzZXQ6IGFyZ3VtZW50c1swXSxcbiAgICAgICAgY29sb3I6IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgb3BhY2l0eTogYXJndW1lbnRzWzJdXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChvLm9wYWNpdHkgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLW9wYWNpdHknLCBvLm9wYWNpdHkpXG4gICAgaWYgKG8uY29sb3IgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLWNvbG9yJywgby5jb2xvcilcbiAgICBpZiAoby5vZmZzZXQgIT0gbnVsbCkgdGhpcy5hdHRyKCdvZmZzZXQnLCBvLm9mZnNldClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn0pXG5cbmV4dGVuZChSdW5uZXIsIHsgcngsIHJ5LCBmcm9tLCB0byB9KVxucmVnaXN0ZXIoUnVubmVyLCAnUnVubmVyJylcbiIsImltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IEFuaW1hdG9yIGZyb20gJy4vQW5pbWF0b3IuanMnXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi4vdHlwZXMvRXZlbnRUYXJnZXQuanMnXG5cbmNvbnN0IG1ha2VTY2hlZHVsZSA9IGZ1bmN0aW9uIChydW5uZXJJbmZvKSB7XG4gIGNvbnN0IHN0YXJ0ID0gcnVubmVySW5mby5zdGFydFxuICBjb25zdCBkdXJhdGlvbiA9IHJ1bm5lckluZm8ucnVubmVyLmR1cmF0aW9uKClcbiAgY29uc3QgZW5kID0gc3RhcnQgKyBkdXJhdGlvblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgZW5kOiBlbmQsXG4gICAgcnVubmVyOiBydW5uZXJJbmZvLnJ1bm5lclxuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHcgPSBnbG9iYWxzLndpbmRvd1xuICByZXR1cm4gKHcucGVyZm9ybWFuY2UgfHwgdy5EYXRlKS5ub3coKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lbGluZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgLy8gQ29uc3RydWN0IGEgbmV3IHRpbWVsaW5lIG9uIHRoZSBnaXZlbiBlbGVtZW50XG4gIGNvbnN0cnVjdG9yKHRpbWVTb3VyY2UgPSBkZWZhdWx0U291cmNlKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5fdGltZVNvdXJjZSA9IHRpbWVTb3VyY2VcblxuICAgIC8vIHRlcm1pbmF0ZSByZXNldHMgYWxsIHZhcmlhYmxlcyB0byB0aGVpciBpbml0aWFsIHN0YXRlXG4gICAgdGhpcy50ZXJtaW5hdGUoKVxuICB9XG5cbiAgYWN0aXZlKCkge1xuICAgIHJldHVybiAhIXRoaXMuX25leHRGcmFtZVxuICB9XG5cbiAgZmluaXNoKCkge1xuICAgIC8vIEdvIHRvIGVuZCBhbmQgcGF1c2VcbiAgICB0aGlzLnRpbWUodGhpcy5nZXRFbmRUaW1lT2ZUaW1lbGluZSgpICsgMSlcbiAgICByZXR1cm4gdGhpcy5wYXVzZSgpXG4gIH1cblxuICAvLyBDYWxjdWxhdGVzIHRoZSBlbmQgb2YgdGhlIHRpbWVsaW5lXG4gIGdldEVuZFRpbWUoKSB7XG4gICAgY29uc3QgbGFzdFJ1bm5lckluZm8gPSB0aGlzLmdldExhc3RSdW5uZXJJbmZvKClcbiAgICBjb25zdCBsYXN0RHVyYXRpb24gPSBsYXN0UnVubmVySW5mbyA/IGxhc3RSdW5uZXJJbmZvLnJ1bm5lci5kdXJhdGlvbigpIDogMFxuICAgIGNvbnN0IGxhc3RTdGFydFRpbWUgPSBsYXN0UnVubmVySW5mbyA/IGxhc3RSdW5uZXJJbmZvLnN0YXJ0IDogdGhpcy5fdGltZVxuICAgIHJldHVybiBsYXN0U3RhcnRUaW1lICsgbGFzdER1cmF0aW9uXG4gIH1cblxuICBnZXRFbmRUaW1lT2ZUaW1lbGluZSgpIHtcbiAgICBjb25zdCBlbmRUaW1lcyA9IHRoaXMuX3J1bm5lcnMubWFwKChpKSA9PiBpLnN0YXJ0ICsgaS5ydW5uZXIuZHVyYXRpb24oKSlcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgLi4uZW5kVGltZXMpXG4gIH1cblxuICBnZXRMYXN0UnVubmVySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSdW5uZXJJbmZvQnlJZCh0aGlzLl9sYXN0UnVubmVySWQpXG4gIH1cblxuICBnZXRSdW5uZXJJbmZvQnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLl9ydW5uZXJzW3RoaXMuX3J1bm5lcklkcy5pbmRleE9mKGlkKV0gfHwgbnVsbFxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZVxuICAgIHJldHVybiB0aGlzLl9jb250aW51ZSgpXG4gIH1cblxuICBwZXJzaXN0KGR0T3JGb3JldmVyKSB7XG4gICAgaWYgKGR0T3JGb3JldmVyID09IG51bGwpIHJldHVybiB0aGlzLl9wZXJzaXN0XG4gICAgdGhpcy5fcGVyc2lzdCA9IGR0T3JGb3JldmVyXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgLy8gTm93IG1ha2Ugc3VyZSB3ZSBhcmUgbm90IHBhdXNlZCBhbmQgY29udGludWUgdGhlIGFuaW1hdGlvblxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlVGltZSgpLl9jb250aW51ZSgpXG4gIH1cblxuICByZXZlcnNlKHllcykge1xuICAgIGNvbnN0IGN1cnJlbnRTcGVlZCA9IHRoaXMuc3BlZWQoKVxuICAgIGlmICh5ZXMgPT0gbnVsbCkgcmV0dXJuIHRoaXMuc3BlZWQoLWN1cnJlbnRTcGVlZClcblxuICAgIGNvbnN0IHBvc2l0aXZlID0gTWF0aC5hYnMoY3VycmVudFNwZWVkKVxuICAgIHJldHVybiB0aGlzLnNwZWVkKHllcyA/IC1wb3NpdGl2ZSA6IHBvc2l0aXZlKVxuICB9XG5cbiAgLy8gc2NoZWR1bGVzIGEgcnVubmVyIG9uIHRoZSB0aW1lbGluZVxuICBzY2hlZHVsZShydW5uZXIsIGRlbGF5LCB3aGVuKSB7XG4gICAgaWYgKHJ1bm5lciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVubmVycy5tYXAobWFrZVNjaGVkdWxlKVxuICAgIH1cblxuICAgIC8vIFRoZSBzdGFydCB0aW1lIGZvciB0aGUgbmV4dCBhbmltYXRpb24gY2FuIGVpdGhlciBiZSBnaXZlbiBleHBsaWNpdGx5LFxuICAgIC8vIGRlcml2ZWQgZnJvbSB0aGUgY3VycmVudCB0aW1lbGluZSB0aW1lIG9yIGl0IGNhbiBiZSByZWxhdGl2ZSB0byB0aGVcbiAgICAvLyBsYXN0IHN0YXJ0IHRpbWUgdG8gY2hhaW4gYW5pbWF0aW9ucyBkaXJlY3RseVxuXG4gICAgbGV0IGFic29sdXRlU3RhcnRUaW1lID0gMFxuICAgIGNvbnN0IGVuZFRpbWUgPSB0aGlzLmdldEVuZFRpbWUoKVxuICAgIGRlbGF5ID0gZGVsYXkgfHwgMFxuXG4gICAgLy8gV29yayBvdXQgd2hlbiB0byBzdGFydCB0aGUgYW5pbWF0aW9uXG4gICAgaWYgKHdoZW4gPT0gbnVsbCB8fCB3aGVuID09PSAnbGFzdCcgfHwgd2hlbiA9PT0gJ2FmdGVyJykge1xuICAgICAgLy8gVGFrZSB0aGUgbGFzdCB0aW1lIGFuZCBpbmNyZW1lbnRcbiAgICAgIGFic29sdXRlU3RhcnRUaW1lID0gZW5kVGltZVxuICAgIH0gZWxzZSBpZiAod2hlbiA9PT0gJ2Fic29sdXRlJyB8fCB3aGVuID09PSAnc3RhcnQnKSB7XG4gICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IGRlbGF5XG4gICAgICBkZWxheSA9IDBcbiAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICdub3cnKSB7XG4gICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IHRoaXMuX3RpbWVcbiAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICdyZWxhdGl2ZScpIHtcbiAgICAgIGNvbnN0IHJ1bm5lckluZm8gPSB0aGlzLmdldFJ1bm5lckluZm9CeUlkKHJ1bm5lci5pZClcbiAgICAgIGlmIChydW5uZXJJbmZvKSB7XG4gICAgICAgIGFic29sdXRlU3RhcnRUaW1lID0gcnVubmVySW5mby5zdGFydCArIGRlbGF5XG4gICAgICAgIGRlbGF5ID0gMFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAod2hlbiA9PT0gJ3dpdGgtbGFzdCcpIHtcbiAgICAgIGNvbnN0IGxhc3RSdW5uZXJJbmZvID0gdGhpcy5nZXRMYXN0UnVubmVySW5mbygpXG4gICAgICBjb25zdCBsYXN0U3RhcnRUaW1lID0gbGFzdFJ1bm5lckluZm8gPyBsYXN0UnVubmVySW5mby5zdGFydCA6IHRoaXMuX3RpbWVcbiAgICAgIGFic29sdXRlU3RhcnRUaW1lID0gbGFzdFN0YXJ0VGltZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHRoZSBcIndoZW5cIiBwYXJhbWV0ZXInKVxuICAgIH1cblxuICAgIC8vIE1hbmFnZSBydW5uZXJcbiAgICBydW5uZXIudW5zY2hlZHVsZSgpXG4gICAgcnVubmVyLnRpbWVsaW5lKHRoaXMpXG5cbiAgICBjb25zdCBwZXJzaXN0ID0gcnVubmVyLnBlcnNpc3QoKVxuICAgIGNvbnN0IHJ1bm5lckluZm8gPSB7XG4gICAgICBwZXJzaXN0OiBwZXJzaXN0ID09PSBudWxsID8gdGhpcy5fcGVyc2lzdCA6IHBlcnNpc3QsXG4gICAgICBzdGFydDogYWJzb2x1dGVTdGFydFRpbWUgKyBkZWxheSxcbiAgICAgIHJ1bm5lclxuICAgIH1cblxuICAgIHRoaXMuX2xhc3RSdW5uZXJJZCA9IHJ1bm5lci5pZFxuXG4gICAgdGhpcy5fcnVubmVycy5wdXNoKHJ1bm5lckluZm8pXG4gICAgdGhpcy5fcnVubmVycy5zb3J0KChhLCBiKSA9PiBhLnN0YXJ0IC0gYi5zdGFydClcbiAgICB0aGlzLl9ydW5uZXJJZHMgPSB0aGlzLl9ydW5uZXJzLm1hcCgoaW5mbykgPT4gaW5mby5ydW5uZXIuaWQpXG5cbiAgICB0aGlzLnVwZGF0ZVRpbWUoKS5fY29udGludWUoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZWVrKGR0KSB7XG4gICAgcmV0dXJuIHRoaXMudGltZSh0aGlzLl90aW1lICsgZHQpXG4gIH1cblxuICBzb3VyY2UoZm4pIHtcbiAgICBpZiAoZm4gPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3RpbWVTb3VyY2VcbiAgICB0aGlzLl90aW1lU291cmNlID0gZm5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3BlZWQoc3BlZWQpIHtcbiAgICBpZiAoc3BlZWQgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3NwZWVkXG4gICAgdGhpcy5fc3BlZWQgPSBzcGVlZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdG9wKCkge1xuICAgIC8vIEdvIHRvIHN0YXJ0IGFuZCBwYXVzZVxuICAgIHRoaXMudGltZSgwKVxuICAgIHJldHVybiB0aGlzLnBhdXNlKClcbiAgfVxuXG4gIHRpbWUodGltZSkge1xuICAgIGlmICh0aW1lID09IG51bGwpIHJldHVybiB0aGlzLl90aW1lXG4gICAgdGhpcy5fdGltZSA9IHRpbWVcbiAgICByZXR1cm4gdGhpcy5fY29udGludWUodHJ1ZSlcbiAgfVxuXG4gIC8vIFJlbW92ZSB0aGUgcnVubmVyIGZyb20gdGhpcyB0aW1lbGluZVxuICB1bnNjaGVkdWxlKHJ1bm5lcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fcnVubmVySWRzLmluZGV4T2YocnVubmVyLmlkKVxuICAgIGlmIChpbmRleCA8IDApIHJldHVybiB0aGlzXG5cbiAgICB0aGlzLl9ydW5uZXJzLnNwbGljZShpbmRleCwgMSlcbiAgICB0aGlzLl9ydW5uZXJJZHMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgcnVubmVyLnRpbWVsaW5lKG51bGwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIE1ha2VzIHN1cmUsIHRoYXQgYWZ0ZXIgcGF1c2luZyB0aGUgdGltZSBkb2Vzbid0IGp1bXBcbiAgdXBkYXRlVGltZSgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuX2xhc3RTb3VyY2VUaW1lID0gdGhpcy5fdGltZVNvdXJjZSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDaGVja3MgaWYgd2UgYXJlIHJ1bm5pbmcgYW5kIGNvbnRpbnVlcyB0aGUgYW5pbWF0aW9uXG4gIF9jb250aW51ZShpbW1lZGlhdGVTdGVwID0gZmFsc2UpIHtcbiAgICBBbmltYXRvci5jYW5jZWxGcmFtZSh0aGlzLl9uZXh0RnJhbWUpXG4gICAgdGhpcy5fbmV4dEZyYW1lID0gbnVsbFxuXG4gICAgaWYgKGltbWVkaWF0ZVN0ZXApIHJldHVybiB0aGlzLl9zdGVwSW1tZWRpYXRlKClcbiAgICBpZiAodGhpcy5fcGF1c2VkKSByZXR1cm4gdGhpc1xuXG4gICAgdGhpcy5fbmV4dEZyYW1lID0gQW5pbWF0b3IuZnJhbWUodGhpcy5fc3RlcClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX3N0ZXBGbihpbW1lZGlhdGVTdGVwID0gZmFsc2UpIHtcbiAgICAvLyBHZXQgdGhlIHRpbWUgZGVsdGEgZnJvbSB0aGUgbGFzdCB0aW1lIGFuZCB1cGRhdGUgdGhlIHRpbWVcbiAgICBjb25zdCB0aW1lID0gdGhpcy5fdGltZVNvdXJjZSgpXG4gICAgbGV0IGR0U291cmNlID0gdGltZSAtIHRoaXMuX2xhc3RTb3VyY2VUaW1lXG5cbiAgICBpZiAoaW1tZWRpYXRlU3RlcCkgZHRTb3VyY2UgPSAwXG5cbiAgICBjb25zdCBkdFRpbWUgPSB0aGlzLl9zcGVlZCAqIGR0U291cmNlICsgKHRoaXMuX3RpbWUgLSB0aGlzLl9sYXN0U3RlcFRpbWUpXG4gICAgdGhpcy5fbGFzdFNvdXJjZVRpbWUgPSB0aW1lXG5cbiAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgdGltZSBpZiB3ZSB1c2UgdGhlIHRpbWVTb3VyY2UuXG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgY3VycmVudCB0aW1lXG4gICAgaWYgKCFpbW1lZGlhdGVTdGVwKSB7XG4gICAgICAvLyBVcGRhdGUgdGhlIHRpbWVcbiAgICAgIHRoaXMuX3RpbWUgKz0gZHRUaW1lXG4gICAgICB0aGlzLl90aW1lID0gdGhpcy5fdGltZSA8IDAgPyAwIDogdGhpcy5fdGltZVxuICAgIH1cbiAgICB0aGlzLl9sYXN0U3RlcFRpbWUgPSB0aGlzLl90aW1lXG4gICAgdGhpcy5maXJlKCd0aW1lJywgdGhpcy5fdGltZSlcblxuICAgIC8vIFRoaXMgaXMgZm9yIHRoZSBjYXNlIHRoYXQgdGhlIHRpbWVsaW5lIHdhcyBzZWVrZWQgc28gdGhhdCB0aGUgdGltZVxuICAgIC8vIGlzIG5vdyBiZWZvcmUgdGhlIHN0YXJ0VGltZSBvZiB0aGUgcnVubmVyLiBUaGF0IGlzIHdoeSB3ZSBuZWVkIHRvIHNldFxuICAgIC8vIHRoZSBydW5uZXIgdG8gcG9zaXRpb24gMFxuXG4gICAgLy8gRklYTUU6XG4gICAgLy8gSG93ZXZlciwgcmVzZXR0aW5nIGluIGluc2VydGlvbiBvcmRlciBsZWFkcyB0byBidWdzLiBDb25zaWRlcmluZyB0aGUgY2FzZSxcbiAgICAvLyB3aGVyZSAyIHJ1bm5lcnMgY2hhbmdlIHRoZSBzYW1lIGF0dHJpYnV0ZSBidXQgaW4gZGlmZmVyZW50IHRpbWVzLFxuICAgIC8vIHJlc2V0dGluZyBib3RoIG9mIHRoZW0gd2lsbCBsZWFkIHRvIHRoZSBjYXNlIHdoZXJlIHRoZSBsYXRlciBkZWZpbmVkXG4gICAgLy8gcnVubmVyIGFsd2F5cyB3aW5zIHRoZSByZXNldCBldmVuIGlmIHRoZSBvdGhlciBydW5uZXIgc3RhcnRlZCBlYXJsaWVyXG4gICAgLy8gYW5kIHRoZXJlZm9yZSBzaG91bGQgd2luIHRoZSBhdHRyaWJ1dGUgYmF0dGxlXG4gICAgLy8gdGhpcyBjYW4gYmUgc29sdmVkIGJ5IHJlc2V0dGluZyB0aGVtIGJhY2t3YXJkc1xuICAgIGZvciAobGV0IGsgPSB0aGlzLl9ydW5uZXJzLmxlbmd0aDsgay0tOyApIHtcbiAgICAgIC8vIEdldCBhbmQgcnVuIHRoZSBjdXJyZW50IHJ1bm5lciBhbmQgaWdub3JlIGl0IGlmIGl0cyBpbmFjdGl2ZVxuICAgICAgY29uc3QgcnVubmVySW5mbyA9IHRoaXMuX3J1bm5lcnNba11cbiAgICAgIGNvbnN0IHJ1bm5lciA9IHJ1bm5lckluZm8ucnVubmVyXG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGdpdmUgdGhlIGFjdHVhbCBkaWZmZXJlbmNlXG4gICAgICAvLyBiZXR3ZWVuIHJ1bm5lciBzdGFydCB0aW1lIGFuZCBub3dcbiAgICAgIGNvbnN0IGR0VG9TdGFydCA9IHRoaXMuX3RpbWUgLSBydW5uZXJJbmZvLnN0YXJ0XG5cbiAgICAgIC8vIERvbnQgcnVuIHJ1bm5lciBpZiBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgIC8vIGFuZCB0cnkgdG8gcmVzZXQgaXRcbiAgICAgIGlmIChkdFRvU3RhcnQgPD0gMCkge1xuICAgICAgICBydW5uZXIucmVzZXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJ1biBhbGwgb2YgdGhlIHJ1bm5lcnMgZGlyZWN0bHlcbiAgICBsZXQgcnVubmVyc0xlZnQgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl9ydW5uZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAvLyBHZXQgYW5kIHJ1biB0aGUgY3VycmVudCBydW5uZXIgYW5kIGlnbm9yZSBpdCBpZiBpdHMgaW5hY3RpdmVcbiAgICAgIGNvbnN0IHJ1bm5lckluZm8gPSB0aGlzLl9ydW5uZXJzW2ldXG4gICAgICBjb25zdCBydW5uZXIgPSBydW5uZXJJbmZvLnJ1bm5lclxuICAgICAgbGV0IGR0ID0gZHRUaW1lXG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGdpdmUgdGhlIGFjdHVhbCBkaWZmZXJlbmNlXG4gICAgICAvLyBiZXR3ZWVuIHJ1bm5lciBzdGFydCB0aW1lIGFuZCBub3dcbiAgICAgIGNvbnN0IGR0VG9TdGFydCA9IHRoaXMuX3RpbWUgLSBydW5uZXJJbmZvLnN0YXJ0XG5cbiAgICAgIC8vIERvbnQgcnVuIHJ1bm5lciBpZiBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgIGlmIChkdFRvU3RhcnQgPD0gMCkge1xuICAgICAgICBydW5uZXJzTGVmdCA9IHRydWVcbiAgICAgICAgY29udGludWVcbiAgICAgIH0gZWxzZSBpZiAoZHRUb1N0YXJ0IDwgZHQpIHtcbiAgICAgICAgLy8gQWRqdXN0IGR0IHRvIG1ha2Ugc3VyZSB0aGF0IGFuaW1hdGlvbiBpcyBvbiBwb2ludFxuICAgICAgICBkdCA9IGR0VG9TdGFydFxuICAgICAgfVxuXG4gICAgICBpZiAoIXJ1bm5lci5hY3RpdmUoKSkgY29udGludWVcblxuICAgICAgLy8gSWYgdGhpcyBydW5uZXIgaXMgc3RpbGwgZ29pbmcsIHNpZ25hbCB0aGF0IHdlIG5lZWQgYW5vdGhlciBhbmltYXRpb25cbiAgICAgIC8vIGZyYW1lLCBvdGhlcndpc2UsIHJlbW92ZSB0aGUgY29tcGxldGVkIHJ1bm5lclxuICAgICAgY29uc3QgZmluaXNoZWQgPSBydW5uZXIuc3RlcChkdCkuZG9uZVxuICAgICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgICBydW5uZXJzTGVmdCA9IHRydWVcbiAgICAgICAgLy8gY29udGludWVcbiAgICAgIH0gZWxzZSBpZiAocnVubmVySW5mby5wZXJzaXN0ICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHJ1bm5lciBpcyBmaW5pc2hlZC4gQW5kIHJ1bm5lciBtaWdodCBnZXQgcmVtb3ZlZFxuICAgICAgICBjb25zdCBlbmRUaW1lID0gcnVubmVyLmR1cmF0aW9uKCkgLSBydW5uZXIudGltZSgpICsgdGhpcy5fdGltZVxuXG4gICAgICAgIGlmIChlbmRUaW1lICsgcnVubmVySW5mby5wZXJzaXN0IDwgdGhpcy5fdGltZSkge1xuICAgICAgICAgIC8vIERlbGV0ZSBydW5uZXIgYW5kIGNvcnJlY3QgaW5kZXhcbiAgICAgICAgICBydW5uZXIudW5zY2hlZHVsZSgpXG4gICAgICAgICAgLS1pXG4gICAgICAgICAgLS1sZW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJhc2ljYWxseTogd2UgY29udGludWUgd2hlbiB0aGVyZSBhcmUgcnVubmVycyByaWdodCBmcm9tIHVzIGluIHRpbWVcbiAgICAvLyB3aGVuIC0tPiwgYW5kIHdoZW4gcnVubmVycyBhcmUgbGVmdCBmcm9tIHVzIHdoZW4gPC0tXG4gICAgaWYgKFxuICAgICAgKHJ1bm5lcnNMZWZ0ICYmICEodGhpcy5fc3BlZWQgPCAwICYmIHRoaXMuX3RpbWUgPT09IDApKSB8fFxuICAgICAgKHRoaXMuX3J1bm5lcklkcy5sZW5ndGggJiYgdGhpcy5fc3BlZWQgPCAwICYmIHRoaXMuX3RpbWUgPiAwKVxuICAgICkge1xuICAgICAgdGhpcy5fY29udGludWUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMuZmlyZSgnZmluaXNoZWQnKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0ZXJtaW5hdGUoKSB7XG4gICAgLy8gY2xlYW51cCBtZW1vcnlcblxuICAgIC8vIFN0b3JlIHRoZSB0aW1pbmcgdmFyaWFibGVzXG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMFxuICAgIHRoaXMuX3NwZWVkID0gMS4wXG5cbiAgICAvLyBEZXRlcm1pbmVzIGhvdyBsb25nIGEgcnVubmVyIGlzIGhvbGQgaW4gbWVtb3J5LiBDYW4gYmUgYSBkdCBvciB0cnVlL2ZhbHNlXG4gICAgdGhpcy5fcGVyc2lzdCA9IDBcblxuICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIHJ1bm5pbmcgYW5pbWF0aW9ucyBhbmQgdGhlaXIgc3RhcnRpbmcgcGFyYW1ldGVyc1xuICAgIHRoaXMuX25leHRGcmFtZSA9IG51bGxcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlXG4gICAgdGhpcy5fcnVubmVycyA9IFtdXG4gICAgdGhpcy5fcnVubmVySWRzID0gW11cbiAgICB0aGlzLl9sYXN0UnVubmVySWQgPSAtMVxuICAgIHRoaXMuX3RpbWUgPSAwXG4gICAgdGhpcy5fbGFzdFNvdXJjZVRpbWUgPSAwXG4gICAgdGhpcy5fbGFzdFN0ZXBUaW1lID0gMFxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgc3RlcCBpcyBhbHdheXMgY2FsbGVkIGluIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLl9zdGVwID0gdGhpcy5fc3RlcEZuLmJpbmQodGhpcywgZmFsc2UpXG4gICAgdGhpcy5fc3RlcEltbWVkaWF0ZSA9IHRoaXMuX3N0ZXBGbi5iaW5kKHRoaXMsIHRydWUpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgRWxlbWVudDoge1xuICAgIHRpbWVsaW5lOiBmdW5jdGlvbiAodGltZWxpbmUpIHtcbiAgICAgIGlmICh0aW1lbGluZSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3RpbWVsaW5lID0gdGhpcy5fdGltZWxpbmUgfHwgbmV3IFRpbWVsaW5lKClcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVsaW5lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90aW1lbGluZSA9IHRpbWVsaW5lXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHtcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2ssXG4gIGV4dGVuZFxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuaW1wb3J0ICogYXMgY29udGFpbmVyR2VvbWV0cnkgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2NvbnRhaW5lckdlb21ldHJ5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdhJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gTGluayB0YXJnZXQgYXR0cmlidXRlXG4gIHRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd0YXJnZXQnLCB0YXJnZXQpXG4gIH1cblxuICAvLyBMaW5rIHVybFxuICB0byh1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgdXJsLCB4bGluaylcbiAgfVxufVxuXG5leHRlbmQoQSwgY29udGFpbmVyR2VvbWV0cnkpXG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBhIGh5cGVybGluayBlbGVtZW50XG4gICAgbGluazogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHVybCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBBKCkpLnRvKHVybClcbiAgICB9KVxuICB9LFxuICBFbGVtZW50OiB7XG4gICAgdW5saW5rKCkge1xuICAgICAgY29uc3QgbGluayA9IHRoaXMubGlua2VyKClcblxuICAgICAgaWYgKCFsaW5rKSByZXR1cm4gdGhpc1xuXG4gICAgICBjb25zdCBwYXJlbnQgPSBsaW5rLnBhcmVudCgpXG5cbiAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZSgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50LmluZGV4KGxpbmspXG4gICAgICBwYXJlbnQuYWRkKHRoaXMsIGluZGV4KVxuXG4gICAgICBsaW5rLnJlbW92ZSgpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgbGlua1RvKHVybCkge1xuICAgICAgLy8gcmV1c2Ugb2xkIGxpbmsgaWYgcG9zc2libGVcbiAgICAgIGxldCBsaW5rID0gdGhpcy5saW5rZXIoKVxuXG4gICAgICBpZiAoIWxpbmspIHtcbiAgICAgICAgbGluayA9IG5ldyBBKClcbiAgICAgICAgdGhpcy53cmFwKGxpbmspXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHVybC5jYWxsKGxpbmssIGxpbmspXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLnRvKHVybClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGxpbmtlcigpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLnBhcmVudCgpXG4gICAgICBpZiAobGluayAmJiBsaW5rLm5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgIHJldHVybiBsaW5rXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihBLCAnQScpXG4iLCJpbXBvcnQgeyBjeCwgY3ksIGhlaWdodCwgd2lkdGgsIHgsIHkgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcydcbmltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBTaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnY2lyY2xlJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgcmFkaXVzKHIpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdyJywgcilcbiAgfVxuXG4gIC8vIFJhZGl1cyB4IHZhbHVlXG4gIHJ4KHJ4KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cigncicsIHJ4KVxuICB9XG5cbiAgLy8gQWxpYXMgcmFkaXVzIHggdmFsdWVcbiAgcnkocnkpIHtcbiAgICByZXR1cm4gdGhpcy5yeChyeSlcbiAgfVxuXG4gIHNpemUoc2l6ZSkge1xuICAgIHJldHVybiB0aGlzLnJhZGl1cyhuZXcgU1ZHTnVtYmVyKHNpemUpLmRpdmlkZSgyKSlcbiAgfVxufVxuXG5leHRlbmQoQ2lyY2xlLCB7IHgsIHksIGN4LCBjeSwgd2lkdGgsIGhlaWdodCB9KVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgY2lyY2xlIGVsZW1lbnRcbiAgICBjaXJjbGU6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChzaXplID0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBDaXJjbGUoKSkuc2l6ZShzaXplKS5tb3ZlKDAsIDApXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoQ2lyY2xlLCAnQ2lyY2xlJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpcFBhdGggZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2NsaXBQYXRoJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gVW5jbGlwIGFsbCBjbGlwcGVkIGVsZW1lbnRzIGFuZCByZW1vdmUgaXRzZWxmXG4gIHJlbW92ZSgpIHtcbiAgICAvLyB1bmNsaXAgYWxsIHRhcmdldHNcbiAgICB0aGlzLnRhcmdldHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwudW5jbGlwKClcbiAgICB9KVxuXG4gICAgLy8gcmVtb3ZlIGNsaXBQYXRoIGZyb20gcGFyZW50XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZSgpXG4gIH1cblxuICB0YXJnZXRzKCkge1xuICAgIHJldHVybiBiYXNlRmluZCgnc3ZnIFtjbGlwLXBhdGgqPScgKyB0aGlzLmlkKCkgKyAnXScpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGNsaXBwaW5nIGVsZW1lbnRcbiAgICBjbGlwOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZzKCkucHV0KG5ldyBDbGlwUGF0aCgpKVxuICAgIH0pXG4gIH0sXG4gIEVsZW1lbnQ6IHtcbiAgICAvLyBEaXN0cmlidXRlIGNsaXBQYXRoIHRvIHN2ZyBlbGVtZW50XG4gICAgY2xpcHBlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZSgnY2xpcC1wYXRoJylcbiAgICB9LFxuXG4gICAgY2xpcFdpdGgoZWxlbWVudCkge1xuICAgICAgLy8gdXNlIGdpdmVuIGNsaXAgb3IgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgY29uc3QgY2xpcHBlciA9XG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBDbGlwUGF0aFxuICAgICAgICAgID8gZWxlbWVudFxuICAgICAgICAgIDogdGhpcy5wYXJlbnQoKS5jbGlwKCkuYWRkKGVsZW1lbnQpXG5cbiAgICAgIC8vIGFwcGx5IG1hc2tcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoIycgKyBjbGlwcGVyLmlkKCkgKyAnKScpXG4gICAgfSxcblxuICAgIC8vIFVuY2xpcCBlbGVtZW50XG4gICAgdW5jbGlwKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cignY2xpcC1wYXRoJywgbnVsbClcbiAgICB9XG4gIH1cbn0pXG5cbnJlZ2lzdGVyKENsaXBQYXRoLCAnQ2xpcFBhdGgnKVxuIiwiaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgZmxhdHRlbigpIHtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdHRlbigpLnVuZ3JvdXAoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5ncm91cChwYXJlbnQgPSB0aGlzLnBhcmVudCgpLCBpbmRleCA9IHBhcmVudC5pbmRleCh0aGlzKSkge1xuICAgIC8vIHdoZW4gcGFyZW50ICE9IHRoaXMsIHdlIHdhbnQgYXBwZW5kIGFsbCBlbGVtZW50cyB0byB0aGUgZW5kXG4gICAgaW5kZXggPSBpbmRleCA9PT0gLTEgPyBwYXJlbnQuY2hpbGRyZW4oKS5sZW5ndGggOiBpbmRleFxuXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBjaGlsZHJlbikge1xuICAgICAgLy8gcmV2ZXJzZSBlYWNoXG4gICAgICByZXR1cm4gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gaSAtIDFdLnRvUGFyZW50KHBhcmVudCwgaW5kZXgpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxucmVnaXN0ZXIoQ29udGFpbmVyLCAnQ29udGFpbmVyJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmcyBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnZGVmcycsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIGZsYXR0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVuZ3JvdXAoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5yZWdpc3RlcihEZWZzLCAnRGVmcycpXG4iLCJpbXBvcnQge1xuICBhZG9wdCxcbiAgYXNzaWduTmV3SWQsXG4gIGVpZCxcbiAgZXh0ZW5kLFxuICBtYWtlSW5zdGFuY2UsXG4gIGNyZWF0ZSxcbiAgcmVnaXN0ZXJcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGZpbmQsIGZpbmRPbmUgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBzdmcsIGh0bWwgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuLi90eXBlcy9FdmVudFRhcmdldC5qcydcbmltcG9ydCBMaXN0IGZyb20gJy4uL3R5cGVzL0xpc3QuanMnXG5pbXBvcnQgYXR0ciBmcm9tICcuLi9tb2R1bGVzL2NvcmUvYXR0ci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm5vZGUgPSBub2RlXG4gICAgdGhpcy50eXBlID0gbm9kZS5ub2RlTmFtZVxuXG4gICAgaWYgKGF0dHJzICYmIG5vZGUgIT09IGF0dHJzKSB7XG4gICAgICB0aGlzLmF0dHIoYXR0cnMpXG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIGdpdmVuIGVsZW1lbnQgYXQgYSBwb3NpdGlvblxuICBhZGQoZWxlbWVudCwgaSkge1xuICAgIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcblxuICAgIC8vIElmIG5vbi1yb290IHN2ZyBub2RlcyBhcmUgYWRkZWQgd2UgaGF2ZSB0byByZW1vdmUgdGhlaXIgbmFtZXNwYWNlc1xuICAgIGlmIChcbiAgICAgIGVsZW1lbnQucmVtb3ZlTmFtZXNwYWNlICYmXG4gICAgICB0aGlzLm5vZGUgaW5zdGFuY2VvZiBnbG9iYWxzLndpbmRvdy5TVkdFbGVtZW50XG4gICAgKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZU5hbWVzcGFjZSgpXG4gICAgfVxuXG4gICAgaWYgKGkgPT0gbnVsbCkge1xuICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGVsZW1lbnQubm9kZSlcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQubm9kZSAhPT0gdGhpcy5ub2RlLmNoaWxkTm9kZXNbaV0pIHtcbiAgICAgIHRoaXMubm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudC5ub2RlLCB0aGlzLm5vZGUuY2hpbGROb2Rlc1tpXSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQWRkIGVsZW1lbnQgdG8gZ2l2ZW4gY29udGFpbmVyIGFuZCByZXR1cm4gc2VsZlxuICBhZGRUbyhwYXJlbnQsIGkpIHtcbiAgICByZXR1cm4gbWFrZUluc3RhbmNlKHBhcmVudCkucHV0KHRoaXMsIGkpXG4gIH1cblxuICAvLyBSZXR1cm5zIGFsbCBjaGlsZCBlbGVtZW50c1xuICBjaGlsZHJlbigpIHtcbiAgICByZXR1cm4gbmV3IExpc3QoXG4gICAgICBtYXAodGhpcy5ub2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gYWRvcHQobm9kZSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLy8gUmVtb3ZlIGFsbCBlbGVtZW50cyBpbiB0aGlzIGNvbnRhaW5lclxuICBjbGVhcigpIHtcbiAgICAvLyByZW1vdmUgY2hpbGRyZW5cbiAgICB3aGlsZSAodGhpcy5ub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZS5sYXN0Q2hpbGQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIENsb25lIGVsZW1lbnRcbiAgY2xvbmUoZGVlcCA9IHRydWUsIGFzc2lnbk5ld0lkcyA9IHRydWUpIHtcbiAgICAvLyB3cml0ZSBkb20gZGF0YSB0byB0aGUgZG9tIHNvIHRoZSBjbG9uZSBjYW4gcGlja3VwIHRoZSBkYXRhXG4gICAgdGhpcy53cml0ZURhdGFUb0RvbSgpXG5cbiAgICAvLyBjbG9uZSBlbGVtZW50XG4gICAgbGV0IG5vZGVDbG9uZSA9IHRoaXMubm9kZS5jbG9uZU5vZGUoZGVlcClcbiAgICBpZiAoYXNzaWduTmV3SWRzKSB7XG4gICAgICAvLyBhc3NpZ24gbmV3IGlkXG4gICAgICBub2RlQ2xvbmUgPSBhc3NpZ25OZXdJZChub2RlQ2xvbmUpXG4gICAgfVxuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub2RlQ2xvbmUpXG4gIH1cblxuICAvLyBJdGVyYXRlcyBvdmVyIGFsbCBjaGlsZHJlbiBhbmQgaW52b2tlcyBhIGdpdmVuIGJsb2NrXG4gIGVhY2goYmxvY2ssIGRlZXApIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4oKVxuICAgIGxldCBpLCBpbFxuXG4gICAgZm9yIChpID0gMCwgaWwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBibG9jay5hcHBseShjaGlsZHJlbltpXSwgW2ksIGNoaWxkcmVuXSlcblxuICAgICAgaWYgKGRlZXApIHtcbiAgICAgICAgY2hpbGRyZW5baV0uZWFjaChibG9jaywgZGVlcClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZWxlbWVudChub2RlTmFtZSwgYXR0cnMpIHtcbiAgICByZXR1cm4gdGhpcy5wdXQobmV3IERvbShjcmVhdGUobm9kZU5hbWUpLCBhdHRycykpXG4gIH1cblxuICAvLyBHZXQgZmlyc3QgY2hpbGRcbiAgZmlyc3QoKSB7XG4gICAgcmV0dXJuIGFkb3B0KHRoaXMubm9kZS5maXJzdENoaWxkKVxuICB9XG5cbiAgLy8gR2V0IGEgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXhcbiAgZ2V0KGkpIHtcbiAgICByZXR1cm4gYWRvcHQodGhpcy5ub2RlLmNoaWxkTm9kZXNbaV0pXG4gIH1cblxuICBnZXRFdmVudEhvbGRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlXG4gIH1cblxuICBnZXRFdmVudFRhcmdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlXG4gIH1cblxuICAvLyBDaGVja3MgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgYSBjaGlsZFxuICBoYXMoZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4KGVsZW1lbnQpID49IDBcbiAgfVxuXG4gIGh0bWwoaHRtbE9yRm4sIG91dGVySFRNTCkge1xuICAgIHJldHVybiB0aGlzLnhtbChodG1sT3JGbiwgb3V0ZXJIVE1MLCBodG1sKVxuICB9XG5cbiAgLy8gR2V0IC8gc2V0IGlkXG4gIGlkKGlkKSB7XG4gICAgLy8gZ2VuZXJhdGUgbmV3IGlkIGlmIG5vIGlkIHNldFxuICAgIGlmICh0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnICYmICF0aGlzLm5vZGUuaWQpIHtcbiAgICAgIHRoaXMubm9kZS5pZCA9IGVpZCh0aGlzLnR5cGUpXG4gICAgfVxuXG4gICAgLy8gZG9uJ3Qgc2V0IGRpcmVjdGx5IHdpdGggdGhpcy5ub2RlLmlkIHRvIG1ha2UgYG51bGxgIHdvcmsgY29ycmVjdGx5XG4gICAgcmV0dXJuIHRoaXMuYXR0cignaWQnLCBpZClcbiAgfVxuXG4gIC8vIEdldHMgaW5kZXggb2YgZ2l2ZW4gZWxlbWVudFxuICBpbmRleChlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwodGhpcy5ub2RlLmNoaWxkTm9kZXMpLmluZGV4T2YoZWxlbWVudC5ub2RlKVxuICB9XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGNoaWxkXG4gIGxhc3QoKSB7XG4gICAgcmV0dXJuIGFkb3B0KHRoaXMubm9kZS5sYXN0Q2hpbGQpXG4gIH1cblxuICAvLyBtYXRjaGVzIHRoZSBlbGVtZW50IHZzIGEgY3NzIHNlbGVjdG9yXG4gIG1hdGNoZXMoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMubm9kZVxuICAgIGNvbnN0IG1hdGNoZXIgPVxuICAgICAgZWwubWF0Y2hlcyB8fFxuICAgICAgZWwubWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICBlbC5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgIGVsLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgIG51bGxcbiAgICByZXR1cm4gbWF0Y2hlciAmJiBtYXRjaGVyLmNhbGwoZWwsIHNlbGVjdG9yKVxuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgcGFyZW50IGVsZW1lbnQgaW5zdGFuY2VcbiAgcGFyZW50KHR5cGUpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpc1xuXG4gICAgLy8gY2hlY2sgZm9yIHBhcmVudFxuICAgIGlmICghcGFyZW50Lm5vZGUucGFyZW50Tm9kZSkgcmV0dXJuIG51bGxcblxuICAgIC8vIGdldCBwYXJlbnQgZWxlbWVudFxuICAgIHBhcmVudCA9IGFkb3B0KHBhcmVudC5ub2RlLnBhcmVudE5vZGUpXG5cbiAgICBpZiAoIXR5cGUpIHJldHVybiBwYXJlbnRcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbmNlc3RvcnMgaWYgdHlwZSBpcyBnaXZlblxuICAgIGRvIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50Lm1hdGNoZXModHlwZSkgOiBwYXJlbnQgaW5zdGFuY2VvZiB0eXBlXG4gICAgICApXG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICB9IHdoaWxlICgocGFyZW50ID0gYWRvcHQocGFyZW50Lm5vZGUucGFyZW50Tm9kZSkpKVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgLy8gQmFzaWNhbGx5IGRvZXMgdGhlIHNhbWUgYXMgYGFkZCgpYCBidXQgcmV0dXJucyB0aGUgYWRkZWQgZWxlbWVudCBpbnN0ZWFkXG4gIHB1dChlbGVtZW50LCBpKSB7XG4gICAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxuICAgIHRoaXMuYWRkKGVsZW1lbnQsIGkpXG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG4gIC8vIEFkZCBlbGVtZW50IHRvIGdpdmVuIGNvbnRhaW5lciBhbmQgcmV0dXJuIGNvbnRhaW5lclxuICBwdXRJbihwYXJlbnQsIGkpIHtcbiAgICByZXR1cm4gbWFrZUluc3RhbmNlKHBhcmVudCkuYWRkKHRoaXMsIGkpXG4gIH1cblxuICAvLyBSZW1vdmUgZWxlbWVudFxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KCkpIHtcbiAgICAgIHRoaXMucGFyZW50KCkucmVtb3ZlRWxlbWVudCh0aGlzKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBSZW1vdmUgYSBnaXZlbiBjaGlsZFxuICByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudC5ub2RlKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFJlcGxhY2UgdGhpcyB3aXRoIGVsZW1lbnRcbiAgcmVwbGFjZShlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxuXG4gICAgaWYgKHRoaXMubm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLm5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZWxlbWVudC5ub2RlLCB0aGlzLm5vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG4gIHJvdW5kKHByZWNpc2lvbiA9IDIsIG1hcCA9IG51bGwpIHtcbiAgICBjb25zdCBmYWN0b3IgPSAxMCAqKiBwcmVjaXNpb25cbiAgICBjb25zdCBhdHRycyA9IHRoaXMuYXR0cihtYXApXG5cbiAgICBmb3IgKGNvbnN0IGkgaW4gYXR0cnMpIHtcbiAgICAgIGlmICh0eXBlb2YgYXR0cnNbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGF0dHJzW2ldID0gTWF0aC5yb3VuZChhdHRyc1tpXSAqIGZhY3RvcikgLyBmYWN0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmF0dHIoYXR0cnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEltcG9ydCAvIEV4cG9ydCByYXcgc3ZnXG4gIHN2ZyhzdmdPckZuLCBvdXRlclNWRykge1xuICAgIHJldHVybiB0aGlzLnhtbChzdmdPckZuLCBvdXRlclNWRywgc3ZnKVxuICB9XG5cbiAgLy8gUmV0dXJuIGlkIG9uIHN0cmluZyBjb252ZXJzaW9uXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmlkKClcbiAgfVxuXG4gIHdvcmRzKHRleHQpIHtcbiAgICAvLyBUaGlzIGlzIGZhc3RlciB0aGFuIHJlbW92aW5nIGFsbCBjaGlsZHJlbiBhbmQgYWRkaW5nIGEgbmV3IG9uZVxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IHRleHRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgd3JhcChub2RlKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnQoKVxuXG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRvKG5vZGUpXG4gICAgfVxuXG4gICAgY29uc3QgcG9zaXRpb24gPSBwYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gcGFyZW50LnB1dChub2RlLCBwb3NpdGlvbikucHV0KHRoaXMpXG4gIH1cblxuICAvLyB3cml0ZSBzdmdqcyBkYXRhIHRvIHRoZSBkb21cbiAgd3JpdGVEYXRhVG9Eb20oKSB7XG4gICAgLy8gZHVtcCB2YXJpYWJsZXMgcmVjdXJzaXZlbHlcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy53cml0ZURhdGFUb0RvbSgpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBJbXBvcnQgLyBFeHBvcnQgcmF3IHN2Z1xuICB4bWwoeG1sT3JGbiwgb3V0ZXJYTUwsIG5zKSB7XG4gICAgaWYgKHR5cGVvZiB4bWxPckZuID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5zID0gb3V0ZXJYTUxcbiAgICAgIG91dGVyWE1MID0geG1sT3JGblxuICAgICAgeG1sT3JGbiA9IG51bGxcbiAgICB9XG5cbiAgICAvLyBhY3QgYXMgZ2V0dGVyIGlmIG5vIHN2ZyBzdHJpbmcgaXMgZ2l2ZW5cbiAgICBpZiAoeG1sT3JGbiA9PSBudWxsIHx8IHR5cGVvZiB4bWxPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBUaGUgZGVmYXVsdCBmb3IgZXhwb3J0cyBpcywgdGhhdCB0aGUgb3V0ZXJOb2RlIGlzIGluY2x1ZGVkXG4gICAgICBvdXRlclhNTCA9IG91dGVyWE1MID09IG51bGwgPyB0cnVlIDogb3V0ZXJYTUxcblxuICAgICAgLy8gd3JpdGUgc3ZnanMgZGF0YSB0byB0aGUgZG9tXG4gICAgICB0aGlzLndyaXRlRGF0YVRvRG9tKClcbiAgICAgIGxldCBjdXJyZW50ID0gdGhpc1xuXG4gICAgICAvLyBBbiBleHBvcnQgbW9kaWZpZXIgd2FzIHBhc3NlZFxuICAgICAgaWYgKHhtbE9yRm4gIT0gbnVsbCkge1xuICAgICAgICBjdXJyZW50ID0gYWRvcHQoY3VycmVudC5ub2RlLmNsb25lTm9kZSh0cnVlKSlcblxuICAgICAgICAvLyBJZiB0aGUgdXNlciB3YW50cyBvdXRlckhUTUwgd2UgbmVlZCB0byBwcm9jZXNzIHRoaXMgbm9kZSwgdG9vXG4gICAgICAgIGlmIChvdXRlclhNTCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHhtbE9yRm4oY3VycmVudClcbiAgICAgICAgICBjdXJyZW50ID0gcmVzdWx0IHx8IGN1cnJlbnRcblxuICAgICAgICAgIC8vIFRoZSB1c2VyIGRvZXMgbm90IHdhbnQgdGhpcyBub2RlPyBXZWxsLCB0aGVuIGhlIGdldHMgbm90aGluZ1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSByZXR1cm4gJydcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZXAgbG9vcCB0aHJvdWdoIGFsbCBjaGlsZHJlbiBhbmQgYXBwbHkgbW9kaWZpZXJcbiAgICAgICAgY3VycmVudC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB4bWxPckZuKHRoaXMpXG4gICAgICAgICAgY29uc3QgX3RoaXMgPSByZXN1bHQgfHwgdGhpc1xuXG4gICAgICAgICAgLy8gSWYgbW9kaWZpZXIgcmV0dXJucyBmYWxzZSwgZGlzY2FyZCBub2RlXG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcblxuICAgICAgICAgICAgLy8gSWYgbW9kaWZpZXIgcmV0dXJucyBuZXcgbm9kZSwgdXNlIGl0XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgJiYgdGhpcyAhPT0gX3RoaXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZShfdGhpcylcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpXG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBvdXRlciBvciBpbm5lciBjb250ZW50XG4gICAgICByZXR1cm4gb3V0ZXJYTUwgPyBjdXJyZW50Lm5vZGUub3V0ZXJIVE1MIDogY3VycmVudC5ub2RlLmlubmVySFRNTFxuICAgIH1cblxuICAgIC8vIEFjdCBhcyBzZXR0ZXIgaWYgd2UgZ290IGEgc3RyaW5nXG5cbiAgICAvLyBUaGUgZGVmYXVsdCBmb3IgaW1wb3J0IGlzLCB0aGF0IHRoZSBjdXJyZW50IG5vZGUgaXMgbm90IHJlcGxhY2VkXG4gICAgb3V0ZXJYTUwgPSBvdXRlclhNTCA9PSBudWxsID8gZmFsc2UgOiBvdXRlclhNTFxuXG4gICAgLy8gQ3JlYXRlIHRlbXBvcmFyeSBob2xkZXJcbiAgICBjb25zdCB3ZWxsID0gY3JlYXRlKCd3cmFwcGVyJywgbnMpXG4gICAgY29uc3QgZnJhZ21lbnQgPSBnbG9iYWxzLmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgLy8gRHVtcCByYXcgc3ZnXG4gICAgd2VsbC5pbm5lckhUTUwgPSB4bWxPckZuXG5cbiAgICAvLyBUcmFuc3BsYW50IG5vZGVzIGludG8gdGhlIGZyYWdtZW50XG4gICAgZm9yIChsZXQgbGVuID0gd2VsbC5jaGlsZHJlbi5sZW5ndGg7IGxlbi0tOyApIHtcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHdlbGwuZmlyc3RFbGVtZW50Q2hpbGQpXG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnQoKVxuXG4gICAgLy8gQWRkIHRoZSB3aG9sZSBmcmFnbWVudCBhdCBvbmNlXG4gICAgcmV0dXJuIG91dGVyWE1MID8gdGhpcy5yZXBsYWNlKGZyYWdtZW50KSAmJiBwYXJlbnQgOiB0aGlzLmFkZChmcmFnbWVudClcbiAgfVxufVxuXG5leHRlbmQoRG9tLCB7IGF0dHIsIGZpbmQsIGZpbmRPbmUgfSlcbnJlZ2lzdGVyKERvbSwgJ0RvbScpXG4iLCJpbXBvcnQgeyBiYm94LCByYm94LCBpbnNpZGUgfSBmcm9tICcuLi90eXBlcy9Cb3guanMnXG5pbXBvcnQgeyBjdG0sIHNjcmVlbkNUTSB9IGZyb20gJy4uL3R5cGVzL01hdHJpeC5qcydcbmltcG9ydCB7XG4gIGV4dGVuZCxcbiAgZ2V0Q2xhc3MsXG4gIG1ha2VJbnN0YW5jZSxcbiAgcmVnaXN0ZXIsXG4gIHJvb3Rcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5pbXBvcnQgeyBwb2ludCB9IGZyb20gJy4uL3R5cGVzL1BvaW50LmpzJ1xuaW1wb3J0IHsgcHJvcG9ydGlvbmFsU2l6ZSwgd3JpdGVEYXRhVG9Eb20gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHJlZmVyZW5jZSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcbmltcG9ydCBEb20gZnJvbSAnLi9Eb20uanMnXG5pbXBvcnQgTGlzdCBmcm9tICcuLi90eXBlcy9MaXN0LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBEb20ge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycykge1xuICAgIHN1cGVyKG5vZGUsIGF0dHJzKVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBkYXRhIG9iamVjdFxuICAgIHRoaXMuZG9tID0ge31cblxuICAgIC8vIGNyZWF0ZSBjaXJjdWxhciByZWZlcmVuY2VcbiAgICB0aGlzLm5vZGUuaW5zdGFuY2UgPSB0aGlzXG5cbiAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3ZnanMnKSB8fCBub2RlLmhhc0F0dHJpYnV0ZSgnc3ZnanM6ZGF0YScpKSB7XG4gICAgICAvLyBwdWxsIHN2Z2pzIGRhdGEgZnJvbSB0aGUgZG9tIChnZXRBdHRyaWJ1dGVOUyBkb2Vzbid0IHdvcmsgaW4gaHRtbDUpXG4gICAgICB0aGlzLnNldERhdGEoXG4gICAgICAgIEpTT04ucGFyc2Uobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ZnanMnKSkgPz9cbiAgICAgICAgICBKU09OLnBhcnNlKG5vZGUuZ2V0QXR0cmlidXRlKCdzdmdqczpkYXRhJykpID8/XG4gICAgICAgICAge31cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvLyBNb3ZlIGVsZW1lbnQgYnkgaXRzIGNlbnRlclxuICBjZW50ZXIoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmN4KHgpLmN5KHkpXG4gIH1cblxuICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHgtYXhpc1xuICBjeCh4KSB7XG4gICAgcmV0dXJuIHggPT0gbnVsbFxuICAgICAgPyB0aGlzLngoKSArIHRoaXMud2lkdGgoKSAvIDJcbiAgICAgIDogdGhpcy54KHggLSB0aGlzLndpZHRoKCkgLyAyKVxuICB9XG5cbiAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB5LWF4aXNcbiAgY3koeSkge1xuICAgIHJldHVybiB5ID09IG51bGxcbiAgICAgID8gdGhpcy55KCkgKyB0aGlzLmhlaWdodCgpIC8gMlxuICAgICAgOiB0aGlzLnkoeSAtIHRoaXMuaGVpZ2h0KCkgLyAyKVxuICB9XG5cbiAgLy8gR2V0IGRlZnNcbiAgZGVmcygpIHtcbiAgICBjb25zdCByb290ID0gdGhpcy5yb290KClcbiAgICByZXR1cm4gcm9vdCAmJiByb290LmRlZnMoKVxuICB9XG5cbiAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHggYW5kIHkgYXhlc1xuICBkbW92ZSh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuZHgoeCkuZHkoeSlcbiAgfVxuXG4gIC8vIFJlbGF0aXZlIG1vdmUgb3ZlciB4IGF4aXNcbiAgZHgoeCA9IDApIHtcbiAgICByZXR1cm4gdGhpcy54KG5ldyBTVkdOdW1iZXIoeCkucGx1cyh0aGlzLngoKSkpXG4gIH1cblxuICAvLyBSZWxhdGl2ZSBtb3ZlIG92ZXIgeSBheGlzXG4gIGR5KHkgPSAwKSB7XG4gICAgcmV0dXJuIHRoaXMueShuZXcgU1ZHTnVtYmVyKHkpLnBsdXModGhpcy55KCkpKVxuICB9XG5cbiAgZ2V0RXZlbnRIb2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxuICBoZWlnaHQoaGVpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICB9XG5cbiAgLy8gTW92ZSBlbGVtZW50IHRvIGdpdmVuIHggYW5kIHkgdmFsdWVzXG4gIG1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLngoeCkueSh5KVxuICB9XG5cbiAgLy8gcmV0dXJuIGFycmF5IG9mIGFsbCBhbmNlc3RvcnMgb2YgZ2l2ZW4gdHlwZSB1cCB0byB0aGUgcm9vdCBzdmdcbiAgcGFyZW50cyh1bnRpbCA9IHRoaXMucm9vdCgpKSB7XG4gICAgY29uc3QgaXNTZWxlY3RvciA9IHR5cGVvZiB1bnRpbCA9PT0gJ3N0cmluZydcbiAgICBpZiAoIWlzU2VsZWN0b3IpIHtcbiAgICAgIHVudGlsID0gbWFrZUluc3RhbmNlKHVudGlsKVxuICAgIH1cbiAgICBjb25zdCBwYXJlbnRzID0gbmV3IExpc3QoKVxuICAgIGxldCBwYXJlbnQgPSB0aGlzXG5cbiAgICB3aGlsZSAoXG4gICAgICAocGFyZW50ID0gcGFyZW50LnBhcmVudCgpKSAmJlxuICAgICAgcGFyZW50Lm5vZGUgIT09IGdsb2JhbHMuZG9jdW1lbnQgJiZcbiAgICAgIHBhcmVudC5ub2RlTmFtZSAhPT0gJyNkb2N1bWVudC1mcmFnbWVudCdcbiAgICApIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpXG5cbiAgICAgIGlmICghaXNTZWxlY3RvciAmJiBwYXJlbnQubm9kZSA9PT0gdW50aWwubm9kZSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgaWYgKGlzU2VsZWN0b3IgJiYgcGFyZW50Lm1hdGNoZXModW50aWwpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBpZiAocGFyZW50Lm5vZGUgPT09IHRoaXMucm9vdCgpLm5vZGUpIHtcbiAgICAgICAgLy8gV2Ugd29ya2VkIG91ciB3YXkgdG8gdGhlIHJvb3QgYW5kIGRpZG4ndCBtYXRjaCBgdW50aWxgXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHNcbiAgfVxuXG4gIC8vIEdldCByZWZlcmVuY2VkIGVsZW1lbnQgZm9ybSBhdHRyaWJ1dGUgdmFsdWVcbiAgcmVmZXJlbmNlKGF0dHIpIHtcbiAgICBhdHRyID0gdGhpcy5hdHRyKGF0dHIpXG4gICAgaWYgKCFhdHRyKSByZXR1cm4gbnVsbFxuXG4gICAgY29uc3QgbSA9IChhdHRyICsgJycpLm1hdGNoKHJlZmVyZW5jZSlcbiAgICByZXR1cm4gbSA/IG1ha2VJbnN0YW5jZShtWzFdKSA6IG51bGxcbiAgfVxuXG4gIC8vIEdldCBwYXJlbnQgZG9jdW1lbnRcbiAgcm9vdCgpIHtcbiAgICBjb25zdCBwID0gdGhpcy5wYXJlbnQoZ2V0Q2xhc3Mocm9vdCkpXG4gICAgcmV0dXJuIHAgJiYgcC5yb290KClcbiAgfVxuXG4gIC8vIHNldCBnaXZlbiBkYXRhIHRvIHRoZSBlbGVtZW50cyBkYXRhIHByb3BlcnR5XG4gIHNldERhdGEobykge1xuICAgIHRoaXMuZG9tID0gb1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodClcblxuICAgIHJldHVybiB0aGlzLndpZHRoKG5ldyBTVkdOdW1iZXIocC53aWR0aCkpLmhlaWdodChuZXcgU1ZHTnVtYmVyKHAuaGVpZ2h0KSlcbiAgfVxuXG4gIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XG4gIHdpZHRoKHdpZHRoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgfVxuXG4gIC8vIHdyaXRlIHN2Z2pzIGRhdGEgdG8gdGhlIGRvbVxuICB3cml0ZURhdGFUb0RvbSgpIHtcbiAgICB3cml0ZURhdGFUb0RvbSh0aGlzLCB0aGlzLmRvbSlcbiAgICByZXR1cm4gc3VwZXIud3JpdGVEYXRhVG9Eb20oKVxuICB9XG5cbiAgLy8gTW92ZSBvdmVyIHgtYXhpc1xuICB4KHgpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgeClcbiAgfVxuXG4gIC8vIE1vdmUgb3ZlciB5LWF4aXNcbiAgeSh5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cigneScsIHkpXG4gIH1cbn1cblxuZXh0ZW5kKEVsZW1lbnQsIHtcbiAgYmJveCxcbiAgcmJveCxcbiAgaW5zaWRlLFxuICBwb2ludCxcbiAgY3RtLFxuICBzY3JlZW5DVE1cbn0pXG5cbnJlZ2lzdGVyKEVsZW1lbnQsICdFbGVtZW50JylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuaW1wb3J0ICogYXMgY2lyY2xlZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIFNoYXBlIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdlbGxpcHNlJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodClcblxuICAgIHJldHVybiB0aGlzLnJ4KG5ldyBTVkdOdW1iZXIocC53aWR0aCkuZGl2aWRlKDIpKS5yeShcbiAgICAgIG5ldyBTVkdOdW1iZXIocC5oZWlnaHQpLmRpdmlkZSgyKVxuICAgIClcbiAgfVxufVxuXG5leHRlbmQoRWxsaXBzZSwgY2lyY2xlZClcblxucmVnaXN0ZXJNZXRob2RzKCdDb250YWluZXInLCB7XG4gIC8vIENyZWF0ZSBhbiBlbGxpcHNlXG4gIGVsbGlwc2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh3aWR0aCA9IDAsIGhlaWdodCA9IHdpZHRoKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBFbGxpcHNlKCkpLnNpemUod2lkdGgsIGhlaWdodCkubW92ZSgwLCAwKVxuICB9KVxufSlcblxucmVnaXN0ZXIoRWxsaXBzZSwgJ0VsbGlwc2UnKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZWlnbk9iamVjdCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2ZvcmVpZ25PYmplY3QnLCBub2RlKSwgYXR0cnMpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgZm9yZWlnbk9iamVjdDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgRm9yZWlnbk9iamVjdCgpKS5zaXplKHdpZHRoLCBoZWlnaHQpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoRm9yZWlnbk9iamVjdCwgJ0ZvcmVpZ25PYmplY3QnKVxuIiwiaW1wb3J0IERvbSBmcm9tICcuL0RvbS5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5pbXBvcnQgeyByZWdpc3RlciwgY3JlYXRlIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcblxuY2xhc3MgRnJhZ21lbnQgZXh0ZW5kcyBEb20ge1xuICBjb25zdHJ1Y3Rvcihub2RlID0gZ2xvYmFscy5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpIHtcbiAgICBzdXBlcihub2RlKVxuICB9XG5cbiAgLy8gSW1wb3J0IC8gRXhwb3J0IHJhdyB4bWxcbiAgeG1sKHhtbE9yRm4sIG91dGVyWE1MLCBucykge1xuICAgIGlmICh0eXBlb2YgeG1sT3JGbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBucyA9IG91dGVyWE1MXG4gICAgICBvdXRlclhNTCA9IHhtbE9yRm5cbiAgICAgIHhtbE9yRm4gPSBudWxsXG4gICAgfVxuXG4gICAgLy8gYmVjYXVzZSB0aGlzIGlzIGEgZnJhZ21lbnQgd2UgaGF2ZSB0byBwdXQgYWxsIGVsZW1lbnRzIGludG8gYSB3cmFwcGVyIGZpcnN0XG4gICAgLy8gYmVmb3JlIHdlIGNhbiBnZXQgdGhlIGlubmVyWE1MIGZyb20gaXRcbiAgICBpZiAoeG1sT3JGbiA9PSBudWxsIHx8IHR5cGVvZiB4bWxPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gbmV3IERvbShjcmVhdGUoJ3dyYXBwZXInLCBucykpXG4gICAgICB3cmFwcGVyLmFkZCh0aGlzLm5vZGUuY2xvbmVOb2RlKHRydWUpKVxuXG4gICAgICByZXR1cm4gd3JhcHBlci54bWwoZmFsc2UsIG5zKVxuICAgIH1cblxuICAgIC8vIEFjdCBhcyBzZXR0ZXIgaWYgd2UgZ290IGEgc3RyaW5nXG4gICAgcmV0dXJuIHN1cGVyLnhtbCh4bWxPckZuLCBmYWxzZSwgbnMpXG4gIH1cbn1cblxucmVnaXN0ZXIoRnJhZ21lbnQsICdGcmFnbWVudCcpXG5cbmV4cG9ydCBkZWZhdWx0IEZyYWdtZW50XG4iLCJpbXBvcnQge1xuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVjayxcbiAgZXh0ZW5kXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcbmltcG9ydCAqIGFzIGNvbnRhaW5lckdlb21ldHJ5IGZyb20gJy4uL21vZHVsZXMvY29yZS9jb250YWluZXJHZW9tZXRyeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRyBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnZycsIG5vZGUpLCBhdHRycylcbiAgfVxufVxuXG5leHRlbmQoRywgY29udGFpbmVyR2VvbWV0cnkpXG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIENvbnRhaW5lcjoge1xuICAgIC8vIENyZWF0ZSBhIGdyb3VwIGVsZW1lbnRcbiAgICBncm91cDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBHKCkpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoRywgJ0cnKVxuIiwiaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVja1xufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi4vdHlwZXMvQm94LmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcbmltcG9ydCBiYXNlRmluZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXG5pbXBvcnQgKiBhcyBncmFkaWVudGVkIGZyb20gJy4uL21vZHVsZXMvY29yZS9ncmFkaWVudGVkLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFkaWVudCBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJzKSB7XG4gICAgc3VwZXIoXG4gICAgICBub2RlT3JOZXcodHlwZSArICdHcmFkaWVudCcsIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IG51bGwgOiB0eXBlKSxcbiAgICAgIGF0dHJzXG4gICAgKVxuICB9XG5cbiAgLy8gY3VzdG9tIGF0dHIgdG8gaGFuZGxlIHRyYW5zZm9ybVxuICBhdHRyKGEsIGIsIGMpIHtcbiAgICBpZiAoYSA9PT0gJ3RyYW5zZm9ybScpIGEgPSAnZ3JhZGllbnRUcmFuc2Zvcm0nXG4gICAgcmV0dXJuIHN1cGVyLmF0dHIoYSwgYiwgYylcbiAgfVxuXG4gIGJib3goKSB7XG4gICAgcmV0dXJuIG5ldyBCb3goKVxuICB9XG5cbiAgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gYmFzZUZpbmQoJ3N2ZyBbZmlsbCo9JyArIHRoaXMuaWQoKSArICddJylcbiAgfVxuXG4gIC8vIEFsaWFzIHN0cmluZyBjb252ZXJzaW9uIHRvIGZpbGxcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsKClcbiAgfVxuXG4gIC8vIFVwZGF0ZSBncmFkaWVudFxuICB1cGRhdGUoYmxvY2spIHtcbiAgICAvLyByZW1vdmUgYWxsIHN0b3BzXG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICAvLyBpbnZva2UgcGFzc2VkIGJsb2NrXG4gICAgaWYgKHR5cGVvZiBibG9jayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYmxvY2suY2FsbCh0aGlzLCB0aGlzKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcbiAgdXJsKCkge1xuICAgIHJldHVybiAndXJsKCMnICsgdGhpcy5pZCgpICsgJyknXG4gIH1cbn1cblxuZXh0ZW5kKEdyYWRpZW50LCBncmFkaWVudGVkKVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgZ3JhZGllbnQgZWxlbWVudCBpbiBkZWZzXG4gICAgZ3JhZGllbnQoLi4uYXJncykge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLmdyYWRpZW50KC4uLmFyZ3MpXG4gICAgfVxuICB9LFxuICAvLyBkZWZpbmUgZ3JhZGllbnRcbiAgRGVmczoge1xuICAgIGdyYWRpZW50OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodHlwZSwgYmxvY2spIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgR3JhZGllbnQodHlwZSkpLnVwZGF0ZShibG9jaylcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihHcmFkaWVudCwgJ0dyYWRpZW50JylcbiIsImltcG9ydCB7IGlzSW1hZ2UgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyBvZmYsIG9uIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJBdHRySG9vayB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9hdHRyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgUGF0dGVybiBmcm9tICcuL1BhdHRlcm4uanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlIGV4dGVuZHMgU2hhcGUge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2ltYWdlJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gKHJlKWxvYWQgaW1hZ2VcbiAgbG9hZCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF1cmwpIHJldHVybiB0aGlzXG5cbiAgICBjb25zdCBpbWcgPSBuZXcgZ2xvYmFscy53aW5kb3cuSW1hZ2UoKVxuXG4gICAgb24oXG4gICAgICBpbWcsXG4gICAgICAnbG9hZCcsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5wYXJlbnQoUGF0dGVybilcblxuICAgICAgICAvLyBlbnN1cmUgaW1hZ2Ugc2l6ZVxuICAgICAgICBpZiAodGhpcy53aWR0aCgpID09PSAwICYmIHRoaXMuaGVpZ2h0KCkgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNpemUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG4gICAgICAgICAgLy8gZW5zdXJlIHBhdHRlcm4gc2l6ZSBpZiBub3Qgc2V0XG4gICAgICAgICAgaWYgKHAud2lkdGgoKSA9PT0gMCAmJiBwLmhlaWdodCgpID09PSAwKSB7XG4gICAgICAgICAgICBwLnNpemUodGhpcy53aWR0aCgpLCB0aGlzLmhlaWdodCgpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0aGlzXG4gICAgKVxuXG4gICAgb24oaW1nLCAnbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGRvbnQgZm9yZ2V0IHRvIHVuYmluZCBtZW1vcnkgbGVha2luZyBldmVudHNcbiAgICAgIG9mZihpbWcpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2hyZWYnLCAoaW1nLnNyYyA9IHVybCksIHhsaW5rKVxuICB9XG59XG5cbnJlZ2lzdGVyQXR0ckhvb2soZnVuY3Rpb24gKGF0dHIsIHZhbCwgX3RoaXMpIHtcbiAgLy8gY29udmVydCBpbWFnZSBmaWxsIGFuZCBzdHJva2UgdG8gcGF0dGVybnNcbiAgaWYgKGF0dHIgPT09ICdmaWxsJyB8fCBhdHRyID09PSAnc3Ryb2tlJykge1xuICAgIGlmIChpc0ltYWdlLnRlc3QodmFsKSkge1xuICAgICAgdmFsID0gX3RoaXMucm9vdCgpLmRlZnMoKS5pbWFnZSh2YWwpXG4gICAgfVxuICB9XG5cbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEltYWdlKSB7XG4gICAgdmFsID0gX3RoaXNcbiAgICAgIC5yb290KClcbiAgICAgIC5kZWZzKClcbiAgICAgIC5wYXR0ZXJuKDAsIDAsIChwYXR0ZXJuKSA9PiB7XG4gICAgICAgIHBhdHRlcm4uYWRkKHZhbClcbiAgICAgIH0pXG4gIH1cblxuICByZXR1cm4gdmFsXG59KVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgZWxlbWVudCwgbG9hZCBpbWFnZSBhbmQgc2V0IGl0cyBzaXplXG4gICAgaW1hZ2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChzb3VyY2UsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IEltYWdlKCkpLnNpemUoMCwgMCkubG9hZChzb3VyY2UsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKEltYWdlLCAnSW1hZ2UnKVxuIiwiaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVja1xufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcHJvcG9ydGlvbmFsU2l6ZSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcbmltcG9ydCAqIGFzIHBvaW50ZWQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvaW50ZWQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUgZXh0ZW5kcyBTaGFwZSB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ2xpbmUnLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICAvLyBHZXQgYXJyYXlcbiAgYXJyYXkoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludEFycmF5KFtcbiAgICAgIFt0aGlzLmF0dHIoJ3gxJyksIHRoaXMuYXR0cigneTEnKV0sXG4gICAgICBbdGhpcy5hdHRyKCd4MicpLCB0aGlzLmF0dHIoJ3kyJyldXG4gICAgXSlcbiAgfVxuXG4gIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyXG4gIG1vdmUoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmF0dHIodGhpcy5hcnJheSgpLm1vdmUoeCwgeSkudG9MaW5lKCkpXG4gIH1cblxuICAvLyBPdmVyd3JpdGUgbmF0aXZlIHBsb3QoKSBtZXRob2RcbiAgcGxvdCh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGlmICh4MSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcnJheSgpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgeTEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB4MSA9IHsgeDEsIHkxLCB4MiwgeTIgfVxuICAgIH0gZWxzZSB7XG4gICAgICB4MSA9IG5ldyBQb2ludEFycmF5KHgxKS50b0xpbmUoKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmF0dHIoeDEpXG4gIH1cblxuICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodClcbiAgICByZXR1cm4gdGhpcy5hdHRyKHRoaXMuYXJyYXkoKS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KS50b0xpbmUoKSlcbiAgfVxufVxuXG5leHRlbmQoTGluZSwgcG9pbnRlZClcblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgbGluZSBlbGVtZW50XG4gICAgbGluZTogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBwbG90IGlzIGNhbGxlZCBhcyBhIHNldHRlclxuICAgICAgLy8geDEgaXMgbm90IG5lY2Vzc2FyaWx5IGEgbnVtYmVyLCBpdCBjYW4gYWxzbyBiZSBhbiBhcnJheSwgYSBzdHJpbmcgYW5kIGEgUG9pbnRBcnJheVxuICAgICAgcmV0dXJuIExpbmUucHJvdG90eXBlLnBsb3QuYXBwbHkoXG4gICAgICAgIHRoaXMucHV0KG5ldyBMaW5lKCkpLFxuICAgICAgICBhcmdzWzBdICE9IG51bGwgPyBhcmdzIDogWzAsIDAsIDAsIDBdXG4gICAgICApXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoTGluZSwgJ0xpbmUnKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmtlciBleHRlbmRzIENvbnRhaW5lciB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ21hcmtlcicsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxuICBoZWlnaHQoaGVpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignbWFya2VySGVpZ2h0JywgaGVpZ2h0KVxuICB9XG5cbiAgb3JpZW50KG9yaWVudCkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ29yaWVudCcsIG9yaWVudClcbiAgfVxuXG4gIC8vIFNldCBtYXJrZXIgcmVmWCBhbmQgcmVmWVxuICByZWYoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ3JlZlgnLCB4KS5hdHRyKCdyZWZZJywgeSlcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgZmlsbCBpZFxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ3VybCgjJyArIHRoaXMuaWQoKSArICcpJ1xuICB9XG5cbiAgLy8gVXBkYXRlIG1hcmtlclxuICB1cGRhdGUoYmxvY2spIHtcbiAgICAvLyByZW1vdmUgYWxsIGNvbnRlbnRcbiAgICB0aGlzLmNsZWFyKClcblxuICAgIC8vIGludm9rZSBwYXNzZWQgYmxvY2tcbiAgICBpZiAodHlwZW9mIGJsb2NrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBibG9jay5jYWxsKHRoaXMsIHRoaXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XG4gIHdpZHRoKHdpZHRoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignbWFya2VyV2lkdGgnLCB3aWR0aClcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICBtYXJrZXIoLi4uYXJncykge1xuICAgICAgLy8gQ3JlYXRlIG1hcmtlciBlbGVtZW50IGluIGRlZnNcbiAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5tYXJrZXIoLi4uYXJncylcbiAgICB9XG4gIH0sXG4gIERlZnM6IHtcbiAgICAvLyBDcmVhdGUgbWFya2VyXG4gICAgbWFya2VyOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgYmxvY2spIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IHZpZXdib3ggdG8gbWF0Y2ggdGhlIHdpZHRoIGFuZCBoZWlnaHQsIHNldCByZWYgdG8gY3ggYW5kIGN5IGFuZCBzZXQgb3JpZW50IHRvIGF1dG9cbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgTWFya2VyKCkpXG4gICAgICAgIC5zaXplKHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIC5yZWYod2lkdGggLyAyLCBoZWlnaHQgLyAyKVxuICAgICAgICAudmlld2JveCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxuICAgICAgICAudXBkYXRlKGJsb2NrKVxuICAgIH0pXG4gIH0sXG4gIG1hcmtlcjoge1xuICAgIC8vIENyZWF0ZSBhbmQgYXR0YWNoIG1hcmtlcnNcbiAgICBtYXJrZXIobWFya2VyLCB3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xuICAgICAgbGV0IGF0dHIgPSBbJ21hcmtlciddXG5cbiAgICAgIC8vIEJ1aWxkIGF0dHJpYnV0ZSBuYW1lXG4gICAgICBpZiAobWFya2VyICE9PSAnYWxsJykgYXR0ci5wdXNoKG1hcmtlcilcbiAgICAgIGF0dHIgPSBhdHRyLmpvaW4oJy0nKVxuXG4gICAgICAvLyBTZXQgbWFya2VyIGF0dHJpYnV0ZVxuICAgICAgbWFya2VyID1cbiAgICAgICAgYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgTWFya2VyXG4gICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICA6IHRoaXMuZGVmcygpLm1hcmtlcih3aWR0aCwgaGVpZ2h0LCBibG9jaylcblxuICAgICAgcmV0dXJuIHRoaXMuYXR0cihhdHRyLCBtYXJrZXIpXG4gICAgfVxuICB9XG59KVxuXG5yZWdpc3RlcihNYXJrZXIsICdNYXJrZXInKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNrIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnbWFzaycsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIFVubWFzayBhbGwgbWFza2VkIGVsZW1lbnRzIGFuZCByZW1vdmUgaXRzZWxmXG4gIHJlbW92ZSgpIHtcbiAgICAvLyB1bm1hc2sgYWxsIHRhcmdldHNcbiAgICB0aGlzLnRhcmdldHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwudW5tYXNrKClcbiAgICB9KVxuXG4gICAgLy8gcmVtb3ZlIG1hc2sgZnJvbSBwYXJlbnRcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlKClcbiAgfVxuXG4gIHRhcmdldHMoKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgW21hc2sqPScgKyB0aGlzLmlkKCkgKyAnXScpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgbWFzazogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgTWFzaygpKVxuICAgIH0pXG4gIH0sXG4gIEVsZW1lbnQ6IHtcbiAgICAvLyBEaXN0cmlidXRlIG1hc2sgdG8gc3ZnIGVsZW1lbnRcbiAgICBtYXNrZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZlcmVuY2UoJ21hc2snKVxuICAgIH0sXG5cbiAgICBtYXNrV2l0aChlbGVtZW50KSB7XG4gICAgICAvLyB1c2UgZ2l2ZW4gbWFzayBvciBjcmVhdGUgYSBuZXcgb25lXG4gICAgICBjb25zdCBtYXNrZXIgPVxuICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgTWFzayA/IGVsZW1lbnQgOiB0aGlzLnBhcmVudCgpLm1hc2soKS5hZGQoZWxlbWVudClcblxuICAgICAgLy8gYXBwbHkgbWFza1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cignbWFzaycsICd1cmwoIycgKyBtYXNrZXIuaWQoKSArICcpJylcbiAgICB9LFxuXG4gICAgLy8gVW5tYXNrIGVsZW1lbnRcbiAgICB1bm1hc2soKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdtYXNrJywgbnVsbClcbiAgICB9XG4gIH1cbn0pXG5cbnJlZ2lzdGVyKE1hc2ssICdNYXNrJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgUGF0aEFycmF5IGZyb20gJy4uL3R5cGVzL1BhdGhBcnJheS5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIGV4dGVuZHMgU2hhcGUge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdwYXRoJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gR2V0IGFycmF5XG4gIGFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheSB8fCAodGhpcy5fYXJyYXkgPSBuZXcgUGF0aEFycmF5KHRoaXMuYXR0cignZCcpKSlcbiAgfVxuXG4gIC8vIENsZWFyIGFycmF5IGNhY2hlXG4gIGNsZWFyKCkge1xuICAgIGRlbGV0ZSB0aGlzLl9hcnJheVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcbiAgaGVpZ2h0KGhlaWdodCkge1xuICAgIHJldHVybiBoZWlnaHQgPT0gbnVsbFxuICAgICAgPyB0aGlzLmJib3goKS5oZWlnaHRcbiAgICAgIDogdGhpcy5zaXplKHRoaXMuYmJveCgpLndpZHRoLCBoZWlnaHQpXG4gIH1cblxuICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxuICBtb3ZlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdkJywgdGhpcy5hcnJheSgpLm1vdmUoeCwgeSkpXG4gIH1cblxuICAvLyBQbG90IG5ldyBwYXRoXG4gIHBsb3QoZCkge1xuICAgIHJldHVybiBkID09IG51bGxcbiAgICAgID8gdGhpcy5hcnJheSgpXG4gICAgICA6IHRoaXMuY2xlYXIoKS5hdHRyKFxuICAgICAgICAgICdkJyxcbiAgICAgICAgICB0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyBkIDogKHRoaXMuX2FycmF5ID0gbmV3IFBhdGhBcnJheShkKSlcbiAgICAgICAgKVxuICB9XG5cbiAgLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXG4gICAgcmV0dXJuIHRoaXMuYXR0cignZCcsIHRoaXMuYXJyYXkoKS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcbiAgfVxuXG4gIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XG4gIHdpZHRoKHdpZHRoKSB7XG4gICAgcmV0dXJuIHdpZHRoID09IG51bGxcbiAgICAgID8gdGhpcy5iYm94KCkud2lkdGhcbiAgICAgIDogdGhpcy5zaXplKHdpZHRoLCB0aGlzLmJib3goKS5oZWlnaHQpXG4gIH1cblxuICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHgtYXhpc1xuICB4KHgpIHtcbiAgICByZXR1cm4geCA9PSBudWxsID8gdGhpcy5iYm94KCkueCA6IHRoaXMubW92ZSh4LCB0aGlzLmJib3goKS55KVxuICB9XG5cbiAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXIgb3ZlciB5LWF4aXNcbiAgeSh5KSB7XG4gICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLnkgOiB0aGlzLm1vdmUodGhpcy5iYm94KCkueCwgeSlcbiAgfVxufVxuXG4vLyBEZWZpbmUgbW9ycGhhYmxlIGFycmF5XG5QYXRoLnByb3RvdHlwZS5Nb3JwaEFycmF5ID0gUGF0aEFycmF5XG5cbi8vIEFkZCBwYXJlbnQgbWV0aG9kXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBhdGggZWxlbWVudFxuICAgIHBhdGg6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChkKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgUGF0aCgpKS5wbG90KGQgfHwgbmV3IFBhdGhBcnJheSgpKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFBhdGgsICdQYXRoJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQm94IGZyb20gJy4uL3R5cGVzL0JveC5qcydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygncGF0dGVybicsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIGN1c3RvbSBhdHRyIHRvIGhhbmRsZSB0cmFuc2Zvcm1cbiAgYXR0cihhLCBiLCBjKSB7XG4gICAgaWYgKGEgPT09ICd0cmFuc2Zvcm0nKSBhID0gJ3BhdHRlcm5UcmFuc2Zvcm0nXG4gICAgcmV0dXJuIHN1cGVyLmF0dHIoYSwgYiwgYylcbiAgfVxuXG4gIGJib3goKSB7XG4gICAgcmV0dXJuIG5ldyBCb3goKVxuICB9XG5cbiAgdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gYmFzZUZpbmQoJ3N2ZyBbZmlsbCo9JyArIHRoaXMuaWQoKSArICddJylcbiAgfVxuXG4gIC8vIEFsaWFzIHN0cmluZyBjb252ZXJzaW9uIHRvIGZpbGxcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsKClcbiAgfVxuXG4gIC8vIFVwZGF0ZSBwYXR0ZXJuIGJ5IHJlYnVpbGRpbmdcbiAgdXBkYXRlKGJsb2NrKSB7XG4gICAgLy8gcmVtb3ZlIGNvbnRlbnRcbiAgICB0aGlzLmNsZWFyKClcblxuICAgIC8vIGludm9rZSBwYXNzZWQgYmxvY2tcbiAgICBpZiAodHlwZW9mIGJsb2NrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBibG9jay5jYWxsKHRoaXMsIHRoaXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgZmlsbCBpZFxuICB1cmwoKSB7XG4gICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgcGF0dGVybiBlbGVtZW50IGluIGRlZnNcbiAgICBwYXR0ZXJuKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5wYXR0ZXJuKC4uLmFyZ3MpXG4gICAgfVxuICB9LFxuICBEZWZzOiB7XG4gICAgcGF0dGVybjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFBhdHRlcm4oKSkudXBkYXRlKGJsb2NrKS5hdHRyKHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgcGF0dGVyblVuaXRzOiAndXNlclNwYWNlT25Vc2UnXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFBhdHRlcm4sICdQYXR0ZXJuJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgKiBhcyBwb2ludGVkIGZyb20gJy4uL21vZHVsZXMvY29yZS9wb2ludGVkLmpzJ1xuaW1wb3J0ICogYXMgcG9seSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcG9seS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiBleHRlbmRzIFNoYXBlIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygncG9seWdvbicsIG5vZGUpLCBhdHRycylcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBvbHlnb24gZWxlbWVudFxuICAgIHBvbHlnb246IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChwKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgUG9seWdvbigpKS5wbG90KHAgfHwgbmV3IFBvaW50QXJyYXkoKSlcbiAgICB9KVxuICB9XG59KVxuXG5leHRlbmQoUG9seWdvbiwgcG9pbnRlZClcbmV4dGVuZChQb2x5Z29uLCBwb2x5KVxucmVnaXN0ZXIoUG9seWdvbiwgJ1BvbHlnb24nKVxuIiwiaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVja1xufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcbmltcG9ydCAqIGFzIHBvaW50ZWQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvaW50ZWQuanMnXG5pbXBvcnQgKiBhcyBwb2x5IGZyb20gJy4uL21vZHVsZXMvY29yZS9wb2x5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5bGluZSBleHRlbmRzIFNoYXBlIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygncG9seWxpbmUnLCBub2RlKSwgYXR0cnMpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwb2x5Z29uIGVsZW1lbnRcbiAgICBwb2x5bGluZTogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHApIHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBwbG90IGlzIGNhbGxlZCBhcyBhIHNldHRlclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBQb2x5bGluZSgpKS5wbG90KHAgfHwgbmV3IFBvaW50QXJyYXkoKSlcbiAgICB9KVxuICB9XG59KVxuXG5leHRlbmQoUG9seWxpbmUsIHBvaW50ZWQpXG5leHRlbmQoUG9seWxpbmUsIHBvbHkpXG5yZWdpc3RlcihQb2x5bGluZSwgJ1BvbHlsaW5lJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgeyByeCwgcnkgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgU2hhcGUge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdyZWN0Jywgbm9kZSksIGF0dHJzKVxuICB9XG59XG5cbmV4dGVuZChSZWN0LCB7IHJ4LCByeSB9KVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgYSByZWN0IGVsZW1lbnRcbiAgICByZWN0OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBSZWN0KCkpLnNpemUod2lkdGgsIGhlaWdodClcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihSZWN0LCAnUmVjdCcpXG4iLCJpbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgRWxlbWVudCB7fVxuXG5yZWdpc3RlcihTaGFwZSwgJ1NoYXBlJylcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9wIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnc3RvcCcsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIGFkZCBjb2xvciBzdG9wc1xuICB1cGRhdGUobykge1xuICAgIGlmICh0eXBlb2YgbyA9PT0gJ251bWJlcicgfHwgbyBpbnN0YW5jZW9mIFNWR051bWJlcikge1xuICAgICAgbyA9IHtcbiAgICAgICAgb2Zmc2V0OiBhcmd1bWVudHNbMF0sXG4gICAgICAgIGNvbG9yOiBhcmd1bWVudHNbMV0sXG4gICAgICAgIG9wYWNpdHk6IGFyZ3VtZW50c1syXVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCBhdHRyaWJ1dGVzXG4gICAgaWYgKG8ub3BhY2l0eSAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3Atb3BhY2l0eScsIG8ub3BhY2l0eSlcbiAgICBpZiAoby5jb2xvciAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3AtY29sb3InLCBvLmNvbG9yKVxuICAgIGlmIChvLm9mZnNldCAhPSBudWxsKSB0aGlzLmF0dHIoJ29mZnNldCcsIG5ldyBTVkdOdW1iZXIoby5vZmZzZXQpKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBHcmFkaWVudDoge1xuICAgIC8vIEFkZCBhIGNvbG9yIHN0b3BcbiAgICBzdG9wOiBmdW5jdGlvbiAob2Zmc2V0LCBjb2xvciwgb3BhY2l0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdG9wKCkpLnVwZGF0ZShvZmZzZXQsIGNvbG9yLCBvcGFjaXR5KVxuICAgIH1cbiAgfVxufSlcblxucmVnaXN0ZXIoU3RvcCwgJ1N0b3AnKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3RlciB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IHsgdW5DYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcydcblxuZnVuY3Rpb24gY3NzUnVsZShzZWxlY3RvciwgcnVsZSkge1xuICBpZiAoIXNlbGVjdG9yKSByZXR1cm4gJydcbiAgaWYgKCFydWxlKSByZXR1cm4gc2VsZWN0b3JcblxuICBsZXQgcmV0ID0gc2VsZWN0b3IgKyAneydcblxuICBmb3IgKGNvbnN0IGkgaW4gcnVsZSkge1xuICAgIHJldCArPSB1bkNhbWVsQ2FzZShpKSArICc6JyArIHJ1bGVbaV0gKyAnOydcbiAgfVxuXG4gIHJldCArPSAnfSdcblxuICByZXR1cm4gcmV0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygnc3R5bGUnLCBub2RlKSwgYXR0cnMpXG4gIH1cblxuICBhZGRUZXh0KHcgPSAnJykge1xuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCArPSB3XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZvbnQobmFtZSwgc3JjLCBwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJ1bGUoJ0Bmb250LWZhY2UnLCB7XG4gICAgICBmb250RmFtaWx5OiBuYW1lLFxuICAgICAgc3JjOiBzcmMsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9KVxuICB9XG5cbiAgcnVsZShzZWxlY3Rvciwgb2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkVGV4dChjc3NSdWxlKHNlbGVjdG9yLCBvYmopKVxuICB9XG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywge1xuICBzdHlsZShzZWxlY3Rvciwgb2JqKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdHlsZSgpKS5ydWxlKHNlbGVjdG9yLCBvYmopXG4gIH0sXG4gIGZvbnRmYWNlKG5hbWUsIHNyYywgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdHlsZSgpKS5mb250KG5hbWUsIHNyYywgcGFyYW1zKVxuICB9XG59KVxuXG5yZWdpc3RlcihTdHlsZSwgJ1N0eWxlJylcbiIsImltcG9ydCB7XG4gIGFkb3B0LFxuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVja1xufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgc3ZnLCB4bGluaywgeG1sbnMgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuaW1wb3J0IERlZnMgZnJvbSAnLi9EZWZzLmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ZnIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdzdmcnLCBub2RlKSwgYXR0cnMpXG4gICAgdGhpcy5uYW1lc3BhY2UoKVxuICB9XG5cbiAgLy8gQ3JlYXRlcyBhbmQgcmV0dXJucyBkZWZzIGVsZW1lbnRcbiAgZGVmcygpIHtcbiAgICBpZiAoIXRoaXMuaXNSb290KCkpIHJldHVybiB0aGlzLnJvb3QoKS5kZWZzKClcblxuICAgIHJldHVybiBhZG9wdCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignZGVmcycpKSB8fCB0aGlzLnB1dChuZXcgRGVmcygpKVxuICB9XG5cbiAgaXNSb290KCkge1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5ub2RlLnBhcmVudE5vZGUgfHxcbiAgICAgICghKHRoaXMubm9kZS5wYXJlbnROb2RlIGluc3RhbmNlb2YgZ2xvYmFscy53aW5kb3cuU1ZHRWxlbWVudCkgJiZcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgIT09ICcjZG9jdW1lbnQtZnJhZ21lbnQnKVxuICAgIClcbiAgfVxuXG4gIC8vIEFkZCBuYW1lc3BhY2VzXG4gIG5hbWVzcGFjZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNSb290KCkpIHJldHVybiB0aGlzLnJvb3QoKS5uYW1lc3BhY2UoKVxuICAgIHJldHVybiB0aGlzLmF0dHIoeyB4bWxuczogc3ZnLCB2ZXJzaW9uOiAnMS4xJyB9KS5hdHRyKFxuICAgICAgJ3htbG5zOnhsaW5rJyxcbiAgICAgIHhsaW5rLFxuICAgICAgeG1sbnNcbiAgICApXG4gIH1cblxuICByZW1vdmVOYW1lc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cih7IHhtbG5zOiBudWxsLCB2ZXJzaW9uOiBudWxsIH0pXG4gICAgICAuYXR0cigneG1sbnM6eGxpbmsnLCBudWxsLCB4bWxucylcbiAgICAgIC5hdHRyKCd4bWxuczpzdmdqcycsIG51bGwsIHhtbG5zKVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIHJvb3Qgc3ZnXG4gIC8vIElmIG5vdCwgY2FsbCByb290KCkgZnJvbSB0aGlzIGVsZW1lbnRcbiAgcm9vdCgpIHtcbiAgICBpZiAodGhpcy5pc1Jvb3QoKSkgcmV0dXJuIHRoaXNcbiAgICByZXR1cm4gc3VwZXIucm9vdCgpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIG5lc3RlZCBzdmcgZG9jdW1lbnRcbiAgICBuZXN0ZWQ6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU3ZnKCkpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoU3ZnLCAnU3ZnJywgdHJ1ZSlcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeW1ib2wgZXh0ZW5kcyBDb250YWluZXIge1xuICAvLyBJbml0aWFsaXplIG5vZGVcbiAgY29uc3RydWN0b3Iobm9kZSwgYXR0cnMgPSBub2RlKSB7XG4gICAgc3VwZXIobm9kZU9yTmV3KCdzeW1ib2wnLCBub2RlKSwgYXR0cnMpXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgc3ltYm9sOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFN5bWJvbCgpKVxuICAgIH0pXG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFN5bWJvbCwgJ1N5bWJvbCcpXG4iLCJpbXBvcnQge1xuICBhZG9wdCxcbiAgZXh0ZW5kLFxuICBub2RlT3JOZXcsXG4gIHJlZ2lzdGVyLFxuICB3cmFwV2l0aEF0dHJDaGVja1xufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0ICogYXMgdGV4dGFibGUgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3RleHRhYmxlLmpzJ1xuaW1wb3J0IHsgaXNEZXNjcmlwdGl2ZSwgd3JpdGVEYXRhVG9Eb20gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFNoYXBlIHtcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXG4gIGNvbnN0cnVjdG9yKG5vZGUsIGF0dHJzID0gbm9kZSkge1xuICAgIHN1cGVyKG5vZGVPck5ldygndGV4dCcsIG5vZGUpLCBhdHRycylcblxuICAgIHRoaXMuZG9tLmxlYWRpbmcgPSB0aGlzLmRvbS5sZWFkaW5nID8/IG5ldyBTVkdOdW1iZXIoMS4zKSAvLyBzdG9yZSBsZWFkaW5nIHZhbHVlIGZvciByZWJ1aWxkaW5nXG4gICAgdGhpcy5fcmVidWlsZCA9IHRydWUgLy8gZW5hYmxlIGF1dG9tYXRpYyB1cGRhdGluZyBvZiBkeSB2YWx1ZXNcbiAgICB0aGlzLl9idWlsZCA9IGZhbHNlIC8vIGRpc2FibGUgYnVpbGQgbW9kZSBmb3IgYWRkaW5nIG11bHRpcGxlIGxpbmVzXG4gIH1cblxuICAvLyBTZXQgLyBnZXQgbGVhZGluZ1xuICBsZWFkaW5nKHZhbHVlKSB7XG4gICAgLy8gYWN0IGFzIGdldHRlclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb20ubGVhZGluZ1xuICAgIH1cblxuICAgIC8vIGFjdCBhcyBzZXR0ZXJcbiAgICB0aGlzLmRvbS5sZWFkaW5nID0gbmV3IFNWR051bWJlcih2YWx1ZSlcblxuICAgIHJldHVybiB0aGlzLnJlYnVpbGQoKVxuICB9XG5cbiAgLy8gUmVidWlsZCBhcHBlYXJhbmNlIHR5cGVcbiAgcmVidWlsZChyZWJ1aWxkKSB7XG4gICAgLy8gc3RvcmUgbmV3IHJlYnVpbGQgZmxhZyBpZiBnaXZlblxuICAgIGlmICh0eXBlb2YgcmVidWlsZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkID0gcmVidWlsZFxuICAgIH1cblxuICAgIC8vIGRlZmluZSBwb3NpdGlvbiBvZiBhbGwgbGluZXNcbiAgICBpZiAodGhpcy5fcmVidWlsZCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGxldCBibGFua0xpbmVPZmZzZXQgPSAwXG4gICAgICBjb25zdCBsZWFkaW5nID0gdGhpcy5kb20ubGVhZGluZ1xuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKGlzRGVzY3JpcHRpdmUodGhpcy5ub2RlKSkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgZm9udFNpemUgPSBnbG9iYWxzLndpbmRvd1xuICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKHRoaXMubm9kZSlcbiAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJylcblxuICAgICAgICBjb25zdCBkeSA9IGxlYWRpbmcgKiBuZXcgU1ZHTnVtYmVyKGZvbnRTaXplKVxuXG4gICAgICAgIGlmICh0aGlzLmRvbS5uZXdMaW5lZCkge1xuICAgICAgICAgIHRoaXMuYXR0cigneCcsIHNlbGYuYXR0cigneCcpKVxuXG4gICAgICAgICAgaWYgKHRoaXMudGV4dCgpID09PSAnXFxuJykge1xuICAgICAgICAgICAgYmxhbmtMaW5lT2Zmc2V0ICs9IGR5XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cignZHknLCBpID8gZHkgKyBibGFua0xpbmVPZmZzZXQgOiAwKVxuICAgICAgICAgICAgYmxhbmtMaW5lT2Zmc2V0ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgdGhpcy5maXJlKCdyZWJ1aWxkJylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gb3ZlcndyaXRlIG1ldGhvZCBmcm9tIHBhcmVudCB0byBzZXQgZGF0YSBwcm9wZXJseVxuICBzZXREYXRhKG8pIHtcbiAgICB0aGlzLmRvbSA9IG9cbiAgICB0aGlzLmRvbS5sZWFkaW5nID0gbmV3IFNWR051bWJlcihvLmxlYWRpbmcgfHwgMS4zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB3cml0ZURhdGFUb0RvbSgpIHtcbiAgICB3cml0ZURhdGFUb0RvbSh0aGlzLCB0aGlzLmRvbSwgeyBsZWFkaW5nOiAxLjMgfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gU2V0IHRoZSB0ZXh0IGNvbnRlbnRcbiAgdGV4dCh0ZXh0KSB7XG4gICAgLy8gYWN0IGFzIGdldHRlclxuICAgIGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkTm9kZXNcbiAgICAgIGxldCBmaXJzdExpbmUgPSAwXG4gICAgICB0ZXh0ID0gJydcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIC8vIHNraXAgdGV4dFBhdGhzIC0gdGhleSBhcmUgbm8gbGluZXNcbiAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVOYW1lID09PSAndGV4dFBhdGgnIHx8IGlzRGVzY3JpcHRpdmUoY2hpbGRyZW5baV0pKSB7XG4gICAgICAgICAgaWYgKGkgPT09IDApIGZpcnN0TGluZSA9IGkgKyAxXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBuZXdsaW5lIGlmIGl0cyBub3QgdGhlIGZpcnN0IGNoaWxkIGFuZCBuZXdMaW5lZCBpcyBzZXQgdG8gdHJ1ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgaSAhPT0gZmlyc3RMaW5lICYmXG4gICAgICAgICAgY2hpbGRyZW5baV0ubm9kZVR5cGUgIT09IDMgJiZcbiAgICAgICAgICBhZG9wdChjaGlsZHJlbltpXSkuZG9tLm5ld0xpbmVkID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRleHQgKz0gJ1xcbidcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBjb250ZW50IG9mIHRoaXMgbm9kZVxuICAgICAgICB0ZXh0ICs9IGNoaWxkcmVuW2ldLnRleHRDb250ZW50XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGNvbnRlbnRcbiAgICB0aGlzLmNsZWFyKCkuYnVpbGQodHJ1ZSlcblxuICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY2FsbCBibG9ja1xuICAgICAgdGV4dC5jYWxsKHRoaXMsIHRoaXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0b3JlIHRleHQgYW5kIG1ha2Ugc3VyZSB0ZXh0IGlzIG5vdCBibGFua1xuICAgICAgdGV4dCA9ICh0ZXh0ICsgJycpLnNwbGl0KCdcXG4nKVxuXG4gICAgICAvLyBidWlsZCBuZXcgbGluZXNcbiAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IHRleHQubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICB0aGlzLm5ld0xpbmUodGV4dFtqXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkaXNhYmxlIGJ1aWxkIG1vZGUgYW5kIHJlYnVpbGQgbGluZXNcbiAgICByZXR1cm4gdGhpcy5idWlsZChmYWxzZSkucmVidWlsZCgpXG4gIH1cbn1cblxuZXh0ZW5kKFRleHQsIHRleHRhYmxlKVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICAvLyBDcmVhdGUgdGV4dCBlbGVtZW50XG4gICAgdGV4dDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQgPSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBUZXh0KCkpLnRleHQodGV4dClcbiAgICB9KSxcblxuICAgIC8vIENyZWF0ZSBwbGFpbiB0ZXh0IGVsZW1lbnRcbiAgICBwbGFpbjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQgPSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBUZXh0KCkpLnBsYWluKHRleHQpXG4gICAgfSlcbiAgfVxufSlcblxucmVnaXN0ZXIoVGV4dCwgJ1RleHQnKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnXG5pbXBvcnQgUGF0aEFycmF5IGZyb20gJy4uL3R5cGVzL1BhdGhBcnJheS5qcydcbmltcG9ydCBUZXh0IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCBiYXNlRmluZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRQYXRoIGV4dGVuZHMgVGV4dCB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3RleHRQYXRoJywgbm9kZSksIGF0dHJzKVxuICB9XG5cbiAgLy8gcmV0dXJuIHRoZSBhcnJheSBvZiB0aGUgcGF0aCB0cmFjayBlbGVtZW50XG4gIGFycmF5KCkge1xuICAgIGNvbnN0IHRyYWNrID0gdGhpcy50cmFjaygpXG5cbiAgICByZXR1cm4gdHJhY2sgPyB0cmFjay5hcnJheSgpIDogbnVsbFxuICB9XG5cbiAgLy8gUGxvdCBwYXRoIGlmIGFueVxuICBwbG90KGQpIHtcbiAgICBjb25zdCB0cmFjayA9IHRoaXMudHJhY2soKVxuICAgIGxldCBwYXRoQXJyYXkgPSBudWxsXG5cbiAgICBpZiAodHJhY2spIHtcbiAgICAgIHBhdGhBcnJheSA9IHRyYWNrLnBsb3QoZClcbiAgICB9XG5cbiAgICByZXR1cm4gZCA9PSBudWxsID8gcGF0aEFycmF5IDogdGhpc1xuICB9XG5cbiAgLy8gR2V0IHRoZSBwYXRoIGVsZW1lbnRcbiAgdHJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlKCdocmVmJylcbiAgfVxufVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBDb250YWluZXI6IHtcbiAgICB0ZXh0UGF0aDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQsIHBhdGgpIHtcbiAgICAgIC8vIENvbnZlcnQgdGV4dCB0byBpbnN0YW5jZSBpZiBuZWVkZWRcbiAgICAgIGlmICghKHRleHQgaW5zdGFuY2VvZiBUZXh0KSkge1xuICAgICAgICB0ZXh0ID0gdGhpcy50ZXh0KHRleHQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZXh0LnBhdGgocGF0aClcbiAgICB9KVxuICB9LFxuICBUZXh0OiB7XG4gICAgLy8gQ3JlYXRlIHBhdGggZm9yIHRleHQgdG8gcnVuIG9uXG4gICAgcGF0aDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRyYWNrLCBpbXBvcnROb2RlcyA9IHRydWUpIHtcbiAgICAgIGNvbnN0IHRleHRQYXRoID0gbmV3IFRleHRQYXRoKClcblxuICAgICAgLy8gaWYgdHJhY2sgaXMgYSBwYXRoLCByZXVzZSBpdFxuICAgICAgaWYgKCEodHJhY2sgaW5zdGFuY2VvZiBQYXRoKSkge1xuICAgICAgICAvLyBjcmVhdGUgcGF0aCBlbGVtZW50XG4gICAgICAgIHRyYWNrID0gdGhpcy5kZWZzKCkucGF0aCh0cmFjaylcbiAgICAgIH1cblxuICAgICAgLy8gbGluayB0ZXh0UGF0aCB0byBwYXRoIGFuZCBhZGQgY29udGVudFxuICAgICAgdGV4dFBhdGguYXR0cignaHJlZicsICcjJyArIHRyYWNrLCB4bGluaylcblxuICAgICAgLy8gVHJhbnNwbGFudCBhbGwgbm9kZXMgZnJvbSB0ZXh0IHRvIHRleHRQYXRoXG4gICAgICBsZXQgbm9kZVxuICAgICAgaWYgKGltcG9ydE5vZGVzKSB7XG4gICAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMubm9kZS5maXJzdENoaWxkKSkge1xuICAgICAgICAgIHRleHRQYXRoLm5vZGUuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhZGQgdGV4dFBhdGggZWxlbWVudCBhcyBjaGlsZCBub2RlIGFuZCByZXR1cm4gdGV4dFBhdGhcbiAgICAgIHJldHVybiB0aGlzLnB1dCh0ZXh0UGF0aClcbiAgICB9KSxcblxuICAgIC8vIEdldCB0aGUgdGV4dFBhdGggY2hpbGRyZW5cbiAgICB0ZXh0UGF0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmRPbmUoJ3RleHRQYXRoJylcbiAgICB9XG4gIH0sXG4gIFBhdGg6IHtcbiAgICAvLyBjcmVhdGVzIGEgdGV4dFBhdGggZnJvbSB0aGlzIHBhdGhcbiAgICB0ZXh0OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodGV4dCkge1xuICAgICAgLy8gQ29udmVydCB0ZXh0IHRvIGluc3RhbmNlIGlmIG5lZWRlZFxuICAgICAgaWYgKCEodGV4dCBpbnN0YW5jZW9mIFRleHQpKSB7XG4gICAgICAgIHRleHQgPSBuZXcgVGV4dCgpLmFkZFRvKHRoaXMucGFyZW50KCkpLnRleHQodGV4dClcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIHRleHRQYXRoIGZyb20gdGV4dCBhbmQgcGF0aCBhbmQgcmV0dXJuXG4gICAgICByZXR1cm4gdGV4dC5wYXRoKHRoaXMpXG4gICAgfSksXG5cbiAgICB0YXJnZXRzKCkge1xuICAgICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgdGV4dFBhdGgnKS5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIChub2RlLmF0dHIoJ2hyZWYnKSB8fCAnJykuaW5jbHVkZXModGhpcy5pZCgpKVxuICAgICAgfSlcblxuICAgICAgLy8gRG9lcyBub3Qgd29yayBpbiBJRTExLiBVc2Ugd2hlbiBJRSBzdXBwb3J0IGlzIGRyb3BwZWRcbiAgICAgIC8vIHJldHVybiBiYXNlRmluZCgnc3ZnIHRleHRQYXRoWyp8aHJlZio9JyArIHRoaXMuaWQoKSArICddJylcbiAgICB9XG4gIH1cbn0pXG5cblRleHRQYXRoLnByb3RvdHlwZS5Nb3JwaEFycmF5ID0gUGF0aEFycmF5XG5yZWdpc3RlcihUZXh0UGF0aCwgJ1RleHRQYXRoJylcbiIsImltcG9ydCB7XG4gIGV4dGVuZCxcbiAgbm9kZU9yTmV3LFxuICByZWdpc3RlcixcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcbmltcG9ydCBUZXh0IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCAqIGFzIHRleHRhYmxlIGZyb20gJy4uL21vZHVsZXMvY29yZS90ZXh0YWJsZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHNwYW4gZXh0ZW5kcyBTaGFwZSB7XG4gIC8vIEluaXRpYWxpemUgbm9kZVxuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3RzcGFuJywgbm9kZSksIGF0dHJzKVxuICAgIHRoaXMuX2J1aWxkID0gZmFsc2UgLy8gZGlzYWJsZSBidWlsZCBtb2RlIGZvciBhZGRpbmcgbXVsdGlwbGUgbGluZXNcbiAgfVxuXG4gIC8vIFNob3J0Y3V0IGR4XG4gIGR4KGR4KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignZHgnLCBkeClcbiAgfVxuXG4gIC8vIFNob3J0Y3V0IGR5XG4gIGR5KGR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cignZHknLCBkeSlcbiAgfVxuXG4gIC8vIENyZWF0ZSBuZXcgbGluZVxuICBuZXdMaW5lKCkge1xuICAgIC8vIG1hcmsgbmV3IGxpbmVcbiAgICB0aGlzLmRvbS5uZXdMaW5lZCA9IHRydWVcblxuICAgIC8vIGZldGNoIHBhcmVudFxuICAgIGNvbnN0IHRleHQgPSB0aGlzLnBhcmVudCgpXG5cbiAgICAvLyBlYXJseSByZXR1cm4gaW4gY2FzZSB3ZSBhcmUgbm90IGluIGEgdGV4dCBlbGVtZW50XG4gICAgaWYgKCEodGV4dCBpbnN0YW5jZW9mIFRleHQpKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGNvbnN0IGkgPSB0ZXh0LmluZGV4KHRoaXMpXG5cbiAgICBjb25zdCBmb250U2l6ZSA9IGdsb2JhbHMud2luZG93XG4gICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5vZGUpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJylcbiAgICBjb25zdCBkeSA9IHRleHQuZG9tLmxlYWRpbmcgKiBuZXcgU1ZHTnVtYmVyKGZvbnRTaXplKVxuXG4gICAgLy8gYXBwbHkgbmV3IHBvc2l0aW9uXG4gICAgcmV0dXJuIHRoaXMuZHkoaSA/IGR5IDogMCkuYXR0cigneCcsIHRleHQueCgpKVxuICB9XG5cbiAgLy8gU2V0IHRleHQgY29udGVudFxuICB0ZXh0KHRleHQpIHtcbiAgICBpZiAodGV4dCA9PSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMubm9kZS50ZXh0Q29udGVudCArICh0aGlzLmRvbS5uZXdMaW5lZCA/ICdcXG4nIDogJycpXG5cbiAgICBpZiAodHlwZW9mIHRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuY2xlYXIoKS5idWlsZCh0cnVlKVxuICAgICAgdGV4dC5jYWxsKHRoaXMsIHRoaXMpXG4gICAgICB0aGlzLmJ1aWxkKGZhbHNlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYWluKHRleHQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5leHRlbmQoVHNwYW4sIHRleHRhYmxlKVxuXG5yZWdpc3Rlck1ldGhvZHMoe1xuICBUc3Bhbjoge1xuICAgIHRzcGFuOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodGV4dCA9ICcnKSB7XG4gICAgICBjb25zdCB0c3BhbiA9IG5ldyBUc3BhbigpXG5cbiAgICAgIC8vIGNsZWFyIGlmIGJ1aWxkIG1vZGUgaXMgZGlzYWJsZWRcbiAgICAgIGlmICghdGhpcy5fYnVpbGQpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBuZXcgdHNwYW5cbiAgICAgIHJldHVybiB0aGlzLnB1dCh0c3BhbikudGV4dCh0ZXh0KVxuICAgIH0pXG4gIH0sXG4gIFRleHQ6IHtcbiAgICBuZXdMaW5lOiBmdW5jdGlvbiAodGV4dCA9ICcnKSB7XG4gICAgICByZXR1cm4gdGhpcy50c3Bhbih0ZXh0KS5uZXdMaW5lKClcbiAgICB9XG4gIH1cbn0pXG5cbnJlZ2lzdGVyKFRzcGFuLCAnVHNwYW4nKVxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlIGV4dGVuZHMgU2hhcGUge1xuICBjb25zdHJ1Y3Rvcihub2RlLCBhdHRycyA9IG5vZGUpIHtcbiAgICBzdXBlcihub2RlT3JOZXcoJ3VzZScsIG5vZGUpLCBhdHRycylcbiAgfVxuXG4gIC8vIFVzZSBlbGVtZW50IGFzIGEgcmVmZXJlbmNlXG4gIHVzZShlbGVtZW50LCBmaWxlKSB7XG4gICAgLy8gU2V0IGxpbmVkIGVsZW1lbnRcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgKGZpbGUgfHwgJycpICsgJyMnICsgZWxlbWVudCwgeGxpbmspXG4gIH1cbn1cblxucmVnaXN0ZXJNZXRob2RzKHtcbiAgQ29udGFpbmVyOiB7XG4gICAgLy8gQ3JlYXRlIGEgdXNlIGVsZW1lbnRcbiAgICB1c2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChlbGVtZW50LCBmaWxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFVzZSgpKS51c2UoZWxlbWVudCwgZmlsZSlcbiAgICB9KVxuICB9XG59KVxuXG5yZWdpc3RlcihVc2UsICdVc2UnKVxuIiwiLyogT3B0aW9uYWwgTW9kdWxlcyAqL1xuaW1wb3J0ICcuL21vZHVsZXMvb3B0aW9uYWwvYXJyYW5nZS5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2NsYXNzLmpzJ1xuaW1wb3J0ICcuL21vZHVsZXMvb3B0aW9uYWwvY3NzLmpzJ1xuaW1wb3J0ICcuL21vZHVsZXMvb3B0aW9uYWwvZGF0YS5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL21lbW9yeS5qcydcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL3N1Z2FyLmpzJ1xuaW1wb3J0ICcuL21vZHVsZXMvb3B0aW9uYWwvdHJhbnNmb3JtLmpzJ1xuXG5pbXBvcnQgeyBleHRlbmQsIG1ha2VJbnN0YW5jZSB9IGZyb20gJy4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGdldE1ldGhvZE5hbWVzLCBnZXRNZXRob2RzRm9yIH0gZnJvbSAnLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IEJveCBmcm9tICcuL3R5cGVzL0JveC5qcydcbmltcG9ydCBDb2xvciBmcm9tICcuL3R5cGVzL0NvbG9yLmpzJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2VsZW1lbnRzL0NvbnRhaW5lci5qcydcbmltcG9ydCBEZWZzIGZyb20gJy4vZWxlbWVudHMvRGVmcy5qcydcbmltcG9ydCBEb20gZnJvbSAnLi9lbGVtZW50cy9Eb20uanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL2VsZW1lbnRzL0VsZW1lbnQuanMnXG5pbXBvcnQgRWxsaXBzZSBmcm9tICcuL2VsZW1lbnRzL0VsbGlwc2UuanMnXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi90eXBlcy9FdmVudFRhcmdldC5qcydcbmltcG9ydCBGcmFnbWVudCBmcm9tICcuL2VsZW1lbnRzL0ZyYWdtZW50LmpzJ1xuaW1wb3J0IEdyYWRpZW50IGZyb20gJy4vZWxlbWVudHMvR3JhZGllbnQuanMnXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9lbGVtZW50cy9JbWFnZS5qcydcbmltcG9ydCBMaW5lIGZyb20gJy4vZWxlbWVudHMvTGluZS5qcydcbmltcG9ydCBMaXN0IGZyb20gJy4vdHlwZXMvTGlzdC5qcydcbmltcG9ydCBNYXJrZXIgZnJvbSAnLi9lbGVtZW50cy9NYXJrZXIuanMnXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vdHlwZXMvTWF0cml4LmpzJ1xuaW1wb3J0IE1vcnBoYWJsZSwge1xuICBOb25Nb3JwaGFibGUsXG4gIE9iamVjdEJhZyxcbiAgVHJhbnNmb3JtQmFnLFxuICBtYWtlTW9ycGhhYmxlLFxuICByZWdpc3Rlck1vcnBoYWJsZVR5cGVcbn0gZnJvbSAnLi9hbmltYXRpb24vTW9ycGhhYmxlLmpzJ1xuaW1wb3J0IFBhdGggZnJvbSAnLi9lbGVtZW50cy9QYXRoLmpzJ1xuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuL3R5cGVzL1BhdGhBcnJheS5qcydcbmltcG9ydCBQYXR0ZXJuIGZyb20gJy4vZWxlbWVudHMvUGF0dGVybi5qcydcbmltcG9ydCBQb2ludEFycmF5IGZyb20gJy4vdHlwZXMvUG9pbnRBcnJheS5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuL3R5cGVzL1BvaW50LmpzJ1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9lbGVtZW50cy9Qb2x5Z29uLmpzJ1xuaW1wb3J0IFBvbHlsaW5lIGZyb20gJy4vZWxlbWVudHMvUG9seWxpbmUuanMnXG5pbXBvcnQgUmVjdCBmcm9tICcuL2VsZW1lbnRzL1JlY3QuanMnXG5pbXBvcnQgUnVubmVyIGZyb20gJy4vYW5pbWF0aW9uL1J1bm5lci5qcydcbmltcG9ydCBTVkdBcnJheSBmcm9tICcuL3R5cGVzL1NWR0FycmF5LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuL3R5cGVzL1NWR051bWJlci5qcydcbmltcG9ydCBTaGFwZSBmcm9tICcuL2VsZW1lbnRzL1NoYXBlLmpzJ1xuaW1wb3J0IFN2ZyBmcm9tICcuL2VsZW1lbnRzL1N2Zy5qcydcbmltcG9ydCBTeW1ib2wgZnJvbSAnLi9lbGVtZW50cy9TeW1ib2wuanMnXG5pbXBvcnQgVGV4dCBmcm9tICcuL2VsZW1lbnRzL1RleHQuanMnXG5pbXBvcnQgVHNwYW4gZnJvbSAnLi9lbGVtZW50cy9Uc3Bhbi5qcydcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vbW9kdWxlcy9jb3JlL2RlZmF1bHRzLmpzJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy91dGlscy5qcydcbmltcG9ydCAqIGFzIG5hbWVzcGFjZXMgZnJvbSAnLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcbmltcG9ydCAqIGFzIHJlZ2V4IGZyb20gJy4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuXG5leHBvcnQge1xuICBNb3JwaGFibGUsXG4gIHJlZ2lzdGVyTW9ycGhhYmxlVHlwZSxcbiAgbWFrZU1vcnBoYWJsZSxcbiAgVHJhbnNmb3JtQmFnLFxuICBPYmplY3RCYWcsXG4gIE5vbk1vcnBoYWJsZVxufVxuXG5leHBvcnQgeyBkZWZhdWx0cywgdXRpbHMsIG5hbWVzcGFjZXMsIHJlZ2V4IH1cbmV4cG9ydCBjb25zdCBTVkcgPSBtYWtlSW5zdGFuY2VcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VyIH0gZnJvbSAnLi9tb2R1bGVzL2NvcmUvcGFyc2VyLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBmaW5kIH0gZnJvbSAnLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvY29yZS9ldmVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvYWRvcHRlci5qcydcbmV4cG9ydCB7XG4gIGdldFdpbmRvdyxcbiAgcmVnaXN0ZXJXaW5kb3csXG4gIHJlc3RvcmVXaW5kb3csXG4gIHNhdmVXaW5kb3csXG4gIHdpdGhXaW5kb3dcbn0gZnJvbSAnLi91dGlscy93aW5kb3cuanMnXG5cbi8qIEFuaW1hdGlvbiBNb2R1bGVzICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFuaW1hdG9yIH0gZnJvbSAnLi9hbmltYXRpb24vQW5pbWF0b3IuanMnXG5leHBvcnQge1xuICBDb250cm9sbGVyLFxuICBFYXNlLFxuICBQSUQsXG4gIFNwcmluZyxcbiAgZWFzaW5nXG59IGZyb20gJy4vYW5pbWF0aW9uL0NvbnRyb2xsZXIuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFF1ZXVlIH0gZnJvbSAnLi9hbmltYXRpb24vUXVldWUuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFJ1bm5lciB9IGZyb20gJy4vYW5pbWF0aW9uL1J1bm5lci5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGltZWxpbmUgfSBmcm9tICcuL2FuaW1hdGlvbi9UaW1lbGluZS5qcydcblxuLyogVHlwZXMgKi9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQXJyYXkgfSBmcm9tICcuL3R5cGVzL1NWR0FycmF5LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tICcuL3R5cGVzL0JveC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sb3IgfSBmcm9tICcuL3R5cGVzL0NvbG9yLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFdmVudFRhcmdldCB9IGZyb20gJy4vdHlwZXMvRXZlbnRUYXJnZXQuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeCB9IGZyb20gJy4vdHlwZXMvTWF0cml4LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOdW1iZXIgfSBmcm9tICcuL3R5cGVzL1NWR051bWJlci5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0aEFycmF5IH0gZnJvbSAnLi90eXBlcy9QYXRoQXJyYXkuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvaW50IH0gZnJvbSAnLi90eXBlcy9Qb2ludC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9pbnRBcnJheSB9IGZyb20gJy4vdHlwZXMvUG9pbnRBcnJheS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlzdCB9IGZyb20gJy4vdHlwZXMvTGlzdC5qcydcblxuLyogRWxlbWVudHMgKi9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2lyY2xlIH0gZnJvbSAnLi9lbGVtZW50cy9DaXJjbGUuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIENsaXBQYXRoIH0gZnJvbSAnLi9lbGVtZW50cy9DbGlwUGF0aC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29udGFpbmVyIH0gZnJvbSAnLi9lbGVtZW50cy9Db250YWluZXIuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIERlZnMgfSBmcm9tICcuL2VsZW1lbnRzL0RlZnMuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIERvbSB9IGZyb20gJy4vZWxlbWVudHMvRG9tLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbGVtZW50IH0gZnJvbSAnLi9lbGVtZW50cy9FbGVtZW50LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbGxpcHNlIH0gZnJvbSAnLi9lbGVtZW50cy9FbGxpcHNlLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JlaWduT2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50cy9Gb3JlaWduT2JqZWN0LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGcmFnbWVudCB9IGZyb20gJy4vZWxlbWVudHMvRnJhZ21lbnQuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyYWRpZW50IH0gZnJvbSAnLi9lbGVtZW50cy9HcmFkaWVudC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRyB9IGZyb20gJy4vZWxlbWVudHMvRy5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQSB9IGZyb20gJy4vZWxlbWVudHMvQS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2UgfSBmcm9tICcuL2VsZW1lbnRzL0ltYWdlLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaW5lIH0gZnJvbSAnLi9lbGVtZW50cy9MaW5lLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXJrZXIgfSBmcm9tICcuL2VsZW1lbnRzL01hcmtlci5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFzayB9IGZyb20gJy4vZWxlbWVudHMvTWFzay5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0aCB9IGZyb20gJy4vZWxlbWVudHMvUGF0aC5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0dGVybiB9IGZyb20gJy4vZWxlbWVudHMvUGF0dGVybi5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9seWdvbiB9IGZyb20gJy4vZWxlbWVudHMvUG9seWdvbi5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9seWxpbmUgfSBmcm9tICcuL2VsZW1lbnRzL1BvbHlsaW5lLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZWN0IH0gZnJvbSAnLi9lbGVtZW50cy9SZWN0LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaGFwZSB9IGZyb20gJy4vZWxlbWVudHMvU2hhcGUuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0b3AgfSBmcm9tICcuL2VsZW1lbnRzL1N0b3AuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0eWxlIH0gZnJvbSAnLi9lbGVtZW50cy9TdHlsZS5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3ZnIH0gZnJvbSAnLi9lbGVtZW50cy9TdmcuanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN5bWJvbCB9IGZyb20gJy4vZWxlbWVudHMvU3ltYm9sLmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0IH0gZnJvbSAnLi9lbGVtZW50cy9UZXh0LmpzJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0UGF0aCB9IGZyb20gJy4vZWxlbWVudHMvVGV4dFBhdGguanMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRzcGFuIH0gZnJvbSAnLi9lbGVtZW50cy9Uc3Bhbi5qcydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlIH0gZnJvbSAnLi9lbGVtZW50cy9Vc2UuanMnXG5cbmV4dGVuZChbU3ZnLCBTeW1ib2wsIEltYWdlLCBQYXR0ZXJuLCBNYXJrZXJdLCBnZXRNZXRob2RzRm9yKCd2aWV3Ym94JykpXG5cbmV4dGVuZChbTGluZSwgUG9seWxpbmUsIFBvbHlnb24sIFBhdGhdLCBnZXRNZXRob2RzRm9yKCdtYXJrZXInKSlcblxuZXh0ZW5kKFRleHQsIGdldE1ldGhvZHNGb3IoJ1RleHQnKSlcbmV4dGVuZChQYXRoLCBnZXRNZXRob2RzRm9yKCdQYXRoJykpXG5cbmV4dGVuZChEZWZzLCBnZXRNZXRob2RzRm9yKCdEZWZzJykpXG5cbmV4dGVuZChbVGV4dCwgVHNwYW5dLCBnZXRNZXRob2RzRm9yKCdUc3BhbicpKVxuXG5leHRlbmQoW1JlY3QsIEVsbGlwc2UsIEdyYWRpZW50LCBSdW5uZXJdLCBnZXRNZXRob2RzRm9yKCdyYWRpdXMnKSlcblxuZXh0ZW5kKEV2ZW50VGFyZ2V0LCBnZXRNZXRob2RzRm9yKCdFdmVudFRhcmdldCcpKVxuZXh0ZW5kKERvbSwgZ2V0TWV0aG9kc0ZvcignRG9tJykpXG5leHRlbmQoRWxlbWVudCwgZ2V0TWV0aG9kc0ZvcignRWxlbWVudCcpKVxuZXh0ZW5kKFNoYXBlLCBnZXRNZXRob2RzRm9yKCdTaGFwZScpKVxuZXh0ZW5kKFtDb250YWluZXIsIEZyYWdtZW50XSwgZ2V0TWV0aG9kc0ZvcignQ29udGFpbmVyJykpXG5leHRlbmQoR3JhZGllbnQsIGdldE1ldGhvZHNGb3IoJ0dyYWRpZW50JykpXG5cbmV4dGVuZChSdW5uZXIsIGdldE1ldGhvZHNGb3IoJ1J1bm5lcicpKVxuXG5MaXN0LmV4dGVuZChnZXRNZXRob2ROYW1lcygpKVxuXG5yZWdpc3Rlck1vcnBoYWJsZVR5cGUoW1xuICBTVkdOdW1iZXIsXG4gIENvbG9yLFxuICBCb3gsXG4gIE1hdHJpeCxcbiAgU1ZHQXJyYXksXG4gIFBvaW50QXJyYXksXG4gIFBhdGhBcnJheSxcbiAgUG9pbnRcbl0pXG5cbm1ha2VNb3JwaGFibGUoKVxuIiwiaW1wb3J0IHsgYXR0cnMgYXMgZGVmYXVsdHMgfSBmcm9tICcuL2RlZmF1bHRzLmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuL3JlZ2V4LmpzJ1xuaW1wb3J0IENvbG9yIGZyb20gJy4uLy4uL3R5cGVzL0NvbG9yLmpzJ1xuaW1wb3J0IFNWR0FycmF5IGZyb20gJy4uLy4uL3R5cGVzL1NWR0FycmF5LmpzJ1xuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi8uLi90eXBlcy9TVkdOdW1iZXIuanMnXG5cbmNvbnN0IGNvbG9yQXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAnZmlsbCcsXG4gICdzdHJva2UnLFxuICAnY29sb3InLFxuICAnYmdjb2xvcicsXG4gICdzdG9wLWNvbG9yJyxcbiAgJ2Zsb29kLWNvbG9yJyxcbiAgJ2xpZ2h0aW5nLWNvbG9yJ1xuXSlcblxuY29uc3QgaG9va3MgPSBbXVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXR0ckhvb2soZm4pIHtcbiAgaG9va3MucHVzaChmbilcbn1cblxuLy8gU2V0IHN2ZyBlbGVtZW50IGF0dHJpYnV0ZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0cihhdHRyLCB2YWwsIG5zKSB7XG4gIC8vIGFjdCBhcyBmdWxsIGdldHRlclxuICBpZiAoYXR0ciA9PSBudWxsKSB7XG4gICAgLy8gZ2V0IGFuIG9iamVjdCBvZiBhdHRyaWJ1dGVzXG4gICAgYXR0ciA9IHt9XG4gICAgdmFsID0gdGhpcy5ub2RlLmF0dHJpYnV0ZXNcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB2YWwpIHtcbiAgICAgIGF0dHJbbm9kZS5ub2RlTmFtZV0gPSBpc051bWJlci50ZXN0KG5vZGUubm9kZVZhbHVlKVxuICAgICAgICA/IHBhcnNlRmxvYXQobm9kZS5ub2RlVmFsdWUpXG4gICAgICAgIDogbm9kZS5ub2RlVmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0clxuICB9IGVsc2UgaWYgKGF0dHIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIC8vIGxvb3AgdGhyb3VnaCBhcnJheSBhbmQgZ2V0IGFsbCB2YWx1ZXNcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IHtcbiAgICAgIGxhc3RbY3Vycl0gPSB0aGlzLmF0dHIoY3VycilcbiAgICAgIHJldHVybiBsYXN0XG4gICAgfSwge30pXG4gIH0gZWxzZSBpZiAodHlwZW9mIGF0dHIgPT09ICdvYmplY3QnICYmIGF0dHIuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgIC8vIGFwcGx5IGV2ZXJ5IGF0dHJpYnV0ZSBpbmRpdmlkdWFsbHkgaWYgYW4gb2JqZWN0IGlzIHBhc3NlZFxuICAgIGZvciAodmFsIGluIGF0dHIpIHRoaXMuYXR0cih2YWwsIGF0dHJbdmFsXSlcbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAvLyByZW1vdmUgdmFsdWVcbiAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpXG4gIH0gZWxzZSBpZiAodmFsID09IG51bGwpIHtcbiAgICAvLyBhY3QgYXMgYSBnZXR0ZXIgaWYgdGhlIGZpcnN0IGFuZCBvbmx5IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3RcbiAgICB2YWwgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgcmV0dXJuIHZhbCA9PSBudWxsXG4gICAgICA/IGRlZmF1bHRzW2F0dHJdXG4gICAgICA6IGlzTnVtYmVyLnRlc3QodmFsKVxuICAgICAgICA/IHBhcnNlRmxvYXQodmFsKVxuICAgICAgICA6IHZhbFxuICB9IGVsc2Uge1xuICAgIC8vIExvb3AgdGhyb3VnaCBob29rcyBhbmQgZXhlY3V0ZSB0aGVtIHRvIGNvbnZlcnQgdmFsdWVcbiAgICB2YWwgPSBob29rcy5yZWR1Y2UoKF92YWwsIGhvb2spID0+IHtcbiAgICAgIHJldHVybiBob29rKGF0dHIsIF92YWwsIHRoaXMpXG4gICAgfSwgdmFsKVxuXG4gICAgLy8gZW5zdXJlIGNvcnJlY3QgbnVtZXJpYyB2YWx1ZXMgKGFsc28gYWNjZXB0cyBOYU4gYW5kIEluZmluaXR5KVxuICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgdmFsID0gbmV3IFNWR051bWJlcih2YWwpXG4gICAgfSBlbHNlIGlmIChjb2xvckF0dHJpYnV0ZXMuaGFzKGF0dHIpICYmIENvbG9yLmlzQ29sb3IodmFsKSkge1xuICAgICAgLy8gZW5zdXJlIGZ1bGwgaGV4IGNvbG9yXG4gICAgICB2YWwgPSBuZXcgQ29sb3IodmFsKVxuICAgIH0gZWxzZSBpZiAodmFsLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgLy8gQ2hlY2sgZm9yIHBsYWluIGFycmF5cyBhbmQgcGFyc2UgYXJyYXkgdmFsdWVzXG4gICAgICB2YWwgPSBuZXcgU1ZHQXJyYXkodmFsKVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBwYXNzZWQgYXR0cmlidXRlIGlzIGxlYWRpbmcuLi5cbiAgICBpZiAoYXR0ciA9PT0gJ2xlYWRpbmcnKSB7XG4gICAgICAvLyAuLi4gY2FsbCB0aGUgbGVhZGluZyBtZXRob2QgaW5zdGVhZFxuICAgICAgaWYgKHRoaXMubGVhZGluZykge1xuICAgICAgICB0aGlzLmxlYWRpbmcodmFsKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQgZ2l2ZW4gYXR0cmlidXRlIG9uIG5vZGVcbiAgICAgIHR5cGVvZiBucyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyB0aGlzLm5vZGUuc2V0QXR0cmlidXRlTlMobnMsIGF0dHIsIHZhbC50b1N0cmluZygpKVxuICAgICAgICA6IHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsLnRvU3RyaW5nKCkpXG4gICAgfVxuXG4gICAgLy8gcmVidWlsZCBpZiByZXF1aXJlZFxuICAgIGlmICh0aGlzLnJlYnVpbGQgJiYgKGF0dHIgPT09ICdmb250LXNpemUnIHx8IGF0dHIgPT09ICd4JykpIHtcbiAgICAgIHRoaXMucmVidWlsZCgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cbiIsImltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuXG4vLyBSYWRpdXMgeCB2YWx1ZVxuZXhwb3J0IGZ1bmN0aW9uIHJ4KHJ4KSB7XG4gIHJldHVybiB0aGlzLmF0dHIoJ3J4JywgcngpXG59XG5cbi8vIFJhZGl1cyB5IHZhbHVlXG5leHBvcnQgZnVuY3Rpb24gcnkocnkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cigncnknLCByeSlcbn1cblxuLy8gTW92ZSBvdmVyIHgtYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIHgoeCkge1xuICByZXR1cm4geCA9PSBudWxsID8gdGhpcy5jeCgpIC0gdGhpcy5yeCgpIDogdGhpcy5jeCh4ICsgdGhpcy5yeCgpKVxufVxuXG4vLyBNb3ZlIG92ZXIgeS1heGlzXG5leHBvcnQgZnVuY3Rpb24geSh5KSB7XG4gIHJldHVybiB5ID09IG51bGwgPyB0aGlzLmN5KCkgLSB0aGlzLnJ5KCkgOiB0aGlzLmN5KHkgKyB0aGlzLnJ5KCkpXG59XG5cbi8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeC1heGlzXG5leHBvcnQgZnVuY3Rpb24gY3goeCkge1xuICByZXR1cm4gdGhpcy5hdHRyKCdjeCcsIHgpXG59XG5cbi8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXG5leHBvcnQgZnVuY3Rpb24gY3koeSkge1xuICByZXR1cm4gdGhpcy5hdHRyKCdjeScsIHkpXG59XG5cbi8vIFNldCB3aWR0aCBvZiBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gd2lkdGgod2lkdGgpIHtcbiAgcmV0dXJuIHdpZHRoID09IG51bGwgPyB0aGlzLnJ4KCkgKiAyIDogdGhpcy5yeChuZXcgU1ZHTnVtYmVyKHdpZHRoKS5kaXZpZGUoMikpXG59XG5cbi8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChoZWlnaHQpIHtcbiAgcmV0dXJuIGhlaWdodCA9PSBudWxsXG4gICAgPyB0aGlzLnJ5KCkgKiAyXG4gICAgOiB0aGlzLnJ5KG5ldyBTVkdOdW1iZXIoaGVpZ2h0KS5kaXZpZGUoMikpXG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4uLy4uL3R5cGVzL01hdHJpeC5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuLi8uLi90eXBlcy9Qb2ludC5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi4vLi4vdHlwZXMvQm94LmpzJ1xuaW1wb3J0IHsgcHJvcG9ydGlvbmFsU2l6ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgZ2V0V2luZG93IH0gZnJvbSAnLi4vLi4vdXRpbHMvd2luZG93LmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZG1vdmUoZHgsIGR5KSB7XG4gIHRoaXMuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGxldCBiYm94XG5cbiAgICAvLyBXZSBoYXZlIHRvIHdyYXAgdGhpcyBmb3IgZWxlbWVudHMgdGhhdCBkb250IGhhdmUgYSBiYm94XG4gICAgLy8gZS5nLiB0aXRsZSBhbmQgb3RoZXIgZGVzY3JpcHRpdmUgZWxlbWVudHNcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IHRoZSBjaGlsZHMgYmJveFxuICAgICAgLy8gQnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xOTA1MDM5XG4gICAgICAvLyBCZWNhdXNlIGJib3ggZm9yIG5lc3RlZCBzdmdzIHJldHVybnMgdGhlIGNvbnRlbnRzIGJib3ggaW4gdGhlIGNvb3JkaW5hdGUgc3BhY2Ugb2YgdGhlIHN2ZyBpdHNlbGYgKHdlaXJkISksIHdlIGNhbnQgdXNlIGJib3ggZm9yIHN2Z3NcbiAgICAgIC8vIFRoZXJlZm9yZSB3ZSBoYXZlIHRvIHVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QuIEJ1dCBUSEFUIGlzIGJyb2tlbiAoYXMgZXhwbGFpbmVkIGluIHRoZSBidWcpLlxuICAgICAgLy8gRnVubmlseSBlbm91Z2ggdGhlIGJyb2tlbiBiZWhhdmlvciB3b3VsZCB3b3JrIGZvciB1cyBidXQgdGhhdCBicmVha3MgaXQgaW4gY2hyb21lXG4gICAgICAvLyBTbyB3ZSBoYXZlIHRvIHJlcGxpY2F0ZSB0aGUgYnJva2VuIGJlaGF2aW9yIG9mIEZGIGJ5IGp1c3QgcmVhZGluZyB0aGUgYXR0cmlidXRlcyBvZiB0aGUgc3ZnIGl0c2VsZlxuICAgICAgYmJveCA9XG4gICAgICAgIGNoaWxkLm5vZGUgaW5zdGFuY2VvZiBnZXRXaW5kb3coKS5TVkdTVkdFbGVtZW50XG4gICAgICAgICAgPyBuZXcgQm94KGNoaWxkLmF0dHIoWyd4JywgJ3knLCAnd2lkdGgnLCAnaGVpZ2h0J10pKVxuICAgICAgICAgIDogY2hpbGQuYmJveCgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gR2V0IGNoaWxkcyBtYXRyaXhcbiAgICBjb25zdCBtID0gbmV3IE1hdHJpeChjaGlsZClcbiAgICAvLyBUcmFuc2xhdGUgY2hpbGRzIG1hdHJpeCBieSBhbW91bnQgYW5kXG4gICAgLy8gdHJhbnNmb3JtIGl0IGJhY2sgaW50byBwYXJlbnRzIHNwYWNlXG4gICAgY29uc3QgbWF0cml4ID0gbS50cmFuc2xhdGUoZHgsIGR5KS50cmFuc2Zvcm0obS5pbnZlcnNlKCkpXG4gICAgLy8gQ2FsY3VsYXRlIG5ldyB4IGFuZCB5IGZyb20gb2xkIGJveFxuICAgIGNvbnN0IHAgPSBuZXcgUG9pbnQoYmJveC54LCBiYm94LnkpLnRyYW5zZm9ybShtYXRyaXgpXG4gICAgLy8gTW92ZSBlbGVtZW50XG4gICAgY2hpbGQubW92ZShwLngsIHAueSlcbiAgfSlcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHgoZHgpIHtcbiAgcmV0dXJuIHRoaXMuZG1vdmUoZHgsIDApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkeShkeSkge1xuICByZXR1cm4gdGhpcy5kbW92ZSgwLCBkeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChoZWlnaHQsIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmIChoZWlnaHQgPT0gbnVsbCkgcmV0dXJuIGJveC5oZWlnaHRcbiAgcmV0dXJuIHRoaXMuc2l6ZShib3gud2lkdGgsIGhlaWdodCwgYm94KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZSh4ID0gMCwgeSA9IDAsIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGNvbnN0IGR4ID0geCAtIGJveC54XG4gIGNvbnN0IGR5ID0geSAtIGJveC55XG5cbiAgcmV0dXJuIHRoaXMuZG1vdmUoZHgsIGR5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2l6ZSh3aWR0aCwgaGVpZ2h0LCBib3ggPSB0aGlzLmJib3goKSkge1xuICBjb25zdCBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0LCBib3gpXG4gIGNvbnN0IHNjYWxlWCA9IHAud2lkdGggLyBib3gud2lkdGhcbiAgY29uc3Qgc2NhbGVZID0gcC5oZWlnaHQgLyBib3guaGVpZ2h0XG5cbiAgdGhpcy5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgY29uc3QgbyA9IG5ldyBQb2ludChib3gpLnRyYW5zZm9ybShuZXcgTWF0cml4KGNoaWxkKS5pbnZlcnNlKCkpXG4gICAgY2hpbGQuc2NhbGUoc2NhbGVYLCBzY2FsZVksIG8ueCwgby55KVxuICB9KVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aWR0aCh3aWR0aCwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHdpZHRoID09IG51bGwpIHJldHVybiBib3gud2lkdGhcbiAgcmV0dXJuIHRoaXMuc2l6ZSh3aWR0aCwgYm94LmhlaWdodCwgYm94KVxufVxuXG5leHBvcnQgZnVuY3Rpb24geCh4LCBib3ggPSB0aGlzLmJib3goKSkge1xuICBpZiAoeCA9PSBudWxsKSByZXR1cm4gYm94LnhcbiAgcmV0dXJuIHRoaXMubW92ZSh4LCBib3gueSwgYm94KVxufVxuXG5leHBvcnQgZnVuY3Rpb24geSh5LCBib3ggPSB0aGlzLmJib3goKSkge1xuICBpZiAoeSA9PSBudWxsKSByZXR1cm4gYm94LnlcbiAgcmV0dXJuIHRoaXMubW92ZShib3gueCwgeSwgYm94KVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBEZWZhdWx0IGFuaW1hdGlvbiB2YWx1ZXNcbmV4cG9ydCBjb25zdCB0aW1lbGluZSA9IHtcbiAgZHVyYXRpb246IDQwMCxcbiAgZWFzZTogJz4nLFxuICBkZWxheTogMFxufVxuXG4vLyBEZWZhdWx0IGF0dHJpYnV0ZSB2YWx1ZXNcbmV4cG9ydCBjb25zdCBhdHRycyA9IHtcbiAgLy8gZmlsbCBhbmQgc3Ryb2tlXG4gICdmaWxsLW9wYWNpdHknOiAxLFxuICAnc3Ryb2tlLW9wYWNpdHknOiAxLFxuICAnc3Ryb2tlLXdpZHRoJzogMCxcbiAgJ3N0cm9rZS1saW5lam9pbic6ICdtaXRlcicsXG4gICdzdHJva2UtbGluZWNhcCc6ICdidXR0JyxcbiAgZmlsbDogJyMwMDAwMDAnLFxuICBzdHJva2U6ICcjMDAwMDAwJyxcbiAgb3BhY2l0eTogMSxcblxuICAvLyBwb3NpdGlvblxuICB4OiAwLFxuICB5OiAwLFxuICBjeDogMCxcbiAgY3k6IDAsXG5cbiAgLy8gc2l6ZVxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwLFxuXG4gIC8vIHJhZGl1c1xuICByOiAwLFxuICByeDogMCxcbiAgcnk6IDAsXG5cbiAgLy8gZ3JhZGllbnRcbiAgb2Zmc2V0OiAwLFxuICAnc3RvcC1vcGFjaXR5JzogMSxcbiAgJ3N0b3AtY29sb3InOiAnIzAwMDAwMCcsXG5cbiAgLy8gdGV4dFxuICAndGV4dC1hbmNob3InOiAnc3RhcnQnXG59XG4iLCJpbXBvcnQgeyBkZWxpbWl0ZXIgfSBmcm9tICcuL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi8uLi91dGlscy93aW5kb3cuanMnXG5cbmxldCBsaXN0ZW5lcklkID0gMFxuZXhwb3J0IGNvbnN0IHdpbmRvd0V2ZW50cyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudHMoaW5zdGFuY2UpIHtcbiAgbGV0IG4gPSBpbnN0YW5jZS5nZXRFdmVudEhvbGRlcigpXG5cbiAgLy8gV2UgZG9udCB3YW50IHRvIHNhdmUgZXZlbnRzIGluIGdsb2JhbCBzcGFjZVxuICBpZiAobiA9PT0gZ2xvYmFscy53aW5kb3cpIG4gPSB3aW5kb3dFdmVudHNcbiAgaWYgKCFuLmV2ZW50cykgbi5ldmVudHMgPSB7fVxuICByZXR1cm4gbi5ldmVudHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50VGFyZ2V0KGluc3RhbmNlKSB7XG4gIHJldHVybiBpbnN0YW5jZS5nZXRFdmVudFRhcmdldCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckV2ZW50cyhpbnN0YW5jZSkge1xuICBsZXQgbiA9IGluc3RhbmNlLmdldEV2ZW50SG9sZGVyKClcbiAgaWYgKG4gPT09IGdsb2JhbHMud2luZG93KSBuID0gd2luZG93RXZlbnRzXG4gIGlmIChuLmV2ZW50cykgbi5ldmVudHMgPSB7fVxufVxuXG4vLyBBZGQgZXZlbnQgYmluZGVyIGluIHRoZSBTVkcgbmFtZXNwYWNlXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZSwgZXZlbnRzLCBsaXN0ZW5lciwgYmluZGluZywgb3B0aW9ucykge1xuICBjb25zdCBsID0gbGlzdGVuZXIuYmluZChiaW5kaW5nIHx8IG5vZGUpXG4gIGNvbnN0IGluc3RhbmNlID0gbWFrZUluc3RhbmNlKG5vZGUpXG4gIGNvbnN0IGJhZyA9IGdldEV2ZW50cyhpbnN0YW5jZSlcbiAgY29uc3QgbiA9IGdldEV2ZW50VGFyZ2V0KGluc3RhbmNlKVxuXG4gIC8vIGV2ZW50cyBjYW4gYmUgYW4gYXJyYXkgb2YgZXZlbnRzIG9yIGEgc3RyaW5nIG9mIGV2ZW50c1xuICBldmVudHMgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiBldmVudHMuc3BsaXQoZGVsaW1pdGVyKVxuXG4gIC8vIGFkZCBpZCB0byBsaXN0ZW5lclxuICBpZiAoIWxpc3RlbmVyLl9zdmdqc0xpc3RlbmVySWQpIHtcbiAgICBsaXN0ZW5lci5fc3ZnanNMaXN0ZW5lcklkID0gKytsaXN0ZW5lcklkXG4gIH1cblxuICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBldiA9IGV2ZW50LnNwbGl0KCcuJylbMF1cbiAgICBjb25zdCBucyA9IGV2ZW50LnNwbGl0KCcuJylbMV0gfHwgJyonXG5cbiAgICAvLyBlbnN1cmUgdmFsaWQgb2JqZWN0XG4gICAgYmFnW2V2XSA9IGJhZ1tldl0gfHwge31cbiAgICBiYWdbZXZdW25zXSA9IGJhZ1tldl1bbnNdIHx8IHt9XG5cbiAgICAvLyByZWZlcmVuY2UgbGlzdGVuZXJcbiAgICBiYWdbZXZdW25zXVtsaXN0ZW5lci5fc3ZnanNMaXN0ZW5lcklkXSA9IGxcblxuICAgIC8vIGFkZCBsaXN0ZW5lclxuICAgIG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgbCwgb3B0aW9ucyB8fCBmYWxzZSlcbiAgfSlcbn1cblxuLy8gQWRkIGV2ZW50IHVuYmluZGVyIGluIHRoZSBTVkcgbmFtZXNwYWNlXG5leHBvcnQgZnVuY3Rpb24gb2ZmKG5vZGUsIGV2ZW50cywgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBtYWtlSW5zdGFuY2Uobm9kZSlcbiAgY29uc3QgYmFnID0gZ2V0RXZlbnRzKGluc3RhbmNlKVxuICBjb25zdCBuID0gZ2V0RXZlbnRUYXJnZXQoaW5zdGFuY2UpXG5cbiAgLy8gbGlzdGVuZXIgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYSBudW1iZXJcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXIuX3N2Z2pzTGlzdGVuZXJJZFxuICAgIGlmICghbGlzdGVuZXIpIHJldHVyblxuICB9XG5cbiAgLy8gZXZlbnRzIGNhbiBiZSBhbiBhcnJheSBvZiBldmVudHMgb3IgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXG4gIGV2ZW50cyA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IChldmVudHMgfHwgJycpLnNwbGl0KGRlbGltaXRlcilcblxuICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBldiA9IGV2ZW50ICYmIGV2ZW50LnNwbGl0KCcuJylbMF1cbiAgICBjb25zdCBucyA9IGV2ZW50ICYmIGV2ZW50LnNwbGl0KCcuJylbMV1cbiAgICBsZXQgbmFtZXNwYWNlLCBsXG5cbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciByZWZlcmVuY2VcbiAgICAgIGlmIChiYWdbZXZdICYmIGJhZ1tldl1bbnMgfHwgJyonXSkge1xuICAgICAgICAvLyByZW1vdmVMaXN0ZW5lclxuICAgICAgICBuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgZXYsXG4gICAgICAgICAgYmFnW2V2XVtucyB8fCAnKiddW2xpc3RlbmVyXSxcbiAgICAgICAgICBvcHRpb25zIHx8IGZhbHNlXG4gICAgICAgIClcblxuICAgICAgICBkZWxldGUgYmFnW2V2XVtucyB8fCAnKiddW2xpc3RlbmVyXVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXYgJiYgbnMpIHtcbiAgICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciBhIG5hbWVzcGFjZWQgZXZlbnRcbiAgICAgIGlmIChiYWdbZXZdICYmIGJhZ1tldl1bbnNdKSB7XG4gICAgICAgIGZvciAobCBpbiBiYWdbZXZdW25zXSkge1xuICAgICAgICAgIG9mZihuLCBbZXYsIG5zXS5qb2luKCcuJyksIGwpXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgYmFnW2V2XVtuc11cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5zKSB7XG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSBzcGVjaWZpYyBuYW1lc3BhY2VcbiAgICAgIGZvciAoZXZlbnQgaW4gYmFnKSB7XG4gICAgICAgIGZvciAobmFtZXNwYWNlIGluIGJhZ1tldmVudF0pIHtcbiAgICAgICAgICBpZiAobnMgPT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgb2ZmKG4sIFtldmVudCwgbnNdLmpvaW4oJy4nKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2KSB7XG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50XG4gICAgICBpZiAoYmFnW2V2XSkge1xuICAgICAgICBmb3IgKG5hbWVzcGFjZSBpbiBiYWdbZXZdKSB7XG4gICAgICAgICAgb2ZmKG4sIFtldiwgbmFtZXNwYWNlXS5qb2luKCcuJykpXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgYmFnW2V2XVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBvbiBhIGdpdmVuIG5vZGVcbiAgICAgIGZvciAoZXZlbnQgaW4gYmFnKSB7XG4gICAgICAgIG9mZihuLCBldmVudClcbiAgICAgIH1cblxuICAgICAgY2xlYXJFdmVudHMoaW5zdGFuY2UpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZXZlbnQsIGRhdGEsIG9wdGlvbnMpIHtcbiAgY29uc3QgbiA9IGdldEV2ZW50VGFyZ2V0KG5vZGUpXG5cbiAgLy8gRGlzcGF0Y2ggZXZlbnRcbiAgaWYgKGV2ZW50IGluc3RhbmNlb2YgZ2xvYmFscy53aW5kb3cuRXZlbnQpIHtcbiAgICBuLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH0gZWxzZSB7XG4gICAgZXZlbnQgPSBuZXcgZ2xvYmFscy53aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnQsIHtcbiAgICAgIGRldGFpbDogZGF0YSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfSlcbiAgICBuLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH1cbiAgcmV0dXJuIGV2ZW50XG59XG4iLCJpbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uLy4uL3R5cGVzL1NWR051bWJlci5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb20oeCwgeSkge1xuICByZXR1cm4gKHRoaXMuX2VsZW1lbnQgfHwgdGhpcykudHlwZSA9PT0gJ3JhZGlhbEdyYWRpZW50J1xuICAgID8gdGhpcy5hdHRyKHsgZng6IG5ldyBTVkdOdW1iZXIoeCksIGZ5OiBuZXcgU1ZHTnVtYmVyKHkpIH0pXG4gICAgOiB0aGlzLmF0dHIoeyB4MTogbmV3IFNWR051bWJlcih4KSwgeTE6IG5ldyBTVkdOdW1iZXIoeSkgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvKHgsIHkpIHtcbiAgcmV0dXJuICh0aGlzLl9lbGVtZW50IHx8IHRoaXMpLnR5cGUgPT09ICdyYWRpYWxHcmFkaWVudCdcbiAgICA/IHRoaXMuYXR0cih7IGN4OiBuZXcgU1ZHTnVtYmVyKHgpLCBjeTogbmV3IFNWR051bWJlcih5KSB9KVxuICAgIDogdGhpcy5hdHRyKHsgeDI6IG5ldyBTVkdOdW1iZXIoeCksIHkyOiBuZXcgU1ZHTnVtYmVyKHkpIH0pXG59XG4iLCIvLyBEZWZhdWx0IG5hbWVzcGFjZXNcbmV4cG9ydCBjb25zdCBzdmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG5leHBvcnQgY29uc3QgaHRtbCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuZXhwb3J0IGNvbnN0IHhtbG5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xuZXhwb3J0IGNvbnN0IHhsaW5rID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VyKCkge1xuICAvLyBSZXVzZSBjYWNoZWQgZWxlbWVudCBpZiBwb3NzaWJsZVxuICBpZiAoIXBhcnNlci5ub2Rlcykge1xuICAgIGNvbnN0IHN2ZyA9IG1ha2VJbnN0YW5jZSgpLnNpemUoMiwgMClcbiAgICBzdmcubm9kZS5zdHlsZS5jc3NUZXh0ID0gW1xuICAgICAgJ29wYWNpdHk6IDAnLFxuICAgICAgJ3Bvc2l0aW9uOiBhYnNvbHV0ZScsXG4gICAgICAnbGVmdDogLTEwMCUnLFxuICAgICAgJ3RvcDogLTEwMCUnLFxuICAgICAgJ292ZXJmbG93OiBoaWRkZW4nXG4gICAgXS5qb2luKCc7JylcblxuICAgIHN2Zy5hdHRyKCdmb2N1c2FibGUnLCAnZmFsc2UnKVxuICAgIHN2Zy5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcblxuICAgIGNvbnN0IHBhdGggPSBzdmcucGF0aCgpLm5vZGVcblxuICAgIHBhcnNlci5ub2RlcyA9IHsgc3ZnLCBwYXRoIH1cbiAgfVxuXG4gIGlmICghcGFyc2VyLm5vZGVzLnN2Zy5ub2RlLnBhcmVudE5vZGUpIHtcbiAgICBjb25zdCBiID0gZ2xvYmFscy5kb2N1bWVudC5ib2R5IHx8IGdsb2JhbHMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgcGFyc2VyLm5vZGVzLnN2Zy5hZGRUbyhiKVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlci5ub2Rlc1xufVxuIiwiaW1wb3J0IFBvaW50QXJyYXkgZnJvbSAnLi4vLi4vdHlwZXMvUG9pbnRBcnJheS5qcydcblxuZXhwb3J0IGNvbnN0IE1vcnBoQXJyYXkgPSBQb2ludEFycmF5XG5cbi8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeC1heGlzXG5leHBvcnQgZnVuY3Rpb24geCh4KSB7XG4gIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmJib3goKS54IDogdGhpcy5tb3ZlKHgsIHRoaXMuYmJveCgpLnkpXG59XG5cbi8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXG5leHBvcnQgZnVuY3Rpb24geSh5KSB7XG4gIHJldHVybiB5ID09IG51bGwgPyB0aGlzLmJib3goKS55IDogdGhpcy5tb3ZlKHRoaXMuYmJveCgpLngsIHkpXG59XG5cbi8vIFNldCB3aWR0aCBvZiBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gd2lkdGgod2lkdGgpIHtcbiAgY29uc3QgYiA9IHRoaXMuYmJveCgpXG4gIHJldHVybiB3aWR0aCA9PSBudWxsID8gYi53aWR0aCA6IHRoaXMuc2l6ZSh3aWR0aCwgYi5oZWlnaHQpXG59XG5cbi8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChoZWlnaHQpIHtcbiAgY29uc3QgYiA9IHRoaXMuYmJveCgpXG4gIHJldHVybiBoZWlnaHQgPT0gbnVsbCA/IGIuaGVpZ2h0IDogdGhpcy5zaXplKGIud2lkdGgsIGhlaWdodClcbn1cbiIsImltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi8uLi91dGlscy91dGlscy5qcydcbmltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uLy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXG5cbi8vIEdldCBhcnJheVxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5KCkge1xuICByZXR1cm4gdGhpcy5fYXJyYXkgfHwgKHRoaXMuX2FycmF5ID0gbmV3IFBvaW50QXJyYXkodGhpcy5hdHRyKCdwb2ludHMnKSkpXG59XG5cbi8vIENsZWFyIGFycmF5IGNhY2hlXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoKSB7XG4gIGRlbGV0ZSB0aGlzLl9hcnJheVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoeCwgeSkge1xuICByZXR1cm4gdGhpcy5hdHRyKCdwb2ludHMnLCB0aGlzLmFycmF5KCkubW92ZSh4LCB5KSlcbn1cblxuLy8gUGxvdCBuZXcgcGF0aFxuZXhwb3J0IGZ1bmN0aW9uIHBsb3QocCkge1xuICByZXR1cm4gcCA9PSBudWxsXG4gICAgPyB0aGlzLmFycmF5KClcbiAgICA6IHRoaXMuY2xlYXIoKS5hdHRyKFxuICAgICAgICAncG9pbnRzJyxcbiAgICAgICAgdHlwZW9mIHAgPT09ICdzdHJpbmcnID8gcCA6ICh0aGlzLl9hcnJheSA9IG5ldyBQb2ludEFycmF5KHApKVxuICAgICAgKVxufVxuXG4vLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcbmV4cG9ydCBmdW5jdGlvbiBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgY29uc3QgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodClcbiAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgdGhpcy5hcnJheSgpLnNpemUocC53aWR0aCwgcC5oZWlnaHQpKVxufVxuIiwiLy8gUGFyc2UgdW5pdCB2YWx1ZVxuZXhwb3J0IGNvbnN0IG51bWJlckFuZFVuaXQgPVxuICAvXihbKy1dPyhcXGQrKFxcLlxcZCopP3xcXC5cXGQrKShlWystXT9cXGQrKT8pKFthLXolXSopJC9pXG5cbi8vIFBhcnNlIGhleCB2YWx1ZVxuZXhwb3J0IGNvbnN0IGhleCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2lcblxuLy8gUGFyc2UgcmdiIHZhbHVlXG5leHBvcnQgY29uc3QgcmdiID0gL3JnYlxcKChcXGQrKSwoXFxkKyksKFxcZCspXFwpL1xuXG4vLyBQYXJzZSByZWZlcmVuY2UgaWRcbmV4cG9ydCBjb25zdCByZWZlcmVuY2UgPSAvKCNbYS16X11bYS16MC05XFwtX10qKS9pXG5cbi8vIHNwbGl0cyBhIHRyYW5zZm9ybWF0aW9uIGNoYWluXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtcyA9IC9cXClcXHMqLD9cXHMqL1xuXG4vLyBXaGl0ZXNwYWNlXG5leHBvcnQgY29uc3Qgd2hpdGVzcGFjZSA9IC9cXHMvZ1xuXG4vLyBUZXN0IGhleCB2YWx1ZVxuZXhwb3J0IGNvbnN0IGlzSGV4ID0gL14jW2EtZjAtOV17M30kfF4jW2EtZjAtOV17Nn0kL2lcblxuLy8gVGVzdCByZ2IgdmFsdWVcbmV4cG9ydCBjb25zdCBpc1JnYiA9IC9ecmdiXFwoL1xuXG4vLyBUZXN0IGZvciBibGFuayBzdHJpbmdcbmV4cG9ydCBjb25zdCBpc0JsYW5rID0gL14oXFxzKyk/JC9cblxuLy8gVGVzdCBmb3IgbnVtZXJpYyBzdHJpbmdcbmV4cG9ydCBjb25zdCBpc051bWJlciA9IC9eWystXT8oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/JC9pXG5cbi8vIFRlc3QgZm9yIGltYWdlIHVybFxuZXhwb3J0IGNvbnN0IGlzSW1hZ2UgPSAvXFwuKGpwZ3xqcGVnfHBuZ3xnaWZ8c3ZnKShcXD9bXj1dKy4qKT8vaVxuXG4vLyBzcGxpdCBhdCB3aGl0ZXNwYWNlIGFuZCBjb21tYVxuZXhwb3J0IGNvbnN0IGRlbGltaXRlciA9IC9bXFxzLF0rL1xuXG4vLyBUZXN0IGZvciBwYXRoIGxldHRlclxuZXhwb3J0IGNvbnN0IGlzUGF0aExldHRlciA9IC9bTUxIVkNTUVRBWl0vaVxuIiwiaW1wb3J0IHsgYWRvcHQgfSBmcm9tICcuLi8uLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IExpc3QgZnJvbSAnLi4vLi4vdHlwZXMvTGlzdC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmFzZUZpbmQocXVlcnksIHBhcmVudCkge1xuICByZXR1cm4gbmV3IExpc3QoXG4gICAgbWFwKChwYXJlbnQgfHwgZ2xvYmFscy5kb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChxdWVyeSksIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gYWRvcHQobm9kZSlcbiAgICB9KVxuICApXG59XG5cbi8vIFNjb3BlZCBmaW5kIG1ldGhvZFxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocXVlcnkpIHtcbiAgcmV0dXJuIGJhc2VGaW5kKHF1ZXJ5LCB0aGlzLm5vZGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kT25lKHF1ZXJ5KSB7XG4gIHJldHVybiBhZG9wdCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihxdWVyeSkpXG59XG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvd2luZG93LmpzJ1xuXG4vLyBDcmVhdGUgcGxhaW4gdGV4dCBub2RlXG5leHBvcnQgZnVuY3Rpb24gcGxhaW4odGV4dCkge1xuICAvLyBjbGVhciBpZiBidWlsZCBtb2RlIGlzIGRpc2FibGVkXG4gIGlmICh0aGlzLl9idWlsZCA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLmNsZWFyKClcbiAgfVxuXG4gIC8vIGNyZWF0ZSB0ZXh0IG5vZGVcbiAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gR2V0IGxlbmd0aCBvZiB0ZXh0IGVsZW1lbnRcbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoKSB7XG4gIHJldHVybiB0aGlzLm5vZGUuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKClcbn1cblxuLy8gTW92ZSBvdmVyIHgtYXhpc1xuLy8gVGV4dCBpcyBtb3ZlZCBieSBpdHMgYm91bmRpbmcgYm94XG4vLyB0ZXh0LWFuY2hvciBkb2VzIE5PVCBtYXR0ZXJcbmV4cG9ydCBmdW5jdGlvbiB4KHgsIGJveCA9IHRoaXMuYmJveCgpKSB7XG4gIGlmICh4ID09IG51bGwpIHtcbiAgICByZXR1cm4gYm94LnhcbiAgfVxuXG4gIHJldHVybiB0aGlzLmF0dHIoJ3gnLCB0aGlzLmF0dHIoJ3gnKSArIHggLSBib3gueClcbn1cblxuLy8gTW92ZSBvdmVyIHktYXhpc1xuZXhwb3J0IGZ1bmN0aW9uIHkoeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHkgPT0gbnVsbCkge1xuICAgIHJldHVybiBib3gueVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuYXR0cigneScsIHRoaXMuYXR0cigneScpICsgeSAtIGJveC55KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZSh4LCB5LCBib3ggPSB0aGlzLmJib3goKSkge1xuICByZXR1cm4gdGhpcy54KHgsIGJveCkueSh5LCBib3gpXG59XG5cbi8vIE1vdmUgY2VudGVyIG92ZXIgeC1heGlzXG5leHBvcnQgZnVuY3Rpb24gY3goeCwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHggPT0gbnVsbCkge1xuICAgIHJldHVybiBib3guY3hcbiAgfVxuXG4gIHJldHVybiB0aGlzLmF0dHIoJ3gnLCB0aGlzLmF0dHIoJ3gnKSArIHggLSBib3guY3gpXG59XG5cbi8vIE1vdmUgY2VudGVyIG92ZXIgeS1heGlzXG5leHBvcnQgZnVuY3Rpb24gY3koeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgaWYgKHkgPT0gbnVsbCkge1xuICAgIHJldHVybiBib3guY3lcbiAgfVxuXG4gIHJldHVybiB0aGlzLmF0dHIoJ3knLCB0aGlzLmF0dHIoJ3knKSArIHkgLSBib3guY3kpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXIoeCwgeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcbiAgcmV0dXJuIHRoaXMuY3goeCwgYm94KS5jeSh5LCBib3gpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBheCh4KSB7XG4gIHJldHVybiB0aGlzLmF0dHIoJ3gnLCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXkoeSkge1xuICByZXR1cm4gdGhpcy5hdHRyKCd5JywgeSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFtb3ZlKHgsIHkpIHtcbiAgcmV0dXJuIHRoaXMuYXgoeCkuYXkoeSlcbn1cblxuLy8gRW5hYmxlIC8gZGlzYWJsZSBidWlsZCBtb2RlXG5leHBvcnQgZnVuY3Rpb24gYnVpbGQoYnVpbGQpIHtcbiAgdGhpcy5fYnVpbGQgPSAhIWJ1aWxkXG4gIHJldHVybiB0aGlzXG59XG4iLCJpbXBvcnQgeyBtYWtlSW5zdGFuY2UgfSBmcm9tICcuLi8uLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcblxuLy8gR2V0IGFsbCBzaWJsaW5ncywgaW5jbHVkaW5nIG15c2VsZlxuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmdzKCkge1xuICByZXR1cm4gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpXG59XG5cbi8vIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBzaWJsaW5nc1xuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wYXJlbnQoKS5pbmRleCh0aGlzKVxufVxuXG4vLyBHZXQgdGhlIG5leHQgZWxlbWVudCAod2lsbCByZXR1cm4gbnVsbCBpZiB0aGVyZSBpcyBub25lKVxuZXhwb3J0IGZ1bmN0aW9uIG5leHQoKSB7XG4gIHJldHVybiB0aGlzLnNpYmxpbmdzKClbdGhpcy5wb3NpdGlvbigpICsgMV1cbn1cblxuLy8gR2V0IHRoZSBuZXh0IGVsZW1lbnQgKHdpbGwgcmV0dXJuIG51bGwgaWYgdGhlcmUgaXMgbm9uZSlcbmV4cG9ydCBmdW5jdGlvbiBwcmV2KCkge1xuICByZXR1cm4gdGhpcy5zaWJsaW5ncygpW3RoaXMucG9zaXRpb24oKSAtIDFdXG59XG5cbi8vIFNlbmQgZ2l2ZW4gZWxlbWVudCBvbmUgc3RlcCBmb3J3YXJkXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgY29uc3QgaSA9IHRoaXMucG9zaXRpb24oKVxuICBjb25zdCBwID0gdGhpcy5wYXJlbnQoKVxuXG4gIC8vIG1vdmUgbm9kZSBvbmUgc3RlcCBmb3J3YXJkXG4gIHAuYWRkKHRoaXMucmVtb3ZlKCksIGkgKyAxKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFNlbmQgZ2l2ZW4gZWxlbWVudCBvbmUgc3RlcCBiYWNrd2FyZFxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkKCkge1xuICBjb25zdCBpID0gdGhpcy5wb3NpdGlvbigpXG4gIGNvbnN0IHAgPSB0aGlzLnBhcmVudCgpXG5cbiAgcC5hZGQodGhpcy5yZW1vdmUoKSwgaSA/IGkgLSAxIDogMClcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgYWxsIHRoZSB3YXkgdG8gdGhlIGZyb250XG5leHBvcnQgZnVuY3Rpb24gZnJvbnQoKSB7XG4gIGNvbnN0IHAgPSB0aGlzLnBhcmVudCgpXG5cbiAgLy8gTW92ZSBub2RlIGZvcndhcmRcbiAgcC5hZGQodGhpcy5yZW1vdmUoKSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgYWxsIHRoZSB3YXkgdG8gdGhlIGJhY2tcbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCkge1xuICBjb25zdCBwID0gdGhpcy5wYXJlbnQoKVxuXG4gIC8vIE1vdmUgbm9kZSBiYWNrXG4gIHAuYWRkKHRoaXMucmVtb3ZlKCksIDApXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSW5zZXJ0cyBhIGdpdmVuIGVsZW1lbnQgYmVmb3JlIHRoZSB0YXJnZXRlZCBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlKGVsZW1lbnQpIHtcbiAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxuICBlbGVtZW50LnJlbW92ZSgpXG5cbiAgY29uc3QgaSA9IHRoaXMucG9zaXRpb24oKVxuXG4gIHRoaXMucGFyZW50KCkuYWRkKGVsZW1lbnQsIGkpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSW5zZXJ0cyBhIGdpdmVuIGVsZW1lbnQgYWZ0ZXIgdGhlIHRhcmdldGVkIGVsZW1lbnRcbmV4cG9ydCBmdW5jdGlvbiBhZnRlcihlbGVtZW50KSB7XG4gIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcbiAgZWxlbWVudC5yZW1vdmUoKVxuXG4gIGNvbnN0IGkgPSB0aGlzLnBvc2l0aW9uKClcblxuICB0aGlzLnBhcmVudCgpLmFkZChlbGVtZW50LCBpICsgMSlcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGVsZW1lbnQpIHtcbiAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxuICBlbGVtZW50LmJlZm9yZSh0aGlzKVxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoZWxlbWVudCkge1xuICBlbGVtZW50ID0gbWFrZUluc3RhbmNlKGVsZW1lbnQpXG4gIGVsZW1lbnQuYWZ0ZXIodGhpcylcbiAgcmV0dXJuIHRoaXNcbn1cblxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7XG4gIHNpYmxpbmdzLFxuICBwb3NpdGlvbixcbiAgbmV4dCxcbiAgcHJldixcbiAgZm9yd2FyZCxcbiAgYmFja3dhcmQsXG4gIGZyb250LFxuICBiYWNrLFxuICBiZWZvcmUsXG4gIGFmdGVyLFxuICBpbnNlcnRCZWZvcmUsXG4gIGluc2VydEFmdGVyXG59KVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vY29yZS9yZWdleC5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXG5cbi8vIFJldHVybiBhcnJheSBvZiBjbGFzc2VzIG9uIHRoZSBub2RlXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NlcygpIHtcbiAgY29uc3QgYXR0ciA9IHRoaXMuYXR0cignY2xhc3MnKVxuICByZXR1cm4gYXR0ciA9PSBudWxsID8gW10gOiBhdHRyLnRyaW0oKS5zcGxpdChkZWxpbWl0ZXIpXG59XG5cbi8vIFJldHVybiB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiB0aGUgbm9kZSwgZmFsc2Ugb3RoZXJ3aXNlXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MobmFtZSkge1xuICByZXR1cm4gdGhpcy5jbGFzc2VzKCkuaW5kZXhPZihuYW1lKSAhPT0gLTFcbn1cblxuLy8gQWRkIGNsYXNzIHRvIHRoZSBub2RlXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3MobmFtZSkge1xuICBpZiAoIXRoaXMuaGFzQ2xhc3MobmFtZSkpIHtcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuY2xhc3NlcygpXG4gICAgYXJyYXkucHVzaChuYW1lKVxuICAgIHRoaXMuYXR0cignY2xhc3MnLCBhcnJheS5qb2luKCcgJykpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBSZW1vdmUgY2xhc3MgZnJvbSB0aGUgbm9kZVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKG5hbWUpIHtcbiAgaWYgKHRoaXMuaGFzQ2xhc3MobmFtZSkpIHtcbiAgICB0aGlzLmF0dHIoXG4gICAgICAnY2xhc3MnLFxuICAgICAgdGhpcy5jbGFzc2VzKClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjICE9PSBuYW1lXG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcgJylcbiAgICApXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBUb2dnbGUgdGhlIHByZXNlbmNlIG9mIGEgY2xhc3Mgb24gdGhlIG5vZGVcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhuYW1lKSB7XG4gIHJldHVybiB0aGlzLmhhc0NsYXNzKG5hbWUpID8gdGhpcy5yZW1vdmVDbGFzcyhuYW1lKSA6IHRoaXMuYWRkQ2xhc3MobmFtZSlcbn1cblxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7XG4gIGNsYXNzZXMsXG4gIGhhc0NsYXNzLFxuICBhZGRDbGFzcyxcbiAgcmVtb3ZlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzXG59KVxuIiwiaW1wb3J0IHsgaXNCbGFuayB9IGZyb20gJy4uL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xuXG4vLyBEeW5hbWljIHN0eWxlIGdlbmVyYXRvclxuZXhwb3J0IGZ1bmN0aW9uIGNzcyhzdHlsZSwgdmFsKSB7XG4gIGNvbnN0IHJldCA9IHt9XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gZ2V0IGZ1bGwgc3R5bGUgYXMgb2JqZWN0XG4gICAgdGhpcy5ub2RlLnN0eWxlLmNzc1RleHRcbiAgICAgIC5zcGxpdCgvXFxzKjtcXHMqLylcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiAhIWVsLmxlbmd0aFxuICAgICAgfSlcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBjb25zdCB0ID0gZWwuc3BsaXQoL1xccyo6XFxzKi8pXG4gICAgICAgIHJldFt0WzBdXSA9IHRbMV1cbiAgICAgIH0pXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgLy8gZ2V0IHN0eWxlIHByb3BlcnRpZXMgYXMgYXJyYXlcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBzdHlsZSkge1xuICAgICAgICBjb25zdCBjYXNlZCA9IG5hbWVcbiAgICAgICAgcmV0W25hbWVdID0gdGhpcy5ub2RlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoY2FzZWQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgLy8gZ2V0IHN0eWxlIGZvciBwcm9wZXJ0eVxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoc3R5bGUpXG4gICAgfVxuXG4gICAgLy8gc2V0IHN0eWxlcyBpbiBvYmplY3RcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIC8vIHNldCBlbXB0eSBzdHJpbmcgaWYgbnVsbC91bmRlZmluZWQvJycgd2FzIGdpdmVuXG4gICAgICAgIHRoaXMubm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHN0eWxlW25hbWVdID09IG51bGwgfHwgaXNCbGFuay50ZXN0KHN0eWxlW25hbWVdKSA/ICcnIDogc3R5bGVbbmFtZV1cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBzdHlsZSBmb3IgcHJvcGVydHlcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICB0aGlzLm5vZGUuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICBzdHlsZSxcbiAgICAgIHZhbCA9PSBudWxsIHx8IGlzQmxhbmsudGVzdCh2YWwpID8gJycgOiB2YWxcbiAgICApXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBTaG93IGVsZW1lbnRcbmV4cG9ydCBmdW5jdGlvbiBzaG93KCkge1xuICByZXR1cm4gdGhpcy5jc3MoJ2Rpc3BsYXknLCAnJylcbn1cblxuLy8gSGlkZSBlbGVtZW50XG5leHBvcnQgZnVuY3Rpb24gaGlkZSgpIHtcbiAgcmV0dXJuIHRoaXMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxufVxuXG4vLyBJcyBlbGVtZW50IHZpc2libGU/XG5leHBvcnQgZnVuY3Rpb24gdmlzaWJsZSgpIHtcbiAgcmV0dXJuIHRoaXMuY3NzKCdkaXNwbGF5JykgIT09ICdub25lJ1xufVxuXG5yZWdpc3Rlck1ldGhvZHMoJ0RvbScsIHtcbiAgY3NzLFxuICBzaG93LFxuICBoaWRlLFxuICB2aXNpYmxlXG59KVxuIiwiaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXG5cbi8vIFN0b3JlIGRhdGEgdmFsdWVzIG9uIHN2ZyBub2Rlc1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGEoYSwgdiwgcikge1xuICBpZiAoYSA9PSBudWxsKSB7XG4gICAgLy8gZ2V0IGFuIG9iamVjdCBvZiBhdHRyaWJ1dGVzXG4gICAgcmV0dXJuIHRoaXMuZGF0YShcbiAgICAgIG1hcChcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgIHRoaXMubm9kZS5hdHRyaWJ1dGVzLFxuICAgICAgICAgIChlbCkgPT4gZWwubm9kZU5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMFxuICAgICAgICApLFxuICAgICAgICAoZWwpID0+IGVsLm5vZGVOYW1lLnNsaWNlKDUpXG4gICAgICApXG4gICAgKVxuICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGEpIHtcbiAgICAgIGRhdGFba2V5XSA9IHRoaXMuZGF0YShrZXkpXG4gICAgfVxuICAgIHJldHVybiBkYXRhXG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yICh2IGluIGEpIHtcbiAgICAgIHRoaXMuZGF0YSh2LCBhW3ZdKVxuICAgIH1cbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmF0dHIoJ2RhdGEtJyArIGEpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2RhdGEtJyArIGEpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuYXR0cihcbiAgICAgICdkYXRhLScgKyBhLFxuICAgICAgdiA9PT0gbnVsbFxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiByID09PSB0cnVlIHx8IHR5cGVvZiB2ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcidcbiAgICAgICAgICA/IHZcbiAgICAgICAgICA6IEpTT04uc3RyaW5naWZ5KHYpXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7IGRhdGEgfSlcbiIsImltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXG5cbi8vIFJlbWVtYmVyIGFyYml0cmFyeSBkYXRhXG5leHBvcnQgZnVuY3Rpb24gcmVtZW1iZXIoaywgdikge1xuICAvLyByZW1lbWJlciBldmVyeSBpdGVtIGluIGFuIG9iamVjdCBpbmRpdmlkdWFsbHlcbiAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gaykge1xuICAgICAgdGhpcy5yZW1lbWJlcihrZXksIGtba2V5XSlcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIHJldHJpZXZlIG1lbW9yeVxuICAgIHJldHVybiB0aGlzLm1lbW9yeSgpW2tdXG4gIH0gZWxzZSB7XG4gICAgLy8gc3RvcmUgbWVtb3J5XG4gICAgdGhpcy5tZW1vcnkoKVtrXSA9IHZcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEVyYXNlIGEgZ2l2ZW4gbWVtb3J5XG5leHBvcnQgZnVuY3Rpb24gZm9yZ2V0KCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX21lbW9yeSA9IHt9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgZGVsZXRlIHRoaXMubWVtb3J5KClbYXJndW1lbnRzW2ldXVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBUaGlzIHRyaWdnZXJzIGNyZWF0aW9uIG9mIGEgbmV3IGhpZGRlbiBjbGFzcyB3aGljaCBpcyBub3QgcGVyZm9ybWFudFxuLy8gSG93ZXZlciwgdGhpcyBmdW5jdGlvbiBpcyBub3QgcmFyZWx5IHVzZWQgc28gaXQgd2lsbCBub3QgaGFwcGVuIGZyZXF1ZW50bHlcbi8vIFJldHVybiBsb2NhbCBtZW1vcnkgb2JqZWN0XG5leHBvcnQgZnVuY3Rpb24gbWVtb3J5KCkge1xuICByZXR1cm4gKHRoaXMuX21lbW9yeSA9IHRoaXMuX21lbW9yeSB8fCB7fSlcbn1cblxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7IHJlbWVtYmVyLCBmb3JnZXQsIG1lbW9yeSB9KVxuIiwiaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBDb2xvciBmcm9tICcuLi8uLi90eXBlcy9Db2xvci5qcydcbmltcG9ydCBFbGVtZW50IGZyb20gJy4uLy4uL2VsZW1lbnRzL0VsZW1lbnQuanMnXG5pbXBvcnQgTWF0cml4IGZyb20gJy4uLy4uL3R5cGVzL01hdHJpeC5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuLi8uLi90eXBlcy9Qb2ludC5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuXG4vLyBEZWZpbmUgbGlzdCBvZiBhdmFpbGFibGUgYXR0cmlidXRlcyBmb3Igc3Ryb2tlIGFuZCBmaWxsXG5jb25zdCBzdWdhciA9IHtcbiAgc3Ryb2tlOiBbXG4gICAgJ2NvbG9yJyxcbiAgICAnd2lkdGgnLFxuICAgICdvcGFjaXR5JyxcbiAgICAnbGluZWNhcCcsXG4gICAgJ2xpbmVqb2luJyxcbiAgICAnbWl0ZXJsaW1pdCcsXG4gICAgJ2Rhc2hhcnJheScsXG4gICAgJ2Rhc2hvZmZzZXQnXG4gIF0sXG4gIGZpbGw6IFsnY29sb3InLCAnb3BhY2l0eScsICdydWxlJ10sXG4gIHByZWZpeDogZnVuY3Rpb24gKHQsIGEpIHtcbiAgICByZXR1cm4gYSA9PT0gJ2NvbG9yJyA/IHQgOiB0ICsgJy0nICsgYVxuICB9XG59XG5cbi8vIEFkZCBzdWdhciBmb3IgZmlsbCBhbmQgc3Ryb2tlXG47WydmaWxsJywgJ3N0cm9rZSddLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgY29uc3QgZXh0ZW5zaW9uID0ge31cbiAgbGV0IGlcblxuICBleHRlbnNpb25bbV0gPSBmdW5jdGlvbiAobykge1xuICAgIGlmICh0eXBlb2YgbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHIobSlcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG8gPT09ICdzdHJpbmcnIHx8XG4gICAgICBvIGluc3RhbmNlb2YgQ29sb3IgfHxcbiAgICAgIENvbG9yLmlzUmdiKG8pIHx8XG4gICAgICBvIGluc3RhbmNlb2YgRWxlbWVudFxuICAgICkge1xuICAgICAgdGhpcy5hdHRyKG0sIG8pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldCBhbGwgYXR0cmlidXRlcyBmcm9tIHN1Z2FyLmZpbGwgYW5kIHN1Z2FyLnN0cm9rZSBsaXN0XG4gICAgICBmb3IgKGkgPSBzdWdhclttXS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAob1tzdWdhclttXVtpXV0gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuYXR0cihzdWdhci5wcmVmaXgobSwgc3VnYXJbbV1baV0pLCBvW3N1Z2FyW21dW2ldXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZWdpc3Rlck1ldGhvZHMoWydFbGVtZW50JywgJ1J1bm5lciddLCBleHRlbnNpb24pXG59KVxuXG5yZWdpc3Rlck1ldGhvZHMoWydFbGVtZW50JywgJ1J1bm5lciddLCB7XG4gIC8vIExldCB0aGUgdXNlciBzZXQgdGhlIG1hdHJpeCBkaXJlY3RseVxuICBtYXRyaXg6IGZ1bmN0aW9uIChtYXQsIGIsIGMsIGQsIGUsIGYpIHtcbiAgICAvLyBBY3QgYXMgYSBnZXR0ZXJcbiAgICBpZiAobWF0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMpXG4gICAgfVxuXG4gICAgLy8gQWN0IGFzIGEgc2V0dGVyLCB0aGUgdXNlciBjYW4gcGFzcyBhIG1hdHJpeCBvciBhIHNldCBvZiBudW1iZXJzXG4gICAgcmV0dXJuIHRoaXMuYXR0cigndHJhbnNmb3JtJywgbmV3IE1hdHJpeChtYXQsIGIsIGMsIGQsIGUsIGYpKVxuICB9LFxuXG4gIC8vIE1hcCByb3RhdGlvbiB0byB0cmFuc2Zvcm1cbiAgcm90YXRlOiBmdW5jdGlvbiAoYW5nbGUsIGN4LCBjeSkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHJvdGF0ZTogYW5nbGUsIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gTWFwIHNrZXcgdG8gdHJhbnNmb3JtXG4gIHNrZXc6IGZ1bmN0aW9uICh4LCB5LCBjeCwgY3kpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAzXG4gICAgICA/IHRoaXMudHJhbnNmb3JtKHsgc2tldzogeCwgb3g6IHksIG95OiBjeCB9LCB0cnVlKVxuICAgICAgOiB0aGlzLnRyYW5zZm9ybSh7IHNrZXc6IFt4LCB5XSwgb3g6IGN4LCBveTogY3kgfSwgdHJ1ZSlcbiAgfSxcblxuICBzaGVhcjogZnVuY3Rpb24gKGxhbSwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgc2hlYXI6IGxhbSwgb3g6IGN4LCBveTogY3kgfSwgdHJ1ZSlcbiAgfSxcblxuICAvLyBNYXAgc2NhbGUgdG8gdHJhbnNmb3JtXG4gIHNjYWxlOiBmdW5jdGlvbiAoeCwgeSwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gM1xuICAgICAgPyB0aGlzLnRyYW5zZm9ybSh7IHNjYWxlOiB4LCBveDogeSwgb3k6IGN4IH0sIHRydWUpXG4gICAgICA6IHRoaXMudHJhbnNmb3JtKHsgc2NhbGU6IFt4LCB5XSwgb3g6IGN4LCBveTogY3kgfSwgdHJ1ZSlcbiAgfSxcblxuICAvLyBNYXAgdHJhbnNsYXRlIHRvIHRyYW5zZm9ybVxuICB0cmFuc2xhdGU6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgdHJhbnNsYXRlOiBbeCwgeV0gfSwgdHJ1ZSlcbiAgfSxcblxuICAvLyBNYXAgcmVsYXRpdmUgdHJhbnNsYXRpb25zIHRvIHRyYW5zZm9ybVxuICByZWxhdGl2ZTogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyByZWxhdGl2ZTogW3gsIHldIH0sIHRydWUpXG4gIH0sXG5cbiAgLy8gTWFwIGZsaXAgdG8gdHJhbnNmb3JtXG4gIGZsaXA6IGZ1bmN0aW9uIChkaXJlY3Rpb24gPSAnYm90aCcsIG9yaWdpbiA9ICdjZW50ZXInKSB7XG4gICAgaWYgKCd4eWJvdGh0cnVlJy5pbmRleE9mKGRpcmVjdGlvbikgPT09IC0xKSB7XG4gICAgICBvcmlnaW4gPSBkaXJlY3Rpb25cbiAgICAgIGRpcmVjdGlvbiA9ICdib3RoJ1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGZsaXA6IGRpcmVjdGlvbiwgb3JpZ2luOiBvcmlnaW4gfSwgdHJ1ZSlcbiAgfSxcblxuICAvLyBPcGFjaXR5XG4gIG9wYWNpdHk6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmF0dHIoJ29wYWNpdHknLCB2YWx1ZSlcbiAgfVxufSlcblxucmVnaXN0ZXJNZXRob2RzKCdyYWRpdXMnLCB7XG4gIC8vIEFkZCB4IGFuZCB5IHJhZGl1c1xuICByYWRpdXM6IGZ1bmN0aW9uICh4LCB5ID0geCkge1xuICAgIGNvbnN0IHR5cGUgPSAodGhpcy5fZWxlbWVudCB8fCB0aGlzKS50eXBlXG4gICAgcmV0dXJuIHR5cGUgPT09ICdyYWRpYWxHcmFkaWVudCdcbiAgICAgID8gdGhpcy5hdHRyKCdyJywgbmV3IFNWR051bWJlcih4KSlcbiAgICAgIDogdGhpcy5yeCh4KS5yeSh5KVxuICB9XG59KVxuXG5yZWdpc3Rlck1ldGhvZHMoJ1BhdGgnLCB7XG4gIC8vIEdldCBwYXRoIGxlbmd0aFxuICBsZW5ndGg6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmdldFRvdGFsTGVuZ3RoKClcbiAgfSxcbiAgLy8gR2V0IHBvaW50IGF0IGxlbmd0aFxuICBwb2ludEF0OiBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLm5vZGUuZ2V0UG9pbnRBdExlbmd0aChsZW5ndGgpKVxuICB9XG59KVxuXG5yZWdpc3Rlck1ldGhvZHMoWydFbGVtZW50JywgJ1J1bm5lciddLCB7XG4gIC8vIFNldCBmb250XG4gIGZvbnQ6IGZ1bmN0aW9uIChhLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2IGluIGEpIHRoaXMuZm9udCh2LCBhW3ZdKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICByZXR1cm4gYSA9PT0gJ2xlYWRpbmcnXG4gICAgICA/IHRoaXMubGVhZGluZyh2KVxuICAgICAgOiBhID09PSAnYW5jaG9yJ1xuICAgICAgICA/IHRoaXMuYXR0cigndGV4dC1hbmNob3InLCB2KVxuICAgICAgICA6IGEgPT09ICdzaXplJyB8fFxuICAgICAgICAgICAgYSA9PT0gJ2ZhbWlseScgfHxcbiAgICAgICAgICAgIGEgPT09ICd3ZWlnaHQnIHx8XG4gICAgICAgICAgICBhID09PSAnc3RyZXRjaCcgfHxcbiAgICAgICAgICAgIGEgPT09ICd2YXJpYW50JyB8fFxuICAgICAgICAgICAgYSA9PT0gJ3N0eWxlJ1xuICAgICAgICAgID8gdGhpcy5hdHRyKCdmb250LScgKyBhLCB2KVxuICAgICAgICAgIDogdGhpcy5hdHRyKGEsIHYpXG4gIH1cbn0pXG5cbi8vIEFkZCBldmVudHMgdG8gZWxlbWVudHNcbmNvbnN0IG1ldGhvZHMgPSBbXG4gICdjbGljaycsXG4gICdkYmxjbGljaycsXG4gICdtb3VzZWRvd24nLFxuICAnbW91c2V1cCcsXG4gICdtb3VzZW92ZXInLFxuICAnbW91c2VvdXQnLFxuICAnbW91c2Vtb3ZlJyxcbiAgJ21vdXNlZW50ZXInLFxuICAnbW91c2VsZWF2ZScsXG4gICd0b3VjaHN0YXJ0JyxcbiAgJ3RvdWNobW92ZScsXG4gICd0b3VjaGxlYXZlJyxcbiAgJ3RvdWNoZW5kJyxcbiAgJ3RvdWNoY2FuY2VsJyxcbiAgJ2NvbnRleHRtZW51JyxcbiAgJ3doZWVsJyxcbiAgJ3BvaW50ZXJkb3duJyxcbiAgJ3BvaW50ZXJtb3ZlJyxcbiAgJ3BvaW50ZXJ1cCcsXG4gICdwb2ludGVybGVhdmUnLFxuICAncG9pbnRlcmNhbmNlbCdcbl0ucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBldmVudCkge1xuICAvLyBhZGQgZXZlbnQgdG8gRWxlbWVudFxuICBjb25zdCBmbiA9IGZ1bmN0aW9uIChmKSB7XG4gICAgaWYgKGYgPT09IG51bGwpIHtcbiAgICAgIHRoaXMub2ZmKGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uKGV2ZW50LCBmKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbGFzdFtldmVudF0gPSBmblxuICByZXR1cm4gbGFzdFxufSwge30pXG5cbnJlZ2lzdGVyTWV0aG9kcygnRWxlbWVudCcsIG1ldGhvZHMpXG4iLCJpbXBvcnQgeyBnZXRPcmlnaW4sIGlzRGVzY3JpcHRpdmUgfSBmcm9tICcuLi8uLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IGRlbGltaXRlciwgdHJhbnNmb3JtcyB9IGZyb20gJy4uL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuLi8uLi90eXBlcy9NYXRyaXguanMnXG5cbi8vIFJlc2V0IGFsbCB0cmFuc2Zvcm1hdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiB1bnRyYW5zZm9ybSgpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cigndHJhbnNmb3JtJywgbnVsbClcbn1cblxuLy8gbWVyZ2UgdGhlIHdob2xlIHRyYW5zZm9ybWF0aW9uIGNoYWluIGludG8gb25lIG1hdHJpeCBhbmQgcmV0dXJucyBpdFxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeGlmeSgpIHtcbiAgY29uc3QgbWF0cml4ID0gKHRoaXMuYXR0cigndHJhbnNmb3JtJykgfHwgJycpXG4gICAgLy8gc3BsaXQgdHJhbnNmb3JtYXRpb25zXG4gICAgLnNwbGl0KHRyYW5zZm9ybXMpXG4gICAgLnNsaWNlKDAsIC0xKVxuICAgIC5tYXAoZnVuY3Rpb24gKHN0cikge1xuICAgICAgLy8gZ2VuZXJhdGUga2V5ID0+IHZhbHVlIHBhaXJzXG4gICAgICBjb25zdCBrdiA9IHN0ci50cmltKCkuc3BsaXQoJygnKVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAga3ZbMF0sXG4gICAgICAgIGt2WzFdLnNwbGl0KGRlbGltaXRlcikubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSlcbiAgICAucmV2ZXJzZSgpXG4gICAgLy8gbWVyZ2UgZXZlcnkgdHJhbnNmb3JtYXRpb24gaW50byBvbmUgbWF0cml4XG4gICAgLnJlZHVjZShmdW5jdGlvbiAobWF0cml4LCB0cmFuc2Zvcm0pIHtcbiAgICAgIGlmICh0cmFuc2Zvcm1bMF0gPT09ICdtYXRyaXgnKSB7XG4gICAgICAgIHJldHVybiBtYXRyaXgubG11bHRpcGx5KE1hdHJpeC5mcm9tQXJyYXkodHJhbnNmb3JtWzFdKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRyaXhbdHJhbnNmb3JtWzBdXS5hcHBseShtYXRyaXgsIHRyYW5zZm9ybVsxXSlcbiAgICB9LCBuZXcgTWF0cml4KCkpXG5cbiAgcmV0dXJuIG1hdHJpeFxufVxuXG4vLyBhZGQgYW4gZWxlbWVudCB0byBhbm90aGVyIHBhcmVudCB3aXRob3V0IGNoYW5naW5nIHRoZSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb24gdGhlIHNjcmVlblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGFyZW50KHBhcmVudCwgaSkge1xuICBpZiAodGhpcyA9PT0gcGFyZW50KSByZXR1cm4gdGhpc1xuXG4gIGlmIChpc0Rlc2NyaXB0aXZlKHRoaXMubm9kZSkpIHJldHVybiB0aGlzLmFkZFRvKHBhcmVudCwgaSlcblxuICBjb25zdCBjdG0gPSB0aGlzLnNjcmVlbkNUTSgpXG4gIGNvbnN0IHBDdG0gPSBwYXJlbnQuc2NyZWVuQ1RNKCkuaW52ZXJzZSgpXG5cbiAgdGhpcy5hZGRUbyhwYXJlbnQsIGkpLnVudHJhbnNmb3JtKCkudHJhbnNmb3JtKHBDdG0ubXVsdGlwbHkoY3RtKSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBzYW1lIGFzIGFib3ZlIHdpdGggcGFyZW50IGVxdWFscyByb290LXN2Z1xuZXhwb3J0IGZ1bmN0aW9uIHRvUm9vdChpKSB7XG4gIHJldHVybiB0aGlzLnRvUGFyZW50KHRoaXMucm9vdCgpLCBpKVxufVxuXG4vLyBBZGQgdHJhbnNmb3JtYXRpb25zXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKG8sIHJlbGF0aXZlKSB7XG4gIC8vIEFjdCBhcyBhIGdldHRlciBpZiBubyBvYmplY3Qgd2FzIHBhc3NlZFxuICBpZiAobyA9PSBudWxsIHx8IHR5cGVvZiBvID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGRlY29tcG9zZWQgPSBuZXcgTWF0cml4KHRoaXMpLmRlY29tcG9zZSgpXG4gICAgcmV0dXJuIG8gPT0gbnVsbCA/IGRlY29tcG9zZWQgOiBkZWNvbXBvc2VkW29dXG4gIH1cblxuICBpZiAoIU1hdHJpeC5pc01hdHJpeExpa2UobykpIHtcbiAgICAvLyBTZXQgdGhlIG9yaWdpbiBhY2NvcmRpbmcgdG8gdGhlIGRlZmluZWQgdHJhbnNmb3JtXG4gICAgbyA9IHsgLi4ubywgb3JpZ2luOiBnZXRPcmlnaW4obywgdGhpcykgfVxuICB9XG5cbiAgLy8gVGhlIHVzZXIgY2FuIHBhc3MgYSBib29sZWFuLCBhbiBFbGVtZW50IG9yIGFuIE1hdHJpeCBvciBub3RoaW5nXG4gIGNvbnN0IGNsZWFuUmVsYXRpdmUgPSByZWxhdGl2ZSA9PT0gdHJ1ZSA/IHRoaXMgOiByZWxhdGl2ZSB8fCBmYWxzZVxuICBjb25zdCByZXN1bHQgPSBuZXcgTWF0cml4KGNsZWFuUmVsYXRpdmUpLnRyYW5zZm9ybShvKVxuICByZXR1cm4gdGhpcy5hdHRyKCd0cmFuc2Zvcm0nLCByZXN1bHQpXG59XG5cbnJlZ2lzdGVyTWV0aG9kcygnRWxlbWVudCcsIHtcbiAgdW50cmFuc2Zvcm0sXG4gIG1hdHJpeGlmeSxcbiAgdG9QYXJlbnQsXG4gIHRvUm9vdCxcbiAgdHJhbnNmb3JtXG59KVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIC8vIGNvbnN0cnVjdG9yIChub2RlLyosIHtleHRlbnNpb25zID0gW119ICovKSB7XG4gIC8vICAgLy8gdGhpcy50YWdzID0gW11cbiAgLy8gICAvL1xuICAvLyAgIC8vIGZvciAobGV0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XG4gIC8vICAgLy8gICBleHRlbnNpb24uc2V0dXAuY2FsbCh0aGlzLCBub2RlKVxuICAvLyAgIC8vICAgdGhpcy50YWdzLnB1c2goZXh0ZW5zaW9uLm5hbWUpXG4gIC8vICAgLy8gfVxuICAvLyB9XG59XG4iLCJpbXBvcnQgeyBkZWxpbWl0ZXIgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9NYXRyaXguanMnXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9Qb2ludC5qcydcbmltcG9ydCBwYXJzZXIgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BhcnNlci5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbGVkQm94KGJveCkge1xuICByZXR1cm4gIWJveC53aWR0aCAmJiAhYm94LmhlaWdodCAmJiAhYm94LnggJiYgIWJveC55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21Db250YWlucyhub2RlKSB7XG4gIHJldHVybiAoXG4gICAgbm9kZSA9PT0gZ2xvYmFscy5kb2N1bWVudCB8fFxuICAgIChcbiAgICAgIGdsb2JhbHMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zIHx8XG4gICAgICBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAvLyBUaGlzIGlzIElFIC0gaXQgZG9lcyBub3Qgc3VwcG9ydCBjb250YWlucygpIGZvciB0b3AtbGV2ZWwgU1ZHc1xuICAgICAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlID09PSBnbG9iYWxzLmRvY3VtZW50XG4gICAgICB9XG4gICAgKS5jYWxsKGdsb2JhbHMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBub2RlKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIGFkZE9mZnNldCgpIHtcbiAgICAvLyBvZmZzZXQgYnkgd2luZG93IHNjcm9sbCBwb3NpdGlvbiwgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgY2hhbmdlcyB3aGVuIHdpbmRvdyBpcyBzY3JvbGxlZFxuICAgIHRoaXMueCArPSBnbG9iYWxzLndpbmRvdy5wYWdlWE9mZnNldFxuICAgIHRoaXMueSArPSBnbG9iYWxzLndpbmRvdy5wYWdlWU9mZnNldFxuICAgIHJldHVybiBuZXcgQm94KHRoaXMpXG4gIH1cblxuICBpbml0KHNvdXJjZSkge1xuICAgIGNvbnN0IGJhc2UgPSBbMCwgMCwgMCwgMF1cbiAgICBzb3VyY2UgPVxuICAgICAgdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBzb3VyY2Uuc3BsaXQoZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdClcbiAgICAgICAgOiBBcnJheS5pc0FycmF5KHNvdXJjZSlcbiAgICAgICAgICA/IHNvdXJjZVxuICAgICAgICAgIDogdHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIHNvdXJjZS5sZWZ0ICE9IG51bGwgPyBzb3VyY2UubGVmdCA6IHNvdXJjZS54LFxuICAgICAgICAgICAgICAgIHNvdXJjZS50b3AgIT0gbnVsbCA/IHNvdXJjZS50b3AgOiBzb3VyY2UueSxcbiAgICAgICAgICAgICAgICBzb3VyY2Uud2lkdGgsXG4gICAgICAgICAgICAgICAgc291cmNlLmhlaWdodFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IGFyZ3VtZW50cy5sZW5ndGggPT09IDRcbiAgICAgICAgICAgICAgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgOiBiYXNlXG5cbiAgICB0aGlzLnggPSBzb3VyY2VbMF0gfHwgMFxuICAgIHRoaXMueSA9IHNvdXJjZVsxXSB8fCAwXG4gICAgdGhpcy53aWR0aCA9IHRoaXMudyA9IHNvdXJjZVsyXSB8fCAwXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmggPSBzb3VyY2VbM10gfHwgMFxuXG4gICAgLy8gQWRkIG1vcmUgYm91bmRpbmcgYm94IHByb3BlcnRpZXNcbiAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53XG4gICAgdGhpcy55MiA9IHRoaXMueSArIHRoaXMuaFxuICAgIHRoaXMuY3ggPSB0aGlzLnggKyB0aGlzLncgLyAyXG4gICAgdGhpcy5jeSA9IHRoaXMueSArIHRoaXMuaCAvIDJcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpc051bGxlZCgpIHtcbiAgICByZXR1cm4gaXNOdWxsZWRCb3godGhpcylcbiAgfVxuXG4gIC8vIE1lcmdlIHJlY3QgYm94IHdpdGggYW5vdGhlciwgcmV0dXJuIGEgbmV3IGluc3RhbmNlXG4gIG1lcmdlKGJveCkge1xuICAgIGNvbnN0IHggPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxuICAgIGNvbnN0IHkgPSBNYXRoLm1pbih0aGlzLnksIGJveC55KVxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgodGhpcy54ICsgdGhpcy53aWR0aCwgYm94LnggKyBib3gud2lkdGgpIC0geFxuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KHRoaXMueSArIHRoaXMuaGVpZ2h0LCBib3gueSArIGJveC5oZWlnaHQpIC0geVxuXG4gICAgcmV0dXJuIG5ldyBCb3goeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgJyAnICsgdGhpcy55ICsgJyAnICsgdGhpcy53aWR0aCArICcgJyArIHRoaXMuaGVpZ2h0XG4gIH1cblxuICB0cmFuc2Zvcm0obSkge1xuICAgIGlmICghKG0gaW5zdGFuY2VvZiBNYXRyaXgpKSB7XG4gICAgICBtID0gbmV3IE1hdHJpeChtKVxuICAgIH1cblxuICAgIGxldCB4TWluID0gSW5maW5pdHlcbiAgICBsZXQgeE1heCA9IC1JbmZpbml0eVxuICAgIGxldCB5TWluID0gSW5maW5pdHlcbiAgICBsZXQgeU1heCA9IC1JbmZpbml0eVxuXG4gICAgY29uc3QgcHRzID0gW1xuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KSxcbiAgICAgIG5ldyBQb2ludCh0aGlzLngyLCB0aGlzLnkpLFxuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55MiksXG4gICAgICBuZXcgUG9pbnQodGhpcy54MiwgdGhpcy55MilcbiAgICBdXG5cbiAgICBwdHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgcCA9IHAudHJhbnNmb3JtKG0pXG4gICAgICB4TWluID0gTWF0aC5taW4oeE1pbiwgcC54KVxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcbiAgICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCBwLnkpXG4gICAgICB5TWF4ID0gTWF0aC5tYXgoeU1heCwgcC55KVxuICAgIH0pXG5cbiAgICByZXR1cm4gbmV3IEJveCh4TWluLCB5TWluLCB4TWF4IC0geE1pbiwgeU1heCAtIHlNaW4pXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm94KGVsLCBnZXRCQm94Rm4sIHJldHJ5KSB7XG4gIGxldCBib3hcblxuICB0cnkge1xuICAgIC8vIFRyeSB0byBnZXQgdGhlIGJveCB3aXRoIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgIGJveCA9IGdldEJCb3hGbihlbC5ub2RlKVxuXG4gICAgLy8gSWYgdGhlIGJveCBpcyB3b3J0aGxlc3MgYW5kIG5vdCBldmVuIGluIHRoZSBkb20sIHJldHJ5XG4gICAgLy8gYnkgdGhyb3dpbmcgYW4gZXJyb3IgaGVyZS4uLlxuICAgIGlmIChpc051bGxlZEJveChib3gpICYmICFkb21Db250YWlucyhlbC5ub2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBpbiB0aGUgZG9tJylcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyAuLi4gYW5kIGNhbGxpbmcgdGhlIHJldHJ5IGhhbmRsZXIgaGVyZVxuICAgIGJveCA9IHJldHJ5KGVsKVxuICB9XG5cbiAgcmV0dXJuIGJveFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmJveCgpIHtcbiAgLy8gRnVuY3Rpb24gdG8gZ2V0IGJib3ggaXMgZ2V0QkJveCgpXG4gIGNvbnN0IGdldEJCb3ggPSAobm9kZSkgPT4gbm9kZS5nZXRCQm94KClcblxuICAvLyBUYWtlIGFsbCBtZWFzdXJlcyBzbyB0aGF0IGEgc3R1cGlkIGJyb3dzZXIgcmVuZGVycyB0aGUgZWxlbWVudFxuICAvLyBzbyB3ZSBjYW4gZ2V0IHRoZSBiYm94IGZyb20gaXQgd2hlbiB3ZSB0cnkgYWdhaW5cbiAgY29uc3QgcmV0cnkgPSAoZWwpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2xvbmUgPSBlbC5jbG9uZSgpLmFkZFRvKHBhcnNlcigpLnN2Zykuc2hvdygpXG4gICAgICBjb25zdCBib3ggPSBjbG9uZS5ub2RlLmdldEJCb3goKVxuICAgICAgY2xvbmUucmVtb3ZlKClcbiAgICAgIHJldHVybiBib3hcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBXZSBnaXZlIHVwLi4uXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBHZXR0aW5nIGJib3ggb2YgZWxlbWVudCBcIiR7XG4gICAgICAgICAgZWwubm9kZS5ub2RlTmFtZVxuICAgICAgICB9XCIgaXMgbm90IHBvc3NpYmxlOiAke2UudG9TdHJpbmcoKX1gXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYm94ID0gZ2V0Qm94KHRoaXMsIGdldEJCb3gsIHJldHJ5KVxuICBjb25zdCBiYm94ID0gbmV3IEJveChib3gpXG5cbiAgcmV0dXJuIGJib3hcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJib3goZWwpIHtcbiAgY29uc3QgZ2V0UkJveCA9IChub2RlKSA9PiBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IHJldHJ5ID0gKGVsKSA9PiB7XG4gICAgLy8gVGhlcmUgaXMgbm8gcG9pbnQgaW4gdHJ5aW5nIHRyaWNrcyBoZXJlIGJlY2F1c2UgaWYgd2UgaW5zZXJ0IHRoZSBlbGVtZW50IGludG8gdGhlIGRvbSBvdXJzZWx2ZXNcbiAgICAvLyBpdCBvYnZpb3VzbHkgd2lsbCBiZSBhdCB0aGUgd3JvbmcgcG9zaXRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgR2V0dGluZyByYm94IG9mIGVsZW1lbnQgXCIke2VsLm5vZGUubm9kZU5hbWV9XCIgaXMgbm90IHBvc3NpYmxlYFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGJveCA9IGdldEJveCh0aGlzLCBnZXRSQm94LCByZXRyeSlcbiAgY29uc3QgcmJveCA9IG5ldyBCb3goYm94KVxuXG4gIC8vIElmIGFuIGVsZW1lbnQgd2FzIHBhc3NlZCwgd2Ugd2FudCB0aGUgYmJveCBpbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhhdCBlbGVtZW50XG4gIGlmIChlbCkge1xuICAgIHJldHVybiByYm94LnRyYW5zZm9ybShlbC5zY3JlZW5DVE0oKS5pbnZlcnNlTygpKVxuICB9XG5cbiAgLy8gRWxzZSB3ZSB3YW50IGl0IGluIGFic29sdXRlIHNjcmVlbiBjb29yZGluYXRlc1xuICAvLyBUaGVyZWZvcmUgd2UgbmVlZCB0byBhZGQgdGhlIHNjcm9sbE9mZnNldFxuICByZXR1cm4gcmJveC5hZGRPZmZzZXQoKVxufVxuXG4vLyBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gcG9pbnQgaXMgaW5zaWRlIHRoZSBib3VuZGluZyBib3hcbmV4cG9ydCBmdW5jdGlvbiBpbnNpZGUoeCwgeSkge1xuICBjb25zdCBib3ggPSB0aGlzLmJib3goKVxuXG4gIHJldHVybiAoXG4gICAgeCA+IGJveC54ICYmIHkgPiBib3gueSAmJiB4IDwgYm94LnggKyBib3gud2lkdGggJiYgeSA8IGJveC55ICsgYm94LmhlaWdodFxuICApXG59XG5cbnJlZ2lzdGVyTWV0aG9kcyh7XG4gIHZpZXdib3g6IHtcbiAgICB2aWV3Ym94KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIC8vIGFjdCBhcyBnZXR0ZXJcbiAgICAgIGlmICh4ID09IG51bGwpIHJldHVybiBuZXcgQm94KHRoaXMuYXR0cigndmlld0JveCcpKVxuXG4gICAgICAvLyBhY3QgYXMgc2V0dGVyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCd2aWV3Qm94JywgbmV3IEJveCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSlcbiAgICB9LFxuXG4gICAgem9vbShsZXZlbCwgcG9pbnQpIHtcbiAgICAgIC8vIEl0cyBiZXN0IHRvIHJlbHkgb24gdGhlIGF0dHJpYnV0ZXMgaGVyZSBhbmQgaGVyZSBpcyB3aHk6XG4gICAgICAvLyBjbGllbnRYWVo6IERvZXNuJ3Qgd29yayBvbiBub24tcm9vdCBzdmdzIGJlY2F1c2UgdGhleSBkb250IGhhdmUgYSBDU1NCb3ggKHNpbGx5ISlcbiAgICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogRG9lc24ndCB3b3JrIGJlY2F1c2UgQ2hyb21lIGp1c3QgaWdub3JlcyB3aWR0aCBhbmQgaGVpZ2h0IG9mIG5lc3RlZCBzdmdzIGNvbXBsZXRlbHlcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBtZWFucywgdGhlaXIgY2xpZW50UmVjdCBpcyBhbHdheXMgYXMgYmlnIGFzIHRoZSBjb250ZW50LlxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBGdXJ0aGVybW9yZSB0aGlzIHNpemUgaXMgaW5jb3JyZWN0IGlmIHRoZSBlbGVtZW50IGlzIGZ1cnRoZXIgdHJhbnNmb3JtZWQgYnkgaXRzIHBhcmVudHNcbiAgICAgIC8vIGNvbXB1dGVkU3R5bGU6IE9ubHkgcmV0dXJucyBtZWFuaW5nZnVsIHZhbHVlcyBpZiBjc3Mgd2FzIHVzZWQgd2l0aCBweC4gV2UgZG9udCBnbyB0aGlzIHJvdXRlIGhlcmUhXG4gICAgICAvLyBnZXRCQm94OiByZXR1cm5zIHRoZSBib3VuZGluZyBib3ggb2YgaXRzIGNvbnRlbnQgLSB0aGF0IGRvZXNuJ3QgaGVscCFcbiAgICAgIGxldCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuYXR0cihbJ3dpZHRoJywgJ2hlaWdodCddKVxuXG4gICAgICAvLyBXaWR0aCBhbmQgaGVpZ2h0IGlzIGEgc3RyaW5nIHdoZW4gYSBudW1iZXIgd2l0aCBhIHVuaXQgaXMgcHJlc2VudCB3aGljaCB3ZSBjYW4ndCB1c2VcbiAgICAgIC8vIFNvIHdlIHRyeSBjbGllbnRYWVpcbiAgICAgIGlmIChcbiAgICAgICAgKCF3aWR0aCAmJiAhaGVpZ2h0KSB8fFxuICAgICAgICB0eXBlb2Ygd2lkdGggPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiBoZWlnaHQgPT09ICdzdHJpbmcnXG4gICAgICApIHtcbiAgICAgICAgd2lkdGggPSB0aGlzLm5vZGUuY2xpZW50V2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5ub2RlLmNsaWVudEhlaWdodFxuICAgICAgfVxuXG4gICAgICAvLyBHaXZpbmcgdXAuLi5cbiAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0ltcG9zc2libGUgdG8gZ2V0IGFic29sdXRlIHdpZHRoIGFuZCBoZWlnaHQuIFBsZWFzZSBwcm92aWRlIGFuIGFic29sdXRlIHdpZHRoIGFuZCBoZWlnaHQgYXR0cmlidXRlIG9uIHRoZSB6b29taW5nIGVsZW1lbnQnXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgdiA9IHRoaXMudmlld2JveCgpXG5cbiAgICAgIGNvbnN0IHpvb21YID0gd2lkdGggLyB2LndpZHRoXG4gICAgICBjb25zdCB6b29tWSA9IGhlaWdodCAvIHYuaGVpZ2h0XG4gICAgICBjb25zdCB6b29tID0gTWF0aC5taW4oem9vbVgsIHpvb21ZKVxuXG4gICAgICBpZiAobGV2ZWwgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gem9vbVxuICAgICAgfVxuXG4gICAgICBsZXQgem9vbUFtb3VudCA9IHpvb20gLyBsZXZlbFxuXG4gICAgICAvLyBTZXQgdGhlIHpvb21BbW91bnQgdG8gdGhlIGhpZ2hlc3QgdmFsdWUgd2hpY2ggaXMgc2FmZSB0byBwcm9jZXNzIGFuZCByZWNvdmVyIGZyb21cbiAgICAgIC8vIFRoZSAqIDEwMCBpcyBhIGJpdCBvZiB3aWdnbGUgcm9vbSBmb3IgdGhlIG1hdHJpeCB0cmFuc2Zvcm1hdGlvblxuICAgICAgaWYgKHpvb21BbW91bnQgPT09IEluZmluaXR5KSB6b29tQW1vdW50ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLyAxMDBcblxuICAgICAgcG9pbnQgPVxuICAgICAgICBwb2ludCB8fCBuZXcgUG9pbnQod2lkdGggLyAyIC8gem9vbVggKyB2LngsIGhlaWdodCAvIDIgLyB6b29tWSArIHYueSlcblxuICAgICAgY29uc3QgYm94ID0gbmV3IEJveCh2KS50cmFuc2Zvcm0oXG4gICAgICAgIG5ldyBNYXRyaXgoeyBzY2FsZTogem9vbUFtb3VudCwgb3JpZ2luOiBwb2ludCB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gdGhpcy52aWV3Ym94KGJveClcbiAgICB9XG4gIH1cbn0pXG5cbnJlZ2lzdGVyKEJveCwgJ0JveCcpXG4iLCJpbXBvcnQgeyBoZXgsIGlzSGV4LCBpc1JnYiwgcmdiLCB3aGl0ZXNwYWNlIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuXG5mdW5jdGlvbiBzaXhEaWdpdEhleChoZXgpIHtcbiAgcmV0dXJuIGhleC5sZW5ndGggPT09IDRcbiAgICA/IFtcbiAgICAgICAgJyMnLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDIsIDMpLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDIsIDMpLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDMsIDQpLFxuICAgICAgICBoZXguc3Vic3RyaW5nKDMsIDQpXG4gICAgICBdLmpvaW4oJycpXG4gICAgOiBoZXhcbn1cblxuZnVuY3Rpb24gY29tcG9uZW50SGV4KGNvbXBvbmVudCkge1xuICBjb25zdCBpbnRlZ2VyID0gTWF0aC5yb3VuZChjb21wb25lbnQpXG4gIGNvbnN0IGJvdW5kZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGludGVnZXIpKVxuICBjb25zdCBoZXggPSBib3VuZGVkLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/ICcwJyArIGhleCA6IGhleFxufVxuXG5mdW5jdGlvbiBpcyhvYmplY3QsIHNwYWNlKSB7XG4gIGZvciAobGV0IGkgPSBzcGFjZS5sZW5ndGg7IGktLTsgKSB7XG4gICAgaWYgKG9iamVjdFtzcGFjZVtpXV0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGdldFBhcmFtZXRlcnMoYSwgYikge1xuICBjb25zdCBwYXJhbXMgPSBpcyhhLCAncmdiJylcbiAgICA/IHsgX2E6IGEuciwgX2I6IGEuZywgX2M6IGEuYiwgX2Q6IDAsIHNwYWNlOiAncmdiJyB9XG4gICAgOiBpcyhhLCAneHl6JylcbiAgICAgID8geyBfYTogYS54LCBfYjogYS55LCBfYzogYS56LCBfZDogMCwgc3BhY2U6ICd4eXonIH1cbiAgICAgIDogaXMoYSwgJ2hzbCcpXG4gICAgICAgID8geyBfYTogYS5oLCBfYjogYS5zLCBfYzogYS5sLCBfZDogMCwgc3BhY2U6ICdoc2wnIH1cbiAgICAgICAgOiBpcyhhLCAnbGFiJylcbiAgICAgICAgICA/IHsgX2E6IGEubCwgX2I6IGEuYSwgX2M6IGEuYiwgX2Q6IDAsIHNwYWNlOiAnbGFiJyB9XG4gICAgICAgICAgOiBpcyhhLCAnbGNoJylcbiAgICAgICAgICAgID8geyBfYTogYS5sLCBfYjogYS5jLCBfYzogYS5oLCBfZDogMCwgc3BhY2U6ICdsY2gnIH1cbiAgICAgICAgICAgIDogaXMoYSwgJ2NteWsnKVxuICAgICAgICAgICAgICA/IHsgX2E6IGEuYywgX2I6IGEubSwgX2M6IGEueSwgX2Q6IGEuaywgc3BhY2U6ICdjbXlrJyB9XG4gICAgICAgICAgICAgIDogeyBfYTogMCwgX2I6IDAsIF9jOiAwLCBzcGFjZTogJ3JnYicgfVxuXG4gIHBhcmFtcy5zcGFjZSA9IGIgfHwgcGFyYW1zLnNwYWNlXG4gIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY2llU3BhY2Uoc3BhY2UpIHtcbiAgaWYgKHNwYWNlID09PSAnbGFiJyB8fCBzcGFjZSA9PT0gJ3h5eicgfHwgc3BhY2UgPT09ICdsY2gnKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBodWVUb1JnYihwLCBxLCB0KSB7XG4gIGlmICh0IDwgMCkgdCArPSAxXG4gIGlmICh0ID4gMSkgdCAtPSAxXG4gIGlmICh0IDwgMSAvIDYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0XG4gIGlmICh0IDwgMSAvIDIpIHJldHVybiBxXG4gIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNlxuICByZXR1cm4gcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciB7XG4gIGNvbnN0cnVjdG9yKC4uLmlucHV0cykge1xuICAgIHRoaXMuaW5pdCguLi5pbnB1dHMpXG4gIH1cblxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGEgY29sb3JcbiAgc3RhdGljIGlzQ29sb3IoY29sb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgY29sb3IgJiYgKGNvbG9yIGluc3RhbmNlb2YgQ29sb3IgfHwgdGhpcy5pc1JnYihjb2xvcikgfHwgdGhpcy50ZXN0KGNvbG9yKSlcbiAgICApXG4gIH1cblxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGFuIHJnYiBvYmplY3RcbiAgc3RhdGljIGlzUmdiKGNvbG9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbG9yICYmXG4gICAgICB0eXBlb2YgY29sb3IuciA9PT0gJ251bWJlcicgJiZcbiAgICAgIHR5cGVvZiBjb2xvci5nID09PSAnbnVtYmVyJyAmJlxuICAgICAgdHlwZW9mIGNvbG9yLmIgPT09ICdudW1iZXInXG4gICAgKVxuICB9XG5cbiAgLypcbiAgR2VuZXJhdGluZyByYW5kb20gY29sb3JzXG4gICovXG4gIHN0YXRpYyByYW5kb20obW9kZSA9ICd2aWJyYW50JywgdCkge1xuICAgIC8vIEdldCB0aGUgbWF0aCBtb2R1bGVzXG4gICAgY29uc3QgeyByYW5kb20sIHJvdW5kLCBzaW4sIFBJOiBwaSB9ID0gTWF0aFxuXG4gICAgLy8gUnVuIHRoZSBjb3JyZWN0IGdlbmVyYXRvclxuICAgIGlmIChtb2RlID09PSAndmlicmFudCcpIHtcbiAgICAgIGNvbnN0IGwgPSAoODEgLSA1NykgKiByYW5kb20oKSArIDU3XG4gICAgICBjb25zdCBjID0gKDgzIC0gNDUpICogcmFuZG9tKCkgKyA0NVxuICAgICAgY29uc3QgaCA9IDM2MCAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBjLCBoLCAnbGNoJylcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ3NpbmUnKSB7XG4gICAgICB0ID0gdCA9PSBudWxsID8gcmFuZG9tKCkgOiB0XG4gICAgICBjb25zdCByID0gcm91bmQoODAgKiBzaW4oKDIgKiBwaSAqIHQpIC8gMC41ICsgMC4wMSkgKyAxNTApXG4gICAgICBjb25zdCBnID0gcm91bmQoNTAgKiBzaW4oKDIgKiBwaSAqIHQpIC8gMC41ICsgNC42KSArIDIwMClcbiAgICAgIGNvbnN0IGIgPSByb3VuZCgxMDAgKiBzaW4oKDIgKiBwaSAqIHQpIC8gMC41ICsgMi4zKSArIDE1MClcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKHIsIGcsIGIpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdwYXN0ZWwnKSB7XG4gICAgICBjb25zdCBsID0gKDk0IC0gODYpICogcmFuZG9tKCkgKyA4NlxuICAgICAgY29uc3QgYyA9ICgyNiAtIDkpICogcmFuZG9tKCkgKyA5XG4gICAgICBjb25zdCBoID0gMzYwICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGMsIGgsICdsY2gnKVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnZGFyaycpIHtcbiAgICAgIGNvbnN0IGwgPSAxMCArIDEwICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGMgPSAoMTI1IC0gNzUpICogcmFuZG9tKCkgKyA4NlxuICAgICAgY29uc3QgaCA9IDM2MCAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBjLCBoLCAnbGNoJylcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ3JnYicpIHtcbiAgICAgIGNvbnN0IHIgPSAyNTUgKiByYW5kb20oKVxuICAgICAgY29uc3QgZyA9IDI1NSAqIHJhbmRvbSgpXG4gICAgICBjb25zdCBiID0gMjU1ICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKHIsIGcsIGIpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdsYWInKSB7XG4gICAgICBjb25zdCBsID0gMTAwICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGEgPSAyNTYgKiByYW5kb20oKSAtIDEyOFxuICAgICAgY29uc3QgYiA9IDI1NiAqIHJhbmRvbSgpIC0gMTI4XG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBhLCBiLCAnbGFiJylcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2dyZXknKSB7XG4gICAgICBjb25zdCBncmV5ID0gMjU1ICogcmFuZG9tKClcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGdyZXksIGdyZXksIGdyZXkpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCByYW5kb20gY29sb3IgbW9kZScpXG4gICAgfVxuICB9XG5cbiAgLy8gVGVzdCBpZiBnaXZlbiB2YWx1ZSBpcyBhIGNvbG9yIHN0cmluZ1xuICBzdGF0aWMgdGVzdChjb2xvcikge1xuICAgIHJldHVybiB0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnICYmIChpc0hleC50ZXN0KGNvbG9yKSB8fCBpc1JnYi50ZXN0KGNvbG9yKSlcbiAgfVxuXG4gIGNteWsoKSB7XG4gICAgLy8gR2V0IHRoZSByZ2IgdmFsdWVzIGZvciB0aGUgY3VycmVudCBjb2xvclxuICAgIGNvbnN0IHsgX2EsIF9iLCBfYyB9ID0gdGhpcy5yZ2IoKVxuICAgIGNvbnN0IFtyLCBnLCBiXSA9IFtfYSwgX2IsIF9jXS5tYXAoKHYpID0+IHYgLyAyNTUpXG5cbiAgICAvLyBHZXQgdGhlIGNteWsgdmFsdWVzIGluIGFuIHVuYm91bmRlZCBmb3JtYXRcbiAgICBjb25zdCBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYilcblxuICAgIGlmIChrID09PSAxKSB7XG4gICAgICAvLyBDYXRjaCB0aGUgYmxhY2sgY2FzZVxuICAgICAgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAxLCAnY215aycpXG4gICAgfVxuXG4gICAgY29uc3QgYyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKVxuICAgIGNvbnN0IG0gPSAoMSAtIGcgLSBrKSAvICgxIC0gaylcbiAgICBjb25zdCB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspXG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG5ldyBjb2xvclxuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGMsIG0sIHksIGssICdjbXlrJylcbiAgICByZXR1cm4gY29sb3JcbiAgfVxuXG4gIGhzbCgpIHtcbiAgICAvLyBHZXQgdGhlIHJnYiB2YWx1ZXNcbiAgICBjb25zdCB7IF9hLCBfYiwgX2MgfSA9IHRoaXMucmdiKClcbiAgICBjb25zdCBbciwgZywgYl0gPSBbX2EsIF9iLCBfY10ubWFwKCh2KSA9PiB2IC8gMjU1KVxuXG4gICAgLy8gRmluZCB0aGUgbWF4aW11bSBhbmQgbWluaW11bSB2YWx1ZXMgdG8gZ2V0IHRoZSBsaWdodG5lc3NcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKVxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpXG4gICAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMlxuXG4gICAgLy8gSWYgdGhlIHIsIGcsIHYgdmFsdWVzIGFyZSBpZGVudGljYWwgdGhlbiB3ZSBhcmUgZ3JleVxuICAgIGNvbnN0IGlzR3JleSA9IG1heCA9PT0gbWluXG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGh1ZSBhbmQgc2F0dXJhdGlvblxuICAgIGNvbnN0IGRlbHRhID0gbWF4IC0gbWluXG4gICAgY29uc3QgcyA9IGlzR3JleVxuICAgICAgPyAwXG4gICAgICA6IGwgPiAwLjVcbiAgICAgICAgPyBkZWx0YSAvICgyIC0gbWF4IC0gbWluKVxuICAgICAgICA6IGRlbHRhIC8gKG1heCArIG1pbilcbiAgICBjb25zdCBoID0gaXNHcmV5XG4gICAgICA/IDBcbiAgICAgIDogbWF4ID09PSByXG4gICAgICAgID8gKChnIC0gYikgLyBkZWx0YSArIChnIDwgYiA/IDYgOiAwKSkgLyA2XG4gICAgICAgIDogbWF4ID09PSBnXG4gICAgICAgICAgPyAoKGIgLSByKSAvIGRlbHRhICsgMikgLyA2XG4gICAgICAgICAgOiBtYXggPT09IGJcbiAgICAgICAgICAgID8gKChyIC0gZykgLyBkZWx0YSArIDQpIC8gNlxuICAgICAgICAgICAgOiAwXG5cbiAgICAvLyBDb25zdHJ1Y3QgYW5kIHJldHVybiB0aGUgbmV3IGNvbG9yXG4gICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoMzYwICogaCwgMTAwICogcywgMTAwICogbCwgJ2hzbCcpXG4gICAgcmV0dXJuIGNvbG9yXG4gIH1cblxuICBpbml0KGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBzcGFjZSA9ICdyZ2InKSB7XG4gICAgLy8gVGhpcyBjYXRjaGVzIHRoZSBjYXNlIHdoZW4gYSBmYWxzeSB2YWx1ZSBpcyBwYXNzZWQgbGlrZSAnJ1xuICAgIGEgPSAhYSA/IDAgOiBhXG5cbiAgICAvLyBSZXNldCBhbGwgdmFsdWVzIGluIGNhc2UgdGhlIGluaXQgZnVuY3Rpb24gaXMgcmVydW4gd2l0aCBuZXcgY29sb3Igc3BhY2VcbiAgICBpZiAodGhpcy5zcGFjZSkge1xuICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgaW4gdGhpcy5zcGFjZSkge1xuICAgICAgICBkZWxldGUgdGhpc1t0aGlzLnNwYWNlW2NvbXBvbmVudF1dXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gQWxsb3cgZm9yIHRoZSBjYXNlIHRoYXQgd2UgZG9uJ3QgbmVlZCBkLi4uXG4gICAgICBzcGFjZSA9IHR5cGVvZiBkID09PSAnc3RyaW5nJyA/IGQgOiBzcGFjZVxuICAgICAgZCA9IHR5cGVvZiBkID09PSAnc3RyaW5nJyA/IDAgOiBkXG5cbiAgICAgIC8vIEFzc2lnbiB0aGUgdmFsdWVzIHN0cmFpZ2h0IHRvIHRoZSBjb2xvclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IF9hOiBhLCBfYjogYiwgX2M6IGMsIF9kOiBkLCBzcGFjZSB9KVxuICAgICAgLy8gSWYgdGhlIHVzZXIgZ2F2ZSB1cyBhbiBhcnJheSwgbWFrZSB0aGUgY29sb3IgZnJvbSBpdFxuICAgIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLnNwYWNlID0gYiB8fCAodHlwZW9mIGFbM10gPT09ICdzdHJpbmcnID8gYVszXSA6IGFbNF0pIHx8ICdyZ2InXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgX2E6IGFbMF0sIF9iOiBhWzFdLCBfYzogYVsyXSwgX2Q6IGFbM10gfHwgMCB9KVxuICAgIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgLy8gU2V0IHRoZSBvYmplY3QgdXAgYW5kIGFzc2lnbiBpdHMgdmFsdWVzIGRpcmVjdGx5XG4gICAgICBjb25zdCB2YWx1ZXMgPSBnZXRQYXJhbWV0ZXJzKGEsIGIpXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHZhbHVlcylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzUmdiLnRlc3QoYSkpIHtcbiAgICAgICAgY29uc3Qgbm9XaGl0ZXNwYWNlID0gYS5yZXBsYWNlKHdoaXRlc3BhY2UsICcnKVxuICAgICAgICBjb25zdCBbX2EsIF9iLCBfY10gPSByZ2JcbiAgICAgICAgICAuZXhlYyhub1doaXRlc3BhY2UpXG4gICAgICAgICAgLnNsaWNlKDEsIDQpXG4gICAgICAgICAgLm1hcCgodikgPT4gcGFyc2VJbnQodikpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBfYSwgX2IsIF9jLCBfZDogMCwgc3BhY2U6ICdyZ2InIH0pXG4gICAgICB9IGVsc2UgaWYgKGlzSGV4LnRlc3QoYSkpIHtcbiAgICAgICAgY29uc3QgaGV4UGFyc2UgPSAodikgPT4gcGFyc2VJbnQodiwgMTYpXG4gICAgICAgIGNvbnN0IFssIF9hLCBfYiwgX2NdID0gaGV4LmV4ZWMoc2l4RGlnaXRIZXgoYSkpLm1hcChoZXhQYXJzZSlcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IF9hLCBfYiwgX2MsIF9kOiAwLCBzcGFjZTogJ3JnYicgfSlcbiAgICAgIH0gZWxzZSB0aHJvdyBFcnJvcihcIlVuc3VwcG9ydGVkIHN0cmluZyBmb3JtYXQsIGNhbid0IGNvbnN0cnVjdCBDb2xvclwiKVxuICAgIH1cblxuICAgIC8vIE5vdyBhZGQgdGhlIGNvbXBvbmVudHMgYXMgYSBjb252ZW5pZW5jZVxuICAgIGNvbnN0IHsgX2EsIF9iLCBfYywgX2QgfSA9IHRoaXNcbiAgICBjb25zdCBjb21wb25lbnRzID1cbiAgICAgIHRoaXMuc3BhY2UgPT09ICdyZ2InXG4gICAgICAgID8geyByOiBfYSwgZzogX2IsIGI6IF9jIH1cbiAgICAgICAgOiB0aGlzLnNwYWNlID09PSAneHl6J1xuICAgICAgICAgID8geyB4OiBfYSwgeTogX2IsIHo6IF9jIH1cbiAgICAgICAgICA6IHRoaXMuc3BhY2UgPT09ICdoc2wnXG4gICAgICAgICAgICA/IHsgaDogX2EsIHM6IF9iLCBsOiBfYyB9XG4gICAgICAgICAgICA6IHRoaXMuc3BhY2UgPT09ICdsYWInXG4gICAgICAgICAgICAgID8geyBsOiBfYSwgYTogX2IsIGI6IF9jIH1cbiAgICAgICAgICAgICAgOiB0aGlzLnNwYWNlID09PSAnbGNoJ1xuICAgICAgICAgICAgICAgID8geyBsOiBfYSwgYzogX2IsIGg6IF9jIH1cbiAgICAgICAgICAgICAgICA6IHRoaXMuc3BhY2UgPT09ICdjbXlrJ1xuICAgICAgICAgICAgICAgICAgPyB7IGM6IF9hLCBtOiBfYiwgeTogX2MsIGs6IF9kIH1cbiAgICAgICAgICAgICAgICAgIDoge31cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbXBvbmVudHMpXG4gIH1cblxuICBsYWIoKSB7XG4gICAgLy8gR2V0IHRoZSB4eXogY29sb3JcbiAgICBjb25zdCB7IHgsIHksIHogfSA9IHRoaXMueHl6KClcblxuICAgIC8vIEdldCB0aGUgbGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCBsID0gMTE2ICogeSAtIDE2XG4gICAgY29uc3QgYSA9IDUwMCAqICh4IC0geSlcbiAgICBjb25zdCBiID0gMjAwICogKHkgLSB6KVxuXG4gICAgLy8gQ29uc3RydWN0IGFuZCByZXR1cm4gYSBuZXcgY29sb3JcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBhLCBiLCAnbGFiJylcbiAgICByZXR1cm4gY29sb3JcbiAgfVxuXG4gIGxjaCgpIHtcbiAgICAvLyBHZXQgdGhlIGxhYiBjb2xvciBkaXJlY3RseVxuICAgIGNvbnN0IHsgbCwgYSwgYiB9ID0gdGhpcy5sYWIoKVxuXG4gICAgLy8gR2V0IHRoZSBjaHJvbWF0aWNpdHkgYW5kIHRoZSBodWUgdXNpbmcgcG9sYXIgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBjID0gTWF0aC5zcXJ0KGEgKiogMiArIGIgKiogMilcbiAgICBsZXQgaCA9ICgxODAgKiBNYXRoLmF0YW4yKGIsIGEpKSAvIE1hdGguUElcbiAgICBpZiAoaCA8IDApIHtcbiAgICAgIGggKj0gLTFcbiAgICAgIGggPSAzNjAgLSBoXG4gICAgfVxuXG4gICAgLy8gTWFrZSBhIG5ldyBjb2xvciBhbmQgcmV0dXJuIGl0XG4gICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IobCwgYywgaCwgJ2xjaCcpXG4gICAgcmV0dXJuIGNvbG9yXG4gIH1cbiAgLypcbiAgQ29udmVyc2lvbiBNZXRob2RzXG4gICovXG5cbiAgcmdiKCkge1xuICAgIGlmICh0aGlzLnNwYWNlID09PSAncmdiJykge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2UgaWYgKGNpZVNwYWNlKHRoaXMuc3BhY2UpKSB7XG4gICAgICAvLyBDb252ZXJ0IHRvIHRoZSB4eXogY29sb3Igc3BhY2VcbiAgICAgIGxldCB7IHgsIHksIHogfSA9IHRoaXNcbiAgICAgIGlmICh0aGlzLnNwYWNlID09PSAnbGFiJyB8fCB0aGlzLnNwYWNlID09PSAnbGNoJykge1xuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlcyBpbiB0aGUgbGFiIHNwYWNlXG4gICAgICAgIGxldCB7IGwsIGEsIGIgfSA9IHRoaXNcbiAgICAgICAgaWYgKHRoaXMuc3BhY2UgPT09ICdsY2gnKSB7XG4gICAgICAgICAgY29uc3QgeyBjLCBoIH0gPSB0aGlzXG4gICAgICAgICAgY29uc3QgZFRvUiA9IE1hdGguUEkgLyAxODBcbiAgICAgICAgICBhID0gYyAqIE1hdGguY29zKGRUb1IgKiBoKVxuICAgICAgICAgIGIgPSBjICogTWF0aC5zaW4oZFRvUiAqIGgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBVbmRvIHRoZSBub25saW5lYXIgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgeUwgPSAobCArIDE2KSAvIDExNlxuICAgICAgICBjb25zdCB4TCA9IGEgLyA1MDAgKyB5TFxuICAgICAgICBjb25zdCB6TCA9IHlMIC0gYiAvIDIwMFxuXG4gICAgICAgIC8vIEdldCB0aGUgeHl6IHZhbHVlc1xuICAgICAgICBjb25zdCBjdCA9IDE2IC8gMTE2XG4gICAgICAgIGNvbnN0IG14ID0gMC4wMDg4NTZcbiAgICAgICAgY29uc3Qgbm0gPSA3Ljc4N1xuICAgICAgICB4ID0gMC45NTA0NyAqICh4TCAqKiAzID4gbXggPyB4TCAqKiAzIDogKHhMIC0gY3QpIC8gbm0pXG4gICAgICAgIHkgPSAxLjAgKiAoeUwgKiogMyA+IG14ID8geUwgKiogMyA6ICh5TCAtIGN0KSAvIG5tKVxuICAgICAgICB6ID0gMS4wODg4MyAqICh6TCAqKiAzID4gbXggPyB6TCAqKiAzIDogKHpMIC0gY3QpIC8gbm0pXG4gICAgICB9XG5cbiAgICAgIC8vIENvbnZlcnQgeHl6IHRvIHVuYm91bmRlZCByZ2IgdmFsdWVzXG4gICAgICBjb25zdCByVSA9IHggKiAzLjI0MDYgKyB5ICogLTEuNTM3MiArIHogKiAtMC40OTg2XG4gICAgICBjb25zdCBnVSA9IHggKiAtMC45Njg5ICsgeSAqIDEuODc1OCArIHogKiAwLjA0MTVcbiAgICAgIGNvbnN0IGJVID0geCAqIDAuMDU1NyArIHkgKiAtMC4yMDQgKyB6ICogMS4wNTdcblxuICAgICAgLy8gQ29udmVydCB0aGUgdmFsdWVzIHRvIHRydWUgcmdiIHZhbHVlc1xuICAgICAgY29uc3QgcG93ID0gTWF0aC5wb3dcbiAgICAgIGNvbnN0IGJkID0gMC4wMDMxMzA4XG4gICAgICBjb25zdCByID0gclUgPiBiZCA/IDEuMDU1ICogcG93KHJVLCAxIC8gMi40KSAtIDAuMDU1IDogMTIuOTIgKiByVVxuICAgICAgY29uc3QgZyA9IGdVID4gYmQgPyAxLjA1NSAqIHBvdyhnVSwgMSAvIDIuNCkgLSAwLjA1NSA6IDEyLjkyICogZ1VcbiAgICAgIGNvbnN0IGIgPSBiVSA+IGJkID8gMS4wNTUgKiBwb3coYlUsIDEgLyAyLjQpIC0gMC4wNTUgOiAxMi45MiAqIGJVXG5cbiAgICAgIC8vIE1ha2UgYW5kIHJldHVybiB0aGUgY29sb3JcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKDI1NSAqIHIsIDI1NSAqIGcsIDI1NSAqIGIpXG4gICAgICByZXR1cm4gY29sb3JcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3BhY2UgPT09ICdoc2wnKSB7XG4gICAgICAvLyBodHRwczovL2Jncmlucy5naXRodWIuaW8vVGlueUNvbG9yL2RvY3MvdGlueWNvbG9yLmh0bWxcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBoc2wgdmFsdWVzXG4gICAgICBsZXQgeyBoLCBzLCBsIH0gPSB0aGlzXG4gICAgICBoIC89IDM2MFxuICAgICAgcyAvPSAxMDBcbiAgICAgIGwgLz0gMTAwXG5cbiAgICAgIC8vIElmIHdlIGFyZSBncmV5LCB0aGVuIGp1c3QgbWFrZSB0aGUgY29sb3IgZGlyZWN0bHlcbiAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIGwgKj0gMjU1XG4gICAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGwsIGwpXG4gICAgICAgIHJldHVybiBjb2xvclxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPIEkgaGF2ZSBubyBpZGVhIHdoYXQgdGhpcyBkb2VzIDpEIElmIHlvdSBmaWd1cmUgaXQgb3V0LCB0ZWxsIG1lIVxuICAgICAgY29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHNcbiAgICAgIGNvbnN0IHAgPSAyICogbCAtIHFcblxuICAgICAgLy8gR2V0IHRoZSByZ2IgdmFsdWVzXG4gICAgICBjb25zdCByID0gMjU1ICogaHVlVG9SZ2IocCwgcSwgaCArIDEgLyAzKVxuICAgICAgY29uc3QgZyA9IDI1NSAqIGh1ZVRvUmdiKHAsIHEsIGgpXG4gICAgICBjb25zdCBiID0gMjU1ICogaHVlVG9SZ2IocCwgcSwgaCAtIDEgLyAzKVxuXG4gICAgICAvLyBNYWtlIGEgbmV3IGNvbG9yXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxuICAgICAgcmV0dXJuIGNvbG9yXG4gICAgfSBlbHNlIGlmICh0aGlzLnNwYWNlID09PSAnY215aycpIHtcbiAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2ZlbGlwZXNhYmluby81MDY2MzM2XG4gICAgICAvLyBHZXQgdGhlIG5vcm1hbGlzZWQgY215ayB2YWx1ZXNcbiAgICAgIGNvbnN0IHsgYywgbSwgeSwgayB9ID0gdGhpc1xuXG4gICAgICAvLyBHZXQgdGhlIHJnYiB2YWx1ZXNcbiAgICAgIGNvbnN0IHIgPSAyNTUgKiAoMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgaykpXG4gICAgICBjb25zdCBnID0gMjU1ICogKDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspKVxuICAgICAgY29uc3QgYiA9IDI1NSAqICgxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKSlcblxuICAgICAgLy8gRm9ybSB0aGUgY29sb3IgYW5kIHJldHVybiBpdFxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IociwgZywgYilcbiAgICAgIHJldHVybiBjb2xvclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgY29uc3QgeyBfYSwgX2IsIF9jLCBfZCwgc3BhY2UgfSA9IHRoaXNcbiAgICByZXR1cm4gW19hLCBfYiwgX2MsIF9kLCBzcGFjZV1cbiAgfVxuXG4gIHRvSGV4KCkge1xuICAgIGNvbnN0IFtyLCBnLCBiXSA9IHRoaXMuX2NsYW1wZWQoKS5tYXAoY29tcG9uZW50SGV4KVxuICAgIHJldHVybiBgIyR7cn0ke2d9JHtifWBcbiAgfVxuXG4gIHRvUmdiKCkge1xuICAgIGNvbnN0IFtyViwgZ1YsIGJWXSA9IHRoaXMuX2NsYW1wZWQoKVxuICAgIGNvbnN0IHN0cmluZyA9IGByZ2IoJHtyVn0sJHtnVn0sJHtiVn0pYFxuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRvSGV4KClcbiAgfVxuXG4gIHh5eigpIHtcbiAgICAvLyBOb3JtYWxpc2UgdGhlIHJlZCwgZ3JlZW4gYW5kIGJsdWUgdmFsdWVzXG4gICAgY29uc3QgeyBfYTogcjI1NSwgX2I6IGcyNTUsIF9jOiBiMjU1IH0gPSB0aGlzLnJnYigpXG4gICAgY29uc3QgW3IsIGcsIGJdID0gW3IyNTUsIGcyNTUsIGIyNTVdLm1hcCgodikgPT4gdiAvIDI1NSlcblxuICAgIC8vIENvbnZlcnQgdG8gdGhlIGxhYiByZ2Igc3BhY2VcbiAgICBjb25zdCByTCA9IHIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKHIgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IHIgLyAxMi45MlxuICAgIGNvbnN0IGdMID0gZyA+IDAuMDQwNDUgPyBNYXRoLnBvdygoZyArIDAuMDU1KSAvIDEuMDU1LCAyLjQpIDogZyAvIDEyLjkyXG4gICAgY29uc3QgYkwgPSBiID4gMC4wNDA0NSA/IE1hdGgucG93KChiICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiBiIC8gMTIuOTJcblxuICAgIC8vIENvbnZlcnQgdG8gdGhlIHh5eiBjb2xvciBzcGFjZSB3aXRob3V0IGJvdW5kaW5nIHRoZSB2YWx1ZXNcbiAgICBjb25zdCB4VSA9IChyTCAqIDAuNDEyNCArIGdMICogMC4zNTc2ICsgYkwgKiAwLjE4MDUpIC8gMC45NTA0N1xuICAgIGNvbnN0IHlVID0gKHJMICogMC4yMTI2ICsgZ0wgKiAwLjcxNTIgKyBiTCAqIDAuMDcyMikgLyAxLjBcbiAgICBjb25zdCB6VSA9IChyTCAqIDAuMDE5MyArIGdMICogMC4xMTkyICsgYkwgKiAwLjk1MDUpIC8gMS4wODg4M1xuXG4gICAgLy8gR2V0IHRoZSBwcm9wZXIgeHl6IHZhbHVlcyBieSBhcHBseWluZyB0aGUgYm91bmRpbmdcbiAgICBjb25zdCB4ID0geFUgPiAwLjAwODg1NiA/IE1hdGgucG93KHhVLCAxIC8gMykgOiA3Ljc4NyAqIHhVICsgMTYgLyAxMTZcbiAgICBjb25zdCB5ID0geVUgPiAwLjAwODg1NiA/IE1hdGgucG93KHlVLCAxIC8gMykgOiA3Ljc4NyAqIHlVICsgMTYgLyAxMTZcbiAgICBjb25zdCB6ID0gelUgPiAwLjAwODg1NiA/IE1hdGgucG93KHpVLCAxIC8gMykgOiA3Ljc4NyAqIHpVICsgMTYgLyAxMTZcblxuICAgIC8vIE1ha2UgYW5kIHJldHVybiB0aGUgY29sb3JcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcih4LCB5LCB6LCAneHl6JylcbiAgICByZXR1cm4gY29sb3JcbiAgfVxuXG4gIC8qXG4gIElucHV0IGFuZCBPdXRwdXQgbWV0aG9kc1xuICAqL1xuXG4gIF9jbGFtcGVkKCkge1xuICAgIGNvbnN0IHsgX2EsIF9iLCBfYyB9ID0gdGhpcy5yZ2IoKVxuICAgIGNvbnN0IHsgbWF4LCBtaW4sIHJvdW5kIH0gPSBNYXRoXG4gICAgY29uc3QgZm9ybWF0ID0gKHYpID0+IG1heCgwLCBtaW4ocm91bmQodiksIDI1NSkpXG4gICAgcmV0dXJuIFtfYSwgX2IsIF9jXS5tYXAoZm9ybWF0KVxuICB9XG5cbiAgLypcbiAgQ29uc3RydWN0aW5nIGNvbG9yc1xuICAqL1xufVxuIiwiaW1wb3J0IHsgZGlzcGF0Y2gsIG9mZiwgb24gfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZXZlbnQuanMnXG5pbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50VGFyZ2V0IGV4dGVuZHMgQmFzZSB7XG4gIGFkZEV2ZW50TGlzdGVuZXIoKSB7fVxuXG4gIGRpc3BhdGNoKGV2ZW50LCBkYXRhLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKHRoaXMsIGV2ZW50LCBkYXRhLCBvcHRpb25zKVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgIGNvbnN0IGJhZyA9IHRoaXMuZ2V0RXZlbnRIb2xkZXIoKS5ldmVudHNcbiAgICBpZiAoIWJhZykgcmV0dXJuIHRydWVcblxuICAgIGNvbnN0IGV2ZW50cyA9IGJhZ1tldmVudC50eXBlXVxuXG4gICAgZm9yIChjb25zdCBpIGluIGV2ZW50cykge1xuICAgICAgZm9yIChjb25zdCBqIGluIGV2ZW50c1tpXSkge1xuICAgICAgICBldmVudHNbaV1bal0oZXZlbnQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkXG4gIH1cblxuICAvLyBGaXJlIGdpdmVuIGV2ZW50XG4gIGZpcmUoZXZlbnQsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmRpc3BhdGNoKGV2ZW50LCBkYXRhLCBvcHRpb25zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBnZXRFdmVudEhvbGRlcigpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0RXZlbnRUYXJnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFVuYmluZCBldmVudCBmcm9tIGxpc3RlbmVyXG4gIG9mZihldmVudCwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBvZmYodGhpcywgZXZlbnQsIGxpc3RlbmVyLCBvcHRpb25zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBCaW5kIGdpdmVuIGV2ZW50IHRvIGxpc3RlbmVyXG4gIG9uKGV2ZW50LCBsaXN0ZW5lciwgYmluZGluZywgb3B0aW9ucykge1xuICAgIG9uKHRoaXMsIGV2ZW50LCBsaXN0ZW5lciwgYmluZGluZywgb3B0aW9ucylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9XG59XG5cbnJlZ2lzdGVyKEV2ZW50VGFyZ2V0LCAnRXZlbnRUYXJnZXQnKVxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbi8vIGltcG9ydCB7IHN1YkNsYXNzQXJyYXkgfSBmcm9tICcuL0FycmF5UG9seWZpbGwuanMnXG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBBcnJheSB7XG4gIGNvbnN0cnVjdG9yKGFyciA9IFtdLCAuLi5hcmdzKSB7XG4gICAgc3VwZXIoYXJyLCAuLi5hcmdzKVxuICAgIGlmICh0eXBlb2YgYXJyID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXNcbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLnB1c2goLi4uYXJyKVxuICB9XG59XG5cbi8qID0gc3ViQ2xhc3NBcnJheSgnTGlzdCcsIEFycmF5LCBmdW5jdGlvbiAoYXJyID0gW10pIHtcbiAgLy8gVGhpcyBjYXRjaGVzIHRoZSBjYXNlLCB0aGF0IG5hdGl2ZSBtYXAgdHJpZXMgdG8gY3JlYXRlIGFuIGFycmF5IHdpdGggbmV3IEFycmF5KDEpXG4gIGlmICh0eXBlb2YgYXJyID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXNcbiAgdGhpcy5sZW5ndGggPSAwXG4gIHRoaXMucHVzaCguLi5hcnIpXG59KSAqL1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0XG5cbmV4dGVuZChbTGlzdF0sIHtcbiAgZWFjaChmbk9yTWV0aG9kTmFtZSwgLi4uYXJncykge1xuICAgIGlmICh0eXBlb2YgZm5Pck1ldGhvZE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcCgoZWwsIGksIGFycikgPT4ge1xuICAgICAgICByZXR1cm4gZm5Pck1ldGhvZE5hbWUuY2FsbChlbCwgZWwsIGksIGFycilcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcCgoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIGVsW2ZuT3JNZXRob2ROYW1lXSguLi5hcmdzKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgdG9BcnJheSgpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdGhpcylcbiAgfVxufSlcblxuY29uc3QgcmVzZXJ2ZWQgPSBbJ3RvQXJyYXknLCAnY29uc3RydWN0b3InLCAnZWFjaCddXG5cbkxpc3QuZXh0ZW5kID0gZnVuY3Rpb24gKG1ldGhvZHMpIHtcbiAgbWV0aG9kcyA9IG1ldGhvZHMucmVkdWNlKChvYmosIG5hbWUpID0+IHtcbiAgICAvLyBEb24ndCBvdmVyd3JpdGUgb3duIG1ldGhvZHNcbiAgICBpZiAocmVzZXJ2ZWQuaW5jbHVkZXMobmFtZSkpIHJldHVybiBvYmpcblxuICAgIC8vIERvbid0IGFkZCBwcml2YXRlIG1ldGhvZHNcbiAgICBpZiAobmFtZVswXSA9PT0gJ18nKSByZXR1cm4gb2JqXG5cbiAgICAvLyBBbGxvdyBhY2Nlc3MgdG8gb3JpZ2luYWwgQXJyYXkgbWV0aG9kcyB0aHJvdWdoIGEgcHJlZml4XG4gICAgaWYgKG5hbWUgaW4gQXJyYXkucHJvdG90eXBlKSB7XG4gICAgICBvYmpbJyQnICsgbmFtZV0gPSBBcnJheS5wcm90b3R5cGVbbmFtZV1cbiAgICB9XG5cbiAgICAvLyBSZWxheSBldmVyeSBjYWxsIHRvIGVhY2goKVxuICAgIG9ialtuYW1lXSA9IGZ1bmN0aW9uICguLi5hdHRycykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChuYW1lLCAuLi5hdHRycylcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9LCB7fSlcblxuICBleHRlbmQoW0xpc3RdLCBtZXRob2RzKVxufVxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuaW1wb3J0IHsgcmFkaWFucyB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi4vZWxlbWVudHMvRWxlbWVudC5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuL1BvaW50LmpzJ1xuXG5mdW5jdGlvbiBjbG9zZUVub3VnaChhLCBiLCB0aHJlc2hvbGQpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGIgLSBhKSA8ICh0aHJlc2hvbGQgfHwgMWUtNilcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxuICB9XG5cbiAgc3RhdGljIGZvcm1hdFRyYW5zZm9ybXMobykge1xuICAgIC8vIEdldCBhbGwgb2YgdGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgdG8gZm9ybSB0aGUgbWF0cml4XG4gICAgY29uc3QgZmxpcEJvdGggPSBvLmZsaXAgPT09ICdib3RoJyB8fCBvLmZsaXAgPT09IHRydWVcbiAgICBjb25zdCBmbGlwWCA9IG8uZmxpcCAmJiAoZmxpcEJvdGggfHwgby5mbGlwID09PSAneCcpID8gLTEgOiAxXG4gICAgY29uc3QgZmxpcFkgPSBvLmZsaXAgJiYgKGZsaXBCb3RoIHx8IG8uZmxpcCA9PT0gJ3knKSA/IC0xIDogMVxuICAgIGNvbnN0IHNrZXdYID1cbiAgICAgIG8uc2tldyAmJiBvLnNrZXcubGVuZ3RoXG4gICAgICAgID8gby5za2V3WzBdXG4gICAgICAgIDogaXNGaW5pdGUoby5za2V3KVxuICAgICAgICAgID8gby5za2V3XG4gICAgICAgICAgOiBpc0Zpbml0ZShvLnNrZXdYKVxuICAgICAgICAgICAgPyBvLnNrZXdYXG4gICAgICAgICAgICA6IDBcbiAgICBjb25zdCBza2V3WSA9XG4gICAgICBvLnNrZXcgJiYgby5za2V3Lmxlbmd0aFxuICAgICAgICA/IG8uc2tld1sxXVxuICAgICAgICA6IGlzRmluaXRlKG8uc2tldylcbiAgICAgICAgICA/IG8uc2tld1xuICAgICAgICAgIDogaXNGaW5pdGUoby5za2V3WSlcbiAgICAgICAgICAgID8gby5za2V3WVxuICAgICAgICAgICAgOiAwXG4gICAgY29uc3Qgc2NhbGVYID1cbiAgICAgIG8uc2NhbGUgJiYgby5zY2FsZS5sZW5ndGhcbiAgICAgICAgPyBvLnNjYWxlWzBdICogZmxpcFhcbiAgICAgICAgOiBpc0Zpbml0ZShvLnNjYWxlKVxuICAgICAgICAgID8gby5zY2FsZSAqIGZsaXBYXG4gICAgICAgICAgOiBpc0Zpbml0ZShvLnNjYWxlWClcbiAgICAgICAgICAgID8gby5zY2FsZVggKiBmbGlwWFxuICAgICAgICAgICAgOiBmbGlwWFxuICAgIGNvbnN0IHNjYWxlWSA9XG4gICAgICBvLnNjYWxlICYmIG8uc2NhbGUubGVuZ3RoXG4gICAgICAgID8gby5zY2FsZVsxXSAqIGZsaXBZXG4gICAgICAgIDogaXNGaW5pdGUoby5zY2FsZSlcbiAgICAgICAgICA/IG8uc2NhbGUgKiBmbGlwWVxuICAgICAgICAgIDogaXNGaW5pdGUoby5zY2FsZVkpXG4gICAgICAgICAgICA/IG8uc2NhbGVZICogZmxpcFlcbiAgICAgICAgICAgIDogZmxpcFlcbiAgICBjb25zdCBzaGVhciA9IG8uc2hlYXIgfHwgMFxuICAgIGNvbnN0IHRoZXRhID0gby5yb3RhdGUgfHwgby50aGV0YSB8fCAwXG4gICAgY29uc3Qgb3JpZ2luID0gbmV3IFBvaW50KFxuICAgICAgby5vcmlnaW4gfHwgby5hcm91bmQgfHwgby5veCB8fCBvLm9yaWdpblgsXG4gICAgICBvLm95IHx8IG8ub3JpZ2luWVxuICAgIClcbiAgICBjb25zdCBveCA9IG9yaWdpbi54XG4gICAgY29uc3Qgb3kgPSBvcmlnaW4ueVxuICAgIC8vIFdlIG5lZWQgUG9pbnQgdG8gYmUgaW52YWxpZCBpZiBub3RoaW5nIHdhcyBwYXNzZWQgYmVjYXVzZSB3ZSBjYW5ub3QgZGVmYXVsdCB0byAwIGhlcmUuIFRoYXQgaXMgd2h5IE5hTlxuICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFBvaW50KFxuICAgICAgby5wb3NpdGlvbiB8fCBvLnB4IHx8IG8ucG9zaXRpb25YIHx8IE5hTixcbiAgICAgIG8ucHkgfHwgby5wb3NpdGlvblkgfHwgTmFOXG4gICAgKVxuICAgIGNvbnN0IHB4ID0gcG9zaXRpb24ueFxuICAgIGNvbnN0IHB5ID0gcG9zaXRpb24ueVxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IG5ldyBQb2ludChcbiAgICAgIG8udHJhbnNsYXRlIHx8IG8udHggfHwgby50cmFuc2xhdGVYLFxuICAgICAgby50eSB8fCBvLnRyYW5zbGF0ZVlcbiAgICApXG4gICAgY29uc3QgdHggPSB0cmFuc2xhdGUueFxuICAgIGNvbnN0IHR5ID0gdHJhbnNsYXRlLnlcbiAgICBjb25zdCByZWxhdGl2ZSA9IG5ldyBQb2ludChcbiAgICAgIG8ucmVsYXRpdmUgfHwgby5yeCB8fCBvLnJlbGF0aXZlWCxcbiAgICAgIG8ucnkgfHwgby5yZWxhdGl2ZVlcbiAgICApXG4gICAgY29uc3QgcnggPSByZWxhdGl2ZS54XG4gICAgY29uc3QgcnkgPSByZWxhdGl2ZS55XG5cbiAgICAvLyBQb3B1bGF0ZSBhbGwgb2YgdGhlIHZhbHVlc1xuICAgIHJldHVybiB7XG4gICAgICBzY2FsZVgsXG4gICAgICBzY2FsZVksXG4gICAgICBza2V3WCxcbiAgICAgIHNrZXdZLFxuICAgICAgc2hlYXIsXG4gICAgICB0aGV0YSxcbiAgICAgIHJ4LFxuICAgICAgcnksXG4gICAgICB0eCxcbiAgICAgIHR5LFxuICAgICAgb3gsXG4gICAgICBveSxcbiAgICAgIHB4LFxuICAgICAgcHlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUFycmF5KGEpIHtcbiAgICByZXR1cm4geyBhOiBhWzBdLCBiOiBhWzFdLCBjOiBhWzJdLCBkOiBhWzNdLCBlOiBhWzRdLCBmOiBhWzVdIH1cbiAgfVxuXG4gIHN0YXRpYyBpc01hdHJpeExpa2Uobykge1xuICAgIHJldHVybiAoXG4gICAgICBvLmEgIT0gbnVsbCB8fFxuICAgICAgby5iICE9IG51bGwgfHxcbiAgICAgIG8uYyAhPSBudWxsIHx8XG4gICAgICBvLmQgIT0gbnVsbCB8fFxuICAgICAgby5lICE9IG51bGwgfHxcbiAgICAgIG8uZiAhPSBudWxsXG4gICAgKVxuICB9XG5cbiAgLy8gbGVmdCBtYXRyaXgsIHJpZ2h0IG1hdHJpeCwgdGFyZ2V0IG1hdHJpeCB3aGljaCBpcyBvdmVyd3JpdHRlblxuICBzdGF0aWMgbWF0cml4TXVsdGlwbHkobCwgciwgbykge1xuICAgIC8vIFdvcmsgb3V0IHRoZSBwcm9kdWN0IGRpcmVjdGx5XG4gICAgY29uc3QgYSA9IGwuYSAqIHIuYSArIGwuYyAqIHIuYlxuICAgIGNvbnN0IGIgPSBsLmIgKiByLmEgKyBsLmQgKiByLmJcbiAgICBjb25zdCBjID0gbC5hICogci5jICsgbC5jICogci5kXG4gICAgY29uc3QgZCA9IGwuYiAqIHIuYyArIGwuZCAqIHIuZFxuICAgIGNvbnN0IGUgPSBsLmUgKyBsLmEgKiByLmUgKyBsLmMgKiByLmZcbiAgICBjb25zdCBmID0gbC5mICsgbC5iICogci5lICsgbC5kICogci5mXG5cbiAgICAvLyBtYWtlIHN1cmUgdG8gdXNlIGxvY2FsIHZhcmlhYmxlcyBiZWNhdXNlIGwvciBhbmQgbyBjb3VsZCBiZSB0aGUgc2FtZVxuICAgIG8uYSA9IGFcbiAgICBvLmIgPSBiXG4gICAgby5jID0gY1xuICAgIG8uZCA9IGRcbiAgICBvLmUgPSBlXG4gICAgby5mID0gZlxuXG4gICAgcmV0dXJuIG9cbiAgfVxuXG4gIGFyb3VuZChjeCwgY3ksIG1hdHJpeCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuYXJvdW5kTyhjeCwgY3ksIG1hdHJpeClcbiAgfVxuXG4gIC8vIFRyYW5zZm9ybSBhcm91bmQgYSBjZW50ZXIgcG9pbnRcbiAgYXJvdW5kTyhjeCwgY3ksIG1hdHJpeCkge1xuICAgIGNvbnN0IGR4ID0gY3ggfHwgMFxuICAgIGNvbnN0IGR5ID0gY3kgfHwgMFxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZU8oLWR4LCAtZHkpLmxtdWx0aXBseU8obWF0cml4KS50cmFuc2xhdGVPKGR4LCBkeSlcbiAgfVxuXG4gIC8vIENsb25lcyB0aGlzIG1hdHJpeFxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzKVxuICB9XG5cbiAgLy8gRGVjb21wb3NlcyB0aGlzIG1hdHJpeCBpbnRvIGl0cyBhZmZpbmUgcGFyYW1ldGVyc1xuICBkZWNvbXBvc2UoY3ggPSAwLCBjeSA9IDApIHtcbiAgICAvLyBHZXQgdGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgbWF0cml4XG4gICAgY29uc3QgYSA9IHRoaXMuYVxuICAgIGNvbnN0IGIgPSB0aGlzLmJcbiAgICBjb25zdCBjID0gdGhpcy5jXG4gICAgY29uc3QgZCA9IHRoaXMuZFxuICAgIGNvbnN0IGUgPSB0aGlzLmVcbiAgICBjb25zdCBmID0gdGhpcy5mXG5cbiAgICAvLyBGaWd1cmUgb3V0IGlmIHRoZSB3aW5kaW5nIGRpcmVjdGlvbiBpcyBjbG9ja3dpc2Ugb3IgY291bnRlcmNsb2Nrd2lzZVxuICAgIGNvbnN0IGRldGVybWluYW50ID0gYSAqIGQgLSBiICogY1xuICAgIGNvbnN0IGNjdyA9IGRldGVybWluYW50ID4gMCA/IDEgOiAtMVxuXG4gICAgLy8gU2luY2Ugd2Ugb25seSBzaGVhciBpbiB4LCB3ZSBjYW4gdXNlIHRoZSB4IGJhc2lzIHRvIGdldCB0aGUgeCBzY2FsZVxuICAgIC8vIGFuZCB0aGUgcm90YXRpb24gb2YgdGhlIHJlc3VsdGluZyBtYXRyaXhcbiAgICBjb25zdCBzeCA9IGNjdyAqIE1hdGguc3FydChhICogYSArIGIgKiBiKVxuICAgIGNvbnN0IHRoZXRhUmFkID0gTWF0aC5hdGFuMihjY3cgKiBiLCBjY3cgKiBhKVxuICAgIGNvbnN0IHRoZXRhID0gKDE4MCAvIE1hdGguUEkpICogdGhldGFSYWRcbiAgICBjb25zdCBjdCA9IE1hdGguY29zKHRoZXRhUmFkKVxuICAgIGNvbnN0IHN0ID0gTWF0aC5zaW4odGhldGFSYWQpXG5cbiAgICAvLyBXZSBjYW4gdGhlbiBzb2x2ZSB0aGUgeSBiYXNpcyB2ZWN0b3Igc2ltdWx0YW5lb3VzbHkgdG8gZ2V0IHRoZSBvdGhlclxuICAgIC8vIHR3byBhZmZpbmUgcGFyYW1ldGVycyBkaXJlY3RseSBmcm9tIHRoZXNlIHBhcmFtZXRlcnNcbiAgICBjb25zdCBsYW0gPSAoYSAqIGMgKyBiICogZCkgLyBkZXRlcm1pbmFudFxuICAgIGNvbnN0IHN5ID0gKGMgKiBzeCkgLyAobGFtICogYSAtIGIpIHx8IChkICogc3gpIC8gKGxhbSAqIGIgKyBhKVxuXG4gICAgLy8gVXNlIHRoZSB0cmFuc2xhdGlvbnNcbiAgICBjb25zdCB0eCA9IGUgLSBjeCArIGN4ICogY3QgKiBzeCArIGN5ICogKGxhbSAqIGN0ICogc3ggLSBzdCAqIHN5KVxuICAgIGNvbnN0IHR5ID0gZiAtIGN5ICsgY3ggKiBzdCAqIHN4ICsgY3kgKiAobGFtICogc3QgKiBzeCArIGN0ICogc3kpXG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGRlY29tcG9zaXRpb24gYW5kIHJldHVybiBpdFxuICAgIHJldHVybiB7XG4gICAgICAvLyBSZXR1cm4gdGhlIGFmZmluZSBwYXJhbWV0ZXJzXG4gICAgICBzY2FsZVg6IHN4LFxuICAgICAgc2NhbGVZOiBzeSxcbiAgICAgIHNoZWFyOiBsYW0sXG4gICAgICByb3RhdGU6IHRoZXRhLFxuICAgICAgdHJhbnNsYXRlWDogdHgsXG4gICAgICB0cmFuc2xhdGVZOiB0eSxcbiAgICAgIG9yaWdpblg6IGN4LFxuICAgICAgb3JpZ2luWTogY3ksXG5cbiAgICAgIC8vIFJldHVybiB0aGUgbWF0cml4IHBhcmFtZXRlcnNcbiAgICAgIGE6IHRoaXMuYSxcbiAgICAgIGI6IHRoaXMuYixcbiAgICAgIGM6IHRoaXMuYyxcbiAgICAgIGQ6IHRoaXMuZCxcbiAgICAgIGU6IHRoaXMuZSxcbiAgICAgIGY6IHRoaXMuZlxuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIHR3byBtYXRyaWNlcyBhcmUgZXF1YWxcbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgaWYgKG90aGVyID09PSB0aGlzKSByZXR1cm4gdHJ1ZVxuICAgIGNvbnN0IGNvbXAgPSBuZXcgTWF0cml4KG90aGVyKVxuICAgIHJldHVybiAoXG4gICAgICBjbG9zZUVub3VnaCh0aGlzLmEsIGNvbXAuYSkgJiZcbiAgICAgIGNsb3NlRW5vdWdoKHRoaXMuYiwgY29tcC5iKSAmJlxuICAgICAgY2xvc2VFbm91Z2godGhpcy5jLCBjb21wLmMpICYmXG4gICAgICBjbG9zZUVub3VnaCh0aGlzLmQsIGNvbXAuZCkgJiZcbiAgICAgIGNsb3NlRW5vdWdoKHRoaXMuZSwgY29tcC5lKSAmJlxuICAgICAgY2xvc2VFbm91Z2godGhpcy5mLCBjb21wLmYpXG4gICAgKVxuICB9XG5cbiAgLy8gRmxpcCBtYXRyaXggb24geCBvciB5LCBhdCBhIGdpdmVuIG9mZnNldFxuICBmbGlwKGF4aXMsIGFyb3VuZCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuZmxpcE8oYXhpcywgYXJvdW5kKVxuICB9XG5cbiAgZmxpcE8oYXhpcywgYXJvdW5kKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd4J1xuICAgICAgPyB0aGlzLnNjYWxlTygtMSwgMSwgYXJvdW5kLCAwKVxuICAgICAgOiBheGlzID09PSAneSdcbiAgICAgICAgPyB0aGlzLnNjYWxlTygxLCAtMSwgMCwgYXJvdW5kKVxuICAgICAgICA6IHRoaXMuc2NhbGVPKC0xLCAtMSwgYXhpcywgYXJvdW5kIHx8IGF4aXMpIC8vIERlZmluZSBhbiB4LCB5IGZsaXAgcG9pbnRcbiAgfVxuXG4gIC8vIEluaXRpYWxpemVcbiAgaW5pdChzb3VyY2UpIHtcbiAgICBjb25zdCBiYXNlID0gTWF0cml4LmZyb21BcnJheShbMSwgMCwgMCwgMSwgMCwgMF0pXG5cbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxuICAgIHNvdXJjZSA9XG4gICAgICBzb3VyY2UgaW5zdGFuY2VvZiBFbGVtZW50XG4gICAgICAgID8gc291cmNlLm1hdHJpeGlmeSgpXG4gICAgICAgIDogdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IE1hdHJpeC5mcm9tQXJyYXkoc291cmNlLnNwbGl0KGRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpKVxuICAgICAgICAgIDogQXJyYXkuaXNBcnJheShzb3VyY2UpXG4gICAgICAgICAgICA/IE1hdHJpeC5mcm9tQXJyYXkoc291cmNlKVxuICAgICAgICAgICAgOiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0JyAmJiBNYXRyaXguaXNNYXRyaXhMaWtlKHNvdXJjZSlcbiAgICAgICAgICAgICAgPyBzb3VyY2VcbiAgICAgICAgICAgICAgOiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgID8gbmV3IE1hdHJpeCgpLnRyYW5zZm9ybShzb3VyY2UpXG4gICAgICAgICAgICAgICAgOiBhcmd1bWVudHMubGVuZ3RoID09PSA2XG4gICAgICAgICAgICAgICAgICA/IE1hdHJpeC5mcm9tQXJyYXkoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgICAgICAgOiBiYXNlXG5cbiAgICAvLyBNZXJnZSB0aGUgc291cmNlIG1hdHJpeCB3aXRoIHRoZSBiYXNlIG1hdHJpeFxuICAgIHRoaXMuYSA9IHNvdXJjZS5hICE9IG51bGwgPyBzb3VyY2UuYSA6IGJhc2UuYVxuICAgIHRoaXMuYiA9IHNvdXJjZS5iICE9IG51bGwgPyBzb3VyY2UuYiA6IGJhc2UuYlxuICAgIHRoaXMuYyA9IHNvdXJjZS5jICE9IG51bGwgPyBzb3VyY2UuYyA6IGJhc2UuY1xuICAgIHRoaXMuZCA9IHNvdXJjZS5kICE9IG51bGwgPyBzb3VyY2UuZCA6IGJhc2UuZFxuICAgIHRoaXMuZSA9IHNvdXJjZS5lICE9IG51bGwgPyBzb3VyY2UuZSA6IGJhc2UuZVxuICAgIHRoaXMuZiA9IHNvdXJjZS5mICE9IG51bGwgPyBzb3VyY2UuZiA6IGJhc2UuZlxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGludmVyc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pbnZlcnNlTygpXG4gIH1cblxuICAvLyBJbnZlcnNlcyBtYXRyaXhcbiAgaW52ZXJzZU8oKSB7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHBhcmFtZXRlcnMgb3V0IG9mIHRoZSBtYXRyaXhcbiAgICBjb25zdCBhID0gdGhpcy5hXG4gICAgY29uc3QgYiA9IHRoaXMuYlxuICAgIGNvbnN0IGMgPSB0aGlzLmNcbiAgICBjb25zdCBkID0gdGhpcy5kXG4gICAgY29uc3QgZSA9IHRoaXMuZVxuICAgIGNvbnN0IGYgPSB0aGlzLmZcblxuICAgIC8vIEludmVydCB0aGUgMngyIG1hdHJpeCBpbiB0aGUgdG9wIGxlZnRcbiAgICBjb25zdCBkZXQgPSBhICogZCAtIGIgKiBjXG4gICAgaWYgKCFkZXQpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmVydCAnICsgdGhpcylcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdG9wIDJ4MiBtYXRyaXhcbiAgICBjb25zdCBuYSA9IGQgLyBkZXRcbiAgICBjb25zdCBuYiA9IC1iIC8gZGV0XG4gICAgY29uc3QgbmMgPSAtYyAvIGRldFxuICAgIGNvbnN0IG5kID0gYSAvIGRldFxuXG4gICAgLy8gQXBwbHkgdGhlIGludmVydGVkIG1hdHJpeCB0byB0aGUgdG9wIHJpZ2h0XG4gICAgY29uc3QgbmUgPSAtKG5hICogZSArIG5jICogZilcbiAgICBjb25zdCBuZiA9IC0obmIgKiBlICsgbmQgKiBmKVxuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbnZlcnRlZCBtYXRyaXhcbiAgICB0aGlzLmEgPSBuYVxuICAgIHRoaXMuYiA9IG5iXG4gICAgdGhpcy5jID0gbmNcbiAgICB0aGlzLmQgPSBuZFxuICAgIHRoaXMuZSA9IG5lXG4gICAgdGhpcy5mID0gbmZcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBsbXVsdGlwbHkobWF0cml4KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sbXVsdGlwbHlPKG1hdHJpeClcbiAgfVxuXG4gIGxtdWx0aXBseU8obWF0cml4KSB7XG4gICAgY29uc3QgciA9IHRoaXNcbiAgICBjb25zdCBsID0gbWF0cml4IGluc3RhbmNlb2YgTWF0cml4ID8gbWF0cml4IDogbmV3IE1hdHJpeChtYXRyaXgpXG5cbiAgICByZXR1cm4gTWF0cml4Lm1hdHJpeE11bHRpcGx5KGwsIHIsIHRoaXMpXG4gIH1cblxuICAvLyBMZWZ0IG11bHRpcGxpZXMgYnkgdGhlIGdpdmVuIG1hdHJpeFxuICBtdWx0aXBseShtYXRyaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLm11bHRpcGx5TyhtYXRyaXgpXG4gIH1cblxuICBtdWx0aXBseU8obWF0cml4KSB7XG4gICAgLy8gR2V0IHRoZSBtYXRyaWNlc1xuICAgIGNvbnN0IGwgPSB0aGlzXG4gICAgY29uc3QgciA9IG1hdHJpeCBpbnN0YW5jZW9mIE1hdHJpeCA/IG1hdHJpeCA6IG5ldyBNYXRyaXgobWF0cml4KVxuXG4gICAgcmV0dXJuIE1hdHJpeC5tYXRyaXhNdWx0aXBseShsLCByLCB0aGlzKVxuICB9XG5cbiAgLy8gUm90YXRlIG1hdHJpeFxuICByb3RhdGUociwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5yb3RhdGVPKHIsIGN4LCBjeSlcbiAgfVxuXG4gIHJvdGF0ZU8ociwgY3ggPSAwLCBjeSA9IDApIHtcbiAgICAvLyBDb252ZXJ0IGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgIHIgPSByYWRpYW5zKHIpXG5cbiAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyKVxuICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHIpXG5cbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcblxuICAgIHRoaXMuYSA9IGEgKiBjb3MgLSBiICogc2luXG4gICAgdGhpcy5iID0gYiAqIGNvcyArIGEgKiBzaW5cbiAgICB0aGlzLmMgPSBjICogY29zIC0gZCAqIHNpblxuICAgIHRoaXMuZCA9IGQgKiBjb3MgKyBjICogc2luXG4gICAgdGhpcy5lID0gZSAqIGNvcyAtIGYgKiBzaW4gKyBjeSAqIHNpbiAtIGN4ICogY29zICsgY3hcbiAgICB0aGlzLmYgPSBmICogY29zICsgZSAqIHNpbiAtIGN4ICogc2luIC0gY3kgKiBjb3MgKyBjeVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNjYWxlIG1hdHJpeFxuICBzY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnNjYWxlTyguLi5hcmd1bWVudHMpXG4gIH1cblxuICBzY2FsZU8oeCwgeSA9IHgsIGN4ID0gMCwgY3kgPSAwKSB7XG4gICAgLy8gU3VwcG9ydCB1bmlmb3JtIHNjYWxpbmdcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgY3kgPSBjeFxuICAgICAgY3ggPSB5XG4gICAgICB5ID0geFxuICAgIH1cblxuICAgIGNvbnN0IHsgYSwgYiwgYywgZCwgZSwgZiB9ID0gdGhpc1xuXG4gICAgdGhpcy5hID0gYSAqIHhcbiAgICB0aGlzLmIgPSBiICogeVxuICAgIHRoaXMuYyA9IGMgKiB4XG4gICAgdGhpcy5kID0gZCAqIHlcbiAgICB0aGlzLmUgPSBlICogeCAtIGN4ICogeCArIGN4XG4gICAgdGhpcy5mID0gZiAqIHkgLSBjeSAqIHkgKyBjeVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNoZWFyIG1hdHJpeFxuICBzaGVhcihhLCBjeCwgY3kpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnNoZWFyTyhhLCBjeCwgY3kpXG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgc2hlYXJPKGx4LCBjeCA9IDAsIGN5ID0gMCkge1xuICAgIGNvbnN0IHsgYSwgYiwgYywgZCwgZSwgZiB9ID0gdGhpc1xuXG4gICAgdGhpcy5hID0gYSArIGIgKiBseFxuICAgIHRoaXMuYyA9IGMgKyBkICogbHhcbiAgICB0aGlzLmUgPSBlICsgZiAqIGx4IC0gY3kgKiBseFxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNrZXcgTWF0cml4XG4gIHNrZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5za2V3TyguLi5hcmd1bWVudHMpXG4gIH1cblxuICBza2V3Tyh4LCB5ID0geCwgY3ggPSAwLCBjeSA9IDApIHtcbiAgICAvLyBzdXBwb3J0IHVuaWZvcm1hbCBza2V3XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGN5ID0gY3hcbiAgICAgIGN4ID0geVxuICAgICAgeSA9IHhcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgIHggPSByYWRpYW5zKHgpXG4gICAgeSA9IHJhZGlhbnMoeSlcblxuICAgIGNvbnN0IGx4ID0gTWF0aC50YW4oeClcbiAgICBjb25zdCBseSA9IE1hdGgudGFuKHkpXG5cbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcblxuICAgIHRoaXMuYSA9IGEgKyBiICogbHhcbiAgICB0aGlzLmIgPSBiICsgYSAqIGx5XG4gICAgdGhpcy5jID0gYyArIGQgKiBseFxuICAgIHRoaXMuZCA9IGQgKyBjICogbHlcbiAgICB0aGlzLmUgPSBlICsgZiAqIGx4IC0gY3kgKiBseFxuICAgIHRoaXMuZiA9IGYgKyBlICogbHkgLSBjeCAqIGx5XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gU2tld1hcbiAgc2tld1goeCwgY3gsIGN5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2tldyh4LCAwLCBjeCwgY3kpXG4gIH1cblxuICAvLyBTa2V3WVxuICBza2V3WSh5LCBjeCwgY3kpIHtcbiAgICByZXR1cm4gdGhpcy5za2V3KDAsIHksIGN4LCBjeSlcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQsIHRoaXMuZSwgdGhpcy5mXVxuICB9XG5cbiAgLy8gQ29udmVydCBtYXRyaXggdG8gc3RyaW5nXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAoXG4gICAgICAnbWF0cml4KCcgK1xuICAgICAgdGhpcy5hICtcbiAgICAgICcsJyArXG4gICAgICB0aGlzLmIgK1xuICAgICAgJywnICtcbiAgICAgIHRoaXMuYyArXG4gICAgICAnLCcgK1xuICAgICAgdGhpcy5kICtcbiAgICAgICcsJyArXG4gICAgICB0aGlzLmUgK1xuICAgICAgJywnICtcbiAgICAgIHRoaXMuZiArXG4gICAgICAnKSdcbiAgICApXG4gIH1cblxuICAvLyBUcmFuc2Zvcm0gYSBtYXRyaXggaW50byBhbm90aGVyIG1hdHJpeCBieSBtYW5pcHVsYXRpbmcgdGhlIHNwYWNlXG4gIHRyYW5zZm9ybShvKSB7XG4gICAgLy8gQ2hlY2sgaWYgbyBpcyBhIG1hdHJpeCBhbmQgdGhlbiBsZWZ0IG11bHRpcGx5IGl0IGRpcmVjdGx5XG4gICAgaWYgKE1hdHJpeC5pc01hdHJpeExpa2UobykpIHtcbiAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBNYXRyaXgobylcbiAgICAgIHJldHVybiBtYXRyaXgubXVsdGlwbHlPKHRoaXMpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBwcm9wb3NlZCB0cmFuc2Zvcm1hdGlvbnMgYW5kIHRoZSBjdXJyZW50IHRyYW5zZm9ybWF0aW9uc1xuICAgIGNvbnN0IHQgPSBNYXRyaXguZm9ybWF0VHJhbnNmb3JtcyhvKVxuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzXG4gICAgY29uc3QgeyB4OiBveCwgeTogb3kgfSA9IG5ldyBQb2ludCh0Lm94LCB0Lm95KS50cmFuc2Zvcm0oY3VycmVudClcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgcmVzdWx0aW5nIG1hdHJpeFxuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IE1hdHJpeCgpXG4gICAgICAudHJhbnNsYXRlTyh0LnJ4LCB0LnJ5KVxuICAgICAgLmxtdWx0aXBseU8oY3VycmVudClcbiAgICAgIC50cmFuc2xhdGVPKC1veCwgLW95KVxuICAgICAgLnNjYWxlTyh0LnNjYWxlWCwgdC5zY2FsZVkpXG4gICAgICAuc2tld08odC5za2V3WCwgdC5za2V3WSlcbiAgICAgIC5zaGVhck8odC5zaGVhcilcbiAgICAgIC5yb3RhdGVPKHQudGhldGEpXG4gICAgICAudHJhbnNsYXRlTyhveCwgb3kpXG5cbiAgICAvLyBJZiB3ZSB3YW50IHRoZSBvcmlnaW4gYXQgYSBwYXJ0aWN1bGFyIHBsYWNlLCB3ZSBmb3JjZSBpdCB0aGVyZVxuICAgIGlmIChpc0Zpbml0ZSh0LnB4KSB8fCBpc0Zpbml0ZSh0LnB5KSkge1xuICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IFBvaW50KG94LCBveSkudHJhbnNmb3JtKHRyYW5zZm9ybWVyKVxuICAgICAgLy8gVE9ETzogUmVwbGFjZSB0LnB4IHdpdGggaXNGaW5pdGUodC5weClcbiAgICAgIC8vIERvZXNuJ3Qgd29yayBiZWNhdXNlIHQucHggaXMgYWxzbyAwIGlmIGl0IHdhc24ndCBwYXNzZWRcbiAgICAgIGNvbnN0IGR4ID0gaXNGaW5pdGUodC5weCkgPyB0LnB4IC0gb3JpZ2luLnggOiAwXG4gICAgICBjb25zdCBkeSA9IGlzRmluaXRlKHQucHkpID8gdC5weSAtIG9yaWdpbi55IDogMFxuICAgICAgdHJhbnNmb3JtZXIudHJhbnNsYXRlTyhkeCwgZHkpXG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlIG5vdyBhZnRlciBwb3NpdGlvbmluZ1xuICAgIHRyYW5zZm9ybWVyLnRyYW5zbGF0ZU8odC50eCwgdC50eSlcbiAgICByZXR1cm4gdHJhbnNmb3JtZXJcbiAgfVxuXG4gIC8vIFRyYW5zbGF0ZSBtYXRyaXhcbiAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnRyYW5zbGF0ZU8oeCwgeSlcbiAgfVxuXG4gIHRyYW5zbGF0ZU8oeCwgeSkge1xuICAgIHRoaXMuZSArPSB4IHx8IDBcbiAgICB0aGlzLmYgKz0geSB8fCAwXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGE6IHRoaXMuYSxcbiAgICAgIGI6IHRoaXMuYixcbiAgICAgIGM6IHRoaXMuYyxcbiAgICAgIGQ6IHRoaXMuZCxcbiAgICAgIGU6IHRoaXMuZSxcbiAgICAgIGY6IHRoaXMuZlxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3RtKCkge1xuICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLm5vZGUuZ2V0Q1RNKCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW5DVE0oKSB7XG4gIHRyeSB7XG4gICAgLyogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0NDUzN1xuICAgICAgIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgRkYgZG9lcyBub3QgcmV0dXJuIHRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcbiAgICAgICBmb3IgdGhlIGlubmVyIGNvb3JkaW5hdGUgc3lzdGVtIHdoZW4gZ2V0U2NyZWVuQ1RNKCkgaXMgY2FsbGVkIG9uIG5lc3RlZCBzdmdzLlxuICAgICAgIEhvd2V2ZXIgYWxsIG90aGVyIEJyb3dzZXJzIGRvIHRoYXQgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMuaXNSb290ID09PSAnZnVuY3Rpb24nICYmICF0aGlzLmlzUm9vdCgpKSB7XG4gICAgICBjb25zdCByZWN0ID0gdGhpcy5yZWN0KDEsIDEpXG4gICAgICBjb25zdCBtID0gcmVjdC5ub2RlLmdldFNjcmVlbkNUTSgpXG4gICAgICByZWN0LnJlbW92ZSgpXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeChtKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLm5vZGUuZ2V0U2NyZWVuQ1RNKCkpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgQ2Fubm90IGdldCBDVE0gZnJvbSBTVkcgbm9kZSAke3RoaXMubm9kZS5ub2RlTmFtZX0uIElzIHRoZSBlbGVtZW50IHJlbmRlcmVkP2BcbiAgICApXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoKVxuICB9XG59XG5cbnJlZ2lzdGVyKE1hdHJpeCwgJ01hdHJpeCcpXG4iLCJpbXBvcnQgU1ZHQXJyYXkgZnJvbSAnLi9TVkdBcnJheS5qcydcbmltcG9ydCBwYXJzZXIgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BhcnNlci5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3guanMnXG5pbXBvcnQgeyBwYXRoUGFyc2VyIH0gZnJvbSAnLi4vdXRpbHMvcGF0aFBhcnNlci5qcydcblxuZnVuY3Rpb24gYXJyYXlUb1N0cmluZyhhKSB7XG4gIGxldCBzID0gJydcbiAgZm9yIChsZXQgaSA9IDAsIGlsID0gYS5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgcyArPSBhW2ldWzBdXG5cbiAgICBpZiAoYVtpXVsxXSAhPSBudWxsKSB7XG4gICAgICBzICs9IGFbaV1bMV1cblxuICAgICAgaWYgKGFbaV1bMl0gIT0gbnVsbCkge1xuICAgICAgICBzICs9ICcgJ1xuICAgICAgICBzICs9IGFbaV1bMl1cblxuICAgICAgICBpZiAoYVtpXVszXSAhPSBudWxsKSB7XG4gICAgICAgICAgcyArPSAnICdcbiAgICAgICAgICBzICs9IGFbaV1bM11cbiAgICAgICAgICBzICs9ICcgJ1xuICAgICAgICAgIHMgKz0gYVtpXVs0XVxuXG4gICAgICAgICAgaWYgKGFbaV1bNV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcyArPSAnICdcbiAgICAgICAgICAgIHMgKz0gYVtpXVs1XVxuICAgICAgICAgICAgcyArPSAnICdcbiAgICAgICAgICAgIHMgKz0gYVtpXVs2XVxuXG4gICAgICAgICAgICBpZiAoYVtpXVs3XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHMgKz0gJyAnXG4gICAgICAgICAgICAgIHMgKz0gYVtpXVs3XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzICsgJyAnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGhBcnJheSBleHRlbmRzIFNWR0FycmF5IHtcbiAgLy8gR2V0IGJvdW5kaW5nIGJveCBvZiBwYXRoXG4gIGJib3goKSB7XG4gICAgcGFyc2VyKCkucGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLnRvU3RyaW5nKCkpXG4gICAgcmV0dXJuIG5ldyBCb3gocGFyc2VyLm5vZGVzLnBhdGguZ2V0QkJveCgpKVxuICB9XG5cbiAgLy8gTW92ZSBwYXRoIHN0cmluZ1xuICBtb3ZlKHgsIHkpIHtcbiAgICAvLyBnZXQgYm91bmRpbmcgYm94IG9mIGN1cnJlbnQgc2l0dWF0aW9uXG4gICAgY29uc3QgYm94ID0gdGhpcy5iYm94KClcblxuICAgIC8vIGdldCByZWxhdGl2ZSBvZmZzZXRcbiAgICB4IC09IGJveC54XG4gICAgeSAtPSBib3gueVxuXG4gICAgaWYgKCFpc05hTih4KSAmJiAhaXNOYU4oeSkpIHtcbiAgICAgIC8vIG1vdmUgZXZlcnkgcG9pbnRcbiAgICAgIGZvciAobGV0IGwsIGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGwgPSB0aGlzW2ldWzBdXG5cbiAgICAgICAgaWYgKGwgPT09ICdNJyB8fCBsID09PSAnTCcgfHwgbCA9PT0gJ1QnKSB7XG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB4XG4gICAgICAgICAgdGhpc1tpXVsyXSArPSB5XG4gICAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0gnKSB7XG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB4XG4gICAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ1YnKSB7XG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB5XG4gICAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0MnIHx8IGwgPT09ICdTJyB8fCBsID09PSAnUScpIHtcbiAgICAgICAgICB0aGlzW2ldWzFdICs9IHhcbiAgICAgICAgICB0aGlzW2ldWzJdICs9IHlcbiAgICAgICAgICB0aGlzW2ldWzNdICs9IHhcbiAgICAgICAgICB0aGlzW2ldWzRdICs9IHlcblxuICAgICAgICAgIGlmIChsID09PSAnQycpIHtcbiAgICAgICAgICAgIHRoaXNbaV1bNV0gKz0geFxuICAgICAgICAgICAgdGhpc1tpXVs2XSArPSB5XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdBJykge1xuICAgICAgICAgIHRoaXNbaV1bNl0gKz0geFxuICAgICAgICAgIHRoaXNbaV1bN10gKz0geVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEFic29sdXRpemUgYW5kIHBhcnNlIHBhdGggdG8gYXJyYXlcbiAgcGFyc2UoZCA9ICdNMCAwJykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGQpKSB7XG4gICAgICBkID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgZCkudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIHJldHVybiBwYXRoUGFyc2VyKGQpXG4gIH1cblxuICAvLyBSZXNpemUgcGF0aCBzdHJpbmdcbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgLy8gZ2V0IGJvdW5kaW5nIGJveCBvZiBjdXJyZW50IHNpdHVhdGlvblxuICAgIGNvbnN0IGJveCA9IHRoaXMuYmJveCgpXG4gICAgbGV0IGksIGxcblxuICAgIC8vIElmIHRoZSBib3ggd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlbiB3ZSBpZ25vcmVcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIHJlc3BlY3RpdmUgYXhpc1xuICAgIGJveC53aWR0aCA9IGJveC53aWR0aCA9PT0gMCA/IDEgOiBib3gud2lkdGhcbiAgICBib3guaGVpZ2h0ID0gYm94LmhlaWdodCA9PT0gMCA/IDEgOiBib3guaGVpZ2h0XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBwb3NpdGlvbiBvZiBhbGwgcG9pbnRzIGFjY29yZGluZyB0byBuZXcgc2l6ZVxuICAgIGZvciAoaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGwgPSB0aGlzW2ldWzBdXG5cbiAgICAgIGlmIChsID09PSAnTScgfHwgbCA9PT0gJ0wnIHx8IGwgPT09ICdUJykge1xuICAgICAgICB0aGlzW2ldWzFdID0gKCh0aGlzW2ldWzFdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcbiAgICAgICAgdGhpc1tpXVsyXSA9ICgodGhpc1tpXVsyXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcbiAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0gnKSB7XG4gICAgICAgIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxuICAgICAgfSBlbHNlIGlmIChsID09PSAnVicpIHtcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcbiAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0MnIHx8IGwgPT09ICdTJyB8fCBsID09PSAnUScpIHtcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XG4gICAgICAgIHRoaXNbaV1bMl0gPSAoKHRoaXNbaV1bMl0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XG4gICAgICAgIHRoaXNbaV1bM10gPSAoKHRoaXNbaV1bM10gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxuICAgICAgICB0aGlzW2ldWzRdID0gKCh0aGlzW2ldWzRdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxuXG4gICAgICAgIGlmIChsID09PSAnQycpIHtcbiAgICAgICAgICB0aGlzW2ldWzVdID0gKCh0aGlzW2ldWzVdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcbiAgICAgICAgICB0aGlzW2ldWzZdID0gKCh0aGlzW2ldWzZdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGwgPT09ICdBJykge1xuICAgICAgICAvLyByZXNpemUgcmFkaWlcbiAgICAgICAgdGhpc1tpXVsxXSA9ICh0aGlzW2ldWzFdICogd2lkdGgpIC8gYm94LndpZHRoXG4gICAgICAgIHRoaXNbaV1bMl0gPSAodGhpc1tpXVsyXSAqIGhlaWdodCkgLyBib3guaGVpZ2h0XG5cbiAgICAgICAgLy8gbW92ZSBwb3NpdGlvbiB2YWx1ZXNcbiAgICAgICAgdGhpc1tpXVs2XSA9ICgodGhpc1tpXVs2XSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XG4gICAgICAgIHRoaXNbaV1bN10gPSAoKHRoaXNbaV1bN10gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIENvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBhcnJheVRvU3RyaW5nKHRoaXMpXG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi9NYXRyaXguanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgLy8gSW5pdGlhbGl6ZVxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgdGhpcy5pbml0KC4uLmFyZ3MpXG4gIH1cblxuICAvLyBDbG9uZSBwb2ludFxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMpXG4gIH1cblxuICBpbml0KHgsIHkpIHtcbiAgICBjb25zdCBiYXNlID0geyB4OiAwLCB5OiAwIH1cblxuICAgIC8vIGVuc3VyZSBzb3VyY2UgYXMgb2JqZWN0XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh4KVxuICAgICAgPyB7IHg6IHhbMF0sIHk6IHhbMV0gfVxuICAgICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgICAgPyB7IHg6IHgueCwgeTogeC55IH1cbiAgICAgICAgOiB7IHg6IHgsIHk6IHkgfVxuXG4gICAgLy8gbWVyZ2Ugc291cmNlXG4gICAgdGhpcy54ID0gc291cmNlLnggPT0gbnVsbCA/IGJhc2UueCA6IHNvdXJjZS54XG4gICAgdGhpcy55ID0gc291cmNlLnkgPT0gbnVsbCA/IGJhc2UueSA6IHNvdXJjZS55XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9BcnJheSgpIHtcbiAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55XVxuICB9XG5cbiAgdHJhbnNmb3JtKG0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnRyYW5zZm9ybU8obSlcbiAgfVxuXG4gIC8vIFRyYW5zZm9ybSBwb2ludCB3aXRoIG1hdHJpeFxuICB0cmFuc2Zvcm1PKG0pIHtcbiAgICBpZiAoIU1hdHJpeC5pc01hdHJpeExpa2UobSkpIHtcbiAgICAgIG0gPSBuZXcgTWF0cml4KG0pXG4gICAgfVxuXG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzXG5cbiAgICAvLyBQZXJmb3JtIHRoZSBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICB0aGlzLnggPSBtLmEgKiB4ICsgbS5jICogeSArIG0uZVxuICAgIHRoaXMueSA9IG0uYiAqIHggKyBtLmQgKiB5ICsgbS5mXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludCh4LCB5KSB7XG4gIHJldHVybiBuZXcgUG9pbnQoeCwgeSkudHJhbnNmb3JtTyh0aGlzLnNjcmVlbkNUTSgpLmludmVyc2VPKCkpXG59XG4iLCJpbXBvcnQgeyBkZWxpbWl0ZXIgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5pbXBvcnQgU1ZHQXJyYXkgZnJvbSAnLi9TVkdBcnJheS5qcydcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3guanMnXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vTWF0cml4LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludEFycmF5IGV4dGVuZHMgU1ZHQXJyYXkge1xuICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIHBvaW50c1xuICBiYm94KCkge1xuICAgIGxldCBtYXhYID0gLUluZmluaXR5XG4gICAgbGV0IG1heFkgPSAtSW5maW5pdHlcbiAgICBsZXQgbWluWCA9IEluZmluaXR5XG4gICAgbGV0IG1pblkgPSBJbmZpbml0eVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIG1heFggPSBNYXRoLm1heChlbFswXSwgbWF4WClcbiAgICAgIG1heFkgPSBNYXRoLm1heChlbFsxXSwgbWF4WSlcbiAgICAgIG1pblggPSBNYXRoLm1pbihlbFswXSwgbWluWClcbiAgICAgIG1pblkgPSBNYXRoLm1pbihlbFsxXSwgbWluWSlcbiAgICB9KVxuICAgIHJldHVybiBuZXcgQm94KG1pblgsIG1pblksIG1heFggLSBtaW5YLCBtYXhZIC0gbWluWSlcbiAgfVxuXG4gIC8vIE1vdmUgcG9pbnQgc3RyaW5nXG4gIG1vdmUoeCwgeSkge1xuICAgIGNvbnN0IGJveCA9IHRoaXMuYmJveCgpXG5cbiAgICAvLyBnZXQgcmVsYXRpdmUgb2Zmc2V0XG4gICAgeCAtPSBib3gueFxuICAgIHkgLT0gYm94LnlcblxuICAgIC8vIG1vdmUgZXZlcnkgcG9pbnRcbiAgICBpZiAoIWlzTmFOKHgpICYmICFpc05hTih5KSkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdGhpc1tpXSA9IFt0aGlzW2ldWzBdICsgeCwgdGhpc1tpXVsxXSArIHldXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFBhcnNlIHBvaW50IHN0cmluZyBhbmQgZmxhdCBhcnJheVxuICBwYXJzZShhcnJheSA9IFswLCAwXSkge1xuICAgIGNvbnN0IHBvaW50cyA9IFtdXG5cbiAgICAvLyBpZiBpdCBpcyBhbiBhcnJheSwgd2UgZmxhdHRlbiBpdCBhbmQgdGhlcmVmb3JlIGNsb25lIGl0IHRvIDEgZGVwdGhzXG4gICAgaWYgKGFycmF5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGFycmF5ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJyYXkpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVsc2UsIGl0IGlzIGNvbnNpZGVyZWQgYXMgYSBzdHJpbmdcbiAgICAgIC8vIHBhcnNlIHBvaW50c1xuICAgICAgYXJyYXkgPSBhcnJheS50cmltKCkuc3BsaXQoZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdClcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBwb2ludHMgLSBodHRwczovL3N2Z3dnLm9yZy9zdmcyLWRyYWZ0L3NoYXBlcy5odG1sI0RhdGFUeXBlUG9pbnRzXG4gICAgLy8gT2RkIG51bWJlciBvZiBjb29yZGluYXRlcyBpcyBhbiBlcnJvci4gSW4gc3VjaCBjYXNlcywgZHJvcCB0aGUgbGFzdCBvZGQgY29vcmRpbmF0ZS5cbiAgICBpZiAoYXJyYXkubGVuZ3RoICUgMiAhPT0gMCkgYXJyYXkucG9wKClcblxuICAgIC8vIHdyYXAgcG9pbnRzIGluIHR3by10dXBsZXNcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpID0gaSArIDIpIHtcbiAgICAgIHBvaW50cy5wdXNoKFthcnJheVtpXSwgYXJyYXlbaSArIDFdXSlcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzXG4gIH1cblxuICAvLyBSZXNpemUgcG9seSBzdHJpbmdcbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgbGV0IGlcbiAgICBjb25zdCBib3ggPSB0aGlzLmJib3goKVxuXG4gICAgLy8gcmVjYWxjdWxhdGUgcG9zaXRpb24gb2YgYWxsIHBvaW50cyBhY2NvcmRpbmcgdG8gbmV3IHNpemVcbiAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAoYm94LndpZHRoKVxuICAgICAgICB0aGlzW2ldWzBdID0gKCh0aGlzW2ldWzBdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcbiAgICAgIGlmIChib3guaGVpZ2h0KVxuICAgICAgICB0aGlzW2ldWzFdID0gKCh0aGlzW2ldWzFdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDb252ZXJ0IGFycmF5IHRvIGxpbmUgb2JqZWN0XG4gIHRvTGluZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDE6IHRoaXNbMF1bMF0sXG4gICAgICB5MTogdGhpc1swXVsxXSxcbiAgICAgIHgyOiB0aGlzWzFdWzBdLFxuICAgICAgeTI6IHRoaXNbMV1bMV1cbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdXG4gICAgLy8gY29udmVydCB0byBhIHBvbHkgcG9pbnQgc3RyaW5nXG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0gdGhpcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKHRoaXNbaV0uam9pbignLCcpKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheS5qb2luKCcgJylcbiAgfVxuXG4gIHRyYW5zZm9ybShtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS50cmFuc2Zvcm1PKG0pXG4gIH1cblxuICAvLyB0cmFuc2Zvcm0gcG9pbnRzIHdpdGggbWF0cml4IChzaW1pbGFyIHRvIFBvaW50LnRyYW5zZm9ybSlcbiAgdHJhbnNmb3JtTyhtKSB7XG4gICAgaWYgKCFNYXRyaXguaXNNYXRyaXhMaWtlKG0pKSB7XG4gICAgICBtID0gbmV3IE1hdHJpeChtKVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSB0aGlzLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgIC8vIFBlcmZvcm0gdGhlIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAgY29uc3QgW3gsIHldID0gdGhpc1tpXVxuICAgICAgdGhpc1tpXVswXSA9IG0uYSAqIHggKyBtLmMgKiB5ICsgbS5lXG4gICAgICB0aGlzW2ldWzFdID0gbS5iICogeCArIG0uZCAqIHkgKyBtLmZcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG4iLCJpbXBvcnQgeyBkZWxpbWl0ZXIgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR0FycmF5IGV4dGVuZHMgQXJyYXkge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncylcbiAgICB0aGlzLmluaXQoLi4uYXJncylcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKVxuICB9XG5cbiAgaW5pdChhcnIpIHtcbiAgICAvLyBUaGlzIGNhdGNoZXMgdGhlIGNhc2UsIHRoYXQgbmF0aXZlIG1hcCB0cmllcyB0byBjcmVhdGUgYW4gYXJyYXkgd2l0aCBuZXcgQXJyYXkoMSlcbiAgICBpZiAodHlwZW9mIGFyciA9PT0gJ251bWJlcicpIHJldHVybiB0aGlzXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5wdXNoKC4uLnRoaXMucGFyc2UoYXJyKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gUGFyc2Ugd2hpdGVzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nXG4gIHBhcnNlKGFycmF5ID0gW10pIHtcbiAgICAvLyBJZiBhbHJlYWR5IGlzIGFuIGFycmF5LCBubyBuZWVkIHRvIHBhcnNlIGl0XG4gICAgaWYgKGFycmF5IGluc3RhbmNlb2YgQXJyYXkpIHJldHVybiBhcnJheVxuXG4gICAgcmV0dXJuIGFycmF5LnRyaW0oKS5zcGxpdChkZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KVxuICB9XG5cbiAgdG9BcnJheSgpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdGhpcylcbiAgfVxuXG4gIHRvU2V0KCkge1xuICAgIHJldHVybiBuZXcgU2V0KHRoaXMpXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKCcgJylcbiAgfVxuXG4gIC8vIEZsYXR0ZW5zIHRoZSBhcnJheSBpZiBuZWVkZWRcbiAgdmFsdWVPZigpIHtcbiAgICBjb25zdCByZXQgPSBbXVxuICAgIHJldC5wdXNoKC4uLnRoaXMpXG4gICAgcmV0dXJuIHJldFxuICB9XG59XG4iLCJpbXBvcnQgeyBudW1iZXJBbmRVbml0IH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xuXG4vLyBNb2R1bGUgZm9yIHVuaXQgY29udmVyc2lvbnNcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR051bWJlciB7XG4gIC8vIEluaXRpYWxpemVcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxuICB9XG5cbiAgY29udmVydCh1bml0KSB7XG4gICAgcmV0dXJuIG5ldyBTVkdOdW1iZXIodGhpcy52YWx1ZSwgdW5pdClcbiAgfVxuXG4gIC8vIERpdmlkZSBudW1iZXJcbiAgZGl2aWRlKG51bWJlcikge1xuICAgIG51bWJlciA9IG5ldyBTVkdOdW1iZXIobnVtYmVyKVxuICAgIHJldHVybiBuZXcgU1ZHTnVtYmVyKHRoaXMgLyBudW1iZXIsIHRoaXMudW5pdCB8fCBudW1iZXIudW5pdClcbiAgfVxuXG4gIGluaXQodmFsdWUsIHVuaXQpIHtcbiAgICB1bml0ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVsxXSA6IHVuaXRcbiAgICB2YWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gOiB2YWx1ZVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBkZWZhdWx0c1xuICAgIHRoaXMudmFsdWUgPSAwXG4gICAgdGhpcy51bml0ID0gdW5pdCB8fCAnJ1xuXG4gICAgLy8gcGFyc2UgdmFsdWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gZW5zdXJlIGEgdmFsaWQgbnVtZXJpYyB2YWx1ZVxuICAgICAgdGhpcy52YWx1ZSA9IGlzTmFOKHZhbHVlKVxuICAgICAgICA/IDBcbiAgICAgICAgOiAhaXNGaW5pdGUodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZSA8IDBcbiAgICAgICAgICAgID8gLTMuNGUzOFxuICAgICAgICAgICAgOiArMy40ZTM4XG4gICAgICAgICAgOiB2YWx1ZVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdW5pdCA9IHZhbHVlLm1hdGNoKG51bWJlckFuZFVuaXQpXG5cbiAgICAgIGlmICh1bml0KSB7XG4gICAgICAgIC8vIG1ha2UgdmFsdWUgbnVtZXJpY1xuICAgICAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh1bml0WzFdKVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZVxuICAgICAgICBpZiAodW5pdFs1XSA9PT0gJyUnKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSAvPSAxMDBcbiAgICAgICAgfSBlbHNlIGlmICh1bml0WzVdID09PSAncycpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlICo9IDEwMDBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHVuaXRcbiAgICAgICAgdGhpcy51bml0ID0gdW5pdFs1XVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTVkdOdW1iZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlT2YoKVxuICAgICAgICB0aGlzLnVuaXQgPSB2YWx1ZS51bml0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFN1YnRyYWN0IG51bWJlclxuICBtaW51cyhudW1iZXIpIHtcbiAgICBudW1iZXIgPSBuZXcgU1ZHTnVtYmVyKG51bWJlcilcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzIC0gbnVtYmVyLCB0aGlzLnVuaXQgfHwgbnVtYmVyLnVuaXQpXG4gIH1cblxuICAvLyBBZGQgbnVtYmVyXG4gIHBsdXMobnVtYmVyKSB7XG4gICAgbnVtYmVyID0gbmV3IFNWR051bWJlcihudW1iZXIpXG4gICAgcmV0dXJuIG5ldyBTVkdOdW1iZXIodGhpcyArIG51bWJlciwgdGhpcy51bml0IHx8IG51bWJlci51bml0KVxuICB9XG5cbiAgLy8gTXVsdGlwbHkgbnVtYmVyXG4gIHRpbWVzKG51bWJlcikge1xuICAgIG51bWJlciA9IG5ldyBTVkdOdW1iZXIobnVtYmVyKVxuICAgIHJldHVybiBuZXcgU1ZHTnVtYmVyKHRoaXMgKiBudW1iZXIsIHRoaXMudW5pdCB8fCBudW1iZXIudW5pdClcbiAgfVxuXG4gIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLnZhbHVlLCB0aGlzLnVuaXRdXG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnVuaXQgPT09ICclJ1xuICAgICAgICA/IH5+KHRoaXMudmFsdWUgKiAxZTgpIC8gMWU2XG4gICAgICAgIDogdGhpcy51bml0ID09PSAncydcbiAgICAgICAgICA/IHRoaXMudmFsdWUgLyAxZTNcbiAgICAgICAgICA6IHRoaXMudmFsdWUpICsgdGhpcy51bml0XG4gICAgKVxuICB9XG5cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG59XG4iLCJpbXBvcnQgeyBhZGRNZXRob2ROYW1lcyB9IGZyb20gJy4vbWV0aG9kcy5qcydcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICcuL3V0aWxzLmpzJ1xuaW1wb3J0IHsgc3ZnIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xuaW1wb3J0IEJhc2UgZnJvbSAnLi4vdHlwZXMvQmFzZS5qcydcblxuY29uc3QgZWxlbWVudHMgPSB7fVxuZXhwb3J0IGNvbnN0IHJvb3QgPSAnX19fU1lNQk9MX19fUk9PVF9fXydcblxuLy8gTWV0aG9kIGZvciBlbGVtZW50IGNyZWF0aW9uXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIG5zID0gc3ZnKSB7XG4gIC8vIGNyZWF0ZSBlbGVtZW50XG4gIHJldHVybiBnbG9iYWxzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgbmFtZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VJbnN0YW5jZShlbGVtZW50LCBpc0hUTUwgPSBmYWxzZSkge1xuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2UpIHJldHVybiBlbGVtZW50XG5cbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBhZG9wdGVyKGVsZW1lbnQpXG4gIH1cblxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG5ldyBlbGVtZW50c1tyb290XSgpXG4gIH1cblxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnICYmIGVsZW1lbnQuY2hhckF0KDApICE9PSAnPCcpIHtcbiAgICByZXR1cm4gYWRvcHRlcihnbG9iYWxzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkpXG4gIH1cblxuICAvLyBNYWtlIHN1cmUsIHRoYXQgSFRNTCBlbGVtZW50cyBhcmUgY3JlYXRlZCB3aXRoIHRoZSBjb3JyZWN0IG5hbWVzcGFjZVxuICBjb25zdCB3cmFwcGVyID0gaXNIVE1MID8gZ2xvYmFscy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGNyZWF0ZSgnc3ZnJylcbiAgd3JhcHBlci5pbm5lckhUTUwgPSBlbGVtZW50XG5cbiAgLy8gV2UgY2FuIHVzZSBmaXJzdENoaWxkIGhlcmUgYmVjYXVzZSB3ZSBrbm93LFxuICAvLyB0aGF0IHRoZSBmaXJzdCBjaGFyIGlzIDwgYW5kIHRodXMgYW4gZWxlbWVudFxuICBlbGVtZW50ID0gYWRvcHRlcih3cmFwcGVyLmZpcnN0Q2hpbGQpXG5cbiAgLy8gbWFrZSBzdXJlLCB0aGF0IGVsZW1lbnQgZG9lc24ndCBoYXZlIGl0cyB3cmFwcGVyIGF0dGFjaGVkXG4gIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5maXJzdENoaWxkKVxuICByZXR1cm4gZWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZU9yTmV3KG5hbWUsIG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgJiZcbiAgICAobm9kZSBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93Lk5vZGUgfHxcbiAgICAgIChub2RlLm93bmVyRG9jdW1lbnQgJiZcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5Ob2RlKSlcbiAgICA/IG5vZGVcbiAgICA6IGNyZWF0ZShuYW1lKVxufVxuXG4vLyBBZG9wdCBleGlzdGluZyBzdmcgZWxlbWVudHNcbmV4cG9ydCBmdW5jdGlvbiBhZG9wdChub2RlKSB7XG4gIC8vIGNoZWNrIGZvciBwcmVzZW5jZSBvZiBub2RlXG4gIGlmICghbm9kZSkgcmV0dXJuIG51bGxcblxuICAvLyBtYWtlIHN1cmUgYSBub2RlIGlzbid0IGFscmVhZHkgYWRvcHRlZFxuICBpZiAobm9kZS5pbnN0YW5jZSBpbnN0YW5jZW9mIEJhc2UpIHJldHVybiBub2RlLmluc3RhbmNlXG5cbiAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQtZnJhZ21lbnQnKSB7XG4gICAgcmV0dXJuIG5ldyBlbGVtZW50cy5GcmFnbWVudChub2RlKVxuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSB2YXJpYWJsZXNcbiAgbGV0IGNsYXNzTmFtZSA9IGNhcGl0YWxpemUobm9kZS5ub2RlTmFtZSB8fCAnRG9tJylcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBncmFkaWVudHMgYXJlIGFkb3B0ZWQgY29ycmVjdGx5XG4gIGlmIChjbGFzc05hbWUgPT09ICdMaW5lYXJHcmFkaWVudCcgfHwgY2xhc3NOYW1lID09PSAnUmFkaWFsR3JhZGllbnQnKSB7XG4gICAgY2xhc3NOYW1lID0gJ0dyYWRpZW50J1xuXG4gICAgLy8gRmFsbGJhY2sgdG8gRG9tIGlmIGVsZW1lbnQgaXMgbm90IGtub3duXG4gIH0gZWxzZSBpZiAoIWVsZW1lbnRzW2NsYXNzTmFtZV0pIHtcbiAgICBjbGFzc05hbWUgPSAnRG9tJ1xuICB9XG5cbiAgcmV0dXJuIG5ldyBlbGVtZW50c1tjbGFzc05hbWVdKG5vZGUpXG59XG5cbmxldCBhZG9wdGVyID0gYWRvcHRcblxuZXhwb3J0IGZ1bmN0aW9uIG1vY2tBZG9wdChtb2NrID0gYWRvcHQpIHtcbiAgYWRvcHRlciA9IG1vY2tcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGVsZW1lbnQsIG5hbWUgPSBlbGVtZW50Lm5hbWUsIGFzUm9vdCA9IGZhbHNlKSB7XG4gIGVsZW1lbnRzW25hbWVdID0gZWxlbWVudFxuICBpZiAoYXNSb290KSBlbGVtZW50c1tyb290XSA9IGVsZW1lbnRcblxuICBhZGRNZXRob2ROYW1lcyhPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbGVtZW50LnByb3RvdHlwZSkpXG5cbiAgcmV0dXJuIGVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzKG5hbWUpIHtcbiAgcmV0dXJuIGVsZW1lbnRzW25hbWVdXG59XG5cbi8vIEVsZW1lbnQgaWQgc2VxdWVuY2VcbmxldCBkaWQgPSAxMDAwXG5cbi8vIEdldCBuZXh0IG5hbWVkIGVsZW1lbnQgaWRcbmV4cG9ydCBmdW5jdGlvbiBlaWQobmFtZSkge1xuICByZXR1cm4gJ1N2Z2pzJyArIGNhcGl0YWxpemUobmFtZSkgKyBkaWQrK1xufVxuXG4vLyBEZWVwIG5ldyBpZCBhc3NpZ25tZW50XG5leHBvcnQgZnVuY3Rpb24gYXNzaWduTmV3SWQobm9kZSkge1xuICAvLyBkbyB0aGUgc2FtZSBmb3IgU1ZHIGNoaWxkIG5vZGVzIGFzIHdlbGxcbiAgZm9yIChsZXQgaSA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBhc3NpZ25OZXdJZChub2RlLmNoaWxkcmVuW2ldKVxuICB9XG5cbiAgaWYgKG5vZGUuaWQpIHtcbiAgICBub2RlLmlkID0gZWlkKG5vZGUubm9kZU5hbWUpXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG5cbi8vIE1ldGhvZCBmb3IgZXh0ZW5kaW5nIG9iamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQobW9kdWxlcywgbWV0aG9kcykge1xuICBsZXQga2V5LCBpXG5cbiAgbW9kdWxlcyA9IEFycmF5LmlzQXJyYXkobW9kdWxlcykgPyBtb2R1bGVzIDogW21vZHVsZXNdXG5cbiAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIG1vZHVsZXNbaV0ucHJvdG90eXBlW2tleV0gPSBtZXRob2RzW2tleV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBXaXRoQXR0ckNoZWNrKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IG8gPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cblxuICAgIGlmIChvICYmIG8uY29uc3RydWN0b3IgPT09IE9iamVjdCAmJiAhKG8gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKDAsIC0xKSkuYXR0cihvKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IG1ldGhvZHMgPSB7fVxuY29uc3QgbmFtZXMgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2RzKG5hbWUsIG0pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IF9uYW1lIG9mIG5hbWUpIHtcbiAgICAgIHJlZ2lzdGVyTWV0aG9kcyhfbmFtZSwgbSlcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChjb25zdCBfbmFtZSBpbiBuYW1lKSB7XG4gICAgICByZWdpc3Rlck1ldGhvZHMoX25hbWUsIG5hbWVbX25hbWVdKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIGFkZE1ldGhvZE5hbWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG0pKVxuICBtZXRob2RzW25hbWVdID0gT2JqZWN0LmFzc2lnbihtZXRob2RzW25hbWVdIHx8IHt9LCBtKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0aG9kc0ZvcihuYW1lKSB7XG4gIHJldHVybiBtZXRob2RzW25hbWVdIHx8IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRob2ROYW1lcygpIHtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KG5hbWVzKV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1ldGhvZE5hbWVzKF9uYW1lcykge1xuICBuYW1lcy5wdXNoKC4uLl9uYW1lcylcbn1cbiIsImltcG9ydCB7IGlzUGF0aExldHRlciB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuLi90eXBlcy9Qb2ludC5qcydcblxuY29uc3Qgc2VnbWVudFBhcmFtZXRlcnMgPSB7XG4gIE06IDIsXG4gIEw6IDIsXG4gIEg6IDEsXG4gIFY6IDEsXG4gIEM6IDYsXG4gIFM6IDQsXG4gIFE6IDQsXG4gIFQ6IDIsXG4gIEE6IDcsXG4gIFo6IDBcbn1cblxuY29uc3QgcGF0aEhhbmRsZXJzID0ge1xuICBNOiBmdW5jdGlvbiAoYywgcCwgcDApIHtcbiAgICBwLnggPSBwMC54ID0gY1swXVxuICAgIHAueSA9IHAwLnkgPSBjWzFdXG5cbiAgICByZXR1cm4gWydNJywgcC54LCBwLnldXG4gIH0sXG4gIEw6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC54ID0gY1swXVxuICAgIHAueSA9IGNbMV1cbiAgICByZXR1cm4gWydMJywgY1swXSwgY1sxXV1cbiAgfSxcbiAgSDogZnVuY3Rpb24gKGMsIHApIHtcbiAgICBwLnggPSBjWzBdXG4gICAgcmV0dXJuIFsnSCcsIGNbMF1dXG4gIH0sXG4gIFY6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC55ID0gY1swXVxuICAgIHJldHVybiBbJ1YnLCBjWzBdXVxuICB9LFxuICBDOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueCA9IGNbNF1cbiAgICBwLnkgPSBjWzVdXG4gICAgcmV0dXJuIFsnQycsIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sIGNbNF0sIGNbNV1dXG4gIH0sXG4gIFM6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC54ID0gY1syXVxuICAgIHAueSA9IGNbM11cbiAgICByZXR1cm4gWydTJywgY1swXSwgY1sxXSwgY1syXSwgY1szXV1cbiAgfSxcbiAgUTogZnVuY3Rpb24gKGMsIHApIHtcbiAgICBwLnggPSBjWzJdXG4gICAgcC55ID0gY1szXVxuICAgIHJldHVybiBbJ1EnLCBjWzBdLCBjWzFdLCBjWzJdLCBjWzNdXVxuICB9LFxuICBUOiBmdW5jdGlvbiAoYywgcCkge1xuICAgIHAueCA9IGNbMF1cbiAgICBwLnkgPSBjWzFdXG4gICAgcmV0dXJuIFsnVCcsIGNbMF0sIGNbMV1dXG4gIH0sXG4gIFo6IGZ1bmN0aW9uIChjLCBwLCBwMCkge1xuICAgIHAueCA9IHAwLnhcbiAgICBwLnkgPSBwMC55XG4gICAgcmV0dXJuIFsnWiddXG4gIH0sXG4gIEE6IGZ1bmN0aW9uIChjLCBwKSB7XG4gICAgcC54ID0gY1s1XVxuICAgIHAueSA9IGNbNl1cbiAgICByZXR1cm4gWydBJywgY1swXSwgY1sxXSwgY1syXSwgY1szXSwgY1s0XSwgY1s1XSwgY1s2XV1cbiAgfVxufVxuXG5jb25zdCBtbGh2cXRjc2F6ID0gJ21saHZxdGNzYXonLnNwbGl0KCcnKVxuXG5mb3IgKGxldCBpID0gMCwgaWwgPSBtbGh2cXRjc2F6Lmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgcGF0aEhhbmRsZXJzW21saHZxdGNzYXpbaV1dID0gKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjLCBwLCBwMCkge1xuICAgICAgaWYgKGkgPT09ICdIJykgY1swXSA9IGNbMF0gKyBwLnhcbiAgICAgIGVsc2UgaWYgKGkgPT09ICdWJykgY1swXSA9IGNbMF0gKyBwLnlcbiAgICAgIGVsc2UgaWYgKGkgPT09ICdBJykge1xuICAgICAgICBjWzVdID0gY1s1XSArIHAueFxuICAgICAgICBjWzZdID0gY1s2XSArIHAueVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGpsID0gYy5sZW5ndGg7IGogPCBqbDsgKytqKSB7XG4gICAgICAgICAgY1tqXSA9IGNbal0gKyAoaiAlIDIgPyBwLnkgOiBwLngpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdGhIYW5kbGVyc1tpXShjLCBwLCBwMClcbiAgICB9XG4gIH0pKG1saHZxdGNzYXpbaV0udG9VcHBlckNhc2UoKSlcbn1cblxuZnVuY3Rpb24gbWFrZUFic29sdXQocGFyc2VyKSB7XG4gIGNvbnN0IGNvbW1hbmQgPSBwYXJzZXIuc2VnbWVudFswXVxuICByZXR1cm4gcGF0aEhhbmRsZXJzW2NvbW1hbmRdKHBhcnNlci5zZWdtZW50LnNsaWNlKDEpLCBwYXJzZXIucCwgcGFyc2VyLnAwKVxufVxuXG5mdW5jdGlvbiBzZWdtZW50Q29tcGxldGUocGFyc2VyKSB7XG4gIHJldHVybiAoXG4gICAgcGFyc2VyLnNlZ21lbnQubGVuZ3RoICYmXG4gICAgcGFyc2VyLnNlZ21lbnQubGVuZ3RoIC0gMSA9PT1cbiAgICAgIHNlZ21lbnRQYXJhbWV0ZXJzW3BhcnNlci5zZWdtZW50WzBdLnRvVXBwZXJDYXNlKCldXG4gIClcbn1cblxuZnVuY3Rpb24gc3RhcnROZXdTZWdtZW50KHBhcnNlciwgdG9rZW4pIHtcbiAgcGFyc2VyLmluTnVtYmVyICYmIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgZmFsc2UpXG4gIGNvbnN0IHBhdGhMZXR0ZXIgPSBpc1BhdGhMZXR0ZXIudGVzdCh0b2tlbilcblxuICBpZiAocGF0aExldHRlcikge1xuICAgIHBhcnNlci5zZWdtZW50ID0gW3Rva2VuXVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGxhc3RDb21tYW5kID0gcGFyc2VyLmxhc3RDb21tYW5kXG4gICAgY29uc3Qgc21hbGwgPSBsYXN0Q29tbWFuZC50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgaXNTbWFsbCA9IGxhc3RDb21tYW5kID09PSBzbWFsbFxuICAgIHBhcnNlci5zZWdtZW50ID0gW3NtYWxsID09PSAnbScgPyAoaXNTbWFsbCA/ICdsJyA6ICdMJykgOiBsYXN0Q29tbWFuZF1cbiAgfVxuXG4gIHBhcnNlci5pblNlZ21lbnQgPSB0cnVlXG4gIHBhcnNlci5sYXN0Q29tbWFuZCA9IHBhcnNlci5zZWdtZW50WzBdXG5cbiAgcmV0dXJuIHBhdGhMZXR0ZXJcbn1cblxuZnVuY3Rpb24gZmluYWxpemVOdW1iZXIocGFyc2VyLCBpbk51bWJlcikge1xuICBpZiAoIXBhcnNlci5pbk51bWJlcikgdGhyb3cgbmV3IEVycm9yKCdQYXJzZXIgRXJyb3InKVxuICBwYXJzZXIubnVtYmVyICYmIHBhcnNlci5zZWdtZW50LnB1c2gocGFyc2VGbG9hdChwYXJzZXIubnVtYmVyKSlcbiAgcGFyc2VyLmluTnVtYmVyID0gaW5OdW1iZXJcbiAgcGFyc2VyLm51bWJlciA9ICcnXG4gIHBhcnNlci5wb2ludFNlZW4gPSBmYWxzZVxuICBwYXJzZXIuaGFzRXhwb25lbnQgPSBmYWxzZVxuXG4gIGlmIChzZWdtZW50Q29tcGxldGUocGFyc2VyKSkge1xuICAgIGZpbmFsaXplU2VnbWVudChwYXJzZXIpXG4gIH1cbn1cblxuZnVuY3Rpb24gZmluYWxpemVTZWdtZW50KHBhcnNlcikge1xuICBwYXJzZXIuaW5TZWdtZW50ID0gZmFsc2VcbiAgaWYgKHBhcnNlci5hYnNvbHV0ZSkge1xuICAgIHBhcnNlci5zZWdtZW50ID0gbWFrZUFic29sdXQocGFyc2VyKVxuICB9XG4gIHBhcnNlci5zZWdtZW50cy5wdXNoKHBhcnNlci5zZWdtZW50KVxufVxuXG5mdW5jdGlvbiBpc0FyY0ZsYWcocGFyc2VyKSB7XG4gIGlmICghcGFyc2VyLnNlZ21lbnQubGVuZ3RoKSByZXR1cm4gZmFsc2VcbiAgY29uc3QgaXNBcmMgPSBwYXJzZXIuc2VnbWVudFswXS50b1VwcGVyQ2FzZSgpID09PSAnQSdcbiAgY29uc3QgbGVuZ3RoID0gcGFyc2VyLnNlZ21lbnQubGVuZ3RoXG5cbiAgcmV0dXJuIGlzQXJjICYmIChsZW5ndGggPT09IDQgfHwgbGVuZ3RoID09PSA1KVxufVxuXG5mdW5jdGlvbiBpc0V4cG9uZW50aWFsKHBhcnNlcikge1xuICByZXR1cm4gcGFyc2VyLmxhc3RUb2tlbi50b1VwcGVyQ2FzZSgpID09PSAnRSdcbn1cblxuY29uc3QgcGF0aERlbGltaXRlcnMgPSBuZXcgU2V0KFsnICcsICcsJywgJ1xcdCcsICdcXG4nLCAnXFxyJywgJ1xcZiddKVxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhQYXJzZXIoZCwgdG9BYnNvbHV0ZSA9IHRydWUpIHtcbiAgbGV0IGluZGV4ID0gMFxuICBsZXQgdG9rZW4gPSAnJ1xuICBjb25zdCBwYXJzZXIgPSB7XG4gICAgc2VnbWVudDogW10sXG4gICAgaW5OdW1iZXI6IGZhbHNlLFxuICAgIG51bWJlcjogJycsXG4gICAgbGFzdFRva2VuOiAnJyxcbiAgICBpblNlZ21lbnQ6IGZhbHNlLFxuICAgIHNlZ21lbnRzOiBbXSxcbiAgICBwb2ludFNlZW46IGZhbHNlLFxuICAgIGhhc0V4cG9uZW50OiBmYWxzZSxcbiAgICBhYnNvbHV0ZTogdG9BYnNvbHV0ZSxcbiAgICBwMDogbmV3IFBvaW50KCksXG4gICAgcDogbmV3IFBvaW50KClcbiAgfVxuXG4gIHdoaWxlICgoKHBhcnNlci5sYXN0VG9rZW4gPSB0b2tlbiksICh0b2tlbiA9IGQuY2hhckF0KGluZGV4KyspKSkpIHtcbiAgICBpZiAoIXBhcnNlci5pblNlZ21lbnQpIHtcbiAgICAgIGlmIChzdGFydE5ld1NlZ21lbnQocGFyc2VyLCB0b2tlbikpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG9rZW4gPT09ICcuJykge1xuICAgICAgaWYgKHBhcnNlci5wb2ludFNlZW4gfHwgcGFyc2VyLmhhc0V4cG9uZW50KSB7XG4gICAgICAgIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgZmFsc2UpXG4gICAgICAgIC0taW5kZXhcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHBhcnNlci5pbk51bWJlciA9IHRydWVcbiAgICAgIHBhcnNlci5wb2ludFNlZW4gPSB0cnVlXG4gICAgICBwYXJzZXIubnVtYmVyICs9IHRva2VuXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmICghaXNOYU4ocGFyc2VJbnQodG9rZW4pKSkge1xuICAgICAgaWYgKHBhcnNlci5udW1iZXIgPT09ICcwJyB8fCBpc0FyY0ZsYWcocGFyc2VyKSkge1xuICAgICAgICBwYXJzZXIuaW5OdW1iZXIgPSB0cnVlXG4gICAgICAgIHBhcnNlci5udW1iZXIgPSB0b2tlblxuICAgICAgICBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIHRydWUpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHBhcnNlci5pbk51bWJlciA9IHRydWVcbiAgICAgIHBhcnNlci5udW1iZXIgKz0gdG9rZW5cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHBhdGhEZWxpbWl0ZXJzLmhhcyh0b2tlbikpIHtcbiAgICAgIGlmIChwYXJzZXIuaW5OdW1iZXIpIHtcbiAgICAgICAgZmluYWxpemVOdW1iZXIocGFyc2VyLCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHRva2VuID09PSAnLScgfHwgdG9rZW4gPT09ICcrJykge1xuICAgICAgaWYgKHBhcnNlci5pbk51bWJlciAmJiAhaXNFeHBvbmVudGlhbChwYXJzZXIpKSB7XG4gICAgICAgIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgZmFsc2UpXG4gICAgICAgIC0taW5kZXhcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHBhcnNlci5udW1iZXIgKz0gdG9rZW5cbiAgICAgIHBhcnNlci5pbk51bWJlciA9IHRydWVcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHRva2VuLnRvVXBwZXJDYXNlKCkgPT09ICdFJykge1xuICAgICAgcGFyc2VyLm51bWJlciArPSB0b2tlblxuICAgICAgcGFyc2VyLmhhc0V4cG9uZW50ID0gdHJ1ZVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoaXNQYXRoTGV0dGVyLnRlc3QodG9rZW4pKSB7XG4gICAgICBpZiAocGFyc2VyLmluTnVtYmVyKSB7XG4gICAgICAgIGZpbmFsaXplTnVtYmVyKHBhcnNlciwgZmFsc2UpXG4gICAgICB9IGVsc2UgaWYgKCFzZWdtZW50Q29tcGxldGUocGFyc2VyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhcnNlciBFcnJvcicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5hbGl6ZVNlZ21lbnQocGFyc2VyKVxuICAgICAgfVxuICAgICAgLS1pbmRleFxuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJzZXIuaW5OdW1iZXIpIHtcbiAgICBmaW5hbGl6ZU51bWJlcihwYXJzZXIsIGZhbHNlKVxuICB9XG5cbiAgaWYgKHBhcnNlci5pblNlZ21lbnQgJiYgc2VnbWVudENvbXBsZXRlKHBhcnNlcikpIHtcbiAgICBmaW5hbGl6ZVNlZ21lbnQocGFyc2VyKVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlci5zZWdtZW50c1xufVxuIiwiLy8gTWFwIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gbWFwKGFycmF5LCBibG9jaykge1xuICBsZXQgaVxuICBjb25zdCBpbCA9IGFycmF5Lmxlbmd0aFxuICBjb25zdCByZXN1bHQgPSBbXVxuXG4gIGZvciAoaSA9IDA7IGkgPCBpbDsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goYmxvY2soYXJyYXlbaV0pKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBGaWx0ZXIgZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIoYXJyYXksIGJsb2NrKSB7XG4gIGxldCBpXG4gIGNvbnN0IGlsID0gYXJyYXkubGVuZ3RoXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgZm9yIChpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICBpZiAoYmxvY2soYXJyYXlbaV0pKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJheVtpXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIERlZ3JlZXMgdG8gcmFkaWFuc1xuZXhwb3J0IGZ1bmN0aW9uIHJhZGlhbnMoZCkge1xuICByZXR1cm4gKChkICUgMzYwKSAqIE1hdGguUEkpIC8gMTgwXG59XG5cbi8vIFJhZGlhbnMgdG8gZGVncmVlc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZ3JlZXMocikge1xuICByZXR1cm4gKChyICogMTgwKSAvIE1hdGguUEkpICUgMzYwXG59XG5cbi8vIENvbnZlcnQgY2FtZWwgY2FzZWQgc3RyaW5nIHRvIGRhc2ggc2VwYXJhdGVkXG5leHBvcnQgZnVuY3Rpb24gdW5DYW1lbENhc2Uocykge1xuICByZXR1cm4gcy5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uIChtLCBnKSB7XG4gICAgcmV0dXJuICctJyArIGcudG9Mb3dlckNhc2UoKVxuICB9KVxufVxuXG4vLyBDYXBpdGFsaXplIGZpcnN0IGxldHRlciBvZiBhIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUocykge1xuICByZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSlcbn1cblxuLy8gQ2FsY3VsYXRlIHByb3BvcnRpb25hbCB3aWR0aCBhbmQgaGVpZ2h0IHZhbHVlcyB3aGVuIG5lY2Vzc2FyeVxuZXhwb3J0IGZ1bmN0aW9uIHByb3BvcnRpb25hbFNpemUoZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgYm94KSB7XG4gIGlmICh3aWR0aCA9PSBudWxsIHx8IGhlaWdodCA9PSBudWxsKSB7XG4gICAgYm94ID0gYm94IHx8IGVsZW1lbnQuYmJveCgpXG5cbiAgICBpZiAod2lkdGggPT0gbnVsbCkge1xuICAgICAgd2lkdGggPSAoYm94LndpZHRoIC8gYm94LmhlaWdodCkgKiBoZWlnaHRcbiAgICB9IGVsc2UgaWYgKGhlaWdodCA9PSBudWxsKSB7XG4gICAgICBoZWlnaHQgPSAoYm94LmhlaWdodCAvIGJveC53aWR0aCkgKiB3aWR0aFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFkZHMgc3VwcG9ydCBmb3Igc3RyaW5nIG9yaWdpbnMuXG4gKiBJdCBzZWFyY2hlcyBmb3IgYW4gb3JpZ2luIGluIG8ub3JpZ2luIG8ub3ggYW5kIG8ub3JpZ2luWC5cbiAqIFRoaXMgd2F5LCBvcmlnaW46IHt4OiAnY2VudGVyJywgeTogNTB9IGNhbiBiZSBwYXNzZWQgYXMgd2VsbCBhcyBveDogJ2NlbnRlcicsIG95OiA1MFxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbihvLCBlbGVtZW50KSB7XG4gIGNvbnN0IG9yaWdpbiA9IG8ub3JpZ2luXG4gIC8vIEZpcnN0IGNoZWNrIGlmIG9yaWdpbiBpcyBpbiBveCBvciBvcmlnaW5YXG4gIGxldCBveCA9IG8ub3ggIT0gbnVsbCA/IG8ub3ggOiBvLm9yaWdpblggIT0gbnVsbCA/IG8ub3JpZ2luWCA6ICdjZW50ZXInXG4gIGxldCBveSA9IG8ub3kgIT0gbnVsbCA/IG8ub3kgOiBvLm9yaWdpblkgIT0gbnVsbCA/IG8ub3JpZ2luWSA6ICdjZW50ZXInXG5cbiAgLy8gVGhlbiBjaGVjayBpZiBvcmlnaW4gd2FzIHVzZWQgYW5kIG92ZXJ3cml0ZSBpbiB0aGF0IGNhc2VcbiAgaWYgKG9yaWdpbiAhPSBudWxsKSB7XG4gICAgO1tveCwgb3ldID0gQXJyYXkuaXNBcnJheShvcmlnaW4pXG4gICAgICA/IG9yaWdpblxuICAgICAgOiB0eXBlb2Ygb3JpZ2luID09PSAnb2JqZWN0J1xuICAgICAgICA/IFtvcmlnaW4ueCwgb3JpZ2luLnldXG4gICAgICAgIDogW29yaWdpbiwgb3JpZ2luXVxuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHRvIG9ubHkgY2FsbCBiYm94IHdoZW4gYWN0dWFsbHkgbmVlZGVkXG4gIGNvbnN0IGNvbmRYID0gdHlwZW9mIG94ID09PSAnc3RyaW5nJ1xuICBjb25zdCBjb25kWSA9IHR5cGVvZiBveSA9PT0gJ3N0cmluZydcbiAgaWYgKGNvbmRYIHx8IGNvbmRZKSB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoLCB4LCB5IH0gPSBlbGVtZW50LmJib3goKVxuXG4gICAgLy8gQW5kIG9ubHkgb3ZlcndyaXRlIGlmIHN0cmluZyB3YXMgcGFzc2VkIGZvciB0aGlzIHNwZWNpZmljIGF4aXNcbiAgICBpZiAoY29uZFgpIHtcbiAgICAgIG94ID0gb3guaW5jbHVkZXMoJ2xlZnQnKVxuICAgICAgICA/IHhcbiAgICAgICAgOiBveC5pbmNsdWRlcygncmlnaHQnKVxuICAgICAgICAgID8geCArIHdpZHRoXG4gICAgICAgICAgOiB4ICsgd2lkdGggLyAyXG4gICAgfVxuXG4gICAgaWYgKGNvbmRZKSB7XG4gICAgICBveSA9IG95LmluY2x1ZGVzKCd0b3AnKVxuICAgICAgICA/IHlcbiAgICAgICAgOiBveS5pbmNsdWRlcygnYm90dG9tJylcbiAgICAgICAgICA/IHkgKyBoZWlnaHRcbiAgICAgICAgICA6IHkgKyBoZWlnaHQgLyAyXG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBvcmlnaW4gYXMgaXQgaXMgaWYgaXQgd2Fzbid0IGEgc3RyaW5nXG4gIHJldHVybiBbb3gsIG95XVxufVxuXG5jb25zdCBkZXNjcmlwdGl2ZUVsZW1lbnRzID0gbmV3IFNldChbJ2Rlc2MnLCAnbWV0YWRhdGEnLCAndGl0bGUnXSlcbmV4cG9ydCBjb25zdCBpc0Rlc2NyaXB0aXZlID0gKGVsZW1lbnQpID0+XG4gIGRlc2NyaXB0aXZlRWxlbWVudHMuaGFzKGVsZW1lbnQubm9kZU5hbWUpXG5cbmV4cG9ydCBjb25zdCB3cml0ZURhdGFUb0RvbSA9IChlbGVtZW50LCBkYXRhLCBkZWZhdWx0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGNsb25lZCA9IHsgLi4uZGF0YSB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gY2xvbmVkKSB7XG4gICAgaWYgKGNsb25lZFtrZXldLnZhbHVlT2YoKSA9PT0gZGVmYXVsdHNba2V5XSkge1xuICAgICAgZGVsZXRlIGNsb25lZFtrZXldXG4gICAgfVxuICB9XG5cbiAgaWYgKE9iamVjdC5rZXlzKGNsb25lZCkubGVuZ3RoKSB7XG4gICAgZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdmdqcycsIEpTT04uc3RyaW5naWZ5KGNsb25lZCkpIC8vIHNlZSAjNDI4XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5ub2RlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zdmdqcycpXG4gICAgZWxlbWVudC5ub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc3ZnanM6ZGF0YScpXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBnbG9iYWxzID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyxcbiAgZG9jdW1lbnQ6IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZG9jdW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyV2luZG93KHdpbiA9IG51bGwsIGRvYyA9IG51bGwpIHtcbiAgZ2xvYmFscy53aW5kb3cgPSB3aW5cbiAgZ2xvYmFscy5kb2N1bWVudCA9IGRvY1xufVxuXG5jb25zdCBzYXZlID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVXaW5kb3coKSB7XG4gIHNhdmUud2luZG93ID0gZ2xvYmFscy53aW5kb3dcbiAgc2F2ZS5kb2N1bWVudCA9IGdsb2JhbHMuZG9jdW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVXaW5kb3coKSB7XG4gIGdsb2JhbHMud2luZG93ID0gc2F2ZS53aW5kb3dcbiAgZ2xvYmFscy5kb2N1bWVudCA9IHNhdmUuZG9jdW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhXaW5kb3cod2luLCBmbikge1xuICBzYXZlV2luZG93KClcbiAgcmVnaXN0ZXJXaW5kb3cod2luLCB3aW4uZG9jdW1lbnQpXG4gIGZuKHdpbiwgd2luLmRvY3VtZW50KVxuICByZXN0b3JlV2luZG93KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgcmV0dXJuIGdsb2JhbHMud2luZG93XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNvcnRpbmdBbGdvcml0aG1Db250cm9scyB9IGZyb20gXCIuL2FsZ29yaXRobS1jb250cm9scy9zb3J0aW5nLWFsZ29yaXRobS1jb250cm9sc1wiO1xuaW1wb3J0IHsgRW5naW5lLCBTdWJtaXRGdW5jdGlvbiB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgaW5pdGlhbGlzZUVuZ2luZSwgcXVlcnlTZWxlY3RvciwgUmVjb3JkT2ZFbmdpbmVzIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSW5zZXJ0aW9uU29ydCB9IGZyb20gXCIuL3NvcnRpbmcvSW5zZXJ0aW9uU29ydFwiO1xuaW1wb3J0IHsgTWVyZ2VTb3J0IH0gZnJvbSBcIi4vc29ydGluZy9NZXJnZVNvcnRcIjtcbmltcG9ydCB7IFF1aWNrU29ydCB9IGZyb20gXCIuL3NvcnRpbmcvUXVpY2tTb3J0XCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25Tb3J0IH0gZnJvbSBcIi4vc29ydGluZy9TZWxlY3Rpb25Tb3J0XCI7XG5cbmxldCByaWdodDogbnVtYmVyID0gMDtcbmxldCBkb3duOiBudW1iZXIgPSAwO1xubGV0IHpvb206IG51bWJlciA9IDE7XG5sZXQgc2Nyb2xsU3BlZWQ6IG51bWJlciA9IDE7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIGV4dGVuZHMgRW5naW5lIHtcbiAgICBzb3J0OiBTdWJtaXRGdW5jdGlvbjtcbiAgICBpbnNlcnQ6IFN1Ym1pdEZ1bmN0aW9uO1xufVxuXG5jb25zdCBTT1JUSU5HX0NMQVNTRVMgPSB7XG4gICAgU2VsZWN0aW9uU29ydDogU2VsZWN0aW9uU29ydCxcbiAgICBJbnNlcnRpb25Tb3J0OiBJbnNlcnRpb25Tb3J0LFxuICAgIE1lcmdlU29ydDogTWVyZ2VTb3J0LFxuICAgIFF1aWNrU29ydDogUXVpY2tTb3J0LFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgUmVjb3JkT2ZFbmdpbmVzPFNvcnRlcj47XG5cbmNvbnN0IHsgZW5naW5lOiBTb3J0RW5naW5lLCBpc0Jhc2VFbmdpbmUgfSA9IGluaXRpYWxpc2VFbmdpbmU8U29ydGVyPihcbiAgICBcIiNzb3J0aW5nQ29udGFpbmVyXCIsXG4gICAgU09SVElOR19DTEFTU0VTXG4pO1xuXG5pZiAoIWlzQmFzZUVuZ2luZSkge1xuICAgIFNvcnRFbmdpbmUuYWxnb3JpdGhtQ29udHJvbHMgPSBuZXcgU29ydGluZ0FsZ29yaXRobUNvbnRyb2xzKFxuICAgICAgICBTb3J0RW5naW5lLmNvbnRhaW5lcixcbiAgICAgICAgU29ydEVuZ2luZVxuICAgICk7XG59XG5cbmNvbnN0IHpvb21JbkJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3IoXCIuem9vbUluXCIpO1xuem9vbUluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB6b29tSW4odHJ1ZSwgU29ydEVuZ2luZSkpO1xuXG5jb25zdCB6b29tT3V0QnV0dG9uID0gcXVlcnlTZWxlY3RvcihcIi56b29tT3V0XCIpO1xuem9vbU91dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gem9vbUluKGZhbHNlLCBTb3J0RW5naW5lKSk7XG5cbmNvbnN0IHNjcm9sbFNwZWVkRWxlbWVudCA9IHF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIuc2Nyb2xsU3BlZWRcIik7XG5zY3JvbGxTcGVlZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgc2Nyb2xsU3BlZWQgPSBOdW1iZXIoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5ibHVyKCk7XG59KTtcblxuY29uc3QgbW92ZUxlZnRCdXR0b24gPSBxdWVyeVNlbGVjdG9yKFwiLm1vdmVMZWZ0XCIpO1xubW92ZUxlZnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdvUmlnaHQoZmFsc2UsIFNvcnRFbmdpbmUpKTtcblxuY29uc3QgbW92ZVJpZ2h0QnV0dG9uID0gcXVlcnlTZWxlY3RvcihcIi5tb3ZlUmlnaHRcIik7XG5tb3ZlUmlnaHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdvUmlnaHQodHJ1ZSwgU29ydEVuZ2luZSkpO1xuXG5jb25zdCBtb3ZlVXBCdXR0b24gPSBxdWVyeVNlbGVjdG9yKFwiLm1vdmVVcFwiKTtcbm1vdmVVcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZ29Eb3duKGZhbHNlLCBTb3J0RW5naW5lKSk7XG5cbmNvbnN0IG1vdmVEb3duQnV0dG9uID0gcXVlcnlTZWxlY3RvcihcIi5tb3ZlRG93blwiKTtcbm1vdmVEb3duQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBnb0Rvd24odHJ1ZSwgU29ydEVuZ2luZSkpO1xuXG5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgIGdvRG93bih0cnVlLCBTb3J0RW5naW5lKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgZ29Eb3duKGZhbHNlLCBTb3J0RW5naW5lKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgZ29SaWdodCh0cnVlLCBTb3J0RW5naW5lKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICBnb1JpZ2h0KGZhbHNlLCBTb3J0RW5naW5lKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZ29SaWdodChnb2luZ1JpZ2h0OiBib29sZWFuLCBlbmdpbmU6IEVuZ2luZSkge1xuICAgIGlmIChnb2luZ1JpZ2h0KSB7XG4gICAgICAgIHJpZ2h0ICs9IHNjcm9sbFNwZWVkO1xuICAgIH0gZWxzZSBpZiAocmlnaHQgPiAwKSB7XG4gICAgICAgIHJpZ2h0IC09IHNjcm9sbFNwZWVkO1xuICAgIH1cbiAgICBlbmdpbmUuZHJhd1ZpZXdib3gocmlnaHQsIGRvd24sIHpvb20pO1xufVxuZnVuY3Rpb24gZ29Eb3duKGdvaW5nRG93bjogYm9vbGVhbiwgZW5naW5lOiBFbmdpbmUpIHtcbiAgICBpZiAoZ29pbmdEb3duKSB7XG4gICAgICAgIGRvd24gKz0gc2Nyb2xsU3BlZWQ7XG4gICAgfSBlbHNlIGlmIChkb3duID4gMCkge1xuICAgICAgICBkb3duIC09IHNjcm9sbFNwZWVkO1xuICAgIH1cbiAgICBlbmdpbmUuZHJhd1ZpZXdib3gocmlnaHQsIGRvd24sIHpvb20pO1xufVxuZnVuY3Rpb24gem9vbUluKHpvb21pbmdJbjogYm9vbGVhbiwgZW5naW5lOiBFbmdpbmUpIHtcbiAgICBpZiAoem9vbWluZ0luICYmIHpvb20gPiAwLjIpIHtcbiAgICAgICAgem9vbSAtPSAwLjE7XG4gICAgfSBlbHNlIGlmICh6b29tIDwgMykge1xuICAgICAgICB6b29tICs9IDAuMTtcbiAgICB9XG4gICAgZW5naW5lLmRyYXdWaWV3Ym94KHJpZ2h0LCBkb3duLCB6b29tKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==