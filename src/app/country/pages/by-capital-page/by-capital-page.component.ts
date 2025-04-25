import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  isLoading = signal<boolean>(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) { // metodo que es llamado desde el HTML
    if (this.isLoading()) return; // si ya esta cargando no hace nada

    this.isLoading.set(true);
    this.isError.set(null); // resetea el error

    this.countryService.searchByCapital(query)
    .subscribe({
      next: (countries) => {
        this.isLoading.set(false); // setea el loading a false
        this.countries.set(countries); // setea los paises
      },
      error: (err) => {
        this.isLoading.set(false); // setea el loading a false
        this.isError.set(err); // setea el error
        this.countries.set([]); // resetea los paises
      }
    });
  }
}
