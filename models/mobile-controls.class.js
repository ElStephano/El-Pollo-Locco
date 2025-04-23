/**
 * Klasse, die die mobilen Steuerungen für das Spiel verwaltet.
 * Sie rendert die Steuerbuttons, bindet Touch-Ereignisse an die Buttons und sorgt dafür, 
 * dass die Steuerungen korrekt angezeigt werden, wenn auf einem mobilen Gerät gespielt wird.
 */
class MobileControls {
    
    /**
     * Erstellt eine neue Instanz der MobileControls-Klasse.
     * 
     * @param {Object} keyboard - Das Keyboard-Objekt, das die aktuellen Tastenstatus enthält.
     * @constructor
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.renderControls();
        this.bindButtons();
        this.setViewportHeight();
        this.preventURLBar();
        this.forceScrollOnFirstTouch();
        this.showIfMobile();
    }

    /**
     * Erzwingt das Scrollen der Seite beim ersten Touch, um die URL-Leiste auf mobilen Geräten zu verbergen.
     * Diese Funktion sorgt dafür, dass das Spiel direkt beim ersten Touch angezeigt wird.
     */
    forceScrollOnFirstTouch() {
        const handler = () => {
            window.scrollTo(0, 1);
            document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('touchstart', handler, { passive: true });
    }

    /**
     * Rendert die mobilen Steuerbuttons in HTML und fügt sie dem Dokument hinzu.
     * Die Steuerbuttons ermöglichen das Steuern von Charakterbewegungen und Aktionen.
     */
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

    /**
     * Bindet die Touch-Ereignisse für die Steuerbuttons.
     * Es wird dafür gesorgt, dass beim Tippen auf die Buttons die entsprechenden Tasten im `keyboard`-Objekt aktiviert/deaktiviert werden.
     */
    bindButtons() {
        this.bindTouch('btnLeft', 'LEFT');
        this.bindTouch('btnRight', 'RIGHT');
        this.bindTouch('btnJump', 'UP');
        this.bindTouch('btnThrow', 'SPACE');
    }

    /**
     * Bindet die Touch-Ereignisse (touchstart, touchend) für einen einzelnen Button.
     * 
     * @param {string} buttonId - Die ID des Buttons, der gebunden werden soll.
     * @param {string} key - Der Tastenbezeichner im `keyboard`-Objekt, der beim Tippen auf den Button geändert wird.
     */
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
            e.preventDefault();
        });
    }

    /**
     * Zeigt die mobilen Steuerungen nur auf mobilen Geräten an, basierend auf der Bildschirmgröße.
     * Wenn die Breite des Bildschirms kleiner als 768px oder die Höhe kleiner als 480px ist, wird die Steuerung angezeigt.
     */
    showIfMobile() {
        const isMobileWidth = window.innerWidth < 768;
        const isMobileHeight = window.innerHeight < 480;
        const controls = document.getElementById('mobileControls');
        if (!(isMobileWidth || isMobileHeight) && controls) {
            controls.classList.add('d-none');
        }
    }

    /**
     * Setzt die CSS-Variable `--vh` auf die Höhe des Viewports, um Probleme mit der mobilen Ansicht und der URL-Leiste zu verhindern.
     * Diese Methode sorgt dafür, dass der Viewport immer korrekt auf mobilen Geräten dargestellt wird.
     */
    setViewportHeight() {
        const updateVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        updateVh();
        window.addEventListener('resize', updateVh);
    }

    /**
     * Verhindert, dass die URL-Leiste bei einem Seitenladen auf mobilen Geräten sichtbar bleibt.
     * Scrollt die Seite nach dem Laden ein kleines Stück nach oben, um die URL-Leiste zu verbergen.
     */
    preventURLBar() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.scrollTo(0, 1);
            }, 100);
        });
    }
}



