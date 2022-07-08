import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
} from '@angular/material';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    MatToolbarModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule {}
