import Api from "@/services/frontql/Api";
import { uploadMedia } from "@/lib/uploads";

// export interface ApplicationData {
//   name: string;
//   email: string;
//   phone: string;
//   qualification: string;
//   semester: string;
//   college: string;
//   courses: string[];
//   courseNames?: string[];
//   qualificationLabel?: string;
//   semesterLabel?: string;
//   receipt?: File | null;
// }

export async function submitApplication(data: any) {
  try {
    // First handle the receipt upload if present
    let receiptUrl = "";
    if (data.receipt) {
      try {
        // Upload the receipt to the 'receipts' folder
        const uploadResponse = await uploadMedia(data.receipt, "receipts");
        // Extract the file URL from the response
        receiptUrl = uploadResponse?.files?.image || "";

        if (!receiptUrl) {
          throw new Error("Failed to upload receipt");
        }
      } catch (error) {
        console.error("Error uploading receipt:", error);
        return { success: false, error: "Failed to upload receipt. Please try again." };
      }
    }

    // Prepare application data with the receipt URL
    const applicationData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      qualification: data.qualificationLabel || data.qualification,
      semester: data.semesterLabel || data.semester,
      college: data.college,
      courses: JSON.stringify(data.courseNames || data.courses), // Save course names instead of IDs
      receipt: receiptUrl, // Add the uploaded receipt URL
    };

    // Submit application data using the options parameter
    const res = await Api.post("/applications", { body: applicationData });

    const success = res && !res.err;
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error submitting application" : null;

    return { success, error, applicationId: res?.result?.id };
  } catch (err) {
    console.error("Error submitting application:", err);
    return { success: false, error: "Failed to submit application" };
  }
}

export async function getApplications() {
  try {
    const res = await Api.get("/applications");

    const applications = res?.result || [];
    const error = res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error fetching applications" : null;
    console.log("applications", applications);
    return { applications, error };
  } catch (err) {
    return { applications: [], error: "Failed to fetch applications" };
  }
}

export async function getApplicationById(id: string) {
  try {
    const res = await Api.get(`/applications/${id}`);

    const application = res?.result[0] || null;
    const error =
      res?.err && typeof res.err === "string" ? res.err : res?.err ? "Error fetching application details" : null;

    return { application, error };
  } catch (err) {
    return { application: null, error: "Failed to fetch application details" };
  }
}
