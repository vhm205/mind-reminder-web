import cn from 'classnames';
import { FC } from 'react';

type Props = {
  extra?: string;
  text?: string;
};

export const ErrorMessage: FC<Props> = ({
  extra,
  text = 'Error something!!',
}) => {
  return (
    <div className={cn('text-sm text-red-700', extra)} role="alert">
      <span className="block sm:inline">{text}</span>
    </div>
  );
};
