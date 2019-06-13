import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNavsComponent } from './config-navs.component';

describe('ConfigNavsComponent', () => {
  let component: ConfigNavsComponent;
  let fixture: ComponentFixture<ConfigNavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigNavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
