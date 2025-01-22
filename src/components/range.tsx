import React from 'react';

const Range = () => {
  return (
    <div>
      <div className='text-center py-10'>
      <h1 className=' text-black font-poppins text-2xl '>Browse The Range</h1>
      <span className='text-gray-800 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>


      <div className=" mx-auto py-10 px-4">
      <div className="grid grid-cols-3 grid-rows-1 gap-6">
        
        <div className="text-center">
          <div >
            <img
              src="/dining.png" 
              alt="Dining"
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="mt-4 text-lg font-medium">Dining</p>
        </div>

        
        <div className="text-center">
          <div >
            <img
              src="/living.png" 
              alt="Living"
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="mt-4 text-lg font-medium">Living</p>
        </div>

        
        <div className="text-center">
          <div>
            <img
              src="/bedroom.png" 
              alt="Bedroom"
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="mt-4 text-lg font-medium">Bedroom</p>
        </div>



        
      </div>
    </div>
    </div>

    
  );
};

export default Range;
