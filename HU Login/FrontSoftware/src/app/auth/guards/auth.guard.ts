import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();

  const requiredRole = route.data?.['role'];

  // Caso 1: no hay sesión activa
  if (!user) {
    console.warn('No hay sesión activa. Redirigiendo a login.');
    router.navigate(['/login']);
    return false;
  }

  // Caso 2: si el usuario tiene el rol requerido, o es Admin (con acceso completo)
  if (user.role === requiredRole || user.role === 'Admin') {
    console.log(`Acceso permitido para rol ${user.role}`);
    return true;
  }

  // Caso 3: usuario autenticado pero sin permisos
  console.warn(`Acceso denegado para rol ${user.role}. Se requiere ${requiredRole}`);
  router.navigate(['/access-denied']);
  return false;
};
