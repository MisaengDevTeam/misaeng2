export default function dateFormatter(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear());

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}
