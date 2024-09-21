import { Component, model } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector    : 'app-add-task',
  standalone  : true,
  imports     : [ SidebarModule ],
  templateUrl : './add-task.component.html',
  styleUrl    : './add-task.component.scss'
})
export class AddTaskComponent {
  $sidebarVisible = model(false);
}
