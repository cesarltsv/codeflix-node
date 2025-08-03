export interface IUnitOfWork {
    commit(cancelationToken: AbortController): void;
}
