import React, { useEffect, useState } from 'react';
import {VscGear} from "react-icons/vsc";
import { ROUTES } from "../utils/routes"
import { loadData } from '../utils/localStorage';
import { postChatGPTMessage } from '../utils/chatGPTUtil';

function Assistant({setPage, info, openAIKey}) {
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState("");
  const [productAdvice, setProductAdvice] = useState("");

  useEffect(() => {
    const fetchProductInfo = async () => {
        const fetchedInfo = await loadData("productInfo");
        setProductInfo(fetchedInfo);
    }
    fetchProductInfo();
  }, []);

  const generateHelp = async () => {
    setIsLoading(true);
    try {
        const message = `Based on what I want and the given product description, is this a good product for me?\n\nWHAT I WANT:\n${info}\n\nProduct Description:\n${productInfo}`;
        const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
        setProductAdvice(chatGPTResponse);
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false);
    }
  }

  return (
     <div className="flex flex-col">
        <div className="flex flex-row justify-between mx-5 my-3 items-center">
            <button onClick={() => generateHelp()} className="border-2 border-solid border-blue-500 text-blue-500 text-lg">
                {isLoading ? "Analyzing" : "Analyze product"}
            </button>
            <h2 className="text-2xl font-bold">Amazon ShopAssistant</h2>
            <button 
                onClick={() => setPage(ROUTES.PROFILE)} 
                className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%]"
            >
                <VscGear />
            </button>
        </div>
        <div className="flex mx-5">
            <textarea
                rows={12}
                className="w-full"
                placeholder="Product information"
                value={productAdvice} 
            />
        </div>
     </div>
  );
}

export default Assistant;
