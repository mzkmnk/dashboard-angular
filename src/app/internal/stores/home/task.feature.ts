import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../../dexie/db';
import { TTaskData } from '../../types/home.type';

// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withTaskMethods = (dexieDB:AppDB) => {
  return signalStoreFeature(
    withMethods((signalStore,messageService = inject(MessageService)) => ({

      /** タスクを全て取得する */
      getTasks: rxMethod<undefined>(
        pipe(
          tap(() => patchState(signalStore,{common: {isLoading: true}})),
          switchMap(async () => {
            const tasks = await dexieDB.getTasks();
            patchState(signalStore,{tasks: tasks.sort((a,b) => a.endDate.getTime() - b.endDate.getTime())});
          }),
          tap(() => patchState(signalStore,{common: {isLoading: false}})),
        )
      ),

      /** タスクを追加する */
      addDetailTask: rxMethod<TTaskData>(
        pipe(
          tap((task) => patchState(signalStore,{detailTask: {...task}}) )
        )
      ),

      /** 詳細タスクをstateから削除する */
      delDetailTask: rxMethod<unknown>(
        pipe(
          tap(() => patchState(signalStore,{detailTask: {}}))
        )
      ),

      /** タスクを保存する */
      saveDetailTask: rxMethod<{ detailTask: TTaskData,tasks: TTaskData[] }>(
        pipe(
          switchMap(async ({detailTask,tasks}) => {
            const isEdit = tasks.some(t => t.id === detailTask.id);
            const saveTasks = isEdit
              ? tasks.map(t => t.id === detailTask.id
                ? detailTask
                : t)
              : [
                detailTask,
                ...tasks
              ];
            await dexieDB.saveTask(detailTask,isEdit);
            patchState(signalStore,{
              tasks      : [ ...saveTasks ].sort((a,b) => a.endDate.getTime() - b.endDate.getTime()),
              detailTask : { ...detailTask }
            })
            return detailTask;
          }),
          tap((task) => messageService.add({severity: 'success',summary: 'Success',detail: `${task.title}を追加しました。`}))
        )
      ),

      /** タスクを削除する */
      deleteTask: rxMethod<{ task: Partial<TTaskData>,tasks: TTaskData[] }>(
        pipe(
          tap(async ({task}) => {
            if(!task.id){
              return
            }
            await dexieDB.delTask(task.id);
          }),
          tap(({task,tasks}) => patchState(signalStore,{
            detailTask : {},
            tasks      : tasks?.filter(t => t.id != task.id)
          })),
          tap(({task}) => messageService.add({severity: 'success',summary: 'Success',detail: `${task.title}を削除しました。`}))
        )
      )
    }
    )),
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteObject = (obj:Record<string|number,unknown>,key:string|number):Record<string|number,unknown> => {
  const { [key]: _, ...rest } = obj;
  return rest;
};