export type Transaction = { id: string; title: string; who: string; date: string; txnId: string; amount: number; credit?: boolean };

export const walletBalance = 23_893.0;

export const transactions: Transaction[] = [
  { id: 'txn-1', title: 'Course enrollment - Advanced React Development', who: 'Sarah Johnson', date: '2025-01-15', txnId: 'TXN-2025-001', amount: 499 },
  { id: 'txn-2', title: 'Course enrollment - Leadership Excellence Program', who: 'Michael Chen', date: '2025-02-01', txnId: 'TXN-2025-002', amount: 799 },
  { id: 'txn-3', title: 'Course enrollment - Leadership Excellence Program', who: 'Michael Chen', date: '2025-02-01', txnId: 'TXN-2025-002', amount: 799 },
  { id: 'txn-4', title: 'Course cancellation refund', who: 'John Doe', date: '2025-01-28', txnId: 'TXN-2025-003', amount: 299, credit: true },
  { id: 'txn-5', title: 'Course cancellation refund', who: 'John Doe', date: '2025-01-28', txnId: 'TXN-2025-003', amount: 299, credit: true },
  { id: 'txn-6', title: 'Course enrollment - Data Analytics', who: 'Emily Rodriguez', date: '2024-12-10', txnId: 'TXN-2024-089', amount: 349 },
  { id: 'txn-7', title: 'Course enrollment - Data Analytics', who: 'Emily Rodriguez', date: '2024-12-10', txnId: 'TXN-2024-089', amount: 349 },
];
