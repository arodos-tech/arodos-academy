import Api from "@/services/frontql/Api";

// Interface for course data
export interface Course {
  id?: string | number;
  name: string;
  description: string;
  duration: string;
  price: number | string;
  tags: string;
  priority: number;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getCourses() {
  // Use filter parameter to get only non-deleted courses
  const res = await Api.get("/courses", {
    // filter: "name:Frontend Development",
    // filter: "is_deleted:0",
    sort: "-priority",
  });

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
    return { course, error };
  } catch (err) {
    return { course: null, error: "Failed to fetch course details" };
  }
}

/**
 * Create a new course
 */
export async function createCourse(courseData: Course) {
  try {
    // Set is_deleted to false by default
    const dataWithDeletedFlag = {
      ...courseData,
      is_deleted: 0,
    };

    const res = await Api.post("/courses", { body: dataWithDeletedFlag });

    const success = !res?.err;
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error creating course" : null;

    return {
      success,
      error,
      course: res?.result?.[0] || null,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to create course",
      course: null,
    };
  }
}

/**
 * Update an existing course
 */
export async function updateCourse(id: string | number, courseData: Partial<Course>) {
  try {
    const res = await Api.put(`/courses/${id}`, { body: courseData });

    const success = !res?.err;
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error updating course" : null;

    return {
      success,
      error,
      course: res?.result?.[0] || null,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to update course",
      course: null,
    };
  }
}

/**
 * Soft delete a course by setting is_deleted to true
 */
export async function deleteCourse(id: string | number) {
  try {
    // Instead of deleting, update the course to set is_deleted = true
    const res = await Api.put(`/courses/${id}`, {
      body: { is_deleted: 1 },
    });

    const success = !res?.err;
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error deleting course" : null;

    return {
      success,
      error,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to delete course",
    };
  }
}
