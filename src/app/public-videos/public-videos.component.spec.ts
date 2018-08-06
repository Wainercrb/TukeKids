import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicVideosComponent } from './public-videos.component';

describe('PublicVideosComponent', () => {
  let component: PublicVideosComponent;
  let fixture: ComponentFixture<PublicVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
