/** Ex.: "/foo/bar/baz.tar.gz" => "baz" */
export function getFilename(fullPath: string): string {
  return fullPath.split('/').slice(-1)[0].split('.')[0];
}
