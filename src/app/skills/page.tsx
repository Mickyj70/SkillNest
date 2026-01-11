import { getCategories, getSkills } from "./actions";
import SkillsBrowse from "./skills-browse";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const categories = await getCategories();
  const skills = await getSkills();

  return <SkillsBrowse categories={categories} initialSkills={skills} />;
}
