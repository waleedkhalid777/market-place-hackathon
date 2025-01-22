import { type SchemaTypeDefinition } from 'sanity';
import { product } from '../schemaTypes/product'; // Use named import

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
};
