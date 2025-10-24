import { Injectable } from '@angular/core';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages: ToastMessage[] = [];

  show(message: ToastMessage) {
    this.messages.push(message);

    // Auto-remove after 3 seconds
    setTimeout(() => this.remove(message), 3000);
  }

  remove(message: ToastMessage) {
    this.messages = this.messages.filter(m => m !== message);
  }
}
