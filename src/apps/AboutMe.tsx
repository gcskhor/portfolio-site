const TECH = ["TypeScript", "React", "Node.js", "Python", "Go"];

export default function AboutMe() {
  return (
    <div className="grid grid-cols-[11rem_1fr] gap-6 p-4 text-left text-sm text-slate-300">
      <aside>
        <div className="grid aspect-square place-items-center rounded-sm border border-slate-500 text-center text-xs text-slate-400">
          your
          <br />
          photo
        </div>

        <p className="mt-4 mb-0.5 text-xs tracking-widest text-slate-400 uppercase">
          📍 Location
        </p>
        <p>Singapore</p>

        <nav className="mt-5 flex flex-col">
          <a
            className="border-t border-slate-600 py-1.5 text-slate-300 no-underline hover:text-white"
            href="https://github.com/gcskhor"
          >
            → GitHub
          </a>
          <a
            className="border-t border-slate-600 py-1.5 text-slate-300 no-underline hover:text-white"
            href="https://www.linkedin.com/in/gerald-khor"
          >
            → LinkedIn
          </a>
          <a
            className="border-t border-slate-600 py-1.5 text-slate-300 no-underline hover:text-white"
            href="mailto:gcskhor94@gmail.com"
          >
            → Email
          </a>
        </nav>
      </aside>

      <main>
        <h1 className="m-0 text-2xl font-medium tracking-tight text-white">
          Gerald Khor
        </h1>
        <p className="mt-0.5 mb-4 text-slate-400">Software Engineer</p>
        <p>
          I'm Gerald, a software engineer at a web3 venture studio. I've shipped
          projects across web3, gaming and a bunch of things in between —
          usually with more enthusiasm than sleep.
        </p>

        <p className="mt-4 mb-0.5 text-xs tracking-widest text-slate-400 uppercase">
          Tech stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TECH.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-slate-500 bg-slate-600 px-2.5 py-1 text-xs text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-4 mb-0.5 text-xs tracking-widest text-slate-400 uppercase">
          Off the clock
        </p>
        <p>
          Gaming, 3D printing, rock climbing, and keeping houseplants alive (win
          rate: pending).
        </p>
      </main>
    </div>
  );
}
