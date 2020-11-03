import { Component, OnInit } from '@angular/core';
import {Car} from '../car-list/car';
import {CarService} from '../services/car.service';
import {Router} from '@angular/router';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
car: Car = new Car();
  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.saveCar();
    this.goToCarList();
  }
  saveCar(): void{
    this.carService.addCar(this.car).subscribe(data => {
      // console.log(data);
      this.goToCarList();
    },
      error1 => console.log(error1));
  }
  goToCarList(): void{
      this.router.navigate(['/cars']);
  }
}
