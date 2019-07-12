import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { Marker } from "../../models/marker.model";
import { ActivatedRoute } from "@angular/router";
import { MarkerService } from "../../services/marker/marker.service";
import { DetailPage } from "../detail/detail.page";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

    // Properties
    markers: Marker[] = [];
    activity: string = '';
    subscription: Subscription;

    constructor(
        private markerService: MarkerService,
        private modalCtrl: ModalController,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        // Get params to filter
        this.route.params.subscribe(params => {
            this.activity = params.activity;
            // Get list of markers
            this.filterMarkersByActivity(this.activity);
        })
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

    /**
     * Filter markers by activity
     * @param activity Activity to filter
     */
    public filterMarkersByActivity(activity: string): void {
        this.markerService.getMarkersBySector(activity).valueChanges()
            .subscribe(data => {
                this.markers = data;
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
