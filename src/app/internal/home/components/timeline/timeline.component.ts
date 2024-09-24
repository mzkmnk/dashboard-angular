import { DatePipe, KeyValuePipe } from '@angular/common';
import {Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { eachDayOfInterval } from 'date-fns';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { HomeSignalStore } from '../../../stores/home/home.signal-store';
import { TTaskData } from '../../../types/home.type';

export type TTaskPosition = {
  top   : number,
  left  : number
  width : number
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

  /** 月のその月に対する日付を格納する */
  calendar: {[key in number]:Date[]} = {};

  /** 各タスクのポジション(startX,endX) */
  tasksPosition: {[key in number]:{ left: number,width: number,top: number } } = {};

  constructor(){
    this.calendar = {
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

    effect(() => {
      console.log(this.scrollTimelinePosition()?.nativeElement.getBoundingClientRect());
    });

    effect(() => ((tasks:TTaskData[]):void => {
      tasks.map((task):void => {
        if(Object.hasOwnProperty.call(this.tasksPosition,task.id)){
          return
        };
        this.tasksPosition[task.id] = calcTaskPostion(task,this.tasksPosition,this.calendar);
      })
    })(this.$tasks()))
  }

  /** スクロール位置を特定 */
  scrollTimelinePosition = viewChild<ElementRef>('nowDate');

  /**
   * 与えれたmonthとyearからその月の日付を取得する
   * @param month 
   * @param year 
   */
  getCreateMonthDate = (month:number,year:number):Date[] => {
    return eachDayOfInterval({start: new Date(year,month-1,1),end: new Date(year,month,0)})
  }
  
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


/**
   * タスクの位置を計算する
   * @param task 
   * @returns 
   */
export const calcTaskPostion = (
  task:TTaskData,
  tasksPosition:{[key in number]:{ left: number,width: number,top: number } },
  calendar:{[key in number]:Date[]}
):TTaskPosition => {
  let initDate = 0;
  Object.keys(calendar).forEach((key) => {
    if(Number(key) >= task.startDate.getMonth()){
      return
    }
    initDate += calendar[Number(key)].length;
  })
  const startDate = task.startDate.getDate() + initDate;
  const endDate = task.endDate.getDate()+1 + initDate;
  const widthBase = 72;
  const [
    left,width 
  ] = [
    widthBase*(startDate-1)+10,widthBase * (endDate-startDate) - 20 
  ];
  let top = 2.5;
  if(Object.prototype.hasOwnProperty.call(tasksPosition, task.id)){
    return {
      top   : tasksPosition[task.id].top,
      left  : tasksPosition[task.id].left,
      width : tasksPosition[task.id].width,
    }
  }
  Object.keys(tasksPosition).forEach((key) => {
    const [
      startX,
      endX 
    ] = [
      tasksPosition[Number(key)].left,
      tasksPosition[Number(key)].width 
    ]
    console.log(startX,endX);
    if(startX <= left || width <= endX){
      top += 190;
    }
  })
  return {
    top,
    left,
    width
  }
}