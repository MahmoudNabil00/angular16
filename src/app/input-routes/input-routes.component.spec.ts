import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRoutesComponent } from './input-routes.component';

describe('InputRoutesComponent', () => {
  let component: InputRoutesComponent;
  let fixture: ComponentFixture<InputRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputRoutesComponent]
    });
    fixture = TestBed.createComponent(InputRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
