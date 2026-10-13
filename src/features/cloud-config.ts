export function resolveCloudConfig(runtimeUrl: string | undefined, runtimeKey: string | undefined, publicUrl: string | undefined, publicKey: string | undefined) {
  const url = runtimeUrl || publicUrl;
  const key = runtimeKey || publicKey;
  if (!url || !key) throw new Error('The store connection is unavailable. Please try again shortly.');
  return { url, key };
}