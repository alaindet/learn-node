import { promises as fs } from 'fs';
import { join } from 'path';

import { readDirectory, getFilename } from '../src/core/utils';

const ROOT_DIR = join(__dirname, '..');
const SOURCE_DIR = join(ROOT_DIR, 'src');
const CORE_DIR = join(SOURCE_DIR, 'core');
const CACHE_DIR = join(SOURCE_DIR, 'storage', 'cache');
const CONFIG_DIR = join(CORE_DIR, 'config');

(async () => {

  console.log('🔨 Creating cached config file...');

  const configCacheData: { [config: string]: any } = {};
  const configFiles = await readDirectory(CONFIG_DIR);

  for (const configFile of configFiles) {
    const configFileData = await import(configFile);
    const configFileName = getFilename(configFile);
    configCacheData[configFileName] = configFileData;
  }

  const configCacheFile = join(CACHE_DIR, 'config.json');
  await fs.writeFile(configCacheFile, JSON.stringify(configCacheData));

  console.log(`✔ Cached config file created in\n  ${configCacheFile}\n`);

})();
