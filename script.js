// application typewriter
var speed = 40;
var h1 = document.querySelector('h1');
var textBlock = document.querySelector('#text');
var delay = textBlock.innerHTML.length * speed + speed;
var allTextTyped = true;
var faster = document.getElementById('faster');
var slower = document.getElementById('slower');

// quelques constantes dans le scope global
const textElement = document.getElementById('text');
const optionContainer = document.getElementById('option-buttons');
let state = {};
const music = new Audio('./assets/julian_winter_loop.mp3');
var player = document.getElementById("player");

// music player
player.addEventListener('click', () => {
	if(music.paused){
	music.play() 
	console.log(music.played);
	} else {
		music.pause()
		console.log('pause')
	}
})


// effet machine à écrire

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
	  clearInterval(timerId);
	  allTextTyped = true ;
	  optionContainer.style.visibility = 'visible';
	}
	
  }, speed);

}

// rapidification machine à écrire
faster.addEventListener('click', () => {
	speed -= 10 ;
})

// lentification machine à écrire
slower.addEventListener('click', () => {
	speed += 10 ;
})


// fonctions

// lancer le jeu (réinitialiser l'état + montrer le 1er textnode)
function startGame() {
	state = {};
	showTextNode('1');
}


// fonction qui va chercher le textnode à afficher, afficher ou non les boutons

function showTextNode(textNodeIndex) {
	const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

	document.getElementById('img-container').style.display = "none";
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

	// Image
	if(textNode.hasOwnProperty("displayImg")){
		document.getElementById('img-container').style.display = "block";
	}

	optionContainer.style.visibility = 'hidden';

	typeEffect('text', textNode.text, speed);
}


// fonction qui montre les options en fonction de l'état
function showOption(option) {
	return option.requiredState == null || option.requiredState(state);
}


