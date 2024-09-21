import { signalStore, withMethods, withState } from '@ngrx/signals';

export const addTaskSignalStore = signalStore(
  withState({}),
  withMethods(() => ({
  })),
)