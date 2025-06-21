"use client";

import { useState, useEffect } from "react";
import Api from "@/services/frontql/Api";

//response data
// {
//     "err": false,
//     "result": [
//         {
//             "id": 3,
//             "name": "Digital Marketing",
//             "description": "Gain deep understanding of SEO | Pay Per Click (Google Ads) | Social Media Advertising | Email Marketing | Digital Marketing with AI",
//             "duration": "2 months",
//             "price": "3000",
//             "tags": "Digital Marketing, Online Marketing, Marketing with AI",
//             "priority": 1,
//             "created_at": "2025-06-21 12:29:53",
//             "updated_at": "2025-06-21 12:29:53"
//         },
//         {
//             "id": 2,
//             "name": "JavaScript/React + FrontQL/NodeJS",
//             "description": "Master both frontend and backend technologies using JavaScript/React and your choice of either FrontQL (our own serverless backend) or NodeJS",
//             "duration": "3000",
//             "price": "3",
//             "tags": "Full Stack",
//             "priority": 2,
//             "created_at": "2025-06-21 12:29:09",
//             "updated_at": "2025-06-21 12:29:09"
//         },
//         {
//             "id": 1,
//             "name": "JavaScript/React",
//             "description": "Learn modern web development focusing on interactive user interfaces using JavaScript and React",
//             "duration": "2 months",
//             "price": "2000",
//             "tags": "Frontend",
//             "priority": 3,
//             "created_at": "2025-06-21 12:27:20",
//             "updated_at": "2025-06-21 12:27:20"
//         }
//     ],
//     "count": 3,
//     "token": "dzU1dXV5ejNjamp4"
// }

export const useHome = () => {
  const [courses, setCourses] = useState([]);
  const [coursesByTag, setCoursesByTag] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Group courses by first tag only
  const groupCoursesByTags = (coursesList: any) => {
    const groupedCourses: any = {};

    coursesList?.forEach?.((course: any) => {
      if (!course?.tags) return;

      // Get only the first tag
      const firstTag = course?.tags?.split?.(";")?.shift?.()?.split?.(",")?.shift?.()?.trim?.();

      if (firstTag) {
        // Initialize array if this tag doesn't exist yet
        if (!groupedCourses?.[firstTag]) {
          groupedCourses[firstTag] = [];
        }

        // Add course to the tag group
        groupedCourses?.[firstTag]?.push?.(course);
      }
    });

    console.log("groupedCourses", groupedCourses);
    return groupedCourses;
  };

  const getCourses = async (options: any = {}) => {
    try {
      const res = await Api.get("/courses", {
        ...options,
        sort: options?.sort || "-priority",
      });

      if (res?.err) {
        throw new Error(typeof res?.err === "string" ? res?.err : "Error fetching courses");
      }

      // Process the courses data
      const coursesList = res?.result || [];
      console.log("coursesList", res);
      // Update state with the courses and grouped courses
      setCourses(coursesList);
      setCoursesByTag(groupCoursesByTags(coursesList));

      return {
        courses: coursesList,
        coursesByTag: groupCoursesByTags(coursesList),
      };
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      setError(error?.message || "Unknown error");
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getCourses();
      } catch (err) {
        // Error is already handled in getCourses
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    courses,
    coursesByTag,
    loading,
    error,
    getCourses,
  };
};
