import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pramit Shrivastav | AI/ML & Generative AI Systems Engineer",
  description:
    "Portfolio of Pramit Shrivastav. Specializing in stateful LangGraph agent workflows, stacked ML clinical ensembles (99.93% ROC-AUC), and production backend architectures.",
  keywords: [
    "Pramit Shrivastav",
    "AI Systems Engineer",
    "Machine Learning",
    "Generative AI",
    "LangGraph",
    "FastAPI",
    "XGBoost",
    "SHAP",
    "PostgreSQL JSONB",
    "BIT Durg",
  ],
  authors: [{ name: "Pramit Shrivastav", url: "https://github.com/pramit1506" }],
  openGraph: {
    title: "Pramit Shrivastav | AI/ML & Generative AI Systems Engineer",
    description:
      "Engineering stateful LangGraph agent workflows, stacked ML clinical ensembles, and high-performance PostgreSQL architectures with 144+ automated tests.",
    type: "website",
    url: "https://github.com/pramit1506",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-primary antialiased selection:bg-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
