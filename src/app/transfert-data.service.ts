import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransfertDataService {
  private data: any;
  constructor() { }
  public setData(data){
    this.data = data;
  }
  public getData(){
    return this.data;
  }
}