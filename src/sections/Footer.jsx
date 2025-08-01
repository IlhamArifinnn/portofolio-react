import { mySocials } from "../constants";

const Footer = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-4">
        {mySocials.map((social, index) => (
          <a
            href={social.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-transform hover:scale-110 duration-200"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} IlhamArifinnn. All rights reserved.</p>
    </section>
  );
};

export default Footer;
