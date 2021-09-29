declare class AbortController {
  constructor();
  readonly signal: AbortSignal;
  abort(): void;
}

declare class AbortSignal extends EventTarget {
  constructor();
  static abort(): AbortSignal;
  readonly aborted: boolean;
}

interface BasicImageTransformations {
  /**
   * Maximum width in image pixels. The value must be an integer.
   */
  width?: number;
  /**
   * Maximum height in image pixels. The value must be an integer.
   */
  height?: number;
  /**
   * Resizing mode as a string. It affects interpretation of width and height
   * options:
   *  - scale-down: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  - contain: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  - cover: Resizes (shrinks or enlarges) to fill the entire area of width
   *    and height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  - crop: The image will shrunk and cropped to fit within the area
   *    specified by width and height. The image won’t be enlarged. For images
   *    smaller than the given dimensions it’s the same as scale-down. For
   *    images larger than the given dimensions, it’s the same as cover.
   *  - pad: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is not recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
  /**
   * When cropping with fit: "cover", this defines the side or point that should
   * be left uncropped. The value is either a string
   * "left", "right", "top", "bottom" or "center" (the default),
   * or an object {x, y} containing focal point coordinates in the original
   * image expressed as fractions ranging from 0.0 (top or left) to 1.0
   * (bottom or right), 0.5 being the center. {fit: "cover", gravity: "top"} will
   * crop bottom or left and right sides as necessary, but won’t crop anything
   * from the top. {fit: "cover", gravity: {x:0.5, y:0.2}} will crop each side to
   * preserve as much as possible around a point at 20% of the height of the
   * source image.
   */
  gravity?: "left" | "right" | "top" | "bottom" | "center" | BasicImageTransformationsGravityCoordinates;
  /**
   * Background color to add underneath the image. Applies only to images with
   * transparency (such as PNG). Accepts any CSS color (#RRGGBB, rgba(…),
   * hsl(…), etc.)
   */
  background?: string;
  /**
   * Number of degrees (90, 180, 270) to rotate the image by. width and height
   * options refer to axes after rotation.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
}

interface BasicImageTransformationsGravityCoordinates {
  x: number;
  y: number;
}

declare class Blob {
  constructor(bits?: BlobBits, options?: BlobOptions);
  readonly size: number;
  readonly type: string;
  slice(start?: number, end?: number, type?: string): Blob;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  stream(): ReadableStream;
}

declare type BlobBits = (ArrayBuffer | string | Blob)[];

interface BlobOptions {
  type?: string;
}

declare abstract class Body {
  readonly body: ReadableStream | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
  formData(): Promise<FormData>;
  blob(): Promise<Blob>;
}

declare type BodyInitializer = ReadableStream | string | ArrayBuffer | Blob | URLSearchParams | FormData;

declare abstract class Cache {
  delete(request: Request | string, options?: CacheQueryOptions): Promise<boolean>;
  match(request: Request | string, options?: CacheQueryOptions): Promise<Response | undefined>;
  put(request: Request | string, response: Response): Promise<void>;
}

interface CacheQueryOptions {
  ignoreMethod?: boolean;
}

declare abstract class CacheStorage {
  open(cacheName: string): Promise<Cache>;
  readonly default: Cache;
}

interface CfRequestInitializerDict extends Omit<RequestInitializerDict, "cf"> {
  cf?: RequestInitCfProperties;
}

declare class CloseEvent extends Event {
  constructor(type: string, initializer: CloseEventInitializer);
  readonly code: number;
  readonly reason: string;
  readonly wasClean: boolean;
}

interface CloseEventInitializer {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}

declare abstract class Comment {
  text: string;
  readonly removed: boolean;
  before(content: Content, options?: ContentOptions): Comment;
  after(content: Content, options?: ContentOptions): Comment;
  replace(content: Content, options?: ContentOptions): Comment;
  remove(): Comment;
}

interface Console {
  debug(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  warn(...data: any[]): void;
}

declare type Content = string | ReadableStream | Response;

interface ContentOptions {
  html?: boolean;
}

declare abstract class Crypto {
  readonly subtle: SubtleCrypto;
  getRandomValues(buffer: ArrayBufferView): ArrayBufferView;
  randomUUID(): string;
}

declare abstract class CryptoKey {
  readonly type: string;
  readonly extractable: boolean;
  readonly algorithm: CryptoKeyAlgorithmVariant;
  readonly usages: string[];
}

interface CryptoKeyAesKeyAlgorithm {
  name: string;
  length: number;
}

declare type CryptoKeyAlgorithmVariant = CryptoKeyKeyAlgorithm | CryptoKeyAesKeyAlgorithm | CryptoKeyHmacKeyAlgorithm | CryptoKeyRsaKeyAlgorithm | CryptoKeyEllipticKeyAlgorithm | CryptoKeyVoprfKeyAlgorithm | CryptoKeyOprfKeyAlgorithm;

interface CryptoKeyEllipticKeyAlgorithm {
  name: string;
  namedCurve: string;
}

interface CryptoKeyHmacKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  length: number;
}

interface CryptoKeyKeyAlgorithm {
  name: string;
}

interface CryptoKeyOprfKeyAlgorithm {
  name: string;
  namedCurve: string;
}

interface CryptoKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

interface CryptoKeyRsaKeyAlgorithm {
  name: string;
  modulusLength: number;
  publicExponent: ArrayBuffer;
  hash?: CryptoKeyKeyAlgorithm;
}

interface CryptoKeyVoprfKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  namedCurve: string;
}

declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  readonly code: number;
  static readonly INDEX_SIZE_ERR: number;
  static readonly DOMSTRING_SIZE_ERR: number;
  static readonly HIERARCHY_REQUEST_ERR: number;
  static readonly WRONG_DOCUMENT_ERR: number;
  static readonly INVALID_CHARACTER_ERR: number;
  static readonly NO_DATA_ALLOWED_ERR: number;
  static readonly NO_MODIFICATION_ALLOWED_ERR: number;
  static readonly NOT_FOUND_ERR: number;
  static readonly NOT_SUPPORTED_ERR: number;
  static readonly INUSE_ATTRIBUTE_ERR: number;
  static readonly INVALID_STATE_ERR: number;
  static readonly SYNTAX_ERR: number;
  static readonly INVALID_MODIFICATION_ERR: number;
  static readonly NAMESPACE_ERR: number;
  static readonly INVALID_ACCESS_ERR: number;
  static readonly VALIDATION_ERR: number;
  static readonly TYPE_MISMATCH_ERR: number;
  static readonly SECURITY_ERR: number;
  static readonly NETWORK_ERR: number;
  static readonly ABORT_ERR: number;
  static readonly URL_MISMATCH_ERR: number;
  static readonly QUOTA_EXCEEDED_ERR: number;
  static readonly TIMEOUT_ERR: number;
  static readonly INVALID_NODE_TYPE_ERR: number;
  static readonly DATA_CLONE_ERR: number;
}

declare abstract class Doctype {
  readonly name: string | null;
  readonly publicId: string | null;
  readonly systemId: string | null;
}

declare abstract class DocumentEnd {
  append(content: Content, options?: ContentOptions): DocumentEnd;
}

interface DurableObject {
  fetch(request: Request): Promise<Response>;
}

declare abstract class DurableObjectId {
  toString(): string;
  equals(other: DurableObjectId): boolean;
  readonly name?: string;
}

declare abstract class DurableObjectNamespace {
  newUniqueId(options?: DurableObjectNamespaceNewUniqueIdOptions): DurableObjectId;
  idFromName(name: string): DurableObjectId;
  idFromString(id: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

interface DurableObjectNamespaceNewUniqueIdOptions {
  jurisdiction?: string;
}

declare abstract class DurableObjectState {
  waitUntil(promise: Promise<void>): void;
  readonly id: DurableObjectId | string;
  readonly storage?: DurableObjectStorage;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
}

declare abstract class DurableObjectStorage {
  get<T = unknown>(key: string, options?: DurableObjectStorageOperationsGetOptions): Promise<T | undefined>;
  get<T = unknown>(keys: string[], options?: DurableObjectStorageOperationsGetOptions): Promise<Map<string, T>>;
  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;
  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;
  deleteAll(options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  transaction<T>(closure: (txn: DurableObjectTransaction) => Promise<T>): Promise<T>;
}

interface DurableObjectStorageOperationsGetOptions {
  allowConcurrency?: boolean;
  noCache?: boolean;
}

interface DurableObjectStorageOperationsListOptions {
  start?: string;
  end?: string;
  prefix?: string;
  reverse?: boolean;
  limit?: number;
  allowConcurrency?: boolean;
  noCache?: boolean;
}

interface DurableObjectStorageOperationsPutOptions {
  allowConcurrency?: boolean;
  allowUnconfirmed?: boolean;
  noCache?: boolean;
}

declare abstract class DurableObjectStub extends Fetcher {
  readonly id: DurableObjectId;
  readonly name?: string;
}

declare abstract class DurableObjectTransaction {
  get<T = unknown>(key: string, options?: DurableObjectStorageOperationsGetOptions): Promise<T>;
  get<T = unknown>(keys: string[], options?: DurableObjectStorageOperationsGetOptions): Promise<Map<string, T>>;
  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;
  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;
  rollback(): void;
}

declare abstract class Element {
  tagName: string;
  readonly attributes: IterableIterator<string[]>;
  readonly removed: boolean;
  readonly namespaceURI: string;
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): Element;
  removeAttribute(name: string): Element;
  before(content: Content, options?: ContentOptions): Element;
  after(content: Content, options?: ContentOptions): Element;
  prepend(content: Content, options?: ContentOptions): Element;
  append(content: Content, options?: ContentOptions): Element;
  replace(content: Content, options?: ContentOptions): Element;
  remove(): Element;
  removeAndKeepContent(): Element;
  setInnerContent(content: Content, options?: ContentOptions): Element;
}

declare class Event {
  constructor(type: string, init?: EventInit);
  readonly type: string;
  readonly eventPhase: number;
  readonly composed: boolean;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly defaultPrevented: boolean;
  readonly returnValue: boolean;
  readonly currentTarget?: EventTarget;
  readonly srcElement?: EventTarget;
  readonly timeStamp: number;
  readonly isTrusted: boolean;
  cancelBubble: boolean;
  stopImmediatePropagation(): void;
  preventDefault(): void;
  stopPropagation(): void;
  composedPath(): EventTarget[];
  static readonly NONE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
}

interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

declare type EventListener<EventType extends Event = Event> = (event: EventType) => void;

interface EventListenerObject<EventType extends Event = Event> {
  handleEvent(event: EventType): void;
}

declare type EventListenerOrEventListenerObject<EventType extends Event = Event> = EventListener<EventType> | EventListenerObject<EventType>;

declare class EventTarget<EventMap extends Record<string, Event> = Record<string, Event>> {
  constructor();
  addEventListener<Type extends keyof EventMap>(type: Type, handler: EventListenerOrEventListenerObject<EventMap[Type]>, options?: EventTargetAddEventListenerOptions | boolean): void;
  removeEventListener<Type extends keyof EventMap>(type: Type, handler: EventListenerOrEventListenerObject<EventMap[Type]>, options?: EventTargetEventListenerOptions | boolean): void;
  dispatchEvent(event: EventMap[keyof EventMap]): boolean;
}

interface EventTargetAddEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

interface EventTargetEventListenerOptions {
  capture?: boolean;
}

declare abstract class ExecutionContext {
  waitUntil(promise: Promise<void>): void;
  passThroughOnException(): void;
}

interface ExportedHandler<Env = unknown> {
  fetch?: ExportedHandlerFetchHandler<Env>;
  scheduled?: ExportedHandlerScheduledHandler<Env>;
}

declare type ExportedHandlerFetchHandler<Env = unknown> = (request: Request, env: Env, ctx: ExecutionContext) => Response | Promise<Response>;

declare type ExportedHandlerScheduledHandler<Env = unknown> = (controller: ScheduledController, env: Env, ctx: ExecutionContext) => void | Promise<void>;

declare class FetchEvent extends Event {
  constructor(type: string);
  readonly request: Request;
  respondWith(promise: Response | Promise<Response>): void;
  passThroughOnException(): void;
  waitUntil(promise: Promise<void>): void;
}

declare abstract class Fetcher {
  fetch(requestOrUrl: Request | string, requestInit?: RequestInitializerDict | Request): Promise<Response>;
}

declare class File extends Blob {
  constructor(bits?: BlobBits, name?: string, options?: FileOptions);
  readonly name: string;
  readonly lastModified: number;
}

interface FileOptions {
  type?: string;
  lastModified?: number;
}

declare class FixedLengthStream extends TransformStream {
  constructor(expectedLength: number);
}

declare class FormData {
  constructor();
  append(name: string, value: string): void;
  append(name: string, value: Blob, filename?: string): void;
  delete(name: string): void;
  get(name: string): File | string | null;
  getAll(name: string): (File | string)[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  set(name: string, value: Blob, filename?: string): void;
  entries(): IterableIterator<([key: string, value: File | string])[]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<File | string>;
  forEach<This = unknown>(callback: (this: This, key: string, value: File | string, parent: FormData) => void, thisArg?: This): void;
  [Symbol.iterator](): IterableIterator<([key: string, value: File | string])[]>;
}

declare class HTMLRewriter {
  constructor();
  on(selector: string, handlers: HTMLRewriterElementContentHandlers): HTMLRewriter;
  onDocument(handlers: HTMLRewriterDocumentContentHandlers): HTMLRewriter;
  transform(response: Response): Response;
}

interface HTMLRewriterDocumentContentHandlers {
  doctype?(doctype: Doctype): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
  end?(end: DocumentEnd): void | Promise<void>;
}

interface HTMLRewriterElementContentHandlers {
  element?(element: Element): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
}

declare class Headers {
  constructor(init?: HeadersInitializer);
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  forEach<This = unknown>(callback: (this: This, key: string, value: string, parent: Headers) => void, thisArg?: This): void;
  entries(): IterableIterator<[key: string, value: string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}

declare type HeadersInitializer = Headers | Record<string, string> | ([key: string, value: string])[];

/**
 * In addition to the properties on the standard Request object,
 * the cf object contains extra information about the request provided
 * by Cloudflare's edge.
 *
 * Note: Currently, settings in the cf object cannot be accessed in the
 * playground.
 */
interface IncomingRequestCfProperties {
  /**
   * (e.g. 395747)
   */
  asn: number;
  botManagement?: IncomingRequestCfPropertiesBotManagement;
  city?: string;
  clientTcpRtt: number;
  clientTrustScore?: number;
  /**
   * The three-letter airport code of the data center that the request
   * hit. (e.g. "DFW")
   */
  colo: string;
  continent?: string;
  /**
   * The two-letter country code in the request. This is the same value
   * as that provided in the CF-IPCountry header. (e.g. "US")
   */
  country: string;
  httpProtocol: string;
  latitude?: string;
  longitude?: string;
  /**
   * DMA metro code from which the request was issued, e.g. "635"
   */
  metroCode?: string;
  postalCode?: string;
  /**
   * e.g. "Texas"
   */
  region?: string;
  /**
   * e.g. "TX"
   */
  regionCode?: string;
  /**
   * e.g. "weight=256;exclusive=1"
   */
  requestPriority: string;
  /**
   * e.g. "America/Chicago"
   */
  timezone?: string;
  tlsVersion: string;
  tlsCipher: string;
  tlsClientAuth: IncomingRequestCfPropertiesTLSClientAuth;
}

interface IncomingRequestCfPropertiesBotManagement {
  score: number;
  staticResource: boolean;
  verifiedBot: boolean;
}

interface IncomingRequestCfPropertiesTLSClientAuth {
  certIssuerDNLegacy: string;
  certIssuerDN: string;
  certPresented: "0" | "1";
  certSubjectDNLegacy: string;
  certSubjectDN: string;
  /**
   * In format "Dec 22 19:39:00 2018 GMT"
   */
  certNotBefore: string;
  /**
   * In format "Dec 22 19:39:00 2018 GMT"
   */
  certNotAfter: string;
  certSerial: string;
  certFingerprintSHA1: string;
  /**
   * "SUCCESS", "FAILED:reason", "NONE"
   */
  certVerified: string;
}

/**
 * Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency,
 * making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.
 */
declare abstract class KVNamespace {
  get(key: string, options?: Partial<KVNamespaceGetOptions<undefined>>): Promise<string | null>;
  get(key: string, type: "text"): Promise<string | null>;
  get<ExpectedValue = unknown>(key: string, type: "json"): Promise<ExpectedValue | null>;
  get(key: string, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
  get(key: string, type: "stream"): Promise<ReadableStream | null>;
  get(key: string, options: KVNamespaceGetOptions<"text">): Promise<string | null>;
  get<ExpectedValue = unknown>(key: string, options: KVNamespaceGetOptions<"json">): Promise<ExpectedValue | null>;
  get(key: string, options: KVNamespaceGetOptions<"arrayBuffer">): Promise<ArrayBuffer | null>;
  get(key: string, options: KVNamespaceGetOptions<"stream">): Promise<ReadableStream | null>;
  list<Metadata = unknown>(options?: KVNamespaceListOptions): Promise<KVNamespaceListResult<Metadata>>;
  /**
   * Creates a new key-value pair, or updates the value for a particular key.
   * @param key key to associate with the value. A key cannot be empty, `.` or `..`. All other keys are valid.
   * @param value value to store. The type is inferred. The maximum size of a value is 25MB.
   * @returns Returns a `Promise` that you should `await` on in order to verify a successful update.
   * @example
   * await NAMESPACE.put(key, value)
   */
  put(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream, options?: KVNamespacePutOptions): Promise<void>;
  getWithMetadata<Metadata = unknown>(key: string, options?: Partial<KVNamespaceGetOptions<undefined>>): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, type: "text"): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(key: string, type: "json"): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, type: "arrayBuffer"): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, type: "stream"): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, options: KVNamespaceGetOptions<"text">): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(key: string, options: KVNamespaceGetOptions<"json">): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, options: KVNamespaceGetOptions<"arrayBuffer">): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(key: string, options: KVNamespaceGetOptions<"stream">): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  delete(name: string): Promise<void>;
}

interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}

interface KVNamespaceGetWithMetadataResult<Value, Metadata> {
  value: Value | null;
  metadata: Metadata | null;
}

interface KVNamespaceListKey<Metadata> {
  name: string;
  expiration?: number;
  metadata?: Metadata;
}

interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string | null;
  cursor?: string | null;
}

interface KVNamespaceListResult<Metadata> {
  keys: KVNamespaceListKey<Metadata>[];
  list_complete: boolean;
  cursor?: string;
}

interface KVNamespacePutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any | null;
}

declare class MessageEvent extends Event {
  constructor(type: string, initializer: MessageEventInitializer);
  readonly data: ArrayBuffer | string;
}

interface MessageEventInitializer {
  data: ArrayBuffer | string;
}

declare abstract class ReadableStream {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(options?: ReadableStreamGetReaderOptions): ReadableStreamReader;
  pipeThrough(transform: ReadableStreamTransform, options?: ReadableStreamPipeToOptions): ReadableStream;
  pipeTo(destination: WritableStream, options?: ReadableStreamPipeToOptions): Promise<void>;
  tee(): [ReadableStream, ReadableStream];
}

interface ReadableStreamGetReaderOptions {
  mode?: string;
}

interface ReadableStreamPipeToOptions {
  preventClose?: boolean;
  preventAbort?: boolean;
  preventCancel?: boolean;
}

