import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  {path:"converter",component:ConverterComponent},
  {path:"about",component:AboutComponent}, 
  {path:"**",component:ConverterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
