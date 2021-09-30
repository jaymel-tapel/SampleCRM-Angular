import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'input[dynamicDateInput]'
})
export class DynamicDateInputDirective implements OnChanges {

  private element: ElementRef;
  @Input() type: string;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.element.nativeElement.type = this.type;
  }

  @HostListener('focus')
  handleFocus() {
    this.element.nativeElement.type = 'date';
  }

  @HostListener('blur')
  handleBlur() {
    if (this.element.nativeElement.value == "") {
      this.element.nativeElement.type = 'text';
    } else {
      this.element.nativeElement.type = 'date';
    }
  }

  

}