export class AppError {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly details?: Record<string, string[]>,
    public readonly originalError?: unknown
  ) {}

  static fromHttp(error: unknown): AppError {
    // Mapear errores HTTP a AppError
    return new AppError('UNKNOWN', 'Ocurrió un error inesperado');
  }

  static fromFirebase(error: { code: string; message: string }): AppError {
    const messages: Record<string, string> = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Este email ya está registrado',
      'auth/too-many-requests': 'Demasiados intentos. Intenta de nuevo más tarde',
    };
    return new AppError(
      error.code,
      messages[error.code] || error.message
    );
  }
}
