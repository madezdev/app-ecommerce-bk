import Product from '../shemas/product.schema.js'

export class ProductModel {
  static async getAllProducts ({ category = null, limit = 10, page = 1, sort = null, query = null } = {}) {
    // Construir el filtro
    const filter = {}

    if (category) {
      filter.category = category
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } }, // Búsqueda por título
        { description: { $regex: query, $options: 'i' } } // Búsqueda por descripción
      ]
    }

    // Consultar los productos en la base de datos con Mongoose
    const totalProducts = await Product.countDocuments(filter)

    // Paginar y obtener los productos
    const products = await Product.find(filter)
      .skip((page - 1) * limit) // Calcular el salto para la paginación
      .limit(limit) // Limitar los resultados
      .sort({ price: sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0 }) // Ordenar por precio

    // Calcular la cantidad total de páginas
    const totalPages = Math.ceil(totalProducts / limit)

    // Configuración de la respuesta
    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null
    }

    return response
  }

  static async getProductById (id) {
    const product = await Product.findById(id) // Buscar producto por ID
    if (!product) return { error: 'Product not found', data: null }
    return { message: 'Product found', data: product }
  }

  static async createProduct (input) {
    const existingProduct = await Product.findOne({ $or: [{ title: input.title }, { code: input.code }] })
    if (existingProduct) return { error: 'Product already exists', data: null }

    const newProduct = new Product({ ...input, dateCreated: new Date().toISOString() })
    await newProduct.save()

    return { message: 'Product created successfully', data: newProduct }
  }

  static async updateProduct (id, product) {
    const updatedProduct = await Product.findByIdAndUpdate(id, { ...product, dateUpdate: new Date().toISOString() }, { new: true })
    if (!updatedProduct) return { error: 'Product not found', data: null }
    return { message: 'Product updated', data: updatedProduct }
  }

  static async deleteProduct (id) {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) return { error: 'Product not found', data: null }
    return { message: 'Product deleted', data: null }
  }
}
