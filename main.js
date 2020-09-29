const $btn = document.getElementById('btn-kick');
const $btnUlt = document.getElementById('btn-ultimate');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

$btn.addEventListener('click', function () {
    console.log('kick D:');
    random();
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

$btnUlt.addEventListener('click', function () {
   ultimate(character);
   ultimate(enemy);
});

function init() {
    console.log('Start game');
    $btnUlt.disabled = true;
    renderHP(character);
    renderHP(enemy);
};

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
    if (person.damageHP < 50 && person.damageHP > 2) $btnUlt.disabled = false;
    if (person.damageHP === 1) {$btnUlt.disabled = true;}
};

function renderHPLife (person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
};

function renderProgressbarHP (person) {
    person.elProgressbar.style.width = person.damageHP + '%';
};

function changeHP (count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + 'проиграл D:');
        $btn.disabled = true;
        $btnUlt.disabled = true;
    } else {
        person.damageHP -= count;
    }
    renderHP(person);
};

function random(num) {
    return Math.ceil(Math.random() * num);
};

function ultimate(person) {
    if (person.damageHP < 50) {
        $btnUlt.disabled = false;
        person.damageHP -= (person.damageHP - 1);
    } else {
        $btnUlt.disabled = true;
    }
    renderHP(person);
};

init();