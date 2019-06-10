import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { Marker } from "../../models/marker.model";
import { MarkerService } from "../../services/marker/marker.service";
import { DetailPage } from "../detail/detail.page";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    // Properties
    public markers: Marker[] = [];

    constructor(
        private markerService: MarkerService,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        // Get list of markers
        this.markerService.getAllMarkers().valueChanges()
            .subscribe(markers => {
                this.markers = markers;
            })
    }

    /**
     * Open modal to display informations of marker
     * @param id id of marker
     */
    async getMarkerDetail(id: string) {
        // Get component to display in modal
        const modal = await this.modalCtrl.create({
            component: DetailPage,
            componentProps: {
                id: id
            }
        });
        return await modal.present();
    }

}
