import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppClientComponent } from './edit-app-client.component';

describe('EditAppClientComponent', () => {
  let component: EditAppClientComponent;
  let fixture: ComponentFixture<EditAppClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
