import Api from "@/services/frontql/Api";

export async function getCourses() {
  const res = await Api.get("/courses", { sort: "-priority" });

  const coursesList = res?.result || [];

  const courses = [...coursesList].sort((a, b) => {
    const priorityA = Number(a?.priority) || 0;
    const priorityB = Number(b?.priority) || 0;
    return priorityB - priorityA; // Higher priority first
  });

  const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error fetching courses" : null;

  return { courses, error };
}

export async function getCourseById(id: string) {
  try {
    const res = await Api.get(`/courses/${id}`);

    const course = res?.result[0] || null;
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error fetching course details" : null;
    console.log("Course details:", course);
    return { course, error };
  } catch (err) {
    return { course: null, error: "Failed to fetch course details" };
  }
}
