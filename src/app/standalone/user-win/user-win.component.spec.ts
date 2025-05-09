import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWinComponent } from './user-win.component';

describe('UserWinComponent', () => {
  let component: UserWinComponent;
  let fixture: ComponentFixture<UserWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
