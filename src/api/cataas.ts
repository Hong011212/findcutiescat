// src/api/cataas.ts
export async function fetchCats(count: number): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < count; i++) {
    const res = await fetch(`https://cataas.com/cat?json=true`);
    const { url } = await res.json();            // e.g. "/cat/abcd"
    urls.push(`https://cataas.com${url}`);
  }
  return urls;
}
