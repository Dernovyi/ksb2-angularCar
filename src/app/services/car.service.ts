import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../car-list/car';




@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:8080/api/cars';
  constructor(private httpClient: HttpClient) { }

  public getCarList(start: number, end: number): Observable<{}>{
    return this.httpClient.get<Car[]>(`${this.baseUrl}/${start}/${end}`);
  }
  public getYears(): Observable<number[]>{
    return this.httpClient.get<number[]>(this.baseUrl + '/years');
  }

  // tslint:disable-next-line:ban-types
  public addCar(car: Car): Observable<Object>{
    return this.httpClient.post(this.baseUrl, car);
  }

  getCarById(id: Observable<number>): Observable<Car>{
    return this.httpClient.get<Car>(`${this.baseUrl}/${id}`);
  }
  // tslint:disable-next-line:ban-types
  updateCar(car: Car): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}`, car);
  }

  deleteCar(id: number): Observable<Car>{
    return this.httpClient.delete<Car>(`${this.baseUrl}/${id}` );
  }
}
