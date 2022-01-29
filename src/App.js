import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Frame/Layout';
import Admin from './Admin/Admin';
import NoPage from './NoPage';
import Main from './Main/Main';
import TopMenu from './Frame/TopMenu';
import Footer from './Frame/Footer';
import ActivityBox from './Activity/Notifications';
import Message from './Activity/Message';
import Pending from './Activity/Pending';
import Ok from './Activity/Ok';
import Err from './Activity/Err';


export default function App() {
  const location = window.location.pathname;
  console.log("location: ", location);

  /**STATES */
  const [actionHistory, setActionHistory] = React.useState([]);
  const [showActivity, setShowActivity] = React.useState(false);
  const [oneKindOfPromise, setOneKindOfPromie] = React.useState(false);
  const [otherKindOfServerPending, setOtherKindOfServerPending] = React.useState(false);
  const [orWeCouldSetAnObjectThatHasItsOwnEverything, setterForThat] = React.useState({});

  

  function initContract() {
    // This could be 'new' for user provided init
    // WE WILL HAVE TO CHANGE THIS TO THE OWNER (or create admin user in lib.rs), BUT NOW THE ASSERT IS TURNED OFF INSTEAD!!
    window.contract.new_default_meta({owner_id: process.env.CONTRACT_NAME || 'dev-1643218536025-85404878099863'})
      .then((msg) => console.log("Initialized! ", msg))
      .catch((err) => console.error(err))
      .finally(() => console.log("end."));
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
      toast("hello");
      setActionHistory((prevArray) => {
        prevArray.push(actionObj);
        return [...prevArray];
      });
    }
  }

  function switchActivityBox() {
    setShowActivity((state) => !state);
  }

  console.log("actionHistory: ", actionHistory);


  const urlParams = window.location.search;  function initContract() {
    // This could be 'new' for user provided init
    // WE WILL HAVE TO CHANGE THIS TO THE OWNER (or create admin user in lib.rs), BUT NOW THE ASSERT IS TURNED OFF INSTEAD!!
    window.contract.new_default_meta({owner_id: process.env.CONTRACT_NAME || 'dev-1643108238965-30590107738953'})
      .then((msg) => console.log("Initialized! ", msg))
      .catch((err) => console.error(err))
      .finally(() => console.log("end."));
  }//new URLSearchParams(location.search);
  if (urlParams.includes('init')) {
    initContract();
    return;
  }
  
  if (urlParams.includes('admin')) {
    return (
      <>
        <ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
        <TopMenu switchActivityBox={switchActivityBox} />
        <ActivityBox showActivity={showActivity} actionHistory={actionHistory} />
        <main>
          <Admin newAction={newAction} />
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <TopMenu />
        <main>
          <Main newAction={newAction} />
        </main>
        <Footer />
      </>
    );    
  }

  console.log(urlParams)

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={location} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={"?admin"} element={<Admin />} />
          <Route path={"*"} element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
