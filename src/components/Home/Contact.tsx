function Contact() {
  return (
    <div id="contact" className='pt-36 container mx-auto' >
      <h1 className='text-3xl font-bold text-center'>Contact</h1>
      <div className="container mx-auto mt-16 contact bg-cover bg-no-repeat bg-center ">
      <div className="w-full">
        <form className="w-2/6 mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                E-mail
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" required />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Message
              </label>
              <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message" required></textarea>
            </div>
          </div>
            <div className="w-full flex justify-center">
              <button className="btn font-sans" type="button">
                Submit
              </button>
            </div>
            <div className="md:w-2/3"></div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Contact