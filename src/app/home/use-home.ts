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
//             "name": "Full Stack Development",
//             "description": "Master both frontend and backend technologies using JavaScript/React and your choice of either FrontQL (our own serverless backend) or NodeJS",
//             "duration": "3000",
//             "price": "3",
//             "tags": "JavaScript, React, FrontQL, NodeJS",
//             "priority": 2,
//             "created_at": "2025-06-21 12:29:09",
//             "updated_at": "2025-06-21 12:29:09"
//         },
//         {
//             "id": 1,
//             "name": "Frontend Development",
//             "description": "Learn modern web development focusing on interactive user interfaces using JavaScript and React",
//             "duration": "2 months",
//             "price": "2000",
//             "tags": "JavaScript, React",
//             "priority": 3,
//             "created_at": "2025-06-21 12:27:20",
//             "updated_at": "2025-06-21 12:27:20"
//         }
//     ],
//     "count": 3,
//     "token": "dzU1dXV5ejNjamp4"
// }

export const useHome = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCourses = async (options: any = {}) => {
    try {
      setLoading(true);
      setError(null);
      const res = await Api.get("/courses", {
        ...options,
        sort: options?.sort || "-priority",
      });

      if (res?.err) {
        throw new Error(typeof res?.err === "string" ? res?.err : "Error fetching courses");
      }

      const coursesList = res?.result || [];
      const sortedCourses = [...coursesList].sort((a, b) => {
        const priorityA = Number(a?.priority) || 0;
        const priorityB = Number(b?.priority) || 0;
        return priorityB - priorityA;
      });

      setCourses(sortedCourses);

      return {
        courses: sortedCourses,
        loading: false,
        error: null,
      };
    } catch (error: any) {
      setError(error?.message || "Error fetching courses");
      setLoading(false);
      return {
        courses: [],
        loading: false,
        error: error?.message || "Error fetching courses",
      };
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    getCourses,
  };
};
