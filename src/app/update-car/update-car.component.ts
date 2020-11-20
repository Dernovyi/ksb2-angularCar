import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';

import {ActivatedRoute, Router} from '@angular/router';
;
import {Observable} from 'rxjs';
import {Car} from '../create-car/create-car.component';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  id: Observable<number>;
  car: Car;
  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.carService.getCarById(this.id).subscribe(data =>
      this.car = data,
      error => console.log(error));
  }

  onSubmit(): void {
    this.carService.updateCar( this.car ).subscribe(data => {
      this.goToCarList();
    }, error => console.log(error));
  }
  goToCarList(): void{
    this.router.navigate(['update-car/:id']);
  }
}