declare abstract class ReadableStreamReader {
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
  read(byobBuffer?: ArrayBufferView): Promise<ReadableStreamReaderReadResult>;
  releaseLock(): void;
}

interface ReadableStreamReaderReadResult {
  value?: any;
  done: boolean;
}

interface ReadableStreamTransform {
  writable: WritableStream;
  readable: ReadableStream;
}

declare class Request extends Body {
  constructor(input: Request | string, init?: RequestInitializerDict | Request);
  clone(): Request;
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  readonly redirect: string;
  readonly fetcher: Fetcher | null;
  readonly signal: AbortSignal;
  readonly cf?: IncomingRequestCfProperties;
}

/**
 * In addition to the properties you can set in the RequestInit dict
 * that you pass as an argument to the Request constructor, you can
 * set certain properties of a `cf` object to control how Cloudflare
 * features are applied to that new Request.
 *
 * Note: Currently, these properties cannot be tested in the
 * playground.
 */
interface RequestInitCfProperties {
  cacheEverything?: boolean;
  /**
   * A request's cache key is what determines if two requests are
   * "the same" for caching purposes. If a request has the same cache key
   * as some previous request, then we can serve the same cached response for
   * both. (e.g. 'some-key')
   *
   * Only available for Enterprise customers.
   */
  cacheKey?: string;
  /**
   * Force response to be cached for a given number of seconds. (e.g. 300)
   */
  cacheTtl?: number;
  /**
   * Force response to be cached for a given number of seconds based on the Origin status code.
   * (e.g. { '200-299': 86400, '404': 1, '500-599': 0 })
   */
  cacheTtlByStatus?: Record<string, number>;
  scrapeShield?: boolean;
  apps?: boolean;
  image?: RequestInitCfPropertiesImage;
  minify?: RequestInitCfPropertiesImageMinify;
  mirage?: boolean;
  /**
   * Redirects the request to an alternate origin server. You can use this,
   * for example, to implement load balancing across several origins.
   * (e.g.us-east.example.com)
   *
   * Note - For security reasons, the hostname set in resolveOverride must
   * be proxied on the same Cloudflare zone of the incoming request.
   * Otherwise, the setting is ignored. CNAME hosts are allowed, so to
   * resolve to a host under a different domain or a DNS only domain first
   * declare a CNAME record within your own zone’s DNS mapping to the
   * external hostname, set proxy on Cloudflare, then set resolveOverride
   * to point to that CNAME record.
   */
  resolveOverride?: string;
}

