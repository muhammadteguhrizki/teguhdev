const projects = [
  {
    category: "COMPANY PROFILE",
    title: "Website KSP Marison Pasi Jaya",
    description:
      "Website company profile koperasi dengan CMS, blog, layanan, dan jaringan kantor.",
    image: "/img/projects/ksp-marison.png",
    tech: ["CodeIgniter", "PHP", "Bootstrap", "DataTables", "JQuery", "MySQL"],
  },
  {
    category: "COMPANY PROFILE",
    title: "Website PT Togi Cahaya Cemerlang",
    description: "Website company profile perusahaan finance.",
    image: "/img/projects/tcc.png",
    tech: ["CodeIgniter", "PHP", "DataTables", "JQuery", "MySQL"],
  },
  {
    category: "COMPANY PROFILE",
    title: "Website Bank Hariarta",
    description:
      "Website company profile bank BPR dengan standarisasi Otoritas Jasa Keuangan.",
    image: "/img/projects/bank-hariarta.png",
    tech: ["CodeIgniter", "PHP", "JavaScript", "DataTables", "JQuery", "MySQL"],
  },
];

export default function Projects() {
  return (
    <section className="section project-section page-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">PORTFOLIO</p>
          <h2>Project</h2>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.title}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 250}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
