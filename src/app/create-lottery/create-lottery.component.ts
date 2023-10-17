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
  ABGroup: any = [];
  AGroup: any = [];
  usersDict:any = {};

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
          for(let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            this.usersDict[user['_id']] = user['name']
          }

      } 
    })
    this.getLotteries();
    
  }
  boxDisplayedColumns: string[] = ['number', 'count', 'set', 'name'];
  displayedColumns: string[] = ['number', 'count', 'set', 'name', 'date'];
  dataSource = this.lotteries;
  boxDataSource: any = [];

  selectUser(id: any) {
    this.selectedUser = id;

  }

  setType() {
    this.ABGroup = [];
    this.AGroup = [];
  }

  boxPreview() {
    if(this.AGroup.length > 0 || this.ABGroup.length > 0) {
      this.type = '';
    }
    this.boxDataSource = [];
    if(this.number.toString().length == 3 && this.type == 'box') {
      let A = this.number.toString()[0];
      let B = this.number.toString()[1];
      let C = this.number.toString()[2];
      let data: any = [];
      if(!(data.includes(A+B+C))) {
        data.push(A+B+C);
        this.boxDataSource.push({number: A+B+C, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      if(!(data.includes(A+C+B))) {
        data.push(A+C+B);
        this.boxDataSource.push({number: A+C+B, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      if(!(data.includes(B+A+C))) {
        data.push(B+A+C);
        this.boxDataSource.push({number: B+A+C, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      if(!(data.includes(B+C+A))) {
        data.push(B+C+A);
        this.boxDataSource.push({number: B+C+A, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      if(!(data.includes(C+A+B))) {
        data.push(C+A+B);
        this.boxDataSource.push({number: C+A+B, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      if(!(data.includes(C+B+A))) {
        data.push(C+B+A);
        this.boxDataSource.push({number: C+B+A, count: this.count, set: 'ABC', name: this.usersDict[this.selectedUser]})
      }
      
    }
  }

  createLottery(): boolean {
    if(!this.number) {
      alert("Please enter Number")
      return false;
    }
    if(this.type == 'set'  && this.number.toString().length != 3) {
      alert("Number length is wrong for set")
      return false;
    }
    if(this.AGroup.length > 0  && this.number.toString().length != 1) {
      alert("Number length is wrong for selection")
      return false;
    }
    if(this.ABGroup.length > 0  && this.number.toString().length != 2) {
      alert("Number length is wrong for selection")
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
    if (parseInt(this.count) > 200) {
      alert("please enter a number between 1 and 200 for count");
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
    let data = [];
    if(this.type == 'set'){
      set = 'ABC';
      data = [{number: this.number, count: this.count, set: set, user: this.selectedUser}]
    }else if(this.type == 'box') {
      for(let i = 0; i < this.boxDataSource.length; i++) {
        let b = this.boxDataSource[i];
        data.push({number: b.number, count: b.count, set: b.set, user: this.selectedUser})
      }
    }else if(this.type == '') {
      for(let i = 0; i < this.AGroup.length; i++) {
        let g = this.AGroup[i];
        data.push({number: this.number, count: this.count, set: g, user: this.selectedUser})
      }
      for(let i = 0; i < this.ABGroup.length; i++) {
        let g = this.ABGroup[i];
        data.push({number: this.number, count: this.count, set: g, user: this.selectedUser})
      }
    }
    console.log(data);
    this.dataService.createLottery({data}).subscribe(data =>{
      if(data.success){
        this.number = '';
        this.count = '';
        this.selectedUser = undefined;
        this.getLotteries();
        this.boxDataSource = [];
        this.type = '';
        this.AGroup = [];
        this.ABGroup = [];
        
      } else {
        alert(data.message)
      }
    })
    return true;

  }



}
