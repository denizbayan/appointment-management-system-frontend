import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsyDictionaryComponent } from './psy-dictionary.component';

describe('PsyDictionaryComponent', () => {
  let component: PsyDictionaryComponent;
  let fixture: ComponentFixture<PsyDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsyDictionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsyDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
