import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { MarkerService } from "../../services/marker/marker.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.page.html',
    styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

    markers = [];
    latitude: string = '';
    longitude: string = '';

    constructor(
        private router: Router,
        private markerService: MarkerService,
        private geolocation: Geolocation
    ) {
        // Get all markers
        // fetch('./assets/data/data.json')
        //     .then(res => res.json())
        //     .then(data => {
        //         // Set markers of museums
        //         this.markers = data.museums;
        //         this.markerService.setDatas(this.markers);
        //     });

        this.markerService.getAllMarkers().valueChanges()
            .subscribe(markers => {
                this.markers = markers;
                console.log(this.markers);
                this.markerService.setDatas(this.markers);
            })
    }

    ngOnInit() {
    }

    public getLocation(): void {

    }

    // test display markers
    public displayAllMarkers() {
        // Open map
        this.router.navigateByUrl('/tabs/map');
    }

    public displayMarkersByLocation(latitude: string, longitude): void {
        // Get coords

        // Get filters

        // Open map
        this.router.navigateByUrl('/tabs/map');
    }

    private filterMarkersByActivity(activity: string): void {

    }

}
