const dialogue = document.querySelector('#dialogue');
const dialogueSpeaker = document.querySelector('#dialogue-speaker');
const dialogueText = document.querySelector('#dialogue-text');
const questTitle = document.querySelector('#quest-title');
const questCopy = document.querySelector('#quest-copy');
const questStep = document.querySelector('#quest-step');
const inventory = document.querySelector('#inventory');
const status = document.querySelector('#status');
const world = document.querySelector('#world');
const player = document.querySelector('.player');
const keys = new Set();
const items = { ginger: false, greens: false };
const sceneData = {
  home: { name: 'Rumah Gadang', description: 'Family home and story center', transform: 'translate(-50%,-50%) rotateX(58deg) rotateZ(0deg) scale(.87)', spawn: [335, 300] },
  market: { name: 'Village Market', description: 'Trade, rumors, and community', transform: 'translate(-62%,-47%) rotateX(58deg) rotateZ(-3deg) scale(.87)', spawn: [540, 220] },
  garden: { name: 'Rice Garden', description: 'Work, rhythm, and cooperation', transform: 'translate(-37%,-55%) rotateX(58deg) rotateZ(3deg) scale(.87)', spawn: [120, 335] },
  gathering: { name: "Elders' Veranda", description: 'A story shared by many hands', transform: 'translate(-50%,-67%) rotateX(58deg) rotateZ(0deg) scale(.87)', spawn: [350, 375] }
};
const people = {
  Grandmother: { element: document.querySelector('.grandmother'), scene: 'home', position: [174, 185], talk: grandmotherTalk },
  Mother: { element: document.querySelector('.mother'), scene: 'home', position: [315, 292], talk: motherTalk },
  'Cousin Rani': { element: document.querySelector('.cousin'), scene: 'market', position: [536, 225], talk: cousinTalk },
  'Pak Danu': { element: document.querySelector('.trader'), scene: 'market', position: [550, 118], talk: traderTalk }
};
let quest = 0;
let currentScene = 'home';
let dialogueQueue = [];
let dialogueOpen = false;
let playerPosition = { x: 335, y: 300 };

