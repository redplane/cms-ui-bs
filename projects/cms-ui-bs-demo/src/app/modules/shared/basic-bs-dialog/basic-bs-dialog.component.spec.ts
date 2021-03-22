import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBsDialogComponent } from './basic-bs-dialog.component';

describe('BasicBsDialogComponent', () => {
  let component: BasicBsDialogComponent;
  let fixture: ComponentFixture<BasicBsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
