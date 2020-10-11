export function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
};

export function countClick(count, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
};

const $logs = document.querySelector('#logs');
export function generateLog(firstPerson, secondPerson, damage, damageHP, defaultHP) {
    const logs = [
        `<strong>${firstPerson.name}</strong> вспомнил что-то важное, но неожиданно <strong>${secondPerson.name}</strong>, не помня себя от испуга, ударил в предплечье врага.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> поперхнулся, и за это <strong>${secondPerson.name}</strong> с испугу приложил прямой удар коленом в лоб врага.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> забылся, но в это время наглый <strong>${secondPerson.name}</strong>, приняв волевое решение, неслышно подойдя сзади, ударил.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> пришел в себя, но неожиданно <strong>${secondPerson.name}</strong> случайно нанес мощнейший удар.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> поперхнулся, но в это время <strong>${secondPerson.name}</strong> нехотя раздробил кулаком \<вырезанно цензурой\> противника.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> удивился, а <strong>${secondPerson.name}</strong> пошатнувшись влепил подлый удар.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> высморкался, но неожиданно <strong>${secondPerson.name}</strong> провел дробящий удар.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> пошатнулся, и внезапно наглый <strong>${secondPerson.name}</strong> беспричинно ударил в ногу противника.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> расстроился, как вдруг, неожиданно <strong>${secondPerson.name}</strong> случайно влепил стопой в живот соперника.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
        `<strong>${firstPerson.name}</strong> пытался что-то сказать, но вдруг, неожиданно <strong>${secondPerson.name}</strong> со скуки, разбил бровь сопернику.<br><br>Урон: <span class="text-red"><strong>-${damage}</strong></span><br> <strong>${firstPerson.name}</strong> имеет здоровья <span class="text-green"><strong>${damageHP}</strong></span> из <span class="text-green"><strong>${defaultHP}</strong></span>`,
    ];

    const log = logs[random(logs.length) - 1];

    const $p = document.createElement('p');
    $p.setAttribute('class', 'gameLog');
    $p.innerHTML = log;
    $logs.insertBefore($p, $logs.children[0]);

    return logs[random(logs.length) - 1];
};

export function randomPokemon(array) {
    return array[random(array.length) - 1];
};