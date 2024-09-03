import { Link } from 'react-router-dom';

export function BottomWarning({ label, buttonText, to }: { label: string; buttonText: string; to: string }) {
  return (
    <div className=" text-white mt-3 text-sm w-30 flex flex-row justify-evenly gap-2 ">
      <div>{label}</div>
      <Link to={to} className='font-extrabold' >
        {buttonText}
      </Link>
    </div>
  );
}
