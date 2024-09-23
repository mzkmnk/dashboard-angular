import { DatePipe, KeyValuePipe } from '@angular/common';
import {Component, inject } from '@angular/core';
import { eachDayOfInterval } from 'date-fns';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
import { TTaskData } from '../../../types/home.type';

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
  calcTaskPostion = (task:TTaskData):TTaskPosition => {
    // w-24 : 6rem; /* 96px */ + border 71らしい
    // 計算方法(beta)
    // x =  71*(startDay-1)
    // startDay = 1
    // endDay = 5
    // width = (71 + (0.25*(endDay-startDay))) * (endDay-startDay)
    const startDate = task.startDate.getDate();
    const endDate = task.endDate.getDate()+1;
    const widthBase = 83;
    this.getCreateMonthDate(2,2025);
    return {
      top   : '2.5px',
      left  : widthBase*(startDate-1) + 'px',
      width : (widthBase + (0.25*(endDate-startDate))) * (endDate-startDate)+1 + 'px',
    }
  }

  /**
   * 与えれたmonthとyearからその月の日付を取得する
   * @param month 
   * @param year 
   */
  getCreateMonthDate = (month:number,year:number):Date[] => {
    return eachDayOfInterval({start: new Date(year,month-1,1),end: new Date(year,month,0)})
  }

  /** 月のその月に対する日付を格納する */
  calendar: {[key in number]:Date[]} = {
    1  : this.getCreateMonthDate(1,2024),
    2  : this.getCreateMonthDate(2,2024),
    3  : this.getCreateMonthDate(3,2024),
    4  : this.getCreateMonthDate(4,2024),
    5  : this.getCreateMonthDate(5,2024),
    6  : this.getCreateMonthDate(6,2024),
    7  : this.getCreateMonthDate(7,2024),
    8  : this.getCreateMonthDate(8,2024),
    9  : this.getCreateMonthDate(9,2024),
    10 : this.getCreateMonthDate(10,2024),
    11 : this.getCreateMonthDate(11,2024),
    12 : this.getCreateMonthDate(12,2024),
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
