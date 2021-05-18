import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AroundSDGsCommunicationComponent} from './around-sdgs-communication.component';

describe('AroundSDGsCommunicationComponent', () => {
  let component: AroundSDGsCommunicationComponent;
  let fixture: ComponentFixture<AroundSDGsCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AroundSDGsCommunicationComponent],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AroundSDGsCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
