function Form() {
  return (
    <>
    <div>
      <h1 className="header text-center">Join us</h1>
      <p className="text-sm text-center">Join our newsletter and stay updated on new features and releases.</p>
    </div>
      <div className="mt-10 ">
        <span className="flex gap-5">   
            <input 
            type="text" 
            className="bg-gray flex-1 border border-black px-3 py-2 outline-none" 
            placeholder="Enter your name"
            />
            <input 
            type="text" 
            className="bg-gray flex-1 border border-black px-3 py-2 outline-none" 
            placeholder="Enter your email"
            />
            
        </span>
        <textarea 
            name="message" 
            className="bg-gray w-full border border-black mt-5 outline-none px-3 py-2 resize-none h-80" 
            placeholder="Enter your message"
        />   
      </div>
      <button className="bg-primary px-10 py-2 rounded-3xl text-sm font-normal border border-black mt-5 mb-10">Submit</button>
    </>
  )
}

export default Form
