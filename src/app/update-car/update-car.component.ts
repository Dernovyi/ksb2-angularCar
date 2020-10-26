import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';
import {Car} from '../car-list/car';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
   id: Observable<number>;
  car: Car = new Car();
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
    this.carService.updateCar( this.id , this.car ).subscribe(data => {
      this.goToCarList();
    }, error => console.log(error));
  }
  goToCarList(): void{
    this.router.navigate(['/cars']);
  }
}
