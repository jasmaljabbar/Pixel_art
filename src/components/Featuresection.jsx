import {features} from '../constants'
const Featuresection = () => {
  return (
    <div id="Features" className='relative mt-20 border-b border-neutral-800 min-h-[800px]'>
      <div className="text-center">
        <span className='bg-neutral-900 text-pink-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase'>
            feature
        </span>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide '>
            Give an ama
            <span className='bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text'>
                zing gift
            </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index)=>(
            <div key={index} className='w-full sm:1/2 lg:w-1/3'>
                <div className="flex">
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutural-900 text-oange-700 justify-center iter-center rounded-full">
                        {feature.icon}
                    </div>
                    <div>
                        <h5 className='mt-1 mb-6 text-xl'>{feature.text}</h5>
                        <p>{feature.description}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Featuresection
