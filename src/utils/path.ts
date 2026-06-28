// src/utils/path.ts
/**
 * @param path - Path asset (contoh: '/img/logo.png')
 * @returns Path lengkap dengan base URL
 */
export const getAssetPath = (path: string) => {
  // BASE_URL dari vite.config.ts
  const base = import.meta.env.BASE_URL || "/";

  // Hapus slash di awal
  const cleanPath = path.replace(/^\//, "");

  return `${base}${cleanPath}`;
};

// Untuk gambar
export const getImagePath = (path: string) => getAssetPath(path);

// Untuk file lain
export const getFilePath = (path: string) => getAssetPath(path);
