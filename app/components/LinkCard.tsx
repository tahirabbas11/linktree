import { useTheme } from 'next-themes';
import * as Icons from './IconImports'; // Import all icons from IconImports.tsx
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  url: string;
  title: string;
}

const iconComponents: { [key: string]: any } = {
  LinkedIn: Icons.FaLinkedin,
  Github: Icons.FaGithub,
  Twitter: Icons.FaTwitter,
  Instagram: Icons.FaInstagram,
  Facebook: Icons.FaFacebook,
  Youtube: Icons.FaYoutube,
  Snapchat: Icons.FaSnapchat,
  Pinterest: Icons.FaPinterest,
  Tiktok: Icons.FaTiktok,
  Reddit: Icons.FaReddit,
  Whatsapp: Icons.FaWhatsapp,
  Telegram: Icons.FaTelegram,
  Discord: Icons.FaDiscord,
  Dribbble: Icons.FaDribbble,
  Behance: Icons.FaBehance,
  Spotify: Icons.FaSpotify,
  Apple: Icons.FaApple,
  Soundcloud: Icons.FaSoundcloud, // Example of using an icon from IconImports.tsx not directly imported
  Twitch: Icons.FaTwitch,
  Vimeo: Icons.FaVimeo,
  Figma: Icons.FaFigma,
  Slack: Icons.FaSlack,
  Skype: Icons.FaSkype,
  Medium: Icons.FaMedium,
  Google: Icons.FaGoogle,
  Dropbox: Icons.FaDropbox,
  Airbnb: Icons.FaAirbnb,
  Amazon: Icons.FaAmazon,
  Paypal: Icons.FaPaypal,
  Stripe: Icons.FaStripe,
  Bitbucket: Icons.FaBitbucket,
  Gitlab: Icons.FaGitlab,
  GoogleDrive: Icons.FaGoogleDrive,
  Evernote: Icons.FaEvernote,
  Microsoft: Icons.FaMicrosoft,
  Weibo: Icons.FaWeibo,
  TencentWeibo: Icons.FaTencentWeibo,
  Foursquare: Icons.FaFoursquare,
  Yelp: Icons.FaYelp,
  Tripadvisor: Icons.FaTripadvisor,
  Mail: Icons.FaEnvelope,
  Globe: Icons.FaGlobe,
  Codepen: Icons.FaCodepen,
  Deviantart: Icons.FaDeviantart,
  Etsy: Icons.FaEtsy,
  Flickr: Icons.FaFlickr,
  Goodreads: Icons.FaGoodreads,
  Houzz: Icons.FaHouzz,
  Kickstarter: Icons.FaKickstarter,
  Mixcloud: Icons.FaMixcloud,
  Openid: Icons.FaOpenid,
  Periscope: Icons.FaPeriscope,
  Quora: Icons.FaQuora,
  StackOverflow: Icons.FaStackOverflow,
  Steam: Icons.FaSteam,
  StripeS: Icons.FaStripeS,
  Tumblr: Icons.FaTumblr,
  VimeoV: Icons.FaVimeoV,
  Vk: Icons.FaVk,
  WhatsappSquare: Icons.FaWhatsappSquare,
  Windows: Icons.FaWindows,
  Xbox: Icons.FaXbox,
  Yahoo: Icons.FaYahoo,
};

const LinkCard = ({ url, title }: Props) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const IconComponent = iconComponents[capitalizedTitle] || Icons.FaGlobe;
  const bgColor = currentTheme === 'dark' ? 'bg-[#383838]' : 'bg-[#F9FAFB]';

  const handleThreeDotsClick = () => {
    // Use SweetAlert for modal dialog
    Swal.fire({
      title: '',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Delete',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
      confirmButtonColor: '#22c55e',
      preConfirm: (result) => {
        if (result === 'update') {
          // Perform update action
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 2000); // Simulating async update process
          });
        } else if (result === 'delete') {
          // Perform delete action
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 2000); // Simulating async delete process
          });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Action completed!',
        });
      }
    });
  };

  return (
    <div
      className={`flex p-4 mb-3 rounded-lg w-full border border-gray-300 ${bgColor} transition-all duration-150 hover:scale-105 hover:border-green-500 max-w-[25rem]`}
    >
      <div className="flex items-center w-full">
        <div className="flex items-center justify-center flex-shrink-0">
          <IconComponent size={30} className="mr-4 duration-200" />
        </div>
        <div className="flex-grow text-center">
          <h2 className="font-poppins font-medium text-sm sm:text-base">
            {title}
          </h2>
        </div>
        <div className="flex-shrink-0">
          <BsThreeDotsVertical
            size={30}
            className="ml-auto duration-200 hover:bg-green-500 rounded-full p-1 cursor-pointer"
            onClick={handleThreeDotsClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
