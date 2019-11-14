import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventViewComponent } from './admin-event-view.component';

describe('AdminEventViewComponent', () => {
  let component: AdminEventViewComponent;
  let fixture: ComponentFixture<AdminEventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
