export class CreateProductDTO {
  readonly description: string;
  readonly image: string;
  readonly name: string;
  readonly price: number;
  readonly stock: number;
}

export class UpdateProductDTO {
  readonly description?: string;
  readonly image?: string;
  readonly name?: string;
  readonly price?: number;
  readonly stock?: number;
}
