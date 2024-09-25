import { resourcesLinks, platformLinks, communityLinks } from '../constants';

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700 text-neutral-400">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">About Pixel Cube Art</h3>
          <p className="text-sm">
            At Pixel Cube Art, we transform your cherished memories into unique Rubik’s cube mosaic art. Whether it's a portrait, cartoon, or an iconic symbol, we create personalized mosaic masterpieces that surprise and delight.
          </p>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a className="hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a className="hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a className="hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact and Social Media Section */}
      <div className="mt-8 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
        
        {/* Contact Information */}
        <div>
          <p className="text-sm">
            Have a question or need help? Contact us at{' '}
            <a href="mailto:support@pixelcubeart.com" className="text-orange-500 hover:underline">
              support@pixelcubeart.com
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/JAZIMCUBE" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Facebook
          </a>
          <a href="https://www.instagram.com/jumana_jabbar_n__potraitcube/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Twitter
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center text-xs">
        <p>&copy; 2024 Pixel Cube Art. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
