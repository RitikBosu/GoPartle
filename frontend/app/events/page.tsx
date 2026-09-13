"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getRequirements } from "@/lib/api";

interface RequirementItem {
  _id: string;
  eventName: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew";
  status: string;
  createdAt: string;
  plannerDetails?: {
    servicesNeeded?: string[];
    budgetRange?: { min: number; max: number };
    guestCount?: number;
    preferredExperienceLevel?: string;
    specialRequirements?: string;
  };
  performerDetails?: {
    performerType?: string;
    genreStyle?: string[];
    setDurationMinutes?: number;
    equipmentProvidedByVenue?: boolean;
    performanceDetails?: string;
    budget?: number;
  };
  crewDetails?: {
    crewTypesNeeded?: string[];
    numberOfCrewMembers?: number;
    hoursRequired?: number;
    specialSkills?: string;
    budgetPerPerson?: number;
  };
}

function fmtDate(d: string): string {
  if (!d) return "—";
  const [year, month, day] = d.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtCurrency(val?: number): string {
  if (val === undefined || val === null || val === 0) return "Not specified";
  return `₹${val.toLocaleString("en-IN")}`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<RequirementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getRequirements();
      if (res.success) {
        setEvents(res.data);
      } else {
        setError("Failed to fetch events from database");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.eventName.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.eventType.toLowerCase().includes(q) ||
      (item.venue && item.venue.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="page-wrapper">
      <Navbar />

      <div className="events-container">
        <div className="events-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 800 }}>
                Live Requirements
              </h1>
              <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginTop: "2px" }}>
                Stored in real-time MongoDB database
              </p>
            </div>
            <div className="db-status-badge">
              <span className="db-pulse" />
              {events.length} Total Events
            </div>
          </div>

          {/* Designed Search Bar and Controls */}
          <div className="events-controls" style={{ marginTop: "8px" }}>
            {/* Custom Designed Search Input */}
            <div className="search-wrapper" style={{ flex: "1 1 280px" }}>
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by event, location, venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  style={{
                    position: "absolute", right: "12px", background: "none",
                    border: "none", color: "var(--text-3)", cursor: "pointer", fontSize: "0.8rem"
                  }}
                  onClick={() => setSearch("")}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "6px" }}>
              {["all", "planner", "performer", "crew"].map((cat) => (
                <button
                  key={cat}
                  className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                  }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State displays */}
        {loading ? (
          <div className="card" style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--text-2)", fontSize: "0.9rem" }}>Loading events...</p>
          </div>
        ) : error ? (
          <div className="validation-banner">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--text-2)", fontSize: "0.9rem" }}>No events found matching your search filter.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((item) => (
              <div key={item._id} className="event-card">
                <div className="event-card-header">
                  <div>
                    <h3 className="event-card-title">{item.eventName}</h3>
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                      <span className="category-badge">
                        {item.category}
                      </span>
                      <span className="event-card-type">{item.eventType}</span>
                    </div>
                  </div>
                </div>

                <div className="event-details-list">
                  <div className="event-detail-row">
                    <span style={{ color: "var(--text-3)", fontSize: "0.78rem" }}>LOCATION:</span>
                    <span>
                      {item.location} {item.venue ? `(${item.venue})` : ""}
                    </span>
                  </div>
                  <div className="event-detail-row">
                    <span style={{ color: "var(--text-3)", fontSize: "0.78rem" }}>DATE:</span>
                    <span>{fmtDate(item.startDate)}</span>
                  </div>

                  {/* Category specific details */}
                  {item.category === "planner" && item.plannerDetails && (
                    <div style={{ marginTop: "6px", paddingTop: "8px", borderTop: "1px dashed var(--border)" }}>
                      <div>
                        <strong>Services:</strong>{" "}
                        {item.plannerDetails.servicesNeeded?.join(", ") || "General"}
                      </div>
                      <div>
                        <strong>Guests:</strong> {item.plannerDetails.guestCount || "N/A"} |{" "}
                        <strong>Budget:</strong> {fmtCurrency(item.plannerDetails.budgetRange?.max)}
                      </div>
                    </div>
                  )}

                  {item.category === "performer" && item.performerDetails && (
                    <div style={{ marginTop: "6px", paddingTop: "8px", borderTop: "1px dashed var(--border)" }}>
                      <div>
                        <strong>Type:</strong> {item.performerDetails.performerType || "Artist"} (
                        {item.performerDetails.genreStyle?.join(", ")})
                      </div>
                      <div>
                        <strong>Duration:</strong> {item.performerDetails.setDurationMinutes} mins |{" "}
                        <strong>Budget:</strong> {fmtCurrency(item.performerDetails.budget)}
                      </div>
                    </div>
                  )}

                  {item.category === "crew" && item.crewDetails && (
                    <div style={{ marginTop: "6px", paddingTop: "8px", borderTop: "1px dashed var(--border)" }}>
                      <div>
                        <strong>Roles:</strong> {item.crewDetails.crewTypesNeeded?.join(", ")}
                      </div>
                      <div>
                        <strong>Count:</strong> {item.crewDetails.numberOfCrewMembers} members |{" "}
                        <strong>Rate/Person:</strong> {fmtCurrency(item.crewDetails.budgetPerPerson)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="event-card-footer">
                  <span>ID: #{item._id.slice(-8).toUpperCase()}</span>
                  <span>MongoDB Atlas</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
