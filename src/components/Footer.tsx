import { FC } from 'react';
import { AiOutlineGithub, AiOutlineX } from 'react-icons/ai';

const Footer: FC = () => {
  return (
    <footer className="w-full max-w-4xl py-4 flex justify-center items-center gap-5">
      <AiOutlineGithub size={24} />
      <p className="text-md font-bold">Sobre este proyecto</p>
      <AiOutlineX size={24} />
    </footer>
  );
};

export default Footer;
