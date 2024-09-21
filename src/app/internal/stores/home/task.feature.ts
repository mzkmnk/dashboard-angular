import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../../dexie/db';
import { TTaskData } from '../../types/home.type';

// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withTaskMethods = (dexieDB:AppDB) => {
  return signalStoreFeature(
    withMethods((signalStore, ) => ({
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

      addDetailTask: rxMethod<TTaskData>(
        pipe(
          tap((task) => patchState(signalStore,{detailTask: task}))
        )
      ),

      delDetailTask: rxMethod<unknown>(
        pipe(
          tap(() => patchState(signalStore,{detailTask: {}}))
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