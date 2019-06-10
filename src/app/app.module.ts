import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { DetailPageModule } from "./pages/detail/detail.module";

import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAOmnqO47764cZwvmsK9uEg1nlzXWbNUK4",
    authDomain: "trouvetou-2c09e.firebaseapp.com",
    databaseURL: "https://trouvetou-2c09e.firebaseio.com",
    projectId: "trouvetou-2c09e",
    storageBucket: "trouvetou-2c09e.appspot.com",
    messagingSenderId: "645340029572",
    appId: "1:645340029572:web:c5d35981a5cdf3e0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, 
        IonicModule.forRoot(), 
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AppRoutingModule,
        DetailPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        NativeGeocoder,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
