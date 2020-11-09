import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosideComponent } from './infoside.component';

describe('InfosideComponent', () => {
  let component: InfosideComponent;
  let fixture: ComponentFixture<InfosideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
