const $btn = document.getElementById('btn-kick');
const $btnUlt = document.getElementById('btn-ultimate');

function $getElById(id) {
    return document.getElementById(id);
}

const character = {
    name: 'Pikachu',
    defaultHP: 300,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
    ultimate: ultimate,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 500,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
    ultimate: ultimate,
};

const $logs = document.querySelector('#logs');

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
const [clickOnKick, textOnButtonKick] = countClick();
const [clickOnUltimate, textOnButtonUltimate] = countClick();
$btn.addEventListener('click', function () {
    clickOnKick(1, 'Kick');
    textOnButtonKick('clickOnKick', 6, $btn);
    random();
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

$btnUlt.addEventListener('click', function () {
    clickOnUltimate(1, 'Ultimate');
    textOnButtonUltimate('clickOnUltimate', 1, $btnUlt);
    character.ultimate();
    enemy.ultimate()
});

function init() {
    console.log('Start game');
    $btnUlt.disabled = true;
    character.renderHP();
    enemy.renderHP();
};

function renderHP() {
    let { damageHP } = this;
    this.renderHPLife();
    this.renderProgressbarHP();
    if (damageHP < 50 && damageHP > 2) $btnUlt.disabled = false;
    else if (damageHP === 1) {$btnUlt.disabled = true;}
};

function renderHPLife () {
    let { elHP, damageHP, defaultHP } = this;
    elHP.innerText = damageHP + ' / ' + defaultHP;
};

function renderProgressbarHP () {
    let { elProgressbar, damageHP, defaultHP } = this;
    elProgressbar.style.width = (damageHP / defaultHP) * 100 + '%';
};

function changeHP (count) {
    let { name, damageHP, defaultHP } = this;

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
};

function random(num) {
    return Math.ceil(Math.random() * num);
};

function ultimate() {
    if (this.damageHP < 50) {
        $btnUlt.disabled = false;
        this.damageHP -= (this.damageHP - 1);
    } else {
        $btnUlt.disabled = true;
    }
    this.renderHP();
};

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

init();