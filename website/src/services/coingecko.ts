let cache: any[] = [];
let lastFetch = 0;

export async function getTopCryptos() {
  const now = Date.now();

  // 60 secondes de cache
  if (now - lastFetch < 60_000 && cache.length > 0) {
    return cache;
  }

  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1");

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }

  const data = await res.json();

  // Mettre en cache
  cache = data;
  lastFetch = now;

  return data;
}
