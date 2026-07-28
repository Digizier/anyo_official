import { masterServiceSupabase } from "./master-supabase";

export interface WebsiteStatusResult {
  isActive: boolean;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  displayName: string;
  planName: string;
}

export async function checkWebsiteStatus(
  websiteName: string = process.env.WEBSITE_NAME || "ayvo_official110"
): Promise<WebsiteStatusResult> {
  const fallbackResult: WebsiteStatusResult = {
    isActive: true,
    ownerName: "AYVO Owner",
    ownerPhone: "+92 371 0108284",
    ownerEmail: "baitullahrepair@gmail.com",
    displayName: "AYVO",
    planName: "Premium Plan",
  };

  try {
    const { data, error } = await masterServiceSupabase
      .from("client_websites")
      .select("*")
      .eq("website_name", websiteName)
      .single();

    if (error || !data) {
      console.warn("Master DB check query fallback activated:", error?.message);
      return fallbackResult;
    }

    const now = new Date();
    const activateDate = data.activate_date ? new Date(data.activate_date) : null;
    const deactivateDate = data.deactivate_date ? new Date(data.deactivate_date) : null;

    let computedStatus = data.website_status === "active";
    if (activateDate && now < activateDate) {
      computedStatus = false;
    }
    if (deactivateDate && now >= deactivateDate) {
      computedStatus = false;
    }

    return {
      isActive: computedStatus,
      ownerName: data.owner_name || fallbackResult.ownerName,
      ownerPhone: data.owner_phone || fallbackResult.ownerPhone,
      ownerEmail: data.owner_email || fallbackResult.ownerEmail,
      displayName: data.display_name || fallbackResult.displayName,
      planName: data.plan_name || fallbackResult.planName,
    };
  } catch (err) {
    console.error("Website status check failed:", err);
    return fallbackResult;
  }
}
