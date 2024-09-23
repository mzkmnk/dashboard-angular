import { DatePipe, KeyValuePipe } from '@angular/common';
import {Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';

export type TTaskPosition = {
  top   : string,
  left  : string,
  width : string,
}

@Component({
  selector   : 'app-timeline',
  standalone : true,
  imports    : [
    KeyValuePipe,
    DatePipe,
    TagModule,
    DividerModule,
    ChipModule
  ],
  templateUrl : './timeline.component.html',
  styleUrl    : './timeline.component.scss'
})
export class TimelineComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);
  
  $tasks = this.homeSignalStore.tasks;

  $user = this.homeSignalStore.user;

  /**
   * ほんとは引数にタスクを取得してstartDayとendDayなどを計算する
   */
  calcTaskPostion = ():TTaskPosition => {
    // w-24 : 6rem; /* 96px */ + border 71らしい
    // 計算方法(beta)
    // x =  71*(startDay-1)
    // startDay = 1
    // endDay = 5
    // width = (71 + (0.25*(endDay-startDay))) * (endDay-startDay)
    const startDay = 2;
    const endDay = 9 + 1;
    const adjust = 10;
    return {
      top   : '2.5px',
      left  : 71*(startDay-1)+adjust + 'px',
      width : (71 + (0.25*(endDay-startDay))) * (endDay-startDay)-adjust*2 + 'px',
    }
  }

  /** 月のその月に対する日付を格納する */
  calendar: {[key in number]:Date[]} = {
    1 : new Array(31).fill(0).map((_,i) => new Date(2024,0,i+1)),
    2 : new Array(29).fill(0).map((_,i) => new Date(2024,1,i+1)),
  };

  /**
   * タスクの開始日とその日付が一致するかを判定する。
   * @param date 
   * @param taskDate 
   * @returns 
   */
  isStartDate = (date:Date,taskDate:Date):boolean => {
    return date.getTime() === taskDate.getTime()
  }
}
