// Utility helpers

/**
 * Format a number as a USD currency string.
 */
export function formatCurrency(value: number, decimals = 2): string {
  if (value >= 1_000_000_000)
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000)
    return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000)
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
  return `$${value.toFixed(decimals)}`
}

/**
 * Format a raw price respecting significant digits.
 */
export function formatPrice(price: number): string {
  if (price >= 1_000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 1)     return price.toFixed(4)
  return price.toFixed(8)
}

/**
 * Format percentage change, e.g. "+2.34%" or "-1.20%"
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Compact number formatting, e.g. "1.23M", "456.7K"
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000)     return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000)         return `${(value / 1_000).toFixed(2)}K`
  return value.toFixed(2)
}

/**
 * Convert a Unix timestamp (ms) to a short datetime string.
 */
export function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Truncate a long string with an ellipsis in the middle.
 */
export function truncateMiddle(str: string, start = 6, end = 4): string {
  if (str.length <= start + end + 3) return str
  return `${str.slice(0, start)}...${str.slice(-end)}`
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Sleep for ms milliseconds.
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
