import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorseLightComponent } from './morse-light.component';

describe('MorseLightComponent', () => {
  let component: MorseLightComponent;
  let fixture: ComponentFixture<MorseLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorseLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorseLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
