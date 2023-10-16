import { Component, HostListener, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DateAdapter } from '@angular/material/core';




@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})




export class PriceComponent implements OnInit {

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  lotteries: any = [];
  dString: string;
  selectedDate: any;

  getLotteries() {
    this.dataService.getLotteries().subscribe(data =>{
      if(data.length > 0){
        this.lotteries = data;
          this.dataSource = this.lotteries;
          
      } 
    })
  }
  

  ngOnInit(): void {

    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.getLotteries();
    this.getCurrentDate();
    
  }
  displayedColumns: string[] = ['number', 'count', 'set', 'name', 'date'];
  dataSource = this.lotteries;

  getCurrentDate() {
    let d = new Date();
    let tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    if (d.getHours() >= 15) {
      d = tomorrowDate;
    }
    let month = d.getMonth()+1;
    this.dString = d.getDate()+'/'+month+'/'+d.getFullYear();
  }

  selectDate() {
    let d = this.selectedDate;
    let month = d.getMonth()+1;
    this.dString = d.getDate()+'/'+month+'/'+d.getFullYear();
    let data = {"date": this.dString}
    this.dataService.getLotteriesByDate(data).subscribe(data =>{
      //if(data.length > 0){
        this.lotteries = data;
          this.dataSource = this.lotteries;
          
      //} 
    })
  }




}
