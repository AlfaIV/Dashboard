import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() btnText: string = 'Кнопка';
  @Output() btnClick: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
