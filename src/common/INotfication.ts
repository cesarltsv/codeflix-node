export interface INotification {}

export interface INotificationHandler<TNotification extends INotification> {
    handle(notification: TNotification): Promise<void>;
}
