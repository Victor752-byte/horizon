import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Tochukwu', lastName: 'Victor', email: 'obiohavictor20@gmail.com'}
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <HeaderBox
               type="greeting"
               title="welcome"
               user="Tochukwu"
               subtext="Access and manage your account and transactions efficiently"
               />
               <TotalBalanceBox
               accounts={[]}
               totalBanks={1}
               totalCurrentBalance={1250.35}
               />
            </header>
            {/* RECENT TRANSACTIONS */}
        </div>
        <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 1250.35}, {currentBalance: 1250.35}]}
        />
    </section>
  )
}

export default Home
