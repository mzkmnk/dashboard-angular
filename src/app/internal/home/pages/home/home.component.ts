import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import {TabViewModule  } from 'primeng/tabview';
import { ToastModule  } from 'primeng/toast';

import { homeSignalStore } from '../../../stores/home/home.signal-store';
import { TUser } from '../../../types/home.type';
import { KanbanComponent } from '../../components/kanban/kanban.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    DatePipe,
    FormsModule,
    KeyValuePipe,
    KanbanComponent,
    ToastModule,
    AvatarModule,
    TabViewModule,
    TimelineComponent
  ],
  animations: [
    // サイドバーのアニメーション
    // 今後使う予定があるので残しておく。
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

  /** ユーザ */
  $user: Signal<TUser> = this.homeSignalStore.user;
}
