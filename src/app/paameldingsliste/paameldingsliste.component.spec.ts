import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaameldingslisteComponent } from './paameldingsliste.component';

describe('PaameldingslisteComponent', () => {
  let component: PaameldingslisteComponent;
  let fixture: ComponentFixture<PaameldingslisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaameldingslisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaameldingslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
