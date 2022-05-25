import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Admin/Admin';
import SplashLanding from './Main/SplashLanding';
import AdminTopMenu from './Admin/TopMenu';
import AdminFooter from './Admin/Footer';
import Message from './Activity/Message';
import Pending from './Activity/Pending';
import Ok from './Activity/Ok';
import Err from './Activity/Err';
import MyNFTs from './Main/MyNFTs';
import Withdraw from './Admin/Withdraw';
import Week2SplashLanding from './Main/Week2/SplashLanding';
import Week3SplashLanding from './Main/Week3/SplashLanding';
import Week4SplashLanding from './Main/Week4/SplashLanding';


export default function App() {
  const [configObj, setConfigObj] = React.useState({});
  const [actionHistory, setActionHistory] = React.useState([]);                                         // For the Notifications drop-down. But now we only have this in Admin
  const [showActivity, setShowActivity] = React.useState(false);
  const [openGuestBook, setGuestBook] = React.useState(false);
  const [showWallet, setShowWallet] = React.useState(false);

  React.useEffect(async () => {
    const fetchObj = await fetch(window.location.origin + window.location.pathname + '/' + 'projectConfig.json')
    .then((response) => response.json())
    .catch((err) => console.error("Error while fetching projectConfig.json: ", err));
    setConfigObj(fetchObj);
  }, [])

  function initContract() {
    const args = {
      owner_id: process.env.CONTRACT_NAME || configObj.contractName,
      admin: configObj.admin
    }
    window.contract.new_default_meta(args)                                                            // This could be 'new' for user provided init, we are using default
      .then((msg) => console.log("Initialized! ", msg))
      .catch((err) => console.error(err));
  }
  
  function newAction(actionObj) {
    //FireToast conditionally
    if (actionObj.thePromise) {
      toast.promise(
        actionObj.thePromise,
        {
          pending: {
            render() {
              return <div className="toastMargin"><Message title={actionObj.pendingPromiseTitle} desc={actionObj.pendingPromiseDesc} /></div>;
            }, 
            icon: <Pending />
          },
          success: {
            render({data}) {
              console.log("data", data)
              return <div className="toastMargin"><Message title={actionObj.successPromiseTitle} desc={actionObj.successPromiseDesc} /></div>
            },
            icon: <Ok />
          },
          error: {
            render({data}) {
              console.log("data", data)
              return <div className="toastMargin"><Message title={actionObj.errorPromiseTitle} desc={actionObj.errorPromiseDesc} /></div>
            },
            icon: <Err />
          }
        },
      ) // We set the history messages here
        .then(() => setActionHistory((prevArray) => {
          prevArray.push({ successMsg: actionObj.successPromiseTitle, successMsgDesc: actionObj.successPromiseDesc });
          return [...prevArray];
        }))
        .catch(() => setActionHistory((prevArray) => {
          prevArray.push({errorMsg: actionObj.errorPromiseTitle, errorMsgDesc: actionObj.errorPromiseDesc});
          return [...prevArray];
        }))
    } else {
      if (actionObj.errorMsg) toast.warn(actionObj.errorMsg);
      if (actionObj.successMsg) toast.success(actionObj.successMsg);
      if (actionObj.infoMsg) toast.info(actionObj.infoMsg);

      setActionHistory((prevArray) => {
        prevArray.push(actionObj);
        return [...prevArray];
      });
    }
  }

  
  return (
    <HashRouter>
      <Routes>
        <Route 
          exact
          path='/'
          element={<Navigate replace to="/weekfour" />}
        />
        <Route 
          exact
          path='init'
          element={ configObj.admin?<button onClick={initContract}>INIT</button> : <p>loading...</p> }
        />
        <Route 
          exact
          path='admin'
          element={
            <>
              <ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
              <AdminTopMenu setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} 
                setShowWallet={setShowWallet} showWallet={showWallet} />
              <Admin newAction={newAction} vault={configObj.contractName} />
              <AdminFooter />
            </>
          }
        />
        <Route 
          exact
          path='my-nfts'
          element={
            <MyNFTs newAction={newAction} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowWallet={setShowWallet} showWallet={showWallet} />
          }
        />
        {/** The 12 SoundSplash NFT Landing Pages */}
        <Route 
          exact
          path='testnft0926'
          element={
            <Week4SplashLanding
              index={4} newAction={newAction} configObj={configObj} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} setShowWallet={setShowWallet} showWallet={showWallet} 
            />
          }
        />
        <Route 
          exact
          path='weekone'
          element={
            <SplashLanding 
              index={2} newAction={newAction} configObj={configObj} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} setShowWallet={setShowWallet} showWallet={showWallet} 
            />
          }
        />
        <Route 
          exact
          path='weektwo'
          element={
            <Week2SplashLanding 
              index={3} newAction={newAction} configObj={configObj} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} setShowWallet={setShowWallet} showWallet={showWallet}
            />
          }
        />
        <Route 
          exact
          path='weekthree'
          element={
            <Week3SplashLanding 
              index={4} newAction={newAction} configObj={configObj} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} setShowWallet={setShowWallet} showWallet={showWallet}
            />
          }
        />
        <Route 
          exact
          path='weekfour'
          element={
            <Week4SplashLanding 
              index={5} newAction={newAction} configObj={configObj} openGuestBook={openGuestBook} setGuestBook={setGuestBook} setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} setShowWallet={setShowWallet} showWallet={showWallet}
            />
          }
        />
        <Route 
          exact
          path='withdraw'
          element={
            <>
              <ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
              <AdminTopMenu setShowActivity={setShowActivity} showActivity={showActivity} actionHistory={actionHistory} 
                setShowWallet={setShowWallet} showWallet={showWallet} />
              <Withdraw />
              <AdminFooter />
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
}