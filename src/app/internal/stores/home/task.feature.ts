import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../../dexie/db';
import { TEditTask, TEditTasks, TTaskData } from '../../types/home.type';

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

      addTask(editTask:TEditTask,editTasks:TEditTasks):void {
        patchState(signalStore,{
          editingTasks: {
            [editTask.id]: editTask,
            ...editTasks
          }
        });
      },

      cancelEditingTask(taskId:number,editingTasks:TEditTasks):void {
        patchState(signalStore,{
          editingTasks: deleteObject(editingTasks,taskId),
        })
      },

      saveTask: rxMethod<{ taskId: number,tasks: TTaskData[],editTasks: TEditTasks }>(
        pipe(
          tap(() => patchState(signalStore,{common: {isLoading: true}})),
          switchMap(async ({taskId,tasks,editTasks}) => {
            const {rangeDate,...taskData} = editTasks[taskId];
            await dexieDB.addTask(
              {
                ...taskData,
                startDate : rangeDate[0],
                endDate   : rangeDate[1]
              }
            );
            patchState(signalStore,{
              editingTasks : deleteObject(editTasks,taskId),
              tasks        : [
                {
                  ...taskData,
                  startDate : rangeDate[0],
                  endDate   : rangeDate[1]
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