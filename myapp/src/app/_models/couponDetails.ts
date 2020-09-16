export interface CouponDetails {
    id?: number;
    couponValue: string;
    discountPercent: number;
    isDeleted?: boolean;
    dateCreated?: Date;
}