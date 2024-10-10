"use strict";
class TaxCalculator {
    constructor() {
        this.baseRate = 0.15; // Tasa base de impuesto
    }
    // Calculadora
    calculateTax(taxPayer) {
        const totalExpenses = taxPayer.expenses.reduce((acc, curr) => acc + curr, 0);
        const taxableIncome = taxPayer.annualIncome - totalExpenses;
        if (taxableIncome <= 0) {
            return 0; // Si no hay ingreso imponible, el impuesto es 0
        }
        return taxableIncome * this.baseRate; // Calcula el impuesto
    }
    // Deducción
    applyDeduction(taxPayer, deduction) {
        taxPayer.annualIncome -= deduction; // Aplica la deducción al ingreso
        return taxPayer;
    }
    // Informe
    generateReport(taxPayers) {
        return taxPayers.map(taxPayer => {
            const tax = this.calculateTax(taxPayer); // Calcula el impuesto para cada contribuyente
            return `<tr>
        <td>${taxPayer.name}</td>
        <td>$${taxPayer.annualIncome.toFixed(2)}</td>
        <td>$${taxPayer.expenses.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</td>
        <td>$${tax.toFixed(2)}</td>
      </tr>`;
        }).join(''); // Une todas las filas generadas
    }
}
// Datos
const taxCalculator = new TaxCalculator();
const taxPayers = [
    { name: "Haru Occon", annualIncome: 50000, expenses: [5000, 2000] },
    { name: "Leonel Messi", annualIncome: 75000, expenses: [10000, 4000, 1500] },
    { name: "Goku", annualIncome: 120000, expenses: [30000, 5000] }
];
document.addEventListener('DOMContentLoaded', () => {
    const reportElement = document.getElementById('tax-report');
    if (reportElement) {
        reportElement.innerHTML = taxCalculator.generateReport(taxPayers); // Genera el informe
    }
});
