// get data from the JSON file
fetch('pokedex.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        const currentPokemonIndex = data.findIndex(p => p.id == pokemonId);
        
        // display details of the selected pokemon card
        displayPokemonDetails(data[currentPokemonIndex]);

         // back button function
         document.getElementById('leftArrow').addEventListener('click', () => {
            navigateToPokemon(data, currentPokemonIndex - 1);
        });

        // forward button function
        document.getElementById('rightArrow').addEventListener('click', () => {
            navigateToPokemon(data, currentPokemonIndex + 1);
        });
    })
    .catch(error => console.error('Error fetching the Pokémon data:', error));

    function navigateToPokemon(data, index) {
        if (index >= 0 && index < data.length) {
            window.location.href = `detail.html?id=${data[index].id}`;
        }
    }

    // display pokemon details
    function displayPokemonDetails(pokemon) {
        if (!pokemon) return;
    

    // update background color based on pokemon type
    const backgroundColors = {
        grass: '#A8D8B9',
        poison: '#D6A9D9',
        fire: '#F1A7A7',
        water: '#A9D6E7',
        electric: '#F9EA7E',
        ground: '#C2B280',
        bug: '#A8D200',
        normal: '#C7C1A0',    
        fairy: '#FF6F61',
        fighting: '#BF3E3E',
        psychic: '#D5006D',
        rock: '#A16A35',
        ghost: '#4B0082',
        dragon: '#5C5E7D',
        steel: '#A8A8B5',
        dark: '#3A3B30',
        ice: '#A4D8E1',
        flying:' #A1C7E1'
    };

    document.body.style.backgroundColor = backgroundColors[pokemon.type[0].toLowerCase()] || '#FFFFFF';
    document.querySelector('.name').textContent = pokemon.name.english;
    document.querySelector('.body2-fonts').textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    document.querySelector('.detail-img-wrapper img').src = pokemon.image.hires;

    // display types
    const typeWrapper = document.querySelector('.power-wrapper');
    typeWrapper.innerHTML = '';
    pokemon.type.forEach(type => {
        const typeElement = document.createElement('p');
        typeElement.classList.add('body3-fonts', 'type', type.toLowerCase());
        typeElement.textContent = type;
        typeElement.style.backgroundColor = backgroundColors[type.toLowerCase()] || '#FFFFFF'; // Set background color
        typeWrapper.appendChild(typeElement);
    });

    // display weight and height
    document.querySelector('.weight').textContent = pokemon.profile.weight;
    document.querySelector('.height').textContent = pokemon.profile.height;

    // display abilities
    const abilityWrapper = document.querySelector('.move');
    abilityWrapper.innerHTML = pokemon.profile.ability.map(ability => `<p>${ability[0]} (${ability[1] === "true" ? "Hidden" : "Normal"})</p>`).join('');
    
    // display description
    document.querySelector('.pokemon-description').textContent = pokemon.description;

    const stats = pokemon.base;

    // get stats value
    const statMapping = {
        'HP': stats.HP,
        'Attack': stats.Attack,
        'Defense': stats.Defense,
        'Sp-Attack': stats["Sp. Attack"],
        'Sp-Defense': stats["Sp. Defense"],
        'Speed': stats.Speed
    };

    document.querySelectorAll('.stats-wrap').forEach(statWrap => {
        const statName = statWrap.getAttribute('data-stat');
        const statValue = statMapping[statName];
    
        if (statValue !== undefined) {
            // fill the width based on the stat value
            const statFill = statWrap.querySelector('.stat-fill');
            statFill.style.width = `${statValue}%`; 
    
            // set the stat value text indicator
            const statValueText = statWrap.querySelector('.stat-value');
            statValueText.textContent = statValue;
        }
    });
    }