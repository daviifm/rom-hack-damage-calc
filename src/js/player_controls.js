function getPlayerBoxOptions() {
    const sets = [];
    for (let pokemonName in setdex) {
        for (let setName in setdex[pokemonName]) {
            if (setdex[pokemonName][setName].isCustomSet) {
                sets.push({
                    pokemon: pokemonName,
                    set: setName,
                    text: pokemonName + " (" + setName + ")",
                    id: pokemonName + " (" + setName + ")"
                })
            }
        }
    }
    return sets;
}

function loadPlayerPokemon(pokemon, set, pokemonName, skipCalculate) {
    const species = pokedex[pokemonName];
    const formeObj = $("#p1 .forme").parent();
    if (species.otherFormes) {
        showFormes(formeObj, pokemonName, species, pokemonName);
    } else if (species.baseSpecies && pokedex[species.baseSpecies] && pokedex[species.baseSpecies].otherFormes) {
        showFormes(formeObj, pokemonName, pokedex[species.baseSpecies], species.baseSpecies);
    } else {
        formeObj.hide();
    }
    $("#p1 .type1").val(species.types[0]).change();
    $("#p1 .type2").val(species.types[1]).change();
    $("#p1 .ability").val(pokemon.ability).change();
    $("#p1 .level").val(pokemon.level).change();
    $("#p1 .item").val(pokemon.item).change();
    $("#p1 .nature").val(pokemon.nature).change();
    $("#p1 .move1 select.move-selector").val(pokemon.moves[0]).change();
    $("#p1 .move2 select.move-selector").val(pokemon.moves[1]).change();
    $("#p1 .move3 select.move-selector").val(pokemon.moves[2]).change();
    $("#p1 .move4 select.move-selector").val(pokemon.moves[3]).change();
    $("#p1 input.set-selector").val(pokemonName + " (" + set + ")");
    $("#p1 .select2-chosen").first().text(pokemonName + " (" + set + ")");
    document.getElementById('p1mon').src = 
        'https://raw.githubusercontent.com/May8th1995/sprites/master/' + pokemonName + '.png';
    if (!skipCalculate && typeof gen === 'number') calculate();
}

document.getElementById('box-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const dataId = event.target.dataset.id; 
        const pokemonName = dataId.split(" (")[0];
        const sets = getPlayerBoxOptions();
        for (let i = 0; i < sets.length; i++) {
            if (sets[i].pokemon === pokemonName) {
                loadPlayerPokemon(setdex[pokemonName][sets[i].set], sets[i].set, pokemonName, true)
            }
        }

    }
});

function renderPlayerBox() {
    console.log(getPlayerBoxOptions());
    const sets = getPlayerBoxOptions();
    const iconsDiv = document.getElementById('box-list');
    iconsDiv.innerHTML = '';

    for (let i = 0; i < sets.length; i++) {
        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/May8th1995/sprites/master/' + sets[i].pokemon + '.png';
        img.className = "right-side";
        img.dataset.id = sets[i].pokemon + " (" + sets[i].set + ")";
        img.style.cursor = 'pointer';
        iconsDiv.appendChild(img);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderPlayerBox();
});