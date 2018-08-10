import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAllComponent } from './poll-all.component';

describe('PollAllComponent', () => {
  let component: PollAllComponent;
  let fixture: ComponentFixture<PollAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
