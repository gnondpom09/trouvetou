import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Platform, AlertController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { MarkerService } from "../../services/marker/marker.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Marker } from "../../models/marker.model";

declare var google;

@Component({
    selector: 'app-filter',
    templateUrl: './filter.page.html',
    styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit, AfterViewInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    markers: Marker[] = [];
    city: string = '';
    activity: string = '';
    latitude: string = '';
    longitude: string = '';
    params: NavigationExtras;
    position: string = '';
    options = [
        { id: 1, name: "Géolocalisation", value: "auto", checked: false },
        { id: 2, name: "saisir une localisation", value: "manual", checked: false }
    ];
    optionSelected: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private markerService: MarkerService,
        private geolocation: Geolocation,
        private platform: Platform,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
        // get params if exists
        // code...
        this.optionSelected = this.options[0].value;
        console.log(this.optionSelected);
        
    }
    ngAfterViewInit() {
        this.options[0].checked = true;
    }

    public optionChange(event) {
        console.log("change option " + event.target.value);
        this.optionSelected = event.target.value;
    }
    public selectOption(event) {
        console.log("Select option " + event.target.value);
        this.optionSelected = event.target.value;
    }

    /**
     * Get current position or position selected and set latitude - longitude
     */
    public getPosition(): void {

        // Get current position
        this.geolocation.getCurrentPosition()
            .then(res => {
                console.log(res);
                // Set position and display in the form
                this.latitude = (String)(res.coords.latitude);
                this.longitude = (String)(res.coords.longitude);
                console.log('position : ' + this.latitude + ' | ' + this.longitude);
            })
            .catch((error) => {
                console.log('error from getting location', error);
            })

    }

    /**
     * Open map and display markers filtered
     * @param latitude latitude of current position or position selected
     * @param longitude longitude of current position or position selected
     */
    public displayMarkersByLocation(): void {
        // Get position to search markers
        this.getPosition();

        setTimeout(() => {
            console.log(this.latitude + ' ---- ' + this.longitude);
            
            // Get coords of position to search markers and filters
            this.params = {
                queryParams: {
                    'latitude': this.latitude,
                    'longitude': this.longitude,
                    'activity': this.activity
                }
            }

            // Set list of markers
            //this.filterMarkersByActivity(this.activity);

            // Open map
            console.log('set : ' + this.params.queryParams.activity);
            this.router.navigate(['/tabs/map'], this.params);
            // close modal
            this.modalCtrl.dismiss();
            
        }, 3000);

    }

    /**
     * Filter markers by activity
     * @param activity Activity to filter
     */
    public filterMarkersByActivity(activity: string): void {
        this.markerService.getMarkersBySector(activity).valueChanges()
            .subscribe(data => {
                this.markers = data;
                this.markerService.setDatas(this.markers);
                console.log(this.markerService.getDatas());
                
            })
    }
    

    /**
     * Display alert with error
     * @param subject subject of error
     * @param content content of error
     */
    private async displayError(subject: string, content: string) {
        const alert = await this.alertCtrl.create({
            header: subject,
            message: content
        })
        return alert.present();
    }

}
