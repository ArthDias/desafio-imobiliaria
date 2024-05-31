import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisListaComponent } from './imoveis-lista.component';

describe('ImoveisListaComponent', () => {
  let component: ImoveisListaComponent;
  let fixture: ComponentFixture<ImoveisListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImoveisListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImoveisListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
