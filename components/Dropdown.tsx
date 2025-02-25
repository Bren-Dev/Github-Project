import Image from 'next/image';

interface DropdownProps {
    label: string;
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
    isOpen: boolean;
    toggle: () => void;
    className: string;
}

export default function Dropdown({ className, label, options, selected, onSelect, isOpen, toggle }: DropdownProps) {
    const handleClose = () => {
        toggle();
    };

    return (
        <div className="relative">
            <button
                className={`bg-[linear-gradient(89.89deg,#0056A6_-30.01%,#0587FF_125.65%)] ${className} flex items-center px-[14px] font-normal text-lg text-white rounded-[42px] gap-[10px] lg:gap-[16px] `}
                onClick={toggle}
            >
                <Image src="/arrowDownIcon.svg" alt="Icone Seta Para Baixo" width={8} height={4} className='lg:w-[12px] lg:h-[6px]' priority />
                <span className='font-normal lg:text-lg lg:leading-[21.09px] sm:text-[14px] text-sm leading-[16.41px] text-white'>{label}</span>
            </button>

            {isOpen && (
                <div className="hidden sm:flex sm:absolute mt-2 w-48 border shadow-md rounded-md bg-[#f2f8fe]">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                onClick={() => {
                                    onSelect(option);
                                    toggle();
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected === option}
                                    readOnly
                                    className="form-checkbox h-4 w-4 text-blue-500 rounded border-white"
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && (
                <div className="fixed sm:hidden top-0 left-0 z-10 bottom-0 w-full border shadow-md rounded-md bg-white p-6">
                    <div className='flex w-full justify-between p-4 pb-10'>
                        <p className='text-black font-bold text-2xl leading-[28.13px]'>{label}</p>
                        <button onClick={handleClose}>
                            <Image src="/closeIcon.svg" alt="Icone Seta Para Baixo" width={24} height={24} priority />
                        </button>
                    </div>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className="cursor-pointer w-[30%] px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                onClick={() => {
                                    onSelect(option);
                                    toggle();
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected === option}
                                    readOnly
                                    className="form-checkbox h-4 w-4 text-blue-500 rounded border-white"
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}