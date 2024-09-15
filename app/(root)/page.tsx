import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

const Home = async({searchParams: { id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id})

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = id as string || accountsData[0]?.appwriteItemId;
  
  const account = await getAccount({appwriteItemId})
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <Suspense 
               fallback={
                <div className="flex-center size-full h-screen gap-3 text-bankGradient">
                  <Loader2
                          size={50}
                          className='animate-spin'
                          />
                  Loading...
                </div>
               }
               >
               <HeaderBox
               type="greeting" 
               title="Welcome"
               user={loggedIn?.firstName || 'Guest'}
               subtext="Access and manage your account and transactions efficiently"
               />
               </Suspense>
               <Suspense
               fallback={
                <div className="flex-center size-full h-screen gap-3 text-bankGradient">
                  <Loader2
                          size={50}
                          className='animate-spin'
                          />
                  Loading...
                </div>
               }
               >
               <TotalBalanceBox
               accounts={accountsData}
               totalBanks={accounts?.totalBanks}
               totalCurrentBalance={accounts?.totalCurrentBalance}
               />
               </Suspense>
            </header>
            <Suspense
            fallback={
              <div className="flex-center size-full h-screen gap-3 text-bankGradient">
                <Loader2
                        size={50}
                        className='animate-spin'
                        />
                Loading...
              </div>
             }
            >
            <RecentTransactions
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
            />
            </Suspense>
        </div>
        <Suspense fallback={<div>loading banks</div>}>
        <RightSideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
        />
        </Suspense>
        
    </section>
  )
}

export default Home
