import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-[#24292E] text-white py-[21px] flex justify-center ">
            <div className="flex max-w-[1200px] w-full items-center">
                <Image
                    src="/logoGithub.svg"
                    alt="Logo da empresa"
                    width={124}
                    height={30}
                    priority
                />
                <span className="font-normal text-2xl leading-[28.13px] mx-3">/</span>
                <span className="font-light text-base leading-[18.75px] text-[#FFFFFF]">Profile</span>
            </div>
        </header>
    );
}
