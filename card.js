//define bg colors for diff pokemon types
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
    flying: '#A1C7E1'
};

fetch('pokedex.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        data.forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('card');

            //format the pokemon id to be 3 digits long
            const formattedId = String(pokemon.id).padStart(3, '0');

            //create type of pokemon with background colors
            const typeElements = pokemon.type.map(type => {
                const color = backgroundColors[type.toLowerCase()] || '#FFFFFF'; // Default color
                return `<span class="type" style="background-color: ${color};">${type}</span>`;
            }).join(' ');

            //set the inner html for the card
            card.innerHTML = `
                <img src="${pokemon.image.thumbnail}" alt="${pokemon.name.english}">
                <div class="info">
                    <p class="code">${formattedId}</p>
                    <p class="name">${pokemon.name.english}</p>
                    <p class="type">${typeElements}</p>
                </div>
            `;
            
            // navigate to details page
            card.addEventListener('click', () => {
                window.location.href = `detail.html?id=${pokemon.id}`;
            });
            //add the card to the container
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching the Pokémon data:', error));
