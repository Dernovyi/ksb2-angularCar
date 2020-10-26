import { Component, OnInit } from '@angular/core';

import {CarService} from '../services/car.service';
import {Car} from './car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carList: Car[];
  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit(): void {
    this.listCars();
  }

  listCars(): void{
    this.carService.getCarList().subscribe(value => {
      this.carList = value;
    });
  }

  updateCar(id: number): void {
    this.router.navigate(['update-car', id]);
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe( data => {
      console.log(data);
      this.listCars();
    });
  }
}

