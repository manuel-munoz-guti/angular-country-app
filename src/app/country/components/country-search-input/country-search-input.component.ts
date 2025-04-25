import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  value = output<string>(); // el valor que va a emitir el componente
  placeholder = input<string>('Buscar'); // valor por defecto es Buscar
}
