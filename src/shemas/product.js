import { z } from 'zod'

const ProductSchema = z.object( {
  title: z.string( {
    invalid_type_error: 'Product title must be a string',
    required_error: 'Product title is required.'
  } ).min( 3, { message: 'Product title must be at least 3 characters long' } ).trim(),
  description: z.string( {
    invalid_type_error: 'Product description must be a string',
    required_error: 'Product description is required.'
  } ).min( 10, { message: 'Product description must be at least 10 characters long' } ).trim(),
  code: z.string( {
    invalid_type_error: 'Product code must be a string',
    required_error: 'Product code is required.'
  } ).min( 3, { message: 'Product code must be at least 3 characters long' } ).trim(),
  price: z.number( {
    invalid_type_error: 'Product price must be a number',
    required_error: 'Product price is required.'
  } ).min( 0, { message: 'Product price must be greater than 0' } ),
  status: z.boolean( {
    invalid_type_error: 'Product status must be a boolean',
    required_error: 'Product status is required.'
  } ),
  stock: z.number( {
    invalid_type_error: 'Product stock must be a number',
    required_error: 'Product stock is required.'
  } ).min( 0, { message: 'Product stock must be greater than 0' } ),
  category: z.string( {
    invalid_type_error: 'Product category must be a string',
    required_error: 'Product category is required.'
  } ).min( 3, { message: 'Product category must be at least 3 characters long' } ).trim(),
  thumbnails: z.array( z.string( {
    invalid_type_error: 'Product thumbnails must be a string',
    required_error: 'Product thumbnails is required.'
  } ) ).min( 1, { message: 'Product thumbnails must have at least one image' } )
} )

export function validateProduct( input ) {
  return ProductSchema.safeParse( input )
}

export function validateProductUpdate( input ) {
  return ProductSchema.partial().safeParse( input )
}