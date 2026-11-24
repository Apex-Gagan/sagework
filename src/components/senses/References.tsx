import { Fragment, type MouseEvent } from 'react';

export const referenceId = (id: number) => `ref-${id}`;

interface ReferencesProps {
  ids: number[];
  onSelect: (id: number) => void;
}

/** Superscript footnote markers that jump to the reference list. */
export function References({ ids, onSelect }: ReferencesProps) {
  const handleClick = (event: MouseEvent, id: number) => {
    event.preventDefault();
    onSelect(id);
  };

  return (
    <sup className="fn">
      {ids.map((id, i) => (
        <Fragment key={id}>
          {i > 0 && ','}
          <a href="#" aria-label={`Reference ${id}`} onClick={(event) => handleClick(event, id)}>
            {id}
          </a>
        </Fragment>
      ))}
    </sup>
  );
}
