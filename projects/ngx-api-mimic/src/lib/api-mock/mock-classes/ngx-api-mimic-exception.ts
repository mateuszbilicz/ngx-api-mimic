/** Custom exception class for NgxApiMimic framework */
export class NgxApiMimicException extends Error {
  constructor(
    public status: number,
    public override message: string,
    public errorData: any = null,
  ) {
    super(message);
    this.name = 'NgxApiMimicException';
    Object.setPrototypeOf(this, NgxApiMimicException.prototype);
  }
}
