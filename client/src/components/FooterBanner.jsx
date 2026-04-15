import { Link } from 'react-router-dom';

const FooterBanner = ({ banners }) => {
  if (!banners || banners.length === 0) return null;
  const banner = banners[0];

  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={banner.image}
            alt={banner.heading || 'Promo banner'}
            className="w-full max-w-xs object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          {banner.discount && (
            <p className="text-yellow-300 font-bold text-lg">
              {banner.discount}
            </p>
          )}
          {banner.largeText1 && (
            <h2 className="text-4xl md:text-6xl font-black leading-none">
              {banner.largeText1}
            </h2>
          )}
          {banner.saleTime && (
            <p className="text-white/80 font-semibold">{banner.saleTime}</p>
          )}
          {banner.desc && (
            <p className="text-white/70 max-w-md mx-auto md:mx-0">
              {banner.desc}
            </p>
          )}
          {banner.product && (
            <Link
              to={`/product/${banner.product.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-block bg-white text-primary font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {banner.buttonText || 'Shop Now'}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
