require("dotenv").config();
const mongoose = require("mongoose");
const Requirement = require("./models/Requirement");

const sampleEvents = [
  {
    eventName: "TechSummit 2026 Keynote Gala",
    eventType: "Corporate Event",
    startDate: new Date("2026-10-15"),
    endDate: new Date("2026-10-16"),
    location: "Bengaluru, Karnataka",
    venue: "BIEC Convention Centre",
    category: "planner",
    plannerDetails: {
      servicesNeeded: ["Décor", "Catering", "Photography", "Videography", "Sound & Lighting"],
      budgetRange: { min: 300000, max: 800000 },
      guestCount: 500,
      preferredExperienceLevel: "Expert",
      specialRequirements: "Requires high-tech LED wall setup and VIP catering section.",
    },
    status: "active",
  },
  {
    eventName: "Neon Horizon Music Night",
    eventType: "Concert",
    startDate: new Date("2026-11-05"),
    endDate: null,
    location: "Goa",
    venue: "HillTop Vagator Beach",
    category: "performer",
    performerDetails: {
      performerType: "DJ",
      genreStyle: ["EDM", "Synthwave", "Progressive House"],
      setDurationMinutes: 120,
      equipmentProvidedByVenue: true,
      performanceDetails: "Main stage headline act for sunset electronic festival.",
      budget: 150000,
    },
    status: "active",
  },
  {
    eventName: "Global AI & Robotics Expo 2026",
    eventType: "Conference",
    startDate: new Date("2026-11-20"),
    endDate: new Date("2026-11-22"),
    location: "Hyderabad, Telangana",
    venue: "HITEX Exhibition Centre",
    category: "crew",
    crewDetails: {
      crewTypesNeeded: ["Stage Crew", "Lighting", "Sound", "Security", "Ushers"],
      numberOfCrewMembers: 25,
      hoursRequired: 12,
      specialSkills: "Experience with live streaming production & crowd control required.",
      budgetPerPerson: 2500,
    },
    status: "pending",
  },
  {
    eventName: "Sharma Family Royal Wedding",
    eventType: "Wedding",
    startDate: new Date("2026-12-10"),
    endDate: new Date("2026-12-12"),
    location: "Udaipur, Rajasthan",
    venue: "Taj Lake Palace",
    category: "planner",
    plannerDetails: {
      servicesNeeded: ["Décor", "Catering", "Photography", "Floral Arrangements", "Entertainment"],
      budgetRange: { min: 1500000, max: 3500000 },
      guestCount: 400,
      preferredExperienceLevel: "Senior",
      specialRequirements: "Traditional Rajasthani theme with organic royal decor.",
    },
    status: "active",
  },
  {
    eventName: "Acoustic Unplugged Evening",
    eventType: "Festival",
    startDate: new Date("2026-10-28"),
    endDate: null,
    location: "Pune, Maharashtra",
    venue: "High Spirits Amphitheatre",
    category: "performer",
    performerDetails: {
      performerType: "Singer",
      genreStyle: ["Indie Folk", "Acoustic Pop"],
      setDurationMinutes: 90,
      equipmentProvidedByVenue: true,
      performanceDetails: "Solo vocal & acoustic guitar set with custom monitor mixes.",
      budget: 45000,
    },
    status: "pending",
  },
  {
    eventName: "UltraSound Arena Production Crew",
    eventType: "Concert",
    startDate: new Date("2026-12-01"),
    endDate: null,
    location: "Mumbai, Maharashtra",
    venue: "Jio World Garden",
    category: "crew",
    crewDetails: {
      crewTypesNeeded: ["Sound", "Lighting", "Security", "Stage Crew"],
      numberOfCrewMembers: 18,
      hoursRequired: 8,
      specialSkills: "Rigging certified technicians & certified acoustic engineers.",
      budgetPerPerson: 3000,
    },
    status: "active",
  },
  {
    eventName: "NextGen EV SUV World Premiere",
    eventType: "Product Launch",
    startDate: new Date("2026-11-12"),
    endDate: null,
    location: "New Delhi",
    venue: "Pragati Maidan Hall 5",
    category: "planner",
    plannerDetails: {
      servicesNeeded: ["Décor", "Videography", "Sound & Lighting", "Invitations & Stationery"],
      budgetRange: { min: 500000, max: 1200000 },
      guestCount: 250,
      preferredExperienceLevel: "Expert",
      specialRequirements: "Press release setup, high dynamic lighting for live stream, motorized vehicle reveal turntable.",
    },
    status: "active",
  },
  {
    eventName: "Laugh Factory Stand-Up Gala",
    eventType: "Birthday Party",
    startDate: new Date("2026-10-30"),
    endDate: null,
    location: "Bengaluru, Karnataka",
    venue: "Indiranagar Social",
    category: "performer",
    performerDetails: {
      performerType: "Comedian",
      genreStyle: ["Stand-up Comedy", "Improv"],
      setDurationMinutes: 60,
      equipmentProvidedByVenue: true,
      performanceDetails: "Clean corporate & adult comedy mix for private 30th birthday party.",
      budget: 35000,
    },
    status: "pending",
  },
  {
    eventName: "National Athletics Championship 2026",
    eventType: "Sports Event",
    startDate: new Date("2026-11-18"),
    endDate: new Date("2026-11-21"),
    location: "Chennai, Tamil Nadu",
    venue: "Jawaharlal Nehru Stadium",
    category: "crew",
    crewDetails: {
      crewTypesNeeded: ["Security", "Ushers", "Backstage Support", "Photographers"],
      numberOfCrewMembers: 30,
      hoursRequired: 10,
      specialSkills: "Sports event logistics & athlete escort experience preferred.",
      budgetPerPerson: 2000,
    },
    status: "active",
  },
  {
    eventName: "Metropolis Fashion Week 2026",
    eventType: "Other",
    startDate: new Date("2026-12-18"),
    endDate: new Date("2026-12-20"),
    location: "Mumbai, Maharashtra",
    venue: "Nita Mukesh Ambani Cultural Centre",
    category: "planner",
    plannerDetails: {
      servicesNeeded: ["Décor", "Photography", "Videography", "Sound & Lighting", "Floral Arrangements"],
      budgetRange: { min: 800000, max: 2000000 },
      guestCount: 600,
      preferredExperienceLevel: "Senior",
      specialRequirements: "Catwalk runway construction, back-stage dressing room setups, press backdrop wall.",
    },
    status: "active",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const inserted = await Requirement.insertMany(sampleEvents);
    console.log(`✅ Successfully seeded ${inserted.length} new event requirements into MongoDB Atlas!`);
    
    const totalCount = await Requirement.countDocuments();
    console.log(`📊 Total requirements in database now: ${totalCount}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();
