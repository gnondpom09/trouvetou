import { Component } from '@angular/core';

import { ModalController } from "@ionic/angular";
import { FilterPage } from "../pages/filter/filter.page";

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(
        private modalCtrl: ModalController
    ) { }

    async openFilter() {
        const modal = await this.modalCtrl.create({
            component: FilterPage
        })
        return await modal.present();
    }

}
