import MobileNavbar from "@/components/MobileNavbar";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const loggedIn = {
      firstName: 'Tochukwu',
      lastName: 'Victor'
    }
    return (
      <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>
        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image
            src='/icons/logo.svg'
            width={30}
            height={30}
            alt='menu icon'
            />
            <div>
            <MobileNavbar user={loggedIn}/>
            </div>
          </div>
          {children}
        </div>
        
      </main>
    );
  }
  