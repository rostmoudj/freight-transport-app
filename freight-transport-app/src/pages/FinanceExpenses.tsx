import { FormEvent, useMemo, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { addExpense, getExpenseTypeOptions, getExpenses } from '../services/financeService';
import { ExpenseType } from '../types/finance';

const FinanceExpenses = () => {
    const [expenses, setExpenses] = useState(getExpenses());
    const [type, setType] = useState<ExpenseType>('وقود');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('02/03/2026');
    const [description, setDescription] = useState('');
    const [linkedTo, setLinkedTo] = useState('');

    const totalExpenses = useMemo(
        () => expenses.reduce((sum, item) => sum + item.amount, 0),
        [expenses]
    );

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!amount || !description) {
            return;
        }

        const created = addExpense({
            type,
            amount: Number(amount),
            date,
            description,
            linkedTo,
        });

        setExpenses([created, ...expenses]);
        setAmount('');
        setDescription('');
        setLinkedTo('');
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">المصاريف</h2>
                <p className="panel-subtitle">تسجيل المصروف وربطه برحلة أو مركبة أو سائق</p>

                <form className="trip-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label>
                            نوع المصروف
                            <select value={type} onChange={(event) => setType(event.target.value as ExpenseType)}>
                                {getExpenseTypeOptions().map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            المبلغ (دج)
                            <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" min={1} />
                        </label>
                        <label>
                            التاريخ
                            <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="DD/MM/YYYY" />
                        </label>
                        <label>
                            ربط بكيان (اختياري)
                            <input
                                value={linkedTo}
                                onChange={(event) => setLinkedTo(event.target.value)}
                                placeholder="TR-2401 أو veh-1 أو drv-2"
                            />
                        </label>
                    </div>
                    <label>
                        الوصف
                        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
                    </label>
                    <button className="primary-btn" type="submit">
                        <PlusCircle size={16} />
                        تسجيل المصروف
                    </button>
                </form>
            </div>

            <div className="panel fade-in-up">
                <div className="trips-head">
                    <h3 className="panel-title">سجل المصاريف</h3>
                    <span className="status delayed">الإجمالي: {new Intl.NumberFormat('fr-DZ').format(totalExpenses)} دج</span>
                </div>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>النوع</th>
                                <th>المبلغ</th>
                                <th>التاريخ</th>
                                <th>الوصف</th>
                                <th>مرتبط بـ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td data-label="النوع">{expense.type}</td>
                                    <td data-label="المبلغ">{new Intl.NumberFormat('fr-DZ').format(expense.amount)} دج</td>
                                    <td data-label="التاريخ">{expense.date}</td>
                                    <td data-label="الوصف">{expense.description}</td>
                                    <td data-label="مرتبط بـ">{expense.linkedTo || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FinanceExpenses;
