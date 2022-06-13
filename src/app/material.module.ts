import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatTooltipModule
    ]
  })
  export class MaterialModule {}