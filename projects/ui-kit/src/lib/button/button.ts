import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [ngClass]="variant"
      [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button { padding: 10px 16px; border-radius: 6px; border: none; }
    .primary { background: #1976d2; color: white; }
    .danger { background: #d32f2f; color: white; }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'danger' = 'primary';
  @Input() disabled = false;
}
