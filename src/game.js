import Pokemon from "./pokemon.js";
import {countClick, generateLog, randomPokemon} from "./utils";
const $control = document.querySelector('.control');

class Elements {
        elPlayer1 = document.getElementById('pokemon-player1');
        elPlayer2 = document.getElementById('pokemon-player2');
        elLog = document.getElementById('logs');
};

class Game extends Elements{

    getPokemons = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await response.json();
        return body;
    };

    getRandomPokemon = async() => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
        const pokemon = await response.json();
        return pokemon;
    };

    getFight = async(id_player1, id_player2, id_attack) => {
        const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${id_player1}&attackId=${id_attack}&player2id=${id_player2}`);
        const damage = await response.json();
        return damage;
    };

    start = async (mode, logic = 0) => {
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
            if (logic === 1) {
                let oldLog = document.querySelectorAll('.gameLog');
                oldLog.forEach($item => $item.remove());
            }
            this.loadGame();
        })
    };

    loadGame = async() => {
        const pokemons = await this.getPokemons();
        console.log(pokemons);
        this.hideElements(false);
        let randomPokemon1 = await this.getRandomPokemon();
        let randomPokemon2 = await this.getRandomPokemon();

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
            $btn.addEventListener('click', async() => {
                btnCountClick();
                const randomDamage = await this.getFight(player1.getId(), player2.getId(), item.id);
                console.log(randomDamage);
                console.log('player1 damage: ' + randomDamage.kick.player1);
                console.log('player2 damage: ' + randomDamage.kick.player2);

                player1.changeHP(randomDamage.kick.player1, function (count, current, total) {
                    generateLog(player1, player2, count, current, total);
                });
                player2.changeHP(randomDamage.kick.player2, function (count, current, total) {
                    generateLog(player2, player1, count, current, total);
                });
                if (player1.hp.current === 0 && player2.hp.current === 0) {this.start(`${player1.name} and ${player2.name} are losers! Restart!`, 1);}
                else if (player1.hp.current === 0 && player2.hp.current > 0) {this.start(`${player1.name} loser! Restart!`, 1);}
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