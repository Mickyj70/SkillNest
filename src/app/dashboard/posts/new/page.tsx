import CreatePostForm from "./create-post-form";
import { getCategories, getSkills } from "../actions";

export default async function NewPostPage() {
  const categories = await getCategories();
  const skills = await getSkills();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-text-secondary mt-2">
          Share a valuable resource with the community.
        </p>
      </div>

      <CreatePostForm categories={categories} initialSkills={skills} />
    </div>
  );
}
