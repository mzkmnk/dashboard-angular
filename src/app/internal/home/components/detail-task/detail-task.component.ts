import { DatePipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
import { tags, taskStatusColor, typeGuard } from '../../../types/home.type';
@Component({
  selector   : 'app-detail-task',
  standalone : true,
  imports    : [
    SidebarModule,
    InputTextModule,
    FormsModule,
    DatePipe,
    CalendarModule,
    MultiSelectModule,
    ChipModule,
    InputTextareaModule,
    TabViewModule,
    ButtonModule
  ],
  templateUrl : './detail-task.component.html',
  styleUrl    : './detail-task.component.scss',
})
export class DetailTaskComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);

  /** ユーザ */
  $user = this.homeSignalStore.user;

  /** サイドバーに表示するタスクの情報 */
  $detailTask = this.homeSignalStore.detailTask;

  /** サイドバー表示かどうか */
  $sidebarVisible = model(false);

  /** 編集モードかどうか */
  $editMode = model(false);

  /** タグ一覧 */
  tags = tags;

  /** タスクステータスのスタイルカラー */
  taskStatusColor = taskStatusColor;

  /** サイドバーが閉じた時の関数 */
  onHideSidebar = ():void => { this.homeSignalStore.delDetailTask(undefined) }

  /** サイドバーを閉じる関数 */
  closeSidebar = ():void => { this.$sidebarVisible.set(false) }

  onClickSaveTask = ():void => {
    const detailTask = this.$detailTask();
    console.log(typeGuard.isTTaskData(detailTask))
    if(typeGuard.isTTaskData(detailTask)){
      this.homeSignalStore.saveDetailTask({detailTask,tasks: this.homeSignalStore.tasks()})
      this.closeSidebar();
    }
  }
}