import { useState, useEffect, useRef} from "react";
import Fuse from "fuse.js";
import { Select, ConfigProvider } from "antd";
import { useTheme } from "next-themes";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaSnapchat,
  FaPinterest,
  FaTiktok,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaDribbble,
  FaBehance,
  FaSpotify,
  FaApple,
  FaTwitch,
  FaVimeo,
  FaFigma,
  FaSlack,
  FaSkype,
  FaMedium,
  FaGoogle,
  FaDropbox,
  FaAirbnb,
  FaAmazon,
  FaPaypal,
  FaStripe,
  FaBitbucket,
  FaGitlab,
  FaGoogleDrive,
  FaEvernote,
  FaMicrosoft,
  FaTencentWeibo,
  FaFoursquare,
  FaYelp,
  FaTripadvisor,
  FaEnvelope,
  FaGlobe,
  FaCodepen,
  FaDeviantart,
  FaEtsy,
  FaFlickr,
  FaGoodreads,
  FaHouzz,
  FaKickstarter,
  FaMixcloud,
  FaOpenid,
  FaPeriscope,
  FaQuora,
  FaSoundcloud,
  FaStackOverflow,
  FaSteam,
  FaStripeS,
  FaTumblr,
  FaVimeoV,
  FaVk,
  FaWeibo,
  FaWhatsappSquare,
  FaWindows,
  FaXbox,
  FaYahoo,
} from "react-icons/fa";

interface Icon {
  value: string;
  label: string;
  component: any;
}

const iconList: Icon[] = [
  { value: "linkedin", label: "LinkedIn", component: FaLinkedin },
  { value: "github", label: "Github", component: FaGithub },
  { value: "twitter", label: "Twitter", component: FaTwitter },
  { value: "instagram", label: "Instagram", component: FaInstagram },
  { value: "facebook", label: "Facebook", component: FaFacebook },
  { value: "youtube", label: "Youtube", component: FaYoutube },
  { value: "snapchat", label: "Snapchat", component: FaSnapchat },
  { value: "pinterest", label: "Pinterest", component: FaPinterest },
  { value: "tiktok", label: "Tiktok", component: FaTiktok },
  { value: "reddit", label: "Reddit", component: FaReddit },
  { value: "whatsapp", label: "Whatsapp", component: FaWhatsapp },
  { value: "telegram", label: "Telegram", component: FaTelegram },
  { value: "discord", label: "Discord", component: FaDiscord },
  { value: "dribbble", label: "Dribbble", component: FaDribbble },
  { value: "behance", label: "Behance", component: FaBehance },
  { value: "spotify", label: "Spotify", component: FaSpotify },
  { value: "apple", label: "Apple", component: FaApple },
  { value: "twitch", label: "Twitch", component: FaTwitch },
  { value: "vimeo", label: "Vimeo", component: FaVimeo },
  { value: "figma", label: "Figma", component: FaFigma },
  { value: "slack", label: "Slack", component: FaSlack },
  { value: "skype", label: "Skype", component: FaSkype },
  { value: "medium", label: "Medium", component: FaMedium },
  { value: "google", label: "Google", component: FaGoogle },
  { value: "dropbox", label: "Dropbox", component: FaDropbox },
  { value: "airbnb", label: "Airbnb", component: FaAirbnb },
  { value: "amazon", label: "Amazon", component: FaAmazon },
  { value: "paypal", label: "Paypal", component: FaPaypal },
  { value: "stripe", label: "Stripe", component: FaStripe },
  { value: "bitbucket", label: "Bitbucket", component: FaBitbucket },
  { value: "gitlab", label: "Gitlab", component: FaGitlab },
  { value: "googledrive", label: "Google Drive", component: FaGoogleDrive },
  { value: "evernote", label: "Evernote", component: FaEvernote },
  { value: "microsoft", label: "Microsoft", component: FaMicrosoft },
  { value: "tencentweibo", label: "Tencent Weibo", component: FaTencentWeibo },
  { value: "foursquare", label: "Foursquare", component: FaFoursquare },
  { value: "yelp", label: "Yelp", component: FaYelp },
  { value: "tripadvisor", label: "Tripadvisor", component: FaTripadvisor },
  { value: "envelope", label: "Mail", component: FaEnvelope },
  { value: "globe", label: "Globe", component: FaGlobe },
  { value: "codepen", label: "Codepen", component: FaCodepen },
  { value: "deviantart", label: "Deviantart", component: FaDeviantart },
  { value: "etsy", label: "Etsy", component: FaEtsy },
  { value: "flickr", label: "Flickr", component: FaFlickr },
  { value: "goodreads", label: "Goodreads", component: FaGoodreads },
  { value: "houzz", label: "Houzz", component: FaHouzz },
  { value: "kickstarter", label: "Kickstarter", component: FaKickstarter },
  { value: "mixcloud", label: "Mixcloud", component: FaMixcloud },
  { value: "openid", label: "Openid", component: FaOpenid },
  { value: "periscope", label: "Periscope", component: FaPeriscope },
  { value: "quora", label: "Quora", component: FaQuora },
  { value: "soundcloud", label: "Soundcloud", component: FaSoundcloud },
  { value: "stackoverflow", label: "Stack Overflow", component: FaStackOverflow },
  { value: "steam", label: "Steam", component: FaSteam },
  { value: "stripes", label: "Stripe S", component: FaStripeS },
  { value: "tumblr", label: "Tumblr", component: FaTumblr },
  { value: "vimeov", label: "Vimeo V", component: FaVimeoV },
  { value: "vk", label: "Vk", component: FaVk },
  { value: "weibo", label: "Weibo", component: FaWeibo },
  { value: "whatsappsquare", label: "Whatsapp Square", component: FaWhatsappSquare },
  { value: "windows", label: "Windows", component: FaWindows },
  { value: "xbox", label: "Xbox", component: FaXbox },
  { value: "yahoo", label: "Yahoo", component: FaYahoo },
];

