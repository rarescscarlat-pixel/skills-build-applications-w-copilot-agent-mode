import { CapabilityCard } from './CapabilityCard.js';

type Entry = { teamName: string; totalPoints: number; rank: number };

export default function Leaderboard() {
  return <CapabilityCard<Entry> title="Leaderboard" description="Compare team point totals." path="/api/leaderboard" select={(body) => body.leaderboard} emptyMessage="No leaderboard entries yet." renderItem={(e) => `#${e.rank} ${e.teamName}: ${e.totalPoints} points`} />;
}
