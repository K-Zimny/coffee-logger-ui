export default function getDaysSinceStart() {
    const startOfJan2025 = new Date(2025, 0, 1); // Data collection Start Date
    const today = new Date();
    const diffInMs = today - startOfJan2025;

    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }