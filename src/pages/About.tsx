export default function About() {
  return (
    <section className="section page-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">TENTANG SAYA</p>
          <h2>Software Engineer, IT Operational, SQL Database Engineer.</h2>
        </div>

        <div
          className="about-code-card"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <pre>
            <code>{`const developer = {
              name: "Muhammad Teguh Rizkiono",
              role: "Software Engineer",
              specialties: [
                "Web Development",
                "IT Operational",
                "SQL Database Engineer"
              ],
             
              profile: [
                "Software engineer focused on designing, developing,",
                "maintaining, testing, and evaluating computer software.",
                "Always follows developments in the IT world.",
                "Passionate, hard-working, and motivated to grow independently.",
                "Able to solve problems and find IT infrastructure solutions.",
                "Works effectively both independently and in a team."
              ],

              strengths: [
                "Problem Solving",
                "Independent Learning",
                "Team Collaboration",
                "Motivated and Hard Working"
              ],

              focus: "Business Application"
            };`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
