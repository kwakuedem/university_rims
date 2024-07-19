import { Link, Head } from '@inertiajs/react';
import Logo from '../Images/Logo.png'
import { FaSearch } from "react-icons/fa";
import Footer from '@/Components/Footer';

export default function Welcome({ auth}) {

    const submissions=[
        {
            "id":1,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researcher",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis praesentium molestias tempore porro incidunt, aperiam accusamus commodi error dolor, cum officia, nemo iusto dolorem eos ea eum recusandae modi tempora.",
            "associate":"Ho University Association,2003",
            "author":"O'Edem,Eric.J,Eddy.H",
            "date":"2024-07-02",
        },

        {
            "id":1,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researcher",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis praesentium molestias tempore porro incidunt, aperiam accusamus commodi error dolor, cum officia, nemo iusto dolorem eos ea eum recusandae modi tempora.",
            "associate":"Ho University Association,2003",
            "author":"O'Edem",
            "date":"2024-04-02",
        },

        {
            "id":1,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researcher",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis praesentium molestias tempore porro incidunt, aperiam accusamus commodi error dolor, cum officia, nemo iusto dolorem eos ea eum recusandae modi tempora.",
            "associate":"Ho University Association,2003",
            "author":"Eric.J,Eddy.H",
            "date":"2024-02-02",
        },

    ]

    const downloaded=[
        {
            "id":1,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researchers. Where material has already been published it is m",
            "associate":"Ho University Association,2003",
            "author":"O'Edem,Eric.J,Eddy.H",
            "down":2407
        },
        {
            "id":2,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researchers. Where material has already been published it is m",
            "associate":"Ho University Association,2024",
            "author":"O'J,Eddy.H",
            "down":2009
        },
        {
            "id":3,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researchers. Where material has already been published it is m",
            "associate":"Tema University Association,2010",
            "author":"O'Edem,Eric.J,Eddy.H",
            "down":2207
        },
        {
            "id":4,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researchers. Where material has already been published it is m",
            "associate":"Tamale University Association,2012",
            "author":"O'Edem",
            "down":5000
        },
        {
            "id":5,
            "badge":"Publication",
            "title":"working papers and conference papers created by HTU researchers. Where material has already been published it is m",
            "associate":"Accra University Association,2003",
            "author":"O'Edem,Eric.J",
            "down":2407
        }
    ]
   

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <header className="flex w-full bg-white shadow-sm shadow-red-500 sticky top-0  p-5 ">
                            <div className="flex w-full lg:w-[70%] m-auto  bg-white ">
                                <div className='flex items-center gap-9'>
                                    <Link className="flex lg:justify-center lg:col-start-2 gap-4">
                                        <img src={Logo} alt="Logo" className='w-16'/>
                                        <div className="htu hidden lg:flex items-center">
                                            <h2 className='text-blue-900 font-bold'>RESEARCH REPOSITORY HTU</h2>
                                        </div>
                                    </Link>
                                    <div className='flex gap-3'>
                                        <Link className='text-blue-900/80'>Colleges & Schools</Link>
                                        <Link className='text-blue-900/80'>Statistics</Link>
                                        <Link className='text-blue-900/80'>All of DSpace</Link>
                                    </div>
                                </div>
                                

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
                        <main className="w-full bg-white mb-16">
                            <div className="content  bg-white">
                                <div className='htu-blue-background '>
                                    <div className="w-full lg:w-[90%] 2xl:w-[70%]  htu-blue-background justify-center items-center lg:flex lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                        <div className="text flex flex-col flex-3">
                                            <h2 className='font-bold text-center text-lg lg:text-left lg:text-2xl'> Welcome to Research Repository HTU</h2>
                                            <p className='text-lg'>Research Repository HTU
                                                is a digital collection of open access scholarly research 
                                                publications from <br className=' hidden lg:visible'/><a className='htu-red' href="htu.edu.gh">Ho Technical University</a>. Research Repository HTU collects, 
                                                preserves and makes freely available publications including peer-reviewed articles,
                                                working papers and conference papers created by HTU researchers. Where material 
                                                has already been published it is made available subject to the open-access policies 
                                                of the original publishers. 
                                                This service is maintained by <a  className='htu-red' href="htu.edu.gh/elibrary">HTU Library</a>.
                                            </p>
                                        </div>
                                        <div className="logo  hidden lg:flex">
                                            <img src={Logo} alt="logo" srcset="" className='lg:w-[800px]'/>
                                        </div>
                                    </div>
                                </div>
                                

                                <div className="search-div bg-white py-8">
                                    <form action="" className='w-[40%] m-auto' onSubmit={(e)=>{e.preventDefault();}}>
                                        <div className=' flex bg-green-400 justify-center rounded-md'>
                                            <button className='px-2 text-lg text-white bg-red-600 rounded-l-md'>All DSapce</button>
                                            <input type="text" className='flex-1 text-gray-600 ring-blue-900 focus:ring-0'  name='search' placeholder='Search the repository....' />
                                            <button className='bg-blue-500 text-lg text-white rounded-r-md px-2 flex justify-center items-center'><FaSearch className='text-lg text-white'/> search</button>
                                        </div>
                                    </form>
                                </div>


                                <div className="submission-section grid lg:grid-cols-2 gap-10 lg:w-[70%] lg:m-auto pt-8">
                                    <div className='border-2'>
                                        <div className=" bg-gray-200 p-3 rounded-t-md most-downloaded">
                                            <h2 className='text-lg text-blue-900/80 font-bold'>Most downloaded</h2>
                                        </div>

                                        {downloaded.map(download=>(
                                        <div key={download.id} className='flex flex-col gap-3 px-4 pt-4'>
                                            <span className='htu-blue-background w-24 flex justify-center rounded-lg font-bold text-white'>{download.badge}</span>
                                            <Link href={`/downloads/${download.id}`} className=' text-blue-900/90 font-bold'>{download.title} <span className='text-gray-500'>({download.associate}) <span className='text-blue-900/90'>{download.author}</span></span></Link>
                                            <span className='bg-red-500/90 w-24 flex justify-center items-center gap-2 rounded-lg font-bold text-white'><FaSearch /><span>{download.down}</span> </span>
                                            <hr className='h-6'/>
                                        </div>
                                        ))}
                                        
                                    </div>
                                    
                                    <div className='border-2'>
                                        <div className=" bg-gray-200 p-3 rounded-t-md recent-submissions">
                                            <h2 className='text-lg text-blue-900/80 font-bold'>Most downloaded</h2>
                                        </div>

                                        {submissions.map(submission=>(
                                        <div key={submission.id} className='flex flex-col gap-3 px-4 pt-4'>
                                            <span className='htu-blue-background w-24 flex justify-center rounded-lg font-bold text-white'>{submission.badge}</span>
                                            <Link href={`/submissions/${submission.id}`} className='text-lg text-blue-900/90 font-bold'>{submission.title} <span className='text-gray-500'>({submission.associate}), {submission.date} <span className='text-blue-900/90'>{submission.author}</span></span></Link>
                                            <span className='text-blue-900/90'>{submission.text}</span>
                                            <hr className='h-6'/>
                                        </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                            
                        </main>

                    <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}
