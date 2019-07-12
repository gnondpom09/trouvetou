import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder/ngx";
import { ActivatedRoute } from "@angular/router";
import { GoogleMapsEvent } from "@ionic-native/google-maps/ngx";
import { MarkerService } from "../../services/marker/marker.service";
import { Marker } from "../../models/marker.model";

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    // Properties
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    address: string;
    markers: Marker[];
    latitude: any;
    longitude: any;
    activity: string;

    constructor(
        private geoLocation: Geolocation,
        private nativeGeoCoder: NativeGeocoder,
        private markerService: MarkerService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        setTimeout(() => {
            // Get position to center map
            this.route.queryParams.subscribe(params => {

                // Get all params to filter the list of markers
                this.latitude = (Number)(params.latitude) ? (Number)(params.latitude) : this.latitude;
                this.longitude = (Number)(params.longitude) ? (Number)(params.longitude) : this.longitude;
                this.activity = params.activity ? params.activity : this.activity;

                // Display map
                this.loadMap();

                // Filter markers fraom database and display on the map
                this.filterMarkersByActivity(this.activity);

            })
        }, 400);

    }

    /**
     * Filter markers by activity
     * @param activity Activity to filter
     */
    public filterMarkersByActivity(activity: string): void {
        this.markerService.getMarkersBySector(activity).valueChanges()
            .subscribe(data => {
                this.markers = data;
                this.getMarkers();
            })
    }

    /**
     * Display map
     */
    public loadMap() {

        // Get current position test
        const latLng = new google.maps.LatLng(this.latitude, this.longitude);

        // Set options
        let mapOptions = {
            center: latLng,
            disableDefaultUI: true,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // Init map
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    /**
     * Get all markers find and add in the map
     */
    public getMarkers() {
        this.markers.forEach(item => {
            console.log('item : ' + item);
            // Set market in the map
            this.addMarkersToMap(item);
        });
    }

    /**
     * Add markers list in the map
     * @param marker marker of position
     */
    private addMarkersToMap(marker) {
        const position = new google.maps.LatLng(marker.latitude, marker.longitude);
        console.log("ma position : " + position);

        const companyMarker = new google.maps.Marker({
            position,
            title: marker.name
        });
        console.log("marker : " + marker.name);

        companyMarker.setMap(this.map);
    }

    /**
     * Get address from coords
     * @param lattitude lattitude of location
     * @param longitude longitude of location
     */
    private getAddressFromCoords(latitude, longitude) {
        console.log("getting address from coords : " + latitude + " | " + longitude);
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        }
        this.nativeGeoCoder.reverseGeocode(latitude, longitude, options)
            .then((result: NativeGeocoderReverseResult[]) => {

                // Get address of position selected
                this.address = "";
                let responseAddress = [];
                for (let [key, value] of Object.entries(result[0])) {
                    if (value.length > 0) {
                        responseAddress.push(value);
                    }
                }
                responseAddress.reverse();
                for (let value of responseAddress) {
                    this.address += value + ", ";
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = "Address not available : " + error;
            })
    }

}
