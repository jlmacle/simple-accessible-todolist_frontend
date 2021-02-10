import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-around-sdgs-communication',
  templateUrl: './around-sdgs-communication.component.html',
  styleUrls: ['./around-sdgs-communication.component.css']
})
export class AroundSDGsCommunicationComponent implements OnInit {

  backgroundPictureIsDiplayed:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleBackground()
  {
    let bodyElement = document.getElementById('body');
    if (this.backgroundPictureIsDiplayed==false) 
    {      
      bodyElement.style.setProperty("background-image","url(./assets/pictures/pexels-chevanon-photography-1108099.jpg)");     
      this.backgroundPictureIsDiplayed = true;
    }
    else
    {
      bodyElement.style.setProperty("background-image","");  
      this.backgroundPictureIsDiplayed = false;   
    }
  }

}
