import { Directive, Input, Inject } from '@angular/core';
import { themes } from './themes.const';

@Directive({
	selector: '[ThemeSwitcher]'
})
export class ThemeSwitcherDirective {
	@Input() mode: 'dark' | 'light' | 'system' = 'system';

	constructor() {}

	ngOnInit() {
		this.checkMode();
		this.updateTheme(this.mode);
	}

	ngOnChanges(changes) {
		if (changes.mode && changes.mode.currentValue) {
			this.mode = changes.mode.currentValue;
			this.updateTheme(this.mode);
		}
	}

	updateTheme(themeName) {
		const theme = themes[themeName];
		for (const key in theme) {
			document.body.style.setProperty(key, theme[key]);
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
