import { Injectable, inject, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthActions } from '../store/auth.actions';
import { selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../store/auth.selectors';
import { User } from '../../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private store = inject(Store);

  user: Signal<User | null> = toSignal(this.store.pipe(select(selectUser)), { initialValue: null });
  isAuthenticated: Signal<boolean> = toSignal(this.store.pipe(select(selectIsAuthenticated)), { initialValue: false });
  loading: Signal<boolean> = toSignal(this.store.pipe(select(selectAuthLoading)), { initialValue: false });
  error: Signal<string | null> = toSignal(this.store.pipe(select(selectAuthError)), { initialValue: null });

  loginWithGoogle(): void {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  setUser(user: User | null): void {
    this.store.dispatch(AuthActions.setUser({ user }));
  }

  clearError(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
