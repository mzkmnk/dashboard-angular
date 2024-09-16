import Dexie from 'dexie';

import { environment } from '../../environments/environment';
import { TTaskData, TUser } from '../internal/types/home.type';

export class AppDB extends Dexie {
  tasks! : Dexie.Table<TTaskData, number>;
  user!  : Dexie.Table<TUser,number>;

  constructor() {
    super(environment.db.tasksDataBase);
    this.version(1).stores({
      tasks : '++id, status, title, description, members, tags, tagStyleClass, startDate, endDate',
      user  : '++id, label, size, shape, style'
    })
  }

  /**
   * ユーザーを取得する。
   */
  getUser = async () : Promise<TUser[]> => {
    return await DB.user.toArray();
  }

  /**
   * ユーザを更新、または追加する。
   * @param user 
   * @param initial 
   * @returns 
   */
  updateUser = async (user:TUser,initial = false) : Promise<TUser|undefined> => {
    if(initial){
      const userId:number = await DB.user.add(user);
      return DB.user.get(userId);
    }
    const userId:number = await DB.user.update(user.id,user);
    return DB.user.get(userId);
  }

  /**
   * 全てのタスクを取得する
   */
  getTasks = async () : Promise<void> => {
    try {
      console.log(await DB.tasks.toArray());
    }catch(error){
      console.log(error);
    }
  }

  /**
   * タスクを追加する。
   * @param task タスクデータ
   */
  addTask = async (task:TTaskData) : Promise<void> => {
    try {
      await DB.tasks.add(task);
    }catch(error){
      console.log(error);
    }
  }
}

export const DB = new AppDB();