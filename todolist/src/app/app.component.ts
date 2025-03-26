import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [FormsModule, CommonModule],  
  template: `
    <div class="container">
      <h1>Gere sua senha!</h1>

      <div class="settings">
        <label for="length">Tamanho desejado?:</label>
        <input
          type="number"
          id="length"
          [(ngModel)]="passwordLength"
          min="4"
          max="32"
          placeholder="Ex: 12"
        />

        <div class="options">
          <label>
            <input type="checkbox" [(ngModel)]="includeNumbers" />
             Números
          </label>

          <label>
            <input type="checkbox" [(ngModel)]="includeSymbols" />
             Caracteres
          </label>

          <label>
            <input type="checkbox" [(ngModel)]="includeUppercase" />
             Letras maíusculas
          </label>
          
          <label>
            <input type="checkbox" [(ngModel)]="includeLowercase" />
             Letras minúsculas
          </label>
        </div>
      </div>

      <button (click)="generatePassword()">Criar Senha</button>

      <div *ngIf="generatedPassword" class="result">
        <strong>Senha:</strong>
        <input type="text" [value]="generatedPassword" readonly />
        <button (click)="copyToClipboard()">Copy</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 420px;
        margin: 60px auto;
        padding: 30px;
        border: 2px solid #2e8b57; /* Verde */
        border-radius: 12px;
        text-align: center;
        background-color: #ffffff;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        font-family: 'Verdana', sans-serif; /* Fonte verde */
      }

      h1 {
        font-family: 'Verdana', sans-serif;
        color: #2e8b57; /* Verde */
        margin-bottom: 20px;
      }

      .settings, .options {
        margin-bottom: 20px;
        font-size: 14px;
        text-align: left;
        color: #2e8b57; /* Verde */
      }

      label {
        display: block;
        margin-bottom: 8px;
      }

      input[type="number"],
      input[type="checkbox"] {
        margin-right: 10px;
      }

      input[type="text"] {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid #2e8b57; /* Verde */
        border-radius: 5px;
        font-size: 16px;
      }

      button {
        background-color: #2e8b57; /* Verde */
        color: white;
        border: none;
        padding: 12px 24px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: #228b22; /* Verde mais escuro */
      }

      button:active {
        background-color: #006400; /* Verde escuro */
      }

      button:focus {
        outline: none;
      }

      .result {
        margin-top: 20px;
      }

      .result input {
        background-color: #f1f1f1;
      }

      .result button {
        background-color: #2e8b57; /* Verde */
        color: #fff;
        margin-top: 10px;
        padding: 8px 20px;
      }

      .options label {
        display: inline-block;
        margin-right: 15px;
        color: #2e8b57; /* Verde */
      }
    `
  ]
})
export class AppComponent {
  title: string = 'Gerador de Senhas';

  passwordLength: number = 12;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  generatedPassword: string = '';

  generatePassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}[]<>?';
  
    let validChars = '';
  
    if (this.includeNumbers) validChars += numberChars;
    if (this.includeSymbols) validChars += symbolChars;
    if (this.includeUppercase) validChars += uppercaseChars;
    if (this.includeLowercase) validChars += lowercaseChars;
    
    // Se nenhuma opção foi selecionada, exibe um alerta de erro
    if (!this.includeNumbers && !this.includeSymbols && !this.includeUppercase && !this.includeLowercase) {
      alert('Por favor, selecione ao menos uma opção (números, caracteres, letras maiúsculas ou minúsculas).');
      return;
    }
  
    // Gerar a senha com os caracteres válidos
    this.generatedPassword = Array.from({ length: this.passwordLength }, () =>
      validChars.charAt(Math.floor(Math.random() * validChars.length))
    ).join('');
  }
  
  copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        alert('Senha copiada!');
      }).catch(err => {
        console.error('Erro ao copiar senha:', err);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = this.generatedPassword;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Senha copiada para a área de transferência!');
    }
  }
}
