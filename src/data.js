const asset = (path) => `/assets/${path}`;

const ToolReactJS = asset("tools/reactjs.png");
const ToolJS = asset("tools/js.png");
const ToolTS = asset("tools/ts.png");
const ToolHTML = asset("tools/html.png");
const ToolCSS = asset("tools/css.png");
const ToolFigma = asset("tools/figma.png");
const ToolAI = asset("tools/ai.png");
const ToolPS = asset("tools/ps.png");
const ToolNode = asset("tools/node logo.png");
const ToolTailwind = asset("tools/tailwind logo.png");
const ToolPostgre = asset("tools/postgre.png");
const ToolNext = asset("tools/nextjs.png");
const ToolGSAP = asset("tools/gsap.png");

const RupiahFlowThumb = asset("proyek/project2.png");
const RupiahFlowHome = asset("RupiahFlow/Home Page.png");
const RupiahFlowCategories = asset("RupiahFlow/Categories Page.png");
const RupiahFlowReports = asset("RupiahFlow/Reports Page.png");

const CertixThumb = asset("proyek/certixx.png");
const CertixHome = asset("certix/Home.png");
const CertixDetail = asset("certix/Concert Detail.png");
const CertixTicketing = asset("certix/Ticketing.png");
const CertixCheckout = asset("certix/Checkout.png");
const CertixPayment = asset("certix/Payment.png");

export const listTools = [
  { id: 1, gambar: ToolReactJS, nama: "React JS", ket: "Framework", dad: "100" },
  { id: 2, gambar: ToolNext, nama: "Next JS", ket: "Framework", dad: "150" },
  { id: 3, gambar: ToolJS, nama: "Javascript", ket: "Language", dad: "200" },
  { id: 4, gambar: ToolTS, nama: "TypeScript", ket: "Language", dad: "300" },
  { id: 5, gambar: ToolHTML, nama: "HTML", ket: "Language", dad: "400" },
  { id: 6, gambar: ToolCSS, nama: "CSS", ket: "Language", dad: "500" },
  { id: 7, gambar: ToolNode, nama: "Node JS", ket: "Runtime", dad: "600" },
  { id: 8, gambar: ToolTailwind, nama: "Tailwind", ket: "Framework", dad: "700" },
  { id: 9, gambar: ToolPostgre, nama: "PostgreSQL", ket: "Database", dad: "800" },
  { id: 10, gambar: ToolFigma, nama: "Figma", ket: "Design", dad: "900" },
  { id: 11, gambar: ToolAI, nama: "Illustrator", ket: "Design", dad: "1000" },
  { id: 12, gambar: ToolPS, nama: "Photoshop", ket: "Design", dad: "1100" },
  { id: 13, gambar: ToolGSAP, nama: "GSAP", ket: "Animation", dad: "1200" },
];

export const listProyek = [
  {
    id: 1,
    slug: "rupiah-flow",
    image: RupiahFlowThumb,
    title: "Rupiah Flow",
    category: "Website",
    role: "Fullstack Developer",
    year: "2025",
    techstack: ["Node JS", "React JS", "Tailwind", "PostgreSQL", "Javascript"],
    githubUrl: "https://github.com/drepradhit/rupiahflow",
    demoUrl: null,
    pageImages: [
      { src: RupiahFlowHome, title: "Dashboard utama" },
      { src: RupiahFlowCategories, title: "Pengaturan kategori" },
      { src: RupiahFlowReports, title: "Laporan keuangan" },
    ],
  },
  {
    id: 2,
    slug: "certix",
    image: CertixThumb,
    title: "Certix",
    category: "UI/UX",
    role: "UI/UX Designer",
    year: "2026",
    techstack: ["Figma", "Illustrator"],
    githubUrl: null,
    demoUrl: null,
    pageImages: [
      { src: CertixHome, title: "Halaman discovery" },
      { src: CertixDetail, title: "Detail konser" },
      { src: CertixTicketing, title: "Pilih tiket dan kursi" },
      { src: CertixCheckout, title: "Proses checkout" },
      { src: CertixPayment, title: "Pembayaran" },
    ],
  },
];

export const listExperience = [
  {
    id: 1,
    company: "Damianos Productions",
    role: "Web Developer",
    period: "Feb 2026 - Sekarang",
    description: "Bikin website company profile buat creative agency pake Next.js dan GSAP — fokusnya di transisi yang smooth.",
  },
  {
    id: 2,
    company: "Dinas Perhubungan",
    role: "Full-stack Developer (Internship)",
    period: "Feb 2026 - Sekarang",
    description: "Develop dan maintain web pake Next.js, React.js dan Tailwind.",
  },
  {
    id: 3,
    company: "Dunia Sandang",
    role: "Web Maintenance (Freelance)",
    period: "Okt 2024",
    description: "Freelance ngebenerin bug di website Dunia Sandang dan maintain domain website mereka.",
  },
  {
    id: 4,
    company: "Linestag Indonesia",
    role: "Creative Designer & Script Writer",
    period: "Apr 2022 - Sep 2022",
    description: "Jadi Graphic Designer pake Illustrator dan Photoshop, Editing Video pake Adobe Premiere Pro, Nulis script buat konten TikTok & Live dan jadi Event Organizer.",
  },
];
