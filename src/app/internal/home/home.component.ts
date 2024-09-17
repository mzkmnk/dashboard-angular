import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, computed, inject, Signal, signal,  WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';

import { homeSignalStore } from '../stores/home.signal-store';
import { tags, TCustomMeterItem, TEditingTasks, TTaskData, TTaskStatus, TUser } from '../types/home.type';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    ButtonModule,
    AvatarModule ,
    AvatarGroupModule,
    TagModule,
    DatePipe,
    MeterGroupModule,
    InputTextareaModule,
    FloatLabelModule,
    FormsModule,
    CalendarModule,
    KeyValuePipe,
    DividerModule,
    MultiSelectModule,
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

  $user: Signal<TUser> = this.homeSignalStore.user;

  $tasks: Signal<TTaskData[]> = this.homeSignalStore.tasks;

  $editingTasks: Signal<TEditingTasks> = this.homeSignalStore.editingTasks;

  $isOpenTaskStatusSidebar: WritableSignal<boolean> = signal<boolean>(false);

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

  $statusMeterItems: Signal<TCustomMeterItem[]> = computed(() => this.getStatusRatio(this.$tasks()));

  $tagsMeterItems: Signal<MeterItem[]> = computed(() => this.getTagRatio(this.$tasks()));

  tmpValue: Date = new Date();

  /**
   * サイドバーの表示非表示を切り替える。
   * @returns 
   */
  onClickIsOpenTaskStatusSidebar = ():void => this.$isOpenTaskStatusSidebar.update((value) => !value);

  /**
   * 全てのタスクのステータスの割合を取得する。
   * @param tasksStatus 
   * @returns 
   */
  getStatusRatio = (tasksStatus: TTaskData[]):TCustomMeterItem[] => {
    const meterItems : TCustomMeterItem[] = [
      {label: 'Ready',value: tasksStatus.filter((task) => task.status === 'Ready').length,color: this.taskStatusColor.Ready},
      {label: 'Progress',value: tasksStatus.filter((task) => task.status === 'Progress').length,color: this.taskStatusColor.Progress},
      {label: 'Review',value: tasksStatus.filter((task) => task.status === 'Review').length,color: this.taskStatusColor.Review},
      {label: 'Done',value: tasksStatus.filter((task) => task.status === 'Done').length,color: this.taskStatusColor.Done}
    ];
    return meterItems;
  }

  /**
   * 全てのタグの割合を取得する。
   * @param tasksStatus 
   * @returns 
   */
  getTagRatio = (tasksStatus: TTaskData[]):MeterItem[] => {
    const tags = new Set(tasksStatus.map((task) => task.tags).flat());
    const meterItems : MeterItem[] = [];
    tags.forEach((tag) => {
      const tagCount = tasksStatus.filter((task) => task.tags.includes(tag)).length;
      meterItems.push({
        label : tag.name,
        value : tagCount,
        color : this.getRandomColor()
      });
    });
    return meterItems;
  }

  /**
   * 適当なカラーコードを生成する。
   * @returns 
   */
  getRandomColor = () : string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * タスクが編集中かどうかを判定する。
   * @param task 
   * @param editingTasks 
   * @returns 
   */
  includeEditingTask = (task:TTaskData,editingTasks:TEditingTasks):boolean => {
    return Object.keys(editingTasks).includes(task.id.toString());
  }

  onClickCancelEditingTask = (taskId:number):void => {
    this.homeSignalStore.cancelEditingTask(taskId,this.$editingTasks());
  }

  onClickShowAddTask = (taskStatus:TTaskStatus) :void => {
    this.homeSignalStore.showAddTask({
      status        : taskStatus,
      id            : this.$tasks().length,
      title         : '',
      description   : '',
      members       : [ this.$user() ],
      tags          : [],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    this.$editingTasks()
    );
  }

  onClickSaveTask = (taskId:number):void => {
    this.homeSignalStore.saveTask({taskId,tasks: this.$tasks(),editingTasks: this.$editingTasks()});
  }
}
