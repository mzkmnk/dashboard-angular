import { MeterItem } from 'primeng/metergroup';

export type THomeInitialState = {
  common : {
    isLoading: boolean
  },
  user       : Partial<TUser>,
  detailTask : Partial<TTaskData>,
  tasks      : TTaskData[],
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
  id          : number,
  status      : TTaskStatus,
  title       : string,
  description : string,
  members     : TUser[],
  tags        : TTag[],
  startDate   : Date,
  endDate     : Date
}

export type TTag = {
  name : string,
  code : string,
}

export const tags:TTag[] = [
  {
    name : 'Frontend',
    code : 'Frontend',
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

/** タスクのステータスに応じた色を設定する。*/
export const taskStatusColor: {[key in TTaskStatus]: string } = {
  Ready    : 'text-slate-400',
  Progress : 'text-cyan-700',
  Review   : 'text-amber-600',
  Done     : 'text-lime-600'
}