import {
  LuX,
  LuClock,
  LuTimer,
  LuFileText,
  LuDownload,
  LuShare2,
  LuMaximize2,
  LuClipboardList
} from "react-icons/lu";

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
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-5">
              <span className="text-xs text-neutral-400 font-outfit inline-flex items-center gap-1.5"><LuShare2 size={14} /> Share</span>
              <span className="text-xs text-neutral-400 font-outfit inline-flex items-center gap-1.5"><LuMaximize2 size={14} /> Expand</span>
            </div>
            <button className="text-neutral-400 hover:text-neutral-600"><LuX size={14} /></button>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <LuClipboardList size={15} className="text-custom-blue" />
            <span className="text-xs text-neutral-400 font-outfit">Task</span>
          </div>
          <h3 className="font-outfit font-semibold text-neutral-800 text-lg leading-snug mb-3">
            Implement Stripe subscription integration with email notifications
          </h3>


          <div className="flex items-center gap-2 mb-4">
            <span className="bg-custom-blue/10 text-custom-blue text-xs font-medium px-2.5 py-1 rounded-full font-outfit">
              High Priority
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400 font-outfit">
              <LuClock size={14} /> {new Date().toDateString()}
            </span>
          </div>


          <div className="bg-custom-blue text-white rounded-xl px-4 py-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs text-custom-blue"><LuTimer size={14} /></div>
              <span className="text-sm font-outfit">Time Spent on this project</span>
            </div>
            <span className="font-mono text-sm font-semibold">
              {new Date().toLocaleTimeString()}
            </span>
          </div>


          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-700 mb-1 font-outfit">Description</p>
            <p className="text-xs text-neutral-500 font-outfit leading-relaxed">
              Integrate Stripe subscription billing with automated email receipts and 
              payment failure notifications to keep customers informed.
            </p>
            <p className="text-xs text-neutral-500 font-outfit leading-relaxed mt-2">
              Includes webhook handling for subscription lifecycle events and custom email templates 
              for trial expiration, payment success, and cancellation confirmations.
            </p>
          </div>


          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-700 mb-2 font-outfit">Attachments</p>
            {[
              { name: "Stripe-API-Reference.pdf", date: "12:32 PM, 22, August", color: "bg-custom-blue/10 text-custom-blue" },
              { name: "Email-Templates.fig", date: "14:35 PM, 24, August", color: "bg-custom-blue/10 text-custom-blue" },
            ].map((file) => (
              <div key={file.name} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${file.color} flex items-center justify-center text-xs`}><LuFileText size={14} /></div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700 font-outfit">{file.name}</p>
                    <p className="text-xs text-neutral-400 font-outfit">{file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-neutral-500 hover:text-neutral-700 font-outfit">View</button>
                  <button className="text-xs text-neutral-500 hover:text-neutral-700 font-outfit inline-flex items-center gap-1"><LuDownload size={12} /> Download</button>
                </div>
              </div>
            ))}
          </div>


          <div>
            <div className="flex gap-3 border-b border-neutral-200 mb-3">
              <button className="text-xs font-semibold text-custom-blue pb-2 border-b-2 border-custom-blue font-outfit">Comments</button>
              <button className="text-xs text-neutral-400 pb-2 font-outfit">Updates</button>
            </div>
            {[
              { name: "Alice Chen", time: "17th Feb 2024", msg: "I can handle the webhook endpoint." },
              { name: "Alice Chen", time: "Just Now", msg: "Do we need email templates for failed payments?" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-custom-blue/10 flex items-center justify-center text-xs text-custom-blue font-semibold shrink-0">AC</div>
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
