import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface Bikes {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.bikes = await this.loadBikes();
  }
 
  async loadBikes() {
    let bikes= JSON.parse(localStorage.getItem('inventory'));
    if (bikes && bikes.length > 0) {
    } else {
      bikes= await this.loadBikesFromJson();
    }
    this.bikes = bikes;
    return bikes;
  }
  async loadBikesFromJson() {
    const bikes= await this.http.get('assets/inventory.json').toPromise();
    return bikes.json();
  }
  addBike1() {
    this.bikes.push({
      "id": 1,
      "image": "../../assets/bike1.jpeg",
      "description": "Test Model 1",
      "price": 5000,
      "quantity": 1
    });
  }
 
  addBike2() {
    this.bikes.push({
      "id": 2,
      "image": "../../assets/bike2.jpeg",
      "description": " Model 2",
      "price": 4000,
      "quantity": 1
    });
  }
 
  addBike3() {
    this.bikes.push({
      "id": 3,
      "image": "../../assets/bike3.jpeg",
      "description": "Test Model 3",
      "price": 3000,
      "quantity": 1
    });
  }
  deleteBikes(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage();
 }
 saveToLocalStorage() {
  localStorage.setItem('bikes', JSON.stringify(this.bikes));
}

toastMessage() {
  this.toastService.showToast('success', 5000, 'Success: Items saved!');
}

}
