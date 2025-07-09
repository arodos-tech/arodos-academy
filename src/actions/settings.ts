import Api from "@/services/frontql/Api";

export interface PaymentValue {
  upi_id: string;
  qr_code_url: string;
}

export interface Setting {
  id: number;
  setting_key: string;
  value: PaymentValue;
}

/**
 * Fetches application settings including payment details
 */
export async function getSettings(): Promise<{
  success: boolean;
  settings?: Setting[];
  error?: string;
}> {
  try {
    // Fetch settings from API
    const response = await Api.get("/settings");
    // Check if response has the expected structure
    if (response && response.result && Array.isArray(response.result)) {
      return {
        success: true,
        settings: response.result,
      };
    } else {
      console.warn("Unexpected API response format:", response);
      // throw new Error("Invalid API response format");
    }
  } catch (error: any) {
    console.error("Failed to fetch settings:", error);

    // Return default settings as fallback
    return {
      success: false,
      error: error.message || "Failed to fetch settings",
    };
  }
}
