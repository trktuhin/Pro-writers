export interface ContactDetails {
    id?: number;
    name: string;
    messageDetails: string;
    email: string;
    isDeleted?: boolean;
    messageDate?: Date;
}