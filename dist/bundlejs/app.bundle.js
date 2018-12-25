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
/******/ 	__webpack_require__.p = "/bundlejs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener('DOMContentLoaded', function () {\r\n\r\n    var stack = window.swing.Stack({\r\n        allowedDirections: [swing.Direction.LEFT, swing.Direction.RIGHT],\r\n        minThrowOutDistance: 300,\r\n        maxThrowOutDistance: 350,\r\n        isThrowOut: function (xOffset, yOffset, element, throwOutConfidence) {\r\n            return throwOutConfidence > 0.3;\r\n        }\r\n    });\r\n    var cards = [];\r\n\r\n    var abilities, questions;\r\n\r\n    fetch('https://my-json-server.typicode.com/evilvioletwu/app2goodqualities/abilities')\r\n        .then(function (response) {\r\n            return response.json();\r\n        })\r\n        .then(function (json) {\r\n            abilities = json;\r\n            var fragment = document.createDocumentFragment();\r\n            abilities.forEach(function (ability) {\r\n                var progress = document.createElement('progress');\r\n                progress.value = 0;\r\n                progress.max = 10;\r\n                progress.dataset.name = ability.name;\r\n                var label = document.createElement('div');\r\n                label.innerText = ability.name;\r\n                label.appendChild(progress);\r\n                fragment.appendChild(label);\r\n            });\r\n            document.getElementById('score').appendChild(fragment);\r\n        });\r\n\r\n    fetch('https://my-json-server.typicode.com/evilvioletwu/app2goodqualities/questions')\r\n        .then(function (response) {\r\n            return response.json();\r\n        })\r\n        .then(function (json) {\r\n            questions = json.reverse();\r\n            questions.forEach(function (question) {\r\n                var card = document.createElement('li');\r\n                card.dataset.location = 'CENTER';\r\n                card.dataset.yes = question.yes;\r\n                card.dataset.no = question.no;\r\n                card.dataset.text = question.text;\r\n                card.dataset.ability = question.ability;\r\n                card.dataset.weight = question.weight;\r\n\r\n                if (question.icon) {\r\n                    var icon = document.createElement('img');\r\n                    icon.src = './img/' + question.icon;\r\n                    card.appendChild(icon);\r\n                }\r\n\r\n                document.getElementById('stack').appendChild(card);\r\n            });\r\n\r\n            cards = [].slice.call(document.querySelectorAll('#stack li'));\r\n            cards.forEach(function (targetElement) {\r\n                stack.createCard(targetElement);\r\n                targetElement.classList.add('in-deck');\r\n            });\r\n\r\n            setupByLastCard();\r\n        });\r\n\r\n\r\n    stack.on('dragstart', function (e) {\r\n        console.log(e.target.innerText || e.target.textContent, 'has been dragstart of the stack to the', e.throwDirection, 'direction.');\r\n\r\n        e.target.classList.add('in-drag');\r\n    });\r\n\r\n    stack.on('dragmove', _.throttle(function (e) {\r\n        console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');\r\n\r\n        e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);\r\n    }, 200, {\r\n        'leading': true,\r\n        'trailing': false\r\n    }));\r\n\r\n    // stack.on('dragmove', function (e) {\r\n    //     console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');\r\n\r\n    //     e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);\r\n    // });\r\n\r\n    stack.on('dragend', function (e) {\r\n        console.log(e.target.innerText || e.target.textContent, 'has been dragend of the stack to the', e.throwDirection, 'direction.');\r\n\r\n        e.target.classList.remove('in-drag');\r\n        delete e.target.dataset.direction;\r\n    });\r\n\r\n    stack.on('throwout', function (e) {\r\n        if (e.target.dataset.location != 'CENTER') {\r\n            return;\r\n        }\r\n        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');\r\n\r\n        e.target.classList.remove('in-deck');\r\n\r\n        e.target.dataset.location = getSymbolDescripttion(e.throwDirection);\r\n\r\n        if (e.target.dataset.location == 'RIGHT') {\r\n            countTargetAbility(e.target.dataset.ability, 1 * e.target.dataset.weight);\r\n        }\r\n        setupByLastCard();\r\n    });\r\n\r\n    stack.on('throwin', function (e) {\r\n        if (e.target.dataset.location == 'CENTER') {\r\n            return;\r\n        }\r\n        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');\r\n\r\n        e.target.classList.add('in-deck');\r\n\r\n        if (e.target.dataset.location == 'RIGHT') {\r\n            countTargetAbility(e.target.dataset.ability, -1 * e.target.dataset.weight);\r\n        }\r\n        setupByLastCard();\r\n\r\n        e.target.dataset.location = 'CENTER';\r\n    });\r\n\r\n\r\n    var getSymbolDescripttion = function (sym) {\r\n        return String(sym).slice(7, -1) || null;\r\n    };\r\n\r\n    var getLastCard = function () {\r\n        var cards = document.querySelectorAll('#stack li.in-deck');\r\n        return cards[cards.length - 1];\r\n    };\r\n\r\n    var setupByLastCard = function () {\r\n        var lastCard = getLastCard();\r\n        document.querySelector('#question p').innerHTML = lastCard ? lastCard.dataset.text : '';\r\n        document.querySelector('#ability').innerHTML = lastCard ? lastCard.dataset.ability : '';\r\n    };\r\n\r\n    var countTargetAbility = function (ability, number) {\r\n        var progress = document.querySelector('progress[data-name=\"' + ability + '\"]');\r\n        progress.value += parseInt(number, 10);\r\n    };\r\n});\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });