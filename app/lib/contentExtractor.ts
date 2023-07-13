export default function extractText(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const textElements = doc.querySelectorAll('p, h1, h2, h3');
  const textContents = Array.from(textElements).map(
    (element) => element.textContent || ''
  );
  const filteredArray = textContents.filter((str) => str.trim() !== '');

  const result = filteredArray.join(' ');
  return result;
}
