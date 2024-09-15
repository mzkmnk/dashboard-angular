import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

export type AvatarInterface = {
  path  : string,
  label : string,
  size  : 'large' | 'normal' | 'xlarge' | undefined,
  shape : 'square' | 'circle' | undefined,
  style : {
    [key in string]:string
  } 
}

export type TaskStatus = 'Ready' | 'On Progress' | 'Needs Review' | 'Done';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    ButtonModule,AvatarModule 
  ],
  templateUrl : './home.component.html',
  styleUrl    : './home.component.scss'
})
export class HomeComponent {
  mockDataAvatars: AvatarInterface[] = [
    {
      path  : 'assets/icons/icon1.jpg',
      label : 'M',
      size  : 'large',
      style : { 'background-color': '#ece9fc' },
      shape : 'circle'
    },
    {
      path  : 'assets/icons/icon2.jpg',
      label : 'S',
      size  : 'large',
      style : { 'background-color': '#dee9fc' },
      shape : 'circle'
    }
  ]

  taskStatus: TaskStatus[] = ['Ready','On Progress','Needs Review','Done'];

  TaskData: {status:TaskStatus}[] = [
    {
      status:'Done'
    },
    {
      status:'Ready'
    }
  ]
}
