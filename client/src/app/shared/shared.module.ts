import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { ToastComponent } from './components/toast/toast.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {ReactiveFormsModule} from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';


@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, ToastComponent, WeatherWidgetComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot(), ReactiveFormsModule,BsDropdownModule.forRoot(), BsDatepickerModule.forRoot()],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ToastComponent,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    WeatherWidgetComponent,
  ],
})
export class SharedModule {}
