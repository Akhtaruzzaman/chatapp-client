export class MessageVM {

    constructor(
        public createdAt: string,
        public fromId: string,
        public id: string,
        public incomming: boolean,
        public message: string,
        public seenStatus: number,
        public toId: string,
    ) { }

}