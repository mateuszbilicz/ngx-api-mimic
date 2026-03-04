import { ArgumentMetadata, PipeTransform } from '../api/api-mock';
import { NgxApiMimicException } from './mock-classes/ngx-api-mimic-exception';

/** Converts string to integer */
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new NgxApiMimicException(
        400,
        `Validation failed (numeric string is expected) for property: ${metadata.data}`,
      );
    }
    return val;
  }
}

/** Validates UUID string */
export class ParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new NgxApiMimicException(
        400,
        `Validation failed (uuid is expected) for property: ${metadata.data}`,
      );
    }
    return value;
  }
}

/** Provides fallback value if the original is null/undefined */
export class DefaultValuePipe implements PipeTransform {
  constructor(private defaultValue: any) {}
  transform(value: any): any {
    return value !== undefined && value !== null ? value : this.defaultValue;
  }
}

/** Converts string to float */
export class ParseFloatPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new NgxApiMimicException(
        400,
        `Validation failed (numeric string is expected) for property: ${metadata.data}`,
      );
    }
    return val;
  }
}

/** Converts string ('true', '1', 'false', '0') to boolean */
export class ParseBoolPipe implements PipeTransform<string | boolean, boolean> {
  transform(value: string | boolean, metadata: ArgumentMetadata): boolean {
    if (typeof value === 'boolean') return value;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;

    throw new NgxApiMimicException(
      400,
      `Validation failed (boolean string is expected) for property: ${metadata.data}`,
    );
  }
}

/** Converts string to Date object */
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new NgxApiMimicException(
        400,
        `Validation failed (date string is expected) for property: ${metadata.data}`,
      );
    }
    return date;
  }
}

/** Validates value against a provided Enum */
export class ParseEnumPipe implements PipeTransform {
  constructor(private readonly entity: object) {}
  transform(value: any, metadata: ArgumentMetadata): any {
    const enumValues = Object.values(this.entity);
    if (!enumValues.includes(value)) {
      throw new NgxApiMimicException(
        400,
        `Validation failed (value must be one of: ${enumValues.join(', ')}) for property: ${metadata.data}`,
      );
    }
    return value;
  }
}

/** Converts comma-separated string to array */
export class ParseArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');

    throw new NgxApiMimicException(
      400,
      `Validation failed (array or comma-separated string is expected) for property: ${metadata.data}`,
    );
  }
}

/** Validates if the value is a File/Blob (useful for Post/Put requests) */
export class ParseFilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): File | Blob {
    if (value instanceof File || value instanceof Blob) return value;

    throw new NgxApiMimicException(
      400,
      `Validation failed (File or Blob is expected) for property: ${metadata.data}`,
    );
  }
}
