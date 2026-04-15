import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';
import { getStripeSession } from '../api';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const { data } = await getStripeSession(sessionId);
        setOrder(data.order);
      } catch (err) {
        console.error('Failed to load session:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <BsCheckCircle className="text-green-500" size={72} />
      <h1 className="text-4xl font-bold">Order Confirmed!</h1>
      <p className="text-gray-600 max-w-md">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>
      {order && (
        <div className="bg-gray-50 rounded-2xl px-8 py-6 text-left max-w-sm w-full space-y-2">
          <p className="text-sm text-gray-500">
            Order ID:{' '}
            <span className="font-mono text-gray-800 text-xs">{order._id}</span>
          </p>
          <p className="text-sm text-gray-500">
            Total:{' '}
            <span className="font-bold text-gray-800">
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Items: <span className="font-bold text-gray-800">{order.items.length}</span>
          </p>
        </div>
      )}
      <Link to="/" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
