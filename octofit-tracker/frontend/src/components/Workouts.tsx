import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';

type Suggestion = { title: string; reason: string };
type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; suggestions: Suggestion[] };

// Seeded demo user; there is no auth in this exercise.
const demoUserEmail = 'mona@example.com';

export default function Workouts() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getJson<{ suggestions: Suggestion[] }>(`/api/workouts/suggestions/${encodeURIComponent(demoUserEmail)}`)
      .then((body) => { if (!cancelled) setState({ status: 'ready', suggestions: body.suggestions ?? [] }); })
      .catch((error: Error) => { if (!cancelled) setState({ status: 'error', message: error.message }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">Workout suggestions</h2>
        <p>Recommend workouts from activity patterns.</p>
        {state.status === 'loading' && <p role="status">Loading workout suggestions...</p>}
        {state.status === 'error' && <p role="alert" className="text-danger">Unable to load workout suggestions: {state.message}</p>}
        {state.status === 'ready' && state.suggestions.length === 0 && <p>No workout suggestions yet.</p>}
        {state.status === 'ready' && state.suggestions.length > 0 && (
          <ul className="list-group">
            {state.suggestions.map((s, index) => <li key={index} className="list-group-item">{s.title}: {s.reason}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
