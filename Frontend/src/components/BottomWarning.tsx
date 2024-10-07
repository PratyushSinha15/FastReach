import { Link } from 'react-router-dom';

export function BottomWarning({ label, buttonText, to }: { label: string; buttonText: string; to: string }) {
  return (
    <div className=" text-white  text-sm w-30 flex flex-row justify-evenly ">
      <div>{label}</div>
      <Link to={to} className='font-extrabold ml' >
        {buttonText}
      </Link>
    </div>
  );
}
