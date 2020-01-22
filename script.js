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
		text: `The morning chill catches you by surprise.`,
		options: [
			{
				text: `...`,
				nextText: '1a'
			},
		]
	},
{
		id: '1a',
		text: `Autumn is slowly turning into winter, and you wish you had a better coat to keep you warm on your way to work.`,
		options: [
			{
				text: `The streets are busy today`,
				nextText: '1b'
			},
			{
				text: `People are wrapped in layers of dark fabric`,
				nextText: '1b'
			},
			{
				text: `The air feels like an icy blade on your cheeks`,
				nextText: '1b'
			},
		]
	},
	{
		id: '1b',
		text: `In the crowd, something catches your attention.`,
		options: [
			{
				text: `...`,
				nextText: '1c'
			},
			
		]
	},
{
		id: '1c',
		text: `Every year, twice a year actually, you have to bear the same sight.`,
		options: [
			{
				text: `You cannot take it anymore`,
				nextText: '1d'
			},
			{
				text: `You know it is silly to feel offended by that, but you just can't help it.`,
				nextText: '1d'
			},
			{
				text: `As far as you remember, you have always felt the same way about this matter.`,
				nextText: '1d'
			}
		]
	},
	{
		id: '1d',
		text: `When the weather changes, people buy themselves new fancy overcoats. And a growing proportion seem to be oblivious of the stitched slit.`,
		options: [
			{
				text: `...`,
				nextText: '1e'
			},
		]
	},
	{
		id: '1e',
		text: `No matter how cheap you are, you know that this little x-shaped stitches keeping together the two sides of the slit on overcoats are meant to be cut after purchase. Their sole purpose is to keep the slit from being wrinkled between the factory and the store rack. I mean, who raised these people? They walk briskly, unaware of the atrocious sight they make everyone endure.`,
		options: [
			{
				text: `The sheer thought of it infuriates you`,
				nextText: '1f'
			},
			{
				text:
				`You repress your anger`,
				nextText: '1f'
			},
			{
				text:
				`You clench your fists, whitening your knuckles`,
				nextText: '1f'
			},
			{
				text:
				`You sigh with exasperation`,
				nextText: '1f'
			}
		]
	},
	{
		id: '1f',
		text: `Thousands of years in the history of humankind, evolution, technical progress, have lead refined tailors to think of stitching together the slits of new raincoats and jackets so that they look good in the shop. These honorable persons believe that the end users would think of cutting these, so that the original purpose of the slit, being able to walk freely, shall be accomplished. It should be common knowledge. You actually read online a <a href = "https://www.esquire.com/style/mens-fashion/a26098955/tacking-stitch-coat-jacket-vent-men/" target = "_blank">great piece of journalism</a> about this particular topic. But eveyday in the busy streets of your city, you witness these admirable efforts being trampled.`,
		options: [
			{
				text: `Ignored`,
				nextText: '1g'
			},
			{
				text: `Neglected`,
				nextText: '1g'
			},
			{
				text: `Disregarded`,
				nextText: '1g'
			}
		]
	},
	{
		id: '1g',
		text: `It makes you want to kill something.`,
		options: [
			{
				text: `Kill something`,
				nextText: '1ga'
			},
			{
				text: `Dismiss the thought`,
				nextText: '1h'
			},
			{
				text: `Plan on carrying a tiny pair of scissors with you in case of emergency. `,
				nextText: '1h',
				setState: { wantScissors: true }
			},
		]
	},
	{
		id: '1ga',
		text: `Well, you might feel like killing something, but it does not mean you have to. You need to work on those anger management issues there.`,
		options: [
			{
				text: `Send a text to your therapist`,
				nextText: '1h'
			},
			{
				text: `Take a deep breath`,
				nextText: '1h'
			},
			{
				text: `Mumble somthing about `,
				nextText: '1h'
			},
			{
				text:
				`xxx.`,
				requiredState: (currentState) => currentState.XXX === true && currentState.hasScissors === true,
				nextText: 'XXXXX'
			}
		]
	},

];

// start game
startGame();