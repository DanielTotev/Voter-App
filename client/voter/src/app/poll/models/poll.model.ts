export class PollModel {
    constructor (public title: string, public _id: string,
                 public category: string, public options: Object[]) { }
}