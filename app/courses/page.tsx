import CoursesList from "./CoursesList";

export const metadata = {
  title: "courses",
  description: "this is the courses page",
};

type CoursesPageProps = {
  searchParams: Promise<{
    search?: string | string[];
  }>;
};

export default async function CoursesPage({
  searchParams,
}: CoursesPageProps) {
  const { search } = await searchParams;
  const searchTerm = Array.isArray(search) ? search[0] ?? "" : search ?? "";

  return <CoursesList search={searchTerm} />;
}
