import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListPageComponent } from './TodoListPage.component';

describe('AddCategoryComponent', () => {
  let component: ToDoListPageComponent;
  let fixture: ComponentFixture<ToDoListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
