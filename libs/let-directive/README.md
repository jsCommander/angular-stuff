# Let directive

## Description

With \*ngIf directive you can take some value from observable and use it in template.

```html
<div *ngIf="user$ | async as user">
  <!-- if user is null, then you can't see this block-->
  <span>{{ user.name }}</span>
</div>
```

But sometimes you don't want to hide template if value is falsy. You just want to receive some value from observable and use it in template. And \*asLet directive can help you with it.

```html
<div *asLet="user$ | async as user">
  <!-- You always see this block, even if user is null-->
  <span>{{ user.name }}</span>
</div>
```
