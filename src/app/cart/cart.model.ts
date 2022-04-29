export class Cart {
    public book_id: number;
    public cover: string;
    public price: number;
    public title: string
    public userId: string

    constructor(book_id: number, cover: string, price: number, title: string, userId: string) {
        this.book_id = book_id;
        this.cover = cover;
        this.price = price;
        this.title = title;
        this.userId = userId;
    }
}

