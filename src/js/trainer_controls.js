let currentTrainerIndex = 0;

document.getElementById('opposing-team-icons').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const dataId = event.target.dataset.id; 
        const pokemonName = dataId.split(" (")[0];
        const trainer = trainers[currentTrainerIndex];
        for (let i = 0; i < trainer.party.length; i++) {
            if (trainer.party[i].name === pokemonName) {
                const pokemon = trainer.party[i];
                $("#p2 .ability").val(pokemon.ability).change();
                $("#p2 .level").val(pokemon.level).change();
                $("#p2 .item").val(pokemon.item).change();
                $("#p2 .move1 select.move-selector").val(pokemon.moves[0]).change();
                $("#p2 .move2 select.move-selector").val(pokemon.moves[1]).change();
                $("#p2 .move3 select.move-selector").val(pokemon.moves[2]).change();
                $("#p2 .move4 select.move-selector").val(pokemon.moves[3]).change();
                $("#p2 input.set-selector").val(pokemon.name + " (" + trainer.name + ")");
                $("#p2 .select2-chosen").first().text(pokemon.name + " (" + trainer.name + ")");
                document.getElementById('p2mon').src = 
                    'https://raw.githubusercontent.com/May8th1995/sprites/master/' + pokemon.name + '.png';
                calculate();
            }
        }   
    }
});

function renderOpposingTeam() {
    const trainer = trainers[currentTrainerIndex];
    const iconsDiv = document.getElementById('opposing-team-icons');
    iconsDiv.innerHTML = '';

    // Idle sprite
    document.getElementById('p2mon').src = 
        'https://raw.githubusercontent.com/May8th1995/sprites/master/' + trainer.party[0].name + '.png';

    for (let i = 0; i < trainer.party.length; i++) {
        const pokemon = trainer.party[i];
        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/May8th1995/sprites/master/' + pokemon.name + '.png';
        img.className = "right-side";
        img.dataset.id = pokemon.name + " (" + trainer.name + ")";
        img.style.cursor = 'pointer';
        iconsDiv.appendChild(img);
    }
}

document.addEventListener('DOMContentLoaded', renderOpposingTeam);