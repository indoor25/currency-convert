import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyInterface} from "./currency.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getData(): Observable<CurrencyInterface[]> {
    return this.http.get<CurrencyInterface[]>(this.url).pipe(
      catchError(this.handleError<CurrencyInterface[]>('getData', []))
    )
  }
}
