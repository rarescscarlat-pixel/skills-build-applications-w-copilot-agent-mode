import { CapabilityCard } from './CapabilityCard.js';

type Team = { name: string; members?: string[] };

export default function Teams() {
  return <CapabilityCard<Team> title="Teams" description="Manage teams and members." path="/api/teams" select={(body) => body.teams} emptyMessage="No teams created yet." renderItem={(t) => t.members?.length ? `${t.name}: ${t.members.join(', ')}` : t.name} />;
}
