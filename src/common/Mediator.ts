import type { INotification, INotificationHandler } from './INotfication';
import type { IRequest } from './IRequest';
import type { IRequestHandler } from './IRequestHandler';

export class Mediator {
    private handlers = new Map<string, any>();
    private notificationHandlers = new Map<string, any[]>();

    register<TRequest extends IRequest<TResponse>, TResponse>(
        requestName: string,
        handler: IRequestHandler<TRequest, TResponse>
    ) {
        this.handlers.set(requestName, handler);
    }

    registerNotification<TNotification extends INotification>(
        name: string,
        handler: INotificationHandler<TNotification>
    ) {
        if (!this.notificationHandlers.has(name)) {
            this.notificationHandlers.set(name, []);
        }
        this.notificationHandlers.get(name)!.push(handler);
    }

    async send<TRequest extends IRequest<TResponse>, TResponse>(
        request: TRequest
    ): Promise<TResponse> {
        const handler = this.handlers.get(request.constructor.name);
        if (!handler) throw new Error('Handler não encontrado');
        return await handler.handle(request);
    }

    async publish<TNotification extends INotification>(
        notification: TNotification
    ): Promise<void> {
        const handlers =
            this.notificationHandlers.get(notification.constructor.name) || [];
        for (const handler of handlers) {
            await handler.handle(notification);
        }
    }
}
