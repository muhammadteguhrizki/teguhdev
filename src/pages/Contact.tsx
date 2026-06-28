import { ArrowRight, Mail, BriefcaseBusiness } from "lucide-react";

export default function Contact() {
  return (
    <section className="section contact-section page-section">
      <div className="container contact-box">
        <p className="eyebrow">KONTAK</p>
        <h2>Do you have a project you want to create?</h2>

        <div className="contact-links">
          <a
            href="https://wa.me/6287825400060"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            Hubungi via WhatsApp
            <ArrowRight size={18} />
          </a>

          <a
            href="mailto:muhammadteguhrizkiono@gmail.com"
            className="btn btn-outline"
            data-aos="zoom-in"
            data-aos-delay="350"
          >
            <Mail size={18} />
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/muhammad-teguh-rizkiono-91362a24b/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            data-aos="zoom-in"
            data-aos-delay="450"
          >
            <BriefcaseBusiness size={18} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
