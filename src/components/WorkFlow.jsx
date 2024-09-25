import {CheckCircle2, ImagePlay} from 'lucide-react'
import codeImg from '../assets/code.jpg'
import designer from '../assets/Designer.png'
import {checklistItems} from '../constants'

const WorkFlow = () => {
  return (
    <div className='mt-20'>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6">
      Our Creative Process: 
      <span className='bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text'> Bringing Your Mosaic Art to Life</span>
      </h2>
      <div className="flex flex-wrap justify-center">
      <div className="p-20 rounded-xl w-full lg:w-1/2 overflow-hidden">
        <img src={designer} className='rounded-lg' alt="" />
      </div>

        <div className="p-2 w-full lg:w-1/2">
          {checklistItems.map((item,index)=>(
            <div key={index} className='flex mb-12'>
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2/>
              </div>
              <div>
                <h5 className='mt-1 mb-2 text-xl'>{item.title}</h5>
                <p className='text-md text-neutral-500'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkFlow
