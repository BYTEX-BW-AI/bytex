import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, authState, User as FirebaseUser } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private ngZone = inject(NgZone);

  /** Observable del usuario autenticado (Firebase → User local) */
  user$: Observable<User | null> = authState(this.auth).pipe(
    map(firebaseUser => this.mapFirebaseUser(firebaseUser))
  );

  /** Token ID actual */
  token$: Observable<string | null> = authState(this.auth).pipe(
    switchMap(user => user ? from(user.getIdToken()) : of(null))
  );

  /** Iniciar sesión con Google */
  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(this.ngZone.runOutsideAngular(() =>
      signInWithPopup(this.auth, provider)
    )).pipe(
      map(result => this.mapFirebaseUser(result.user)!)
    );
  }

  /** Cerrar sesión */
  logout(): Observable<void> {
    return from(this.ngZone.runOutsideAngular(() => signOut(this.auth)));
  }

  /** Obtener token actual */
  getToken(): Promise<string | null> {
    return this.auth.currentUser?.getIdToken() || Promise.resolve(null);
  }

  private mapFirebaseUser(firebaseUser: FirebaseUser | null): User | null {
    if (!firebaseUser) return null;
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || 'Usuario',
      photoURL: firebaseUser.photoURL || undefined,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
    };
  }
}
