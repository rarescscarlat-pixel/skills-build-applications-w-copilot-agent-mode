import { CapabilityCard } from './CapabilityCard.js';

type Activity = { type: string; minutes: number; points: number };

export default function Activities() {
  return <CapabilityCard<Activity> title="Activities" description="Track student activity minutes and points." path="/api/activities" select={(body) => body.activities} emptyMessage="No activities logged yet." renderItem={(a) => `${a.type}: ${a.minutes} minutes, ${a.points} points`} />;
}
