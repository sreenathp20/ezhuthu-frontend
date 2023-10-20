import { Component, HostListener, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-create-price',
  templateUrl: './create-price.component.html',
  styleUrls: ['./create-price.component.css']
})




export class CreatePriceComponent implements OnInit {

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router) {}

  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  compliments: any = new Array(30);
  dString: string;
  selectedDate: any;
  numbers: any = [];
  price: any = [];

  trackByIndex(index: number, value: number) {
    // console.log("ngFor");
    // console.log(index);
    // console.log(value);
    return index;
  }


  selectDate() {
    let d = this.selectedDate;
    let month = d.getMonth()+1;
    this.dString = d.getDate()+'/'+month+'/'+d.getFullYear();
    
  }
  

  ngOnInit(): void {

    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.getPrice();
    
    
  }
  getPrice() {
    this.dataService.getPrice().subscribe(data =>{
      if(data.length > 0){
          this.price = data;
          this.boxDataSource = this.price;

      } 
    })
  }
  displayedColumns: string[] = ['date', 'first', 'second', 'third', 'fourth', 'fifth', 'compliments'];
  boxDataSource: any = [];

  autoFocusCompliments(id: any) {
    let nextid = id+1;
    if(this.compliments[id].toString().length == 3) {
      document?.getElementById('compliments'+nextid)?.focus();
    }
  }

  autoFocus(field: any) {
    if(field == 'first') {
      if(this.first.toString().length == 3) {
        document?.getElementById("second")?.focus();
      }
    }
    if(field == 'second') {
      if(this.second.toString().length == 3) {
        document?.getElementById("third")?.focus();
      }
    }
    if(field == 'third') {
      if(this.third.toString().length == 3) {
        document?.getElementById("fourth")?.focus();
      }
    }
    if(field == 'fourth') {
      if(this.fourth.toString().length == 3) {
        document?.getElementById("fifth")?.focus();
      }
    }
    if(field == 'fifth') {
      if(this.fifth.toString().length == 3) {
        document?.getElementById("compliments0")?.focus();
      }
    }
  }


  createPrice(): boolean {
    if(!this.selectedDate) {
      alert("Please select date")
      return false;
    }
    if(!this.first) {
      alert("Please enter first price value")
      return false;
    }
    if(!this.second) {
      alert("Please enter second price value")
      return false;
    }
    if(!this.third) {
      alert("Please enter third price value")
      return false;
    }
    if(!this.fourth) {
      alert("Please enter fourth price value")
      return false;
    }
    if(!this.fifth) {
      alert("Please enter fifth price value")
      return false;
    }
    if(this.first.toString().length != 3) {
      alert("Please enter 3 digit value for first price value")
      return false;
    }
    if(this.second.toString().length != 3) {
      alert("Please enter 3 digit value for second price value")
      return false;
    }
    if(this.third.toString().length != 3) {
      alert("Please enter 3 digit value for third price value")
      return false;
    }
    if(this.fourth.toString().length != 3) {
      alert("Please enter 3 digit value for fourth price value")
      return false;
    }
    if(this.fifth.toString().length != 3) {
      alert("Please enter 3 digit value for fifth price value")
      return false;
    }
    for(let i = 0; i < this.compliments.length; i++) {
      if(!this.compliments[i]) {
        alert("Please enter all compliments value")
        return false;
      }
      if(this.compliments[i].toString().length != 3) {
        alert("Please enter 3 digit value for compliments value")
        return false;
      }
    }
    let set;
    let data: any = {date: this.dString, first: this.first, second: this.second, third: this.third, fourth: this.fourth, fifth: this.fifth, compliments: this.compliments};
    console.log(data);
    this.dataService.createPrice({data}).subscribe(data =>{
      if(data.success){
        this.first = '';
        this.second = '';
        this.third = '';
        this.fourth = '';
        this.fifth = '';
        this.compliments = new Array(30);
        this.getPrice();
        
      } else {
        alert(data.message)
      }
    })
    return true;

  }



}
