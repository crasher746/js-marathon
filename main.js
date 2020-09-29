const $btn = document.getElementById('btn-kick');
const $btnUlt = document.getElementById('btn-ultimate');
const character = {
    name: 'Pikachu',
    defaultHP: 300,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
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
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
    ultimate: ultimate,
};

$btn.addEventListener('click', function () {
    console.log('kick D:');
    random();
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

$btnUlt.addEventListener('click', function () {
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
    this.renderHPLife();
    this.renderProgressbarHP();
    if (this.damageHP < 50 && this.damageHP > 2) $btnUlt.disabled = false;
    if (this.damageHP === 1) {$btnUlt.disabled = true;}
};

function renderHPLife () {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
};

function renderProgressbarHP () {
    this.elProgressbar.style.width = (this.damageHP / this.defaultHP) * 100 + '%';
};

function changeHP (count) {
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл D:');
        $btn.disabled = true;
        $btnUlt.disabled = true;
    } else {
        this.damageHP -= count;
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

init();