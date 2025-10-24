import { Component } from '@angular/core';
import { ToastService } from '../../../../Services/core/services/toast.service';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent {
  constructor(public toastService: ToastService) { }
}
