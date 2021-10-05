import { AbstractControl } from '@angular/forms';

export function DateTodayOrOlder(control: AbstractControl) {
  if(control.value != '') {
    let dateValue = new Date(control.value);
    let today = new Date();

    if(dateValue.getTime() > today.getTime()) {
        return { dateGreaterThanToday: true };
    }
  }
  return null;
}