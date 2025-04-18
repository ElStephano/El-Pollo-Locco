class MobileControls {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.renderControls();
        this.bindButtons();
        this.setViewportHeight();   // 💡 Fix für 100vh
        this.preventURLBar();       // 💡 Scroll-Hack gegen URL-Leiste
        this.forceScrollOnFirstTouch();
        this.showIfMobile();
    }


    forceScrollOnFirstTouch() {
        const handler = () => {
            window.scrollTo(0, 1);
            document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('touchstart', handler, { passive: true });
    }


    renderControls() {
        const html = `
            <div id="mobileControls" class="mobile-controls">
                <div class="arrowTouch">
                    <button id="btnLeft" class="control-btn"><img src="./img/10_Icons/left-arrow.png"></button>
                    <button id="btnRight" class="control-btn"><img src="./img/10_Icons/right-arrow.png"></button>
                </div>
                <div class="right-touch">
                    <button id="btnThrow" class="control-btn"><img src="./img/6_salsa_bottle/salsa_bottle.png"></button>
                    <button id="btnJump" class="control-btn"><img src="./img/10_Icons/up-arrow.png"></button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    bindButtons() {
        this.bindTouch('btnLeft', 'LEFT');
        this.bindTouch('btnRight', 'RIGHT');
        this.bindTouch('btnJump', 'UP');
        this.bindTouch('btnThrow', 'SPACE');
    }

    bindTouch(buttonId, key) {
        const btn = document.getElementById(buttonId);
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keyboard[key] = true;
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keyboard[key] = false;
        }, { passive: false });

        btn.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // verhindert Rechtsklick-Menü bei Long Touch
        });
    }

    showIfMobile() {
        const isMobileWidth = window.innerWidth < 768;
        const isMobileHeight = window.innerHeight < 480;
        const controls = document.getElementById('mobileControls');
        if (!(isMobileWidth || isMobileHeight) && controls) {
            controls.classList.add('d-none');
        }
    }

    // ✅ Dynamisch --vh setzen (echte Fensterhöhe ohne URL-Leiste)
    setViewportHeight() {
        const updateVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        updateVh();
        window.addEventListener('resize', updateVh);
    }

    // ✅ Scroll-Hack, damit mobile Browser die URL-Leiste ausblenden
    preventURLBar() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.scrollTo(0, 1);
            }, 100);
        });
    }
}



