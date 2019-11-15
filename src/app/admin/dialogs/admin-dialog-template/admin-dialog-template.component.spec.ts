import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogTemplateComponent } from './admin-dialog-template.component';

describe('AdminDialogTemplateComponent', () => {
  let component: AdminDialogTemplateComponent;
  let fixture: ComponentFixture<AdminDialogTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDialogTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDialogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
