import { patchState, signalStore, signalStoreFeature, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { DB } from '../../dexie/db';
import { THomeInitialState } from '../types/home.type';
import { withUserMethods } from './user.feature';

export const homeInitialState : THomeInitialState = {
  common: { 
    isLoading: false,
  },
  user: {
    id       : -1,
    label    : '',
    username : '',
    size     : 'large',
    shape    : 'circle',
    style    : { 'background-color': '#ece9fc' }
  }
}

const dexieDB = DB;

// これいい感じに使いたいけどRFCでcloseされてそう..
// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withCommonMethods = () => {
  return signalStoreFeature(
    withMethods((signalStore) => ({
      loading(isLoad:boolean):void {
        patchState(signalStore,{common: {isLoading: isLoad}});
      }
    }))
  )
}

export const homeSignalStore = signalStore(
  {providedIn: 'root'},
  withState<THomeInitialState>(homeInitialState),
  withCommonMethods(),
  withUserMethods(dexieDB),
  withMethods((signalStore) => ({
    loadTasks: rxMethod<undefined>(
      pipe(
        tap(() => patchState(signalStore,{common: {isLoading: true}})),
        switchMap(async () => {
          await dexieDB.getTasks();
        }),
        tap(() => patchState(signalStore,{common: {isLoading: false}})),
      )
    )
  })),
  withHooks({
    onInit: (signalStore) => {
      signalStore.getUser(undefined);
    }
  })
)