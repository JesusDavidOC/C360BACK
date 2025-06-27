export class TechnicianNotAvailableException extends Error {
  constructor(date: Date) {
    super(`Technicians not available at: ${date.toISOString()}`);
  }
}
