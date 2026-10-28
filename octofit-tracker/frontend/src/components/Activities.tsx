import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';

type Activity = { type: string; minutes: number; points: number };
type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; activities: Activity[] };

export default function Activities() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getJson<{ activities: Activity[] }>('/api/activities')
      .then((body) => { if (!cancelled) setState({ status: 'ready', activities: body.activities ?? [] }); })
      .catch((error: Error) => { if (!cancelled) setState({ status: 'error', message: error.message }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <p>Track student activity minutes and points.</p>
        {state.status === 'loading' && <p role="status">Loading activities...</p>}
        {state.status === 'error' && <p role="alert" className="text-danger">Unable to load activities: {state.message}</p>}
        {state.status === 'ready' && state.activities.length === 0 && <p>No activities logged yet.</p>}
        {state.status === 'ready' && state.activities.length > 0 && (
          <ul className="list-group">
            {state.activities.map((a, index) => <li key={index} className="list-group-item">{a.type}: {a.minutes} minutes, {a.points} points</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
