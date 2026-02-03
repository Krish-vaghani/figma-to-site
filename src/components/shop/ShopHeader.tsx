import { Link } from "react-router-dom";
import leafDecoration from "@/assets/leaf-decoration.svg";
import shopBackground from "@/assets/shop-background.png";

const ShopHeader = () => {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${shopBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Decorative leaf patterns */}
      <img
        src={leafDecoration}
        alt=""
        className="absolute top-0 left-0 w-80 h-auto opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <img
        src={leafDecoration}
        alt=""
        className="absolute top-0 right-0 w-80 h-auto opacity-60 pointer-events-none scale-x-[-1]"
        aria-hidden="true"
      />
      <img
        src={leafDecoration}
        alt=""
        className="absolute bottom-0 right-1/4 w-64 h-auto opacity-40 pointer-events-none rotate-45"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Purses
        </h1>
        <nav className="text-muted-foreground">
          <Link to="/" className="hover:text-coral transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Purses</span>
        </nav>
      </div>
    </div>
  );
};

export default ShopHeader;
