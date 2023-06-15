export default function extractText(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const pElements = doc.querySelectorAll('p');
  const textContents = Array.from(pElements).map((p) => p.textContent || '');
  const filteredArray = textContents.filter((str) => str.trim() !== '');
  const result = filteredArray.join(' ');
  return result;
}
