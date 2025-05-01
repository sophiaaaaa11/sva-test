let spells;
async function setup(){
    createCanvas(500, 300);
    background(190);
    const harryPotterSpellsEndPoint = 'https://hp-api.onrender.com/api/spells';
    const dataRes = await fetch(harryPotterSpellsEndPoint);
    spells= await dataRes.json();
  

    setupUI();
}

function setupUI() {
    const input = createInput('');
    input.position(20, 20);
    input.input(handleInput);
}

function handleInput(event) {
    const userInput = event.target.value.toLowerCase();
    const matchedSpells = spells.filter(
        spell => spell.name.toLowerCase().includes(userInput));

    matchedSpells.forEach( (s, i) => {
        text(s.name, 20, 20 * i + 50);
    });

}
