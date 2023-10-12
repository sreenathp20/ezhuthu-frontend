import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router) {}

  hide = true;
  username: any;
  password: any;
  

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
  }

  login() {
    let data = {username: this.username, password: this.password}
    this.dataService.login({data}).subscribe(data =>{
      if(data.success){
        this.storageService.saveUser(data);
        if (this.storageService.isLoggedIn()) {
          this.router.navigate(['/home'])
        }
      } else {
      }
    })
  }

}
