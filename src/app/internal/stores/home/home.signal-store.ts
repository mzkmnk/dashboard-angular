import { patchState, signalStore, signalStoreFeature, withHooks, withMethods, withState } from '@ngrx/signals';

import { DB } from '../../../dexie/db';
import { THomeInitialState } from '../../types/home.type';
import { withTaskMethods } from './task.feature';
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
  },
  detailTask : {},
  tasks      : []
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

export const HomeSignalStore = signalStore(
  {providedIn: 'root'},
  withState<THomeInitialState>(homeInitialState),
  withCommonMethods(),
  withUserMethods(dexieDB),
  withTaskMethods(dexieDB),
  withHooks({
    onInit: (signalStore) => {
      signalStore.getUser(undefined);
      signalStore.getTasks(undefined);
    }
  })
)