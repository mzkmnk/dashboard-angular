import { MeterItem } from 'primeng/metergroup';

export type THomeInitialState = {
  common : {
    isLoading: boolean
  },
  user         : TUser,
  editingTasks : TEditingTasks
  tasks        : TTaskData[],
}

export type TUser = {
  id       : number,
  label    : string,
  username : string,
  size     : 'large' | 'normal' | 'xlarge' | undefined,
  shape    : 'square' | 'circle' | undefined,
  style    : Record<string,string>
}
  
export type TTaskStatus = 'Ready' | 'Progress' | 'Review' | 'Done';
  
// eslint-disable-next-line @stylistic/max-len
export type TTags = 'Frontend' | 'Backend' | 'Design' | 'Planning' | 'Management' | 'Testing' | 'Documentation' | 'Review' | 'Bugfix' | 'Optimization' | 'Research' | 'Refactoring' | 'UX' | 'Framework' | 'Security' | 'Database' | 'UI Design';
  
export type TColorTheme = '#de89ea' | '#46bd83' | '#07a0f7';
  
export type TCustomMeterItem = {
  label: TTaskStatus
} & MeterItem
  
export type TTaskData = {
  id            : number,
  status        : TTaskStatus,
  title         : string,
  description   : string,
  members       : TUser[],
  tags          : string[],
  tagStyleClass : string,
  startDate     : Date,
  endDate       : Date
}

export type TEditingTasks = Record<number,TTaskData>;

export const tags = [
  {
    name : 'Frontend',
    code : 'Frontend'
  },
  {
    name : 'Backend',
    code : 'Backend'
  },
  {
    name : 'UI',
    code : 'UI'
  },
  {
    name : 'UX',
    code : 'UX'
  }
];

export const mockDataAvatars: TUser[] = [
  {
    id       : 0,
    label    : 'M',
    username : 'mockUser1',
    size     : 'large',
    style    : { 'background-color': '#ece9fc' },
    shape    : 'circle'
  },
  {
    id       : 1,
    label    : 'S',
    username : 'mockUser2',
    size     : 'large',
    style    : { 'background-color': '#dee9fc' },
    shape    : 'circle'
  }
]

export const tasksData: TTaskData[] = [
  {
    id          : 0,
    status      : 'Ready',
    title       : 'デザインを作成する',
    description : 'デザインを作成する',
    members     : mockDataAvatars,
    tags        : [
      'UI Design', 'UX Design' 
    ],
    tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
  },
  {
    id          : 1,
    status      : 'Progress',
    title       : 'dashboardを作成する',
    description : 'dashboardを作成する',
    members     : mockDataAvatars,
    tags        : [
      'Programming', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
  },
  {
    id            : 2,
    status        : 'Progress',
    title         : 'タスクのendDateで日付をソートする関数を作成する',
    description   : 'タスクのendDateで日付をソートする関数を作成する',
    members       : mockDataAvatars,
    tags          : [ 'Frontend' ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 2))
  },
  {
    id          : 3,
    status      : 'Review',
    title       : 'APIのドキュメントを作成する',
    description : 'APIのドキュメントを作成する',
    members     : mockDataAvatars,
    tags        : [
      'Documentation', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 5))
  },
  {
    id          : 4,
    status      : 'Done',
    title       : 'ユニットテストを実装する',
    description : 'ユニットテストを実装する',
    members     : mockDataAvatars,
    tags        : [
      'Testing', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-red-secondary text-red-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 3))
  },
  {
    id          : 5,
    status      : 'Ready',
    title       : '新しい機能を設計する',
    description : '新しい機能を設計する',
    members     : mockDataAvatars,
    tags        : [
      'Design', 'Planning' 
    ],
    tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 10))
  },
  {
    id          : 6,
    status      : 'Progress',
    title       : 'コードレビューを行う',
    description : 'コードレビューを行う',
    members     : mockDataAvatars,
    tags        : [
      'Review', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 4))
  },
  {
    id          : 7,
    status      : 'Review',
    title       : 'バグを修正する',
    description : 'バグを修正する',
    members     : mockDataAvatars,
    tags        : [
      'Bugfix', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 6))
  },
  {
    id          : 8,
    status      : 'Done',
    title       : 'パフォーマンスを最適化する',
    description : 'パフォーマンスを最適化する',
    members     : mockDataAvatars,
    tags        : [
      'Optimization', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-red-secondary text-red-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 8))
  },
  {
    id          : 9,
    status      : 'Ready',
    title       : 'ユーザーインターフェースを改善する',
    description : 'ユーザーインターフェースを改善する',
    members     : mockDataAvatars,
    tags        : [
      'UI Design', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 9))
  },
  {
    id          : 10,
    status      : 'Progress',
    title       : 'データベースを設計する',
    description : 'データベースを設計する',
    members     : mockDataAvatars,
    tags        : [
      'Database', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 12))
  },
  {
    id          : 11,
    status      : 'Review',
    title       : 'セキュリティを強化する',
    description : 'セキュリティを強化する',
    members     : mockDataAvatars,
    tags        : [
      'Security', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 11))
  },
  {
    id          : 12,
    status      : 'Done',
    title       : 'プロジェクトのドキュメントを更新する',
    description : 'プロジェクトのドキュメントを更新する',
    members     : mockDataAvatars,
    tags        : [
      'Documentation', 'Planning' 
    ],
    tagStyleClass : 'font-medium p-2 bg-red-secondary text-red-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 7))
  },
  {
    id          : 13,
    status      : 'Ready',
    title       : '新しいライブラリを調査する',
    description : '新しいライブラリを調査する',
    members     : mockDataAvatars,
    tags        : [
      'Research', 'Planning' 
    ],
    tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 5))
  },
  {
    id          : 14,
    status      : 'Progress',
    title       : 'テストケースを作成する',
    description : 'テストケースを作成する',
    members     : mockDataAvatars,
    tags        : [
      'Testing', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 6))
  },
  {
    id          : 15,
    status      : 'Review',
    title       : 'コードのリファクタリングを行う',
    description : 'コードのリファクタリングを行う',
    members     : mockDataAvatars,
    tags        : [
      'Refactoring', 'Backend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 4))
  },
  {
    id          : 16,
    status      : 'Done',
    title       : 'ユーザーテストを実施する',
    description : 'ユーザーテストを実施する',
    members     : mockDataAvatars,
    tags        : [
      'Testing', 'UX' 
    ],
    tagStyleClass : 'font-medium p-2 bg-red-secondary text-red-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 3))
  },
  {
    id          : 17,
    status      : 'Ready',
    title       : 'プロジェクトのロードマップを作成する',
    description : 'プロジェクトのロードマップを作成する',
    members     : mockDataAvatars,
    tags        : [
      'Planning', 'Management' 
    ],
    tagStyleClass : 'font-medium p-2 bg-pink-secondary text-pink-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 8))
  },
  {
    id          : 18,
    status      : 'Progress',
    title       : '新しいフレームワークを導入する',
    description : '新しいフレームワークを導入する',
    members     : mockDataAvatars,
    tags        : [
      'Framework', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 10))
  },
  {
    id          : 19,
    status      : 'Review',
    title       : 'コードの最適化を行う',
    description : 'コードの最適化を行う',
    members     : mockDataAvatars,
    tags        : [
      'Optimization', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 9))
  }
]