import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  constructor(private converterService:ConverterService){
    
  }
  get lastResults(){
    return JSON.parse(localStorage.getItem('history') as any);//this.converterService.history;
  }
}
