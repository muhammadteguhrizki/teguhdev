import { getImagePath } from "../utils/path";

const projects = [
  {
    category: "PORTAL APLIKAS INTERNAL",
    title: "Portal PT Togi Cahaya Cemerlang",
    description:
      "Portal berbasis web untuk pengelolaan nominatif kredit dan pengajuan mitra BPR. Sistem mendukung pengelolaan data kredit, monitoring proses pengajuan, verifikasi dokumen, serta pelacakan status pengajuan secara terintegrasi dll.",
    image: getImagePath("/img/projects/portal-tcc.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "Bootstrap",
      "JavaScript",
      "JQuery",
      "DataTables",
      "MySQL",
    ],
  },
  {
    category: "COMPANY PROFILE",
    title: "Website KSP Marison Pasi Jaya",
    description:
      "Website company profile koperasi dengan CMS, blog, layanan, dan jaringan kantor.",
    image: getImagePath("/img/projects/ksp-marison.png"),
    tech: ["CodeIgniter", "PHP", "Bootstrap", "DataTables", "JQuery", "MySQL"],
  },
  {
    category: "COMPANY PROFILE",
    title: "Website PT Togi Cahaya Cemerlang",
    description: "Website company profile perusahaan finance.",
    image: getImagePath("/img/projects/tcc.png"),
    tech: ["CodeIgniter", "PHP", "DataTables", "JQuery", "MySQL"],
  },
  {
    category: "AUTOMASI PERBANKAN",
    title: "Mandiri Kopra & Permata Auto Debit",
    description:
      "Aplikasi desktop berbasis Python untuk mengotomatisasi proses autodebit saldo nasabah melalui platform Mandiri Kopra dan Permata Bank. Sistem mendukung konversi data transaksi, validasi data, pembuatan file sesuai format bank, serta mempercepat proses transaksi massal dengan meminimalkan kesalahan manual.",
    image: getImagePath("/img/projects/kopra-converter.png"),
    tech: ["Python", "Tkinter", "Pandas", "OpenPyXL", "PyInstaller"],
  },
  {
    category: "COMPANY PROFILE",
    title: "Website Bank Hariarta",
    description:
      "Website company profile bank BPR dengan standarisasi Otoritas Jasa Keuangan.",
    image: getImagePath("/img/projects/bank-hariarta.png"),
    tech: ["CodeIgniter", "PHP", "JavaScript", "DataTables", "JQuery", "MySQL"],
  },
  {
    category: "FINANCE",
    title: "H-Fund Digital Crowd Funding Platform",
    description:
      "Aplikasi web untuk pengelolaan deposito agen secara digital Bank Hariarta, meliputi manajemen agen, manajemen nasabah, transaksi deposito, pembuatan e-bilyet, invoice pembayaran fee agen, notifikasi via email, dan pelaporan nominatif.",
    image: getImagePath("/img/projects/h-fund-1.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "AlpineJS",
      "Tailwind CSS",
      "JavaScript",
      "MySQL",
    ],
  },
  {
    category: "SISTEM KOPERASI",
    title: "Aplikasi Setoran & Penarikan KSP SMR",
    description:
      "Aplikasi web untuk mengelola transaksi setoran dan penarikan simpanan anggota koperasi, dilengkapi pencetakan invoice menggunakan printer thermal Bluetooth.",
    image: getImagePath("/img/projects/ksp-smr.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "Bootstrap",
      "JavaScript",
      "JQuery",
      "DataTables",
      "MySQL",
      "Bluetooth Thermal Printer",
    ],
  },
  {
    category: "SISTEM KREDIT",
    title: "H-Land Pengajuan Kredit",
    description:
      "Aplikasi berbasis web Bank Hariarta untuk pengelolaan proses pengajuan kredit yang mendukung workflow persetujuan komite manajemen. Sistem dilengkapi dengan analisis ringkasan nasabah, data diri, cash flow, Loan to Value (LTV), riwayat SLIK, integrasi transaksi tabungan dari Core Banking System (CBS), peninjauan dokumen pengajuan kredit, serta pencetakan dokumen PK Kredit, SP3K, MAK dan SPK Kredit melalui portal.",
    image: getImagePath("/img/projects/h-land.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "Bootstrap",
      "JavaScript",
      "JQuery",
      "DataTables",
      "MySQL",
      "REST API",
    ],
  },
  {
    category: "PORTAL APLIKAS INTERNAL",
    title: "Portal Bank Hariarta",
    description:
      "Portal berbasis web untuk mendukung proses bisnis BPR yang terintegrasi secara real-time dengan Core Banking System (CBS). Sistem menyediakan monitoring tabungan, kredit, dan deposito, sinkronisasi data nasabah, transaksi pinjaman, pelaporan terpusat, serta berbagai fitur operasional untuk meningkatkan efisiensi dan akurasi pengelolaan data.",
    image: getImagePath("/img/projects/kredit-hs.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "Bootstrap",
      "JavaScript",
      "JQuery",
      "DataTables",
      "MySQL",
      "REST API",
    ],
  },
  {
    category: "SISTEM OPERASIONAL",
    title: "Portal Operasional Bank Hariarta",
    description:
      "Portal berbasis web untuk mengelola operasional bisnis BPR, meliputi pengelolaan data operasional, pengarsipan ribuan dokumen nasabah secara digital, serta monitoring data untuk mendukung efisiensi proses operasional.",
    image: getImagePath("/img/projects/portal-ops.png"),
    tech: [
      "CodeIgniter",
      "PHP",
      "Bootstrap",
      "JavaScript",
      "JQuery",
      "DataTables",
      "MySQL",
      "REST API",
    ],
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
