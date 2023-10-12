import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router, private storageService: StorageService) {}

  navigate(route:any) {
    this.router.navigate(['/'+route])

  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['/login'])
  }

}
