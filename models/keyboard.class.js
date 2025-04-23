/**
 * Repräsentiert die Tastaturzustände für die Steuerung des Spielers.
 * Die Klasse verfolgt, welche Tasten gedrückt sind, um die Bewegung und Aktionen des Spielers zu steuern.
 */
class Keyboard {
    
    /**
     * Der aktuelle Zustand der 'Links'-Taste.
     * @type {boolean}
     */
    LEFT = false;
    
    /**
     * Der aktuelle Zustand der 'Rechts'-Taste.
     * @type {boolean}
     */
    RIGHT = false;
    
    /**
     * Der aktuelle Zustand der 'Hoch'-Taste.
     * @type {boolean}
     */
    UP = false;
    
    /**
     * Der aktuelle Zustand der 'Runter'-Taste.
     * @type {boolean}
     */
    DOWN = false;
    
    /**
     * Der aktuelle Zustand der 'Sprung'-Taste (Leertaste).
     * @type {boolean}
     */
    SPACE = false;
}
