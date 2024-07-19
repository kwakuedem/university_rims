import { Link, Head } from '@inertiajs/react';
import Logo from '../Images/Logo.png'
import { FaSearch } from "react-icons/fa";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <header className="flex w-full bg-white  p-5 ">
                            <div className="flex w-full lg:w-[70%] m-auto  bg-white ">
                                <Link className="flex lg:justify-center lg:col-start-2 gap-4">
                                    <img src={Logo} alt="Logo" className='w-16'/>
                                    <div className="htu flex items-center">
                                        <h2 className='text-blue-900 font-bold'>RESEARCH REPOSITORY HTU</h2>
                                    </div>
                                </Link>

                                <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className='flex items-center'>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 font-bold text-blue-900 ring-1 ring-transparent transition hover:text-blue-900/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-blue-900 hover:border-b-2 border-b-blue-900 dark:hover:text-blue-900/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 font-bold text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] hover:border-b-2 border-b-blue-900 dark:text-blue-900 dark:hover:text-blue-900/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                            </div>
                        </header>
                        <div className='h-2 bg-red-500 border-spacing-10'/>
                        <main className="w-full bg-white ">
                            <div className="content  bg-white">
                                <div className='htu-blue-background '>
                                    <div className=" lg:w-[70%]  htu-blue-background flex m-auto justify-center items-center px-32 py-8">
                                        <div className="text flex flex-col flex-3">
                                            <h2 className='font-bold text-2xl'> Welcome to Research Repository HTU</h2>
                                            <p className=''>Research Repository HTU
                                                is a digital collection of open access scholarly research 
                                                publications from <br /><a className='htu-red' href="htu.edu.gh">Ho Technical University</a>. Research Repository HTU collects, 
                                                preserves and makes freely available publications including peer-reviewed articles,
                                                working papers and conference papers created by HTU researchers. Where material 
                                                has already been published it is made available subject to the open-access policies 
                                                of the original publishers. 
                                                This service is maintained by <a  className='htu-red' href="htu.edu.gh/elibrary">HTU Library</a>.
                                            </p>
                                        </div>
                                        <div className="logo flex">
                                            <img src={Logo} alt="logo" srcset="" className='w-[800px]'/>
                                        </div>
                                    </div>
                                </div>
                                

                                <div className="search-div bg-white py-3">
                                    <form action="" className='w-[40%] m-auto' onSubmit={(e)=>{e.preventDefault();}}>
                                        <div className=' flex bg-green-400 justify-center rounded-md'>
                                            <button className='px-2 bg-red-600 rounded-l-md'>All DSapce</button>
                                            <input type="text" className='flex-1 text-gray-600 ring-blue-900 focus:ring-0'  name='search' placeholder='Search for publications ....' />
                                            <button className='bg-blue-500 rounded-r-md px-2 flex justify-center items-center'><FaSearch /> search</button>
                                        </div>
                                    </form>
                                </div>


                            </div>
                            
                        </main>

                        <footer className="py-16 text-center bg-blue-900 text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
