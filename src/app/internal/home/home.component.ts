import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { homeSignalStore } from '../stores/home.signal-store';
import { tags, TEditingTasks, TTaskData, TTaskStatus, TUser } from '../types/home.type';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    ButtonModule,
    AvatarModule ,
    AvatarGroupModule,
    TagModule,
    DatePipe,
    InputTextareaModule,
    FloatLabelModule,
    FormsModule,
    CalendarModule,
    KeyValuePipe,
    DividerModule,
    MultiSelectModule,
    ToastModule,
  ],
  animations: [
    // サイドバーのアニメーション
    // 今後使う予定があるので残しておく。
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

  $user: Signal<TUser> = this.homeSignalStore.user;

  $tasks: Signal<TTaskData[]> = this.homeSignalStore.tasks;

  $editingTasks: Signal<TEditingTasks> = this.homeSignalStore.editingTasks;

  tags = tags;

  taskStatus: TTaskStatus[] = [
    'Ready','Progress','Review','Done' 
  ];

  taskStatusColor: {[key in TTaskStatus]: string } = {
    Ready    : '#de89ea',
    Progress : '#46bd83',
    Review   : '#07a0f7',
    Done     : '#f3dff5'
  }

  tmpValue: Date = new Date();

  onClickCancelEditingTask = (taskId:number):void => {
    this.homeSignalStore.cancelEditingTask(taskId,this.$editingTasks());
  }

  getMaxNumberEditingTask = (editingTasks:TEditingTasks):number => {
    return Object.keys(editingTasks).map((key) => parseInt(key)).reduce((a,b) => Math.max(a,b),0);
  }

  /**
   * ユニークなIDを生成する。
   * @returns 
   */
  generateRandomId = ():number => {
    return Math.floor(Math.random() * 1000000000); // 10桁の乱数
  }
  

  onClickShowAddTask = (taskStatus:TTaskStatus) :void => {
    this.homeSignalStore.showAddTask({
      status      : taskStatus,
      id          : this.generateRandomId(),
      title       : '',
      description : '',
      members     : [ this.$user() ],
      tags        : [],
      startDate   : new Date(),
      endDate     : new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    this.$editingTasks()
    );
  }

  onClickSaveTask = (taskId:number):void => {
    this.homeSignalStore.saveTask({taskId,tasks: this.$tasks(),editingTasks: this.$editingTasks()});
  }
}
