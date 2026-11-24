import type { ReactNode } from 'react';
import { useNavigation } from '../../routing/NavigationContext';
import type { ViewName } from '../../routing/views';

export function View({ name, children }: { name: ViewName; children: ReactNode }) {
  const { view } = useNavigation();
  return (
    <section className="view" data-view={name} hidden={view !== name}>
      {children}
    </section>
  );
}
