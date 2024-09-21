import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, inject, Signal,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';

import { homeSignalStore } from '../../../stores/home/home.signal-store';
import { tags, TEditTasks, TTaskData, TTaskStatus, TUser } from '../../../types/home.type';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector   : 'app-kanban',
  standalone : true,
  imports    : [
    MultiSelectModule,
    ButtonModule,
    DividerModule,
    FloatLabelModule,
    CalendarModule,
    TagModule,
    AvatarGroupModule,
    AvatarModule,
    DatePipe,
    KeyValuePipe,
    FormsModule,
    InputTextareaModule,
    SidebarModule,
    AddTaskComponent
  ],
  templateUrl : './kanban.component.html',
  styleUrl    : './kanban.component.scss'
})
export class KanbanComponent {
  private readonly homeSignalStore = inject(homeSignalStore);

  /** ユーザ */
  $user: Signal<TUser> = this.homeSignalStore.user;

  /** タスク一覧 */
  $tasks: Signal<TTaskData[]> = this.homeSignalStore.tasks;

  /** 編集中のタスク */
  $editTasks: Signal<TEditTasks> = this.homeSignalStore.editingTasks;

  /** サイドバー */
  $sidebarVisible = signal(false);

  /** タグ一覧 */
  tags = tags;

  /** タスクのステータス */
  taskStatus: TTaskStatus[] = [
    'Ready','Progress','Review','Done' 
  ];

  /** タスクのステータスに応じた色を設定する。*/
  taskStatusColor: {[key in TTaskStatus]: string } = {
    Ready    : 'text-slate-400',
    Progress : 'text-cyan-700',
    Review   : 'text-amber-600',
    Done     : 'text-lime-600'
  }

  /**
   * 修正中のタスクをキャンセルする。
   * @param taskId 
   */
  onClickCancelEditingTask = (taskId:number):void => {
    this.homeSignalStore.cancelEditingTask(taskId,this.$editTasks());
  }

  /**
   * 与えられたステータスのタスクの数を取得する。
   * @param taskStatus 
   * @returns number
   */
  getStatusTaskCnt = (taskStatus:TTaskStatus):number => this.$tasks().filter(task => task.status === taskStatus).length;

  /**
   * ユニークなIDを生成する。
   * @returns 
   */
  generateRandomId = ():number => {
    return Math.floor(Math.random() * 1000000000); // 10桁の乱数
  }

  /**
   * サイドバーを表示する。
   */
  onClickShowSidebar = ():void => this.$sidebarVisible.set(true);
  

  /**
   * タスクを追加する。
   * @param taskStatus 
   */
  onClickShowAddTask = (taskStatus:TTaskStatus) :void => {
    const taskId : number = this.generateRandomId();
    this.homeSignalStore.addTask({
      status      : taskStatus,
      id          : taskId,
      title       : '',
      description : '',
      members     : [ this.$user() ],
      tags        : [],
      rangeDate   : [
        new Date(), 
        new Date(new Date().setDate(new Date().getDate() + 7)) 
      ]
    },
    this.$editTasks()
    );
  }

  /**
   * タスクを保存する。
   * @param taskId 
   */
  onClickSaveTask = (taskId:number):void => {
    this.homeSignalStore.saveTask({taskId,tasks: this.$tasks(),editTasks: this.$editTasks()});
  }
}
