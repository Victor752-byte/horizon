import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { Suspense } from 'react';

// Component to fetch and display account data
const AccountList = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  return (
    <div className='flex flex-wrap gap-6'>
      {accounts && accounts.data.map((a: Account) => (
        <BankCard
          key={a.id}
          account={a}
          userName={loggedIn?.firstName}
          showBalance
        />
      ))}
    </div>
  );
};

const MyBanksPage = () => {
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title='My Bank Accounts'
          subtext='Effortlessly manage your banking activities.'
        />
        <div className='space-y-4'>
          <h2 className='header-2'>Your cards</h2>

          {/* Suspense with a fallback loading state */}
          <Suspense fallback={<div>Loading accounts...</div>}>
            <AccountList />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default MyBanksPage;
