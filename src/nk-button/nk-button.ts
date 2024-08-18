import { config, size, variant } from "../utils/config.model";
import { sizeStyle, variantStyle } from "../utils/style.config";

export class NKButtonElement extends HTMLButtonElement {
    variant: variant = variant.primary;
    size: size = 'm';
    loader: boolean = false;

    constructor(config?: config) {
        // Call super with the correct prototype chain
        super();

        if (config) {
            this.variant = config.variant;
            this.size = config.size;
            this.loader = config.loader;
        }

        this.render();
    }

    render(): void {
        // this.setAttribute('aria-label', 'nk-button');
        this.updateVariant(this.variant, false);
        this.updateSize(this.size, false);
    }

    updateStyle(value: variant | size): void {
        if (this.isVariant(value)) {
            this.updateVariant(value, true);
            this.updateSize(this.size, false);
        } else {
            this.updateSize(value, true);
            this.updateVariant(this.variant, false);
        }
    }

    private updateVariant(variant: variant, clearCss: boolean): void {
        this.variant = variant;
        const style = variantStyle[variant];
        let newCss = '';
        Object.keys(style).forEach((key) => {
            if (typeof style[key] === 'string') {
                const value = style[key];
                newCss += value + ' ';
            }
        });

        if (newCss !== '') {
            clearCss ? this.className = newCss : this.className += ` ${newCss}`;
        }
    }

    private updateSize(size: size, clearCss: boolean): void {
        this.size = size;
        const style = sizeStyle[size];
        let newCss = '';

        Object.keys(style).forEach((key) => {
            if (typeof style[key] === 'string') {
                const value = style[key];
                newCss += value + ' ';
            }
        });

        if (newCss !== '') {
            clearCss ? this.className = newCss : this.className += ` ${newCss}`;
        }
    }

    private isVariant(value: any): value is variant {
        return Object.keys(variant).indexOf(value) !== -1;
    }

    private isSize(value: any): value is size {
        return ['xs', 's', 'm', 'l', 'xl'].indexOf(value) !== -1;
    }

    updateLoader(add: boolean): void {
        if (add) {
            const svg = document.createRange().createContextualFragment(`
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
                    <path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>`);
            this.insertBefore(svg, this.firstChild);
        } else {
            const svg = this.querySelector('svg');
            if (svg) {
                this.removeChild(svg);
            }
        }
        return this.updateDisable(add);
    }

    updateDisable(disable: boolean): void {
        this.disabled = disable;
        disable ? this.classList.add('!cursor-not-allowed') : this.classList.remove('!cursor-not-allowed');
    }
}

// Define the custom element using 'extends' option
customElements.define('nk-button', NKButtonElement, { extends: 'button' });
