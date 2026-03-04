let currentTrainerIndex = 0;

document.getElementById('opposing-team-icons').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const dataId = event.target.dataset.id; 
        const pokemonName = dataId.split(" (")[0];
        const trainer = trainers[currentTrainerIndex];
        for (let i = 0; i < trainer.party.length; i++) {
            if (trainer.party[i].name === pokemonName) {
                const pokemon = trainer.party[i];
                loadPokemonToPanel(pokemon, trainer)
            }
        }   
    }
});

function loadPokemonToPanel(pokemon, trainer, skipCalculate) {
    const species = pokedex[pokemon.name];
    const formeObj = $("#p2 .forme").parent();
    if (species.otherFormes) {
        showFormes(formeObj, pokemon.name, species, pokemon.name);
    } else if (species.baseSpecies && pokedex[species.baseSpecies] && pokedex[species.baseSpecies].otherFormes) {
        showFormes(formeObj, pokemon.name, pokedex[species.baseSpecies], species.baseSpecies);
    } else {
        formeObj.hide();
    }
    $("#p2 .type1").val(species.types[0]).change();
    $("#p2 .type2").val(species.types[1]).change();
    $("#p2 .ability").val(pokemon.ability).change();
    $("#p2 .level").val(pokemon.level).change();
    $("#p2 .item").val(pokemon.item).change();
    $("#p2 .nature").val(pokemon.nature).change();
    $("#p2 .move1 select.move-selector").val(pokemon.moves[0]).change();
    $("#p2 .move2 select.move-selector").val(pokemon.moves[1]).change();
    $("#p2 .move3 select.move-selector").val(pokemon.moves[2]).change();
    $("#p2 .move4 select.move-selector").val(pokemon.moves[3]).change();
    $("#p2 input.set-selector").val(pokemon.name + " (" + trainer.name + ")");
    $("#p2 .select2-chosen").first().text(pokemon.name + " (" + trainer.name + ")");
    document.getElementById('p2mon').src = 
        'https://raw.githubusercontent.com/May8th1995/sprites/master/' + pokemon.name + '.png';

    if (!skipCalculate && typeof gen === 'number') calculate();
}

function renderOpposingTeam() {
    const trainer = trainers[currentTrainerIndex];
    const iconsDiv = document.getElementById('opposing-team-icons');
    iconsDiv.innerHTML = '';


    for (let i = 0; i < trainer.party.length; i++) {
        const pokemon = trainer.party[i];
        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/May8th1995/sprites/master/' + pokemon.name + '.png';
        img.className = "right-side";
        img.dataset.id = pokemon.name + " (" + trainer.name + ")";
        img.style.cursor = 'pointer';
        iconsDiv.appendChild(img);
    }

    loadPokemonToPanel(trainer.party[0], trainer, true);
}

function nextTrainer() {
    if (currentTrainerIndex < (trainers.length - 1)) {
        currentTrainerIndex++;
        renderOpposingTeam()
    }
}

function previousTrainer() {
    if (currentTrainerIndex > 0){
        currentTrainerIndex--;
        renderOpposingTeam()
    }
}

function resetTrainer() {
    currentTrainerIndex = 0;
    renderOpposingTeam();
}

function getTrainerSetOptions() {
    const sets = [];
    const addedHeaders = [];

    for (i = 0; i < trainers.length; i++) {
        for (j = 0; j < trainers[i].party.length; j++) {
            const pokemonName = trainers[i].party[j].name;
            const trainerName = trainers[i].name;

            if (addedHeaders.indexOf(pokemonName) === -1) {
                sets.push({ pokemon: pokemonName, text: pokemonName });
                addedHeaders.push(pokemonName);
            }

            sets.push({
                pokemon: pokemonName,
                set: trainerName,
                text: pokemonName + " (" + trainerName + ")",
                id: pokemonName + " (" + trainerName + ")"
            });
        }
    }
    return sets;
}

document.addEventListener('DOMContentLoaded', function() {
    renderOpposingTeam();
    document.getElementById('prev-trainer').addEventListener('click', previousTrainer);
    document.getElementById('next-trainer').addEventListener('click', nextTrainer);
    document.getElementById('reset-trainer').addEventListener('click', resetTrainer);
    // handler
    $("#p2 .set-selector").on("change", function() {
        const id = $(this).val(); // "Mon name (Trainer name)"
        const pokemonName = id.split(" (")[0];
        const trainerName = id.split(" (")[1].replace(")", "");
    
        for (let i = 0; i < trainers.length; i++) {
            if (trainers[i].name === trainerName) {
                for (let j = 0; j < trainers[i].party.length; j++) {
                    if (trainers[i].party[j].name === pokemonName) {
                        loadPokemonToPanel(trainers[i].party[j], trainers[i], false);
                    }
                }
            }
        }
    });
});
