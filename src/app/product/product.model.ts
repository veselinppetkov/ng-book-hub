export class Product {
    public author: string;
    public book_id: number;
    public category: string;
    public cover: string;
    public description: string;
    public pages: number;
    public price: number;
    public publishedDate: string
    public rating: number
    public title: string
    public url: string

    constructor(author: string, book_id: number, category: string, cover: string, description: string, pages: number, price: number, publishedDate: string, rating: number, title: string, url: string) {

        this.author = author;
        this.book_id = book_id;
        this.category = category;
        this.cover = cover;
        this.description = description;
        this.pages = pages;
        this.price = price;
        this.publishedDate = publishedDate;
        this.rating = rating;
        this.title = title;
        this.url = url;
    }
}

