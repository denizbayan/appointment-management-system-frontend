import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule }   from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import {ConfirmDialogModule } from 'primeng/confirmdialog';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule } from 'primeng/toast';
import {ToolbarModule } from 'primeng/toolbar';
import {TooltipModule } from 'primeng/tooltip';
import {FileUploadModule } from 'primeng/fileupload';
import {TableModule } from 'primeng/table';
import {CardModule } from 'primeng/card';
import {RatingModule } from 'primeng/rating';
import {DialogModule } from 'primeng/dialog';
import {DropdownModule } from 'primeng/dropdown';
import {RadioButtonModule } from 'primeng/radiobutton';
import {InputTextModule } from 'primeng/inputtext';
import {InputNumberModule } from 'primeng/inputnumber';
import {ButtonModule } from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {TabMenuModule} from 'primeng/tabmenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {MessageModule } from 'primeng/message';
import {MessagesModule } from 'primeng/messages';
import {CarouselModule} from 'primeng/carousel';
import {MultiSelectModule } from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BlockUI, BlockUIModule} from 'primeng/blockui';
import {CalendarModule} from 'primeng/calendar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { PsyDictionaryComponent } from './psy-dictionary/psy-dictionary.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MustMatchDirective } from './_helpers/MustMatchDirective';
import { UsersComponent } from './users/users.component';
import { SessionsComponent } from './sessions/sessions.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AppComponent,
    BlogComponent,
    PsyDictionaryComponent,
    ResetPasswordComponent,
    MustMatchDirective,
    UsersComponent,
    SessionsComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormsModule,
    MenubarModule,
    BrowserModule,
    TooltipModule,
    CardModule,
    SplitButtonModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    BlockUIModule,
    MultiSelectModule,
    RatingModule,
    InputMaskModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    TabViewModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    AccordionModule,
    ProgressSpinnerModule,
    DialogModule,
    FileUploadModule,
    CarouselModule,
    MessageModule,
    MessagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    TabMenuModule,
    TieredMenuModule,
    CheckboxModule,
    PasswordModule,
    MatProgressBarModule,
    HttpClientModule,
    DataViewModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