interface RequestInitCfPropertiesImage extends BasicImageTransformations {
  /**
   * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it
   * easier to specify higher-DPI sizes in <img srcset>.
   */
  dpr?: number;
  /**
   * Quality setting from 1-100 (useful values are in 60-90 range). Lower values
   * make images look worse, but load faster. The default is 85. It applies only
   * to JPEG and WebP images. It doesn’t have any effect on PNG.
   */
  quality?: number;
  /**
   * Output format to generate. It can be:
   *  - avif: generate images in AVIF format.
   *  - webp: generate images in Google WebP format. Set quality to 100 to get
   *    the WebP-lossless format.
   *  - json: instead of generating an image, outputs information about the
   *    image, in JSON format. The JSON object will contain image size
   *    (before and after resizing), source image’s MIME type, file size, etc.
   */
  format?: "avif" | "webp" | "json";
  /**
   * What EXIF data should be preserved in the output image. Note that EXIF
   * rotation and embedded color profiles are always applied ("baked in" into
   * the image), and aren't affected by this option. Note that if the Polish
   * feature is enabled, all metadata may have been removed already and this
   * option may have no effect.
   *  - keep: Preserve most of EXIF metadata, including GPS location if there's
   *    any.
   *  - copyright: Only keep the copyright tag, and discard everything else.
   *    This is the default behavior for JPEG files.
   *  - none: Discard all invisible EXIF metadata. Currently WebP and PNG
   *    output formats always discard metadata.
   */
  metadata?: "keep" | "copyright" | "none";
  /**
   * Overlays are drawn in the order they appear in the array (last array
   * entry is the topmost layer).
   */
  draw?: RequestInitCfPropertiesImageDraw[];
}

