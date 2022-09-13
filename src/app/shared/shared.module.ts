import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './diagram/diagram.component';

import { GojsAngularModule } from 'gojs-angular';

@NgModule({
  declarations: [DiagramComponent],
  imports: [CommonModule, GojsAngularModule],
  exports: [DiagramComponent],
})
export class SharedModule {}
