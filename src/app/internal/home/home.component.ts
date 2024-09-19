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
import { TabViewModule } from 'primeng/tabview';
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
    TabViewModule
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

  /** ユーザ */
  $user: Signal<TUser> = this.homeSignalStore.user;

  /** タスク一覧 */
  $tasks: Signal<TTaskData[]> = this.homeSignalStore.tasks;

  /** 編集中のタスク */
  $editingTasks: Signal<TEditingTasks> = this.homeSignalStore.editingTasks;

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
    this.homeSignalStore.cancelEditingTask(taskId,this.$editingTasks());
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
   * タスクを追加する。
   * @param taskStatus 
   */
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

  /**
   * タスクを保存する。
   * @param taskId 
   */
  onClickSaveTask = (taskId:number):void => {
    this.homeSignalStore.saveTask({taskId,tasks: this.$tasks(),editingTasks: this.$editingTasks()});
  }
}
