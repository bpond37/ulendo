import AuthStore from './auth/AuthStore';
import MemoStore from './memo/MemoStores';
import MemoService from '../services/MemoService';

export default class RootStore {
  static instance: RootStore;
  authStore = new AuthStore();
  memoStore = new MemoStore(new MemoService(this.authStore));
}
