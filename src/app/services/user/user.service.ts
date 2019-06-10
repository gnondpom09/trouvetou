import { Injectable } from '@angular/core';

import { User } from "../../models/user.model";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firestore: AngularFirestore,
        private storage: NativeStorage) {

    }

    /**
     * Get id of user logged
     */
    public getUid() {
        return this.storage.getItem('uid');
    }

    /**
     * Get all users
     */
    public getAllUsers(): AngularFirestoreCollection<User> {
        return this.firestore.collection('users');
    }

    /**
     * get informations of user
     * @param id id of user
     */
    public getUserDetail(id: string): AngularFirestoreDocument<User> {
        return this.firestore.collection('users').doc(id);
    }

    /**
     * create new user in database
     * @param userId id of user
     * @param username email of user
     * @param email email of user
     * @param avatar avatar of user
     * @param role role of user
     * @param password password of user
     */
    public createNewUser(userId: string, 
        username: string, 
        email: string, 
        avatar: string,
        role: string): Promise<void> {
        return this.firestore.collection('users').doc(userId).set({
            id: userId,
            pseudo: username,
            email: email,
            avatar: avatar,
            role: role
        })
    }

    /**
     * delete user from database
     * @param id id of user to delete
     */
    public deleteUser(id: string): Promise<void> {
        return this.firestore.collection('users').doc(id).delete();
    }

}
