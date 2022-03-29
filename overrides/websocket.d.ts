declare class MessageEvent extends Event {
  readonly data: ArrayBuffer | string;
}

interface MessageEventInit {
  data: ArrayBuffer | string;
}

declare type WebSocketEventMap = {
  close: CloseEvent;
  message: MessageEvent;
  open: Event;
  error: ErrorEvent;
};

declare class WebSocket extends EventTarget<WebSocketEventMap> {}

declare const WebSocketPair: {
  new (): {
    0: WebSocket;
    1: WebSocket;
  };
};

export {};
