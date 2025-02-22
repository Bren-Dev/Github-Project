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
    return (
        <div className="relative">
            <button
                className={`bg-[linear-gradient(89.89deg,#0056A6_-30.01%,#0587FF_125.65%)] ${className} flex items-center px-[14px] font-normal text-lg text-white rounded-[42px] gap-[16px]`}
                onClick={toggle}
            >
                <Image src="/arrowDownIcon.svg" alt="Icone Seta Para Baixo" width={12} height={6} priority />
                <span>{label}</span>
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-48 border shadow-md rounded-md bg-[#f2f8fe]" >
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
                                    className="form-checkbox h-4 w-4  text-blue-500 rounded border-white "
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