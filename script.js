
// TODO setTimeout(function(){  }, delay);


// application typewriter
var speed = 50;
var h1 = document.querySelector('h1');
var textBlock = document.querySelector('#text');
var delay = textBlock.innerHTML.length * speed + speed;
var allTextTyped = false;

// quelques constantes dans le scope global
const textElement = document.getElementById('text');
const optionContainer = document.getElementById('option-buttons');
let state = {};


function typeEffect(element, speed) {
	var text = element.innerHTML;
	element.innerHTML = "";
	
	var i = 0;
	var timer = setInterval(function() {
	

    if (i < text.length) {
	  element.append(text.charAt(i));
	  allTextTyped = false ;
      i++;
    } else {
	  clearInterval(timer);
	  allTextTyped = true ;
    }
  }, speed);
  
}

// fonction pour n'afficher les boutons qu'après l'apparition complète du texte

// fonctions
function startGame() {
	state = {};
	showTextNode('1');
}

function showTextNode(textNodeIndex) {
	const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

	if (allTextTyped == false) {
		textElement.innerHTML = "";
	}

	textElement.innerHTML = textNode.text;

	while (optionContainer.firstChild) {
		optionContainer.removeChild(optionContainer.firstChild);
	}

	textNode.options.forEach((option) => {
		if (showOption(option)) {
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('button');

			button.addEventListener('click', () => {
				selectOption(option);
			})

			optionContainer.appendChild(button);
		}
	});

	typeEffect(textBlock, speed);
}

function showOption(option) {
	return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
	const nextTextNodeId = option.nextText;
	if (nextTextNodeId <= 0) {
		return startGame();
	}
	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

// LE TEXTE
const textNodes = [
	{
		id: '1',
		text: `A pale light creeps through the shaders of your bedroom.`,
		options: [
			{
				text: `...`,
				nextText: '1.1b'
			},
			{
				text: '...mmmpf',
				state: { isSleepy: true },
				nextText: '1.1c'
			}
		]
	},
	{
		id: '1.1b',
		text: `Your body lies between a matress and some sheets.`,
		options: [
			{
				text: '...',
				state: { isSleepy: true },
				nextText: '1.1c'
			}
		]
	},
	{
		id: '1.1c',
		text: 'Your head rests on a soft but somewhat smelly pillow.',
		options: [
			{
				text: '...',
				state: { isSleepy: true },
				nextText: '1.1d'
			},
			{
				text: 'Grunt',
				state: {isGrumpy: true},
				nextText: '1.1d'
			},
			{
				text: 'Yawn',
				state: {isSleepy: true},
				nextText: '1.1d'
			},
			{
				text: 'Hum to yourself',
				state: {isHappy: true},
				nextText: '1.1de'
			},
			
		]
	},
	{
		id: '1.1de',
		text: `You remember that <a href = \"https://youtu.be/ruAi4VBoBSM\" target="_blank">silly lipdub</a> thing on a Fatboy slim track and hum to yourself.`,
		options: {
				text:
				"You remember that <a href = \"https://www.youtube.com/watch?time_continue=44&v=ruAi4VBoBSM\">silly lipdub</a> thing on a Fatboy slim track and hum to yourself.",
				requiredState: (currentState) => currentState.isHappy === true
		}
	}
];

// type affect to header
typeEffect(h1, speed);

// start game
startGame();