import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from "@ionic/storage";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    uid: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private storage: Storage
    ) { 
        this.userService.getUid().then(uid => {
            this.uid = uid;
        })
    }

    
    ngOnInit() {
        setTimeout(() => {
            console.log(this.uid);
            
        }, 800);
    }
    public goToHome(): void {
        this.router.navigateByUrl('/tabs/home');
    }

    public openLogin(): void {
        this.router.navigate(['/login']);
    }
    public logout() {
        // logout and redirect to home page
        this.authService.logout().then(() => {
            this.storage.set('uid', '');
            this.goToHome();
        
        })
    }
}
