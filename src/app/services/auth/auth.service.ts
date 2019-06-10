import { Injectable } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private af: AngularFireAuth) { }

    /**
     * Connect user to application
     * @param email email of user
     * @param password password of user
     */
    public signIn(email: string, password: string) {
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Create new user account
     * @param email email of user
     * @param password password of user
     */
    public singUp(email: string, password: string) {
        return this.af.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Logout user
     */
    public logout() {
        return this.af.auth.signOut();
    }

    /**
     * Get user logged
     */
    public getUserLogged() {
        return this.af.authState;
    }

    /**
     * Delete use r account
     */
    public deleteUserAccount() {
        return this.af.auth.currentUser.delete();
    }

    /**
     * Send email to reset password
     * @param email email to send link to reset password
     */
    public resetPasword(email: string) {
        return this.af.auth.sendPasswordResetEmail(email)
            .then(() => {
                console.log('email sent');
            })
            .catch(err => {
                console.log(err);
                
            })
    }
}
