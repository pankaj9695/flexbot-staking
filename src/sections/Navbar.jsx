import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import ConnectButton from "../components/connectWallet";
import { notifyInfo } from "../utils/toast";

const Navbar = ({ ownerAddress, setOwnerAddress, balance, stakeBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(ownerAddress);
    notifyInfo("Address copied to clipboard");
  };
  return (
    <nav className="z-[20] xmd:relative mt-[29px] vsm:mt-0 mx-[20px] vsm:mx-0 rounded-[8px] vsm:rounded-0 bg-[#0A0B21] vsm:bg-transparent flex items-center justify-between border border-[#3B3B49] vsm:border-none px-[20px] xmd:px-[50px] xl:px-[80px] py-[8px] vsm:py-[20px] text-white">
      <h1 className="text-[22px] font-bold">FlexBot</h1>

      {ownerAddress ? (
        <ul
          className={`${
            !isOpen && "hidden xmd:flex"
          } absolute z-[20] left-0 top-[90px] w-screen xmd:w-fit xmd:static flex flex-col xmd:flex-row gap-[40px] items-center py-[14px] px-[50px] xmd:rounded-[12px] bg-[#0A0B21] border border-[#3B3B49]`}
        >
          <li>
            <span className="flex">
              <span>Address : </span>
              <span
                title={ownerAddress}
                className="heading-gradient flex justify-center font-bold "
                onClick={handleCopy}
              >
                <span> {ownerAddress.slice(0, 8)}...</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </li>
          <li>
            <span>
              <span>Avl Balance :</span>
              <span className="heading-gradient font-bold"> {balance}</span>
            </span>
          </li>
          <li>
            <span>
              <span>Stake Balance :</span>
              <span className="heading-gradient font-bold">
                {" "}
                {stakeBalance}
              </span>
            </span>
          </li>
          {/* <li>
          <ScrollLink
            onClick={() => setIsOpen(false)}
            to="roadmap"
            smooth={true}
            duration={1000}
          >
            Roadmap
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            onClick={() => setIsOpen(false)}
            to="contact"
            smooth={true}
            duration={1000}
          >
            Contact
          </ScrollLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <a href="https://flex-bot.gitbook.io/flexbot/" target="blank">
            Whitepaper
          </a>
        </li> */}

          {/* <a
          href="https://t.me/TradeOnFlexBot"
          target="blank"
          className="block xmd:hidden bg-[#AD36C5] rounded-[12px] text-sm py-[14px] px-[20px]"
        >
          Sign Up
        </a> */}
        </ul>
      ) : null}

      {/* <a
        href="https://t.me/TradeOnFlexBot"
        target="blank"
        className="hidden xmd:block bg-[#AD36C5] rounded-[12px] text-sm py-[14px] px-[20px]"
      >
        Sign Up
      </a> */}
      <ConnectButton
        ownerAddress={ownerAddress}
        setOwnerAddress={setOwnerAddress}
      />

      {/* <button className="xmd:hidden">
        {isOpen ? (
          <FaTimes
            className="text-[25px] text-[red]"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <FaBars className="text-[25px]" onClick={() => setIsOpen(true)} />
        )}
      </button> */}
    </nav>
  );
};

export default Navbar;
