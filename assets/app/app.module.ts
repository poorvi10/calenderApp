import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";


export const ROUTES: Routes = [
    {path: '', component:AppComponent},
    {path: 'home', component:HomeComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [BrowserModule, HttpModule, RouterModule.forRoot(ROUTES)],
    bootstrap: [AppComponent]
})
export class AppModule {

}