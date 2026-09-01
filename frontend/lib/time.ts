export function formatConversationTime(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfThatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round(
    (startOfToday.getTime() - startOfThatDay.getTime()) / 86_400_000
  );

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (dayDiff === 0) return `${Math.max(diffHours, 1)}h`; // same calendar day → "2h"
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // "Mar 4"
}