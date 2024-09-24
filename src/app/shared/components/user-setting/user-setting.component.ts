import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

import { HomeSignalStore } from '../../../internal/stores/home/home.signal-store';

@Component({
  selector   : 'app-user-setting',
  standalone : true,
  imports    : [
    InputTextModule,FormsModule ,ButtonModule
  ],
  templateUrl : './user-setting.component.html',
  styleUrl    : './user-setting.component.scss'
})
export class UserSettingComponent {
  private readonly homeSignalStore = inject(HomeSignalStore);
  private readonly dynamicDialogRef = inject(DynamicDialogRef);

  $isLoading : Signal<boolean> = this.homeSignalStore.common.isLoading;
  $username  : WritableSignal<string> = signal<string>('');

  onClickCloseUserSettingDialog = () :void => {
    this.homeSignalStore.updateUser({updateUser: {
      id       : 0,
      username : this.$username(),
      label    : this.$username()[0].toUpperCase(),
      size     : 'large',
      shape    : 'circle',
      style    : { 'background-color': '#ece9fc'}
    },initial: true
    });
    this.dynamicDialogRef.close();
  }
}
