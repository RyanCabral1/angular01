import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h1>Calculadora de IMC</h1>

      <div *ngIf="showImcCalculator">
        <!-- Calculadora de IMC -->
        <div>
          <label for="peso">Peso (kg):</label>
          <input
            type="number"
            id="peso"
            [(ngModel)]="peso"
            min="0"
            placeholder="Ex: 70"
            aria-describedby="peso-help"
          />
          <small id="peso-help">Digite seu peso em quilogramas.</small>
        </div>

        <div>
          <label for="altura">Altura (m):</label>
          <input
            type="number"
            id="altura"
            [(ngModel)]="altura"
            min="0"
            placeholder="Ex: 1.75"
            aria-describedby="altura-help"
          />
          <small id="altura-help">Digite sua altura em metros.</small>
        </div>

        <button (click)="calcularIMC()">Calcular IMC</button>

        <div *ngIf="imc !== null" class="result">
          <strong>Seu IMC:</strong> {{ imc | number: '1.1-1' }}
          <p [ngClass]="resultClass">{{ imcMessage }}</p>
        </div>
      </div>

      <div *ngIf="!showImcCalculator">
        <!-- Tabela de Peso Ideal -->
        <h2>Peso Ideal para cada Altura</h2>
        <table>
          <thead>
            <tr>
              <th>Altura (m)</th>
              <th>Peso Ideal (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let altura of alturas">
              <td>{{ altura | number: '1.1-1' }} m</td>
              <td>{{ calcularPesoIdeal(altura) | number: '1.1-1' }} kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button (click)="toggleView()">
        {{ showImcCalculator ? 'Ver Peso Ideal' : 'Voltar ao IMC' }}
      </button>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 500px;
        margin: 60px auto;
        padding: 30px;
        border: 2px solid #003366;
        border-radius: 12px;
        text-align: center;
        background-color: #1c2b3d;
        color: #ffffff;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      h1, h2 {
        font-family: 'Verdana', sans-serif;
        color: #3399ff;
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-size: 16px;
        color: #ffffff;
      }

      input[type="number"] {
        padding: 10px;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px solid #3399ff;
        background-color: #1d2b3d;
        color: #ffffff;
      }

      button {
        background-color: #3399ff;
        color: white;
        border: none;
        padding: 12px 24px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: #228b22;
      }

      .result {
        margin-top: 20px;
        padding: 15px;
        background-color: #2e3b56;
        border-radius: 10px;
        color: #ffffff;
      }

      .result p {
        font-size: 18px;
        font-weight: bold;
      }

      .normal-weight {
        color: #66ff66;
      }

      .overweight {
        color: #ffcc00;
      }

      .obese {
        color: #ff3333;
      }

      table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        background-color: #2e3b56;
        border-radius: 10px;
      }

      table th, table td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #3399ff;
      }

      table th {
        background-color: #003366;
        color: #ffffff;
      }

      table tr:nth-child(even) {
        background-color: #1d2b3d;
      }
    `
  ]
})
export class AppComponent {
  title: string = 'Calculadora de IMC';
  peso: number = 0;
  altura: number = 0;
  imc: number | null = null;
  imcMessage: string = '';
  resultClass: string = '';
  showImcCalculator: boolean = true; // Controla a exibição das telas

  // Faixa de alturas para mostrar na tabela
  alturas: number[] = Array.from({ length: 21 }, (_, i) => 1.4 + i * 0.1);

  // Calcula o IMC
  calcularIMC() {
    if (this.peso > 0 && this.altura > 0) {
      this.imc = this.peso / (this.altura * this.altura);

      // Exibe a mensagem do IMC
      if (this.imc < 18.5) {
        this.imcMessage = 'Abaixo do peso';
        this.resultClass = 'below-weight';
      } else if (this.imc >= 18.5 && this.imc < 24.9) {
        this.imcMessage = 'Peso normal';
        this.resultClass = 'normal-weight';
      } else if (this.imc >= 25 && this.imc < 29.9) {
        this.imcMessage = 'Sobrepeso';
        this.resultClass = 'overweight';
      } else {
        this.imcMessage = 'Obesidade';
        this.resultClass = 'obese';
      }
    } else {
      alert('Por favor, insira valores válidos para peso e altura.');
      this.imc = null;
    }
  }

  // Calcula o peso ideal para a altura
  calcularPesoIdeal(altura: number): number {
    const imcIdeal = 22; // IMC ideal de 22
    return imcIdeal * (altura * altura);
  }

  // Alterna entre a tela do IMC e a tela do peso ideal
  toggleView() {
    this.showImcCalculator = !this.showImcCalculator;
  }
}
