import Link from 'next/link';

const Footer = () => (
  <footer className="py-5 flex items-center justify-center fixed bottom-0 left-0 w-full">
    <p className="font-popins font-normal text-sm inline dark:text-gray-400">
      made by{'  '}
      {/* <FaGithub style={{ marginRight: '4px' }} />  */}
      <Link
        href={
          process.env.NEXT_PUBLIC_GITHUB_URL ||
          'https://thetahirabbas.netlify.app/'
        }
        className="dark:text-white light:text-black"
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {/* @tahirabbas11 */}
        Tahir
      </Link>
    </p>
  </footer>
);
export default Footer;
