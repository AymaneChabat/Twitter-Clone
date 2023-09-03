import React from 'react';

const Footer = () => {
  const footerLinks = [
    'About',
    'Help Center',
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
    'Accessibility',
    'Ads info',
    'Blog',
    'Status',
    'Careers',
    'Brand Resources',
    'Advertising',
    'Marketing',
    'X for Business',
    'Developers',
    'Directory',
    'Settings',
  ];

  return (
    <div className="bg-gray-800 text-white">
        <div className="mx-auto py-5 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center">
            {footerLinks.map((link, index) => (
                <a
                key={index}
                href="#"
                className="block mx-2 my-2 text-[12px] text-gray-300 hover:underline underline-offset-8"
                >
                {link}
                </a>
            ))}
            <a href="#" className="block mx-2 my-2 text-[12px] text-gray-300 hover:underline underline-offset-8">
                &copy; 2023 X Corp.
            </a>
        </div>
    </div>

  );
};

export default Footer;
