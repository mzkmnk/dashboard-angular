import { MeterItem } from 'primeng/metergroup';

export type AvatarInterface = {
  path  : string,
  label : string,
  size  : 'large' | 'normal' | 'xlarge' | undefined,
  shape : 'square' | 'circle' | undefined,
  style : Record<string,string>
}
  
export type TaskStatus = 'Ready' | 'On Progress' | 'Needs Review' | 'Done';
  
// eslint-disable-next-line @stylistic/max-len
export type Tags = 'Frontend' | 'Backend' | 'Design' | 'Planning' | 'Management' | 'Testing' | 'Documentation' | 'Review' | 'Bugfix' | 'Optimization' | 'Research' | 'Refactoring' | 'UX' | 'Framework' | 'Security' | 'Database' | 'UI Design';
  
export type colorTheme = '#de89ea' | '#46bd83' | '#07a0f7';
  
export type CustomMeterItem = {
  label: TaskStatus
} & MeterItem
  
export type TaskData = {
  id            : number,
  status        : TaskStatus,
  title         : string,
  description   : string,
  members       : AvatarInterface[],
  tags          : string[],
  tagStyleClass : string,
  startDate     : Date,
  endDate       : Date
}

export const mockDataAvatars: AvatarInterface[] = [
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

export const tasksData: TaskData[] = [
  {
    id          : 0,
    status      : 'Ready',
    title       : 'デザインを作成する',
    description : 'Create a new design for the homepage',
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
    status      : 'On Progress',
    title       : 'dashboardを作成する',
    description : 'Create a new design for the homepage',
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
    status        : 'On Progress',
    title         : 'タスクのendDateで日付をソートする関数を作成する',
    description   : 'Create a new design for the homepage',
    members       : mockDataAvatars,
    tags          : [ 'Frontend' ],
    tagStyleClass : 'font-medium p-2 bg-blue-secondary text-blue-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 2))
  },
  {
    id          : 3,
    status      : 'Needs Review',
    title       : 'APIのドキュメントを作成する',
    description : 'Create API documentation',
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
    description : 'Implement unit tests',
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
    description : 'Design new feature',
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
    status      : 'On Progress',
    title       : 'コードレビューを行う',
    description : 'Conduct code review',
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
    status      : 'Needs Review',
    title       : 'バグを修正する',
    description : 'Fix bugs',
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
    description : 'Optimize performance',
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
    description : 'Improve user interface',
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
    status      : 'On Progress',
    title       : 'データベースを設計する',
    description : 'Design database',
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
    status      : 'Needs Review',
    title       : 'セキュリティを強化する',
    description : 'Enhance security',
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
    description : 'Update project documentation',
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
    description : 'Research new libraries',
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
    status      : 'On Progress',
    title       : 'テストケースを作成する',
    description : 'Create test cases',
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
    status      : 'Needs Review',
    title       : 'コードのリファクタリングを行う',
    description : 'Refactor code',
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
    description : 'Conduct user testing',
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
    description : 'Create project roadmap',
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
    status      : 'On Progress',
    title       : '新しいフレームワークを導入する',
    description : 'Implement new framework',
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
    status      : 'Needs Review',
    title       : 'コードの最適化を行う',
    description : 'Optimize code',
    members     : mockDataAvatars,
    tags        : [
      'Optimization', 'Frontend' 
    ],
    tagStyleClass : 'font-medium p-2 bg-green-secondary text-green-primary',
    startDate     : new Date(),
    endDate       : new Date(new Date().setDate(new Date().getDate() + 9))
  }
]