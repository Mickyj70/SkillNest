import { getSkillBySlug, getResourcesBySkillId } from "../actions";
import SkillDetailClient from "../skill-detail-client";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  const resources = await getResourcesBySkillId(skill.id);

  return <SkillDetailClient skill={skill} resources={resources} />;
}
