class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors{
    constructor({name, defaultHP, damageHP, selectors}) {
        super(selectors);

        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;

        this.renderHP();
    };

    changeHP = (count, cb) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }

        this.renderHP();

        cb && cb(count, this.damageHP, this.defaultHP);
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    renderHPLife = () => {
        let { elHP, defaultHP, damageHP } = this;
        elHP.innerText = damageHP + ' / ' + defaultHP;
    };

    renderProgressbarHP = () => {
        let { elProgressbar, defaultHP, damageHP } = this;
        const percent = damageHP / defaultHP * 100;
        elProgressbar.style.width = percent + '%';
    };
}

export default Pokemon;