// quelques constantes dans le scope global
const textElement = document.getElementById('text');
const optionContainer = document.getElementById('option-buttons');
let state = {};

// fonctions
function startGame() {
	state = {};
	showTextNode('1');
}

function showTextNode(textNodeIndex) {
	const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
	console.log('je suis dans la fonction showTextNode');
	textElement.innerText = textNode.text;
	while (optionContainer.firstChild) {
		optionContainer.removeChild(optionContainer.firstChild);
	}

	textNode.options.forEach((option) => {
		if (showOption(option)) {
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('button');
			button.addEventListener('click', () => selectOption(option));
			optionContainer.appendChild(button);
		}
	});
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
				state: { isSleepy: true },
				nextText: '1.1'
			}
		]
	},
	{
		id: '1.1',
		text: `You take some time to process this piece of information.`,
		options: [
			{
				text: 'Grunt',
				state: { isSleepy: true },
				nextText: '1.2'
			},
			{
				text: 'Yawn',
				state: { isSleepy: true },
				nextText: '1.2'
			},
			{
				text: 'Hum a cheerful song for yourself',
				state: { isSleepy: false, isHappy: true },
				nextText: '1.3'
			}
		]
	},
	{
		id: '1.2',
		text: 'Your body lies between a matress and some sheets. Your head rests on a soft but somewhat smelly pillow.',
		options: [
			{
				text: 'It looks like you are waking up.',
				nextText: '1.4'
			},
			{
				text:
					"You have had such a good night. You don't feel really rested, but slept soundly. That's a good reason to rejoice.",
				requiredState: (currentState) => currentState.isHappy === true
			}
		]
	},
	{
		id: '1.3',
		text: 'you made it'
	}
];

// exécution du jeu
startGame();
