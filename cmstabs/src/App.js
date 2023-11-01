import React, {useState, useEffect} from 'react';
import {Route, Routes,useNavigate,} from 'react-router-dom';
import tabsData from './data/tabs.json';
import './App.css';


function App() {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sortedTabs = tabsData.sort((a, b) => a.order - b.order);
    setTabs(sortedTabs);
    if (sortedTabs.length > 0 && !selectedTab) {
      setSelectedTab(sortedTabs[0].id);
      navigate(`/${sortedTabs[0].id}`);
    }
  }, [ navigate, selectedTab]);

  const changeTab = (id) => {
    navigate(`/${id}`);
    setSelectedTab(id);
  }
  


  return (
      <div>
        <ul>
          {tabs.map(tabList => (
            <li key = {tabList.id} onClick={() => changeTab(tabList.id)}>
              {tabList.title}
            </li>
          ))}
        </ul>
        <Routes>
          {tabs.map(tab => (
            <Route key={tab.id} path={`/${tab.id}`} element={<DynamicComponent path={tab.path} />}>
            </Route>
          ))}
        </Routes>
      </div>
  );
}


const DynamicComponent = ({path}) => {
  const Component = React.lazy(() => import(`./${path}`));
  return(
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component/>
    </React.Suspense>
  );
};

export default App;
