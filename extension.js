// extension.js
const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

class ChristianCrossExtension {
    constructor() {
        this._indicator = null;
    }

    enable() {
        // Crear el indicador con un ícono de cruz
        this._indicator = new St.Bin({
            style_class: 'panel-button',
            reactive: false,
            can_focus: false,
            track_hover: false
        });

        // Crear el icono de la cruz usando un label con unicode
        let icon = new St.Label({
            text: '✝️', // Emoji de cruz
            y_align: Clutter.ActorAlign.CENTER
        });

        this._indicator.set_child(icon);
        
        // Agregar el indicador al panel
        Main.panel._rightBox.insert_child_at_index(this._indicator, 0);
    }

    disable() {
        // Quitar el indicador del panel
        if (this._indicator) {
            Main.panel._rightBox.remove_child(this._indicator);
            this._indicator = null;
        }
    }
}

// Funciones estándar para inicializar la extensión
function init() {
    return new ChristianCrossExtension();
}