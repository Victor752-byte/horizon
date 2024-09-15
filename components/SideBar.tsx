"use client"
import React, { useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = ({user}: SiderbarProps) => {
    const pathname = usePathname()
    const router = useRouter();

  useEffect(() => {
    router.prefetch('/my-banks');
    router.prefetch('/transaction-history');
    router.prefetch('/payment-transfer');
  }, [router]);

    const memoizedLinks = useMemo(() => {
        return sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return {
            ...item,
            isActive
          };
        });
      }, [pathname]);
      
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/' className='flex mb-12 cursor-pointer items-center gap-2'>
            <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Horizon logo'
            className='size-[24px] max-xl:size-14'
            />
            <h1 className='sidebar-logo'>Horizon</h1>
            </Link>
            {memoizedLinks.map((item)=>{
                return (
                    <Link 
                    href={item.route} 
                    key={item.label}
                    prefetch={true}
                    className={cn('sidebar-link', {
                        'bg-bank-gradient': item.isActive
                    })}>
                     <div className='relative size-6'>
                        <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({
                            'brightness-[3] invert-0': item.isActive
                        })}
                        />
                     </div>
                     <p className={cn('sidebar-label', {
                        '!text-white': item.isActive
                     })}>{item.label}</p>
                    </Link>
                )
            })}
            <PlaidLink user={user}/>
        </nav>
        <Footer user={user} type='desktop'/>
    </section>
  )
}

export default SideBar
