export class EventBus {
    eventMap: {
        [prop: string]: Array<Function>;
    } = {};

    on(type, handler) { }
    emit(type, payload?) { }
}
