import Pokemon from "./pokemon.js";
import {pokemons} from "./pokemons";
import {random, countClick, generateLog, randomPokemon} from "./utils";
const $control = document.querySelector('.control');

class Elements {
        elPlayer1 = document.getElementById('pokemon-player1');
        elPlayer2 = document.getElementById('pokemon-player2');
        elLog = document.getElementById('logs');
};

class Game extends Elements{
    async start(mode) {
        let allButtons = document.querySelectorAll('.control .button');
        if (mode != 'Restart') {
            allButtons.forEach($item => $item.remove());
        }
        if (mode === 'Start') {this.hideElements(true);}

        const $btnStart = document.createElement('button');
        $btnStart.classList.add('button');
        $btnStart.innerText = `${mode}`;
        $control.appendChild($btnStart);

        $btnStart.addEventListener('click', () => {
            console.log('Click button:', $btnStart.innerText);
            allButtons = document.querySelectorAll('.control .button');
            allButtons.forEach($item => $item.remove());
            if (mode === 'Restart' || mode === 'Lose! Restart!' || mode === 'Player1 lose! Restart!') {
                let oldLog = document.querySelectorAll('.gameLog');
                oldLog.forEach($item => $item.remove());
            }
            this.loadGame();
        })
    };

    async loadGame() {
        this.hideElements(false);
        let randomPokemon1 = randomPokemon(pokemons);
        let randomPokemon2 = randomPokemon(pokemons);

        let player2 = new Pokemon({
            ...randomPokemon2,
            selectors: 'player2',
        });

        let player1 = new Pokemon({
            ...randomPokemon1,
            selectors: 'player1',
        });

        player1.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = item.name;

            const btnCountClick = countClick(item.maxCount, $btn);
            $btn.addEventListener('click', () => {
                btnCountClick();
                player1.changeHP(random(item.maxDamage, item.minDamage), function (count, current, total) {
                    generateLog(player1, player2, count, current, total);
                });
                player2.changeHP(random(item.maxDamage, item.minDamage), function (count, current, total) {
                    generateLog(player2, player1, count, current, total);
                });
                if (player1.hp.current === 0 && player2.hp.current === 0) {this.start('Lose! Restart!');}
                else if (player1.hp.current === 0 && player2.hp.current > 0) {this.start('Player1 lose! Restart!');}
                else if (player2.hp.current === 0 && player1.hp.current > 0) {
                    randomPokemon2 = randomPokemon(pokemons);
                    player2 = new Pokemon({
                        ...randomPokemon2,
                        selectors: 'player2',
                    });
                }
            });

            $control.appendChild($btn);
        });
        this.start('Restart');
    };

    hideElements = (logic) => {
        let {elPlayer1, elPlayer2, elLog} = this;
        elPlayer1.hidden = logic;
        elPlayer2.hidden = logic;
        elLog.hidden = logic;
    };
};

export default Game;