const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export type Car = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  personality: string;
};

export type WaitlistResponse = {
  ok: boolean;
  message: string;
};

export async function fetchFeaturedCars(): Promise<Car[]> {
  const res = await fetch(`${API_BASE}/api/cars/featured`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load featured cars (${res.status})`);
  }
  const data = (await res.json()) as { cars: Car[] };
  return data.cars ?? [];
}

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  const res = await fetch(`${API_BASE}/api/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json()) as WaitlistResponse;
  if (!res.ok) {
    throw new Error(data.message || "Could not join waitlist");
  }
  return data;
}

export function getApiBase() {
  return API_BASE;
}
