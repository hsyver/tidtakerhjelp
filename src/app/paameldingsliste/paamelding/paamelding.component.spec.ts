import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaameldingComponent } from './paamelding.component';

describe('PaameldingComponent', () => {
  let component: PaameldingComponent;
  let fixture: ComponentFixture<PaameldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaameldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaameldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
