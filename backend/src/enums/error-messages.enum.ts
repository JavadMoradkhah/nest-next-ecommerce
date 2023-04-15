const enum ErrorMessages {
  // Category
  CATEGORY_NOT_FOUND = 'The category was not found with the given id',
  PARENT_CATEGORY_NOT_FOUND = 'The parent category was not found with the given id',
  CATEGORY_ALREADY_EXISTS = 'The category already exists with the given slug',
  // Color
  COLOR_NOT_FOUND = 'The color was not found with the given id',
  COLOR_ALREADY_EXISTS = 'A color already exists with the given name or code',
}

export default ErrorMessages;
