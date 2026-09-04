import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Proyecto no encontrado | Portal Terrenos",
      description: "No encontramos el proyecto que buscas.",
    };
  }
  return {
    title: `${project.name} | Lotes en ${project.region} · Portal Terrenos`,
    description: `${project.tagline}. ${project.description}. Precios desde ${project.minPrice} USD. Asesoría personalizada de Abraham Saul Portal Garcia.`,
    keywords: [
      project.name,
      "lotes",
      "terrenos",
      project.region,
      project.location,
      "inmobiliaria",
      "abraham portal",
    ],
    openGraph: {
      title: `${project.name} · Portal Terrenos`,
      description: project.tagline,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <ProjectDetail slug={slug} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
