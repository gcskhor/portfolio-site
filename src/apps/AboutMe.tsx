const TECH = ["TypeScript", "React", "Node.js", "Python", "Go"];

export default function AboutMe() {
  return (
    <div className="text-fg grid grid-cols-[11rem_1fr] gap-6 p-4 text-left text-sm">
      <aside>
        <div className="border-divider text-muted grid aspect-square place-items-center rounded-sm border text-center text-xs">
          your
          <br />
          photo
        </div>

        <p className="text-muted mt-4 mb-0.5 text-xs tracking-widest uppercase">
          📍 Location
        </p>
        <p>Singapore</p>

        <nav className="mt-5 flex flex-col">
          <a
            className="border-divider text-fg hover:text-accent border-t py-1.5 no-underline transition-colors"
            href="https://github.com/gcskhor"
          >
            → GitHub
          </a>
          <a
            className="border-divider text-fg hover:text-accent border-t py-1.5 no-underline transition-colors"
            href="https://www.linkedin.com/in/gerald-khor"
          >
            → LinkedIn
          </a>
          <a
            className="border-divider text-fg hover:text-accent border-t py-1.5 no-underline transition-colors"
            href="mailto:gcskhor94@gmail.com"
          >
            → Email
          </a>
        </nav>
      </aside>

      <main>
        <h1 className="text-heading m-0 text-2xl font-medium tracking-tight">
          Gerald Khor
        </h1>
        <p className="text-muted mt-0.5 mb-4">Software Engineer</p>
        <p>
          I'm Gerald, a software engineer at a web3 venture studio. I've shipped
          projects across web3, gaming and a bunch of things in between —
          usually with more enthusiasm than sleep.
        </p>

        <p className="text-muted mt-4 mb-0.5 text-xs tracking-widest uppercase">
          Tech stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TECH.map((t) => (
            <span
              key={t}
              className="border-chip-border bg-chip-bg text-chip-text rounded-sm border px-2.5 py-1 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-muted mt-4 mb-0.5 text-xs tracking-widest uppercase">
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
