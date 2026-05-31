import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../../../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login With Google': emptyProps(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Set User': props<{ user: User | null }>(),
    'Clear Error': emptyProps(),
  },
});