// fonction qui permet de restart le jeu, assigner le state + appeler les textnodes
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
		text: `ACT 1`,
		options: [
			{
				text: `***`,
				nextText: '10'
			},
		]
	},
	{	
		id: '10',
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
		text: `When the weather changes, people buy themselves new fancy overcoats. And a growing proportion seem to be oblivious of...`,
		options: [
			{
				text: `...`,
				nextText: '1d1'
			},
		]
	},

	{
		id: '1d1',
		text: `the stitched slit.`,
		options: [
			{
				text: `...`,
				nextText: '1d2a'
			},
			]
	},
	{	id:'1d2a',
		text: `This little thingy.`,
		displayImg : true,
		options: [
			{
				text: `...`,
				nextText: '1d2'
			},
			]
	},
	{
		id: '1d2',
		text: `And the necessity of cutting the thread right before wearing the new coat.`,
		options: [
			{
				text: `...`,
				nextText: '1d3'
			},
			]
	},
	{
		id: '1d3',
		text: `No matter how cheap you are, you know that this little x-shaped stitches keeping together the two sides of the slit on overcoats and jackets are meant to be cut after purchase. Their sole purpose is to keep the slit from being wrinkled between the factory and the store rack.`,
		
		options: [
			{
				text: `...`,
				nextText: '1e'
			},
			]
	},
	{
		id: '1e',
		text: `Keeping them longer than that always ends up the same way: after a few weeks, the forces they put on the fabric by merely walking rip the losely sewn stitches, but not before the coat is irremediably damaged.`,
		options: [
			{
				text: `The sheer thought of it infuriates you`,
				nextText: '1ea'
			},
			{
				text:
				`You repress your anger`,
				nextText: '1ea'
			},
			{
				text:
				`You clench your fists, whitening your knuckles`,
				nextText: '1ea'
			},
			{
				text:
				`You sigh with exasperation`,
				nextText: '1ea'
			}
		]
	},
	{
		id: '1ea',
		text: `And the worst part: at the bottom of the finally free vent remains a little piece of thread that hangs there forever.`,
		options: [
			{
				text: `erf...`,
				nextText: '1f'
			},
			{
				text: `...`,
				nextText: '1f'
			},
			{
				text: `... well...`,
				nextText: '1f'
			},
			{
				text: `I mean...`,
				nextText: '1f'
			},
		]
	},
	{
		id: '1f',
		text: `Thousands of years in the history of humankind, evolution, technical progress, have lead refined tailors to think of stitching together the two sides of the vents on new raincoats and jackets so that they look good in the shop.`,
		options: [
			{
				text: `...`,
				nextText: '1fb'
			},
		]
	},
	{
		id: '1fb',
		text: `These honorable workers believe that the end users would think of cutting these, so that the original purpose of the slit, being able to walk freely, wrapped in a fitting piece of clothing, shall be accomplished.`,
		options: [
			{
				text: `...`,
				nextText: '1fa'
			},
		]
	},

	{
		id: '1fa',
		text: `It should be common knowledge. But everyday in the busy streets of your city, you witness these admirable efforts being trampled.`,
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
				text: `Plan on carrying a tiny pair of scissors with you in case of emergency `,
				nextText: '1h',
				setState: { wantScissors: true }
			},
		]
	},
	{
		id: '1ga',
		text: `Wait, let's be real for a minute, because you feel like killing something does not mean you have to. `,
		options: [
			{
				text: `Mumble something about violence in today's society`,
				nextText: '1gb'
			},
		]
	},
	{
		id: '1gb',
		text: `You do know it won't solve anything, don't you? You need to work on those anger management issues there.`,
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
				text: `...`,
				nextText: 'xx'
			},
		]
	},
	{
		id: '1h',
		text: `As the flow of your inner monologue carries you to scheming a grand plan to better humankind by adding slit-cutting classes into middle school curriculum, you find yourself in front of your favorite park.`,
		options: [
			{
				text: `You take a look at your watch`,
				nextText: '1i'
			},
			
		]
	},
	{
		id: '1i',
		text: `So far, you are right on time for work. Going through the park would make you lose a few minutes.`,
		options: [
			{
				text: `You don't want to risk being late, you resume your walk in the streets immediately`,
				nextText: '1j',
			},
			{
				text: `You could use some nature in your life right now. But you will be ten minutes late`,
				nextText: '1k',
				setState: { isHappy: true }
			},
			{
				text: `Just stand there at the gates for a moment, and inhale some fresh air`,
				nextText: '1l',
				setState: { isHappy: true }
			},
			{
				text: `You actually wanted to be early today. You hurry to work`,
				nextText: '1j'
			}
		]
	},

	{
		id: '1j',
		text: `Twenty minutes later, you sit behind your desk, between two of the most boring people you know.`,
		options: [
			{
				text: `It's just another bleak day at work`,
				nextText: '2'
			},
		]
	},
	{
		id: '1k',
		text: `You arrive a bit late, but no one has noticed. You enjoyed every step of this little walk. You feel surprinsingly at peace with yourself.`,
		options: [
			{
				text: `Today might actually be a good day`,
				nextText: '2'
			},
		]
	},
	{
		id: '1l',
		text: `Just taking a few moments to look at the trees has done you a world of good.`,
		options: [
			{
				text: `You feel ready to work`,
				nextText: '2'
			},
		]
	},
	{
		id: '2',
		text: `ACT 2`,
		options: [
			{
				text: `***`,
				nextText: '2a'
			},
			
		]
	},
	{
		id: '2a',
		text: `"What a day!", you think, as you turn off your computer.`,
		options: [
			{
				text: `You take a moment to reflect on everything that happened during last few hours at the office`,
				nextText: '2b'
			},
			{
				text: `You take some time to tidy your desk before the weekdend`,
				requiredState: (currentState) => currentState.wantScissors === true,
				nextText: '2d'
			},
			{
				text: `You sit back in your chair, gathering your forces before going home`,
				nextText: '2b'
			},
		]
	},
	{
		id: '2b',
		text: `Thoughts rush through your mind.`,
		options: [
			{
				text: `The hour-long meeting with the future clients...`,
				nextText: '2c'
			},
			{
				text: `The outrageous uncut vents you passed on your way to work...`,
				nextText: '2d'
			},
			{
				text: `The terrible lasagna they served at lunch...`,
				nextText: '2c'
			},
			{
				text: `This desk is so messy...`,
				nextText: '2d'
			},
		]
	},
	{
		id: '2c',
		text: `You feel really tired.`,
		options: [
			{
				text: `You could keep brooding for hours`,
				requiredState: (currentState) => currentState.isHappy === false,
				nextText: '2e'
			},
			{
				text: `Like really, really tired`,
				requiredState: (currentState) => currentState.isHappy === false,
				nextText: '2e'
			},
			{
				text: `You could keep brooding for hours`,
				requiredState: (currentState) => currentState.isHappy === false,
				nextText: '2e'
			},
			{
				text: `What's the point of all this?`,
				requiredState: (currentState) => currentState.isHappy === false,
				nextText: '2e'
			}, 
			{
				text: `Time to wrap this up!`,
				requiredState: (currentState) => currentState.isHappy === true,
				nextText: '2e'
			}, 
			{
				text: `Through the window, you witness the sky blushing because of the setting sun`,
				requiredState: (currentState) => currentState.isHappy === true,
				nextText: '2e'
			}, 
			{
				text: `You're so glad it's friday`,
				requiredState: (currentState) => currentState.isHappy === true,
				nextText: '2e'
			}, 
		]
	},
		{
		id: '2d',
		text: `Your eyes land on the pen holder. Inside, a pair of scissors.`,
		options: [
			{
				text: `Hey, it could come in handy. You pocket it`,
				nextText: '2e',
				setState: { hasScissors: true },
			},
			{
				text: `You are a grown up, you don't need to carry scissors around with you`,
				nextText: '2e',
				setState: {wantScissors: false},
			}
		]
	},
	{
		id: '2e',
		text: `On your way out of the office, you notice Taylor, chatting with the receptionist.`,
		options: [
			{
				text: `...`,
				setState: {hasScissors: true, wantScissors: false} ,
				nextText: '2f'
			},
		]
	},
		{
		id: '2f',
		text: `Taylor wears a long dark slick black woolen coat.`,
		options: [
			{
				text: `You start thinking of something`,
				nextText: '2g'
			},
		]
	},
		

