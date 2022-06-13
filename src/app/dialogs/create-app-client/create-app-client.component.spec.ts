import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppClientComponent } from './create-app-client.component';

describe('CreateAppClientComponent', () => {
  let component: CreateAppClientComponent;
  let fixture: ComponentFixture<CreateAppClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
