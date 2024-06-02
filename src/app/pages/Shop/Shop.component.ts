import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/data-service.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ModelInfo } from 'src/app/interfaces/modelInfo';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Shop',
  templateUrl: './Shop.component.html',
  styleUrls: ['./Shop.component.css']
})
export class ShopComponent implements OnInit {



  constructor(private dataService : DataServiceService, private title: Title) {
    this.title.setTitle('Model Colour Visualiser');
   }
  emptyModel: ModelInfo = {
    model: '',
    colour: ''
  }
  modelData: ModelInfo;
  color: string
  savedModelData: ModelInfo;
  assetName: string;
  ngOnInit() {
     this.savedModelData = JSON.parse(localStorage.getItem('modelData')!) ?? this.emptyModel
     this.color = this.savedModelData.colour;
  }

  sendData(input: ModelInfo){
    this.dataService.setData(input); 
  }

  selector(){ // Receives colour and model, sends colour and model to model component via send data ^
    const Oinput = new Observable((observer) => {
      
    })
      console.log(this.color)

      this.assetName = 'keyboard' // To allow for asset selection in future updates
      this.modelData = {
        model : this.assetName,
        colour : this.color
      }
      this.sendData(this.modelData)


    }
  }
  




