import {Menu, Turtle, X} from 'lucide-react'
import {useState} from 'react'
import { Link } from 'react-scroll';
import logo from '../assets/channels4_profile.jpg'
import {navItems} from '../constants'

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrowerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrowerOpen(!mobileDrawerOpen);
    }
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center flex-shrink-0">
                    <Link to="hero_section"
                     smooth={true} 
                    offset={-100}   
                    duration={500}
                    className="flex items-center hover:cursor-pointer flex-shrink-0"
                    >
                    <img className='h-10 rounded-full w-10 mr-2' src={logo} alt="" />
                    <span className='text-xl tracking-tight'>Pixel Cube Art</span>
                    </Link>
                </div>
                <ul className='hidden hover:cursor-pointer lg:flex ml-14 space-x-12'>
                    {navItems.map((item, index)=>(
                        <li key={index}>
                             <Link to={item.to} smooth={true} offset={item.offset} duration={item.duration}>
                            {item.label}
                            </Link>
                        </li>
                    ))}
                    
                </ul>
                <div className="hidden lg:flex justify-center  space-x-12 items-center">
                    <a href="https://wa.me/918156853900" target='_blank' className='bg-gradient-to-r from-pink-500 to-purple-800 py-2 px-3 rounded-md'>
                        Book Now
                    </a>
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={toggleNavbar}>
                        {mobileDrawerOpen ? <X/> : <Menu/>}
                    </button>
                </div>
            </div>
            {mobileDrawerOpen && (
                <div className="fixed right-0 z-20 hover:cursor-pointer bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className='py-4'>
                                <Link to={item.to} smooth={true} offset={item.offset} duration={[item.duration]}>
                                {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-6">
                    <a href="https://wa.me/918156853900" target='_blank' className='bg-gradient-to-r from-pink-500 to-purple-800 py-2 px-3 rounded-md'>
                        Book Now
                    </a>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar
