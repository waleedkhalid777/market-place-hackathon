export default {
    // Define the document type and its name
    name: 'furnitureProduct',
    type: 'document',
    title: 'Furniture Product', // The title displayed in the CMS for this document
    fields: [
      {
        // Field for the furniture product's name
        name: 'name',
        type: 'string',
        title: 'Furniture Name',
        validation: (Rule) =>
          Rule.required()
            .max(100)
            .error('Furniture name is required and cannot exceed 100 characters.'),
      },
      {
        // Slug field for generating a URL-friendly identifier
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'URL-friendly identifier for the furniture product.',
        options: {
          source: 'name',
          maxLength: 200,
        },
        validation: (Rule) =>
          Rule.required().error('Slug is required for product identification.'),
      },
      {
        // Detailed description of the furniture product
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'Detailed description of the furniture product.',
        validation: (Rule) =>
          Rule.required()
            .min(20)
            .max(1000)
            .error('Description must be between 20 and 1000 characters.'),
      },
      {
        // Field for rental price
        name: 'rentalPrice',
        type: 'number',
        title: 'Rental Price',
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .error('Rental price must be a positive value.'),
      },
      {
        // Field for deposit amount
        name: 'depositAmount',
        type: 'number',
        title: 'Deposit Amount',
        description: 'Security deposit for renting the product.',
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .error('Deposit amount must be a positive value.'),
      },
      {
        // Field for furniture dimensions
        name: 'dimensions',
        type: 'string',
        title: 'Dimensions',
        description: 'Dimensions of the furniture (e.g., Width x Height x Depth).',
      },
      {
        // Array field for materials used in the product
        name: 'materials',
        type: 'array',
        title: 'Materials',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Materials used in the furniture (e.g., wood, metal, fabric).',
      },
      {
        // Field for the furniture product's category
        name: 'category',
        type: 'reference',
        to: [{ type: 'category' }],
        title: 'Category',
        description: 'Category of the furniture product (e.g., sofa, table).',
      },
      {
        // Array field for tags
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Tags such as "new arrival", "bestseller", or "on sale".',
      },
      {
        // Field for furniture availability
        name: 'availability',
        type: 'boolean',
        title: 'Availability',
        description: 'Indicates whether the furniture is available for rent.',
      },
      {
        // Field for furniture product images
        name: 'images',
        type: 'array',
        title: 'Product Images',
        of: [{ type: 'image', options: { hotspot: true } }],
        description: 'Images of the furniture product.',
        validation: (Rule) =>
          Rule.required().error('At least one product image is required.'),
      },
      {
        // SEO-friendly title
        name: 'seoTitle',
        type: 'string',
        title: 'SEO Title',
        description: 'SEO title for the furniture product (max 60 characters).',
        validation: (Rule) =>
          Rule.max(60).error('SEO title cannot exceed 60 characters.'),
      },
      {
        // SEO-friendly description
        name: 'seoDescription',
        type: 'text',
        title: 'SEO Description',
        description: 'Meta description for SEO (max 160 characters).',
        validation: (Rule) =>
          Rule.max(160).error('SEO description cannot exceed 160 characters.'),
      },
      {
        // Field for furniture rental duration options
        name: 'rentalDurationOptions',
        type: 'array',
        title: 'Rental Duration Options',
        of: [{ type: 'number' }],
        description: 'Available rental duration options (e.g., 7, 14, 30 days).',
      },
      {
        // Field for the furniture product's rating
        name: 'rating',
        type: 'number',
        title: 'Rating',
        description: 'Average rating of the product.',
        validation: (Rule) =>
          Rule.min(0)
            .max(5)
            .precision(1)
            .error('Rating must be between 0 and 5.'),
      },
      {
        // Field for rating count
        name: 'ratingCount',
        type: 'number',
        title: 'Rating Count',
        description: 'Number of ratings received by the product.',
        validation: (Rule) =>
          Rule.min(0).error('Rating count must be a non-negative number.'),
      },
    ],
  };
  