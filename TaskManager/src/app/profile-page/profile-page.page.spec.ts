import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePagePage } from './profile-page.page';

describe('ProfilePagePage', () => {
  let component: ProfilePagePage;
  let fixture: ComponentFixture<ProfilePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
