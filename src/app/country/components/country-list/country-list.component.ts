import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],  // Decimal pipe son helper classes en angular que ayudan a hacer cambios visuales
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries = input.required<Country[]>(); // el valor que va a recibir el componente
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
