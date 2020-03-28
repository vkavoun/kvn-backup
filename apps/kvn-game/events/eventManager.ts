export default class EventManager {
  private static instance: EventManager;
  private registeredEvents: Map<string, Array<Function>>;

  private constructor() {
    this.registeredEvents = new Map();
  }

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }

    return EventManager.instance;
  }

  public addEventListener(eventName: string, callback: Function) {
    if (this.registeredEvents.has(eventName)) {
      this.registeredEvents.get(eventName).push(callback);
    } else {
      this.registeredEvents.set(eventName, [callback]);
    }
  }

  public dispatch(eventName: string) {
    if (this.registeredEvents.has(eventName)) {
      const callbacks = this.registeredEvents.get(eventName);

      console.log(`dispatching ${eventName}`);
      callbacks.forEach(cb => cb());
    } else {
      throw new Error('No event found');
    }
  }
}
