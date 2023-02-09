export default interface SalesDataInterface {
    date?: string,
    brand: string,
    transactionType: string,
    totalOrders: number,
    totalOrderValue: number,
    grossMarginPercentage: number,
    createdAt?: string,
    updatedAt?: string
  }