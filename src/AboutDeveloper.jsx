import "./AboutDeveloper.css";

function AboutDeveloper() {
  return (
    <div className="about-container">
      <div className="about-card">
        <img
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="Developer"
          className="dev-avatar"
        />
        <h1>👩🏻‍💻 Nagham Eyad K. Malhas</h1>
        <h3>Software Engineering Student</h3>
        <p className="about-text">
          I'm a passionate software engineering student at <strong>An-Najah National University</strong>,
          specializing in front-end development using <strong>React</strong>, <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.
          I enjoy creating clean, responsive, and user-friendly web applications that bring ideas to life.
        </p>

        <div className="social-links">
          <a
            href="https://github.com/naghammalhas"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutDeveloper;
