import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { MarkdownPipe } from '../../../../shared/pipes/markdown.pipe';
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
    ButtonModule,
    TagModule,
    MarkdownPipe,
    AsyncPipe,
    MenuModule,
    TooltipModule
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

  /** タスクを編集モードに切り替えたか */
  $isClickEditMode = model(false);

  $detailEditTask = { ...this.$detailTask }

  /** タグ一覧 */
  tags = tags;

  /** タスクステータスのスタイルカラー */
  taskStatusColor = taskStatusColor;

  /** サイドバーのメニューアイテム */
  detailTaskItems : MenuItem[] = [
    {
      label : 'Options',
      items : [
        {
          label   : 'Edit',
          icon    : 'pi pi-pen-to-square',
          command : () => this.onClickEditMode()
        },
        {
          label   : 'Delete',
          icon    : 'pi pi-trash',
          command : () => this.onClickDeleteTask()
        }
      ]
    }
  ]

  /** サイドバーが閉じた時の関数 */
  onHideSidebar = ():void => { this.homeSignalStore.delDetailTask(undefined) }

  /** サイドバーを閉じる関数 */
  onClickCloseSidebar = ():void => {
    if(this.$isClickEditMode()){
      this.$isClickEditMode.set(false);
      this.$editMode.update((v) => !v);
      return
    }
    this.$sidebarVisible.set(false);
  }

  /** 編集モード */
  onClickEditMode = ():void => {
    this.$editMode.update((v) => !v);
    this.$isClickEditMode.set(true);
  }

  /** タスクを削除する */
  onClickDeleteTask = ():void => {
    this.homeSignalStore.deleteTask({task: this.$detailTask(),tasks: this.homeSignalStore.tasks()});
    this.$sidebarVisible.set(false);
  }

  /** 編集したタスクを保存する */
  onClickSaveTask = ():void => {
    const detailTask = this.$detailTask();
    if(!typeGuard.isTTaskData(detailTask)){
      return
    }
    this.homeSignalStore.saveDetailTask({detailTask,tasks: this.homeSignalStore.tasks()})
    this.onClickEditMode();
  }
}