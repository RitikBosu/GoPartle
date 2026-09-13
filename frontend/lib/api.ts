const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface RequirementPayload {
  // Step 1
  eventName: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew";

  // Category-specific
  plannerDetails?: {
    servicesNeeded: string[];
    budgetRange: { min: number; max: number };
    guestCount: number;
    preferredExperienceLevel: string;
    specialRequirements: string;
  };
  performerDetails?: {
    performerType: string;
    genreStyle: string[];
    setDurationMinutes: number;
    equipmentProvidedByVenue: boolean;
    performanceDetails: string;
    budget: number;
  };
  crewDetails?: {
    crewTypesNeeded: string[];
    numberOfCrewMembers: number;
    hoursRequired: number;
    specialSkills: string;
    budgetPerPerson: number;
  };
}

export async function postRequirement(payload: RequirementPayload) {
  const res = await fetch(`${BACKEND_URL}/api/requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.errors?.join(", ") || data.message || "Submission failed");
  }
  return data;
}

export async function getRequirements(category?: string) {
  const url = category
    ? `${BACKEND_URL}/api/requirements?category=${category}`
    : `${BACKEND_URL}/api/requirements`;
  const res = await fetch(url);
  return res.json();
}
