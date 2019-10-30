import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminsViewComponent } from './admin-admins-view.component';

describe('AdminAdminsViewComponent', () => {
  let component: AdminAdminsViewComponent;
  let fixture: ComponentFixture<AdminAdminsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
