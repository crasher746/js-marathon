class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors{
    constructor({name, hp, type, selectors, attacks = []}) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    };

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();

        cb && cb(count, this.hp.current, this.hp.total);
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    renderHPLife = () => {
        let { elHP, hp: {current, total} } = this;
        elHP.innerText = current + ' / ' + total;
    };

    renderProgressbarHP = () => {
        let { elProgressbar, hp: {current, total}} = this;
        const percent = current / total * 100;
        elProgressbar.style.width = percent + '%';
    };
}

export default Pokemon;