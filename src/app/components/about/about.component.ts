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
    return this.converterService.history;
  }
}
