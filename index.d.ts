declare module 'craco-alias';

type Locale = 'en' | 'fr';

type Status = 'not_started' | 'ready' | 'in_progress' | 'paid' | 'default';

interface Merchant {
  name: string;
}

interface Installment {
  id: string;
  due_date: number;
  status: Status;
  amount: number;
  fee: number;
}

interface Payment {
  id: string;
  status: Status;
  amount: number;
  created: number;
  merchant: Merchant;
  customer_name: string;
  installmentsCount: number;
  paymentPlan: Array<Installment>;
}

type PaymentInList = Omit<Payment, 'paymentPlan'>;

type Payments = Array<PaymentInList>;
