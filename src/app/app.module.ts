import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';

import { ShopComponent } from './pages/Shop/Shop.component';

import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [	
    AppComponent,
      ModelComponent,
      ShopComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
