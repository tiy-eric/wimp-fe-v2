import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAwardFormComponent } from './actor-award-form.component';

describe('ActorAwardFormComponent', () => {
  let component: ActorAwardFormComponent;
  let fixture: ComponentFixture<ActorAwardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorAwardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorAwardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
