import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { from, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NgxApiMimicRouter } from './mock-classes/api-mock-router';
import { NgxApiMimicException } from './mock-classes/ngx-api-mimic-exception';
import { NgxApiMimicInterceptorOptions } from '../api/api-mock';

/** Creates ngxApiMockInterceptor that handles async router methods and custom exceptions */
export const ngxApiMockInterceptorFactory = (
  router: NgxApiMimicRouter,
  options: NgxApiMimicInterceptorOptions = {},
): HttpInterceptorFn => {
  const { minDelay = 100, maxDelay = 800, enableLog = true } = options;
  return (req, next) => {
    const startTime = Date.now();
    const url = req.urlWithParams.replace(/^https?:\/\/[^\/]+/, '');
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const prefix = router.getPrefix();

    if (prefix && !cleanUrl.startsWith(prefix)) {
      return next(req);
    }

    const methodLookup = router.getMethod(req.method as any, req.urlWithParams);
    if (!methodLookup) {
      return next(req);
    }

    const delay = Math.round(minDelay + Math.random() * (maxDelay - minDelay));

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
        if (res === undefined) {
          throw new Error('NOT_MY_PREFIX');
        }

        if (enableLog) {
          const duration = Date.now() - startTime;
          console.log(
            `%c🚀 [NgxApiMimic] %c${req.method} %c${url} %c200 OK %c(${duration}ms)`,
            'color: #6366f1; font-weight: bold;',
            'color: #fbbf24; font-weight: bold;',
            'color: #9ca3af;',
            'color: #22c55e; font-weight: bold;',
            'color: #6b7280; font-style: italic;',
          );
        }

        return new HttpResponse({ status: 200, body: res });
      }),
      catchError((err) => {
        if (err.message === 'NOT_MY_PREFIX') {
          return next(req);
        }
        let status = 500;
        let statusText = 'Internal Server Error';
        let errorBody: any = { message: 'An unexpected error occurred' };

        if (err instanceof NgxApiMimicException) {
          status = err.status;
          statusText = err.message;
          errorBody = err.errorData || { message: err.message };
        } else if (err instanceof Error) {
          errorBody = { message: err.message };
        } else {
          errorBody = { message: String(err) };
        }

        if (enableLog) {
          const duration = Date.now() - startTime;
          console.log(
            `%c❌ [NgxApiMimic] %c${req.method} %c${url} %c${status} ${errorBody.message || errorBody} %c(${duration}ms)`,
            'color: #ef4444; font-weight: bold;',
            'color: #fbbf24; font-weight: bold;',
            'color: #9ca3af;',
            'color: #ef4444; font-weight: bold;',
            'color: #6b7280; font-style: italic;',
          );
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
