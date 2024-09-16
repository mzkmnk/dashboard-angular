import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../dexie/db';
import { tasksData, TEditingTasks, TTaskData } from '../types/home.type';

// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withTaskMethods = (dexieDB:AppDB) => {
  return signalStoreFeature(
    withMethods((signalStore) => ({

      getTasks: rxMethod<undefined>(
        pipe(
          tap(() => patchState(signalStore,{common: {isLoading: true}})),
          switchMap(async () => {
            // todo mockDataをひとまずstoreに入れる
            patchState(signalStore,{tasks: tasksData.sort((a,b) => a.endDate.getTime() - b.endDate.getTime())});
          }),
          tap(() => patchState(signalStore,{common: {isLoading: false}})),
        )
      ),

      showAddTask(task:TTaskData,tasks:TTaskData[],editingTasks:TEditingTasks):void {
        patchState(signalStore,{
          editingTasks: {
            [task.id]: task,
            ...editingTasks
          },
          tasks: [
            task,...tasks,
          ]});
      },

      cancelEditingTask(taskId:number,tasks:TTaskData[],editingTasks:TEditingTasks):void {
        patchState(signalStore,{
          editingTasks : {taskId,...editingTasks},
          tasks        : tasks.filter((task) => task.id !== taskId),
        })
      },

      addTask: rxMethod<{ task: TTaskData }>(pipe(
        tap(() => patchState(signalStore,{common: {isLoading: true}})),
        switchMap(async ({task}) => {
          console.log(task);
        }),
        tap(() => patchState(signalStore,{common: {isLoading: false}})),
      )),
    })),
  )
}