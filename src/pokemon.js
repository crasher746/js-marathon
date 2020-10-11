class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
    }
}

class Pokemon extends Selectors{
    constructor({name, img, hp, type, selectors, attacks = []}) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;

        this.setImage();
        this.setName();
        this.renderHP();
    };

    setImage = () => {
        this.elImg.src = this.img;
    };

    setName = () => {
        this.elName.innerText = this.name;
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
        if (current >= 20 && current <= 60) {
            elProgressbar.classList.add('low');
        }
        else if (current < 20) {
            elProgressbar.classList.add('critical');
        }
        else {
            elProgressbar.classList.remove('low');
            elProgressbar.classList.remove('critical');
        }
        const percent = current / total * 100;
        elProgressbar.style.width = percent + '%';
    };
}

export default Pokemon;