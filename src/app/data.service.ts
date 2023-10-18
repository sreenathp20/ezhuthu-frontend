import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environments';
import {StorageService} from './storage.service'

const apiUrl = environment.apiUrl;;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getHeader() {
    let user = this.storageService.getUser();  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${user.token}`
        })
      };
    return httpOptions
  }
  

  login(data:any): Observable<any> {
    return this.http.post(apiUrl + '/login/', data);  
  }

  getUsers(): Observable<any> {
    let opts = this.getHeader();
    return this.http.get(apiUrl + '/users/', opts); 

  }
  getPrice(): Observable<any> {
    let opts = this.getHeader();
    return this.http.get(apiUrl + '/price/', opts); 

  }

  deleteLottery(data:any): Observable<any>{
    let opts = this.getHeader();
    return this.http.post(apiUrl + '/delete-lottery/', data, opts);  
  }

  createLottery(data:any): Observable<any>{
    let opts = this.getHeader();
    return this.http.post(apiUrl + '/lottery/', data, opts);  
  }
  createPrice(data:any): Observable<any>{
    let opts = this.getHeader();
    return this.http.post(apiUrl + '/price/', data, opts);  
  }
  createUser(data:any): Observable<any>{
    let opts = this.getHeader();
    return this.http.post(apiUrl + '/users/', data, opts);  
  }

  getLotteries(): Observable<any> {
    let opts = this.getHeader();
    return this.http.get(apiUrl + '/lottery/', opts); 

  }

  getLotteriesByDate(data: any): Observable<any> {
    let opts = this.getHeader();
    return this.http.post(apiUrl + '/lottery-bydate/', data, opts); 

  }

  getTotalSale(): Observable<any> {
    let opts = this.getHeader();
    return this.http.get(apiUrl + '/total-sale/', opts); 

  }

  // updateSimualtionStatus(): Observable<any>{
  //   // if simulation id exists
  //   if(this.commonService.view_simulation_id){
  //     this.commonService.viewSimulationById({'id':this.commonService.view_simulation_id})
  //     .subscribe(
  //       data => {
  //       },
  //       error => {
  //         console.log(error);
          
  //     });         
  //   }
  // }
}

