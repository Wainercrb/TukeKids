import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVideosComponent } from './guest-videos.component';

describe('GuestVideosComponent', () => {
  let component: GuestVideosComponent;
  let fixture: ComponentFixture<GuestVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
