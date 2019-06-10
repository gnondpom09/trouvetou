import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder/ngx";

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

    constructor(
        private geoLocation: Geolocation,
        private nativeGeoCoder: NativeGeocoder,
        private markerService: MarkerService
    ) { }

    ngOnInit() {
        // Display map
        this.loadMap();

        // test
        // Get all markers filtered
        //this.markers = this.markerService.getDatas();
        this.markerService.getAllMarkers().valueChanges()
            .subscribe(data => {
                this.markers = data;
                console.log(this.markers);
                
            })
        this.loadMap();
        setTimeout(() => {
            this.getMarkers();
        }, 800);

    }

    /**
     * Display map
     */
    public loadMap() {
        // this.geoLocation.getCurrentPosition()
        //     .then(res => {
        //         // Get position
        //         let latLng = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
        //         // set options
        //         let mapOptions = {
        //             center: latLng,
        //             disableDefaultUI: true,
        //             zoom: 2,
        //             mapTypeId: google.maps.MapTypeId.ROADMAP
        //         }
        //         // Init map
        //         this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        //     })
        //     .catch((error) => {
        //         console.log('error from getting location', error);
        //     })

        // test datas
        const latLng = new google.maps.LatLng(43.671824, 3.859265);
        console.log("map : " + latLng);
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

                // Get address of current position
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

    public getMarkers() {
        this.markers.forEach(item => {
            console.log('item : ' + item);
            
            this.addMarkersToMap(item);
        });
    }

    public addMarkersToMap(marker) {
        const position = new google.maps.LatLng(marker.latitude, marker.longitude);
        console.log("ma position : " + position);

        const companyMarker = new google.maps.Marker({
            position,
            title: marker.name
        });
        console.log("marker : " + marker.name);

        companyMarker.setMap(this.map);
    }

}
