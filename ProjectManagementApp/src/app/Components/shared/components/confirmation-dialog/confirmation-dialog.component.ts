// confirmation-dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Input() confirmButtonText: string = 'Yes';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() show: boolean = false; // control visibility from parent

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
    this.show = false;
  }

  onCancel() {
    this.canceled.emit();
    this.show = false;
  }
}
