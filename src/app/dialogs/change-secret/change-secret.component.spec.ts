import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSecretComponent } from './change-secret.component';

describe('ChangeSecretComponent', () => {
  let component: ChangeSecretComponent;
  let fixture: ComponentFixture<ChangeSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSecretComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
