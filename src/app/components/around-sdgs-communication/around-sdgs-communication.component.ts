import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-around-sdgs-communication',
  templateUrl: './around-sdgs-communication.component.html',
  styleUrls: ['./around-sdgs-communication.component.css']
})
export class AroundSDGsCommunicationComponent implements OnInit 
{

  constructor() { }

  ngOnInit(): void {
    
  }

  toggleBackground()
  {
    let bodyElement = document.getElementById('body');
    let displayAreaElement = document.getElementById("display-area");
    console.log('bodyElement.style.getPropertyValue("background-image"): *'+bodyElement.style.getPropertyValue("background-image")+"*");
    if ( bodyElement.style.getPropertyValue("background-image")=='url("./assets/pictures/pexels-chevanon-photography-1108099.jpg")') 
    {      
      displayAreaElement.style.removeProperty("background");
      bodyElement.style.removeProperty("background-image");
      bodyElement.style.removeProperty("background-size");
      
    }
    else
    {
      displayAreaElement.style.setProperty("background","rgb(255,255,255,0.5)");      
      bodyElement.style.setProperty("background-image","url(./assets/pictures/pexels-chevanon-photography-1108099.jpg)");  
      bodyElement.style.setProperty("background-size","cover");   
    }
  }

}
