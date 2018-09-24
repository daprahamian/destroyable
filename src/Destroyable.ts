import { DestroyableInterface } from './DestroyableInterface';
import { DestroyableContext } from './DestroyableContext';

export class Destroyable implements DestroyableInterface {
  private _destroyableContext : DestroyableContext;
  constructor() {
    this._destroyableContext = new DestroyableContext(this);
  }

  destroy() {
    this._destroyableContext.destroy();
  }
}