import React, { useEffect, useState } from 'react';
import Assistant from './components/Assistant';
import Profile from './components/Profile';
import { ROUTES } from "./utils/routes"
import { loadData } from './utils/localStorage';

function App() {
    const [page, setPage] = useState(ROUTES.ASSISTANT);
    const [info, setInfo] = useState("info");
    const [openAIKey, setOpenAIKey] = useState("key");

    useEffect(() => {
      const fetchLocalData = async () => {
        const fetchedInfo = await loadData("info");
        const fetchedAIKey = await loadData("openAIKey");

        setInfo(fetchedInfo);
        setOpenAIKey(fetchedAIKey);
      };

      fetchLocalData();
    }, [])

    switch (page) {
      case ROUTES.ASSISTANT:
        return <Assistant setPage={setPage} info={info} openAIKey={openAIKey}/>;
      case ROUTES.PROFILE:
        return <Profile 
          setPage={setPage}
          info={info}
          setInfo={setInfo}
          openAIKey={openAIKey}
          setOpenAIKey={setOpenAIKey} 
        />;
      
      default:
        return <Assistant setPage={setPage} info={info} openAIKey={openAIKey}/>;
    }
}

export default App;
