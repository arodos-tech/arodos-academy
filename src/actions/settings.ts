import Api from "@/services/frontql/Api";

export interface PaymentSettings {
  upiId?: string;
  qrCodeUrl?: string;
}

export interface Settings {
  payment?: PaymentSettings;
}

/**
 * Fetches application settings including payment details
 */
export async function getSettings(): Promise<{
  success: boolean;
  settings?: Settings;
  error?: string;
}> {
  try {
    // Fetch settings from API
    const response = await Api.get("/settings");

    return {
      success: true,
      settings: response.data,
    };
  } catch (error: any) {
    console.error("Failed to fetch settings:", error);

    // Return default settings as fallback
    return {
      success: false,
      error: error.message || "Failed to fetch settings",
      settings: {
        payment: {
          upiId: "arodos@upi",
          qrCodeUrl: "/images/payment-qr.png",
        },
      },
    };
  }
}
