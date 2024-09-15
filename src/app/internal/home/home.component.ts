import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, signal,  WritableSignal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
import { TagModule } from 'primeng/tag';

export type AvatarInterface = {
  path  : string,
  label : string,
  size  : 'large' | 'normal' | 'xlarge' | undefined,
  shape : 'square' | 'circle' | undefined,
  style : {
    [key in string]:string
  } 
}

export type TaskStatus = 'Ready' | 'On Progress' | 'Needs Review' | 'Done';

export type colorTheme = '#de89ea' | '#46bd83' | '#07a0f7';

export type CustomMeterItem = {
  label: TaskStatus
} & MeterItem

export type TaskData = {
  status        : TaskStatus,
  title         : string,
  description   : string,
  members       : AvatarInterface[],
  tags          : string[],
  tagStyleClass : string,
  startDate     : Date,
  endDate       : Date
}

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [
    ButtonModule,
    AvatarModule ,
    AvatarGroupModule,
    TagModule,
    DatePipe,
    MeterGroupModule
  ],
  animations: [
    trigger('sidebarAnimation',[
      state('open',style({
        width   : '25%',
        opacity : 1
      })),
      state('close',style({
        width   : '0%',
        opacity : 0
      })),
      transition('open <=> close',[ animate('0.25s ease-in-out') ])
    ])
  ],
  templateUrl : './home.component.html',
  styleUrl    : './home.component.scss'
})
export class HomeComponent {

  isOpenTaskStatusSidebar: WritableSignal<boolean> = signal<boolean>(true);

  taskStatus: TaskStatus[] = [
    'Ready','On Progress','Needs Review','Done' 
  ];

  taskStatusColor: {[key in TaskStatus]: string } = {
    'Ready'       : '#de89ea',
    'On Progress' : '#46bd83',
    'Needs Review': '#07a0f7',
    'Done'        : '#f3dff5'
  }

  meterItems: CustomMeterItem[];

  constructor(){
    this.tasksData = this.tasksData.sort((a,b) => a.endDate.getTime() - b.endDate.getTime());
    this.meterItems = this.getStatusRatio(this.tasksData);
  }

  onClickIsOpenTaskStatusSidebar = ():void => this.isOpenTaskStatusSidebar.update((value) => !value);

  getStatusRatio = (tasksStatus: TaskData[]):CustomMeterItem[] => {
    const meterItems : CustomMeterItem[] = [
      {label: 'Ready',value: tasksStatus.filter((task) => task.status === 'Ready').length,color: this.taskStatusColor.Ready},
      {label: 'On Progress',value: tasksStatus.filter((task) => task.status === 'On Progress').length,color: this.taskStatusColor['On Progress']},
      {label: 'Needs Review',value: tasksStatus.filter((task) => task.status === 'Needs Review').length,color: this.taskStatusColor['Needs Review']},
      {label: 'Done',value: tasksStatus.filter((task) => task.status === 'Done').length,color: this.taskStatusColor.Done}
    ];
    return meterItems;
  }

  // ここからサンプルデータ

  mockDataAvatars: AvatarInterface[] = [
    {
      path  : 'assets/icons/icon1.jpg',
      label : 'M',
      size  : 'large',
      style : { 'background-color': '#ece9fc' },
      shape : 'circle'
    },
    {
      path  : 'assets/icons/icon2.jpg',
      label : 'S',
      size  : 'large',
      style : { 'background-color': '#dee9fc' },
      shape : 'circle'
    }
  ]

