import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { StorageService } from 'src/app/storage.service';
import {Router} from "@angular/router";
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService,private storageService: StorageService, private router: Router) {}

  total: any;

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }

    this.dataService.getTotalSale().subscribe(data =>{
      this.total = data.total;
    })
  }

}
