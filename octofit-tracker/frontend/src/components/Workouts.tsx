import { CapabilityCard } from './CapabilityCard.js';

type Suggestion = { title: string; reason: string };

// Seeded demo user; there is no auth in this exercise.
const demoUserEmail = 'mona@example.com';

export default function Workouts() {
  return <CapabilityCard<Suggestion> title="Workout suggestions" description="Recommend workouts from activity patterns." path={`/api/workouts/suggestions/${encodeURIComponent(demoUserEmail)}`} select={(body) => body.suggestions} emptyMessage="No workout suggestions yet." renderItem={(s) => `${s.title}: ${s.reason}`} />;
}
