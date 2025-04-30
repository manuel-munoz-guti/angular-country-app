import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  value = output<string>(); // el valor que va a emitir el componente
  placeholder = input<string>('Buscar'); // valor por defecto es Buscar
  debounceTime = input<number>(300);
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // senial que debe ser inicializada

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // si al senial cambia dentro del efecto el efecto se vuvelve a ejecutart

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  });
}
