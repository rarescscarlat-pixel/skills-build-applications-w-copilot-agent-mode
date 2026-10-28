import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';

type Entry = { teamName: string; totalPoints: number; rank: number };
type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; leaderboard: Entry[] };

export default function Leaderboard() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getJson<{ leaderboard: Entry[] }>('/api/leaderboard')
      .then((body) => { if (!cancelled) setState({ status: 'ready', leaderboard: body.leaderboard ?? [] }); })
      .catch((error: Error) => { if (!cancelled) setState({ status: 'error', message: error.message }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <p>Compare team point totals.</p>
        {state.status === 'loading' && <p role="status">Loading leaderboard...</p>}
        {state.status === 'error' && <p role="alert" className="text-danger">Unable to load leaderboard: {state.message}</p>}
        {state.status === 'ready' && state.leaderboard.length === 0 && <p>No leaderboard entries yet.</p>}
        {state.status === 'ready' && state.leaderboard.length > 0 && (
          <ul className="list-group">
            {state.leaderboard.map((e, index) => <li key={index} className="list-group-item">#{e.rank} {e.teamName}: {e.totalPoints} points</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
