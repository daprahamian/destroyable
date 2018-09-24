import {createHook, AsyncHook, executionAsyncId} from 'async_hooks';
import { DestroyableInterface } from './DestroyableInterface';

export class DestroyableContext {
  private id: number;
  private hook: AsyncHook;
  private contexts: Set<Number> = new Set();
  private isDestroyed = false;

  constructor(private member: DestroyableInterface) {
    this.id = executionAsyncId();
    this.contexts.add(this.id);

    this.hook = createHook({
      init: (asyncId: number, type: string, triggerAsyncId: number) => this.onInit(asyncId, type, triggerAsyncId),
      destroy: asyncId => this.onDestroy(asyncId)
    });

    this.hook.enable();
  }

  private onInit(asyncId: number, _type: string, triggerAsyncId: number) {
    if (this.contexts.has(triggerAsyncId)) {
      this.contexts.add(asyncId);
    }
  }

  private onDestroy(asyncId: number) {
    this.contexts.delete(asyncId);

    if (this.contexts.size === 0) {
      this.destroy();
    }
  }

  public destroy() {
    if (!this.isDestroyed) {
      this.isDestroyed = true;
      this.hook.disable();
      this.contexts.clear();
      this.member.destroy();
    }}
}
