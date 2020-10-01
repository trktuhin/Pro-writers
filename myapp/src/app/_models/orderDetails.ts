export interface OrderDetails {
    id?: number;
    bookTitle: string;
    subTitle: string;
    authorName: string;
    projectDescription: string;
    noOfWord: number;
    clientName: string;
    clientEmail: string;
    customizedCopyrightPage: boolean;
    professionalBookDescription: boolean;
    plagiarismReport: boolean;
    wordFormatting: boolean;
    totalDiscount?: number;
    isCompleted?: boolean;
    isDeleted?: boolean;
    isPaymentReceived?: boolean;
    orderDate?: Date;
    filePath?: string;
    docFile?: Blob;
}