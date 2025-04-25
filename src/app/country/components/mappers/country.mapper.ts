import { Country } from '../../interfaces/country.interface';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish Name',
      capital: restCountry.capital.join(', '),
      population: restCountry.population,
    };
  }

  static mapRestToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestToCountry);
  }
}
