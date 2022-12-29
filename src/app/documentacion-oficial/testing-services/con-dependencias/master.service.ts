import { Injectable } from '@angular/core';

import { ValueService } from '../sin-dependencias/value.service';

@Injectable()
export class MasterService {

  constructor(private _valueService: ValueService) { }

  getValue(): string {
    return this._valueService.getValue();
  }

}
