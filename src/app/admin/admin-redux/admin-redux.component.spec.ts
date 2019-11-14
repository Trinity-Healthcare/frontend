import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReduxComponent } from './admin-redux.component';

describe('AdminReduxComponent', () => {
  let component: AdminReduxComponent;
  let fixture: ComponentFixture<AdminReduxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReduxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
