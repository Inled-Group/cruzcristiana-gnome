// extension.js - GNOME 45+ con tecnologías modernas
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

// Clase moderna usando GObject para el indicador
const ChristianCrossIndicator = GObject.registerClass(
class ChristianCrossIndicator extends St.Bin {
    _init() {
        super._init({
            style_class: 'panel-button christian-cross-indicator',
            reactive: true,
            can_focus: true,
            track_hover: true,
            accessible_name: 'Cruz Cristiana',
            accessible_role: 'button'
        });

        // Crear el icono con mejor estilo
        this._icon = new St.Label({
            text: '✝️',
            style_class: 'christian-cross-icon',
            y_align: Clutter.ActorAlign.CENTER,
            x_align: Clutter.ActorAlign.CENTER
        });

        this.set_child(this._icon);

        // Efectos visuales modernos
        this.connect('enter-event', () => {
            this.add_style_pseudo_class('hover');
            this._applyHoverStyles();
            this._icon.ease({
                scale_x: 1.1,
                scale_y: 1.1,
                duration: 200,
                mode: Clutter.AnimationMode.EASE_OUT_QUAD
            });
        });

        this.connect('leave-event', () => {
            this.remove_style_pseudo_class('hover');
            this._removeHoverStyles();
            this._icon.ease({
                scale_x: 1.0,
                scale_y: 1.0,
                duration: 200,
                mode: Clutter.AnimationMode.EASE_OUT_QUAD
            });
        });

        // Tooltip moderno
        this.connect('notify::hover', () => {
            if (this.hover) {
                Main.uiGroup.set_child_above_sibling(this._tooltip, null);
            }
        });
    }

    // Método para aplicar estilos CSS modernos
    _applyStyles() {
        // Aplicar estilos directamente usando style string moderno
        this.set_style(`
            margin: 0 4px;
            border-radius: 6px;
            padding: 2px 6px;
            background-color: rgba(255, 255, 255, 0.05);
            transition: all 200ms ease-out;
        `);
        
        this._icon.set_style(`
            font-size: 16px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            color: rgba(255, 255, 255, 0.9);
        `);
    }

    // Aplicar estilos de hover
    _applyHoverStyles() {
        this.set_style(`
            margin: 0 4px;
            border-radius: 6px;
            padding: 2px 6px;
            background-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 200ms ease-out;
        `);
    }

    // Remover estilos de hover
    _removeHoverStyles() {
        this.set_style(`
            margin: 0 4px;
            border-radius: 6px;
            padding: 2px 6px;
            background-color: rgba(255, 255, 255, 0.05);
            transition: all 200ms ease-out;
        `);
    }

    destroy() {
        super.destroy();
    }
});

// Extensión principal usando ES6 class moderna
export default class ChristianCrossExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._indicator = null;
        this._settings = null;
    }

    enable() {
        console.log(`Habilitando ${this.metadata.name} v${this.metadata.version}`);

        // Crear el indicador usando la clase moderna
        this._indicator = new ChristianCrossIndicator();
        this._indicator._applyStyles();

        // Agregar al panel con transición suave
        Main.panel._rightBox.insert_child_at_index(this._indicator, 0);
        
        // Animación de entrada
        this._indicator.set_scale(0, 0);
        this._indicator.ease({
            scale_x: 1,
            scale_y: 1,
            duration: 300,
            mode: Clutter.AnimationMode.EASE_OUT_BACK
        });

        // Configurar settings si están disponibles
        this._setupSettings();
    }

    disable() {
        console.log(`Deshabilitando ${this.metadata.name}`);

        if (this._indicator) {
            // Animación de salida
            this._indicator.ease({
                scale_x: 0,
                scale_y: 0,
                duration: 200,
                mode: Clutter.AnimationMode.EASE_IN_BACK,
                onComplete: () => {
                    Main.panel._rightBox.remove_child(this._indicator);
                    this._indicator.destroy();
                    this._indicator = null;
                }
            });
        }

        if (this._settings) {
            this._settings = null;
        }
    }

    // Método moderno para configurar ajustes
    _setupSettings() {
        try {
            this._settings = this.getSettings();
            
            // Conectar cambios de configuración si existen
            this._settings?.connect('changed', (settings, key) => {
                console.log(`Configuración cambiada: ${key}`);
                this._onSettingsChanged(key);
            });
        } catch (error) {
            console.log('No hay esquema de configuración disponible');
        }
    }

    _onSettingsChanged(key) {
        // Manejar cambios de configuración
        switch (key) {
            case 'show-cross':
                this._indicator.visible = this._settings.get_boolean(key);
                break;
            default:
                break;
        }
    }

    // Método para obtener información de la extensión
    getMetadata() {
        return {
            name: this.metadata.name,
            version: this.metadata.version,
            uuid: this.metadata.uuid,
            description: this.metadata.description
        };
    }
}