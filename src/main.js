import random from "./utils";
import Pokemon from "./pokemon.js";

const $btn = document.getElementById('btn-kick');
const $btnUlt = document.getElementById('btn-ultimate');

/*const $logs = document.querySelector('#logs');*/

const [clickOnKick, textOnButtonKick] = countClick();
const [clickOnUltimate, textOnButtonUltimate] = countClick();

const player1 = new Pokemon({
    name: 'Pikachu',
    defaultHP: 300,
    damageHP: 300,

    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    defaultHP: 500,
    damageHP: 500,

    selectors: 'enemy',
});
console.log(player1);
console.log(player2);

function countClick() {
    let counter = 0;
    return [
        function (number, typeOfHit) {
            counter += number
            console.log(`${typeOfHit}` + '[' + counter + ']');
            return counter;
        },
        function (id, limit, button) {
            if (counter === limit) {button.disabled = true;}
            return document.getElementById(`${id}`).innerText = '(' + counter + '/' + limit + ' )';
        }
    ]
};

$btn.addEventListener('click', function () {
    player1.changeHP(random(60, 20), function (count, damageHP, defaultHP) {
        console.log('Some change after change HP', count );
        console.log(generateLog(player1, player2, count, damageHP, defaultHP));
    });
    player2.changeHP(random(60, 20), function (count, damageHP, defaultHP) {
        console.log('Some change after change HP', count );
        console.log(generateLog(player2, player1, count, damageHP, defaultHP));
    });

    clickOnKick(1, 'Kick');
    textOnButtonKick('clickOnKick', 6, $btn);
});

$btnUlt.addEventListener('click', function () {
    player1.changeHP(100, function (count, damageHP, defaultHP) {
        console.log('Some change after change HP', count );
        console.log(generateLog(player1, player2, count, damageHP, defaultHP));
    });
    player2.changeHP(100, function (count, damageHP, defaultHP) {
        console.log('Some change after change HP', count );
        console.log(generateLog(player2, player1, count, damageHP, defaultHP));
    });

    clickOnUltimate(1, 'Ultimate');
    textOnButtonUltimate('clickOnUltimate', 1, $btnUlt);
});

function generateLog(firstPerson, secondPerson, damage, damageHP, defaultHP) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage}, [${damageHP}/${defaultHP}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage}, [${damageHP}/${defaultHP}]`
    ];

    return logs[random(logs.length) - 1];
};

/*function changeHP (count) {
    let { name, defaultHP, damageHP } = this;

    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count, damageHP, defaultHP) : generateLog(this, enemy, count, damageHP, defaultHP);

    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный ' + name + ' проиграл D:');
        $btn.disabled = true;
        $btnUlt.disabled = true;
    }

    this.renderHP();
};*/
