import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { ToastService } from '../ui/toast-messages/shared/toast.service';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private toast: ToastService) {

            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth;
            });
          }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    return this.authState['displayName'] || 'Username';
  }

  //// Social Auth ////
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  // facebookLogin() {
  //   const provider = new firebase.auth.FacebookAuthProvider()
  //   return this.socialSignIn(provider);
  // }

  // twitterLogin(){
  //   const provider = new firebase.auth.TwitterAuthProvider()
  //   return this.socialSignIn(provider);
  // }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.authState = credential.user;
        this.updateUserData();
        this.handleLoginSuccess();
      })
      .catch(error => this.handleError(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.handleLoginSuccess();
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.handleLoginSuccess();
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.toast.sendMessage('Email sent!', 'success'))
      .catch((error) => this.handleError(error));
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
    this.toast.sendMessage('Logout successful', 'info');
  }

  //// Helpers ////
  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
                  email: this.authState.email,
                  name: this.authState.displayName
                }

    this.db.object(path).update(data)
    .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    this.toast.sendMessage(error.message, 'warning');
  }

  // Default success handeling on login success
  private handleLoginSuccess() {
    this.toast.sendMessage('Login successful!', 'success');
  }
}
