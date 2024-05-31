import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisFormComponent } from './imoveis-form.component';

describe('ImoveisFormComponent', () => {
  let component: ImoveisFormComponent;
  let fixture: ComponentFixture<ImoveisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImoveisFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImoveisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
