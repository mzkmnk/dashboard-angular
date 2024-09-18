import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../dexie/db';
import { TEditingTasks, TTaskData } from '../types/home.type';

// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withTaskMethods = (dexieDB:AppDB) => {
  return signalStoreFeature(
    withMethods((signalStore,messageService = inject(MessageService)) => ({

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

      showAddTask(task:TTaskData,editingTasks:TEditingTasks):void {
        patchState(signalStore,{
          editingTasks: {
            [task.id]: task,
            ...editingTasks
          }
        });
      },

      cancelEditingTask(taskId:number,editingTasks:TEditingTasks):void {
        patchState(signalStore,{
          editingTasks: deleteObject(editingTasks,taskId),
        })
      },

      saveTask: rxMethod<{ taskId: number,tasks: TTaskData[],editingTasks: TEditingTasks }>(
        pipe(
          tap(() => patchState(signalStore,{common: {isLoading: true}})),
          switchMap(async ({taskId,tasks,editingTasks}) => {
            const maxId = await dexieDB.getTasksMaxId();
            await dexieDB.addTask({...editingTasks[taskId],id: maxId + 1});
            patchState(signalStore,{
              editingTasks : deleteObject(editingTasks,taskId),
              tasks        : [
                {
                  ...editingTasks[taskId],
                },
                ...tasks.sort((a,b) => a.endDate.getTime() - b.endDate.getTime())
              ]
            })
          }),
          tap(() => patchState(signalStore,{common: {isLoading: false}})),
          tap(() => {
            messageService.add({severity: 'success',summary: 'Success',detail: 'Task added successfully'});
          })
        )),
    })),
  )
}

const deleteObject = (obj:Record<string|number,unknown>,key:string|number):Record<string|number,unknown> => {
  const { [key]: _, ...rest } = obj;
  return rest;
};