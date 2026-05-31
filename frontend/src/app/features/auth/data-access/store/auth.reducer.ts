import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState, initialAuthState } from '../../../../core/models/user.model';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginWithGoogle, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state): AuthState => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (): AuthState => ({
    ...initialAuthState,
  })),

  on(AuthActions.setUser, (state, { user }): AuthState => ({
    ...state,
    user,
    isAuthenticated: !!user,
    loading: false,
    error: null,
  })),

  on(AuthActions.clearError, (state): AuthState => ({
    ...state,
    error: null,
  }))
);
