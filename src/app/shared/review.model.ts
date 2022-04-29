export class Review {
    public rating: number;
    public bookId: number;
    public helpful: number;
    public unhelpful: number;
    public reviewTitle: string;
    public reviewText: string;
    public userId: string;
    public date: string;

    constructor(rating: number, bookId: number, reviewTitle: string, reviewText: string, userId: string, date: string, helpful: number, unhelpful: number) {

        this.rating = rating;
        this.bookId = bookId;
        this.reviewTitle = reviewTitle;
        this.reviewText = reviewText;
        this.userId = userId;
        this.date = date;
        this.helpful = helpful;
        this.unhelpful = unhelpful;
    }
}

