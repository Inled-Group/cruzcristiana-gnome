const { St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

class CruzCristiana {
    constructor() {
        this._indicator = null;
    }

    enable() {
        // Crear el indicador con un ícono de cruz
        this._indicator = new St.Bin({
            style_class: 'panel-button',
            reactive: true,
            can_focus: true,
            track_hover: true
        });

        // Crear el icono de la cruz usando un label con unicode
        let icon = new St.Label({
            text: '✝️', // Emoji de cruz
            y_align: Clutter.ActorAlign.CENTER
        });


        this._indicator.set_child(icon);
        
        // Agregar evento de clic
        this._indicator.connect('button-press-event', () => {
            this._showDialog();
        });

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

    _showDialog() {
        // Función simple para mostrar un mensaje al hacer clic
        Main.notify('Cruz Cristiana Gnome', 'Dios está contigo. Gracias por instalar la cruz de Jesús en tu escritorio.');
    }
}

// Funciones estándar para inicializar la extensión
function init() {
    return new CruzCristiana();
}
