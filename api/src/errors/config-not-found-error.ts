export class ConfigNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigNotFoundError";
    Object.setPrototypeOf(this, ConfigNotFoundError.prototype);
  }
}

