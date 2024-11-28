import { useEffect, useState } from 'react';
import axios from 'axios';
import { SigningStargateClient } from "@cosmjs/stargate";

interface Api {
  api_key: string;
  credits_left: number;
}

export default function Documentation({ address }: { address: string }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const chainId = import.meta.env.VITE_AKASH_CHAIN_ID;
  const akashRPC = import.meta.env.VITE_AKASH_RPC_URL;

  const [myAPIs, setMyAPIs] = useState<Api[]>([]);
  const [moneyPaid, setMoneyPaid] = useState<string>('1');
  const [newApiKey, setNewApiKey] = useState<string | null>(null);

  const getMyCurrentApis = async (address: string) => {
    try {
      const response = await axios.get(`${API_URL}/apis/list-apis`, {
        params: { address },
      });
      setMyAPIs(response.data.apis);
    } catch (error) {
      console.error('Error fetching APIs:', error);
    }
  };

  const sendTokens = async (recipientAddress: string, amount: number) => {
    try {
      if (!window.keplr) {
        alert("Please install the Keplr extension.");
        return;
      }
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      const client = await SigningStargateClient.connectWithSigner(
        akashRPC,
        offlineSigner
      );

      const senderAddress = accounts[0].address;
      const amountInMicro = {
        denom: "uakt",
        amount: String(amount * 1_000_000),
      };

      const fee = {
        amount: [{ denom: "uakt", amount: "5000" }],
        gas: "200000",
      };

      const result = await client.sendTokens(
        senderAddress,
        recipientAddress,
        [amountInMicro],
        fee,
        "Transaction memo"
      );

      if (result.code === 0) {
        const response = await axios.post(`${API_URL}/apis/create-api`, null, {
          params: { address, money_paid: amount },
        });
        setNewApiKey(response.data.api_key);
        getMyCurrentApis(address);
        alert("Transaction successful!");
      } else {
        alert(`Transaction failed: ${result.rawLog}`);
      }
    } catch (error) {
      console.error("Error sending tokens:", error);
      alert("An error occurred while sending tokens.");
    }
  };

  const createApi = async () => {
    try {
      const amount = parseFloat(moneyPaid);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }
      const parentWallet = import.meta.env.VITE_AKASH_MUNYON_WALLET;
      await sendTokens(parentWallet, amount);
    } catch (error) {
      console.error("Error creating API:", error);
    }
  };

  const deleteApiKey = async (apiKey: string) => {
    try {
      const response = await axios.delete(`${API_URL}/apis/delete-api`, {
        params: { address, api_key: apiKey },
      });
      if (response.status === 200) {
        alert("API key deleted successfully.");
        getMyCurrentApis(address);
      }
    } catch (error) {
      console.error("Error deleting API key:", error);
      alert("An error occurred while deleting the API key.");
    }
  };

  useEffect(() => {
    getMyCurrentApis(address);
  }, [address]);

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <section>
        <h2 className="text-2xl font-bold mb-4">My APIs</h2>
        {myAPIs.length > 0 ? (
          myAPIs.map((api) => (
            <div
              key={api.api_key}
              className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md border border-gray-700"
            >
              <h3 className="text-xl text-white font-semibold">API Key</h3>
              <p className="text-white">Key: {api.api_key}</p>
              <p className="text-white">Credits Left: {api.credits_left}</p>
              <button
                onClick={() => deleteApiKey(api.api_key)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete API Key
              </button>
            </div>
          ))
        ) : (
          <p>No APIs available. Create one to get started!</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create a New API</h2>
        <p>Price: 1 AKT (500 generations)</p>
        <button
          onClick={() => createApi()}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        >
          Create API
        </button>
        {newApiKey && (
          <div className="mt-4 text-green-500">New API Key: {newApiKey}</div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <div>
          <h3>1. Authentication</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/auth \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key"}'`}
          </pre>
          <br />
          <h3>2. Make Your First API Call</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/tts \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, welcome to AudioMOS!",
    "voice_id": "en-US-1"
  }'`}
          </pre>
          <br />
          <h3>3. Text-to-Speech</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/tts \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Transforming text into spoken words.",
    "voice_id": "en-US-1",
    "speed": 1.0,
    "pitch": 0.0
  }'`}
          </pre>
          <br />
          <h3>4. Speech-to-Text</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/stt \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio_file=@path_to_audio_file.wav" \\
  -F "language=en-US"`}
          </pre>
          <br />
          <h3>5. Voice Cleaning</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/clean-voice \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio_file=@path_to_audio_file_with_noise.wav"`}
          </pre>
          <br />
          <h3>6. Voice Cloning</h3>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
            {`curl -X POST https://api.audiomos.com/v1/clone-voice \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: multipart/form-data" \\
  -F "sample_voice_file=@path_to_sample_voice.wav" \\
  -F "text_to_speak=This is my cloned voice speaking!"`}
          </pre>
          <br />
        </div>
      </section>
        </div>
  );
}
