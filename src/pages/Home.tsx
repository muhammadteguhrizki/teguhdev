import { ArrowRight, Code2, Database, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div
            className="hero-content"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            <p className="eyebrow">SOFTWARE ENGINEER • IT PROGRAMMER</p>

            <h1>
              Building applications that are
              <span> neat, fast, and useful.</span>
            </h1>

            <p className="hero-description">Muhammad Teguh Rizkiono</p>

            <div className="hero-button-group">
              <Link to="/project" className="btn btn-primary">
                Lihat Project
                <ArrowRight size={18} />
              </Link>

              <Link to="/kontak" className="btn btn-outline">
                Hubungi Saya
              </Link>
            </div>
          </div>

          <div className="hero-card" data-aos="fade-left">
            <div className="code-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <pre>
              <code>{`const developer = {
                name: "Teguh Dev",
                role: "Software Engineer",
                stack: [
                    "HTML", "CSS", "Bootstrap",
                    "Tailwind CSS", "JavaScript",
                    "TypeScript", "PHP",
                    "CodeIgniter", "Laravel",
                    "React", "MySQL"
                ],
                focus: "Business Application"
                };`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Software Engineer, IT Operasional, SQL Database Engineer</h2>
          </div>

          <div className="skill-grid">
            <div className="skill-card" data-aos="zoom-in" data-aos-delay="100">
              <Code2 size={30} />
              <h3>Web Development</h3>
              <p>
                Membangun website dan aplikasi web yang responsif, modern, dan
                mudah digunakan.
              </p>
            </div>

            <div className="skill-card" data-aos="zoom-in" data-aos-delay="150">
              <Database size={30} />
              <h3>Database System</h3>
              <p>
                Perancangan database MySQL untuk transaksi, laporan, nominatif
                data, dan sistem internal.
              </p>
            </div>

            <div className="skill-card" data-aos="zoom-in" data-aos-delay="200">
              <LayoutDashboard size={30} />
              <h3>Dashboard Internal</h3>
              <p>Sistem operasional, CMS website, monitoring, dan reporting.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
