import type { IRequest } from './IRequest';

export interface IRequestHandler<
    TRequest extends IRequest<TResponse>,
    TResponse,
> {
    handle(request: TRequest, object: any): Promise<TResponse>;
}
