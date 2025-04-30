import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../components/mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string){
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestToCountries(restCountries)), //mapeo que transforma la respuesta
        tap( (countries) => this.queryCacheCapital.set(query,countries)),// tapeo lo que hace es activa un efecto secundario
        catchError((err) => {
          return throwError( () => new Error(`No se pudo obtener paises con el query: ${query}`));
        })
      );
  }

  searchByCountry(query: string){
    query = query.trim().toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestToCountries(restCountries)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError((err) => {
        return throwError( () => new Error(`No se pudo obtener paises con el query: ${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string){
    code = code.trim().toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestToCountries(restCountries)),
      map((countries) => countries.at(0)),
      catchError((err) => {
        return throwError( () => new Error(`No se pudo obtener paises con ese codig: ${code}`));
      })
    );
  }

  searchByRegion(region: Region){

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestToCountries(restCountries)),
      tap((countries) => this.queryCacheCountry.set(region, countries)),
      catchError((err) => {
        return throwError( () => new Error(`No se pudo obtener paises de la region: ${region}`));
      })
    );
  }
}
