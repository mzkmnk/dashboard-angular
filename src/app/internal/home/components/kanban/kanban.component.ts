import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, inject, Signal,signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DragDropModule } from 'primeng/dragdrop';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
import {taskStatusColor,TTaskData, TTaskStatus, TUser, typeGuard } from '../../../types/home.type';
import { DetailTaskComponent } from '../detail-task/detail-task.component';

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
    DetailTaskComponent,
    MultiSelectModule,
    DragDropModule
  ],
  templateUrl : './kanban.component.html',
  styleUrl    : './kanban.component.scss'
})
export class KanbanComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);

  /** ユーザ */
  $user: Signal<Partial<TUser>> = this.homeSignalStore.user;

  /** タスク一覧 */
  $tasks: Signal<TTaskData[]> = this.homeSignalStore.tasks;

  /** ドラッグ中のタスク */
  $dragTask: WritableSignal<Partial<TTaskData>> = signal<Partial<TTaskData>>({});

  /** サイドバー */
  $sidebarVisible = signal(false);

  /** 編集モードかどうか */
  $editMode = signal(false);

  /** タスクのステータス */
  taskStatus: TTaskStatus[] = [
    'Ready','Progress','Review','Done' 
  ];

  /** タスクのステータスに応じた色を設定する。*/
  taskStatusColor = taskStatusColor

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
  onClickShowSidebar = (status:TTaskStatus,task:Partial<TTaskData>):void => { 
    this.$sidebarVisible.set(true);
    this.$editMode.set(!typeGuard.isTTaskData(task));
    this.homeSignalStore.addDetailTask(typeGuard.isTTaskData(task)
      ? task
      : {
        id          : this.generateRandomId(),
        status,
        title       : '',
        description : '',
        members     : [],
        tags        : [],
        startDate   : new Date(),
        endDate     : new Date(new Date().setDate(new Date().getDate()+7))
      });
  }

  /** ドラッグしたアイテムをセットする */
  onDragStartTask = (task:Partial<TTaskData>):void => {
    this.$dragTask.set(task);
  }

  /** ドラッグ終了時の関数 */
  onDragEndTask = ():void => {
    this.$dragTask.set({});
  }

  /** タスクをドロップした時の関数 */
  onDropTask = (taskStatus:TTaskStatus):void => {
    console.log(taskStatus);
    this.homeSignalStore.dropTask({task: this.$dragTask(),tasks: this.$tasks(),taskStatus});
    this.$dragTask.set({});
  }
}