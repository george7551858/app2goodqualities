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

eval("document.addEventListener('DOMContentLoaded', function () {\n\n    var stack = window.swing.Stack({\n        allowedDirections: [swing.Direction.LEFT, swing.Direction.RIGHT],\n        minThrowOutDistance: 300,\n        maxThrowOutDistance: 350,\n        isThrowOut: function(xOffset, yOffset, element, throwOutConfidence) {\n            return throwOutConfidence > 0.3;\n        }\n    });\n    var cards = [];\n\n    var abilities, questions;\n\n    fetch('http://localhost:3000/abilities')\n        .then(function(response) {\n            return response.json();\n        })\n        .then(function(json) {\n            abilities = json;\n            abilities.forEach(function (ability) {\n                var progress = document.createElement('progress');\n                progress.value = 0;\n                progress.max = 10;\n                progress.dataset.name = ability.name;\n                document.getElementById('score').appendChild(progress); \n            })\n        });\n\n    fetch('http://localhost:3000/questions')\n        .then(function(response) {\n            return response.json();\n        })\n        .then(function(json) {\n            questions = json.reverse();\n            questions.forEach(function (question) {\n                var card = document.createElement('li');\n                card.dataset.location = 'CENTER';\n                card.dataset.yes = question.yes;\n                card.dataset.no = question.no;\n                card.dataset.text = question.text;\n                card.dataset.ability = question.ability;\n                card.dataset.weight = question.weight;\n\n                if (question.icon) {\n                    var icon = document.createElement('img');\n                    icon.src = './img/'+question.icon;\n                    card.appendChild(icon); \n                }\n\n                document.getElementById('stack').appendChild(card); \n            });\n\n            cards = [].slice.call(document.querySelectorAll('#stack li'));\n            cards.forEach(function (targetElement) {\n                stack.createCard(targetElement);\n                targetElement.classList.add('in-deck');\n            });\n\n            setupByLastCard();\n        });\n\n\n    stack.on('dragstart', function (e) {\n        console.log(e.target.innerText || e.target.textContent, 'has been dragstart of the stack to the', e.throwDirection, 'direction.');\n\n        e.target.classList.add('in-drag');\n    });\n\n    stack.on('dragmove', _.throttle(function (e) {\n        console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');\n    \n        e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);\n    }, 200, {\n      'leading': true,\n      'trailing': false\n    }));\n\n    // stack.on('dragmove', function (e) {\n    //     console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');\n    \n    //     e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);\n    // });\n\n    stack.on('dragend', function (e) {\n        console.log(e.target.innerText || e.target.textContent, 'has been dragend of the stack to the', e.throwDirection, 'direction.');\n\n        e.target.classList.remove('in-drag');\n        delete e.target.dataset.direction;\n    });\n\n    stack.on('throwout', function (e) {\n        if (e.target.dataset.location != 'CENTER') {\n            return;\n        }\n        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');\n\n        e.target.classList.remove('in-deck');\n\n        e.target.dataset.location = getSymbolDescripttion(e.throwDirection);\n\n        if (e.target.dataset.location == 'RIGHT') {\n            countTargetAbility(e.target.dataset.ability, 1 * e.target.dataset.weight);\n        }\n        setupByLastCard();\n    });\n\n    stack.on('throwin', function (e) {\n        if (e.target.dataset.location == 'CENTER') {\n            return;\n        }\n        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');\n\n        e.target.classList.add('in-deck');\n\n        if (e.target.dataset.location == 'RIGHT') {\n            countTargetAbility(e.target.dataset.ability, -1 * e.target.dataset.weight);\n        }        \n        setupByLastCard();\n\n        e.target.dataset.location = 'CENTER';\n    });\n    \n\n    var getSymbolDescripttion = function (sym) {\n        return String(sym).slice(7, -1) || null;\n    };\n\n    var getLastCard = function() {\n        var cards = document.querySelectorAll('#stack li.in-deck');\n        return cards[cards.length-1];\n    };\n\n    var setupByLastCard = function() {\n        var lastCard = getLastCard();\n        document.querySelector('#question p').innerHTML = lastCard ? lastCard.dataset.text : '';\n        document.querySelector('#ability').innerHTML = lastCard ? lastCard.dataset.ability : '';\n    };\n\n    var countTargetAbility = function(ability, number) {\n        var ability = document.querySelector('progress[data-name=\"'+ ability +'\"]');\n        ability.value += parseInt(number, 10);\n    };\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });