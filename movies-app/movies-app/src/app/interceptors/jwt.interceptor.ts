
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Subject, filter, finalize, tap } from 'rxjs';
import { inject } from '@angular/core';
import { UiService } from '../services/ui.service';

const requests: {
    src: string;
    data$: Subject<HttpResponse<any>>;
    params?: any;
}[] = [];

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    var ui = inject(UiService);
    const prevSameRequest = () => {
        return requests.find(
            (x) =>
                x.src === req.url &&
                JSON.stringify(x.params) === JSON.stringify(req.body)
        );
    };

    const sameRequest = prevSameRequest();

    if (sameRequest) {
        if (!sameRequest.data$.closed) return sameRequest.data$;
        sameRequest.data$ = new Subject<any>();
    } else {
        ui.enableLoader();
        requests.push({
            src: req.url,
            data$: new Subject<HttpResponse<any>>(),
            params: req.body,
        });
    }

    return next(req).pipe(
        filter((x) => x instanceof HttpResponse),
        tap((x) => {
            const r = prevSameRequest();
            !r?.data$.closed && r?.data$.next(x as HttpResponse<any>);
        }),
        finalize(() => {
            ui.disableLoader();
            const r = prevSameRequest();
            r?.data$.complete();
            r?.data$.unsubscribe();
        })
    );
};