const fuseOptions = {
  keys: ["label", "value"],
  threshold: 0.3,
};

const IconDropdown: React.FC<{ onSelect: (icon: any) => void }> = ({
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentTheme, SetCurrentTheme] = useState<any>("");
  const [optionSelected, setOptionSelected] = useState<string>("");
  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Define currentTheme and update it on component render
  // const currentTheme = localStorage.getItem("theme") || 'dark';
  const { systemTheme, theme } = useTheme();

  

  useEffect(() => {
    SetCurrentTheme(theme === "system" ? systemTheme : theme);
    setFilteredIcons(iconList);
  }, []);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleSelectIcon = (selectedIcon: any) => {
    onSelect(selectedIcon.label);
    setOptionSelected(selectedIcon.label);
    setSearchTerm("");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const listStyle = {
    maxHeight: '200px',
    overflowY: 'auto' as const,
    border: `1px solid ${currentTheme === "dark" ? "#383838" : "#fff"}`,
    borderRadius: '4px',
    display: isOpen ? 'block' : 'none',
    // position: 'absolute',
    width: '100%',
    zIndex: 1,
    background: currentTheme === "dark" ? "#383838" : "#fff",
    color: currentTheme === "dark" ? "#fff" : "#383838",
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    cursor: 'pointer',
    borderBottom: `1px solid ${currentTheme === "dark" ? "#383838" : "#fff"}`,
    transition: 'background-color 0.3s',
  };

  const listItemHoverStyle = {
    ...listItemStyle,
    ':hover': {
      backgroundColor: '#16A349',
    },
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search icons"
        value={optionSelected}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleDropdown}
        className="mb-2 p-4 w-full rounded-md border border-gray-300"
        style={{
          background: currentTheme === "dark" ? "#383838" : "#fff",
          color: currentTheme === "dark" ? "#fff" : "#383838",
        }}
      />
      {isOpen && (
        <div style={listStyle}>
          {filteredIcons
            .filter((icon) => icon.label.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((icon) => (
              <div
                key={icon.value}
                onClick={() => handleSelectIcon(icon)}
                style={optionSelected === icon.label ? { ...listItemHoverStyle } : listItemHoverStyle}
              >
                <icon.component className="mr-2 text-xl hover:bg-green-700" />
                <span>{icon.label}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default IconDropdown;

