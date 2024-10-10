interface TaxPayer {
  name: string;
  annualIncome: number;
  expenses: number[];
}

class TaxCalculator {
  private baseRate: number = 0.15;

  // Calculadora
  calculateTax(taxPayer: TaxPayer): number {
    const totalExpenses = taxPayer.expenses.reduce((acc, curr) => acc + curr, 0);
    const taxableIncome = taxPayer.annualIncome - totalExpenses;
    if (taxableIncome <= 0) {
      return 0;
    }
    return taxableIncome * this.baseRate;
  }

  // Deducción
  applyDeduction(taxPayer: TaxPayer, deduction: number): TaxPayer {
    taxPayer.annualIncome -= deduction;
    return taxPayer;
  }

  // Informe
  generateReport(taxPayers: TaxPayer[]): string {
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
const taxPayers: TaxPayer[] = [];

// Manejar el envío del formulario
document.getElementById('tax-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener los valores del formulario
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const annualIncome = parseFloat((document.getElementById('annualIncome') as HTMLInputElement).value);
  const expensesInput = (document.getElementById('expenses') as HTMLInputElement).value;

  // Validar que los gastos sean números y no estén vacíos
  const expenses = expensesInput.split(',').map(expense => parseFloat(expense.trim())).filter(expense => !isNaN(expense) && expense >= 0);

  // Validar ingreso anual
  if (isNaN(annualIncome) || annualIncome < 0) {
    alert('El ingreso anual debe ser un número positivo.');
    return;
  }

  // contribuyente
  const newTaxPayer: TaxPayer = { name, annualIncome, expenses };
  taxPayers.push(newTaxPayer);

  // informe
  const reportElement = document.getElementById('tax-report');
  if (reportElement) {
    reportElement.innerHTML = taxCalculator.generateReport(taxPayers);
  }

  // Reiniciar el formulario
  (document.getElementById('tax-form') as HTMLFormElement).reset();
});
