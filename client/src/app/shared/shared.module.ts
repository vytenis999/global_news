import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { ToastComponent } from './components/toast/toast.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, ToastComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot(), ReactiveFormsModule,],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ToastComponent,
    CarouselModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
