import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from "@ionic/storage";
import { AngularFirestore } from "angularfire2/firestore";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    signupForm: FormGroup;
    usernameCtrl: FormControl;
    emailCtrl: FormControl;
    passwordForm: FormGroup;
    passwordCtrl: FormControl;
    confirmCtrl: FormControl;
    passwordLength: number = 0;

    static passwordMatch(group: FormGroup) {
        const password = group.get('password').value;
        const confirm = group.get('confirm').value;
        return password === confirm ? null : { matchingError: true };
    }

    constructor(
        fb: FormBuilder,
        private router: Router,
        private storage: Storage,
        private authService: AuthService,
        private userService: UserService,
        private firestore: AngularFirestore
    ) {
        this.usernameCtrl = fb.control('', Validators.required);
        this.emailCtrl = fb.control('', Validators.required);
        this.passwordCtrl = fb.control('', Validators.required);
        this.confirmCtrl = fb.control('', Validators.required);
        // Init signup form
        this.passwordForm = fb.group({
            password: this.passwordCtrl,
            confirm: this.confirmCtrl
        }, { Validators: SignupPage.passwordMatch });
        // Init password group
        this.signupForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            passwordForm: this.passwordForm
        });
        // Get length of password
        this.passwordCtrl.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(newValue => {
            this.passwordLength = newValue.length;
        })
    }

    ngOnInit() {
    }

    public signup(): void {
        // Create new user 
        this.authService.singUp(this.emailCtrl.value, this.passwordCtrl.value);
        // Connect to app
        setTimeout(() => {
            this.authService.signIn(this.emailCtrl.value, this.passwordCtrl.value)
            .then(() => {
                // Get uid of user logged
                this.authService.getUserLogged().subscribe(user => {
                    let uid: string = '';
                    uid = user.uid;
                    // Set uid to storage
                    this.storage.set('uid', uid);
                    console.log(uid + " - " + this.emailCtrl.value);
                    // Create user in database
                    this.userService.createNewUser(uid, this.usernameCtrl.value, this.emailCtrl.value, '', 'admin');
                    // Redirect to home page 
                    this.router.navigate(['/']);
                })
            })
        }, 800);
    }

}
