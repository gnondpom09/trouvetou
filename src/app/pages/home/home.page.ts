import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MarkerService } from "../../services/marker/marker.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(
        private markerService: MarkerService,
        private router: Router
    ) { }

    ngOnInit() {

    }

    public async openSearch() {
        // open modal to search place
    }

}
