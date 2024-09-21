import { DatePipe } from '@angular/common';
import { Component, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
import { tags, taskStatusColor } from '../../../types/home.type';
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
    TabViewModule
  ],
  templateUrl : './detail-task.component.html',
  styleUrl    : './detail-task.component.scss',
})
export class DetailTaskComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);

  $user = this.homeSignalStore.user;

  $detailTask = this.homeSignalStore.detailTask;

  $sidebarVisible = model(false);

  /** タグ一覧 */
  tags = tags;

  taskStatusColor = taskStatusColor;

  constructor() {
    effect(() => {
      console.log(this.$detailTask());
    });
  }

  onHideSidebar = ():void => { this.homeSignalStore.delDetailTask(undefined) }
}