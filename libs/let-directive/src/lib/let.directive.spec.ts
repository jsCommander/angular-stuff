import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { LetDirectiveModule } from './let-directive.module';

describe('LetDirective', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  @Component({
    template: `<div *asLet="data$ | async as data">
      <span class="data-value">{{ data }}</span>
    </div>`,
  })
  class TestHostComponent {
    data$ = new Subject<string>();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [LetDirectiveModule],
    });

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Render template even if stream return null or undefined', () => {
    const dataValue = debugElement.query(By.css('.data-value'))
      .nativeElement as HTMLElement;
    expect(dataValue).toBeDefined();
    expect(dataValue.textContent).toBe('');
  });

  it('Render template with value from stream', () => {
    const text1 = 'some_text';
    const text2 = 'some_text';
    const dataValue = debugElement.query(By.css('.data-value'))
      .nativeElement as HTMLElement;

    hostComponent.data$.next(text1);
    fixture.detectChanges();
    expect(dataValue).toBeDefined();
    expect(dataValue.textContent).toBe(text1);

    hostComponent.data$.next(text2);
    fixture.detectChanges();
    expect(dataValue).toBeDefined();
    expect(dataValue.textContent).toBe(text2);
  });
});
