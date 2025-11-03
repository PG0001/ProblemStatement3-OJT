import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsummaryComponent } from './dashboardsummary.component';

describe('DashboardsummaryComponent', () => {
  let component: DashboardsummaryComponent;
  let fixture: ComponentFixture<DashboardsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
