import {Component, Input, OnInit} from '@angular/core';

import {CarService} from '../services/car.service';
import {Router} from '@angular/router';
import {maxWorkers} from '@angular-devkit/build-angular/src/utils';
import {element} from 'protractor';






@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  selectedMin: any;
  selectedMax: any;
  carList: {};

  minYears: number[];
  maxYears: number[];
  newMaxList: number[];

  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCarYears();
    this.listCars( 1970, 2020 );
  }
  // tslint:disable-next-line:typedef
  getCarYears(){
    this.carService.getYears().subscribe(value => {
      this.minYears = this.maxYears = value;
    });
  }
  listCars(startYear: number, endYear: number): void{
    this.carService.getCarList(startYear, endYear).subscribe(value => {
      this.carList = value;
    });
  }

  updateCar(id: number): void {
    this.router.navigate(['update-car', id]);
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe( data => {
      this.listCars(this.selectedMin, this.selectedMax);
    });
  }
  // tslint:disable-next-line:typedef
  getCars() {
    this.carService.getCarList(this.selectedMin, this.selectedMax).subscribe(value => {
      this.carList = value;
    });
  }
  // tslint:disable-next-line:typedef
  getLast() {
    if (!this.selectedMax){
      this.selectedMax = this.maxYears.length - 1;
      this.selectedMax = this.maxYears[this.selectedMax];
    }
    this.newMaxList = this.maxYears.filter( n => n >= this.selectedMin && n <= this.selectedMax );
  }

}

