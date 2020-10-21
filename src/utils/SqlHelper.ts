import {Op, literal, Sequelize} from 'sequelize';

export const attributesProducts = [
  [
    Sequelize.fn(
      'CONCAT',
      // eslint-disable-next-line no-process-env
      `${process.env.BASEURL}`,
      Sequelize.col('image')
    ),
    'slug'
  ],
  'id',
  'name',
  'description',
  'sku',
  'deliveryEstimated',
  'recommended'
];

export const attributesBrand = [
  [
    Sequelize.fn(
      'CONCAT',
      // eslint-disable-next-line no-process-env
      `${process.env.BASEURL}`,
      Sequelize.col('banner')
    ),
    'banner'
  ],
  [
    Sequelize.fn(
      'CONCAT',
      // eslint-disable-next-line no-process-env
      `${process.env.BASEURL}`,
      Sequelize.col('image')
    ),
    'image'
  ],
  'id',
  'brand',
  'estimatedTime'
];
