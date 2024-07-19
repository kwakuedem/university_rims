import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Logo from'../Images/Logo.png'
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    return (

        <div className='min-h-screen relative'>
            <header className="flex w-full sticky top-0 bg-white  p-5 ">
                <div className="flex w-full lg:w-[70%] m-auto  bg-white ">
                    <Link href='/' className="flex lg:justify-center lg:col-start-2 gap-4">
                        <img src={Logo} alt="Logo" className='w-16'/>
                        <div className="htu hidden  lg:flex items-center">
                            <h2 className='text-blue-900 font-bold'>RESEARCH REPOSITORY HTU</h2>
                        </div>
                    </Link>
                </div>
            </header>

            <div className=" flex flex-col  p-36 items-center pt-6 sm:pt-0 bg-gray-100">
            
            <div className='mt-16'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>

       <Footer/>
        </div>
        
    );
}
