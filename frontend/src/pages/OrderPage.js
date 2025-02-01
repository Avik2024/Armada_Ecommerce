import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include',
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log('order list', responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto py-6">
      {/* No Order available */}
      {!data[0] && (
        <p className="text-center text-xl font-semibold text-gray-500">No Orders Available</p>
      )}

      <div className="space-y-6">
        {data.map((item, index) => {
          return (
            <div
              key={item.userId + index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <p className="text-xl font-semibold text-gray-700 mb-4">{moment(item.createdAt).format('LL')}</p>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  {item?.productDetails.map((product, index) => {
                    return (
                      <div key={product.productId + index} className="flex gap-6 items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-300">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                        />
                        <div>
                          <div className="text-lg font-medium text-gray-800">{product.name}</div>
                          <div className="flex items-center gap-5 mt-2 text-sm text-gray-600">
                            <div className="text-lg font-semibold text-red-500">
                              {displayINRCurrency(product.price)}
                            </div>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Payment & Shipping Details */}
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-800">Payment Details</div>
                    <p className="ml-1 text-gray-600">Payment Method: {item.paymentDetails.payment_method_type[0]}</p>
                    <p className="ml-1 text-gray-600">Payment Status: {item.paymentDetails.payment_status}</p>
                  </div>

                  <div>
                    <div className="text-lg font-semibold text-gray-800">Shipping Details</div>
                    {item.shipping_options.map((shipping, index) => {
                      return (
                        <div key={shipping.shipping_rate} className="ml-1 text-gray-600">
                          Shipping Amount: {displayINRCurrency(shipping.shipping_amount)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mt-4 text-xl font-semibold text-gray-800 text-right">
                Total Amount: {displayINRCurrency(item.totalAmount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
