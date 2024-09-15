'use client';
import { useEffect, useState } from 'react';
import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const TransactionsPage = ({ searchParams: { id, page }}: SearchParamProps) => {
  const [account, setAccount] = useState<any>(null); // Initialize as null
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedIn = await getLoggedInUser();
        const accounts = await getAccounts({ userId: loggedIn.$id });
        const accountsData = accounts?.data;

        if (accountsData && accountsData.length > 0) {
          const appwriteItemId = accountsData[0]?.appwriteItemId;
          if (appwriteItemId) {
            const accountData = await getAccount({ appwriteItemId });
            setAccount(accountData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Remove `currentPage` from dependencies

  if (loading) return (
    <div className='transactions'>
    <div className='transactions-header'>
        <HeaderBox
          title='Transaction History'
          subtext='See your bank details and transactions'
        />
      </div>
    <div className="flex-center size-full h-screen gap-3 text-bankGradient">
      <Loader2 size={50} className='animate-spin' />
      Loading Transaction history...
    </div>
    </div>
  );

  if (!account || !account.transactions) return (
    <div>No data available</div>
  );

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
          title='Transaction History'
          subtext='See your bank details and transactions'
        />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'>
          <h2 className='text-18 font-bold text-white'>{account.data?.name || 'N/A'}</h2>
          <p className='text-14 text-blue-25'>{account.data?.officialName || 'N/A'}</p>
          <p className='text-14 font-semibold tracking-[1.1px] text-white'>
            &#9679;&#9679;&#9679;&#9679; {account.data?.mask || 'N/A'}
          </p>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current balance</p>
            <p className='text-24 text-center font-bold'>{formatAmount(account.data?.currentBalance) || 'N/A'}</p>
          </div>
        </div>

        <section className='flex w-full flex-col gap-6'>
          <TransactionsTable transactions={currentTransactions} />
          
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionsPage;
