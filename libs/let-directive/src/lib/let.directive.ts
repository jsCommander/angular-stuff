import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T = unknown> {
  $implicit: T | null;
  asLet: T | null;
}

@Directive({
  selector: '[asLet]',
})
export class LetDirective<T = unknown> {
  @Input()
  set asLet(value: T) {
    this.context.asLet = value;
    this.context.$implicit = value;
  }

  private context: LetContext<T> = { asLet: null, $implicit: null };

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  static ngTemplateContextGuard<T>(
    dir: LetDirective<T>,
    ctx: unknown
  ): ctx is LetDirective<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }
}
