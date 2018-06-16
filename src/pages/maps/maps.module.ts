import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    AgmCoreModule,
    IonicPageModule.forChild(MapsPage),
  ],
})
export class MapsPageModule {}
