import { promises as fs } from 'fs';
import { join } from 'path';

import { readDirectory, getFilename } from '../src/core/utils';

const ROOT_DIR = join(__dirname, '..');
const SOURCE_DIR = join(ROOT_DIR, 'src');
const CORE_DIR = join(SOURCE_DIR, 'core');
const CACHE_DIR = join(SOURCE_DIR, 'storage', 'cache');
const CONFIG_DIR = join(CORE_DIR, 'config');

(async () => {

  const BARRELING_DIR = join(ROOT_DIR, 'barreling');
  const files = await readDirectory(BARRELING_DIR);
  const barrel = files
    .map(file => file.split('/').slice(-1)[0])
    .map(file => `export * from ./${file};`)
    .join('\n');

  console.log(lines);

})();

/**
 * TODO
 * - Save barrel file
 * - Dive deeper into the folder and export the folder
 * - Optionally do not export folders
 */
