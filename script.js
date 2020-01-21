// application typewriter
var speed = 40;
var h1 = document.querySelector('h1');
var textBlock = document.querySelector('#text');
var delay = textBlock.innerHTML.length * speed + speed;
var allTextTyped = true;

// quelques constantes dans le scope global
const textElement = document.getElementById('text');
const optionContainer = document.getElementById('option-buttons');
let state = {};
let span = document.querySelector('#span');

function typeEffect(id, text, speed) {

	allTextTyped = false;

	let element = document.getElementById(id);
	element.innerHTML = "";
	
	var i = 0;
	var timerId = setInterval(function() {

    if (i < text.length) {
	  element.append(text.charAt(i));
      i++;
    } else {
	  console.log('End of sentence !')
	  clearInterval(timerId);
	  allTextTyped = true ;
	  optionContainer.style.visibility = 'visible';
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

	optionContainer.innerHTML = "";

	textNode.options.forEach((option) => {

		if (showOption(option)) {

			const button = document.createElement('button');

			button.innerText = option.text;
			button.classList.add('button');

			button.addEventListener('click', () => {
				if (allTextTyped) {
					selectOption(option);
				}
			})

			optionContainer.appendChild(button);
		}

	});

	optionContainer.style.visibility = 'hidden';

	typeEffect('text', textNode.text, speed);
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

// span.addEventListener('click', () => {
// 	startGame()
// })

// start game
startGame();