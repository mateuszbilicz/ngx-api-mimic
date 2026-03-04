import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError, timer, from } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { NgxApiMimicRouter } from './mock-classes/api-mock-router';
import { NgxApiMimicException } from './mock-classes/ngx-api-mimic-exception';

/** Creates ngxApiMockInterceptor that handles async router methods and custom exceptions */
export const ngxApiMockInterceptorFactory = (
  router: NgxApiMimicRouter,
  minResponseTime = 100,
  maxResponseTime = 1000,
): HttpInterceptorFn => {
  return (req, next) => {
    const delay = Math.round(minResponseTime + Math.random() * (maxResponseTime - minResponseTime));

    return timer(delay).pipe(
      switchMap(() =>
        from(
          router.execMethod(
            req.method as any,
            req.urlWithParams,
            req.method === 'POST' || req.method === 'PUT' ? req.body : undefined,
            req.headers,
          ),
        ),
      ),
      map((res) => {
        return new HttpResponse({ status: 200, body: res });
      }),
      catchError((err) => {
        let status = 500;
        let statusText = 'Internal Server Error';
        let errorBody: any = { message: 'An unexpected error occurred' };

        if (err instanceof NgxApiMimicException) {
          status = err.status;
          statusText = err.message;
          errorBody = err.errorData || { message: err.message };
        } else if (err instanceof Error) {
          errorBody = { message: err.message };
        }

        return throwError(
          () =>
            new HttpErrorResponse({
              error: errorBody,
              status: status,
              statusText: statusText,
              url: req.urlWithParams,
            }),
        );
      }),
    );
  };
};
