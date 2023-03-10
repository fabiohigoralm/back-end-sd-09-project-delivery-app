const { sale, salesProduct, product, user } = require('../../database/models');

const newOrder = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status,
}) => {
  const result = await sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  });
  return result;
};

const populateSaleProd = async (saleId, products) => {
  const newSaleProd = await salesProduct.bulkCreate(
    products.map((item) => ({ saleId, productId: item.id, quantity: item.quantity })),
  );
  return newSaleProd;
};

const findOrderById = async (id) => {
  const findIdOrder = await sale.findOne({
    where: { id },
    include: {
      model: product,
      as: 'products',
      through: {
        attributes: { include: ['quantity'] },
      },
    },
  });
  return findIdOrder;
};

const findSellerById = async (id) => {
  const seller = await user.findOne({ where: { id } });
  return seller;
};
const changeStatusDelivery = async (id) => {
  const status = 'Entregue';
  await sale.update({ status }, { where: { id } });
  const order = await sale.findOne({ where: { id } }); 
  return order;
};

module.exports = { newOrder, 
  populateSaleProd, 
  findOrderById, 
  findSellerById,
  changeStatusDelivery };
