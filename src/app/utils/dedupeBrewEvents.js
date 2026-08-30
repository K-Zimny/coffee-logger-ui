const COOLDOWN_MS = 10 * 60 * 1000;

/**
 * Collapses raw brew events that fall within a 10-minute cooldown of the
 * last kept event so one pot is counted per brew.
 *
 * Sorts a copy of the input by timestamp, then keeps an event if it is the
 * first or at least 10 minutes after the last kept event.
 *
 * @param {Object[]} data - Raw brew events with a `Timestamp` field.
 * @returns {Object[]} Deduped events in chronological order.
 */
export default function dedupeBrewEvents(data) {
  if (!data?.length) return [];

  const sorted = [...data].sort(
    (a, b) => Date.parse(a.Timestamp) - Date.parse(b.Timestamp)
  );

  const kept = [];
  let lastKeptTime = -Infinity;

  for (const item of sorted) {
    const current = Date.parse(item.Timestamp);

    if (current - lastKeptTime >= COOLDOWN_MS) {
      kept.push(item);
      lastKeptTime = current;
    }
  }

  return kept;
}
