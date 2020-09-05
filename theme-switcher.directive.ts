import { Directive, Input, Inject, Renderer2 } from '@angular/core';
import { themes, modes } from './themes.const';

@Directive({
	selector: '[ThemeSwitcher]'
})
export class ThemeSwitcherDirective {
	@Input() mode: 'dark' | 'light' | 'system' = 'system';
	@Input() theme: 'default' | 'green' = 'default';

	constructor(private renderer2: Renderer2) { }

	ngOnInit() {
		this.checkMode();
		this.updateTheme(this.theme);
		this.updateMode(this.mode);
	}

	ngOnChanges(changes) {
		if (changes.mode && changes.mode.currentValue) {
			this.mode = changes.mode.currentValue;
			this.updateMode(this.mode);
		}
		if (changes.theme && changes.theme.currentValue) {
			this.theme = changes.theme.currentValue;
			this.updateTheme(this.theme);
		}
	}

	updateTheme(themeName) {
		const theme = themes[themeName];
		const oldThemeNmae = document.body.getAttribute('data-theme-name');
		if (oldThemeNmae) {
			this.renderer2.removeClass(document.body, oldThemeNmae);
		}
		this.renderer2.setAttribute(document.body, 'data-theme-name', `${this.theme}-${this.mode}`);
		this.renderer2.addClass(document.body, `${this.theme}-${this.mode}`);
		for (const key in theme) {
			document.body.style.setProperty(key, theme[key]);
		}
	}

	updateMode(modeName) {
		const mode = modes[modeName];
		const oldThemeNmae = document.body.getAttribute('data-theme-name');
		if (oldThemeNmae) {
			this.renderer2.removeClass(document.body, oldThemeNmae);
		}
		this.renderer2.setAttribute(document.body, 'data-theme-name', `${this.theme}-${this.mode}`);
		this.renderer2.addClass(document.body, `${this.theme}-${this.mode}`);
		for (const key in mode) {
			document.body.style.setProperty(key, mode[key]);
		}
	}

	setStyle(element, styles: any = {}) {
		if (element) {
			Object.keys(styles).map((key) => {
				this.renderer2.setStyle(element, key, styles[key]);
			});
		}
	}

	checkMode() {
		if (this.mode === 'system') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this.mode = 'dark';
			} else {
				this.mode = 'light';
			}
		}
	}
}
