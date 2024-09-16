import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, inject, signal,  WritableSignal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
import { TagModule } from 'primeng/tag';

import { homeSignalStore } from '../stores/home.signal-store';
import { mockDataAvatars,  tasksData, TCustomMeterItem, TTaskData, TTaskStatus, TUser } from '../types/home.type';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    ButtonModule,
    AvatarModule ,
    AvatarGroupModule,
    TagModule,
    DatePipe,
    MeterGroupModule
  ],
  animations: [
    trigger('sidebarAnimation',[
      state('open',style({
        width   : '25%',
        opacity : 1
      })),
      state('close',style({
        width   : '0%',
        opacity : 0,
        display : 'none',
      })),
      transition('open <=> close',[ animate('250ms ease-out') ])
    ])
  ],
  templateUrl : './home.component.html',
  styleUrl    : './home.component.scss'
})
export class HomeComponent {
  private readonly homeSignalStore = inject(homeSignalStore);

  isOpenTaskStatusSidebar: WritableSignal<boolean> = signal<boolean>(true);


  taskStatus: TTaskStatus[] = [
    'Ready','On Progress','Needs Review','Done' 
  ];

  taskStatusColor: {[key in TTaskStatus]: string } = {
    'Ready'        : '#de89ea',
    'On Progress'  : '#46bd83',
    'Needs Review' : '#07a0f7',
    'Done'         : '#f3dff5'
  }

  statusMeterItems: TCustomMeterItem[];

  tagsMeterItems: MeterItem[];

  constructor(){
    this.homeSignalStore.loadTasks(undefined);
    this.tasksData = this.tasksData.sort((a,b) => a.endDate.getTime() - b.endDate.getTime());
    this.statusMeterItems = this.getStatusRatio(this.tasksData);
    this.tagsMeterItems = this.getTagRatio(this.tasksData);
  }

  onClickIsOpenTaskStatusSidebar = ():void => this.isOpenTaskStatusSidebar.update((value) => !value);

  getStatusRatio = (tasksStatus: TTaskData[]):TCustomMeterItem[] => {
    const meterItems : TCustomMeterItem[] = [
      {label: 'Ready',value: tasksStatus.filter((task) => task.status === 'Ready').length,color: this.taskStatusColor.Ready},
      {label: 'On Progress',value: tasksStatus.filter((task) => task.status === 'On Progress').length,color: this.taskStatusColor['On Progress']},
      {label: 'Needs Review',value: tasksStatus.filter((task) => task.status === 'Needs Review').length,color: this.taskStatusColor['Needs Review']},
      {label: 'Done',value: tasksStatus.filter((task) => task.status === 'Done').length,color: this.taskStatusColor.Done}
    ];
    return meterItems;
  }

  getTagRatio = (tasksStatus: TTaskData[]):MeterItem[] => {
    const tags = new Set(tasksStatus.map((task) => task.tags).flat());
    const meterItems : MeterItem[] = [];
    tags.forEach((tag) => {
      const tagCount = tasksStatus.filter((task) => task.tags.includes(tag)).length;
      meterItems.push({
        label : tag,
        value : tagCount,
        color : this.getRandomColor()
      });
    });
    return meterItems;
  }

  getRandomColor = () : string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // ここからサンプルデータ

  mockDataAvatars: TUser[] = mockDataAvatars;

  tasksData: TTaskData[] = tasksData;
}
