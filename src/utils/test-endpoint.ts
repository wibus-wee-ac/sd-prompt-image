import { ofetch } from "ofetch";

export default async function testEndpoint(endpoint: string) {
  const response = await ofetch.raw(endpoint, { method: 'HEAD', referrer: endpoint }).catch(() => null);
  return response?.ok;
}