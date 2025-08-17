interface WaitlistEntry {
  email: string
  whoAreYou?: string
  ageRange?: string
  timestamp: string
  userAgent?: string
  position: number
}

// Simple in-memory store (in production, use a database)
const waitlistEntries: WaitlistEntry[] = []

export function addWaitlistEntry(entry: Omit<WaitlistEntry, "position">): WaitlistEntry {
  const newEntry: WaitlistEntry = {
    ...entry,
    position: waitlistEntries.length + 1,
  }
  waitlistEntries.push(newEntry)
  return newEntry
}

export function getWaitlistEntries(): WaitlistEntry[] {
  return [...waitlistEntries]
}

export function findWaitlistEntry(email: string): WaitlistEntry | undefined {
  return waitlistEntries.find((entry) => entry.email.toLowerCase() === email.toLowerCase())
}

export function getWaitlistStats() {
  return {
    totalSignups: waitlistEntries.length,
    latestSignup: waitlistEntries[waitlistEntries.length - 1]?.timestamp || null,
    entries: waitlistEntries,
  }
}
