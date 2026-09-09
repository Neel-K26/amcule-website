/**
 * Resolves images dropped into src/assets/images/ by filename, at build
 * time — Vite's glob bundles whatever exists there (nothing if the folder
 * is empty) so a missing file is a normal "not found", not a build error.
 */
const modules = import.meta.glob<string>('/src/assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

export function getImage(filename: string): string | undefined {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${filename}`))
  return entry?.[1]
}
