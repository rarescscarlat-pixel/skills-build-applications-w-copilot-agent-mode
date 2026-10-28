import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';

type Props<T> = {
  title: string;
  description: string;
  path: string;
  select: (body: any) => T[];
  emptyMessage: string;
  renderItem: (item: T) => string;
};

type State<T> = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; items: T[] };

export function CapabilityCard<T>({ title, description, path, select, emptyMessage, renderItem }: Props<T>) {
  const [state, setState] = useState<State<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    getJson<unknown>(path)
      .then((body) => { if (!cancelled) setState({ status: 'ready', items: select(body) ?? [] }); })
      .catch((error: Error) => { if (!cancelled) setState({ status: 'error', message: error.message }); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">{title}</h2>
        <p>{description}</p>
        {state.status === 'loading' && <p role="status">Loading {title.toLowerCase()}...</p>}
        {state.status === 'error' && <p role="alert" className="text-danger">Unable to load {title.toLowerCase()}: {state.message}</p>}
        {state.status === 'ready' && state.items.length === 0 && <p>{emptyMessage}</p>}
        {state.status === 'ready' && state.items.length > 0 && (
          <ul className="list-group">
            {state.items.map((item, index) => <li key={index} className="list-group-item">{renderItem(item)}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
