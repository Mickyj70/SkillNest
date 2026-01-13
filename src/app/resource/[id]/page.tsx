import { getResource } from "@/app/skills/actions";
import ResourceDetailClient from "./resource-detail-client";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResourcePage({ params }: Props) {
  const { id } = await params;
  const resource = await getResource(id);

  if (!resource) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ResourceDetailClient resource={resource} />
    </main>
  );
}
