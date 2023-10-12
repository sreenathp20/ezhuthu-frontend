import { Component, HostListener, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})




export class CreateUserComponent implements OnInit {

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router) {}

  name: string;
  users: any = [];

  getUsers() {
    this.dataService.getUsers().subscribe(data =>{
      if(data.length > 0){
          this.users = data;
          this.dataSource = this.users;
      } 
    })
  }
  

  ngOnInit(): void {

    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.getUsers();
    
  }
  displayedColumns: string[] = ['name'];
  dataSource = this.users;


  createUser(): boolean {
    if(!this.name) {
      alert("Enter user name")
      return false;
    }
    let data = {name: this.name}
    this.dataService.createUser({data}).subscribe(data =>{
      if(data.success){
        this.name = '';
        this.getUsers();
        
      } else {
      }
    })
    return true;

  }



}
