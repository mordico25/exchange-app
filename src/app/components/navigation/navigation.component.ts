import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navigations:{text:string,navigateTo:string}[] =[
    {text:"Currency Converter",navigateTo:"/converter"},
    {text:"About",navigateTo:"/about"}
  ]
}
