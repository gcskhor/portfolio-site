import "./AboutMe.css";

const TECH = ["TypeScript", "React", "Node.js", "Python", "Go"];

export default function AboutMe() {
  return (
    <div className="about">
      <aside>
        <div className="about-photo">
          your
          <br />
          photo
        </div>

        <p className="about-label">📍 Location</p>
        <p>Singapore</p>

        <nav className="about-links">
          <a href="https://github.com/gcskhor">→ GitHub</a>
          <a href="https://www.linkedin.com/in/gerald-khor">→ LinkedIn</a>
          <a href="mailto:gcskhor94@gmail.com">→ Email</a>
        </nav>
      </aside>

      <main>
        <h1>Gerald Khor</h1>
        <p className="about-role">Software Engineer</p>
        <p>
          I'm Gerald, a software engineer at a web3 venture studio. I've shipped
          projects across web3, gaming and a bunch of things in between —
          usually with more enthusiasm than sleep.
        </p>

        <p className="about-label">Tech stack</p>
        <div className="about-tags">
          {TECH.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <p className="about-label">Off the clock</p>
        <p>
          Gaming, 3D printing, rock climbing, and keeping houseplants alive (win
          rate: pending).
        </p>
      </main>
    </div>
  );
}
