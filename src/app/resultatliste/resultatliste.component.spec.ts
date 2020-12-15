import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatlisteComponent } from './resultatliste.component';

describe('ResultatlisteComponent', () => {
  let component: ResultatlisteComponent;
  let fixture: ComponentFixture<ResultatlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
