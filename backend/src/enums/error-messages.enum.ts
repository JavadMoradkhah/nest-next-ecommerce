const enum ErrorMessages {
  // Category
  CATEGORY_NOT_FOUND = 'The category was not found with the given id',
  PARENT_CATEGORY_NOT_FOUND = 'The parent category was not found with the given id',
  CATEGORY_ALREADY_EXISTS = 'The category already exists with the given slug',
  // Color
  COLOR_NOT_FOUND = 'The color was not found with the given id',
  COLOR_ALREADY_EXISTS = 'A color already exists with the given name or code',
  // Size
  SIZE_NOT_FOUND = 'The size was not found with the given id',
  SIZE_ALREADY_EXISTS = 'A size already exists with the given value',
  // Country
  COUNTRY_NOT_FOUND = 'The country was not found with the given id',
  COUNTRY_ALREADY_EXISTS = 'A country already exists with the given name',
  // Product
  PRODUCT_NOT_FOUND = 'The product was not found with the given id',
}

export default ErrorMessages;
