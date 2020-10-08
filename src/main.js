import Pokemon from "./pokemon.js";
import {pokemons} from "./pokemons";
import {random, countClick, generateLog} from "./utils";

const pikachu = pokemons.find(item => item.name === 'Pikachu');
console.log(pikachu);

const player1 = new Pokemon({
    ...pikachu,
    hp: 300,

    selectors: 'player1',
});

const $control = document.querySelector('.control');
console.log(player1);
player1.attacks.forEach(item => {
    console.log(item);
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countClick(item.maxCount, $btn);
    $btn.addEventListener('click', () => {
        console.log('Click button', $btn.innerText);
        btnCount();
        player1.changeHP(random(item.maxDamage, item.minDamage), function (count, current, total) {
            console.log('Some change after change HP', count );
            console.log(generateLog(player1, player2, count, current, total));
        });
        player2.changeHP(random(item.maxDamage, item.minDamage), function (count, current, total) {
            console.log('Some change after change HP', count );
            console.log(generateLog(player2, player1, count, current, total));
        });
    })

    $control.appendChild($btn);
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 500,

    selectors: 'player2',
});
console.log(player1);
console.log(player2);





