"use client"
import Link from "next/link";
import Image from "next/image";
import { Global, Currency } from "../state/global";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Header() {
  const { currency, setCurrency } = Global.useContainer();

  return (
    <div className="sticky top-0 z-50">
      {/* Sub header */}
      <div className="bg-black border-b border-zinc-800 flex items-center justify-center py-0.5">
        <span className="text-xs text-zinc-400">
          
        </span>
      </div>

      {/* Main header */}
      <div className="flex justify-between h-14 px-4 items-center bg-black">
        <div>
          <Link href="/" className="hover:opacity-70 transition-opacity">
            {/* <Image
              src="/vectors/logo.svg"
              height={30}
              width={165}
              alt="FriendMEX logo"
              priority
            /> */}
            <p className="text-white">LOGO PROJECT</p>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex border border-zinc-600 text-zinc-300">
            <button
              onClick={() => setCurrency(Currency.USD)}
              className={`px-1 hover:opacity-70 ${
                currency === Currency.USD ? "bg-zinc-500" : ""
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency(Currency.ETH)}
              className={`px-1 hover:opacity-70 ${
                currency === Currency.ETH ? "bg-zinc-500" : ""
              }`}
            >
              ETH
            </button>
          </div>

          <div className="md:flex hidden">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