  tasksData: TaskData[] = [
    {
      status      : 'Ready',
      title       : 'デザインを作成する',
      description : 'Create a new design for the homepage',
      members     : this.mockDataAvatars,
      tags        : [
        'UI Design', 'UX Design' 
      ],
      tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
    },
    {
      status      : 'On Progress',
      title       : 'dashboardを作成する',
      description : 'Create a new design for the homepage',
      members     : this.mockDataAvatars,
      tags        : [
        'Programming', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
    },
    {
      status        : 'On Progress',
      title         : 'タスクのendDateで日付をソートする関数を作成する',
      description   : 'Create a new design for the homepage',
      members       : this.mockDataAvatars,
      tags          : [ 'Frontend' ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 2))
    },
    {
      status      : 'Needs Review',
      title       : 'APIのドキュメントを作成する',
      description : 'Create API documentation',
      members     : this.mockDataAvatars,
      tags        : [
        'Documentation', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 5))
    },
    {
      status      : 'Done',
      title       : 'ユニットテストを実装する',
      description : 'Implement unit tests',
      members     : this.mockDataAvatars,
      tags        : [
        'Testing', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-yellow-secondary text-yellow-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 3))
    },
    {
      status      : 'Ready',
      title       : '新しい機能を設計する',
      description : 'Design new feature',
      members     : this.mockDataAvatars,
      tags        : [
        'Design', 'Planning' 
      ],
      tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 10))
    },
    {
      status      : 'On Progress',
      title       : 'コードレビューを行う',
      description : 'Conduct code review',
      members     : this.mockDataAvatars,
      tags        : [
        'Review', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 4))
    },
    {
      status      : 'Needs Review',
      title       : 'バグを修正する',
      description : 'Fix bugs',
      members     : this.mockDataAvatars,
      tags        : [
        'Bugfix', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 6))
    },
    {
      status      : 'Done',
      title       : 'パフォーマンスを最適化する',
      description : 'Optimize performance',
      members     : this.mockDataAvatars,
      tags        : [
        'Optimization', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-yellow-secondary text-yellow-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 8))
    },
    {
      status      : 'Ready',
      title       : 'ユーザーインターフェースを改善する',
      description : 'Improve user interface',
      members     : this.mockDataAvatars,
      tags        : [
        'UI Design', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 9))
    },
    {
      status      : 'On Progress',
      title       : 'データベースを設計する',
      description : 'Design database',
      members     : this.mockDataAvatars,
      tags        : [
        'Database', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 12))
    },
    {
      status      : 'Needs Review',
      title       : 'セキュリティを強化する',
      description : 'Enhance security',
      members     : this.mockDataAvatars,
      tags        : [
        'Security', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 11))
    },
    {
      status      : 'Done',
      title       : 'プロジェクトのドキュメントを更新する',
      description : 'Update project documentation',
      members     : this.mockDataAvatars,
      tags        : [
        'Documentation', 'Planning' 
      ],
      tagStyleClass : 'font-medium p-2 bg-yellow-secondary text-yellow-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
    },
    {
      status      : 'Ready',
      title       : '新しいライブラリを調査する',
      description : 'Research new libraries',
      members     : this.mockDataAvatars,
      tags        : [
        'Research', 'Planning' 
      ],
      tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 5))
    },
    {
      status      : 'On Progress',
      title       : 'テストケースを作成する',
      description : 'Create test cases',
      members     : this.mockDataAvatars,
      tags        : [
        'Testing', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 6))
    },
    {
      status      : 'Needs Review',
      title       : 'コードのリファクタリングを行う',
      description : 'Refactor code',
      members     : this.mockDataAvatars,
      tags        : [
        'Refactoring', 'Backend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 4))
    },
    {
      status      : 'Done',
      title       : 'ユーザーテストを実施する',
      description : 'Conduct user testing',
      members     : this.mockDataAvatars,
      tags        : [
        'Testing', 'UX' 
      ],
      tagStyleClass : 'font-medium p-2 bg-yellow-secondary text-yellow-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 3))
    },
    {
      status      : 'Ready',
      title       : 'プロジェクトのロードマップを作成する',
      description : 'Create project roadmap',
      members     : this.mockDataAvatars,
      tags        : [
        'Planning', 'Management' 
      ],
      tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 8))
    },
    {
      status      : 'On Progress',
      title       : '新しいフレームワークを導入する',
      description : 'Implement new framework',
      members     : this.mockDataAvatars,
      tags        : [
        'Framework', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 10))
    },
    {
      status      : 'Needs Review',
      title       : 'コードの最適化を行う',
      description : 'Optimize code',
      members     : this.mockDataAvatars,
      tags        : [
        'Optimization', 'Frontend' 
      ],
      tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
      startDate     : new Date(),
      endDate       : new Date(new Date().setDate(new Date().getDate() + 9))
    }
  ]
}
