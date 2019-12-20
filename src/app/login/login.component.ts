import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { LocalStorageService } from '../localStorageService';

import { Subject } from 'rxjs';
export interface IUser {
  id?: number;
  username: string;
  password: string;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LocalStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  user: IUser = {username: '', password: ''};
  constructor(private router: Router, private toastService: ToastService) {
    this.LocalStorageService = new LocalStorageService('user');
   }

  ngOnInit() {
    this.currentUser = this.LocalStorageService.getItemsFromLocalStorage();
    console.log('this.currentUser....', this.currentUser);
    if(this.currentUser != null) {
      this.router.navigate(['cart']);
    }
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: "mgilletteberg", password: "mike6286"};
    if(user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log the user in
        // store user in localStorage
        this.LocalStorageService.saveItemsToLocalStorage(user);
        // navigate to contacts page
        this.router.navigate(['cart', user]);
      } else {
         //show error toast user
      this.toastService.showToast('danger',  2000, 'username and/or password not matching default user credentials');
      }
    } else {
       //show error toast user
       this.toastService.showToast('danger',  2000,  'username and/or password not specified');
    }
  }
}

