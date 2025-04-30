import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  // isLoading = signal<boolean>(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);


  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchByCapital(request.query);
    },
  });

  // onSearch(query: string) { // metodo que es llamado desde el HTML
  //   if (query === '') return; // si ya esta cargando no hace nada
  //   if (this.isLoading()) return; // si ya esta cargando no hace nada

  //   this.isLoading.set(true);
  //   this.isError.set(null); // resetea el error

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false); // setea el loading a false
  //       this.countries.set(countries); // setea los paises
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false); // setea el loading a false
  //       this.isError.set(err); // setea el error
  //       this.countries.set([]); // resetea los paises
  //     }
  //   });
  // }
}