{
		id: '2g',
		text: `You take some time to think`,
		options: [
			{
				text: `Silently hate Taylor`,
				nextText: 'z2'
			},
			{
				text:
				`Casually greet and tell Taylor about their stitched vent issue.`,
				requiredState: (currentState) => currentState.isHappy,
				nextText: 'z3'
			},
				{
				text:
				`Sneak behind Taylor and discretly cut the thread.`,
				requiredState: (currentState) => currentState.hasScissors,
				nextText: 'z4'
			},
				{
				text:
				`Awkwardly tell Taylor about their slit.`,
				nextText: 'z5'
			},
		]
	},

{
		id: 'z2',
		text: `You pass Taylor and the receptionist, giving them a slient nod`,
		options: [
			{
				text: `You disappear in the night`,
				nextText: '-1'
			},
		]
	},

	{
		id: 'z3',
		text: `"Oh thank you, I totally forgot about it!", answers Taylor, before asking the receptionist for a pair of scissors.
		Taylor beams at you. `,
		options: [
			{
				text: `You have made a friend for life.`,
				nextText: '-1'
			},
		]
	},
	{
		id: 'z4',
		text: `You crouch behind Taylor and the desk, scissors in hand. In a swift and silent motion, you cut the thread.`,
		options: [
			{
				text: `You feel great`,
				nextText: '-1'
			},
			{
				text: `Your life now has a purpose`,
				nextText: '-1'
			},
			{
				text: `From now on, you will refer to yourself as "Super Slit Cutter"`,
				nextText: '-1'
			},
		]
	},
	{
		id: 'z5',
		text: `Taylor and the receptionist look at you quizzically as you try explaining vents on coats and thread and fabric.
		But after a pause, Taylor laughs and thank you.`,
		options: [
			{
				text: `Today, you've made the world a slightly better place`,
				nextText: '-1'
			},
		]
	},

];

// start game
startGame();