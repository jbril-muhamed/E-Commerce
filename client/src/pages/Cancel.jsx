import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Cancel = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <AiOutlineClose className="text-primary" size={72} />
      <h1 className="text-4xl font-bold">Payment Cancelled</h1>
      <p className="text-gray-600 max-w-md">
        Your order was not completed. Your cart items are still saved — you can
        try again whenever you&apos;re ready.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