function setScene(name) {
  if (name === 'gathering' && quest < 3) return;
  const scene = sceneData[name];
  currentScene = name;
  world.style.transform = scene.transform;
  playerPosition = { x: scene.spawn[0], y: scene.spawn[1] };
  placePlayer();
  document.querySelectorAll('.scene-button').forEach(button => button.classList.toggle('active', button.dataset.scene === name));
  document.querySelector('#scene-name').textContent = scene.name;
  document.querySelector('#scene-description').textContent = scene.description;
  status.textContent = `A new view opens: ${scene.name}.`;
}
function placePlayer() { player.style.left = `${playerPosition.x}px`; player.style.top = `${playerPosition.y}px`; }
function distance(a, b) { return Math.hypot(a.x - b[0], a.y - b[1]); }
function nearestPerson() { return Object.values(people).find(person => person.scene === currentScene && distance(playerPosition, person.position) < 70); }
function nearbyItem() { if (quest !== 1) return null; if (!items.ginger && currentScene === 'market' && distance(playerPosition, [555, 187]) < 75) return 'ginger'; if (!items.greens && currentScene === 'garden' && distance(playerPosition, [105, 334]) < 75) return 'greens'; return null; }
function move(delta) { if (dialogueOpen) return; let x = 0; let y = 0; if (keys.has('ArrowLeft') || keys.has('a')) x -= 1; if (keys.has('ArrowRight') || keys.has('d')) x += 1; if (keys.has('ArrowUp') || keys.has('w')) y -= 1; if (keys.has('ArrowDown') || keys.has('s')) y += 1; if (!x && !y) return; const length = Math.hypot(x, y); playerPosition.x = Math.max(18, Math.min(690, playerPosition.x + (x / length) * delta * 150)); playerPosition.y = Math.max(20, Math.min(490, playerPosition.y + (y / length) * delta * 150)); placePlayer(); }
function showDialogue(speaker, lines) { dialogueQueue = Array.isArray(lines) ? lines : [lines]; dialogueOpen = true; dialogue.hidden = false; dialogueSpeaker.textContent = speaker; dialogueText.textContent = dialogueQueue.shift(); }
function advanceDialogue() { if (dialogueQueue.length) { dialogueText.textContent = dialogueQueue.shift(); return; } dialogue.hidden = true; dialogueOpen = false; updateQuest(); }
function interact() { if (dialogueOpen) return advanceDialogue(); const item = nearbyItem(); const person = nearestPerson(); if (item) { items[item] = true; document.querySelector(`[data-item="${item}"]`).classList.add('collected'); updateQuest(); showDialogue('Sari', item === 'ginger' ? 'I found the ginger. Its sharp scent makes me think of home.' : 'These greens are fresh from the garden. I should take them to Mother.'); return; } if (person) { person.talk(); return; } status.textContent = 'Move closer to someone or an ingredient.'; }
function updateQuest() { const count = Number(items.ginger) + Number(items.greens); if (quest === 0) { questTitle.textContent = 'A table for everyone'; questCopy.textContent = 'Speak with Grandmother in the rumah gadang.'; questStep.textContent = '1 / 3'; } else if (quest === 1) { questTitle.textContent = 'Gather the meal'; questCopy.textContent = `${count} of 2 ingredients collected. Visit the market and garden scenes.`; questStep.textContent = '2 / 3'; } else if (quest === 2) { questTitle.textContent = 'A story shared'; questCopy.textContent = 'Return to Grandmother and listen to what she remembers.'; questStep.textContent = '3 / 3'; } else { questTitle.textContent = 'The gathering begins'; questCopy.textContent = "The village story is ready. Visit the Elders' Veranda scene."; questStep.textContent = 'Complete'; document.querySelector('[data-scene="gathering"]').disabled = false; } inventory.innerHTML = count ? [items.ginger ? '<span class="item">Ginger</span>' : '', items.greens ? '<span class="item">Greens</span>' : ''].filter(Boolean).join(' · ') : '<span class="empty-slot">Nothing yet</span>'; }
function grandmotherTalk() { if (quest === 0) { quest = 1; showDialogue('Grandmother', ['Sari, will you help me prepare supper?', 'Find ginger with Pak Danu at the market, and gather greens from our garden.', 'When we sit down, there will be a place for everyone. That is how a home stays strong.']); } else if (quest === 1 && items.ginger && items.greens) { quest = 2; showDialogue('Grandmother', ['You brought everything we need. Thank you, child.', 'Come sit beside me. There is a story about this house that belongs to you, too.']); } else if (quest === 2) { quest = 3; showDialogue('Grandmother', ['In our family, the house and its care pass through the women of the line.', 'But belonging is made by everyone: those who cook, teach, build, listen, and make room.', 'The village is not held up by one person. It is held by many hands.']); } else showDialogue('Grandmother', 'The best stories change a little each time they are shared.'); }
function motherTalk() { showDialogue('Mother', quest < 1 ? 'Grandmother is in the rumah gadang. She has been waiting for you.' : 'The work is lighter when we do it together.'); }
function cousinTalk() { showDialogue('Cousin Rani', 'The garden path is muddy today, but the greens are worth it.'); }
function traderTalk() { showDialogue('Pak Danu', quest === 1 && !items.ginger ? 'The ginger is just behind my stall. Take what you need for your family.' : 'A good market is a conversation as much as a place to trade.'); }

window.addEventListener('keydown', event => { keys.add(event.key); if (event.key.toLowerCase() === 'e' || event.key === 'Enter') { event.preventDefault(); interact(); } });
window.addEventListener('keyup', event => keys.delete(event.key));
document.querySelector('#dialogue-next').addEventListener('click', advanceDialogue);
document.querySelectorAll('.scene-button').forEach(button => button.addEventListener('click', () => setScene(button.dataset.scene)));
document.querySelectorAll('[data-key]').forEach(button => { button.addEventListener('pointerdown', () => keys.add(button.dataset.key)); button.addEventListener('pointerup', () => keys.delete(button.dataset.key)); button.addEventListener('pointerleave', () => keys.delete(button.dataset.key)); });
setInterval(() => { move(.1); if (!dialogueOpen) { status.textContent = nearbyItem() ? 'Press E to collect this ingredient.' : nearestPerson() ? 'Press E to speak.' : 'The afternoon light rests on the village path.'; } }, 100);
setScene('home'); updateQuest();
