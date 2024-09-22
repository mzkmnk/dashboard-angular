import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, model, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
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
import { tags, taskStatusColor, TTaskData, typeGuard } from '../../../types/home.type';
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
    TooltipModule,
    ConfirmPopupModule
  ],
  providers   : [ ConfirmationService ],
  templateUrl : './detail-task.component.html',
  styleUrl    : './detail-task.component.scss',
})
export class DetailTaskComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);

  private readonly confirmationService = inject(ConfirmationService);

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

  /** 編集中のタスク */
  $detailEditTask: WritableSignal<Partial<TTaskData>> = signal<Partial<TTaskData>>({});

  /** タグ一覧 */
  tags = tags;

  /** タスクステータスのスタイルカラー */
  taskStatusColor = taskStatusColor;

  constructor(){
    effect(() => (($detailTask):void => {
      this.$detailEditTask.set({...$detailTask()});
    })(this.$detailTask),{allowSignalWrites: true})
  }

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
  onHideSidebar = ():void => {
    this.homeSignalStore.delDetailTask(undefined);
    this.$detailEditTask?.set({});
    this.$editMode.set(false);
  }

  /** サイドバーを閉じる関数 */
  onClickCloseSidebar = ():void => {
    if(this.$isClickEditMode()){
      this.$detailEditTask.set({...this.$detailTask()});
      this.$isClickEditMode.set(false);
      this.$editMode.update((v) => !v);
      return
    }
    this.$sidebarVisible.set(false);
  }

  /** タスクを削除していいか確認するダイアログ */
  deleteTaskConfirm = (event:Event):void => {
    this.confirmationService.confirm({
      target      : event.target as EventTarget,
      message     : 'Are you sure that you want to delete this task?',
      acceptLabel : 'Yes',
      rejectLabel : 'No',
      accept      : () => this.onClickDeleteTask()
    })
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
    const detailEditTask = this.$detailEditTask();
    console.log(detailEditTask)
    if(!typeGuard.isTTaskData(detailEditTask)){
      return
    }
    this.homeSignalStore.saveDetailTask({detailTask: detailEditTask,tasks: this.homeSignalStore.tasks()})
    this.onClickCloseSidebar();
  }
}