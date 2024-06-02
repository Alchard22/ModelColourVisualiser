import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelInfo } from './interfaces/modelInfo';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  emptyModel: ModelInfo = {
    model: '',
    colour: ''
  }
  private dataSubject = new BehaviorSubject<ModelInfo>(this.emptyModel);

  setData(data: ModelInfo) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
