import { AbstractControl } from '@angular/forms';

export function NotEmptyString(control: AbstractControl) {
  let value:string = control.value;
  if(control.value != '' && control.value != null) {
    if (value.trim() == '') {
      return { empty: true };
    }
  }

  return null;
}