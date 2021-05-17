import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-around-sdgs-communication',
  // 'HTML elements in your template that match this selector become instances of the component.'
  // https://angular.io/guide/what-is-angular#components	
  templateUrl: './around-sdgs-communication.component.html',
  // 'An HTML template that instructs Angular how to render the component.'
  // https://angular.io/guide/what-is-angular#components
  styleUrls: ['./around-sdgs-communication.component.css']
  // 'optional set of CSS styles that define the appearance of the template's HTML elements'
  // https://angular.io/guide/what-is-angular#components
})
export class AroundSDGsCommunicationComponent implements OnInit 
{	// code that drives the component behavior
	// https://angular.io/guide/what-is-angular#components

  constructor() { }

  ngOnInit(): void {
    
  }

  toggleBackground(): void
  {
    const bodyElement = document.getElementById('body');
    const displayAreaElement = document.getElementById('display-area');
    console.log('bodyElement.style.getPropertyValue("background-image"): *'+bodyElement.style.getPropertyValue('background-image')+'*');
    if ( bodyElement.style.getPropertyValue('background-image').includes('photography'))
    {      
      displayAreaElement.style.removeProperty('background');
      bodyElement.style.removeProperty('background-image');
      bodyElement.style.removeProperty('background-size');
      
    }
    else
    {
      displayAreaElement.style.setProperty('background','rgb(255,255,255,0.5)');      
      bodyElement.style.setProperty('background-image','url(./assets/pictures/pexels-chevanon-photography-1108099.jpg)');  
      bodyElement.style.setProperty('background-size','cover');   
    }
  }

}
