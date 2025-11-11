import { Ticker } from "./types";

export const BASE_URL = "wss://ws.backpack.exchange"
// export const BASE_URL = "ws://localhost:3001"

export class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: any[] = [];
  private callbacks: any = {};
  private id: number;
  private initialized: boolean = false;

  private constructor() {
    this.ws = new WebSocket(BASE_URL);
    this.bufferedMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SignalingManager();
    }
    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach(message => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    }
    this.ws.onmessage = (event) => {
      console.log("RAW WS:", event.data);
      const message = JSON.parse(event.data);

      const type =
        message.data?.e ||
        message.channel?.split(".")[0] ||
        message.type;

      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }: any) => {
          if (type === "ticker") {
            const newTicker: Partial<Ticker> = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };
            callback(newTicker);
          }

          if (type === "depth") {
            const updatedBids = message.data?.b || message.data?.bids || [];
            const updatedAsks = message.data?.a || message.data?.asks || [];
            console.log("Depth update:", updatedBids.length, "bids |", updatedAsks.length, "asks");
            callback({ bids: updatedBids, asks: updatedAsks });
          }
        });
      }
    };

  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++
    }
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback(type: string, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  deRegisterCallback(type: string, id: string) {
    if (!this.callbacks[type]) return;

    this.callbacks[type] = this.callbacks[type].filter((e: { id: string }) => e.id !== id);
  }

}