export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const formatCompact = (value) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const estimateRange = ({ sqft = 0, beds = 0, baths = 0, condition = 'Excellent' }) => {
  const conditionMultiplier = {
    Poor: 0.78,
    Fair: 0.9,
    Good: 1,
    Excellent: 1.12,
    'New / Rebuilt': 1.22,
  }[condition] ?? 1;
  const base = sqft * 820 + beds * 55000 + baths * 30000;
  return {
    low: Math.round(base * conditionMultiplier * 0.88),
    high: Math.round(base * conditionMultiplier * 1.15),
  };
};
