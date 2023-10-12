import { Component, HostListener, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-create-lottery',
  templateUrl: './create-lottery.component.html',
  styleUrls: ['./create-lottery.component.css']
})




export class CreateLotteryComponent implements OnInit {

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router) {}

  number: string;
  count: string;
  type: String = 'set';
  boxGroup: String;
  users: any = [];
  rateControl: any;
  selectedUser: any;
  lotteries: any = [];

  getLotteries() {
    this.dataService.getLotteries().subscribe(data =>{
      if(data.length > 0){
        this.lotteries = data;
          this.dataSource = this.lotteries;
          
      } 
    })
  }
  

  ngOnInit(): void {
    this.rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.dataService.getUsers().subscribe(data =>{
      if(data.length > 0){
          this.users = data;
      } 
    })
    this.getLotteries();
    
  }
  displayedColumns: string[] = ['number', 'count', 'set', 'name', 'date'];
  dataSource = this.lotteries;

  selectUser(id: any) {
    this.selectedUser = id;

  }

  createLottery(): boolean {
    if(this.type == 'set'  && this.number.toString().length != 3) {
      alert("Number length is wrong for set")
      return false;
    }
    if(this.type == 'box' && (this.boxGroup == 'A' || this.boxGroup == 'B' || this.boxGroup == 'B') && this.number.toString().length != 1 ) {
      alert("Number length is wrong for box group :" + this.boxGroup)
      return false;
    }
    if (parseInt(this.number) > 999) {
      alert("please enter a number between 0 and 999");
      return false;
    }
    if (parseInt(this.count) > 500) {
      alert("please enter a number between 0 and 500 for count");
      return false;
    }
    if(this.count == '' || !this.count) {
      alert("Please enter count")
      return false;
    }
    if(this.number == '' || !this.number) {
      alert("Please enter number")
      return false;
    }
    if(!this.selectedUser) {
      alert("Please select user")
      return false;
    }
    let set;
    if(this.type == 'set'){
      set = 'ABC';
    }else {
      set = this.boxGroup;
    }
    let data = {number: this.number, count: this.count, set: set, user: this.selectedUser}
    this.dataService.createLottery({data}).subscribe(data =>{
      if(data.success){
        this.number = '';
        this.count = '';
        this.selectedUser = undefined;
        this.getLotteries();
        
      } else {
      }
    })
    return true;

  }



}
