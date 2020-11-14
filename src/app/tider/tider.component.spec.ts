import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiderComponent } from './tider.component';

describe('TiderComponent', () => {
  let component: TiderComponent;
  let fixture: ComponentFixture<TiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
