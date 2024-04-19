import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/data-service.service';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-Shop',
  templateUrl: './Shop.component.html',
  styleUrls: ['./Shop.component.css']
})
export class ShopComponent implements OnInit {



  constructor(private dataService : DataServiceService) { }
  color: string = '#127bdc';
  ngOnInit() {
    /*
    Subscription to different button presses, alerting component
    */
  }

  sendData(input: string){
    this.dataService.setData(input); 
  }

  selector(){ // Receives colour and model, sends colour and model to model component via send data ^
    const Oinput = new Observable((observer) => {
      
    })
   
      console.log(this.color)
      this.sendData(`keyboard, ${this.color}`)

    }
  }
  




