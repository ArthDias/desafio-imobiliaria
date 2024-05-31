import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisDetalhesComponent } from './imoveis-detalhes.component';

describe('ImoveisDetalhesComponent', () => {
  let component: ImoveisDetalhesComponent;
  let fixture: ComponentFixture<ImoveisDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImoveisDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImoveisDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
