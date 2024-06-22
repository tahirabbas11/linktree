import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="py-5 flex items-center justify-center fixed bottom-0 left-0 w-full">
			{/* <h1 className="font-popins font-normal text-2xl">Linktree 🏝️</h1> */}
			{/* <p className="font-popins font-normal text-sm inline">Create by <a className="underline inline" href="https://thetahirabbas.netlify.app/"><FaGithub /> @tahirabbas11</a> 💚</p> */}
			<p className="font-popins font-normal text-sm inline">
  Create by {" "}
  <Link href="https://thetahirabbas.netlify.app/" style={{ display: 'inline-flex', alignItems: 'center' }}>
    <FaGithub style={{ marginRight: '4px' }} /> @tahirabbas11
  </Link> 
</p>
	</footer>
	)
}
export default Footer
