export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 grid grid-cols-2 gap-5">
      <div>
        <h2 className="font-gabarito text-7xl font-bold text-custom-blue leading-tight">
          Your projects, powered by productivity
        </h2>
        <p className="font-outfit text-neutral-500 mt-6 leading-relaxed">
          Collaborate with your team in real-time, manage tasks effortlessly,
          and ship faster than ever. All in one place.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <button className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium px-6 py-3 rounded-lg transition-all">
            Get started
          </button>
          <button className="border border-neutral-300 hover:border-custom-blue text-neutral-700 hover:text-custom-blue font-outfit font-medium px-6 py-3 rounded-lg transition-all">
            Learn more
          </button>
        </div>
      </div>


      <div className="flex justify-center">
        <div className="border border-neutral-200 rounded-2xl p-5 w-full max-w-md">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <span className="text-xs text-neutral-400 font-outfit">Appointments</span>
            <button className="text-neutral-400 hover:text-neutral-600">✕</button>
          </div>
          <h3 className="font-outfit font-semibold text-neutral-800 text-lg leading-snug mb-3">
            Schedule Me An Appointment With My Endocrinologist
          </h3>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full font-outfit">
              High Priority
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400 font-outfit">
              🕐 Jul 10 - 14
            </span>
          </div>

          {/* Timer */}
          <div className="bg-purple-50 rounded-xl px-4 py-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-xs">⏱</div>
              <span className="text-sm text-neutral-600 font-outfit">Time Spent on this project</span>
            </div>
            <span className="font-mono text-sm font-semibold text-neutral-700">12:45:00</span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-700 mb-1 font-outfit">Description</p>
            <p className="text-xs text-neutral-500 font-outfit leading-relaxed">
              Specializes in the diagnosis and treatment of diseases related to the endocrine system,
              which includes glands and organs that produce hormones.
            </p>
            <p className="text-xs text-neutral-500 font-outfit leading-relaxed mt-2">
              These hormones regulate various bodily functions such as metabolism, growth, and reproduction.
            </p>
          </div>

          {/* Attachments */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-700 mb-2 font-outfit">Attachments</p>
            {[
              { name: "Medical Prescription.docx", date: "12:32 PM, 22, August", color: "bg-pink-100 text-pink-500" },
              { name: "Doctor Appointment.pdf", date: "14:35 PM, 24, August", color: "bg-purple-100 text-purple-500" },
            ].map((file) => (
              <div key={file.name} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${file.color} flex items-center justify-center text-xs`}>📄</div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700 font-outfit">{file.name}</p>
                    <p className="text-xs text-neutral-400 font-outfit">{file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-neutral-500 hover:text-neutral-700 font-outfit">View</button>
                  <button className="text-xs text-neutral-500 hover:text-neutral-700 font-outfit">↓ Download</button>
                </div>
              </div>
            ))}
          </div>

          {/* Comments */}
          <div>
            <div className="flex gap-3 border-b border-neutral-200 mb-3">
              <button className="text-xs font-semibold text-neutral-800 pb-2 border-b-2 border-neutral-800 font-outfit">Comments</button>
              <button className="text-xs text-neutral-400 pb-2 font-outfit">Updates</button>
            </div>
            {[
              { name: "John Smith", time: "17th Feb 2024", msg: "I want a complete diet plan." },
              { name: "John Smith", time: "Just Now", msg: "Do you have any update?" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-xs text-blue-700 font-semibold shrink-0">JS</div>
                <div>
                  <p className="text-xs text-neutral-400 font-outfit">{c.name} · {c.time}</p>
                  <p className="text-xs text-neutral-700 font-outfit">{c.msg}</p>
                </div>
              </div>
            ))}
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs font-outfit text-neutral-500 focus:outline-none focus:border-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