interface RequestInitCfPropertiesImageDraw extends BasicImageTransformations {
  /**
   * Absolute URL of the image file to use for the drawing. It can be any of
   * the supported file formats. For drawing of watermarks or non-rectangular
   * overlays we recommend using PNG or WebP images.
   */
  url: string;
  /**
   * Floating-point number between 0 (transparent) and 1 (opaque).
   * For example, opacity: 0.5 makes overlay semitransparent.
   */
  opacity?: number;
  /**
   * - If set to true, the overlay image will be tiled to cover the entire
   *   area. This is useful for stock-photo-like watermarks.
   * - If set to "x", the overlay image will be tiled horizontally only
   *   (form a line).
   * - If set to "y", the overlay image will be tiled vertically only
   *   (form a line).
   */
  repeat?: true | "x" | "y";
  /**
   * Position of the overlay image relative to a given edge. Each property is
   * an offset in pixels. 0 aligns exactly to the edge. For example, left: 10
   * positions left side of the overlay 10 pixels from the left edge of the
   * image it's drawn over. bottom: 0 aligns bottom of the overlay with bottom
   * of the background image.
   *
   * Setting both left & right, or both top & bottom is an error.
   *
   * If no position is specified, the image will be centered.
   */
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface RequestInitCfPropertiesImageMinify {
  javascript?: boolean;
  css?: boolean;
  html?: boolean;
}

interface RequestInitializerDict {
  method?: string;
  headers?: HeadersInitializer;
  body?: BodyInitializer | null;
  redirect?: string;
  fetcher?: Fetcher | null;
  /**
   * cf is a union of these two types because there are multiple
   * scenarios in which it might be one or the other.
   *
   * IncomingRequestCfProperties is required to allow
   *   new Request(someUrl, event.request)
   *
   * RequestInitCfProperties is required to allow
   *   new Request(event.request, {cf: { ... } })
   *   fetch(someUrl, {cf: { ... } })
   */
  cf?: IncomingRequestCfProperties | RequestInitCfProperties;
  signal?: AbortSignal | null;
}

declare class Response extends Body {
  constructor(bodyInit?: BodyInitializer | null, maybeInit?: ResponseInitializerDict | Response);
  static redirect(url: string, status?: number): Response;
  clone(): Response;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly url: string;
  readonly webSocket: WebSocket | null;
  readonly cf?: Object;
}

interface ResponseInitializerDict {
  status?: number;
  statusText?: string;
  headers?: HeadersInitializer;
  cf?: Object;
  webSocket?: WebSocket | null;
  encodeBody?: string;
}

declare abstract class ScheduledController {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}

declare class ScheduledEvent extends Event {
  constructor(type: string);
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
  waitUntil(promise: Promise<void>): void;
}

declare class ServiceWorkerGlobalScope extends WorkerGlobalScope {
  constructor();
  static readonly DOMException: typeof DOMException;
  static readonly WorkerGlobalScope: typeof WorkerGlobalScope;
  btoa(data: string): string;
  atob(data: string): string;
  setTimeout<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: Args): number;
  clearTimeout(timeoutId: number | null): void;
  setInterval<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: Args): number;
  clearInterval(timeoutId: number | null): void;
  queueMicrotask(task: Function): void;
  fetch(request: Request | string, requestInitr?: RequestInitializerDict | Request): Promise<Response>;
  readonly self: ServiceWorkerGlobalScope;
  readonly crypto: Crypto;
  readonly caches: CacheStorage;
  static readonly Event: typeof Event;
  static readonly FetchEvent: typeof FetchEvent;
  static readonly ScheduledEvent: typeof ScheduledEvent;
  static readonly MessageEvent: typeof MessageEvent;
  static readonly CloseEvent: typeof CloseEvent;
  static readonly ReadableStream: typeof ReadableStream;
  static readonly WritableStream: typeof WritableStream;
  static readonly TransformStream: typeof TransformStream;
  static readonly Headers: typeof Headers;
  static readonly Body: typeof Body;
  static readonly Request: typeof Request;
  static readonly Response: typeof Response;
  static readonly WebSocket: typeof WebSocket;
  static readonly WebSocketPair: typeof WebSocketPair;
  static readonly AbortController: typeof AbortController;
  static readonly AbortSignal: typeof AbortSignal;
  static readonly TextDecoder: typeof TextDecoder;
  static readonly TextEncoder: typeof TextEncoder;
  static readonly URL: typeof URL;
  static readonly URLSearchParams: typeof URLSearchParams;
  static readonly Blob: typeof Blob;
  static readonly File: typeof File;
  static readonly FormData: typeof FormData;
  static readonly Crypto: typeof Crypto;
  static readonly SubtleCrypto: typeof SubtleCrypto;
  static readonly CryptoKey: typeof CryptoKey;
  static readonly CacheStorage: typeof CacheStorage;
  static readonly Cache: typeof Cache;
  static readonly FixedLengthStream: typeof FixedLengthStream;
  static readonly HTMLRewriter: typeof HTMLRewriter;
  readonly console: Console;
}

