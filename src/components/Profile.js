import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { ROUTES } from "../utils/routes"
import { saveData } from '../utils/localStorage';

function Profile({ setPage, info, setInfo, openAIKey, setOpenAIKey }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedInfo = formData.get("info");
    const updatedOpenAIKey = formData.get("openAIKey");
    setInfo(updatedInfo);
    setOpenAIKey(updatedOpenAIKey);
    saveData('info', updatedInfo);
    saveData('openAIKey', updatedOpenAIKey);
  };

  return (
    <div className="flex flex-col mx-5">
        <div className="flex flex-row justify-between my-3 items-center">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button 
            onClick={() => setPage(ROUTES.ASSISTANT)}
            className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%]"
          >
            <MdArrowBack/>
          </button>
        </div>

        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="openAiKey"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your OpenAI Key
            </label>
            <input 
              id="openAIKey"
              name="openAIKey"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
              placeholder="sk-...1234"
              defaultValue={openAIKey}
              required
            />
          </div>
          <div className="mb-6">
            <label 
              htmlFor="info"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Additional info
            </label>
            <textarea 
              id="info"
              name="info"
              rows={8}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg"
              placeholder="Type in any additional info"
              defaultValue={info}
            ></textarea>
          </div>
          <div className="mb-6 text-center">
            <button
              type="submit"
              className="border-2 border-solid border-blue-500 text-blue-500 text-lg rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
    </div>

  );
}

export default Profile;
