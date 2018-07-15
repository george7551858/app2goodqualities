document.addEventListener('DOMContentLoaded', function () {

    var stack = window.swing.Stack({
        allowedDirections: [swing.Direction.LEFT, swing.Direction.RIGHT],
        minThrowOutDistance: 300,
        maxThrowOutDistance: 350,
        isThrowOut: function(xOffset, yOffset, element, throwOutConfidence) {
            return throwOutConfidence > 0.3;
        }
    });
    var cards = [];

    var abilities, questions;

    fetch('http://localhost:3000/abilities')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            abilities = json;
            abilities.forEach(function (ability) {
                var progress = document.createElement('progress');
                progress.value = 0;
                progress.max = 10;
                progress.dataset.name = ability.name;
                document.getElementById('score').appendChild(progress); 
            })
        });

    fetch('http://localhost:3000/questions')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            questions = json.reverse();
            questions.forEach(function (question) {
                var card = document.createElement('li');
                card.dataset.location = 'CENTER';
                card.dataset.yes = question.yes;
                card.dataset.no = question.no;
                card.dataset.text = question.text;
                card.dataset.ability = question.ability;
                card.dataset.weight = question.weight;

                if (question.icon) {
                    var icon = document.createElement('img');
                    icon.src = './img/'+question.icon;
                    card.appendChild(icon); 
                }

                document.getElementById('stack').appendChild(card); 
            });

            cards = [].slice.call(document.querySelectorAll('#stack li'));
            cards.forEach(function (targetElement) {
                stack.createCard(targetElement);
                targetElement.classList.add('in-deck');
            });

            setupByLastCard();
        });


    stack.on('dragstart', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been dragstart of the stack to the', e.throwDirection, 'direction.');

        e.target.classList.add('in-drag');
    });

    stack.on('dragmove', _.throttle(function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');
    
        e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);
    }, 200, {
      'leading': true,
      'trailing': false
    }));

    // stack.on('dragmove', function (e) {
    //     console.log(e.target.innerText || e.target.textContent, 'has been dragmove of the stack to the', e.throwDirection, 'direction.');
    
    //     e.target.dataset.direction = getSymbolDescripttion(e.throwDirection);
    // });

    stack.on('dragend', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been dragend of the stack to the', e.throwDirection, 'direction.');

        e.target.classList.remove('in-drag');
        delete e.target.dataset.direction;
    });

    stack.on('throwout', function (e) {
        if (e.target.dataset.location != 'CENTER') {
            return;
        }
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

        e.target.classList.remove('in-deck');

        e.target.dataset.location = getSymbolDescripttion(e.throwDirection);

        if (e.target.dataset.location == 'RIGHT') {
            countTargetAbility(e.target.dataset.ability, 1 * e.target.dataset.weight);
        }
        setupByLastCard();
    });

    stack.on('throwin', function (e) {
        if (e.target.dataset.location == 'CENTER') {
            return;
        }
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');

        e.target.classList.add('in-deck');

        if (e.target.dataset.location == 'RIGHT') {
            countTargetAbility(e.target.dataset.ability, -1 * e.target.dataset.weight);
        }        
        setupByLastCard();

        e.target.dataset.location = 'CENTER';
    });
    

    var getSymbolDescripttion = function (sym) {
        return String(sym).slice(7, -1) || null;
    };

    var getLastCard = function() {
        var cards = document.querySelectorAll('#stack li.in-deck');
        return cards[cards.length-1];
    };

    var setupByLastCard = function() {
        var lastCard = getLastCard();
        document.querySelector('#question p').innerHTML = lastCard ? lastCard.dataset.text : '';
        document.querySelector('#ability').innerHTML = lastCard ? lastCard.dataset.ability : '';
    };

    var countTargetAbility = function(ability, number) {
        var ability = document.querySelector('progress[data-name="'+ ability +'"]');
        ability.value += parseInt(number, 10);
    };
});
