import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  extra?: string;
}

export const Button: FC<Props> = (props) => {
  const { text, extra, ...rest } = props;

  return (
    <button
      className={cn(
        `linear mt-2 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`,
        extra,
      )}
      type="button"
      {...rest}
    >
      {text}
    </button>
  );
};
