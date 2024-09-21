import { Component, inject, model } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
@Component({
  selector    : 'app-detail-task',
  standalone  : true,
  imports     : [ SidebarModule ],
  templateUrl : './detail-task.component.html',
  styleUrl    : './detail-task.component.scss',
})
export class DetailTaskComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);

  $detailTask = this.homeSignalStore.detailTask;

  $sidebarVisible = model(false);

  onHideSidebar = ():void => { this.homeSignalStore.delDetailTask(undefined) }
}

/**
 * @description オブジェクトが完全なオブジェクトかどうかを判定する。
 * @param obj 
 * @returns 
 */
export const isComplete = <T extends object>(obj:Partial<T>):obj is T => Object.keys(obj).length === Object.keys({} as T).length;