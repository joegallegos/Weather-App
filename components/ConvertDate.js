import { parseISO, format } from 'date-fns';

export default function ConvertDate({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'hh:mm a')}</time>;
}
