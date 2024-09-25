
import jq_4 from '../assets/jq_4.mp4';
import pixel from '../assets/PIXEL.mp4'
import jq_3 from '../assets/jq_3.mp4';
import { Link } from "react-scroll";


const HeroSection = () => {
  return (
    <div id='hero_section' className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
        Create Stunning Mosaic Art with Rubik's Cubes –
        <span className='bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text'> A Unique Gift Experience!</span>
        </h1>
        <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
        Turn your favorite photos into breathtaking mosaic art made entirely from Rubik's cubes. 
        Whether it's a surprise gift or a personal keepsake, we provide a high-quality video and 
        photo of the entire creation process. Let us help you craft unforgettable moments for your 
        loved ones with a truly one-of-a-kind gift.
        </p>
        <div className="flex justify-center my-10">
            <Link 
              to="Our_works" 
              smooth={true} 
              offset={-100}   
              duration={500}
              className='bg-gradient-to-r hover:cursor-pointer from-pink-500 to-purple-800 py-3 px-4 mx-3 rounded-md'  
            >
              Explore More
            </Link>
        </div>
        <div id='Our_works' className="flex flex-wrap mt-10 justify-center">
            <video autoPlay loop muted className='rounded-lg w-full sm:w-1/4 border border-orange-700 shadow-orange-400 mx-2 my-4'>
            <source src={jq_4} type="video/mp4"/>
            Your browse does not support this video tag.
            </video>
            <video autoPlay loop muted className='rounded-lg w-full sm:w-1/4 border border-orange-700 shadow-orange-400 mx-2 my-4'>
            <source src={pixel} type="video/mp4"/>
            Your browse does not support this video tag.
            </video>
            <video autoPlay loop muted className='rounded-lg w-full sm:w-1/4 border border-orange-700 shadow-orange-400 mx-2 my-4'>
            <source src={jq_3} type="video/mp4"/>
            Your browse does not support this video tag.
            </video>
        </div>
    </div>
  )
}

export default HeroSection
