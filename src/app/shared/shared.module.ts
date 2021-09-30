import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    LoadingAnimationComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingAnimationComponent
  ]
})
export class SharedModule { }
