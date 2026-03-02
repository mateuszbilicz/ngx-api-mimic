import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {of, switchMap, timer} from 'rxjs';
import { NgxApiMimicRouter } from './mock-classes/api-mock-router';

/** Creates ngxApiMockInterceptor that handles all HTTP requests */
export const ngxApiMockInterceptorFactory = (
  router: NgxApiMimicRouter,
  minResponseTime = 100,
  maxResponseTime = 1000
): HttpInterceptorFn => {
  return (req, next) => {
    try {
      let res = router.execMethod(
        req.method as any,
        req.urlWithParams,
        (
          req.method === 'POST'
          || req.method === 'PUT'
        ) ? req.body : undefined,
        req.headers
      );
      return timer(
        Math.round(minResponseTime + Math.random() * (maxResponseTime - minResponseTime)),
      )
        .pipe(
          switchMap(
            () => of(
              new HttpResponse({
                status: 200,
                body: res
              })
            )
          )
        );
    } catch (err) {
      return timer(
        Math.round(minResponseTime + Math.random() * (maxResponseTime - minResponseTime)),
      ).pipe(
        switchMap(() =>
          of(
            new HttpResponse({
              status: 500,
              statusText: 'Server error',
            }),
          ),
        ),
      );
    }
  };
};
