import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DialogService} from 'primeng/dynamicdialog';
import { pipe, switchMap, tap } from 'rxjs';

import { AppDB } from '../../dexie/db';
import { UserSettingComponent } from '../../shared/components/user-setting/user-setting.component';
import { TUser } from '../types/home.type'

// todo 関数の戻り値の型を定義する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withUserMethods = (dexieDB:AppDB) => {
  return signalStoreFeature(
    withMethods((signalStore,dialogService = inject(DialogService)) => ({
      getUser: rxMethod<undefined>(
        pipe(
          switchMap(async() => {
            const users : TUser[] = await dexieDB.getUser();
            if(users.length === 0){
              dialogService.open(UserSettingComponent,{
                closable : false,
                header   : 'User Setting',
                width    : '50vh',
              })
              return;
            }
            patchState(signalStore,{user: {...users[0]}})
          })
        )
      ),
      updateUser: rxMethod<{ updateUser: TUser,initial: boolean }>(
        pipe(
          tap(() => patchState(signalStore,{common: {isLoading: false}})),
          switchMap(async({updateUser,initial}) => {
            const user:TUser|undefined = await dexieDB.updateUser(updateUser,initial);
            if(user){
              patchState(signalStore,{user: {...user}})
            }
          }),
          tap(() => patchState(signalStore,{common: {isLoading: false}})),
        )
      )
    }))
  )
}