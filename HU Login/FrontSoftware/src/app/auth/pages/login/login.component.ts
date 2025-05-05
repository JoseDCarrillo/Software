import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])/),               // al menos una mayúscula
        Validators.pattern(/(?=.*[a-z])/),               // al menos una minúscula
        Validators.pattern(/(?=.*\d)/),                  // al menos un número
        Validators.pattern(/(?=.*[!@#$%^&*()])/),        // al menos un carácter especial
      ]]
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = this.getPasswordError();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const role = response.role;
        if (role === 'Admin') this.router.navigate(['/admin']);
        else if (role === 'Editor') this.router.navigate(['/editor']);
        else if (role === 'Reader') this.router.navigate(['/reader']);
        else this.router.navigate(['/access-denied']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }

  getPasswordError(): string {
    const errors = this.password?.errors;
    if (!errors) return '';

    if (errors['required']) return 'La contraseña es obligatoria';
    if (errors['minlength']) return 'Debe tener al menos 8 caracteres';
    if (errors['pattern']) return 'Debe incluir mayúscula, minúscula, número y carácter especial';

    return 'Contraseña inválida';
  }
}
