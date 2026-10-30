import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';

type Team = { name: string; description?: string; schedule?: string; maxAttendance?: number; members?: string[]; memberNames?: string[] };
type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; teams: Team[] };

export default function Teams() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getJson<{ teams: Team[] }>('/api/teams')
      .then((body) => { if (!cancelled) setState({ status: 'ready', teams: body.teams ?? [] }); })
      .catch((error: Error) => { if (!cancelled) setState({ status: 'error', message: error.message }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <p>Manage teams and members.</p>
        {state.status === 'loading' && <p role="status">Loading teams...</p>}
        {state.status === 'error' && <p role="alert" className="text-danger">Unable to load teams: {state.message}</p>}
        {state.status === 'ready' && state.teams.length === 0 && <p>No teams created yet.</p>}
        {state.status === 'ready' && state.teams.length > 0 && (
          <ul className="list-group">
            {state.teams.map((t, index) => {
              const names = t.memberNames ?? t.members ?? [];
              return (
                <li key={index} className="list-group-item">
                  <strong>{t.name}</strong>
                  {t.description && <p className="mb-1">{t.description}</p>}
                  {t.schedule && <p className="mb-1">Schedule: {t.schedule}</p>}
                  {t.maxAttendance !== undefined && <p className="mb-1">Max attendance: {t.maxAttendance}</p>}
                  {names.length > 0 && <p className="mb-0">Members: {names.join(', ')}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
