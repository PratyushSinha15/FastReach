import "../Custom.css"

const Welcome = () => {
  return (
    <div className='flex flex-col  justify-center'>
      <h1 className='text-neutral-50 text-5xl uppercase font-serif text-center animate-accordion-down '>fast-reach</h1>
      <div className='ml-12  mt-5'>
        <h2 className='text-neutral-50 text-2xl text-left'>Your go-to for smart travel planning.</h2>
        <h3 className='text-neutral-50 text-2xl'>Discover the fastest routes, save time, and make every journey memorable.</h3>
        <p className='text-neutral-50 text-2xl text-left'>Let's get you moving efficiently!</p>
      </div>
    </div>
  )
}

export default Welcome