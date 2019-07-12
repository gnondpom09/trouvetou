import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from "@ionic/storage";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    // Properties
    usernameCtrl: FormControl;
    passwordCtrl: FormControl;
    loginForm: FormGroup;

    constructor(
        //private userService: UserService,
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private storage: Storage
    ) {
        // Init login form
        this.usernameCtrl = fb.control('', Validators.required);
        this.passwordCtrl = fb.control('', Validators.required);
        this.loginForm = fb.group({
            username: this.usernameCtrl,
            password: this.passwordCtrl
        })
    }

    ngOnInit() {
    }

    public login() {
        // Connect to app
        this.authService.signIn(this.usernameCtrl.value, this.passwordCtrl.value)   
            .then(() => {
                this.authService.getUserLogged().subscribe(user => {
                    let uid = user.uid;
                    this.storage.set('uid', uid);
                })
            })
        // Redirect to home page 
        this.router.navigate(['/']);
    }

}
