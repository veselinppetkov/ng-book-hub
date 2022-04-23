import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPopularComponent } from './weekly-popular.component';

describe('WeeklyPopularComponent', () => {
  let component: WeeklyPopularComponent;
  let fixture: ComponentFixture<WeeklyPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyPopularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
