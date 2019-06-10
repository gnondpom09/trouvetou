import { Injectable } from '@angular/core';

import { Marker } from "../../models/marker.model";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    markers: Marker[];
    marker: Marker;

    constructor(private firestore: AngularFirestore) { }

    // test
    setDatas(data) {
        this.markers = data;
    }
    getDatas() {
        return this.markers;
    }

    /**
     * Get list of markers
     */
    getAllMarkers(): AngularFirestoreCollection<Marker> {
        return this.firestore.collection('markers');
    }

    /**
     * Get detail of marker
     * @param id id of marker
     */
    getMarkerDetail(id: string): AngularFirestoreDocument<Marker> {
        return this.firestore.collection('markers').doc(id);
    }

    /**
     * Create new marker to display on the map
     * @param id id of marker
     * @param name name of place to mark in the map
     * @param authorId author of marker
     * @param longitude longitude of marker
     * @param lattitude lattitude of marker
     * @param description description of marker
     */
    createNewMarker(id: string,
        name: string,
        authorId: string,
        longitude: any,
        lattitude: any,
        thumbnail: string = null,
        description: string = null): Promise<void> {
        return this.firestore.collection('markers').doc(id).set({
            id: id,
            name: name,
            thumbnail: thumbnail,
            description: description,
            author: authorId,
            longitude: longitude,
            lattitude: lattitude
        })
    }

    /**
     * Delete marker
     * @param id id of marker
     */
    public deleteMarker(id: string): Promise<void> {
        return this.firestore.collection('markers').doc(id).delete();
    }
}