interface StreamQueuingStrategy {
  highWaterMark: number;
  size(arg1: any): number;
}

declare abstract class SubtleCrypto {
  encrypt(algorithm: string | SubtleCryptoEncryptAlgorithm, key: CryptoKey, plainText: ArrayBuffer): Promise<ArrayBuffer>;
  decrypt(algorithm: string | SubtleCryptoEncryptAlgorithm, key: CryptoKey, cipherText: ArrayBuffer): Promise<ArrayBuffer>;
  sign(algorithm: string | SubtleCryptoSignAlgorithm, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
  verify(algorithm: string | SubtleCryptoSignAlgorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean>;
  digest(algorithm: string | SubtleCryptoHashAlgorithm, data: ArrayBuffer): Promise<ArrayBuffer>;
  generateKey(algorithm: string | SubtleCryptoGenerateKeyAlgorithm, extractable: boolean, keyUsages: string[]): Promise<CryptoKey | CryptoKeyPair>;
  deriveKey(algorithm: string | SubtleCryptoDeriveKeyAlgorithm, baseKey: CryptoKey, derivedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
  deriveBits(algorithm: string | SubtleCryptoDeriveKeyAlgorithm, baseKey: CryptoKey, length: number | null): Promise<ArrayBuffer>;
  importKey(format: string, keyData: ArrayBuffer | SubtleCryptoJsonWebKey, algorithm: string | SubtleCryptoImportKeyAlgorithm, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | SubtleCryptoJsonWebKey>;
  wrapKey(format: string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: string | SubtleCryptoEncryptAlgorithm): Promise<ArrayBuffer>;
  unwrapKey(format: string, wrappedKey: ArrayBuffer, unwrappingKey: CryptoKey, unwrapAlgorithm: string | SubtleCryptoEncryptAlgorithm, unwrappedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
}

interface SubtleCryptoDeriveKeyAlgorithm {
  name: string;
  salt?: ArrayBuffer;
  iterations?: number;
  hash?: string | SubtleCryptoHashAlgorithm;
  public?: CryptoKey;
  info?: ArrayBuffer;
}

interface SubtleCryptoEncryptAlgorithm {
  name: string;
  iv?: ArrayBuffer;
  additionalData?: ArrayBuffer;
  tagLength?: number;
  counter?: ArrayBuffer;
  length?: number;
  label?: ArrayBuffer;
}

interface SubtleCryptoGenerateKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  modulusLength?: number;
  publicExponent?: ArrayBuffer;
  length?: number;
  namedCurve?: string;
}

interface SubtleCryptoHashAlgorithm {
  name: string;
}

interface SubtleCryptoImportKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  length?: number;
  namedCurve?: string;
  compressed?: boolean;
}

interface SubtleCryptoJsonWebKey {
  kty: string;
  use?: string;
  key_ops?: string[];
  alg?: string;
  ext?: boolean;
  crv?: string;
  x?: string;
  y?: string;
  d?: string;
  n?: string;
  e?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
  oth?: SubtleCryptoJsonWebKeyRsaOtherPrimesInfo[];
  k?: string;
}

interface SubtleCryptoJsonWebKeyRsaOtherPrimesInfo {
  r?: string;
  d?: string;
  t?: string;
}

interface SubtleCryptoSignAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  dataLength?: number;
  saltLength?: number;
}

declare abstract class Text {
  readonly text: string;
  readonly lastInTextNode: boolean;
  readonly removed: boolean;
  before(content: Content, options?: ContentOptions): Text;
  after(content: Content, options?: ContentOptions): Text;
  replace(content: Content, options?: ContentOptions): Text;
  remove(): Text;
}

declare class TextDecoder {
  constructor(label?: "utf-8" | "utf8" | "unicode-1-1-utf-8", options?: TextDecoderConstructorOptions);
  decode(input?: ArrayBuffer, options?: TextDecoderDecodeOptions): string;
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;
}

interface TextDecoderConstructorOptions {
  fatal: boolean;
  ignoreBOM: boolean;
}

interface TextDecoderDecodeOptions {
  stream: boolean;
}

declare class TextEncoder {
  constructor();
  encode(input?: string): Uint8Array;
  encodeInto(input: string, buffer: Uint8Array): TextEncoderEncodeIntoResult;
  readonly encoding: string;
}

interface TextEncoderEncodeIntoResult {
  read: number;
  written: number;
}

declare class TransformStream {
  constructor();
  readonly readable: ReadableStream;
  readonly writable: WritableStream;
}

declare class URL {
  constructor(url: string, base?: string);
  href: string;
  readonly origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  readonly searchParams: URLSearchParams;
  hash: string;
  toString(): string;
  toJSON(): string;
}

declare class URLSearchParams {
  constructor(init?: URLSearchParamsInitializer);
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  entries(): IterableIterator<[key: string, value: string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  forEach<This = unknown>(callback: (this: This, key: string, value: string, parent: URLSearchParams) => void, thisArg?: This): void;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
  toString(): string;
}

declare type URLSearchParamsInitializer = URLSearchParams | string | Record<string, string> | ([key: string, value: string])[];

declare abstract class WebSocket extends EventTarget<WebSocketEventMap> {
  accept(): void;
  send(message: ArrayBuffer | string): void;
  close(code?: number, reason?: string): void;
}

declare type WebSocketEventMap = { close: CloseEvent; message: MessageEvent; };

declare const WebSocketPair: { new(): { 0: WebSocket; 1: WebSocket; }; };

declare class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {
  constructor();
  static readonly EventTarget: typeof EventTarget;
}

declare type WorkerGlobalScopeEventMap = { fetch: FetchEvent; scheduled: ScheduledEvent; };

declare abstract class WritableStream {
  readonly locked: boolean;
  abort(reason: any): Promise<void>;
  getWriter(): WritableStreamWriter;
}

declare abstract class WritableStreamWriter {
  readonly closed: Promise<void>;
  readonly desiredSize: number | null;
  abort(reason: any): Promise<void>;
  close(): Promise<void>;
  write(chunk: any): Promise<void>;
  releaseLock(): void;
}

declare function addEventListener<Type extends keyof WorkerGlobalScopeEventMap>(type: Type, handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>, options?: EventTargetAddEventListenerOptions | boolean): void;

declare function atob(data: string): string;

declare function btoa(data: string): string;

declare const caches: CacheStorage;

declare function clearInterval(timeoutId: number | null): void;

declare function clearTimeout(timeoutId: number | null): void;

declare const console: Console;

declare const crypto: Crypto;

declare function dispatchEvent(event: WorkerGlobalScopeEventMap[keyof WorkerGlobalScopeEventMap]): boolean;

declare function fetch(request: Request | string, requestInitr?: RequestInitializerDict | Request): Promise<Response>;

declare function queueMicrotask(task: Function): void;

declare function removeEventListener<Type extends keyof WorkerGlobalScopeEventMap>(type: Type, handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>, options?: EventTargetEventListenerOptions | boolean): void;

declare const self: ServiceWorkerGlobalScope;

declare function setInterval<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: Args): number;

declare function setTimeout<Args extends any[]>(callback: (...args: Args) => void, msDelay?: number, ...args: Args): number;
