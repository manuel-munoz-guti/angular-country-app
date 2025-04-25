import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../components/mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string){
    query = query.trim().toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestToCountries(restCountries)),
        catchError((err) => {
          return throwError( () => new Error(`No se pudo obtener paises con el query: ${query}`));
        })
      );
  }

  searchByCountry( query: string){
    query = query.trim().toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestToCountries(restCountries)),
      delay(1000),
      catchError((err) => {
        return throwError( () => new Error(`No se pudo obtener paises con el query: ${query}`));
      })
    );
  }
}
