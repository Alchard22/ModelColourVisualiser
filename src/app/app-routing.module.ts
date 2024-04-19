import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShopComponent } from './pages/Shop/Shop.component';

const routes: Routes = [
  {
    path: 'Shop',
    component: ShopComponent
  },
  { path: '', redirectTo: 'Shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
