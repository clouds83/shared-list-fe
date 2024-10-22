export function slugify(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\s]+/g, '-')
    .replace(/[-]+/g, '-')
    .toLowerCase()
}
