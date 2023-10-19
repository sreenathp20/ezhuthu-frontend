import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { StorageService } from 'src/app/storage.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) {}

  user: any;
  name: any;

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.name = environment.name;
  }

  navigate(route:any) {
    this.router.navigate(['/'+route])

  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['/login'])
  }

}
