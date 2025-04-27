/**
 * Class that manages the mobile controls for the game.
 * It renders the control buttons, binds touch events to the buttons, and ensures that the controls are displayed correctly when playing on a mobile device.
 */
class MobileControls {

    /**
     * Creates a new instance of the MobileControls class.
     * 
     * @param {Object} keyboard - The keyboard object that contains the current key states.
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
     * Forces the page to scroll on the first touch to hide the URL bar on mobile devices.
     * This ensures that the game is displayed immediately after the first touch.
     */
    forceScrollOnFirstTouch() {
        const handler = () => {
            window.scrollTo(0, 1);
            document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('touchstart', handler, { passive: true });
    }

    /**
     * Renders the mobile control buttons in HTML and adds them to the document.
     * The control buttons allow controlling character movement and actions.
     */
    renderControls() {
        let mobileControlContainer = document.getElementById('mobileControlsContainer')
        mobileControlContainer.innerHTML = `
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
    }

    /**
     * Binds the touch events for the control buttons.
     * Ensures that when tapping the buttons, the corresponding keys in the `keyboard` object are activated/deactivated.
     */
    bindButtons() {
        this.bindTouch('btnLeft', 'LEFT');
        this.bindTouch('btnRight', 'RIGHT');
        this.bindTouch('btnJump', 'UP');
        this.bindTouch('btnThrow', 'SPACE');
    }

    /**
     * Binds the touch events (touchstart, touchend) for a single button.
     * 
     * @param {string} buttonId - The ID of the button to bind.
     * @param {string} key - The key identifier in the `keyboard` object that will be changed when the button is tapped.
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
     * Displays the mobile controls only on mobile devices based on screen size.
     * If the screen width is less than 768px or the height is less than 480px, the controls will be shown.
     */
    showIfMobile() {
        const container = document.getElementById('mobileControlsContainer');
        const iconsContainer = document.getElementById('iconsContainer')
    
        const isTouchDevice = (
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            navigator.msMaxTouchPoints > 0
        );
    
        if (isTouchDevice && container) {
            container.classList.remove('d-none');
            iconsContainer.classList.add('icons-container-mobile')
        } else if (container) {
            container.classList.add('d-none');
            iconsContainer.classList.remove('icons-container-mobile')

        }
    }

    /**
     * Sets the CSS variable `--vh` to the height of the viewport to prevent issues with mobile view and the URL bar.
     * This method ensures that the viewport is always displayed correctly on mobile devices.
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
     * Prevents the URL bar from staying visible when the page is loaded on mobile devices.
     * It scrolls the page up slightly after loading to hide the URL bar.
     */
    preventURLBar() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.scrollTo(0, 1);
            }, 100);
        });
    }
}
