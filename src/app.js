"use strict";
var _a;
class TaxCalculator {
    constructor() {
        this.baseRate = 0.15;
    }
    // Calculadora
    calculateTax(taxPayer) {
        const totalExpenses = taxPayer.expenses.reduce((acc, curr) => acc + curr, 0);
        const taxableIncome = taxPayer.annualIncome - totalExpenses;
        if (taxableIncome <= 0) {
            return 0;
        }
        return taxableIncome * this.baseRate;
    }
    // Deducción
    applyDeduction(taxPayer, deduction) {
        taxPayer.annualIncome -= deduction;
        return taxPayer;
    }
    // Informe
    generateReport(taxPayers) {
        return taxPayers.map(taxPayer => {
            const tax = this.calculateTax(taxPayer);
            return `<tr>
        <td>${taxPayer.name}</td>
        <td>$${taxPayer.annualIncome.toFixed(2)}</td>
        <td>$${taxPayer.expenses.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</td>
        <td>$${tax.toFixed(2)}</td>
      </tr>`;
        }).join('');
    }
}
const taxCalculator = new TaxCalculator();
const taxPayers = [];
// Manejar el envío del formulario
(_a = document.getElementById('tax-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault();
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);
    const expensesInput = document.getElementById('expenses').value;
    // Validar que los gastos sean números y no estén vacíos
    const expenses = expensesInput.split(',').map(expense => parseFloat(expense.trim())).filter(expense => !isNaN(expense) && expense >= 0);
    // Validar ingreso anual
    if (isNaN(annualIncome) || annualIncome < 0) {
        alert('El ingreso anual debe ser un número positivo.');
        return;
    }
    // contribuyente
    const newTaxPayer = { name, annualIncome, expenses };
    taxPayers.push(newTaxPayer);
    // informe
    const reportElement = document.getElementById('tax-report');
    if (reportElement) {
        reportElement.innerHTML = taxCalculator.generateReport(taxPayers);
    }
    // Reiniciar el formulario
    document.getElementById('tax-form').reset();
});
