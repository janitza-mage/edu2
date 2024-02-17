/*
The methods defined here work around Javascript's retarded idea of how base64 works and its confusion around bytes
vs. characters. It also shields application code from the more complicated handling of Buffer objects (vs. Uint8Array).
 */

type Method = "base64" | "base64url";

function encode(data: Uint8Array | ArrayBuffer, method: Method): string {
  const buffer = data instanceof ArrayBuffer ? Buffer.from(data) : Buffer.from(data, data.byteOffset, data.byteLength);
  return buffer.toString(method);
}

function decode(encoded: string, method: Method): Uint8Array {
  const buffer = Buffer.from(encoded, method);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

// --------------------------------------------------------------------------------------------------------------------

export function base64Encode(buffer: Uint8Array | ArrayBuffer): string {
  return encode(buffer, "base64");
}

export function urlSafeBase64Encode(buffer: Uint8Array | ArrayBuffer): string {
  return encode(buffer, "base64url");
}

// --------------------------------------------------------------------------------------------------------------------

export function base64Decode(encoded: string): Uint8Array {
  return decode(encoded, "base64");
}

export function urlSafeBase64Decode(encoded: string): Uint8Array {
  return decode(encoded, "base64url");
}

// --------------------------------------------------------------------------------------------------------------------

export function base64EncodeUtf8(s: string): string {
  return base64Encode(new TextEncoder().encode(s));
}

export function urlSafeBase64EncodeUtf8(s: string): string {
  return urlSafeBase64Encode(new TextEncoder().encode(s));
}

// --------------------------------------------------------------------------------------------------------------------

export function base64DecodeUtf8(encoded: string): string {
  return new TextDecoder().decode(base64Decode(encoded));
}

export function urlSafeBase64DecodeUtf8(encoded: string): string {
  return new TextDecoder().decode(urlSafeBase64Decode(encoded));
}
