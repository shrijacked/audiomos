import React, { useState, useEffect } from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { Buffer } from "buffer";

export default function Header({ address, setAddress }) {

  const chainId = import.meta.env.VITE_AKASH_CHAIN_ID;
  const akashRPC = import.meta.env.VITE_AKASH_RPC_URL;

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    // Restore connection state from localStorage
    const storedIsConnected = localStorage.getItem('isConnected');
    const storedAddress = localStorage.getItem('address');
    if (storedIsConnected === 'true' && storedAddress) {
      setIsConnected(true);
      setAddress(storedAddress);
    }
  }, []);

  const initializeKeplr = async () => {
    if (!window.Buffer) {
      window.Buffer = Buffer;
    }
    if (!window.keplr) {
      alert("Please install Keplr extension");
    } else {
      try {
        await window.keplr.enable(chainId);
        const keyInfo = await window.keplr.getKey(chainId);
        console.log("Address:", keyInfo.bech32Address);

        setAddress(keyInfo.bech32Address);
        localStorage.setItem('address', keyInfo.bech32Address);

        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        const cosmJS = new SigningCosmosClient(
          "https://lcd-cosmoshub.keplr.app", // Replace with your LCD endpoint
          accounts[0].address,
          offlineSigner
        );

        setIsConnected(true);
        localStorage.setItem('isConnected', 'true');
      } catch (error) {
        console.error("Error initializing Keplr:", error);
      }
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    localStorage.removeItem('isConnected');
    localStorage.removeItem('address');
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-800 backdrop-blur-md fixed top-0 right-0 left-0 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1"></div> {/* This div will take up the remaining space */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl relative transition-colors duration-200"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary-600" />
            ) : (
              <Moon className="w-5 h-5 text-primary-600" />
            )}
          </button>

          {/* Keplr Wallet Connect */}
          {!isConnected ? (
            <button
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition duration-200"
              onClick={initializeKeplr}
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Connected: {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              <button
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-200"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
