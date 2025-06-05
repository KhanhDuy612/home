export default function ContactForm() {
    return (
      <section className="bg-gradient-to-br from-[#2b3a50] via-[#5f7086] to-[#c0d0e0] py-16 px-4">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
          {/* Form block */}
          <div className="bg-[#0f0d1d] text-white p-6 rounded-md shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Get in touch</h2>
            <p className="text-sm text-white/70">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
            </p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 text-black rounded-md"
              />
              <input
                type="email"
                placeholder="Your mail"
                className="w-full px-4 py-2 text-black rounded-md"
              />
              <input
                type="tel"
                placeholder="Your phone"
                className="w-full px-4 py-2 text-black rounded-md"
              />
              <textarea
                rows={4}
                placeholder="Your message"
                className="w-full px-4 py-2 text-black rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Send message
              </button>
            </form>
          </div>
  
          {/* Text block */}
          <div className="text-white md:pl-8">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Putting a plan to action,<br />to assure your satisfaction!
            </h2>
            <p className="text-sm text-white/80">
              Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam habitant elit
            </p>
          </div>
        </div>
      </section>
    );
  }
  