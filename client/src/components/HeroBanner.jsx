import { Link } from 'react-router-dom';

const HeroBanner = ({ banners }) => {
  if (!banners || banners.length === 0) return null;
  const banner = banners[0];

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 space-y-4">
          {banner.smallText && (
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              {banner.smallText}
            </p>
          )}
          {banner.midText && (
            <p className="text-3xl md:text-4xl font-black text-gray-200 -mb-2 select-none">
              {banner.midText}
            </p>
          )}
          {banner.largeText1 && (
            <h1 className="text-5xl md:text-8xl font-black text-primary leading-none">
              {banner.largeText1}
            </h1>
          )}
          {banner.heading && (
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              {banner.heading}
            </h2>
          )}
          {banner.desc && (
            <p className="text-gray-600 max-w-md">{banner.desc}</p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {banner.product && (
              <Link
                to={`/product/${banner.product.toLowerCase().replace(/\s+/g, '-')}`}
                className="btn-primary inline-block"
              >
                {banner.buttonText || 'Shop Now'}
              </Link>
            )}
            <Link to="/" className="btn-outline inline-block">
              View All Products
            </Link>
          </div>
          {banner.discount && (
            <p className="text-sm text-gray-500 mt-2">
              🏷️ {banner.discount}
              {banner.saleTime && ` — ${banner.saleTime}`}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={banner.image}
            alt={banner.heading || 'Hero banner'}
            className="w-full max-w-sm md:max-w-md object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
