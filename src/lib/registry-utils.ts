/**
 * Convert PascalCase component name to kebab-case URL slug.
 * e.g. "RadioGroup" → "radio-group", "Button" → "button"
 */
export function toSlug(name: string): string {
  return name
    .replace(/([A-Z])/g, (match, letter, offset) =>
      offset > 0 ? `-${letter.toLowerCase()}` : letter.toLowerCase()
    );
}

/**
 * Convert kebab-case slug back to PascalCase name for lookup.
 * e.g. "radio-group" → "RadioGroup"
 */
export function fromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
