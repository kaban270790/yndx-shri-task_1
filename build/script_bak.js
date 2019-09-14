/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/blocks/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/e-accordion/elements/short.js":
/*!**************************************************!*\
  !*** ./src/blocks/e-accordion/elements/short.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n    if (!document || !document.body) {\n        return;\n    }\n    document.body.addEventListener('click', function (e) {\n        let {target} = e;\n\n        while (target !== this) {\n            if (target.classList.contains('e-accordion__short')) {\n                let parent = target.closest('.e-accordion');\n                parent.querySelectorAll('.e-accordion__more').forEach((node) => {\n                    node.classList.toggle('history__hide');\n                    node.classList.toggle('history__show');\n                });\n                break;\n            }\n            target = target.parentNode;\n        }\n    })\n})();\n\n\n//# sourceURL=webpack:///./src/blocks/e-accordion/elements/short.js?");

/***/ }),

/***/ "./src/blocks/onoffswitch/onoffswitch.js":
/*!***********************************************!*\
  !*** ./src/blocks/onoffswitch/onoffswitch.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n    if (!document || !document.body) {\n        return;\n    }\n    const themeClasses = [\n        'theme_color_project-default',\n        'theme_color_project-brand',\n        'theme_color_project-inverse',\n        'theme_color_project-warning',\n        'theme_color_megafon-brand',\n    ];\n\n    document.body.addEventListener('click', function (e) {\n        let {target} = e;\n\n        while (target !== this) {\n            if (target.classList.contains('onoffswitch')) {\n                let classList = target.querySelector('.onoffswitch__button').classList;\n                classList.toggle('onoffswitch__button_status_on');\n                classList.toggle('onoffswitch__button_status_off');\n\n                let theme = target.closest('.theme');\n                toggleTheme(theme);\n\n                break;\n            }\n            target = target.parentNode;\n        }\n    });\n\n    /**\n     * @param {Element} theme\n     */\n    function toggleTheme(theme) {\n        const currentThemeIndex = getCurrentIndexTheme(theme);\n        theme.classList.remove(themeClasses[currentThemeIndex]);\n        theme.classList.add(getNextTheme(currentThemeIndex));\n    }\n\n    /**\n     * @param {Element} theme\n     * @return {number}\n     */\n    let getCurrentIndexTheme = function (theme) {\n        let className = '';\n        theme.classList.forEach((item) => {\n            if (item.match(/^theme_color_[a-z0-9\\-]{1,}$/i)) {\n                className = item;\n            }\n        });\n        return themeClasses.indexOf(className);\n    };\n    /**\n     * @param {number} currentIndex\n     * @return {string}\n     */\n    let getNextTheme = function (currentIndex) {\n        currentIndex++;\n        if (currentIndex >= themeClasses.length) {\n            currentIndex = 0;\n        }\n        return themeClasses[currentIndex];\n    }\n})();\n\n\n//# sourceURL=webpack:///./src/blocks/onoffswitch/onoffswitch.js?");

/***/ }),

/***/ "./src/blocks/script.js":
/*!******************************!*\
  !*** ./src/blocks/script.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./e-accordion/elements/short.js */ \"./src/blocks/e-accordion/elements/short.js\");\n__webpack_require__(/*! ./onoffswitch/onoffswitch.js */ \"./src/blocks/onoffswitch/onoffswitch.js\");\n\n\n//# sourceURL=webpack:///./src/blocks/script.js?");

/***/ })

/******/ });