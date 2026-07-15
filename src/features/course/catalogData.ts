export type CourseCategory = "all" | "web-dev" | "mobile-dev" | "cybersecurity" | "networking" | "ui-ux";

export interface CourseCatalogItem {
  id: string;
  title: string;
  description: string;
  category: Exclude<CourseCategory, "all">;
  categoryLabel: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  moduleCount: number;
  thumbnail: string;
  path: string;
  isAvailable: boolean;
}

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  all: "Semua",
  "web-dev": "Web Dev",
  "mobile-dev": "Mobile Dev",
  cybersecurity: "Cybersecurity",
  networking: "Networking",
  "ui-ux": "UI/UX",
};

export const courseCatalog: CourseCatalogItem[] = [
  {
    id: "fundamental-javascript",
    title: "Fundamental JavaScript",
    description:
      "Kuasai dasar-dasar JavaScript dari nol — variabel, kondisi, fungsi, array, DOM manipulasi, hingga proyek akhir interaktif. Dilengkapi evaluasi mandiri bertenaga AI dosen.",
    category: "web-dev",
    categoryLabel: "Web Development",
    level: "Pemula",
    moduleCount: 7,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80&fit=crop",
    path: "/course/javascript",
    isAvailable: true,
  },
  {
    id: "html-css-essentials",
    title: "HTML & CSS Essentials",
    description:
      "Pelajari fondasi tampilan web modern — semantik HTML5, CSS Flexbox, Grid, dan responsive design yang elegan.",
    category: "web-dev",
    categoryLabel: "Web Development",
    level: "Pemula",
    moduleCount: 6,
    thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80&fit=crop",
    path: "/course/html-css",
    isAvailable: false,
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Pelajari dasar-dasar React JS — mulai dari konsep komponen, sintaks JSX, pengiriman data props, hingga styling menggunakan Tailwind CSS.",
    category: "web-dev",
    categoryLabel: "Web Development",
    level: "Menengah",
    moduleCount: 7,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80&fit=crop",
    path: "/course/react",
    isAvailable: true,
  },
  {
    id: "flutter-basics",
    title: "Flutter Mobile Development",
    description:
      "Kembangkan aplikasi mobile lintas platform dengan Flutter dan Dart — dari widget dasar hingga integrasi API.",
    category: "mobile-dev",
    categoryLabel: "Mobile Development",
    level: "Menengah",
    moduleCount: 9,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&fit=crop",
    path: "/course/flutter",
    isAvailable: false,
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Fundamentals",
    description:
      "Pelajari teknik dasar keamanan siber — penetration testing, vulnerability scanning, dan security mindset profesional.",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    level: "Menengah",
    moduleCount: 10,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&fit=crop",
    path: "/course/ethical-hacking",
    isAvailable: false,
  },
  {
    id: "network-basics",
    title: "Dasar-Dasar Jaringan Komputer",
    description:
      "Pahami konsep TCP/IP, subnetting, routing, switching, dan konfigurasi jaringan dasar yang digunakan di industri.",
    category: "networking",
    categoryLabel: "Networking",
    level: "Pemula",
    moduleCount: 7,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fit=crop",
    path: "/course/networking",
    isAvailable: false,
  },
  {
    id: "ui-design-fundamentals",
    title: "UI Design Fundamentals",
    description:
      "Kuasai prinsip desain antarmuka — typography, color theory, grid system, dan prototyping menggunakan Figma.",
    category: "ui-ux",
    categoryLabel: "UI/UX Design",
    level: "Pemula",
    moduleCount: 6,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop",
    path: "/course/ui-design",
    isAvailable: false,
  },
  {
    id: "ux-research",
    title: "UX Research & User Testing",
    description:
      "Pelajari metode riset pengguna, user journey mapping, usability testing, dan cara mentransformasi insight menjadi solusi desain.",
    category: "ui-ux",
    categoryLabel: "UI/UX Design",
    level: "Menengah",
    moduleCount: 5,
    thumbnail: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=600&q=80&fit=crop",
    path: "/course/ux-research",
    isAvailable: false,
  },
];
