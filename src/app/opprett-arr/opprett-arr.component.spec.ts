import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpprettArrComponent } from './opprett-arr.component';

describe('OpprettArrComponent', () => {
  let component: OpprettArrComponent;
  let fixture: ComponentFixture<OpprettArrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpprettArrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpprettArrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
